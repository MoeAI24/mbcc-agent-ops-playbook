(function(){
  const intake=document.getElementById('intake');
  const drawer=document.getElementById('drawer');
  const openIntakeEls=[...document.querySelectorAll('[data-open-intake]')];
  const closeIntakeEls=[...document.querySelectorAll('[data-close-intake]')];
  const openMenuBtn=document.querySelector('[data-open-menu]');
  const closeMenuEls=[...document.querySelectorAll('[data-close-menu]')];

  const lock=()=>document.body.style.overflow='hidden';
  const unlock=()=>document.body.style.overflow='';

  function openIntake(e){ if(e) e.preventDefault(); intake.setAttribute('aria-hidden','false'); lock(); }
  function closeIntake(e){ if(e) e.preventDefault(); intake.setAttribute('aria-hidden','true'); unlock(); }
  function openMenu(e){ if(e) e.preventDefault(); drawer.setAttribute('aria-hidden','false'); lock(); }
  function closeMenu(e){ if(e) e.preventDefault(); drawer.setAttribute('aria-hidden','true'); unlock(); }

  openIntakeEls.forEach(el=>el.addEventListener('click',openIntake));
  closeIntakeEls.forEach(el=>el.addEventListener('click',closeIntake));
  if(openMenuBtn) openMenuBtn.addEventListener('click',openMenu);
  closeMenuEls.forEach(el=>el.addEventListener('click',closeMenu));

  const form=document.getElementById('intakeForm');
  const result=document.getElementById('intakeResult');
  const emailDraft=document.getElementById('emailDraft');
  const copyBtn=document.getElementById('copyDraft');

  function buildMessage(fd){
    const name=(fd.get('name')||'').trim();
    const email=(fd.get('email')||'').trim();
    const company=(fd.get('company')||'').trim();
    const focus=(fd.get('focus')||'').trim();
    const outcome=(fd.get('outcome')||'').trim();
    return [
      'MBCC Briefing Request','—',
      `Name: ${name}`,`Email: ${email}`,`Company: ${company}`,`Focus Area: ${focus}`,'',
      'Outcome / Goal:', outcome||'(not provided)','',
      'Note: No secrets or keys included. Requesting outcomes-first briefing + vault-based delivery options.'
    ].join('\n');
  }

  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const fd=new FormData(form);
      const msg=buildMessage(fd);
      const subject=encodeURIComponent('MBCC Briefing Request');
      const body=encodeURIComponent(msg);
      emailDraft.href=`mailto:moeknowmoe24@gmail.com?subject=${subject}&body=${body}`;
      result.hidden=false;

      copyBtn.onclick=async ()=>{
        try{ await navigator.clipboard.writeText(msg);
          copyBtn.textContent='Copied'; setTimeout(()=>copyBtn.textContent='Copy',1200);
        }catch(err){ alert('Copy failed. You can still email the request.'); }
      };
    });
  }
})();