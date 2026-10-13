# 王瑞峰 · Portfolio

> A product portfolio about turning AI capability into useful, measurable products.

[![Live site](https://img.shields.io/badge/Live-portfolio.iamwudi.ltd-6b9f35)](https://portfolio.iamwudi.ltd/)
[![Repository](https://img.shields.io/badge/Repository-private-181717?logo=github)](https://github.com/iostreamwudi/portfolio-website)

**王瑞峰个人作品集网站**，用于集中展示 AI 产品工作方法、项目实践、实习经历与产品设计成果。网站围绕一个核心主题组织内容：从真实业务问题出发，完成产品定义、AI/Agent 方案设计、交互落地，再通过评测与数据反馈持续验证效果。

线上版本：[portfolio.iamwudi.ltd](https://portfolio.iamwudi.ltd/)

## 项目背景

这个网站既是个人介绍页，也是一份面向产品岗位的可交互作品集。与把项目截图简单堆在一起不同，内容按“问题—方案—交付—验证”的产品叙事展开：访客可以先了解个人定位与能力，再浏览 ServicePilot、FORGE 等项目案例、业务实习经历和评测方法。视觉上以浅色背景、绿色强调色、玻璃质感信息卡和空间化动效建立统一语言；关键按钮和导航由网页组件实现，确保真实可点击，而不只是背景图上的装饰。

## 页面与内容

| 页面/区域 | 展示内容 |
| --- | --- |
| 首页 Hero | 个人定位、作品/实习入口、人物画像舞台与分层信息组件 |
| 项目作品 | ServicePilot 企业 AI 客服与知识助手、FORGE 个性化健身教练等项目概览与案例入口 |
| 实习经历 | 真实业务场景、负责事项、方案过程与可衡量结果 |
| 能力与评测 | 产品定义、Agent 工作流、交互设计、评测迭代等能力框架 |
| 关于我 | 教育背景、求职方向、工作方式与联系方式 |
| 项目详情 | 项目背景、目标用户、问题定义、方案设计、关键流程和项目复盘 |

## 设计与交互特点

- **产品叙事优先**：把项目放进业务背景和决策过程里讲清楚，而不是只展示最终界面。
- **真实网页控件**：导航、标签、项目入口、详情按钮和弹窗使用 HTML/React 组件，支持键盘与鼠标操作。
- **分层视觉舞台**：人物、桌面、背景、卡片和轨道装饰分别组织，支持轻量视差、悬停反馈和进入动效。
- **低干扰动效**：动效服务于层级与反馈；尊重 `prefers-reduced-motion` 的系统偏好。
- **响应式布局**：桌面端突出空间关系，窄屏下调整为纵向阅读，避免关键内容被裁切。
- **静态资源优化**：页面使用独立图片与静态资源，减少运行时负担，并便于部署到常见静态站点服务。

## 仓库内容

本仓库优先保存可部署的网站文件、项目素材，以及当前可取得的可编辑组件源码：

```text
.
├── index.html                 # 站点首页静态导出
├── projects/                  # 项目详情页
├── servicepilot/              # ServicePilot 案例图与资源
├── forge/                     # FORGE 案例图与资源
├── hero/                      # 首页人物画像与分层视觉资源
├── img/                       # 页面配图
├── svg/                       # 品牌与装饰 SVG
├── portfolio-folder.js        # 项目作品区交互
├── portfolio-folder.css       # 项目作品区样式
├── interactive-portrait.js    # 首页画像交互构建产物
├── interactive-portrait.css   # 首页画像样式
└── source/
    └── interactive-portrait/  # 可编辑 React 组件、样式、构建配置与素材
```

仓库包含线上站点的静态导出和自定义交互模块。**它不包含原始 Next.js 应用的完整私有源码树**；目前可编辑的 React 源码主要是 `source/interactive-portrait/` 中的首页画像组件。构建后的页面资产保留在仓库根目录，便于静态部署和对照线上版本。

## 本地预览

首页和项目页是静态导出文件，可用任意静态 HTTP 服务预览：

```bash
python3 -m http.server 8080
```

打开 <http://localhost:8080/>。部分托管环境会使用 Nginx 重写规则把无扩展名路径映射到对应 HTML；若本地直接打开 `/projects/servicepilot` 不工作，可预览 `projects/servicepilot.html`，并按部署环境配置相同的路径重写。

## 编辑首页画像组件

环境要求：Node.js 与 npm。进入组件目录安装依赖并构建：

```bash
cd source/interactive-portrait
npm ci
npm run build
```

`npm run build` 使用 esbuild 将 `src/interactive-portrait.jsx` 打包到 `dist/interactive-portrait.js`。组件依赖 React、React DOM、Framer Motion 和 esbuild。样式位于 `interactive-portrait.css`，视觉资源位于 `assets/`。

构建产物是组件模块的 bundle；将它接入完整线上站点时，还需由站点模板/部署流程把脚本、样式和对应资源同步到线上使用的资源路径。

## 部署说明

静态页面可部署至 Nginx、对象存储静态网站、GitHub Pages 或其他静态托管平台。部署时需要保留目录结构和根路径资源引用，并为 `/projects/...` 等无扩展名路由配置 HTML 回退/重写规则。不要把服务器凭据、`.env` 文件或个人访问令牌提交到仓库。

线上域名与本仓库分开管理；向 GitHub 推送代码不会自动改变线上站点。发布新版本前，请先在目标托管环境预览路由、图片加载、移动端布局和关键交互。

## 隐私与许可

本仓库设为 **Private**。站点素材可能包含个人简历、联系方式及二维码等信息，请勿在未确认内容的情况下将仓库改为公开。当前未附加开源许可证，因此仓库内容默认不授予他人复制、修改或再发布的许可；如需公开或采用特定许可证，请先确认个人资料与素材授权。

## 维护

网站：<https://portfolio.iamwudi.ltd/>  ·  GitHub：<https://github.com/iostreamwudi/portfolio-website>
