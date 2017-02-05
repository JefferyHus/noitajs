# noitajs

[![Build Status](https://travis-ci.org/JefferyHus/noitajs.svg?branch=master)](https://travis-ci.org/JefferyHus/noitajs) [![npm version](https://badge.fury.io/js/noitajs.svg)](https://badge.fury.io/js/noitajs) ![GitHub release](https://img.shields.io/badge/release-1.0.1--alpha-blue.svg)

Description
-----------
This library is a javascript DOM manipulation framework, for the moment the latest version has only the animate feature which is used to animate parts of your html document and you can repeat the same animation or change the behavior of your animation by passing a new settings object, it easily to do so by calling the ``complete`` function that recieves `settings` as the first value which you can change and re-use it again.

## Instalation

NPM dependencies
-----------------
```javascript
npm i --save-dev noitajs@1.0.1
```

How to use it?
--------------
```javascript
noita.animate({options}, callback);
```

Options
----------
```javascript
{
	elem: 'noita',
	repeat: false,
	repeatDelay: 300,
	repeatProps: {},
	function: 'swing',
	duration: 300,
	timing: 'ms',
	properties: {},
	init: function (elem) {},
	complete: function (settings, error) {}
}
```

`elem`: ID of the DOM element to animate
`repeat`: either repeat or not the current animation (default: false).
`repeatDelay`: when to repeat the next animatio, this property depends on the first one in case it is true (default: 300)
`repeatProps`: in case you like to pick another animation effect to the element, if not set the first effect will be repeated
`function`: this is similar to $.animate property 'easing' (default: 'swing').
`duration`: duration of the current promise.
`timing`: duration unit could be either 'ms', 's' or 'm' (default: 'ms').
`properties`: string/object containing the animation efects to be executed on the element.
`init`: call this function if you want to interfer during the start of the promise.
`complete`: called when the promise has ended, notice that this function is called after every animation if `repeat` is set to true.

You can set a callback function that will replace the `complete` function, this callback will recieve the same attributes as the complete function.

Example
----------
```javascript
noita({properties: {'right':"+=1"}, duration: 5, timing: 'm', repeat: true, repeatDelay: 5000, repeatProps: {'display': none}});
```
