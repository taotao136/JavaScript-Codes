(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.jQuery = factory());
}(this, (function () { 'use strict';

var class2type = {}; // 保存各类型的属性字符串

var toString = class2type.toString; // 等价于Object.prototype.toString()

var getProto = Object.getPrototypeOf;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString; // ==> Object.toString 或 Function.toString

var ObjectFunctionString = fnToString.call(Object); // PlainObject, 简单对象，通过{}或者new创建的对象

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var version = "0.0.1";
var jQuery$1 = function jQuery$1(selector, context) {

	return new jQuery$1.fn.init(selector, context);
};

jQuery$1.fn = jQuery$1.prototype = {
	jquery: version,
	length: 0, // 增加长度属性，方便数组到类数组对象的转换
	constructor: jQuery$1,
	setBackground: function setBackground() {
		this[0].style.background = 'yellow';
		return this;
	},
	setColor: function setColor() {
		this[0].style.color = 'blue';
		return this;
	}
};

jQuery$1.extend = jQuery$1.fn.extend = function () {
	/*
 	根据参数去判断，是否需要深拷贝，一般第一个参数如果是Boolean型，
 	则指定拷贝类型，然后第二个参数才是要拷贝的对象
  */
	var options,
	    name,
	    clone,
	    copy,
	    src,
	    copyIsArray,
	    target = arguments[0] || {},
	    // 被拷贝的对象
	i = 1,
	    length = arguments.length,
	    deep = false;

	// 第一参数为布尔型，则为是否深拷贝
	if (typeof target === 'Boolean') {
		deep = target;

		// 被拷贝的对象往后挪
		target = arguments[i] || {};
		i++;
	}

	// target为非对象处理 [MOD-1]
	if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && !jQuery$1.isFunction(target)) {
		target = {};
	}

	// target 后没有参数了，则扩展jQuery自身
	if (i === length) {
		target = this;
		i--; // 回去取最初的target，因为此时target成了被拷贝的对象了
	}

	// 拷贝过程
	for (; i < length; i++) {
		// 开始拷贝

		// 只处理源对象不为 null/undefined 情况
		if ((options = arguments[i]) != null) {
			// 真正开始扩展，进行拷贝的地方

			for (name in options) {
				src = target[name]; // 源对象属性
				copy = options[name]; // 被拷贝的对象属性

				// 避免自己合自己导致死循环
				if (src === copy) {
					continue;
				}

				// [MOD-2]
				if (deep && copy && (jQuery$1.isPlainObject(copy) || (copyIsArray = jQuery$1.isArray(copy)))) {

					// 数组
					if (copyIsArray) {
						copyIsArray = false;

						// 被合并的对象不是数组，则设置为数组
						clone = src && jQuery$1.isArray(src) ? src : [];
					} else {
						// 对象

						// 被合并对象不是对象，则设置为对象
						clone = src && jQuery$1.isPlainObject(src) ? src : {};
					}

					// 递归直到最内层的属性值为非对象，再保存属性值
					target[name] = jQeury.extend(deep, clone, copy);
				} else if (copy !== undefined) {
					// 前拷贝或者非对象或非数组
					target[name] = copy;
				}
			}
		}
	}

	// 返回修改后的目标对象
	return target;
};

//新增修改点1，class2type注入各JS类型键值对，配合 jQuery.type 使用，后面会用上
"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function (name) {
	class2type["[object " + name + "]"] = name.toLowerCase();
});

// [new mod 2]
// 扩展工具函数对象
jQuery$1.extend({

	// 将数组转成类数组对象
	merge: function merge(first, second) {

		var len = +second.length,
		    j = 0,
		    i = first.length; // 被扩展的对象的长度属性

		for (; j < len; j++) {
			// 用被扩展对象的长度属性值自加作为键，
			// 值为对应的被合并的数组中的元素
			first[i++] = second[j];
		}

		// 更新被扩展的对象长度属性值
		first.length = i;

		// 返回扩展后的对象
		return first;
	},

	isArray: Array.isArray,

	isPlainObject: function isPlainObject(obj) {
		var proto, Ctor;

		// 非对象判断
		if (!obj || toString.call(obj) !== '[object Object]') {
			return false;
		}

		// 获取prototype
		proto = getProto(obj);

		// 因为通过 {} 字面量创建的对象是没有prototype的
		if (!proto) {
			return true;
		}

		// 简单对象的构造函数等于最顶层Object的构造函数
		Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

		// 由于PlainObject为 {} 或者通过new创建的对象
		// 上面已经通过prototype属性判断了是否为 {} 形式创建的对象，因为{}创建的对象是没有原型的
		// 这里的判断是通过new 创建的对象
		// 	1. 首先函数，有原型prototype，原型里有构造函数constructor，通过上面一句获取出的是函数
		// 	   的构造函数，如果没有则为'false'(按逻辑值是不会为false的)，下面也就返回false，
		// 	2. 上面成立，则会Ctor就会保存原型中的构造函数对象，那么Ctor的typeof也就是'function'，
		// 	   下面的&&前面是成立的，&&后面是从类型对象中去寻找是否有'function'的类型，找到了与
		// 	   'Object'对象调用'toString'后的结果相比较
		return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
	},

	isFunction: function isFunction(obj) {
		return jQuery$1.type(obj) === 'function';
	},

	// 获取类型
	type: function type(obj) {
		if (obj == null) {
			return obj + ""; // undefined or null
		}

		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function' ? // 非基础类型
		// 在类型对象中找不到标识方式，则直接用'object'
		class2type[toString.call(obj)] || 'object'
		// 基础类型，直接用typeof即可
		: typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	}
});

