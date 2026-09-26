const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");
const modeTitle = document.getElementById("mode-title");
const modeDescription = document.getElementById("mode-description");
const modeButtons = document.querySelectorAll(".mode-btn");

let currentMode = "chat";
let history = [];

const modeInfo = {
    chat: {
        title: "Chat",
        description: "Ask GenMate anything and get a helpful response.",
        placeholder: "Ask GenMate anything..."
    },

    summarize: {
        title: "Summarize",
        description: "Turn long text into a clear and concise summary.",
        placeholder: "Paste the text you want summarized..."
    },

    rewrite: {
        title: "Rewrite",
        description: "Make your writing clearer, polished, and natural.",
        placeholder: "Paste the text you want rewritten..."
    },

    brainstorm: {
        title: "Brainstorm",
        description: "Generate practical and creative ideas.",
        placeholder: "What would you like to brainstorm?"
    }
};


/* =========================
   MODE SELECTION
========================= */

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        modeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentMode = button.dataset.mode;

        modeTitle.textContent = modeInfo[currentMode].title;
        modeDescription.textContent = modeInfo[currentMode].description;
        messageInput.placeholder = modeInfo[currentMode].placeholder;
    });

});


/* =========================
   ADD MESSAGE
========================= */

function addMessage(text, sender) {

    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "ai" ? "✦" : "👤";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;

    message.appendChild(avatar);
    message.appendChild(content);

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
}


/* =========================
   LOADING MESSAGE
========================= */

function showTyping() {

    const message = document.createElement("div");
    message.className = "message ai";
    message.id = "typing-message";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "✦";

    const content = document.createElement("div");
    content.className = "message-content";

    content.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    message.appendChild(avatar);
    message.appendChild(content);

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
}


function removeTyping() {

    const typingMessage =
        document.getElementById("typing-message");

    if (typingMessage) {
        typingMessage.remove();
    }
}


/* =========================
   SEND MESSAGE
========================= */

async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    messageInput.value = "";
    messageInput.style.height = "auto";

    sendBtn.disabled = true;

    showTyping();

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message,
                mode: currentMode,
                history
            })

        });


        const data = await response.json();

        removeTyping();


        if (!response.ok) {
            throw new Error(
                data.error || "Something went wrong."
            );
        }


        addMessage(data.response, "ai");


        /* Store conversation history for future messages */

        history.push({
            role: "user",
            parts: [
                {
                    text: message
                }
            ]
        });

        history.push({
            role: "model",
            parts: [
                {
                    text: data.response
                }
            ]
        });


    } catch (error) {

        removeTyping();

        addMessage(
            "Sorry, I couldn't generate a response right now. Please try again.",
            "ai"
        );

        console.error("GenMate Error:", error);

    } finally {

        sendBtn.disabled = false;

        messageInput.focus();

    }

}


/* =========================
   SEND BUTTON
========================= */

sendBtn.addEventListener("click", sendMessage);


/* =========================
   ENTER TO SEND
========================= */

messageInput.addEventListener("keydown", event => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

    }

});


/* =========================
   AUTO-RESIZE TEXTAREA
========================= */

messageInput.addEventListener("input", () => {

    messageInput.style.height = "auto";

    messageInput.style.height =
        `${messageInput.scrollHeight}px`;

});


/* =========================
   CLEAR CHAT
========================= */

clearBtn.addEventListener("click", () => {

    history = [];

    chatBox.innerHTML = `
        <div class="welcome">
            <div class="welcome-icon">✦</div>

            <h2>Hey! I'm GenMate.</h2>

            <p>
                Your AI-powered productivity companion.
                Ask a question or choose a mode to get started.
            </p>
        </div>
    `;

    messageInput.value = "";
    messageInput.focus();

});