/*!
 * vue-virtual-draglist v3.0.0
 * open source under the MIT license
 * https://github.com/mfuu/vue-virtual-drag-list#readme
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VirtualDragList = factory(global.Vue));
})(this, (function (vue) { 'use strict';

    function debounce(func, delay = 50, immediate = false) {
        let timer;
        let result;
        let debounced = function (...args) {
            if (timer)
                clearTimeout(timer);
            if (immediate) {
                let callNow = !timer;
                timer = setTimeout(() => {
                    timer = null;
                }, delay);
                if (callNow)
                    result = func.apply(this, args);
            }
            else {
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            }
            return result;
        };
        debounced.prototype.cancel = function () {
            clearTimeout(timer);
            timer = null;
        };
        return debounced;
    }
    function throttle(fn, delay) {
        let timer = null;
        return function () {
            const context = this, args = arguments;
            if (!timer) {
                timer = setTimeout(function () {
                    timer = null;
                    fn.apply(context, args);
                }, delay);
            }
        };
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var sortable = {exports: {}};

    /*!
     * sortable-dnd v0.2.7
     * open source under the MIT license
     * https://github.com/mfuu/sortable-dnd#readme
     */

    (function (module, exports) {
      (function (global, factory) {
        module.exports = factory() ;
      })(commonjsGlobal, function () {

        function _typeof(obj) {
          "@babel/helpers - typeof";

          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
            return typeof obj;
          } : function (obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          }, _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          Object.defineProperty(Constructor, "prototype", {
            writable: false
          });
          return Constructor;
        }

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

          return arr2;
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function userAgent(pattern) {
          if (typeof window !== 'undefined' && window.navigator) {
            return !! /*@__PURE__*/navigator.userAgent.match(pattern);
          }
        }

        var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
        var Edge = userAgent(/Edge/i);
        var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
        var IOS = userAgent(/iP(ad|od|hone)/i);
        var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
        var captureMode = {
          capture: false,
          passive: false
        };
        var R_SPACE = /\s+/g;
        var CSSTRANSITIONS = ['-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition', 'transition'];
        var CSSTRANSFORMS = ['-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform', 'transform'];
        var SUPPORTPASSIVE = supportPassive();
        /**
         * set transition style
         * @param {HTMLElement} el 
         * @param {String | Function} transition 
         */

        function setTransition(el, transition) {
          if (transition) {
            if (transition === 'none') CSSTRANSITIONS.forEach(function (ts) {
              return css(el, ts, 'none');
            });else CSSTRANSITIONS.forEach(function (ts) {
              return css(el, ts, "".concat(ts.split('transition')[0], "transform ").concat(transition));
            });
          } else CSSTRANSITIONS.forEach(function (ts) {
            return css(el, ts, '');
          });
        }
        /**
         * set transform style
         * @param {HTMLElement} el 
         * @param {String} transform 
         */


        function setTransform(el, transform) {
          if (transform) CSSTRANSFORMS.forEach(function (tf) {
            return css(el, tf, "".concat(tf.split('transform')[0]).concat(transform));
          });else CSSTRANSFORMS.forEach(function (tf) {
            return css(el, tf, '');
          });
        }
        /**
         * get touch event and current event
         * @param {Event} evt 
         */


        function getEvent(evt) {
          var touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt;
          var e = touch || evt;
          var target = touch ? document.elementFromPoint(e.clientX, e.clientY) : e.target;
          return {
            touch: touch,
            e: e,
            target: target
          };
        }
        /**
         * detect passive event support
         */


        function supportPassive() {
          // https://github.com/Modernizr/Modernizr/issues/1894
          var supportPassive = false;
          document.addEventListener('checkIfSupportPassive', null, {
            get passive() {
              supportPassive = true;
              return true;
            }

          });
          return supportPassive;
        }
        /**
        * add specified event listener
        * @param {HTMLElement} el 
        * @param {String} event 
        * @param {Function} fn 
        * @param {Boolean} sp
        */


        function on(el, event, fn) {
          if (window.addEventListener) {
            el.addEventListener(event, fn, SUPPORTPASSIVE || !IE11OrLess ? captureMode : false);
          } else if (window.attachEvent) {
            el.attachEvent('on' + event, fn);
          }
        }
        /**
        * remove specified event listener
        * @param {HTMLElement} el 
        * @param {String} event 
        * @param {Function} fn 
        * @param {Boolean} sp
        */


        function off(el, event, fn) {
          if (window.removeEventListener) {
            el.removeEventListener(event, fn, SUPPORTPASSIVE || !IE11OrLess ? captureMode : false);
          } else if (window.detachEvent) {
            el.detachEvent('on' + event, fn);
          }
        }
        /**
         * get element's offetTop
         * @param {HTMLElement} el 
         */


        function getOffset(el) {
          var result = {
            top: 0,
            left: 0,
            height: 0,
            width: 0
          };
          result.height = el.offsetHeight;
          result.width = el.offsetWidth;
          result.top = el.offsetTop;
          result.left = el.offsetLeft;
          var parent = el.offsetParent;

          while (parent !== null) {
            result.top += parent.offsetTop;
            result.left += parent.offsetLeft;
            parent = parent.offsetParent;
          }

          return result;
        }
        /**
         * get scroll element
         * @param {HTMLElement} el 
         * @param {Boolean} includeSelf whether to include the passed element
         * @returns {HTMLElement} scroll element
         */


        function getParentAutoScrollElement(el, includeSelf) {
          // skip to window
          if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
          var elem = el;
          var gotSelf = false;

          do {
            // we don't need to get elem css if it isn't even overflowing in the first place (performance)
            if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
              var elemCSS = css(elem);

              if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
                if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
                if (gotSelf || includeSelf) return elem;
                gotSelf = true;
              }
            }
          } while (elem = elem.parentNode);

          return getWindowScrollingElement();
        }

        function getWindowScrollingElement() {
          var scrollingElement = document.scrollingElement;

          if (scrollingElement) {
            return scrollingElement.contains(document.body) ? document : scrollingElement;
          } else {
            return document;
          }
        }
        /**
         * Returns the "bounding client rect" of given element
         * @param {HTMLElement} el  The element whose boundingClientRect is wanted
         */


        function getRect(el) {
          if (!el.getBoundingClientRect && el !== window) return;
          var rect = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: 0,
            width: 0
          };
          var elRect;

          if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
            elRect = el.getBoundingClientRect();
            rect.top = elRect.top;
            rect.left = elRect.left;
            rect.bottom = elRect.bottom;
            rect.right = elRect.right;
            rect.height = elRect.height;
            rect.width = elRect.width;
          } else {
            rect.top = 0;
            rect.left = 0;
            rect.bottom = window.innerHeight;
            rect.right = window.innerWidth;
            rect.height = window.innerHeight;
            rect.width = window.innerWidth;
          }

          return rect;
        }
        /**
         * get target Element in group
         * @param {HTMLElement} group 
         * @param {HTMLElement} el 
         * @param {Boolean} onlyEl only get element
         */


        function getElement(group, el, onlyEl) {
          var children = _toConsumableArray(Array.from(group.children)); // If it can be found directly in the child element, return


          var index = children.indexOf(el);
          if (index > -1) return onlyEl ? children[index] : {
            index: index,
            el: children[index],
            rect: getRect(children[index]),
            offset: getOffset(children[index])
          }; // When the dom cannot be found directly in children, need to look down

          for (var i = 0; i < children.length; i++) {
            if (isChildOf(el, children[i])) {
              return onlyEl ? children[i] : {
                index: i,
                el: children[i],
                rect: getRect(children[i]),
                offset: getOffset(children[i])
              };
            }
          }

          return onlyEl ? null : {
            index: -1,
            el: null,
            rect: {},
            offset: {}
          };
        }
        /**
         * Check if child element is contained in parent element
         * @param {HTMLElement} child 
         * @param {HTMLElement} parent 
         * @returns {Boolean} true | false
         */


        function isChildOf(child, parent) {
          var parentNode;

          if (child && parent) {
            parentNode = child.parentNode;

            while (parentNode) {
              if (parent === parentNode) return true;
              parentNode = parentNode.parentNode;
            }
          }

          return false;
        }
        /**
         * add or remove element's class
         * @param {HTMLElement} el element
         * @param {String} name class name
         * @param {Boolean} state true: add, false: remove
         */


        function toggleClass(el, name, state) {
          if (el && name) {
            if (el.classList) {
              el.classList[state ? 'add' : 'remove'](name);
            } else {
              var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
              el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
            }
          }
        }
        /**
         * Check if a DOM element matches a given selector
         * @param {HTMLElement} el 
         * @param {String} selector 
         * @returns 
         */


        function matches(el, selector) {
          if (!selector) return;
          selector[0] === '>' && (selector = selector.substring(1));

          if (el) {
            try {
              if (el.matches) {
                return el.matches(selector);
              } else if (el.msMatchesSelector) {
                return el.msMatchesSelector(selector);
              } else if (el.webkitMatchesSelector) {
                return el.webkitMatchesSelector(selector);
              }
            } catch (error) {
              return false;
            }
          }

          return false;
        }

        function css(el, prop, val) {
          var style = el && el.style;

          if (style) {
            if (val === void 0) {
              if (document.defaultView && document.defaultView.getComputedStyle) {
                val = document.defaultView.getComputedStyle(el, '');
              } else if (el.currentStyle) {
                val = el.currentStyle;
              }

              return prop === void 0 ? val : val[prop];
            } else {
              if (!(prop in style) && prop.indexOf('webkit') === -1) {
                prop = '-webkit-' + prop;
              }

              style[prop] = val + (typeof val === 'string' ? '' : 'px');
            }
          }
        }

        function debounce(fn, delay, immediate) {
          var timer = null;
          return function () {
            var context = this,
                args = arguments;
            timer && clearTimeout(timer);
            immediate && !timer && fn.apply(context, args);
            timer = setTimeout(function () {
              fn.apply(context, args);
            }, delay);
          };
        }

        function throttle(fn, delay) {
          var timer = null;
          return function () {
            var context = this,
                args = arguments;

            if (!timer) {
              timer = setTimeout(function () {
                timer = null;
                fn.apply(context, args);
              }, delay);
            }
          };
        }

        function _nextTick(fn) {
          return setTimeout(fn, 0);
        }

        var State = /*#__PURE__*/_createClass(function State() {
          _classCallCheck(this, State);

          this.sortableDown = undefined;
          this.sortableMove = undefined;
          this.animationEnd = undefined;
        });
        /**
         * 拖拽前后差异初始化
         */


        var Differ = /*#__PURE__*/function () {
          function Differ() {
            _classCallCheck(this, Differ);

            this.from = {
              node: null,
              rect: {},
              offset: {}
            };
            this.to = {
              node: null,
              rect: {},
              offset: {}
            };
          }

          _createClass(Differ, [{
            key: "get",
            value: function get(key) {
              return this[key];
            }
          }, {
            key: "set",
            value: function set(key, value) {
              this[key] = value;
            }
          }, {
            key: "destroy",
            value: function destroy() {
              this.from = {
                node: null,
                rect: {},
                offset: {}
              };
              this.to = {
                node: null,
                rect: {},
                offset: {}
              };
            }
          }]);

          return Differ;
        }();
        /**
         * 拖拽中的元素
         */


        var Ghost = /*#__PURE__*/function () {
          function Ghost(sortable) {
            _classCallCheck(this, Ghost);

            this.$el = null;
            this.distance = {
              x: 0,
              y: 0
            };
            this.options = sortable.options;
            this.container = sortable.container;
          }

          _createClass(Ghost, [{
            key: "init",
            value: function init(el, rect) {
              var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
              this.$el = el;
              var _this$options = this.options,
                  ghostClass = _this$options.ghostClass,
                  _this$options$ghostSt = _this$options.ghostStyle,
                  ghostStyle = _this$options$ghostSt === void 0 ? {} : _this$options$ghostSt;
              toggleClass(this.$el, ghostClass, true);
              css(this.$el, 'box-sizing', 'border-box');
              css(this.$el, 'margin', 0);
              css(this.$el, 'top', rect.top);
              css(this.$el, 'left', rect.left);
              css(this.$el, 'width', rect.width);
              css(this.$el, 'height', rect.height);
              css(this.$el, 'opacity', '0.8'); // css(this.$el, 'position', IOS ? 'absolute' : 'fixed')

              css(this.$el, 'position', 'fixed');
              css(this.$el, 'zIndex', '100000');
              css(this.$el, 'pointerEvents', 'none');
              this.setStyle(ghostStyle);
              setTransition(this.$el, 'none');
              setTransform(this.$el, 'translate3d(0px, 0px, 0px)');
              if (append) this.container.appendChild(this.$el);
              css(this.$el, 'transform-origin', this.distance.x / parseInt(this.$el.style.width) * 100 + '% ' + this.distance.y / parseInt(this.$el.style.height) * 100 + '%');
            }
          }, {
            key: "setStyle",
            value: function setStyle(style) {
              for (var key in style) {
                css(this.$el, key, style[key]);
              }
            }
          }, {
            key: "rect",
            value: function rect() {
              return getRect(this.$el);
            }
          }, {
            key: "move",
            value: function move(x, y) {
              var smooth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
              if (!this.$el) return;
              setTransition(this.$el, smooth ? "".concat(this.options.ghostAnimation, "ms") : 'none');
              setTransform(this.$el, "translate3d(".concat(x, "px, ").concat(y, "px, 0)"));
            }
          }, {
            key: "destroy",
            value: function destroy(rect) {
              var _this = this;

              if (!this.$el) return;
              var left = parseInt(this.$el.style.left);
              var top = parseInt(this.$el.style.top);
              this.move(rect.left - left, rect.top - top, true);
              var ghostAnimation = this.options.ghostAnimation;
              ghostAnimation ? setTimeout(function () {
                return _this.clear();
              }, ghostAnimation) : this.clear();
            }
          }, {
            key: "clear",
            value: function clear() {
              this.$el && this.$el.remove();
              this.distance = {
                x: 0,
                y: 0
              };
              this.$el = null;
            }
          }]);

          return Ghost;
        }();

        function AutoScroll() {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback) {
              return setTimeout(callback, 17);
            };
          }

          return {
            _autoScroll: throttle(function (_this) {
              // check if is moving now
              if (!(_this.state.sortableDown && _this.state.sortableMove)) return;
              var _this$state$sortableM = _this.state.sortableMove,
                  clientX = _this$state$sortableM.clientX,
                  clientY = _this$state$sortableM.clientY;
              if (clientX === void 0 || clientY === void 0) return;
              if (_this.scrollEl === _this.ownerDocument) ;else {
                var _this$scrollEl = _this.scrollEl,
                    scrollTop = _this$scrollEl.scrollTop,
                    scrollLeft = _this$scrollEl.scrollLeft,
                    scrollHeight = _this$scrollEl.scrollHeight,
                    scrollWidth = _this$scrollEl.scrollWidth;

                var _getRect = getRect(_this.scrollEl),
                    top = _getRect.top,
                    right = _getRect.right,
                    bottom = _getRect.bottom,
                    left = _getRect.left,
                    height = _getRect.height,
                    width = _getRect.width;

                var _this$options = _this.options,
                    scrollStep = _this$options.scrollStep,
                    scrollThreshold = _this$options.scrollThreshold; // check direction

                var totop = scrollTop > 0 && clientY >= top && clientY <= top + scrollThreshold;
                var toleft = scrollLeft > 0 && clientX >= left && clientX <= left + scrollThreshold;
                var toright = scrollLeft + width < scrollWidth && clientX <= right && clientX >= right - scrollThreshold;
                var tobottom = scrollTop + height < scrollHeight && clientY <= bottom && clientY >= bottom - scrollThreshold; // scroll position

                var position = {
                  x: scrollLeft,
                  y: scrollTop
                };

                if (totop) {
                  if (toleft) {
                    // to top-left
                    position.x = scrollLeft - scrollStep;
                  } else if (toright) {
                    // to top-right
                    position.x = scrollLeft + scrollStep;
                  } else {
                    // to top
                    position.x = scrollLeft;
                  }

                  position.y = scrollTop - scrollStep;
                } else if (tobottom) {
                  if (toleft) {
                    // to bottom-left
                    position.x = scrollLeft - scrollStep;
                  } else if (toright) {
                    // to bottom-right
                    position.x = scrollLeft + scrollStep;
                  } else {
                    // to bottom
                    position.x = scrollLeft;
                  }

                  position.y = scrollTop + scrollStep;
                } else if (toleft) {
                  // to left
                  position.x = scrollLeft - scrollStep;
                  position.y = scrollTop;
                } else if (toright) {
                  // to right
                  position.x = scrollLeft + scrollStep;
                  position.y = scrollTop;
                } // if need to scroll


                if (totop || toleft || toright || tobottom) {
                  requestAnimationFrame(function () {
                    _this.scrollEl.scrollTo(position.x, position.y);

                    _this._autoScroll(_this);
                  });
                }
              }
            }, 10)
          };
        }

        function Animation() {
          var animationState = [];

          function getRange(children, drag, drop) {
            var start = children.indexOf(drag);
            var end = children.indexOf(drop);
            return start < end ? {
              start: start,
              end: end
            } : {
              start: end,
              end: start
            };
          }

          return {
            captureAnimationState: function captureAnimationState() {
              var children = _toConsumableArray(Array.from(this.rootEl.children));

              var _getRange = getRange(children, this.dragEl, this.dropEl),
                  start = _getRange.start,
                  end = _getRange.end;

              animationState.length = 0; // reset

              children.slice(start, end + 1).forEach(function (child) {
                animationState.push({
                  target: child,
                  rect: getRect(child)
                });
              });
            },
            animateRange: function animateRange() {
              var _this = this;

              animationState.forEach(function (state) {
                var target = state.target,
                    rect = state.rect;

                _this.animate(target, rect, _this.options.animation);
              });
            },
            animate: function animate(el, preRect) {
              var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;
              var curRect = getRect(el);
              var left = preRect.left - curRect.left;
              var top = preRect.top - curRect.top;
              setTransition(el, 'none');
              setTransform(el, "translate3d(".concat(left, "px, ").concat(top, "px, 0)"));
              el.offsetLeft; // trigger repaint

              setTransition(el, "".concat(animation, "ms"));
              setTransform(el, 'translate3d(0px, 0px, 0px)');
              clearTimeout(el.animated);
              el.animated = setTimeout(function () {
                setTransition(el, '');
                setTransform(el, '');
                el.animated = null;
              }, animation);
            }
          };
        }

        function DNDEvent() {
          return {
            _bindEventListener: function _bindEventListener() {
              this._onDrag = this._onDrag.bind(this);
              this._onMove = this._onMove.bind(this);
              this._onDrop = this._onDrop.bind(this);
              var _this$options = this.options,
                  supportPointer = _this$options.supportPointer,
                  supportTouch = _this$options.supportTouch;

              if (supportPointer) {
                on(this.rootEl, 'pointerdown', this._onDrag);
              } else if (supportTouch) {
                on(this.rootEl, 'touchstart', this._onDrag);
              } else {
                on(this.rootEl, 'mousedown', this._onDrag);
              }
            },
            _clearEvent: function _clearEvent() {
              off(this.rootEl, 'pointerdown', this._onDrag);
              off(this.rootEl, 'touchstart', this._onDrag);
              off(this.rootEl, 'mousedown', this._onDrag);
            },
            _bindMoveEvents: function _bindMoveEvents(touch) {
              if (this.options.supportPointer) {
                on(this.ownerDocument, 'pointermove', this._onMove);
              } else if (touch) {
                on(this.ownerDocument, 'touchmove', this._onMove);
              } else {
                on(this.ownerDocument, 'mousemove', this._onMove);
              }
            },
            _unbindMoveEvents: function _unbindMoveEvents() {
              off(this.ownerDocument, 'pointermove', this._onMove);
              off(this.ownerDocument, 'touchmove', this._onMove);
              off(this.ownerDocument, 'mousemove', this._onMove);
            },
            _unbindDropEvents: function _unbindDropEvents() {
              off(this.ownerDocument, 'pointerup', this._onDrop);
              off(this.ownerDocument, 'pointercancel', this._onDrop);
              off(this.ownerDocument, 'touchend', this._onDrop);
              off(this.ownerDocument, 'touchcancel', this._onDrop);
              off(this.ownerDocument, 'mouseup', this._onDrop);
            },
            _unbindDragEvents: function _unbindDragEvents() {
              if (this.nativeDraggable) {
                off(this.rootEl, 'dragstart', this._onDragStart);
                off(this.rootEl, 'dragover', this._onDragOver);
                off(this.rootEl, 'dragend', this._onDrop);
              }
            }
          };
        }

        var documentExists = typeof document !== 'undefined';
        var supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div');
        /**
         * @class  Sortable
         * @param  {HTMLElement}  el group element
         * @param  {Object}       options
         */

        function Sortable(el, options) {
          if (!(el && el.nodeType && el.nodeType === 1)) {
            throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
          }

          this.rootEl = el; // root element

          this.scrollEl = getParentAutoScrollElement(el, true); // scroll element

          this.options = options = Object.assign({}, options);
          this.ownerDocument = el.ownerDocument;
          var defaults = {
            autoScroll: true,
            // Auto scrolling when dragging to the edge of the container
            scrollStep: 5,
            // The distance to scroll each frame
            scrollThreshold: 15,
            // Autoscroll threshold
            delay: 0,
            // Defines the delay time after which the mouse-selected list cell can start dragging
            delayOnTouchOnly: false,
            // only delay if user is using touch
            disabled: false,
            // Defines whether the sortable object is available or not. When it is true, the sortable object cannot drag and drop sorting and other functions. When it is false, it can be sorted, which is equivalent to a switch.
            animation: 150,
            // Define the timing of the sorting animation
            ghostAnimation: 0,
            // Animation when the ghost element is destroyed
            ghostClass: '',
            // Ghost element class name
            ghostStyle: {},
            // Ghost element style
            chosenClass: '',
            // Chosen element style
            draggable: undefined,
            // String: css selector, Function: (e) => return true
            dragging: undefined,
            // Set the drag element, must be a function and must return an HTMLElement: (e) => return e.target
            onDrag: undefined,
            // The callback function triggered when dragging starts: () => {}
            onMove: undefined,
            // The callback function during drag and drop: (from, to) => {}
            onDrop: undefined,
            // The callback function when the drag is completed: (from, to, changed) => {}
            onChange: undefined,
            // The callback function when dragging an element to change its position: (from, to) => {}
            fallbackOnBody: false,
            forceFallback: false,
            // Ignore HTML5 drag and drop behavior, force callback to proceed
            stopPropagation: false,
            // Prevents further propagation of the current event in the capture and bubbling phases
            supportPointer: 'PointerEvent' in window && !Safari,
            supportTouch: 'ontouchstart' in window
          }; // Set default options

          for (var name in defaults) {
            !(name in this.options) && (this.options[name] = defaults[name]);
          }

          this.container = this.options.fallbackOnBody ? document.body : this.rootEl;
          this.nativeDraggable = this.options.forceFallback ? false : supportDraggable;
          this.move = {
            x: 0,
            y: 0
          };
          this.state = new State(); // Status record during drag and drop

          this.differ = new Differ(); // Record the difference before and after dragging

          this.ghost = new Ghost(this); // Mask element while dragging

          this.dragEl = null; // Drag element

          this.dropEl = null; // Drop element

          this.dragStartTimer = null; // setTimeout timer

          this.autoScrollTimer = null;
          Object.assign(this, DNDEvent(), Animation(), AutoScroll());

          this._bindEventListener();
        }

        Sortable.prototype = {
          constructor: Sortable,

          /**
           * Destroy
           */
          destroy: function destroy() {
            this._clearState();

            this._clearEvent(); // Remove draggable attributes


            Array.prototype.forEach.call(this.rootEl.querySelectorAll('[draggable]'), function (el) {
              el.removeAttribute('draggable');
            });
          },

          /**
           * set value for options by key
           */
          set: function set(key, value) {
            this.options[key] = value;
          },

          /**
           * get value from options by key
           */
          get: function get(key) {
            return this.options[key];
          },
          // -------------------------------- prepare start ----------------------------------
          _onDrag: function _onDrag(
          /** Event|TouchEvent */
          evt) {
            var _this2 = this;

            if (/mousedown|pointerdown/.test(evt.type) && evt.button !== 0 || this.options.disabled) return; // only left button and enabled

            var _getEvent = getEvent(evt),
                touch = _getEvent.touch,
                e = _getEvent.e,
                target = _getEvent.target; // Safari ignores further event handling after mousedown


            if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') return;
            if (target === this.rootEl) return true;
            if (this.options.stopPropagation) evt.stopPropagation();
            var _this$options = this.options,
                draggable = _this$options.draggable,
                dragging = _this$options.dragging;

            if (typeof draggable === 'function') {
              if (!draggable(e)) return true;
            } else if (typeof draggable === 'string') {
              if (!matches(target, draggable)) return true;
            } else if (draggable !== undefined) {
              throw new Error("draggable expected \"function\" or \"string\" but received \"".concat(_typeof(draggable), "\""));
            } // Get the dragged element               


            if (dragging) {
              if (typeof dragging === 'function') this.dragEl = dragging(e);else throw new Error("dragging expected \"function\" or \"string\" but received \"".concat(_typeof(dragging), "\""));
            } else {
              this.dragEl = getElement(this.rootEl, target, true);
            } // No dragging is allowed when there is no dragging element


            if (!this.dragEl || this.dragEl.animated) return true; // solve the problem that the mobile cannot be dragged

            if (touch) this.dragEl.style['touch-action'] = 'none'; // get the position of the dragged element in the list

            var _getElement = getElement(this.rootEl, this.dragEl),
                rect = _getElement.rect,
                offset = _getElement.offset;

            this.move = {
              x: e.clientX,
              y: e.clientY
            };
            this.differ.from = {
              node: this.dragEl,
              rect: rect,
              offset: offset
            };
            this.ghost.distance = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            };
            this.state.sortableDown = e; // sortable state down is active
            // Solve the problem that `dragend` does not take effect when the `dragover` event is not triggered

            on(this.ownerDocument, 'pointerup', this._onDrop);
            on(this.ownerDocument, 'touchend', this._onDrop);
            on(this.ownerDocument, 'mouseup', this._onDrop);
            var _this$options2 = this.options,
                delay = _this$options2.delay,
                delayOnTouchOnly = _this$options2.delayOnTouchOnly;

            if (delay && (!delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
              clearTimeout(this.dragStartTimer); // delay to start

              this.dragStartTimer = setTimeout(function () {
                return _this2._onStart(e, touch);
              }, delay);
            } else {
              this._onStart(e, touch);
            }
          },
          _onStart: function _onStart(
          /** Event|TouchEvent */
          e, touch) {
            if (!this.nativeDraggable || touch) {
              this._bindMoveEvents(touch);

              on(this.ownerDocument, 'pointercancel', this._onDrop);
              on(this.ownerDocument, 'touchcancel', this._onDrop);
            } else {
              // allow HTML5 drag event
              this.dragEl.draggable = true;
              this._onDragStart = this._onDragStart.bind(this);
              this._onDragOver = this._onDragOver.bind(this);
              on(this.rootEl, 'dragstart', this._onDragStart);
            } // clear selection


            try {
              if (document.selection) {
                // Timeout neccessary for IE9
                _nextTick(function () {
                  document.selection.empty();
                });
              } else {
                window.getSelection().removeAllRanges();
              }
            } catch (error) {//
            }
          },
          // -------------------------------- drag event ----------------------------------
          _onDragStart: function _onDragStart(evt) {
            // elements can only be dragged after firefox sets setData
            evt.dataTransfer.setData('te', evt.target.innerText);
            on(this.rootEl, 'dragover', this._onDragOver);
            on(this.rootEl, 'dragend', this._onDrop);
          },
          _onDragOver: function _onDragOver(evt) {
            if (!this.state.sortableDown) return;
            var stopPropagation = this.options.stopPropagation;
            stopPropagation && evt.stopPropagation && evt.stopPropagation(); // prevent events from bubbling

            evt.preventDefault !== void 0 && evt.cancelable && evt.preventDefault(); // prevent scrolling

            var clientX = evt.clientX,
                clientY = evt.clientY;
            var distanceX = clientX - this.move.x;
            var distanceY = clientY - this.move.y;

            if (clientX !== void 0 && Math.abs(distanceX) <= 0 && clientY !== void 0 && Math.abs(distanceY) <= 0) {
              return;
            } // truly started


            this._onStarted(evt, evt);

            if (evt.target === this.rootEl) return;

            this._onChange(this, evt.target, evt, evt);
          },
          // -------------------------------- on move ----------------------------------
          _onMove: function _onMove(
          /** Event|TouchEvent */
          evt) {
            var _this3 = this;

            if (!this.state.sortableDown) return;

            var _getEvent2 = getEvent(evt),
                e = _getEvent2.e,
                target = _getEvent2.target;

            var clientX = e.clientX,
                clientY = e.clientY;
            var distanceX = clientX - this.move.x;
            var distanceY = clientY - this.move.y;

            if (clientX !== void 0 && Math.abs(distanceX) <= 0 && clientY !== void 0 && Math.abs(distanceY) <= 0) {
              return;
            }

            var stopPropagation = this.options.stopPropagation;
            stopPropagation && evt.stopPropagation && evt.stopPropagation(); // prevent events from bubbling

            evt.preventDefault !== void 0 && evt.cancelable && evt.preventDefault(); // prevent scrolling

            this._onStarted(e, evt);

            this.ghost.move(distanceX, distanceY); // onMove callback

            var onMove = this.options.onMove;
            if (onMove && typeof onMove === 'function') onMove(this.differ.from, this.ghost.$el, e, evt); // boundary value judgment

            if (clientX < 0 || clientY < 0) return;

            var _getRect = getRect(this.rootEl),
                top = _getRect.top,
                right = _getRect.right,
                bottom = _getRect.bottom,
                left = _getRect.left;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) return; // check if element will exchange

            this._onChange(this, target, e, evt); // auto scroll


            this.autoScrollTimer && clearTimeout(this.autoScrollTimer);

            if (this.options.autoScroll) {
              this.autoScrollTimer = setTimeout(function () {
                return _this3._autoScroll(_this3);
              }, 0);
            }
          },
          _onStarted: function _onStarted(e,
          /** originalEvent */
          evt) {
            this.state.sortableMove = e; // sortable state move is active

            if (!this.ghost.$el) {
              // onDrag callback
              var onDrag = this.options.onDrag;
              if (onDrag && typeof onDrag === 'function') onDrag(this.dragEl, e, evt); // Init in the move event to prevent conflict with the click event

              var rect = this.differ.from.rect;
              var ghostEl = this.dragEl.cloneNode(true);
              this.ghost.init(ghostEl, rect, !this.nativeDraggable); // add class for drag element

              toggleClass(this.dragEl, this.options.chosenClass, true);
              this.dragEl.style['will-change'] = 'transform';
              if (Safari) css(document.body, 'user-select', 'none');
              if (this.nativeDraggable) this._unbindDropEvents();
            }
          },
          _onChange: debounce(function (_this, target, e, evt) {
            var _getElement2 = getElement(_this.rootEl, target),
                el = _getElement2.el,
                rect = _getElement2.rect,
                offset = _getElement2.offset;

            if (!el || el && el.animated) return;
            _this.dropEl = el;
            var clientX = e.clientX,
                clientY = e.clientY;
            var left = rect.left,
                right = rect.right,
                top = rect.top,
                bottom = rect.bottom;

            if (clientX > left && clientX < right && clientY > top && clientY < bottom) {
              // swap when the elements before and after the drag are inconsistent
              if (el !== _this.dragEl) {
                _this.differ.to = {
                  node: _this.dropEl,
                  rect: rect,
                  offset: offset
                };

                _this.captureAnimationState();

                var onChange = _this.options.onChange;

                var _offset = getOffset(_this.dragEl); // onChange callback


                if (onChange && typeof onChange === 'function') onChange(_this.differ.from, _this.differ.to, e, evt); // the top value is compared first, and the left is compared if the top value is the same

                if (_offset.top < offset.top || _offset.left < offset.left) {
                  _this.rootEl.insertBefore(_this.dragEl, el.nextElementSibling);
                } else {
                  _this.rootEl.insertBefore(_this.dragEl, el);
                }

                _this.animateRange();
              }
            }
          }, 5),
          // -------------------------------- on drop ----------------------------------
          _onDrop: function _onDrop(
          /** Event|TouchEvent */
          evt) {
            this._unbindDragEvents();

            this._unbindMoveEvents();

            this._unbindDropEvents();

            this.dragStartTimer && clearTimeout(this.dragStartTimer);
            var stopPropagation = this.options.stopPropagation;
            stopPropagation && evt.stopPropagation();
            evt.preventDefault && evt.preventDefault();

            var _getEvent3 = getEvent(evt),
                touch = _getEvent3.touch; // clear style and class


            toggleClass(this.dragEl, this.options.chosenClass, false);
            if (this.nativeDraggable) this.dragEl.draggable = false;
            if (touch) this.dragEl.style['touch-action'] = '';
            this.dragEl.style['will-change'] = '';

            if (this.state.sortableDown && this.state.sortableMove) {
              // re-acquire the offset and rect values of the dragged element as the value after the drag is completed
              this.differ.to.offset = getOffset(this.dragEl);
              this.differ.to.rect = getRect(this.dragEl);
              var _this$differ = this.differ,
                  from = _this$differ.from,
                  to = _this$differ.to; // compare whether the element is swapped by offset

              var changed = from.offset.top !== to.offset.top || from.offset.left !== to.offset.left; // onDrop callback

              var onDrop = this.options.onDrop;
              if (onDrop && typeof onDrop === 'function') onDrop(changed, evt);
            }

            if (Safari) css(document.body, 'user-select', '');
            this.ghost.destroy(this.differ.to.rect);
            this.state = new State();
          },
          // -------------------------------- clear ----------------------------------
          _clearState: function _clearState() {
            this.state = new State();
            this.differ.destroy();
            this.dragEl = null;
            this.dropEl = null;
          }
        };
        Sortable.prototype.utils = {
          getRect: getRect,
          getOffset: getOffset,
          debounce: debounce,
          throttle: throttle,
          getParentAutoScrollElement: getParentAutoScrollElement
        };
        return Sortable;
      });
    })(sortable);

    var SortableDnd = sortable.exports;

    // drag state
    class DragState {
        from;
        to;
        constructor() {
            this.from = { key: undefined, item: undefined, index: -1 };
            this.to = { key: undefined, item: undefined, index: -1 };
        }
    }
    class Sortable {
        onDrag;
        onDrop;
        dragState;
        dragElement;
        drag;
        options;
        dataSource;
        cloneList;
        rangeIsChanged;
        constructor(options, onDrag, onDrop) {
            this.options = options;
            this.onDrag = onDrag;
            this.onDrop = onDrop;
            this.dataSource = options.dataSource;
            this.cloneList = new Array();
            this.dragState = new DragState;
            this.rangeIsChanged = false;
            if (!options.scrollEl)
                return;
            this.init();
        }
        set(key, value) {
            this[key] = value;
            // When the list data changes when dragging, need to execute onDrag function
            if (key === 'dataSource' && this.dragElement)
                this.dragStart(this.dragElement, false);
        }
        setOption(key, value) {
            this.options[key] = value;
            this.drag.set(key, value);
        }
        init() {
            const { disabled, draggable, ghostClass, ghostStyle, chosenClass, animation, autoScroll, scrollStep, scrollThreshold } = this.options;
            this.drag = new SortableDnd(this.options.scrollEl, {
                disabled,
                draggable,
                ghostClass,
                ghostStyle,
                chosenClass,
                animation,
                autoScroll,
                scrollStep,
                scrollThreshold,
                onChange: (from, to) => this.onChange(from, to),
                onDrag: (dragEl) => this.dragStart(dragEl),
                onDrop: (changed) => this.dragEnd(changed)
            });
        }
        dragStart(dragEl, callback = true) {
            this.dragElement = dragEl;
            this.cloneList = [...this.dataSource];
            const key = dragEl.getAttribute('data-key');
            this.dataSource.forEach((item, index) => {
                if (this.options.getKey(item) == key)
                    this.dragState.from = { item, index, key };
            });
            if (callback) {
                this.rangeIsChanged = false;
                this.onDrag(this.dragState.from, dragEl);
            }
            else {
                this.rangeIsChanged = true;
            }
        }
        onChange(_old_, _new_) {
            const oldKey = this.dragState.from.key;
            const newKey = _new_.node.getAttribute('data-key');
            const from = { item: null, index: -1 };
            const to = { item: null, index: -1 };
            this.cloneList.forEach((el, index) => {
                const key = this.options.getKey(el);
                if (key == oldKey)
                    Object.assign(from, { item: el, index });
                if (key == newKey)
                    Object.assign(to, { item: el, index });
            });
            this.cloneList.splice(from.index, 1);
            this.cloneList.splice(to.index, 0, from.item);
        }
        dragEnd(changed) {
            const { getKey } = this.options;
            if (this.rangeIsChanged && this.dragElement)
                this.dragElement.remove();
            const { from } = this.dragState;
            this.cloneList.forEach((el, index) => {
                if (getKey(el) == from.key)
                    this.dragState.to = {
                        index,
                        key: getKey(el),
                        item: this.dataSource[index]
                    };
            });
            this.onDrop(this.cloneList, from, this.dragState.to, changed);
            this.dataSource = [...this.cloneList];
            this.clear();
        }
        clear() {
            this.dragElement = null;
            this.rangeIsChanged = false;
            this.dragState = new DragState;
        }
        destroy() {
            this.drag && this.drag.destroy();
            this.drag = null;
        }
    }

    // scroll range
    class Range {
        start;
        end;
        front;
        behind;
        constructor(options = {}) {
            this.start = options.start || 0;
            this.end = options.end || 0;
            this.front = options.front || 0;
            this.behind = options.behind || 0;
        }
    }
    class CalcSize {
        average;
        total;
        fixed;
        header;
        footer;
        constructor() {
            this.average = 0; // 计算首次加载每一项的评价高度
            this.total = 0; // 首次加载的总高度
            this.fixed = 0; // 记录固定高度值
            this.header = 0; // 顶部插槽高度
            this.footer = 0; // 底部插槽高度
        }
    }
    const CACLTYPE = {
        INIT: 'INIT',
        FIXED: 'FIXED',
        DYNAMIC: 'DYNAMIC'
    };
    const DIRECTION = {
        FRONT: 'FRONT',
        BEHIND: 'BEHIND'
    };
    class Virtual {
        options;
        callback;
        sizes; // 用于存储列表项的高度
        isHorizontal; // 是否为横向滚动
        calcIndex; // 记录上次计算的index
        calcType; // 记录列表项高度是动态还是静态
        calcSize;
        range;
        direction; // 滚动方向
        offset; // 记录滚动距离
        constructor(options, callback) {
            this.options = { ...options };
            this.callback = callback;
            this.sizes = new Map();
            this.isHorizontal = options.isHorizontal;
            this.calcIndex = 0;
            this.calcType = CACLTYPE.INIT;
            this.calcSize = new CalcSize;
            this.direction = '';
            this.offset = 0;
            this.range = Object.create(null);
            if (options)
                this.checkIfUpdate(0, options.keeps - 1);
        }
        // --------------------------- update ------------------------------
        updateUniqueKeys(value) {
            this.options.uniqueKeys = value;
        }
        // 更新 sizes，删除不在当前列表中的数据
        updateSizes(uniqueKeys) {
            this.sizes.forEach((v, k) => {
                if (!uniqueKeys.includes(k))
                    this.sizes.delete(k);
            });
        }
        updateRange() {
            // check if need to update until loaded enough list item
            const start = Math.max(this.range.start, 0);
            const length = Math.min(this.options.keeps, this.options.uniqueKeys.length);
            if (this.sizes.size >= length - 2) {
                this.handleUpdate(start, this.getEndByStart(start));
            }
            else {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(() => this.updateRange());
                }
                else {
                    setTimeout(() => this.updateRange(), 3);
                }
            }
        }
        // --------------------------- scroll ------------------------------
        // 滚动事件
        handleScroll(offset) {
            this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
            this.offset = offset;
            const scrolls = this.getScrollItems(offset);
            if (this.isFront()) {
                this.handleScrollFront(scrolls);
            }
            else if (this.isBehind()) {
                this.handleScrollBehind(scrolls);
            }
        }
        isFront() {
            return this.direction === DIRECTION.FRONT;
        }
        isBehind() {
            return this.direction === DIRECTION.BEHIND;
        }
        isFixed() {
            return this.calcType === CACLTYPE.FIXED;
        }
        getScrollItems(offset) {
            const { fixed, header } = this.calcSize;
            // 减去顶部插槽高度
            if (header)
                offset -= header;
            if (offset <= 0)
                return 0;
            // 固定高度
            if (this.isFixed())
                return Math.floor(offset / fixed);
            // 非固定高度使用二分查找
            let low = 0, high = this.options.uniqueKeys.length;
            let middle = 0, middleOffset = 0;
            while (low <= high) {
                middle = low + Math.floor((high - low) / 2);
                middleOffset = this.getOffsetByIndex(middle);
                if (middleOffset === offset)
                    return middle;
                else if (middleOffset < offset)
                    low = middle + 1;
                else if (middleOffset > offset)
                    high = middle - 1;
            }
            return low > 0 ? --low : 0;
        }
        handleScrollFront(scrolls) {
            if (scrolls > this.range.start)
                return;
            const start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0);
            this.checkIfUpdate(start, this.getEndByStart(start));
        }
        handleScrollBehind(scrolls) {
            if (scrolls < this.range.start + Math.round(this.options.keeps / 3))
                return;
            this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
        }
        checkIfUpdate(start, end) {
            const { uniqueKeys, keeps } = this.options;
            if (uniqueKeys.length <= keeps) {
                start = 0;
                end = uniqueKeys.length - 1;
            }
            else if (end - start < keeps - 1) {
                start = end - keeps + 1;
            }
            if (this.range.start !== start)
                this.handleUpdate(start, end);
        }
        handleUpdate(start, end) {
            this.range.start = start;
            this.range.end = end;
            this.range.front = this.getFrontOffset();
            this.range.behind = this.getBehindOffset();
            this.callback({ ...this.range });
        }
        getFrontOffset() {
            if (this.isFixed()) {
                return this.calcSize.fixed * this.range.start;
            }
            else {
                return this.getOffsetByIndex(this.range.start);
            }
        }
        getBehindOffset() {
            const last = this.getLastIndex();
            if (this.isFixed()) {
                return (last - this.range.end) * this.calcSize.fixed;
            }
            if (this.calcIndex === last) {
                return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end);
            }
            return (last - this.range.end) * this.getItemSize();
        }
        getOffsetByIndex(index) {
            if (!index)
                return 0;
            let offset = 0;
            for (let i = 0; i < index; i++) {
                const size = this.sizes.get(this.options.uniqueKeys[i]);
                offset = offset + (typeof size === 'number' ? size : this.getItemSize());
            }
            this.calcIndex = Math.max(this.calcIndex, index - 1);
            this.calcIndex = Math.min(this.calcIndex, this.getLastIndex());
            return offset;
        }
        getEndByStart(start) {
            return Math.min(start + this.options.keeps - 1, this.getLastIndex());
        }
        getLastIndex() {
            const { uniqueKeys, keeps } = this.options;
            return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
        }
        // --------------------------- size ------------------------------
        // 获取列表项的高度
        getItemSize() {
            return this.isFixed() ? this.calcSize.fixed : (this.calcSize.average || this.options.size);
        }
        // 列表项高度变化
        handleItemSizeChange(id, size) {
            this.sizes.set(id, size);
            // 'INIT' 状态表示每一项的高度都相同
            if (this.calcType === CACLTYPE.INIT) {
                this.calcType = CACLTYPE.FIXED; // 固定高度
                this.calcSize.fixed = size;
            }
            else if (this.isFixed() && this.calcSize.fixed !== size) {
                // 如果当前为 'FIXED' 状态并且 size 与固定高度不同，表示当前高度不固定，fixed值也就不需要了
                this.calcType = CACLTYPE.DYNAMIC;
                this.calcSize.fixed = 0;
            }
            // 非固定高度的情况下，计算平均高度与总高度
            if (this.calcType !== CACLTYPE.FIXED) {
                this.calcSize.total = [...this.sizes.values()].reduce((t, i) => t + i, 0);
                this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
            }
        }
        // header 插槽高度变化
        handleHeaderSizeChange(size) {
            this.calcSize.header = size;
        }
        // footer 插槽高度变化
        handleFooterSizeChange(size) {
            this.calcSize.footer = size;
        }
    }

    const useObserver = (props, aRef, emit) => {
        let observer = null;
        const sizeKey = vue.computed(() => props.isHorizontal ? 'offsetWidth' : 'offsetHeight');
        const getCurrentSize = () => {
            return aRef?.value ? aRef.value[sizeKey.value] : 0;
        };
        const onSizeChange = () => {
            const { event, dataKey } = props;
            emit(event, dataKey, getCurrentSize());
        };
        vue.onMounted(() => {
            if (typeof ResizeObserver !== 'undefined') {
                observer = new ResizeObserver(() => {
                    onSizeChange();
                });
                aRef?.value && observer.observe(aRef.value);
            }
        });
        vue.onUpdated(() => { onSizeChange(); });
        vue.onUnmounted(() => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
        });
    };

    const SlotsProps = {
        tag: {
            type: String,
            default: 'div'
        },
        event: {
            type: String
        },
        dataKey: {
            type: [String, Number]
        },
        isHorizontal: {
            type: Boolean
        }
    };
    const Items = vue.defineComponent({
        name: 'virtual-draglist-items',
        props: SlotsProps,
        setup(props, { emit, slots }) {
            const itemRef = vue.ref(null);
            useObserver(props, itemRef, emit);
            return () => {
                const { tag: Tag, dataKey } = props;
                return vue.h(Tag, {
                    ref: itemRef,
                    key: dataKey,
                    attrs: {
                        'data-key': dataKey
                    }
                }, slots.default?.());
            };
        }
    });
    const Slots = vue.defineComponent({
        name: 'virtual-draglist-slots',
        props: SlotsProps,
        setup(props, { emit, slots }) {
            const slotRef = vue.ref(null);
            useObserver(props, slotRef, emit);
            return () => {
                const { tag: Tag, dataKey } = props;
                return vue.h(Tag, {
                    ref: slotRef,
                    key: dataKey,
                    attrs: {
                        'data-key': dataKey
                    }
                }, slots.default?.());
            };
        }
    });

    const VirtualDragList = vue.defineComponent({
        props: {
            dataSource: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            dataKey: {
                type: String,
                required: true
            },
            direction: {
                type: String,
                default: 'vertical'
            },
            keeps: {
                type: Number,
                default: 30
            },
            size: {
                type: Number
            },
            delay: {
                type: Number,
                default: 10
            },
            rootTag: {
                type: String,
                default: 'div'
            },
            wrapTag: {
                type: String,
                default: 'div'
            },
            wrapClass: {
                type: String,
                default: ''
            },
            wrapStyle: {
                type: Object
            },
            headerTag: {
                type: String,
                default: 'div'
            },
            footerTag: {
                type: String,
                default: 'div'
            },
            itemTag: {
                type: String,
                default: 'div'
            },
            itemStyle: {
                type: Object
            },
            itemClass: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            draggable: {
                type: [Function, String]
            },
            dragging: {
                type: Function
            },
            ghostClass: {
                type: String,
                default: ''
            },
            ghostStyle: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            chosenClass: {
                type: String,
                default: ''
            },
            animation: {
                type: Number,
                default: 150
            },
            autoScroll: {
                type: Boolean,
                default: true
            },
            scrollStep: {
                type: Number,
                default: 5
            },
            scrollThreshold: {
                type: Number,
                default: 15
            },
            keepOffset: {
                type: Boolean,
                default: false
            }
        },
        emits: ['top', 'bottom', 'ondragstart', 'ondragend'],
        setup(props, { emit, slots }) {
            const range = vue.ref(new Range);
            const dragState = vue.ref(new DragState);
            const rootRef = vue.ref(null);
            const groupRef = vue.ref(null);
            const lastRef = vue.ref(null);
            const viewlist = vue.ref([]);
            const uniqueKeys = vue.ref([]);
            let lastItem = null;
            // --------------------------- usefull values ------------------------------
            const isHorizontal = props.direction !== 'vertical';
            const scrollSizeKey = isHorizontal ? 'scrollWidth' : 'scrollHeight';
            const scrollDirectionKey = isHorizontal ? 'scrollLeft' : 'scrollTop';
            const offsetSizeKey = isHorizontal ? 'offsetLeft' : 'offsetTop';
            const clientSizeKey = isHorizontal ? 'clientWidth' : 'clientHeight';
            const sortable = vue.ref(null);
            let virtual;
            /**
             * Get the current scroll height
             */
            function getOffset() {
                return rootRef.value ? Math.ceil(rootRef.value[scrollDirectionKey]) : 0;
            }
            /**
             * Scroll to bottom of list
             */
            function scrollToBottom() {
                if (lastRef.value) {
                    const bottom = lastRef.value[offsetSizeKey];
                    scrollToOffset(bottom);
                    // The first scroll height may change, if the bottom is not reached, execute the scroll method again
                    setTimeout(() => {
                        if (!rootRef.value)
                            return;
                        const offset = getOffset();
                        const clientSize = Math.ceil(rootRef.value[clientSizeKey]);
                        const scrollSize = Math.ceil(rootRef.value[scrollSizeKey]);
                        if (offset + clientSize < scrollSize)
                            scrollToBottom();
                    }, 5);
                }
            }
            /**
             * Scroll to the specified index position
             */
            function scrollToIndex(index) {
                if (index >= viewlist.value.length - 1) {
                    scrollToBottom();
                }
                else {
                    const indexOffset = virtual.getOffsetByIndex(index);
                    if (indexOffset === undefined)
                        return;
                    scrollToOffset(indexOffset);
                    setTimeout(() => {
                        const offset = getOffset();
                        const indexOffset = virtual.getOffsetByIndex(index);
                        if (offset !== indexOffset)
                            scrollToIndex(index);
                    }, 5);
                }
            }
            /**
             * Scroll to the specified offset
             */
            function scrollToOffset(offset) {
                if (rootRef.value)
                    rootRef.value[scrollDirectionKey] = offset;
            }
            // --------------------------- private mehtods ------------------------------
            const init = (list) => {
                viewlist.value = list;
                updateUniqueKeys();
                if (virtual) {
                    virtual.updateUniqueKeys(uniqueKeys.value);
                    virtual.updateSizes(uniqueKeys.value);
                    virtual.updateRange();
                }
                if (sortable.value)
                    sortable.value.set('list', [...list]);
                else
                    vue.nextTick(() => initSortable());
                // if auto scroll to the last offset
                if (lastItem && props.keepOffset) {
                    const index = getItemIndex(lastItem);
                    scrollToIndex(index);
                    lastItem = null;
                }
            };
            const updateUniqueKeys = () => {
                uniqueKeys.value = viewlist.value.map(item => getDataKey(item));
            };
            const initVirtual = () => {
                virtual = new Virtual({
                    size: props.size,
                    keeps: props.keeps,
                    uniqueKeys: uniqueKeys.value,
                    isHorizontal: isHorizontal
                }, (newRange) => {
                    if (dragState.value.to.key === undefined)
                        range.value = newRange;
                    const { start, end } = range.value;
                    const { index } = dragState.value.from;
                    if (index > -1 && !(index >= start && index <= end)) {
                        if (sortable.value)
                            sortable.value.rangeIsChanged = true;
                    }
                });
            };
            // --------------------------- sortable ------------------------------
            const initSortable = () => {
                sortable.value = new Sortable({
                    scrollEl: groupRef.value,
                    dataSource: viewlist.value,
                    getKey: getDataKey,
                    animation: props.animation,
                    autoScroll: props.autoScroll,
                    scrollStep: props.scrollStep,
                    scrollThreshold: props.scrollThreshold,
                    disabled: props.disabled,
                    draggable: props.draggable,
                    ghostClass: props.ghostClass,
                    ghostStyle: props.ghostStyle,
                    chosenClass: props.chosenClass,
                }, (from, node) => {
                    // on drag
                    dragState.value.from = from;
                    emit('ondragstart', viewlist.value, from, node);
                }, (list, from, to, changed) => {
                    // on drop
                    dragState.value.to = to;
                    emit('ondragend', list, from, to, changed);
                    if (changed) {
                        if (sortable.value.rangeIsChanged && virtual.direction && range.value.start > 0) {
                            const index = list.indexOf(viewlist.value[range.value.start]);
                            if (index > -1) {
                                range.value.start = index;
                                range.value.end = index + props.keeps - 1;
                            }
                        }
                        // list change
                        viewlist.value = [...list];
                        updateUniqueKeys();
                        virtual.updateUniqueKeys(uniqueKeys.value);
                    }
                    clearDragState();
                });
            };
            const clearDragState = throttle(() => {
                dragState.value = new DragState;
            }, props.delay + 17);
            // --------------------------- handle scroll ------------------------------
            const handleScroll = debounce(() => {
                // The scroll event is triggered when the mouseup event occurs, which is handled here to prevent the page from scrolling due to range changes.
                if (dragState.value.to.key !== undefined) {
                    clearDragState();
                    return;
                }
                if (!rootRef.value)
                    return;
                const offset = getOffset();
                const clientSize = Math.ceil(rootRef.value[clientSizeKey]);
                const scrollSize = Math.ceil(rootRef.value[scrollSizeKey]);
                if (!scrollSize || offset < 0 || (offset + clientSize > scrollSize + 1))
                    return;
                virtual.handleScroll(offset);
                if (virtual.isFront()) {
                    if (!!viewlist.value.length && offset <= 0)
                        handleToTop(this);
                }
                else if (virtual.isBehind()) {
                    if (clientSize + offset >= scrollSize)
                        handleToBottom(this);
                }
            }, props.delay);
            const handleToTop = debounce(() => {
                emit('top');
                lastItem = viewlist.value[0];
            });
            const handleToBottom = debounce(() => {
                emit('bottom');
            });
            // --------------------------- handle size change ------------------------------
            const onItemResized = (id, size) => {
                virtual.handleItemSizeChange(id, size);
            };
            const onHeaderResized = (id, size) => {
                virtual.handleHeaderSizeChange(size);
            };
            const onFooterResized = (id, size) => {
                virtual.handleFooterSizeChange(size);
            };
            // --------------------------- methods ------------------------------
            const getDataKey = (item) => {
                const dataKey = props.dataKey;
                return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce((o, k) => (o || {})[k], item);
            };
            const getItemIndex = (item) => {
                return viewlist.value.findIndex(el => {
                    return getDataKey(item) == getDataKey(el);
                });
            };
            const getItemStyle = (dataKey) => {
                if (!sortable.value)
                    return {};
                const { key } = dragState.value.from;
                if (sortable.value.rangeIsChanged && dataKey == key)
                    return { display: 'none' };
                return {};
            };
            // --------------------------- methods ------------------------------
            vue.watch(() => props.dataSource, (newVal) => {
                init(newVal);
            }, {
                deep: true,
                immediate: true
            });
            vue.watch(() => props.disabled, (newVal) => {
                if (sortable.value)
                    sortable.value.set('disabled', newVal);
            }, {
                immediate: true
            });
            // init range
            vue.onBeforeMount(() => {
                initVirtual();
            });
            // set back offset when awake from keep-alive
            vue.onActivated(() => {
                scrollToOffset(virtual.offset);
            });
            vue.onUnmounted(() => {
                sortable.value && sortable.value.destroy();
                sortable.value = null;
            });
            // --------------------------- render ------------------------------
            return () => {
                const { rootTag: RootTag, wrapTag: WrapTag, itemTag: ItemTag, headerTag: HeaderTag, footerTag: FooterTag, } = props;
                const { start, end, front, behind } = range.value;
                const wrapStyle = { ...props.wrapStyle, padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px` };
                return vue.h(RootTag, {
                    ref: rootRef,
                    style: { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
                    on: { '&scroll': handleScroll }
                }, [
                    // header
                    slots.header ? vue.h(Slots, {
                        props: {
                            tag: HeaderTag,
                            dataKey: 'header',
                            event: 'onHeaderResized'
                        },
                        on: { onHeaderResized }
                    }, slots.header) : null,
                    // list
                    vue.h(WrapTag, {
                        ref: groupRef,
                        attrs: { role: 'group' },
                        class: props.wrapClass,
                        style: wrapStyle
                    }, viewlist.value.slice(start, end + 1).map(item => {
                        const index = getItemIndex(item);
                        const dataKey = getDataKey(item);
                        const itemStyle = { ...props.itemStyle, ...getItemStyle(dataKey) };
                        const itemProps = { isHorizontal, dataKey, tag: ItemTag, event: 'onItemResized' };
                        return slots.item ?
                            vue.h(Items, {
                                key: dataKey,
                                props: itemProps,
                                class: props.itemClass,
                                style: itemStyle,
                                on: { onItemResized }
                            }, slots.item({ record: item, index, dataKey }))
                            :
                                vue.h(ItemTag, {
                                    key: dataKey,
                                    attrs: { 'data-key': dataKey },
                                    class: props.itemClass,
                                    style: { ...itemStyle, height: `${props.size}px` }
                                }, dataKey);
                    })),
                    // footer
                    slots.footer ? vue.h(Slots, {
                        props: {
                            tag: FooterTag,
                            dataKey: 'footer',
                            event: 'onFooterResized'
                        },
                        on: { onFooterResized }
                    }, slots.footer) : null,
                    // last el
                    vue.h('div', {
                        ref: lastRef,
                        style: {
                            width: isHorizontal ? '0px' : '100%',
                            height: isHorizontal ? '100%' : '0px'
                        }
                    })
                ]);
            };
        }
    });

    return VirtualDragList;

}));
