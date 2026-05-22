/* SmartFAQBot - Admin Panel JavaScript */

const API_BASE = 'http://localhost:5000/api';
let allFaqs = [];

// ---- Login ----
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const alert = document.getElementById('loginAlert');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    btn.disabled = true;

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_BASE}/admin/login`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById('loginOverlay').style.display = 'none';
            document.getElementById('adminLayout').style.display = 'flex';
            loadDashboard();
        } else {
            showAlert('Invalid username or password', 'error');
        }
    } catch (err) {
        // Demo mode - accept admin/admin123
        if (username === 'admin' && password === 'admin123') {
            document.getElementById('loginOverlay').style.display = 'none';
            document.getElementById('adminLayout').style.display = 'flex';
            loadDashboard();
        } else {
            showAlert('Backend not available. Use admin/admin123 for demo.', 'error');
        }
    }
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    btn.disabled = false;
});

function showAlert(msg, type) {
    const alert = document.getElementById('loginAlert');
    alert.textContent = msg;
    alert.className = `alert ${type}`;
    alert.style.display = 'block';
    setTimeout(() => { alert.style.display = 'none'; }, 4000);
}

// ---- Navigation ----
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        showPage(page);
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        if (window.innerWidth < 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
    });
});

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageName}`).classList.add('active');
    const titles = { dashboard: 'Dashboard', faqs: 'Manage FAQs', 'add-faq': 'Add FAQ', chatlogs: 'Chat Logs' };
    document.getElementById('topbarTitle').textContent = titles[pageName] || pageName;

    if (pageName === 'faqs') loadFaqs();
    if (pageName === 'chatlogs') loadChatLogs();
    if (pageName === 'dashboard') loadDashboard();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ---- Dashboard ----
async function loadDashboard() {
    try {
        const res = await fetch(`${API_BASE}/admin/stats`, { credentials: 'include' });
        const data = await res.json();
        document.getElementById('statFaqs').textContent = data.total_faqs;
        document.getElementById('statChats').textContent = data.total_chats;
        document.getElementById('statToday').textContent = data.today_chats;
        document.getElementById('statUsers').textContent = data.active_users;
    } catch (err) {
        document.getElementById('statFaqs').textContent = '10';
        document.getElementById('statChats').textContent = '50';
        document.getElementById('statToday').textContent = '5';
        document.getElementById('statUsers').textContent = '1';
    }

    // Recent chats
    try {
        const res = await fetch(`${API_BASE}/admin/chatlogs`, { credentials: 'include' });
        const logs = await res.json();
        const container = document.getElementById('recentChats');
        if (logs.length === 0) { container.innerHTML = '<p class="loading">No chats yet.</p>'; return; }
        container.innerHTML = logs.slice(0, 5).map(log => `
            <div class="log-item">
                <div class="log-user"><i class="fas fa-user"></i> ${escHtml(log.user_message)}</div>
                <div class="log-bot"><i class="fas fa-robot"></i> ${escHtml(log.bot_response).substring(0, 80)}...</div>
                <div class="log-time">${log.created_at || ''}</div>
            </div>`).join('');
    } catch (err) {
        document.getElementById('recentChats').innerHTML = '<p class="loading">Backend unavailable (demo mode)</p>';
    }
}

// ---- FAQ Management ----
async function loadFaqs() {
    const container = document.getElementById('faqsTable');
    container.innerHTML = '<p class="loading">Loading FAQs...</p>';
    try {
        const res = await fetch(`${API_BASE}/admin/faqs`, { credentials: 'include' });
        allFaqs = await res.json();
    } catch (err) {
        // Demo data
        allFaqs = [
            { id: 1, question: 'What are the admission requirements?', answer: '10+2 with 50% marks required...', category: 'Admissions', keywords: 'admission,apply', status: 'active' },
            { id: 2, question: 'What courses are available?', answer: 'BCA, MCA, B.Sc CS available...', category: 'Courses', keywords: 'course,program', status: 'active' },
            { id: 3, question: 'What is the fee structure?', answer: 'BCA: Rs.15,000-25,000/year...', category: 'Fees', keywords: 'fee,cost', status: 'active' },
            { id: 4, question: 'What are the library timings?', answer: 'Mon-Sat 8AM-8PM, Sun 10AM-4PM...', category: 'Campus', keywords: 'library,book', status: 'active' },
            { id: 5, question: 'Tell me about hostel facilities.', answer: 'Boys & Girls hostel available...', category: 'Campus', keywords: 'hostel,room', status: 'active' },
        ];
    }
    renderFaqsTable(allFaqs);
}

