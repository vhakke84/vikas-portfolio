/* ═══════════════════════════════════════════
   VIKAS HAKKE PORTFOLIO — script.js
   ═══════════════════════════════════════════ */

/* ─── TYPED ROLE EFFECT ─── */
(function () {
  const roles = [
    'AI & DS Engineer',
    'Machine Learning Dev',
    'Data Scientist',
    'Python Developer',
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const el = document.getElementById('typed-role');
  if (!el) return;

  function type() {
    const current = roles[roleIdx];
    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 55);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 95);
    }
  }

  type();
})();

/* ─── SCROLL REVEAL ─── */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ─── NAVBAR SCROLL EFFECT ─── */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(8,8,26,0.97)';
    } else {
      nav.style.background = 'rgba(8,8,26,0.85)';
    }
  });
})();

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  function updateActive() {
    let current = '';
    sections.forEach((s) => {
      const top = s.getBoundingClientRect().top;
      if (top <= 100) current = s.id;
    });
    links.forEach((l) => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActive);
})();

/* ─── HAMBURGER MENU ─── */
(function () {
  const btn = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
})();

/* ─── SKILL BAR ANIMATION ON SCROLL ─── */
(function () {
  const fills = document.querySelectorAll('.skill-fill');
  const stored = [];

  fills.forEach((f) => {
    stored.push(f.style.width);
    f.style.width = '0%';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Array.from(fills).indexOf(e.target);
          e.target.style.width = stored[idx];
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  fills.forEach((f) => observer.observe(f));
})();

/* ─── CONTACT FORM (Formspree) ─── */
function handleSubmit(e) {
  e.preventDefault();

  const form        = e.target;
  const btn         = document.getElementById('contactSubmitBtn');
  const btnText     = document.getElementById('btnText');
  const btnIcon     = document.getElementById('btnIcon');
  const btnSpinner  = document.getElementById('btnSpinner');
  const successMsg  = document.getElementById('formSuccess');
  const errorMsg    = document.getElementById('formError');

  // Reset messages
  if (successMsg) successMsg.style.display = 'none';
  if (errorMsg)   errorMsg.style.display   = 'none';

  // Loading state
  if (btn)        btn.disabled          = true;
  if (btnText)    btnText.textContent   = 'Sending…';
  if (btnIcon)    btnIcon.style.display = 'none';
  if (btnSpinner) btnSpinner.style.display = 'inline-block';

  const data = new FormData(form);

  fetch('https://formspree.io/f/xqakwvny', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        // Success
        form.reset();
        if (successMsg) successMsg.style.display = 'block';
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
        }, 5000);
      } else {
        // Server-side error
        if (errorMsg) errorMsg.style.display = 'block';
        setTimeout(() => {
          if (errorMsg) errorMsg.style.display = 'none';
        }, 5000);
      }
    })
    .catch(() => {
      // Network error
      if (errorMsg) errorMsg.style.display = 'block';
      setTimeout(() => {
        if (errorMsg) errorMsg.style.display = 'none';
      }, 5000);
    })
    .finally(() => {
      // Restore button
      if (btn)        btn.disabled          = false;
      if (btnText)    btnText.textContent   = 'Send Message';
      if (btnIcon)    btnIcon.style.display = 'inline-block';
      if (btnSpinner) btnSpinner.style.display = 'none';
    });
}


/* ─── SMOOTH SCROLL FOR NAV LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ─── CERTIFICATE LIGHTBOX MODAL ─── */
function openCertModal(imageSrc, title) {
  const modal = document.getElementById('certModal');
  const img = document.getElementById('certModalImg');
  const titleEl = document.getElementById('certModalTitle');
  const downloadBtn = document.getElementById('certModalDownload');
  if (!modal || !img) return;

  img.src = imageSrc;
  img.alt = title || 'Certificate';
  if (titleEl) titleEl.textContent = title || 'Certificate Preview';
  if (downloadBtn) {
    downloadBtn.href = imageSrc;
    const ext = (imageSrc && imageSrc.split('.').pop()) || 'png';
    downloadBtn.setAttribute('download', (title ? title.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'certificate') + '.' + ext);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertModal();
});
