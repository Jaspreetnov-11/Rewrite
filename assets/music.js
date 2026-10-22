// Soft ambient music, synthesised in the browser (no audio file needed).
// Browsers block sound until the visitor interacts, so it starts on the first tap, click or key press.
(function(){
  var wrap=document.getElementById('sound'),btn=document.getElementById('sound-btn');
  var AC=window.AudioContext||window.webkitAudioContext;
  if(!AC){wrap.hidden=true;return;}
  var ctx,master,bus,timer,next=0,step=0,on=false;
  var muted=false;try{muted=localStorage.getItem('rtr-muted')==='1'}catch(e){}
  if(muted)wrap.classList.add('muted');
  var chords=[[48,55,64,71],[45,52,60,67,71],[41,48,57,64,69],[43,50,59,62,67]]; // Cmaj7, Am9, Fmaj9, G6
  var chimes=[72,74,76,79,81,84,86,88];
  function hz(n){return 440*Math.pow(2,(n-69)/12)}
  function build(){
    ctx=new AC();master=ctx.createGain();master.gain.value=0;
    bus=ctx.createBiquadFilter();bus.type='lowpass';bus.frequency.value=1500;bus.Q.value=.3;
    var d=ctx.createDelay(2),fb=ctx.createGain(),wet=ctx.createGain();
    d.delayTime.value=.48;fb.gain.value=.42;wet.gain.value=.4;
    bus.connect(master);bus.connect(d);d.connect(fb);fb.connect(d);d.connect(wet);wet.connect(master);
    master.connect(ctx.destination);
  }
  function pad(notes,t,dur){
    notes.forEach(function(n,i){[-5,5].forEach(function(det){
      var o=ctx.createOscillator(),g=ctx.createGain();
      o.type=i===0?'triangle':'sine';o.frequency.value=hz(n);o.detune.value=det;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.035,t+3);
      g.gain.setValueAtTime(.035,t+dur-1);g.gain.linearRampToValueAtTime(0,t+dur+2.5);
      o.connect(g);g.connect(bus);o.start(t);o.stop(t+dur+2.6);
    })});
  }
  function chime(n,t){
    [1,2.01].forEach(function(m,k){
      var o=ctx.createOscillator(),g=ctx.createGain();
      o.type='sine';o.frequency.value=hz(n)*m;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(k?.008:.03,t+.02);
      g.gain.exponentialRampToValueAtTime(.0001,t+(k?1.5:4));
      o.connect(g);g.connect(bus);o.start(t);o.stop(t+4.1);
    });
  }
  function schedule(){
    while(next<ctx.currentTime+2){
      pad(chords[step%chords.length],next,8);
      for(var b=0;b<4;b++){if(Math.random()<.45)chime(chimes[Math.floor(Math.random()*chimes.length)],next+b*2+Math.random()*.6)}
      next+=8;step++;
    }
  }
  function play(){
    if(!ctx)build();
    ctx.resume();
    if(!timer){next=Math.max(next,ctx.currentTime+.1);schedule();timer=setInterval(schedule,1000);}
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
    master.gain.linearRampToValueAtTime(.9,ctx.currentTime+4);
    on=true;wrap.classList.add('on');wrap.classList.remove('muted');
    btn.setAttribute('aria-pressed','true');btn.setAttribute('aria-label','Pause soft music');
  }
  function stop(){
    if(!ctx)return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
    master.gain.linearRampToValueAtTime(0,ctx.currentTime+1.2);
    clearInterval(timer);timer=null;
    setTimeout(function(){if(!on)ctx.suspend()},1400);
    on=false;wrap.classList.remove('on');wrap.classList.add('muted');
    btn.setAttribute('aria-pressed','false');btn.setAttribute('aria-label','Play soft music');
  }
  btn.addEventListener('click',function(){
    if(on){stop();try{localStorage.setItem('rtr-muted','1')}catch(e){}}
    else{play();try{localStorage.removeItem('rtr-muted')}catch(e){}}
  });
  function first(e){
    if(wrap.contains(e.target))return;
    ['pointerdown','keydown','touchend'].forEach(function(t){document.removeEventListener(t,first,true)});
    if(!muted&&!on)play();
  }
  ['pointerdown','keydown','touchend'].forEach(function(t){document.addEventListener(t,first,true)});
  // Try to start straight away; browsers that allow autoplay will play, others wait for the first tap.
  if(!muted){try{build();ctx.resume().then(function(){if(ctx.state==='running')play()})}catch(e){}}
})();
