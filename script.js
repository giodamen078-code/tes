const numberDisplay = document.querySelector(".number");
const typedNumber = document.querySelector(".typedNumber");
const checkBtn = document.querySelector(".check");
const tryAmountDisplay = document.querySelector(".tryamount");
const highScoreDisplay = document.querySelector(".highScore");
const box = document.querySelector(".box");
const messageDisplay = document.querySelector(".message");

let xNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

function checkGuess() {
    const guess = Number(typedNumber.value);

    if (!guess) {
        messageDisplay.textContent = "⛔ შეიყვანე რიცხვი!";
        return;
    }

    if (guess === xNumber) {
        // --- გამარჯვება ---
        messageDisplay.textContent = "🎉 გამოიცანი!";
        numberDisplay.textContent = xNumber;
        document.body.style.backgroundColor = "#45fa0e";
        box.style.width = "300px";
        box.classList.add("win-animation");
        
        // კონფეტის გაშვება
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        if (score > highscore) {
            highscore = score;
            highScoreDisplay.textContent = highscore;
        }
    } else {
        // --- შეცდომა ---
        if (score > 1) {
            score--;
            tryAmountDisplay.textContent = score;
            messageDisplay.textContent = guess > xNumber ? "📈 ზედმეტად ბევრია!" : "📉 ზედმეტად ცოტაა!";
            
            // შეჯანჯღარების ეფექტი ინპუტზე
            typedNumber.classList.add("shake-it");
            setTimeout(() => typedNumber.classList.remove("shake-it"), 200);
            
        } else {
            messageDisplay.textContent = "💥 თამაში წააგეთ!";
            tryAmountDisplay.textContent = 0;
            document.body.style.backgroundColor = "#b34747";
        }
    }
}

checkBtn.addEventListener("click", checkGuess);
typedNumber.addEventListener("keydown", (e) => { if (e.key === "Enter") checkGuess(); });

document.querySelector(".againBtn").addEventListener("click", function() {
    score = 20;
    xNumber = Math.floor(Math.random() * 20) + 1;
    messageDisplay.textContent = "დაიწყე გამოცნობა...";
    tryAmountDisplay.textContent = score;
    numberDisplay.textContent = "?";
    typedNumber.value = "";
    document.body.style.backgroundColor = "#333";
    box.style.width = "200px";
    box.classList.remove("win-animation");
});