"use client";

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockId, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log("Feedback Data: ", result);
    setFeedbackList(result);
  };

  return (
    <div className="p-10">
      
        {feedbackList?.length==0?
        <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>:
        <>
        <h2 className="text-4xl font-bold text-green-600">Interview Done!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback.</h2>
      
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-grey-200">
        Find below interview questions with correct answers, your answers, and feedback.
      </h2>

      {feedbackList.map((item, index) => (
        <Collapsible key={index} className="my-5">
          <CollapsibleTrigger className="flex gap-5 justify-between p-2 bg-secondary rounded my-2 text-left w-full">
            {item.question} <ChevronsUpDown className='h-5 w-5'/>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 py-2 space-y-2">
          <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 p-2 border rounded'><strong>Rating:</strong> {item.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-100 text-sm text-red-900'><strong>User Answer: </strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
          </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      
      
    </>}
    <Button
    className="my-2"
     onClick={()=>router.replace('/dashboard')
      }>Go Home</Button>
    </div>
  );
};

export default Feedback;
