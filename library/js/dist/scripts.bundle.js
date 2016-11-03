/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _logoDownload = __webpack_require__(1);
	
	var _logoDownload2 = _interopRequireDefault(_logoDownload);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * Get Viewport Dimensions
	 * returns object with viewport dimensions to match css in width and height properties
	 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
	*/
	/*eslint-disable */
	function updateViewportDimensions() {
	  var w = window,
	      d = document,
	      e = d.documentElement,
	      g = d.getElementsByTagName('body')[0],
	      x = w.innerWidth || e.clientWidth || g.clientWidth,
	      y = w.innerHeight || e.clientHeight || g.clientHeight;
	
	  return {
	    width: x,
	    height: y
	  };
	}
	// setting the viewport width
	/*
	 * Bones Scripts File
	 * Author: Eddie Machado
	 *
	 * This file should contain any js scripts you want to add to the site.
	 * Instead of calling it in the header or throwing it inside wp_head()
	 * this file will be called automatically in the footer so as not to
	 * slow the page load.
	 *
	 * There are a lot of example functions and tools in here. If you don't
	 * need any of it, just remove it. They are meant to be helpers and are
	 * not required. It's your world baby, you can do whatever you want.
	*/
	var viewport = updateViewportDimensions();
	/*eslint-enable */
	
	/*
	 * We're going to swap out the gravatars.
	 * In the functions.php file, you can see we're not loading the gravatar
	 * images on mobile to save bandwidth. Once we hit an acceptable viewport
	 * then we can swap out those images since they are located in a data attribute.
	*/
	
	/*eslint-disable */
	function loadGravatars() {
	  // set the viewport using the function above
	  viewport = updateViewportDimensions();
	  // if the viewport is tablet or larger, we load in the gravatars
	  if (viewport.width >= 768) {
	    jQuery('.comment img[data-gravatar]').each(function () {
	      jQuery(this).attr('src', jQuery(this).attr('data-gravatar'));
	    });
	  }
	} // end function
	/*eslint-enable */
	
	/*
	 * Put all your regular jQuery in here.
	*/
	jQuery(document).ready(function () {
	
	  /*
	   * Let's fire off the gravatar function
	   * You can remove this if you don't need it
	  */
	  loadGravatars();
	
	  _logoDownload2.default.init(jQuery('#logo'));
	}); /* end of as page load scripts */

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var $ = jQuery;
	
	var logoDownlaod = {
	  init: function init($element) {
	    this.$el = $element;
	    this.attachEvent();
	  },
	  attachEvent: function attachEvent() {
	    this.$el.contextmenu($.proxy(function (event) {
	      if (event.which === 3) {
	        event.preventDefault();
	        this.showLayer();
	      }
	    }, this));
	  },
	  showLayer: function showLayer() {
	    // visualizzo il layer
	    $('#downloadLogo').openModal();
	  }
	};
	
	exports.default = logoDownlaod;

/***/ }
/******/ ]);
//# sourceMappingURL=scripts.bundle.js.map