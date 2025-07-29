# AI Mock Interviewer

This is a **Next.js** project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
The **AI Mock Interviewer** is a web application that simulates real-time mock interviews to help users prepare for job interviews. It features facial visibility detection using **MediaPipe**, personalized feedback, role-specific questions, and modern UI built with **TailwindCSS** and **Shadcn/UI**.

---

## 🚀 Features

* 🧠 AI-powered mock interview simulation
* 🎥 Real-time webcam face visibility detection
* 📋 Personalized question sets by role
* 📊 Instant feedback with scoring
* 🌙 Dark mode support
* 💾 Local storage for responses/history

---

## 📦 Tech Stack

* **Frontend:** Next.js, React.js, TailwindCSS, Shadcn/UI
* **Face Detection:** MediaPipe API
* **Backend:** Node.js, Express.js (planned)
* **Database:** MongoDB (planned)
* **Auth:** Email/OTP based (no JWT)

---

## 🛠️ Getting Started

To run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to use the app.

By default, the dashboard opens when the app starts.

---

---

## 🧪 How It Works

* Starts with email-based login using OTP
* Opens dashboard with role/category selection
* Starts mock interview session with webcam-based face detection
* Evaluates your responses and facial presence in real time

---

## 🧬 Future Enhancements

* Integrate speech-to-text to analyze spoken answers
* AI-based resume feedback
* Interview history dashboard
* Admin panel for adding custom questions

---

## 📤 Deployment

Deploy this app easily on [Vercel](https://vercel.com/new).
Refer to [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📚 Learn More

* [Next.js Docs](https://nextjs.org/docs)
* [TailwindCSS Docs](https://tailwindcss.com/docs)
* [MediaPipe](https://google.github.io/mediapipe/solutions/face_detection.html)
