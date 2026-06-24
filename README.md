
<div align="center">
  <h1>🌌 ༺心༒幻༻ | Cosmic Blog</h1>
  <p>一个融合深空美学与极简设计的静态个人博客。</p>

  <!-- 徽章区域 -->
  <img src="https://img.shields.io/badge/主题-个人网页-0a0e1e?style=flat-square" alt="主题徽章">
  <img src="https://img.shields.io/badge/技术-HTML5/CSS3/JS-ff69b4?style=flat-square" alt="技术徽章">
  <img src="https://img.shields.io/badge/构建-Python_3-lightgrey?style=flat-square" alt="Python徽章">
  <img src="https://img.shields.io/badge/状态-活跃-brightgreen?style=flat-square" alt="状态徽章">
</div>

<br/>

## ✨ 项目简介

**༺心༒幻༻** 是一个静态个人博客网站，旨在提供一个沉浸式的阅读体验。它利用 CSS 与 Canvas 绘制动态星空背景，配合实时时钟、日历和精心设计的深空主题，营造出独特的科幻氛围。

## 🔥 核心特性

- 🎨 **深空视觉主题**：采用纯黑底色与银河光带背景，辅以动态粒子星空和太阳系行星点缀，营造深邃的科幻感。
- ⏳ **沉浸式动态组件**：
  - **Canvas 星空**：数百颗闪烁的星星和缓慢漂移的星云，生动不呆板。
  - **实时时钟**：精确到秒的数字时钟，并显示当前日期和星期。
  - **交互式日历**：支持月份切换，并高亮显示当天日期。
- 📝 **轻量级文章系统**：
  - 通过 `articles.json` 管理文章元数据，支持标题搜索与日期排序。
  - 文章以 iframe 形式内嵌，保持主站风格统一。
- 📱 **全响应式布局**：完美适配从桌面端到移动端的各种屏幕尺寸。
- 🤖 **自动化工具**：提供 Python 脚本，可从 HTML 文章文件中自动提取元数据并生成 `articles.json`。

## 🛠️ 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **数据格式**：JSON
- **自动化脚本**：Python 3 (仅使用标准库)

## 🚀 快速开始

### 环境要求

由于项目使用 `fetch` API 加载本地 `articles.json` 文件，**你不能直接双击 `index.html` 打开**。你需要一个本地 HTTP 服务器环境。

### 启动步骤

1.  **克隆项目**
    ```
    git clone https://github.com/XINHUAN-HS/XiNHUAN-HS.github.io.git
    cd XiNHUAN-HS.github.io
    ```
2.  **启动本地服务器（任选其一）**
    - **方法一：VS Code Live Server (推荐)**
      1.  安装 VS Code 扩展 `Live Server`。
      2.  在项目根目录下，右键点击 `index.html`，选择 `Open with Live Server`。

    - **方法二：Python HTTP Server**
      `python -m http.server 8000`

3.  **访问页面**
    打开浏览器，访问 `http://localhost:8000`。

    你也可以直接访问在线部署版本：[https://xinhuan-hs.github.io/](https://xinhuan-hs.github.io/)

## 📂 项目结构
```
XiNHUAN-HS.github.io/
│
├── index.html # 主页面 (结构与布局)
├── style.css # 样式表 (包含星空动画与CSS变量)
├── script.js # 逻辑层 (时钟、日历、数据渲染、星空)
├── articles.json # 文章数据源 (需自行维护)
│
├── article/ # 存放所有文章HTML文件的目录
│ ├── article-template.html
│ └── ...
│
├── touxiang.png # 头像图片
├── ico.ico # 网站图标
├── create_article.py # ★ 自动化元数据提取脚本 (新增)
│
├── GitHub.jpeg # 其他资源
└── README.md # 项目说明文档
```
## 🛠️ 自定义指南

### 1. 修改主题色彩

编辑 `style.css` 中的相关属性。例如，在 `#universe-theme-layer` 中调整背景色，或在 `:root` (如果定义了的话) 中修改全局颜色变量。主要颜色集中在 `style.css` 开头的宇宙主题背景和全局样式中。

### 2. 调整星空参数

编辑 `script.js` 中的配置对象：
```
const STAR_COUNT = 460; // 星星数量 (性能平衡)
// ... 其他参数如星星大小、速度等也可在循环中调整
```
### 3. 添加新文章

有两种方式：

#### 方式一：手动编辑 `articles.json`

直接在 `articles.json` 中添加一个新对象：
```
 {
 "title": "🚀 我的新文章",
 "path": "article/my-new-article.html",
 "description": "这是对新文章的简要介绍...",
 "date": "2026-06-24"
 }
```
#### 方式二：使用自动化脚本 (推荐)

1.  按照下方“文章模板”创建你的 HTML 文件，并放入 `article/` 文件夹。
2.  在项目根目录运行 Python 脚本：
   ```
    python create_article.py
   ```
    脚本会自动扫描 `article/` 文件夹，提取元数据并更新 `articles.json`。

### 4. 文章模板 (推荐)

为了配合自动化脚本，建议使用以下模板创建新文章 (`article-template.html`)：
```
<!-- ★ 修改此处：文章主标题 + 发布日期 -->
<h1>
  <span>🔖 文章模板-这里是主标题</span>
  <span class="pub-date">— 2004-08-15</span>
</h1>

<!-- ★ 文章导语 (会被脚本提取为 description) -->
<p>文章模板-这里是文章的简要介绍或引言，可以写一两句话概括全文内容。</p>

<!-- ★ 正文开始，按需使用 h2/h3、p、pre、ul、blockquote、.note 等 -->
<h2>第一章</h2>
<p>这里是正文内容...</p>
```
> **关键约定**：
>
> - 标题写在 `<h1>` 中，日期放在 `<span class="pub-date">` 内。
> - 引言是 `<h1>` 之后第一个 `<p>` 标签的内容。
> - 此结构可被 `create_article.py` 脚本正确识别。

## 🤖 自动化元数据提取脚本

### 脚本说明

`create_article.py` 是一个使用 Python 标准库编写的脚本，无需安装任何第三方依赖。它会自动遍历 `article/` 文件夹下的所有 `.html` 文件，根据上述模板约定的结构提取标题、日期和引言，并生成或覆盖 `articles.json` 文件。

### 使用方法

1.  确保你的系统已安装 Python 3。
2.  将 `create_article.py` 放置在项目的根目录下（与 `article/` 文件夹同级）。
3.  在终端中运行：
    ```
    python create_article.py
    ```
4.  脚本会输出处理结果，并自动更新 articles.json。

📄 许可证

本项目仅供学习和个人使用。如需引用或修改，请保留原作者信息。

🙋 联系

• GitHub: https://github.com/XINHUAN-HS

• 项目地址: https://github.com/XINHUAN-HS/XiNHUAN-HS.github.io
