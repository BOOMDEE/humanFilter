/**
 * HumanFilter v1.0
 * Browser-native PoW (Proof of Work) bot defense.
 * License: CC BY-NC-SA 4.0
 */
export class HumanFilter {
    /**
     * @param {number} thresholdMs - Minimum execution time in ms to be considered human.
     */
    constructor(thresholdMs = 20) {
        this.thresholdMs = thresholdMs;
        // The worker script: memory-intensive shuffle + math-heavy calculation
        this.workerScript = `
            self.onmessage = () => {
                try {
                    const size = 10000000;
                    const arr = new Float64Array(size);
                    for(let i = 0; i < size; i++) arr[i] = Math.random();
                    
                    let pi = 0n;
                    for(let i = 0; i < 50000; i++) {
                        pi += BigInt(Math.floor(1000000 / (2 * i + 1)));
                    }
                    self.postMessage({ success: true });
                } catch (e) {
                    self.postMessage({ success: false });
                }
            };
        `;
    }

    /**
     * Executes the verification and returns the result.
     * @returns {Promise<boolean>} - True if passed (human), false if failed (bot).
     */
    async verify() {
        return new Promise((resolve) => {
            const blob = new Blob([this.workerScript], { type: 'application/javascript' });
            const worker = new Worker(URL.createObjectURL(blob));
            const start = performance.now();

            worker.postMessage({});
            worker.onmessage = (e) => {
                const duration = performance.now() - start;
                worker.terminate();
                
                // Bot detection: bot-accelerated scripts finish faster than the threshold
                resolve(e.data.success && duration > this.thresholdMs);
            };

            // Safety timeout
            setTimeout(() => {
                worker.terminate();
                resolve(false);
            }, 5000);
        });
    }
}
