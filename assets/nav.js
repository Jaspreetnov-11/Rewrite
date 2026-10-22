// Adds a menu button to the nav for small screens.
(function(){
  var nav=document.querySelector('.nav'),list=nav&&nav.querySelector('ul');
  if(!list)return;
  if(!list.querySelector('a[href="index.html"]')){
    var li=document.createElement('li');li.innerHTML='<a href="index.html">Home</a>';li.className='home-li';list.insertBefore(li,list.firstChild);
  }
  var b=document.createElement('button');
  b.type='button';b.className='menu-btn';b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Open menu');
  b.innerHTML='<i></i>';
  list.parentNode.insertBefore(b,list.nextSibling);
  function set(o){nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')}
  b.addEventListener('click',function(){set(!nav.classList.contains('open'))});
  list.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
})();
