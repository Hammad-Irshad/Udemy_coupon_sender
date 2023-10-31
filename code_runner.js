const { exec } = require('child_process');

async function initializeProject() {
  return new Promise((resolve, reject) => {
    exec('npm init -y', (error, stdout, stderr) => {
      if (error) {
        reject(`Error initializing Node.js project: ${error}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function installNodemailer() {
  return new Promise((resolve, reject) => {
    exec('npm i nodemailer', (error, stdout, stderr) => {
      if (error) {
        reject(`Error installing nodemailer: ${error}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function executePythonScript() {
  return new Promise((resolve, reject) => {
    exec('python code/main.py', (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing main.py: ${error}`);
      } else {
        console.log("python complete:");
        resolve();
      }
    });
  });
}

async function executeNodeScript() {
  return new Promise((resolve, reject) => {
    exec('node code/main.js', (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing main.js: ${error}`);
      } else {
        console.log("Message sent:");
        resolve();
      }
    });
  });
}

async function main() {
  try {
    await executePythonScript();
    await executeNodeScript();
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  try {
    await initializeProject();
    await installNodemailer();
    setInterval(main, 15 * 60 * 1000); // Send email every one minute
  } catch (error) {
    console.error(error);
  }
})();