var global$1 = function global$1(jQuery) {
    //走模块化形式的直接绕过
    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && typeof module.exports !== 'undefined') return;

    var _jQuery = window.jQuery,
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        //确保window.$没有再次被改写
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        //确保window.jQuery没有再次被改写
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery; //返回 jQuery 接口引用
    };

    window.jQuery = window.$ = jQuery;
};

var init = function init(jQuery) {
    jQuery.fn.init = function (selector, context, root) {
        if (!selector) {
            return this;
        } else {
            // var elem = document.querySelector(selector);
            var elemList = jQuery.find(selector);
            if (elemList.length) {
                // this[0] = elem;
                // this.length = 1;
                jQuery.merge(this, elemList);
            }

            return this;
        }
    };

    jQuery.fn.init.prototype = jQuery.fn;
};

var i;
var support;
var Expr;
var getText;
var isXML;
var tokenize;
var compile;
var select;
var outermostContext;
var sortInput;
var hasDuplicate;
var setDocument;
var document;
var docElem;
var documentIsHTML;
var rbuggyQSA;
var rbuggyMatches;
var matches;
var contains;
var expando = "sizzle" + 1 * new Date();
var preferredDoc = window.document;
var dirruns = 0;
var done = 0;
var classCache = createCache();
var tokenCache = createCache();
var compilerCache = createCache();
var sortOrder = function sortOrder(a, b) {
	if (a === b) {
		hasDuplicate = true;
	}
	return 0;
};
var hasOwn$1 = {}.hasOwnProperty;
var arr = [];
var pop = arr.pop;
var push_native = arr.push;
var push = arr.push;
var slice = arr.slice;
var indexOf = function indexOf(list, elem) {
	var i = 0,
	    len = list.length;
	for (; i < len; i++) {
		if (list[i] === elem) {
			return i;
		}
	}
	return -1;
};
var booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
var whitespace = "[\\x20\\t\\r\\n\\f]";
var identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+";
var attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
// Operator (capture 2)
"*([*^$|!~]?=)" + whitespace +
// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]";
var pseudos = ":(" + identifier + ")(?:\\((" +
// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
// 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
// 3. anything else (capture 2)
".*" + ")\\)|)";
var rwhitespace = new RegExp(whitespace + "+", "g");
var rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");
var rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*");
var rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*");
var rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g");
var rpseudo = new RegExp(pseudos);
var ridentifier = new RegExp("^" + identifier + "$");
var matchExpr = {
	"ID": new RegExp("^#(" + identifier + ")"),
	"CLASS": new RegExp("^\\.(" + identifier + ")"),
	"TAG": new RegExp("^(" + identifier + "|[*])"),
	"ATTR": new RegExp("^" + attributes),
	"PSEUDO": new RegExp("^" + pseudos),
	"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
	"bool": new RegExp("^(?:" + booleans + ")$", "i"),
	// For use in libraries implementing .is()
	// We use this for POS matching in `select`
	"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
};
var rinputs = /^(?:input|select|textarea|button)$/i;
var rheader = /^h\d$/i;
var rnative = /^[^{]+\{\s*\[native \w/;
var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
var rsibling = /[+~]/;
var runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig");
var funescape = function funescape(_, escaped, escapedWhitespace) {
	var high = "0x" + escaped - 0x10000;
	// NaN means non-codepoint
	// Support: Firefox<24
	// Workaround erroneous numeric interpretation of +"0x"
	return high !== high || escapedWhitespace ? escaped : high < 0 ?
	// BMP codepoint
	String.fromCharCode(high + 0x10000) :
	// Supplemental Plane codepoint (surrogate pair)
	String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
};
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g;
var fcssescape = function fcssescape(ch, asCodePoint) {
	if (asCodePoint) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if (ch === "\0") {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
};
var unloadHandler = function unloadHandler() {
	setDocument();
};
var inDisabledFieldset = addCombinator(function (elem) {
	return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
}, { dir: "parentNode", next: "legend" });

// Optimize for push.apply( _, NodeList )
try {
	push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[preferredDoc.childNodes.length].nodeType;
} catch (e) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function (target, els) {
			push_native.apply(target, slice.call(els));
		} :

		// Support: IE<9
		// Otherwise append directly
		function (target, els) {
			var j = target.length,
			    i = 0;
			// Can't trust NodeList.length
			while (target[j++] = els[i++]) {}
			target.length = j - 1;
		}
	};
}

function Sizzle(selector, context, results, seed) {
	var m,
	    i,
	    elem,
	    nid,
	    match,
	    groups,
	    newSelector,
	    newContext = context && context.ownerDocument,


	// nodeType defaults to 9, since context defaults to document
	nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if (!seed) {

		if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
			setDocument(context);
		}
		context = context || document;

		if (documentIsHTML) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

				// ID selector
				if (m = match[1]) {

					// Document context
					if (nodeType === 9) {
						if (elem = context.getElementById(m)) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if (elem.id === m) {
								results.push(elem);
								return results;
							}
						} else {
							return results;
						}

						// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

							results.push(elem);
							return results;
						}
					}

					// Type selector
				} else if (match[2]) {
					push.apply(results, context.getElementsByTagName(selector));
					return results;

					// Class selector
				} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

					push.apply(results, context.getElementsByClassName(m));
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

				if (nodeType !== 1) {
					newContext = context;
					newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
				} else if (context.nodeName.toLowerCase() !== "object") {

					// Capture the context ID, setting it first if necessary
					if (nid = context.getAttribute("id")) {
						nid = nid.replace(rcssescape, fcssescape);
					} else {
						context.setAttribute("id", nid = expando);
					}

					// Prefix every selector in the list
					groups = tokenize(selector);
					i = groups.length;
					while (i--) {
						groups[i] = "#" + nid + " " + toSelector(groups[i]);
					}
					newSelector = groups.join(",");

					// Expand context for sibling selectors
					newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
				}

				if (newSelector) {
					try {
						push.apply(results, newContext.querySelectorAll(newSelector));
						return results;
					} catch (qsaError) {} finally {
						if (nid === expando) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}
	}

	// All others
	return select(selector.replace(rtrim, "$1"), context, results, seed);
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache(key, value) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if (keys.push(key + " ") > Expr.cacheLength) {
			// Only keep the most recent entries
			delete cache[keys.shift()];
		}
		return cache[key + " "] = value;
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction(fn) {
	fn[expando] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert(fn) {
	var el = document.createElement("fieldset");

	try {
		return !!fn(el);
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle(attrs, handler) {
	var arr = attrs.split("|"),
	    i = arr.length;

	while (i--) {
		Expr.attrHandle[arr[i]] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck(a, b) {
	var cur = b && a,
	    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if (diff) {
		return diff;
	}

	// Check if b follows a
	if (cur) {
		while (cur = cur.nextSibling) {
			if (cur === b) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo(type) {
	return function (elem) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo(type) {
	return function (elem) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo(disabled) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function (elem) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ("form" in elem) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if (elem.parentNode && elem.disabled === false) {

				// Option elements defer to a parent optgroup if present
				if ("label" in elem) {
					if ("label" in elem.parentNode) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

				// Where there is no isDisabled, check manually
				/* jshint -W018 */
				elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
			}

			return elem.disabled === disabled;

			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
		} else if ("label" in elem) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo(fn) {
	return markFunction(function (argument) {
		argument = +argument;
		return markFunction(function (seed, matches) {
			var j,
			    matchIndexes = fn([], seed.length, argument),
			    i = matchIndexes.length;

			// Match elements found at the specified indexes
			while (i--) {
				if (seed[j = matchIndexes[i]]) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext(context) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function (elem) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function (node) {
	var hasCompare,
	    subWindow,
	    doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML(document);

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

		// Support: IE 11, Edge
		if (subWindow.addEventListener) {
			subWindow.addEventListener("unload", unloadHandler, false);

			// Support: IE 9 - 10 only
		} else if (subWindow.attachEvent) {
			subWindow.attachEvent("onunload", unloadHandler);
		}
	}

	/* Attributes
 ---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function (el) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
 ---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function (el) {
		el.appendChild(document.createComment(""));
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test(document.getElementsByClassName);

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function (el) {
		docElem.appendChild(el).id = expando;
		return !document.getElementsByName || !document.getElementsByName(expando).length;
	});

	// ID filter and find
	if (support.getById) {
		Expr.filter["ID"] = function (id) {
			var attrId = id.replace(runescape, funescape);
			return function (elem) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function (id, context) {
			if (typeof context.getElementById !== "undefined" && documentIsHTML) {
				var elem = context.getElementById(id);
				return elem ? [elem] : [];
			}
		};
	} else {
		Expr.filter["ID"] = function (id) {
			var attrId = id.replace(runescape, funescape);
			return function (elem) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function (id, context) {
			if (typeof context.getElementById !== "undefined" && documentIsHTML) {
				var node,
				    i,
				    elems,
				    elem = context.getElementById(id);

				if (elem) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if (node && node.value === id) {
						return [elem];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName(id);
					i = 0;
					while (elem = elems[i++]) {
						node = elem.getAttributeNode("id");
						if (node && node.value === id) {
							return [elem];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
		if (typeof context.getElementsByTagName !== "undefined") {
			return context.getElementsByTagName(tag);

			// DocumentFragment nodes don't have gEBTN
		} else if (support.qsa) {
			return context.querySelectorAll(tag);
		}
	} : function (tag, context) {
		var elem,
		    tmp = [],
		    i = 0,

		// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
		results = context.getElementsByTagName(tag);

		// Filter out possible comments
		if (tag === "*") {
			while (elem = results[i++]) {
				if (elem.nodeType === 1) {
					tmp.push(elem);
				}
			}

			return tmp;
		}
		return results;
	};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
		if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
			return context.getElementsByClassName(className);
		}
	};

	/* QSA/matchesSelector
 ---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if (support.qsa = rnative.test(document.querySelectorAll)) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function (el) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if (el.querySelectorAll("[msallowcapture^='']").length) {
				rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if (!el.querySelectorAll("[selected]").length) {
				rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if (!el.querySelectorAll(":checked").length) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if (!el.querySelectorAll("a#" + expando + "+*").length) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function (el) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute("type", "hidden");
			el.appendChild(input).setAttribute("name", "D");

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if (el.querySelectorAll("[name=d]").length) {
				rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if (el.querySelectorAll(":enabled").length !== 2) {
				rbuggyQSA.push(":enabled", ":disabled");
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild(el).disabled = true;
			if (el.querySelectorAll(":disabled").length !== 2) {
				rbuggyQSA.push(":enabled", ":disabled");
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

		assert(function (el) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call(el, "*");

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call(el, "[s!='']:x");
			rbuggyMatches.push("!=", pseudos);
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
	rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

	/* Contains
 ---------------------------------------------------------------------- */
	hasCompare = rnative.test(docElem.compareDocumentPosition);

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
		    bup = b && b.parentNode;
		return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
	} : function (a, b) {
		if (b) {
			while (b = b.parentNode) {
				if (b === a) {
					return true;
				}
			}
		}
		return false;
	};

	/* Sorting
 ---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ? function (a, b) {

		// Flag for duplicate removal
		if (a === b) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if (compare) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

		// Otherwise we know they are disconnected
		1;

		// Disconnected nodes
		if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

			// Choose the first element that is related to our preferred document
			if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
				return -1;
			}
			if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
				return 1;
			}

			// Maintain original order
			return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
		}

		return compare & 4 ? -1 : 1;
	} : function (a, b) {
		// Exit early if the nodes are identical
		if (a === b) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
		    i = 0,
		    aup = a.parentNode,
		    bup = b.parentNode,
		    ap = [a],
		    bp = [b];

		// Parentless nodes are either documents or disconnected
		if (!aup || !bup) {
			return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

			// If the nodes are siblings, we can do a quick check
		} else if (aup === bup) {
			return siblingCheck(a, b);
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while (cur = cur.parentNode) {
			ap.unshift(cur);
		}
		cur = b;
		while (cur = cur.parentNode) {
			bp.unshift(cur);
		}

		// Walk down the tree looking for a discrepancy
		while (ap[i] === bp[i]) {
			i++;
		}

		return i ?
		// Do a sibling check if the nodes have a common ancestor
		siblingCheck(ap[i], bp[i]) :

		// Otherwise nodes in our document sort first
		ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
	};

	return document;
};

Sizzle.matches = function (expr, elements) {
	return Sizzle(expr, null, null, elements);
};

Sizzle.matchesSelector = function (elem, expr) {
	// Set document vars if needed
	if ((elem.ownerDocument || elem) !== document) {
		setDocument(elem);
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace(rattributeQuotes, "='$1']");

	if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

		try {
			var ret = matches.call(elem, expr);

			// IE 9's matchesSelector returns false on disconnected nodes
			if (ret || support.disconnectedMatch ||
			// As well, disconnected nodes are said to be in a document
			// fragment in IE 9
			elem.document && elem.document.nodeType !== 11) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle(expr, document, null, [elem]).length > 0;
};

Sizzle.contains = function (context, elem) {
	// Set document vars if needed
	if ((context.ownerDocument || context) !== document) {
		setDocument(context);
	}
	return contains(context, elem);
};

Sizzle.attr = function (elem, name) {
	// Set document vars if needed
	if ((elem.ownerDocument || elem) !== document) {
		setDocument(elem);
	}

	var fn = Expr.attrHandle[name.toLowerCase()],

	// Don't get fooled by Object.prototype properties (jQuery #13807)
	val = fn && hasOwn$1.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

	return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
};

Sizzle.escape = function (sel) {
	return (sel + "").replace(rcssescape, fcssescape);
};

Sizzle.error = function (msg) {
	throw new Error("Syntax error, unrecognized expression: " + msg);
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function (results) {
	var elem,
	    duplicates = [],
	    j = 0,
	    i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice(0);
	results.sort(sortOrder);

	if (hasDuplicate) {
		while (elem = results[i++]) {
			if (elem === results[i]) {
				j = duplicates.push(i);
			}
		}
		while (j--) {
			results.splice(duplicates[j], 1);
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function (elem) {
	var node,
	    ret = "",
	    i = 0,
	    nodeType = elem.nodeType;

	if (!nodeType) {
		// If no nodeType, this is expected to be an array
		while (node = elem[i++]) {
			// Do not traverse comment nodes
			ret += getText(node);
		}
	} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if (typeof elem.textContent === "string") {
			return elem.textContent;
		} else {
			// Traverse its children
			for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				ret += getText(elem);
			}
		}
	} else if (nodeType === 3 || nodeType === 4) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function ATTR(match) {
			match[1] = match[1].replace(runescape, funescape);

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

			if (match[2] === "~=") {
				match[3] = " " + match[3] + " ";
			}

			return match.slice(0, 4);
		},

		"CHILD": function CHILD(match) {
			/* matches from matchExpr["CHILD"]
   	1 type (only|nth|...)
   	2 what (child|of-type)
   	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
   	4 xn-component of xn+y argument ([+-]?\d*n|)
   	5 sign of xn-component
   	6 x of xn-component
   	7 sign of y-component
   	8 y of y-component
   */
			match[1] = match[1].toLowerCase();

			if (match[1].slice(0, 3) === "nth") {
				// nth-* requires argument
				if (!match[3]) {
					Sizzle.error(match[0]);
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
				match[5] = +(match[7] + match[8] || match[3] === "odd");

				// other types prohibit arguments
			} else if (match[3]) {
				Sizzle.error(match[0]);
			}

			return match;
		},

		"PSEUDO": function PSEUDO(match) {
			var excess,
			    unquoted = !match[6] && match[2];

			if (matchExpr["CHILD"].test(match[0])) {
				return null;
			}

			// Accept quoted arguments as-is
			if (match[3]) {
				match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
			} else if (unquoted && rpseudo.test(unquoted) && (
			// Get excess from tokenize (recursively)
			excess = tokenize(unquoted, true)) && (
			// advance to the next closing parenthesis
			excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

				// excess is a negative index
				match[0] = match[0].slice(0, excess);
				match[2] = unquoted.slice(0, excess);
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice(0, 3);
		}
	},

	filter: {

		"TAG": function TAG(nodeNameSelector) {
			var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
			return nodeNameSelector === "*" ? function () {
				return true;
			} : function (elem) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function CLASS(className) {
			var pattern = classCache[className + " "];

			return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
				return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
			});
		},

		"ATTR": function ATTR(name, operator, check) {
			return function (elem) {
				var result = Sizzle.attr(elem, name);

				if (result == null) {
					return operator === "!=";
				}
				if (!operator) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
			};
		},

		"CHILD": function CHILD(type, what, argument, first, last) {
			var simple = type.slice(0, 3) !== "nth",
			    forward = type.slice(-4) !== "last",
			    ofType = what === "of-type";

			return first === 1 && last === 0 ?

			// Shortcut for :nth-*(n)
			function (elem) {
				return !!elem.parentNode;
			} : function (elem, context, xml) {
				var cache,
				    uniqueCache,
				    outerCache,
				    node,
				    nodeIndex,
				    start,
				    dir = simple !== forward ? "nextSibling" : "previousSibling",
				    parent = elem.parentNode,
				    name = ofType && elem.nodeName.toLowerCase(),
				    useCache = !xml && !ofType,
				    diff = false;

				if (parent) {

					// :(first|last|only)-(child|of-type)
					if (simple) {
						while (dir) {
							node = elem;
							while (node = node[dir]) {
								if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

									return false;
								}
							}
							// Reverse direction for :only-* (if we haven't yet done so)
							start = dir = type === "only" && !start && "nextSibling";
						}
						return true;
					}

					start = [forward ? parent.firstChild : parent.lastChild];

					// non-xml :nth-child(...) stores cache data on `parent`
					if (forward && useCache) {

						// Seek `elem` from a previously-cached index

						// ...in a gzip-friendly way
						node = parent;
						outerCache = node[expando] || (node[expando] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

						cache = uniqueCache[type] || [];
						nodeIndex = cache[0] === dirruns && cache[1];
						diff = nodeIndex && cache[2];
						node = nodeIndex && parent.childNodes[nodeIndex];

						while (node = ++nodeIndex && node && node[dir] || (

						// Fallback to seeking `elem` from the start
						diff = nodeIndex = 0) || start.pop()) {

							// When found, cache indexes on `parent` and break
							if (node.nodeType === 1 && ++diff && node === elem) {
								uniqueCache[type] = [dirruns, nodeIndex, diff];
								break;
							}
						}
					} else {
						// Use previously-cached element index if available
						if (useCache) {
							// ...in a gzip-friendly way
							node = elem;
							outerCache = node[expando] || (node[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

							cache = uniqueCache[type] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = nodeIndex;
						}

						// xml :nth-child(...)
						// or :nth-last-child(...) or :nth(-last)?-of-type(...)
						if (diff === false) {
							// Use the same loop as above to seek `elem` from the start
							while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

								if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

									// Cache the index of each encountered element
									if (useCache) {
										outerCache = node[expando] || (node[expando] = {});

										// Support: IE <9 only
										// Defend against cloned attroperties (jQuery gh-1709)
										uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

										uniqueCache[type] = [dirruns, diff];
									}

									if (node === elem) {
										break;
									}
								}
							}
						}
					}

					// Incorporate the offset, then check against cycle size
					diff -= last;
					return diff === first || diff % first === 0 && diff / first >= 0;
				}
			};
		},

		"PSEUDO": function PSEUDO(pseudo, argument) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
			    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if (fn[expando]) {
				return fn(argument);
			}

			// But maintain support for old signatures
			if (fn.length > 1) {
				args = [pseudo, pseudo, "", argument];
				return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
					var idx,
					    matched = fn(seed, argument),
					    i = matched.length;
					while (i--) {
						idx = indexOf(seed, matched[i]);
						seed[idx] = !(matches[idx] = matched[i]);
					}
				}) : function (elem) {
					return fn(elem, 0, args);
				};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function (selector) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
			    results = [],
			    matcher = compile(selector.replace(rtrim, "$1"));

			return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
				var elem,
				    unmatched = matcher(seed, null, xml, []),
				    i = seed.length;

				// Match elements unmatched by `matcher`
				while (i--) {
					if (elem = unmatched[i]) {
						seed[i] = !(matches[i] = elem);
					}
				}
			}) : function (elem, context, xml) {
				input[0] = elem;
				matcher(input, null, xml, results);
				// Don't keep the element (issue #299)
				input[0] = null;
				return !results.pop();
			};
		}),

		"has": markFunction(function (selector) {
			return function (elem) {
				return Sizzle(selector, elem).length > 0;
			};
		}),

		"contains": markFunction(function (text) {
			text = text.replace(runescape, funescape);
			return function (elem) {
				return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction(function (lang) {
			// lang value must be a valid identifier
			if (!ridentifier.test(lang || "")) {
				Sizzle.error("unsupported lang: " + lang);
			}
			lang = lang.replace(runescape, funescape).toLowerCase();
			return function (elem) {
				var elemLang;
				do {
					if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
					}
				} while ((elem = elem.parentNode) && elem.nodeType === 1);
				return false;
			};
		}),

		// Miscellaneous
		"target": function target(elem) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice(1) === elem.id;
		},

		"root": function root(elem) {
			return elem === docElem;
		},

		"focus": function focus(elem) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo(false),
		"disabled": createDisabledPseudo(true),

		"checked": function checked(elem) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
		},

		"selected": function selected(elem) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if (elem.parentNode) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function empty(elem) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				if (elem.nodeType < 6) {
					return false;
				}
			}
			return true;
		},

		"parent": function parent(elem) {
			return !Expr.pseudos["empty"](elem);
		},

		// Element/input types
		"header": function header(elem) {
			return rheader.test(elem.nodeName);
		},

		"input": function input(elem) {
			return rinputs.test(elem.nodeName);
		},

		"button": function button(elem) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function text(elem) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

			// Support: IE<8
			// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
			(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
		},

		// Position-in-collection
		"first": createPositionalPseudo(function () {
			return [0];
		}),

		"last": createPositionalPseudo(function (matchIndexes, length) {
			return [length - 1];
		}),

		"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
			return [argument < 0 ? argument + length : argument];
		}),

		"even": createPositionalPseudo(function (matchIndexes, length) {
			var i = 0;
			for (; i < length; i += 2) {
				matchIndexes.push(i);
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function (matchIndexes, length) {
			var i = 1;
			for (; i < length; i += 2) {
				matchIndexes.push(i);
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
			var i = argument < 0 ? argument + length : argument;
			for (; --i >= 0;) {
				matchIndexes.push(i);
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
			var i = argument < 0 ? argument + length : argument;
			for (; ++i < length;) {
				matchIndexes.push(i);
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
	Expr.pseudos[i] = createInputPseudo(i);
}
for (i in { submit: true, reset: true }) {
	Expr.pseudos[i] = createButtonPseudo(i);
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function (selector, parseOnly) {
	var matched,
	    match,
	    tokens,
	    type,
	    soFar,
	    groups,
	    preFilters,
	    cached = tokenCache[selector + " "];

	if (cached) {
		return parseOnly ? 0 : cached.slice(0);
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while (soFar) {

		// Comma and first run
		if (!matched || (match = rcomma.exec(soFar))) {
			if (match) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice(match[0].length) || soFar;
			}
			groups.push(tokens = []);
		}

		matched = false;

		// Combinators
		if (match = rcombinators.exec(soFar)) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace(rtrim, " ")
			});
			soFar = soFar.slice(matched.length);
		}

		// Filters
		for (type in Expr.filter) {
			if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice(matched.length);
			}
		}

		if (!matched) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
	// Cache the tokens
	tokenCache(selector, groups).slice(0);
};

function toSelector(tokens) {
	var i = 0,
	    len = tokens.length,
	    selector = "";
	for (; i < len; i++) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator(matcher, combinator, base) {
	var dir = combinator.dir,
	    skip = combinator.next,
	    key = skip || dir,
	    checkNonElements = base && key === "parentNode",
	    doneName = done++;

	return combinator.first ?
	// Check against closest ancestor/preceding element
	function (elem, context, xml) {
		while (elem = elem[dir]) {
			if (elem.nodeType === 1 || checkNonElements) {
				return matcher(elem, context, xml);
			}
		}
		return false;
	} :

	// Check against all ancestor/preceding elements
	function (elem, context, xml) {
		var oldCache,
		    uniqueCache,
		    outerCache,
		    newCache = [dirruns, doneName];

		// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
		if (xml) {
			while (elem = elem[dir]) {
				if (elem.nodeType === 1 || checkNonElements) {
					if (matcher(elem, context, xml)) {
						return true;
					}
				}
			}
		} else {
			while (elem = elem[dir]) {
				if (elem.nodeType === 1 || checkNonElements) {
					outerCache = elem[expando] || (elem[expando] = {});

					// Support: IE <9 only
					// Defend against cloned attroperties (jQuery gh-1709)
					uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

					if (skip && skip === elem.nodeName.toLowerCase()) {
						elem = elem[dir] || elem;
					} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

						// Assign to newCache so results back-propagate to previous elements
						return newCache[2] = oldCache[2];
					} else {
						// Reuse newcache so results back-propagate to previous elements
						uniqueCache[key] = newCache;

						// A match means we're done; a fail means we have to keep checking
						if (newCache[2] = matcher(elem, context, xml)) {
							return true;
						}
					}
				}
			}
		}
		return false;
	};
}

function elementMatcher(matchers) {
	return matchers.length > 1 ? function (elem, context, xml) {
		var i = matchers.length;
		while (i--) {
			if (!matchers[i](elem, context, xml)) {
				return false;
			}
		}
		return true;
	} : matchers[0];
}

function multipleContexts(selector, contexts, results) {
	var i = 0,
	    len = contexts.length;
	for (; i < len; i++) {
		Sizzle(selector, contexts[i], results);
	}
	return results;
}

function condense(unmatched, map, filter, context, xml) {
	var elem,
	    newUnmatched = [],
	    i = 0,
	    len = unmatched.length,
	    mapped = map != null;

	for (; i < len; i++) {
		if (elem = unmatched[i]) {
			if (!filter || filter(elem, context, xml)) {
				newUnmatched.push(elem);
				if (mapped) {
					map.push(i);
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	if (postFilter && !postFilter[expando]) {
		postFilter = setMatcher(postFilter);
	}
	if (postFinder && !postFinder[expando]) {
		postFinder = setMatcher(postFinder, postSelector);
	}
	return markFunction(function (seed, results, context, xml) {
		var temp,
		    i,
		    elem,
		    preMap = [],
		    postMap = [],
		    preexisting = results.length,


		// Get initial elements from seed or context
		elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


		// Prefilter to get matcher input, preserving a map for seed-results synchronization
		matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
		    matcherOut = matcher ?
		// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
		postFinder || (seed ? preFilter : preexisting || postFilter) ?

		// ...intermediate processing is necessary
		[] :

		// ...otherwise use results directly
		results : matcherIn;

		// Find primary matches
		if (matcher) {
			matcher(matcherIn, matcherOut, context, xml);
		}

		// Apply postFilter
		if (postFilter) {
			temp = condense(matcherOut, postMap);
			postFilter(temp, [], context, xml);

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while (i--) {
				if (elem = temp[i]) {
					matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
				}
			}
		}

		if (seed) {
			if (postFinder || preFilter) {
				if (postFinder) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while (i--) {
						if (elem = matcherOut[i]) {
							// Restore matcherIn since elem is not yet a final match
							temp.push(matcherIn[i] = elem);
						}
					}
					postFinder(null, matcherOut = [], temp, xml);
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while (i--) {
					if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

			// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
			if (postFinder) {
				postFinder(null, results, matcherOut, xml);
			} else {
				push.apply(results, matcherOut);
			}
		}
	});
}

function matcherFromTokens(tokens) {
	var checkContext,
	    matcher,
	    j,
	    len = tokens.length,
	    leadingRelative = Expr.relative[tokens[0].type],
	    implicitRelative = leadingRelative || Expr.relative[" "],
	    i = leadingRelative ? 1 : 0,


	// The foundational matcher ensures that elements are reachable from top-level context(s)
	matchContext = addCombinator(function (elem) {
		return elem === checkContext;
	}, implicitRelative, true),
	    matchAnyContext = addCombinator(function (elem) {
		return indexOf(checkContext, elem) > -1;
	}, implicitRelative, true),
	    matchers = [function (elem, context, xml) {
		var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
		// Avoid hanging onto element (issue #299)
		checkContext = null;
		return ret;
	}];

	for (; i < len; i++) {
		if (matcher = Expr.relative[tokens[i].type]) {
			matchers = [addCombinator(elementMatcher(matchers), matcher)];
		} else {
			matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

			// Return special upon seeing a positional matcher
			if (matcher[expando]) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for (; j < len; j++) {
					if (Expr.relative[tokens[j].type]) {
						break;
					}
				}
				return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
				// If the preceding token was a descendant combinator, insert an implicit any-element `*`
				tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
			}
			matchers.push(matcher);
		}
	}

	return elementMatcher(matchers);
}

function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	var bySet = setMatchers.length > 0,
	    byElement = elementMatchers.length > 0,
	    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
		var elem,
		    j,
		    matcher,
		    matchedCount = 0,
		    i = "0",
		    unmatched = seed && [],
		    setMatched = [],
		    contextBackup = outermostContext,

		// We must always have either seed elements or outermost context
		elems = seed || byElement && Expr.find["TAG"]("*", outermost),

		// Use integer dirruns iff this is the outermost matcher
		dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
		    len = elems.length;

		if (outermost) {
			outermostContext = context === document || context || outermost;
		}

		// Add elements passing elementMatchers directly to results
		// Support: IE<9, Safari
		// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
		for (; i !== len && (elem = elems[i]) != null; i++) {
			if (byElement && elem) {
				j = 0;
				if (!context && elem.ownerDocument !== document) {
					setDocument(elem);
					xml = !documentIsHTML;
				}
				while (matcher = elementMatchers[j++]) {
					if (matcher(elem, context || document, xml)) {
						results.push(elem);
						break;
					}
				}
				if (outermost) {
					dirruns = dirrunsUnique;
				}
			}

			// Track unmatched elements for set filters
			if (bySet) {
				// They will have gone through all possible matchers
				if (elem = !matcher && elem) {
					matchedCount--;
				}

				// Lengthen the array for every element, matched or not
				if (seed) {
					unmatched.push(elem);
				}
			}
		}

		// `i` is now the count of elements visited above, and adding it to `matchedCount`
		// makes the latter nonnegative.
		matchedCount += i;

		// Apply set filters to unmatched elements
		// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
		// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
		// no element matchers and no seed.
		// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
		// case, which will result in a "00" `matchedCount` that differs from `i` but is also
		// numerically zero.
		if (bySet && i !== matchedCount) {
			j = 0;
			while (matcher = setMatchers[j++]) {
				matcher(unmatched, setMatched, context, xml);
			}

			if (seed) {
				// Reintegrate element matches to eliminate the need for sorting
				if (matchedCount > 0) {
					while (i--) {
						if (!(unmatched[i] || setMatched[i])) {
							setMatched[i] = pop.call(results);
						}
					}
				}

				// Discard index placeholder values to get only actual matches
				setMatched = condense(setMatched);
			}

			// Add matches to results
			push.apply(results, setMatched);

			// Seedless set matches succeeding multiple successful matchers stipulate sorting
			if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

				Sizzle.uniqueSort(results);
			}
		}

		// Override manipulation of globals by nested matchers
		if (outermost) {
			dirruns = dirrunsUnique;
			outermostContext = contextBackup;
		}

		return unmatched;
	};

	return bySet ? markFunction(superMatcher) : superMatcher;
}

compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
	var i,
	    setMatchers = [],
	    elementMatchers = [],
	    cached = compilerCache[selector + " "];

	if (!cached) {
		// Generate a function of recursive functions that can be used to check each element
		if (!match) {
			match = tokenize(selector);
		}
		i = match.length;
		while (i--) {
			cached = matcherFromTokens(match[i]);
			if (cached[expando]) {
				setMatchers.push(cached);
			} else {
				elementMatchers.push(cached);
			}
		}

		// Cache the compiled function
		cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function (selector, context, results, seed) {
	var i,
	    tokens,
	    token,
	    type,
	    find,
	    compiled = typeof selector === "function" && selector,
	    match = !seed && tokenize(selector = compiled.selector || selector);

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if (match.length === 1) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice(0);
		if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

			context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
			if (!context) {
				return results;

				// Precompiled matchers will still verify ancestry, so step up a level
			} else if (compiled) {
				context = context.parentNode;
			}

			selector = selector.slice(tokens.shift().value.length);
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
		while (i--) {
			token = tokens[i];

			// Abort if we hit a combinator
			if (Expr.relative[type = token.type]) {
				break;
			}
			if (find = Expr.find[type]) {
				// Search, expanding context for leading sibling combinators
				if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice(i, 1);
					selector = seed.length && toSelector(tokens);
					if (!selector) {
						push.apply(results, seed);
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function (el) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if (!assert(function (el) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#";
})) {
	addHandle("type|href|height|width", function (elem, name, isXML) {
		if (!isXML) {
			return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if (!support.attributes || !assert(function (el) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute("value", "");
	return el.firstChild.getAttribute("value") === "";
})) {
	addHandle("value", function (elem, name, isXML) {
		if (!isXML && elem.nodeName.toLowerCase() === "input") {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if (!assert(function (el) {
	return el.getAttribute("disabled") == null;
})) {
	addHandle(booleans, function (elem, name, isXML) {
		var val;
		if (!isXML) {
			return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		}
	});
}

// EXPOSE
var _sizzle = window.Sizzle;

Sizzle.noConflict = function () {
	if (window.Sizzle === Sizzle) {
		window.Sizzle = _sizzle;
	}

	return Sizzle;
};

var sizzleInit = function sizzleInit(jQuery) {
	jQuery.find = Sizzle;
};

global$1(jQuery$1);
init(jQuery$1);
sizzleInit(jQuery$1);

return jQuery$1;

})));
