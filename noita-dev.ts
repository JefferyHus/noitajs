import _ from "lodash";

// create a new class
class noita {
    // set the default variables
    repeat = false;
    repeatDelay = 300;
    function = 'swing';
    duration = 300;
    timing = 'ms';
    properties = {};
    init = (elem) => {};
    complete = (settings, error) => {};

    constructor (options) {
        console.log(options);
    }

}

/*repeat: false,
repeatDelay: 300,
repeatProps: {},
function: 'swing',
duration: 300,
timing: 'ms',
properties: {},
init: function (elem) {},
complete: function (settings, error) {}*/