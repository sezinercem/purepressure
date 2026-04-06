/* =============================================
   PURE PRESSURE — Main Script
   ============================================= */

// ---------- Mobile Nav Toggle ----------
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Nav shadow on scroll ----------
const navWrapper = document.querySelector('.nav-wrapper');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navWrapper.style.boxShadow = '0 2px 20px rgba(0,0,0,0.10)';
  } else {
    navWrapper.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
  }
}, { passive: true });

// ---------- Active nav link highlighting ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));

// ---------- Contact Form Validation ----------
const form = document.getElementById('contact-form');
const successBox = document.getElementById('form-success');

function showError(fieldId, message) {
  const el = document.getElementById(`${fieldId}-error`);
  if (el) el.textContent = message;
  const input = document.getElementById(fieldId);
  if (input) input.style.borderColor = '#e53e3e';
}

function clearError(fieldId) {
  const el = document.getElementById(`${fieldId}-error`);
  if (el) el.textContent = '';
  const input = document.getElementById(fieldId);
  if (input) input.style.borderColor = '';
}

function validateForm() {
  let valid = true;

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  clearError('name');
  clearError('phone');
  clearError('email');
  clearError('message');

  if (!name) {
    showError('name', 'Please enter your full name.');
    valid = false;
  }

  if (!phone) {
    showError('phone', 'Please enter your phone number.');
    valid = false;
  } else if (!/^[\d\s\+\(\)\-]{7,}$/.test(phone)) {
    showError('phone', 'Please enter a valid phone number.');
    valid = false;
  }

  if (!email) {
    showError('email', 'Please enter your email address.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Please enter a valid email address.');
    valid = false;
  }

  if (!message) {
    showError('message', 'Please tell us a bit about your job.');
    valid = false;
  }

  return valid;
}

// Clear errors on input
['name', 'phone', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => clearError(id));
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  // Simulate successful submission (replace with real form handler / API)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Send My Enquiry';
    submitBtn.disabled = false;
    successBox.textContent = 'Thank you! We\'ve received your enquiry and will be in touch shortly with your free quote.';
    successBox.classList.add('visible');
    setTimeout(() => successBox.classList.remove('visible'), 8000);
  }, 1000);
});

// ---------- Scroll-reveal animation ----------
const revealEls = document.querySelectorAll('.service-card, .work-placeholder, .contact-form, .contact-info');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});
