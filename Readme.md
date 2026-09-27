# GenMate

GenMate is a Generative AI-powered productivity assistant that provides a simple conversational interface for common productivity tasks.

The application uses Google's Gemini API to generate responses and is deployed using Vercel.

## Features

* **Chat** — Ask questions and get AI-generated responses.
* **Summarize** — Convert longer text into concise summaries.
* **Rewrite** — Improve clarity, polish, and readability of text.
* **Brainstorm** — Generate practical and creative ideas.
* Responsive and simple web interface.
* Serverless backend for secure API communication.
* Retry handling for temporary Gemini API failures.

## Tech Stack

* HTML5
* CSS3
* JavaScript
* Node.js
* Google Gemini API
* `@google/genai`
* Vercel Serverless Functions
* Vercel Hosting

## Project Structure

```text
GenMate/
├── api/
│   └── chat.js
├── app.js
├── index.html
├── package.json
├── package-lock.json
├── style.css
└── .gitignore
```

## How It Works

1. The user selects a GenMate mode and enters a request.
2. The frontend sends the request to the `/api/chat` serverless endpoint.
3. The backend selects the appropriate system instruction for the selected mode.
4. The backend sends the request to the Gemini API.
5. The generated response is returned to the frontend and displayed in the chat interface.

For temporary Gemini availability errors such as HTTP 503 or 429 responses, the backend automatically retries the request up to three times.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/KulShan0604/GenMate.git
cd GenMate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API key

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Do not commit the `.env` file or expose the API key publicly.

### 4. Run the project

The frontend can be opened locally using a local development server. The serverless API endpoint should be run through the Vercel development environment when testing the complete application locally.

## Deployment

GenMate is deployed on Vercel.

The production application is available at:

https://gen-mate.vercel.app

The Gemini API key is configured as a Vercel environment variable and is not stored in the source code.

## Limitations

* Responses depend on the availability of the external Gemini API.
* AI-generated responses may occasionally contain inaccurate information.
* The application does not currently persist conversations in a database.

## Future Improvements

* Conversation history and persistent sessions.
* User authentication.
* Additional productivity modes.
* Streaming AI responses.
* Improved response formatting.
* Usage analytics and monitoring.
* Optional database-backed storage.

## Project Purpose

GenMate was developed as a Generative AI project to demonstrate the integration of a modern AI model into a practical productivity-focused web application.
