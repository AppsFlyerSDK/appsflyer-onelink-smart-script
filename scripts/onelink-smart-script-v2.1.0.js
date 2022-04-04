/**
 * AF Smart Script (Build 2.0.2)
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
  /** Node.js global 检测. */

  var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
  /** `self` 变量检测. */

  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  /** 全局对象检测. */

  var root = freeGlobal || freeSelf || Function('return this')();
  /** `exports` 变量检测. */

  var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
  /** `module` 变量检测. */

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
    version: '2'
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25lbGluay1zbWFydC1zY3JpcHQtdjIuMC4yLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnRzL3NtYXJ0U2NyaXB0LmpzIiwiLi4vc3JjL3V0aWxzL3NtYXJ0U2NyaXB0LmpzIiwiLi4vc3JjL3NlcnZpY2VzL3NtYXJ0U2NyaXB0LmpzIiwiLi4vc3JjL3FyL3FyLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBRl9VUkxfU0NIRU1FID0gJyhodHRwczpcXFxcL1xcXFwvKSgoW15cXFxcLl1bXlxcXFwuXSspLikoLipcXFxcLykoLiopJztcbmV4cG9ydCBjb25zdCBWQUxJRF9BRl9VUkxfUEFSVFNfTEVOR1RIID0gNTtcbmV4cG9ydCBjb25zdCBHT09HTEVfQ0xJQ0tfSUQgPSAnZ2NsaWQnO1xuZXhwb3J0IGNvbnN0IEFTU09DSUFURURfQURfS0VZV09SRCA9ICdrZXl3b3JkJztcbmV4cG9ydCBjb25zdCBBRl9LRVlXT1JEUyA9ICdhZl9rZXl3b3Jkcyc7XG5leHBvcnQgY29uc3QgQUZfQ1VTVE9NX0VYQ0xVREVfUEFSQU1TX0tFWVMgPSBbXG4gICdwaWQnLFxuICAnYycsXG4gICdhZl9jaGFubmVsJyxcbiAgJ2FmX2FkJyxcbiAgJ2FmX2Fkc2V0JyxcbiAgJ2RlZXBfbGlua192YWx1ZScsXG4gICdhZl9zdWIxJyxcbiAgJ2FmX3N1YjInLFxuICAnYWZfc3ViMycsXG4gICdhZl9zdWI0JyxcbiAgJ2FmX3N1YjUnXG5dO1xuZXhwb3J0IGNvbnN0IEdDTElEX0VYQ0xVREVfUEFSQU1TX0tFWVMgPSBbXG4gICdwaWQnLFxuICAnYycsXG4gICdhZl9jaGFubmVsJyxcbiAgJ2FmX2FkJyxcbiAgJ2FmX2Fkc2V0JyxcbiAgJ2RlZXBfbGlua192YWx1ZSdcbl07XG4iLCJjb25zdCBzdHJpbmdpZnlQYXJhbWV0ZXJzID0gKHBhcmFtZXRlcnMgPSB7fSkgPT4ge1xuICBjb25zdCBwYXJhbVN0ciA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLnJlZHVjZSgoY3Vyciwga2V5KSA9PiB7XG4gICAgaWYgKHBhcmFtZXRlcnNba2V5XSkge1xuICAgICAgY3VyciArPSBgJiR7a2V5fT0ke3BhcmFtZXRlcnNba2V5XX1gO1xuICAgIH1cbiAgICByZXR1cm4gY3VycjtcbiAgfSwgJycpO1xuICBjb25zb2xlLmRlYnVnKCdHZW5lcmF0ZWQgT25lTGluayBwYXJhbWV0ZXJzJywgcGFyYW1TdHIpO1xuICByZXR1cm4gcGFyYW1TdHI7XG59O1xuXG5jb25zdCBnZXRQYXJhbWV0ZXJWYWx1ZSA9IChcbiAgY3VycmVudFVSTFBhcmFtcyxcbiAgY29uZmlnID0geyBrZXlzOiBbXSwgb3ZlcnJpZGVWYWx1ZXM6IHt9LCBkZWZhdWx0VmFsdWU6ICcnIH1cbikgPT4ge1xuICAvL2V4aXQgd2hlbiBjb25maWcgb2JqZWN0IHN0cnVjdHVyZSBpcyBub3QgdmFsaWRcbiAgaWYgKCEoKGNvbmZpZz8ua2V5cyAmJiBBcnJheS5pc0FycmF5KGNvbmZpZy5rZXlzKSkgfHwgY29uZmlnPy5kZWZhdWx0VmFsdWUpKSB7XG4gICAgY29uc29sZS5lcnJvcignUGFyYW1ldGVyIGNvbmZpZyBzdHJ1Y3R1cmUgaXMgd3JvbmcnLCBjb25maWcpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgeyBrZXlzID0gW10sIG92ZXJyaWRlVmFsdWVzID0ge30sIGRlZmF1bHRWYWx1ZSA9ICcnIH0gPSBjb25maWc7XG5cbiAgY29uc3QgZmlyc3RNYXRjaGVkS2V5ID0ga2V5cy5maW5kKGtleSA9PiB7XG4gICAgLy9zZXQgdGhlIGZpcnN0IG1hdGNoIG9mIGtleSB3aGljaCBjb250YWlucyBhbHNvIGEgdmFsdWVcbiAgICByZXR1cm4gISFjdXJyZW50VVJMUGFyYW1zW2tleV07XG4gIH0pO1xuXG4gIGlmIChmaXJzdE1hdGNoZWRLZXkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRVUkxQYXJhbXNbZmlyc3RNYXRjaGVkS2V5XTtcbiAgICAvL2luIGNhc2UgdGhlIHZhbHVlIGV4aXN0czpcbiAgICAvL2NoZWNrIGlmIGl0IGV4aXN0cyBpbiB0aGUgb3ZlcnJpZGVWYWx1ZXMgb2JqZWN0LCB3aGVuIGV4aXN0cyAtIHJlcGxhY2UgaXRcbiAgICAvL290aGVyd2lzZSByZXR1cm4gZGVmYXVsdCB2YWx1ZVxuICAgIHJldHVybiBvdmVycmlkZVZhbHVlc1t2YWx1ZV0gfHwgdmFsdWUgfHwgZGVmYXVsdFZhbHVlO1xuICB9XG4gIHJldHVybiBkZWZhdWx0VmFsdWU7XG59O1xuXG5jb25zdCBnZXRVUkxQYXJhbWV0ZXJzS1YgPSB1cmxTZWFyY2ggPT4ge1xuICBjb25zdCBjdXJyZW50VVJMUGFyYW1zID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybFNlYXJjaClcbiAgICAucmVwbGFjZSgnPycsICcnKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLnJlZHVjZSgoY3VyciwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGt2ID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgIGlmICghIWt2WzBdICYmICEha3ZbMV0pIHtcbiAgICAgICAgY3Vycltba3ZbMF1dXSA9IGt2WzFdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnI7XG4gICAgfSwge30pO1xuICBjb25zb2xlLmRlYnVnKCdHZW5lcmF0ZWQgY3VycmVudCBwYXJhbWV0ZXJzIG9iamVjdCcsIGN1cnJlbnRVUkxQYXJhbXMpO1xuICByZXR1cm4gY3VycmVudFVSTFBhcmFtcztcbn07XG5cbmV4cG9ydCB7IHN0cmluZ2lmeVBhcmFtZXRlcnMsIGdldFBhcmFtZXRlclZhbHVlLCBnZXRVUkxQYXJhbWV0ZXJzS1YgfTtcbiIsImltcG9ydCB7IEdPT0dMRV9DTElDS19JRCwgQVNTT0NJQVRFRF9BRF9LRVlXT1JELCBBRl9LRVlXT1JEUyB9IGZyb20gJy4uL2NvbnN0YW50cy9zbWFydFNjcmlwdCc7XG5cbmNvbnN0IGlzU2tpcHBlZFVSTCA9ICh7IHVybCwgc2tpcEtleXMsIGVycm9yTXNnIH0pID0+IHtcbiAgLy8gc2VhcmNoIGlmIHRoaXMgcGFnZSByZWZlcnJlZCBhbmQgY29udGFpbnMgb25lIG9mIHRoZSBnaXZlbiBrZXlzXG4gIGlmICh1cmwpIHtcbiAgICBjb25zdCBsb3dlclVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh1cmwudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKGxvd2VyVVJMKSB7XG4gICAgICBjb25zdCBza2lwS2V5ID0gc2tpcEtleXMuZmluZChrZXkgPT4gbG93ZXJVUkwuaW5jbHVkZXMoa2V5LnRvTG93ZXJDYXNlKCkpKTtcbiAgICAgICEhc2tpcEtleSAmJiBjb25zb2xlLmRlYnVnKGVycm9yTXNnLCBza2lwS2V5KTtcbiAgICAgIHJldHVybiAhIXNraXBLZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGdldEFGSW1wcmVzc2lvblVSTCA9IChvbmVMaW5rUGFydHMsIGZpbmFsUGFyYW1zKSA9PiB7XG4gIC8vd2UgdGFrZSB0aGUgZG9tYWluWzRdIGFuZCBvbmVsaW5rIGlkWzVdIGZyb20gb25lTGluayBVUkxcbiAgcmV0dXJuIGBodHRwczovL2ltcHJlc3Npb25zLiR7b25lTGlua1BhcnRzWzRdfSR7b25lTGlua1BhcnRzWzVdfT8ke2ZpbmFsUGFyYW1zfWA7XG59O1xuXG5jb25zdCBnZXRHb29nbGVDbGlja0lkUGFyYW1ldGVycyA9IChnY2lLZXksIGN1cnJlbnRVUkxQYXJhbXMpID0+IHtcbiAgY29uc3QgZ2NpUGFyYW0gPSBjdXJyZW50VVJMUGFyYW1zW0dPT0dMRV9DTElDS19JRF07XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBpZiAoZ2NpUGFyYW0pIHtcbiAgICBjb25zb2xlLmRlYnVnKCdUaGlzIHVzZXIgY29tZXMgZnJvbSBHb29nbGUgQWRXb3JkcycpO1xuICAgIHJlc3VsdFtnY2lLZXldID0gZ2NpUGFyYW07XG4gICAgY29uc3Qga2V5d29yZFBhcmFtID0gY3VycmVudFVSTFBhcmFtc1tBU1NPQ0lBVEVEX0FEX0tFWVdPUkRdO1xuICAgIGlmIChrZXl3b3JkUGFyYW0pIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoJ1RoZXJlIGlzIGEga2V5d29yZCBhc3NvY2lhdGVkIHdpdGggdGhlIGFkJyk7XG4gICAgICByZXN1bHRbQUZfS0VZV09SRFNdID0ga2V5d29yZFBhcmFtO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmRlYnVnKCdUaGlzIHVzZXIgY29tZXMgZnJvbSBTUk4gb3IgY3VzdG9tIG5ldHdvcmsnKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IHsgaXNTa2lwcGVkVVJMLCBnZXRBRkltcHJlc3Npb25VUkwsIGdldEdvb2dsZUNsaWNrSWRQYXJhbWV0ZXJzIH07XG4iLCIvKipcbiAqIEVhc3lRUkNvZGVKU1xuICpcbiAqIENyb3NzLWJyb3dzZXIgUVJDb2RlIGdlbmVyYXRvciBmb3IgcHVyZSBqYXZhc2NyaXB0LiBTdXBwb3J0IENhbnZhcywgU1ZHIGFuZCBUYWJsZSBkcmF3aW5nIG1ldGhvZHMuIFN1cHBvcnQgRG90IHN0eWxlLCBMb2dvLCBCYWNrZ3JvdW5kIGltYWdlLCBDb2xvcmZ1bCwgVGl0bGUgZXRjLiBzZXR0aW5ncy4gU3VwcG9ydCBBbmd1bGFyLCBWdWUuanMsIFJlYWN0LCBOZXh0LmpzLCBTdmVsdGUgZnJhbWV3b3JrLiBTdXBwb3J0IGJpbmFyeShoZXgpIGRhdGEgbW9kZS4oUnVubmluZyB3aXRoIERPTSBvbiBjbGllbnQgc2lkZSlcbiAqXG4gKiBWZXJzaW9uIDQuNC4xMFxuICpcbiAqIEBhdXRob3IgWyBpbnRoaW5rY29sb3JAZ21haWwuY29tIF1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91c2hlbHAvRWFzeVFSQ29kZUpTXG4gKiBAc2VlIGh0dHA6Ly93d3cuZWFzeXByb2plY3QuY24vZWFzeXFyY29kZWpzL3RyeWl0Lmh0bWxcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3VzaGVscC9FYXN5UVJDb2RlSlMtTm9kZUpTXG4gKlxuICogQ29weXJpZ2h0IDIwMTcgUmF5LCBFYXN5UHJvamVjdFxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogW1N1cHBvcnQgQU1ELCBDTUQsIENvbW1vbkpTL05vZGUuanNdXG4gKlxuICovXG5mdW5jdGlvbiBRUkNvZGUoKSB7XG4gIC8vIOWQr+eUqOS4peagvOaooeW8j1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8g6Ieq5a6a5LmJ5bGA6YOoIHVuZGVmaW5lZCDlj5jph49cbiAgdmFyIHVuZGVmaW5lZDtcblxuICAvKiogTm9kZS5qcyBnbG9iYWwg5qOA5rWLLiAqL1xuICB2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbiAgLyoqIGBzZWxmYCDlj5jph4/mo4DmtYsuICovXG4gIHZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4gIC8qKiDlhajlsYDlr7nosaHmo4DmtYsuICovXG4gIHZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4gIC8qKiBgZXhwb3J0c2Ag5Y+Y6YeP5qOA5rWLLiAqL1xuICB2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbiAgLyoqIGBtb2R1bGVgIOWPmOmHj+ajgOa1iy4gKi9cbiAgdmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuICB2YXIgX1FSQ29kZSA9IHJvb3QuUVJDb2RlO1xuXG4gIHZhciBRUkNvZGU7XG5cbiAgZnVuY3Rpb24gUVI4Yml0Qnl0ZShkYXRhLCBiaW5hcnksIHV0ZjhXaXRob3V0Qk9NKSB7XG4gICAgdGhpcy5tb2RlID0gUVJNb2RlLk1PREVfOEJJVF9CWVRFO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5wYXJzZWREYXRhID0gW107XG5cbiAgICAvLyBBZGRlZCB0byBzdXBwb3J0IFVURi04IENoYXJhY3RlcnNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgICAgIHZhciBjb2RlID0gdGhpcy5kYXRhLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIGlmIChiaW5hcnkpIHtcbiAgICAgICAgYnl0ZUFycmF5WzBdID0gY29kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb2RlID4gMHgxMDAwMCkge1xuICAgICAgICAgIGJ5dGVBcnJheVswXSA9IDB4ZjAgfCAoKGNvZGUgJiAweDFjMDAwMCkgPj4+IDE4KTtcbiAgICAgICAgICBieXRlQXJyYXlbMV0gPSAweDgwIHwgKChjb2RlICYgMHgzZjAwMCkgPj4+IDEyKTtcbiAgICAgICAgICBieXRlQXJyYXlbMl0gPSAweDgwIHwgKChjb2RlICYgMHhmYzApID4+PiA2KTtcbiAgICAgICAgICBieXRlQXJyYXlbM10gPSAweDgwIHwgKGNvZGUgJiAweDNmKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID4gMHg4MDApIHtcbiAgICAgICAgICBieXRlQXJyYXlbMF0gPSAweGUwIHwgKChjb2RlICYgMHhmMDAwKSA+Pj4gMTIpO1xuICAgICAgICAgIGJ5dGVBcnJheVsxXSA9IDB4ODAgfCAoKGNvZGUgJiAweGZjMCkgPj4+IDYpO1xuICAgICAgICAgIGJ5dGVBcnJheVsyXSA9IDB4ODAgfCAoY29kZSAmIDB4M2YpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPiAweDgwKSB7XG4gICAgICAgICAgYnl0ZUFycmF5WzBdID0gMHhjMCB8ICgoY29kZSAmIDB4N2MwKSA+Pj4gNik7XG4gICAgICAgICAgYnl0ZUFycmF5WzFdID0gMHg4MCB8IChjb2RlICYgMHgzZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnl0ZUFycmF5WzBdID0gY29kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnBhcnNlZERhdGEucHVzaChieXRlQXJyYXkpO1xuICAgIH1cblxuICAgIHRoaXMucGFyc2VkRGF0YSA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHRoaXMucGFyc2VkRGF0YSk7XG4gICAgaWYgKCF1dGY4V2l0aG91dEJPTSAmJiB0aGlzLnBhcnNlZERhdGEubGVuZ3RoICE9IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMucGFyc2VkRGF0YS51bnNoaWZ0KDE5MSk7XG4gICAgICB0aGlzLnBhcnNlZERhdGEudW5zaGlmdCgxODcpO1xuICAgICAgdGhpcy5wYXJzZWREYXRhLnVuc2hpZnQoMjM5KTtcbiAgICB9XG4gIH1cblxuICBRUjhiaXRCeXRlLnByb3RvdHlwZSA9IHtcbiAgICBnZXRMZW5ndGg6IGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlZERhdGEubGVuZ3RoO1xuICAgIH0sXG4gICAgd3JpdGU6IGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5wYXJzZWREYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBidWZmZXIucHV0KHRoaXMucGFyc2VkRGF0YVtpXSwgOCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIFFSQ29kZU1vZGVsKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgdGhpcy50eXBlTnVtYmVyID0gdHlwZU51bWJlcjtcbiAgICB0aGlzLmVycm9yQ29ycmVjdExldmVsID0gZXJyb3JDb3JyZWN0TGV2ZWw7XG4gICAgdGhpcy5tb2R1bGVzID0gbnVsbDtcbiAgICB0aGlzLm1vZHVsZUNvdW50ID0gMDtcbiAgICB0aGlzLmRhdGFDYWNoZSA9IG51bGw7XG4gICAgdGhpcy5kYXRhTGlzdCA9IFtdO1xuICB9XG5cbiAgUVJDb2RlTW9kZWwucHJvdG90eXBlID0ge1xuICAgIGFkZERhdGE6IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnksIHV0ZjhXaXRob3V0Qk9NKSB7XG4gICAgICB2YXIgbmV3RGF0YSA9IG5ldyBRUjhiaXRCeXRlKGRhdGEsIGJpbmFyeSwgdXRmOFdpdGhvdXRCT00pO1xuICAgICAgdGhpcy5kYXRhTGlzdC5wdXNoKG5ld0RhdGEpO1xuICAgICAgdGhpcy5kYXRhQ2FjaGUgPSBudWxsO1xuICAgIH0sXG4gICAgaXNEYXJrOiBmdW5jdGlvbiAocm93LCBjb2wpIHtcbiAgICAgIGlmIChyb3cgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gcm93IHx8IGNvbCA8IDAgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSBjb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJvdyArICcsJyArIGNvbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5tb2R1bGVzW3Jvd11bY29sXVswXTtcbiAgICB9LFxuICAgIGdldEV5ZTogZnVuY3Rpb24gKHJvdywgY29sKSB7XG4gICAgICBpZiAocm93IDwgMCB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IHJvdyB8fCBjb2wgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyb3cgKyAnLCcgKyBjb2wpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYmxvY2sgPSB0aGlzLm1vZHVsZXNbcm93XVtjb2xdOyAvLyBbaXNEYXJrKHR1cmUvZmFsc2UpLCBFeWVPdXRlck9ySW5uZXIoTy9JKSwgUG9zaXRpb24oVEwvVFIvQkwvQSkgXVxuXG4gICAgICBpZiAoYmxvY2tbMV0pIHtcbiAgICAgICAgdmFyIHR5cGUgPSAnUCcgKyBibG9ja1sxXSArICdfJyArIGJsb2NrWzJdOyAvL1BPX1RMLCBQSV9UTCwgUE9fVFIsIFBJX1RSLCBQT19CTCwgUElfQkxcbiAgICAgICAgaWYgKGJsb2NrWzJdID09ICdBJykge1xuICAgICAgICAgIHR5cGUgPSAnQScgKyBibG9ja1sxXTsgLy8gQUksIEFPXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlzRGFyazogYmxvY2tbMF0sXG4gICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRNb2R1bGVDb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kdWxlQ291bnQ7XG4gICAgfSxcbiAgICBtYWtlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLm1ha2VJbXBsKGZhbHNlLCB0aGlzLmdldEJlc3RNYXNrUGF0dGVybigpKTtcbiAgICB9LFxuICAgIG1ha2VJbXBsOiBmdW5jdGlvbiAodGVzdCwgbWFza1BhdHRlcm4pIHtcbiAgICAgIHRoaXMubW9kdWxlQ291bnQgPSB0aGlzLnR5cGVOdW1iZXIgKiA0ICsgMTc7XG4gICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgQXJyYXkodGhpcy5tb2R1bGVDb3VudCk7XG4gICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCB0aGlzLm1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICB0aGlzLm1vZHVsZXNbcm93XSA9IG5ldyBBcnJheSh0aGlzLm1vZHVsZUNvdW50KTtcbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgdGhpcy5tb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93XVtjb2xdID0gW107IC8vIFtpc0RhcmsodHVyZS9mYWxzZSksIEV5ZU91dGVyT3JJbm5lcihPL0kpLCBQb3NpdGlvbihUTC9UUi9CTCkgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwgMCwgJ1RMJyk7IC8vIFRvcExlZnQsIFRMXG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4odGhpcy5tb2R1bGVDb3VudCAtIDcsIDAsICdCTCcpOyAvLyBCb3Rvb21MZWZ0LCBCTFxuICAgICAgdGhpcy5zZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuKDAsIHRoaXMubW9kdWxlQ291bnQgLSA3LCAnVFInKTsgLy8gVG9wUmlnaHQsIFRSXG4gICAgICB0aGlzLnNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuKCdBJyk7IC8vIEFsaWdubWVudCwgQVxuICAgICAgdGhpcy5zZXR1cFRpbWluZ1BhdHRlcm4oKTtcbiAgICAgIHRoaXMuc2V0dXBUeXBlSW5mbyh0ZXN0LCBtYXNrUGF0dGVybik7XG4gICAgICBpZiAodGhpcy50eXBlTnVtYmVyID49IDcpIHtcbiAgICAgICAgdGhpcy5zZXR1cFR5cGVOdW1iZXIodGVzdCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kYXRhQ2FjaGUgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRhdGFDYWNoZSA9IFFSQ29kZU1vZGVsLmNyZWF0ZURhdGEoXG4gICAgICAgICAgdGhpcy50eXBlTnVtYmVyLFxuICAgICAgICAgIHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwsXG4gICAgICAgICAgdGhpcy5kYXRhTGlzdFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5tYXBEYXRhKHRoaXMuZGF0YUNhY2hlLCBtYXNrUGF0dGVybik7XG4gICAgfSxcbiAgICBzZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuOiBmdW5jdGlvbiAocm93LCBjb2wsIHBvc05hbWUpIHtcbiAgICAgIGZvciAodmFyIHIgPSAtMTsgciA8PSA3OyByKyspIHtcbiAgICAgICAgaWYgKHJvdyArIHIgPD0gLTEgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSByb3cgKyByKSBjb250aW51ZTtcbiAgICAgICAgZm9yICh2YXIgYyA9IC0xOyBjIDw9IDc7IGMrKykge1xuICAgICAgICAgIGlmIChjb2wgKyBjIDw9IC0xIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gY29sICsgYykgY29udGludWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKDAgPD0gciAmJiByIDw9IDYgJiYgKGMgPT0gMCB8fCBjID09IDYpKSB8fFxuICAgICAgICAgICAgKDAgPD0gYyAmJiBjIDw9IDYgJiYgKHIgPT0gMCB8fCByID09IDYpKSB8fFxuICAgICAgICAgICAgKDIgPD0gciAmJiByIDw9IDQgJiYgMiA8PSBjICYmIGMgPD0gNClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVswXSA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVsyXSA9IHBvc05hbWU7IC8vIFBvc2l0aW9uXG4gICAgICAgICAgICBpZiAociA9PSAtMCB8fCBjID09IC0wIHx8IHIgPT0gNiB8fCBjID09IDYpIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdWzFdID0gJ08nOyAvLyBQb3NpdGlvbiBPdXRlclxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdWzFdID0gJ0knOyAvLyBQb3NpdGlvbiBJbm5lclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY11bMF0gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEJlc3RNYXNrUGF0dGVybjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG1pbkxvc3RQb2ludCA9IDA7XG4gICAgICB2YXIgcGF0dGVybiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICB0aGlzLm1ha2VJbXBsKHRydWUsIGkpO1xuICAgICAgICB2YXIgbG9zdFBvaW50ID0gUVJVdGlsLmdldExvc3RQb2ludCh0aGlzKTtcbiAgICAgICAgaWYgKGkgPT0gMCB8fCBtaW5Mb3N0UG9pbnQgPiBsb3N0UG9pbnQpIHtcbiAgICAgICAgICBtaW5Mb3N0UG9pbnQgPSBsb3N0UG9pbnQ7XG4gICAgICAgICAgcGF0dGVybiA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH0sXG4gICAgY3JlYXRlTW92aWVDbGlwOiBmdW5jdGlvbiAodGFyZ2V0X21jLCBpbnN0YW5jZV9uYW1lLCBkZXB0aCkge1xuICAgICAgdmFyIHFyX21jID0gdGFyZ2V0X21jLmNyZWF0ZUVtcHR5TW92aWVDbGlwKGluc3RhbmNlX25hbWUsIGRlcHRoKTtcbiAgICAgIHZhciBjcyA9IDE7XG4gICAgICB0aGlzLm1ha2UoKTtcbiAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IHJvdysrKSB7XG4gICAgICAgIHZhciB5ID0gcm93ICogY3M7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHRoaXMubW9kdWxlc1tyb3ddLmxlbmd0aDsgY29sKyspIHtcbiAgICAgICAgICB2YXIgeCA9IGNvbCAqIGNzO1xuICAgICAgICAgIHZhciBkYXJrID0gdGhpcy5tb2R1bGVzW3Jvd11bY29sXVswXTtcbiAgICAgICAgICBpZiAoZGFyaykge1xuICAgICAgICAgICAgcXJfbWMuYmVnaW5GaWxsKDAsIDEwMCk7XG4gICAgICAgICAgICBxcl9tYy5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICBxcl9tYy5saW5lVG8oeCArIGNzLCB5KTtcbiAgICAgICAgICAgIHFyX21jLmxpbmVUbyh4ICsgY3MsIHkgKyBjcyk7XG4gICAgICAgICAgICBxcl9tYy5saW5lVG8oeCwgeSArIGNzKTtcbiAgICAgICAgICAgIHFyX21jLmVuZEZpbGwoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBxcl9tYztcbiAgICB9LFxuICAgIHNldHVwVGltaW5nUGF0dGVybjogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgciA9IDg7IHIgPCB0aGlzLm1vZHVsZUNvdW50IC0gODsgcisrKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcl1bNl1bMF0gIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kdWxlc1tyXVs2XVswXSA9IHIgJSAyID09IDA7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBjID0gODsgYyA8IHRoaXMubW9kdWxlQ291bnQgLSA4OyBjKyspIHtcbiAgICAgICAgaWYgKHRoaXMubW9kdWxlc1s2XVtjXVswXSAhPSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2R1bGVzWzZdW2NdWzBdID0gYyAlIDIgPT0gMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuOiBmdW5jdGlvbiAocG9zTmFtZSkge1xuICAgICAgdmFyIHBvcyA9IFFSVXRpbC5nZXRQYXR0ZXJuUG9zaXRpb24odGhpcy50eXBlTnVtYmVyKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIHJvdyA9IHBvc1tpXTtcbiAgICAgICAgICB2YXIgY29sID0gcG9zW2pdO1xuICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2xdWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciByID0gLTI7IHIgPD0gMjsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gLTI7IGMgPD0gMjsgYysrKSB7XG4gICAgICAgICAgICAgIGlmIChyID09IC0yIHx8IHIgPT0gMiB8fCBjID09IC0yIHx8IGMgPT0gMiB8fCAociA9PSAwICYmIGMgPT0gMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY11bMF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVsyXSA9IHBvc05hbWU7IC8vIFBvc2l0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHIgPT0gLTIgfHwgYyA9PSAtMiB8fCByID09IDIgfHwgYyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY11bMV0gPSAnTyc7IC8vIFBvc2l0aW9uIE91dGVyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXVsxXSA9ICdJJzsgLy8gUG9zaXRpb24gSW5uZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdWzBdID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHNldHVwVHlwZU51bWJlcjogZnVuY3Rpb24gKHRlc3QpIHtcbiAgICAgIHZhciBiaXRzID0gUVJVdGlsLmdldEJDSFR5cGVOdW1iZXIodGhpcy50eXBlTnVtYmVyKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgICAgdGhpcy5tb2R1bGVzW01hdGguZmxvb3IoaSAvIDMpXVsoaSAlIDMpICsgdGhpcy5tb2R1bGVDb3VudCAtIDggLSAzXVswXSA9IG1vZDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgICAgdGhpcy5tb2R1bGVzWyhpICUgMykgKyB0aGlzLm1vZHVsZUNvdW50IC0gOCAtIDNdW01hdGguZmxvb3IoaSAvIDMpXVswXSA9IG1vZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldHVwVHlwZUluZm86IGZ1bmN0aW9uICh0ZXN0LCBtYXNrUGF0dGVybikge1xuICAgICAgdmFyIGRhdGEgPSAodGhpcy5lcnJvckNvcnJlY3RMZXZlbCA8PCAzKSB8IG1hc2tQYXR0ZXJuO1xuICAgICAgdmFyIGJpdHMgPSBRUlV0aWwuZ2V0QkNIVHlwZUluZm8oZGF0YSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgIGlmIChpIDwgNikge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1tpXVs4XVswXSA9IG1vZDtcbiAgICAgICAgfSBlbHNlIGlmIChpIDwgOCkge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1tpICsgMV1bOF1bMF0gPSBtb2Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2R1bGVzW3RoaXMubW9kdWxlQ291bnQgLSAxNSArIGldWzhdWzBdID0gbW9kO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgIGlmIChpIDwgOCkge1xuICAgICAgICAgIHRoaXMubW9kdWxlc1s4XVt0aGlzLm1vZHVsZUNvdW50IC0gaSAtIDFdWzBdID0gbW9kO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPCA5KSB7XG4gICAgICAgICAgdGhpcy5tb2R1bGVzWzhdWzE1IC0gaSAtIDEgKyAxXVswXSA9IG1vZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vZHVsZXNbOF1bMTUgLSBpIC0gMV1bMF0gPSBtb2Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubW9kdWxlc1t0aGlzLm1vZHVsZUNvdW50IC0gOF1bOF1bMF0gPSAhdGVzdDtcbiAgICB9LFxuICAgIG1hcERhdGE6IGZ1bmN0aW9uIChkYXRhLCBtYXNrUGF0dGVybikge1xuICAgICAgdmFyIGluYyA9IC0xO1xuICAgICAgdmFyIHJvdyA9IHRoaXMubW9kdWxlQ291bnQgLSAxO1xuICAgICAgdmFyIGJpdEluZGV4ID0gNztcbiAgICAgIHZhciBieXRlSW5kZXggPSAwO1xuICAgICAgZm9yICh2YXIgY29sID0gdGhpcy5tb2R1bGVDb3VudCAtIDE7IGNvbCA+IDA7IGNvbCAtPSAyKSB7XG4gICAgICAgIGlmIChjb2wgPT0gNikgY29sLS07XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCAyOyBjKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2wgLSBjXVswXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHZhciBkYXJrID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChieXRlSW5kZXggPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRhcmsgPSAoKGRhdGFbYnl0ZUluZGV4XSA+Pj4gYml0SW5kZXgpICYgMSkgPT0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgbWFzayA9IFFSVXRpbC5nZXRNYXNrKG1hc2tQYXR0ZXJuLCByb3csIGNvbCAtIGMpO1xuICAgICAgICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgICAgIGRhcmsgPSAhZGFyaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93XVtjb2wgLSBjXVswXSA9IGRhcms7XG4gICAgICAgICAgICAgIGJpdEluZGV4LS07XG4gICAgICAgICAgICAgIGlmIChiaXRJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIGJ5dGVJbmRleCsrO1xuICAgICAgICAgICAgICAgIGJpdEluZGV4ID0gNztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByb3cgKz0gaW5jO1xuICAgICAgICAgIGlmIChyb3cgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gcm93KSB7XG4gICAgICAgICAgICByb3cgLT0gaW5jO1xuICAgICAgICAgICAgaW5jID0gLWluYztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgUVJDb2RlTW9kZWwuUEFEMCA9IDB4ZWM7XG4gIFFSQ29kZU1vZGVsLlBBRDEgPSAweDExO1xuICBRUkNvZGVNb2RlbC5jcmVhdGVEYXRhID0gZnVuY3Rpb24gKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsLCBkYXRhTGlzdCkge1xuICAgIHZhciByc0Jsb2NrcyA9IFFSUlNCbG9jay5nZXRSU0Jsb2Nrcyh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCk7XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBRUkJpdEJ1ZmZlcigpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkYXRhID0gZGF0YUxpc3RbaV07XG4gICAgICBidWZmZXIucHV0KGRhdGEubW9kZSwgNCk7XG4gICAgICBidWZmZXIucHV0KGRhdGEuZ2V0TGVuZ3RoKCksIFFSVXRpbC5nZXRMZW5ndGhJbkJpdHMoZGF0YS5tb2RlLCB0eXBlTnVtYmVyKSk7XG4gICAgICBkYXRhLndyaXRlKGJ1ZmZlcik7XG4gICAgfVxuICAgIHZhciB0b3RhbERhdGFDb3VudCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByc0Jsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxEYXRhQ291bnQgKz0gcnNCbG9ja3NbaV0uZGF0YUNvdW50O1xuICAgIH1cbiAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID4gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdjb2RlIGxlbmd0aCBvdmVyZmxvdy4gKCcgKyBidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgKyAnPicgKyB0b3RhbERhdGFDb3VudCAqIDggKyAnKSdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgKyA0IDw9IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgYnVmZmVyLnB1dCgwLCA0KTtcbiAgICB9XG4gICAgd2hpbGUgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSAlIDggIT0gMCkge1xuICAgICAgYnVmZmVyLnB1dEJpdChmYWxzZSk7XG4gICAgfVxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXQoUVJDb2RlTW9kZWwuUEFEMCwgOCk7XG4gICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXQoUVJDb2RlTW9kZWwuUEFEMSwgOCk7XG4gICAgfVxuICAgIHJldHVybiBRUkNvZGVNb2RlbC5jcmVhdGVCeXRlcyhidWZmZXIsIHJzQmxvY2tzKTtcbiAgfTtcbiAgUVJDb2RlTW9kZWwuY3JlYXRlQnl0ZXMgPSBmdW5jdGlvbiAoYnVmZmVyLCByc0Jsb2Nrcykge1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciBtYXhEY0NvdW50ID0gMDtcbiAgICB2YXIgbWF4RWNDb3VudCA9IDA7XG4gICAgdmFyIGRjZGF0YSA9IG5ldyBBcnJheShyc0Jsb2Nrcy5sZW5ndGgpO1xuICAgIHZhciBlY2RhdGEgPSBuZXcgQXJyYXkocnNCbG9ja3MubGVuZ3RoKTtcbiAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XG4gICAgICB2YXIgZGNDb3VudCA9IHJzQmxvY2tzW3JdLmRhdGFDb3VudDtcbiAgICAgIHZhciBlY0NvdW50ID0gcnNCbG9ja3Nbcl0udG90YWxDb3VudCAtIGRjQ291bnQ7XG4gICAgICBtYXhEY0NvdW50ID0gTWF0aC5tYXgobWF4RGNDb3VudCwgZGNDb3VudCk7XG4gICAgICBtYXhFY0NvdW50ID0gTWF0aC5tYXgobWF4RWNDb3VudCwgZWNDb3VudCk7XG4gICAgICBkY2RhdGFbcl0gPSBuZXcgQXJyYXkoZGNDb3VudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRjZGF0YVtyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkY2RhdGFbcl1baV0gPSAweGZmICYgYnVmZmVyLmJ1ZmZlcltpICsgb2Zmc2V0XTtcbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBkY0NvdW50O1xuICAgICAgdmFyIHJzUG9seSA9IFFSVXRpbC5nZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsKGVjQ291bnQpO1xuICAgICAgdmFyIHJhd1BvbHkgPSBuZXcgUVJQb2x5bm9taWFsKGRjZGF0YVtyXSwgcnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG4gICAgICB2YXIgbW9kUG9seSA9IHJhd1BvbHkubW9kKHJzUG9seSk7XG4gICAgICBlY2RhdGFbcl0gPSBuZXcgQXJyYXkocnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVjZGF0YVtyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbW9kSW5kZXggPSBpICsgbW9kUG9seS5nZXRMZW5ndGgoKSAtIGVjZGF0YVtyXS5sZW5ndGg7XG4gICAgICAgIGVjZGF0YVtyXVtpXSA9IG1vZEluZGV4ID49IDAgPyBtb2RQb2x5LmdldChtb2RJbmRleCkgOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdG90YWxDb2RlQ291bnQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnNCbG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsQ29kZUNvdW50ICs9IHJzQmxvY2tzW2ldLnRvdGFsQ291bnQ7XG4gICAgfVxuICAgIHZhciBkYXRhID0gbmV3IEFycmF5KHRvdGFsQ29kZUNvdW50KTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RGNDb3VudDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XG4gICAgICAgIGlmIChpIDwgZGNkYXRhW3JdLmxlbmd0aCkge1xuICAgICAgICAgIGRhdGFbaW5kZXgrK10gPSBkY2RhdGFbcl1baV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhFY0NvdW50OyBpKyspIHtcbiAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByKyspIHtcbiAgICAgICAgaWYgKGkgPCBlY2RhdGFbcl0ubGVuZ3RoKSB7XG4gICAgICAgICAgZGF0YVtpbmRleCsrXSA9IGVjZGF0YVtyXVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcbiAgdmFyIFFSTW9kZSA9IHtcbiAgICBNT0RFX05VTUJFUjogMSA8PCAwLFxuICAgIE1PREVfQUxQSEFfTlVNOiAxIDw8IDEsXG4gICAgTU9ERV84QklUX0JZVEU6IDEgPDwgMixcbiAgICBNT0RFX0tBTkpJOiAxIDw8IDNcbiAgfTtcbiAgdmFyIFFSRXJyb3JDb3JyZWN0TGV2ZWwgPSB7XG4gICAgTDogMSxcbiAgICBNOiAwLFxuICAgIFE6IDMsXG4gICAgSDogMlxuICB9O1xuICB2YXIgUVJNYXNrUGF0dGVybiA9IHtcbiAgICBQQVRURVJOMDAwOiAwLFxuICAgIFBBVFRFUk4wMDE6IDEsXG4gICAgUEFUVEVSTjAxMDogMixcbiAgICBQQVRURVJOMDExOiAzLFxuICAgIFBBVFRFUk4xMDA6IDQsXG4gICAgUEFUVEVSTjEwMTogNSxcbiAgICBQQVRURVJOMTEwOiA2LFxuICAgIFBBVFRFUk4xMTE6IDdcbiAgfTtcbiAgdmFyIFFSVXRpbCA9IHtcbiAgICBQQVRURVJOX1BPU0lUSU9OX1RBQkxFOiBbXG4gICAgICBbXSxcbiAgICAgIFs2LCAxOF0sXG4gICAgICBbNiwgMjJdLFxuICAgICAgWzYsIDI2XSxcbiAgICAgIFs2LCAzMF0sXG4gICAgICBbNiwgMzRdLFxuICAgICAgWzYsIDIyLCAzOF0sXG4gICAgICBbNiwgMjQsIDQyXSxcbiAgICAgIFs2LCAyNiwgNDZdLFxuICAgICAgWzYsIDI4LCA1MF0sXG4gICAgICBbNiwgMzAsIDU0XSxcbiAgICAgIFs2LCAzMiwgNThdLFxuICAgICAgWzYsIDM0LCA2Ml0sXG4gICAgICBbNiwgMjYsIDQ2LCA2Nl0sXG4gICAgICBbNiwgMjYsIDQ4LCA3MF0sXG4gICAgICBbNiwgMjYsIDUwLCA3NF0sXG4gICAgICBbNiwgMzAsIDU0LCA3OF0sXG4gICAgICBbNiwgMzAsIDU2LCA4Ml0sXG4gICAgICBbNiwgMzAsIDU4LCA4Nl0sXG4gICAgICBbNiwgMzQsIDYyLCA5MF0sXG4gICAgICBbNiwgMjgsIDUwLCA3MiwgOTRdLFxuICAgICAgWzYsIDI2LCA1MCwgNzQsIDk4XSxcbiAgICAgIFs2LCAzMCwgNTQsIDc4LCAxMDJdLFxuICAgICAgWzYsIDI4LCA1NCwgODAsIDEwNl0sXG4gICAgICBbNiwgMzIsIDU4LCA4NCwgMTEwXSxcbiAgICAgIFs2LCAzMCwgNTgsIDg2LCAxMTRdLFxuICAgICAgWzYsIDM0LCA2MiwgOTAsIDExOF0sXG4gICAgICBbNiwgMjYsIDUwLCA3NCwgOTgsIDEyMl0sXG4gICAgICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjZdLFxuICAgICAgWzYsIDI2LCA1MiwgNzgsIDEwNCwgMTMwXSxcbiAgICAgIFs2LCAzMCwgNTYsIDgyLCAxMDgsIDEzNF0sXG4gICAgICBbNiwgMzQsIDYwLCA4NiwgMTEyLCAxMzhdLFxuICAgICAgWzYsIDMwLCA1OCwgODYsIDExNCwgMTQyXSxcbiAgICAgIFs2LCAzNCwgNjIsIDkwLCAxMTgsIDE0Nl0sXG4gICAgICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjYsIDE1MF0sXG4gICAgICBbNiwgMjQsIDUwLCA3NiwgMTAyLCAxMjgsIDE1NF0sXG4gICAgICBbNiwgMjgsIDU0LCA4MCwgMTA2LCAxMzIsIDE1OF0sXG4gICAgICBbNiwgMzIsIDU4LCA4NCwgMTEwLCAxMzYsIDE2Ml0sXG4gICAgICBbNiwgMjYsIDU0LCA4MiwgMTEwLCAxMzgsIDE2Nl0sXG4gICAgICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDIsIDE3MF1cbiAgICBdLFxuICAgIEcxNTogKDEgPDwgMTApIHwgKDEgPDwgOCkgfCAoMSA8PCA1KSB8ICgxIDw8IDQpIHwgKDEgPDwgMikgfCAoMSA8PCAxKSB8ICgxIDw8IDApLFxuICAgIEcxODogKDEgPDwgMTIpIHwgKDEgPDwgMTEpIHwgKDEgPDwgMTApIHwgKDEgPDwgOSkgfCAoMSA8PCA4KSB8ICgxIDw8IDUpIHwgKDEgPDwgMikgfCAoMSA8PCAwKSxcbiAgICBHMTVfTUFTSzogKDEgPDwgMTQpIHwgKDEgPDwgMTIpIHwgKDEgPDwgMTApIHwgKDEgPDwgNCkgfCAoMSA8PCAxKSxcbiAgICBnZXRCQ0hUeXBlSW5mbzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBkID0gZGF0YSA8PCAxMDtcbiAgICAgIHdoaWxlIChRUlV0aWwuZ2V0QkNIRGlnaXQoZCkgLSBRUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxNSkgPj0gMCkge1xuICAgICAgICBkIF49IFFSVXRpbC5HMTUgPDwgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE1KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChkYXRhIDw8IDEwKSB8IGQpIF4gUVJVdGlsLkcxNV9NQVNLO1xuICAgIH0sXG4gICAgZ2V0QkNIVHlwZU51bWJlcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBkID0gZGF0YSA8PCAxMjtcbiAgICAgIHdoaWxlIChRUlV0aWwuZ2V0QkNIRGlnaXQoZCkgLSBRUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxOCkgPj0gMCkge1xuICAgICAgICBkIF49IFFSVXRpbC5HMTggPDwgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE4KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGRhdGEgPDwgMTIpIHwgZDtcbiAgICB9LFxuICAgIGdldEJDSERpZ2l0OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIGRpZ2l0ID0gMDtcbiAgICAgIHdoaWxlIChkYXRhICE9IDApIHtcbiAgICAgICAgZGlnaXQrKztcbiAgICAgICAgZGF0YSA+Pj49IDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGlnaXQ7XG4gICAgfSxcbiAgICBnZXRQYXR0ZXJuUG9zaXRpb246IGZ1bmN0aW9uICh0eXBlTnVtYmVyKSB7XG4gICAgICByZXR1cm4gUVJVdGlsLlBBVFRFUk5fUE9TSVRJT05fVEFCTEVbdHlwZU51bWJlciAtIDFdO1xuICAgIH0sXG4gICAgZ2V0TWFzazogZnVuY3Rpb24gKG1hc2tQYXR0ZXJuLCBpLCBqKSB7XG4gICAgICBzd2l0Y2ggKG1hc2tQYXR0ZXJuKSB7XG4gICAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMDAwOlxuICAgICAgICAgIHJldHVybiAoaSArIGopICUgMiA9PSAwO1xuICAgICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAwMTpcbiAgICAgICAgICByZXR1cm4gaSAlIDIgPT0gMDtcbiAgICAgICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTA6XG4gICAgICAgICAgcmV0dXJuIGogJSAzID09IDA7XG4gICAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMDExOlxuICAgICAgICAgIHJldHVybiAoaSArIGopICUgMyA9PSAwO1xuICAgICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMDpcbiAgICAgICAgICByZXR1cm4gKE1hdGguZmxvb3IoaSAvIDIpICsgTWF0aC5mbG9vcihqIC8gMykpICUgMiA9PSAwO1xuICAgICAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMTpcbiAgICAgICAgICByZXR1cm4gKChpICogaikgJSAyKSArICgoaSAqIGopICUgMykgPT0gMDtcbiAgICAgICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMTA6XG4gICAgICAgICAgcmV0dXJuICgoKGkgKiBqKSAlIDIpICsgKChpICogaikgJSAzKSkgJSAyID09IDA7XG4gICAgICAgIGNhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMTExOlxuICAgICAgICAgIHJldHVybiAoKChpICogaikgJSAzKSArICgoaSArIGopICUgMikpICUgMiA9PSAwO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIG1hc2tQYXR0ZXJuOicgKyBtYXNrUGF0dGVybik7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsOiBmdW5jdGlvbiAoZXJyb3JDb3JyZWN0TGVuZ3RoKSB7XG4gICAgICB2YXIgYSA9IG5ldyBRUlBvbHlub21pYWwoWzFdLCAwKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXJyb3JDb3JyZWN0TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYSA9IGEubXVsdGlwbHkobmV3IFFSUG9seW5vbWlhbChbMSwgUVJNYXRoLmdleHAoaSldLCAwKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYTtcbiAgICB9LFxuICAgIGdldExlbmd0aEluQml0czogZnVuY3Rpb24gKG1vZGUsIHR5cGUpIHtcbiAgICAgIGlmICgxIDw9IHR5cGUgJiYgdHlwZSA8IDEwKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEU6XG4gICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJOlxuICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kZTonICsgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA8IDI3KSB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFOlxuICAgICAgICAgICAgcmV0dXJuIDE2O1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkk6XG4gICAgICAgICAgICByZXR1cm4gMTA7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kZTonICsgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA8IDQxKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgcmV0dXJuIDE0O1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgcmV0dXJuIDEzO1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFOlxuICAgICAgICAgICAgcmV0dXJuIDE2O1xuICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkk6XG4gICAgICAgICAgICByZXR1cm4gMTI7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kZTonICsgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHlwZTonICsgdHlwZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRMb3N0UG9pbnQ6IGZ1bmN0aW9uIChxckNvZGUpIHtcbiAgICAgIHZhciBtb2R1bGVDb3VudCA9IHFyQ29kZS5nZXRNb2R1bGVDb3VudCgpO1xuICAgICAgdmFyIGxvc3RQb2ludCA9IDA7XG4gICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgdmFyIHNhbWVDb3VudCA9IDA7XG4gICAgICAgICAgdmFyIGRhcmsgPSBxckNvZGUuaXNEYXJrKHJvdywgY29sKTtcbiAgICAgICAgICBmb3IgKHZhciByID0gLTE7IHIgPD0gMTsgcisrKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgciA8IDAgfHwgbW9kdWxlQ291bnQgPD0gcm93ICsgcikge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAtMTsgYyA8PSAxOyBjKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNvbCArIGMgPCAwIHx8IG1vZHVsZUNvdW50IDw9IGNvbCArIGMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAociA9PSAwICYmIGMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChkYXJrID09IHFyQ29kZS5pc0Rhcmsocm93ICsgciwgY29sICsgYykpIHtcbiAgICAgICAgICAgICAgICBzYW1lQ291bnQrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2FtZUNvdW50ID4gNSkge1xuICAgICAgICAgICAgbG9zdFBvaW50ICs9IDMgKyBzYW1lQ291bnQgLSA1O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQgLSAxOyByb3crKykge1xuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDE7IGNvbCsrKSB7XG4gICAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCkpIGNvdW50Kys7XG4gICAgICAgICAgaWYgKHFyQ29kZS5pc0Rhcmsocm93ICsgMSwgY29sKSkgY291bnQrKztcbiAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDEpKSBjb3VudCsrO1xuICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdyArIDEsIGNvbCArIDEpKSBjb3VudCsrO1xuICAgICAgICAgIGlmIChjb3VudCA9PSAwIHx8IGNvdW50ID09IDQpIHtcbiAgICAgICAgICAgIGxvc3RQb2ludCArPSAzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdysrKSB7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50IC0gNjsgY29sKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdywgY29sKSAmJlxuICAgICAgICAgICAgIXFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyAxKSAmJlxuICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDIpICYmXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdywgY29sICsgMykgJiZcbiAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyA0KSAmJlxuICAgICAgICAgICAgIXFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyA1KSAmJlxuICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDYpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBsb3N0UG9pbnQgKz0gNDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQgLSA2OyByb3crKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93LCBjb2wpICYmXG4gICAgICAgICAgICAhcXJDb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wpICYmXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdyArIDIsIGNvbCkgJiZcbiAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93ICsgMywgY29sKSAmJlxuICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3cgKyA0LCBjb2wpICYmXG4gICAgICAgICAgICAhcXJDb2RlLmlzRGFyayhyb3cgKyA1LCBjb2wpICYmXG4gICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdyArIDYsIGNvbClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxvc3RQb2ludCArPSA0MDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBkYXJrQ291bnQgPSAwO1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdywgY29sKSkge1xuICAgICAgICAgICAgZGFya0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgcmF0aW8gPSBNYXRoLmFicygoMTAwICogZGFya0NvdW50KSAvIG1vZHVsZUNvdW50IC8gbW9kdWxlQ291bnQgLSA1MCkgLyA1O1xuICAgICAgbG9zdFBvaW50ICs9IHJhdGlvICogMTA7XG4gICAgICByZXR1cm4gbG9zdFBvaW50O1xuICAgIH1cbiAgfTtcbiAgdmFyIFFSTWF0aCA9IHtcbiAgICBnbG9nOiBmdW5jdGlvbiAobikge1xuICAgICAgaWYgKG4gPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2xvZygnICsgbiArICcpJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUVJNYXRoLkxPR19UQUJMRVtuXTtcbiAgICB9LFxuICAgIGdleHA6IGZ1bmN0aW9uIChuKSB7XG4gICAgICB3aGlsZSAobiA8IDApIHtcbiAgICAgICAgbiArPSAyNTU7XG4gICAgICB9XG4gICAgICB3aGlsZSAobiA+PSAyNTYpIHtcbiAgICAgICAgbiAtPSAyNTU7XG4gICAgICB9XG4gICAgICByZXR1cm4gUVJNYXRoLkVYUF9UQUJMRVtuXTtcbiAgICB9LFxuICAgIEVYUF9UQUJMRTogbmV3IEFycmF5KDI1NiksXG4gICAgTE9HX1RBQkxFOiBuZXcgQXJyYXkoMjU2KVxuICB9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIFFSTWF0aC5FWFBfVEFCTEVbaV0gPSAxIDw8IGk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDg7IGkgPCAyNTY7IGkrKykge1xuICAgIFFSTWF0aC5FWFBfVEFCTEVbaV0gPVxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNF0gXlxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNV0gXlxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNl0gXlxuICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gOF07XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTU7IGkrKykge1xuICAgIFFSTWF0aC5MT0dfVEFCTEVbUVJNYXRoLkVYUF9UQUJMRVtpXV0gPSBpO1xuICB9XG5cbiAgZnVuY3Rpb24gUVJQb2x5bm9taWFsKG51bSwgc2hpZnQpIHtcbiAgICBpZiAobnVtLmxlbmd0aCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihudW0ubGVuZ3RoICsgJy8nICsgc2hpZnQpO1xuICAgIH1cbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB3aGlsZSAob2Zmc2V0IDwgbnVtLmxlbmd0aCAmJiBudW1bb2Zmc2V0XSA9PSAwKSB7XG4gICAgICBvZmZzZXQrKztcbiAgICB9XG4gICAgdGhpcy5udW0gPSBuZXcgQXJyYXkobnVtLmxlbmd0aCAtIG9mZnNldCArIHNoaWZ0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bS5sZW5ndGggLSBvZmZzZXQ7IGkrKykge1xuICAgICAgdGhpcy5udW1baV0gPSBudW1baSArIG9mZnNldF07XG4gICAgfVxuICB9XG4gIFFSUG9seW5vbWlhbC5wcm90b3R5cGUgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHJldHVybiB0aGlzLm51bVtpbmRleF07XG4gICAgfSxcbiAgICBnZXRMZW5ndGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm51bS5sZW5ndGg7XG4gICAgfSxcbiAgICBtdWx0aXBseTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKSArIGUuZ2V0TGVuZ3RoKCkgLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZS5nZXRMZW5ndGgoKTsgaisrKSB7XG4gICAgICAgICAgbnVtW2kgKyBqXSBePSBRUk1hdGguZ2V4cChRUk1hdGguZ2xvZyh0aGlzLmdldChpKSkgKyBRUk1hdGguZ2xvZyhlLmdldChqKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFFSUG9seW5vbWlhbChudW0sIDApO1xuICAgIH0sXG4gICAgbW9kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKHRoaXMuZ2V0TGVuZ3RoKCkgLSBlLmdldExlbmd0aCgpIDwgMCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHZhciByYXRpbyA9IFFSTWF0aC5nbG9nKHRoaXMuZ2V0KDApKSAtIFFSTWF0aC5nbG9nKGUuZ2V0KDApKTtcbiAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgICBudW1baV0gPSB0aGlzLmdldChpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIG51bVtpXSBePSBRUk1hdGguZ2V4cChRUk1hdGguZ2xvZyhlLmdldChpKSkgKyByYXRpbyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFFSUG9seW5vbWlhbChudW0sIDApLm1vZChlKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gUVJSU0Jsb2NrKHRvdGFsQ291bnQsIGRhdGFDb3VudCkge1xuICAgIHRoaXMudG90YWxDb3VudCA9IHRvdGFsQ291bnQ7XG4gICAgdGhpcy5kYXRhQ291bnQgPSBkYXRhQ291bnQ7XG4gIH1cbiAgUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFID0gW1xuICAgIFsxLCAyNiwgMTldLFxuICAgIFsxLCAyNiwgMTZdLFxuICAgIFsxLCAyNiwgMTNdLFxuICAgIFsxLCAyNiwgOV0sXG4gICAgWzEsIDQ0LCAzNF0sXG4gICAgWzEsIDQ0LCAyOF0sXG4gICAgWzEsIDQ0LCAyMl0sXG4gICAgWzEsIDQ0LCAxNl0sXG4gICAgWzEsIDcwLCA1NV0sXG4gICAgWzEsIDcwLCA0NF0sXG4gICAgWzIsIDM1LCAxN10sXG4gICAgWzIsIDM1LCAxM10sXG4gICAgWzEsIDEwMCwgODBdLFxuICAgIFsyLCA1MCwgMzJdLFxuICAgIFsyLCA1MCwgMjRdLFxuICAgIFs0LCAyNSwgOV0sXG4gICAgWzEsIDEzNCwgMTA4XSxcbiAgICBbMiwgNjcsIDQzXSxcbiAgICBbMiwgMzMsIDE1LCAyLCAzNCwgMTZdLFxuICAgIFsyLCAzMywgMTEsIDIsIDM0LCAxMl0sXG4gICAgWzIsIDg2LCA2OF0sXG4gICAgWzQsIDQzLCAyN10sXG4gICAgWzQsIDQzLCAxOV0sXG4gICAgWzQsIDQzLCAxNV0sXG4gICAgWzIsIDk4LCA3OF0sXG4gICAgWzQsIDQ5LCAzMV0sXG4gICAgWzIsIDMyLCAxNCwgNCwgMzMsIDE1XSxcbiAgICBbNCwgMzksIDEzLCAxLCA0MCwgMTRdLFxuICAgIFsyLCAxMjEsIDk3XSxcbiAgICBbMiwgNjAsIDM4LCAyLCA2MSwgMzldLFxuICAgIFs0LCA0MCwgMTgsIDIsIDQxLCAxOV0sXG4gICAgWzQsIDQwLCAxNCwgMiwgNDEsIDE1XSxcbiAgICBbMiwgMTQ2LCAxMTZdLFxuICAgIFszLCA1OCwgMzYsIDIsIDU5LCAzN10sXG4gICAgWzQsIDM2LCAxNiwgNCwgMzcsIDE3XSxcbiAgICBbNCwgMzYsIDEyLCA0LCAzNywgMTNdLFxuICAgIFsyLCA4NiwgNjgsIDIsIDg3LCA2OV0sXG4gICAgWzQsIDY5LCA0MywgMSwgNzAsIDQ0XSxcbiAgICBbNiwgNDMsIDE5LCAyLCA0NCwgMjBdLFxuICAgIFs2LCA0MywgMTUsIDIsIDQ0LCAxNl0sXG4gICAgWzQsIDEwMSwgODFdLFxuICAgIFsxLCA4MCwgNTAsIDQsIDgxLCA1MV0sXG4gICAgWzQsIDUwLCAyMiwgNCwgNTEsIDIzXSxcbiAgICBbMywgMzYsIDEyLCA4LCAzNywgMTNdLFxuICAgIFsyLCAxMTYsIDkyLCAyLCAxMTcsIDkzXSxcbiAgICBbNiwgNTgsIDM2LCAyLCA1OSwgMzddLFxuICAgIFs0LCA0NiwgMjAsIDYsIDQ3LCAyMV0sXG4gICAgWzcsIDQyLCAxNCwgNCwgNDMsIDE1XSxcbiAgICBbNCwgMTMzLCAxMDddLFxuICAgIFs4LCA1OSwgMzcsIDEsIDYwLCAzOF0sXG4gICAgWzgsIDQ0LCAyMCwgNCwgNDUsIDIxXSxcbiAgICBbMTIsIDMzLCAxMSwgNCwgMzQsIDEyXSxcbiAgICBbMywgMTQ1LCAxMTUsIDEsIDE0NiwgMTE2XSxcbiAgICBbNCwgNjQsIDQwLCA1LCA2NSwgNDFdLFxuICAgIFsxMSwgMzYsIDE2LCA1LCAzNywgMTddLFxuICAgIFsxMSwgMzYsIDEyLCA1LCAzNywgMTNdLFxuICAgIFs1LCAxMDksIDg3LCAxLCAxMTAsIDg4XSxcbiAgICBbNSwgNjUsIDQxLCA1LCA2NiwgNDJdLFxuICAgIFs1LCA1NCwgMjQsIDcsIDU1LCAyNV0sXG4gICAgWzExLCAzNiwgMTIsIDcsIDM3LCAxM10sXG4gICAgWzUsIDEyMiwgOTgsIDEsIDEyMywgOTldLFxuICAgIFs3LCA3MywgNDUsIDMsIDc0LCA0Nl0sXG4gICAgWzE1LCA0MywgMTksIDIsIDQ0LCAyMF0sXG4gICAgWzMsIDQ1LCAxNSwgMTMsIDQ2LCAxNl0sXG4gICAgWzEsIDEzNSwgMTA3LCA1LCAxMzYsIDEwOF0sXG4gICAgWzEwLCA3NCwgNDYsIDEsIDc1LCA0N10sXG4gICAgWzEsIDUwLCAyMiwgMTUsIDUxLCAyM10sXG4gICAgWzIsIDQyLCAxNCwgMTcsIDQzLCAxNV0sXG4gICAgWzUsIDE1MCwgMTIwLCAxLCAxNTEsIDEyMV0sXG4gICAgWzksIDY5LCA0MywgNCwgNzAsIDQ0XSxcbiAgICBbMTcsIDUwLCAyMiwgMSwgNTEsIDIzXSxcbiAgICBbMiwgNDIsIDE0LCAxOSwgNDMsIDE1XSxcbiAgICBbMywgMTQxLCAxMTMsIDQsIDE0MiwgMTE0XSxcbiAgICBbMywgNzAsIDQ0LCAxMSwgNzEsIDQ1XSxcbiAgICBbMTcsIDQ3LCAyMSwgNCwgNDgsIDIyXSxcbiAgICBbOSwgMzksIDEzLCAxNiwgNDAsIDE0XSxcbiAgICBbMywgMTM1LCAxMDcsIDUsIDEzNiwgMTA4XSxcbiAgICBbMywgNjcsIDQxLCAxMywgNjgsIDQyXSxcbiAgICBbMTUsIDU0LCAyNCwgNSwgNTUsIDI1XSxcbiAgICBbMTUsIDQzLCAxNSwgMTAsIDQ0LCAxNl0sXG4gICAgWzQsIDE0NCwgMTE2LCA0LCAxNDUsIDExN10sXG4gICAgWzE3LCA2OCwgNDJdLFxuICAgIFsxNywgNTAsIDIyLCA2LCA1MSwgMjNdLFxuICAgIFsxOSwgNDYsIDE2LCA2LCA0NywgMTddLFxuICAgIFsyLCAxMzksIDExMSwgNywgMTQwLCAxMTJdLFxuICAgIFsxNywgNzQsIDQ2XSxcbiAgICBbNywgNTQsIDI0LCAxNiwgNTUsIDI1XSxcbiAgICBbMzQsIDM3LCAxM10sXG4gICAgWzQsIDE1MSwgMTIxLCA1LCAxNTIsIDEyMl0sXG4gICAgWzQsIDc1LCA0NywgMTQsIDc2LCA0OF0sXG4gICAgWzExLCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgIFsxNiwgNDUsIDE1LCAxNCwgNDYsIDE2XSxcbiAgICBbNiwgMTQ3LCAxMTcsIDQsIDE0OCwgMTE4XSxcbiAgICBbNiwgNzMsIDQ1LCAxNCwgNzQsIDQ2XSxcbiAgICBbMTEsIDU0LCAyNCwgMTYsIDU1LCAyNV0sXG4gICAgWzMwLCA0NiwgMTYsIDIsIDQ3LCAxN10sXG4gICAgWzgsIDEzMiwgMTA2LCA0LCAxMzMsIDEwN10sXG4gICAgWzgsIDc1LCA0NywgMTMsIDc2LCA0OF0sXG4gICAgWzcsIDU0LCAyNCwgMjIsIDU1LCAyNV0sXG4gICAgWzIyLCA0NSwgMTUsIDEzLCA0NiwgMTZdLFxuICAgIFsxMCwgMTQyLCAxMTQsIDIsIDE0MywgMTE1XSxcbiAgICBbMTksIDc0LCA0NiwgNCwgNzUsIDQ3XSxcbiAgICBbMjgsIDUwLCAyMiwgNiwgNTEsIDIzXSxcbiAgICBbMzMsIDQ2LCAxNiwgNCwgNDcsIDE3XSxcbiAgICBbOCwgMTUyLCAxMjIsIDQsIDE1MywgMTIzXSxcbiAgICBbMjIsIDczLCA0NSwgMywgNzQsIDQ2XSxcbiAgICBbOCwgNTMsIDIzLCAyNiwgNTQsIDI0XSxcbiAgICBbMTIsIDQ1LCAxNSwgMjgsIDQ2LCAxNl0sXG4gICAgWzMsIDE0NywgMTE3LCAxMCwgMTQ4LCAxMThdLFxuICAgIFszLCA3MywgNDUsIDIzLCA3NCwgNDZdLFxuICAgIFs0LCA1NCwgMjQsIDMxLCA1NSwgMjVdLFxuICAgIFsxMSwgNDUsIDE1LCAzMSwgNDYsIDE2XSxcbiAgICBbNywgMTQ2LCAxMTYsIDcsIDE0NywgMTE3XSxcbiAgICBbMjEsIDczLCA0NSwgNywgNzQsIDQ2XSxcbiAgICBbMSwgNTMsIDIzLCAzNywgNTQsIDI0XSxcbiAgICBbMTksIDQ1LCAxNSwgMjYsIDQ2LCAxNl0sXG4gICAgWzUsIDE0NSwgMTE1LCAxMCwgMTQ2LCAxMTZdLFxuICAgIFsxOSwgNzUsIDQ3LCAxMCwgNzYsIDQ4XSxcbiAgICBbMTUsIDU0LCAyNCwgMjUsIDU1LCAyNV0sXG4gICAgWzIzLCA0NSwgMTUsIDI1LCA0NiwgMTZdLFxuICAgIFsxMywgMTQ1LCAxMTUsIDMsIDE0NiwgMTE2XSxcbiAgICBbMiwgNzQsIDQ2LCAyOSwgNzUsIDQ3XSxcbiAgICBbNDIsIDU0LCAyNCwgMSwgNTUsIDI1XSxcbiAgICBbMjMsIDQ1LCAxNSwgMjgsIDQ2LCAxNl0sXG4gICAgWzE3LCAxNDUsIDExNV0sXG4gICAgWzEwLCA3NCwgNDYsIDIzLCA3NSwgNDddLFxuICAgIFsxMCwgNTQsIDI0LCAzNSwgNTUsIDI1XSxcbiAgICBbMTksIDQ1LCAxNSwgMzUsIDQ2LCAxNl0sXG4gICAgWzE3LCAxNDUsIDExNSwgMSwgMTQ2LCAxMTZdLFxuICAgIFsxNCwgNzQsIDQ2LCAyMSwgNzUsIDQ3XSxcbiAgICBbMjksIDU0LCAyNCwgMTksIDU1LCAyNV0sXG4gICAgWzExLCA0NSwgMTUsIDQ2LCA0NiwgMTZdLFxuICAgIFsxMywgMTQ1LCAxMTUsIDYsIDE0NiwgMTE2XSxcbiAgICBbMTQsIDc0LCA0NiwgMjMsIDc1LCA0N10sXG4gICAgWzQ0LCA1NCwgMjQsIDcsIDU1LCAyNV0sXG4gICAgWzU5LCA0NiwgMTYsIDEsIDQ3LCAxN10sXG4gICAgWzEyLCAxNTEsIDEyMSwgNywgMTUyLCAxMjJdLFxuICAgIFsxMiwgNzUsIDQ3LCAyNiwgNzYsIDQ4XSxcbiAgICBbMzksIDU0LCAyNCwgMTQsIDU1LCAyNV0sXG4gICAgWzIyLCA0NSwgMTUsIDQxLCA0NiwgMTZdLFxuICAgIFs2LCAxNTEsIDEyMSwgMTQsIDE1MiwgMTIyXSxcbiAgICBbNiwgNzUsIDQ3LCAzNCwgNzYsIDQ4XSxcbiAgICBbNDYsIDU0LCAyNCwgMTAsIDU1LCAyNV0sXG4gICAgWzIsIDQ1LCAxNSwgNjQsIDQ2LCAxNl0sXG4gICAgWzE3LCAxNTIsIDEyMiwgNCwgMTUzLCAxMjNdLFxuICAgIFsyOSwgNzQsIDQ2LCAxNCwgNzUsIDQ3XSxcbiAgICBbNDksIDU0LCAyNCwgMTAsIDU1LCAyNV0sXG4gICAgWzI0LCA0NSwgMTUsIDQ2LCA0NiwgMTZdLFxuICAgIFs0LCAxNTIsIDEyMiwgMTgsIDE1MywgMTIzXSxcbiAgICBbMTMsIDc0LCA0NiwgMzIsIDc1LCA0N10sXG4gICAgWzQ4LCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgIFs0MiwgNDUsIDE1LCAzMiwgNDYsIDE2XSxcbiAgICBbMjAsIDE0NywgMTE3LCA0LCAxNDgsIDExOF0sXG4gICAgWzQwLCA3NSwgNDcsIDcsIDc2LCA0OF0sXG4gICAgWzQzLCA1NCwgMjQsIDIyLCA1NSwgMjVdLFxuICAgIFsxMCwgNDUsIDE1LCA2NywgNDYsIDE2XSxcbiAgICBbMTksIDE0OCwgMTE4LCA2LCAxNDksIDExOV0sXG4gICAgWzE4LCA3NSwgNDcsIDMxLCA3NiwgNDhdLFxuICAgIFszNCwgNTQsIDI0LCAzNCwgNTUsIDI1XSxcbiAgICBbMjAsIDQ1LCAxNSwgNjEsIDQ2LCAxNl1cbiAgXTtcbiAgUVJSU0Jsb2NrLmdldFJTQmxvY2tzID0gZnVuY3Rpb24gKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgdmFyIHJzQmxvY2sgPSBRUlJTQmxvY2suZ2V0UnNCbG9ja1RhYmxlKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKTtcbiAgICBpZiAocnNCbG9jayA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2JhZCBycyBibG9jayBAIHR5cGVOdW1iZXI6JyArIHR5cGVOdW1iZXIgKyAnL2Vycm9yQ29ycmVjdExldmVsOicgKyBlcnJvckNvcnJlY3RMZXZlbFxuICAgICAgKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHJzQmxvY2subGVuZ3RoIC8gMztcbiAgICB2YXIgbGlzdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAwXTtcbiAgICAgIHZhciB0b3RhbENvdW50ID0gcnNCbG9ja1tpICogMyArIDFdO1xuICAgICAgdmFyIGRhdGFDb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAyXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICBsaXN0LnB1c2gobmV3IFFSUlNCbG9jayh0b3RhbENvdW50LCBkYXRhQ291bnQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH07XG4gIFFSUlNCbG9jay5nZXRSc0Jsb2NrVGFibGUgPSBmdW5jdGlvbiAodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0TGV2ZWwpIHtcbiAgICBzd2l0Y2ggKGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuTDpcbiAgICAgICAgcmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDBdO1xuICAgICAgY2FzZSBRUkVycm9yQ29ycmVjdExldmVsLk06XG4gICAgICAgIHJldHVybiBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXIgLSAxKSAqIDQgKyAxXTtcbiAgICAgIGNhc2UgUVJFcnJvckNvcnJlY3RMZXZlbC5ROlxuICAgICAgICByZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMl07XG4gICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSDpcbiAgICAgICAgcmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDNdO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gUVJCaXRCdWZmZXIoKSB7XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH1cbiAgUVJCaXRCdWZmZXIucHJvdG90eXBlID0ge1xuICAgIGdldDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICB2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gOCk7XG4gICAgICByZXR1cm4gKCh0aGlzLmJ1ZmZlcltidWZJbmRleF0gPj4+ICg3IC0gKGluZGV4ICUgOCkpKSAmIDEpID09IDE7XG4gICAgfSxcbiAgICBwdXQ6IGZ1bmN0aW9uIChudW0sIGxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnB1dEJpdCgoKG51bSA+Pj4gKGxlbmd0aCAtIGkgLSAxKSkgJiAxKSA9PSAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldExlbmd0aEluQml0czogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICAgIH0sXG4gICAgcHV0Qml0OiBmdW5jdGlvbiAoYml0KSB7XG4gICAgICB2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKHRoaXMubGVuZ3RoIC8gOCk7XG4gICAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDw9IGJ1ZkluZGV4KSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goMCk7XG4gICAgICB9XG4gICAgICBpZiAoYml0KSB7XG4gICAgICAgIHRoaXMuYnVmZmVyW2J1ZkluZGV4XSB8PSAweDgwID4+PiB0aGlzLmxlbmd0aCAlIDg7XG4gICAgICB9XG4gICAgICB0aGlzLmxlbmd0aCsrO1xuICAgIH1cbiAgfTtcbiAgdmFyIFFSQ29kZUxpbWl0TGVuZ3RoID0gW1xuICAgIFsxNywgMTQsIDExLCA3XSxcbiAgICBbMzIsIDI2LCAyMCwgMTRdLFxuICAgIFs1MywgNDIsIDMyLCAyNF0sXG4gICAgWzc4LCA2MiwgNDYsIDM0XSxcbiAgICBbMTA2LCA4NCwgNjAsIDQ0XSxcbiAgICBbMTM0LCAxMDYsIDc0LCA1OF0sXG4gICAgWzE1NCwgMTIyLCA4NiwgNjRdLFxuICAgIFsxOTIsIDE1MiwgMTA4LCA4NF0sXG4gICAgWzIzMCwgMTgwLCAxMzAsIDk4XSxcbiAgICBbMjcxLCAyMTMsIDE1MSwgMTE5XSxcbiAgICBbMzIxLCAyNTEsIDE3NywgMTM3XSxcbiAgICBbMzY3LCAyODcsIDIwMywgMTU1XSxcbiAgICBbNDI1LCAzMzEsIDI0MSwgMTc3XSxcbiAgICBbNDU4LCAzNjIsIDI1OCwgMTk0XSxcbiAgICBbNTIwLCA0MTIsIDI5MiwgMjIwXSxcbiAgICBbNTg2LCA0NTAsIDMyMiwgMjUwXSxcbiAgICBbNjQ0LCA1MDQsIDM2NCwgMjgwXSxcbiAgICBbNzE4LCA1NjAsIDM5NCwgMzEwXSxcbiAgICBbNzkyLCA2MjQsIDQ0MiwgMzM4XSxcbiAgICBbODU4LCA2NjYsIDQ4MiwgMzgyXSxcbiAgICBbOTI5LCA3MTEsIDUwOSwgNDAzXSxcbiAgICBbMTAwMywgNzc5LCA1NjUsIDQzOV0sXG4gICAgWzEwOTEsIDg1NywgNjExLCA0NjFdLFxuICAgIFsxMTcxLCA5MTEsIDY2MSwgNTExXSxcbiAgICBbMTI3MywgOTk3LCA3MTUsIDUzNV0sXG4gICAgWzEzNjcsIDEwNTksIDc1MSwgNTkzXSxcbiAgICBbMTQ2NSwgMTEyNSwgODA1LCA2MjVdLFxuICAgIFsxNTI4LCAxMTkwLCA4NjgsIDY1OF0sXG4gICAgWzE2MjgsIDEyNjQsIDkwOCwgNjk4XSxcbiAgICBbMTczMiwgMTM3MCwgOTgyLCA3NDJdLFxuICAgIFsxODQwLCAxNDUyLCAxMDMwLCA3OTBdLFxuICAgIFsxOTUyLCAxNTM4LCAxMTEyLCA4NDJdLFxuICAgIFsyMDY4LCAxNjI4LCAxMTY4LCA4OThdLFxuICAgIFsyMTg4LCAxNzIyLCAxMjI4LCA5NThdLFxuICAgIFsyMzAzLCAxODA5LCAxMjgzLCA5ODNdLFxuICAgIFsyNDMxLCAxOTExLCAxMzUxLCAxMDUxXSxcbiAgICBbMjU2MywgMTk4OSwgMTQyMywgMTA5M10sXG4gICAgWzI2OTksIDIwOTksIDE0OTksIDExMzldLFxuICAgIFsyODA5LCAyMjEzLCAxNTc5LCAxMjE5XSxcbiAgICBbMjk1MywgMjMzMSwgMTY2MywgMTI3M11cbiAgXTtcblxuICBmdW5jdGlvbiBfaXNTdXBwb3J0Q2FudmFzKCkge1xuICAgIHJldHVybiB0eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICE9ICd1bmRlZmluZWQnO1xuICB9XG5cbiAgLy8gYW5kcm9pZCAyLnggZG9lc24ndCBzdXBwb3J0IERhdGEtVVJJIHNwZWNcbiAgZnVuY3Rpb24gX2dldEFuZHJvaWQoKSB7XG4gICAgdmFyIGFuZHJvaWQgPSBmYWxzZTtcbiAgICB2YXIgc0FnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgIGlmICgvYW5kcm9pZC9pLnRlc3Qoc0FnZW50KSkge1xuICAgICAgLy8gYW5kcm9pZFxuICAgICAgYW5kcm9pZCA9IHRydWU7XG4gICAgICB2YXIgYU1hdCA9IHNBZ2VudC50b1N0cmluZygpLm1hdGNoKC9hbmRyb2lkIChbMC05XVxcLlswLTldKS9pKTtcblxuICAgICAgaWYgKGFNYXQgJiYgYU1hdFsxXSkge1xuICAgICAgICBhbmRyb2lkID0gcGFyc2VGbG9hdChhTWF0WzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5kcm9pZDtcbiAgfVxuXG4gIC8vIERyYXdpbmcgaW4gRE9NIGJ5IHVzaW5nIFRhYmxlIHRhZ1xuICB2YXIgRHJhd2luZyA9ICFfaXNTdXBwb3J0Q2FudmFzKClcbiAgICA/IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBEcmF3aW5nID0gZnVuY3Rpb24gKGVsLCBodE9wdGlvbikge1xuICAgICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgICAgICAgdGhpcy5faHRPcHRpb24gPSBodE9wdGlvbjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRHJhdyB0aGUgUVJDb2RlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7UVJDb2RlfSBvUVJDb2RlXG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKG9RUkNvZGUpIHtcbiAgICAgICAgICB2YXIgX2h0T3B0aW9uID0gdGhpcy5faHRPcHRpb247XG4gICAgICAgICAgdmFyIF9lbCA9IHRoaXMuX2VsO1xuICAgICAgICAgIHZhciBuQ291bnQgPSBvUVJDb2RlLmdldE1vZHVsZUNvdW50KCk7XG4gICAgICAgICAgdmFyIG5XaWR0aCA9IE1hdGgucm91bmQoX2h0T3B0aW9uLndpZHRoIC8gbkNvdW50KTtcbiAgICAgICAgICB2YXIgbkhlaWdodCA9IE1hdGgucm91bmQoKF9odE9wdGlvbi5oZWlnaHQgLSBfaHRPcHRpb24udGl0bGVIZWlnaHQpIC8gbkNvdW50KTtcbiAgICAgICAgICBpZiAobldpZHRoIDw9IDEpIHtcbiAgICAgICAgICAgIG5XaWR0aCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuSGVpZ2h0IDw9IDEpIHtcbiAgICAgICAgICAgIG5IZWlnaHQgPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLndpZHRoID0gbldpZHRoICogbkNvdW50O1xuICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLmhlaWdodCA9IG5IZWlnaHQgKiBuQ291bnQgKyBfaHRPcHRpb24udGl0bGVIZWlnaHQ7XG5cbiAgICAgICAgICB0aGlzLl9odE9wdGlvbi5xdWlldFpvbmUgPSBNYXRoLnJvdW5kKHRoaXMuX2h0T3B0aW9uLnF1aWV0Wm9uZSk7XG5cbiAgICAgICAgICB2YXIgYUhUTUwgPSBbXTtcblxuICAgICAgICAgIHZhciBkaXZTdHlsZSA9ICcnO1xuXG4gICAgICAgICAgdmFyIGRyYXdXaWR0aCA9IE1hdGgucm91bmQobldpZHRoICogX2h0T3B0aW9uLmRvdFNjYWxlKTtcbiAgICAgICAgICB2YXIgZHJhd0hlaWdodCA9IE1hdGgucm91bmQobkhlaWdodCAqIF9odE9wdGlvbi5kb3RTY2FsZSk7XG4gICAgICAgICAgaWYgKGRyYXdXaWR0aCA8IDQpIHtcbiAgICAgICAgICAgIGRyYXdXaWR0aCA9IDQ7XG4gICAgICAgICAgICBkcmF3SGVpZ2h0ID0gNDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbm9uUmVxdWlyZWRDb2xvckRhcmsgPSBfaHRPcHRpb24uY29sb3JEYXJrO1xuICAgICAgICAgIHZhciBub25SZXF1aXJlZGNvbG9yTGlnaHQgPSBfaHRPcHRpb24uY29sb3JMaWdodDtcbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5hdXRvQ29sb3IpIHtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLmNvbG9yRGFyayA9XG4gICAgICAgICAgICAgICAgXCJyZ2JhKDAsIDAsIDAsIC42KTtmaWx0ZXI6cHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkdyYWRpZW50KEdyYWRpZW50VHlwZT0wLCBTdGFydENvbG9yU3RyPScjOTkwMDAwMDAnLCBFbmRDb2xvclN0cj0nIzk5MDAwMDAwJyk7XCI7XG4gICAgICAgICAgICAgIF9odE9wdGlvbi5jb2xvckxpZ2h0ID1cbiAgICAgICAgICAgICAgICBcInJnYmEoMjU1LCAyNTUsIDI1NSwgLjcpO2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuR3JhZGllbnQoR3JhZGllbnRUeXBlPTAsIFN0YXJ0Q29sb3JTdHI9JyNCMkZGRkZGRicsIEVuZENvbG9yU3RyPScjQjJGRkZGRkYnKTtcIjtcblxuICAgICAgICAgICAgICAvLyBfaHRPcHRpb24uY29sb3JEYXJrPVwicmdiYSgwLCAwLCAwLCAuNilcIjtcbiAgICAgICAgICAgICAgLy8gX2h0T3B0aW9uLmNvbG9yTGlnaHQ9J3JnYmEoMjU1LCAyNTUsIDI1NSwgLjcpJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9odE9wdGlvbi5jb2xvckxpZ2h0ID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZEltYWdlRWxlID1cbiAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgei1pbmRleDotMTA7cG9zaXRpb246YWJzb2x1dGU7XCI+PGltZyBzcmM9XCInICtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZSArXG4gICAgICAgICAgICAgICdcIiB3aWRodD1cIicgK1xuICAgICAgICAgICAgICAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIpICtcbiAgICAgICAgICAgICAgJ1wiIGhlaWdodD1cIicgK1xuICAgICAgICAgICAgICAoX2h0T3B0aW9uLmhlaWdodCArIF9odE9wdGlvbi5xdWlldFpvbmUgKiAyKSArXG4gICAgICAgICAgICAgICdcIiBzdHlsZT1cIm9wYWNpdHk6JyArXG4gICAgICAgICAgICAgIF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSArXG4gICAgICAgICAgICAgICc7ZmlsdGVyOmFscGhhKG9wYWNpdHk9JyArXG4gICAgICAgICAgICAgIF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSAqIDEwMCArXG4gICAgICAgICAgICAgICcpOyBcIi8+PC9kaXY+JztcbiAgICAgICAgICAgIGFIVE1MLnB1c2goYmFja2dyb3VuZEltYWdlRWxlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLnF1aWV0Wm9uZSkge1xuICAgICAgICAgICAgZGl2U3R5bGUgPVxuICAgICAgICAgICAgICAnZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOicgK1xuICAgICAgICAgICAgICAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIpICtcbiAgICAgICAgICAgICAgJ3B4OyBoZWlnaHQ6JyArXG4gICAgICAgICAgICAgIChfaHRPcHRpb24ud2lkdGggKyBfaHRPcHRpb24ucXVpZXRab25lICogMikgK1xuICAgICAgICAgICAgICAncHg7YmFja2dyb3VuZDonICtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZUNvbG9yICtcbiAgICAgICAgICAgICAgJzsgdGV4dC1hbGlnbjpjZW50ZXI7JztcbiAgICAgICAgICB9XG4gICAgICAgICAgYUhUTUwucHVzaCgnPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTowOycgKyBkaXZTdHlsZSArICdcIj4nKTtcblxuICAgICAgICAgIGFIVE1MLnB1c2goXG4gICAgICAgICAgICAnPHRhYmxlICBzdHlsZT1cImZvbnQtc2l6ZTowO2JvcmRlcjowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTsgbWFyZ2luLXRvcDonICtcbiAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZSArXG4gICAgICAgICAgICAgICdweDtcIiBib3JkZXI9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2VsbHNwYWRkaW5nPVwiMFwiIGFsaWduPVwiY2VudGVyXCIgdmFsaWduPVwibWlkZGxlXCI+J1xuICAgICAgICAgICk7XG4gICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICc8dHIgaGVpZ2h0PVwiJyArXG4gICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCArXG4gICAgICAgICAgICAgICdcIiBhbGlnbj1cImNlbnRlclwiPjx0ZCBzdHlsZT1cImJvcmRlcjowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTttYXJnaW46MDtwYWRkaW5nOjBcIiBjb2xzcGFuPVwiJyArXG4gICAgICAgICAgICAgIG5Db3VudCArXG4gICAgICAgICAgICAgICdcIj4nXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLnRpdGxlKSB7XG4gICAgICAgICAgICB2YXIgYyA9IF9odE9wdGlvbi50aXRsZUNvbG9yO1xuICAgICAgICAgICAgdmFyIGYgPSBfaHRPcHRpb24udGl0bGVGb250O1xuICAgICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO21hcmdpbi10b3A6JyArXG4gICAgICAgICAgICAgICAgX2h0T3B0aW9uLnRpdGxlVG9wICtcbiAgICAgICAgICAgICAgICAncHg7Y29sb3I6JyArXG4gICAgICAgICAgICAgICAgYyArXG4gICAgICAgICAgICAgICAgJztmb250OicgK1xuICAgICAgICAgICAgICAgIGYgK1xuICAgICAgICAgICAgICAgICc7YmFja2dyb3VuZDonICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVCYWNrZ3JvdW5kQ29sb3IgK1xuICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGUgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLnN1YlRpdGxlKSB7XG4gICAgICAgICAgICBhSFRNTC5wdXNoKFxuICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7bWFyZ2luLXRvcDonICtcbiAgICAgICAgICAgICAgICAoX2h0T3B0aW9uLnN1YlRpdGxlVG9wIC0gX2h0T3B0aW9uLnRpdGxlVG9wKSArXG4gICAgICAgICAgICAgICAgJ3B4O2NvbG9yOicgK1xuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5zdWJUaXRsZUNvbG9yICtcbiAgICAgICAgICAgICAgICAnOyBmb250OicgK1xuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5zdWJUaXRsZUZvbnQgK1xuICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24uc3ViVGl0bGUgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhSFRNTC5wdXNoKCc8L3RkPjwvdHI+Jyk7XG4gICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbkNvdW50OyByb3crKykge1xuICAgICAgICAgICAgYUhUTUwucHVzaCgnPHRyIHN0eWxlPVwiYm9yZGVyOjA7IHBhZGRpbmc6MDsgbWFyZ2luOjA7XCIgaGVpZ2h0PVwiN1wiPicpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBuQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgICAgIHZhciBiSXNEYXJrID0gb1FSQ29kZS5pc0Rhcmsocm93LCBjb2wpO1xuXG4gICAgICAgICAgICAgIHZhciBleWUgPSBvUVJDb2RlLmdldEV5ZShyb3csIGNvbCk7IC8vIHsgaXNEYXJrOiB0cnVlL2ZhbHNlLCB0eXBlOiBQT19UTCwgUElfVEwsIFBPX1RSLCBQSV9UUiwgUE9fQkwsIFBJX0JMIH07XG5cbiAgICAgICAgICAgICAgaWYgKGV5ZSkge1xuICAgICAgICAgICAgICAgIC8vIElzIGV5ZVxuICAgICAgICAgICAgICAgIGJJc0RhcmsgPSBleWUuaXNEYXJrO1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gZXllLnR5cGU7XG5cbiAgICAgICAgICAgICAgICAvLyBQWF9YWCwgUFgsIGNvbG9yRGFyaywgY29sb3JMaWdodFxuICAgICAgICAgICAgICAgIHZhciBleWVDb2xvckRhcmsgPVxuICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uW3R5cGVdIHx8IF9odE9wdGlvblt0eXBlLnN1YnN0cmluZygwLCAyKV0gfHwgbm9uUmVxdWlyZWRDb2xvckRhcms7XG4gICAgICAgICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJib3JkZXI6MDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7cGFkZGluZzowO21hcmdpbjowO3dpZHRoOicgK1xuICAgICAgICAgICAgICAgICAgICBuV2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAncHg7aGVpZ2h0OicgK1xuICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICtcbiAgICAgICAgICAgICAgICAgICAgJ3B4O1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJ3aWR0aDonICtcbiAgICAgICAgICAgICAgICAgICAgbldpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgJ3B4O2hlaWdodDonICtcbiAgICAgICAgICAgICAgICAgICAgbkhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgICdweDtiYWNrZ3JvdW5kLWNvbG9yOicgK1xuICAgICAgICAgICAgICAgICAgICAoYklzRGFyayA/IGV5ZUNvbG9yRGFyayA6IG5vblJlcXVpcmVkY29sb3JMaWdodCkgK1xuICAgICAgICAgICAgICAgICAgICAnO2Rpc3BsYXk6aW5saW5lLWJsb2NrXCI+PC9zcGFuPjwvdGQ+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGltaW5nIFBhdHRlcm5cbiAgICAgICAgICAgICAgICB2YXIgbm93RGFya0NvbG9yID0gX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICBpZiAocm93ID09IDYpIHtcbiAgICAgICAgICAgICAgICAgIG5vd0RhcmtDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfSCB8fCBfaHRPcHRpb24udGltaW5nIHx8IG5vblJlcXVpcmVkQ29sb3JEYXJrO1xuICAgICAgICAgICAgICAgICAgYUhUTUwucHVzaChcbiAgICAgICAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cImJvcmRlcjowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtwYWRkaW5nOjA7bWFyZ2luOjA7d2lkdGg6JyArXG4gICAgICAgICAgICAgICAgICAgICAgbldpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAncHg7aGVpZ2h0OicgK1xuICAgICAgICAgICAgICAgICAgICAgIG5IZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgICAgICdweDtiYWNrZ3JvdW5kLWNvbG9yOicgK1xuICAgICAgICAgICAgICAgICAgICAgIChiSXNEYXJrID8gbm93RGFya0NvbG9yIDogbm9uUmVxdWlyZWRjb2xvckxpZ2h0KSArXG4gICAgICAgICAgICAgICAgICAgICAgJztcIj48L3RkPidcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2wgPT0gNikge1xuICAgICAgICAgICAgICAgICAgbm93RGFya0NvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19WIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgbm9uUmVxdWlyZWRDb2xvckRhcms7XG5cbiAgICAgICAgICAgICAgICAgIGFIVE1MLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJib3JkZXI6MDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7cGFkZGluZzowO21hcmdpbjowO3dpZHRoOicgK1xuICAgICAgICAgICAgICAgICAgICAgIG5XaWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgJ3B4O2hlaWdodDonICtcbiAgICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICtcbiAgICAgICAgICAgICAgICAgICAgICAncHg7YmFja2dyb3VuZC1jb2xvcjonICtcbiAgICAgICAgICAgICAgICAgICAgICAoYklzRGFyayA/IG5vd0RhcmtDb2xvciA6IG5vblJlcXVpcmVkY29sb3JMaWdodCkgK1xuICAgICAgICAgICAgICAgICAgICAgICc7XCI+PC90ZD4nXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhSFRNTC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwiYm9yZGVyOjA7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO3BhZGRpbmc6MDttYXJnaW46MDt3aWR0aDonICtcbiAgICAgICAgICAgICAgICAgICAgICBuV2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAgICdweDtoZWlnaHQ6JyArXG4gICAgICAgICAgICAgICAgICAgICAgbkhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgICAgJ3B4O1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6JyArXG4gICAgICAgICAgICAgICAgICAgICAgZHJhd1dpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAncHg7aGVpZ2h0OicgK1xuICAgICAgICAgICAgICAgICAgICAgIGRyYXdIZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgICAgICdweDtiYWNrZ3JvdW5kLWNvbG9yOicgK1xuICAgICAgICAgICAgICAgICAgICAgIChiSXNEYXJrID8gbm93RGFya0NvbG9yIDogX2h0T3B0aW9uLmNvbG9yTGlnaHQpICtcbiAgICAgICAgICAgICAgICAgICAgICAnO1wiPjwvZGl2PjwvdGQ+J1xuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYUhUTUwucHVzaCgnPC90cj4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhSFRNTC5wdXNoKCc8L3RhYmxlPicpO1xuICAgICAgICAgIGFIVE1MLnB1c2goJzwvZGl2PicpO1xuXG4gICAgICAgICAgaWYgKF9odE9wdGlvbi5sb2dvKSB7XG4gICAgICAgICAgICAvLyBMb2dvIEltYWdlXG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24uY3Jvc3NPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSBfaHRPcHRpb24uY3Jvc3NPcmlnaW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGltZy5jcm9zc09yaWdpbj1cIkFub255bW91c1wiO1xuICAgICAgICAgICAgaW1nLnNyYyA9IF9odE9wdGlvbi5sb2dvO1xuXG4gICAgICAgICAgICB2YXIgaW1nVyA9IF9odE9wdGlvbi53aWR0aCAvIDMuNTtcbiAgICAgICAgICAgIHZhciBpbWdIID0gX2h0T3B0aW9uLmhlaWdodCAvIDMuNTtcbiAgICAgICAgICAgIGlmIChpbWdXICE9IGltZ0gpIHtcbiAgICAgICAgICAgICAgaW1nVyA9IGltZ0g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nb1dpZHRoKSB7XG4gICAgICAgICAgICAgIGltZ1cgPSBfaHRPcHRpb24ubG9nb1dpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5sb2dvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgIGltZ0ggPSBfaHRPcHRpb24ubG9nb0hlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGltZ0RpdlN0eWxlID1cbiAgICAgICAgICAgICAgJ3Bvc2l0aW9uOnJlbGF0aXZlOyB6LWluZGV4OjE7ZGlzcGxheTp0YWJsZS1jZWxsO3RvcDotJyArXG4gICAgICAgICAgICAgICgoX2h0T3B0aW9uLmhlaWdodCAtIF9odE9wdGlvbi50aXRsZUhlaWdodCkgLyAyICsgaW1nSCAvIDIgKyBfaHRPcHRpb24ucXVpZXRab25lKSArXG4gICAgICAgICAgICAgICdweDt0ZXh0LWFsaWduOmNlbnRlcjsgd2lkdGg6JyArXG4gICAgICAgICAgICAgIGltZ1cgK1xuICAgICAgICAgICAgICAncHg7IGhlaWdodDonICtcbiAgICAgICAgICAgICAgaW1nSCArXG4gICAgICAgICAgICAgICdweDtsaW5lLWhlaWdodDonICtcbiAgICAgICAgICAgICAgaW1nVyArXG4gICAgICAgICAgICAgICdweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsnO1xuICAgICAgICAgICAgaWYgKCFfaHRPcHRpb24ubG9nb0JhY2tncm91bmRUcmFuc3BhcmVudCkge1xuICAgICAgICAgICAgICBpbWdEaXZTdHlsZSArPSAnYmFja2dyb3VuZDonICsgX2h0T3B0aW9uLmxvZ29CYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFIVE1MLnB1c2goXG4gICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiJyArXG4gICAgICAgICAgICAgICAgaW1nRGl2U3R5bGUgK1xuICAgICAgICAgICAgICAgICdcIj48aW1nICBzcmM9XCInICtcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ubG9nbyArXG4gICAgICAgICAgICAgICAgJ1wiICBzdHlsZT1cIm1heC13aWR0aDogJyArXG4gICAgICAgICAgICAgICAgaW1nVyArXG4gICAgICAgICAgICAgICAgJ3B4OyBtYXgtaGVpZ2h0OiAnICtcbiAgICAgICAgICAgICAgICBpbWdIICtcbiAgICAgICAgICAgICAgICAncHg7XCIgLz4gPGRpdiBzdHlsZT1cIiBkaXNwbGF5OiBub25lOyB3aWR0aDoxcHg7bWFyZ2luLWxlZnQ6IC0xcHg7XCI+PC9kaXY+PC9kaXY+J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2h0T3B0aW9uLm9uUmVuZGVyaW5nU3RhcnQpIHtcbiAgICAgICAgICAgIF9odE9wdGlvbi5vblJlbmRlcmluZ1N0YXJ0KF9odE9wdGlvbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX2VsLmlubmVySFRNTCA9IGFIVE1MLmpvaW4oJycpO1xuICAgICAgICAgIC8vIEZpeCB0aGUgbWFyZ2luIHZhbHVlcyBhcyByZWFsIHNpemUuXG4gICAgICAgICAgdmFyIGVsVGFibGUgPSBfZWwuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICB2YXIgbkxlZnRNYXJnaW5UYWJsZSA9IChfaHRPcHRpb24ud2lkdGggLSBlbFRhYmxlLm9mZnNldFdpZHRoKSAvIDI7XG4gICAgICAgICAgdmFyIG5Ub3BNYXJnaW5UYWJsZSA9IChfaHRPcHRpb24uaGVpZ2h0IC0gZWxUYWJsZS5vZmZzZXRIZWlnaHQpIC8gMjtcbiAgICAgICAgICBpZiAobkxlZnRNYXJnaW5UYWJsZSA+IDAgJiYgblRvcE1hcmdpblRhYmxlID4gMCkge1xuICAgICAgICAgICAgZWxUYWJsZS5zdHlsZS5tYXJnaW4gPSBuVG9wTWFyZ2luVGFibGUgKyAncHggJyArIG5MZWZ0TWFyZ2luVGFibGUgKyAncHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5faHRPcHRpb24ub25SZW5kZXJpbmdFbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLm9uUmVuZGVyaW5nRW5kKHRoaXMuX2h0T3B0aW9uLCBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSBRUkNvZGVcbiAgICAgICAgICovXG4gICAgICAgIERyYXdpbmcucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX2VsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBEcmF3aW5nO1xuICAgICAgfSkoKVxuICAgIDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gRHJhd2luZyBpbiBDYW52YXNcbiAgICAgICAgZnVuY3Rpb24gX29uTWFrZUltYWdlKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kcmF3ZXIgPT0gJ3N2ZycpIHtcbiAgICAgICAgICAgIHZhciBzdmdEYXRhID0gdGhpcy5fb0NvbnRleHQuZ2V0U2VyaWFsaXplZFN2Zyh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVVSTCA9IHN2Z0RhdGE7XG4gICAgICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSBzdmdEYXRhO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjYW52YXNcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsSW1hZ2UuY3Jvc3NPcmlnaW49J0Fub255bW91cyc7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBpZiAodGhpcy5faHRPcHRpb24uY3Jvc3NPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fZWxJbWFnZS5jcm9zc09yaWdpbiA9IHRoaXMuX2h0T3B0aW9uLmNyb3NzT3JpZ2luO1xuICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgIHZhciBkYXRhVVJMID0gdGhpcy5fZWxDYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgICAgICAgLy8gdGhpcy5fZWxJbWFnZS5zcmMgPSBkYXRhVVJMO1xuICAgICAgICAgICAgICB0aGlzLmRhdGFVUkwgPSBkYXRhVVJMO1xuICAgICAgICAgICAgICAvLyB0aGlzLl9lbEltYWdlLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgICAvLyB0aGlzLl9lbENhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5vblJlbmRlcmluZ0VuZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGFVUkwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBcIkNhbiBub3QgZ2V0IGJhc2U2NCBkYXRhLCBwbGVhc2UgY2hlY2s6IDEuIFB1Ymxpc2hlZCB0aGUgcGFnZSBhbmQgaW1hZ2UgdG8gdGhlIHNlcnZlciAyLiBUaGUgaW1hZ2UgcmVxdWVzdCBzdXBwb3J0IENPUlMgMy4gQ29uZmlndXJlZCBgY3Jvc3NPcmlnaW46J2Fub255bW91cydgIG9wdGlvblwiXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9odE9wdGlvbi5vblJlbmRlcmluZ0VuZCh0aGlzLl9odE9wdGlvbiwgdGhpcy5kYXRhVVJMKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbmRyb2lkIDIuMSBidWcgd29ya2Fyb3VuZFxuICAgICAgICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvYW5kcm9pZC9pc3N1ZXMvZGV0YWlsP2lkPTUxNDFcbiAgICAgICAgaWYgKHJvb3QuX2FuZHJvaWQgJiYgcm9vdC5fYW5kcm9pZCA8PSAyLjEpIHtcbiAgICAgICAgICB2YXIgZmFjdG9yID0gMSAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgIHZhciBkcmF3SW1hZ2UgPSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmRyYXdJbWFnZTtcbiAgICAgICAgICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmRyYXdJbWFnZSA9IGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgc3gsXG4gICAgICAgICAgICBzeSxcbiAgICAgICAgICAgIHN3LFxuICAgICAgICAgICAgc2gsXG4gICAgICAgICAgICBkeCxcbiAgICAgICAgICAgIGR5LFxuICAgICAgICAgICAgZHcsXG4gICAgICAgICAgICBkaFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKCdub2RlTmFtZScgaW4gaW1hZ2UgJiYgL2ltZy9pLnRlc3QoaW1hZ2Uubm9kZU5hbWUpKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAxOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBhcmd1bWVudHNbaV0gPSBhcmd1bWVudHNbaV0gKiBmYWN0b3I7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGR3ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1sxXSAqPSBmYWN0b3I7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1syXSAqPSBmYWN0b3I7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1szXSAqPSBmYWN0b3I7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1s0XSAqPSBmYWN0b3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRyYXdJbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgd2hldGhlciB0aGUgdXNlcidzIGJyb3dzZXIgc3VwcG9ydHMgRGF0YSBVUkkgb3Igbm90XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZTdWNjZXNzIE9jY3VycyBpZiBpdCBzdXBwb3J0cyBEYXRhIFVSSVxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmRmFpbCBPY2N1cnMgaWYgaXQgZG9lc24ndCBzdXBwb3J0IERhdGEgVVJJXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfc2FmZVNldERhdGFVUkkoZlN1Y2Nlc3MsIGZGYWlsKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHNlbGYuX2ZGYWlsID0gZkZhaWw7XG4gICAgICAgICAgc2VsZi5fZlN1Y2Nlc3MgPSBmU3VjY2VzcztcblxuICAgICAgICAgIC8vIENoZWNrIGl0IGp1c3Qgb25jZVxuICAgICAgICAgIGlmIChzZWxmLl9iU3VwcG9ydERhdGFVUkkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgdmFyIGZPbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzZWxmLl9iU3VwcG9ydERhdGFVUkkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICBpZiAoc2VsZi5fZkZhaWwpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9mRmFpbC5jYWxsKHNlbGYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGZPblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNlbGYuX2JTdXBwb3J0RGF0YVVSSSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgaWYgKHNlbGYuX2ZTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZlN1Y2Nlc3MuY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZWwub25hYm9ydCA9IGZPbkVycm9yO1xuICAgICAgICAgICAgZWwub25lcnJvciA9IGZPbkVycm9yO1xuICAgICAgICAgICAgZWwub25sb2FkID0gZk9uU3VjY2VzcztcbiAgICAgICAgICAgIGVsLnNyYyA9XG4gICAgICAgICAgICAgICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQUZDQVlBQUFDTmJ5YmxBQUFBSEVsRVFWUUkxMlA0Ly84L3czOEdJQVhESUJLRTBESHhnbGpOQkFBTzlUWEwwWTRPSHdBQUFBQkpSVTVFcmtKZ2dnPT0nOyAvLyB0aGUgSW1hZ2UgY29udGFpbnMgMXB4IGRhdGEuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLl9iU3VwcG9ydERhdGFVUkkgPT09IHRydWUgJiYgc2VsZi5fZlN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHNlbGYuX2ZTdWNjZXNzLmNhbGwoc2VsZik7XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLl9iU3VwcG9ydERhdGFVUkkgPT09IGZhbHNlICYmIHNlbGYuX2ZGYWlsKSB7XG4gICAgICAgICAgICBzZWxmLl9mRmFpbC5jYWxsKHNlbGYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEcmF3aW5nIFFSQ29kZSBieSB1c2luZyBjYW52YXNcbiAgICAgICAgICpcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBodE9wdGlvbiBRUkNvZGUgT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIERyYXdpbmcgPSBmdW5jdGlvbiAoZWwsIGh0T3B0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fYklzUGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuX2FuZHJvaWQgPSBfZ2V0QW5kcm9pZCgpO1xuICAgICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgICAgICAgdGhpcy5faHRPcHRpb24gPSBodE9wdGlvbjtcblxuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kcmF3ZXIgPT0gJ3N2ZycpIHtcbiAgICAgICAgICAgIHRoaXMuX29Db250ZXh0ID0ge307XG4gICAgICAgICAgICB0aGlzLl9lbENhbnZhcyA9IHt9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjYW52YXNcbiAgICAgICAgICAgIHRoaXMuX2VsQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLl9lbC5hcHBlbmRDaGlsZCh0aGlzLl9lbENhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9vQ29udGV4dCA9IHRoaXMuX2VsQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAvLyB0aGlzLl9lbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIC8vIHRoaXMuX2VsSW1hZ2UuYWx0ID0gXCJTY2FuIG1lIVwiO1xuICAgICAgICAgICAgLy8gdGhpcy5fZWxJbWFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAvLyB0aGlzLl9lbC5hcHBlbmRDaGlsZCh0aGlzLl9lbEltYWdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9iU3VwcG9ydERhdGFVUkkgPSBudWxsO1xuICAgICAgICAgIHRoaXMuZGF0YVVSTCA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYXcgdGhlIFFSQ29kZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1FSQ29kZX0gb1FSQ29kZVxuICAgICAgICAgKi9cbiAgICAgICAgRHJhd2luZy5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChvUVJDb2RlKSB7XG4gICAgICAgICAgLy8gdmFyIF9lbEltYWdlID0gdGhpcy5fZWxJbWFnZTtcbiAgICAgICAgICB2YXIgX2h0T3B0aW9uID0gdGhpcy5faHRPcHRpb247XG5cbiAgICAgICAgICBpZiAoIV9odE9wdGlvbi50aXRsZSAmJiAhX2h0T3B0aW9uLnN1YlRpdGxlKSB7XG4gICAgICAgICAgICBfaHRPcHRpb24uaGVpZ2h0IC09IF9odE9wdGlvbi50aXRsZUhlaWdodDtcbiAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5Db3VudCA9IG9RUkNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcbiAgICAgICAgICB2YXIgbldpZHRoID0gTWF0aC5yb3VuZChfaHRPcHRpb24ud2lkdGggLyBuQ291bnQpO1xuICAgICAgICAgIHZhciBuSGVpZ2h0ID0gTWF0aC5yb3VuZCgoX2h0T3B0aW9uLmhlaWdodCAtIF9odE9wdGlvbi50aXRsZUhlaWdodCkgLyBuQ291bnQpO1xuICAgICAgICAgIGlmIChuV2lkdGggPD0gMSkge1xuICAgICAgICAgICAgbldpZHRoID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5IZWlnaHQgPD0gMSkge1xuICAgICAgICAgICAgbkhlaWdodCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX2h0T3B0aW9uLndpZHRoID0gbldpZHRoICogbkNvdW50O1xuICAgICAgICAgIF9odE9wdGlvbi5oZWlnaHQgPSBuSGVpZ2h0ICogbkNvdW50ICsgX2h0T3B0aW9uLnRpdGxlSGVpZ2h0O1xuXG4gICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZSA9IE1hdGgucm91bmQoX2h0T3B0aW9uLnF1aWV0Wm9uZSk7XG5cbiAgICAgICAgICB0aGlzLl9lbENhbnZhcy53aWR0aCA9IF9odE9wdGlvbi53aWR0aCArIF9odE9wdGlvbi5xdWlldFpvbmUgKiAyO1xuICAgICAgICAgIHRoaXMuX2VsQ2FudmFzLmhlaWdodCA9IF9odE9wdGlvbi5oZWlnaHQgKyBfaHRPcHRpb24ucXVpZXRab25lICogMjtcblxuICAgICAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kcmF3ZXIgIT0gJ2NhbnZhcycpIHtcbiAgICAgICAgICAgIC8vIF9lbEltYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9vQ29udGV4dCA9IG5ldyBDMlModGhpcy5fZWxDYW52YXMud2lkdGgsIHRoaXMuX2VsQ2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICAgIHZhciBfb0NvbnRleHQgPSB0aGlzLl9vQ29udGV4dDtcbiAgICAgICAgICBfb0NvbnRleHQubGluZVdpZHRoID0gMDtcbiAgICAgICAgICBfb0NvbnRleHQuZmlsbFN0eWxlID0gX2h0T3B0aW9uLmNvbG9yTGlnaHQ7XG4gICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2VsQ2FudmFzLndpZHRoLCB0aGlzLl9lbENhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgdmFyIHQgPSB0aGlzO1xuXG4gICAgICAgICAgZnVuY3Rpb24gZHJhd1F1aWV0Wm9uZUNvbG9yKCkge1xuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5xdWlldFpvbmUgPiAwICYmIF9odE9wdGlvbi5xdWlldFpvbmVDb2xvcikge1xuICAgICAgICAgICAgICAvLyB0b3BcbiAgICAgICAgICAgICAgX29Db250ZXh0LmxpbmVXaWR0aCA9IDA7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsU3R5bGUgPSBfaHRPcHRpb24ucXVpZXRab25lQ29sb3I7XG5cbiAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KDAsIDAsIHQuX2VsQ2FudmFzLndpZHRoLCBfaHRPcHRpb24ucXVpZXRab25lKTtcbiAgICAgICAgICAgICAgLy8gbGVmdFxuICAgICAgICAgICAgICBfb0NvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ucXVpZXRab25lLFxuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5xdWlldFpvbmUsXG4gICAgICAgICAgICAgICAgdC5fZWxDYW52YXMuaGVpZ2h0IC0gX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gcmlnaHRcbiAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIHQuX2VsQ2FudmFzLndpZHRoIC0gX2h0T3B0aW9uLnF1aWV0Wm9uZSxcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ucXVpZXRab25lLFxuICAgICAgICAgICAgICAgIF9odE9wdGlvbi5xdWlldFpvbmUsXG4gICAgICAgICAgICAgICAgdC5fZWxDYW52YXMuaGVpZ2h0IC0gX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gYm90dG9tXG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHQuX2VsQ2FudmFzLmhlaWdodCAtIF9odE9wdGlvbi5xdWlldFpvbmUsXG4gICAgICAgICAgICAgICAgdC5fZWxDYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICAvLyBCYWNrZ3JvdW5kIEltYWdlXG4gICAgICAgICAgICB2YXIgYmdJbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgYmdJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBfb0NvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICAgICAgICAgIF9vQ29udGV4dC5nbG9iYWxBbHBoYSA9IF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYTtcbiAgICAgICAgICAgICAgdmFyIGltYWdlU21vb3RoaW5nUXVhbGl0eSA9IF9vQ29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgICAgICAgICAgIHZhciBpbWFnZVNtb290aGluZ0VuYWJsZWQgPSBfb0NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgICAgICAgICAgICBfb0NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nUXVhbGl0eSA9ICdoaWdoJztcbiAgICAgICAgICAgICAgX29Db250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICBiZ0ltZyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCxcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24ud2lkdGggKyBfaHRPcHRpb24ucXVpZXRab25lICogMixcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24uaGVpZ2h0ICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLSBfaHRPcHRpb24udGl0bGVIZWlnaHRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nUXVhbGl0eSA9IGltYWdlU21vb3RoaW5nUXVhbGl0eTtcbiAgICAgICAgICAgICAgX29Db250ZXh0Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgICAgICAgICBkcmF3UXJjb2RlLmNhbGwodCwgb1FSQ29kZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gYmdJbWcuY3Jvc3NPcmlnaW49J0Fub255bW91cyc7XG4gICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmNyb3NzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgYmdJbWcuY3Jvc3NPcmlnaW4gPSBfaHRPcHRpb24uY3Jvc3NPcmlnaW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiZ0ltZy5vcmlnaW5hbFNyYyA9IF9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2U7XG4gICAgICAgICAgICBiZ0ltZy5zcmMgPSBfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlO1xuICAgICAgICAgICAgLy8gRG9Tb21ldGhpbmdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhd1FyY29kZS5jYWxsKHQsIG9RUkNvZGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGRyYXdRcmNvZGUob1FSQ29kZSkge1xuICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5vblJlbmRlcmluZ1N0YXJ0KSB7XG4gICAgICAgICAgICAgIF9odE9wdGlvbi5vblJlbmRlcmluZ1N0YXJ0KF9odE9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG5Db3VudDsgcm93KyspIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbkNvdW50OyBjb2wrKykge1xuICAgICAgICAgICAgICAgIHZhciBuTGVmdCA9IGNvbCAqIG5XaWR0aCArIF9odE9wdGlvbi5xdWlldFpvbmU7XG4gICAgICAgICAgICAgICAgdmFyIG5Ub3AgPSByb3cgKiBuSGVpZ2h0ICsgX2h0T3B0aW9uLnF1aWV0Wm9uZTtcblxuICAgICAgICAgICAgICAgIHZhciBiSXNEYXJrID0gb1FSQ29kZS5pc0Rhcmsocm93LCBjb2wpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGV5ZSA9IG9RUkNvZGUuZ2V0RXllKHJvdywgY29sKTsgLy8geyBpc0Rhcms6IHRydWUvZmFsc2UsIHR5cGU6IFBPX1RMLCBQSV9UTCwgUE9fVFIsIFBJX1RSLCBQT19CTCwgUElfQkwgfTtcblxuICAgICAgICAgICAgICAgIHZhciBub3dEb3RTY2FsZSA9IF9odE9wdGlvbi5kb3RTY2FsZTtcblxuICAgICAgICAgICAgICAgIF9vQ29udGV4dC5saW5lV2lkdGggPSAwO1xuICAgICAgICAgICAgICAgIC8vIENvbG9yIGhhbmRsZXJcbiAgICAgICAgICAgICAgICB2YXIgZENvbG9yO1xuICAgICAgICAgICAgICAgIHZhciBsQ29sb3I7XG4gICAgICAgICAgICAgICAgaWYgKGV5ZSkge1xuICAgICAgICAgICAgICAgICAgZENvbG9yID1cbiAgICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uW2V5ZS50eXBlXSB8fFxuICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb25bZXllLnR5cGUuc3Vic3RyaW5nKDAsIDIpXSB8fFxuICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24uY29sb3JEYXJrO1xuICAgICAgICAgICAgICAgICAgbENvbG9yID0gX2h0T3B0aW9uLmNvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxDb2xvciA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19IIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmF1dG9Db2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19IIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmF1dG9Db2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgICBsQ29sb3IgPSBfaHRPcHRpb24uYXV0b0NvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfSCB8fCBfaHRPcHRpb24udGltaW5nIHx8IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbCA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19WIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmF1dG9Db2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZENvbG9yID0gX2h0T3B0aW9uLnRpbWluZ19WIHx8IF9odE9wdGlvbi50aW1pbmcgfHwgX2h0T3B0aW9uLmF1dG9Db2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgICBsQ29sb3IgPSBfaHRPcHRpb24uYXV0b0NvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfViB8fCBfaHRPcHRpb24udGltaW5nIHx8IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uYXV0b0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkQ29sb3IgPSBfaHRPcHRpb24uYXV0b0NvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxDb2xvciA9IF9odE9wdGlvbi5hdXRvQ29sb3JMaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZENvbG9yID0gX2h0T3B0aW9uLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gNikge1xuICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi50aW1pbmdfSCB8fCBfaHRPcHRpb24udGltaW5nIHx8IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sID09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkQ29sb3IgPSBfaHRPcHRpb24udGltaW5nX1YgfHwgX2h0T3B0aW9uLnRpbWluZyB8fCBfaHRPcHRpb24uY29sb3JEYXJrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IF9odE9wdGlvbi5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbENvbG9yID0gX2h0T3B0aW9uLmNvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9vQ29udGV4dC5zdHJva2VTdHlsZSA9IGJJc0RhcmsgPyBkQ29sb3IgOiBsQ29sb3I7XG4gICAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxTdHlsZSA9IGJJc0RhcmsgPyBkQ29sb3IgOiBsQ29sb3I7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXllKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZXllLnR5cGUgPT0gJ0FPJykge1xuICAgICAgICAgICAgICAgICAgICBub3dEb3RTY2FsZSA9IF9odE9wdGlvbi5kb3RTY2FsZUFPO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleWUudHlwZSA9PSAnQUknKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vd0RvdFNjYWxlID0gX2h0T3B0aW9uLmRvdFNjYWxlQUk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub3dEb3RTY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uYmFja2dyb3VuZEltYWdlICYmIF9odE9wdGlvbi5hdXRvQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZENvbG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAoZXllLnR5cGUgPT0gJ0FPJyA/IF9odE9wdGlvbi5BSSA6IF9odE9wdGlvbi5BTykgfHwgX2h0T3B0aW9uLmF1dG9Db2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgIGxDb2xvciA9IF9odE9wdGlvbi5hdXRvQ29sb3JMaWdodDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRDb2xvciA9IChleWUudHlwZSA9PSAnQU8nID8gX2h0T3B0aW9uLkFJIDogX2h0T3B0aW9uLkFPKSB8fCBkQ29sb3I7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vIElzIGV5ZVxuICAgICAgICAgICAgICAgICAgYklzRGFyayA9IGV5ZS5pc0Rhcms7XG5cbiAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgbkxlZnQgKyAobldpZHRoICogKDEgLSBub3dEb3RTY2FsZSkpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uLnRpdGxlSGVpZ2h0ICsgblRvcCArIChuSGVpZ2h0ICogKDEgLSBub3dEb3RTY2FsZSkpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIG5IZWlnaHQgKiBub3dEb3RTY2FsZVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRpbWluZyBQYXR0ZXJuXG5cbiAgICAgICAgICAgICAgICAgICAgbm93RG90U2NhbGUgPSBfaHRPcHRpb24uZG90U2NhbGVUaW1pbmdfSDtcblxuICAgICAgICAgICAgICAgICAgICBfb0NvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICAgbkxlZnQgKyAobldpZHRoICogKDEgLSBub3dEb3RTY2FsZSkpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgKyBuVG9wICsgKG5IZWlnaHQgKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgIG5XaWR0aCAqIG5vd0RvdFNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgIG5IZWlnaHQgKiBub3dEb3RTY2FsZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2wgPT0gNikge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaW1pbmcgUGF0dGVyblxuICAgICAgICAgICAgICAgICAgICBub3dEb3RTY2FsZSA9IF9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19WO1xuXG4gICAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgICBuTGVmdCArIChuV2lkdGggKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCArIG5Ub3AgKyAobkhlaWdodCAqICgxIC0gbm93RG90U2NhbGUpKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgbkhlaWdodCAqIG5vd0RvdFNjYWxlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5MZWZ0ICsgKG5XaWR0aCAqICgxIC0gbm93RG90U2NhbGUpKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgKyBuVG9wICsgKG5IZWlnaHQgKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICogbm93RG90U2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5MZWZ0ICsgKG5XaWR0aCAqICgxIC0gbm93RG90U2NhbGUpKSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgKyBuVG9wICsgKG5IZWlnaHQgKiAoMSAtIG5vd0RvdFNjYWxlKSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbldpZHRoICogbm93RG90U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuSGVpZ2h0ICogbm93RG90U2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5kb3RTY2FsZSAhPSAxICYmICFleWUpIHtcbiAgICAgICAgICAgICAgICAgIF9vQ29udGV4dC5zdHJva2VTdHlsZSA9IF9odE9wdGlvbi5jb2xvckxpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2h0T3B0aW9uLnRpdGxlKSB7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsU3R5bGUgPSBfaHRPcHRpb24udGl0bGVCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxDYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgX2h0T3B0aW9uLnRpdGxlSGVpZ2h0ICsgX2h0T3B0aW9uLnF1aWV0Wm9uZVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIF9vQ29udGV4dC5mb250ID0gX2h0T3B0aW9uLnRpdGxlRm9udDtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxTdHlsZSA9IF9odE9wdGlvbi50aXRsZUNvbG9yO1xuICAgICAgICAgICAgICBfb0NvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsVGV4dChcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxDYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICtfaHRPcHRpb24ucXVpZXRab25lICsgX2h0T3B0aW9uLnRpdGxlVG9wXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24uc3ViVGl0bGUpIHtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmZvbnQgPSBfaHRPcHRpb24uc3ViVGl0bGVGb250O1xuICAgICAgICAgICAgICBfb0NvbnRleHQuZmlsbFN0eWxlID0gX2h0T3B0aW9uLnN1YlRpdGxlQ29sb3I7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5maWxsVGV4dChcbiAgICAgICAgICAgICAgICBfaHRPcHRpb24uc3ViVGl0bGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxDYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICtfaHRPcHRpb24ucXVpZXRab25lICsgX2h0T3B0aW9uLnN1YlRpdGxlVG9wXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlTG9nb0ltZyhpbWcpIHtcbiAgICAgICAgICAgICAgdmFyIGltZ0NvbnRhaW5lclcgPSBNYXRoLnJvdW5kKF9odE9wdGlvbi53aWR0aCAvIDMuNSk7XG4gICAgICAgICAgICAgIHZhciBpbWdDb250YWluZXJIID0gTWF0aC5yb3VuZChfaHRPcHRpb24uaGVpZ2h0IC8gMy41KTtcbiAgICAgICAgICAgICAgaWYgKGltZ0NvbnRhaW5lclcgIT09IGltZ0NvbnRhaW5lckgpIHtcbiAgICAgICAgICAgICAgICBpbWdDb250YWluZXJXID0gaW1nQ29udGFpbmVySDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nb01heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVyVyA9IE1hdGgucm91bmQoX2h0T3B0aW9uLmxvZ29NYXhXaWR0aCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2h0T3B0aW9uLmxvZ29XaWR0aCkge1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclcgPSBNYXRoLnJvdW5kKF9odE9wdGlvbi5sb2dvV2lkdGgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKF9odE9wdGlvbi5sb2dvTWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCA9IE1hdGgucm91bmQoX2h0T3B0aW9uLmxvZ29NYXhIZWlnaHQpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9odE9wdGlvbi5sb2dvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCA9IE1hdGgucm91bmQoX2h0T3B0aW9uLmxvZ29IZWlnaHQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIG53O1xuICAgICAgICAgICAgICB2YXIgbmg7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgaW1nLm5hdHVyYWxXaWR0aCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIElFIDYvNy84XG4gICAgICAgICAgICAgICAgbncgPSBpbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgbmggPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEhUTUw1IGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgbncgPSBpbWcubmF0dXJhbFdpZHRoO1xuICAgICAgICAgICAgICAgIG5oID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmxvZ29NYXhXaWR0aCB8fCBfaHRPcHRpb24ubG9nb01heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nb01heFdpZHRoICYmIG53IDw9IGltZ0NvbnRhaW5lclcpIHtcbiAgICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclcgPSBudztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmxvZ29NYXhIZWlnaHQgJiYgbmggPD0gaW1nQ29udGFpbmVySCkge1xuICAgICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCA9IG5oO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobncgPD0gaW1nQ29udGFpbmVyVyAmJiBuaCA8PSBpbWdDb250YWluZXJIKSB7XG4gICAgICAgICAgICAgICAgICBpbWdDb250YWluZXJXID0gbnc7XG4gICAgICAgICAgICAgICAgICBpbWdDb250YWluZXJIID0gbmg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGltZ0NvbnRhaW5lclggPSAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLSBpbWdDb250YWluZXJXKSAvIDI7XG4gICAgICAgICAgICAgIHZhciBpbWdDb250YWluZXJZID1cbiAgICAgICAgICAgICAgICAoX2h0T3B0aW9uLmhlaWdodCArXG4gICAgICAgICAgICAgICAgICBfaHRPcHRpb24udGl0bGVIZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLVxuICAgICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCkgL1xuICAgICAgICAgICAgICAgIDI7XG5cbiAgICAgICAgICAgICAgdmFyIGltZ1NjYWxlID0gTWF0aC5taW4oaW1nQ29udGFpbmVyVyAvIG53LCBpbWdDb250YWluZXJIIC8gbmgpO1xuICAgICAgICAgICAgICB2YXIgaW1nVyA9IG53ICogaW1nU2NhbGU7XG4gICAgICAgICAgICAgIHZhciBpbWdIID0gbmggKiBpbWdTY2FsZTtcblxuICAgICAgICAgICAgICBpZiAoX2h0T3B0aW9uLmxvZ29NYXhXaWR0aCB8fCBfaHRPcHRpb24ubG9nb01heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclcgPSBpbWdXO1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lckggPSBpbWdIO1xuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclggPSAoX2h0T3B0aW9uLndpZHRoICsgX2h0T3B0aW9uLnF1aWV0Wm9uZSAqIDIgLSBpbWdDb250YWluZXJXKSAvIDI7XG4gICAgICAgICAgICAgICAgaW1nQ29udGFpbmVyWSA9XG4gICAgICAgICAgICAgICAgICAoX2h0T3B0aW9uLmhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgIF9odE9wdGlvbi50aXRsZUhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgIF9odE9wdGlvbi5xdWlldFpvbmUgKiAyIC1cbiAgICAgICAgICAgICAgICAgICAgaW1nQ29udGFpbmVySCkgL1xuICAgICAgICAgICAgICAgICAgMjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIERpZCBOb3QgVXNlIFRyYW5zcGFyZW50IExvZ28gSW1hZ2VcbiAgICAgICAgICAgICAgaWYgKCFfaHRPcHRpb24ubG9nb0JhY2tncm91bmRUcmFuc3BhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vaWYgKCFfaHRPcHRpb24ubG9nb0JhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgICAgIC8vX2h0T3B0aW9uLmxvZ29CYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxTdHlsZSA9IF9odE9wdGlvbi5sb2dvQmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgICAgICAgICAgX29Db250ZXh0LmZpbGxSZWN0KGltZ0NvbnRhaW5lclgsIGltZ0NvbnRhaW5lclksIGltZ0NvbnRhaW5lclcsIGltZ0NvbnRhaW5lckgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBpbWFnZVNtb290aGluZ1F1YWxpdHkgPSBfb0NvbnRleHQuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5O1xuICAgICAgICAgICAgICB2YXIgaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gX29Db250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgICAgICAgICAgX29Db250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSAnaGlnaCc7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgaW1nLFxuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lclggKyAoaW1nQ29udGFpbmVyVyAtIGltZ1cpIC8gMixcbiAgICAgICAgICAgICAgICBpbWdDb250YWluZXJZICsgKGltZ0NvbnRhaW5lckggLSBpbWdIKSAvIDIsXG4gICAgICAgICAgICAgICAgaW1nVyxcbiAgICAgICAgICAgICAgICBpbWdIXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBpbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgICAgICAgICAgIF9vQ29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSBpbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgICAgICAgICAgIGRyYXdRdWlldFpvbmVDb2xvcigpO1xuICAgICAgICAgICAgICBfdGhpcy5fYklzUGFpbnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgX3RoaXMubWFrZUltYWdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaHRPcHRpb24ubG9nbykge1xuICAgICAgICAgICAgICAvLyBMb2dvIEltYWdlXG4gICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVMb2dvSW1nKGltZyk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgLy8gaW1nLmNyb3NzT3JpZ2luPVwiQW5vbnltb3VzXCI7XG4gICAgICAgICAgICAgIGlmIChfaHRPcHRpb24uY3Jvc3NPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGltZy5jcm9zc09yaWdpbiA9IF9odE9wdGlvbi5jcm9zc09yaWdpbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbWcub3JpZ2luYWxTcmMgPSBfaHRPcHRpb24ubG9nbztcbiAgICAgICAgICAgICAgaW1nLnNyYyA9IF9odE9wdGlvbi5sb2dvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZHJhd1F1aWV0Wm9uZUNvbG9yKCk7XG4gICAgICAgICAgICAgIHRoaXMuX2JJc1BhaW50ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLm1ha2VJbWFnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTWFrZSB0aGUgaW1hZ2UgZnJvbSBDYW52YXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgRGF0YSBVUkkuXG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5tYWtlSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2JJc1BhaW50ZWQpIHtcbiAgICAgICAgICAgIF9zYWZlU2V0RGF0YVVSSS5jYWxsKHRoaXMsIF9vbk1ha2VJbWFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gd2hldGhlciB0aGUgUVJDb2RlIGlzIHBhaW50ZWQgb3Igbm90XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5pc1BhaW50ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2JJc1BhaW50ZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSBRUkNvZGVcbiAgICAgICAgICovXG4gICAgICAgIERyYXdpbmcucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX29Db250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9lbENhbnZhcy53aWR0aCwgdGhpcy5fZWxDYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICB0aGlzLl9iSXNQYWludGVkID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgRHJhd2luZy5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX29Db250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9lbENhbnZhcy53aWR0aCwgdGhpcy5fZWxDYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICB0aGlzLl9iSXNQYWludGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuTnVtYmVyXG4gICAgICAgICAqL1xuICAgICAgICBEcmF3aW5nLnByb3RvdHlwZS5yb3VuZCA9IGZ1bmN0aW9uIChuTnVtYmVyKSB7XG4gICAgICAgICAgaWYgKCFuTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbk51bWJlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihuTnVtYmVyICogMTAwMCkgLyAxMDAwO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBEcmF3aW5nO1xuICAgICAgfSkoKTtcblxuICAvKipcbiAgICogR2V0IHRoZSB0eXBlIGJ5IHN0cmluZyBsZW5ndGhcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNUZXh0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuQ29ycmVjdExldmVsXG4gICAqIEByZXR1cm4ge051bWJlcn0gdHlwZVxuICAgKi9cbiAgZnVuY3Rpb24gX2dldFR5cGVOdW1iZXIoc1RleHQsIF9odE9wdGlvbikge1xuICAgIHZhciBuQ29ycmVjdExldmVsID0gX2h0T3B0aW9uLmNvcnJlY3RMZXZlbDtcblxuICAgIHZhciBuVHlwZSA9IDE7XG4gICAgdmFyIGxlbmd0aCA9IF9nZXRVVEY4TGVuZ3RoKHNUZXh0KTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBRUkNvZGVMaW1pdExlbmd0aC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIG5MaW1pdCA9IDA7XG4gICAgICBzd2l0Y2ggKG5Db3JyZWN0TGV2ZWwpIHtcbiAgICAgICAgY2FzZSBRUkVycm9yQ29ycmVjdExldmVsLkw6XG4gICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bMF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUVJFcnJvckNvcnJlY3RMZXZlbC5NOlxuICAgICAgICAgIG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuUTpcbiAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVsyXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBRUkVycm9yQ29ycmVjdExldmVsLkg6XG4gICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bM107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChsZW5ndGggPD0gbkxpbWl0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgblR5cGUrKztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5UeXBlID4gUVJDb2RlTGltaXRMZW5ndGgubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUb28gbG9uZyBkYXRhLiB0aGUgQ29ycmVjdExldmVsLicgK1xuICAgICAgICAgIFsnTScsICdMJywgJ0gnLCAnUSddW25Db3JyZWN0TGV2ZWxdICtcbiAgICAgICAgICAnIGxpbWl0IGxlbmd0aCBpcyAnICtcbiAgICAgICAgICBuTGltaXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKF9odE9wdGlvbi52ZXJzaW9uICE9IDApIHtcbiAgICAgIGlmIChuVHlwZSA8PSBfaHRPcHRpb24udmVyc2lvbikge1xuICAgICAgICBuVHlwZSA9IF9odE9wdGlvbi52ZXJzaW9uO1xuICAgICAgICBfaHRPcHRpb24ucnVuVmVyc2lvbiA9IG5UeXBlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdRUiBDb2RlIHZlcnNpb24gJyArIF9odE9wdGlvbi52ZXJzaW9uICsgJyB0b28gc21hbGwsIHJ1biB2ZXJzaW9uIHVzZSAnICsgblR5cGVcbiAgICAgICAgKTtcbiAgICAgICAgX2h0T3B0aW9uLnJ1blZlcnNpb24gPSBuVHlwZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5UeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldFVURjhMZW5ndGgoc1RleHQpIHtcbiAgICB2YXIgcmVwbGFjZWRUZXh0ID0gZW5jb2RlVVJJKHNUZXh0KVxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC5yZXBsYWNlKC9cXCVbMC05YS1mQS1GXXsyfS9nLCAnYScpO1xuICAgIHJldHVybiByZXBsYWNlZFRleHQubGVuZ3RoICsgKHJlcGxhY2VkVGV4dC5sZW5ndGggIT0gc1RleHQubGVuZ3RoID8gMyA6IDApO1xuICB9XG5cbiAgUVJDb2RlID0gZnVuY3Rpb24gKGVsLCB2T3B0aW9uKSB7XG4gICAgdGhpcy5faHRPcHRpb24gPSB7XG4gICAgICB3aWR0aDogMjU2LFxuICAgICAgaGVpZ2h0OiAyNTYsXG4gICAgICB0eXBlTnVtYmVyOiA0LFxuICAgICAgY29sb3JEYXJrOiAnIzAwMDAwMCcsXG4gICAgICBjb2xvckxpZ2h0OiAnI2ZmZmZmZicsXG4gICAgICBjb3JyZWN0TGV2ZWw6IFFSRXJyb3JDb3JyZWN0TGV2ZWwuSCxcblxuICAgICAgZG90U2NhbGU6IDEsIC8vIEZvciBib2R5IGJsb2NrLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG5cbiAgICAgIGRvdFNjYWxlVGltaW5nOiAxLCAvLyBEYWZhdWx0IGZvciB0aW1pbmcgYmxvY2sgLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG4gICAgICBkb3RTY2FsZVRpbWluZ19IOiB1bmRlZmluZWQsIC8vIEZvciBob3Jpem9udGFsIHRpbWluZyBibG9jaywgbXVzdCBiZSBncmVhdGVyIHRoYW4gMCwgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEuIGRlZmF1bHQgaXMgMVxuICAgICAgZG90U2NhbGVUaW1pbmdfVjogdW5kZWZpbmVkLCAvLyBGb3IgdmVydGljYWwgdGltaW5nIGJsb2NrLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG5cbiAgICAgIGRvdFNjYWxlQTogMSwgLy8gRGFmYXVsdCBmb3IgYWxpZ25tZW50IGJsb2NrLCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMS4gZGVmYXVsdCBpcyAxXG4gICAgICBkb3RTY2FsZUFPOiB1bmRlZmluZWQsIC8vIEZvciBhbGlnbm1lbnQgb3V0ZXIgYmxvY2ssIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAsIGxlc3MgdGhhbiBvciBlcXVhbCB0byAxLiBkZWZhdWx0IGlzIDFcbiAgICAgIGRvdFNjYWxlQUk6IHVuZGVmaW5lZCwgLy8gRm9yIGFsaWdubWVudCBpbm5lciBibG9jaywgbXVzdCBiZSBncmVhdGVyIHRoYW4gMCwgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEuIGRlZmF1bHQgaXMgMVxuXG4gICAgICBxdWlldFpvbmU6IDAsXG4gICAgICBxdWlldFpvbmVDb2xvcjogJ3JnYmEoMCwwLDAsMCknLFxuXG4gICAgICB0aXRsZTogJycsXG4gICAgICB0aXRsZUZvbnQ6ICdub3JtYWwgbm9ybWFsIGJvbGQgMTZweCBBcmlhbCcsXG4gICAgICB0aXRsZUNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICB0aXRsZUJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgdGl0bGVIZWlnaHQ6IDAsIC8vIFRpdGxlIEhlaWdodCwgSW5jbHVkZSBzdWJUaXRsZVxuICAgICAgdGl0bGVUb3A6IDMwLCAvLyBkcmF3cyB5IGNvb3JkaW5hdGVzLiBkZWZhdWx0IGlzIDMwXG5cbiAgICAgIHN1YlRpdGxlOiAnJyxcbiAgICAgIHN1YlRpdGxlRm9udDogJ25vcm1hbCBub3JtYWwgbm9ybWFsIDE0cHggQXJpYWwnLFxuICAgICAgc3ViVGl0bGVDb2xvcjogJyM0RjRGNEYnLFxuICAgICAgc3ViVGl0bGVUb3A6IDYwLCAvLyBkcmF3cyB5IGNvb3JkaW5hdGVzLiBkZWZhdWx0IGlzIDBcblxuICAgICAgbG9nbzogdW5kZWZpbmVkLFxuICAgICAgbG9nb1dpZHRoOiB1bmRlZmluZWQsXG4gICAgICBsb2dvSGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICBsb2dvTWF4V2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgIGxvZ29NYXhIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgIGxvZ29CYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIGxvZ29CYWNrZ3JvdW5kVHJhbnNwYXJlbnQ6IGZhbHNlLFxuXG4gICAgICAvLyA9PT0gUG9zb3Rpb24gUGF0dGVybihFeWUpIENvbG9yXG4gICAgICBQTzogdW5kZWZpbmVkLCAvLyBHbG9iYWwgUG9zb3Rpb24gT3V0ZXIgY29sb3IuIGlmIG5vdCBzZXQsIHRoZSBkZWZhdXQgaXMgYGNvbG9yRGFya2BcbiAgICAgIFBJOiB1bmRlZmluZWQsIC8vIEdsb2JhbCBQb3NvdGlvbiBJbm5lciBjb2xvci4gaWYgbm90IHNldCwgdGhlIGRlZmF1dCBpcyBgY29sb3JEYXJrYFxuICAgICAgUE9fVEw6IHVuZGVmaW5lZCwgLy8gUG9zb3Rpb24gT3V0ZXIgLSBUb3AgTGVmdFxuICAgICAgUElfVEw6IHVuZGVmaW5lZCwgLy8gUG9zb3Rpb24gSW5uZXIgLSBUb3AgTGVmdFxuICAgICAgUE9fVFI6IHVuZGVmaW5lZCwgLy8gUG9zb3Rpb24gT3V0ZXIgLSBUb3AgUmlnaHRcbiAgICAgIFBJX1RSOiB1bmRlZmluZWQsIC8vIFBvc290aW9uIElubmVyIC0gVG9wIFJpZ2h0XG4gICAgICBQT19CTDogdW5kZWZpbmVkLCAvLyBQb3NvdGlvbiBPdXRlciAtIEJvdHRvbSBMZWZ0XG4gICAgICBQSV9CTDogdW5kZWZpbmVkLCAvLyBQb3NvdGlvbiBJbm5lciAtIEJvdHRvbSBMZWZ0XG5cbiAgICAgIC8vID09PSBBbGlnbm1lbnQgQ29sb3JcbiAgICAgIEFPOiB1bmRlZmluZWQsIC8vIEFsaWdubWVudCBPdXRlci4gaWYgbm90IHNldCwgdGhlIGRlZmF1dCBpcyBgY29sb3JEYXJrYFxuICAgICAgQUk6IHVuZGVmaW5lZCwgLy8gQWxpZ25tZW50IElubmVyLiBpZiBub3Qgc2V0LCB0aGUgZGVmYXV0IGlzIGBjb2xvckRhcmtgXG5cbiAgICAgIC8vID09PSBUaW1pbmcgUGF0dGVybiBDb2xvclxuICAgICAgdGltaW5nOiB1bmRlZmluZWQsIC8vIEdsb2JhbCBUaW1pbmcgY29sb3IuIGlmIG5vdCBzZXQsIHRoZSBkZWZhdXQgaXMgYGNvbG9yRGFya2BcbiAgICAgIHRpbWluZ19IOiB1bmRlZmluZWQsIC8vIEhvcml6b250YWwgdGltaW5nIGNvbG9yXG4gICAgICB0aW1pbmdfVjogdW5kZWZpbmVkLCAvLyBWZXJ0aWNhbCB0aW1pbmcgY29sb3JcblxuICAgICAgLy8gPT09PSBCYWNrZ3JvdWQgSW1hZ2VcbiAgICAgIGJhY2tncm91bmRJbWFnZTogdW5kZWZpbmVkLCAvLyBCYWNrZ3JvdW5kIEltYWdlXG4gICAgICBiYWNrZ3JvdW5kSW1hZ2VBbHBoYTogMSwgLy8gQmFja2dyb3VuZCBpbWFnZSB0cmFuc3BhcmVuY3ksIHZhbHVlIGJldHdlZW4gMCBhbmQgMS4gZGVmYXVsdCBpcyAxLlxuICAgICAgYXV0b0NvbG9yOiBmYWxzZSwgLy8gQXV0b21hdGljIGNvbG9yIGFkanVzdG1lbnQoZm9yIGRhdGEgYmxvY2spXG4gICAgICBhdXRvQ29sb3JEYXJrOiAncmdiYSgwLCAwLCAwLCAuNiknLCAvLyBBdXRvbWF0aWMgY29sb3I6IGRhcmsgQ1NTIGNvbG9yXG4gICAgICBhdXRvQ29sb3JMaWdodDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgLjcpJywgLy8gQXV0b21hdGljIGNvbG9yOiBsaWdodCBDU1MgY29sb3JcblxuICAgICAgLy8gPT09PSBFdmVudCBIYW5kbGVyXG4gICAgICBvblJlbmRlcmluZ1N0YXJ0OiB1bmRlZmluZWQsXG4gICAgICBvblJlbmRlcmluZ0VuZDogdW5kZWZpbmVkLFxuXG4gICAgICAvLyA9PT09IFZlcnNpb25zXG4gICAgICB2ZXJzaW9uOiAwLCAvLyBUaGUgc3ltYm9sIHZlcnNpb25zIG9mIFFSIENvZGUgcmFuZ2UgZnJvbSBWZXJzaW9uIDEgdG8gVmVyc2lvbiA0MC4gZGVmYXVsdCAwIG1lYW5zIGF1dG9tYXRpY2FsbHkgY2hvb3NlIHRoZSBjbG9zZXN0IHZlcnNpb24gYmFzZWQgb24gdGhlIHRleHQgbGVuZ3RoLlxuXG4gICAgICAvLyA9PT09IFRvb2x0aXBcbiAgICAgIHRvb2x0aXA6IGZhbHNlLCAvLyBXaGV0aGVyIHNldCB0aGUgUVJDb2RlIFRleHQgYXMgdGhlIHRpdGxlIGF0dHJpYnV0ZSB2YWx1ZSBvZiB0aGUgaW1hZ2VcblxuICAgICAgLy8gPT09PSBCaW5hcnkoaGV4KSBkYXRhIG1vZGVcbiAgICAgIGJpbmFyeTogZmFsc2UsIC8vIFdoZXRoZXIgaXQgaXMgYmluYXJ5IG1vZGUsIGRlZmF1bHQgaXMgdGV4dCBtb2RlLlxuXG4gICAgICAvLyA9PT09IERyYXdpbmcgbWV0aG9kXG4gICAgICBkcmF3ZXI6ICdjYW52YXMnLCAvLyBEcmF3aW5nIG1ldGhvZDogY2FudmFzLCBzdmcoQ2hyb21lLCBGRiwgSUU5KylcblxuICAgICAgLy8gPT09PSBDT1JTXG4gICAgICBjcm9zc09yaWdpbjogbnVsbCwgLy8gU3RyaW5nIHdoaWNoIHNwZWNpZmllcyB0aGUgQ09SUyBzZXR0aW5nIHRvIHVzZSB3aGVuIHJldHJpZXZpbmcgdGhlIGltYWdlLiBudWxsIG1lYW5zIHRoYXQgdGhlIGNyb3NzT3JpZ2luIGF0dHJpYnV0ZSBpcyBub3Qgc2V0LlxuXG4gICAgICAvLyBVVEYtOCB3aXRob3V0IEJPTVxuICAgICAgdXRmOFdpdGhvdXRCT006IHRydWVcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB2T3B0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgdk9wdGlvbiA9IHtcbiAgICAgICAgdGV4dDogdk9wdGlvblxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBPdmVyd3JpdGVzIG9wdGlvbnNcbiAgICBpZiAodk9wdGlvbikge1xuICAgICAgZm9yICh2YXIgaSBpbiB2T3B0aW9uKSB7XG4gICAgICAgIHRoaXMuX2h0T3B0aW9uW2ldID0gdk9wdGlvbltpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faHRPcHRpb24udmVyc2lvbiA8IDAgfHwgdGhpcy5faHRPcHRpb24udmVyc2lvbiA+IDQwKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJRUiBDb2RlIHZlcnNpb24gJ1wiICsgdGhpcy5faHRPcHRpb24udmVyc2lvbiArIFwiJyBpcyBpbnZhbGlkYXRlLCByZXNldCB0byAwXCIpO1xuICAgICAgdGhpcy5faHRPcHRpb24udmVyc2lvbiA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZSA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGUgK1xuICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBkb3RTY2FsZSBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZSA9IDE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZyA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmcgK1xuICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBkb3RTY2FsZVRpbWluZyBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZyA9IDE7XG4gICAgfVxuICAgIGlmICh0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19IKSB7XG4gICAgICBpZiAodGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfSCA8IDAgfHwgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfSCA+IDEpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX0ggK1xuICAgICAgICAgICAgJyAsIGlzIGludmFsaWRhdGUsIGRvdFNjYWxlVGltaW5nX0ggbXVzdCBncmVhdGVyIHRoYW4gMCwgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEsIG5vdyByZXNldCB0byAxLiAnXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX0ggPSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19IID0gdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX1YpIHtcbiAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19WIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZ19WID4gMSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfViArXG4gICAgICAgICAgICAnICwgaXMgaW52YWxpZGF0ZSwgZG90U2NhbGVUaW1pbmdfViBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVUaW1pbmdfViA9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlVGltaW5nX1YgPSB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZVRpbWluZztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faHRPcHRpb24uZG90U2NhbGVBIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUEgPiAxKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQSArXG4gICAgICAgICAgJyAsIGlzIGludmFsaWRhdGUsIGRvdFNjYWxlQSBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUEgPSAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5faHRPcHRpb24uZG90U2NhbGVBTykge1xuICAgICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQU8gPCAwIHx8IHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQU8gPiAxKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFPICtcbiAgICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBkb3RTY2FsZUFPIG11c3QgZ3JlYXRlciB0aGFuIDAsIGxlc3MgdGhhbiBvciBlcXVhbCB0byAxLCBub3cgcmVzZXQgdG8gMS4gJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFPID0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVBTyA9IHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQUkpIHtcbiAgICAgIGlmICh0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFJIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUFJID4gMSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVBSSArXG4gICAgICAgICAgICAnICwgaXMgaW52YWxpZGF0ZSwgZG90U2NhbGVBSSBtdXN0IGdyZWF0ZXIgdGhhbiAwLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5faHRPcHRpb24uZG90U2NhbGVBSSA9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2h0T3B0aW9uLmRvdFNjYWxlQUkgPSB0aGlzLl9odE9wdGlvbi5kb3RTY2FsZUE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLmJhY2tncm91bmRJbWFnZUFscGhhIDwgMCB8fCB0aGlzLl9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgdGhpcy5faHRPcHRpb24uYmFja2dyb3VuZEltYWdlQWxwaGEgK1xuICAgICAgICAgICcgLCBpcyBpbnZhbGlkYXRlLCBiYWNrZ3JvdW5kSW1hZ2VBbHBoYSBtdXN0IGJldHdlZW4gMCBhbmQgMSwgbm93IHJlc2V0IHRvIDEuICdcbiAgICAgICk7XG4gICAgICB0aGlzLl9odE9wdGlvbi5iYWNrZ3JvdW5kSW1hZ2VBbHBoYSA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5faHRPcHRpb24uaGVpZ2h0ID0gdGhpcy5faHRPcHRpb24uaGVpZ2h0ICsgdGhpcy5faHRPcHRpb24udGl0bGVIZWlnaHQ7XG4gICAgaWYgKHR5cGVvZiBlbCA9PSAnc3RyaW5nJykge1xuICAgICAgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuX2h0T3B0aW9uLmRyYXdlciB8fFxuICAgICAgKHRoaXMuX2h0T3B0aW9uLmRyYXdlciAhPSAnc3ZnJyAmJiB0aGlzLl9odE9wdGlvbi5kcmF3ZXIgIT0gJ2NhbnZhcycpXG4gICAgKSB7XG4gICAgICB0aGlzLl9odE9wdGlvbi5kcmF3ZXIgPSAnY2FudmFzJztcbiAgICB9XG5cbiAgICB0aGlzLl9hbmRyb2lkID0gX2dldEFuZHJvaWQoKTtcbiAgICB0aGlzLl9lbCA9IGVsO1xuICAgIHRoaXMuX29RUkNvZGUgPSBudWxsO1xuXG4gICAgdmFyIF9odE9wdGlvbkNsb25lID0ge307XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9odE9wdGlvbikge1xuICAgICAgX2h0T3B0aW9uQ2xvbmVbaV0gPSB0aGlzLl9odE9wdGlvbltpXTtcbiAgICB9XG4gICAgdGhpcy5fb0RyYXdpbmcgPSBuZXcgRHJhd2luZyh0aGlzLl9lbCwgX2h0T3B0aW9uQ2xvbmUpO1xuXG4gICAgaWYgKHRoaXMuX2h0T3B0aW9uLnRleHQpIHtcbiAgICAgIHRoaXMubWFrZUNvZGUodGhpcy5faHRPcHRpb24udGV4dCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlIHRoZSBRUkNvZGVcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNUZXh0IGxpbmsgZGF0YVxuICAgKi9cbiAgUVJDb2RlLnByb3RvdHlwZS5tYWtlQ29kZSA9IGZ1bmN0aW9uIChzVGV4dCkge1xuICAgIHRoaXMuX29RUkNvZGUgPSBuZXcgUVJDb2RlTW9kZWwoXG4gICAgICBfZ2V0VHlwZU51bWJlcihzVGV4dCwgdGhpcy5faHRPcHRpb24pLFxuICAgICAgdGhpcy5faHRPcHRpb24uY29ycmVjdExldmVsXG4gICAgKTtcbiAgICB0aGlzLl9vUVJDb2RlLmFkZERhdGEoc1RleHQsIHRoaXMuX2h0T3B0aW9uLmJpbmFyeSwgdGhpcy5faHRPcHRpb24udXRmOFdpdGhvdXRCT00pO1xuICAgIHRoaXMuX29RUkNvZGUubWFrZSgpO1xuICAgIGlmICh0aGlzLl9odE9wdGlvbi50b29sdGlwKSB7XG4gICAgICB0aGlzLl9lbC50aXRsZSA9IHNUZXh0O1xuICAgIH1cbiAgICB0aGlzLl9vRHJhd2luZy5kcmF3KHRoaXMuX29RUkNvZGUpO1xuICAgIC8vXHRcdHRoaXMubWFrZUltYWdlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2UgdGhlIEltYWdlIGZyb20gQ2FudmFzIGVsZW1lbnRcbiAgICogLSBJdCBvY2N1cnMgYXV0b21hdGljYWxseVxuICAgKiAtIEFuZHJvaWQgYmVsb3cgMyBkb2Vzbid0IHN1cHBvcnQgRGF0YS1VUkkgc3BlYy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIFFSQ29kZS5wcm90b3R5cGUubWFrZUltYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5fb0RyYXdpbmcubWFrZUltYWdlID09ICdmdW5jdGlvbicgJiYgKCF0aGlzLl9hbmRyb2lkIHx8IHRoaXMuX2FuZHJvaWQgPj0gMykpIHtcbiAgICAgIHRoaXMuX29EcmF3aW5nLm1ha2VJbWFnZSgpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXIgdGhlIFFSQ29kZVxuICAgKi9cbiAgUVJDb2RlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9vRHJhd2luZy5yZW1vdmUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVzaXplIHRoZSBRUkNvZGVcbiAgICovXG4gIFFSQ29kZS5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLl9vRHJhd2luZy5faHRPcHRpb24ud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9vRHJhd2luZy5faHRPcHRpb24uaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuX29EcmF3aW5nLmRyYXcodGhpcy5fb1FSQ29kZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vIENvbmZsaWN0XG4gICAqIEByZXR1cm4gUVJDb2RlIG9iamVjdFxuICAgKi9cbiAgUVJDb2RlLnByb3RvdHlwZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChyb290LlFSQ29kZSA9PT0gdGhpcykge1xuICAgICAgcm9vdC5RUkNvZGUgPSBfUVJDb2RlO1xuICAgIH1cbiAgICByZXR1cm4gUVJDb2RlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbmFtZSBRUkNvZGUuQ29ycmVjdExldmVsXG4gICAqL1xuICBRUkNvZGUuQ29ycmVjdExldmVsID0gUVJFcnJvckNvcnJlY3RMZXZlbDtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgLy8gRXhwb3J0IFFSQ29kZVxuXG4gIC8vIEFNRCAmIENNRCBDb21wYXRpYmlsaXR5XG4gIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgKGRlZmluZS5hbWQgfHwgZGVmaW5lLmNtZCkpIHtcbiAgICAvLyAxLiBEZWZpbmUgYW4gYW5vbnltb3VzIG1vZHVsZVxuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFFSQ29kZTtcbiAgICB9KTtcbiAgfVxuICAvLyBDb21tb25KUyBDb21wYXRpYmlsaXR5KGluY2x1ZGUgTm9kZUpTKVxuICBlbHNlIGlmIChmcmVlTW9kdWxlKSB7XG4gICAgLy8gTm9kZS5qc1xuICAgIChmcmVlTW9kdWxlLmV4cG9ydHMgPSBRUkNvZGUpLlFSQ29kZSA9IFFSQ29kZTtcbiAgICAvLyBPdGhlciBDb21tb25KU1xuICAgIGZyZWVFeHBvcnRzLlFSQ29kZSA9IFFSQ29kZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFeHBvcnQgR2xvYmFsXG4gICAgcm9vdC5RUkNvZGUgPSBRUkNvZGU7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFFSQ29kZTtcbiIsImltcG9ydCB7XG4gIEFGX1VSTF9TQ0hFTUUsXG4gIFZBTElEX0FGX1VSTF9QQVJUU19MRU5HVEgsXG4gIEdDTElEX0VYQ0xVREVfUEFSQU1TX0tFWVMsXG4gIEFGX0NVU1RPTV9FWENMVURFX1BBUkFNU19LRVlTXG59IGZyb20gJy4vY29uc3RhbnRzL3NtYXJ0U2NyaXB0JztcbmltcG9ydCB7IGdldFBhcmFtZXRlclZhbHVlLCBnZXRVUkxQYXJhbWV0ZXJzS1YsIHN0cmluZ2lmeVBhcmFtZXRlcnMgfSBmcm9tICcuL3V0aWxzL3NtYXJ0U2NyaXB0JztcbmltcG9ydCB7IGlzU2tpcHBlZFVSTCwgZ2V0R29vZ2xlQ2xpY2tJZFBhcmFtZXRlcnMgfSBmcm9tICcuL3NlcnZpY2VzL3NtYXJ0U2NyaXB0JztcbmltcG9ydCBRUkNvZGUgZnJvbSAnLi9xci9xcic7XG5RUkNvZGUoKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZ2VuZXJhdGVPbmVMaW5rVVJMID0gKHBhcmFtZXRlcnMgPSB7IGFmUGFyYW1ldGVyczoge30gfSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uZUxpbmtVUkwsIC8vW3N0cmluZ11cbiAgICAgIC8vZWFjaCBpbm5lciBwYXJhbWV0ZXIgb2YgW21lZGlhU291cmNlLGNhbXBhaWduLGNoYW5uZWwsYWQsYWRTZXQsZGVlcExpbmtWYWx1ZV0gc2hvdWxkIGFjY2VwdCBjb25maWcgb2JqZWN0OlxuICAgICAgLy97XG4gICAgICAvLyAga2V5czpbc3RyaW5nW11dLFxuICAgICAgLy8gIG92ZXJyaWRlVmFsdWVzOiB7a2V5OnZhbHVlfSxcbiAgICAgIC8vICBkZWZhdWx0VmFsdWU6IFtzdHJpbmddXG4gICAgICAvL31cbiAgICAgIGFmUGFyYW1ldGVyczoge1xuICAgICAgICBtZWRpYVNvdXJjZSxcbiAgICAgICAgY2FtcGFpZ24sXG4gICAgICAgIGNoYW5uZWwsXG4gICAgICAgIGFkLFxuICAgICAgICBhZFNldCxcbiAgICAgICAgZGVlcExpbmtWYWx1ZSxcbiAgICAgICAgYWZTdWIxLFxuICAgICAgICBhZlN1YjIsXG4gICAgICAgIGFmU3ViMyxcbiAgICAgICAgYWZTdWI0LFxuICAgICAgICBhZlN1YjUsXG4gICAgICAgIGFmQ3VzdG9tLCAvL2FycmF5IG9mIHtwYXJhbUtleTogW3N0cmluZ10sIGtleXM6W3N0cmluZ1tdXSwgb3ZlcnJpZGVWYWx1ZXM6IHtrZXk6dmFsdWV9LCBkZWZhdWx0VmFsdWU6IFtzdHJpbmddfVxuICAgICAgICBnb29nbGVDbGlja0lkS2V5IC8vIFtzdHJpbmddXG4gICAgICB9ID0ge30sXG4gICAgICByZWZlcnJlclNraXBMaXN0ID0gW10sIC8vW3N0cmluZ1tdXVxuICAgICAgdXJsU2tpcExpc3QgPSBbXSAvL1tzdHJpbmdbXV1cbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGNvbnN0IG9uZUxpbmtVUkxQYXJ0cyA9IChvbmVMaW5rVVJMIHx8ICcnKT8udG9TdHJpbmcoKS5tYXRjaChBRl9VUkxfU0NIRU1FKTtcbiAgICBpZiAoIW9uZUxpbmtVUkxQYXJ0cyB8fCBvbmVMaW5rVVJMUGFydHM/Lmxlbmd0aCA8IFZBTElEX0FGX1VSTF9QQVJUU19MRU5HVEgpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwib25lTGlua1VSTCBpcyBtaXNzaW5nIG9yIG5vdCBpbiB0aGUgY29ycmVjdCBmb3JtYXQsIGNhbid0IGdlbmVyYXRlIFVSTFwiLFxuICAgICAgICBvbmVMaW5rVVJMXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhU291cmNlPy5rZXlzPy5sZW5ndGggPT09IDAgJiYgIW1lZGlhU291cmNlPy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwibWVkaWFTb3VyY2UgaXMgbWlzc2luZyAoZGVmYXVsdCB2YWx1ZSB3YXMgbm90IHN1cHBsaWVkKSwgY2FuJ3QgZ2VuZXJhdGUgVVJMXCIsXG4gICAgICAgIG1lZGlhU291cmNlXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaXNTa2lwcGVkVVJMKHtcbiAgICAgICAgdXJsOiBkb2N1bWVudC5yZWZlcnJlcixcbiAgICAgICAgc2tpcEtleXM6IHJlZmVycmVyU2tpcExpc3QsXG4gICAgICAgIGVycm9yTXNnOiAnR2VuZXJhdGUgdXJsIGlzIHNraXBwZWQuIEhUVFAgcmVmZXJyZXIgY29udGFpbnMga2V5OidcbiAgICAgIH0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBpc1NraXBwZWRVUkwoe1xuICAgICAgICB1cmw6IGRvY3VtZW50LlVSTCxcbiAgICAgICAgc2tpcEtleXM6IHVybFNraXBMaXN0LFxuICAgICAgICBlcnJvck1zZzogJ0dlbmVyYXRlIHVybCBpcyBza2lwcGVkLiBVUkwgY29udGFpbnMgc3RyaW5nOidcbiAgICAgIH0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBhZl9qc193ZWI9dHJ1ZSBhbmQgYWZfc3NfdmVyPVt2ZXJzaW9uXSB3aWxsIGJlIGFkZGVkIHRvIGV2ZXJ5IFVSTCB0aGF0IHdhcyBnZW5lcmF0ZWQgdGhyb3VnaCB0aGlzIHNjcmlwdFxuICAgIGNvbnN0IGFmUGFyYW1zID0geyBhZl9qc193ZWI6IHRydWUsIGFmX3NzX3Zlcjogd2luZG93LkFGX1NNQVJUX1NDUklQVC52ZXJzaW9uIH07XG4gICAgY29uc3QgY3VycmVudFVSTFBhcmFtcyA9IGdldFVSTFBhcmFtZXRlcnNLVih3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuICAgIGlmIChtZWRpYVNvdXJjZSkge1xuICAgICAgY29uc3QgcGlkVmFsdWUgPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBtZWRpYVNvdXJjZSk7XG4gICAgICBpZiAoIXBpZFZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJtZWRpYVNvdXJjZSB3YXMgbm90IGZvdW5kIGluIHRoZSBVUkwgYW5kIGRlZmF1bHQgdmFsdWUgd2FzIG5vdCBzdXBwbGllZCwgY2FuJ3QgZ2VuZXJhdGUgVVJMXCIsXG4gICAgICAgICAgbWVkaWFTb3VyY2VcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBhZlBhcmFtc1sncGlkJ10gPSBwaWRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoY2FtcGFpZ24pIHtcbiAgICAgIGFmUGFyYW1zWydjJ10gPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBjYW1wYWlnbik7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGFmUGFyYW1zWydhZl9jaGFubmVsJ10gPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBjaGFubmVsKTtcbiAgICB9XG5cbiAgICBpZiAoYWQpIHtcbiAgICAgIGFmUGFyYW1zWydhZl9hZCddID0gZ2V0UGFyYW1ldGVyVmFsdWUoY3VycmVudFVSTFBhcmFtcywgYWQpO1xuICAgIH1cblxuICAgIGlmIChhZFNldCkge1xuICAgICAgYWZQYXJhbXNbJ2FmX2Fkc2V0J10gPSBnZXRQYXJhbWV0ZXJWYWx1ZShjdXJyZW50VVJMUGFyYW1zLCBhZFNldCk7XG4gICAgfVxuXG4gICAgaWYgKGRlZXBMaW5rVmFsdWUpIHtcbiAgICAgIGFmUGFyYW1zWydkZWVwX2xpbmtfdmFsdWUnXSA9IGdldFBhcmFtZXRlclZhbHVlKGN1cnJlbnRVUkxQYXJhbXMsIGRlZXBMaW5rVmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGFmU3VicyA9IFthZlN1YjEsIGFmU3ViMiwgYWZTdWIzLCBhZlN1YjQsIGFmU3ViNV07XG4gICAgYWZTdWJzLmZvckVhY2goKGFmU3ViLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGFmU3ViKSB7XG4gICAgICAgIGFmUGFyYW1zW2BhZl9zdWIke2luZGV4ICsgMX1gXSA9IGdldFBhcmFtZXRlclZhbHVlKGN1cnJlbnRVUkxQYXJhbXMsIGFmU3ViKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChnb29nbGVDbGlja0lkS2V5KSB7XG4gICAgICBpZiAoR0NMSURfRVhDTFVERV9QQVJBTVNfS0VZUy5maW5kKGsgPT4gayA9PT0gZ29vZ2xlQ2xpY2tJZEtleSkpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgICBcIkdvb2dsZSBDbGljayBJZCBQYXJhbUtleSBjYW4ndCBvdmVycmlkZSBBRiBQYXJhbWV0ZXJzIGtleXNcIixcbiAgICAgICAgICBnb29nbGVDbGlja0lkS2V5XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBnb29nbGVQYXJhbWV0ZXJzID0gZ2V0R29vZ2xlQ2xpY2tJZFBhcmFtZXRlcnMoZ29vZ2xlQ2xpY2tJZEtleSwgY3VycmVudFVSTFBhcmFtcyk7XG4gICAgICAgIE9iamVjdC5rZXlzKGdvb2dsZVBhcmFtZXRlcnMpLmZvckVhY2goZ3BrID0+IHtcbiAgICAgICAgICBhZlBhcmFtc1tncGtdID0gZ29vZ2xlUGFyYW1ldGVyc1tncGtdO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhZkN1c3RvbSkpIHtcbiAgICAgIGFmQ3VzdG9tLmZvckVhY2goY3VzdG9tUGFyYW0gPT4ge1xuICAgICAgICBpZiAoY3VzdG9tUGFyYW0/LnBhcmFtS2V5KSB7XG4gICAgICAgICAgY29uc3QgaXNPdmVycmlkZUV4aXN0aW5nS2V5ID0gQUZfQ1VTVE9NX0VYQ0xVREVfUEFSQU1TX0tFWVMuZmluZChcbiAgICAgICAgICAgIGsgPT4gayA9PT0gY3VzdG9tUGFyYW0/LnBhcmFtS2V5XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoY3VzdG9tUGFyYW0/LnBhcmFtS2V5ID09PSBnb29nbGVDbGlja0lkS2V5IHx8IGlzT3ZlcnJpZGVFeGlzdGluZ0tleSkge1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgICAgICAgXCJDdXN0b20gcGFyYW1ldGVyIFBhcmFtS2V5IGNhbid0IG92ZXJyaWRlIEdvb2dsZS1DbGljay1JZCBvciBBRiBQYXJhbWV0ZXJzIGtleXNcIixcbiAgICAgICAgICAgICAgY3VzdG9tUGFyYW1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFmUGFyYW1zW1tjdXN0b21QYXJhbS5wYXJhbUtleV1dID0gZ2V0UGFyYW1ldGVyVmFsdWUoY3VycmVudFVSTFBhcmFtcywgY3VzdG9tUGFyYW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZmluYWxQYXJhbXMgPSBzdHJpbmdpZnlQYXJhbWV0ZXJzKGFmUGFyYW1zKTtcbiAgICBjb25zdCBmaW5hbFVSTCA9IG9uZUxpbmtVUkwgKyBmaW5hbFBhcmFtcy5yZXBsYWNlKCcmJywgJz8nKTtcbiAgICBjb25zb2xlLmRlYnVnKCdHZW5lcmF0ZWQgT25lTGluayBVUkwnLCBmaW5hbFVSTCk7XG5cbiAgICB3aW5kb3cuQUZfU01BUlRfU0NSSVBULmRpc3BsYXlRckNvZGUgPSBmdW5jdGlvbiAoaHRtbElkKSB7XG4gICAgICBpZiAoIWZpbmFsVVJMKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoJ0NsaWNrVVJMIGlzIG5vdCB2YWxpZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGh0bWxJZCksIHtcbiAgICAgICAgdGV4dDogYCR7ZmluYWxVUkx9JmFmX3NzX3FyPXRydWVgXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB7IGNsaWNrVVJMOiBmaW5hbFVSTCB9O1xuICB9O1xuICB3aW5kb3cuQUZfU01BUlRfU0NSSVBUID0geyBnZW5lcmF0ZU9uZUxpbmtVUkwsIHZlcnNpb246ICcyJyB9O1xufSkoKTtcbiJdLCJuYW1lcyI6WyJBRl9VUkxfU0NIRU1FIiwiVkFMSURfQUZfVVJMX1BBUlRTX0xFTkdUSCIsIkdPT0dMRV9DTElDS19JRCIsIkFTU09DSUFURURfQURfS0VZV09SRCIsIkFGX0tFWVdPUkRTIiwiQUZfQ1VTVE9NX0VYQ0xVREVfUEFSQU1TX0tFWVMiLCJHQ0xJRF9FWENMVURFX1BBUkFNU19LRVlTIiwic3RyaW5naWZ5UGFyYW1ldGVycyIsInBhcmFtZXRlcnMiLCJwYXJhbVN0ciIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJjdXJyIiwia2V5IiwiY29uc29sZSIsImRlYnVnIiwiZ2V0UGFyYW1ldGVyVmFsdWUiLCJjdXJyZW50VVJMUGFyYW1zIiwiY29uZmlnIiwib3ZlcnJpZGVWYWx1ZXMiLCJkZWZhdWx0VmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJlcnJvciIsImZpcnN0TWF0Y2hlZEtleSIsImZpbmQiLCJ2YWx1ZSIsImdldFVSTFBhcmFtZXRlcnNLViIsInVybFNlYXJjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJzcGxpdCIsInBhcmFtIiwia3YiLCJpc1NraXBwZWRVUkwiLCJ1cmwiLCJza2lwS2V5cyIsImVycm9yTXNnIiwibG93ZXJVUkwiLCJ0b0xvd2VyQ2FzZSIsInNraXBLZXkiLCJpbmNsdWRlcyIsImdldEdvb2dsZUNsaWNrSWRQYXJhbWV0ZXJzIiwiZ2NpS2V5IiwiZ2NpUGFyYW0iLCJyZXN1bHQiLCJrZXl3b3JkUGFyYW0iLCJRUkNvZGUiLCJ1bmRlZmluZWQiLCJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwiZnJlZVNlbGYiLCJzZWxmIiwicm9vdCIsIkZ1bmN0aW9uIiwiZnJlZUV4cG9ydHMiLCJleHBvcnRzIiwibm9kZVR5cGUiLCJmcmVlTW9kdWxlIiwibW9kdWxlIiwiX1FSQ29kZSIsIlFSOGJpdEJ5dGUiLCJkYXRhIiwiYmluYXJ5IiwidXRmOFdpdGhvdXRCT00iLCJtb2RlIiwiUVJNb2RlIiwiTU9ERV84QklUX0JZVEUiLCJwYXJzZWREYXRhIiwiaSIsImwiLCJsZW5ndGgiLCJieXRlQXJyYXkiLCJjb2RlIiwiY2hhckNvZGVBdCIsInB1c2giLCJwcm90b3R5cGUiLCJjb25jYXQiLCJhcHBseSIsInVuc2hpZnQiLCJnZXRMZW5ndGgiLCJidWZmZXIiLCJ3cml0ZSIsInB1dCIsIlFSQ29kZU1vZGVsIiwidHlwZU51bWJlciIsImVycm9yQ29ycmVjdExldmVsIiwibW9kdWxlcyIsIm1vZHVsZUNvdW50IiwiZGF0YUNhY2hlIiwiZGF0YUxpc3QiLCJhZGREYXRhIiwibmV3RGF0YSIsImlzRGFyayIsInJvdyIsImNvbCIsIkVycm9yIiwiZ2V0RXllIiwiYmxvY2siLCJ0eXBlIiwiZ2V0TW9kdWxlQ291bnQiLCJtYWtlIiwibWFrZUltcGwiLCJnZXRCZXN0TWFza1BhdHRlcm4iLCJ0ZXN0IiwibWFza1BhdHRlcm4iLCJzZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuIiwic2V0dXBQb3NpdGlvbkFkanVzdFBhdHRlcm4iLCJzZXR1cFRpbWluZ1BhdHRlcm4iLCJzZXR1cFR5cGVJbmZvIiwic2V0dXBUeXBlTnVtYmVyIiwiY3JlYXRlRGF0YSIsIm1hcERhdGEiLCJwb3NOYW1lIiwiciIsImMiLCJtaW5Mb3N0UG9pbnQiLCJwYXR0ZXJuIiwibG9zdFBvaW50IiwiUVJVdGlsIiwiZ2V0TG9zdFBvaW50IiwiY3JlYXRlTW92aWVDbGlwIiwidGFyZ2V0X21jIiwiaW5zdGFuY2VfbmFtZSIsImRlcHRoIiwicXJfbWMiLCJjcmVhdGVFbXB0eU1vdmllQ2xpcCIsImNzIiwieSIsIngiLCJkYXJrIiwiYmVnaW5GaWxsIiwibW92ZVRvIiwibGluZVRvIiwiZW5kRmlsbCIsInBvcyIsImdldFBhdHRlcm5Qb3NpdGlvbiIsImoiLCJiaXRzIiwiZ2V0QkNIVHlwZU51bWJlciIsIm1vZCIsIk1hdGgiLCJmbG9vciIsImdldEJDSFR5cGVJbmZvIiwiaW5jIiwiYml0SW5kZXgiLCJieXRlSW5kZXgiLCJtYXNrIiwiZ2V0TWFzayIsIlBBRDAiLCJQQUQxIiwicnNCbG9ja3MiLCJRUlJTQmxvY2siLCJnZXRSU0Jsb2NrcyIsIlFSQml0QnVmZmVyIiwiZ2V0TGVuZ3RoSW5CaXRzIiwidG90YWxEYXRhQ291bnQiLCJkYXRhQ291bnQiLCJwdXRCaXQiLCJjcmVhdGVCeXRlcyIsIm9mZnNldCIsIm1heERjQ291bnQiLCJtYXhFY0NvdW50IiwiZGNkYXRhIiwiZWNkYXRhIiwiZGNDb3VudCIsImVjQ291bnQiLCJ0b3RhbENvdW50IiwibWF4IiwicnNQb2x5IiwiZ2V0RXJyb3JDb3JyZWN0UG9seW5vbWlhbCIsInJhd1BvbHkiLCJRUlBvbHlub21pYWwiLCJtb2RQb2x5IiwibW9kSW5kZXgiLCJnZXQiLCJ0b3RhbENvZGVDb3VudCIsImluZGV4IiwiTU9ERV9OVU1CRVIiLCJNT0RFX0FMUEhBX05VTSIsIk1PREVfS0FOSkkiLCJRUkVycm9yQ29ycmVjdExldmVsIiwiTCIsIk0iLCJRIiwiSCIsIlFSTWFza1BhdHRlcm4iLCJQQVRURVJOMDAwIiwiUEFUVEVSTjAwMSIsIlBBVFRFUk4wMTAiLCJQQVRURVJOMDExIiwiUEFUVEVSTjEwMCIsIlBBVFRFUk4xMDEiLCJQQVRURVJOMTEwIiwiUEFUVEVSTjExMSIsIlBBVFRFUk5fUE9TSVRJT05fVEFCTEUiLCJHMTUiLCJHMTgiLCJHMTVfTUFTSyIsImQiLCJnZXRCQ0hEaWdpdCIsImRpZ2l0IiwiZXJyb3JDb3JyZWN0TGVuZ3RoIiwiYSIsIm11bHRpcGx5IiwiUVJNYXRoIiwiZ2V4cCIsInFyQ29kZSIsInNhbWVDb3VudCIsImNvdW50IiwiZGFya0NvdW50IiwicmF0aW8iLCJhYnMiLCJnbG9nIiwibiIsIkxPR19UQUJMRSIsIkVYUF9UQUJMRSIsIm51bSIsInNoaWZ0IiwiZSIsIlJTX0JMT0NLX1RBQkxFIiwicnNCbG9jayIsImdldFJzQmxvY2tUYWJsZSIsImxpc3QiLCJidWZJbmRleCIsImJpdCIsIlFSQ29kZUxpbWl0TGVuZ3RoIiwiX2lzU3VwcG9ydENhbnZhcyIsIkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCIsIl9nZXRBbmRyb2lkIiwiYW5kcm9pZCIsInNBZ2VudCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFNYXQiLCJ0b1N0cmluZyIsIm1hdGNoIiwicGFyc2VGbG9hdCIsIkRyYXdpbmciLCJlbCIsImh0T3B0aW9uIiwiX2VsIiwiX2h0T3B0aW9uIiwiZHJhdyIsIm9RUkNvZGUiLCJuQ291bnQiLCJuV2lkdGgiLCJyb3VuZCIsIndpZHRoIiwibkhlaWdodCIsImhlaWdodCIsInRpdGxlSGVpZ2h0IiwicXVpZXRab25lIiwiYUhUTUwiLCJkaXZTdHlsZSIsImRyYXdXaWR0aCIsImRvdFNjYWxlIiwiZHJhd0hlaWdodCIsIm5vblJlcXVpcmVkQ29sb3JEYXJrIiwiY29sb3JEYXJrIiwibm9uUmVxdWlyZWRjb2xvckxpZ2h0IiwiY29sb3JMaWdodCIsImJhY2tncm91bmRJbWFnZSIsImF1dG9Db2xvciIsImJhY2tncm91bmRJbWFnZUVsZSIsImJhY2tncm91bmRJbWFnZUFscGhhIiwicXVpZXRab25lQ29sb3IiLCJ0aXRsZSIsInRpdGxlQ29sb3IiLCJmIiwidGl0bGVGb250IiwidGl0bGVUb3AiLCJ0aXRsZUJhY2tncm91bmRDb2xvciIsInN1YlRpdGxlIiwic3ViVGl0bGVUb3AiLCJzdWJUaXRsZUNvbG9yIiwic3ViVGl0bGVGb250IiwiYklzRGFyayIsImV5ZSIsImV5ZUNvbG9yRGFyayIsInN1YnN0cmluZyIsIm5vd0RhcmtDb2xvciIsInRpbWluZ19IIiwidGltaW5nIiwidGltaW5nX1YiLCJsb2dvIiwiaW1nIiwiSW1hZ2UiLCJjcm9zc09yaWdpbiIsInNyYyIsImltZ1ciLCJpbWdIIiwibG9nb1dpZHRoIiwibG9nb0hlaWdodCIsImltZ0RpdlN0eWxlIiwibG9nb0JhY2tncm91bmRUcmFuc3BhcmVudCIsImxvZ29CYWNrZ3JvdW5kQ29sb3IiLCJvblJlbmRlcmluZ1N0YXJ0IiwiaW5uZXJIVE1MIiwiam9pbiIsImVsVGFibGUiLCJjaGlsZE5vZGVzIiwibkxlZnRNYXJnaW5UYWJsZSIsIm9mZnNldFdpZHRoIiwiblRvcE1hcmdpblRhYmxlIiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJtYXJnaW4iLCJvblJlbmRlcmluZ0VuZCIsImNsZWFyIiwiX29uTWFrZUltYWdlIiwiZHJhd2VyIiwic3ZnRGF0YSIsIl9vQ29udGV4dCIsImdldFNlcmlhbGl6ZWRTdmciLCJkYXRhVVJMIiwiX2VsQ2FudmFzIiwidG9EYXRhVVJMIiwiX2FuZHJvaWQiLCJmYWN0b3IiLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwiZHJhd0ltYWdlIiwiaW1hZ2UiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwibm9kZU5hbWUiLCJhcmd1bWVudHMiLCJfc2FmZVNldERhdGFVUkkiLCJmU3VjY2VzcyIsImZGYWlsIiwiX2ZGYWlsIiwiX2ZTdWNjZXNzIiwiX2JTdXBwb3J0RGF0YVVSSSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZPbkVycm9yIiwiY2FsbCIsImZPblN1Y2Nlc3MiLCJvbmFib3J0Iiwib25lcnJvciIsIm9ubG9hZCIsIl9iSXNQYWludGVkIiwiYXBwZW5kQ2hpbGQiLCJnZXRDb250ZXh0IiwiQzJTIiwibGluZVdpZHRoIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJ0IiwiZHJhd1F1aWV0Wm9uZUNvbG9yIiwiYmdJbWciLCJnbG9iYWxBbHBoYSIsImltYWdlU21vb3RoaW5nUXVhbGl0eSIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsImRyYXdRcmNvZGUiLCJvcmlnaW5hbFNyYyIsIm5MZWZ0IiwiblRvcCIsIm5vd0RvdFNjYWxlIiwiZENvbG9yIiwibENvbG9yIiwiYXV0b0NvbG9yRGFyayIsImF1dG9Db2xvckxpZ2h0Iiwic3Ryb2tlU3R5bGUiLCJkb3RTY2FsZUFPIiwiZG90U2NhbGVBSSIsIkFJIiwiQU8iLCJkb3RTY2FsZVRpbWluZ19IIiwiZG90U2NhbGVUaW1pbmdfViIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJmaWxsVGV4dCIsImdlbmVyYXRlTG9nb0ltZyIsImltZ0NvbnRhaW5lclciLCJpbWdDb250YWluZXJIIiwibG9nb01heFdpZHRoIiwibG9nb01heEhlaWdodCIsIm53IiwibmgiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwiaW1nQ29udGFpbmVyWCIsImltZ0NvbnRhaW5lclkiLCJpbWdTY2FsZSIsIm1pbiIsIl90aGlzIiwibWFrZUltYWdlIiwiaXNQYWludGVkIiwiY2xlYXJSZWN0IiwicmVtb3ZlIiwibk51bWJlciIsIl9nZXRUeXBlTnVtYmVyIiwic1RleHQiLCJuQ29ycmVjdExldmVsIiwiY29ycmVjdExldmVsIiwiblR5cGUiLCJfZ2V0VVRGOExlbmd0aCIsImxlbiIsIm5MaW1pdCIsInZlcnNpb24iLCJydW5WZXJzaW9uIiwid2FybiIsInJlcGxhY2VkVGV4dCIsImVuY29kZVVSSSIsInZPcHRpb24iLCJkb3RTY2FsZVRpbWluZyIsImRvdFNjYWxlQSIsIlBPIiwiUEkiLCJQT19UTCIsIlBJX1RMIiwiUE9fVFIiLCJQSV9UUiIsIlBPX0JMIiwiUElfQkwiLCJ0b29sdGlwIiwidGV4dCIsImdldEVsZW1lbnRCeUlkIiwiX29RUkNvZGUiLCJfaHRPcHRpb25DbG9uZSIsIl9vRHJhd2luZyIsIm1ha2VDb2RlIiwicmVzaXplIiwibm9Db25mbGljdCIsIkNvcnJlY3RMZXZlbCIsImRlZmluZSIsImFtZCIsImNtZCIsImdlbmVyYXRlT25lTGlua1VSTCIsImFmUGFyYW1ldGVycyIsIm9uZUxpbmtVUkwiLCJtZWRpYVNvdXJjZSIsImNhbXBhaWduIiwiY2hhbm5lbCIsImFkIiwiYWRTZXQiLCJkZWVwTGlua1ZhbHVlIiwiYWZTdWIxIiwiYWZTdWIyIiwiYWZTdWIzIiwiYWZTdWI0IiwiYWZTdWI1IiwiYWZDdXN0b20iLCJnb29nbGVDbGlja0lkS2V5IiwicmVmZXJyZXJTa2lwTGlzdCIsInVybFNraXBMaXN0Iiwib25lTGlua1VSTFBhcnRzIiwicmVmZXJyZXIiLCJVUkwiLCJhZlBhcmFtcyIsImFmX2pzX3dlYiIsImFmX3NzX3ZlciIsIkFGX1NNQVJUX1NDUklQVCIsImxvY2F0aW9uIiwic2VhcmNoIiwicGlkVmFsdWUiLCJhZlN1YnMiLCJmb3JFYWNoIiwiYWZTdWIiLCJrIiwiZ29vZ2xlUGFyYW1ldGVycyIsImdwayIsImN1c3RvbVBhcmFtIiwicGFyYW1LZXkiLCJpc092ZXJyaWRlRXhpc3RpbmdLZXkiLCJmaW5hbFBhcmFtcyIsImZpbmFsVVJMIiwiZGlzcGxheVFyQ29kZSIsImh0bWxJZCIsImNsaWNrVVJMIl0sIm1hcHBpbmdzIjoiOzs7O0FBQU8sSUFBTUEsYUFBYSxHQUFHLDZDQUF0QjtBQUNBLElBQU1DLHlCQUF5QixHQUFHLENBQWxDO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLE9BQXhCO0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsU0FBOUI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsYUFBcEI7QUFDQSxJQUFNQyw2QkFBNkIsR0FBRyxDQUMzQyxLQUQyQyxFQUUzQyxHQUYyQyxFQUczQyxZQUgyQyxFQUkzQyxPQUoyQyxFQUszQyxVQUwyQyxFQU0zQyxpQkFOMkMsRUFPM0MsU0FQMkMsRUFRM0MsU0FSMkMsRUFTM0MsU0FUMkMsRUFVM0MsU0FWMkMsRUFXM0MsU0FYMkMs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RUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBbkd5QixFQW9HekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBcEd5QixFQXFHekIsQ0FBQyxFQUFELEVBQUssR0FBTCxFQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBckd5QixFQXNHekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBdEd5QixFQXVHekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBdkd5QixFQXdHekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBeEd5QixFQXlHekIsQ0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEdBQVQsRUFBYyxDQUFkLEVBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLENBekd5QixFQTBHekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBMUd5QixFQTJHekIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLENBM0d5QixFQTRHekIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLENBNUd5QixFQTZHekIsQ0FBQyxDQUFELEVBQUksR0FBSixFQUFTLEdBQVQsRUFBYyxFQUFkLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBN0d5QixFQThHekIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9C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