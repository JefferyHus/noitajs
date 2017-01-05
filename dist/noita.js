/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	(function ($) {

		function debug(name, message, obj) {
			if (window.console && window.console.log) {
				try {
					throw new Error(name);
				} catch (e) {
					obj = e;
				}

				if (!obj) return;

				var aux = obj.stack.split("\n");
				aux.splice(0, 2);
				aux = aux.join('\n"');
				throw message + ' \n' + aux;
			}
		}

		function start(object, settings /* .. [arguments] .. callback */) {
			callback = undefined;
			// call init function first
			settings.init.call(this, $(object));
			// check if the callback exists
			fnargs = Array.prototype.slice.call(arguments, 2);
			if (fnargs.length && typeof fnargs[fnargs.length - 1] === 'function') callback = fnargs.pop();
			// init the promise
			anipromise = new Promise(function (resolve, reject) {
				$(object).animate(settings.properties, {
					duration: settings.duration,
					easing: settings.function,
					done: function done() {
						if (settings.repeat) {
							window.setTimeout(function () {
								resolve();
							}, settings.repeatDelay);
						}
					}
				}).promise().done(function () {
					// call the callback if it exists
					if (callback !== undefined && typeof callback === "function") {
						callback(settings, null);
					} else {
						settings.complete.call(this, settings, null);
					}
				});
			});
			// just in case of repitition
			anipromise.then(
			// fulfill the promise
			function () {
				$(object).css(settings.repeatProps).promise().done(function () {
					start(object, settings, callback);
				});
			}).catch(function (reason) {
				debug('rejected', reason, this);
			});
		}

		$.fn.noita = function (options /* .. [arguments] .. callback */) {

			var settings = {
				repeat: false,
				repeatDelay: 300,
				repeatProps: {},
				function: 'swing',
				duration: 300,
				timing: 'ms',
				properties: {},
				init: function init(elem) {},
				complete: function complete(settings, error) {}
			};

			// check if a callback isset or not
			args = Array.prototype.slice.call(arguments, 1);
			if (args.length && typeof args[args.length - 1] === "function") var callback = args.pop();

			return this.each(function (index, el) {
				var thisel = this;
				// if options are set then merge them
				if (options) {
					$.extend(true, settings, options);
				}
				// calculate the duration
				switch (settings.timing) {
					case 'ms':
						break;
					case 's':
						settings.duration = Math.floor(settings.duration * 1000);
						break;
					case 'm':
						settings.duration = Math.floor(settings.duration * 1000 * 60);
						break;
					default:
						debug('timing', 'the timing value does not exist, please make sure it is "ms", "s" or "m".', settings.timing);
				}
				// start the animation
				start(thisel, settings, fn = callback ? callback : false);
			});
		};
	})(jQuery);

/***/ }
/******/ ]);