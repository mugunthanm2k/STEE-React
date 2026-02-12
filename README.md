## 📌 Secure Test Environment Enforcement

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss)

### 🧭 Objective

The objective of this project is to simulate a secure, locked-down, auditable browser-based assessment environment for high-stakes candidate evaluations.

**The system ensures that:**

- Candidates remain focused on the test window
- Distractions and misuse are detected
- All suspicious activities are logged
- A complete, timestamped audit trail is maintained

This implementation follows the requirements outlined in the Secure Test Environment Enforcement – Problem Definition Document.

---

### 🔗Live Demo 

👉 

### 🔗 Repo 

👉 https://github.com/mugunthanm2k/STEE-React

---

### 🚀 Features

**1️⃣ Browser Enforcement**

****🔍 Focus & Tab Monitoring****

- Detects tab switches (visibilitychange)
- Detects window blur/focus loss
- Detects multiple tabs using BroadcastChannel
- Treats any focus loss as a violation
- Displays immediate warning overlay
- Increments violation counter

****🔐 Fullscreen Enforcement****

- Automatically enters fullscreen mode on load
- Detects fullscreen exit attempts
- Logs fullscreen violations

🚫 Copy / Paste Prevention

- Prevents copy attempts
- Prevents paste attempts
- Logs all misuse attempts


**2️⃣ Unified Event Logging System**

****📑 Event Schema****
Each event follows a structured and unified format:
```json
{
  "eventType": "tab_switch",
  "timestamp": "2026-02-12T10:30:00.000Z",
  "attemptId": "ATTEMPT_001",
  "questionId": "Q1",
  "metadata": {
    "browser": "...",
    "focusState": true,
    "url": "https://example.com"
  }
}
```
****📦 Logging Capabilities****

- Logs all browser enforcement events
- Logs fullscreen activity
- Logs focus restoration
- Logs copy/paste attempts
- Persists logs in localStorage
- Batches and sends logs to backend every 10 seconds
- Prevents log loss during refresh/offline scenarios

---
## 🛠 Tech Stack
```
React (Vite) || Tailwind CSS || Browser APIs:
                                ├── visibilitychange
                                ├── blur / focus
                                ├── BroadcastChannel
                                ├── Fullscreen API
                                ├── localStorage
                                ⌊_ fetch
```
---

## ▶️ How to Run
**1️⃣ Clone the Repository**
```bash
git clone https://github.com/mugunthanm2k/STEE-React.git
cd secure-test-enforcement
```
**2️⃣ Install Dependencies**
```bash
npm install
```
**3️⃣ Start Development Server**
```bash
npm run dev
```
**4️⃣ Open in Chrome**

Open the application in Google Chrome and test the following:

- Switch tabs
- Open another tab of the same app
- Minimize window
- Attempt copy/paste
- Exit fullscreen

You will see:

- Violation counter increment
- Warning overlay displayed
- Console audit logs

---

## 🏗 Architecture Overview
🔹 Component Structure
```
STEE-React/
│   📂src/
│   ├── logger.js
│   ├── useFocusGuard.js
│   └── App.jsx          # Main app component
│
├── public/              # Static files
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```
---

## 🔐 Security Considerations

- Events are timestamped and immutable once stored
- Logs persist during refresh/offline
- Batch submission reduces backend load
- Multiple tab detection uses same-origin communication
- Violations are throttled to prevent event spam

---

## 📈 Future Enhancements

- Backend integration with Spring Boot
- Server-side log immutability enforcement
- Attempt termination after max violations
- Timer-based assessment module
- Screenshot monitoring (if allowed)
- WebSocket real-time monitoring dashboard for employers

---

## ✅ Conclusion

This project demonstrates how a browser-based assessment platform can enforce focus, prevent misuse, and maintain a secure, auditable testing environment using modern web APIs and React architecture.
The implementation is modular, scalable, and production-ready for backend integration.

