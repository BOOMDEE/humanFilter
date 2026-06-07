# humanFilter
An ultra-lightweight, browser-native PoW (Proof of Work) bot-defense library with no backend dependency.
## Key Features
 * **Native Defense**: Audits clients using a Proof of Work (PoW) mechanism, requiring no backend API.
 * **Zero Intrusion**: Completely transparent background verification that is imperceptible to users and does not affect the experience.
 * **Simple Integration**: Modular design based on ES Modules; integrate defense with a single line of code.
 * **Anti-Crawler Tool**: Forces crawlers to consume resources through memory pressure and floating-point operations, effectively filtering out headless browsers.
## Installation
Simply download the humanFilter.js file and place it into your project directory.
## Quick Start
Import and initialize it in your blog or webpage as follows:
```javascript
// 1. Import the module
import { HumanFilter } from './humanFilter.js';

// 2. Initialize the filter and set the time threshold (in ms)
// Recommended value: 20-50ms, adjust based on your server/webpage loading environment
const hfr = new HumanFilter(30);

// 3. Execute verification
(async () => {
    const isHuman = await hfr.verify();
    
    if (!isHuman) {
        // Verification failed, trigger defense mechanism
        console.warn("Abnormal request detected, redirecting...");
        window.location.replace("about:blank");
    } else {
        console.log("Verification passed. Welcome.");
    }
})();

```
## Configuration
| Parameter | Type | Default | Description |
|---|---|---|---|
| thresholdMs | Number | 20 | Verification time threshold; values below this will be flagged as automated scripts. |
## Security Recommendations
 1. **Deployment**: It is recommended to place this script at the very top of the HTML <head> tag to ensure human identity auditing is completed before page rendering.
 2. **Build Obfuscation**: If higher security is required, it is recommended to use Webpack or Terser to obfuscate the workerScript section in humanFilter.js before deployment.
## License
This project is licensed under the **CC BY-NC-SA 4.0** license.
