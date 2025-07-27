# ReviewSync

> ⚠️ **Warning:** The ReviewSync platform uses WebSockets for real-time code editing. And the live link is deployed on [Render](https://render.com), be aware that Render does **not** support WebSockets. This may cause real-time features to not work as expected.

ReviewSync is a code review platform designed to streamline and manage code review processes efficiently. It features a client-server architecture for seamless collaboration.

## How to Run

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ReviewSync
    ```

2. **Install dependencies:**
    - For the server:
      ```bash
      cd server
      npm install
      ```
    - For the client:
      ```bash
      cd ../client
      npm install
      ```

3. **Start the server:**
    ```bash
    cd ../server
    node server.js
    ```

4. **Start the client:**
    ```bash
    cd ../client
    npm run dev
    ```

5. Open your browser and navigate to the client URL (usually `http://localhost:3000`).

## Folder Structure

```
ReviewSync/
├── client/   # Frontend application
├── server/   # Backend API and logic
└── README.md
```

## Technologies Used

- **Client:** React, JavaScript, TailwindCSS
- **Server:** Node.js, Express, MongoDB
- **Other:** Socket.io, google/genai, passport, react hook form, yup resolver, monaco editor
