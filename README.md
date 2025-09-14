Turtlemint Frontend
Frontend for Turtlemint Insurance Dashboard built with Next.js and Gemini API for dynamic JSON generation.

📌 Tech Stack
Framework: Next.js 15 (React 19, Turbopack)


Styling: TailwindCSS, Framer Motion


API: Gemini API (Google Generative AI)


Database: MongoDB (Mongoose)


Other Libraries: i18next, Axios, React Hook Form, Lucide React Icons



⚙️ Installation
Clone the repo:

 git clone https://github.com/your-org/turtlemint-frontend.git
cd turtlemint-frontend


Install dependencies:

 npm install
# or
yarn install


Create a .env.local file in the project root with the following values:

 NODE_ENV="development"

# Gemini API config
NEXT_PUBLIC_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
 🔑 Replace your-gemini-api-key-here with your actual Gemini API key.



Run the development server:

 npm run dev


Open http://localhost:3000 🚀



🛣️ Routes
/login – User login


/signup – New user registration


/dashboard – Main dashboard


/customers – Customer management


/payment – Payments view


/claim – Claim submission and tracking


/remainder – Policy reminders


/compare-policies – Compare different insurance policies



🔮 Future Features
Auto-generation of claim letters using Gemini API.


Multi-language support with i18next.


Policy recommendation engine.



📝 Scripts
npm run dev       # Start dev server (Turbopack)
npm run build     # Build production bundle
npm run start     # Start production server
npm run lint      # Run ESLint


