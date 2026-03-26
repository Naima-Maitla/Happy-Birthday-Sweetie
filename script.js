let nm='',ag=0,hb='',pr='',grp='';
let surpList=[],surpIdx=0,surpTimer=null;
let aCtx=null,mOn=false,mNodes=[];

/* ── ORBS ── */
function buildOrbs(){
  const m=document.getElementById('mesh');m.innerHTML='';
  const pal={
    kids:['#ff6b35','#ff3d9a','#ffd60a','#00c9a7','#ff006e'],
    teen:['#8b5cf6','#ec4899','#06d6a0','#6366f1','#a78bfa'],
    adult:['#d4af37','#c9a227','#b8860b','#e8d5a3','#8b7536'],
    def:['#a78bfa','#f472b6','#fbbf24','#60a5fa','#4ade80']
  };
  const cols=pal[grp]||pal.def;
  for(let i=0;i<5;i++){
    const o=document.createElement('div');o.className='orb';
    const sz=Math.random()*320+180;
    o.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;background:${cols[i%cols.length]};--d:${Math.random()*8+8}s;--tx:${(Math.random()-.5)*80}px;--ty:${(Math.random()-.5)*80}px;animation-delay:${Math.random()*-12}s;opacity:${grp==='adult'?0.18:0.3};`;
    m.appendChild(o);
  }
}
buildOrbs();

/* ── CURSOR ── */
const cE=['✨','💫','⭐','🌟','💖','🎀','🦋','🌸','🎉','💕'];
document.addEventListener('click',e=>{
  for(let i=0;i<3;i++) setTimeout(()=>{
    const el=document.createElement('div');el.className='csp';
    el.textContent=cE[Math.floor(Math.random()*cE.length)];
    el.style.left=(e.clientX+Math.random()*30-15)+'px';
    el.style.top=(e.clientY+Math.random()*30-15)+'px';
    document.body.appendChild(el);setTimeout(()=>el.remove(),900);
  },i*80);
});

/* ── NAV ── */
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');}
function shake(el){el.style.borderColor='#f87171';setTimeout(()=>el.style.borderColor='',900);}

function g2(){
  const v=document.getElementById('nInp').value.trim();
  if(!v){shake(document.getElementById('nInp'));return;}
  nm=v;document.getElementById('s2t').textContent=`How old are you turning, ${nm}? 🎂`;show('s2');
}
function g3(){
  const v=parseInt(document.getElementById('aInp').value);
  if(!v||v<1||v>120){shake(document.getElementById('aInp'));return;}
  ag=v;grp=ag<=11?'kids':ag<=19?'teen':'adult';
  document.body.className=grp;buildOrbs();show('s3');
}
function g4(){show('s4');}

let picks={};
function pick(type,val,el){
  document.querySelectorAll(`#s${type==='h'?3:4} .opt`).forEach(o=>o.classList.remove('sel'));
  el.classList.add('sel');picks[type]=val;
  if(type==='h')hb=val;else pr=val;
}

/* ── WISHES ── */
function getWishes(){
  const hw={
    music:{f:` dua for you k Tumhari playlist itni fire ho ke Spotify bhi tum se jealous ho jaye aur Shazam confuse! 🎧😂`,d:`Allah tala tumhe aisi success de jis mein beats bhi hon, rhythm bhi aur har pal mein music! 🎵`},
    art:{f:`dua for you k Tumhara talent itna zyada ho ke Mona Lisa bhi teri selfie dekh ke resign kar de! 🎨😂`,d:`Allah tala tumhari creativity ko itna barh de ke duniya teri art yaad kare saalon tak! ✨`},
    travel:{f:`dua for you k Itna travel karo ke passport bhi extra pages maange aur airline wale tumhara naam yaad kar lein! ✈️😂`,d:`Allah tala tumhe duniya ki khubsurti dikhaaye aur har safar mein khair o barkat ho! 🌍`},
    food:{f:`dua for you k Itna khaao ke calories bhi teri bestie ban jayein aur diet apps teri friend list se delete ho jayein! 🍰😂`,d:`Allah tala tumhara rizq itna barkat wala kare ke table hamesha bhari rahe, mehman hamesha khush jayein! 🍽️`},
    books:{f:`dua for you k Itni books paro ke library wale tumhara naam honorary member rakh dein aur Google Tumse advice maange! 📚😂`,d:`Allah tala tumhe ilm ki aisi daulat de jis se duniya roshan ho aur khud ka dil bhi sukoon se bhara rahe! 📖`},
    gaming:{f:`dua for you k Itni achi gamer bano ke boys scared ho jayein, tum unhe school karo aur woh GG bol ke chale jayein! 🎮😂`,d:`Allah tala tumhara level life mein bhi aise hi barhayen jaise games mein barhaty hai, har stage easy lagey! 🏆`},
    fashion:{f:`dua for you k Tumhara outfit itna drip ho ke rain bhi tum se fashion tips maange aur VOGUE tum ko hire karna chahe! 👗😂`,d:`Allah tala tumhen hamesha woh pehnaayen jo tumhari personality se match kare aur har jagah respect mile! 💫`},
    nature:{f:`dua for you k Itna nature se pyaar karo ke plants bhi tumse advice maangein aur bees tumhare gird chakkar kaatein! 🌿😂`,d:`Allah tala ki qudrat ki tarah tumhari zindagi bhi hamesha fresh, green aur khubsurat rahe! 🌱`}
  };
  const pw={
    bestie:`Tumhari bestie ne zaroor aaj dil se dua ki hogi — aisi dosti bohot rare hai, sambhal ke rakhna! 👯‍♀️💕`,
    family:`Family ka pyaar sab se bada tohfa hai — aur tumhara family tum pe faqr karta hai aaj! 👨‍👩‍👧❤️`,
    crush:`Jo tumhara dil jeeta, kaash woh aaj tumhare upar bilkul fida ho jaye! 🦋 (Allah kare ho bhi! 😂💜)`,
    solo:`Sabse bada celebration khud apne saath hota hai — YOU are the whole party, babe! 👑🎉`
  };
  const aw={
    kids:{
      main:`🎉 ${nm}, aaj ka din sirf aur sirf TUMHARA hai! Duniya mein sabse zyada muskurane wali, sabse cute, sabse amazing ladki tum ho! Cake khao, khelo — aaj koi bhi nahi roke ga! 🎈`,
      f:`Itni cute ho ke puppies bhi tumse jealous hote hain! Aur itni smart ho ke teacher secretly tumse notes lete hain! 😂🌟`,
      d:`Allah tala tumhen hamesha khush rakhen, tumhara har din muskurahat se bhara ho, aur tumhari har tamanna poori ho. Ameen! 🤲✨`
    },
    teen:{
      main:`✨ ${nm}! You're THAT girl. The one everyone secretly wants to be but can't — kyunki there's literally only ONE you! Happy Birthday to the most iconic person in the room! 👑`,
      f:`Tumhari glow up itni strong hai ke sunscreen wale tumhe brand ambassador banana chahte hain! Tumhara aesthetic itna on point hai ke Pinterest tumse inspo leta hai! 😂💅`,
      d:`Allah tala tumhare dreams ko wings den, har exam mein success ho, jo bhi chahti ho woh mil jaye — halal tareeqe se ofcourse! 😉 Ameen! 🤲`
    },
    adult:{
      main:`🌹 Dearest ${nm}, another year of becoming more of who you were always meant to be. Your grace, your strength, your quiet elegance — they only grow more luminous with time. This is YOUR year.`,
      f:`Ab ap officially "experienced" hain! Age sirf number hai — tumhari vibe toh hamesha 21 wali rahegi. Log poochenge secret, ap kahogi: moisturizer, attitude, aur chai! 😂✨`,
      d:`Allah tala apki zindagi ko barkat, sukoon aur khushi se bhar den. Jis cheez ke liye mehnat ki woh mil jaye Inshaallah, jis ki dua ki woh qabool ho. Ameen! 🤲🌸`
    }
  };

  const h=hw[hb]||{f:`Tumhara passion dekh ke passion khud jealous hota hai! 😂`,d:`Allah tumhari har khwaish aur dua qabool kare! 🤲`};
  const p=pw[pr]||`Aaj tumhare saath jo bhi hain woh bohot lucky hain! 🥳`;
  const a=aw[grp];
  return[
    {i:'🎂',t:'Birthday Message',tx:a.main},
    {i:'😂',t:'Funny Wish',tx:h.f},
    {i:'💝',t:'Special Note',tx:p},
    {i:'🤲',t:'Dua & Blessing',tx:a.d+' '+h.d},
  ];
}

function getSurps(){
  return[
    {e:'🎁',t:'Secret Surprise!',tx:`${nm}, did you know? The exact moment you were born, the world quietly became a better place for your parents and family... sweetie. Stars literally aligned. No exaggeration! ⭐`},
    {e:'🦋',t:'Fun Fact About You!',tx:`Scientists say people born on this day have extra charm, wit, and an irresistible aura. That explains literally everything about you! 💅✨`},
    {e:'🌙',t:'Midnight Magic!',tx:`Tonight at midnight, make a wish. The universe is tuned in — it's your birthday and wishes are completely free! 🌟 Make it a big one!`},
    {e:'💌',t:'Pssst... A Secret!',tx:`Someone out there thinks you are absolutely extraordinary. They might not always say it out loud — but ${nm}, you are genuinely, deeply special. 💖`},
    {e:'🎊',t:'One More Surprise!',tx:`Ye poora website sirf tumhare liye bana hai! Tumhara din itna khoobsurat ho ke tum saalon baad bhi yaad karo — Happy Birthday ${nm}! 🥳🎉`},
  ];
}

/* ── FINAL ── */
function showFinal(){
  surpList=getSurps();surpIdx=0;
  show('finalScreen');
  const cr={kids:'🎈',teen:'💜',adult:'🌹'};
  document.getElementById('fcrown').textContent=cr[grp]||'👑';
  document.getElementById('ftitle').textContent=`Happy Birthday, ${nm}!`;
  document.getElementById('fage').textContent=`🎂 Turning ${ag}! 🎂`;
  const wc=document.getElementById('wcards');wc.innerHTML='';
  getWishes().forEach((w,i)=>{
    const d=document.createElement('div');d.className='wcard';d.style.animationDelay=(i*0.12)+'s';
    d.innerHTML=`<div class="wchead"><span class="wcicon">${w.i}</span><span class="wctitle">${w.t}</span></div><div class="wctext">${w.tx}</div>`;
    wc.appendChild(d);
  });
  document.getElementById('musicBtn').style.display='block';
  setTimeout(()=>celebrate(),600);
  surpTimer=setTimeout(()=>showSurp(0),5000);
}

function showSurp(i){
  if(i>=surpList.length)return;
  const s=surpList[i];
  document.getElementById('sEmo').textContent=s.e;
  document.getElementById('sTit').textContent=s.t;
  document.getElementById('sTxt').textContent=s.tx;
  document.getElementById('surp').classList.add('show');surpIdx=i;
}
function closeSurp(){
  document.getElementById('surp').classList.remove('show');
  if(surpIdx+1<surpList.length) setTimeout(()=>showSurp(surpIdx+1),Math.random()*9000+7000);
}

/* ── CELEBRATE ── */
function celebrate(){launchConfetti();launchBalloons();}

function launchConfetti(){
  const cv=document.getElementById('confetti');
  const ctx=cv.getContext('2d');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  const pal={kids:['#ff6b35','#ff3d9a','#ffd60a','#00c9a7','#ff006e'],teen:['#8b5cf6','#ec4899','#06d6a0','#6366f1','#f472b6'],adult:['#d4af37','#c9a227','#e8d5a3','#b8860b','#f5f0e8']};
  const cols=pal[grp]||pal.teen;
  const ps=[];
  for(let i=0;i<220;i++) ps.push({x:Math.random()*cv.width,y:-20,w:Math.random()*12+3,h:Math.random()*6+2,color:cols[Math.floor(Math.random()*cols.length)],rot:Math.random()*360,vx:(Math.random()-.5)*5,vy:Math.random()*5+1.5,vr:(Math.random()-.5)*9,op:1,shape:Math.random()>.7?'c':'r'});
  let f=0;
  function draw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    ps.forEach(p=>{
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
      ctx.globalAlpha=p.op;ctx.fillStyle=p.color;
      if(p.shape==='c'){ctx.beginPath();ctx.arc(0,0,p.w/2,0,Math.PI*2);ctx.fill();}
      else ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
      p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.vy+=0.055;
      if(f>100)p.op-=0.007;
    });
    f++;
    if(f<240)requestAnimationFrame(draw);
    else ctx.clearRect(0,0,cv.width,cv.height);
  }
  draw();
}

