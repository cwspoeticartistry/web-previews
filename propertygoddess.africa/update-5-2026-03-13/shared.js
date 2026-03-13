// ── Shared Preview JS ────────────────────────────────────────────────────────

// Approval bar
function initApprovalBar() {
  const pageName = document.querySelector('.pg-page-name')?.dataset.page || document.title;
  const key = 'approval_' + encodeURIComponent(pageName);
  const approveBtn = document.getElementById('btn-approve');
  const requestBtn = document.getElementById('btn-request');

  // Restore state
  const saved = localStorage.getItem(key);
  if (saved === 'approved' && approveBtn) {
    approveBtn.textContent = 'Approved ✓';
    approveBtn.classList.add('approved');
    approveBtn.disabled = true;
  }

  if (approveBtn) {
    approveBtn.addEventListener('click', () => {
      localStorage.setItem(key, 'approved');
      approveBtn.textContent = 'Approved ✓';
      approveBtn.classList.add('approved');
      approveBtn.disabled = true;
    });
  }

  if (requestBtn) {
    requestBtn.addEventListener('click', () => {
      const note = prompt('What needs to change on this page?');
      if (note) {
        localStorage.setItem(key, 'change: ' + note);
        requestBtn.textContent = 'Change Requested ✗';
        requestBtn.style.borderColor = '#ff5252';
        requestBtn.style.color = '#ff5252';
      }
    });
  }
}

// Modal system
function openModal(data) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.querySelector('.modal-img').src = data.img;
  overlay.querySelector('.modal-img').alt = data.name;
  overlay.querySelector('.modal-title').textContent = data.name;
  overlay.querySelector('.modal-subtitle').textContent = data.subtitle || '';
  overlay.querySelector('.modal-desc').textContent = data.desc || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initApprovalBar();

  // Close modal on overlay click
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Fade in
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));
});
