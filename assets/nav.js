// Phone app shell: a bottom tab bar on small screens, marks the current page.
(function(){
  var tabs=[
    ['index.html','Home','<path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"/>'],
    ['manifesto.html','Manifesto','<path d="M7 4h8l3 3v13H7z"/><path d="M15 4v3h3M10 11h5M10 14.5h5M10 18h3"/>'],
    ['experiences.html','Circles','<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2"/>'],
    ['blog.html','Journal','<path d="M5 5.5c2.5-1 5-1 7 .5 2-1.5 4.5-1.5 7-.5V19c-2.5-1-5-1-7 .5-2-1.5-4.5-1.5-7-.5z"/><path d="M12 6v13.5"/>'],
    ['founder.html','Founder','<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>']
  ];
  var here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(here.indexOf('blog-')===0)here='blog.html';
  if(here==='join.html')here='';
  var bar=document.createElement('nav');
  bar.className='tabbar';bar.setAttribute('aria-label','App');
  bar.innerHTML=tabs.map(function(t){
    var cur=t[0]===here?' aria-current="page"':'';
    return '<a href="'+t[0]+'"'+cur+'><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+t[2]+'</svg></span><span>'+t[1]+'</span></a>';
  }).join('');
  document.body.appendChild(bar);
  document.documentElement.classList.add('has-tabbar');
})();
