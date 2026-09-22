const speechArea = document.querySelector("#speech-area");
const speechBubble = document.querySelector("#speech-bubble");
const beverage = document.querySelector("#beverage");
const beverageOutput = document.querySelector("#beverage-output");
const sun = document.querySelector("#sun");
const stickerArea = document.querySelector("#sticker-area");

const showSpeech = () => {
    speechBubble.style.display = "block";
};

const showBeverage = () => {
    beverageOutput.textContent = beverage.value + ": Nice Choice!";
};

const addSticker = () => {
    const emoji = document.createElement("span");
    emoji.textContent = "🌞";
    emoji.classList.add("emoji");
    stickerArea.appendChild(emoji);
};

speechArea.addEventListener("click", showSpeech);
beverage.addEventListener("change", showBeverage);
sun.addEventListener("click", addSticker);
