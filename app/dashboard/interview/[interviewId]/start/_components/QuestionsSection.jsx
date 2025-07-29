import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {
    const textToSpeech = (text) => {
        if('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }else {
            alert("Sorry, your browser does not support text-to-speech.");
        }
    }

    return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg my-5 flex flex-col justify-between">
        <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestions &&
            mockInterviewQuestions.map((question, index) => (
              <h2
                className={`p-2 rounded-full transition-all text-center
  ${
    activeQuestionIndex === index
      ? "bg-primary text-secondary"
      : "bg-muted text-muted-foreground"
  }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-sm md:text-lg">
          {mockInterviewQuestions[activeQuestionIndex]?.question}
        </h2>
        <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}/>
        </div>
        <div className="border rounded-lg p-3 bg-blue-100 items-baseline mt-5">
          <h2 className="flex gap-2 items-end text-blue-700 py-2">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-bold">
            Click on <strong>Record Answer</strong> when you're ready to answer
            the question.At the end of interview we will give you the feedback
            along with correct answer for each of question and your answer to
            compare it.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
