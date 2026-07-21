# NuBright 官网

NuBright Fund Services（香港基金行政管理公司）官方网站。React 18 + Vite 5 + react-router-dom，
无状态管理库。设计令牌在 `src/styles/tokens.css`，组件一律用 CSS Modules + 令牌，**不写死颜色和间距**。

## 分支与上线

- **`main` = 上线**。Netlify 从 main 自动部署，推送后几秒生效。
- **`redesign-v2` = 改版分支**，当前工作分支。
- 动手前先确认 `git branch --show-current`。

## 页面结构

单页为主：`/` 是 LandingPage，另有 `/terms-and-conditions` 和 `/data-protection-policy` 两个
法律条文页（共用 `DataProtectionPolicyPage.module.css`，改样式会同时影响两页）。

## Investor Portal Demo —— 改动前必读

`src/components/ui/InvestorPortalDemoStyle2.jsx`（约 1200 行）+ 同名 CSS（约 1400 行）。
挂在 `PortalTabs` → `InvestorPortal` 里，是一段约 19 秒的自动播放动画，模拟投资者门户的操作过程。
面向客户展示，判断标准是"客户能不能看懂产品在干什么"。

### 架构

不是常规 React 声明式动画，而是**命令式的绝对时间轴**：

```js
after(() => { /* 做某事 */ }, 3080)   // 第 3080 毫秒执行
```

- DOM 用 `data-demo="xxx"` 标记，`q('xxx')` 取到后**直接改 style**，不走 state
- `resetAll()` 恢复初始态，每次播放前调用
- `IntersectionObserver` 滚动进视口时播一次（`hasPlayed` 控制），之后靠重播按钮

### 四个已经踩过的坑

**1. 时间戳是硬编码绝对值。** 插入或删除一段，后面所有时间戳都要平移。批量替换时注意：
大多数写成 `      }, 9200)` 的收尾形式，但状态轮转那三处是**函数参数**（已提取为 `TX_STATUS_AT`）。
只按前一种形式做正则会漏掉后者，表现为"某个环节莫名卡一下"。

**2. 新增定时器必须走 `after()` / `raf()`**，不要裸写 `setTimeout` / `requestAnimationFrame`。
这两个包装会登记句柄以便重播时清理。裸写的会让上一轮残留污染新一轮——平滑滚动的 rAF 循环尤其
危险，它逐帧写 `scrollTop`，会覆盖 `resetAll()` 的归零，导致重播后控件全部错位（表现为"时好时坏"）。

**3. 改动画后必须硬刷新，不能只点重播。** 重播按钮的 onclick 是在 `playDemo()` 内部绑定的，
而 `playDemo` 只在 `hasPlayed` 为 false 时执行一次。`hasPlayed` 是 `useRef`，
**Vite 热更新会保留 ref**，于是新代码加载后重播按钮仍指向旧闭包，你会看到"改了没反应"。

**4. 坐标计算必须用 `relRect()`。** demo 是 1000×560 固定尺寸，移动端靠 `transform: scale()`
整体等比缩小（`--demo-scale` 由 ResizeObserver 写入）。`getBoundingClientRect()` 返回缩放后的
视觉像素，而 `translate` 写在被缩放元素内部会再缩放一次。`relRect()` 统一除回布局坐标系。
新增光标定位、滚动、FLIP 动画时都要经过它，注意布局常量（如 `+36`）不能参与除法。

### 内部版

含 `Fund Access Code` 环节的完整版本在 `~/Desktop/NuBright-Demo-内部版/`，是独立项目，
与本仓库无关联，用于内部演示。官网版已移除该环节（业务方认为暴露操作模式），改为基金选择器。
两边是各自维护的两份代码，改本仓库不会影响它。

## 验证

改完跑 `npx vite build` 确认能构建。动画类改动必须**实际播放一遍**，只看代码不够。
