"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `
Job Position: ${jobPosition}
Job Description: ${jobDesc}
Years of Experience: ${jobExperience}

Please generate exactly 5 interview questions and answers in valid JSON format.
Each object must follow this structure:
{ "question": "string", "answer": "string" }
Only return the JSON array — no explanation, no markdown.
`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let rawText = await result.response.text();

      const cleanedText = rawText
        .replace(/```json|```/g, "")
        .trim();

      const parsed = JSON.parse(cleanedText);

      if (!Array.isArray(parsed) || parsed.length !== 5) {
        throw new Error("AI response does not contain exactly 5 questions.");
      }

      const mockId = uuidv4();
      await db.insert(MockInterview).values({
        mockId,
        jsonMockResp: JSON.stringify(parsed),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      setOpenDialog(false);
      router.push(`/dashboard/interview/${mockId}`);
    } catch (error) {
      console.error("Error generating or saving questions:", error);
      alert("Something went wrong while generating the interview questions. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2>
                    Add details about your job position, job description, and
                    years of experience.
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Role / Position</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="my-5">
                    <label className="text-black">
                      Job Description / Tech Stack (In Short)
                    </label>
                    <Textarea
                      className="placeholder-opacity-50 mt-1"
                      placeholder="Ex. React, Angular, Node.js, MySQL"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>

                  <div className="my-5">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 3"
                      type="number"
                      max="50"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2" />
                        Generating from AI...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
