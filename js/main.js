// Supabase gallery
const _sb = supabase.createClient(
  'https://bwgiktpsmrvfaoyoftwy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3Z2lrdHBzbXJ2ZmFveW9mdHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzY2NjUsImV4cCI6MjA4NzU1MjY2NX0.-3YsxigCNWDeZnW8uLSro6UXsHhRNLmcJHEap0fnHz0'
);

async function loadGallery() {
  const grid = document.getElementById('gallery-grid');
  const { data: paintings } = await _sb.from('paintings').select('*').order('sort_order', { ascending: true });

  if (!paintings || paintings.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#9a7a85">No hay cuadros disponibles.</div>';
    return;
  }

  const colors = ['pink','cream','multi','red','tropical','lavender'];
  let html = paintings.map((p, i) => `
    <div class="gallery-item" onclick="openModal('${p.id}', '${p.title.replace(/'/g,"\\'")}', '${(p.description||'').replace(/'/g,"\\'")}', '${p.price}', '${p.status.toUpperCase()}')">
      <div class="gallery-img">
        ${p.image_url
          ? `<img src="${p.image_url}" alt="${p.title} — Original painting by KAF" onerror="this.parentElement.classList.add('placeholder','${colors[i%colors.length]}'); this.style.display='none';">`
          : `<div class="placeholder ${colors[i%colors.length]}" style="width:100%;height:100%"></div>`
        }
      </div>
      <div class="gallery-info">
        <span class="gallery-title">${p.title}</span>
        <span class="gallery-price">${p.price}</span>
      </div>
      <div class="gallery-tag ${p.status === 'available' ? 'available' : 'sold'}">${p.status === 'available' ? 'Available' : 'Sold'}</div>
      ${p.status === 'available' ? `<a href="${p.etsy_url || 'https://artbycru.etsy.com'}" target="_blank" class="etsy-btn" onclick="event.stopPropagation()">Buy on Etsy ✦</a>` : ''}
    </div>
  `).join('');

  html += `
    <div class="gallery-item commission-slot">
      <div class="gallery-img placeholder dark">
        <div class="commission-call">
          <p>YOUR PIECE</p>
          <p>COULD BE HERE</p>
          <a href="#commissions" class="btn-mini">Commission Me</a>
        </div>
      </div>
    </div>
  `;

  grid.innerHTML = html;
}

loadGallery();

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
