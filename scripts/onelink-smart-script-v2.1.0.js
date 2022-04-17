/**
 * AF Smart Script (Build 2.1.0)
 */

 var AF_URL_SCHEME = '(https:\\/\\/)(([^\\.][^\\.]+).)(.*\\/)(.*)';
 var VALID_AF_URL_PARTS_LENGTH = 5;
 var GOOGLE_CLICK_ID = 'gclid';
 var ASSOCIATED_AD_KEYWORD = 'keyword';
 var AF_KEYWORDS = 'af_keywords';
 var AF_CUSTOM_EXCLUDE_PARAMS_KEYS = ['pid', 'c', 'af_channel', 'af_ad', 'af_adset', 'deep_link_value', 'af_sub1', 'af_sub2', 'af_sub3', 'af_sub4', 'af_sub5'];
 var GCLID_EXCLUDE_PARAMS_KEYS = ['pid', 'c', 'af_channel', 'af_ad', 'af_adset', 'deep_link_value'];
 
 var stringifyParameters = function stringifyParameters() {
   var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
   var paramStr = Object.keys(parameters).reduce(function (curr, key) {
     if (parameters[key]) {
       curr += "&".concat(key, "=").concat(parameters[key]);
     }
 
     return curr;
   }, '');
   console.debug('Generated OneLink parameters', paramStr);
   return paramStr;
 };
 
 var getParameterValue = function getParameterValue(currentURLParams) {
   var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
     keys: [],
     overrideValues: {},
     defaultValue: ''
   };
 
   //exit when config object structure is not valid
   if (!(config !== null && config !== void 0 && config.keys && Array.isArray(config.keys) || config !== null && config !== void 0 && config.defaultValue)) {
     console.error('Parameter config structure is wrong', config);
     return null;
   }
 
   var _config$keys = config.keys,
       keys = _config$keys === void 0 ? [] : _config$keys,
       _config$overrideValue = config.overrideValues,
       overrideValues = _config$overrideValue === void 0 ? {} : _config$overrideValue,
       _config$defaultValue = config.defaultValue,
       defaultValue = _config$defaultValue === void 0 ? '' : _config$defaultValue;
   var firstMatchedKey = keys.find(function (key) {
     //set the first match of key which contains also a value
     return !!currentURLParams[key];
   });
 
   if (firstMatchedKey) {
     var value = currentURLParams[firstMatchedKey]; //in case the value exists:
     //check if it exists in the overrideValues object, when exists - replace it
     //otherwise return default value
 
     return overrideValues[value] || value || defaultValue;
   }
 
   return defaultValue;
 };
 
 var getURLParametersKV = function getURLParametersKV(urlSearch) {
   var currentURLParams = decodeURIComponent(urlSearch).replace('?', '').split('&').reduce(function (curr, param) {
     var kv = param.split('=');
 
     if (!!kv[0] && !!kv[1]) {
       curr[[kv[0]]] = kv[1];
     }
 
     return curr;
   }, {});
   console.debug('Generated current parameters object', currentURLParams);
   return currentURLParams;
 };
 
 var isSkippedURL = function isSkippedURL(_ref) {
   var url = _ref.url,
       skipKeys = _ref.skipKeys,
       errorMsg = _ref.errorMsg;
 
   // search if this page referred and contains one of the given keys
   if (url) {
     var lowerURL = decodeURIComponent(url.toLowerCase());
 
     if (lowerURL) {
       var skipKey = skipKeys.find(function (key) {
         return lowerURL.includes(key.toLowerCase());
       });
       !!skipKey && console.debug(errorMsg, skipKey);
       return !!skipKey;
     }
   }
 
   return false;
 };
 
 var getGoogleClickIdParameters = function getGoogleClickIdParameters(gciKey, currentURLParams) {
   var gciParam = currentURLParams[GOOGLE_CLICK_ID];
   var result = {};
 
   if (gciParam) {
     console.debug('This user comes from Google AdWords');
     result[gciKey] = gciParam;
     var keywordParam = currentURLParams[ASSOCIATED_AD_KEYWORD];
 
     if (keywordParam) {
       console.debug('There is a keyword associated with the ad');
       result[AF_KEYWORDS] = keywordParam;
     }
   } else {
     console.debug('This user comes from SRN or custom network');
   }
 
   return result;
 };
 
 function _typeof(obj) {
   "@babel/helpers - typeof";
 
   return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
     return typeof obj;
   } : function (obj) {
     return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
   }, _typeof(obj);
 }
 
 /**
  * EasyQRCodeJS
  *
  * Cross-browser QRCode generator for pure javascript. Support Canvas, SVG and Table drawing methods. Support Dot style, Logo, Background image, Colorful, Title etc. settings. Support Angular, Vue.js, React, Next.js, Svelte framework. Support binary(hex) data mode.(Running with DOM on client side)
  *
  * Version 4.4.10
  *
  * @author [ inthinkcolor@gmail.com ]
  *
  * @see https://github.com/ushelp/EasyQRCodeJS
  * @see http://www.easyproject.cn/easyqrcodejs/tryit.html
  * @see https://github.com/ushelp/EasyQRCodeJS-NodeJS
  *
  * Copyright 2017 Ray, EasyProject
  * Released under the MIT license
  *
  * [Support AMD, CMD, CommonJS/Node.js]
  *
  */
 function QRCode() {
 
   var undefined$1;
   /** Node.js global æ£€æµ‹. */
 
   var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
   /** `self` å˜é‡æ£€æµ‹. */
 
   var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
   /** å…¨å±€å¯¹è±¡æ£€æµ‹. */
 
   var root = freeGlobal || freeSelf || Function('return this')();
   /** `exports` å˜é‡æ£€æµ‹. */
 
   var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
   /** `module` å˜é‡æ£€æµ‹. */
 
   var freeModule = freeExports && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;
   var _QRCode = root.QRCode;
   var QRCode;
 
   function QR8bitByte(data, binary, utf8WithoutBOM) {
     this.mode = QRMode.MODE_8BIT_BYTE;
     this.data = data;
     this.parsedData = []; // Added to support UTF-8 Characters
 
     for (var i = 0, l = this.data.length; i < l; i++) {
       var byteArray = [];
       var code = this.data.charCodeAt(i);
 
       if (binary) {
         byteArray[0] = code;
       } else {
         if (code > 0x10000) {
           byteArray[0] = 0xf0 | (code & 0x1c0000) >>> 18;
           byteArray[1] = 0x80 | (code & 0x3f000) >>> 12;
           byteArray[2] = 0x80 | (code & 0xfc0) >>> 6;
           byteArray[3] = 0x80 | code & 0x3f;
         } else if (code > 0x800) {
           byteArray[0] = 0xe0 | (code & 0xf000) >>> 12;
           byteArray[1] = 0x80 | (code & 0xfc0) >>> 6;
           byteArray[2] = 0x80 | code & 0x3f;
         } else if (code > 0x80) {
           byteArray[0] = 0xc0 | (code & 0x7c0) >>> 6;
           byteArray[1] = 0x80 | code & 0x3f;
         } else {
           byteArray[0] = code;
         }
       }
 
       this.parsedData.push(byteArray);
     }
 
     this.parsedData = Array.prototype.concat.apply([], this.parsedData);
 
     if (!utf8WithoutBOM && this.parsedData.length != this.data.length) {
       this.parsedData.unshift(191);
       this.parsedData.unshift(187);
       this.parsedData.unshift(239);
     }
   }
 
   QR8bitByte.prototype = {
     getLength: function getLength(buffer) {
       return this.parsedData.length;
     },
     write: function write(buffer) {
       for (var i = 0, l = this.parsedData.length; i < l; i++) {
         buffer.put(this.parsedData[i], 8);
       }
     }
   };
 
   function QRCodeModel(typeNumber, errorCorrectLevel) {
     this.typeNumber = typeNumber;
     this.errorCorrectLevel = errorCorrectLevel;
     this.modules = null;
     this.moduleCount = 0;
     this.dataCache = null;
     this.dataList = [];
   }
 
   QRCodeModel.prototype = {
     addData: function addData(data, binary, utf8WithoutBOM) {
       var newData = new QR8bitByte(data, binary, utf8WithoutBOM);
       this.dataList.push(newData);
       this.dataCache = null;
     },
     isDark: function isDark(row, col) {
       if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
         throw new Error(row + ',' + col);
       }
 
       return this.modules[row][col][0];
     },
     getEye: function getEye(row, col) {
       if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
         throw new Error(row + ',' + col);
       }
 
       var block = this.modules[row][col]; // [isDark(ture/false), EyeOuterOrInner(O/I), Position(TL/TR/BL/A) ]
 
       if (block[1]) {
         var type = 'P' + block[1] + '_' + block[2]; //PO_TL, PI_TL, PO_TR, PI_TR, PO_BL, PI_BL
 
         if (block[2] == 'A') {
           type = 'A' + block[1]; // AI, AO
         }
 
         return {
           isDark: block[0],
           type: type
         };
       } else {
         return null;
       }
     },
     getModuleCount: function getModuleCount() {
       return this.moduleCount;
     },
     make: function make() {
       this.makeImpl(false, this.getBestMaskPattern());
     },
     makeImpl: function makeImpl(test, maskPattern) {
       this.moduleCount = this.typeNumber * 4 + 17;
       this.modules = new Array(this.moduleCount);
 
       for (var row = 0; row < this.moduleCount; row++) {
         this.modules[row] = new Array(this.moduleCount);
 
         for (var col = 0; col < this.moduleCount; col++) {
           this.modules[row][col] = []; // [isDark(ture/false), EyeOuterOrInner(O/I), Position(TL/TR/BL) ]
         }
       }
 
       this.setupPositionProbePattern(0, 0, 'TL'); // TopLeft, TL
 
       this.setupPositionProbePattern(this.moduleCount - 7, 0, 'BL'); // BotoomLeft, BL
 
       this.setupPositionProbePattern(0, this.moduleCount - 7, 'TR'); // TopRight, TR
 
       this.setupPositionAdjustPattern('A'); // Alignment, A
 
       this.setupTimingPattern();
       this.setupTypeInfo(test, maskPattern);
 
       if (this.typeNumber >= 7) {
         this.setupTypeNumber(test);
       }
 
       if (this.dataCache == null) {
         this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
       }
 
       this.mapData(this.dataCache, maskPattern);
     },
     setupPositionProbePattern: function setupPositionProbePattern(row, col, posName) {
       for (var r = -1; r <= 7; r++) {
         if (row + r <= -1 || this.moduleCount <= row + r) continue;
 
         for (var c = -1; c <= 7; c++) {
           if (col + c <= -1 || this.moduleCount <= col + c) continue;
 
           if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
             this.modules[row + r][col + c][0] = true;
             this.modules[row + r][col + c][2] = posName; // Position
 
             if (r == -0 || c == -0 || r == 6 || c == 6) {
               this.modules[row + r][col + c][1] = 'O'; // Position Outer
             } else {
               this.modules[row + r][col + c][1] = 'I'; // Position Inner
             }
           } else {
             this.modules[row + r][col + c][0] = false;
           }
         }
       }
     },
     getBestMaskPattern: function getBestMaskPattern() {
       var minLostPoint = 0;
       var pattern = 0;
 
       for (var i = 0; i < 8; i++) {
         this.makeImpl(true, i);
         var lostPoint = QRUtil.getLostPoint(this);
 
         if (i == 0 || minLostPoint > lostPoint) {
           minLostPoint = lostPoint;
           pattern = i;
         }
       }
 
       return pattern;
     },
     createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
       var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
       var cs = 1;
       this.make();
 
       for (var row = 0; row < this.modules.length; row++) {
         var y = row * cs;
 
         for (var col = 0; col < this.modules[row].length; col++) {
           var x = col * cs;
           var dark = this.modules[row][col][0];
 
           if (dark) {
             qr_mc.beginFill(0, 100);
             qr_mc.moveTo(x, y);
             qr_mc.lineTo(x + cs, y);
             qr_mc.lineTo(x + cs, y + cs);
             qr_mc.lineTo(x, y + cs);
             qr_mc.endFill();
           }
         }
       }
 
       return qr_mc;
     },
     setupTimingPattern: function setupTimingPattern() {
       for (var r = 8; r < this.moduleCount - 8; r++) {
         if (this.modules[r][6][0] != null) {
           continue;
         }
 
         this.modules[r][6][0] = r % 2 == 0;
       }
 
       for (var c = 8; c < this.moduleCount - 8; c++) {
         if (this.modules[6][c][0] != null) {
           continue;
         }
 
         this.modules[6][c][0] = c % 2 == 0;
       }
     },
     setupPositionAdjustPattern: function setupPositionAdjustPattern(posName) {
       var pos = QRUtil.getPatternPosition(this.typeNumber);
 
       for (var i = 0; i < pos.length; i++) {
         for (var j = 0; j < pos.length; j++) {
           var row = pos[i];
           var col = pos[j];
 
           if (this.modules[row][col][0] != null) {
             continue;
           }
 
           for (var r = -2; r <= 2; r++) {
             for (var c = -2; c <= 2; c++) {
               if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                 this.modules[row + r][col + c][0] = true;
                 this.modules[row + r][col + c][2] = posName; // Position
 
                 if (r == -2 || c == -2 || r == 2 || c == 2) {
                   this.modules[row + r][col + c][1] = 'O'; // Position Outer
                 } else {
                   this.modules[row + r][col + c][1] = 'I'; // Position Inner
                 }
               } else {
                 this.modules[row + r][col + c][0] = false;
               }
             }
           }
         }
       }
     },
     setupTypeNumber: function setupTypeNumber(test) {
       var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
 
       for (var i = 0; i < 18; i++) {
         var mod = !test && (bits >> i & 1) == 1;
         this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3][0] = mod;
       }
 
       for (var i = 0; i < 18; i++) {
         var mod = !test && (bits >> i & 1) == 1;
         this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)][0] = mod;
       }
     },
     setupTypeInfo: function setupTypeInfo(test, maskPattern) {
       var data = this.errorCorrectLevel << 3 | maskPattern;
       var bits = QRUtil.getBCHTypeInfo(data);
 
       for (var i = 0; i < 15; i++) {
         var mod = !test && (bits >> i & 1) == 1;
 
         if (i < 6) {
           this.modules[i][8][0] = mod;
         } else if (i < 8) {
           this.modules[i + 1][8][0] = mod;
         } else {
           this.modules[this.moduleCount - 15 + i][8][0] = mod;
         }
       }
 
       for (var i = 0; i < 15; i++) {
         var mod = !test && (bits >> i & 1) == 1;
 
         if (i < 8) {
           this.modules[8][this.moduleCount - i - 1][0] = mod;
         } else if (i < 9) {
           this.modules[8][15 - i - 1 + 1][0] = mod;
         } else {
           this.modules[8][15 - i - 1][0] = mod;
         }
       }
 
       this.modules[this.moduleCount - 8][8][0] = !test;
     },
     mapData: function mapData(data, maskPattern) {
       var inc = -1;
       var row = this.moduleCount - 1;
       var bitIndex = 7;
       var byteIndex = 0;
 
       for (var col = this.moduleCount - 1; col > 0; col -= 2) {
         if (col == 6) col--;
 
         while (true) {
           for (var c = 0; c < 2; c++) {
             if (this.modules[row][col - c][0] == null) {
               var dark = false;
 
               if (byteIndex < data.length) {
                 dark = (data[byteIndex] >>> bitIndex & 1) == 1;
               }
 
               var mask = QRUtil.getMask(maskPattern, row, col - c);
 
               if (mask) {
                 dark = !dark;
               }
 
               this.modules[row][col - c][0] = dark;
               bitIndex--;
 
               if (bitIndex == -1) {
                 byteIndex++;
                 bitIndex = 7;
               }
             }
           }
 
           row += inc;
 
           if (row < 0 || this.moduleCount <= row) {
             row -= inc;
             inc = -inc;
             break;
           }
         }
       }
     }
   };
   QRCodeModel.PAD0 = 0xec;
   QRCodeModel.PAD1 = 0x11;
 
   QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
     var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
     var buffer = new QRBitBuffer();
 
     for (var i = 0; i < dataList.length; i++) {
       var data = dataList[i];
       buffer.put(data.mode, 4);
       buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
       data.write(buffer);
     }
 
     var totalDataCount = 0;
 
     for (var i = 0; i < rsBlocks.length; i++) {
       totalDataCount += rsBlocks[i].dataCount;
     }
 
     if (buffer.getLengthInBits() > totalDataCount * 8) {
       throw new Error('code length overflow. (' + buffer.getLengthInBits() + '>' + totalDataCount * 8 + ')');
     }
 
     if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
       buffer.put(0, 4);
     }
 
     while (buffer.getLengthInBits() % 8 != 0) {
       buffer.putBit(false);
     }
 
     while (true) {
       if (buffer.getLengthInBits() >= totalDataCount * 8) {
         break;
       }
 
       buffer.put(QRCodeModel.PAD0, 8);
 
       if (buffer.getLengthInBits() >= totalDataCount * 8) {
         break;
       }
 
       buffer.put(QRCodeModel.PAD1, 8);
     }
 
     return QRCodeModel.createBytes(buffer, rsBlocks);
   };
 
   QRCodeModel.createBytes = function (buffer, rsBlocks) {
     var offset = 0;
     var maxDcCount = 0;
     var maxEcCount = 0;
     var dcdata = new Array(rsBlocks.length);
     var ecdata = new Array(rsBlocks.length);
 
     for (var r = 0; r < rsBlocks.length; r++) {
       var dcCount = rsBlocks[r].dataCount;
       var ecCount = rsBlocks[r].totalCount - dcCount;
       maxDcCount = Math.max(maxDcCount, dcCount);
       maxEcCount = Math.max(maxEcCount, ecCount);
       dcdata[r] = new Array(dcCount);
 
       for (var i = 0; i < dcdata[r].length; i++) {
         dcdata[r][i] = 0xff & buffer.buffer[i + offset];
       }
 
       offset += dcCount;
       var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
       var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
       var modPoly = rawPoly.mod(rsPoly);
       ecdata[r] = new Array(rsPoly.getLength() - 1);
 
       for (var i = 0; i < ecdata[r].length; i++) {
         var modIndex = i + modPoly.getLength() - ecdata[r].length;
         ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
       }
     }
 
     var totalCodeCount = 0;
 
     for (var i = 0; i < rsBlocks.length; i++) {
       totalCodeCount += rsBlocks[i].totalCount;
     }
 
     var data = new Array(totalCodeCount);
     var index = 0;
 
     for (var i = 0; i < maxDcCount; i++) {
       for (var r = 0; r < rsBlocks.length; r++) {
         if (i < dcdata[r].length) {
           data[index++] = dcdata[r][i];
         }
       }
     }
 
     for (var i = 0; i < maxEcCount; i++) {
       for (var r = 0; r < rsBlocks.length; r++) {
         if (i < ecdata[r].length) {
           data[index++] = ecdata[r][i];
         }
       }
     }
 
     return data;
   };
 
   var QRMode = {
     MODE_NUMBER: 1 << 0,
     MODE_ALPHA_NUM: 1 << 1,
     MODE_8BIT_BYTE: 1 << 2,
     MODE_KANJI: 1 << 3
   };
   var QRErrorCorrectLevel = {
     L: 1,
     M: 0,
     Q: 3,
     H: 2
   };
   var QRMaskPattern = {
     PATTERN000: 0,
     PATTERN001: 1,
     PATTERN010: 2,
     PATTERN011: 3,
     PATTERN100: 4,
     PATTERN101: 5,
     PATTERN110: 6,
     PATTERN111: 7
   };
   var QRUtil = {
     PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
     G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
     G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
     G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
     getBCHTypeInfo: function getBCHTypeInfo(data) {
       var d = data << 10;
 
       while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
         d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
       }
 
       return (data << 10 | d) ^ QRUtil.G15_MASK;
     },
     getBCHTypeNumber: function getBCHTypeNumber(data) {
       var d = data << 12;
 
       while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
         d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
       }
 
       return data << 12 | d;
     },
     getBCHDigit: function getBCHDigit(data) {
       var digit = 0;
 
       while (data != 0) {
         digit++;
         data >>>= 1;
       }
 
       return digit;
     },
     getPatternPosition: function getPatternPosition(typeNumber) {
       return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
     },
     getMask: function getMask(maskPattern, i, j) {
       switch (maskPattern) {
         case QRMaskPattern.PATTERN000:
           return (i + j) % 2 == 0;
 
         case QRMaskPattern.PATTERN001:
           return i % 2 == 0;
 
         case QRMaskPattern.PATTERN010:
           return j % 3 == 0;
 
         case QRMaskPattern.PATTERN011:
           return (i + j) % 3 == 0;
 
         case QRMaskPattern.PATTERN100:
           return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
 
         case QRMaskPattern.PATTERN101:
           return i * j % 2 + i * j % 3 == 0;
 
         case QRMaskPattern.PATTERN110:
           return (i * j % 2 + i * j % 3) % 2 == 0;
 
         case QRMaskPattern.PATTERN111:
           return (i * j % 3 + (i + j) % 2) % 2 == 0;
 
         default:
           throw new Error('bad maskPattern:' + maskPattern);
       }
     },
     getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
       var a = new QRPolynomial([1], 0);
 
       for (var i = 0; i < errorCorrectLength; i++) {
         a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
       }
 
       return a;
     },
     getLengthInBits: function getLengthInBits(mode, type) {
       if (1 <= type && type < 10) {
         switch (mode) {
           case QRMode.MODE_NUMBER:
             return 10;
 
           case QRMode.MODE_ALPHA_NUM:
             return 9;
 
           case QRMode.MODE_8BIT_BYTE:
             return 8;
 
           case QRMode.MODE_KANJI:
             return 8;
 
           default:
             throw new Error('mode:' + mode);
         }
       } else if (type < 27) {
         switch (mode) {
           case QRMode.MODE_NUMBER:
             return 12;
 
           case QRMode.MODE_ALPHA_NUM:
             return 11;
 
           case QRMode.MODE_8BIT_BYTE:
             return 16;
 
           case QRMode.MODE_KANJI:
             return 10;
 
           default:
             throw new Error('mode:' + mode);
         }
       } else if (type < 41) {
         switch (mode) {
           case QRMode.MODE_NUMBER:
             return 14;
 
           case QRMode.MODE_ALPHA_NUM:
             return 13;
 
           case QRMode.MODE_8BIT_BYTE:
             return 16;
 
           case QRMode.MODE_KANJI:
             return 12;
 
           default:
             throw new Error('mode:' + mode);
         }
       } else {
         throw new Error('type:' + type);
       }
     },
     getLostPoint: function getLostPoint(qrCode) {
       var moduleCount = qrCode.getModuleCount();
       var lostPoint = 0;
 
       for (var row = 0; row < moduleCount; row++) {
         for (var col = 0; col < moduleCount; col++) {
           var sameCount = 0;
           var dark = qrCode.isDark(row, col);
 
           for (var r = -1; r <= 1; r++) {
             if (row + r < 0 || moduleCount <= row + r) {
               continue;
             }
 
             for (var c = -1; c <= 1; c++) {
               if (col + c < 0 || moduleCount <= col + c) {
                 continue;
               }
 
               if (r == 0 && c == 0) {
                 continue;
               }
 
               if (dark == qrCode.isDark(row + r, col + c)) {
                 sameCount++;
               }
             }
           }
 
           if (sameCount > 5) {
             lostPoint += 3 + sameCount - 5;
           }
         }
       }
 
       for (var row = 0; row < moduleCount - 1; row++) {
         for (var col = 0; col < moduleCount - 1; col++) {
           var count = 0;
           if (qrCode.isDark(row, col)) count++;
           if (qrCode.isDark(row + 1, col)) count++;
           if (qrCode.isDark(row, col + 1)) count++;
           if (qrCode.isDark(row + 1, col + 1)) count++;
 
           if (count == 0 || count == 4) {
             lostPoint += 3;
           }
         }
       }
 
       for (var row = 0; row < moduleCount; row++) {
         for (var col = 0; col < moduleCount - 6; col++) {
           if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
             lostPoint += 40;
           }
         }
       }
 
       for (var col = 0; col < moduleCount; col++) {
         for (var row = 0; row < moduleCount - 6; row++) {
           if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
             lostPoint += 40;
           }
         }
       }
 
       var darkCount = 0;
 
       for (var col = 0; col < moduleCount; col++) {
         for (var row = 0; row < moduleCount; row++) {
           if (qrCode.isDark(row, col)) {
             darkCount++;
           }
         }
       }
 
       var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
       lostPoint += ratio * 10;
       return lostPoint;
     }
   };
   var QRMath = {
     glog: function glog(n) {
       if (n < 1) {
         throw new Error('glog(' + n + ')');
       }
 
       return QRMath.LOG_TABLE[n];
     },
     gexp: function gexp(n) {
       while (n < 0) {
         n += 255;
       }
 
       while (n >= 256) {
         n -= 255;
       }
 
       return QRMath.EXP_TABLE[n];
     },
     EXP_TABLE: new Array(256),
     LOG_TABLE: new Array(256)
   };
 
   for (var i = 0; i < 8; i++) {
     QRMath.EXP_TABLE[i] = 1 << i;
   }
 
   for (var i = 8; i < 256; i++) {
     QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
   }
 
   for (var i = 0; i < 255; i++) {
     QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
   }
 
   function QRPolynomial(num, shift) {
     if (num.length == undefined$1) {
       throw new Error(num.length + '/' + shift);
     }
 
     var offset = 0;
 
     while (offset < num.length && num[offset] == 0) {
       offset++;
     }
 
     this.num = new Array(num.length - offset + shift);
 
     for (var i = 0; i < num.length - offset; i++) {
       this.num[i] = num[i + offset];
     }
   }
 
   QRPolynomial.prototype = {
     get: function get(index) {
       return this.num[index];
     },
     getLength: function getLength() {
       return this.num.length;
     },
     multiply: function multiply(e) {
       var num = new Array(this.getLength() + e.getLength() - 1);
 
       for (var i = 0; i < this.getLength(); i++) {
         for (var j = 0; j < e.getLength(); j++) {
           num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
         }
       }
 
       return new QRPolynomial(num, 0);
     },
     mod: function mod(e) {
       if (this.getLength() - e.getLength() < 0) {
         return this;
       }
 
       var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
       var num = new Array(this.getLength());
 
       for (var i = 0; i < this.getLength(); i++) {
         num[i] = this.get(i);
       }
 
       for (var i = 0; i < e.getLength(); i++) {
         num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
       }
 
       return new QRPolynomial(num, 0).mod(e);
     }
   };
 
   function QRRSBlock(totalCount, dataCount) {
     this.totalCount = totalCount;
     this.dataCount = dataCount;
   }
 
   QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
 
   QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
     var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
 
     if (rsBlock == undefined$1) {
       throw new Error('bad rs block @ typeNumber:' + typeNumber + '/errorCorrectLevel:' + errorCorrectLevel);
     }
 
     var length = rsBlock.length / 3;
     var list = [];
 
     for (var i = 0; i < length; i++) {
       var count = rsBlock[i * 3 + 0];
       var totalCount = rsBlock[i * 3 + 1];
       var dataCount = rsBlock[i * 3 + 2];
 
       for (var j = 0; j < count; j++) {
         list.push(new QRRSBlock(totalCount, dataCount));
       }
     }
 
     return list;
   };
 
   QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
     switch (errorCorrectLevel) {
       case QRErrorCorrectLevel.L:
         return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
 
       case QRErrorCorrectLevel.M:
         return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
 
       case QRErrorCorrectLevel.Q:
         return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
 
       case QRErrorCorrectLevel.H:
         return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
 
       default:
         return undefined$1;
     }
   };
 
   function QRBitBuffer() {
     this.buffer = [];
     this.length = 0;
   }
 
   QRBitBuffer.prototype = {
     get: function get(index) {
       var bufIndex = Math.floor(index / 8);
       return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
     },
     put: function put(num, length) {
       for (var i = 0; i < length; i++) {
         this.putBit((num >>> length - i - 1 & 1) == 1);
       }
     },
     getLengthInBits: function getLengthInBits() {
       return this.length;
     },
     putBit: function putBit(bit) {
       var bufIndex = Math.floor(this.length / 8);
 
       if (this.buffer.length <= bufIndex) {
         this.buffer.push(0);
       }
 
       if (bit) {
         this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
       }
 
       this.length++;
     }
   };
   var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
 
   function _isSupportCanvas() {
     return typeof CanvasRenderingContext2D != 'undefined';
   } // android 2.x doesn't support Data-URI spec
 
 
   function _getAndroid() {
     var android = false;
     var sAgent = navigator.userAgent;
 
     if (/android/i.test(sAgent)) {
       // android
       android = true;
       var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
 
       if (aMat && aMat[1]) {
         android = parseFloat(aMat[1]);
       }
     }
 
     return android;
   } // Drawing in DOM by using Table tag
 
 
   var Drawing = !_isSupportCanvas() ? function () {
     var Drawing = function Drawing(el, htOption) {
       this._el = el;
       this._htOption = htOption;
     };
     /**
      * Draw the QRCode
      *
      * @param {QRCode} oQRCode
      */
 
 
     Drawing.prototype.draw = function (oQRCode) {
       var _htOption = this._htOption;
       var _el = this._el;
       var nCount = oQRCode.getModuleCount();
       var nWidth = Math.round(_htOption.width / nCount);
       var nHeight = Math.round((_htOption.height - _htOption.titleHeight) / nCount);
 
       if (nWidth <= 1) {
         nWidth = 1;
       }
 
       if (nHeight <= 1) {
         nHeight = 1;
       }
 
       this._htOption.width = nWidth * nCount;
       this._htOption.height = nHeight * nCount + _htOption.titleHeight;
       this._htOption.quietZone = Math.round(this._htOption.quietZone);
       var aHTML = [];
       var divStyle = '';
       var drawWidth = Math.round(nWidth * _htOption.dotScale);
       var drawHeight = Math.round(nHeight * _htOption.dotScale);
 
       if (drawWidth < 4) {
         drawWidth = 4;
         drawHeight = 4;
       }
 
       var nonRequiredColorDark = _htOption.colorDark;
       var nonRequiredcolorLight = _htOption.colorLight;
 
       if (_htOption.backgroundImage) {
         if (_htOption.autoColor) {
           _htOption.colorDark = "rgba(0, 0, 0, .6);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#99000000', EndColorStr='#99000000');";
           _htOption.colorLight = "rgba(255, 255, 255, .7);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#B2FFFFFF', EndColorStr='#B2FFFFFF');"; // _htOption.colorDark="rgba(0, 0, 0, .6)";
           // _htOption.colorLight='rgba(255, 255, 255, .7)';
         } else {
           _htOption.colorLight = 'rgba(0,0,0,0)';
         }
 
         var backgroundImageEle = '<div style="display:inline-block; z-index:-10;position:absolute;"><img src="' + _htOption.backgroundImage + '" widht="' + (_htOption.width + _htOption.quietZone * 2) + '" height="' + (_htOption.height + _htOption.quietZone * 2) + '" style="opacity:' + _htOption.backgroundImageAlpha + ';filter:alpha(opacity=' + _htOption.backgroundImageAlpha * 100 + '); "/></div>';
         aHTML.push(backgroundImageEle);
       }
 
       if (_htOption.quietZone) {
         divStyle = 'display:inline-block; width:' + (_htOption.width + _htOption.quietZone * 2) + 'px; height:' + (_htOption.width + _htOption.quietZone * 2) + 'px;background:' + _htOption.quietZoneColor + '; text-align:center;';
       }
 
       aHTML.push('<div style="font-size:0;' + divStyle + '">');
       aHTML.push('<table  style="font-size:0;border:0;border-collapse:collapse; margin-top:' + _htOption.quietZone + 'px;" border="0" cellspacing="0" cellspadding="0" align="center" valign="middle">');
       aHTML.push('<tr height="' + _htOption.titleHeight + '" align="center"><td style="border:0;border-collapse:collapse;margin:0;padding:0" colspan="' + nCount + '">');
 
       if (_htOption.title) {
         var c = _htOption.titleColor;
         var f = _htOption.titleFont;
         aHTML.push('<div style="width:100%;margin-top:' + _htOption.titleTop + 'px;color:' + c + ';font:' + f + ';background:' + _htOption.titleBackgroundColor + '">' + _htOption.title + '</div>');
       }
 
       if (_htOption.subTitle) {
         aHTML.push('<div style="width:100%;margin-top:' + (_htOption.subTitleTop - _htOption.titleTop) + 'px;color:' + _htOption.subTitleColor + '; font:' + _htOption.subTitleFont + '">' + _htOption.subTitle + '</div>');
       }
 
       aHTML.push('</td></tr>');
 
       for (var row = 0; row < nCount; row++) {
         aHTML.push('<tr style="border:0; padding:0; margin:0;" height="7">');
 
         for (var col = 0; col < nCount; col++) {
           var bIsDark = oQRCode.isDark(row, col);
           var eye = oQRCode.getEye(row, col); // { isDark: true/false, type: PO_TL, PI_TL, PO_TR, PI_TR, PO_BL, PI_BL };
 
           if (eye) {
             // Is eye
             bIsDark = eye.isDark;
             var type = eye.type; // PX_XX, PX, colorDark, colorLight
 
             var eyeColorDark = _htOption[type] || _htOption[type.substring(0, 2)] || nonRequiredColorDark;
             aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;">' + '<span style="width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (bIsDark ? eyeColorDark : nonRequiredcolorLight) + ';display:inline-block"></span></td>');
           } else {
             // Timing Pattern
             var nowDarkColor = _htOption.colorDark;
 
             if (row == 6) {
               nowDarkColor = _htOption.timing_H || _htOption.timing || nonRequiredColorDark;
               aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (bIsDark ? nowDarkColor : nonRequiredcolorLight) + ';"></td>');
             } else if (col == 6) {
               nowDarkColor = _htOption.timing_V || _htOption.timing || nonRequiredColorDark;
               aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (bIsDark ? nowDarkColor : nonRequiredcolorLight) + ';"></td>');
             } else {
               aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;">' + '<div style="display:inline-block;width:' + drawWidth + 'px;height:' + drawHeight + 'px;background-color:' + (bIsDark ? nowDarkColor : _htOption.colorLight) + ';"></div></td>');
             }
           }
         }
 
         aHTML.push('</tr>');
       }
 
       aHTML.push('</table>');
       aHTML.push('</div>');
 
       if (_htOption.logo) {
         // Logo Image
         var img = new Image();
 
         if (_htOption.crossOrigin != null) {
           img.crossOrigin = _htOption.crossOrigin;
         } // img.crossOrigin="Anonymous";
 
 
         img.src = _htOption.logo;
         var imgW = _htOption.width / 3.5;
         var imgH = _htOption.height / 3.5;
 
         if (imgW != imgH) {
           imgW = imgH;
         }
 
         if (_htOption.logoWidth) {
           imgW = _htOption.logoWidth;
         }
 
         if (_htOption.logoHeight) {
           imgH = _htOption.logoHeight;
         }
 
         var imgDivStyle = 'position:relative; z-index:1;display:table-cell;top:-' + ((_htOption.height - _htOption.titleHeight) / 2 + imgH / 2 + _htOption.quietZone) + 'px;text-align:center; width:' + imgW + 'px; height:' + imgH + 'px;line-height:' + imgW + 'px; vertical-align: middle;';
 
         if (!_htOption.logoBackgroundTransparent) {
           imgDivStyle += 'background:' + _htOption.logoBackgroundColor;
         }
 
         aHTML.push('<div style="' + imgDivStyle + '"><img  src="' + _htOption.logo + '"  style="max-width: ' + imgW + 'px; max-height: ' + imgH + 'px;" /> <div style=" display: none; width:1px;margin-left: -1px;"></div></div>');
       }
 
       if (_htOption.onRenderingStart) {
         _htOption.onRenderingStart(_htOption);
       }
 
       _el.innerHTML = aHTML.join(''); // Fix the margin values as real size.
 
       var elTable = _el.childNodes[0];
       var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
       var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
 
       if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
         elTable.style.margin = nTopMarginTable + 'px ' + nLeftMarginTable + 'px';
       }
 
       if (this._htOption.onRenderingEnd) {
         this._htOption.onRenderingEnd(this._htOption, null);
       }
     };
     /**
      * Clear the QRCode
      */
 
 
     Drawing.prototype.clear = function () {
       this._el.innerHTML = '';
     };
 
     return Drawing;
   }() : function () {
     // Drawing in Canvas
     function _onMakeImage() {
       if (this._htOption.drawer == 'svg') {
         var svgData = this._oContext.getSerializedSvg(true);
 
         this.dataURL = svgData;
         this._el.innerHTML = svgData;
       } else {
         // canvas
         // this._elImage.crossOrigin='Anonymous';
         try {
           // if (this._htOption.crossOrigin != null) {
           //     this._elImage.crossOrigin = this._htOption.crossOrigin;
           // }
           var dataURL = this._elCanvas.toDataURL('image/png'); // this._elImage.src = dataURL;
 
 
           this.dataURL = dataURL; // this._elImage.style.display = "inline";
           // this._elCanvas.style.display = "none";
         } catch (e) {
           console.error(e);
         }
       }
 
       if (this._htOption.onRenderingEnd) {
         if (!this.dataURL) {
           console.error("Can not get base64 data, please check: 1. Published the page and image to the server 2. The image request support CORS 3. Configured `crossOrigin:'anonymous'` option");
         }
 
         this._htOption.onRenderingEnd(this._htOption, this.dataURL);
       }
     } // Android 2.1 bug workaround
     // http://code.google.com/p/android/issues/detail?id=5141
 
 
     if (root._android && root._android <= 2.1) {
       var factor = 1 / window.devicePixelRatio;
       var drawImage = CanvasRenderingContext2D.prototype.drawImage;
 
       CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
         if ('nodeName' in image && /img/i.test(image.nodeName)) {
           for (var i = arguments.length - 1; i >= 1; i--) {
             arguments[i] = arguments[i] * factor;
           }
         } else if (typeof dw == 'undefined') {
           arguments[1] *= factor;
           arguments[2] *= factor;
           arguments[3] *= factor;
           arguments[4] *= factor;
         }
 
         drawImage.apply(this, arguments);
       };
     }
     /**
      * Check whether the user's browser supports Data URI or not
      *
      * @private
      * @param {Function} fSuccess Occurs if it supports Data URI
      * @param {Function} fFail Occurs if it doesn't support Data URI
      */
 
 
     function _safeSetDataURI(fSuccess, fFail) {
       var self = this;
       self._fFail = fFail;
       self._fSuccess = fSuccess; // Check it just once
 
       if (self._bSupportDataURI === null) {
         var el = document.createElement('img');
 
         var fOnError = function fOnError() {
           self._bSupportDataURI = false;
 
           if (self._fFail) {
             self._fFail.call(self);
           }
         };
 
         var fOnSuccess = function fOnSuccess() {
           self._bSupportDataURI = true;
 
           if (self._fSuccess) {
             self._fSuccess.call(self);
           }
         };
 
         el.onabort = fOnError;
         el.onerror = fOnError;
         el.onload = fOnSuccess;
         el.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='; // the Image contains 1px data.
 
         return;
       } else if (self._bSupportDataURI === true && self._fSuccess) {
         self._fSuccess.call(self);
       } else if (self._bSupportDataURI === false && self._fFail) {
         self._fFail.call(self);
       }
     }
     /**
      * Drawing QRCode by using canvas
      *
      * @constructor
      * @param {HTMLElement} el
      * @param {Object} htOption QRCode Options
      */
 
 
     var Drawing = function Drawing(el, htOption) {
       this._bIsPainted = false;
       this._android = _getAndroid();
       this._el = el;
       this._htOption = htOption;
 
       if (this._htOption.drawer == 'svg') {
         this._oContext = {};
         this._elCanvas = {};
       } else {
         // canvas
         this._elCanvas = document.createElement('canvas');
 
         this._el.appendChild(this._elCanvas);
 
         this._oContext = this._elCanvas.getContext('2d'); // this._elImage = document.createElement("img");
         // this._elImage.alt = "Scan me!";
         // this._elImage.style.display = "none";
         // this._el.appendChild(this._elImage);
       }
 
       this._bSupportDataURI = null;
       this.dataURL = null;
     };
     /**
      * Draw the QRCode
      *
      * @param {QRCode} oQRCode
      */
 
 
     Drawing.prototype.draw = function (oQRCode) {
       // var _elImage = this._elImage;
       var _htOption = this._htOption;
 
       if (!_htOption.title && !_htOption.subTitle) {
         _htOption.height -= _htOption.titleHeight;
         _htOption.titleHeight = 0;
       }
 
       var nCount = oQRCode.getModuleCount();
       var nWidth = Math.round(_htOption.width / nCount);
       var nHeight = Math.round((_htOption.height - _htOption.titleHeight) / nCount);
 
       if (nWidth <= 1) {
         nWidth = 1;
       }
 
       if (nHeight <= 1) {
         nHeight = 1;
       }
 
       _htOption.width = nWidth * nCount;
       _htOption.height = nHeight * nCount + _htOption.titleHeight;
       _htOption.quietZone = Math.round(_htOption.quietZone);
       this._elCanvas.width = _htOption.width + _htOption.quietZone * 2;
       this._elCanvas.height = _htOption.height + _htOption.quietZone * 2;
 
       if (this._htOption.drawer != 'canvas') {
         // _elImage.style.display = "none";
         // } else {
         this._oContext = new C2S(this._elCanvas.width, this._elCanvas.height);
       }
 
       this.clear();
       var _oContext = this._oContext;
       _oContext.lineWidth = 0;
       _oContext.fillStyle = _htOption.colorLight;
 
       _oContext.fillRect(0, 0, this._elCanvas.width, this._elCanvas.height);
 
       var t = this;
 
       function drawQuietZoneColor() {
         if (_htOption.quietZone > 0 && _htOption.quietZoneColor) {
           // top
           _oContext.lineWidth = 0;
           _oContext.fillStyle = _htOption.quietZoneColor;
 
           _oContext.fillRect(0, 0, t._elCanvas.width, _htOption.quietZone); // left
 
 
           _oContext.fillRect(0, _htOption.quietZone, _htOption.quietZone, t._elCanvas.height - _htOption.quietZone * 2); // right
 
 
           _oContext.fillRect(t._elCanvas.width - _htOption.quietZone, _htOption.quietZone, _htOption.quietZone, t._elCanvas.height - _htOption.quietZone * 2); // bottom
 
 
           _oContext.fillRect(0, t._elCanvas.height - _htOption.quietZone, t._elCanvas.width, _htOption.quietZone);
         }
       }
 
       if (_htOption.backgroundImage) {
         // Background Image
         var bgImg = new Image();
 
         bgImg.onload = function () {
           _oContext.globalAlpha = 1;
           _oContext.globalAlpha = _htOption.backgroundImageAlpha;
           var imageSmoothingQuality = _oContext.imageSmoothingQuality;
           var imageSmoothingEnabled = _oContext.imageSmoothingEnabled;
           _oContext.imageSmoothingEnabled = true;
           _oContext.imageSmoothingQuality = 'high';
 
           _oContext.drawImage(bgImg, 0, _htOption.titleHeight, _htOption.width + _htOption.quietZone * 2, _htOption.height + _htOption.quietZone * 2 - _htOption.titleHeight);
 
           _oContext.imageSmoothingEnabled = imageSmoothingEnabled;
           _oContext.imageSmoothingQuality = imageSmoothingQuality;
           _oContext.globalAlpha = 1;
           drawQrcode.call(t, oQRCode);
         }; // bgImg.crossOrigin='Anonymous';
 
 
         if (_htOption.crossOrigin != null) {
           bgImg.crossOrigin = _htOption.crossOrigin;
         }
 
         bgImg.originalSrc = _htOption.backgroundImage;
         bgImg.src = _htOption.backgroundImage; // DoSomething
       } else {
         drawQrcode.call(t, oQRCode);
       }
 
       function drawQrcode(oQRCode) {
         if (_htOption.onRenderingStart) {
           _htOption.onRenderingStart(_htOption);
         }
 
         for (var row = 0; row < nCount; row++) {
           for (var col = 0; col < nCount; col++) {
             var nLeft = col * nWidth + _htOption.quietZone;
             var nTop = row * nHeight + _htOption.quietZone;
             var bIsDark = oQRCode.isDark(row, col);
             var eye = oQRCode.getEye(row, col); // { isDark: true/false, type: PO_TL, PI_TL, PO_TR, PI_TR, PO_BL, PI_BL };
 
             var nowDotScale = _htOption.dotScale;
             _oContext.lineWidth = 0; // Color handler
 
             var dColor;
             var lColor;
 
             if (eye) {
               dColor = _htOption[eye.type] || _htOption[eye.type.substring(0, 2)] || _htOption.colorDark;
               lColor = _htOption.colorLight;
             } else {
               if (_htOption.backgroundImage) {
                 lColor = 'rgba(0,0,0,0)';
 
                 if (row == 6) {
                   // dColor = _htOption.timing_H || _htOption.timing || _htOption.colorDark;
                   if (_htOption.autoColor) {
                     dColor = _htOption.timing_H || _htOption.timing || _htOption.autoColorDark;
                     lColor = _htOption.autoColorLight;
                   } else {
                     dColor = _htOption.timing_H || _htOption.timing || _htOption.colorDark;
                   }
                 } else if (col == 6) {
                   // dColor = _htOption.timing_V || _htOption.timing || _htOption.colorDark;
                   if (_htOption.autoColor) {
                     dColor = _htOption.timing_V || _htOption.timing || _htOption.autoColorDark;
                     lColor = _htOption.autoColorLight;
                   } else {
                     dColor = _htOption.timing_V || _htOption.timing || _htOption.colorDark;
                   }
                 } else {
                   if (_htOption.autoColor) {
                     dColor = _htOption.autoColorDark;
                     lColor = _htOption.autoColorLight;
                   } else {
                     dColor = _htOption.colorDark;
                   }
                 }
               } else {
                 if (row == 6) {
                   dColor = _htOption.timing_H || _htOption.timing || _htOption.colorDark;
                 } else if (col == 6) {
                   dColor = _htOption.timing_V || _htOption.timing || _htOption.colorDark;
                 } else {
                   dColor = _htOption.colorDark;
                 }
 
                 lColor = _htOption.colorLight;
               }
             }
 
             _oContext.strokeStyle = bIsDark ? dColor : lColor;
             _oContext.fillStyle = bIsDark ? dColor : lColor;
 
             if (eye) {
               if (eye.type == 'AO') {
                 nowDotScale = _htOption.dotScaleAO;
               } else if (eye.type == 'AI') {
                 nowDotScale = _htOption.dotScaleAI;
               } else {
                 nowDotScale = 1;
               }
 
               if (_htOption.backgroundImage && _htOption.autoColor) {
                 dColor = (eye.type == 'AO' ? _htOption.AI : _htOption.AO) || _htOption.autoColorDark;
                 lColor = _htOption.autoColorLight;
               } else {
                 dColor = (eye.type == 'AO' ? _htOption.AI : _htOption.AO) || dColor;
               } // Is eye
 
 
               bIsDark = eye.isDark;
 
               _oContext.fillRect(nLeft + nWidth * (1 - nowDotScale) / 2, _htOption.titleHeight + nTop + nHeight * (1 - nowDotScale) / 2, nWidth * nowDotScale, nHeight * nowDotScale);
             } else {
               if (row == 6) {
                 // Timing Pattern
                 nowDotScale = _htOption.dotScaleTiming_H;
 
                 _oContext.fillRect(nLeft + nWidth * (1 - nowDotScale) / 2, _htOption.titleHeight + nTop + nHeight * (1 - nowDotScale) / 2, nWidth * nowDotScale, nHeight * nowDotScale);
               } else if (col == 6) {
                 // Timing Pattern
                 nowDotScale = _htOption.dotScaleTiming_V;
 
                 _oContext.fillRect(nLeft + nWidth * (1 - nowDotScale) / 2, _htOption.titleHeight + nTop + nHeight * (1 - nowDotScale) / 2, nWidth * nowDotScale, nHeight * nowDotScale);
               } else {
                 if (_htOption.backgroundImage) {
                   _oContext.fillRect(nLeft + nWidth * (1 - nowDotScale) / 2, _htOption.titleHeight + nTop + nHeight * (1 - nowDotScale) / 2, nWidth * nowDotScale, nHeight * nowDotScale);
                 } else {
                   _oContext.fillRect(nLeft + nWidth * (1 - nowDotScale) / 2, _htOption.titleHeight + nTop + nHeight * (1 - nowDotScale) / 2, nWidth * nowDotScale, nHeight * nowDotScale);
                 }
               }
             }
 
             if (_htOption.dotScale != 1 && !eye) {
               _oContext.strokeStyle = _htOption.colorLight;
             }
           }
         }
 
         if (_htOption.title) {
           _oContext.fillStyle = _htOption.titleBackgroundColor;
 
           _oContext.fillRect(0, 0, this._elCanvas.width, _htOption.titleHeight + _htOption.quietZone);
 
           _oContext.font = _htOption.titleFont;
           _oContext.fillStyle = _htOption.titleColor;
           _oContext.textAlign = 'center';
 
           _oContext.fillText(_htOption.title, this._elCanvas.width / 2, +_htOption.quietZone + _htOption.titleTop);
         }
 
         if (_htOption.subTitle) {
           _oContext.font = _htOption.subTitleFont;
           _oContext.fillStyle = _htOption.subTitleColor;
 
           _oContext.fillText(_htOption.subTitle, this._elCanvas.width / 2, +_htOption.quietZone + _htOption.subTitleTop);
         }
 
         function generateLogoImg(img) {
           var imgContainerW = Math.round(_htOption.width / 3.5);
           var imgContainerH = Math.round(_htOption.height / 3.5);
 
           if (imgContainerW !== imgContainerH) {
             imgContainerW = imgContainerH;
           }
 
           if (_htOption.logoMaxWidth) {
             imgContainerW = Math.round(_htOption.logoMaxWidth);
           } else if (_htOption.logoWidth) {
             imgContainerW = Math.round(_htOption.logoWidth);
           }
 
           if (_htOption.logoMaxHeight) {
             imgContainerH = Math.round(_htOption.logoMaxHeight);
           } else if (_htOption.logoHeight) {
             imgContainerH = Math.round(_htOption.logoHeight);
           }
 
           var nw;
           var nh;
 
           if (typeof img.naturalWidth == 'undefined') {
             // IE 6/7/8
             nw = img.width;
             nh = img.height;
           } else {
             // HTML5 browsers
             nw = img.naturalWidth;
             nh = img.naturalHeight;
           }
 
           if (_htOption.logoMaxWidth || _htOption.logoMaxHeight) {
             if (_htOption.logoMaxWidth && nw <= imgContainerW) {
               imgContainerW = nw;
             }
 
             if (_htOption.logoMaxHeight && nh <= imgContainerH) {
               imgContainerH = nh;
             }
 
             if (nw <= imgContainerW && nh <= imgContainerH) {
               imgContainerW = nw;
               imgContainerH = nh;
             }
           }
 
           var imgContainerX = (_htOption.width + _htOption.quietZone * 2 - imgContainerW) / 2;
           var imgContainerY = (_htOption.height + _htOption.titleHeight + _htOption.quietZone * 2 - imgContainerH) / 2;
           var imgScale = Math.min(imgContainerW / nw, imgContainerH / nh);
           var imgW = nw * imgScale;
           var imgH = nh * imgScale;
 
           if (_htOption.logoMaxWidth || _htOption.logoMaxHeight) {
             imgContainerW = imgW;
             imgContainerH = imgH;
             imgContainerX = (_htOption.width + _htOption.quietZone * 2 - imgContainerW) / 2;
             imgContainerY = (_htOption.height + _htOption.titleHeight + _htOption.quietZone * 2 - imgContainerH) / 2;
           } // Did Not Use Transparent Logo Image
 
 
           if (!_htOption.logoBackgroundTransparent) {
             //if (!_htOption.logoBackgroundColor) {
             //_htOption.logoBackgroundColor = '#ffffff';
             //}
             _oContext.fillStyle = _htOption.logoBackgroundColor;
 
             _oContext.fillRect(imgContainerX, imgContainerY, imgContainerW, imgContainerH);
           }
 
           var imageSmoothingQuality = _oContext.imageSmoothingQuality;
           var imageSmoothingEnabled = _oContext.imageSmoothingEnabled;
           _oContext.imageSmoothingEnabled = true;
           _oContext.imageSmoothingQuality = 'high';
 
           _oContext.drawImage(img, imgContainerX + (imgContainerW - imgW) / 2, imgContainerY + (imgContainerH - imgH) / 2, imgW, imgH);
 
           _oContext.imageSmoothingEnabled = imageSmoothingEnabled;
           _oContext.imageSmoothingQuality = imageSmoothingQuality;
           drawQuietZoneColor();
           _this._bIsPainted = true;
 
           _this.makeImage();
         }
 
         if (_htOption.logo) {
           // Logo Image
           var img = new Image();
 
           var _this = this;
 
           img.onload = function () {
             generateLogoImg(img);
           };
 
           img.onerror = function (e) {
             console.error(e);
           }; // img.crossOrigin="Anonymous";
 
 
           if (_htOption.crossOrigin != null) {
             img.crossOrigin = _htOption.crossOrigin;
           }
 
           img.originalSrc = _htOption.logo;
           img.src = _htOption.logo;
         } else {
           drawQuietZoneColor();
           this._bIsPainted = true;
           this.makeImage();
         }
       }
     };
     /**
      * Make the image from Canvas if the browser supports Data URI.
      */
 
 
     Drawing.prototype.makeImage = function () {
       if (this._bIsPainted) {
         _safeSetDataURI.call(this, _onMakeImage);
       }
     };
     /**
      * Return whether the QRCode is painted or not
      *
      * @return {Boolean}
      */
 
 
     Drawing.prototype.isPainted = function () {
       return this._bIsPainted;
     };
     /**
      * Clear the QRCode
      */
 
 
     Drawing.prototype.clear = function () {
       this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
 
       this._bIsPainted = false;
     };
 
     Drawing.prototype.remove = function () {
       this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
 
       this._bIsPainted = false;
       this._el.innerHTML = '';
     };
     /**
      * @private
      * @param {Number} nNumber
      */
 
 
     Drawing.prototype.round = function (nNumber) {
       if (!nNumber) {
         return nNumber;
       }
 
       return Math.floor(nNumber * 1000) / 1000;
     };
 
     return Drawing;
   }();
   /**
    * Get the type by string length
    *
    * @private
    * @param {String} sText
    * @param {Number} nCorrectLevel
    * @return {Number} type
    */
 
   function _getTypeNumber(sText, _htOption) {
     var nCorrectLevel = _htOption.correctLevel;
     var nType = 1;
 
     var length = _getUTF8Length(sText);
 
     for (var i = 0, len = QRCodeLimitLength.length; i < len; i++) {
       var nLimit = 0;
 
       switch (nCorrectLevel) {
         case QRErrorCorrectLevel.L:
           nLimit = QRCodeLimitLength[i][0];
           break;
 
         case QRErrorCorrectLevel.M:
           nLimit = QRCodeLimitLength[i][1];
           break;
 
         case QRErrorCorrectLevel.Q:
           nLimit = QRCodeLimitLength[i][2];
           break;
 
         case QRErrorCorrectLevel.H:
           nLimit = QRCodeLimitLength[i][3];
           break;
       }
 
       if (length <= nLimit) {
         break;
       } else {
         nType++;
       }
     }
 
     if (nType > QRCodeLimitLength.length) {
       throw new Error('Too long data. the CorrectLevel.' + ['M', 'L', 'H', 'Q'][nCorrectLevel] + ' limit length is ' + nLimit);
     }
 
     if (_htOption.version != 0) {
       if (nType <= _htOption.version) {
         nType = _htOption.version;
         _htOption.runVersion = nType;
       } else {
         console.warn('QR Code version ' + _htOption.version + ' too small, run version use ' + nType);
         _htOption.runVersion = nType;
       }
     }
 
     return nType;
   }
 
   function _getUTF8Length(sText) {
     var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
     return replacedText.length + (replacedText.length != sText.length ? 3 : 0);
   }
 
   QRCode = function QRCode(el, vOption) {
     this._htOption = {
       width: 256,
       height: 256,
       typeNumber: 4,
       colorDark: '#000000',
       colorLight: '#ffffff',
       correctLevel: QRErrorCorrectLevel.H,
       dotScale: 1,
       // For body block, must be greater than 0, less than or equal to 1. default is 1
       dotScaleTiming: 1,
       // Dafault for timing block , must be greater than 0, less than or equal to 1. default is 1
       dotScaleTiming_H: undefined$1,
       // For horizontal timing block, must be greater than 0, less than or equal to 1. default is 1
       dotScaleTiming_V: undefined$1,
       // For vertical timing block, must be greater than 0, less than or equal to 1. default is 1
       dotScaleA: 1,
       // Dafault for alignment block, must be greater than 0, less than or equal to 1. default is 1
       dotScaleAO: undefined$1,
       // For alignment outer block, must be greater than 0, less than or equal to 1. default is 1
       dotScaleAI: undefined$1,
       // For alignment inner block, must be greater than 0, less than or equal to 1. default is 1
       quietZone: 0,
       quietZoneColor: 'rgba(0,0,0,0)',
       title: '',
       titleFont: 'normal normal bold 16px Arial',
       titleColor: '#000000',
       titleBackgroundColor: '#ffffff',
       titleHeight: 0,
       // Title Height, Include subTitle
       titleTop: 30,
       // draws y coordinates. default is 30
       subTitle: '',
       subTitleFont: 'normal normal normal 14px Arial',
       subTitleColor: '#4F4F4F',
       subTitleTop: 60,
       // draws y coordinates. default is 0
       logo: undefined$1,
       logoWidth: undefined$1,
       logoHeight: undefined$1,
       logoMaxWidth: undefined$1,
       logoMaxHeight: undefined$1,
       logoBackgroundColor: '#ffffff',
       logoBackgroundTransparent: false,
       // === Posotion Pattern(Eye) Color
       PO: undefined$1,
       // Global Posotion Outer color. if not set, the defaut is `colorDark`
       PI: undefined$1,
       // Global Posotion Inner color. if not set, the defaut is `colorDark`
       PO_TL: undefined$1,
       // Posotion Outer - Top Left
       PI_TL: undefined$1,
       // Posotion Inner - Top Left
       PO_TR: undefined$1,
       // Posotion Outer - Top Right
       PI_TR: undefined$1,
       // Posotion Inner - Top Right
       PO_BL: undefined$1,
       // Posotion Outer - Bottom Left
       PI_BL: undefined$1,
       // Posotion Inner - Bottom Left
       // === Alignment Color
       AO: undefined$1,
       // Alignment Outer. if not set, the defaut is `colorDark`
       AI: undefined$1,
       // Alignment Inner. if not set, the defaut is `colorDark`
       // === Timing Pattern Color
       timing: undefined$1,
       // Global Timing color. if not set, the defaut is `colorDark`
       timing_H: undefined$1,
       // Horizontal timing color
       timing_V: undefined$1,
       // Vertical timing color
       // ==== Backgroud Image
       backgroundImage: undefined$1,
       // Background Image
       backgroundImageAlpha: 1,
       // Background image transparency, value between 0 and 1. default is 1.
       autoColor: false,
       // Automatic color adjustment(for data block)
       autoColorDark: 'rgba(0, 0, 0, .6)',
       // Automatic color: dark CSS color
       autoColorLight: 'rgba(255, 255, 255, .7)',
       // Automatic color: light CSS color
       // ==== Event Handler
       onRenderingStart: undefined$1,
       onRenderingEnd: undefined$1,
       // ==== Versions
       version: 0,
       // The symbol versions of QR Code range from Version 1 to Version 40. default 0 means automatically choose the closest version based on the text length.
       // ==== Tooltip
       tooltip: false,
       // Whether set the QRCode Text as the title attribute value of the image
       // ==== Binary(hex) data mode
       binary: false,
       // Whether it is binary mode, default is text mode.
       // ==== Drawing method
       drawer: 'canvas',
       // Drawing method: canvas, svg(Chrome, FF, IE9+)
       // ==== CORS
       crossOrigin: null,
       // String which specifies the CORS setting to use when retrieving the image. null means that the crossOrigin attribute is not set.
       // UTF-8 without BOM
       utf8WithoutBOM: true
     };
 
     if (typeof vOption === 'string') {
       vOption = {
         text: vOption
       };
     } // Overwrites options
 
 
     if (vOption) {
       for (var i in vOption) {
         this._htOption[i] = vOption[i];
       }
     }
 
     if (this._htOption.version < 0 || this._htOption.version > 40) {
       console.warn("QR Code version '" + this._htOption.version + "' is invalidate, reset to 0");
       this._htOption.version = 0;
     }
 
     if (this._htOption.dotScale < 0 || this._htOption.dotScale > 1) {
       console.warn(this._htOption.dotScale + ' , is invalidate, dotScale must greater than 0, less than or equal to 1, now reset to 1. ');
       this._htOption.dotScale = 1;
     }
 
     if (this._htOption.dotScaleTiming < 0 || this._htOption.dotScaleTiming > 1) {
       console.warn(this._htOption.dotScaleTiming + ' , is invalidate, dotScaleTiming must greater than 0, less than or equal to 1, now reset to 1. ');
       this._htOption.dotScaleTiming = 1;
     }
 
     if (this._htOption.dotScaleTiming_H) {
       if (this._htOption.dotScaleTiming_H < 0 || this._htOption.dotScaleTiming_H > 1) {
         console.warn(this._htOption.dotScaleTiming_H + ' , is invalidate, dotScaleTiming_H must greater than 0, less than or equal to 1, now reset to 1. ');
         this._htOption.dotScaleTiming_H = 1;
       }
     } else {
       this._htOption.dotScaleTiming_H = this._htOption.dotScaleTiming;
     }
 
     if (this._htOption.dotScaleTiming_V) {
       if (this._htOption.dotScaleTiming_V < 0 || this._htOption.dotScaleTiming_V > 1) {
         console.warn(this._htOption.dotScaleTiming_V + ' , is invalidate, dotScaleTiming_V must greater than 0, less than or equal to 1, now reset to 1. ');
         this._htOption.dotScaleTiming_V = 1;
       }
     } else {
       this._htOption.dotScaleTiming_V = this._htOption.dotScaleTiming;
     }
 
     if (this._htOption.dotScaleA < 0 || this._htOption.dotScaleA > 1) {
       console.warn(this._htOption.dotScaleA + ' , is invalidate, dotScaleA must greater than 0, less than or equal to 1, now reset to 1. ');
       this._htOption.dotScaleA = 1;
     }
 
     if (this._htOption.dotScaleAO) {
       if (this._htOption.dotScaleAO < 0 || this._htOption.dotScaleAO > 1) {
         console.warn(this._htOption.dotScaleAO + ' , is invalidate, dotScaleAO must greater than 0, less than or equal to 1, now reset to 1. ');
         this._htOption.dotScaleAO = 1;
       }
     } else {
       this._htOption.dotScaleAO = this._htOption.dotScaleA;
     }
 
     if (this._htOption.dotScaleAI) {
       if (this._htOption.dotScaleAI < 0 || this._htOption.dotScaleAI > 1) {
         console.warn(this._htOption.dotScaleAI + ' , is invalidate, dotScaleAI must greater than 0, less than or equal to 1, now reset to 1. ');
         this._htOption.dotScaleAI = 1;
       }
     } else {
       this._htOption.dotScaleAI = this._htOption.dotScaleA;
     }
 
     if (this._htOption.backgroundImageAlpha < 0 || this._htOption.backgroundImageAlpha > 1) {
       console.warn(this._htOption.backgroundImageAlpha + ' , is invalidate, backgroundImageAlpha must between 0 and 1, now reset to 1. ');
       this._htOption.backgroundImageAlpha = 1;
     }
 
     this._htOption.height = this._htOption.height + this._htOption.titleHeight;
 
     if (typeof el == 'string') {
       el = document.getElementById(el);
     }
 
     if (!this._htOption.drawer || this._htOption.drawer != 'svg' && this._htOption.drawer != 'canvas') {
       this._htOption.drawer = 'canvas';
     }
 
     this._android = _getAndroid();
     this._el = el;
     this._oQRCode = null;
     var _htOptionClone = {};
 
     for (var i in this._htOption) {
       _htOptionClone[i] = this._htOption[i];
     }
 
     this._oDrawing = new Drawing(this._el, _htOptionClone);
 
     if (this._htOption.text) {
       this.makeCode(this._htOption.text);
     }
   };
   /**
    * Make the QRCode
    *
    * @param {String} sText link data
    */
 
 
   QRCode.prototype.makeCode = function (sText) {
     this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption), this._htOption.correctLevel);
 
     this._oQRCode.addData(sText, this._htOption.binary, this._htOption.utf8WithoutBOM);
 
     this._oQRCode.make();
 
     if (this._htOption.tooltip) {
       this._el.title = sText;
     }
 
     this._oDrawing.draw(this._oQRCode); //		this.makeImage();
 
   };
   /**
    * Make the Image from Canvas element
    * - It occurs automatically
    * - Android below 3 doesn't support Data-URI spec.
    *
    * @private
    */
 
 
   QRCode.prototype.makeImage = function () {
     if (typeof this._oDrawing.makeImage == 'function' && (!this._android || this._android >= 3)) {
       this._oDrawing.makeImage();
     }
   };
   /**
    * Clear the QRCode
    */
 
 
   QRCode.prototype.clear = function () {
     this._oDrawing.remove();
   };
   /**
    * Resize the QRCode
    */
 
 
   QRCode.prototype.resize = function (width, height) {
     this._oDrawing._htOption.width = width;
     this._oDrawing._htOption.height = height;
 
     this._oDrawing.draw(this._oQRCode);
   };
   /**
    * No Conflict
    * @return QRCode object
    */
 
 
   QRCode.prototype.noConflict = function () {
     if (root.QRCode === this) {
       root.QRCode = _QRCode;
     }
 
     return QRCode;
   };
   /**
    * @name QRCode.CorrectLevel
    */
 
 
   QRCode.CorrectLevel = QRErrorCorrectLevel;
   /*--------------------------------------------------------------------------*/
   // Export QRCode
   // AMD & CMD Compatibility
 
   if (typeof define == 'function' && (define.amd || define.cmd)) {
     // 1. Define an anonymous module
     define([], function () {
       return QRCode;
     });
   } // CommonJS Compatibility(include NodeJS)
   else if (freeModule) {
     // Node.js
     (freeModule.exports = QRCode).QRCode = QRCode; // Other CommonJS
 
     freeExports.QRCode = QRCode;
   } else {
     // Export Global
     root.QRCode = QRCode;
   }
 }
 
 QRCode();
 
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
         referrerSkipList = _parameters$referrerS === void 0 ? [] : _parameters$referrerS,
         _parameters$urlSkipLi = parameters.urlSkipList,
         urlSkipList = _parameters$urlSkipLi === void 0 ? [] : _parameters$urlSkipLi;
     var oneLinkURLParts = (_ref = oneLinkURL || '') === null || _ref === void 0 ? void 0 : _ref.toString().match(AF_URL_SCHEME);
 
     if (!oneLinkURLParts || (oneLinkURLParts === null || oneLinkURLParts === void 0 ? void 0 : oneLinkURLParts.length) < VALID_AF_URL_PARTS_LENGTH) {
       console.error("oneLinkURL is missing or not in the correct format, can't generate URL", oneLinkURL);
       return null;
     }
 
     if ((mediaSource === null || mediaSource === void 0 ? void 0 : (_mediaSource$keys = mediaSource.keys) === null || _mediaSource$keys === void 0 ? void 0 : _mediaSource$keys.length) === 0 && !(mediaSource !== null && mediaSource !== void 0 && mediaSource.defaultValue)) {
       console.error("mediaSource is missing (default value was not supplied), can't generate URL", mediaSource);
       return null;
     }
 
     if (isSkippedURL({
       url: document.referrer,
       skipKeys: referrerSkipList,
       errorMsg: 'Generate url is skipped. HTTP referrer contains key:'
     })) {
       return null;
     }
 
     if (isSkippedURL({
       url: document.URL,
       skipKeys: urlSkipList,
       errorMsg: 'Generate url is skipped. URL contains string:'
     })) {
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
 
       afParams['pid'] = pidValue;
     }
 
     if (campaign) {
       afParams['c'] = getParameterValue(currentURLParams, campaign);
     }
 
     if (channel) {
       afParams['af_channel'] = getParameterValue(currentURLParams, channel);
     }
 
     if (ad) {
       afParams['af_ad'] = getParameterValue(currentURLParams, ad);
     }
 
     if (adSet) {
       afParams['af_adset'] = getParameterValue(currentURLParams, adSet);
     }
 
     if (deepLinkValue) {
       afParams['deep_link_value'] = getParameterValue(currentURLParams, deepLinkValue);
     }
 
     var afSubs = [afSub1, afSub2, afSub3, afSub4, afSub5];
     afSubs.forEach(function (afSub, index) {
       if (afSub) {
         afParams["af_sub".concat(index + 1)] = getParameterValue(currentURLParams, afSub);
       }
     });
 
     if (googleClickIdKey) {
       if (GCLID_EXCLUDE_PARAMS_KEYS.find(function (k) {
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
           var isOverrideExistingKey = AF_CUSTOM_EXCLUDE_PARAMS_KEYS.find(function (k) {
             return k === (customParam === null || customParam === void 0 ? void 0 : customParam.paramKey);
           });
 
           if ((customParam === null || customParam === void 0 ? void 0 : customParam.paramKey) === googleClickIdKey || isOverrideExistingKey) {
             console.debug("Custom parameter ParamKey can't override Google-Click-Id or AF Parameters keys", customParam);
           } else {
             afParams[[customParam.paramKey]] = getParameterValue(currentURLParams, customParam);
           }
         }
       });
     }
 
     var finalParams = stringifyParameters(afParams);
     var finalURL = oneLinkURL + finalParams.replace('&', '?');
     console.debug('Generated OneLink URL', finalURL);
 
     window.AF_SMART_SCRIPT.displayQrCode = function (htmlId) {
       if (!finalURL) {
         console.debug('ClickURL is not valid');
         return null;
       }
 
       return new QRCode(document.getElementById(htmlId), {
         text: "".concat(finalURL, "&af_ss_qr=true")
       });
     };
 
     return {
       clickURL: finalURL
     };
   };
 
   window.AF_SMART_SCRIPT = {
     generateOneLinkURL: generateOneLinkURL,
     version: '2_1_0'
   };
 })();
 //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25lbGluay1zbWFydC1zY3JpcHQtdjIuMS4wLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnRzL3NtYXJ0U2NyaXB0LmpzIiwiLi4vc3JjL3V0aWxzL3NtYXJ0U2NyaXB0LmpzIiwiLi4vc3JjL3NlcnZpY2VzL3NtYXJ0U2NyaXB0LmpzIiwiLi4vc3JjL3FyL3FyLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBRl9VUkxfU0NIRU1FID0gJyhodHRwczpcXFxcL1xcXFwvKSgoW15cXFxcLl1bXlxcXFwuXSspLikoLipcXFxcLykoLiopJztcbmV4cG9ydCBjb25zdCBWQUxJRF9BRl9VUkxfUEFSVFNfTEVOR1RIID0gNTtcbmV4cG9ydCBjb25zdCBHT09HTEVfQ0xJQ0tfSUQgPSAnZ2NsaWQnO1xuZXhwb3J0IGNvbnN0IEFTU09DSUFURURfQURfS0VZV09SRCA9ICdrZXl3b3JkJztcbmV4cG9ydCBjb25zdCBBRl9LRVlXT1JEUyA9ICdhZl9rZXl3b3Jkcyc7XG5leHBvcnQgY29uc3QgQUZfQ1VTVE9NX0VYQ0xVREVfUEFSQU1TX0tFWVMgPSBbXG4gICdwaWQnLFxuICAnYycsXG4gICdhZl9jaGFubmVsJyxcbiAgJ2FmX2FkJyxcbiAgJ2FmX2Fkc2V0JyxcbiAgJ2RlZXBfbGlua192YWx1ZScsXG4gICdhZl9zdWIxJyxcbiAgJ2FmX3N1YjInLFxuICAnYWZfc3ViMycsXG4gICdhZl9zdWI0JyxcbiAgJ2FmX3N1YjUnXG5dO1xuZXhwb3J0IGNvbnN0IEdDTElEX0VYQ0xVREVfUEFSQU1TX0tFWVMgPSBbXG4gICdwaWQnLFxuICAnYycsXG4gICdhZl9jaGFubmVsJyxcbiAgJ2FmX2FkJyxcbiAgJ2FmX2Fkc2V0JyxcbiAgJ2RlZXBfbGlua192YWx1ZSdcbl07XG4iLCJjb25zdCBzdHJpbmdpZnlQYXJhbWV0ZXJzID0gKHBhcmFtZXRlcnMgPSB7fSkgPT4ge1xuICBjb25zdCBwYXJhbVN0ciA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLnJlZHVjZSgoY3Vyciwga2V5KSA9PiB7XG4gICAgaWYgKHBhcmFtZXRlcnNba2V5XSkge1xuICAgICAgY3VyciArPSBgJiR7a2V5fT0ke3BhcmFtZXRlcnNba2V5XX1gO1xuICAgIH1cbiAgICByZXR1cm4gY3VycjtcbiAgfSwgJycpO1xuICBjb25zb2xlLmRlYnVnKCdHZW5lcmF0ZWQgT25lTGluayBwYXJhbWV0ZXJzJywgcGFyYW1TdHIpO1xuICByZXR1cm4gcGFyYW1TdHI7XG59O1xuXG5jb25zdCBnZXRQYXJhbWV0ZXJWYWx1ZSA9IChcbiAgY3VycmVudFVSTFBhcmFtcyxcbiAgY29uZmlnID0geyBrZXlzOiBbXSwgb3ZlcnJpZGVWYWx1ZXM6IHt9LCBkZWZhdWx0VmFsdWU6ICcnIH1cbikgPT4ge1xuICAvL2V4aXQgd2hlbiBjb25maWcgb2JqZWN0IHN0cnVjdHVyZSBpcyBub3QgdmFsaWRcbiAgaWYgKCEoKGNvbmZpZz8ua2V5cyAmJiBBcnJheS5pc0FycmF5KGNvbmZpZy5rZXlzKSkgfHwgY29uZmlnPy5kZWZhdWx0VmFsdWUpKSB7XG4gICAgY29uc29sZS5lcnJvcignUGFyYW1ldGVyIGNvbmZpZyBzdHJ1Y3R1cmUgaXMgd3JvbmcnLCBjb25maWcpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgeyBrZXlzID0gW10sIG92ZXJyaWRlVmFsdWVzID0ge30sIGRlZmF1bHRWYWx1ZSA9ICcnIH0gPSBjb25maWc7XG5cbiAgY29uc3QgZmlyc3RNYXRjaGVkS2V5ID0ga2V5cy5maW5kKGtleSA9PiB7XG4gICAgLy9zZXQgdGhlIGZpcnN0IG1hdGNoIG9mIGtleSB3aGljaCBjb250YWlucyBhbHNvIGEgdmFsdWVcbiAgICByZXR1cm4gISFjdXJyZW50VVJMUGFyYW1zW2tleV07XG4gIH0pO1xuXG4gIGlmIChmaXJzdE1hdGNoZWRLZXkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRVUkxQYXJhbXNbZmlyc3RNYXRjaGVkS2V5XTtcbiAgICAvL2luIGNhc2UgdGhlIHZhbHVlIGV4aXN0czpcbiAgICAvL2NoZWNrIGlmIGl0IGV4aXN0cyBpbiB0aGUgb3ZlcnJpZGVWYWx1ZXMgb2JqZWN0LCB3aGVuIGV4aXN0cyAtIHJlcGxhY2UgaXRcbiAgICAvL290aGVyd2lzZSByZXR1cm4gZGVmYXVsdCB2YWx1ZVxuICAgIHJldHVybiBvdmVycmlkZVZhbHVlc1t2YWx1ZV0gfHwgdmFsdWUgfHwgZGVmYXVsdFZhbHVlO1xuICB9XG4gIHJldHVybiBkZWZhdWx0VmFsdWU7XG59O1xuXG5jb25zdCBnZXRVUkxQYXJhbWV0ZXJzS1YgPSB1cmxTZWFyY2ggPT4ge1xuICBjb25zdCBjdXJyZW50VVJMUGFyYW1zID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybFNlYXJjaClcbiAgICAucmVwbGFjZSgnPycsICcnKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLnJlZHVjZSgoY3VyciwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGt2ID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgIGlmICghIWt2WzBdICYmICEha3ZbMV0pIHtcbiAgICAgICAgY3Vycltba3ZbMF1dXSA9IGt2WzFdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnI7XG4gICAgfSwge30pO1xuICBjb25zb2xlLmRlYnVnKCdHZW5lcmF0ZWQgY3VycmVudCBwYXJhbWV0ZXJzIG9iamVjdCcsIGN1cnJlbnRVUkxQYXJhbXMpO1xuICByZXR1cm4gY3VycmVudFVSTFBhcmFtcztcbn07XG5cbmV4cG9ydCB7IHN0cmluZ2lmeVBhcmFtZXRlcnMsIGdldFBhcmFtZXRlclZhbHVlLCBnZXRVUkxQYXJhbWV0ZXJzS1YgfTtcbiIsImltcG9ydCB7IEdPT0dMRV9DTElDS19JRCwgQVNTT0NJQVRFRF9BRF9LRVlXT1JELCBBRl9LRVlXT1JEUyB9IGZyb20gJy4uL2NvbnN0YW50cy9zbWFydFNjcmlwdCc7XG5cbmNvbnN0IGlzU2tpcHBlZFVSTCA9ICh7IHVybCwgc2tpcEtleXMsIGVycm9yTXNnIH0pID0+IHtcbiAgLy8gc2VhcmNoIGlmIHRoaXMgcGFnZSByZWZlcnJlZCBhbmQgY29udGFpbnMgb25lIG9mIHRoZSBnaXZlbiBrZXlzXG4gIGlmICh1cmwpIHtcbiAgICBjb25zdCBsb3dlclVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh1cmwudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKGxvd2VyVVJMKSB7XG4gICAgICBjb25zdCBza2lwS2V5ID0gc2tpcEtleXMuZmluZChrZXkgPT4gbG93ZXJVUkwuaW5jbHVkZXMoa2V5LnRvTG93ZXJDYXNlKCkpKTtcbiAgICAgICEhc2tpcEtleSAmJiBjb25zb2xlLmRlYnVnKGVycm9yTXNnLCBza2lwS2V5KTtcbiAgICAgIHJldHVybiAhIXNraXBLZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGdldEFGSW1wcmVzc2lvblVSTCA9IChvbmVMaW5rUGFydHMsIGZpbmFsUGFyYW1zKSA9PiB7XG4gIC8vd2UgdGFrZSB0aGUgZG9tYWluWzRdIGFuZCBvbmVsaW5rIGlkWzVdIGZyb20gb25lTGluayBVUkxcbiAgcmV0dXJuIGBodHRwczovL2ltcHJlc3Npb25zLiR7b25lTGlua1BhcnRzWzRdfSR7b25lTGlua1BhcnRzWzVdfT8ke2ZpbmFsUGFyYW1zfWA7XG59O1xuXG5jb25zdCBnZXRHb29nbGVDbGlja0lkUGFyYW1ldGVycyA9IChnY2lLZXksIGN1cnJlbnRVUkxQYXJhbXMpID0+IHtcbiAgY29uc3QgZ2NpUGFyYW0gPSBjdXJyZW50VVJMUGFyYW1zW0dPT0dMRV9DTElDS19JRF07XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBpZiAoZ2NpUGFyYW0pIHtcbiAgICBjb25zb2xlLmRlYnVnKCdUaGlzIHVzZXIgY29tZXMgZnJvbSBHb29nbGUgQWRXb3JkcycpO1xuICAgIHJlc3VsdFtnY2lLZXldID0gZ2NpUGFyYW07XG4gICAgY29uc3Qga2V5d29yZFBhcmFtID0gY3VycmVudFVSTFBhcmFtc1tBU1NPQ0lBVEVEX0FEX0tFWVdPUkRdO1xuICAgIGlmIChrZXl3b3JkUGFyYW0pIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoJ1RoZXJlIGlzIGEga2V5d29yZCBhc3NvY2lhdGVkIHdpdGggdGhlIGFkJyk7XG4gICAgICByZXN1bHRbQUZfS0VZV09SRFNdID0ga2V5d29yZFBhcmFtO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmRlYnVnKCdUaGlzIHVzZXIgY29tZXMgZnJvbSBTUk4gb3IgY3VzdG9tIG5ldHdvcmsnKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IHsgaXNTa2lwcGVkVVJMLCBnZXRBRkltcHJlc3Npb25VUkwsIGdldEdvb2dsZUNsaWNrSWRQYXJhbWV0ZXJzIH07XG4iLCIvKipcbiAqIEVhc3lRUkNvZGVKU1xuICpcbiAqIENyb3NzLWJyb3dzZXIgUVJDb2RlIGdlbmVyYXRvciBmb3IgcHVyZSBqYXZhc2NyaXB0LiBTdXBwb3J0IENhbnZhcywgU1ZHIGFuZCBUYWJsZSBkcmF3aW5nIG1ldGhvZHMuIFN1cHBvcnQgRG90IHN0eWxlLCBMb2dvLCBCYWNrZ3JvdW5kIGltYWdlLCBDb2xvcmZ1bCwgVGl0bGUgZXRjLiBzZXR0aW5ncy4gU3VwcG9ydCBBbmd1bGFyLCBWdWUuanMsIFJlYWN0LCBOZXh0LmpzLCBTdmVsdGUgZnJhbWV3b3JrLiBTdXBwb3J0IGJpbmFyeShoZXgpIGRhdGEgbW9kZS4oUnVubmluZyB3aXRoIERPTSBvbiBjbGllbnQgc2lkZSlcbiAqXG4gKiBWZXJzaW9uIDQuNC4xMFxuICpcbiAqIEBhdXRob3IgWyBpbnRoaW5rY29sb3JAZ21haWwuY29tIF1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91c2hlbHAvRWFzeVFSQ29kZUpTXG4gKiBAc2VlIGh0dHA6Ly93d3cuZWFzeXByb2plY3QuY24vZWFzeXFyY29kZWpzL3RyeWl0Lmh0bWxcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3VzaGVscC9FYXN5UVJDb2RlSlMtTm9kZUpTXG4gKlxuICogQ29weXJpZ2h0IDIwMTcgUmF5LCBFYXN5UHJvamVjdFxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogW1N1cHBvcnQgQU1ELCBDTUQsIENvbW1vbkpTL05vZGUuanNdXG4gKlxuICovXG5mdW5jdGlvbiBRUkNvZGUoKSB7XG4gIC8vIOWQr+eUqOS4peagvOaooeW8j1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8g6Ieq5a6a5LmJ5bGA6YOoIHVuZGVmaW5lZCDlj5jph49cbiAgdmFyIHVuZGVmaW5lZDtcblxuICAvKiogTm9kZS5qcyBnbG9iYWwg5qOA5rWLLiAqL1xuICB2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbiAgLyoqIGBzZWxmYCDlj5jph4/mo4DmtYsuICovXG4gIHZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4gIC8qKiDlhajlsYDlr7nosaHmo4DmtYsuICovXG4gIHZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4gIC8qKiBgZXhwb3J0c2Ag5Y+Y6YeP5qOA5rWLLiAqL1xuICB2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbiAgLyoqIGBtb2R1bGVgIOWPmOmHj+ajgOa1iy4gKi9cbiAgdmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuICB2YXIgX1FSQ29kZSA9IHJvb3QuUVJDb2RlO1xuXG4gIHZhciBRUkNvZGU7XG5cbiAgZnVuY3Rpb24gUVI4Yml0Qnl0ZShkYXRhLCBiaW5hcnksIHV0ZjhXaXRob3V0Qk9NKSB7XG4gICAgdGhpcy5tb2RlID0gUVJNb2RlLk1PREVfOEJJVF9CWVRFO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5wYXJzZWREYXRhID0gW107XG5cbiAgICAvLyBBZGRlZCB0byBzdXBwb3J0IFVURi04IENoYXJhY3RlcnNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgICAgIHZhciBjb2RlID0gdGhpcy5kYXRhLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIGlmIChiaW5hcnkpIHtcbiAgICAgICAgYnl0ZUFycmF5WzBdID0gY29kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb2RlID4gMHgxMDAwMCkge1xuICAgICAgICAgIGJ5dGVBcnJheVswXSA9IDB4ZjAgfCAoKGNvZGUgJiAweDFjMDAwMCkgPj4+IDE4KTtcbiAgICAgICAgICBieXRlQXJyYXlbMV0gPSAweDgwIHwgKChjb2RlICYgMHgzZjAwMCkgPj4+IDEyKTtcbiAgICAgICAgICBieXRlQXJyYXlbMl0gPSAweDgwIHwgKChjb2RlICYgMHhmYzApID4+PiA2KTtcbiAgICAgICAgICBieXRlQXJyYXlbM10gPSAweDgwIHwgKGNvZGUgJiAweDNmKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID4gMHg4MDApIHtcbiAgICAgICAgICBieXRlQXJyYXlbMF0gPSAweGUwIHwgKChjb2RlICYgMHhmMDAwKSA+Pj4gMTIpO1xuICAgICAgICAgIGJ5dGVBcnJheVsxXSA9IDB4ODAgfCAoKGNvZGUgJiAweGZjMCkgPj4+IDYpO1xuICAgICAgICAgIGJ5dGVBcnJheVsyXSA9IDB4ODAgfCAoY29kZSAmIDB4M2YpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPiAweDgwKSB7XG4gICAgICAgICAgYnl0ZUFycmF5WzBdID0gMHhjMCB8ICgoY29kZSAmIDB4N2MwKSA+Pj4gNik7XG4gICAgICAgICAgYnl0ZUFycmF5WzFdID0gMHg4MCB8IChjb2RlICYgMHgzZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnl0ZUFycmF5WzBdID0gY29kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnBhcnNlZERhdGEucHVzaChieXRlQXJyYXkpO1xuICAgIH1cblxuICAgIHRoaXMucGFyc2VkRGF0YSA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHRoaXMucGFyc2VkRGF0YSk7XG4gICAgaWYgKCF1dGY4V2l0aG91dEJPTSAmJiB0aGlzLnBhcnNlZERhdGEubGVuZ3RoICE9IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMucGFyc2VkRGF0YS51bnNoaWZ0KDE5MSk7XG4gICAgICB0aGlzLnBhcnNlZERhdGEudW5zaGlmdCgxODcpO1xuICAgICAgdGhpcy5wYXJzZWREYXRhLnVuc2hpZnQoMjM5KTtcbiAgICB9XG4gIH1cblxuICBRUjhiaXRCeXRlLnByb3RvdHlwZSA9IHtcbiAgICBnZXRMZW5ndGg6IGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlZERhdGEubGVuZ3RoO1xuICAgIH0sXG4gICAgd3JpdGU6IGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5wYXJzZWREYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBidWZmZXIucHV0KHRoaXMucGFyc2VkRGF0YVtpXSwgOCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIFFSQ29kZU1vZGVsKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgdGhpcy50eXBlTnVtYmVyID0gdHlwZU51bWJlcjtcbiAgICB0aGlzLmVycm9yQ29ycmVjdExldmVsID0gZXJyb3JDb3JyZWN0TGV2ZWw7XG4gICAgdGhpcy5tb2R1bGVzID0gbnVsbDtcbiAgICB0aGlzLm1vZHVsZUNvdW50ID0gMDtcbiAgICB0aGlzLmRhdGFDYWNoZSA9IG51bGw7XG4gICAgdGhpcy5kYXRhTGlzdCA9IFtdO1xuICB9XG5cbiAgUVJDb2RlTW9kZWwucHJvdG90eXBlID0ge1xuICAgIGFkZERhdGE6IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnksIHV0ZjhXaXRob3V0Qk9NKSB7XG4gICAgICB2YXIgbmV3RGF0YSA9IG5ldyBRUjhiaXRCeXRlKGRhdGEsIGJpbmFyeSwgdXRmOFdpdGhvdXRCT00pO1xuICAgICAgdGhpcy5kYXRhTGlzdC5wdXNoKG5ld0RhdGEpO1xuICAgICAgdGhpcy5kYXRhQ2FjaGUgPSBudWxsO1xuICAgIH0sXG4gICAgaXNEYXJrOiBmdW5jdGlvbiAocm93LCBjb2wpIHtcbiAgICAgIGlmIChyb3cgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gcm93IHx8IGNvbCA8IDAgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSBjb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJvdyArICcsJyArIGNvbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5tb2R1bGVzW3Jvd11bY29sXVswXTtcbiAgICB9LFxuICAgIGdldEV5ZTogZnVuY3Rpb24gKHJvdywgY29sKSB7XG4gICAgICBpZiAocm93IDwgMCB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IHJvdyB8fCBjb2wgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyb3cgKyAnLCcgKyBjb2wpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYmxvY2sgPSB0aGlzLm1vZHVsZXNbcm93XVtjb2xdOyAvLyBbaXNEYXJrKHR1cmUvZmFsc2UpLCBFeWVPdXRlck9ySW5uZXIoTy9JKSwgUG9zaXRpb24oVEwvVFIvQkwvQSkgXVxuXG4gICAgICBpZiAoYmxvY2tbMV0pIHtcbiAgICAgICAgdmFyIHR5cGUgPSAnUCcgKyBibG9ja1sxXSArICdfJyArIGJsb2NrWzJdOyAvL1BPX1RMLCBQSV9UTCwgUE9fVFIsIFBJX1RSLCBQT19CTCwgUElfQkxcbiAgICAgICAgaWYgKGJsb2NrWzJdID09ICdBJykge1xuICAgICAgICAgIHR5cGUgPSAnQScgKyBibG9ja1sxXTsgLy8gQUksIEFPXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlzRGFyazogYmxvY2tbMF0sXG4gICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRNb2R1bGVDb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kdWxlQ291bnQ7XG4gICAgfSxcbiAgICBtYWtlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLm1ha2VJbXBsKGZhbHNlLCB0aGlzLmdldEJlc3RNYXNrUGF0dGVybigpKTtcbiAgICB9LFxuICAgIG1ha2VJbXBsOiBmdW5jdGlvbiAodGVzdCwgbWFza1BhdHRlcm4pIHtcbiAgICAgIHRoaXMubW9kdWxlQ291bnQgPSB0aGlzLnR5cGVOdW1iZXIgKiA0ICsgMTc7XG4gICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgQXJyYXkodGhpcy5tb2R1bGVDb3VudCk7XG4gICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCB0aGlzLm1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICB0aGlzLm1vZHVsZXNbcm93XSA9IG5ldyBBcnJheSh0aGlzLm1vZHVsZUNvdW50KTtcbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgdGhpcy5tb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93XVtjb2xdID0gW107IC8vIFtpc0RhcmsodHVyZS9mYWxzZSksIEV5ZU91dGVyT3JJbm5lcihPL0kpLCBQb3NpdGlvbihUTC9UUi9CTCkgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwgMCwgJ1RMJyk7IC8vIFRvcExlZnQsIFRMXG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4odGhpcy5tb2R1bGVDb3VudCAtIDcsIDAsICdCTCcpOyAvLyBCb3Rvb21MZWZ0LCBCTFxuICAgICAgdGhpcy5zZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuKDAsIHRoaXMubW9kdWxlQ291bnQgLSA3LCAnVFInKTsgLy8gVG9wUmlnaHQsIFRSXG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuKCdBJyk7IC8vIEFsaWdubWVudCwgQVxuICAgICAgdGhpcy5zZXR1cFRpbWluZ1BhdHRlcm4oKTtcbiAgICAgIHRoaXMuc2V0dXBUeXBlSW5mbyh0ZXN0LCBtYXNrUGF0dGVybik7XG4gICAgICBpZiAodGhpcy50eXBlTnVtYmVyID49IDcpIHtcbiAgICAgICAgdGhpcy5zZXR1cFR5cGVOdW1iZXIodGVzdCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kYXRhQ2FjaGUgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRhdGFDYWNoZSA9IFFSQ29kZU1vZGVsLmNyZWF0ZURhdGEoXG4gICAgICAgICAgdGhpcy50eXBlTnVtYmVyLFxuICAgICAgICAgIHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwsXG4gICAgICAgICAgdGhpcy5kYXRhTGlzdFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5tYXBEYXRhKHRoaXMuZGF0YUNhY2hlLCBtYXNrUGF0dGVybik7XG4gICAgfSxcbiAgICBzZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuOiBmdW5jdGlvbiAocm93LCBjb2wsIHBvc05hbWUpIHtcbiAgICAgIGZvciAodmFyIHIgPSAtMTsgciA8PSA3OyByKyspIHtcbiAgICAgICAgaWYgKHJvdyArIHIgPD0gLTEgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSByb3cgKyByKSBjb250aW51ZTtcbiAgICAgICAgZm9yICh2YXIgYyA9IC0xOyBjIDw9IDc7IGMrKykge1xuICAgICAgICAgIGlmIChjb2wgKyBjIDw9IC0xIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gY29sICsgYykgY29udGludWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKDAgPD0gciAmJiByIDw9IDYgJiYgKGMgPT0gMCB8fCBjID09IDYpKSB8fFxuICAgICAgICAgICAgKDAgPD0gYyAmJiBjIDw9IDYgJiYgKHIgPT0gMCB8fCByID09IDYpKSB8fFxuICAgICAgICAgICAgKDIgPD0gciAmJiByIDw9IDQgJiYgMiA8PSBjICYmIGMgPD0gNClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVswXSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVsyXSA9IHBvc05hbWU7IC8vIFBvc2l0aW9uXG4gICAgICAgICAgICBpZiAociA9PSAtMCB8fCBjID09IC0wIHx8IHIgPT0gNiB8fCBjID09IDYpIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdWzFdID0gJ08nOyAvLyBQb3NpdGlvbiBPdXRlclxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdWzFdID0gJ0knOyAvLyBQb3NpdGlvbiBJbm5lclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY11bMF0gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEJlc3RNYXNrUGF0dGVybjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG1pbkxvc3RQb2ludCA9IDA7XG4gICAgICB2YXIgcGF0dGVybiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICB0aGlzLm1ha2VJbXBsKHRydWUsIGkpO1xuICAgICAgICB2YXIgbG9zdFBvaW50ID0gUVJVdGlsLmdldExvc3RQb2ludCh0aGlzKTtcbiAgICAgICAgaWYgKGkgPT0gMCB8fCBtaW5Mb3N0UG9pbnQgPiBsb3N0UG9pbnQpIHtcbiAgICAgICAgICBtaW5Mb3N0UG9pbnQgPSBsb3N0UG9pbnQ7XG4gICAgICAgICAgcGF0dGVybiA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH0sXG4gICAgY3JlYXRlTW92aWVDbGlwOiBmdW5jdGlvbiAodGFyZ2V0X21jLCBpbnN0YW5jZV9uYW1lLCBkZXB0aCkge1xuICAgICAgdmFyIHFyX21jID0gdGFyZ2V0X21jLmNyZWF0ZUVtcHR5TW92aWVDbGlwKGluc3RhbmNlX25hbWUsIGRlcHRoKTtcbiAgICAgIHZhciBjcyA9IDE7XG4gICAgICB0aGlzLm1ha2UoKTtcbiAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IHJvdysrKSB7XG4gICAgICAgIHZhciB5ID0gcm93ICogY3M7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHRoaXMubW9kdWxlc1tyb3ddLmxlbmd0aDsgY29sKyspIHtcbiAgICAgICAgICB2YXIgeCA9IGNvbCAqIGNzO1xuICAgICAgICAgIHZhciBkYXJrID0gdGhpcy5tb2R1bGVzW3Jvd11bY29sXVswXTtcbiAgICAgICAgICBpZiAoZGFyaykge1xuICAgICAgICAgICAgcXJfbWMuYmVnaW5GaWxsKDAsIDEwMCk7XG4gICAgICAgICAgICBxcl9tYy5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICBxcl9tYy5saW5lVG8oeCArIGNzLCB5KTtcbiAgICAgICAgICAgIHFyX21jLmxpbmVUbyh4ICsgY3MsIHkgKyBjcyk7XG4gICAgICAgICAgICBxcl9tYy5saW5lVG8oeCwgeSArIGNzKTtcbiAgICAgICAgICAgIHFyX21jLmVuZEZpbGwoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBxcl9tYztcbiAgICB9LFxuICAgIHNldHVwVGltaW5nUGF0dGVybjogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgciA9IDg7IHIgPCB0aGlzLm1vZHVsZUNvdW50IC0gODsgcisrKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcl1bNl1bMF0gIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kdWxlc1tyXVs2XVswXSA9IHIgJSAyID09IDA7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBjID0gODsgYyA8IHRoaXMubW9kdWxlQ291bnQgLSA4OyBjKyspIHtcbiAgICAgICAgaWYgKHRoaXMubW9kdWxlc1s2XVtjXVswXSAhPSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2R1bGVzWzZdW2NdWzBdID0gYyAlIDIgPT0gMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuOiBmdW5jdGlvbiAocG9zTmFtZSkge1xuICAgICAgdmFyIHBvcyA9IFFSVXRpbC5nZXRQYXR0ZXJuUG9zaXRpb24odGhpcy50eXBlTnVtYmVyKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIHJvdyA9IHBvc1tpXTtcbiAgICAgICAgICB2YXIgY29sID0gcG9zW2pdO1xuICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2xdWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciByID0gLTI7IHIgPD0gMjsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gLTI7IGMgPD0gMjsgYysrKSB7XG4gICAgICAgICAgICAgIGlmIChyID09IC0yIHx8IHIgPT0gMiB8fCBjID09IC0yIHx8IGMgPT0gMiB8fCAociA9PSAwICYmIGMgPT0gMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY11bMF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVsyXSA9IHBvc05hbWU7IC8vIFBvc2l0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHIgPT0gLTIgfHwgYyA9PSAtMiB8fCByID09IDIgfHwgYyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY11bMV0gPSAnTyc7IC8vIFBvc2l0aW9uIE91dGVyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVsxXSA9ICdJJzsgLy8gUG9zaXRpb24gSW5uZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdWzBdID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHNldHVwVHlwZU51bWJlcjogZnVuY3Rpb24gKHRlc3QpIHtcbiAgICAgIHZhciBiaXRzID0gUVJVdGlsLmdldEJDSFR5cGVOdW1iZXIodGhpcy50eXBlTnVtYmVyKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgICAgdGhpcy5tb2R1bGVzW01hdGguZmxvb3IoaSAvIDMpXVsoaSAlIDMpICsgdGhpcy5tb2R1bGVDb3VudCAtIDggLSAzXVswXSA9IG1vZDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgICAgdGhpcy5tb2R1bGVzWyhpICUgMykgKyB0aGlzLm1vZHVsZUNvdW50IC0gOCAtIDNdW01hdGguZmxvb3IoaSAvIDMpXVswXSA9IG1vZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldHVwVHlwZUluZm86IGZ1bmN0aW9uICh0ZXN0LCBtYXNrUGF0dGVybikge1xuICAgICAgdmFyIGRhdGEgPSAodGhpcy5lcnJvckNvcnJlY3RMZXZlbCA8PCAzKSB8IG1hc2tQYXR0ZXJuO1xuICAgICAgdmFyIGJpdHMgPSBRUlV0aWwuZ2V0QkNIVHlwZUluZm8oZGF0YSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgIGlmIChpIDwgNikge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1tpXVs4XVswXSA9IG1vZDtcbiAgICAgICAgfSBlbHNlIGlmIChpIDwgOCkge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1tpICsgMV1bOF1bMF0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2R1bGVzW3RoaXMubW9kdWxlQ291bnQgLSAxNSArIGldWzhdWzBdID0gbW9kO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgIGlmIChpIDwgOCkge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1s4XVt0aGlzLm1vZHVsZUNvdW50IC0gaSAtIDFdWzBdID0gbW9kO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPCA5KSB7XG4gICAgICAgICAgdGhpcy5tb2R1bGVzWzhdWzE1IC0gaSAtIDEgKyAxXVswXSA9IG1vZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbOF1bMTUgLSBpIC0gMV1bMF0gPSBtb2Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubW9kdWxlc1t0aGlzLm1vZHVsZUNvdW50IC0gOF1bOF1bMF0gPSAhdGVzdDtcbiAgICB9LFxuICAgIG1hcERhdGE6IGZ1bmN0aW9uIChkYXRhLCBtYXNrUGF0dGVybikge1xuICAgICAgdmFyIGluYyA9IC0xO1xuICAgICAgdmFyIHJvdyA9IHRoaXMubW9kdWxlQ291bnQgLSAxO1xuICAgICAgdmFyIGJpdEluZGV4ID0gNztcbiAgICAgIHZhciBieXRlSW5kZXggPSAwO1xuICAgICAgZm9yICh2YXIgY29sID0gdGhpcy5tb2R1bGVDb3VudCAtIDE7IGNvbCA+IDA7IGNvbCAtPSAyKSB7XG4gICAgICAgIGlmIChjb2wgPT0gNikgY29sLS07XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCAyOyBjKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2wgLSBjXVswXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHZhciBkYXJrID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChieXRlSW5kZXggPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRhcmsgPSAoKGRhdGFbYnl0ZUluZGV4XSA+Pj4gYml0SW5kZXgpICYgMSkgPT0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgbWFzayA9IFFSVXRpbC5nZXRNYXNrKG1hc2tQYXR0ZXJuLCByb3csIGNvbCAtIGMpO1xuICAgICAgICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgICAgIGRhcmsgPSAhZGFyaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93XVtjb2wgLSBjXVswXSA9IGRhcms7XG4gICAgICAgICAgICAgIGJpdEluZGV4LS07XG4gICAgICAgICAgICAgIGlmIChiaXRJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIGJ5dGVJbmRleCsrO1xuICAgICAgICAgICAgICAgIGJpdEluZGV4ID0gNztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByb3cgKz0gaW5jO1xuICAgICAgICAgIGlmIChyb3cgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gcm93KSB7XG4gICAgICAgICAgICByb3cgLT0gaW5jO1xuICAgICAgICAgICAgaW5jID0gLWluYztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgUVJDb2RlTW9kZWwuUEFEMCA9IDB4ZWM7XG4gIFFSQ29kZU1vZGVsLlBBRDEgPSAweDExO1xuICBRUkNvZGVNb2RlbC5jcmVhdGVEYXRhID0gZnVuY3Rpb24gKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsLCBkYXRhTGlzdCkge1xuICAgIHZhciByc0Jsb2NrcyA9IFFSUlNCbG9jay5nZXRSU0Jsb2Nrcyh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCk7XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBRUkJpdEJ1ZmZlcigpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkYXRhID0gZGF0YUxpc3RbaV07XG4gICAgICBidWZmZXIucHV0KGRhdGEubW9kZSwgNCk7XG4gICAgICBidWZmZXIucHV0KGRhdGEuZ2V0TGVuZ3RoKCksIFFSVXRpbC5nZXRMZW5ndGhJbkJpdHMoZGF0YS5tb2RlLCB0eXBlTnVtYmVyKSk7XG4gICAgICBkYXRhLndyaXRlKGJ1ZmZlcik7XG4gICAgfVxuICAgIHZhciB0b3RhbERhdGFDb3VudCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByc0Jsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxEYXRhQ291bnQgKz0gcnNCbG9ja3NbaV0uZGF0YUNvdW50O1xuICAgIH1cbiAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID4gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdjb2RlIGxlbmd0aCBvdmVyZmxvdy4gKCcgKyBidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgKyAnPicgKyB0b3RhbERhdGFDb3VudCAqIDggKyAnKSdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgKyA0IDw9IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgYnVmZmVyLnB1dCgwLCA0KTtcbiAgICB9XG4gICAgd2hpbGUgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSAlIDggIT0gMCkge1xuICAgICAgYnVmZmVyLnB1dEJpdChmYWxzZSk7XG4gICAgfVxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXQoUVJDb2RlTW9kZWwuUEFEMCwgOCk7XG4gICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXQoUVJDb2RlTW9kZWwuUEFEMSwgOCk7XG4gICAgfVxuICAgIHJldHVybiBRUkNvZGVNb2RlbC5jcmVhdGVCeXRlcyhidWZmZXIsIHJzQmxvY2tzKTtcbiAgfTtcbiAgUVJDb2RlTW9kZWwuY3JlYXRlQnl0ZXMgPSBmdW5jdGlvbiAoYnVmZmVyLCByc0Jsb2Nrcykge1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciBtYXhEY0NvdW50ID0gMDtcbiAgICB2YXIgbWF4RWNDb3VudCA9IDA7XG4gICAgdmFyIGRjZGF0YSA9IG5ldyBBcnJheShyc0Jsb2Nrcy5sZW5ndGgpO1xuICAgIHZhciBlY2RhdGEgPSBuZXcgQXJyYXkocnNCbG9ja3MubGVuZ3RoKTtcbiAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XG4gICAgICB2YXIgZGNDb3VudCA9IHJzQmxvY2tzW3JdLmRhdGFDb3VudDtcbiAgICAgIHZhciBlY0NvdW50ID0gcnNCbG9ja3Nbcl0udG90YWxDb3VudCAtIGRjQ291bnQ7XG4gICAgICBtYXhEY0NvdW50ID0gTWF0aC5tYXgobWF4RGNDb3VudCwgZGNDb3VudCk7XG4gICAgICBtYXhFY0NvdW50ID0gTWF0aC5tYXgobWF4RWNDb3VudCwgZWNDb3VudCk7XG4gICAgICBkY2RhdGFbcl0gPSBuZXcgQXJyYXkoZGNDb3VudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRjZGF0YVtyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkY2RhdGFbcl1baV0gPSAweGZmICYgYnVmZmVyLmJ1ZmZlcltpICsgb2Zmc2V0XTtcbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBkY0NvdW50O1xuICAgICAgdmFyIHJzUG9seSA9IFFSVXRpbC5nZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsKGVjQ291bnQpO1xuICAgICAgdmFyIHJhd1BvbHkgPSBuZXcgUVJQb2x5bm9taWFsKGRjZGF0YVtyXSwgcnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG4gICAgICB2YXIgbW9kUG9seSA9IHJhd1BvbHkubW9kKHJzUG9seSk7XG4gICAgICBlY2RhdGFbcl0gPSBuZXcgQXJyYXkocnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVjZGF0YVtyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbW9kSW5kZXggPSBpICsgbW9kUG9seS5nZXRMZW5ndGgoKSAtIGVjZGF0YVtyXS5sZW5ndGg7XG4gICAgICAgIGVjZGF0YVtyXVtpXSA9IG1vZEluZGV4ID49IDAgPyBtb2RQb2x5LmdldChtb2RJbmRleCkgOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdG90YWxDb2RlQ291bnQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnNCbG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsQ29kZUNvdW50ICs9IHJzQmxvY2tzW2ldLnRvdGFsQ291bnQ7XG4gICAgfVxuICAgIHZhciBkYXRhID0gbmV3IEFycmF5KHRvdGFsQ29kZUNvdW50KTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RGNDb3VudDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XG4gICAgICAgIGlmIChpIDwgZGNkYXRhW3JdLmxlbmd0aCkge1xuICAgICAgICAgIGRhdGFbaW5kZXgrK10gPSBkY2RhdGFbcl1baV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhFY0NvdW50OyBpKyspIHtcbiAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByKyspIHtcbiAgICAgICAgaWYgKGkgPCBlY2RhdGFbcl0ubGVuZ3RoKSB7XG4gICAgICAgICAgZGF0YVtpbmRleCsrXSA9IGVjZGF0YVtyXVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcbiAgdmFyIFFSTW9kZSA9IHtcbiAgICBNT0RFX05VTUJFUjogMSA8PCAwLFxuICAgIE1PREVfQUxQSEFfTlVNOiAxIDw8IDEsXG4gICAgTU9ERV84QklUX0JZVEU6IDEgPDwgMixcbiAgICBNT0RFX0tBTkpJOiAxIDw8IDNcbiAgfTtcbiAgdmFyIFFSRXJyb3JDb3JyZWN0TGV2ZWwgPSB7XG4gICAgTDogMSxcbiAgICBNOiAwLFxuICAgIFE6IDMsXG4gICAgSDogMlxuICB9O1xuICB2YXIgUVJNYXNrUGF0dGVybiA9IHtcbiAgICBQQVRURVJOMDAwOiAwLFxuICAgIFBBVFRFUk4wMDE6IDEsXG4gICAgUEFUVEVSTjAxMDogMixcbiAgICBQQVRURVJOMDExOiAzLFxuICAgIFBBVFRFUk4xMDA6IDQsXG4gICAgUEFUVEVSTjEwMTogNSxcbiAgICBQQVRURVJOMTEwOiA2LFxuICAgIFBBVFRFUk4xMTE6IDdcbiAgfTtcbiAgdmFyIFFSVXRpbCA9IHtcbiAgICBQQVRURVJOX1BPU0lUSU9OX1RBQkxFOiBbXG4gICAgICBbXSxcbiAgICAgIFs2LCAxOF0sXG4gICAgICBbNiwgMjJdLFxuICAgICAgWzYsIDI2XSxcbiAgICAgIFs2LCAzMF0sXG4gICAgICBbNiwgMzRdLFxuICAgICAgWzYsIDIyLCAzOF0sXG4gICAgICBbNiwgMjQsIDQyXSxcbiAgICAgIFs2LCAyNiwgNDZdLFxuICAgICAgWzYsIDI4LCA1MF0sXG4gICAgICBbNiwgMzAsIDU0XSxcbiAgICAgIFs2LCAzMiwgNThdLFxuICAgICAgWzYsIDM0LCA2Ml0sXG4gICAgICBbNiwgMjYsIDQ2LCA2Nl0sXG4gICAgICBbNiwgMjYsIDQ4LCA3MF0sXG4gICAgICBbNiwgMjYsIDUwLCA3NF0sXG4gICAgICBbNiwgMzAsIDU0LCA3OF0sXG4gICAgICBbNiwgMzAsIDU2LCA4Ml0sXG4gICAgICBbNiwgMzAsIDU4LCA4Nl0sXG4gICAgICBbNiwgMzQsIDYyLCA5MF0sXG4gICAgICBbNiwgMjgsIDUwLCA3MiwgOTRdLFxuICAgICAgWzYsIDI2LCA1MCwgNzQsIDk4XSxcbiAgICAgIFs2LCAzMCwgNTQsIDc4LCAxMDJdLFxuICAgICAgWzYsIDI4LCA1NCwgODAsIDEwNl0sXG4gICAgICBbNiwgMzIsIDU4LCA4NCwgMTEwXSxcbiAgICAgIFs2LCAzMCwgNTgsIDg2LCAxMTRdLFxuICAgICAgWzYsIDM0LCA2MiwgOTAsIDExOF0sXG4gICAgICBbNiwgMjYsIDUwLCA3NCwgOTgsIDEyMl0sXG4gICAgICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjZdLFxuICAgICAgWzYsIDI2LCA1MiwgNzgsIDEwNCwgMTMwXSxcbiAgICAgIFs2LCAzMCwgNTYsIDgyLCAxMDgsIDEzNF0sXG4gICAgICBbNiwgMzQsIDYwLCA4NiwgMTEyLCAxMzhdLFxuICAgICAgWzYsIDMwLCA1OCwgODYsIDExNCwgMTQyXSxcbiAgICAgIFs2LCAzNCwgNjIsIDkwLCAxMTgsIDE0Nl0sXG4gICAgICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjYsIDE1MF0sXG4gICAgICBbNiwgMjQsIDUwLCA3NiwgMTAyLCAxMjgsIDE1NF0sXG4gICAgICBbNiwgMjgsIDU0LCA4MCwgMTA2LCAxMzIsIDE1OF0sXG4gICAgICBbNiwgMzIsIDU4LCA4NCwgMTEwLCAxMzYsIDE2Ml0sXG4gICAgICBbNiwgMjYsIDU0LCA4MiwgMTEwLCAxMzgsIDE2Nl0sXG4gICAgICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDIsIDE3MF1cbiAgICBdLFxuICAgIEcxNTogKDEgPDwgMTApIHwgKDEgPDwgOCkgfCAoMSA8PCA1KSB8ICgxIDw8IDQpIHwgKDEgPDwgMikgfCAoMSA8PCAxKSB8ICgxIDw8IDApLFxuICAgIEcxODogKDEgPDwgMTIpIHwgKDEgPDwgMTEpIHwgKDEgPDwgMTApIHwgKDEgPDwgOSkgfCAoMSA8PCA4KSB8ICgxIDw8IDUpIHwgKDEgPDwgMikgfCAoMSA8PCAwKSxcbiAgICBHMTVfTUFTSzogKDEgPDwgMTQpIHwgKDEgPDwgMTIpIHwgKDEgPDwgMTApIHwgKDEgPDwgNCkgfCAoMSA8PCAxKSxcbiAgICBnZXRCQ0hUeXBlSW5mbzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBkID0gZGF0YSA8PCAxMDtcbiAgICAgIHdoaWxlIChRUlV0aWwuZ2V0QkNIRGlnaXQoZCkgLSBRUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxNSkgPj0gMCkge1xuICAgICAgICBkIF49IFFSVXRpbC5HMTUgPDwgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE1KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChkYXRhIDw8IDEwKSB8IGQpIF4gUVJVdGlsLkcxNV9NQVNLO1xuICAgIH0sXG4gICAgZ2V0QkNIVHlwZU51bWJlcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBkID0gZGF0YSA8PCAxMjtcbiAgICAgIHdoaWxlIChRUlV0aWwuZ2V0QkNIRGlnaXQoZCkgLSBRUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxOCkgPj0gMCkge1xuICAgICAgICBkIF49IFFSVXRpbC5HMTggPDwgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE4KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGRhdGEgPDwgMTIpIHwgZDtcbiAgICB9LFxuICAgIGdldEJDSERpZ2l0OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIGRpZ2l0ID0gMDtcbiAgICAgIHdoaWxlIChkYXRhICE9IDApIHtcbiAgICAgICAgZGlnaXQrKztcbiAgICAgICAgZGF0YSA+Pj49IDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGlnaXQ7XG4gICAgfSxcbiAgICBnZXRQYXR0ZXJuUG9zaXRpb246IGZ1bmN0aW9uICh0eXBlTnVtYmVyKSB7XG4gICAgICByZXR1cm4gUVJVdGlsLlBBVFRFUk5fUE9TSVRJT05fVEFCTEVbdHlwZU51bWJlciAtIDFdO1xuICAgIH0sXG4gICAgZ2V0TWFzazogZnVuY3Rpb24gKG1hc2tQYXR0ZXJuLCBpLCBqKSB7XG4gICAgICBzd2l0Y2ggKG1hc2tQYXR0ZXJuKSB7XG4gICAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMDAwOlxuICAgICAgICAgIHJldHVybiAoaSArIGopICUgMiA9PSAwO1xuICAgICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAwMTpcbiAgICAgICAgICByZXR1cm4gaSAlIDIgPT0gMDtcbiAgICAgICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTA6XG4gICAgICAgICAgcmV0dXJuIGogJSAzID09IDA7XG4gICAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMDExOlxuICAgICAgICAgIHJldHVybiAoaSArIGopICUgMyA9PSAwO1xuICAgICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMDpcbiAgICAgICAgICByZXR1cm4gKE1hdGguZmxvb3IoaSAvIDIpICsgTWF0aC5mbG9vcihqIC8gMykpICUgMiA9PSAwO1xuICAgICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMTpcbiAgICAgICAgICByZXR1cm4gKChpICogaikgJSAyKSArICgoaSAqIGopICUgMykgPT0gMDtcbiAgICAgICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMTA6XG4gICAgICAgICAgcmV0dXJuICgoKGkgKiBqKSAlIDIpICsgKChpICogaikgJSAzKSkgJSAyID09IDA7XG4gICAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMTExOlxuICAgICAgICAgIHJldHVybiAoKChpICogaikgJSAzKSArICgoaSArIGopICUgMikpICUgMiA9PSAwO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIG1hc2tQYXR0ZXJuOicgKyBtYXNrUGF0dGVybik7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsOiBmdW5jdGlvbiAoZXJyb3JDb3JyZWN0TGVuZ3RoKSB7XG4gICAgICB2YXIgYSA9IG5ldyBRUlBvbHlub21pYWwoWzFdLCAwKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXJyb3JDb3JyZWN0TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYSA9IGEubXVsdGlwbHkobmV3IFFSUG9seW5vbWlhbChbMSwgUVJNYXRoLmdleHAoaSldLCAwKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYTtcbiAgICB9LFxuICAgIGdldExlbmd0aEluQml0czogZnVuY3Rpb24gKG1vZGUsIHR5cGUpIHtcbiAgICAgIGlmICgxIDw9IHR5cGUgJiYgdHlwZSA8IDEwKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEU6XG4gICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJOlxuICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kZTonICsgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA8IDI3KSB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFOlxuICAgICAgICAgICAgcmV0dXJuIDE2O1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkk6XG4gICAgICAgICAgICByZXR1cm4gMTA7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kZTonICsgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA8IDQxKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgcmV0dXJuIDE0O1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgcmV0dXJuIDEzO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFOlxuICAgICAgICAgICAgcmV0dXJuIDE2O1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkk6XG4gICAgICAgICAgICByZXR1cm4gMTI7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kZTonICsgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHlwZTonICsgdHlwZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRMb3N0UG9pbnQ6IGZ1bmN0aW9uIChxckNvZGUpIHtcbiAgICAgIHZhciBtb2R1bGVDb3VudCA9IHFyQ29kZS5nZXRNb2R1bGVDb3VudCgpO1xuICAgICAgdmFyIGxvc3RQb2ludCA9IDA7XG4gICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgdmFyIHNhbWVDb3VudCA9IDA7XG4gICAgICAgICAgdmFyIGRhcmsgPSBxckNvZGUuaXNEYXJrKHJvdywgY29sKTtcbiAgICAgICAgICBmb3IgKHZhciByID0gLTE7IHIgPD0gMTsgcisrKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgciA8IDAgfHwgbW9kdWxlQ291bnQgPD0gcm93ICsgcikge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAtMTsgYyA8PSAxOyBjKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNvbCArIGMgPCAwIHx8IG1vZHVsZUNvdW50IDw9IGNvbCArIGMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAociA9PSAwICYmIGMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChkYXJrID09IHFyQ29kZS5pc0Rhcmsocm93ICsgciwgY29sICsgYykpIHtcbiAgICAgICAgICAgICAgICBzYW1lQ291bnQrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2FtZUNvdW50ID4gNSkge1xuICAgICAgICAgICAgbG9zdFBvaW50ICs9IDMgKyBzYW1lQ291bnQgLSA1O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQgLSAxOyByb3crKykge1xuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDE7IGNvbCsrKSB7XG4gICAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCkpIGNvdW50Kys7XG4gICAgICAgICAgaWYgKHFyQ29kZS5pc0Rhcmsocm93ICsgMSwgY29sKSkgY291bnQrKztcbiAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDEpKSBjb3VudCsrO1xuICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdyArIDEsIGNvbCArIDEpKSBjb3VudCsrO1xuICAgICAgICAgIGlmIChjb3VudCA9PSAwIHx8IGNvdW50ID09IDQpIHtcbiAgICAgICAgICAgIGxvc3RQb2ludCArPSAzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdysrKSB7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50IC0gNjsgY29sKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdywgY29sKSAmJlxuICAgICAgICAgICAgIXFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyAxKSAmJlxuICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDIpICYmXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdywgY29sICsgMykgJiZcbiAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyA0KSAmJlxuICAgICAgICAgICAgIXFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyA1KSAmJlxuICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDYpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBsb3N0UG9pbnQgKz0gNDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQgLSA2OyByb3crKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93LCBjb2wpICYmXG4gICAgICAgICAgICAhcXJDb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wpICYmXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdyArIDIsIGNvbCkgJiZcbiAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93ICsgMywgY29sKSAmJlxuICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3cgKyA0LCBjb2wpICYmXG4gICAgICAgICAgICAhcXJDb2RlLmlzRGFyayhyb3cgKyA1LCBjb2wpICYmXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdyArIDYsIGNvbClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxvc3RQb2ludCArPSA0MDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBkYXJrQ291bnQgPSAwO1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdywgY29sKSkge1xuICAgICAgICAgICAgZGFya0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgcmF0aW8gPSBNYXRoLmFicygoMTAwICogZGFya0NvdW50KSAvIG1vZHVsZUNvdW50IC8gbW9kdWxlQ291bnQgLSA1MCkgLyA1O1xuICAgICAgbG9zdFBvaW50ICs9IHJhdGlvICogMTA7XG4gICAgICByZXR1cm4gbG9zdFBvaW50O1xuICAgIH1cbiAgfTtcbiAgdmFyIFFSTWF0aCA9IHtcbiAgICBnbG9nOiBmdW5jdGlvbiAobikge1xuICAgICAgaWYgKG4gPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2xvZygnICsgbiArICcpJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUVJNYXRoLkxPR19UQUJMRVtuXTtcbiAgICB9LFxuICAgIGdleHA6IGZ1bmN0aW9uIChuKSB7XG4gICAgICB3aGlsZSAobiA8IDApIHtcbiAgICAgICAgbiArPSAyNTU7XG4gICAgICB9XG4gICAgICB3aGlsZSAobiA+PSAyNTYpIHtcbiAgICAgICAgbiAtPSAyNTU7XG4gICAgICB9XG4gICAgICByZXR1cm4gUVJNYXRoLkVYUF9UQUJMRVtuXTtcbiAgICB9LFxuICAgIEVYUF9UQUJMRTogbmV3IEFycmF5KDI1NiksXG4gICAgTE9HX1RBQkxFOiBuZXcgQXJyYXkoMjU2KVxuICB9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIFFSTWF0aC5FWFBfVEFCTEVbaV0gPSAxIDw8IGk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDg7IGkgPCAyNTY7IGkrKykge1xuICAgIFFSTWF0aC5FWFBfVEFCTEVbaV0gPVxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNF0gXlxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNV0gXlxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNl0gXlxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gOF07XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTU7IGkrKykge1xuICAgIFFSTWF0aC5MT0dfVEFCTEVbUVJNYXRoLkVYUF9UQUJMRVtpXV0gPSBpO1xuICB9XG5cbiAgZnVuY3Rpb24gUVJQb2x5bm9taWFsKG51bSwgc2hpZnQpIHtcbiAgICBpZiAobnVtLmxlbmd0aCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihudW0ubGVuZ3RoICsgJy8nICsgc2hpZnQpO1xuICAgIH1cbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB3aGlsZSAob2Zmc2V0IDwgbnVtLmxlbmd0aCAmJiBudW1bb2Zmc2V0XSA9PSAwKSB7XG4gICAgICBvZmZzZXQrKztcbiAgICB9XG4gICAgdGhpcy5udW0gPSBuZXcgQXJyYXkobnVtLmxlbmd0aCAtIG9mZnNldCArIHNoaWZ0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bS5sZW5ndGggLSBvZmZzZXQ7IGkrKykge1xuICAgICAgdGhpcy5udW1baV0gPSBudW1baSArIG9mZnNldF07XG4gICAgfVxuICB9XG4gIFFSUG9seW5vbWlhbC5wcm90b3R5cGUgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHJldHVybiB0aGlzLm51bVtpbmRleF07XG4gICAgfSxcbiAgICBnZXRMZW5ndGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm51bS5sZW5ndGg7XG4gICAgfSxcbiAgICBtdWx0aXBseTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKSArIGUuZ2V0TGVuZ3RoKCkgLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZS5nZXRMZW5ndGgoKTsgaisrKSB7XG4gICAgICAgICAgbnVtW2kgKyBqXSBePSBRUk1hdGguZ2V4cChRUk1hdGguZ2xvZyh0aGlzLmdldChpKSkgKyBRUk1hdGguZ2xvZyhlLmdldChqKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFFSUG9seW5vbWlhbChudW0sIDApO1xuICAgIH0sXG4gICAgbW9kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKHRoaXMuZ2V0TGVuZ3RoKCkgLSBlLmdldExlbmd0aCgpIDwgMCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHZhciByYXRpbyA9IFFSTWF0aC5nbG9nKHRoaXMuZ2V0KDApKSAtIFFSTWF0aC5nbG9nKGUuZ2V0KDApKTtcbiAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgICBudW1baV0gPSB0aGlzLmdldChpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIG51bVtpXSBePSBRUk1hdGguZ2V4cChRUk1hdGguZ2xvZyhlLmdldChpKSkgKyByYXRpbyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFFSUG9seW5vbWlhbChudW0sIDApLm1vZChlKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gUVJSU0Jsb2NrKHRvdGFsQ291bnQsIGRhdGFDb3VudCkge1xuICAgIHRoaXMudG90YWxDb3VudCA9IHRvdGFsQ291bnQ7XG4gICAgdGhpcy5kYXRhQ291bnQgPSBkYXRhQ291bnQ7XG4gIH1cbiAgUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFID0gW1xuICAgIFsxLCAyNiwgMTldLFxuICAgIFsxLCAyNiwgMTZdLFxuICAgIFsxLCAyNiwgMTNdLFxuICAgIFsxLCAyNiwgOV0sXG4gICAgWzEsIDQ0LCAzNF0sXG4gICAgWzEsIDQ0LCAyOF0sXG4gICAgWzEsIDQ0LCAyMl0sXG4gICAgWzEsIDQ0LCAxNl0sXG4gICAgWzEsIDcwLCA1NV0sXG4gICAgWzEsIDcwLCA0NF0sXG4gICAgWzIsIDM1LCAxN10sXG4gICAgWzIsIDM1LCAxM10sXG4gICAgWzEsIDEwMCwgODBdLFxuICAgIFsyLCA1MCwgMzJdLFxuICAgIFsyLCA1MCwgMjRdLFxuICAgIFs0LCAyNSwgOV0sXG4gICAgWzEsIDEzNCwgMTA4XSxcbiAgICBbMiwgNjcsIDQzXSxcbiAgICBbMiwgMzMsIDE1LCAyLCAzNCwgMTZdLFxuICAgIFsyLCAzMywgMTEsIDIsIDM0LCAxMl0sXG4gICAgWzIsIDg2LCA2OF0sXG4gICAgWzQsIDQzLCAyN10sXG4gICAgWzQsIDQzLCAxOV0sXG4gICAgWzQsIDQzLCAxNV0sXG4gICAgWzIsIDk4LCA3OF0sXG4gICAgWzQsIDQ5LCAzMV0sXG4gICAgWzIsIDMyLCAxNCwgNCwgMzMsIDE1XSxcbiAgICBbNCwgMzksIDEzLCAxLCA0MCwgMTRdLFxuICAgIFsyLCAxMjEsIDk3XSxcbiAgICBbMiwgNjAsIDM4LCAyLCA2MSwgMzldLFxuICAgIFs0LCA0MCwgMTgsIDIsIDQxLCAxOV0sXG4gICAgWzQsIDQwLCAxNCwgMiwgNDEsIDE1XSxcbiAgICBbMiwgMTQ2LCAxMTZdLFxuICAgIFszLCA1OCwgMzYsIDIsIDU5LCAzN10sXG4gICAgWzQsIDM2LCAxNiwgNCwgMzcsIDE3XSxcbiAgICBbNCwgMzYsIDEyLCA0LCAzNywgMTNdLFxuICAgIFsyLCA4NiwgNjgsIDIsIDg3LCA2OV0sXG4gICAgWzQsIDY5LCA0MywgMSwgNzAsIDQ0XSxcbiAgICBbNiwgNDMsIDE5LCAyLCA0NCwgMjBdLFxuICAgIFs2LCA0MywgMTUsIDIsIDQ0LCAxNl0sXG4gICAgWzQsIDEwMSwgODFdLFxuICAgIFsxLCA4MCwgNTAsIDQsIDgxLCA1MV0sXG4gICAgWzQsIDUwLCAyMiwgNCwgNTEsIDIzXSxcbiAgICBbMywgMzYsIDEyLCA4LCAzNywgMTNdLFxuICAgIFsyLCAxMTYsIDkyLCAyLCAxMTcsIDkzXSxcbiAgICBbNiwgNTgsIDM2LCAyLCA1OSwgMzddLFxuICAgIFs0LCA0NiwgMjAsIDYsIDQ3LCAyMV0sXG4gICAgWzcsIDQyLCAxNCwgNCwgNDMsIDE1XSxcbiAgICBbNCwgMTMzLCAxMDddLFxuICAgIFs4LCA1OSwgMzcsIDEsIDYwLCAzOF0sXG4gICAgWzgsIDQ0LCAyMCwgNCwgNDUsIDIxXSxcbiAgICBbMTIsIDMzLCAxMSwgNCwgMzQsIDEyXSxcbiAgICBbMywgMTQ1LCAxMTUsIDEsIDE0NiwgMTE2XSxcbiAgICBbNCwgNjQsIDQwLCA1LCA2NSwgNDFdLFxuICAgIFsxMSwgMzYsIDE2LCA1LCAzNywgMTddLFxuICAgIFsxMSwgMzYsIDEyLCA1LCAzNywgMTNdLFxuICAgIFs1LCAxMDksIDg3LCAxLCAxMTAsIDg4XSxcbiAgICBbNSwgNjUsIDQxLCA1LCA2NiwgNDJdLFxuICAgIFs1LCA1NCwgMjQsIDcsIDU1LCAyNV0sXG4gICAgWzExLCAzNiwgMTIsIDcsIDM3LCAxM10sXG4gICAgWzUsIDEyMiwgOTgsIDEsIDEyMywgOTldLFxuICAgIFs3LCA3MywgNDUsIDMsIDc0LCA0Nl0sXG4gICAgWzE1LCA0MywgMTksIDIsIDQ0LCAyMF0sXG4gICAgWzMsIDQ1LCAxNSwgMTMsIDQ2LCAxNl0sXG4gICAgWzEsIDEzNSwgMTA3LCA1LCAxMzYsIDEwOF0sXG4gICAgWzEwLCA3NCwgNDYsIDEsIDc1LCA0N10sXG4gICAgWzEsIDUwLCAyMiwgMTUsIDUxLCAyM10sXG4gICAgWzIsIDQyLCAxNCwgMTcsIDQzLCAxNV0sXG4gICAgWzUsIDE1MCwgMTIwLCAxLCAxNTEsIDEyMV0sXG4gICAgWzksIDY5LCA0MywgNCwgNzAsIDQ0XSxcbiAgICBbMTcsIDUwLCAyMiwgMSwgNTEsIDIzXSxcbiAgICBbMiwgNDIsIDE0LCAxOSwgNDMsIDE1XSxcbiAgICBbMywgMTQxLCAxMTMsIDQsIDE0MiwgMTE0XSxcbiAgICBbMywgNzAsIDQ0LCAxMSwgNzEsIDQ1XSxcbiAgICBbMTcsIDQ3LCAyMSwgNCwgNDgsIDIyXSxcbiAgICBbOSwgMzksIDEzLCAxNiwgNDAsIDE0XSxcbiAgICBbMywgMTM1LCAxMDcsIDUsIDEzNiwgMTA4XSxcbiAgICBbMywgNjcsIDQxLCAxMywgNjgsIDQyXSxcbiAgICBbMTUsIDU0LCAyNCwgNSwgNTUsIDI1XSxcbiAgICBbMTUsIDQzLCAxNSwgMTAsIDQ0LCAxNl0sXG4gICAgWzQsIDE0NCwgMTE2LCA0LCAxNDUsIDExN10sXG4gICAgWzE3LCA2OCwgNDJdLFxuICAgIFsxNywgNTAsIDIyLCA2LCA1MSwgMjNdLFxuICAgIFsxOSwgNDYsIDE2LCA2LCA0NywgMTddLFxuICAgIFsyLCAxMzksIDExMSwgNywgMTQwLCAxMTJdLFxuICAgIFsxNywgNzQsIDQ2XSxcbiAgICBbNywgNTQsIDI0LCAxNiwgNTUsIDI1XSxcbiAgICBbMzQsIDM3LCAxM10sXG4gICAgWzQsIDE1MSwgMTIxLCA1LCAxNTIsIDEyMl0sXG4gICAgWzQsIDc1LCA0NywgMTQsIDc2LCA0OF0sXG4gICAgWzExLCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgIFsxNiwgNDUsIDE1LCAxNCwgNDYsIDE2XSxcbiAgICBbNiwgMTQ3LCAxMTcsIDQsIDE0OCwgMTE4XSxcbiAgICBbNiwgNzMsIDQ1LCAxNCwgNzQsIDQ2XSxcbiAgICBbMTEsIDU0LCAyNCwgMTYsIDU1LCAyNV0sXG4gICAgWzMwLCA0NiwgMTYsIDIsIDQ3LCAxN10sXG4gICAgWzgsIDEzMiwgMTA2LCA0LCAxMzMsIDEwN10sXG4gICAgWzgsIDc1LCA0NywgMTMsIDc2LCA0OF0sXG4gICAgWzcsIDU0LCAyNCwgMjIsIDU1LCAyNV0sXG4gICAgWzIyLCA0NSwgMTUsIDEzLCA0NiwgMTZdLFxuICAgIFsxMCwgMTQyLCAxMTQsIDIsIDE0MywgMTE1XSxcbiAgICBbMTksIDc0LCA0NiwgNCwgNzUsIDQ3XSxcbiAgICBbMjgsIDUwLCAyMiwgNiwgNTEsIDIzXSxcbiAgICBbMzMsIDQ2LCAxNiwgNCwgNDcsIDE3XSxcbiAgICBbOCwgMTUyLCAxMjIsIDQsIDE1MywgMTIzXSxcbiAgICBbMjIsIDczLCA0NSwgMywgNzQsIDQ2XSxcbiAgICBbOCwgNTMsIDIzLCAyNiwgNTQsIDI0XSxcbiAgICBbMTIsIDQ1LCAxNSwgMjgsIDQ2LCAxNl0sXG4gICAgWzMsIDE0NywgMTE3LCAxMCwgMTQ4LCAxMThdLFxuICAgIFszLCA3MywgNDUsIDIzLCA3NCwgNDZdLFxuICAgIFs0LCA1NCwgMjQsIDMxLCA1NSwgMjVdLFxuICAgIFsxMSwgNDUsIDE1LCAzMSwgNDYsIDE2XSxcbiAgICBbNywgMTQ2LCAxMTYsIDcsIDE0NywgMTE3XSxcbiAgICBbMjEsIDczLCA0NSwgNywgNzQsIDQ2XSxcbiAgICBbMSwgNTMsIDIzLCAzNywgNTQsIDI0XSxcbiAgICBbMTksIDQ1LCAxNSwgMjYsIDQ2LCAxNl0sXG4gICAgWzUsIDE0NSwgMTE1LCAxMCwgMTQ2LCAxMTZdLFxuICAgIFsxOSwgNzUsIDQ3LCAxMCwgNzYsIDQ4XSxcbiAgICBbMTUsIDU0LCAyNCwgMjUsIDU1LCAyNV0sXG4gICAgWzIzLCA0NSwgMTUsIDI1LCA0NiwgMTZdLFxuICAgIFsxMywgMTQ1LCAxMTUsIDMsIDE0NiwgMTE2XSxcbiAgICBbMiwgNzQsIDQ2LCAyOSwgNzUsIDQ3XSxcbiAgICBbNDIsIDU0LCAyNCwgMSwgNTUsIDI1XSxcbiAgICBbMjMsIDQ1LCAxNSwgMjgsIDQ2LCAxNl0sXG4gICAgWzE3LCAxNDUsIDExNV0sXG4gICAgWzEwLCA3NCwgNDYsIDIzLCA3NSwgNDddLFxuICAgIFsxMCwgNTQsIDI0LCAzNSwgNTUsIDI1XSxcbiAgICBbMTksIDQ1LCAxNSwgMzUsIDQ2LCAxNl0sXG4gICAgWzE3LCAxNDUsIDExNSwgMSwgMTQ2LCAxMTZdLFxuICAgIFsxNCwgNzQsIDQ2LCAyMSwgNzUsIDQ3XSxcbiAgICBbMjksIDU0LCAyNCwgMTksIDU1LCAyNV0sXG4gICAgWzExLCA0NSwgMTUsIDQ2LCA0NiwgMTZdLFxuICAgIFsxMywgMTQ1LCAxMTUsIDYsIDE0NiwgMTE2XSxcbiAgICBbMTQsIDc0LCA0NiwgMjMsIDc1LCA0N10sXG4gICAgWzQ0LCA1NCwgMjQsIDcsIDU1LCAyNV0sXG4gICAgWzU5LCA0NiwgMTYsIDEsIDQ3LCAxN10sXG4gICAgWzEyLCAxNTEsIDEyMSwgNywgMTUyLCAxMjJdLFxuICAgIFsxMiwgNzUsIDQ3LCAyNiwgNzYsIDQ4XSxcbiAgICBbMzksIDU0LCAyNCwgMTQsIDU1LCAyNV0sXG4gICAgWzIyLCA0NSwgMTUsIDQxLCA0NiwgMTZdLFxuICAgIFs2LCAxNTEsIDEyMSwgMTQsIDE1MiwgMTIyXSxcbiAgICBbNiwgNzUsIDQ3LCAzNCwgNzYsIDQ4XSxcbiAgICBbNDYsIDU0LCAyNCwgMTAsIDU1LCAyNV0sXG4gICAgWzIsIDQ1LCAxNSwgNjQsIDQ2LCAxNl0sXG4gICAgWzE3LCAxNTIsIDEyMiwgNCwgMTUzLCAxMjNdLFxuICAgIFsyOSwgNzQsIDQ2LCAxNCwgNzUsIDQ3XSxcbiAgICBbNDksIDU0LCAyNCwgMTAsIDU1LCAyNV0sXG4gICAgWzI0LCA0NSwgMTUsIDQ2LCA0NiwgMTZdLFxuICAgIFs0LCAxNTIsIDEyMiwgMTgsIDE1MywgMTIzXSxcbiAgICBbMTMsIDc0LCA0NiwgMzIsIDc1LCA0N10sXG4gICAgWzQ4LCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgIFs0MiwgNDUsIDE1LCAzMiwgNDYsIDE2XSxcbiAgICBbMjAsIDE0NywgMTE3LCA0LCAxNDgsIDExOF0sXG4gICAgWzQwLCA3NSwgNDcsIDcsIDc2LCA0OF0sXG4gICAgWzQzLCA1NCwgMjQsIDIyLCA1NSwgMjVdLFxuICAgIFsxMCwgNDUsIDE1LCA2NywgNDYsIDE2XSxcbiAgICBbMTksIDE0OCwgMTE4LCA2LCAxNDksIDExOV0sXG4gICAgWzE4LCA3NSwgNDcsIDMxLCA3NiwgNDhdLFxuICAgIFszNCwgNTQsIDI0LCAzNCwgNTUsIDI1XSxcbiAgICBbMjAsIDQ1LCAxNSwgNjEsIDQ2LCAxNl1cbiAgXTtcbiAgUVJSU0Jsb2NrLmdldFJTQmxvY2tzID0gZnVuY3Rpb24gKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgdmFyIHJzQmxvY2sgPSBRUlJTQmxvY2suZ2V0UnNCbG9ja1RhYmxlKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKTtcbiAgICBpZiAocnNCbG9jayA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2JhZCBycyBibG9jayBAIHR5cGVOdW1iZXI6JyArIHR5cGVOdW1iZXIgKyAnL2Vycm9yQ29ycmVjdExldmVsOicgKyBlcnJvckNvcnJlY3RMZXZlbFxuICAgICAgKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHJzQmxvY2subGVuZ3RoIC8gMztcbiAgICB2YXIgbGlzdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAwXTtcbiAgICAgIHZhciB0b3RhbENvdW50ID0gcnNCbG9ja1tpICogMyArIDFdO1xuICAgICAgdmFyIGRhdGFDb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAyXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICBsaXN0LnB1c2gobmV3IFFSUlNCbG9jayh0b3RhbENvdW50LCBkYXRhQ291bnQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH07XG4gIFFSUlNCbG9jay5nZXRSc0Jsb2NrVGFibGUgPSBmdW5jdGlvbiAodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0TGV2ZWwpIHtcbiAgICBzd2l0Y2ggKGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuTDpcbiAgICAgICAgcmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDBdO1xuICAgICAgY2FzZSBRUkVycm9yQ29ycmVjdExldmVsLk06XG4gICAgICAgIHJldHVybiBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXIgLSAxKSAqIDQgKyAxXTtcbiAgICAgIGNhc2UgUVJFcnJvckNvcnJlY3RMZXZlbC5ROlxuICAgICAgICByZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMl07XG4gICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSDpcbiAgICAgICAgcmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDNdO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gUVJCaXRCdWZmZXIoKSB7XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH1cbiAgUVJCaXRCdWZmZXIucHJvdG90eXBlID0ge1xuICAgIGdldDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICB2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gOCk7XG4gICAgICByZXR1cm4gKCh0aGlzLmJ1ZmZlcltidWZJbmRleF0gPj4+ICg3IC0gKGluZGV4ICUgOCkpKSAmIDEpID09IDE7XG4gICAgfSxcbiAgICBwdXQ6IGZ1bmN0aW9uIChudW0sIGxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnB1dEJpdCgoKG51bSA+Pj4gKGxlbmd0aCAtIGkgLSAxKSkgJiAxKSA9PSAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldExlbmd0aEluQml0czogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICAgIH0sXG4gICAgcHV0Qml0OiBmdW5jdGlvbiAoYml0KSB7XG4gICAgICB2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKHRoaXMubGVuZ3RoIC8gOCk7XG4gICAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDw9IGJ1ZkluZGV4KSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goMCk7XG4gICAgICB9XG4gICAgICBpZiAoYml0KSB7XG4gICAgICAgIHRoaXMuYnVmZmVyW2J1ZkluZGV4XSB8PSAweDgwID4+PiB0aGlzLmxlbmd0aCAlIDg7XG4gICAgICB9XG4gICAgICB0aGlzLmxlbmd0aCsrO1xuICAgIH1cbiAgfTtcbiAgdmFyIFFSQ29kZUxpbWl0TGVuZ3RoID0gW1xuICAgIFsxNywgMTQsIDExLCA3XSxcbiAgICBbMzIsIDI2LCAyMCwgMTRdLFxuICAgIFs1MywgNDIsIDMyLCAyNF0sXG4gICAgWzc4LCA2MiwgNDYsIDM0XSxcbiAgICBbMTA2LCA4NCwgNjAsIDQ0XSxcbiAgICBbMTM0LCAxMDYsIDc0LCA1OF0sXG4gICAgWzE1NCwgMTIyLCA4NiwgNjRdLFxuICAgIFsxOTIsIDE1MiwgMTA4LCA4NF0sXG4gICAgWzIzMCwgMTgwLCAxMzAsIDk4XSxcbiAgICBbMjcxLCAyMTMsIDE1MSwgMTE5XSxcbiAgICBbMzIxLCAyNTEsIDE3NywgMTM3XSxcbiAgICBbMzY3LCAyODcsIDIwMywgMTU1XSxcbiAgICBbNDI1LCAzMzEsIDI0MSwgMTc3XSxcbiAgICBbNDU4LCAzNjIsIDI1OCwgMTk0XSxcbiAgICBbNTIwLCA0MTIsIDI5MiwgMjIwXSxcbiAgICBbNTg2LCA0NTAsIDMyMiwgMjUwXSxcbiAgICBbNjQ0LCA1MDQsIDM2NCwgMjgwXSxcbiAgICBbNzE4LCA1NjAsIDM5NCwgMzEwXSxcbiAgICBbNzkyLCA2MjQsIDQ0MiwgMzM4XSxcbiAgICBbODU4LCA2NjYsIDQ4MiwgMzgyXSxcbiAgICBbOTI5LCA3MTEsIDUwOSwgNDAzXSxcbiAgICBbMTAwMywgNzc5LCA1NjUsIDQzOV0sXG4gICAgWzEwOTEsIDg1NywgNjExLCA0NjFdLFxuICAgIFsxMTcxLCA5MTEsIDY2MSwgNTExXSxcbiAgICBbMTI3MywgOTk3LCA3MTUsIDUzNV0sXG4gICAgWzEzNjcsIDEwNTksIDc1MSwgNTkzXSxcbiAgICBbMTQ2NSwgMTEyNSwgODA1LCA2MjVdLFxuICAgIFsxNTI4LCAxMTkwLCA4NjgsIDY1OF0sXG4gICAgWzE2MjgsIDEyNjQsIDkwOCwgNjk4XSxcbiAgICBbMTczMiwgMTM3MCwgOTgyLCA3NDJdLFxuICAgIFsxODQwLCAxNDUyLCAxMDMwLCA3OTBdLFxuICAgIFsxOTUyLCAxNTM4LCAxMTEyLCA4NDJdLFxuICAgIFsyMDY4LCAxNjI4LCAxMTY4LCA4OThdLFxuICAgIFsyMTg4LCAxNzIyLCAxMjI4LCA5NThdLFxuICAgIFsyMzAzLCAxODA5LCAxMjgzLCA5ODNdLFxuICAgIFsyNDMxLCAxOTExLCAxMzUxLCAxMDUxXSxcbiAgICBbMjU2MywgMTk4OSwgMTQyMywgMTA5M10sXG4gICAgWzI2OTksIDIwOTksIDE0OTksIDExMzldLFxuICAgIFsyODA5LCAyMjEzLCAxNTc5LCAxMjE5XSxcbiAgICBbMjk1MywgMjMzMSwgMTY2MywgMTI3M11cbiAgXTtcblxuICBmdW5jdGlvbiBfaXNTdXBwb3J0Q2FudmFzKCkge1xuICAgIHJldHVybiB0eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICE9ICd1bmRlZmluZWQnO1xuICB9XG5cbiAgLy8gYW5kcm9pZCAyLnggZG9lc24ndCBzdXBwb3J0IERhdGEtVVJJIHNwZWNcbiAgZnVuY3Rpb24gX2dldEFuZHJvaWQoKSB7XG4gICAgdmFyIGFuZHJvaWQgPSBmYWxzZTtcbiAgICB2YXIgc0FnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgIGlmICgvYW5kcm9pZC9pLnRlc3Qoc0FnZW50KSkge1xuICAgICAgLy8gYW5kcm9pZFxuICAgICAgYW5kcm9pZCA9IHRydWU7XG4gICAgICB2YXIgYU1hdCA9IHNBZ2VudC50b1N0cmluZygpLm1hdGNoKC9hbmRyb2lkIChbMC05XVxcLlswLTldKS9pKTtcblxuICAgICAgaWYgKGFNYXQgJiYgYU1hdFsxXSkge1xuICAgICAgICBhbmRyb2lkID0gcGFyc2VGbG9hdChhTWF0WzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5kcm9pZDtcbiAgfVxuXG4gIC8vIERyYXdpbmcgaW4gRE9NIGJ5IHVzaW5nIFRhYmxlIHRhZ1xuICB2YXIgRHJhd2luZyA9ICFfaXNTdXBwb3J0Q2FudmFzKClcbiAgICA/IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBEcmF3aW5nID0gZnVuY3Rpb24gKGVsLCBodE9wdGlvbikge1xuICAgICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgICAgICAgdGhpcy5faHRPcHRpb24gPSBodE9wdGlvbjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRHJhdyB0aGUgUVJDb2RlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7UVJDb2RlfSBvUVJDb2RlXG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKG9RUkNvZGUpIHtcbiAgICAgICAgICB2YXIgX2h0T3B0aW9uID0gdGhpcy5faHRPcHRpb247XG4gICAgICAgICAgdmFyIF9lbCA9IHRoaXMuX2VsO1xuICAgICAgICAgIHZhciBuQ291bnQgPSBvUVJDb2RlLmdldE1vZHVsZUNvdW50KCk7XG4gICAgICAgICAgdmFyIG5XaWR0aCA9IE1hdGgucm91bmQoX2h0T3B0aW9uLndpZHRoIC8gbkNvdW50KTtcbiAgICAgICAgICB2YXIgbkhlaWdodCA9IE1hdGgucm91bmQoKF9odE9wdGlvbi5oZWlnaHQgLSBfaHRPcHRpb24udGl0bGVIZWlnaHQpIC8gbkNvdW50KTtcbiAgICAgICAgICBpZiAobldpZHRoIDw9IDEpIHtcbiAgICAgICAgICAgIG5XaWR0aCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuSGVpZ2h0IDw9IDEpIHtcbiAgICAgICAgICAgIG5IZWlnaHQgPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLndpZHRoID0gbldpZHRoICogbkNvdW50O1xuICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLmhlaWdodCA9IG5IZWlnaHQgKiBuQ291bnQgKyBfaHRPcHRpb24udGl0bGVIZWlnaHQ7XG5cbiAgICAgICAgICB0aGlzLl9odE9wdGlvbi5xdWlldFpvbmUgPSBNYXRoLnJvdW5kKHRoaXMuX2h0T3B0aW9uLnF1aWV0Wm9uZSk7XG5cbiAgICAgICAgICB2YXIgYUhUTUwgPSBbXTtcblxuICAgICAgICAgIHZhciBkaXZTdHlsZSA9ICcnO1xuXG4gICAgICAgICAgdmFyIGRyYXdXaWR0aCA9IE1hdGgucm91bmQobldpZHRoICogX2h0T3B0aW9uLmRvdFNjYWxlKTtcbiAgICAgICAgICB2YXIgZHJhd0hlaWdodCA9IE1hdGgucm91bmQobkhlaWdodCAqIF9odE9wdGlvbi5kb3RTY2FsZSk7XG4gICAgICAgICAgaWYgKGRyYXdXaWR0aCA8IDQpIHtcbiAgICAgICAgICAgIGRyYXdXaWR0aCA9IDQ7XG4gICAgICAgICAgICBkcmF3SGVpZ2h0ID0gNDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbm9uUmVxdWlyZWRDb2xvckRhcmsgPSBfaHRPcHRpb24uY29sb3JEYXJrO1xuICAgICAgICAgIHZhciBub25SZXF1aXJlZGNvbG9yTGlnaHQgPSBfaHRPcHRpb24uY29sb3JMaWdodDtcbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5hdXRvQ29sb3IpIHtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLmNvbG9yRGFyayA9XG4gICAgICAgICAgICAgICAgXCJyZ2JhKDAsIDAsIDAsIC42KTtmaWx0ZXI6cHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkdyYWRpZW50KEdyYWRpZW50VHlwZT0wLCBTdGFydENvbG9yU3RyPScjOTkwMDAwMDAnLCBFbmRDb2xvclN0cj0nIzk5MDAwMDAwJyk7XCI7XG4gICAgICAgICAgICAgIF9odE9wdGlvbi5jb2xvckxpZ2h0ID1cbiAgICAgICAgICAgICAgICBcInJnYmEoMjU1LCAyNTUsIDI1NSwgLjcpO2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuR3JhZGllbnQoR3JhZGllbnRUeXBlPTAsIFN0YXJ0Q29sb3JTdHI9JyNCMkZGRkZGRicsIEVuZENvbG9yU3RyPScjQjJGRkZGRkYnKTtcIjtcblxuICAgICAgICAgICAgICAvLyBfaHRPcHRpb24uY29sb3JEYXJrPVwicmdiYSgwLCAwLCAwLCAuNilcIjtcbiAgICAgICAgICAgICAgLy8gX2h0T3B0aW9uLmNvbG9yTGlnaHQ9J3JnYmEoMjU1LCAyNTUsIDI1NSwgLjcpJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9odE9wdGlvbi5jb2xvckxpZ2h0ID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZEltYWdlRWxlID1cbiAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgei1pbmRleDotMTA7cG9zaXRpb246YWJzb2x1dGU7XCI+PGltZyBzcmM9XCInICtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZSArXG4gICAgICAgICAgICAgICdcIiB3aWRodD1cIicgK1xuICAgICAgICAgICAgICAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIpICtcbiAgICAgICAgICAgICAgJ1wiIGhlaWdodD1cIicgK1xuICAgICAgICAgICAgICAoX2h0T3B0aW9uLmhlaWdodCArIF9odE9wdGlvbi5xdWlldFpvbmUgKiAyKSArXG4gICAgICAgICAgICAgICdcIiBzdHlsZT1cIm9wYWNpdHk6JyArXG4gICAgICAgICAgICAgIF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSArXG4gICAgICAgICAgICAgICc7ZmlsdGVyOmFscGhhKG9wYWNpdHk9JyArXG4gICAgICAgICAgICAgIF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSAqIDEwMCArXG4gICAgICAgICAgICAgICcpOyBcIi8+PC9kaXY+JztcbiAgICAgICAgICAgIGFIVE1MLnB1c2goYmFja2dyb3VuZEltYWdlRWxlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLnF1aWV0Wm9uZSkge1xuICAgICAgICAgICAgZGl2U3R5bGUgPVxuICAgICAgICAgICAgICAnZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOicgK1xuICAgICAgICAgICAgICAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIpICtcbiAgICAgICAgICAgICAgJ3B4OyBoZWlnaHQ6JyArXG4gICAgICAgICAgICAgIChfaHRPcHRpb24ud2lkdGggKyBfaHRPcHRpb24ucXVpZXRab25lICogMikgK1xuICAgICAgICAgICAgICAncHg7YmFja2dyb3VuZDonICtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZUNvbG9yICtcbiAgICAgICAgICAgICAgJzsgdGV4dC1hbGlnbjpjZW50ZXI7JztcbiAgICAgICAgICB9XG4gICAgICAgICAgYUhUTUwucHVzaCgnPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTowOycgKyBkaXZTdHlsZSArICdcIj4nKTtcblxuICAgICAgICAgIGFIVE1MLnB1c2goXG4gICAgICAgICAgICAnPHRhYmxlICBzdHlsZT1cImZvbnQtc2l6ZTowO2JvcmRlcjowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTsgbWFyZ2luLXRvcDonICtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZSArXG4gICAgICAgICAgICAgICdweDtcIiBib3JkZXI9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2VsbHNwYWRkaW5nPVwiMFwiIGFsaWduPVwiY2VudGVyXCIgdmFsaWduPVwibWlkZGxlXCI+J1xuICAgICAgICAgICk7XG4gICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICc8dHIgaGVpZ2h0PVwiJyArXG4gICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCArXG4gICAgICAgICAgICAgICdcIiBhbGlnbj1cImNlbnRlclwiPjx0ZCBzdHlsZT1cImJvcmRlcjowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTttYXJnaW46MDtwYWRkaW5nOjBcIiBjb2xzcGFuPVwiJyArXG4gICAgICAgICAgICAgIG5Db3VudCArXG4gICAgICAgICAgICAgICdcIj4nXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLnRpdGxlKSB7XG4gICAgICAgICAgICB2YXIgYyA9IF9odE9wdGlvbi50aXRsZUNvbG9yO1xuICAgICAgICAgICAgdmFyIGYgPSBfaHRPcHRpb24udGl0bGVGb250O1xuICAgICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO21hcmdpbi10b3A6JyArXG4gICAgICAgICAgICAgICAgX2h0T3B0aW9uLnRpdGxlVG9wICtcbiAgICAgICAgICAgICAgICAncHg7Y29sb3I6JyArXG4gICAgICAgICAgICAgICAgYyArXG4gICAgICAgICAgICAgICAgJztmb250OicgK1xuICAgICAgICAgICAgICAgIGYgK1xuICAgICAgICAgICAgICAgICc7YmFja2dyb3VuZDonICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVCYWNrZ3JvdW5kQ29sb3IgK1xuICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGUgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLnN1YlRpdGxlKSB7XG4gICAgICAgICAgICBhSFRNTC5wdXNoKFxuICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7bWFyZ2luLXRvcDonICtcbiAgICAgICAgICAgICAgICAoX2h0T3B0aW9uLnN1YlRpdGxlVG9wIC0gX2h0T3B0aW9uLnRpdGxlVG9wKSArXG4gICAgICAgICAgICAgICAgJ3B4O2NvbG9yOicgK1xuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5zdWJUaXRsZUNvbG9yICtcbiAgICAgICAgICAgICAgICAnOyBmb250OicgK1xuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5zdWJUaXRsZUZvbnQgK1xuICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24uc3ViVGl0bGUgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhSFRNTC5wdXNoKCc8L3RkPjwvdHI+Jyk7XG4gICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbkNvdW50OyByb3crKykge1xuICAgICAgICAgICAgYUhUTUwucHVzaCgnPHRyIHN0eWxlPVwiYm9yZGVyOjA7IHBhZGRpbmc6MDsgbWFyZ2luOjA7XCIgaGVpZ2h0PVwiN1wiPicpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBuQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgICAgIHZhciBiSXNEYXJrID0gb1FSQ29kZS5pc0Rhcmsocm93LCBjb2wpO1xuXG4gICAgICAgICAgICAgIHZhciBleWUgPSBvUVJDb2RlLmdldEV5ZShyb3csIGNvbCk7IC8vIHsgaXNEYXJrOiB0cnVlL2ZhbHNlLCB0eXBlOiBQT19UTCwgUElfVEwsIFBPX1RSLCBQSV9UUiwgUE9fQkwsIFBJX0JMIH07XG5cbiAgICAgICAgICAgICAgaWYgKGV5ZSkge1xuICAgICAgICAgICAgICAgIC8vIElzIGV5ZVxuICAgICAgICAgICAgICAgIGJJc0RhcmsgPSBleWUuaXNEYXJrO1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gZXllLnR5cGU7XG5cbiAgICAgICAgICAgICAgICAvLyBQWF9YWCwgUFgsIGNvbG9yRGFyaywgY29sb3JMaWdodFxuICAgICAgICAgICAgICAgIHZhciBleWVDb2xvckRhcmsgPVxuICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uW3R5cGVdIHx8IF9odE9wdGlvblt0eXBlLnN1YnN0cmluZygwLCAyKV0gfHwgbm9uUmVxdWlyZWRDb2xvckRhcms7XG4gICAgICAgICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJib3JkZXI6MDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7cGFkZGluZzowO21hcmdpbjowO3dpZHRoOicgK1xuICAgICAgICAgICAgICAgICAgICBuV2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAncHg7aGVpZ2h0OicgK1xuICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICtcbiAgICAgICAgICAgICAgICAgICAgJ3B4O1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJ3aWR0aDonICtcbiAgICAgICAgICAgICAgICAgICAgbldpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgJ3B4O2hlaWdodDonICtcbiAgICAgICAgICAgICAgICAgICAgbkhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgICdweDtiYWNrZ3JvdW5kLWNvbG9yOicgK1xuICAgICAgICAgICAgICAgICAgICAoYklzRGFyayA/IGV5ZUNvbG9yRGFyayA6IG5vblJlcXVpcmVkY29sb3JMaWdodCkgK1xuICAgICAgICAgICAgICAgICAgICAnO2Rpc3BsYXk6aW5saW5lLWJsb2NrXCI+PC9zcGFuPjwvdGQ+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGltaW5nIFBhdHRlcm5cbiAgICAgICAgICAgICAgICB2YXIgbm93RGFya0NvbG9yID0gX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICBpZiAocm93ID09IDYpIHtcbiAgICAgICAgICAgICAgICAgIG5vd0RhcmtDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfSCB8fCBfaHRPcHRpb24udGltaW5nIHx8IG5vblJlcXVpcmVkQ29sb3JEYXJrO1xuICAgICAgICAgICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cImJvcmRlcjowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtwYWRkaW5nOjA7bWFyZ2luOjA7d2lkdGg6JyArXG4gICAgICAgICAgICAgICAgICAgICAgbldpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAncHg7aGVpZ2h0OicgK1xuICAgICAgICAgICAgICAgICAgICAgIG5IZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgICAgICdweDtiYWNrZ3JvdW5kLWNvbG9yOicgK1xuICAgICAgICAgICAgICAgICAgICAgIChiSXNEYXJrID8gbm93RGFya0NvbG9yIDogbm9uUmVxdWlyZWRjb2xvckxpZ2h0KSArXG4gICAgICAgICAgICAgICAgICAgICAgJztcIj48L3RkPidcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2wgPT0gNikge1xuICAgICAgICAgICAgICAgICAgbm93RGFya0NvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19WIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgbm9uUmVxdWlyZWRDb2xvckRhcms7XG5cbiAgICAgICAgICAgICAgICAgIGFIVE1MLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJib3JkZXI6MDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7cGFkZGluZzowO21hcmdpbjowO3dpZHRoOicgK1xuICAgICAgICAgICAgICAgICAgICAgIG5XaWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgJ3B4O2hlaWdodDonICtcbiAgICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICtcbiAgICAgICAgICAgICAgICAgICAgICAncHg7YmFja2dyb3VuZC1jb2xvcjonICtcbiAgICAgICAgICAgICAgICAgICAgICAoYklzRGFyayA/IG5vd0RhcmtDb2xvciA6IG5vblJlcXVpcmVkY29sb3JMaWdodCkgK1xuICAgICAgICAgICAgICAgICAgICAgICc7XCI+PC90ZD4nXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhSFRNTC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwiYm9yZGVyOjA7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO3BhZGRpbmc6MDttYXJnaW46MDt3aWR0aDonICtcbiAgICAgICAgICAgICAgICAgICAgICBuV2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAgICdweDtoZWlnaHQ6JyArXG4gICAgICAgICAgICAgICAgICAgICAgbkhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgICAgJ3B4O1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6JyArXG4gICAgICAgICAgICAgICAgICAgICAgZHJhd1dpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAncHg7aGVpZ2h0OicgK1xuICAgICAgICAgICAgICAgICAgICAgIGRyYXdIZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgICAgICdweDtiYWNrZ3JvdW5kLWNvbG9yOicgK1xuICAgICAgICAgICAgICAgICAgICAgIChiSXNEYXJrID8gbm93RGFya0NvbG9yIDogX2h0T3B0aW9uLmNvbG9yTGlnaHQpICtcbiAgICAgICAgICAgICAgICAgICAgICAnO1wiPjwvZGl2PjwvdGQ+J1xuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYUhUTUwucHVzaCgnPC90cj4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhSFRNTC5wdXNoKCc8L3RhYmxlPicpO1xuICAgICAgICAgIGFIVE1MLnB1c2goJzwvZGl2PicpO1xuXG4gICAgICAgICAgaWYgKF9odE9wdGlvbi5sb2dvKSB7XG4gICAgICAgICAgICAvLyBMb2dvIEltYWdlXG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24uY3Jvc3NPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSBfaHRPcHRpb24uY3Jvc3NPcmlnaW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGltZy5jcm9zc09yaWdpbj1cIkFub255bW91c1wiO1xuICAgICAgICAgICAgaW1nLnNyYyA9IF9odE9wdGlvbi5sb2dvO1xuXG4gICAgICAgICAgICB2YXIgaW1nVyA9IF9odE9wdGlvbi53aWR0aCAvIDMuNTtcbiAgICAgICAgICAgIHZhciBpbWdIID0gX2h0T3B0aW9uLmhlaWdodCAvIDMuNTtcbiAgICAgICAgICAgIGlmIChpbWdXICE9IGltZ0gpIHtcbiAgICAgICAgICAgICAgaW1nVyA9IGltZ0g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nb1dpZHRoKSB7XG4gICAgICAgICAgICAgIGltZ1cgPSBfaHRPcHRpb24ubG9nb1dpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5sb2dvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgIGltZ0ggPSBfaHRPcHRpb24ubG9nb0hlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGltZ0RpdlN0eWxlID1cbiAgICAgICAgICAgICAgJ3Bvc2l0aW9uOnJlbGF0aXZlOyB6LWluZGV4OjE7ZGlzcGxheTp0YWJsZS1jZWxsO3RvcDotJyArXG4gICAgICAgICAgICAgICgoX2h0T3B0aW9uLmhlaWdodCAtIF9odE9wdGlvbi50aXRsZUhlaWdodCkgLyAyICsgaW1nSCAvIDIgKyBfaHRPcHRpb24ucXVpZXRab25lKSArXG4gICAgICAgICAgICAgICdweDt0ZXh0LWFsaWduOmNlbnRlcjsgd2lkdGg6JyArXG4gICAgICAgICAgICAgIGltZ1cgK1xuICAgICAgICAgICAgICAncHg7IGhlaWdodDonICtcbiAgICAgICAgICAgICAgaW1nSCArXG4gICAgICAgICAgICAgICdweDtsaW5lLWhlaWdodDonICtcbiAgICAgICAgICAgICAgaW1nVyArXG4gICAgICAgICAgICAgICdweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsnO1xuICAgICAgICAgICAgaWYgKCFfaHRPcHRpb24ubG9nb0JhY2tncm91bmRUcmFuc3BhcmVudCkge1xuICAgICAgICAgICAgICBpbWdEaXZTdHlsZSArPSAnYmFja2dyb3VuZDonICsgX2h0T3B0aW9uLmxvZ29CYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFIVE1MLnB1c2goXG4gICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiJyArXG4gICAgICAgICAgICAgICAgaW1nRGl2U3R5bGUgK1xuICAgICAgICAgICAgICAgICdcIj48aW1nICBzcmM9XCInICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ubG9nbyArXG4gICAgICAgICAgICAgICAgJ1wiICBzdHlsZT1cIm1heC13aWR0aDogJyArXG4gICAgICAgICAgICAgICAgaW1nVyArXG4gICAgICAgICAgICAgICAgJ3B4OyBtYXgtaGVpZ2h0OiAnICtcbiAgICAgICAgICAgICAgICBpbWdIICtcbiAgICAgICAgICAgICAgICAncHg7XCIgLz4gPGRpdiBzdHlsZT1cIiBkaXNwbGF5OiBub25lOyB3aWR0aDoxcHg7bWFyZ2luLWxlZnQ6IC0xcHg7XCI+PC9kaXY+PC9kaXY+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLm9uUmVuZGVyaW5nU3RhcnQpIHtcbiAgICAgICAgICAgIF9odE9wdGlvbi5vblJlbmRlcmluZ1N0YXJ0KF9odE9wdGlvbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX2VsLmlubmVySFRNTCA9IGFIVE1MLmpvaW4oJycpO1xuICAgICAgICAgIC8vIEZpeCB0aGUgbWFyZ2luIHZhbHVlcyBhcyByZWFsIHNpemUuXG4gICAgICAgICAgdmFyIGVsVGFibGUgPSBfZWwuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICB2YXIgbkxlZnRNYXJnaW5UYWJsZSA9IChfaHRPcHRpb24ud2lkdGggLSBlbFRhYmxlLm9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgdmFyIG5Ub3BNYXJnaW5UYWJsZSA9IChfaHRPcHRpb24uaGVpZ2h0IC0gZWxUYWJsZS5vZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICBpZiAobkxlZnRNYXJnaW5UYWJsZSA+IDAgJiYgblRvcE1hcmdpblRhYmxlID4gMCkge1xuICAgICAgICAgICAgZWxUYWJsZS5zdHlsZS5tYXJnaW4gPSBuVG9wTWFyZ2luVGFibGUgKyAncHggJyArIG5MZWZ0TWFyZ2luVGFibGUgKyAncHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5faHRPcHRpb24ub25SZW5kZXJpbmdFbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLm9uUmVuZGVyaW5nRW5kKHRoaXMuX2h0T3B0aW9uLCBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSBRUkNvZGVcbiAgICAgICAgICovXG4gICAgICAgIERyYXdpbmcucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX2VsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBEcmF3aW5nO1xuICAgICAgfSkoKVxuICAgIDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gRHJhd2luZyBpbiBDYW52YXNcbiAgICAgICAgZnVuY3Rpb24gX29uTWFrZUltYWdlKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kcmF3ZXIgPT0gJ3N2ZycpIHtcbiAgICAgICAgICAgIHZhciBzdmdEYXRhID0gdGhpcy5fb0NvbnRleHQuZ2V0U2VyaWFsaXplZFN2Zyh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVVSTCA9IHN2Z0RhdGE7XG4gICAgICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSBzdmdEYXRhO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjYW52YXNcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsSW1hZ2UuY3Jvc3NPcmlnaW49J0Fub255bW91cyc7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBpZiAodGhpcy5faHRPcHRpb24uY3Jvc3NPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fZWxJbWFnZS5jcm9zc09yaWdpbiA9IHRoaXMuX2h0T3B0aW9uLmNyb3NzT3JpZ2luO1xuICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgIHZhciBkYXRhVVJMID0gdGhpcy5fZWxDYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgICAgICAgLy8gdGhpcy5fZWxJbWFnZS5zcmMgPSBkYXRhVVJMO1xuICAgICAgICAgICAgICB0aGlzLmRhdGFVUkwgPSBkYXRhVVJMO1xuICAgICAgICAgICAgICAvLyB0aGlzLl9lbEltYWdlLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgICAvLyB0aGlzLl9lbENhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5vblJlbmRlcmluZ0VuZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGFVUkwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBcIkNhbiBub3QgZ2V0IGJhc2U2NCBkYXRhLCBwbGVhc2UgY2hlY2s6IDEuIFB1Ymxpc2hlZCB0aGUgcGFnZSBhbmQgaW1hZ2UgdG8gdGhlIHNlcnZlciAyLiBUaGUgaW1hZ2UgcmVxdWVzdCBzdXBwb3J0IENPUlMgMy4gQ29uZmlndXJlZCBgY3Jvc3NPcmlnaW46J2Fub255bW91cydgIG9wdGlvblwiXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9odE9wdGlvbi5vblJlbmRlcmluZ0VuZCh0aGlzLl9odE9wdGlvbiwgdGhpcy5kYXRhVVJMKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbmRyb2lkIDIuMSBidWcgd29ya2Fyb3VuZFxuICAgICAgICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvYW5kcm9pZC9pc3N1ZXMvZGV0YWlsP2lkPTUxNDFcbiAgICAgICAgaWYgKHJvb3QuX2FuZHJvaWQgJiYgcm9vdC5fYW5kcm9pZCA8PSAyLjEpIHtcbiAgICAgICAgICB2YXIgZmFjdG9yID0gMSAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgIHZhciBkcmF3SW1hZ2UgPSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmRyYXdJbWFnZTtcbiAgICAgICAgICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmRyYXdJbWFnZSA9IGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgc3gsXG4gICAgICAgICAgICBzeSxcbiAgICAgICAgICAgIHN3LFxuICAgICAgICAgICAgc2gsXG4gICAgICAgICAgICBkeCxcbiAgICAgICAgICAgIGR5LFxuICAgICAgICAgICAgZHcsXG4gICAgICAgICAgICBkaFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKCdub2RlTmFtZScgaW4gaW1hZ2UgJiYgL2ltZy9pLnRlc3QoaW1hZ2Uubm9kZU5hbWUpKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAxOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBhcmd1bWVudHNbaV0gPSBhcmd1bWVudHNbaV0gKiBmYWN0b3I7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGR3ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1sxXSAqPSBmYWN0b3I7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1syXSAqPSBmYWN0b3I7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1szXSAqPSBmYWN0b3I7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1s0XSAqPSBmYWN0b3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRyYXdJbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgd2hldGhlciB0aGUgdXNlcidzIGJyb3dzZXIgc3VwcG9ydHMgRGF0YSBVUkkgb3Igbm90XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZTdWNjZXNzIE9jY3VycyBpZiBpdCBzdXBwb3J0cyBEYXRhIFVSSVxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmRmFpbCBPY2N1cnMgaWYgaXQgZG9lc24ndCBzdXBwb3J0IERhdGEgVVJJXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfc2FmZVNldERhdGFVUkkoZlN1Y2Nlc3MsIGZGYWlsKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHNlbGYuX2ZGYWlsID0gZkZhaWw7XG4gICAgICAgICAgc2VsZi5fZlN1Y2Nlc3MgPSBmU3VjY2VzcztcblxuICAgICAgICAgIC8vIENoZWNrIGl0IGp1c3Qgb25jZVxuICAgICAgICAgIGlmIChzZWxmLl9iU3VwcG9ydERhdGFVUkkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgdmFyIGZPbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzZWxmLl9iU3VwcG9ydERhdGFVUkkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICBpZiAoc2VsZi5fZkZhaWwpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9mRmFpbC5jYWxsKHNlbGYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGZPblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNlbGYuX2JTdXBwb3J0RGF0YVVSSSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgaWYgKHNlbGYuX2ZTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZlN1Y2Nlc3MuY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZWwub25hYm9ydCA9IGZPbkVycm9yO1xuICAgICAgICAgICAgZWwub25lcnJvciA9IGZPbkVycm9yO1xuICAgICAgICAgICAgZWwub25sb2FkID0gZk9uU3VjY2VzcztcbiAgICAgICAgICAgIGVsLnNyYyA9XG4gICAgICAgICAgICAgICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQUZDQVlBQUFDTmJ5YmxBQUFBSEVsRVFWUUkxMlA0Ly84L3czOEdJQVhESUJLRTBESHhnbGpOQkFBTzlUWEwwWTRPSHdBQUFBQkpSVTVFcmtKZ2dnPT0nOyAvLyB0aGUgSW1hZ2UgY29udGFpbnMgMXB4IGRhdGEuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLl9iU3VwcG9ydERhdGFVUkkgPT09IHRydWUgJiYgc2VsZi5fZlN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHNlbGYuX2ZTdWNjZXNzLmNhbGwoc2VsZik7XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLl9iU3VwcG9ydERhdGFVUkkgPT09IGZhbHNlICYmIHNlbGYuX2ZGYWlsKSB7XG4gICAgICAgICAgICBzZWxmLl9mRmFpbC5jYWxsKHNlbGYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEcmF3aW5nIFFSQ29kZSBieSB1c2luZyBjYW52YXNcbiAgICAgICAgICpcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBodE9wdGlvbiBRUkNvZGUgT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIERyYXdpbmcgPSBmdW5jdGlvbiAoZWwsIGh0T3B0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fYklzUGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuX2FuZHJvaWQgPSBfZ2V0QW5kcm9pZCgpO1xuICAgICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgICAgICAgdGhpcy5faHRPcHRpb24gPSBodE9wdGlvbjtcblxuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kcmF3ZXIgPT0gJ3N2ZycpIHtcbiAgICAgICAgICAgIHRoaXMuX29Db250ZXh0ID0ge307XG4gICAgICAgICAgICB0aGlzLl9lbENhbnZhcyA9IHt9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjYW52YXNcbiAgICAgICAgICAgIHRoaXMuX2VsQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLl9lbC5hcHBlbmRDaGlsZCh0aGlzLl9lbENhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9vQ29udGV4dCA9IHRoaXMuX2VsQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAvLyB0aGlzLl9lbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsSW1hZ2UuYWx0ID0gXCJTY2FuIG1lIVwiO1xuICAgICAgICAgICAgLy8gdGhpcy5fZWxJbWFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAvLyB0aGlzLl9lbC5hcHBlbmRDaGlsZCh0aGlzLl9lbEltYWdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9iU3VwcG9ydERhdGFVUkkgPSBudWxsO1xuICAgICAgICAgIHRoaXMuZGF0YVVSTCA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYXcgdGhlIFFSQ29kZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1FSQ29kZX0gb1FSQ29kZVxuICAgICAgICAgKi9cbiAgICAgICAgRHJhd2luZy5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChvUVJDb2RlKSB7XG4gICAgICAgICAgLy8gdmFyIF9lbEltYWdlID0gdGhpcy5fZWxJbWFnZTtcbiAgICAgICAgICB2YXIgX2h0T3B0aW9uID0gdGhpcy5faHRPcHRpb247XG5cbiAgICAgICAgICBpZiAoIV9odE9wdGlvbi50aXRsZSAmJiAhX2h0T3B0aW9uLnN1YlRpdGxlKSB7XG4gICAgICAgICAgICBfaHRPcHRpb24uaGVpZ2h0IC09IF9odE9wdGlvbi50aXRsZUhlaWdodDtcbiAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5Db3VudCA9IG9RUkNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcbiAgICAgICAgICB2YXIgbldpZHRoID0gTWF0aC5yb3VuZChfaHRPcHRpb24ud2lkdGggLyBuQ291bnQpO1xuICAgICAgICAgIHZhciBuSGVpZ2h0ID0gTWF0aC5yb3VuZCgoX2h0T3B0aW9uLmhlaWdodCAtIF9odE9wdGlvbi50aXRsZUhlaWdodCkgLyBuQ291bnQpO1xuICAgICAgICAgIGlmIChuV2lkdGggPD0gMSkge1xuICAgICAgICAgICAgbldpZHRoID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5IZWlnaHQgPD0gMSkge1xuICAgICAgICAgICAgbkhlaWdodCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX2h0T3B0aW9uLndpZHRoID0gbldpZHRoICogbkNvdW50O1xuICAgICAgICAgIF9odE9wdGlvbi5oZWlnaHQgPSBuSGVpZ2h0ICogbkNvdW50ICsgX2h0T3B0aW9uLnRpdGxlSGVpZ2h0O1xuXG4gICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZSA9IE1hdGgucm91bmQoX2h0T3B0aW9uLnF1aWV0Wm9uZSk7XG5cbiAgICAgICAgICB0aGlzLl9lbENhbnZhcy53aWR0aCA9IF9odE9wdGlvbi53aWR0aCArIF9odE9wdGlvbi5xdWlldFpvbmUgKiAyO1xuICAgICAgICAgIHRoaXMuX2VsQ2FudmFzLmhlaWdodCA9IF9odE9wdGlvbi5oZWlnaHQgKyBfaHRPcHRpb24ucXVpZXRab25lICogMjtcblxuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kcmF3ZXIgIT0gJ2NhbnZhcycpIHtcbiAgICAgICAgICAgIC8vIF9lbEltYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9vQ29udGV4dCA9IG5ldyBDMlModGhpcy5fZWxDYW52YXMud2lkdGgsIHRoaXMuX2VsQ2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICAgIHZhciBfb0NvbnRleHQgPSB0aGlzLl9vQ29udGV4dDtcbiAgICAgICAgICBfb0NvbnRleHQubGluZVdpZHRoID0gMDtcbiAgICAgICAgICBfb0NvbnRleHQuZmlsbFN0eWxlID0gX2h0T3B0aW9uLmNvbG9yTGlnaHQ7XG4gICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2VsQ2FudmFzLndpZHRoLCB0aGlzLl9lbENhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgdmFyIHQgPSB0aGlzO1xuXG4gICAgICAgICAgZnVuY3Rpb24gZHJhd1F1aWV0Wm9uZUNvbG9yKCkge1xuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5xdWlldFpvbmUgPiAwICYmIF9odE9wdGlvbi5xdWlldFpvbmVDb2xvcikge1xuICAgICAgICAgICAgICAvLyB0b3BcbiAgICAgICAgICAgICAgX29Db250ZXh0LmxpbmVXaWR0aCA9IDA7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsU3R5bGUgPSBfaHRPcHRpb24ucXVpZXRab25lQ29sb3I7XG5cbiAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KDAsIDAsIHQuX2VsQ2FudmFzLndpZHRoLCBfaHRPcHRpb24ucXVpZXRab25lKTtcbiAgICAgICAgICAgICAgLy8gbGVmdFxuICAgICAgICAgICAgICBfb0NvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ucXVpZXRab25lLFxuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5xdWlldFpvbmUsXG4gICAgICAgICAgICAgICAgdC5fZWxDYW52YXMuaGVpZ2h0IC0gX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gcmlnaHRcbiAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIHQuX2VsQ2FudmFzLndpZHRoIC0gX2h0T3B0aW9uLnF1aWV0Wm9uZSxcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ucXVpZXRab25lLFxuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5xdWlldFpvbmUsXG4gICAgICAgICAgICAgICAgdC5fZWxDYW52YXMuaGVpZ2h0IC0gX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gYm90dG9tXG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHQuX2VsQ2FudmFzLmhlaWdodCAtIF9odE9wdGlvbi5xdWlldFpvbmUsXG4gICAgICAgICAgICAgICAgdC5fZWxDYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICAvLyBCYWNrZ3JvdW5kIEltYWdlXG4gICAgICAgICAgICB2YXIgYmdJbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgYmdJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBfb0NvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgICAgICAgIF9vQ29udGV4dC5nbG9iYWxBbHBoYSA9IF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYTtcbiAgICAgICAgICAgICAgdmFyIGltYWdlU21vb3RoaW5nUXVhbGl0eSA9IF9vQ29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgICAgICAgICAgIHZhciBpbWFnZVNtb290aGluZ0VuYWJsZWQgPSBfb0NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICAgICAgICBfb0NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nUXVhbGl0eSA9ICdoaWdoJztcbiAgICAgICAgICAgICAgX29Db250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICBiZ0ltZyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCxcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ud2lkdGggKyBfaHRPcHRpb24ucXVpZXRab25lICogMixcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24uaGVpZ2h0ICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLSBfaHRPcHRpb24udGl0bGVIZWlnaHRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nUXVhbGl0eSA9IGltYWdlU21vb3RoaW5nUXVhbGl0eTtcbiAgICAgICAgICAgICAgX29Db250ZXh0Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgICAgICAgICBkcmF3UXJjb2RlLmNhbGwodCwgb1FSQ29kZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gYmdJbWcuY3Jvc3NPcmlnaW49J0Fub255bW91cyc7XG4gICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmNyb3NzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgYmdJbWcuY3Jvc3NPcmlnaW4gPSBfaHRPcHRpb24uY3Jvc3NPcmlnaW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiZ0ltZy5vcmlnaW5hbFNyYyA9IF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2U7XG4gICAgICAgICAgICBiZ0ltZy5zcmMgPSBfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlO1xuICAgICAgICAgICAgLy8gRG9Tb21ldGhpbmdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhd1FyY29kZS5jYWxsKHQsIG9RUkNvZGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGRyYXdRcmNvZGUob1FSQ29kZSkge1xuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5vblJlbmRlcmluZ1N0YXJ0KSB7XG4gICAgICAgICAgICAgIF9odE9wdGlvbi5vblJlbmRlcmluZ1N0YXJ0KF9odE9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG5Db3VudDsgcm93KyspIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbkNvdW50OyBjb2wrKykge1xuICAgICAgICAgICAgICAgIHZhciBuTGVmdCA9IGNvbCAqIG5XaWR0aCArIF9odE9wdGlvbi5xdWlldFpvbmU7XG4gICAgICAgICAgICAgICAgdmFyIG5Ub3AgPSByb3cgKiBuSGVpZ2h0ICsgX2h0T3B0aW9uLnF1aWV0Wm9uZTtcblxuICAgICAgICAgICAgICAgIHZhciBiSXNEYXJrID0gb1FSQ29kZS5pc0Rhcmsocm93LCBjb2wpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGV5ZSA9IG9RUkNvZGUuZ2V0RXllKHJvdywgY29sKTsgLy8geyBpc0Rhcms6IHRydWUvZmFsc2UsIHR5cGU6IFBPX1RMLCBQSV9UTCwgUE9fVFIsIFBJX1RSLCBQT19CTCwgUElfQkwgfTtcblxuICAgICAgICAgICAgICAgIHZhciBub3dEb3RTY2FsZSA9IF9odE9wdGlvbi5kb3RTY2FsZTtcblxuICAgICAgICAgICAgICAgIF9vQ29udGV4dC5saW5lV2lkdGggPSAwO1xuICAgICAgICAgICAgICAgIC8vIENvbG9yIGhhbmRsZXJcbiAgICAgICAgICAgICAgICB2YXIgZENvbG9yO1xuICAgICAgICAgICAgICAgIHZhciBsQ29sb3I7XG4gICAgICAgICAgICAgICAgaWYgKGV5ZSkge1xuICAgICAgICAgICAgICAgICAgZENvbG9yID1cbiAgICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uW2V5ZS50eXBlXSB8fFxuICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb25bZXllLnR5cGUuc3Vic3RyaW5nKDAsIDIpXSB8fFxuICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24uY29sb3JEYXJrO1xuICAgICAgICAgICAgICAgICAgbENvbG9yID0gX2h0T3B0aW9uLmNvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxDb2xvciA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19IIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmF1dG9Db2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19IIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmF1dG9Db2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgICBsQ29sb3IgPSBfaHRPcHRpb24uYXV0b0NvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfSCB8fCBfaHRPcHRpb24udGltaW5nIHx8IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbCA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19WIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmF1dG9Db2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19WIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmF1dG9Db2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgICBsQ29sb3IgPSBfaHRPcHRpb24uYXV0b0NvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfViB8fCBfaHRPcHRpb24udGltaW5nIHx8IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uYXV0b0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkQ29sb3IgPSBfaHRPcHRpb24uYXV0b0NvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxDb2xvciA9IF9odE9wdGlvbi5hdXRvQ29sb3JMaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZENvbG9yID0gX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gNikge1xuICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfSCB8fCBfaHRPcHRpb24udGltaW5nIHx8IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sID09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkQ29sb3IgPSBfaHRPcHRpb24udGltaW5nX1YgfHwgX2h0T3B0aW9uLnRpbWluZyB8fCBfaHRPcHRpb24uY29sb3JEYXJrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbENvbG9yID0gX2h0T3B0aW9uLmNvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9vQ29udGV4dC5zdHJva2VTdHlsZSA9IGJJc0RhcmsgPyBkQ29sb3IgOiBsQ29sb3I7XG4gICAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxTdHlsZSA9IGJJc0RhcmsgPyBkQ29sb3IgOiBsQ29sb3I7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXllKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZXllLnR5cGUgPT0gJ0FPJykge1xuICAgICAgICAgICAgICAgICAgICBub3dEb3RTY2FsZSA9IF9odE9wdGlvbi5kb3RTY2FsZUFPO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleWUudHlwZSA9PSAnQUknKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vd0RvdFNjYWxlID0gX2h0T3B0aW9uLmRvdFNjYWxlQUk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub3dEb3RTY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlICYmIF9odE9wdGlvbi5hdXRvQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZENvbG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAoZXllLnR5cGUgPT0gJ0FPJyA/IF9odE9wdGlvbi5BSSA6IF9odE9wdGlvbi5BTykgfHwgX2h0T3B0aW9uLmF1dG9Db2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgIGxDb2xvciA9IF9odE9wdGlvbi5hdXRvQ29sb3JMaWdodDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IChleWUudHlwZSA9PSAnQU8nID8gX2h0T3B0aW9uLkFJIDogX2h0T3B0aW9uLkFPKSB8fCBkQ29sb3I7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vIElzIGV5ZVxuICAgICAgICAgICAgICAgICAgYklzRGFyayA9IGV5ZS5pc0Rhcms7XG5cbiAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgbkxlZnQgKyAobldpZHRoICogKDEgLSBub3dEb3RTY2FsZSkpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uLnRpdGxlSGVpZ2h0ICsgblRvcCArIChuSGVpZ2h0ICogKDEgLSBub3dEb3RTY2FsZSkpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIG5IZWlnaHQgKiBub3dEb3RTY2FsZVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRpbWluZyBQYXR0ZXJuXG5cbiAgICAgICAgICAgICAgICAgICAgbm93RG90U2NhbGUgPSBfaHRPcHRpb24uZG90U2NhbGVUaW1pbmdfSDtcblxuICAgICAgICAgICAgICAgICAgICBfb0NvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICAgbkxlZnQgKyAobldpZHRoICogKDEgLSBub3dEb3RTY2FsZSkpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgKyBuVG9wICsgKG5IZWlnaHQgKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgIG5XaWR0aCAqIG5vd0RvdFNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgIG5IZWlnaHQgKiBub3dEb3RTY2FsZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2wgPT0gNikge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaW1pbmcgUGF0dGVyblxuICAgICAgICAgICAgICAgICAgICBub3dEb3RTY2FsZSA9IF9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19WO1xuXG4gICAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgICBuTGVmdCArIChuV2lkdGggKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCArIG5Ub3AgKyAobkhlaWdodCAqICgxIC0gbm93RG90U2NhbGUpKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgbkhlaWdodCAqIG5vd0RvdFNjYWxlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5MZWZ0ICsgKG5XaWR0aCAqICgxIC0gbm93RG90U2NhbGUpKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgKyBuVG9wICsgKG5IZWlnaHQgKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICogbm93RG90U2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5MZWZ0ICsgKG5XaWR0aCAqICgxIC0gbm93RG90U2NhbGUpKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgKyBuVG9wICsgKG5IZWlnaHQgKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICogbm93RG90U2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5kb3RTY2FsZSAhPSAxICYmICFleWUpIHtcbiAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5zdHJva2VTdHlsZSA9IF9odE9wdGlvbi5jb2xvckxpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2h0T3B0aW9uLnRpdGxlKSB7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsU3R5bGUgPSBfaHRPcHRpb24udGl0bGVCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxDYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgX2h0T3B0aW9uLnRpdGxlSGVpZ2h0ICsgX2h0T3B0aW9uLnF1aWV0Wm9uZVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIF9vQ29udGV4dC5mb250ID0gX2h0T3B0aW9uLnRpdGxlRm9udDtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxTdHlsZSA9IF9odE9wdGlvbi50aXRsZUNvbG9yO1xuICAgICAgICAgICAgICBfb0NvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsVGV4dChcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxDYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICtfaHRPcHRpb24ucXVpZXRab25lICsgX2h0T3B0aW9uLnRpdGxlVG9wXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24uc3ViVGl0bGUpIHtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmZvbnQgPSBfaHRPcHRpb24uc3ViVGl0bGVGb250O1xuICAgICAgICAgICAgICBfb0NvbnRleHQuZmlsbFN0eWxlID0gX2h0T3B0aW9uLnN1YlRpdGxlQ29sb3I7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsVGV4dChcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24uc3ViVGl0bGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxDYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICtfaHRPcHRpb24ucXVpZXRab25lICsgX2h0T3B0aW9uLnN1YlRpdGxlVG9wXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlTG9nb0ltZyhpbWcpIHtcbiAgICAgICAgICAgICAgdmFyIGltZ0NvbnRhaW5lclcgPSBNYXRoLnJvdW5kKF9odE9wdGlvbi53aWR0aCAvIDMuNSk7XG4gICAgICAgICAgICAgIHZhciBpbWdDb250YWluZXJIID0gTWF0aC5yb3VuZChfaHRPcHRpb24uaGVpZ2h0IC8gMy41KTtcbiAgICAgICAgICAgICAgaWYgKGltZ0NvbnRhaW5lclcgIT09IGltZ0NvbnRhaW5lckgpIHtcbiAgICAgICAgICAgICAgICBpbWdDb250YWluZXJXID0gaW1nQ29udGFpbmVySDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nb01heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVyVyA9IE1hdGgucm91bmQoX2h0T3B0aW9uLmxvZ29NYXhXaWR0aCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2h0T3B0aW9uLmxvZ29XaWR0aCkge1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclcgPSBNYXRoLnJvdW5kKF9odE9wdGlvbi5sb2dvV2lkdGgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5sb2dvTWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCA9IE1hdGgucm91bmQoX2h0T3B0aW9uLmxvZ29NYXhIZWlnaHQpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9odE9wdGlvbi5sb2dvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCA9IE1hdGgucm91bmQoX2h0T3B0aW9uLmxvZ29IZWlnaHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIG53O1xuICAgICAgICAgICAgICB2YXIgbmg7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgaW1nLm5hdHVyYWxXaWR0aCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIElFIDYvNy84XG4gICAgICAgICAgICAgICAgbncgPSBpbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgbmggPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEhUTUw1IGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgbncgPSBpbWcubmF0dXJhbFdpZHRoO1xuICAgICAgICAgICAgICAgIG5oID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmxvZ29NYXhXaWR0aCB8fCBfaHRPcHRpb24ubG9nb01heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nb01heFdpZHRoICYmIG53IDw9IGltZ0NvbnRhaW5lclcpIHtcbiAgICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclcgPSBudztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmxvZ29NYXhIZWlnaHQgJiYgbmggPD0gaW1nQ29udGFpbmVySCkge1xuICAgICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCA9IG5oO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobncgPD0gaW1nQ29udGFpbmVyVyAmJiBuaCA8PSBpbWdDb250YWluZXJIKSB7XG4gICAgICAgICAgICAgICAgICBpbWdDb250YWluZXJXID0gbnc7XG4gICAgICAgICAgICAgICAgICBpbWdDb250YWluZXJIID0gbmg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGltZ0NvbnRhaW5lclggPSAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLSBpbWdDb250YWluZXJXKSAvIDI7XG4gICAgICAgICAgICAgIHZhciBpbWdDb250YWluZXJZID1cbiAgICAgICAgICAgICAgICAoX2h0T3B0aW9uLmhlaWdodCArXG4gICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLVxuICAgICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCkgL1xuICAgICAgICAgICAgICAgIDI7XG5cbiAgICAgICAgICAgICAgdmFyIGltZ1NjYWxlID0gTWF0aC5taW4oaW1nQ29udGFpbmVyVyAvIG53LCBpbWdDb250YWluZXJIIC8gbmgpO1xuICAgICAgICAgICAgICB2YXIgaW1nVyA9IG53ICogaW1nU2NhbGU7XG4gICAgICAgICAgICAgIHZhciBpbWdIID0gbmggKiBpbWdTY2FsZTtcblxuICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmxvZ29NYXhXaWR0aCB8fCBfaHRPcHRpb24ubG9nb01heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclcgPSBpbWdXO1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lckggPSBpbWdIO1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclggPSAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLSBpbWdDb250YWluZXJXKSAvIDI7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVyWSA9XG4gICAgICAgICAgICAgICAgICAoX2h0T3B0aW9uLmhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgIF9odE9wdGlvbi5xdWlldFpvbmUgKiAyIC1cbiAgICAgICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCkgL1xuICAgICAgICAgICAgICAgICAgMjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIERpZCBOb3QgVXNlIFRyYW5zcGFyZW50IExvZ28gSW1hZ2VcbiAgICAgICAgICAgICAgaWYgKCFfaHRPcHRpb24ubG9nb0JhY2tncm91bmRUcmFuc3BhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vaWYgKCFfaHRPcHRpb24ubG9nb0JhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgICAgIC8vX2h0T3B0aW9uLmxvZ29CYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxTdHlsZSA9IF9odE9wdGlvbi5sb2dvQmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KGltZ0NvbnRhaW5lclgsIGltZ0NvbnRhaW5lclksIGltZ0NvbnRhaW5lclcsIGltZ0NvbnRhaW5lckgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBpbWFnZVNtb290aGluZ1F1YWxpdHkgPSBfb0NvbnRleHQuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5O1xuICAgICAgICAgICAgICB2YXIgaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gX29Db250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSAnaGlnaCc7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgaW1nLFxuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclggKyAoaW1nQ29udGFpbmVyVyAtIGltZ1cpIC8gMixcbiAgICAgICAgICAgICAgICBpbWdDb250YWluZXJZICsgKGltZ0NvbnRhaW5lckggLSBpbWdIKSAvIDIsXG4gICAgICAgICAgICAgICAgaW1nVyxcbiAgICAgICAgICAgICAgICBpbWdIXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBpbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSBpbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgICAgICAgICAgIGRyYXdRdWlldFpvbmVDb2xvcigpO1xuICAgICAgICAgICAgICBfdGhpcy5fYklzUGFpbnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgX3RoaXMubWFrZUltYWdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nbykge1xuICAgICAgICAgICAgICAvLyBMb2dvIEltYWdlXG4gICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVMb2dvSW1nKGltZyk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgLy8gaW1nLmNyb3NzT3JpZ2luPVwiQW5vbnltb3VzXCI7XG4gICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uY3Jvc3NPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGltZy5jcm9zc09yaWdpbiA9IF9odE9wdGlvbi5jcm9zc09yaWdpbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbWcub3JpZ2luYWxTcmMgPSBfaHRPcHRpb24ubG9nbztcbiAgICAgICAgICAgICAgaW1nLnNyYyA9IF9odE9wdGlvbi5sb2dvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZHJhd1F1aWV0Wm9uZUNvbG9yKCk7XG4gICAgICAgICAgICAgIHRoaXMuX2JJc1BhaW50ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLm1ha2VJbWFnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTWFrZSB0aGUgaW1hZ2UgZnJvbSBDYW52YXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgRGF0YSBVUkkuXG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5tYWtlSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2JJc1BhaW50ZWQpIHtcbiAgICAgICAgICAgIF9zYWZlU2V0RGF0YVVSSS5jYWxsKHRoaXMsIF9vbk1ha2VJbWFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gd2hldGhlciB0aGUgUVJDb2RlIGlzIHBhaW50ZWQgb3Igbm90XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5pc1BhaW50ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2JJc1BhaW50ZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSBRUkNvZGVcbiAgICAgICAgICovXG4gICAgICAgIERyYXdpbmcucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX29Db250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9lbENhbnZhcy53aWR0aCwgdGhpcy5fZWxDYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICB0aGlzLl9iSXNQYWludGVkID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgRHJhd2luZy5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX29Db250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9lbENhbnZhcy53aWR0aCwgdGhpcy5fZWxDYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICB0aGlzLl9iSXNQYWludGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuTnVtYmVyXG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5yb3VuZCA9IGZ1bmN0aW9uIChuTnVtYmVyKSB7XG4gICAgICAgICAgaWYgKCFuTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbk51bWJlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihuTnVtYmVyICogMTAwMCkgLyAxMDAwO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBEcmF3aW5nO1xuICAgICAgfSkoKTtcblxuICAvKipcbiAgICogR2V0IHRoZSB0eXBlIGJ5IHN0cmluZyBsZW5ndGhcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNUZXh0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuQ29ycmVjdExldmVsXG4gICAqIEByZXR1cm4ge051bWJlcn0gdHlwZVxuICAgKi9cbiAgZnVuY3Rpb24gX2dldFR5cGVOdW1iZXIoc1RleHQsIF9odE9wdGlvbikge1xuICAgIHZhciBuQ29ycmVjdExldmVsID0gX2h0T3B0aW9uLmNvcnJlY3RMZXZlbDtcblxuICAgIHZhciBuVHlwZSA9IDE7XG4gICAgdmFyIGxlbmd0aCA9IF9nZXRVVEY4TGVuZ3RoKHNUZXh0KTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBRUkNvZGVMaW1pdExlbmd0aC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIG5MaW1pdCA9IDA7XG4gICAgICBzd2l0Y2ggKG5Db3JyZWN0TGV2ZWwpIHtcbiAgICAgICAgY2FzZSBRUkVycm9yQ29ycmVjdExldmVsLkw6XG4gICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bMF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUVJFcnJvckNvcnJlY3RMZXZlbC5NOlxuICAgICAgICAgIG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuUTpcbiAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVsyXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBRUkVycm9yQ29ycmVjdExldmVsLkg6XG4gICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bM107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChsZW5ndGggPD0gbkxpbWl0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgblR5cGUrKztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5UeXBlID4gUVJDb2RlTGltaXRMZW5ndGgubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUb28gbG9uZyBkYXRhLiB0aGUgQ29ycmVjdExldmVsLicgK1xuICAgICAgICAgIFsnTScsICdMJywgJ0gnLCAnUSddW25Db3JyZWN0TGV2ZWxdICtcbiAgICAgICAgICAnIGxpbWl0IGxlbmd0aCBpcyAnICtcbiAgICAgICAgICBuTGltaXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKF9odE9wdGlvbi52ZXJzaW9uICE9IDApIHtcbiAgICAgIGlmIChuVHlwZSA8PSBfaHRPcHRpb24udmVyc2lvbikge1xuICAgICAgICBuVHlwZSA9IF9odE9wdGlvbi52ZXJzaW9uO1xuICAgICAgICBfaHRPcHRpb24ucnVuVmVyc2lvbiA9IG5UeXBlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdRUiBDb2RlIHZlcnNpb24gJyArIF9odE9wdGlvbi52ZXJzaW9uICsgJyB0b28gc21hbGwsIHJ1biB2ZXJzaW9uIHVzZSAnICsgblR5cGVcbiAgICAgICAgKTtcbiAgICAgICAgX2h0T3B0aW9uLnJ1blZlcnNpb24gPSBuVHlwZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5UeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldFVURjhMZW5ndGgoc1RleHQpIHtcbiAgICB2YXIgcmVwbGFjZWRUZXh0ID0gZW5jb2RlVVJJKHNUZXh0KVxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC5yZXBsYWNlKC9cXCVbMC05YS1mQS1GXXsyfS9nLCAnYScpO1xuICAgIHJldHVybiByZXBsYWNlZFRleHQubGVuZ3RoICsgKHJlcGxhY2VkVGV4dC5sZW5ndGggIT0gc1RleHQubGVuZ3RoID8gMyA6IDApO1xuICB9XG5cbiAgUVJDb2RlID0gZnVuY3Rpb24gKGVsLCB2T3B0aW9uKSB7XG4gICAgdGhpcy5faHRPcHRpb24gPSB7XG4gICAgICB3aWR0aDogMjU2LFxuICAgICAgaGVpZ2h0OiAyNTYsXG4gICAgICB0eXBlTnVtYmVyOiA0LFxuICAgICAgY29sb3JEYXJrOiAnIzAwMDAwMCcsXG4gICAgICBjb2xvckxpZ2h0OiAnI2ZmZmZmZicsXG4gICAgICBjb3JyZWN0TGV2ZWw6IFFSRXJyb3JDb3JyZWN0TGV2ZWwuSCxcblxuICAgICAgZG90U2NhbGU6IDEsIC8vIEZvciBib2R5IGJsb2NrLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG5cbiAgICAgIGRvdFNjYWxlVGltaW5nOiAxLCAvLyBEYWZhdWx0IGZvciB0aW1pbmcgYmxvY2sgLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG4gICAgICBkb3RTY2FsZVRpbWluZ19IOiB1bmRlZmluZWQsIC8vIEZvciBob3Jpem9udGFsIHRpbWluZyBibG9jaywgbXVzdCBiZSBncmVhdGVyIHRoYW4gMCwgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEuIGRlZmF1bHQgaXMgMVxuICAgICAgZG90U2NhbGVUaW1pbmdfVjogdW5kZWZpbmVkLCAvLyBGb3IgdmVydGljYWwgdGltaW5nIGJsb2NrLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG5cbiAgICAgIGRvdFNjYWxlQTogMSwgLy8gRGFmYXVsdCBmb3IgYWxpZ25tZW50IGJsb2NrLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG4gICAgICBkb3RTY2FsZUFPOiB1bmRlZmluZWQsIC8vIEZvciBhbGlnbm1lbnQgb3V0ZXIgYmxvY2ssIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAsIGxlc3MgdGhhbiBvciBlcXVhbCB0byAxLiBkZWZhdWx0IGlzIDFcbiAgICAgIGRvdFNjYWxlQUk6IHVuZGVmaW5lZCwgLy8gRm9yIGFsaWdubWVudCBpbm5lciBibG9jaywgbXVzdCBiZSBncmVhdGVyIHRoYW4gMCwgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEuIGRlZmF1bHQgaXMgMVxuXG4gICAgICBxdWlldFpvbmU6IDAsXG4gICAgICBxdWlldFpvbmVDb2xvcjogJ3JnYmEoMCwwLDAsMCknLFxuXG4gICAgICB0aXRsZTogJycsXG4gICAgICB0aXRsZUZvbnQ6ICdub3JtYWwgbm9ybWFsIGJvbGQgMTZweCBBcmlhbCcsXG4gICAgICB0aXRsZUNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICB0aXRsZUJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgdGl0bGVIZWlnaHQ6IDAsIC8vIFRpdGxlIEhlaWdodCwgSW5jbHVkZSBzdWJUaXRsZVxuICAgICAgdGl0bGVUb3A6IDMwLCAvLyBkcmF3cyB5IGNvb3JkaW5hdGVzLiBkZWZhdWx0IGlzIDMwXG5cbiAgICAgIHN1YlRpdGxlOiAnJyxcbiAgICAgIHN1YlRpdGxlRm9udDogJ25vcm1hbCBub3JtYWwgbm9ybWFsIDE0cHggQXJpYWwnLFxuICAgICAgc3ViVGl0bGVDb2xvcjogJyM0RjRGNEYnLFxuICAgICAgc3ViVGl0bGVUb3A6IDYwLCAvLyBkcmF3cyB5IGNvb3JkaW5hdGVzLiBkZWZhdWx0IGlzIDBcblxuICAgICAgbG9nbzogdW5kZWZpbmVkLFxuICAgICAgbG9nb1dpZHRoOiB1bmRlZmluZWQsXG4gICAgICBsb2dvSGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICBsb2dvTWF4V2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgIGxvZ29NYXhIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgIGxvZ29CYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIGxvZ29CYWNrZ3JvdW5kVHJhbnNwYXJlbnQ6IGZhbHNlLFxuXG4gICAgICAvLyA9PT0gUG9zb3Rpb24gUGF0dGVybihFeWUpIENvbG9yXG4gICAgICBQTzogdW5kZWZpbmVkLCAvLyBHbG9iYWwgUG9zb3Rpb24gT3V0ZXIgY29sb3IuIGlmIG5vdCBzZXQsIHRoZSBkZWZhdXQgaXMgYGNvbG9yRGFya2BcbiAgICAgIFBJOiB1bmRlZmluZWQsIC8vIEdsb2JhbCBQb3NvdGlvbiBJbm5lciBjb2xvci4gaWYgbm90IHNldCwgdGhlIGRlZmF1dCBpcyBgY29sb3JEYXJrYFxuICAgICAgUE9fVEw6IHVuZGVmaW5lZCwgLy8gUG9zb3Rpb24gT3V0ZXIgLSBUb3AgTGVmdFxuICAgICAgUElfVEw6IHVuZGVmaW5lZCwgLy8gUG9zb3Rpb24gSW5uZXIgLSBUb3AgTGVmdFxuICAgICAgUE9fVFI6IHVuZGVmaW5lZCwgLy8gUG9zb3Rpb24gT3V0ZXIgLSBUb3AgUmlnaHRcbiAgICAgIFBJX1RSOiB1bmRlZmluZWQsIC8vIFBvc290aW9uIElubmVyIC0gVG9wIFJpZ2h0XG4gICAgICBQT19CTDogdW5kZWZpbmVkLCAvLyBQb3NvdGlvbiBPdXRlciAtIEJvdHRvbSBMZWZ0XG4gICAgICBQSV9CTDogdW5kZWZpbmVkLCAvLyBQb3NvdGlvbiBJbm5lciAtIEJvdHRvbSBMZWZ0XG5cbiAgICAgIC8vID09PSBBbGlnbm1lbnQgQ29sb3JcbiAgICAgIEFPOiB1bmRlZmluZWQsIC8vIEFsaWdubWVudCBPdXRlci4gaWYgbm90IHNldCwgdGhlIGRlZmF1dCBpcyBgY29sb3JEYXJrYFxuICAgICAgQUk6IHVuZGVmaW5lZCwgLy8gQWxpZ25tZW50IElubmVyLiBpZiBub3Qgc2V0LCB0aGUgZGVmYXV0IGlzIGBjb2xvckRhcmtgXG5cbiAgICAgIC8vID09PSBUaW1pbmcgUGF0dGVybiBDb2xvclxuICAgICAgdGltaW5nOiB1bmRlZmluZWQsIC8vIEdsb2JhbCBUaW1pbmcgY29sb3IuIGlmIG5vdCBzZXQsIHRoZSBkZWZhdXQgaXMgYGNvbG9yRGFya2BcbiAgICAgIHRpbWluZ19IOiB1bmRlZmluZWQsIC8vIEhvcml6b250YWwgdGltaW5nIGNvbG9yXG4gICAgICB0aW1pbmdfVjogdW5kZWZpbmVkLCAvLyBWZXJ0aWNhbCB0aW1pbmcgY29sb3JcblxuICAgICAgLy8gPT09PSBCYWNrZ3JvdWQgSW1hZ2VcbiAgICAgIGJhY2tncm91bmRJbWFnZTogdW5kZWZpbmVkLCAvLyBCYWNrZ3JvdW5kIEltYWdlXG4gICAgICBiYWNrZ3JvdW5kSW1hZ2VBbHBoYTogMSwgLy8gQmFja2dyb3VuZCBpbWFnZSB0cmFuc3BhcmVuY3ksIHZhbHVlIGJldHdlZW4gMCBhbmQgMS4gZGVmYXVsdCBpcyAxLlxuICAgICAgYXV0b0NvbG9yOiBmYWxzZSwgLy8gQXV0b21hdGljIGNvbG9yIGFkanVzdG1lbnQoZm9yIGRhdGEgYmxvY2spXG4gICAgICBhdXRvQ29sb3JEYXJrOiAncmdiYSgwLCAwLCAwLCAuNiknLCAvLyBBdXRvbWF0aWMgY29sb3I6IGRhcmsgQ1NTIGNvbG9yXG4gICAgICBhdXRvQ29sb3JMaWdodDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgLjcpJywgLy8gQXV0b21hdGljIGNvbG9yOiBsaWdodCBDU1MgY29sb3JcblxuICAgICAgLy8gPT09PSBFdmVudCBIYW5kbGVyXG4gICAgICBvblJlbmRlcmluZ1N0YXJ0OiB1bmRlZmluZWQsXG4gICAgICBvblJlbmRlcmluZ0VuZDogdW5kZWZpbmVkLFxuXG4gICAgICAvLyA9PT09IFZlcnNpb25zXG4gICAgICB2ZXJzaW9uOiAwLCAvLyBUaGUgc3ltYm9sIHZlcnNpb25zIG9mIFFSIENvZGUgcmFuZ2UgZnJvbSBWZXJzaW9uIDEgdG8gVmVyc2lvbiA0MC4gZGVmYXVsdCAwIG1lYW5zIGF1dG9tYXRpY2FsbHkgY2hvb3NlIHRoZSBjbG9zZXN0IHZlcnNpb24gYmFzZWQgb24gdGhlIHRleHQgbGVuZ3RoLlxuXG4gICAgICAvLyA9PT09IFRvb2x0aXBcbiAgICAgIHRvb2x0aXA6IGZhbHNlLCAvLyBXaGV0aGVyIHNldCB0aGUgUVJDb2RlIFRleHQgYXMgdGhlIHRpdGxlIGF0dHJpYnV0ZSB2YWx1ZSBvZiB0aGUgaW1hZ2VcblxuICAgICAgLy8gPT09PSBCaW5hcnkoaGV4KSBkYXRhIG1vZGVcbiAgICAgIGJpbmFyeTogZmFsc2UsIC8vIFdoZXRoZXIgaXQgaXMgYmluYXJ5IG1vZGUsIGRlZmF1bHQgaXMgdGV4dCBtb2RlLlxuXG4gICAgICAvLyA9PT09IERyYXdpbmcgbWV0aG9kXG4gICAgICBkcmF3ZXI6ICdjYW52YXMnLCAvLyBEcmF3aW5nIG1ldGhvZDogY2FudmFzLCBzdmcoQ2hyb21lLCBGRiwgSUU5KylcblxuICAgICAgLy8gPT09PSBDT1JTXG4gICAgICBjcm9zc09yaWdpbjogbnVsbCwgLy8gU3RyaW5nIHdoaWNoIHNwZWNpZmllcyB0aGUgQ09SUyBzZXR0aW5nIHRvIHVzZSB3aGVuIHJldHJpZXZpbmcgdGhlIGltYWdlLiBudWxsIG1lYW5zIHRoYXQgdGhlIGNyb3NzT3JpZ2luIGF0dHJpYnV0ZSBpcyBub3Qgc2V0LlxuXG4gICAgICAvLyBVVEYtOCB3aXRob3V0IEJPTVxuICAgICAgdXRmOFdpdGhvdXRCT006IHRydWVcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB2T3B0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgdk9wdGlvbiA9IHtcbiAgICAgICAgdGV4dDogdk9wdGlvblxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBPdmVyd3JpdGVzIG9wdGlvbnNcbiAgICBpZiAodk9wdGlvbikge1xuICAgICAgZm9yICh2YXIgaSBpbiB2T3B0aW9uKSB7XG4gICAgICAgIHRoaXMuX2h0T3B0aW9uW2ldID0gdk9wdGlvbltpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faHRPcHRpb24udmVyc2lvbiA8IDAgfHwgdGhpcy5faHRPcHRpb24udmVyc2lvbiA+IDQwKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJRUiBDb2RlIHZlcnNpb24gJ1wiICsgdGhpcy5faHRPcHRpb24udmVyc2lvbiArIFwiJyBpcyBpbnZhbGlkYXRlLCByZXNldCB0byAwXCIpO1xuICAgICAgdGhpcy5faHRPcHRpb24udmVyc2lvbiA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZSA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGUgK1xuICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBkb3RTY2FsZSBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZSA9IDE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZyA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmcgK1xuICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBkb3RTY2FsZVRpbWluZyBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZyA9IDE7XG4gICAgfVxuICAgIGlmICh0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19IKSB7XG4gICAgICBpZiAodGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfSCA8IDAgfHwgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfSCA+IDEpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX0ggK1xuICAgICAgICAgICAgJyAsIGlzIGludmFsaWRhdGUsIGRvdFNjYWxlVGltaW5nX0ggbXVzdCBncmVhdGVyIHRoYW4gMCwgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEsIG5vdyByZXNldCB0byAxLiAnXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX0ggPSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19IID0gdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX1YpIHtcbiAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19WIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19WID4gMSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfViArXG4gICAgICAgICAgICAnICwgaXMgaW52YWxpZGF0ZSwgZG90U2NhbGVUaW1pbmdfViBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfViA9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX1YgPSB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faHRPcHRpb24uZG90U2NhbGVBIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUEgPiAxKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQSArXG4gICAgICAgICAgJyAsIGlzIGludmFsaWRhdGUsIGRvdFNjYWxlQSBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUEgPSAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5faHRPcHRpb24uZG90U2NhbGVBTykge1xuICAgICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQU8gPCAwIHx8IHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQU8gPiAxKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFPICtcbiAgICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBkb3RTY2FsZUFPIG11c3QgZ3JlYXRlciB0aGFuIDAsIGxlc3MgdGhhbiBvciBlcXVhbCB0byAxLCBub3cgcmVzZXQgdG8gMS4gJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFPID0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVBTyA9IHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQUkpIHtcbiAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFJIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFJID4gMSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVBSSArXG4gICAgICAgICAgICAnICwgaXMgaW52YWxpZGF0ZSwgZG90U2NhbGVBSSBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVBSSA9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQUkgPSB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZUFscGhhIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgdGhpcy5faHRPcHRpb24uYmFja2dyb3VuZEltYWdlQWxwaGEgK1xuICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBiYWNrZ3JvdW5kSW1hZ2VBbHBoYSBtdXN0IGJldHdlZW4gMCBhbmQgMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5faHRPcHRpb24uaGVpZ2h0ID0gdGhpcy5faHRPcHRpb24uaGVpZ2h0ICsgdGhpcy5faHRPcHRpb24udGl0bGVIZWlnaHQ7XG4gICAgaWYgKHR5cGVvZiBlbCA9PSAnc3RyaW5nJykge1xuICAgICAgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuX2h0T3B0aW9uLmRyYXdlciB8fFxuICAgICAgKHRoaXMuX2h0T3B0aW9uLmRyYXdlciAhPSAnc3ZnJyAmJiB0aGlzLl9odE9wdGlvbi5kcmF3ZXIgIT0gJ2NhbnZhcycpXG4gICAgKSB7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kcmF3ZXIgPSAnY2FudmFzJztcbiAgICB9XG5cbiAgICB0aGlzLl9hbmRyb2lkID0gX2dldEFuZHJvaWQoKTtcbiAgICB0aGlzLl9lbCA9IGVsO1xuICAgIHRoaXMuX29RUkNvZGUgPSBudWxsO1xuXG4gICAgdmFyIF9odE9wdGlvbkNsb25lID0ge307XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9odE9wdGlvbikge1xuICAgICAgX2h0T3B0aW9uQ2xvbmVbaV0gPSB0aGlzLl9odE9wdGlvbltpXTtcbiAgICB9XG4gICAgdGhpcy5fb0RyYXdpbmcgPSBuZXcgRHJhd2luZyh0aGlzLl9lbCwgX2h0T3B0aW9uQ2xvbmUpO1xuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLnRleHQpIHtcbiAgICAgIHRoaXMubWFrZUNvZGUodGhpcy5faHRPcHRpb24udGV4dCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlIHRoZSBRUkNvZGVcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNUZXh0IGxpbmsgZGF0YVxuICAgKi9cbiAgUVJDb2RlLnByb3RvdHlwZS5tYWtlQ29kZSA9IGZ1bmN0aW9uIChzVGV4dCkge1xuICAgIHRoaXMuX29RUkNvZGUgPSBuZXcgUVJDb2RlTW9kZWwoXG4gICAgICBfZ2V0VHlwZU51bWJlcihzVGV4dCwgdGhpcy5faHRPcHRpb24pLFxuICAgICAgdGhpcy5faHRPcHRpb24uY29ycmVjdExldmVsXG4gICAgKTtcbiAgICB0aGlzLl9vUVJDb2RlLmFkZERhdGEoc1RleHQsIHRoaXMuX2h0T3B0aW9uLmJpbmFyeSwgdGhpcy5faHRPcHRpb24udXRmOFdpdGhvdXRCT00pO1xuICAgIHRoaXMuX29RUkNvZGUubWFrZSgpO1xuICAgIGlmICh0aGlzLl9odE9wdGlvbi50b29sdGlwKSB7XG4gICAgICB0aGlzLl9lbC50aXRsZSA9IHNUZXh0O1xuICAgIH1cbiAgICB0aGlzLl9vRHJhd2luZy5kcmF3KHRoaXMuX29RUkNvZGUpO1xuICAgIC8vXHRcdHRoaXMubWFrZUltYWdlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2UgdGhlIEltYWdlIGZyb20gQ2FudmFzIGVsZW1lbnRcbiAgICogLSBJdCBvY2N1cnMgYXV0b21hdGljYWxseVxuICAgKiAtIEFuZHJvaWQgYmVsb3cgMyBkb2Vzbid0IHN1cHBvcnQgRGF0YS1VUkkgc3BlYy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIFFSQ29kZS5wcm90b3R5cGUubWFrZUltYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5fb0RyYXdpbmcubWFrZUltYWdlID09ICdmdW5jdGlvbicgJiYgKCF0aGlzLl9hbmRyb2lkIHx8IHRoaXMuX2FuZHJvaWQgPj0gMykpIHtcbiAgICAgIHRoaXMuX29EcmF3aW5nLm1ha2VJbWFnZSgpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXIgdGhlIFFSQ29kZVxuICAgKi9cbiAgUVJDb2RlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9vRHJhd2luZy5yZW1vdmUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVzaXplIHRoZSBRUkNvZGVcbiAgICovXG4gIFFSQ29kZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLl9vRHJhd2luZy5faHRPcHRpb24ud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9vRHJhd2luZy5faHRPcHRpb24uaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuX29EcmF3aW5nLmRyYXcodGhpcy5fb1FSQ29kZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vIENvbmZsaWN0XG4gICAqIEByZXR1cm4gUVJDb2RlIG9iamVjdFxuICAgKi9cbiAgUVJDb2RlLnByb3RvdHlwZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChyb290LlFSQ29kZSA9PT0gdGhpcykge1xuICAgICAgcm9vdC5RUkNvZGUgPSBfUVJDb2RlO1xuICAgIH1cbiAgICByZXR1cm4gUVJDb2RlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbmFtZSBRUkNvZGUuQ29ycmVjdExldmVsXG4gICAqL1xuICBRUkNvZGUuQ29ycmVjdExldmVsID0gUVJFcnJvckNvcnJlY3RMZXZlbDtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgLy8gRXhwb3J0IFFSQ29kZVxuXG4gIC8vIEFNRCAmIENNRCBDb21wYXRpYmlsaXR5XG4gIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgKGRlZmluZS5hbWQgfHwgZGVmaW5lLmNtZCkpIHtcbiAgICAvLyAxLiBEZWZpbmUgYW4gYW5vbnltb3VzIG1vZHVsZVxuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFFSQ29kZTtcbiAgICB9KTtcbiAgfVxuICAvLyBDb21tb25KUyBDb21wYXRpYmlsaXR5KGluY2x1ZGUgTm9kZUpTKVxuICBlbHNlIGlmIChmcmVlTW9kdWxlKSB7XG4gICAgLy8gTm9kZS5qc1xuICAgIChmcmVlTW9kdWxlLmV4cG9ydHMgPSBRUkNvZGUpLlFSQ29kZSA9IFFSQ29kZTtcbiAgICAvLyBPdGhlciBDb21tb25KU1xuICAgIGZyZWVFeHBvcnRzLlFSQ29kZSA9IFFSQ29kZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFeHBvcnQgR2xvYmFsXG4gICAgcm9vdC5RUkNvZGUgPSBRUkNvZGU7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFFSQ29kZTtcbiIsImltcG9ydCB7XG4gIEFGX1VSTF9TQ0hFTUUsXG4gIFZBTElEX0FGX1VSTF9QQVJUU19MRU5HVEgsXG4gIEdDTElEX0VYQ0xVREVfUEFSQU1TX0tFWVMsXG4gIEFGX0NVU1RPTV9FWENMVURFX1BBUkFNU19LRVlTXG59IGZyb20gJy4vY29uc3RhbnRzL3NtYXJ0U2NyaXB0JztcbmltcG9ydCB7IGdldFBhcmFtZXRlclZhbHVlLCBnZXRVUkxQYXJhbWV0ZXJzS1YsIHN0cmluZ2lmeVBhcmFtZXRlcnMgfSBmcm9tICcuL3V0aWxzL3NtYXJ0U2NyaXB0JztcbmltcG9ydCB7IGlzU2tpcHBlZFVSTCwgZ2V0R29vZ2xlQ2xpY2tJZFBhcmFtZXRlcnMgfSBmcm9tICcuL3NlcnZpY2VzL3NtYXJ0U2NyaXB0JztcbmltcG9ydCBRUkNvZGUgZnJvbSAnLi9xci9xcic7XG5RUkNvZGUoKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZ2VuZXJhdGVPbmVMaW5rVVJMID0gKHBhcmFtZXRlcnMgPSB7IGFmUGFyYW1ldGVyczoge30gfSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uZUxpbmtVUkwsIC8vW3N0cmluZ11cbiAgICAgIC8vZWFjaCBpbm5lciBwYXJhbWV0ZXIgb2YgW21lZGlhU291cmNlLGNhbXBhaWduLGNoYW5uZWwsYWQsYWRTZXQsZGVlcExpbmtWYWx1ZV0gc2hvdWxkIGFjY2VwdCBjb25maWcgb2JqZWN0OlxuICAgICAgLy97XG4gICAgICAvLyAga2V5czpbc3RyaW5nW11dLFxuICAgICAgLy8gIG92ZXJyaWRlVmFsdWVzOiB7a2V5OnZhbHVlfSxcbiAgICAgIC8vICBkZWZhdWx0VmFsdWU6IFtzdHJpbmddXG4gICAgICAvL31cbiAgICAgIGFmUGFyYW1ldGVyczoge1xuICAgICAgICBtZWRpYVNvdXJjZSxcbiAgICAgICAgY2FtcGFpZ24sXG4gICAgICAgIGNoYW5uZWwsXG4gICAgICAgIGFkLFxuICAgICAgICBhZFNldCxcbiAgICAgICAgZGVlcExpbmtWYWx1ZSxcbiAgICAgICAgYWZTdWIxLFxuICAgICAgICBhZlN1YjIsXG4gICAgICAgIGFmU3ViMyxcbiAgICAgICAgYWZTdWI0LFxuICAgICAgICBhZlN1YjUsXG4gICAgICAgIGFmQ3VzdG9tLCAvL2FycmF5IG9mIHtwYXJhbUtleTogW3N0cmluZ10sIGtleXM6W3N0cmluZ1tdXSwgb3ZlcnJpZGVWYWx1ZXM6IHtrZXk6dmFsdWV9LCBkZWZhdWx0VmFsdWU6IFtzdHJpbmddfVxuICAgICAgICBnb29nbGVDbGlja0lkS2V5IC8vIFtzdHJpbmddXG4gICAgICB9ID0ge30sXG4gICAgICByZWZlcnJlclNraXBMaXN0ID0gW10sIC8vW3N0cmluZ1tdXVxuICAgICAgdXJsU2tpcExpc3QgPSBbXSAvL1tzdHJpbmdbXV1cbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGNvbnN0IG9uZUxpbmtVUkxQYXJ0cyA9IChvbmVMaW5rVVJMIHx8ICcnKT8udG9TdHJpbmcoKS5tYXRjaChBRl9VUkxfU0NIRU1FKTtcbiAgICBpZiAoIW9uZUxpbmtVUkxQYXJ0cyB8fCBvbmVMaW5rVVJMUGFydHM/Lmxlbmd0aCA8IFZBTElEX0FGX1VSTF9QQVJUU19MRU5HVEgpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwib25lTGlua1VSTCBpcyBtaXNzaW5nIG9yIG5vdCBpbiB0aGUgY29ycmVjdCBmb3JtYXQsIGNhbid0IGdlbmVyYXRlIFVSTFwiLFxuICAgICAgICBvbmVMaW5rVVJMXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhU291cmNlPy5rZXlzPy5sZW5ndGggPT09IDAgJiYgIW1lZGlhU291cmNlPy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwibWVkaWFTb3VyY2UgaXMgbWlzc2luZyAoZGVmYXVsdCB2YWx1ZSB3YXMgbm90IHN1cHBsaWVkKSwgY2FuJ3QgZ2VuZXJhdGUgVVJMXCIsXG4gICAgICAgIG1lZGlhU291cmNlXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaXNTa2lwcGVkVVJMKHtcbiAgICAgICAgdXJsOiBkb2N1bWVudC5yZWZlcnJlcixcbiAgICAgICAgc2tpcEtleXM6IHJlZmVycmVyU2tpcExpc3QsXG4gICAgICAgIGVycm9yTXNnOiAnR2VuZXJhdGUgdXJsIGlzIHNraXBwZWQuIEhUVFAgcmVmZXJyZXIgY29udGFpbnMga2V5OidcbiAgICAgIH0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBpc1NraXBwZWRVUkwoe1xuICAgICAgICB1cmw6IGRvY3VtZW50LlVSTCxcbiAgICAgICAgc2tpcEtleXM6IHVybFNraXBMaXN0LFxuICAgICAgICBlcnJvck1zZzogJ0dlbmVyYXRlIHVybCBpcyBza2lwcGVkLiBVUkwgY29udGFpbnMgc3RyaW5nOidcbiAgICAgIH0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBhZl9qc193ZWI9dHJ1ZSBhbmQgYWZfc3NfdmVyPVt2ZXJzaW9uXSB3aWxsIGJlIGFkZGVkIHRvIGV2ZXJ5IFVSTCB0aGF0IHdhcyBnZW5lcmF0ZWQgdGhyb3VnaCB0aGlzIHNjcmlwdFxuICAgIGNvbnN0IGFmUGFyYW1zID0geyBhZl9qc193ZWI6IHRydWUsIGFmX3NzX3Zlcjogd2luZG93LkFGX1NNQVJUX1NDUklQVC52ZXJzaW9uIH07XG4gICAgY29uc3QgY3VycmVudFVSTFBhcmFtcyA9IGdldFVSTFBhcmFtZXRlcnNLVih3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuICAgIGlmIChtZWRpYVNvdXJjZSkge1xuICAgICAgY29uc3QgcGlkVmFsdWUgPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBtZWRpYVNvdXJjZSk7XG4gICAgICBpZiAoIXBpZFZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJtZWRpYVNvdXJjZSB3YXMgbm90IGZvdW5kIGluIHRoZSBVUkwgYW5kIGRlZmF1bHQgdmFsdWUgd2FzIG5vdCBzdXBwbGllZCwgY2FuJ3QgZ2VuZXJhdGUgVVJMXCIsXG4gICAgICAgICAgbWVkaWFTb3VyY2VcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBhZlBhcmFtc1sncGlkJ10gPSBwaWRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2FtcGFpZ24pIHtcbiAgICAgIGFmUGFyYW1zWydjJ10gPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBjYW1wYWlnbik7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGFmUGFyYW1zWydhZl9jaGFubmVsJ10gPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBjaGFubmVsKTtcbiAgICB9XG5cbiAgICBpZiAoYWQpIHtcbiAgICAgIGFmUGFyYW1zWydhZl9hZCddID0gZ2V0UGFyYW1ldGVyVmFsdWUoY3VycmVudFVSTFBhcmFtcywgYWQpO1xuICAgIH1cblxuICAgIGlmIChhZFNldCkge1xuICAgICAgYWZQYXJhbXNbJ2FmX2Fkc2V0J10gPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBhZFNldCk7XG4gICAgfVxuXG4gICAgaWYgKGRlZXBMaW5rVmFsdWUpIHtcbiAgICAgIGFmUGFyYW1zWydkZWVwX2xpbmtfdmFsdWUnXSA9IGdldFBhcmFtZXRlclZhbHVlKGN1cnJlbnRVUkxQYXJhbXMsIGRlZXBMaW5rVmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGFmU3VicyA9IFthZlN1YjEsIGFmU3ViMiwgYWZTdWIzLCBhZlN1YjQsIGFmU3ViNV07XG4gICAgYWZTdWJzLmZvckVhY2goKGFmU3ViLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGFmU3ViKSB7XG4gICAgICAgIGFmUGFyYW1zW2BhZl9zdWIke2luZGV4ICsgMX1gXSA9IGdldFBhcmFtZXRlclZhbHVlKGN1cnJlbnRVUkxQYXJhbXMsIGFmU3ViKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChnb29nbGVDbGlja0lkS2V5KSB7XG4gICAgICBpZiAoR0NMSURfRVhDTFVERV9QQVJBTVNfS0VZUy5maW5kKGsgPT4gayA9PT0gZ29vZ2xlQ2xpY2tJZEtleSkpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgICBcIkdvb2dsZSBDbGljayBJZCBQYXJhbUtleSBjYW4ndCBvdmVycmlkZSBBRiBQYXJhbWV0ZXJzIGtleXNcIixcbiAgICAgICAgICBnb29nbGVDbGlja0lkS2V5XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBnb29nbGVQYXJhbWV0ZXJzID0gZ2V0R29vZ2xlQ2xpY2tJZFBhcmFtZXRlcnMoZ29vZ2xlQ2xpY2tJZEtleSwgY3VycmVudFVSTFBhcmFtcyk7XG4gICAgICAgIE9iamVjdC5rZXlzKGdvb2dsZVBhcmFtZXRlcnMpLmZvckVhY2goZ3BrID0+IHtcbiAgICAgICAgICBhZlBhcmFtc1tncGtdID0gZ29vZ2xlUGFyYW1ldGVyc1tncGtdO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhZkN1c3RvbSkpIHtcbiAgICAgIGFmQ3VzdG9tLmZvckVhY2goY3VzdG9tUGFyYW0gPT4ge1xuICAgICAgICBpZiAoY3VzdG9tUGFyYW0/LnBhcmFtS2V5KSB7XG4gICAgICAgICAgY29uc3QgaXNPdmVycmlkZUV4aXN0aW5nS2V5ID0gQUZfQ1VTVE9NX0VYQ0xVREVfUEFSQU1TX0tFWVMuZmluZChcbiAgICAgICAgICAgIGsgPT4gayA9PT0gY3VzdG9tUGFyYW0/LnBhcmFtS2V5XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoY3VzdG9tUGFyYW0/LnBhcmFtS2V5ID09PSBnb29nbGVDbGlja0lkS2V5IHx8IGlzT3ZlcnJpZGVFeGlzdGluZ0tleSkge1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgICAgICAgXCJDdXN0b20gcGFyYW1ldGVyIFBhcmFtS2V5IGNhbid0IG92ZXJyaWRlIEdvb2dsZS1DbGljay1JZCBvciBBRiBQYXJhbWV0ZXJzIGtleXNcIixcbiAgICAgICAgICAgICAgY3VzdG9tUGFyYW1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFmUGFyYW1zW1tjdXN0b21QYXJhbS5wYXJhbUtleV1dID0gZ2V0UGFyYW1ldGVyVmFsdWUoY3VycmVudFVSTFBhcmFtcywgY3VzdG9tUGFyYW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZmluYWxQYXJhbXMgPSBzdHJpbmdpZnlQYXJhbWV0ZXJzKGFmUGFyYW1zKTtcbiAgICBjb25zdCBmaW5hbFVSTCA9IG9uZUxpbmtVUkwgKyBmaW5hbFBhcmFtcy5yZXBsYWNlKCcmJywgJz8nKTtcbiAgICBjb25zb2xlLmRlYnVnKCdHZW5lcmF0ZWQgT25lTGluayBVUkwnLCBmaW5hbFVSTCk7XG5cbiAgICB3aW5kb3cuQUZfU01BUlRfU0NSSVBULmRpc3BsYXlRckNvZGUgPSBmdW5jdGlvbiAoaHRtbElkKSB7XG4gICAgICBpZiAoIWZpbmFsVVJMKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoJ0NsaWNrVVJMIGlzIG5vdCB2YWxpZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGh0bWxJZCksIHtcbiAgICAgICAgdGV4dDogYCR7ZmluYWxVUkx9JmFmX3NzX3FyPXRydWVgXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB7IGNsaWNrVVJMOiBmaW5hbFVSTCB9O1xuICB9O1xuICB3aW5kb3cuQUZfU01BUlRfU0NSSVBUID0geyBnZW5lcmF0ZU9uZUxpbmtVUkwsIHZlcnNpb246ICcyXzFfMCcgfTtcbn0pKCk7XG4iXSwibmFtZXMiOlsiQUZfVVJMX1NDSEVNRSIsIlZBTElEX0FGX1VSTF9QQVJUU19MRU5HVEgiLCJHT09HTEVfQ0xJQ0tfSUQiLCJBU1NPQ0lBVEVEX0FEX0tFWVdPUkQiLCJBRl9LRVlXT1JEUyIsIkFGX0NVU1RPTV9FWENMVURFX1BBUkFNU19LRVlTIiwiR0NMSURfRVhDTFVERV9QQVJBTVNfS0VZUyIsInN0cmluZ2lmeVBhcmFtZXRlcnMiLCJwYXJhbWV0ZXJzIiwicGFyYW1TdHIiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwiY3VyciIsImtleSIsImNvbnNvbGUiLCJkZWJ1ZyIsImdldFBhcmFtZXRlclZhbHVlIiwiY3VycmVudFVSTFBhcmFtcyIsImNvbmZpZyIsIm92ZXJyaWRlVmFsdWVzIiwiZGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiZXJyb3IiLCJmaXJzdE1hdGNoZWRLZXkiLCJmaW5kIiwidmFsdWUiLCJnZXRVUkxQYXJhbWV0ZXJzS1YiLCJ1cmxTZWFyY2giLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZXBsYWNlIiwic3BsaXQiLCJwYXJhbSIsImt2IiwiaXNTa2lwcGVkVVJMIiwidXJsIiwic2tpcEtleXMiLCJlcnJvck1zZyIsImxvd2VyVVJMIiwidG9Mb3dlckNhc2UiLCJza2lwS2V5IiwiaW5jbHVkZXMiLCJnZXRHb29nbGVDbGlja0lkUGFyYW1ldGVycyIsImdjaUtleSIsImdjaVBhcmFtIiwicmVzdWx0Iiwia2V5d29yZFBhcmFtIiwiUVJDb2RlIiwidW5kZWZpbmVkIiwiZnJlZUdsb2JhbCIsImdsb2JhbCIsImZyZWVTZWxmIiwic2VsZiIsInJvb3QiLCJGdW5jdGlvbiIsImZyZWVFeHBvcnRzIiwiZXhwb3J0cyIsIm5vZGVUeXBlIiwiZnJlZU1vZHVsZSIsIm1vZHVsZSIsIl9RUkNvZGUiLCJRUjhiaXRCeXRlIiwiZGF0YSIsImJpbmFyeSIsInV0ZjhXaXRob3V0Qk9NIiwibW9kZSIsIlFSTW9kZSIsIk1PREVfOEJJVF9CWVRFIiwicGFyc2VkRGF0YSIsImkiLCJsIiwibGVuZ3RoIiwiYnl0ZUFycmF5IiwiY29kZSIsImNoYXJDb2RlQXQiLCJwdXNoIiwicHJvdG90eXBlIiwiY29uY2F0IiwiYXBwbHkiLCJ1bnNoaWZ0IiwiZ2V0TGVuZ3RoIiwiYnVmZmVyIiwid3JpdGUiLCJwdXQiLCJRUkNvZGVNb2RlbCIsInR5cGVOdW1iZXIiLCJlcnJvckNvcnJlY3RMZXZlbCIsIm1vZHVsZXMiLCJtb2R1bGVDb3VudCIsImRhdGFDYWNoZSIsImRhdGFMaXN0IiwiYWRkRGF0YSIsIm5ld0RhdGEiLCJpc0RhcmsiLCJyb3ciLCJjb2wiLCJFcnJvciIsImdldEV5ZSIsImJsb2NrIiwidHlwZSIsImdldE1vZHVsZUNvdW50IiwibWFrZSIsIm1ha2VJbXBsIiwiZ2V0QmVzdE1hc2tQYXR0ZXJuIiwidGVzdCIsIm1hc2tQYXR0ZXJuIiwic2V0dXBQb3NpdGlvblByb2JlUGF0dGVybiIsInNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuIiwic2V0dXBUaW1pbmdQYXR0ZXJuIiwic2V0dXBUeXBlSW5mbyIsInNldHVwVHlwZU51bWJlciIsImNyZWF0ZURhdGEiLCJtYXBEYXRhIiwicG9zTmFtZSIsInIiLCJjIiwibWluTG9zdFBvaW50IiwicGF0dGVybiIsImxvc3RQb2ludCIsIlFSVXRpbCIsImdldExvc3RQb2ludCIsImNyZWF0ZU1vdmllQ2xpcCIsInRhcmdldF9tYyIsImluc3RhbmNlX25hbWUiLCJkZXB0aCIsInFyX21jIiwiY3JlYXRlRW1wdHlNb3ZpZUNsaXAiLCJjcyIsInkiLCJ4IiwiZGFyayIsImJlZ2luRmlsbCIsIm1vdmVUbyIsImxpbmVUbyIsImVuZEZpbGwiLCJwb3MiLCJnZXRQYXR0ZXJuUG9zaXRpb24iLCJqIiwiYml0cyIsImdldEJDSFR5cGVOdW1iZXIiLCJtb2QiLCJNYXRoIiwiZmxvb3IiLCJnZXRCQ0hUeXBlSW5mbyIsImluYyIsImJpdEluZGV4IiwiYnl0ZUluZGV4IiwibWFzayIsImdldE1hc2siLCJQQUQwIiwiUEFEMSIsInJzQmxvY2tzIiwiUVJSU0Jsb2NrIiwiZ2V0UlNCbG9ja3MiLCJRUkJpdEJ1ZmZlciIsImdldExlbmd0aEluQml0cyIsInRvdGFsRGF0YUNvdW50IiwiZGF0YUNvdW50IiwicHV0Qml0IiwiY3JlYXRlQnl0ZXMiLCJvZmZzZXQiLCJtYXhEY0NvdW50IiwibWF4RWNDb3VudCIsImRjZGF0YSIsImVjZGF0YSIsImRjQ291bnQiLCJlY0NvdW50IiwidG90YWxDb3VudCIsIm1heCIsInJzUG9seSIsImdldEVycm9yQ29ycmVjdFBvbHlub21pYWwiLCJyYXdQb2x5IiwiUVJQb2x5bm9taWFsIiwibW9kUG9seSIsIm1vZEluZGV4IiwiZ2V0IiwidG90YWxDb2RlQ291bnQiLCJpbmRleCIsIk1PREVfTlVNQkVSIiwiTU9ERV9BTFBIQV9OVU0iLCJNT0RFX0tBTkpJIiwiUVJFcnJvckNvcnJlY3RMZXZlbCIsIkwiLCJNIiwiUSIsIkgiLCJRUk1hc2tQYXR0ZXJuIiwiUEFUVEVSTjAwMCIsIlBBVFRFUk4wMDEiLCJQQVRURVJOMDEwIiwiUEFUVEVSTjAxMSIsIlBBVFRFUk4xMDAiLCJQQVRURVJOMTAxIiwiUEFUVEVSTjExMCIsIlBBVFRFUk4xMTEiLCJQQVRURVJOX1BPU0lUSU9OX1RBQkxFIiwiRzE1IiwiRzE4IiwiRzE1X01BU0siLCJkIiwiZ2V0QkNIRGlnaXQiLCJkaWdpdCIsImVycm9yQ29ycmVjdExlbmd0aCIsImEiLCJtdWx0aXBseSIsIlFSTWF0aCIsImdleHAiLCJxckNvZGUiLCJzYW1lQ291bnQiLCJjb3VudCIsImRhcmtDb3VudCIsInJhdGlvIiwiYWJzIiwiZ2xvZyIsIm4iLCJMT0dfVEFCTEUiLCJFWFBfVEFCTEUiLCJudW0iLCJzaGlmdCIsImUiLCJSU19CTE9DS19UQUJMRSIsInJzQmxvY2siLCJnZXRSc0Jsb2NrVGFibGUiLCJsaXN0IiwiYnVmSW5kZXgiLCJiaXQiLCJRUkNvZGVMaW1pdExlbmd0aCIsIl9pc1N1cHBvcnRDYW52YXMiLCJDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQiLCJfZ2V0QW5kcm9pZCIsImFuZHJvaWQiLCJzQWdlbnQiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJhTWF0IiwidG9TdHJpbmciLCJtYXRjaCIsInBhcnNlRmxvYXQiLCJEcmF3aW5nIiwiZWwiLCJodE9wdGlvbiIsIl9lbCIsIl9odE9wdGlvbiIsImRyYXciLCJvUVJDb2RlIiwibkNvdW50IiwibldpZHRoIiwicm91bmQiLCJ3aWR0aCIsIm5IZWlnaHQiLCJoZWlnaHQiLCJ0aXRsZUhlaWdodCIsInF1aWV0Wm9uZSIsImFIVE1MIiwiZGl2U3R5bGUiLCJkcmF3V2lkdGgiLCJkb3RTY2FsZSIsImRyYXdIZWlnaHQiLCJub25SZXF1aXJlZENvbG9yRGFyayIsImNvbG9yRGFyayIsIm5vblJlcXVpcmVkY29sb3JMaWdodCIsImNvbG9yTGlnaHQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJhdXRvQ29sb3IiLCJiYWNrZ3JvdW5kSW1hZ2VFbGUiLCJiYWNrZ3JvdW5kSW1hZ2VBbHBoYSIsInF1aWV0Wm9uZUNvbG9yIiwidGl0bGUiLCJ0aXRsZUNvbG9yIiwiZiIsInRpdGxlRm9udCIsInRpdGxlVG9wIiwidGl0bGVCYWNrZ3JvdW5kQ29sb3IiLCJzdWJUaXRsZSIsInN1YlRpdGxlVG9wIiwic3ViVGl0bGVDb2xvciIsInN1YlRpdGxlRm9udCIsImJJc0RhcmsiLCJleWUiLCJleWVDb2xvckRhcmsiLCJzdWJzdHJpbmciLCJub3dEYXJrQ29sb3IiLCJ0aW1pbmdfSCIsInRpbWluZyIsInRpbWluZ19WIiwibG9nbyIsImltZyIsIkltYWdlIiwiY3Jvc3NPcmlnaW4iLCJzcmMiLCJpbWdXIiwiaW1nSCIsImxvZ29XaWR0aCIsImxvZ29IZWlnaHQiLCJpbWdEaXZTdHlsZSIsImxvZ29CYWNrZ3JvdW5kVHJhbnNwYXJlbnQiLCJsb2dvQmFja2dyb3VuZENvbG9yIiwib25SZW5kZXJpbmdTdGFydCIsImlubmVySFRNTCIsImpvaW4iLCJlbFRhYmxlIiwiY2hpbGROb2RlcyIsIm5MZWZ0TWFyZ2luVGFibGUiLCJvZmZzZXRXaWR0aCIsIm5Ub3BNYXJnaW5UYWJsZSIsIm9mZnNldEhlaWdodCIsInN0eWxlIiwibWFyZ2luIiwib25SZW5kZXJpbmdFbmQiLCJjbGVhciIsIl9vbk1ha2VJbWFnZSIsImRyYXdlciIsInN2Z0RhdGEiLCJfb0NvbnRleHQiLCJnZXRTZXJpYWxpemVkU3ZnIiwiZGF0YVVSTCIsIl9lbENhbnZhcyIsInRvRGF0YVVSTCIsIl9hbmRyb2lkIiwiZmFjdG9yIiwid2luZG93IiwiZGV2aWNlUGl4ZWxSYXRpbyIsImRyYXdJbWFnZSIsImltYWdlIiwic3giLCJzeSIsInN3Iiwic2giLCJkeCIsImR5IiwiZHciLCJkaCIsIm5vZGVOYW1lIiwiYXJndW1lbnRzIiwiX3NhZmVTZXREYXRhVVJJIiwiZlN1Y2Nlc3MiLCJmRmFpbCIsIl9mRmFpbCIsIl9mU3VjY2VzcyIsIl9iU3VwcG9ydERhdGFVUkkiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJmT25FcnJvciIsImNhbGwiLCJmT25TdWNjZXNzIiwib25hYm9ydCIsIm9uZXJyb3IiLCJvbmxvYWQiLCJfYklzUGFpbnRlZCIsImFwcGVuZENoaWxkIiwiZ2V0Q29udGV4dCIsIkMyUyIsImxpbmVXaWR0aCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwidCIsImRyYXdRdWlldFpvbmVDb2xvciIsImJnSW1nIiwiZ2xvYmFsQWxwaGEiLCJpbWFnZVNtb290aGluZ1F1YWxpdHkiLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJkcmF3UXJjb2RlIiwib3JpZ2luYWxTcmMiLCJuTGVmdCIsIm5Ub3AiLCJub3dEb3RTY2FsZSIsImRDb2xvciIsImxDb2xvciIsImF1dG9Db2xvckRhcmsiLCJhdXRvQ29sb3JMaWdodCIsInN0cm9rZVN0eWxlIiwiZG90U2NhbGVBTyIsImRvdFNjYWxlQUkiLCJBSSIsIkFPIiwiZG90U2NhbGVUaW1pbmdfSCIsImRvdFNjYWxlVGltaW5nX1YiLCJmb250IiwidGV4dEFsaWduIiwiZmlsbFRleHQiLCJnZW5lcmF0ZUxvZ29JbWciLCJpbWdDb250YWluZXJXIiwiaW1nQ29udGFpbmVySCIsImxvZ29NYXhXaWR0aCIsImxvZ29NYXhIZWlnaHQiLCJudyIsIm5oIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsImltZ0NvbnRhaW5lclgiLCJpbWdDb250YWluZXJZIiwiaW1nU2NhbGUiLCJtaW4iLCJfdGhpcyIsIm1ha2VJbWFnZSIsImlzUGFpbnRlZCIsImNsZWFyUmVjdCIsInJlbW92ZSIsIm5OdW1iZXIiLCJfZ2V0VHlwZU51bWJlciIsInNUZXh0IiwibkNvcnJlY3RMZXZlbCIsImNvcnJlY3RMZXZlbCIsIm5UeXBlIiwiX2dldFVURjhMZW5ndGgiLCJsZW4iLCJuTGltaXQiLCJ2ZXJzaW9uIiwicnVuVmVyc2lvbiIsIndhcm4iLCJyZXBsYWNlZFRleHQiLCJlbmNvZGVVUkkiLCJ2T3B0aW9uIiwiZG90U2NhbGVUaW1pbmciLCJkb3RTY2FsZUEiLCJQTyIsIlBJIiwiUE9fVEwiLCJQSV9UTCIsIlBPX1RSIiwiUElfVFIiLCJQT19CTCIsIlBJX0JMIiwidG9vbHRpcCIsInRleHQiLCJnZXRFbGVtZW50QnlJZCIsIl9vUVJDb2RlIiwiX2h0T3B0aW9uQ2xvbmUiLCJfb0RyYXdpbmciLCJtYWtlQ29kZSIsInJlc2l6ZSIsIm5vQ29uZmxpY3QiLCJDb3JyZWN0TGV2ZWwiLCJkZWZpbmUiLCJhbWQiLCJjbWQiLCJnZW5lcmF0ZU9uZUxpbmtVUkwiLCJhZlBhcmFtZXRlcnMiLCJvbmVMaW5rVVJMIiwibWVkaWFTb3VyY2UiLCJjYW1wYWlnbiIsImNoYW5uZWwiLCJhZCIsImFkU2V0IiwiZGVlcExpbmtWYWx1ZSIsImFmU3ViMSIsImFmU3ViMiIsImFmU3ViMyIsImFmU3ViNCIsImFmU3ViNSIsImFmQ3VzdG9tIiwiZ29vZ2xlQ2xpY2tJZEtleSIsInJlZmVycmVyU2tpcExpc3QiLCJ1cmxTa2lwTGlzdCIsIm9uZUxpbmtVUkxQYXJ0cyIsInJlZmVycmVyIiwiVVJMIiwiYWZQYXJhbXMiLCJhZl9qc193ZWIiLCJhZl9zc192ZXIiLCJBRl9TTUFSVF9TQ1JJUFQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInBpZFZhbHVlIiwiYWZTdWJzIiwiZm9yRWFjaCIsImFmU3ViIiwiayIsImdvb2dsZVBhcmFtZXRlcnMiLCJncGsiLCJjdXN0b21QYXJhbSIsInBhcmFtS2V5IiwiaXNPdmVycmlkZUV4aXN0aW5nS2V5IiwiZmluYWxQYXJhbXMiLCJmaW5hbFVSTCIsImRpc3BsYXlRckNvZGUiLCJodG1sSWQiLCJjbGlja1VSTCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFPLElBQU1BLGFBQWEsR0FBRyw2Q0FBdEI7QUFDQSxJQUFNQyx5QkFBeUIsR0FBRyxDQUFsQztBQUNBLElBQU1DLGVBQWUsR0FBRyxPQUF4QjtBQUNBLElBQU1DLHFCQUFxQixHQUFHLFNBQTlCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLGFBQXBCO0FBQ0EsSUFBTUMsNkJBQTZCLEdBQUcsQ0FDM0MsS0FEMkMsRUFFM0MsR0FGMkMsRUFHM0MsWUFIMkMsRUFJM0MsT0FKMkMsRUFLM0MsVUFMMkMsRUFNM0MsaUJBTjJDLEVBTzNDLFNBUDJDLEVBUTNDLFNBUjJDLEVBUzNDLFNBVDJDLEVBVTNDLFNBVjJDLEVBVzNDLFNB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QUosQ0FMc0IsRUFNdEIsQ0FBQyxDQUFELEVBQUksRUFBSixDQU5zQixFQU90QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQVBzQixFQVF0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQVJzQixFQVN0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQVRzQixFQVV0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQVZzQixFQVd0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQVhzQixFQVl0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQVpzQixFQWF0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQWJzQixFQWN0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosQ0Fkc0IsRUFldEIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLENBZnNCLEVBZ0J0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosQ0FoQnNCLEVBaUJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosQ0FqQnNCLEVBa0J0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosQ0FsQnNCLEVBbUJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosQ0FuQnNCLEVBb0J0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosQ0FwQnNCLEVBcUJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsQ0FyQnNCLEVBc0J0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsQ0F0QnNCLEVBdUJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsQ0F2QnNCLEVBd0J0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsQ0F4QnNCLEVBeUJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsQ0F6QnNCLEVBMEJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsQ0ExQnNCLEVBMkJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsQ0EzQnNCLEVBNEJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0E1QnNCLEVBNkJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0E3QnNCLEVBOEJ0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0E5QnNCLEVBK0J0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0EvQnNCLEVBZ0N0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0FoQ3NCLEVBaUN0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0FqQ3NCLEVBa0N0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0FsQ3NCLEVBbUN0QixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIs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RUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBdEl5QixFQXVJekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBdkl5QixFQXdJekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBeEl5QixFQXlJekIsQ0FBQyxFQUFELEVBQUssR0FBTCxFQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBekl5QixFQTBJekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBMUl5QixFQTJJekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBM0l5QixFQTRJekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBNUl5QixFQTZJekIsQ0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEdBQVQsRUFBYyxFQUFkLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBN0l5QixFQThJekIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBOUl5QixFQStJekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBL0l5QixFQWdKekIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBaEp5QixFQWlKekIsQ0FBQyxFQUFELEVBQUssR0FBTCxFQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXVC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