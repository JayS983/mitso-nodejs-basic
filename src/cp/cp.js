const { spawn } = require('child_process');

const spawnChildProcess = async (args) => {
    const child = spawn('node', ['script.js', ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    // Set up communication between parent and child processes
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    // Log any errors
    child.on('error', (err) => {
        console.error('Child process error:', err);
    });

    // Log when the child process exits
    child.on('exit', (code, signal) => {
        console.log(`Child process exited with code ${code} and signal ${signal}`);
    });
};

// Example usage
spawnChildProcess(['arg1', 'arg2', 'arg3']);