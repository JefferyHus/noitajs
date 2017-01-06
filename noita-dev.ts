import * as _ from "lodash";
const Promise = require("es6-promise");

// create a new class
export class animate {
    // set the default variables
    settings = {
        elem: "noita",
        repeat: false,
        repeatDelay: 300,
        transition: 'swing',
        duration: 300,
        timing: 'ms',
        properties: {},
        init: (elem) => {},
        complete: (settings, error) => {},
    };

    // init the prototype
    constructor (options: sobject) {
        // prevent any extension on settings
        Object.preventExtensions(this.settings);
        // now check if any options are passed
        options ? _.assign(this.settings, options) : false;
        // then start the scope
        animate.prototype.start( this.settings );
    }

    /* starts the animation process */
    start (settings) {
        // check if this settings has any properties first
        if ( _.isEmpty(settings.properties) || !_.isObject(settings.properties) ) {
            throw new SyntaxError("You must provide a property object.");
        }
        // create a new promise
        var _prms = new Promise(
            function (resolve, reject) {
                // get the element
                var elem = document.getElementById(settings.elem);
                // create the style string
                var styleString = _.join(_.map(settings.properties, function(o, key) {return _.join([key, o], ':') ;}), ';');
                // now affect the style into the element
                elem.setAttribute('style', styleString);
                elem.style.webkitTransition = "all " + settings.transition + " " + settings.duration + settings.timing;
            }
        );

    }

}

// separate the settings object for a clean changes
interface sobject{
    repeat: boolean;
    repeatDelay: number;
    transition: string;
    duration: number;
    timing: string;
    properties: Object;
    init: (elem:any) => {};
    complete: (settings:Object, error:any) => {};
}