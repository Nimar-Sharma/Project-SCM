(function() {
  "use strict";

  const responses = {
    greetings: [
      "Hello there! 👋",
      "Hi! How can I assist you? 🤖",
      "Hey! What's up? 🚀",
      "Greetings, human! 👽",
      "Yo! 😎"
    ],
    default: [
      "I'm thinking... 🤔",
      "Interesting!",
      "Let's talk more!",
      "Maybe yes, maybe no!",
      "The universe is full of mysteries. 🌌",
      "How can I help you today?",
      "Can you rephrase that?",
      "Nice to hear from you! ✨",
      "I'm always learning!",
      "Tell me more! 🔥",
      "Good question!",
      "I don't know about that. 🤷",
      "I'm still processing that... 🧠",
      "Access denied! 🚫",
    ]
  };
  const submit = document.querySelector(".chat-submit");
  const chatBox = document.querySelector(".chat-box");
  const chatInput = document.querySelector(".chat-input");

  function chatTemplate(aiOrPerson) {
    return `
      <div class="ai-person-container">
        <div class="${aiOrPerson.class}">
          <p>${aiOrPerson.text}</p>
        </div>
        <span class="${aiOrPerson.class}-date">${aiOrPerson.date}</span>
      </div>
    `;
  }

  submit.addEventListener("click", function() {
    appendChatBox(true);
  });

  document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      appendChatBox(true);
    }
  });

  function appendChatBox(fromPerson) {
    const date = new Date();
    if (fromPerson && !chatInput.value.trim()) {
      return;
    }
    const timestamp = date.toLocaleTimeString();
    const newChatDiv = chatTemplate({
      class: fromPerson ? "person" : "ai",
      text: fromPerson ? chatInput.value.trim() : aiResponse(chatInput.value.trim()),
      date: timestamp
    });

    if (fromPerson) {
      chatBox.innerHTML += newChatDiv;
      chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
      chatInput.value = "";
      // Fake typing indicator
      const typingDiv = chatTemplate({
        class: "ai",
        text: "Typing...",
        date: new Date(new Date().getTime() + 1000).toLocaleTimeString()
      });

      setTimeout(() => {
        chatBox.innerHTML += typingDiv;
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });

        // Replace typing after 2s
        setTimeout(() => {
          // Remove the "Typing..." message
          chatBox.removeChild(chatBox.lastElementChild);

          const aiReplyDiv = chatTemplate({
            class: "ai",
            text: aiResponse(chatInput.value.trim()),
            date: new Date().toLocaleTimeString()
          });
          chatBox.innerHTML += aiReplyDiv;
          chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
        }, 2000);

      }, 500);

    }
  }
  function aiResponse(userInput) {
    const cleanedInput = userInput.toLowerCase();
    if (cleanedInput.includes("hi") || cleanedInput.includes("hello") || cleanedInput.includes("hey")) {
      return randomItem(responses.greetings);
    }
    return randomItem(responses.default);
  }

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

})();