function launchBalloons(){
  const em={kids:['🎈','🎉','🎊','⭐','🌈','🍭','🦄','🐣'],teen:['🎈','💜','✨','🦋','💅','🌸','💫','🎀'],adult:['🌹','✨','🥂','🌸','💐','🎊','⭐','🕊️']};
  const list=em[grp]||em.teen;
  for(let i=0;i<16;i++) setTimeout(()=>{
    const b=document.createElement('div');b.className='balloon';
    b.textContent=list[Math.floor(Math.random()*list.length)];
    b.style.cssText=`left:${Math.random()*92+4}%;--dur:${Math.random()*5+7}s;--dl:0s;--sz:${Math.random()*1.5+2}rem;--dx:${(Math.random()-.5)*130}px;--rot:${(Math.random()-.5)*28}deg;`;
    document.body.appendChild(b);setTimeout(()=>b.remove(),14000);
  },i*160);
}

/* ── MUSIC ── */
function initA(){if(!aCtx)aCtx=new(window.AudioContext||window.webkitAudioContext)();}
function pNote(freq,start,dur,vol=0.18,type='sine'){
  const o=aCtx.createOscillator(),g=aCtx.createGain();
  o.connect(g);g.connect(aCtx.destination);
  o.frequency.value=freq;o.type=type;
  const t=aCtx.currentTime;
  g.gain.setValueAtTime(0,t+start);
  g.gain.linearRampToValueAtTime(vol,t+start+0.05);
  g.gain.exponentialRampToValueAtTime(vol*0.6,t+start+dur*0.6);
  g.gain.linearRampToValueAtTime(0.001,t+start+dur);
  o.start(t+start);o.stop(t+start+dur+0.05);
  mNodes.push(o);
}
function pChord(fs,s,d){fs.forEach(f=>pNote(f,s,d,0.055,'triangle'));}

