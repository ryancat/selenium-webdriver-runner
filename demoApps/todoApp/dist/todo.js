/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_scss__);
var cov_246rcclvy9=function(){var path='/Users/ryanchen/dev/selenium-webdriver-runner/demoApps/todoApp/src/app.js',hash='596ddd98bc74e9b52332e7b06f828b715574852c',Function=function(){}.constructor,global=new Function('return this')(),gcv='__coverage__',coverageData={path:'/Users/ryanchen/dev/selenium-webdriver-runner/demoApps/todoApp/src/app.js',statementMap:{'0':{start:{line:3,column:13},end:{line:29,column:1}},'1':{start:{line:10,column:21},end:{line:10,column:51}},'2':{start:{line:12,column:22},end:{line:12,column:61}},'3':{start:{line:19,column:4},end:{line:25,column:5}},'4':{start:{line:20,column:6},end:{line:22,column:7}},'5':{start:{line:21,column:8},end:{line:21,column:28}},'6':{start:{line:24,column:6},end:{line:24,column:48}},'7':{start:{line:27,column:4},end:{line:27,column:15}},'8':{start:{line:35,column:4},end:{line:35,column:30}},'9':{start:{line:38,column:4},end:{line:38,column:75}},'10':{start:{line:39,column:4},end:{line:39,column:77}},'11':{start:{line:40,column:4},end:{line:40,column:77}},'12':{start:{line:41,column:4},end:{line:41,column:77}},'13':{start:{line:42,column:4},end:{line:42,column:80}},'14':{start:{line:43,column:4},end:{line:43,column:70}},'15':{start:{line:44,column:4},end:{line:44,column:70}},'16':{start:{line:47,column:4},end:{line:47,column:23}},'17':{start:{line:48,column:4},end:{line:48,column:23}},'18':{start:{line:50,column:4},end:{line:50,column:33}},'19':{start:{line:51,column:4},end:{line:51,column:33}},'20':{start:{line:52,column:4},end:{line:52,column:31}},'21':{start:{line:53,column:4},end:{line:53,column:17}},'22':{start:{line:57,column:4},end:{line:59,column:6}},'23':{start:{line:58,column:6},end:{line:58,column:34}},'24':{start:{line:63,column:4},end:{line:65,column:6}},'25':{start:{line:64,column:6},end:{line:64,column:35}},'26':{start:{line:69,column:4},end:{line:69,column:79}},'27':{start:{line:70,column:4},end:{line:70,column:83}},'28':{start:{line:71,column:4},end:{line:71,column:80}},'29':{start:{line:72,column:4},end:{line:72,column:80}},'30':{start:{line:76,column:22},end:{line:76,column:45}},'31':{start:{line:78,column:4},end:{line:80,column:5}},'32':{start:{line:79,column:6},end:{line:79,column:12}},'33':{start:{line:82,column:4},end:{line:82,column:35}},'34':{start:{line:86,column:4},end:{line:86,column:31}},'35':{start:{line:91,column:17},end:{line:91,column:25}},'36':{start:{line:92,column:26},end:{line:92,column:78}},'37':{start:{line:94,column:4},end:{line:96,column:5}},'38':{start:{line:95,column:6},end:{line:95,column:12}},'39':{start:{line:98,column:19},end:{line:98,column:88}},'40':{start:{line:98,column:51},end:{line:98,column:87}},'41':{start:{line:100,column:4},end:{line:111,column:5}},'42':{start:{line:102,column:6},end:{line:102,column:29}},'43':{start:{line:104,column:9},end:{line:111,column:5}},'44':{start:{line:106,column:6},end:{line:106,column:25}},'45':{start:{line:108,column:9},end:{line:111,column:5}},'46':{start:{line:110,column:6},end:{line:110,column:31}},'47':{start:{line:116,column:17},end:{line:116,column:25}},'48':{start:{line:117,column:26},end:{line:117,column:78}},'49':{start:{line:119,column:4},end:{line:121,column:5}},'50':{start:{line:120,column:6},end:{line:120,column:12}},'51':{start:{line:123,column:19},end:{line:123,column:88}},'52':{start:{line:123,column:51},end:{line:123,column:87}},'53':{start:{line:125,column:4},end:{line:132,column:5}},'54':{start:{line:127,column:6},end:{line:127,column:29}},'55':{start:{line:129,column:9},end:{line:132,column:5}},'56':{start:{line:131,column:6},end:{line:131,column:27}},'57':{start:{line:136,column:4},end:{line:138,column:5}},'58':{start:{line:137,column:6},end:{line:137,column:12}},'59':{start:{line:141,column:4},end:{line:143,column:5}},'60':{start:{line:142,column:6},end:{line:142,column:31}},'61':{start:{line:145,column:4},end:{line:145,column:62}},'62':{start:{line:146,column:4},end:{line:146,column:47}},'63':{start:{line:147,column:4},end:{line:147,column:41}},'64':{start:{line:151,column:4},end:{line:153,column:5}},'65':{start:{line:152,column:6},end:{line:152,column:12}},'66':{start:{line:155,column:4},end:{line:155,column:42}},'67':{start:{line:156,column:4},end:{line:156,column:82}},'68':{start:{line:158,column:21},end:{line:158,column:75}},'69':{start:{line:159,column:4},end:{line:159,column:42}},'70':{start:{line:160,column:4},end:{line:160,column:46}},'71':{start:{line:161,column:4},end:{line:161,column:42}},'72':{start:{line:165,column:4},end:{line:167,column:5}},'73':{start:{line:166,column:6},end:{line:166,column:12}},'74':{start:{line:169,column:21},end:{line:169,column:100}},'75':{start:{line:170,column:4},end:{line:170,column:32}},'76':{start:{line:171,column:4},end:{line:171,column:45}},'77':{start:{line:175,column:4},end:{line:175,column:25}},'78':{start:{line:176,column:4},end:{line:176,column:40}},'79':{start:{line:180,column:4},end:{line:182,column:5}},'80':{start:{line:181,column:6},end:{line:181,column:12}},'81':{start:{line:184,column:4},end:{line:184,column:62}},'82':{start:{line:185,column:4},end:{line:185,column:47}},'83':{start:{line:189,column:19},end:{line:189,column:44}},'84':{start:{line:190,column:4},end:{line:190,column:33}},'85':{start:{line:191,column:4},end:{line:191,column:47}},'86':{start:{line:195,column:19},end:{line:195,column:44}},'87':{start:{line:196,column:4},end:{line:196,column:33}},'88':{start:{line:197,column:4},end:{line:197,column:47}},'89':{start:{line:201,column:4},end:{line:201,column:70}},'90':{start:{line:208,column:4},end:{line:208,column:43}},'91':{start:{line:209,column:4},end:{line:209,column:26}},'92':{start:{line:216,column:15},end:{line:216,column:43}},'93':{start:{line:218,column:4},end:{line:218,column:27}},'94':{start:{line:219,column:4},end:{line:219,column:41}},'95':{start:{line:220,column:4},end:{line:220,column:15}},'96':{start:{line:224,column:4},end:{line:224,column:35}},'97':{start:{line:228,column:4},end:{line:228,column:26}},'98':{start:{line:229,column:4},end:{line:229,column:49}},'99':{start:{line:235,column:4},end:{line:235,column:22}},'100':{start:{line:236,column:4},end:{line:236,column:43}},'101':{start:{line:240,column:4},end:{line:247,column:5}},'102':{start:{line:253,column:4},end:{line:253,column:22}},'103':{start:{line:254,column:4},end:{line:254,column:43}},'104':{start:{line:258,column:4},end:{line:264,column:5}},'105':{start:{line:269,column:0},end:{line:272,column:16}}},fnMap:{'0':{name:'(anonymous_0)',decl:{start:{line:10,column:14},end:{line:10,column:15}},loc:{start:{line:10,column:21},end:{line:10,column:51}},line:10},'1':{name:'(anonymous_1)',decl:{start:{line:12,column:14},end:{line:12,column:15}},loc:{start:{line:12,column:22},end:{line:12,column:61}},line:12},'2':{name:'(anonymous_2)',decl:{start:{line:18,column:15},end:{line:18,column:16}},loc:{start:{line:18,column:72},end:{line:28,column:3}},line:18},'3':{name:'(anonymous_3)',decl:{start:{line:33,column:2},end:{line:33,column:3}},loc:{start:{line:33,column:58},end:{line:54,column:3}},line:33},'4':{name:'(anonymous_4)',decl:{start:{line:56,column:2},end:{line:56,column:3}},loc:{start:{line:56,column:33},end:{line:60,column:3}},line:56},'5':{name:'(anonymous_5)',decl:{start:{line:57,column:22},end:{line:57,column:23}},loc:{start:{line:57,column:34},end:{line:59,column:5}},line:57},'6':{name:'(anonymous_6)',decl:{start:{line:62,column:2},end:{line:62,column:3}},loc:{start:{line:62,column:33},end:{line:66,column:3}},line:62},'7':{name:'(anonymous_7)',decl:{start:{line:63,column:22},end:{line:63,column:23}},loc:{start:{line:63,column:34},end:{line:65,column:5}},line:63},'8':{name:'(anonymous_8)',decl:{start:{line:68,column:2},end:{line:68,column:3}},loc:{start:{line:68,column:12},end:{line:73,column:3}},line:68},'9':{name:'(anonymous_9)',decl:{start:{line:75,column:2},end:{line:75,column:3}},loc:{start:{line:75,column:19},end:{line:83,column:3}},line:75},'10':{name:'(anonymous_10)',decl:{start:{line:85,column:2},end:{line:85,column:3}},loc:{start:{line:85,column:24},end:{line:87,column:3}},line:85},'11':{name:'(anonymous_11)',decl:{start:{line:89,column:2},end:{line:89,column:3}},loc:{start:{line:89,column:26},end:{line:112,column:3}},line:89},'12':{name:'(anonymous_12)',decl:{start:{line:98,column:39},end:{line:98,column:40}},loc:{start:{line:98,column:51},end:{line:98,column:87}},line:98},'13':{name:'(anonymous_13)',decl:{start:{line:114,column:2},end:{line:114,column:3}},loc:{start:{line:114,column:26},end:{line:133,column:3}},line:114},'14':{name:'(anonymous_14)',decl:{start:{line:123,column:39},end:{line:123,column:40}},loc:{start:{line:123,column:51},end:{line:123,column:87}},line:123},'15':{name:'(anonymous_15)',decl:{start:{line:135,column:2},end:{line:135,column:3}},loc:{start:{line:135,column:22},end:{line:148,column:3}},line:135},'16':{name:'(anonymous_16)',decl:{start:{line:150,column:2},end:{line:150,column:3}},loc:{start:{line:150,column:18},end:{line:162,column:3}},line:150},'17':{name:'(anonymous_17)',decl:{start:{line:164,column:2},end:{line:164,column:3}},loc:{start:{line:164,column:24},end:{line:172,column:3}},line:164},'18':{name:'(anonymous_18)',decl:{start:{line:174,column:2},end:{line:174,column:3}},loc:{start:{line:174,column:22},end:{line:177,column:3}},line:174},'19':{name:'(anonymous_19)',decl:{start:{line:179,column:2},end:{line:179,column:3}},loc:{start:{line:179,column:20},end:{line:186,column:3}},line:179},'20':{name:'(anonymous_20)',decl:{start:{line:188,column:2},end:{line:188,column:3}},loc:{start:{line:188,column:35},end:{line:192,column:3}},line:188},'21':{name:'(anonymous_21)',decl:{start:{line:194,column:2},end:{line:194,column:3}},loc:{start:{line:194,column:36},end:{line:198,column:3}},line:194},'22':{name:'(anonymous_22)',decl:{start:{line:200,column:2},end:{line:200,column:3}},loc:{start:{line:200,column:26},end:{line:202,column:3}},line:200},'23':{name:'(anonymous_23)',decl:{start:{line:207,column:2},end:{line:207,column:3}},loc:{start:{line:207,column:24},end:{line:210,column:3}},line:207},'24':{name:'(anonymous_24)',decl:{start:{line:215,column:2},end:{line:215,column:3}},loc:{start:{line:215,column:23},end:{line:221,column:3}},line:215},'25':{name:'(anonymous_25)',decl:{start:{line:223,column:2},end:{line:223,column:3}},loc:{start:{line:223,column:19},end:{line:225,column:3}},line:223},'26':{name:'(anonymous_26)',decl:{start:{line:227,column:2},end:{line:227,column:3}},loc:{start:{line:227,column:20},end:{line:230,column:3}},line:227},'27':{name:'(anonymous_27)',decl:{start:{line:234,column:2},end:{line:234,column:3}},loc:{start:{line:234,column:28},end:{line:237,column:3}},line:234},'28':{name:'(anonymous_28)',decl:{start:{line:239,column:2},end:{line:239,column:3}},loc:{start:{line:239,column:19},end:{line:248,column:3}},line:239},'29':{name:'(anonymous_29)',decl:{start:{line:252,column:2},end:{line:252,column:3}},loc:{start:{line:252,column:28},end:{line:255,column:3}},line:252},'30':{name:'(anonymous_30)',decl:{start:{line:257,column:2},end:{line:257,column:3}},loc:{start:{line:257,column:19},end:{line:265,column:3}},line:257}},branchMap:{'0':{loc:{start:{line:10,column:21},end:{line:10,column:51}},type:'binary-expr',locations:[{start:{line:10,column:21},end:{line:10,column:44}},{start:{line:10,column:48},end:{line:10,column:51}}],line:10},'1':{loc:{start:{line:18,column:41},end:{line:18,column:67}},type:'default-arg',locations:[{start:{line:18,column:54},end:{line:18,column:67}}],line:18},'2':{loc:{start:{line:19,column:11},end:{line:19,column:54}},type:'binary-expr',locations:[{start:{line:19,column:11},end:{line:19,column:23}},{start:{line:19,column:27},end:{line:19,column:54}}],line:19},'3':{loc:{start:{line:20,column:6},end:{line:22,column:7}},type:'if',locations:[{start:{line:20,column:6},end:{line:22,column:7}},{start:{line:20,column:6},end:{line:22,column:7}}],line:20},'4':{loc:{start:{line:33,column:26},end:{line:33,column:40}},type:'default-arg',locations:[{start:{line:33,column:38},end:{line:33,column:40}}],line:33},'5':{loc:{start:{line:33,column:42},end:{line:33,column:56}},type:'default-arg',locations:[{start:{line:33,column:54},end:{line:33,column:56}}],line:33},'6':{loc:{start:{line:56,column:17},end:{line:56,column:31}},type:'default-arg',locations:[{start:{line:56,column:29},end:{line:56,column:31}}],line:56},'7':{loc:{start:{line:62,column:17},end:{line:62,column:31}},type:'default-arg',locations:[{start:{line:62,column:29},end:{line:62,column:31}}],line:62},'8':{loc:{start:{line:78,column:4},end:{line:80,column:5}},type:'if',locations:[{start:{line:78,column:4},end:{line:80,column:5}},{start:{line:78,column:4},end:{line:80,column:5}}],line:78},'9':{loc:{start:{line:94,column:4},end:{line:96,column:5}},type:'if',locations:[{start:{line:94,column:4},end:{line:96,column:5}},{start:{line:94,column:4},end:{line:96,column:5}}],line:94},'10':{loc:{start:{line:100,column:4},end:{line:111,column:5}},type:'if',locations:[{start:{line:100,column:4},end:{line:111,column:5}},{start:{line:100,column:4},end:{line:111,column:5}}],line:100},'11':{loc:{start:{line:104,column:9},end:{line:111,column:5}},type:'if',locations:[{start:{line:104,column:9},end:{line:111,column:5}},{start:{line:104,column:9},end:{line:111,column:5}}],line:104},'12':{loc:{start:{line:108,column:9},end:{line:111,column:5}},type:'if',locations:[{start:{line:108,column:9},end:{line:111,column:5}},{start:{line:108,column:9},end:{line:111,column:5}}],line:108},'13':{loc:{start:{line:119,column:4},end:{line:121,column:5}},type:'if',locations:[{start:{line:119,column:4},end:{line:121,column:5}},{start:{line:119,column:4},end:{line:121,column:5}}],line:119},'14':{loc:{start:{line:125,column:4},end:{line:132,column:5}},type:'if',locations:[{start:{line:125,column:4},end:{line:132,column:5}},{start:{line:125,column:4},end:{line:132,column:5}}],line:125},'15':{loc:{start:{line:129,column:9},end:{line:132,column:5}},type:'if',locations:[{start:{line:129,column:9},end:{line:132,column:5}},{start:{line:129,column:9},end:{line:132,column:5}}],line:129},'16':{loc:{start:{line:136,column:4},end:{line:138,column:5}},type:'if',locations:[{start:{line:136,column:4},end:{line:138,column:5}},{start:{line:136,column:4},end:{line:138,column:5}}],line:136},'17':{loc:{start:{line:141,column:4},end:{line:143,column:5}},type:'if',locations:[{start:{line:141,column:4},end:{line:143,column:5}},{start:{line:141,column:4},end:{line:143,column:5}}],line:141},'18':{loc:{start:{line:151,column:4},end:{line:153,column:5}},type:'if',locations:[{start:{line:151,column:4},end:{line:153,column:5}},{start:{line:151,column:4},end:{line:153,column:5}}],line:151},'19':{loc:{start:{line:165,column:4},end:{line:167,column:5}},type:'if',locations:[{start:{line:165,column:4},end:{line:167,column:5}},{start:{line:165,column:4},end:{line:167,column:5}}],line:165},'20':{loc:{start:{line:169,column:21},end:{line:169,column:100}},type:'binary-expr',locations:[{start:{line:169,column:21},end:{line:169,column:80}},{start:{line:169,column:84},end:{line:169,column:100}}],line:169},'21':{loc:{start:{line:180,column:4},end:{line:182,column:5}},type:'if',locations:[{start:{line:180,column:4},end:{line:182,column:5}},{start:{line:180,column:4},end:{line:182,column:5}}],line:180},'22':{loc:{start:{line:188,column:17},end:{line:188,column:33}},type:'default-arg',locations:[{start:{line:188,column:31},end:{line:188,column:33}}],line:188},'23':{loc:{start:{line:194,column:18},end:{line:194,column:34}},type:'default-arg',locations:[{start:{line:194,column:32},end:{line:194,column:34}}],line:194}},s:{'0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0,'17':0,'18':0,'19':0,'20':0,'21':0,'22':0,'23':0,'24':0,'25':0,'26':0,'27':0,'28':0,'29':0,'30':0,'31':0,'32':0,'33':0,'34':0,'35':0,'36':0,'37':0,'38':0,'39':0,'40':0,'41':0,'42':0,'43':0,'44':0,'45':0,'46':0,'47':0,'48':0,'49':0,'50':0,'51':0,'52':0,'53':0,'54':0,'55':0,'56':0,'57':0,'58':0,'59':0,'60':0,'61':0,'62':0,'63':0,'64':0,'65':0,'66':0,'67':0,'68':0,'69':0,'70':0,'71':0,'72':0,'73':0,'74':0,'75':0,'76':0,'77':0,'78':0,'79':0,'80':0,'81':0,'82':0,'83':0,'84':0,'85':0,'86':0,'87':0,'88':0,'89':0,'90':0,'91':0,'92':0,'93':0,'94':0,'95':0,'96':0,'97':0,'98':0,'99':0,'100':0,'101':0,'102':0,'103':0,'104':0,'105':0},f:{'0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0,'17':0,'18':0,'19':0,'20':0,'21':0,'22':0,'23':0,'24':0,'25':0,'26':0,'27':0,'28':0,'29':0,'30':0},b:{'0':[0,0],'1':[0],'2':[0,0],'3':[0,0],'4':[0],'5':[0],'6':[0],'7':[0],'8':[0,0],'9':[0,0],'10':[0,0],'11':[0,0],'12':[0,0],'13':[0,0],'14':[0,0],'15':[0,0],'16':[0,0],'17':[0,0],'18':[0,0],'19':[0,0],'20':[0,0],'21':[0,0],'22':[0],'23':[0]},_coverageSchema:'332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();const Util=(cov_246rcclvy9.s[0]++,{tagsToReplace:{'&':'&amp;','<':'&lt;','>':'&gt;'},replaceTag:tag=>{cov_246rcclvy9.f[0]++;cov_246rcclvy9.s[1]++;return(cov_246rcclvy9.b[0][0]++,Util.tagsToReplace[tag])||(cov_246rcclvy9.b[0][1]++,tag);},escapeHtml:text=>{cov_246rcclvy9.f[1]++;cov_246rcclvy9.s[2]++;return text.replace(/[&<>]/g,Util.replaceTag);},findNearest:(startElement,className,endElement=(cov_246rcclvy9.b[1][0]++,document.body))=>{cov_246rcclvy9.f[2]++;cov_246rcclvy9.s[3]++;while((cov_246rcclvy9.b[2][0]++,startElement)&&(cov_246rcclvy9.b[2][1]++,startElement!==endElement)){cov_246rcclvy9.s[4]++;if(startElement.classList.contains(className)){cov_246rcclvy9.b[3][0]++;cov_246rcclvy9.s[5]++;return startElement;}else{cov_246rcclvy9.b[3][1]++;}cov_246rcclvy9.s[6]++;startElement=startElement.parentElement;}cov_246rcclvy9.s[7]++;return null;}});class App{constructor(container,todoItems=(cov_246rcclvy9.b[4][0]++,[]),doneItems=(cov_246rcclvy9.b[5][0]++,[])){cov_246rcclvy9.f[3]++;cov_246rcclvy9.s[8]++;this.container=container;cov_246rcclvy9.s[9]++;this.newTaskSection=this.container.querySelector('.new-task-section');cov_246rcclvy9.s[10]++;this.todoTaskSection=this.container.querySelector('.todo-task-section');cov_246rcclvy9.s[11]++;this.doneTaskSection=this.container.querySelector('.done-task-section');cov_246rcclvy9.s[12]++;this.addTaskInput=this.newTaskSection.querySelector('input.task-input');cov_246rcclvy9.s[13]++;this.addTaskButton=this.newTaskSection.querySelector('button.task-button');cov_246rcclvy9.s[14]++;this.todoList=this.todoTaskSection.querySelector('ul.todo-list');cov_246rcclvy9.s[15]++;this.doneList=this.doneTaskSection.querySelector('ul.done-list');cov_246rcclvy9.s[16]++;this.todoItems=[];cov_246rcclvy9.s[17]++;this.doneItems=[];cov_246rcclvy9.s[18]++;this.initTodoItems(todoItems);cov_246rcclvy9.s[19]++;this.initDoneItems(doneItems);cov_246rcclvy9.s[20]++;this.refreshAddTaskButton();cov_246rcclvy9.s[21]++;this.listen();}initTodoItems(todoItems=(cov_246rcclvy9.b[6][0]++,[])){cov_246rcclvy9.f[4]++;cov_246rcclvy9.s[22]++;todoItems.forEach(todoItem=>{cov_246rcclvy9.f[5]++;cov_246rcclvy9.s[23]++;this.createNewTask(todoItem);});}initDoneItems(doneItems=(cov_246rcclvy9.b[7][0]++,[])){cov_246rcclvy9.f[6]++;cov_246rcclvy9.s[24]++;doneItems.forEach(doneItem=>{cov_246rcclvy9.f[7]++;cov_246rcclvy9.s[25]++;this.createDoneTask(doneItem);});}listen(){cov_246rcclvy9.f[8]++;cov_246rcclvy9.s[26]++;this.addTaskButton.addEventListener('click',this.handleAddTask.bind(this));cov_246rcclvy9.s[27]++;this.addTaskInput.addEventListener('keyup',this.handleAddTaskKeyup.bind(this));cov_246rcclvy9.s[28]++;this.todoList.addEventListener('click',this.handleTodoListClick.bind(this));cov_246rcclvy9.s[29]++;this.doneList.addEventListener('click',this.handleDoneListClick.bind(this));}handleAddTask(){cov_246rcclvy9.f[9]++;let todoContent=(cov_246rcclvy9.s[30]++,this.addTaskInput.value);cov_246rcclvy9.s[31]++;if(todoContent.length===0){cov_246rcclvy9.b[8][0]++;cov_246rcclvy9.s[32]++;return;}else{cov_246rcclvy9.b[8][1]++;}cov_246rcclvy9.s[33]++;this.createNewTask(todoContent);}handleAddTaskKeyup(){cov_246rcclvy9.f[10]++;cov_246rcclvy9.s[34]++;this.refreshAddTaskButton();}handleTodoListClick(e){cov_246rcclvy9.f[11]++;let target=(cov_246rcclvy9.s[35]++,e.target),todoItemElement=(cov_246rcclvy9.s[36]++,Util.findNearest(target,'todo-item',this.todoList));cov_246rcclvy9.s[37]++;if(!todoItemElement){cov_246rcclvy9.b[9][0]++;cov_246rcclvy9.s[38]++;return;}else{cov_246rcclvy9.b[9][1]++;}let todoItem=(cov_246rcclvy9.s[39]++,this.todoItems.find(todoItem=>{cov_246rcclvy9.f[12]++;cov_246rcclvy9.s[40]++;return todoItem.element===todoItemElement;}));cov_246rcclvy9.s[41]++;if(target.classList.contains('to-done')){cov_246rcclvy9.b[10][0]++;cov_246rcclvy9.s[42]++;this.markDone(todoItem);}else{cov_246rcclvy9.b[10][1]++;cov_246rcclvy9.s[43]++;if(target.classList.contains('to-edit')){cov_246rcclvy9.b[11][0]++;cov_246rcclvy9.s[44]++;this.edit(todoItem);}else{cov_246rcclvy9.b[11][1]++;cov_246rcclvy9.s[45]++;if(target.classList.contains('to-edit-finish')){cov_246rcclvy9.b[12][0]++;cov_246rcclvy9.s[46]++;this.finishEdit(todoItem);}else{cov_246rcclvy9.b[12][1]++;}}}}handleDoneListClick(e){cov_246rcclvy9.f[13]++;let target=(cov_246rcclvy9.s[47]++,e.target),doneItemElement=(cov_246rcclvy9.s[48]++,Util.findNearest(target,'done-item',this.doneList));cov_246rcclvy9.s[49]++;if(!doneItemElement){cov_246rcclvy9.b[13][0]++;cov_246rcclvy9.s[50]++;return;}else{cov_246rcclvy9.b[13][1]++;}let doneItem=(cov_246rcclvy9.s[51]++,this.doneItems.find(doneItem=>{cov_246rcclvy9.f[14]++;cov_246rcclvy9.s[52]++;return doneItem.element===doneItemElement;}));cov_246rcclvy9.s[53]++;if(target.classList.contains('to-undo')){cov_246rcclvy9.b[14][0]++;cov_246rcclvy9.s[54]++;this.markTodo(doneItem);}else{cov_246rcclvy9.b[14][1]++;cov_246rcclvy9.s[55]++;if(target.classList.contains('to-remove')){cov_246rcclvy9.b[15][0]++;cov_246rcclvy9.s[56]++;this.remove(doneItem);}else{cov_246rcclvy9.b[15][1]++;}}}markDone(todoItem){cov_246rcclvy9.f[15]++;cov_246rcclvy9.s[57]++;if(!todoItem){cov_246rcclvy9.b[16][0]++;cov_246rcclvy9.s[58]++;return;}else{cov_246rcclvy9.b[16][1]++;}cov_246rcclvy9.s[59]++;if(todoItem.element.classList.contains('edit')){cov_246rcclvy9.b[17][0]++;cov_246rcclvy9.s[60]++;this.finishEdit(todoItem);}else{cov_246rcclvy9.b[17][1]++;}cov_246rcclvy9.s[61]++;this.todoItems.splice(this.todoItems.indexOf(todoItem),1);cov_246rcclvy9.s[62]++;this.todoList.removeChild(todoItem.element);cov_246rcclvy9.s[63]++;this.createDoneTask(todoItem.content);}edit(todoItem){cov_246rcclvy9.f[16]++;cov_246rcclvy9.s[64]++;if(!todoItem){cov_246rcclvy9.b[18][0]++;cov_246rcclvy9.s[65]++;return;}else{cov_246rcclvy9.b[18][1]++;}cov_246rcclvy9.s[66]++;todoItem.element.classList.add('edit');cov_246rcclvy9.s[67]++;todoItem.element.querySelector('.task-content input').value=todoItem.content;let editButton=(cov_246rcclvy9.s[68]++,todoItem.element.querySelector('.task-button.to-edit'));cov_246rcclvy9.s[69]++;editButton.classList.remove('to-edit');cov_246rcclvy9.s[70]++;editButton.classList.add('to-edit-finish');cov_246rcclvy9.s[71]++;editButton.textContent='Finish edit';}finishEdit(todoItem){cov_246rcclvy9.f[17]++;cov_246rcclvy9.s[72]++;if(!todoItem){cov_246rcclvy9.b[19][0]++;cov_246rcclvy9.s[73]++;return;}else{cov_246rcclvy9.b[19][1]++;}let newContent=(cov_246rcclvy9.s[74]++,(cov_246rcclvy9.b[20][0]++,todoItem.element.querySelector('.task-content input').value)||(cov_246rcclvy9.b[20][1]++,todoItem.content));cov_246rcclvy9.s[75]++;todoItem.refresh(newContent);cov_246rcclvy9.s[76]++;todoItem.element.classList.remove('edit');}markTodo(doneItem){cov_246rcclvy9.f[18]++;cov_246rcclvy9.s[77]++;this.remove(doneItem);cov_246rcclvy9.s[78]++;this.createNewTask(doneItem.content);}remove(doneItem){cov_246rcclvy9.f[19]++;cov_246rcclvy9.s[79]++;if(!doneItem){cov_246rcclvy9.b[21][0]++;cov_246rcclvy9.s[80]++;return;}else{cov_246rcclvy9.b[21][1]++;}cov_246rcclvy9.s[81]++;this.doneItems.splice(this.doneItems.indexOf(doneItem),1);cov_246rcclvy9.s[82]++;this.doneList.removeChild(doneItem.element);}createNewTask(todoContent=(cov_246rcclvy9.b[22][0]++,'')){cov_246rcclvy9.f[20]++;let todoItem=(cov_246rcclvy9.s[83]++,new ToDoItem(todoContent));cov_246rcclvy9.s[84]++;this.todoItems.push(todoItem);cov_246rcclvy9.s[85]++;this.todoList.appendChild(todoItem.element);}createDoneTask(doneContent=(cov_246rcclvy9.b[23][0]++,'')){cov_246rcclvy9.f[21]++;let doneItem=(cov_246rcclvy9.s[86]++,new DoneItem(doneContent));cov_246rcclvy9.s[87]++;this.doneItems.push(doneItem);cov_246rcclvy9.s[88]++;this.doneList.appendChild(doneItem.element);}refreshAddTaskButton(){cov_246rcclvy9.f[22]++;cov_246rcclvy9.s[89]++;this.addTaskButton.disabled=this.addTaskInput.value.length===0;}}class Item{constructor(content){cov_246rcclvy9.f[23]++;cov_246rcclvy9.s[90]++;this.element=this.createItem(content);cov_246rcclvy9.s[91]++;this.content=content;}createItem(content){cov_246rcclvy9.f[24]++;let item=(cov_246rcclvy9.s[92]++,document.createElement('li'));cov_246rcclvy9.s[93]++;item.className='item';cov_246rcclvy9.s[94]++;item.innerHTML=this.render(content);cov_246rcclvy9.s[95]++;return item;}render(content){cov_246rcclvy9.f[25]++;cov_246rcclvy9.s[96]++;return Util.escapeHtml(content);}refresh(content){cov_246rcclvy9.f[26]++;cov_246rcclvy9.s[97]++;this.content=content;cov_246rcclvy9.s[98]++;this.element.innerHTML=this.render(content);}}class ToDoItem extends(Item){constructor(todoContent){cov_246rcclvy9.f[27]++;cov_246rcclvy9.s[99]++;super(todoContent);cov_246rcclvy9.s[100]++;this.element.classList.add('todo-item');}render(content){cov_246rcclvy9.f[28]++;cov_246rcclvy9.s[101]++;return`
      <div class="task-content longest">
        <span>${Util.escapeHtml(content)}</span>
        <input type="text" />
      </div>
      <button class="task-button to-edit">Edit</button>
      <button class="task-button correct to-done">Done</button>
    `;}}class DoneItem extends(Item){constructor(doneContent){cov_246rcclvy9.f[29]++;cov_246rcclvy9.s[102]++;super(doneContent);cov_246rcclvy9.s[103]++;this.element.classList.add('done-item');}render(content){cov_246rcclvy9.f[30]++;cov_246rcclvy9.s[104]++;return`
      <div class="task-content longest">
        <span>${Util.escapeHtml(content)}</span>
      </div>
      <button class="task-button to-undo">Undo</button>
      <button class="task-button correct to-remove">Remove</button>
    `;}}cov_246rcclvy9.s[105]++;new App(document.querySelector('.todoapp-container'),['Buy Milk','Go to gym'],['Buy Bread']);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".todoapp-container {\n  margin: 20px auto;\n  min-width: 400px;\n  max-width: 600px;\n  font-family: sans-serif; }\n  .todoapp-container section {\n    margin: 20px 0; }\n  .todoapp-container button {\n    height: 25px;\n    margin: 0 5px;\n    box-sizing: border-box;\n    outline: none;\n    border: 1px solid #b7b7b7;\n    border-radius: 3px;\n    cursor: pointer; }\n    .todoapp-container button:active {\n      border-color: #777777;\n      background-color: #cfcfcf; }\n  .todoapp-container input {\n    height: 25px;\n    box-sizing: border-box;\n    outline: none;\n    padding: 0 5px;\n    font-size: 16px;\n    border: 1px solid #b7b7b7;\n    border-radius: 3px; }\n  .todoapp-container .section-header {\n    font-weight: bold;\n    border-bottom: 1px solid #b7b7b7;\n    margin: 0;\n    margin-bottom: 10px;\n    padding: 0;\n    background-color: #f5f5f5; }\n  .todoapp-container .section-body {\n    display: flex;\n    align-items: center; }\n    .todoapp-container .section-body .longest {\n      flex-grow: 1; }\n      .todoapp-container .section-body .longest span,\n      .todoapp-container .section-body .longest input {\n        width: 100%; }\n    .todoapp-container .section-body .task-button {\n      flex-shrink: 0; }\n      .todoapp-container .section-body .task-button.correct {\n        border-color: #00b300; }\n      .todoapp-container .section-body .task-button.wrong {\n        border-color: #ff0000; }\n  .todoapp-container .todo-list,\n  .todoapp-container .done-list {\n    margin: 0;\n    padding: 0;\n    width: 100%; }\n  .todoapp-container .todo-item,\n  .todoapp-container .done-item {\n    display: flex;\n    align-items: center;\n    border-bottom: 1px dashed;\n    padding: 10px 0; }\n    .todoapp-container .todo-item:first-child,\n    .todoapp-container .done-item:first-child {\n      padding-top: 0; }\n    .todoapp-container .todo-item:last-child,\n    .todoapp-container .done-item:last-child {\n      border-bottom: none;\n      padding-bottom: 0; }\n    .todoapp-container .todo-item.edit .task-content input,\n    .todoapp-container .done-item.edit .task-content input {\n      display: block; }\n    .todoapp-container .todo-item.edit .task-content span,\n    .todoapp-container .done-item.edit .task-content span {\n      display: none; }\n  .todoapp-container .done-item .task-content {\n    text-decoration: line-through;\n    opacity: 0.5; }\n  .todoapp-container .task-content {\n    font-size: 16px; }\n    .todoapp-container .task-content input {\n      display: none; }\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);