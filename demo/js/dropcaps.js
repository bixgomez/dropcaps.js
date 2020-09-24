let rowSpan = 3

$( document ).ready(function() {
  // A console log for testing.
  // console.log('Document ready!')
  let firstPar = getFirstPar();
  let firstLetter = getFirstLetter(firstPar)
  chopFirstLetter(firstPar)
  let dropCapObject = createDropCapObject(firstPar, firstLetter)
  maintainDropCap(firstPar, dropCapObject, rowSpan)
})

var debouncedActivity = debounce(function() {
  // A console log for testing.
  // console.log('Window resized!')
  let firstPar = getFirstPar();
  let dropCapObject = getDropCapObject(firstPar);
  maintainDropCap(firstPar, dropCapObject, rowSpan)
}, 300);

window.addEventListener('resize', debouncedActivity);

function getFirstPar() {  
  // A console log for testing.
  // console.log('Getting first paragraph object')
  let firstPar = $( '.site-container p' ).first()
  return firstPar
}

function getFirstLetter(firstPar) {
  // A console log for testing.
  // console.log('Getting first letter')
  let firstLetter = firstPar.text().charAt(0)
  return firstLetter
}

function chopFirstLetter(firstPar) {
  // A console log for testing.
  // console.log('Chopping the first letter')
  stringToChop = firstPar.html();
  firstPar.html(stringToChop.substring(1));
}

function createDropCapObject(firstPar, firstLetter) {  
  // A console log for testing.
  // console.log('Creating drop cap object')
  firstPar.prepend( '<span class="dropcap--wrapper"><span class="dropcap--inner"><span class="dropcap--letter">' + firstLetter + '</span></span></span>' )
  let dropCapObject = $( '.dropcap--wrapper' )
  return dropCapObject
}

function getDropCapObject(firstPar) {  
  // A console log for testing.
  // console.log('Getting drop cap object')
  let dropCapObject = $( '.dropcap--wrapper' )
  return dropCapObject
}

function maintainDropCap(firstPar, dropCapObject, rowSpan) {
  
  let firstParFontSize = parseInt($(firstPar).css('font-size'), 10)
  let firstParLineHeight = parseInt($(firstPar).css('line-height'), 10)
  let rowSpanPadding = firstParLineHeight - firstParFontSize
  let rowSpanHeight = (firstParLineHeight * rowSpan) - rowSpanPadding
  
  // Some console logs for testing.
  // console.log('firstParFontSize: ' + firstParFontSize)
  // console.log('firstParLineHeight: ' + firstParLineHeight)
  // console.log('rowSpanHeight: ' + rowSpanHeight)
  
  dropCapObject.css( "height", rowSpanHeight )
  dropCapObject.css( "width", rowSpanHeight )
  dropCapObject.css( "margin-top", rowSpanPadding * .5 )
  dropCapObject.css( "margin-right", rowSpanPadding * .75 )
  dropCapObject.css( "font-size", rowSpanHeight )
}

// Debounce function from https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
