const { spawn } = require('child_process');
const fs = require('fs').promises

async function invokeSubmission(filePath, inputString, err, success) {
    const python = spawn('python3', [filePath]);

    const inputBuffer = inputString

    let stdout = ""
    let stderr = ""
    python.stdin.write(inputBuffer)
    python.stdin.end()

    python.stdout.on('data', (data) => {
      stdout = stdout + data
    });
      
    python.stderr.on('data', (data) => {
      stderr = stderr + data
    });
    
    python.on('close', (code) => {
      if (code == 0) {
        // 0 significa sucesso, então envie stdout
        success(stdout)
      } else {
        err(stderr)
      }
    });
}

module.exports = invokeSubmission