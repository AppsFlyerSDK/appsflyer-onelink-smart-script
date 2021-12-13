'use strict';

class OneLinkUrlGenerator {
    // TODO -  add params documentation
    // oneLinkURL - your own basic OneLink URL
    // ...
    constructor({
                    oneLinkURL,
                    pidKeysList = [],
                    pidStaticValue = null,
                    campaignKeysList = [],
                    campaignStaticValue = null,
                    pidOverrideList = [],
                    gclIdParam = 'af_sub5',
                    skipList = ["facebook"]
                } = {}) {

        console.debug("Constructing OneLink URL generator")
        if(oneLinkURL === undefined || typeof oneLinkURL !== "string" || oneLinkURL === "") {
            console.error("OneLinkUrlGenerator: oneLinkURL arg invalid");
            return null;
        }

        this.oneLinkURL = oneLinkURL;
        this.pidOverrideList = pidOverrideList;
        this.gclIdParam = gclIdParam;
        this.pidKeysList = pidKeysList;
        this.pidStaticValue = pidStaticValue;
        this.campaignKeysList = campaignKeysList;
        this.campaignStaticValue = campaignStaticValue;
        this.skipList = skipList

        // OneLink parameters
        this.campaign = getCampaignValue(this.campaignKeysList, this.campaignStaticValue);
        this.mediaSource = getMediaSourceValue(this.pidKeysList, this.pidStaticValue, this.pidOverrideList);

        // af_js_web=true will be added to every URL that was generated through this script
        this.afParams = {af_js_web: "true"};
    }

    generateUrl(){
        if (this.mediaSource == null) {
            console.debug("No valid pid value was found. URL will no be changed");
            return null;
        }

        // User was redirected using af_r parameter on an AppsFlyer attribution link
        if (getParameterFromURL('af_redirect')) {
            console.debug("This user comes from AppsFlyer by redirection and is ready to be attributed. \nKeep direct app store links.");
            return null; // in this case, the original store links in the install buttons stay the same
        }

        if (this.isSkipped()) {
            console.debug("This URL is marked for skipping. The script will return null");
            // the caller should make sure a return value of null will leave the original link
            return null;
        }

        // Google Ads
        let pidValue = this.mediaSource;
        const gclIdValue = getParameterFromURL('gclid');

        if (gclIdValue) {
            this.afParams[this.gclIdParam] = gclIdValue
            console.debug("This user comes from Google AdWords");

            const kwValue = getParameterFromURL('keyword');
            if (!!kwValue) {
                this.afParams['af_keywords'] = kwValue;
                console.debug("There is a keyword associated with the ad");
            }
        // Other SRNs, custom networks and organic installs
        } else {
            console.debug("This user comes from SRN or custom network ");
        }
        const finalURL = this.oneLinkURL + '?pid=' + pidValue + '&c=' + this.campaign + stringifyAfParameters(this.afParams);
        console.debug(`Generated OneLink URL ${finalURL}`)
        return finalURL;
    }

    // Should this URL be skipped base on the HTTP referrer and the skipList[]
    isSkipped() {
        if (document.referrer && document.referrer != "") {
            for (var i=0; i<this.skipList.length; i++) {
                const skipStr = this.skipList[i];
                if (document.referrer.toLowerCase().includes(skipStr.toLowerCase())) {
                    console.debug("Skipping the script. HTTP referrer has: " + skipStr);
                    return true;
                }
            }
        }
        return false;
    }

    // Setters for AF params
    setDeepLinkValue(deepLinkValueParam, deepLinkValue = null){
        setGenericParameter(this.afParams, 'deep_link_value', deepLinkValueParam, deepLinkValue);
    }

    setChannel(channelParam, channelValue = null){
        setGenericParameter(this.afParams, 'af_channel', channelParam, channelValue);
    }

    setAdset(adsetParam, adsetValue = null){
        setGenericParameter(this.afParams, 'af_adset', adsetParam, adsetValue);
    }

    setAd(adParam, adValue = null){
        setGenericParameter(this.afParams, 'af_ad', adParam, adValue);
    }

    setAfSub1(afSub1Param, afSub1Value = null){
        setGenericParameter(this.afParams, 'af_sub1', afSub1Param, afSub1Value);
    }

    setAfSub2(afSub2Param, afSub2Value = null){
        setGenericParameter(this.afParams, 'af_sub2', afSub2Param, afSub2Value);
    }

    setAfSub3(afSub3Param, afSub3Value = null){
        setGenericParameter(this.afParams, 'af_sub3', afSub3Param, afSub3Value);
    }

    setAfSub4(afSub4Param, afSub4Value = null){
        setGenericParameter(this.afParams, 'af_sub4', afSub4Param, afSub4Value);
    }

    setAfSub5(afSub5Param, afSub5Value = null){
        setGenericParameter(this.afParams, 'af_sub5', afSub5Param, afSub5Value);
    }

    setCustomParameter(searchKey, customKey, customValue = null) {
        setGenericParameter(this.afParams, customKey, searchKey, customValue);
    }
}

// Statis state-less functions
function getParameterFromURL(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ''));
}

function getMediaSourceValue(pidKeysList, pidStaticValue, pidOverrideList){
    let pidValue = null;

    for (let pidKey of pidKeysList){
        if (pidKey != null && getParameterFromURL(pidKey)) {
            pidValue = getParameterFromURL(pidKey);
            break;
        }
    }

    if (pidValue != null) {
        if(pidOverrideList.hasOwnProperty(pidValue)) 
            pidValue = pidOverrideList[pidValue];
    } else {
        pidValue = pidStaticValue;
    }
    return pidValue;
}

function getCampaignValue(campaignKeysList, campaignStaticValue){
    for (let campaignKey of campaignKeysList){
        if (getParameterFromURL(campaignKey)) {
            return getParameterFromURL(campaignKey);
        }
    }

    if(campaignStaticValue != null) {
        return campaignStaticValue;
    }

    if (!!document.getElementsByTagName('title')[0]) {
        return document.getElementsByTagName('title')[0].innerText;
    }
    return 'unknown';
}

// Create a string of param and value from
function stringifyAfParameters(afParams) {
    let finalStr = "";

    for (var key of Object.keys(afParams)) {
        console.debug(key + "->" + afParams[key]);
        if (afParams[key] != null) {
            finalStr += `&${key}=${afParams[key]}`;
        } 
    }
    return finalStr;
}

function setGenericParameter(afParams, oneLinkParam, searchKey, newParamValue = null) {
    const searchKeyResult = getParameterFromURL(searchKey);
    if (searchKeyResult) {
        afParams[oneLinkParam] = searchKeyResult;
        console.debug(`${searchKey} found. ${oneLinkParam} = ${searchKeyResult}`)
    } else {
        if (newParamValue != null) {
            afParams[oneLinkParam] = newParamValue;
            console.debug(`${searchKey} not found. ${oneLinkParam} = ${newParamValue}`)
        } else {
            console.debug(`${searchKey} not found and newParamValue is null. Skipping.`)
        }
    }
}

(function(){
    window.AF = Object.assign((window.AF || {}),{OneLinkUrlGenerator: OneLinkUrlGenerator});
})();
