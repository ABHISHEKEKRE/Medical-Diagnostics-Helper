const { spawn } = require('child_process');

function runPythonScript(inputValue) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['E:/MediNexus/teimaa/script.py', JSON.stringify(inputValue)]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script error: ${data}`);
            reject(new Error(`Python script error: ${data}`));
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                reject(new Error(`Python script exited with code ${code}`));
            }
        });
    });
}

// Example usage
const inputValue = ['Cluster Headache','Pain irradiating to nose','Throat pain'];
runPythonScript(inputValue)
    .then((output) => {
        console.log('Output from Python script:', output);
        // Process the output as needed
    })
    .catch((error) => {
        console.error('Error running Python script:', error);
    });

