"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StartInterview = ({params}) => {
     const [interviewData, setInterviewData] = useState(null);
        const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
        const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
      useEffect(() => {
        GetInterviewDetails();
      }, []);
    
      const GetInterviewDetails = async () => {
  try {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    if (!result || result.length === 0) {
      console.error("No interview data found for ID:", params.interviewId);
      return;
    }

    const rawJson = result[0].jsonMockResp;

    if (!rawJson) {
      console.error("jsonMockResp is missing for interview ID:", params.interviewId);
      return;
    }

    const jsonMockResp = JSON.parse(rawJson);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
  } catch (err) {
    console.error("Failed to fetch or parse interview data:", err);
  }
};

return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/*Questions*/}
            <div className='my-10'>
                <QuestionsSection 
                    mockInterviewQuestions={mockInterviewQuestions} 
                    activeQuestionIndex={activeQuestionIndex}
                />
                <div className='flex justify-end gap-8 mt-5'>
                  {activeQuestionIndex > 0 && 
                    <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
                  {activeQuestionIndex != mockInterviewQuestions.length - 1 && 
                    <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
                    
                  {activeQuestionIndex == mockInterviewQuestions.length - 1 && 
                  <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                    <Button>End Interview</Button>
                  </Link>
                }
        </div>
            </div>
            

            {/*Video Audio Recording*/}
            <RecordAnswerSection
            mockInterviewQuestions={mockInterviewQuestions} 
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        
    </div>
  )
}

export default StartInterview