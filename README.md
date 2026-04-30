<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>

<body>

  <h1> PinkWhisper – Real-Time Chat Application</h1>

  <h3>👩‍💻 Developed By</h3>
  <p>
    <strong>Name:</strong> Sadia Mabsurah <br>
    <strong>ID:</strong> 232-134-002
  </p>

  <h2>📌 Project Description</h2>
  <p>
    <strong>PinkWhisper</strong> is a simple and interactive real-time chat application
    that allows users to communicate instantly using text, emojis, images, and voice messages.
    It also provides live typing indicators and active user tracking for a better user experience.
  </p>

  <h2>✨ Features</h2>
  <ul>
    <li>💬 Instant real-time messaging</li>
    <li>😊 Built-in emoji picker</li>
    <li>🖼️ Image sharing support</li>
    <li>🎤 Voice message recording and sending</li>
    <li>⌨️ Live typing indicator</li>
    <li>👥 Active user count display</li>
    <li>📱 Clean and user-friendly interface</li>
  </ul>

  <h2>🛠️ Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Real-time Communication:</strong> Socket.IO</li>
    <li><strong>Networking:</strong> Client-Server Architecture over TCP/IP (via WebSocket)</li>
    <li><strong>Libraries:</strong> Moment.js, Font Awesome</li>
  </ul>

  <h2>📂 Project Structure</h2>
  <pre>
PinkWhisper/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── main.js
│
├── app.js
├── package.json
└── README.html
  </pre>

  <h2>🚀 How to Run</h2>
  <ol>
    <li>Install dependencies: <code>npm install</code></li>
    <li>Start the server: <code>npm run dev</code></li>
    <li>Open browser: <code>http://localhost:4000</code></li>
  </ol>

  <h2>⚙️ How It Works</h2>
  <ul>
    <li>Socket.IO enables real-time communication between users</li>
    <li>The server broadcasts messages instantly to all connected clients</li>
    <li>Images and audio are sent using Base64 encoding</li>
    <li>Typing indicators update in real-time</li>
    <li>Communication is based on a client-server model and runs over TCP/IP network protocols using WebSocket, which ensures reliable data transmission.</li>
  </ul>

  <h2>🎯 Learning Objectives</h2>
  <ul>
    <li>Understand real-time web communication</li>
    <li>Learn client-server architecture in networking</li>
    <li>Understand TCP/IP-based communication concepts</li>
    <li>Handle multimedia data in web applications</li>
    <li>Design interactive user interfaces</li>
  </ul>

  <h2>🔒 Limitations</h2>
  <ul>
    <li>No user authentication system</li>
    <li>No database (messages are not saved)</li>
  </ul>

  <h2>🌱 Future Improvements</h2>
  <ul>
    <li>Add login/signup system</li>
    <li>Store messages using database</li>
  </ul>

</body>
</html>
