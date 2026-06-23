<img src="https://img.shields.io/badge/主题-个人网页-0a0e1e?style=flat-square" align="right">
# 🌌 ༺心༒幻༻ | Cosmic Blog<br>
一个融合深空美学与极简设计的静态个人博客。<br>
利用 CSS 变量与 Canvas 绘制动态星空背景，搭配实时时钟与极简文章列表，打造沉浸式的阅读体验。<br>
## ✨ 核心特性<br>
- 🎨 **深空视觉主题**：采用纯黑底色与银河光带背景，辅以动态粒子星空，营造科幻氛围。<br>
- ⏳ **沉浸式动态组件**：内置 Canvas 星空背景、实时翻页时钟与日历组件，界面生动不呆板。<br>
- 📝 **轻量级文章系统**：通过 `articles.json` 管理文章元数据，支持标题搜索与日期排序。<br>
- 📱 **全响应式布局**：完美适配桌面端与移动端屏幕。<br>
## 🚀 快速开始<br>
### 环境要求<br>
由于项目使用 `fetch` 加载数据，**不能直接双击打开**，需要本地服务器环境。<br>
### 启动步骤<br>
1. **克隆项目**<br>
   git clone https://github.com/XINHUAN-HS/XiNHUAN-HS.github.io.git<br>
   cd XiNHUAN-HS.github.io<br>
2. **启动服务（任选其一）**<br>
   - VS Code：安装 `Live Server` 插件，右键 `index.html` → `Open with Live Server`。<br>
   - Python：<br>
     python -m http.server 8000<br>
3. **访问页面**<br>
   浏览器打开 `http://localhost:8000`，或直接访问在线部署：<br>
   [https://xinhuan-hs.github.io/](https://xinhuan-hs.github.io/)<br>
## 📂 项目结构<br>
XiNHUAN-HS.github.io/<br>
│<br>
├── index.html         # 主页面 (结构与布局)<br>
├── style.css          # 样式表 (包含星空动画与CSS变量)<br>
├── script.js          # 逻辑层 (时钟、日历、数据渲染)<br>
├── articles.json      # 文章数据源 (需自行维护)<br>
├── article/           # 文章存放目录<br>
├── touxiang.png       # 头像<br>
├── ico.ico            # 网站图标<br>
├── GitHub.jpeg        # 其他资源<br>
└── README.md          # 项目说明文档<br>
## 🛠️ 自定义指南<br>
### 1. 修改主题色彩<br>
编辑 `style.css` 顶部的 `:root` 变量：<br>

    --bg-primary: #0a0e1e;       / 宇宙深空背景 /<br>
    --accent-glow: #ffcc66;      / 恒星与高亮色 /<br>
    --text-main: #c8d6ff;        / 主要文字颜色 /<br>
### 2. 调整星空参数<br>
编辑 `script.js` 中的配置对象：<br>
const config = {<br>
    STAR_COUNT: 460,             // 星星数量 (性能平衡)<br>
    CLOUD_COUNT: 15,             // 星云层数<br>
    // ...<br>
};<br>
### 3. 添加新文章<br>
在 `articles.json` 中追加数据对象：<br>
[<br>
    {<br>
        "title": "文章标题",<br>
        "description": "简短摘要...",<br>
        "date": "2026-06-23",<br>
        "path": "./article/your-article.html"<br>
    }<br>
]
