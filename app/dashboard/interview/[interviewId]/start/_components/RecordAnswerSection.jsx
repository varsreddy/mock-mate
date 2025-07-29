import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import {  Ghost, Mic, StopCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import Image from "next/image";
import { userAgent } from "next/server";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const RecordAnswerSection = ({ mockInterviewQuestions, activeQuestionIndex ,interviewData}) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const [userAnswer, setUserAnswer] = React.useState("");
  const [showAnswer, setShowAnswer] = React.useState(false);

  useEffect(() => {
  const finalTranscript = results.map(r => r.transcript).join(" ");
  setUserAnswer(finalTranscript + " " + interimResult);
}, [results, interimResult]);

useEffect(()=>{
  if(!isRecording && userAnswer?.length>10){
    UpdateUserAnswerInDb();
  }
},[userAnswer])


  const { user } = useUser();

  const StartStopRecording =async () =>{

    if(isRecording){

      stopSpeechToText();

      if(userAnswer?.length<10){
        setIsLoading(false);
        toast('Error while saving your answer, please record again');
        return;
      }
      
    }else{
      startSpeechToText();
    }
  }


  const UpdateUserAnswerInDb = async () => {
    setIsLoading(true);
    const feedbackPrompt = "Question: "+mockInterviewQuestions[activeQuestionIndex]?.question+
      ",User Answer: "+userAnswer+"Depends on question and user answer for given interview question"+
       ",please give us rating for answer and feedback as area of improvement in 1 to 5 rating scale and feedback in 3 to 5 lines to improve it in JSON format with rating field and feedback field."+
       " Do not include any other text or explanation, just return JSON object with rating and feedback fields.";

       const result= await chatSession.sendMessage(feedbackPrompt);



      const responseText = await result.response.text();  // Wait for the actual text
      const mockJsonResp = responseText.replace(/```json|```/g, "").trim();

      console.log(mockJsonResp);

      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockId: interviewData?.mockId,
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdBy: interviewData?.createdBy,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if(resp){
        toast.success('Your answer has been saved successfully!');
        setUserAnswer("");
        setResults([]); 
      }
      setResults([]);
      setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center flex-col">
    <div className="flex flex-col mt-20 justify-center items-center  bg-white border rounded-lg p-5">
      <Image
        src="/webcam_.jpg"
        alt="Webcam icon"
        width={200}
        height={200}
        className="absolute"
      />
      <Webcam
      style={{
        height:300,
        width:'100%',
        zIndex:10,
      }}
      />
    </div>
    <div className="flex flex-row items-center justify-center mt-5 gap-4">
    <Button className="my-5 border border-blue-600 text-blue-600 hover:bg-primary hover:text-white "        
        disabled={isLoading}
        onClick={StartStopRecording}
        variant="ghost"
        >
        {isRecording ? <h2 className="flex gap-1 text-red-600">
          <StopCircle/>Stop Recording</h2> 
            :
          <h2 className="flex gap-1"><Mic/>Record Answer</h2>}
      </Button>
        <Button onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer?"Hide My Answer":"Show My Answer"}</Button>
    </div>
    {showAnswer && (
  <div className="flex flex-col items-center justify-center bg-white border rounded-lg p-5">
    <h2 className="text-lg font-bold">Your Answer:</h2>
    <p className="text-gray-700 whitespace-pre-line">
      {/* Join finalized + interim transcript live */}
      {results.length > 0 || interimResult
        ? results.map(r => r.transcript).join(" ") + " " + interimResult
        : "No Answer Recorded! Speak Again"}
    </p>
  </div>
)}

      
    </div>
  );
};

export default RecordAnswerSection;
