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