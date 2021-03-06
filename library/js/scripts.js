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
import logoDownlaod from './modules/logoDownload';

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
			x = w .innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight || e.clientHeight || g.clientHeight;

	return {
		width:x,
		height:y
	};
}
// setting the viewport width
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
	  jQuery('.comment img[data-gravatar]').each(function(){
	    jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
	  });
	}
} // end function
/*eslint-enable */

/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function() {

  /*
   * Let's fire off the gravatar function
   * You can remove this if you don't need it
  */
	loadGravatars();

	logoDownlaod.init(jQuery('#logo'));


}); /* end of as page load scripts */
