let time=90, timerId;
function updateTimer(){ 
  const m=String(Math.floor(time/60)).padStart(2,'0'); 
  const s=String(time%60).padStart(2,'0'); 
  document.getElementById('timer').textContent=`${m}:${s}`;
}
function startTimer(){ if(timerId) return; timerId=setInterval(()=>{ if(time>0){ time--; updateTimer(); } },1000); }
function resetTimer(){ clearInterval(timerId); timerId=null; time=90; updateTimer(); }
document.addEventListener('DOMContentLoaded', updateTimer);
