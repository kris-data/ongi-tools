(function(){
  const timerEl = document.getElementById('timer');
  const breatheEl = document.getElementById('breathe');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const statusEl = document.getElementById('status');
  const checklist = document.getElementById('checklist');
  const doneMsg = document.getElementById('doneMsg');
  const shareBtn = document.getElementById('shareBtn');
  let remaining = 90, iv = null, phase = 0;
  function format(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function setBreathe(){['들이마시기 4… / Inhale 4','멈춤 2… / Hold 2','내쉬기 4… / Exhale 4'].forEach((t,i)=>{if(i===phase%3)breatheEl.textContent=t});}
  function tick(){
    remaining--;
    if(remaining<0){clearInterval(iv);iv=null;timerEl.textContent='00:00';statusEl.textContent='완료! / Done';checklist.hidden=false;resetBtn.removeAttribute('aria-disabled');try{navigator.vibrate&&navigator.vibrate([100,50,100]);}catch(e){};return;}
    timerEl.textContent=format(remaining);
    const cycle=(90-remaining)%10; if(cycle===0||cycle===4||cycle===6){phase++;setBreathe();}
  }
  startBtn&&startBtn.addEventListener('click',()=>{ if(iv) return; remaining=90;phase=0;timerEl.textContent=format(remaining);setBreathe();statusEl.textContent='진행 중… / Running';checklist.hidden=true;doneMsg.hidden=true;iv=setInterval(tick,1000);resetBtn.setAttribute('aria-disabled','true');});
  resetBtn&&resetBtn.addEventListener('click',()=>{ if(iv){clearInterval(iv);iv=null;} remaining=90;phase=0;timerEl.textContent=format(remaining);breatheEl.textContent='들이마시기 4… / Inhale 4';statusEl.textContent='';checklist.hidden=true;doneMsg.hidden=true;});
  checklist&&checklist.addEventListener('change',()=>{const checks=checklist.querySelectorAll('input[type="checkbox"]');doneMsg.hidden=!Array.from(checks).every(c=>c.checked);});
  shareBtn&&shareBtn.addEventListener('click',async(e)=>{e.preventDefault();const d={title:'90초 쿨다운 타이머',text:'급한 답장을 늦추고 마음을 가다듬었습니다. #Cooldown90 #WarmthTools',url:location.href.split('#')[0]};try{if(navigator.share){await navigator.share(d);}else{await navigator.clipboard.writeText(d.text+' '+d.url);alert('공유 문구를 복사했습니다.');}}catch(err){}});
  document.querySelectorAll('#langToggle button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#langToggle button').forEach(x=>x.classList.remove('active'));b.classList.add('active');}));
})();