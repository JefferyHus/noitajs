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
                styleString += ";transition: all " + settings.transition + " " + settings.duration + settings.timing;
                elem.setAttribute('style', styleString);
                // sleep for some time
                let sleep = animate.prototype.await( animate.prototype.timing( settings.duration, settings.timing, "ms" ).time );
                // fulfill the sleep promise
                sleep.then(
                    function () {
                        console.log("done");
                    }
                );
            }
        );

    }

    /* sleep promise es5 support */
    await (duration:number) {
        return new Promise( (resolve) => window.setTimeout(() => {
            resolve();
        }, duration) );
    }
    
    /* convert the time to the exact duration */
    timing (duration:number, from:string, to:string) {
        // convert ms to a chosen timing unit
        let mstounit = (n, unit:string) => {
            switch (unit) {
                case "s":
                    n = Math.round(duration / 1000);
                    break;
                case "m":
                    n = Math.round( (duration / 1000) / 60 );
                    break;
                default:
                    break;
            }

            return n;
        };
        // convert s to unit
        let stounit = (n, unit:string) => {
            switch (unit) {
                case "ms":
                    n = Math.round(duration * 1000);
                    break;
                case "m":
                    n = Math.round(duration / 60);
                    break;
                default:
                    break;
            }

            return n;
        };
        // convert m to unit
        let mtounit = (n, unit:string) => {
            switch (unit) {
                case "ms":
                    n = Math.round( (duration * 60) * 1000 );
                    break;
                case "s":
                    n = Math.round(duration * 60);
                    break;
                default:
                    break;
            }

            return n;
        };

        // convert now the duration
        if ( from === "ms" ) {
            duration = mstounit(duration, to);
        } else if ( from === "s" ) {
            duration = stounit(duration, to);
        } else if ( from === "m" ) {
            duration = mtounit(duration, to);
        }

        return {time: duration, unit: to};
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