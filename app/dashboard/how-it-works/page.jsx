// app/dashboard/how-it-works/page.tsx

import React from 'react';
import { Lightbulb, UserPlus, Mic, ClipboardList, Smile } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Sign In / Sign Up",
    description:
      "Begin by signing into your account or creating a new one. This ensures your interviews and progress are securely stored.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    id: 2,
    title: "View Dashboard",
    description:
      "After login, your dashboard displays all your past interview sessions. If you're new, it will be clean — ready to begin!",
    icon: <ClipboardList className="w-8 h-8 text-primary" />,
  },
  {
    id: 3,
    title: "Start New Interview",
    description:
      "Click 'New Interview' and a popup will prompt you to enter basic details like your name, domain, and preferred skills.",
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
  },
  {
    id: 4,
    title: "Answer AI Questions",
    description:
      "AI generates 5 domain-based questions. You can record answers, skip any question, or review your recorded responses live.",
    icon: <Mic className="w-8 h-8 text-primary" />,
  },
  {
    id: 5,
    title: "Submit & Get Feedback",
    description:
      "Once done, submit your interview. AI evaluates your answers and gives personalized feedback to help you improve.",
    icon: <Smile className="w-8 h-8 text-primary" />,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-primary">How It Works?</h1>

      <div className="flex flex-col gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition flex items-start gap-4"
          >
            <div className="bg-accent p-3 rounded-full">{step.icon}</div>
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {step.id}. {step.title}
              </h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Motivation Section */}
      <div className="mt-16 p-8 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">💡 Tips to Grow and Succeed</h2>
        <ul className="list-disc ml-6 space-y-2 text-lg">
          <li>Practice consistently – treat every mock interview like a real one.</li>
          <li>Review your answers and understand where you can improve.</li>
          <li>Focus on clarity, confidence, and structure while answering.</li>
          <li>Stay updated with your domain and related technologies.</li>
          <li>Remember: Every expert was once a beginner. Keep going!</li>
        </ul>
        <p className="mt-6 text-xl font-medium italic text-center">
          “Confidence comes from preparation. Let AI help you become interview-ready.”
        </p>
      </div>
    </div>
  );
}