function playSong(){
  mNodes=[];
  const N={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,Bb4:466.16,B4:493.88,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99};
  // Melody - Happy Birthday
  const mel=[
    [N.C4,0,0.32],[N.C4,0.37,0.14],[N.D4,0.56,0.48],[N.C4,1.08,0.48],[N.F4,1.6,0.48],[N.E4,2.12,0.95],
    [N.C4,3.2,0.32],[N.C4,3.57,0.14],[N.D4,3.76,0.48],[N.C4,4.28,0.48],[N.G4,4.8,0.48],[N.F4,5.32,0.95],
    [N.C4,6.4,0.32],[N.C4,6.77,0.14],[N.C5,6.96,0.48],[N.A4,7.48,0.48],[N.F4,8.0,0.32],[N.E4,8.36,0.32],[N.D4,8.72,0.78],
    [N.Bb4,9.6,0.32],[N.Bb4,9.97,0.14],[N.A4,10.16,0.48],[N.F4,10.68,0.48],[N.G4,11.2,0.48],[N.F4,11.72,1.2]
  ];
  // Harmony layer
  const harm=[
    [N.E4,0,0.48],[N.F4,0.56,0.48],[N.C4,1.08,0.48],[N.A4,1.6,0.48],[N.G4,2.12,0.95],
    [N.E4,3.2,0.48],[N.F4,3.76,0.48],[N.C4,4.28,0.48],[N.B4,4.8,0.48],[N.C5,5.32,0.95],
    [N.E5,6.4,0.48],[N.E5,6.96,0.48],[N.C5,7.48,0.48],[N.A4,8.0,0.65],[N.G4,8.72,0.78],
    [N.D5,9.6,0.48],[N.C5,10.16,0.48],[N.A4,10.68,0.48],[N.Bb4,11.2,0.48],[N.C5,11.72,1.2]
  ];
  // Bass chords
  const ch=[
    [[N.C4,N.E4],0,1.1],[[N.F4,N.A4],1.6,1.1],[[N.G4,N.B4],2.12,0.9],
    [[N.C4,N.E4],3.2,1.1],[[N.F4,N.A4],4.28,1.1],[[N.G4,N.B4],5.32,0.95],
    [[N.C4,N.E4],6.4,1.4],[[N.F4,N.A4],8.0,1.4],[[N.G4,N.B4],8.72,0.7],
    [[N.Bb4,N.D5],9.6,1.4],[[N.F4,N.A4],10.68,1.4],[[N.C4,N.E4],11.72,1.5]
  ];
  mel.forEach(([f,s,d])=>pNote(f,s,d,0.22,'sine'));
  harm.forEach(([f,s,d])=>pNote(f,s,d,0.09,'triangle'));
  ch.forEach(([fs,s,d])=>pChord(fs,s,d));
  setTimeout(()=>{if(mOn)playSong();},13800);
}

