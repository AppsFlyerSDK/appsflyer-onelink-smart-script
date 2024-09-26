const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { getUrlsFromCommentsArray, getInitialScriptFromHtmlFile } = require("./utils/functions");

const directoryPath = './examples';

const runTestOnFilesInDir = async (directoryPath) => {
    try {
        const files = await fs.readdir(directoryPath);

        const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');

        const browser = await puppeteer.launch({ headless: "new" });

        await Promise.all(htmlFiles.map(async (htmlFile) => {
            try {
                const parentDir = path.resolve(__dirname, '..');
                const filePath = path.join(parentDir, 'examples', htmlFile);

                const [inputUrl, expectedOutputUrl] = await getUrlsFromCommentsArray(filePath);

                let paramsString = inputUrl.split('?')[1];
                const paramsObject = new URLSearchParams(paramsString);

                const initialScript = await getInitialScriptFromHtmlFile(filePath);

                const url = `https://check-smartscript-page.glitch.me?${new URLSearchParams({
                    initialScript: encodeURIComponent(initialScript),
                    expectedOutputUrl: encodeURIComponent(expectedOutputUrl),
                }) + "&" + paramsObject}`;

                if (url) {
                    await checkResultForURL(htmlFile, url, browser)
                }
            } catch (error) {
                console.log(`Skiped file ${htmlFile} - ${error} `);
            }
        }));

        browser.close()
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}

const checkResultForURL = async (htmlFile, url, browser) => {
    try {
        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "networkidle2",
        })

        const result = await page.evaluate(() => {
            const smartscriptResult = document.getElementById("smartscript-result").textContent
            return smartscriptResult
        });

        if (result == "false") {
            throw await page.evaluate(() => window.smartscriptResultData);
        }
        console.log("File " + htmlFile + " passed");

    } catch (error) {
        console.error("Error: ", error);
        console.error("File name: ", htmlFile);
        process.exit(1)
    }
}

(async () => {
    await runTestOnFilesInDir(directoryPath);
})()