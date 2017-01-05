import * as _ from "lodash";

// create a new class
export default class noita {
    // set the default variables
    settings: _sobject;

    constructor (options) {
        _.assign(this.settings, options);
    }

}

// separate the settings object for a clean changes
interface _sobject{
    repeat: false;
    repeatDelay: 300;
    function: 'swing';
    duration: 300;
    timing: 'ms';
    properties: {};
    init: (elem) => {};
    complete: (settings, error) => {};
}
