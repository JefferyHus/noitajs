# noitajs
This is a jQuery $.animate() plugin wrapper

Description
-----------
This library is a wrapper for the actual $.animate() jQuery function, using Promises to fulfill request without bugs or front crashe.
You can create your own animations and chose to repeat it after a time you pick, it also supports the conversion of timing in milliseconds, seconds and minutes you simply set a ddeay integer and set the timing to "ms", "s" or "m" it automatically converts the integer given to the right timing.

```javascript
(function($){
  $('.elem').noita({options}, callback)
})
```

Options
----------
```javascript
{
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
$('.elem').noita({properties: {'right':"+=1"}, duration: 5, timing: 'm', repeat: true, repeatDelay: 5000, repeatProps: {'display': none}});
