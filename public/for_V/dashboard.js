// ===== MAIN DASHBOARD LOGIC =====

let currentUser = null;
let currentPage = 'campaigns';

document.addEventListener('DOMContentLoaded', () => {
  // Check login
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!user.phone || user.role !== 'volunteer') {
    window.location.href = '../for_admin/login.html';
    return;
  }

  currentUser = user;
  setupNavigation();
  goToPage('campaigns');
});

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
}

function toggleMobileMenu() {
  const nav = document.getElementById('sidebarNav');
  nav?.classList.toggle('show');
}

function goToPage(page) {
  currentPage = page;

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('nav-item-active');
  });

  const navMap = {
    campaigns: 'navCampaigns',
    myCampaigns: 'navMyCampaigns',
    feedback: 'navFeedback',
    support: 'navSupport'
  };

  if (navMap[page]) {
    document.getElementById(navMap[page])?.classList.add('nav-item-active');
  }

  // Update header
  const titles = {
    campaigns: { title: 'Chiến dịch', subtitle: 'Danh sách chiến dịch tham gia' },
    myCampaigns: { title: 'Chiến dịch của tôi', subtitle: 'Các chiến dịch đang thực hiện' },
    feedback: { title: 'Phản hồi & Góp ý', subtitle: 'Chia sẻ ý kiến của bạn' },
    support: { title: 'Báo cáo sự cố', subtitle: 'Báo cáo lỗi hoặc yêu cầu hỗ trợ' }
  };

  const pageInfo = titles[page] || titles.campaigns;
  document.getElementById('pageTitle').textContent = pageInfo.title;
  document.getElementById('pageSubtitle').textContent = pageInfo.subtitle;

  // Render content
  const contentArea = document.getElementById('contentArea');
  
  switch(page) {
    case 'campaigns':
      renderCampaignsPage();
      break;
    case 'myCampaigns':
      renderMyCampaignsPage();
      break;
    case 'feedback':
      renderFeedbackPage();
      break;
    case 'support':
      renderSupportPage();
      break;
  }

  // Close mobile menu
  document.getElementById('sidebarNav')?.classList.remove('show');
}

function logout() {
  if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
    localStorage.removeItem('currentUser');
    window.location.href = '../for_admin/login.html';
  }
}
