'use strict';
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
const main=document.querySelector('main');
const footer=document.querySelector('footer');
function closeMenu(focus=false){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Öppna menyn');main.inert=false;footer.inert=false;if(focus)menuButton.focus();}
menuButton.addEventListener('click',()=>{if(!menu.hidden)return closeMenu(true);menu.hidden=false;menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label','Stäng menyn');main.inert=true;footer.inert=true;menu.querySelector('a').focus();});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(menu.hidden)return;if(e.key==='Escape')closeMenu(true);if(e.key==='Tab'){const controls=[menuButton,...menu.querySelectorAll('a')];if(e.shiftKey&&document.activeElement===controls[0]){e.preventDefault();controls.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===controls.at(-1)){e.preventDefault();controls[0].focus();}}});
matchMedia('(min-width:851px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const expand=document.querySelector('#show-projects');
expand.addEventListener('click',()=>{const open=expand.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.extra-work').forEach(item=>item.hidden=!open);expand.setAttribute('aria-expanded',String(open));expand.firstChild.textContent=open?'Visa färre bilder ':'Visa fler bilder ';});
const dialog=document.querySelector('.lightbox');
const photos=[...document.querySelectorAll('[data-image]')];
let active=0;
function showImage(index){active=(index+photos.length)%photos.length;const source=photos[active].querySelector('img');const image=dialog.querySelector('img');image.src=source.src;image.alt=source.alt;dialog.querySelector('figcaption').textContent=photos[active].dataset.caption;dialog.querySelector('.viewer-count').textContent=`${active+1} av ${photos.length}`;}
photos.forEach((button,index)=>button.addEventListener('click',()=>{showImage(index);dialog.showModal();}));
dialog.querySelector('.viewer-close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.viewer-prev').addEventListener('click',()=>showImage(active-1));
dialog.querySelector('.viewer-next').addEventListener('click',()=>showImage(active+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showImage(active+1);}if(e.key==='ArrowLeft'){e.preventDefault();showImage(active-1);}});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
const quick=document.querySelector('.mobile-contact');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{quick.hidden=entries[0].isIntersecting||entries[0].boundingClientRect.bottom>76;},{rootMargin:'-76px 0px 0px 0px'});observer.observe(document.querySelector('.hero'));}
