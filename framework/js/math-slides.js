(function(){
 const deck=document.querySelector('.ms-deck'); if(!deck)return;
 const slides=[...deck.querySelectorAll('.ms-slide')]; let index=0;
 const progress=document.createElement('div'); progress.className='ms-progress'; document.body.appendChild(progress);
 function fragments(slide){return[...slide.querySelectorAll('.ms-fragment:not(.visible)')]}
 function update(){slides.forEach((s,i)=>s.classList.toggle('active',i===index));document.querySelectorAll('[data-ms-page]').forEach(n=>n.textContent=(index+1)+' / '+slides.length);progress.style.width=((index+1)/slides.length*100)+'%'}
 function next(){const fs=fragments(slides[index]);if(fs.length){fs[0].classList.add('visible');return}if(index<slides.length-1){index++;update()}}
 function prev(){const shown=[...slides[index].querySelectorAll('.ms-fragment.visible')];if(shown.length){shown[shown.length-1].classList.remove('visible');return}if(index>0){index--;update()}}
 function fullscreen(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}
 window.MathSlides={next,prev,fullscreen,go(n){index=Math.max(0,Math.min(n,slides.length-1));update()}};
 document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();next()}if(e.key==='ArrowLeft'){e.preventDefault();prev()}if(e.key.toLowerCase()==='f')fullscreen()});
 let startX=null;document.addEventListener('touchstart',e=>startX=e.changedTouches[0].clientX,{passive:true});document.addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>70)(dx<0?next():prev());startX=null},{passive:true});update();
})();