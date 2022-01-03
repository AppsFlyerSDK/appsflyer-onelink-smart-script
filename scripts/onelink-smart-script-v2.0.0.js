/**
 * AF Smart Script (Build 2.0.0)
 */

 var AF_URL_SCHEME = "(https:\\/\\/)(([^\\.][^\\.]+).)(.*\\/)(.*)";
 var VALID_AF_URL_PARTS_LENGTH = 5;
 var GOOGLE_CLICK_ID = "gclid";
 var ASSOCIATED_AD_KEYWORD = "keyword";
 var AF_KEYWORDS = "af_keywords";
 var AF_CUSTOM_EXCLUDE_PARAMS_KEYS = ["pid", "c", "af_channel", "af_ad", "af_adset", "deep_link_value", "af_sub1", "af_sub2", "af_sub3", "af_sub4", "af_sub5"];
 var GCLID_EXCLUDE_PARAMS_KEYS = ["pid", "c", "af_channel", "af_ad", "af_adset", "deep_link_value"];
 
 var stringifyParameters = function stringifyParameters() {
   var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
   var paramStr = Object.keys(parameters).reduce(function (curr, key) {
     if (!!parameters[key]) {
       curr += "&".concat(key, "=").concat(parameters[key]);
     }
 
     return curr;
   }, '');
   console.debug("Generated OneLink parameters", paramStr);
   return paramStr;
 };
 
 var getParameterValue = function getParameterValue(currentURLParams) {
   var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
     keys: [],
     overrideValues: {},
     defaultValue: ""
   };
 
   //exit when config object structure is not valid
   if (!(config !== null && config !== void 0 && config.keys && Array.isArray(config.keys) || config !== null && config !== void 0 && config.defaultValue)) {
     console.error("Parameter config structure is wrong", config);
     return null;
   }
 
   var _config$keys = config.keys,
       keys = _config$keys === void 0 ? [] : _config$keys,
       _config$overrideValue = config.overrideValues,
       overrideValues = _config$overrideValue === void 0 ? {} : _config$overrideValue,
       _config$defaultValue = config.defaultValue,
       defaultValue = _config$defaultValue === void 0 ? "" : _config$defaultValue;
   var firstMatchedKey = keys.find(function (key) {
     //set the first match of key which contains also a value
     return !!currentURLParams[key];
   });
 
   if (!!firstMatchedKey) {
     var value = currentURLParams[firstMatchedKey]; //in case the value exists:
     //check if it exists in the overrideValues object, when exists - replace it
     //otherwise return default value
 
     return overrideValues[value] || value || defaultValue;
   }
 
   return defaultValue;
 };
 
 var getURLParametersKV = function getURLParametersKV(urlSearch) {
   var currentURLParams = decodeURIComponent(urlSearch).replace("?", "").split("&").reduce(function (curr, param) {
     var kv = param.split("=");
 
     if (!!kv[0] && !!kv[1]) {
       curr[[kv[0]]] = kv[1];
     }
 
     return curr;
   }, {});
   console.debug("Generated current parameters object", currentURLParams);
   return currentURLParams;
 };
 
 var isSkippedURL = function isSkippedURL(skipKeys) {
   // search if this page referred and contains one of the given keys
   if (!!document.referrer) {
     var lowerReferrer = decodeURIComponent(document.referrer.toLowerCase());
 
     if (!!lowerReferrer) {
       var skipKey = skipKeys.find(function (key) {
         return lowerReferrer.includes(key.toLowerCase());
       });
       !!skipKey && console.debug("Generate url is skipped. HTTP referrer contains key: ", skipKey);
       return !!skipKey;
     }
   }
 
   return false;
 };
 
 var getGoogleClickIdParameters = function getGoogleClickIdParameters(gciKey, currentURLParams) {
   var gciParam = currentURLParams[GOOGLE_CLICK_ID];
   var result = {};
 
   if (gciParam) {
     console.debug("This user comes from Google AdWords");
     result[gciKey] = gciParam;
     var keywordParam = currentURLParams[ASSOCIATED_AD_KEYWORD];
 
     if (keywordParam) {
       console.debug("There is a keyword associated with the ad");
       result[AF_KEYWORDS] = keywordParam;
     }
   } else {
     console.debug("This user comes from SRN or custom network");
   }
 
   return result;
 };
 
 (function () {
   var generateOneLinkURL = function generateOneLinkURL() {
     var _ref, _mediaSource$keys;
 
     var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
       afParameters: {}
     };
     var oneLinkURL = parameters.oneLinkURL,
         _parameters$afParamet = parameters.afParameters;
     _parameters$afParamet = _parameters$afParamet === void 0 ? {} : _parameters$afParamet;
     var mediaSource = _parameters$afParamet.mediaSource,
         campaign = _parameters$afParamet.campaign,
         channel = _parameters$afParamet.channel,
         ad = _parameters$afParamet.ad,
         adSet = _parameters$afParamet.adSet,
         deepLinkValue = _parameters$afParamet.deepLinkValue,
         afSub1 = _parameters$afParamet.afSub1,
         afSub2 = _parameters$afParamet.afSub2,
         afSub3 = _parameters$afParamet.afSub3,
         afSub4 = _parameters$afParamet.afSub4,
         afSub5 = _parameters$afParamet.afSub5,
         afCustom = _parameters$afParamet.afCustom,
         googleClickIdKey = _parameters$afParamet.googleClickIdKey,
         _parameters$referrerS = parameters.referrerSkipList,
         referrerSkipList = _parameters$referrerS === void 0 ? [] : _parameters$referrerS;
     var oneLinkURLParts = (_ref = oneLinkURL || "") === null || _ref === void 0 ? void 0 : _ref.toString().match(AF_URL_SCHEME);
 
     if (!oneLinkURLParts || (oneLinkURLParts === null || oneLinkURLParts === void 0 ? void 0 : oneLinkURLParts.length) < VALID_AF_URL_PARTS_LENGTH) {
       console.error("oneLinkURL is missing or not in the correct format, can't generate URL", oneLinkURL);
       return null;
     }
 
     if ((mediaSource === null || mediaSource === void 0 ? void 0 : (_mediaSource$keys = mediaSource.keys) === null || _mediaSource$keys === void 0 ? void 0 : _mediaSource$keys.length) === 0 && !(mediaSource !== null && mediaSource !== void 0 && mediaSource.defaultValue)) {
       console.error("mediaSource is missing (default value was not supplied), can't generate URL", mediaSource);
       return null;
     }
 
     if (isSkippedURL(referrerSkipList)) {
       return null;
     } // af_js_web=true and af_ss_ver=[version] will be added to every URL that was generated through this script
 
 
     var afParams = {
       af_js_web: true,
       af_ss_ver: window.AF_SMART_SCRIPT.version
     };
     var currentURLParams = getURLParametersKV(window.location.search);
 
     if (mediaSource) {
       var pidValue = getParameterValue(currentURLParams, mediaSource);
 
       if (!pidValue) {
         console.error("mediaSource was not found in the URL and default value was not supplied, can't generate URL", mediaSource);
         return null;
       }
 
       afParams["pid"] = pidValue;
     }
 
     if (campaign) {
       afParams["c"] = getParameterValue(currentURLParams, campaign);
     }
 
     if (channel) {
       afParams["af_channel"] = getParameterValue(currentURLParams, channel);
     }
 
     if (ad) {
       afParams["af_ad"] = getParameterValue(currentURLParams, ad);
     }
 
     if (adSet) {
       afParams["af_adset"] = getParameterValue(currentURLParams, adSet);
     }
 
     if (deepLinkValue) {
       afParams["deep_link_value"] = getParameterValue(currentURLParams, deepLinkValue);
     }
 
     var afSubs = [afSub1, afSub2, afSub3, afSub4, afSub5];
     afSubs.forEach(function (afSub, index) {
       if (afSub) {
         afParams["af_sub".concat(index + 1)] = getParameterValue(currentURLParams, afSub);
       }
     });
 
     if (googleClickIdKey) {
       if (!!GCLID_EXCLUDE_PARAMS_KEYS.find(function (k) {
         return k === googleClickIdKey;
       })) {
         console.debug("Google Click Id ParamKey can't override AF Parameters keys", googleClickIdKey);
       } else {
         var googleParameters = getGoogleClickIdParameters(googleClickIdKey, currentURLParams);
         Object.keys(googleParameters).forEach(function (gpk) {
           afParams[gpk] = googleParameters[gpk];
         });
       }
     }
 
     if (Array.isArray(afCustom)) {
       afCustom.forEach(function (customParam) {
         if (customParam !== null && customParam !== void 0 && customParam.paramKey) {
           if ((customParam === null || customParam === void 0 ? void 0 : customParam.paramKey) === googleClickIdKey || !!AF_CUSTOM_EXCLUDE_PARAMS_KEYS.find(function (k) {
             return k === (customParam === null || customParam === void 0 ? void 0 : customParam.paramKey);
           })) {
             console.debug("Custom parameter ParamKey can't override Google-Click-Id or AF Parameters keys", customParam);
           } else {
             afParams[[customParam.paramKey]] = getParameterValue(currentURLParams, customParam);
           }
         }
       });
     }
 
     var finalParams = stringifyParameters(afParams);
     var finalURL = oneLinkURL + finalParams.replace("&", "?");
     console.debug("Generated OneLink URL", finalURL);
     return {
       clickURL: finalURL
     };
   };
 
   window.AF_SMART_SCRIPT = {
     generateOneLinkURL: generateOneLinkURL,
     version: "2"
   };
 })();