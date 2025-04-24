
🪙 Real-Time Crypto Price Tracker
A responsive frontend React app that displays live cryptocurrency price changes using Redux Toolkit and mocked real-time updates.

🚀 Features
Displays 5 top cryptocurrencies in a table

Real-time updates every 1–2 seconds (price, % changes, volume)

All state managed via Redux Toolkit (no local state)

Color-coded % changes (green for gain, red for loss)

Static 7-day chart

Fully responsive layout

🧰 Tech Stack
React + Vite

Redux Toolkit + React-Redux

Tailwind CSS

JavaScript

Simulated WebSocket using setInterval

📁 Setup Instructions
Clone the repo


git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker
Install dependencies


npm install
Start the app


npm run dev
Open http://localhost:5173 in your browser

🧬 Architecture
Simulated WebSocket (setInterval) dispatches Redux actions

Redux store holds and updates all crypto data

Components subscribe using useSelector

📹 Demo
Include your demo GIF or video here (UI + updates + Redux flow)