function toggleMusic(){
  initA();
  if(mOn){
    mOn=false;mNodes.forEach(n=>{try{n.stop();}catch(e){}});mNodes=[];
    const b=document.getElementById('musicBtn');b.textContent='🎵 Play Music';b.classList.remove('on');
  }else{
    mOn=true;
    const b=document.getElementById('musicBtn');b.textContent='🔇 Stop Music';b.classList.add('on');
    aCtx.resume().then(playSong);
  }
}

/* ── RESTART ── */
function restart(){
  nm='';ag=0;hb='';pr='';grp='';picks={};
  mOn=false;mNodes.forEach(n=>{try{n.stop();}catch(e){}});mNodes=[];
  document.getElementById('musicBtn').textContent='🎵 Play Music';
  document.getElementById('musicBtn').classList.remove('on');
  document.getElementById('musicBtn').style.display='none';
  document.getElementById('nInp').value='';document.getElementById('aInp').value='';
  document.querySelectorAll('.opt').forEach(o=>o.classList.remove('sel'));
  document.body.className='';buildOrbs();
  if(surpTimer)clearTimeout(surpTimer);
  document.getElementById('surp').classList.remove('show');
  show('s1');
}
window.addEventListener('resize',()=>{const cv=document.getElementById('confetti');cv.width=window.innerWidth;cv.height=window.innerHeight;});
