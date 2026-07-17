# QR Event System — Frontend

React frontend for [QR Event System](https://qr-event-system-theta.vercel.app), a lightweight event check-in platform: create an event, share a QR code, and watch attendees check themselves in.

Backend repo: [QR_Event_System_Backend](https://github.com/nishthagupta09/QR_Event_System_Backend)

## Features

- **Create Event** — organizers enter a title, location, date, and time to generate an event
- **Dashboard** — shows event details, a live QR code linking to check-in, and the real-time attendee list
- **Check-In** — attendees scan the QR code, submit their name and email, and are checked in (duplicate check-ins are blocked)

## Pages / Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page — create an event or jump to an existing dashboard by code |
| `/create` | Create Event | Form to create a new event |
| `/dashboard/:eventCode` | Dashboard | Event details, QR code, and live attendee list |
| `/check-in` | Check-In | Attendee-facing form, reached by scanning the event QR code |

## Tech Stack

- React + Vite
- React Router
- Axios
- Tailwind CSS
- `react-qr-code` for QR generation
- Deployed on Vercel

## Running Locally

\`\`\`bash
git clone https://github.com/nishthagupta09/QREventSystem_Frontend.git
cd QREventSystem_Frontend
npm install
npm run dev
\`\`\`

The app runs at \`http://localhost:5173\`.

## Notes

The API base URL is currently hardcoded to the deployed backend (\`https://qr-event-system-backend.onrender.com\`) in each page component. If you're running the backend locally, update these URLs (or move them into a \`.env\` file with \`VITE_API_URL\`) before testing check-in and dashboard flows end-to-end.