function renderFaqsTable(faqs) {
    const container = document.getElementById('faqsTable');
    if (!faqs || faqs.length === 0) { container.innerHTML = '<p class="loading">No FAQs found.</p>'; return; }
    container.innerHTML = `<table>
        <thead><tr>
            <th>#</th><th>Question</th><th>Category</th><th>Keywords</th><th>Status</th><th>Actions</th>
        </tr></thead>
        <tbody>${faqs.map((faq, i) => `
            <tr>
                <td>${faq.id}</td>
                <td style="max-width:240px;word-break:break-word;">${escHtml(faq.question)}</td>
                <td><span class="category-badge">${faq.category || 'General'}</span></td>
                <td style="max-width:140px;color:var(--text-muted);font-size:0.78rem;">${faq.keywords || '-'}</td>
                <td><span class="status-badge ${faq.status}">${faq.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-edit" onclick="editFaq(${JSON.stringify(faq).replace(/"/g, '&quot;')})"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn-delete" onclick="deleteFaq(${faq.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>`).join('')}
        </tbody></table>`;
}

function filterFaqs() {
    const search = document.getElementById('faqSearch').value.toLowerCase();
    const category = document.getElementById('faqCategoryFilter').value;
    let filtered = allFaqs;
    if (search) filtered = filtered.filter(f => f.question.toLowerCase().includes(search) || (f.keywords || '').toLowerCase().includes(search));
    if (category) filtered = filtered.filter(f => f.category === category);
    renderFaqsTable(filtered);
}

async function saveFaq(e) {
    e.preventDefault();
    const faqData = {
        question: document.getElementById('faqQuestion').value,
        answer: document.getElementById('faqAnswer').value,
        category: document.getElementById('faqCategory').value,
        keywords: document.getElementById('faqKeywords').value,
        status: document.getElementById('faqStatus').value
    };
    try {
        const res = await fetch(`${API_BASE}/admin/faqs`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(faqData)
        });
        const data = await res.json();
        if (data.success) {
            alert('FAQ added successfully!');
            resetFaqForm();
            showPage('faqs');
        }
    } catch (err) {
        alert('FAQ saved (demo mode — backend unavailable)');
        resetFaqForm();
    }
}

function editFaq(faq) {
    document.getElementById('modalFaqId').value = faq.id;
    document.getElementById('modalQuestion').value = faq.question;
    document.getElementById('modalAnswer').value = faq.answer;
    document.getElementById('modalCategory').value = faq.category || 'General';
    document.getElementById('modalKeywords').value = faq.keywords || '';
    document.getElementById('editModal').style.display = 'flex';
}

async function updateFaq(e) {
    e.preventDefault();
    const id = document.getElementById('modalFaqId').value;
    const faqData = {
        question: document.getElementById('modalQuestion').value,
        answer: document.getElementById('modalAnswer').value,
        category: document.getElementById('modalCategory').value,
        keywords: document.getElementById('modalKeywords').value,
        status: 'active'
    };
    try {
        await fetch(`${API_BASE}/admin/faqs/${id}`, {
            method: 'PUT', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(faqData)
        });
    } catch (err) {}
    alert('FAQ updated!');
    closeModal();
    loadFaqs();
}

async function deleteFaq(id) {
    if (!confirm('Delete this FAQ?')) return;
    try {
        await fetch(`${API_BASE}/admin/faqs/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (err) {}
    allFaqs = allFaqs.filter(f => f.id !== id);
    renderFaqsTable(allFaqs);
}

function resetFaqForm() {
    document.getElementById('faqForm').reset();
    document.getElementById('faqFormTitle').textContent = 'Add New FAQ';
}

function closeModal() { document.getElementById('editModal').style.display = 'none'; }

// ---- Chat Logs ----
async function loadChatLogs() {
    const container = document.getElementById('chatLogsTable');
    container.innerHTML = '<p class="loading">Loading...</p>';
    try {
        const res = await fetch(`${API_BASE}/admin/chatlogs`, { credentials: 'include' });
        const logs = await res.json();
        if (!logs.length) { container.innerHTML = '<p class="loading">No chat logs found.</p>'; return; }
        container.innerHTML = `<table>
            <thead><tr><th>#</th><th>User Message</th><th>Bot Response</th><th>Date & Time</th></tr></thead>
            <tbody>${logs.map((log, i) => `
                <tr>
                    <td>${log.id}</td>
                    <td style="max-width:200px;">${escHtml(log.user_message)}</td>
                    <td style="max-width:280px;color:var(--text-muted);font-size:0.82rem;">${escHtml(log.bot_response).substring(0, 100)}...</td>
                    <td style="color:var(--text-muted);font-size:0.8rem;">${log.created_at || ''}</td>
                </tr>`).join('')}
            </tbody></table>`;
    } catch (err) {
        container.innerHTML = '<p class="loading">Backend unavailable (connect Flask backend to view logs)</p>';
    }
}

// ---- Logout ----
async function logout() {
    try { await fetch(`${API_BASE}/admin/logout`, { method: 'POST', credentials: 'include' }); } catch (err) {}
    document.getElementById('adminLayout').style.display = 'none';
    document.getElementById('loginOverlay').style.display = 'flex';
}

function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
