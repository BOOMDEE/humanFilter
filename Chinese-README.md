# humanFilter 人类过滤器
---
极致轻量、无需后端的浏览器原生算力人机验证库。
## 核心特性
 * **原生防御**：利用算力证明 (PoW) 机制，无需后端 API 即可审计客户端。
 * **零侵入感**：完全透明的后台验证，用户感知为零，不影响体验。
 * **简洁接入**：基于 ES Modules 的模块化设计，一行代码即可集成防御。
 * **防爬虫利器**：通过内存压力与浮点运算强制爬虫耗费资源，有效过滤无头浏览器。
## 安装方式
直接将 humanFilter.js 文件下载至你的项目目录中即可。
## 快速开始
在你的博客或网页中，通过以下方式引入并初始化：
```javascript
// 1. 引入模块
import { HumanFilter } from './humanFilter.js';

// 2. 初始化过滤器，设置耗时阈值 (单位: ms)
// 建议值：20-50ms，根据你的服务器/网页加载环境适当调整
const hfr = new HumanFilter(30);

// 3. 执行验证
(async () => {
    const isHuman = await hfr.verify();
    
    if (!isHuman) {
        // 验证失败，触发防御机制
        console.warn("检测到异常请求，正在重定向...");
        window.location.replace("about:blank");
    } else {
        console.log("验证通过，欢迎访问。");
    }
})();

```
## 配置项说明
| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| thresholdMs | Number | 20 | 验证耗时阈值，低于此值将被判定为自动化脚本 |
## 安全建议
 1. **部署位置**：建议将该脚本放在 HTML 的 <head> 标签最上方，以确保在页面渲染前完成人机身份审计。
 2. **构建混淆**：若对安全性有更高要求，发布前建议使用 Webpack 或 Terser 对 humanFilter.js 中的 workerScript 部分进行混淆处理。
## 开源协议
本项目采用 **CC BY-NC-SA 4.0** 开源协议。
