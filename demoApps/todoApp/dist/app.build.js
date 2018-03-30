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


const Util = {
  tagsToReplace: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  },

  replaceTag: tag => Util.tagsToReplace[tag] || tag,

  escapeHtml: text => text.replace(/[&<>]/g, Util.replaceTag),

  /**
   * Find the nearest element that has given className,
   * start from startElement, and end by endElement
   */
  findNearest: (startElement, className, endElement = document.body) => {
    while (startElement && startElement !== endElement) {
      if (startElement.classList.contains(className)) {
        return startElement;
      }

      startElement = startElement.parentElement;
    }

    return null;
  }
};

class App {

  constructor(container, todoItems = [], doneItems = []) {
    // Props
    this.container = container;

    // DOM element
    this.newTaskSection = this.container.querySelector('.new-task-section');
    this.todoTaskSection = this.container.querySelector('.todo-task-section');
    this.doneTaskSection = this.container.querySelector('.done-task-section');
    this.addTaskInput = this.newTaskSection.querySelector('input.task-input');
    this.addTaskButton = this.newTaskSection.querySelector('button.task-button');
    this.todoList = this.todoTaskSection.querySelector('ul.todo-list');
    this.doneList = this.doneTaskSection.querySelector('ul.done-list');

    // State
    this.todoItems = [];
    this.doneItems = [];

    this.initTodoItems(todoItems);
    this.initDoneItems(doneItems);
    this.refreshAddTaskButton();
    this.listen();
  }

  initTodoItems(todoItems = []) {
    todoItems.forEach(todoItem => {
      this.createNewTask(todoItem);
    });
  }

  initDoneItems(doneItems = []) {
    doneItems.forEach(doneItem => {
      this.createDoneTask(doneItem);
    });
  }

  listen() {
    this.addTaskButton.addEventListener('click', this.handleAddTask.bind(this));
    this.addTaskInput.addEventListener('keyup', this.handleAddTaskKeyup.bind(this));
    this.todoList.addEventListener('click', this.handleTodoListClick.bind(this));
    this.doneList.addEventListener('click', this.handleDoneListClick.bind(this));
  }

  handleAddTask() {
    let todoContent = this.addTaskInput.value;

    if (todoContent.length === 0) {
      return;
    }

    this.createNewTask(todoContent);
  }

  handleAddTaskKeyup() {
    this.refreshAddTaskButton();
  }

  handleTodoListClick(e) {
    // Find the targee todo item
    let target = e.target,
        todoItemElement = Util.findNearest(target, 'todo-item', this.todoList);

    if (!todoItemElement) {
      return;
    }

    let todoItem = this.todoItems.find(todoItem => todoItem.element === todoItemElement);

    if (target.classList.contains('to-done')) {
      // Click on done button
      this.markDone(todoItem);
    } else if (target.classList.contains('to-edit')) {
      // Click on edit button
      this.edit(todoItem);
    } else if (target.classList.contains('to-edit-finish')) {
      // Click on finish edit button
      this.finishEdit(todoItem);
    }
  }

  handleDoneListClick(e) {
    // Find the targee todo item
    let target = e.target,
        doneItemElement = Util.findNearest(target, 'done-item', this.doneList);

    if (!doneItemElement) {
      return;
    }

    let doneItem = this.doneItems.find(doneItem => doneItem.element === doneItemElement);

    if (target.classList.contains('to-undo')) {
      // Click on done button
      this.markTodo(doneItem);
    } else if (target.classList.contains('to-remove')) {
      // Click on edit button
      this.remove(doneItem);
    }
  }

  markDone(todoItem) {
    if (!todoItem) {
      return;
    }

    // If in the middle of editing, save it first
    if (todoItem.element.classList.contains('edit')) {
      this.finishEdit(todoItem);
    }

    this.todoItems.splice(this.todoItems.indexOf(todoItem), 1);
    this.todoList.removeChild(todoItem.element);
    this.createDoneTask(todoItem.content);
  }

  edit(todoItem) {
    if (!todoItem) {
      return;
    }

    todoItem.element.classList.add('edit');
    todoItem.element.querySelector('.task-content input').value = todoItem.content;

    let editButton = todoItem.element.querySelector('.task-button.to-edit');
    editButton.classList.remove('to-edit');
    editButton.classList.add('to-edit-finish');
    editButton.textContent = 'Finish edit';
  }

  finishEdit(todoItem) {
    if (!todoItem) {
      return;
    }

    let newContent = todoItem.element.querySelector('.task-content input').value || todoItem.content;
    todoItem.refresh(newContent);
    todoItem.element.classList.remove('edit');
  }

  markTodo(doneItem) {
    this.remove(doneItem);
    this.createNewTask(doneItem.content);
  }

  remove(doneItem) {
    if (!doneItem) {
      return;
    }

    this.doneItems.splice(this.doneItems.indexOf(doneItem), 1);
    this.doneList.removeChild(doneItem.element);
  }

  createNewTask(todoContent = '') {
    let todoItem = new ToDoItem(todoContent);
    this.todoItems.push(todoItem);
    this.todoList.appendChild(todoItem.element);
  }

  createDoneTask(doneContent = '') {
    let doneItem = new DoneItem(doneContent);
    this.doneItems.push(doneItem);
    this.doneList.appendChild(doneItem.element);
  }

  refreshAddTaskButton() {
    this.addTaskButton.disabled = this.addTaskInput.value.length === 0;
  }

}

class Item {
  constructor(content) {
    this.element = this.createItem(content);
    this.content = content;
  }

  /**
   * Create done item element
   */
  createItem(content) {
    let item = document.createElement('li');

    item.className = 'item';
    item.innerHTML = this.render(content);
    return item;
  }

  render(content) {
    return Util.escapeHtml(content);
  }

  refresh(content) {
    this.content = content;
    this.element.innerHTML = this.render(content);
  }
}

class ToDoItem extends Item {
  constructor(todoContent) {
    super(todoContent);
    this.element.classList.add('todo-item');
  }

  render(content) {
    return `
      <div class="task-content longest">
        <span>${Util.escapeHtml(content)}</span>
        <input type="text" />
      </div>
      <button class="task-button to-edit">Edit</button>
      <button class="task-button correct to-done">Done</button>
    `;
  }
}

class DoneItem extends Item {
  constructor(doneContent) {
    super(doneContent);
    this.element.classList.add('done-item');
  }

  render(content) {
    return `
      <div class="task-content longest">
        <span>${Util.escapeHtml(content)}</span>
      </div>
      <button class="task-button to-undo">Undo</button>
      <button class="task-button correct to-remove">Remove</button>
    `;
  }
}

// Bootstrap application
new App(document.querySelector('.todoapp-container'), ['Buy Milk', 'Go to gym'], ['Buy Bread']);

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
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
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
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

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