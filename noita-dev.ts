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
        // firs of all check if any callback has been set
        // if one found then call it once the promise has finished
        let args     = Array.prototype.slice.call(arguments, 1);
        let callback = Array.prototype.shift.call(args);
        // prevent any extension on settings
        Object.preventExtensions(this.settings);
        // now check if any options are passed
        options ? _.assign(this.settings, options) : false;
        // then start the scope
        animate.prototype.start( this.settings, callback );
    }

    /* starts the animation process */
    start (settings, callback = undefined) {
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
                // start the animation
                elem.setAttribute('style', styleString);
                // sleep for some time
                let sleep = animate.prototype.await( animate.prototype.timing( settings.duration, settings.timing, "ms" ).time );
                // fulfill the sleep promise
                sleep.then(
                    function (value)
                    {
                        // call the complete function
                        if ( undefined == callback )
                        {
                            settings.complete.call(this, settings, null);
                        }
                        else if ( typeof callback === "function" )
                        {
                            callback.call(this, settings, null);
                        }
                    }
                ).catch(
                    function (error)
                    {
                        // call the complete function
                        if ( undefined == callback )
                        {
                            settings.complete.call(this, settings, error);
                        }
                        else if ( typeof callback === "function" )
                        {
                            callback.call(this, settings, error);
                        }
                    }
                );
            }
        );

    }

    /* sleep promise es5 support */
    await (duration:number) {
        return new Promise( (resolve, reject) => window.setTimeout(() => {
            // if the browser is IE then just return a catchable error
            if ( navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) )
            {
                reject( new Error("You are using IE, this browser is not supported by Noita Animation prototype, please wait until a new version is out to fix the problem.") );
            }
            else
            {
                resolve();
            }
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