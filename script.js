// ============================================================
// ARTHUR PORTFOLIO — JavaScript
// Interatividade e funcionalidades do portfólio
// ============================================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(9, 12, 17, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'rgba(9, 12, 17, 0.8)';
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeSlideUp 600ms cubic-bezier(0.23, 1, 0.32, 1) both';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Avatar fallback
const avatar = document.getElementById('avatar');
if (avatar) {
  avatar.addEventListener('error', () => {
    avatar.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.textContent = 'A';
    fallback.style.cssText = `
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 4rem;
      font-weight: 800;
      color: #FFD300;
    `;
    avatar.parentElement.appendChild(fallback);
  });
}

// Ripple effect on buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: ripple 600ms ease-out;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '#FFFFFF';
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = '#FFD300';
    }
  });
});

// ── Hamburger menu (mobile) ──────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Fechar ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });
}

// ── Easter Egg: David Martinez ──────────────────────────
const dmEgg = document.getElementById('dm-egg');
if (dmEgg) {
  let clicks = 0;
  let resetTimer;

  dmEgg.addEventListener('click', () => {
    clicks++;
    clearTimeout(resetTimer);

    // Remove classes de animação anteriores
    dmEgg.classList.remove('anim-1', 'anim-2', 'active');
    void dmEgg.offsetWidth; // reflow para reiniciar animação

    if (clicks === 1) {
      dmEgg.classList.add('anim-1', 'active');
      dmEgg.addEventListener('animationend', () => dmEgg.classList.remove('anim-1'), { once: true });

    } else if (clicks === 2) {
      dmEgg.classList.add('anim-2', 'active');
      dmEgg.addEventListener('animationend', () => dmEgg.classList.remove('anim-2'), { once: true });

    } else if (clicks >= 3) {
      dmEgg.classList.add('anim-2', 'active');
      setTimeout(() => {
        window.open('https://www.youtube.com/watch?v=AN1RJF55NXI&list=RDAN1RJF55NXI&start_radio=1', '_blank');
      }, 400);
      clicks = 0;
      return;
    }

    // Reset se parar de clicar por 2s
    resetTimer = setTimeout(() => {
      clicks = 0;
      dmEgg.classList.remove('active');
    }, 2000);
  });
}

console.log('Arthur Portfolio loaded successfully! 🚀');