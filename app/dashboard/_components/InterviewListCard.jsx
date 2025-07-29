import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const InterviewListCard = ({interview}) => {

  return (
    <div className='border shadow-sm rounded-lg p-3 my-2'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At: {interview?.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Link href={"/dashboard/interview/"+interview?.mockId+"/feedback"}>
            <Button className="w-full" size="sm" variant="outline">Feedback</Button>
            </Link>
            <Link href={'/dashboard/interview/'+interview?.mockId+'/start'}>
            <Button className="" size="sm">Re-Start</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewListCard