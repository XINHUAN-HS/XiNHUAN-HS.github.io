// ================================================================
//  1. 星空粒子背景
// ================================================================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let W, H;

function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const STAR_COUNT = 460;
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.85 + 0.15,
        speed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
    });
}

function drawStars(time) {
    ctx.clearRect(0, 0, W, H);
    const grad = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, Math.max(W, H) * 0.8);
    grad.addColorStop(0, '#12182b');
    grad.addColorStop(1, '#070a14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    for (const s of stars) {
        const flicker = 0.65 + 0.35 * Math.sin(time * s.speed + s.phase);
        const a = s.alpha * flicker;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 230, 255, ${a})`;
        ctx.fill();
        if (s.r > 1.4) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(140, 180, 255, ${a * 0.25})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    ctx.save();
    const t = time * 0.0001;
    for (let i = 0; i < 5; i++) {
        const cx = W * (0.2 + 0.6 * Math.sin(t + i * 1.3));
        const cy = H * (0.2 + 0.6 * Math.cos(t * 0.7 + i * 0.9));
        const rad = 120 + 80 * Math.sin(t * 0.5 + i * 0.7);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const hue = 220 + i * 20;
        g.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.035)`);
        g.addColorStop(1, `hsla(${hue}, 70%, 30%, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    }
    ctx.restore();

    requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

// ================================================================
//  2. 时钟
// ================================================================
const clockEl = document.getElementById('clockDisplay');
const dateEl = document.getElementById('dateDisplay');
const secEl = document.getElementById('secondsDisplay');

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;

    const y = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const wd = weekdays[now.getDay()];
    dateEl.textContent = `${y} · ${mo} · ${d}  ${wd}`;

    secEl.textContent = `UTC+8  ·  第 ${Math.floor((now - new Date(y, 0, 0)) / 86400000)} 天`;
}
updateClock();
setInterval(updateClock, 1000);

// ================================================================
//  3. 日历
// ================================================================
const calendarTitle = document.getElementById('calendarTitle');
const calendarDays = document.getElementById('calendarDays');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function renderCalendar(year, month) {
    const today = new Date();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    calendarTitle.textContent = `${year} · ${String(month + 1).padStart(2, '0')}`;

    let html = '';
    const prevMonthDays = firstDay;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        html += `<span class="other-month">${daysInPrev - i}</span>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = (year === today.getFullYear() && month === today.getMonth() && d === today.getDate());
        html += `<span class="${isToday ? 'today' : ''}">${d}</span>`;
    }
    const totalCells = prevMonthDays + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7 || 0;
    for (let d = 1; d <= remaining; d++) {
        html += `<span class="other-month">${d}</span>`;
    }
    calendarDays.innerHTML = html;
}
renderCalendar(currentYear, currentMonth);

prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar(currentYear, currentMonth);
});
nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar(currentYear, currentMonth);
});

// ================================================================
//  4. 博客系统 (从 articles.json 加载 + 实时搜索 + 日期排序)
// ================================================================

const blogBody = document.getElementById('blogBody');
const searchInput = document.getElementById('searchInput');

let allArticles = [];
let filteredArticles = [];

async function loadArticles() {
    try {
        const response = await fetch('articles.json');
        if (!response.ok) throw new Error('无法加载 articles.json');
        allArticles = await response.json();

        // 按日期降序排列（最新的在前）
        allArticles.sort((a, b) => {
            const dateA = new Date(a.date || '1970-01-01');
            const dateB = new Date(b.date || '1970-01-01');
            return dateB - dateA;
        });

        filteredArticles = [...allArticles];
        renderArticleList(filteredArticles);
    } catch (error) {
        console.error('❌ 加载文章失败:', error);
        blogBody.innerHTML = `
            <div class="blog-empty">
                <span class="emoji">⚠️</span>
                无法加载文章列表<br/>
                <small>请确保 articles.json 存在且格式正确</small>
            </div>
        `;
    }
}

function renderArticleList(articlesToRender) {
    if (!blogBody) return;

    if (articlesToRender.length === 0) {
        blogBody.innerHTML = `
            <div class="blog-empty">
                <span class="emoji">📡</span>
                没有找到匹配的文章
            </div>
        `;
        return;
    }

    let listHtml = '<div class="blog-list">';
    for (const article of articlesToRender) {
        const desc = article.description || '点击查看全文（iframe 内嵌）';
        const displayDate = article.date || '未知日期';
        listHtml += `
            <div class="post-item" data-path="${article.path}">
                <div class="post-title">
                    <span>${article.title}</span>
                    <span class="post-date">✦ 阅读</span>
                </div>
                <div class="post-summary">${desc}</div>
                <div class="post-meta">
                    <span>📅 ${displayDate}</span>
                    <span>🪐 来自༺心༒幻༻</span>
                </div>
            </div>
        `;
    }
    listHtml += '</div>';
    blogBody.innerHTML = listHtml;

    document.querySelectorAll('.post-item').forEach(el => {
        el.addEventListener('click', function(e) {
            const path = this.dataset.path;
            showIframeView(path);
        });
    });
}

function filterArticles(keyword) {
    const trimmed = keyword.trim().toLowerCase();
    if (trimmed === '') {
        filteredArticles = [...allArticles];
    } else {
        filteredArticles = allArticles.filter(article => {
            const titleMatch = article.title.toLowerCase().includes(trimmed);
            const descMatch = article.description && article.description.toLowerCase().includes(trimmed);
            return titleMatch || descMatch;
        });
    }
    renderArticleList(filteredArticles);
}

searchInput.addEventListener('input', function(e) {
    filterArticles(e.target.value);
});

// ===== 修改后的 showIframeView：移除滚动条 + 注入全局样式 =====
function showIframeView(filePath) {
    blogBody.innerHTML = `
        <div class="detail-view active">
            <button class="detail-back" id="backToList">← 返回列表</button>
            <iframe id="articleFrame" src="${filePath}" 
                    style="width:100%; height:70vh; border:none; border-radius:16px; margin-top:16px; background:rgba(10,14,30,0.4);"
                    title="文章内容">
            </iframe>
        </div>
    `;

    const iframe = document.getElementById('articleFrame');
    iframe.onload = function() {
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            const style = doc.createElement('style');
            style.textContent = `
                body {
                    background-color: #0a0e001a !important;
                    color: #c8d6ff !important;
                    font-family: 'Segoe UI', sans-serif !important;
                    margin: 0;
                    padding: 20px;
                    overflow-y: auto;    /* 允许垂直滚动 */
                    overflow-x: hidden;  /* 隐藏水平滚动 */
                }
                a { color: #8ab4ff; }
                /* 隐藏滚动条（兼容各浏览器） */
                ::-webkit-scrollbar { display: none; }
                html { scrollbar-width: none; }
                body { -ms-overflow-style: none; }
            `;
            doc.head.appendChild(style);
        } catch (e) {
            console.warn('无法注入样式到 iframe:', e);
        }
    };

    document.getElementById('backToList').addEventListener('click', () => {
        renderArticleList(filteredArticles);
    });
}

loadArticles();

// ================================================================
//  5. 窗口变化时重置星星分布
// ================================================================
window.addEventListener('resize', () => {
    for (const s of stars) {
        s.x = Math.random() * window.innerWidth;
        s.y = Math.random() * window.innerHeight;
    }
});