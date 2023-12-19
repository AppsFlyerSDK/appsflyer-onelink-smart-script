const fs = require('fs').promises;

const directoryPath = './examples';

const runTestOnFilesInDir = async (directoryPath) => {
    try {
        const files = await fs.readdir(directoryPath);
        console.log(files);
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}

(async () => {
    await runTestOnFilesInDir(directoryPath);
})()