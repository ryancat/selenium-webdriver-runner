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
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var cov_246rcclvy9=function(){var path='/Users/ryanchen/dev/selenium-webdriver-runner/demoApps/todoApp/src/app.js',hash='6bc23ade96ba3927e5260e57089b9bb264f12678',Function=function(){}.constructor,global=new Function('return this')(),gcv='__coverage__',coverageData={path:'/Users/ryanchen/dev/selenium-webdriver-runner/demoApps/todoApp/src/app.js',statementMap:{'0':{start:{line:3,column:19},end:{line:3,column:563}},'1':{start:{line:3,column:76},end:{line:3,column:347}},'2':{start:{line:3,column:134},end:{line:3,column:142}},'3':{start:{line:3,column:144},end:{line:3,column:199}},'4':{start:{line:3,column:200},end:{line:3,column:231}},'5':{start:{line:3,column:232},end:{line:3,column:286}},'6':{start:{line:3,column:259},end:{line:3,column:286}},'7':{start:{line:3,column:287},end:{line:3,column:345}},'8':{start:{line:3,column:350},end:{line:3,column:559}},'9':{start:{line:3,column:407},end:{line:3,column:475}},'10':{start:{line:3,column:423},end:{line:3,column:475}},'11':{start:{line:3,column:476},end:{line:3,column:536}},'12':{start:{line:3,column:493},end:{line:3,column:536}},'13':{start:{line:3,column:537},end:{line:3,column:556}},'14':{start:{line:5,column:0},end:{line:5,column:22}},'15':{start:{line:7,column:50},end:{line:7,column:151}},'16':{start:{line:7,column:63},end:{line:7,column:149}},'17':{start:{line:7,column:152},end:{line:7,column:238}},'18':{start:{line:9,column:43},end:{line:9,column:208}},'19':{start:{line:9,column:106},end:{line:9,column:206}},'20':{start:{line:9,column:209},end:{line:9,column:373}},'21':{start:{line:9,column:374},end:{line:9,column:492}},'22':{start:{line:9,column:390},end:{line:9,column:492}},'23':{start:{line:11,column:50},end:{line:11,column:151}},'24':{start:{line:11,column:92},end:{line:11,column:149}},'25':{start:{line:13,column:11},end:{line:45,column:1}},'26':{start:{line:21,column:4},end:{line:21,column:42}},'27':{start:{line:25,column:4},end:{line:25,column:51}},'28':{start:{line:33,column:21},end:{line:33,column:102}},'29':{start:{line:35,column:4},end:{line:41,column:5}},'30':{start:{line:36,column:6},end:{line:38,column:7}},'31':{start:{line:37,column:8},end:{line:37,column:28}},'32':{start:{line:40,column:6},end:{line:40,column:48}},'33':{start:{line:43,column:4},end:{line:43,column:16}},'34':{start:{line:47,column:10},end:{line:255,column:3}},'35':{start:{line:49,column:20},end:{line:49,column:90}},'36':{start:{line:50,column:20},end:{line:50,column:90}},'37':{start:{line:52,column:4},end:{line:52,column:31}},'38':{start:{line:55,column:4},end:{line:55,column:31}},'39':{start:{line:58,column:4},end:{line:58,column:76}},'40':{start:{line:59,column:4},end:{line:59,column:78}},'41':{start:{line:60,column:4},end:{line:60,column:78}},'42':{start:{line:61,column:4},end:{line:61,column:78}},'43':{start:{line:62,column:4},end:{line:62,column:81}},'44':{start:{line:63,column:4},end:{line:63,column:71}},'45':{start:{line:64,column:4},end:{line:64,column:71}},'46':{start:{line:67,column:4},end:{line:67,column:24}},'47':{start:{line:68,column:4},end:{line:68,column:24}},'48':{start:{line:70,column:4},end:{line:70,column:34}},'49':{start:{line:71,column:4},end:{line:71,column:34}},'50':{start:{line:72,column:4},end:{line:72,column:32}},'51':{start:{line:73,column:4},end:{line:73,column:18}},'52':{start:{line:76,column:2},end:{line:252,column:6}},'53':{start:{line:79,column:18},end:{line:79,column:22}},'54':{start:{line:81,column:22},end:{line:81,column:92}},'55':{start:{line:83,column:6},end:{line:85,column:9}},'56':{start:{line:84,column:8},end:{line:84,column:38}},'57':{start:{line:90,column:19},end:{line:90,column:23}},'58':{start:{line:92,column:22},end:{line:92,column:92}},'59':{start:{line:94,column:6},end:{line:96,column:9}},'60':{start:{line:95,column:8},end:{line:95,column:40}},'61':{start:{line:101,column:6},end:{line:101,column:82}},'62':{start:{line:102,column:6},end:{line:102,column:86}},'63':{start:{line:103,column:6},end:{line:103,column:83}},'64':{start:{line:104,column:6},end:{line:104,column:83}},'65':{start:{line:109,column:24},end:{line:109,column:47}},'66':{start:{line:111,column:6},end:{line:113,column:7}},'67':{start:{line:112,column:8},end:{line:112,column:15}},'68':{start:{line:115,column:6},end:{line:115,column:38}},'69':{start:{line:120,column:6},end:{line:120,column:34}},'70':{start:{line:126,column:19},end:{line:126,column:27}},'71':{start:{line:127,column:28},end:{line:127,column:80}},'72':{start:{line:129,column:6},end:{line:131,column:7}},'73':{start:{line:130,column:8},end:{line:130,column:15}},'74':{start:{line:133,column:21},end:{line:135,column:8}},'75':{start:{line:134,column:8},end:{line:134,column:52}},'76':{start:{line:137,column:6},end:{line:146,column:7}},'77':{start:{line:139,column:8},end:{line:139,column:32}},'78':{start:{line:140,column:13},end:{line:146,column:7}},'79':{start:{line:142,column:8},end:{line:142,column:28}},'80':{start:{line:143,column:13},end:{line:146,column:7}},'81':{start:{line:145,column:8},end:{line:145,column:34}},'82':{start:{line:152,column:19},end:{line:152,column:27}},'83':{start:{line:153,column:28},end:{line:153,column:80}},'84':{start:{line:155,column:6},end:{line:157,column:7}},'85':{start:{line:156,column:8},end:{line:156,column:15}},'86':{start:{line:159,column:21},end:{line:161,column:8}},'87':{start:{line:160,column:8},end:{line:160,column:52}},'88':{start:{line:163,column:6},end:{line:169,column:7}},'89':{start:{line:165,column:8},end:{line:165,column:32}},'90':{start:{line:166,column:13},end:{line:169,column:7}},'91':{start:{line:168,column:8},end:{line:168,column:30}},'92':{start:{line:174,column:6},end:{line:176,column:7}},'93':{start:{line:175,column:8},end:{line:175,column:15}},'94':{start:{line:179,column:6},end:{line:181,column:7}},'95':{start:{line:180,column:8},end:{line:180,column:34}},'96':{start:{line:183,column:6},end:{line:183,column:65}},'97':{start:{line:184,column:6},end:{line:184,column:50}},'98':{start:{line:185,column:6},end:{line:185,column:44}},'99':{start:{line:190,column:6},end:{line:192,column:7}},'100':{start:{line:191,column:8},end:{line:191,column:15}},'101':{start:{line:194,column:6},end:{line:194,column:45}},'102':{start:{line:195,column:6},end:{line:195,column:85}},'103':{start:{line:197,column:23},end:{line:197,column:77}},'104':{start:{line:198,column:6},end:{line:198,column:45}},'105':{start:{line:199,column:6},end:{line:199,column:49}},'106':{start:{line:200,column:6},end:{line:200,column:45}},'107':{start:{line:205,column:6},end:{line:207,column:7}},'108':{start:{line:206,column:8},end:{line:206,column:15}},'109':{start:{line:209,column:23},end:{line:209,column:102}},'110':{start:{line:210,column:6},end:{line:210,column:35}},'111':{start:{line:211,column:6},end:{line:211,column:48}},'112':{start:{line:216,column:6},end:{line:216,column:28}},'113':{start:{line:217,column:6},end:{line:217,column:43}},'114':{start:{line:222,column:6},end:{line:224,column:7}},'115':{start:{line:223,column:8},end:{line:223,column:15}},'116':{start:{line:226,column:6},end:{line:226,column:65}},'117':{start:{line:227,column:6},end:{line:227,column:50}},'118':{start:{line:232,column:24},end:{line:232,column:94}},'119':{start:{line:234,column:21},end:{line:234,column:46}},'120':{start:{line:235,column:6},end:{line:235,column:36}},'121':{start:{line:236,column:6},end:{line:236,column:50}},'122':{start:{line:241,column:24},end:{line:241,column:94}},'123':{start:{line:243,column:21},end:{line:243,column:46}},'124':{start:{line:244,column:6},end:{line:244,column:36}},'125':{start:{line:245,column:6},end:{line:245,column:50}},'126':{start:{line:250,column:6},end:{line:250,column:73}},'127':{start:{line:254,column:2},end:{line:254,column:13}},'128':{start:{line:257,column:11},end:{line:293,column:3}},'129':{start:{line:259,column:4},end:{line:259,column:32}},'130':{start:{line:261,column:4},end:{line:261,column:44}},'131':{start:{line:262,column:4},end:{line:262,column:27}},'132':{start:{line:270,column:2},end:{line:290,column:6}},'133':{start:{line:273,column:17},end:{line:273,column:45}},'134':{start:{line:275,column:6},end:{line:275,column:30}},'135':{start:{line:276,column:6},end:{line:276,column:44}},'136':{start:{line:277,column:6},end:{line:277,column:18}},'137':{start:{line:282,column:6},end:{line:282,column:38}},'138':{start:{line:287,column:6},end:{line:287,column:29}},'139':{start:{line:288,column:6},end:{line:288,column:52}},'140':{start:{line:292,column:2},end:{line:292,column:14}},'141':{start:{line:295,column:15},end:{line:315,column:7}},'142':{start:{line:296,column:2},end:{line:296,column:29}},'143':{start:{line:299,column:4},end:{line:299,column:36}},'144':{start:{line:301,column:17},end:{line:301,column:130}},'145':{start:{line:303,column:4},end:{line:303,column:46}},'146':{start:{line:304,column:4},end:{line:304,column:18}},'147':{start:{line:307,column:2},end:{line:312,column:6}},'148':{start:{line:310,column:6},end:{line:310,column:286}},'149':{start:{line:314,column:2},end:{line:314,column:18}},'150':{start:{line:317,column:15},end:{line:337,column:7}},'151':{start:{line:318,column:2},end:{line:318,column:30}},'152':{start:{line:321,column:4},end:{line:321,column:36}},'153':{start:{line:323,column:17},end:{line:323,column:130}},'154':{start:{line:325,column:4},end:{line:325,column:46}},'155':{start:{line:326,column:4},end:{line:326,column:18}},'156':{start:{line:329,column:2},end:{line:334,column:6}},'157':{start:{line:332,column:6},end:{line:332,column:259}},'158':{start:{line:336,column:2},end:{line:336,column:18}},'159':{start:{line:342,column:0},end:{line:342,column:96}}},fnMap:{'0':{name:'(anonymous_0)',decl:{start:{line:3,column:19},end:{line:3,column:20}},loc:{start:{line:3,column:31},end:{line:3,column:561}},line:3},'1':{name:'defineProperties',decl:{start:{line:3,column:42},end:{line:3,column:58}},loc:{start:{line:3,column:74},end:{line:3,column:349}},line:3},'2':{name:'(anonymous_2)',decl:{start:{line:3,column:357},end:{line:3,column:358}},loc:{start:{line:3,column:405},end:{line:3,column:558}},line:3},'3':{name:'_possibleConstructorReturn',decl:{start:{line:7,column:9},end:{line:7,column:35}},loc:{start:{line:7,column:48},end:{line:7,column:240}},line:7},'4':{name:'_inherits',decl:{start:{line:9,column:9},end:{line:9,column:18}},loc:{start:{line:9,column:41},end:{line:9,column:494}},line:9},'5':{name:'_classCallCheck',decl:{start:{line:11,column:9},end:{line:11,column:24}},loc:{start:{line:11,column:48},end:{line:11,column:153}},line:11},'6':{name:'replaceTag',decl:{start:{line:20,column:23},end:{line:20,column:33}},loc:{start:{line:20,column:39},end:{line:22,column:3}},line:20},'7':{name:'escapeHtml',decl:{start:{line:24,column:23},end:{line:24,column:33}},loc:{start:{line:24,column:40},end:{line:26,column:3}},line:24},'8':{name:'findNearest',decl:{start:{line:32,column:24},end:{line:32,column:35}},loc:{start:{line:32,column:61},end:{line:44,column:3}},line:32},'9':{name:'(anonymous_9)',decl:{start:{line:47,column:10},end:{line:47,column:11}},loc:{start:{line:47,column:22},end:{line:255,column:1}},line:47},'10':{name:'App',decl:{start:{line:48,column:11},end:{line:48,column:14}},loc:{start:{line:48,column:26},end:{line:74,column:3}},line:48},'11':{name:'initTodoItems',decl:{start:{line:78,column:20},end:{line:78,column:33}},loc:{start:{line:78,column:36},end:{line:86,column:5}},line:78},'12':{name:'(anonymous_12)',decl:{start:{line:83,column:24},end:{line:83,column:25}},loc:{start:{line:83,column:44},end:{line:85,column:7}},line:83},'13':{name:'initDoneItems',decl:{start:{line:89,column:20},end:{line:89,column:33}},loc:{start:{line:89,column:36},end:{line:97,column:5}},line:89},'14':{name:'(anonymous_14)',decl:{start:{line:94,column:24},end:{line:94,column:25}},loc:{start:{line:94,column:44},end:{line:96,column:7}},line:94},'15':{name:'listen',decl:{start:{line:100,column:20},end:{line:100,column:26}},loc:{start:{line:100,column:29},end:{line:105,column:5}},line:100},'16':{name:'handleAddTask',decl:{start:{line:108,column:20},end:{line:108,column:33}},loc:{start:{line:108,column:36},end:{line:116,column:5}},line:108},'17':{name:'handleAddTaskKeyup',decl:{start:{line:119,column:20},end:{line:119,column:38}},loc:{start:{line:119,column:41},end:{line:121,column:5}},line:119},'18':{name:'handleTodoListClick',decl:{start:{line:124,column:20},end:{line:124,column:39}},loc:{start:{line:124,column:43},end:{line:147,column:5}},line:124},'19':{name:'(anonymous_19)',decl:{start:{line:133,column:41},end:{line:133,column:42}},loc:{start:{line:133,column:61},end:{line:135,column:7}},line:133},'20':{name:'handleDoneListClick',decl:{start:{line:150,column:20},end:{line:150,column:39}},loc:{start:{line:150,column:43},end:{line:170,column:5}},line:150},'21':{name:'(anonymous_21)',decl:{start:{line:159,column:41},end:{line:159,column:42}},loc:{start:{line:159,column:61},end:{line:161,column:7}},line:159},'22':{name:'markDone',decl:{start:{line:173,column:20},end:{line:173,column:28}},loc:{start:{line:173,column:39},end:{line:186,column:5}},line:173},'23':{name:'edit',decl:{start:{line:189,column:20},end:{line:189,column:24}},loc:{start:{line:189,column:35},end:{line:201,column:5}},line:189},'24':{name:'finishEdit',decl:{start:{line:204,column:20},end:{line:204,column:30}},loc:{start:{line:204,column:41},end:{line:212,column:5}},line:204},'25':{name:'markTodo',decl:{start:{line:215,column:20},end:{line:215,column:28}},loc:{start:{line:215,column:39},end:{line:218,column:5}},line:215},'26':{name:'remove',decl:{start:{line:221,column:20},end:{line:221,column:26}},loc:{start:{line:221,column:37},end:{line:228,column:5}},line:221},'27':{name:'createNewTask',decl:{start:{line:231,column:20},end:{line:231,column:33}},loc:{start:{line:231,column:36},end:{line:237,column:5}},line:231},'28':{name:'createDoneTask',decl:{start:{line:240,column:20},end:{line:240,column:34}},loc:{start:{line:240,column:37},end:{line:246,column:5}},line:240},'29':{name:'refreshAddTaskButton',decl:{start:{line:249,column:20},end:{line:249,column:40}},loc:{start:{line:249,column:43},end:{line:251,column:5}},line:249},'30':{name:'(anonymous_30)',decl:{start:{line:257,column:11},end:{line:257,column:12}},loc:{start:{line:257,column:23},end:{line:293,column:1}},line:257},'31':{name:'Item',decl:{start:{line:258,column:11},end:{line:258,column:15}},loc:{start:{line:258,column:25},end:{line:263,column:3}},line:258},'32':{name:'createItem',decl:{start:{line:272,column:20},end:{line:272,column:30}},loc:{start:{line:272,column:40},end:{line:278,column:5}},line:272},'33':{name:'render',decl:{start:{line:281,column:20},end:{line:281,column:26}},loc:{start:{line:281,column:36},end:{line:283,column:5}},line:281},'34':{name:'refresh',decl:{start:{line:286,column:20},end:{line:286,column:27}},loc:{start:{line:286,column:37},end:{line:289,column:5}},line:286},'35':{name:'(anonymous_35)',decl:{start:{line:295,column:15},end:{line:295,column:16}},loc:{start:{line:295,column:32},end:{line:315,column:1}},line:295},'36':{name:'ToDoItem',decl:{start:{line:298,column:11},end:{line:298,column:19}},loc:{start:{line:298,column:33},end:{line:305,column:3}},line:298},'37':{name:'render',decl:{start:{line:309,column:20},end:{line:309,column:26}},loc:{start:{line:309,column:36},end:{line:311,column:5}},line:309},'38':{name:'(anonymous_38)',decl:{start:{line:317,column:15},end:{line:317,column:16}},loc:{start:{line:317,column:33},end:{line:337,column:1}},line:317},'39':{name:'DoneItem',decl:{start:{line:320,column:11},end:{line:320,column:19}},loc:{start:{line:320,column:33},end:{line:327,column:3}},line:320},'40':{name:'render',decl:{start:{line:331,column:20},end:{line:331,column:26}},loc:{start:{line:331,column:36},end:{line:333,column:5}},line:331}},branchMap:{'0':{loc:{start:{line:3,column:168},end:{line:3,column:198}},type:'binary-expr',locations:[{start:{line:3,column:168},end:{line:3,column:189}},{start:{line:3,column:193},end:{line:3,column:198}}],line:3},'1':{loc:{start:{line:3,column:232},end:{line:3,column:286}},type:'if',locations:[{start:{line:3,column:232},end:{line:3,column:286}},{start:{line:3,column:232},end:{line:3,column:286}}],line:3},'2':{loc:{start:{line:3,column:407},end:{line:3,column:475}},type:'if',locations:[{start:{line:3,column:407},end:{line:3,column:475}},{start:{line:3,column:407},end:{line:3,column:475}}],line:3},'3':{loc:{start:{line:3,column:476},end:{line:3,column:536}},type:'if',locations:[{start:{line:3,column:476},end:{line:3,column:536}},{start:{line:3,column:476},end:{line:3,column:536}}],line:3},'4':{loc:{start:{line:7,column:50},end:{line:7,column:151}},type:'if',locations:[{start:{line:7,column:50},end:{line:7,column:151}},{start:{line:7,column:50},end:{line:7,column:151}}],line:7},'5':{loc:{start:{line:7,column:159},end:{line:7,column:237}},type:'cond-expr',locations:[{start:{line:7,column:226},end:{line:7,column:230}},{start:{line:7,column:233},end:{line:7,column:237}}],line:7},'6':{loc:{start:{line:7,column:159},end:{line:7,column:223}},type:'binary-expr',locations:[{start:{line:7,column:159},end:{line:7,column:163}},{start:{line:7,column:168},end:{line:7,column:192}},{start:{line:7,column:196},end:{line:7,column:222}}],line:7},'7':{loc:{start:{line:9,column:43},end:{line:9,column:208}},type:'if',locations:[{start:{line:9,column:43},end:{line:9,column:208}},{start:{line:9,column:43},end:{line:9,column:208}}],line:9},'8':{loc:{start:{line:9,column:47},end:{line:9,column:102}},type:'binary-expr',locations:[{start:{line:9,column:47},end:{line:9,column:79}},{start:{line:9,column:83},end:{line:9,column:102}}],line:9},'9':{loc:{start:{line:9,column:244},end:{line:9,column:278}},type:'binary-expr',locations:[{start:{line:9,column:244},end:{line:9,column:254}},{start:{line:9,column:258},end:{line:9,column:278}}],line:9},'10':{loc:{start:{line:9,column:374},end:{line:9,column:492}},type:'if',locations:[{start:{line:9,column:374},end:{line:9,column:492}},{start:{line:9,column:374},end:{line:9,column:492}}],line:9},'11':{loc:{start:{line:9,column:390},end:{line:9,column:491}},type:'cond-expr',locations:[{start:{line:9,column:414},end:{line:9,column:457}},{start:{line:9,column:460},end:{line:9,column:491}}],line:9},'12':{loc:{start:{line:11,column:50},end:{line:11,column:151}},type:'if',locations:[{start:{line:11,column:50},end:{line:11,column:151}},{start:{line:11,column:50},end:{line:11,column:151}}],line:11},'13':{loc:{start:{line:21,column:11},end:{line:21,column:41}},type:'binary-expr',locations:[{start:{line:21,column:11},end:{line:21,column:34}},{start:{line:21,column:38},end:{line:21,column:41}}],line:21},'14':{loc:{start:{line:33,column:21},end:{line:33,column:102}},type:'cond-expr',locations:[{start:{line:33,column:74},end:{line:33,column:86}},{start:{line:33,column:89},end:{line:33,column:102}}],line:33},'15':{loc:{start:{line:33,column:21},end:{line:33,column:71}},type:'binary-expr',locations:[{start:{line:33,column:21},end:{line:33,column:41}},{start:{line:33,column:45},end:{line:33,column:71}}],line:33},'16':{loc:{start:{line:35,column:11},end:{line:35,column:54}},type:'binary-expr',locations:[{start:{line:35,column:11},end:{line:35,column:23}},{start:{line:35,column:27},end:{line:35,column:54}}],line:35},'17':{loc:{start:{line:36,column:6},end:{line:38,column:7}},type:'if',locations:[{start:{line:36,column:6},end:{line:38,column:7}},{start:{line:36,column:6},end:{line:38,column:7}}],line:36},'18':{loc:{start:{line:49,column:20},end:{line:49,column:90}},type:'cond-expr',locations:[{start:{line:49,column:73},end:{line:49,column:85}},{start:{line:49,column:88},end:{line:49,column:90}}],line:49},'19':{loc:{start:{line:49,column:20},end:{line:49,column:70}},type:'binary-expr',locations:[{start:{line:49,column:20},end:{line:49,column:40}},{start:{line:49,column:44},end:{line:49,column:70}}],line:49},'20':{loc:{start:{line:50,column:20},end:{line:50,column:90}},type:'cond-expr',locations:[{start:{line:50,column:73},end:{line:50,column:85}},{start:{line:50,column:88},end:{line:50,column:90}}],line:50},'21':{loc:{start:{line:50,column:20},end:{line:50,column:70}},type:'binary-expr',locations:[{start:{line:50,column:20},end:{line:50,column:40}},{start:{line:50,column:44},end:{line:50,column:70}}],line:50},'22':{loc:{start:{line:81,column:22},end:{line:81,column:92}},type:'cond-expr',locations:[{start:{line:81,column:75},end:{line:81,column:87}},{start:{line:81,column:90},end:{line:81,column:92}}],line:81},'23':{loc:{start:{line:81,column:22},end:{line:81,column:72}},type:'binary-expr',locations:[{start:{line:81,column:22},end:{line:81,column:42}},{start:{line:81,column:46},end:{line:81,column:72}}],line:81},'24':{loc:{start:{line:92,column:22},end:{line:92,column:92}},type:'cond-expr',locations:[{start:{line:92,column:75},end:{line:92,column:87}},{start:{line:92,column:90},end:{line:92,column:92}}],line:92},'25':{loc:{start:{line:92,column:22},end:{line:92,column:72}},type:'binary-expr',locations:[{start:{line:92,column:22},end:{line:92,column:42}},{start:{line:92,column:46},end:{line:92,column:72}}],line:92},'26':{loc:{start:{line:111,column:6},end:{line:113,column:7}},type:'if',locations:[{start:{line:111,column:6},end:{line:113,column:7}},{start:{line:111,column:6},end:{line:113,column:7}}],line:111},'27':{loc:{start:{line:129,column:6},end:{line:131,column:7}},type:'if',locations:[{start:{line:129,column:6},end:{line:131,column:7}},{start:{line:129,column:6},end:{line:131,column:7}}],line:129},'28':{loc:{start:{line:137,column:6},end:{line:146,column:7}},type:'if',locations:[{start:{line:137,column:6},end:{line:146,column:7}},{start:{line:137,column:6},end:{line:146,column:7}}],line:137},'29':{loc:{start:{line:140,column:13},end:{line:146,column:7}},type:'if',locations:[{start:{line:140,column:13},end:{line:146,column:7}},{start:{line:140,column:13},end:{line:146,column:7}}],line:140},'30':{loc:{start:{line:143,column:13},end:{line:146,column:7}},type:'if',locations:[{start:{line:143,column:13},end:{line:146,column:7}},{start:{line:143,column:13},end:{line:146,column:7}}],line:143},'31':{loc:{start:{line:155,column:6},end:{line:157,column:7}},type:'if',locations:[{start:{line:155,column:6},end:{line:157,column:7}},{start:{line:155,column:6},end:{line:157,column:7}}],line:155},'32':{loc:{start:{line:163,column:6},end:{line:169,column:7}},type:'if',locations:[{start:{line:163,column:6},end:{line:169,column:7}},{start:{line:163,column:6},end:{line:169,column:7}}],line:163},'33':{loc:{start:{line:166,column:13},end:{line:169,column:7}},type:'if',locations:[{start:{line:166,column:13},end:{line:169,column:7}},{start:{line:166,column:13},end:{line:169,column:7}}],line:166},'34':{loc:{start:{line:174,column:6},end:{line:176,column:7}},type:'if',locations:[{start:{line:174,column:6},end:{line:176,column:7}},{start:{line:174,column:6},end:{line:176,column:7}}],line:174},'35':{loc:{start:{line:179,column:6},end:{line:181,column:7}},type:'if',locations:[{start:{line:179,column:6},end:{line:181,column:7}},{start:{line:179,column:6},end:{line:181,column:7}}],line:179},'36':{loc:{start:{line:190,column:6},end:{line:192,column:7}},type:'if',locations:[{start:{line:190,column:6},end:{line:192,column:7}},{start:{line:190,column:6},end:{line:192,column:7}}],line:190},'37':{loc:{start:{line:205,column:6},end:{line:207,column:7}},type:'if',locations:[{start:{line:205,column:6},end:{line:207,column:7}},{start:{line:205,column:6},end:{line:207,column:7}}],line:205},'38':{loc:{start:{line:209,column:23},end:{line:209,column:102}},type:'binary-expr',locations:[{start:{line:209,column:23},end:{line:209,column:82}},{start:{line:209,column:86},end:{line:209,column:102}}],line:209},'39':{loc:{start:{line:222,column:6},end:{line:224,column:7}},type:'if',locations:[{start:{line:222,column:6},end:{line:224,column:7}},{start:{line:222,column:6},end:{line:224,column:7}}],line:222},'40':{loc:{start:{line:232,column:24},end:{line:232,column:94}},type:'cond-expr',locations:[{start:{line:232,column:77},end:{line:232,column:89}},{start:{line:232,column:92},end:{line:232,column:94}}],line:232},'41':{loc:{start:{line:232,column:24},end:{line:232,column:74}},type:'binary-expr',locations:[{start:{line:232,column:24},end:{line:232,column:44}},{start:{line:232,column:48},end:{line:232,column:74}}],line:232},'42':{loc:{start:{line:241,column:24},end:{line:241,column:94}},type:'cond-expr',locations:[{start:{line:241,column:77},end:{line:241,column:89}},{start:{line:241,column:92},end:{line:241,column:94}}],line:241},'43':{loc:{start:{line:241,column:24},end:{line:241,column:74}},type:'binary-expr',locations:[{start:{line:241,column:24},end:{line:241,column:44}},{start:{line:241,column:48},end:{line:241,column:74}}],line:241},'44':{loc:{start:{line:301,column:51},end:{line:301,column:104}},type:'binary-expr',locations:[{start:{line:301,column:51},end:{line:301,column:69}},{start:{line:301,column:73},end:{line:301,column:104}}],line:301},'45':{loc:{start:{line:323,column:51},end:{line:323,column:104}},type:'binary-expr',locations:[{start:{line:323,column:51},end:{line:323,column:69}},{start:{line:323,column:73},end:{line:323,column:104}}],line:323}},s:{'0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0,'17':0,'18':0,'19':0,'20':0,'21':0,'22':0,'23':0,'24':0,'25':0,'26':0,'27':0,'28':0,'29':0,'30':0,'31':0,'32':0,'33':0,'34':0,'35':0,'36':0,'37':0,'38':0,'39':0,'40':0,'41':0,'42':0,'43':0,'44':0,'45':0,'46':0,'47':0,'48':0,'49':0,'50':0,'51':0,'52':0,'53':0,'54':0,'55':0,'56':0,'57':0,'58':0,'59':0,'60':0,'61':0,'62':0,'63':0,'64':0,'65':0,'66':0,'67':0,'68':0,'69':0,'70':0,'71':0,'72':0,'73':0,'74':0,'75':0,'76':0,'77':0,'78':0,'79':0,'80':0,'81':0,'82':0,'83':0,'84':0,'85':0,'86':0,'87':0,'88':0,'89':0,'90':0,'91':0,'92':0,'93':0,'94':0,'95':0,'96':0,'97':0,'98':0,'99':0,'100':0,'101':0,'102':0,'103':0,'104':0,'105':0,'106':0,'107':0,'108':0,'109':0,'110':0,'111':0,'112':0,'113':0,'114':0,'115':0,'116':0,'117':0,'118':0,'119':0,'120':0,'121':0,'122':0,'123':0,'124':0,'125':0,'126':0,'127':0,'128':0,'129':0,'130':0,'131':0,'132':0,'133':0,'134':0,'135':0,'136':0,'137':0,'138':0,'139':0,'140':0,'141':0,'142':0,'143':0,'144':0,'145':0,'146':0,'147':0,'148':0,'149':0,'150':0,'151':0,'152':0,'153':0,'154':0,'155':0,'156':0,'157':0,'158':0,'159':0},f:{'0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0,'17':0,'18':0,'19':0,'20':0,'21':0,'22':0,'23':0,'24':0,'25':0,'26':0,'27':0,'28':0,'29':0,'30':0,'31':0,'32':0,'33':0,'34':0,'35':0,'36':0,'37':0,'38':0,'39':0,'40':0},b:{'0':[0,0],'1':[0,0],'2':[0,0],'3':[0,0],'4':[0,0],'5':[0,0],'6':[0,0,0],'7':[0,0],'8':[0,0],'9':[0,0],'10':[0,0],'11':[0,0],'12':[0,0],'13':[0,0],'14':[0,0],'15':[0,0],'16':[0,0],'17':[0,0],'18':[0,0],'19':[0,0],'20':[0,0],'21':[0,0],'22':[0,0],'23':[0,0],'24':[0,0],'25':[0,0],'26':[0,0],'27':[0,0],'28':[0,0],'29':[0,0],'30':[0,0],'31':[0,0],'32':[0,0],'33':[0,0],'34':[0,0],'35':[0,0],'36':[0,0],'37':[0,0],'38':[0,0],'39':[0,0],'40':[0,0],'41':[0,0],'42':[0,0],'43':[0,0],'44':[0,0],'45':[0,0]},inputSourceMap:null,_coverageSchema:'332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();var _createClass=(cov_246rcclvy9.s[0]++,function(){cov_246rcclvy9.f[0]++;function defineProperties(target,props){cov_246rcclvy9.f[1]++;cov_246rcclvy9.s[1]++;for(var i=0;i<props.length;i++){var descriptor=(cov_246rcclvy9.s[2]++,props[i]);cov_246rcclvy9.s[3]++;descriptor.enumerable=(cov_246rcclvy9.b[0][0]++,descriptor.enumerable)||(cov_246rcclvy9.b[0][1]++,false);cov_246rcclvy9.s[4]++;descriptor.configurable=true;cov_246rcclvy9.s[5]++;if("value"in descriptor){cov_246rcclvy9.b[1][0]++;cov_246rcclvy9.s[6]++;descriptor.writable=true;}else{cov_246rcclvy9.b[1][1]++;}cov_246rcclvy9.s[7]++;Object.defineProperty(target,descriptor.key,descriptor);}}cov_246rcclvy9.s[8]++;return function(Constructor,protoProps,staticProps){cov_246rcclvy9.f[2]++;cov_246rcclvy9.s[9]++;if(protoProps){cov_246rcclvy9.b[2][0]++;cov_246rcclvy9.s[10]++;defineProperties(Constructor.prototype,protoProps);}else{cov_246rcclvy9.b[2][1]++;}cov_246rcclvy9.s[11]++;if(staticProps){cov_246rcclvy9.b[3][0]++;cov_246rcclvy9.s[12]++;defineProperties(Constructor,staticProps);}else{cov_246rcclvy9.b[3][1]++;}cov_246rcclvy9.s[13]++;return Constructor;};}());cov_246rcclvy9.s[14]++;__webpack_require__(1);function _possibleConstructorReturn(self,call){cov_246rcclvy9.f[3]++;cov_246rcclvy9.s[15]++;if(!self){cov_246rcclvy9.b[4][0]++;cov_246rcclvy9.s[16]++;throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}else{cov_246rcclvy9.b[4][1]++;}cov_246rcclvy9.s[17]++;return(cov_246rcclvy9.b[6][0]++,call)&&((cov_246rcclvy9.b[6][1]++,typeof call==="object")||(cov_246rcclvy9.b[6][2]++,typeof call==="function"))?(cov_246rcclvy9.b[5][0]++,call):(cov_246rcclvy9.b[5][1]++,self);}function _inherits(subClass,superClass){cov_246rcclvy9.f[4]++;cov_246rcclvy9.s[18]++;if((cov_246rcclvy9.b[8][0]++,typeof superClass!=="function")&&(cov_246rcclvy9.b[8][1]++,superClass!==null)){cov_246rcclvy9.b[7][0]++;cov_246rcclvy9.s[19]++;throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}else{cov_246rcclvy9.b[7][1]++;}cov_246rcclvy9.s[20]++;subClass.prototype=Object.create((cov_246rcclvy9.b[9][0]++,superClass)&&(cov_246rcclvy9.b[9][1]++,superClass.prototype),{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});cov_246rcclvy9.s[21]++;if(superClass){cov_246rcclvy9.b[10][0]++;cov_246rcclvy9.s[22]++;Object.setPrototypeOf?(cov_246rcclvy9.b[11][0]++,Object.setPrototypeOf(subClass,superClass)):(cov_246rcclvy9.b[11][1]++,subClass.__proto__=superClass);}else{cov_246rcclvy9.b[10][1]++;}}function _classCallCheck(instance,Constructor){cov_246rcclvy9.f[5]++;cov_246rcclvy9.s[23]++;if(!(instance instanceof Constructor)){cov_246rcclvy9.b[12][0]++;cov_246rcclvy9.s[24]++;throw new TypeError("Cannot call a class as a function");}else{cov_246rcclvy9.b[12][1]++;}}var Util=(cov_246rcclvy9.s[25]++,{tagsToReplace:{'&':'&amp;','<':'&lt;','>':'&gt;'},replaceTag:function replaceTag(tag){cov_246rcclvy9.f[6]++;cov_246rcclvy9.s[26]++;return(cov_246rcclvy9.b[13][0]++,Util.tagsToReplace[tag])||(cov_246rcclvy9.b[13][1]++,tag);},escapeHtml:function escapeHtml(text){cov_246rcclvy9.f[7]++;cov_246rcclvy9.s[27]++;return text.replace(/[&<>]/g,Util.replaceTag);},findNearest:function findNearest(startElement,className){cov_246rcclvy9.f[8]++;var endElement=(cov_246rcclvy9.s[28]++,(cov_246rcclvy9.b[15][0]++,arguments.length>2)&&(cov_246rcclvy9.b[15][1]++,arguments[2]!==undefined)?(cov_246rcclvy9.b[14][0]++,arguments[2]):(cov_246rcclvy9.b[14][1]++,document.body));cov_246rcclvy9.s[29]++;while((cov_246rcclvy9.b[16][0]++,startElement)&&(cov_246rcclvy9.b[16][1]++,startElement!==endElement)){cov_246rcclvy9.s[30]++;if(startElement.classList.contains(className)){cov_246rcclvy9.b[17][0]++;cov_246rcclvy9.s[31]++;return startElement;}else{cov_246rcclvy9.b[17][1]++;}cov_246rcclvy9.s[32]++;startElement=startElement.parentElement;}cov_246rcclvy9.s[33]++;return null;}});var App=(cov_246rcclvy9.s[34]++,function(){cov_246rcclvy9.f[9]++;function App(container){cov_246rcclvy9.f[10]++;var todoItems=(cov_246rcclvy9.s[35]++,(cov_246rcclvy9.b[19][0]++,arguments.length>1)&&(cov_246rcclvy9.b[19][1]++,arguments[1]!==undefined)?(cov_246rcclvy9.b[18][0]++,arguments[1]):(cov_246rcclvy9.b[18][1]++,[]));var doneItems=(cov_246rcclvy9.s[36]++,(cov_246rcclvy9.b[21][0]++,arguments.length>2)&&(cov_246rcclvy9.b[21][1]++,arguments[2]!==undefined)?(cov_246rcclvy9.b[20][0]++,arguments[2]):(cov_246rcclvy9.b[20][1]++,[]));cov_246rcclvy9.s[37]++;_classCallCheck(this,App);cov_246rcclvy9.s[38]++;this.container=container;cov_246rcclvy9.s[39]++;this.newTaskSection=this.container.querySelector('.new-task-section');cov_246rcclvy9.s[40]++;this.todoTaskSection=this.container.querySelector('.todo-task-section');cov_246rcclvy9.s[41]++;this.doneTaskSection=this.container.querySelector('.done-task-section');cov_246rcclvy9.s[42]++;this.addTaskInput=this.newTaskSection.querySelector('input.task-input');cov_246rcclvy9.s[43]++;this.addTaskButton=this.newTaskSection.querySelector('button.task-button');cov_246rcclvy9.s[44]++;this.todoList=this.todoTaskSection.querySelector('ul.todo-list');cov_246rcclvy9.s[45]++;this.doneList=this.doneTaskSection.querySelector('ul.done-list');cov_246rcclvy9.s[46]++;this.todoItems=[];cov_246rcclvy9.s[47]++;this.doneItems=[];cov_246rcclvy9.s[48]++;this.initTodoItems(todoItems);cov_246rcclvy9.s[49]++;this.initDoneItems(doneItems);cov_246rcclvy9.s[50]++;this.refreshAddTaskButton();cov_246rcclvy9.s[51]++;this.listen();}cov_246rcclvy9.s[52]++;_createClass(App,[{key:'initTodoItems',value:function initTodoItems(){cov_246rcclvy9.f[11]++;var _this=(cov_246rcclvy9.s[53]++,this);var todoItems=(cov_246rcclvy9.s[54]++,(cov_246rcclvy9.b[23][0]++,arguments.length>0)&&(cov_246rcclvy9.b[23][1]++,arguments[0]!==undefined)?(cov_246rcclvy9.b[22][0]++,arguments[0]):(cov_246rcclvy9.b[22][1]++,[]));cov_246rcclvy9.s[55]++;todoItems.forEach(function(todoItem){cov_246rcclvy9.f[12]++;cov_246rcclvy9.s[56]++;_this.createNewTask(todoItem);});}},{key:'initDoneItems',value:function initDoneItems(){cov_246rcclvy9.f[13]++;var _this2=(cov_246rcclvy9.s[57]++,this);var doneItems=(cov_246rcclvy9.s[58]++,(cov_246rcclvy9.b[25][0]++,arguments.length>0)&&(cov_246rcclvy9.b[25][1]++,arguments[0]!==undefined)?(cov_246rcclvy9.b[24][0]++,arguments[0]):(cov_246rcclvy9.b[24][1]++,[]));cov_246rcclvy9.s[59]++;doneItems.forEach(function(doneItem){cov_246rcclvy9.f[14]++;cov_246rcclvy9.s[60]++;_this2.createDoneTask(doneItem);});}},{key:'listen',value:function listen(){cov_246rcclvy9.f[15]++;cov_246rcclvy9.s[61]++;this.addTaskButton.addEventListener('click',this.handleAddTask.bind(this));cov_246rcclvy9.s[62]++;this.addTaskInput.addEventListener('keyup',this.handleAddTaskKeyup.bind(this));cov_246rcclvy9.s[63]++;this.todoList.addEventListener('click',this.handleTodoListClick.bind(this));cov_246rcclvy9.s[64]++;this.doneList.addEventListener('click',this.handleDoneListClick.bind(this));}},{key:'handleAddTask',value:function handleAddTask(){cov_246rcclvy9.f[16]++;var todoContent=(cov_246rcclvy9.s[65]++,this.addTaskInput.value);cov_246rcclvy9.s[66]++;if(todoContent.length===0){cov_246rcclvy9.b[26][0]++;cov_246rcclvy9.s[67]++;return;}else{cov_246rcclvy9.b[26][1]++;}cov_246rcclvy9.s[68]++;this.createNewTask(todoContent);}},{key:'handleAddTaskKeyup',value:function handleAddTaskKeyup(){cov_246rcclvy9.f[17]++;cov_246rcclvy9.s[69]++;this.refreshAddTaskButton();}},{key:'handleTodoListClick',value:function handleTodoListClick(e){cov_246rcclvy9.f[18]++;var target=(cov_246rcclvy9.s[70]++,e.target),todoItemElement=(cov_246rcclvy9.s[71]++,Util.findNearest(target,'todo-item',this.todoList));cov_246rcclvy9.s[72]++;if(!todoItemElement){cov_246rcclvy9.b[27][0]++;cov_246rcclvy9.s[73]++;return;}else{cov_246rcclvy9.b[27][1]++;}var todoItem=(cov_246rcclvy9.s[74]++,this.todoItems.find(function(todoItem){cov_246rcclvy9.f[19]++;cov_246rcclvy9.s[75]++;return todoItem.element===todoItemElement;}));cov_246rcclvy9.s[76]++;if(target.classList.contains('to-done')){cov_246rcclvy9.b[28][0]++;cov_246rcclvy9.s[77]++;this.markDone(todoItem);}else{cov_246rcclvy9.b[28][1]++;cov_246rcclvy9.s[78]++;if(target.classList.contains('to-edit')){cov_246rcclvy9.b[29][0]++;cov_246rcclvy9.s[79]++;this.edit(todoItem);}else{cov_246rcclvy9.b[29][1]++;cov_246rcclvy9.s[80]++;if(target.classList.contains('to-edit-finish')){cov_246rcclvy9.b[30][0]++;cov_246rcclvy9.s[81]++;this.finishEdit(todoItem);}else{cov_246rcclvy9.b[30][1]++;}}}}},{key:'handleDoneListClick',value:function handleDoneListClick(e){cov_246rcclvy9.f[20]++;var target=(cov_246rcclvy9.s[82]++,e.target),doneItemElement=(cov_246rcclvy9.s[83]++,Util.findNearest(target,'done-item',this.doneList));cov_246rcclvy9.s[84]++;if(!doneItemElement){cov_246rcclvy9.b[31][0]++;cov_246rcclvy9.s[85]++;return;}else{cov_246rcclvy9.b[31][1]++;}var doneItem=(cov_246rcclvy9.s[86]++,this.doneItems.find(function(doneItem){cov_246rcclvy9.f[21]++;cov_246rcclvy9.s[87]++;return doneItem.element===doneItemElement;}));cov_246rcclvy9.s[88]++;if(target.classList.contains('to-undo')){cov_246rcclvy9.b[32][0]++;cov_246rcclvy9.s[89]++;this.markTodo(doneItem);}else{cov_246rcclvy9.b[32][1]++;cov_246rcclvy9.s[90]++;if(target.classList.contains('to-remove')){cov_246rcclvy9.b[33][0]++;cov_246rcclvy9.s[91]++;this.remove(doneItem);}else{cov_246rcclvy9.b[33][1]++;}}}},{key:'markDone',value:function markDone(todoItem){cov_246rcclvy9.f[22]++;cov_246rcclvy9.s[92]++;if(!todoItem){cov_246rcclvy9.b[34][0]++;cov_246rcclvy9.s[93]++;return;}else{cov_246rcclvy9.b[34][1]++;}cov_246rcclvy9.s[94]++;if(todoItem.element.classList.contains('edit')){cov_246rcclvy9.b[35][0]++;cov_246rcclvy9.s[95]++;this.finishEdit(todoItem);}else{cov_246rcclvy9.b[35][1]++;}cov_246rcclvy9.s[96]++;this.todoItems.splice(this.todoItems.indexOf(todoItem),1);cov_246rcclvy9.s[97]++;this.todoList.removeChild(todoItem.element);cov_246rcclvy9.s[98]++;this.createDoneTask(todoItem.content);}},{key:'edit',value:function edit(todoItem){cov_246rcclvy9.f[23]++;cov_246rcclvy9.s[99]++;if(!todoItem){cov_246rcclvy9.b[36][0]++;cov_246rcclvy9.s[100]++;return;}else{cov_246rcclvy9.b[36][1]++;}cov_246rcclvy9.s[101]++;todoItem.element.classList.add('edit');cov_246rcclvy9.s[102]++;todoItem.element.querySelector('.task-content input').value=todoItem.content;var editButton=(cov_246rcclvy9.s[103]++,todoItem.element.querySelector('.task-button.to-edit'));cov_246rcclvy9.s[104]++;editButton.classList.remove('to-edit');cov_246rcclvy9.s[105]++;editButton.classList.add('to-edit-finish');cov_246rcclvy9.s[106]++;editButton.textContent='Finish edit';}},{key:'finishEdit',value:function finishEdit(todoItem){cov_246rcclvy9.f[24]++;cov_246rcclvy9.s[107]++;if(!todoItem){cov_246rcclvy9.b[37][0]++;cov_246rcclvy9.s[108]++;return;}else{cov_246rcclvy9.b[37][1]++;}var newContent=(cov_246rcclvy9.s[109]++,(cov_246rcclvy9.b[38][0]++,todoItem.element.querySelector('.task-content input').value)||(cov_246rcclvy9.b[38][1]++,todoItem.content));cov_246rcclvy9.s[110]++;todoItem.refresh(newContent);cov_246rcclvy9.s[111]++;todoItem.element.classList.remove('edit');}},{key:'markTodo',value:function markTodo(doneItem){cov_246rcclvy9.f[25]++;cov_246rcclvy9.s[112]++;this.remove(doneItem);cov_246rcclvy9.s[113]++;this.createNewTask(doneItem.content);}},{key:'remove',value:function remove(doneItem){cov_246rcclvy9.f[26]++;cov_246rcclvy9.s[114]++;if(!doneItem){cov_246rcclvy9.b[39][0]++;cov_246rcclvy9.s[115]++;return;}else{cov_246rcclvy9.b[39][1]++;}cov_246rcclvy9.s[116]++;this.doneItems.splice(this.doneItems.indexOf(doneItem),1);cov_246rcclvy9.s[117]++;this.doneList.removeChild(doneItem.element);}},{key:'createNewTask',value:function createNewTask(){cov_246rcclvy9.f[27]++;var todoContent=(cov_246rcclvy9.s[118]++,(cov_246rcclvy9.b[41][0]++,arguments.length>0)&&(cov_246rcclvy9.b[41][1]++,arguments[0]!==undefined)?(cov_246rcclvy9.b[40][0]++,arguments[0]):(cov_246rcclvy9.b[40][1]++,''));var todoItem=(cov_246rcclvy9.s[119]++,new ToDoItem(todoContent));cov_246rcclvy9.s[120]++;this.todoItems.push(todoItem);cov_246rcclvy9.s[121]++;this.todoList.appendChild(todoItem.element);}},{key:'createDoneTask',value:function createDoneTask(){cov_246rcclvy9.f[28]++;var doneContent=(cov_246rcclvy9.s[122]++,(cov_246rcclvy9.b[43][0]++,arguments.length>0)&&(cov_246rcclvy9.b[43][1]++,arguments[0]!==undefined)?(cov_246rcclvy9.b[42][0]++,arguments[0]):(cov_246rcclvy9.b[42][1]++,''));var doneItem=(cov_246rcclvy9.s[123]++,new DoneItem(doneContent));cov_246rcclvy9.s[124]++;this.doneItems.push(doneItem);cov_246rcclvy9.s[125]++;this.doneList.appendChild(doneItem.element);}},{key:'refreshAddTaskButton',value:function refreshAddTaskButton(){cov_246rcclvy9.f[29]++;cov_246rcclvy9.s[126]++;this.addTaskButton.disabled=this.addTaskInput.value.length===0;}}]);cov_246rcclvy9.s[127]++;return App;}());var Item=(cov_246rcclvy9.s[128]++,function(){cov_246rcclvy9.f[30]++;function Item(content){cov_246rcclvy9.f[31]++;cov_246rcclvy9.s[129]++;_classCallCheck(this,Item);cov_246rcclvy9.s[130]++;this.element=this.createItem(content);cov_246rcclvy9.s[131]++;this.content=content;}cov_246rcclvy9.s[132]++;_createClass(Item,[{key:'createItem',value:function createItem(content){cov_246rcclvy9.f[32]++;var item=(cov_246rcclvy9.s[133]++,document.createElement('li'));cov_246rcclvy9.s[134]++;item.className='item';cov_246rcclvy9.s[135]++;item.innerHTML=this.render(content);cov_246rcclvy9.s[136]++;return item;}},{key:'render',value:function render(content){cov_246rcclvy9.f[33]++;cov_246rcclvy9.s[137]++;return Util.escapeHtml(content);}},{key:'refresh',value:function refresh(content){cov_246rcclvy9.f[34]++;cov_246rcclvy9.s[138]++;this.content=content;cov_246rcclvy9.s[139]++;this.element.innerHTML=this.render(content);}}]);cov_246rcclvy9.s[140]++;return Item;}());var ToDoItem=(cov_246rcclvy9.s[141]++,function(_Item){cov_246rcclvy9.f[35]++;cov_246rcclvy9.s[142]++;_inherits(ToDoItem,_Item);function ToDoItem(todoContent){cov_246rcclvy9.f[36]++;cov_246rcclvy9.s[143]++;_classCallCheck(this,ToDoItem);var _this3=(cov_246rcclvy9.s[144]++,_possibleConstructorReturn(this,((cov_246rcclvy9.b[44][0]++,ToDoItem.__proto__)||(cov_246rcclvy9.b[44][1]++,Object.getPrototypeOf(ToDoItem))).call(this,todoContent)));cov_246rcclvy9.s[145]++;_this3.element.classList.add('todo-item');cov_246rcclvy9.s[146]++;return _this3;}cov_246rcclvy9.s[147]++;_createClass(ToDoItem,[{key:'render',value:function render(content){cov_246rcclvy9.f[37]++;cov_246rcclvy9.s[148]++;return'\n      <div class="task-content longest">\n        <span>'+Util.escapeHtml(content)+'</span>\n        <input type="text" />\n      </div>\n      <button class="task-button to-edit">Edit</button>\n      <button class="task-button correct to-done">Done</button>\n    ';}}]);cov_246rcclvy9.s[149]++;return ToDoItem;}(Item));var DoneItem=(cov_246rcclvy9.s[150]++,function(_Item2){cov_246rcclvy9.f[38]++;cov_246rcclvy9.s[151]++;_inherits(DoneItem,_Item2);function DoneItem(doneContent){cov_246rcclvy9.f[39]++;cov_246rcclvy9.s[152]++;_classCallCheck(this,DoneItem);var _this4=(cov_246rcclvy9.s[153]++,_possibleConstructorReturn(this,((cov_246rcclvy9.b[45][0]++,DoneItem.__proto__)||(cov_246rcclvy9.b[45][1]++,Object.getPrototypeOf(DoneItem))).call(this,doneContent)));cov_246rcclvy9.s[154]++;_this4.element.classList.add('done-item');cov_246rcclvy9.s[155]++;return _this4;}cov_246rcclvy9.s[156]++;_createClass(DoneItem,[{key:'render',value:function render(content){cov_246rcclvy9.f[40]++;cov_246rcclvy9.s[157]++;return'\n      <div class="task-content longest">\n        <span>'+Util.escapeHtml(content)+'</span>\n      </div>\n      <button class="task-button to-undo">Undo</button>\n      <button class="task-button correct to-remove">Remove</button>\n    ';}}]);cov_246rcclvy9.s[158]++;return DoneItem;}(Item));cov_246rcclvy9.s[159]++;new App(document.querySelector('.todoapp-container'),['Buy Milk','Go to gym'],['Buy Bread']);

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