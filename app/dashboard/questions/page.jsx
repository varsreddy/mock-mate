// app/dashboard/questions/page.tsx

import React from 'react';

const questions = [
  {
    category: "Technical",
    questions: [
      "Can you explain the difference between REST and GraphQL?",
      "What are the main principles of Object-Oriented Programming?",
      "How does JavaScript's event loop work?",
      "What is the difference between SQL and NoSQL databases?",
      "Explain how Git works internally."
    ]
  },
  {
    category: "Behavioral",
    questions: [
      "Tell me about a time you faced a challenge and how you overcame it.",
      "How do you handle tight deadlines or pressure?",
      "Describe a situation where you worked in a team and had a conflict.",
      "Why do you want to join this company?",
      "Where do you see yourself in 5 years?"
    ]
  },
  {
    category: "Domain-Based (e.g., Web Development)",
    questions: [
      "What happens when you type a URL in the browser?",
      "How do you optimize a React app for performance?",
      "Can you explain the virtual DOM?",
      "What are the differences between var, let, and const in JavaScript?",
      "How would you handle SEO in a single-page application?"
    ]
  }
];

export default function QuestionsPage() {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">Frequently Asked Interview Questions</h1>

      {questions.map((section, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{section.category} Questions</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            {section.questions.map((q, i) => (
              <li key={i} className="hover:text-primary transition">{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
