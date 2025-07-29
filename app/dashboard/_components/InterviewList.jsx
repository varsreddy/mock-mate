// "use client";

// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { desc, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import InterviewListCard from "./InterviewListCard";

// const InterviewList = () => {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);

//   useEffect(() => {
//     user && GetInterviewList();
//   }, [user]);

//   const GetInterviewList = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(
//         eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
//       )
//       .orderBy(desc(MockInterview.id));

//     console.log(result);
//     setInterviewList(result);
//   };

//   return (
//     <div>
//       <h2 className="font-medium text-xl">Previous Mock Interview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
//         {interviewList.length > 0 &&
//           interviewList.map((interview, index) => (
//             <InterviewListCard key={index} interview={interview} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default InterviewList;






"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewListCard from "./InterviewListCard";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>

      {loading ? (
        <p className="text-gray-500 italic mt-4 animate-pulse">
          Hold tight! Even interviews need time to remember themselves.
        </p>
      ) : interviewList.length === 0 ? (
        <p className="text-gray-600 italic mt-4">
          You haven’t given any mock interviews yet. Time to sharpen your skills!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
          {interviewList.map((interview, index) => (
            <InterviewListCard key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
