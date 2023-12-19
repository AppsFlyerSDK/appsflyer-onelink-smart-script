const yamlFilePath = './parametersToIgnore.yaml';

const main = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);

        if (!urlParams.get('initialScript')) {
            throw "Initial smartscript code is equal to null";
        }

        if (!urlParams.get('expectedOutputUrl')) {
            throw ("Expected output url is equal to null");
        }

        let initialScriptString = decodeURIComponent(urlParams.get('initialScript'));
        const expectedOutputUrl = decodeURIComponent(urlParams.get('expectedOutputUrl'));

        const initialScript = new Function(initialScriptString);
        initialScript()

        const isSame = compareUrls(expectedOutputUrl, document.getElementById("output_url").textContent, parametersToIgnore);

        if (isSame["diffParams"] != undefined) {
            window.smartscriptResultData = isSame
            document.getElementById("smartscript-result").textContent = "false";
        } else {
            document.getElementById("smartscript-result").textContent = "true";
        }

    } catch (error) {
        console.log(error);
        console.error("Error: " + error);
    }
}

function diffURLSearchParams(params1, params2) {
    const diff = {};

    // Check keys in the first URLSearchParams object
    params1.forEach((value, key) => {
        if (!params2.has(key)) {
            diff[key] = {
                expectedUrlValue: value,
                resultUrlValue: undefined,
                status: 'Only in expacted url',
            };
        } else if (params2.get(key) !== value) {
            diff[key] = {
                expectedUrlValue: value,
                resultUrlValue: params2.get(key),
                status: 'Differing values',
            };
        }
    });

    // Check keys in the second URLSearchParams object
    params2.forEach((value, key) => {
        if (!params1.has(key)) {
            diff[key] = {
                expectedUrlValue: undefined,
                resultUrlValue: value,
                status: 'Only in result url',
            };
        }
    });
    if (Object.keys(diff).length == 0) {
        return null;
    }
    return diff;
}

function compareUrls(expectedOutputUrl, resultUrl) {

    const params1 = new URLSearchParams(expectedOutputUrl.split('?')[1]);
    const params2 = new URLSearchParams(resultUrl.split('?')[1]);

    const parametersToIgnore = getArrFromYaml(yamlFilePath)
    // Remove the parametersToIgnore from both URLSearchParams
    parametersToIgnore.forEach((p) => {
        params1.delete(p);
        params2.delete(p);
    })

    const isDifferentParams = diffURLSearchParams(params1, params2)
    if (isDifferentParams) {
        return {
            diffParams: isDifferentParams, expectedOutputUrl,
            resultUrl
        };
    }
    return { expectedOutputUrl, resultUrl };
}

const getArrFromYaml = async (filePath) => {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load YAML file (${response.status} ${response.statusText})`);
        }

        const yamlContent = await response.text();
        const dataArray = jsyaml.load(yamlContent);

        if (!Array.isArray(dataArray)) {
            throw new Error('Invalid YAML content. Expected an array.');
        }
        return dataArray;
    } catch (error) {
        console.error(error.message);
        // Handle the error as needed
        return null; // or throw the error again if you want to propagate it
    }
}

main();