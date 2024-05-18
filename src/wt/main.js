const { Worker, threadId } = require('worker_threads');
const os = require('os');

const numThreads = os.cpus().length;

const performCalculations = async () => {
    const promises = [];
    const results = [];

    for (let i = 0; i < numThreads; i++) {
        const worker = new Worker('./worker.js');
        const startNumber = 10 + i;

        const promise = new Promise((resolve) => {
            worker.on('message', (result) => {
                results[threadId - 1] = result;
                resolve();
            });
        });

        worker.postMessage(startNumber);
        promises.push(promise);
    }

    await Promise.all(promises);

    console.log(results);
};

await performCalculations();