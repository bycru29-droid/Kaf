// Mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// Modal
function openModal(id, title, desc, price, status) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent = desc;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalStatus').textContent = '✦ ' + status;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// Forms
function submitForm(e) {
  e.preventDefault();
  showToast('✦ Commission request sent! I\'ll get back to you soon.');
  e.target.reset();
}
function submitEmail(e) {
  e.preventDefault();
  showToast('✦ You\'re on the list! Welcome to KAF.');
  e.target.reset();
}

// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Scroll nav effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = '#222';
  } else {
    nav.style.borderBottomColor = '#1a1a1a';
  }
});
