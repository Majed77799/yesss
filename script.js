// API Key سيتم وضعها من خلال Vercel Environment Variables
const API_KEY = process.env.OPENAI_API_KEY; 

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const aiReply = data.choices[0].message.content;
  addMessage("ai", aiReply);
}

function addMessage(role, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.classList.add("message", role);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function newChat() {
  document.getElementById("chatBox").innerHTML = "";
}
