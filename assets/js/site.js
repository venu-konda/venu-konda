/* Portfolio page behaviour: nav, contact form, copy-to-clipboard, reveal-on-scroll. */
(function(){
 const $=s=>document.querySelector(s);
 /* CONTACT FORM
    By default the form opens the visitor's e-mail client with the message filled in (mailto:), which needs no server.
    To receive messages without the visitor's mail client, create a free form endpoint (for example at formspree.io),
    paste its URL here and the form will POST to it instead. */
 const FORM_ENDPOINT='';
 const EMAIL='kondavenuk@gmail.com';

 /* mobile menu */
 const btn=$('#menuBtn'),nav=$('#siteNav');
 btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

 /* photo fallback: if assets/img/photo.jpg is missing show initials */
 document.querySelectorAll('img[data-fallback]').forEach(img=>img.addEventListener('error',()=>{const d=document.createElement('div');d.className=img.className;d.style.cssText='display:grid;place-items:center;font-size:64px;font-weight:800;color:#38bdf8';d.textContent='VK';img.replaceWith(d)}));

 /* toast */
 let tt;function toast(msg){const t=$('#toast');t.textContent=msg;t.style.display='block';clearTimeout(tt);tt=setTimeout(()=>t.style.display='none',1600)}
 document.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();navigator.clipboard.writeText(el.dataset.copy).then(()=>toast('Copied '+el.dataset.copy)).catch(()=>{location.href=el.href})}));

 /* contact form */
 const form=$('#contactForm'),note=$('#formnote');
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  const f=Object.fromEntries(new FormData(form).entries());
  if(!f.name.trim()||!f.message.trim()){note.textContent='Please fill in your name and a message.';return}
  if(FORM_ENDPOINT){
   note.textContent='Sending…';
   try{const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(f)});
    if(r.ok){note.textContent='Thanks, your message has been sent.';form.reset();return}
    throw new Error(r.status)}catch(err){note.textContent='Could not send through the form service; opening your e-mail client instead.'}
  }
  const subject=encodeURIComponent(f.subject?.trim()||'Message from '+f.name.trim()+' via portfolio');
  const body=encodeURIComponent(`${f.message.trim()}\n\n— ${f.name.trim()}${f.email?' <'+f.email.trim()+'>':''}`);
  location.href=`mailto:${EMAIL}?subject=${subject}&body=${body}`;
  note.textContent='Your e-mail app should open with the message filled in. If it does not, write to '+EMAIL+'.';
 });
 $('#waBtn').addEventListener('click',e=>{const f=Object.fromEntries(new FormData(form).entries());const txt=f.message?.trim()?`Hi Venu, ${f.message.trim()} — ${f.name||''}`.trim():'Hi Venu, I saw your portfolio and would like to get in touch.';e.currentTarget.href='https://wa.me/919885797985?text='+encodeURIComponent(txt)});

 /* reveal on scroll */
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08}):null;
 document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
 setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in')),1500); /* never leave content hidden */
 $('#year').textContent=new Date().getFullYear();
})();
