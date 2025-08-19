const quoteBox = document.getElementById("quote-box");

async function loadQuotes() {
  const res = await fetch("../../data/healing/quotes.json");
  return await res.json();
}

async function startCooldown() {
  const quotes = await loadQuotes();
  let timeLeft = 90;
  let quoteIndex = 0;

  const timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = 
        `${String(Math.floor(timeLeft/60)).padStart(2,'0')}:${String(timeLeft%60).padStart(2,'0')}`;

    // 10초마다 명언 교체
    if (timeLeft % 10 === 0) {
      quoteBox.innerText = quotes[quoteIndex % quotes.length];
      quoteIndex++;
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      quoteBox.innerText = "끝났습니다. 이제 선택할 시간이에요.";
    }
  }, 1000);
}
