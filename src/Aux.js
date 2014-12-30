// Usage: assert(expression). If obj evaluates to false, an exception is thrown.
function assert(expression) {
    
    "use strict";
    
    function getErrorObject(){
        try { throw Error(''); } catch(err) { return err; }
    }
    
    // If obj is "falsey", then throw an exception.
    if (!expression || arguments.length !== 1) {
        var err = getErrorObject();
        var caller_line = err.stack.split("\n")[4];
        var index = caller_line.indexOf("at ");
        var clean = caller_line.slice(index+2, caller_line.length).trim();
        throw "\"Assert Failed\" at " + clean;
    }
}

Automatune.util = {};

/**
 * Sets the CSS rotation of an HTMLElement to reflect an {@linkcode Orientation.
 * @param {HTMLElement} domElement The DOM Element to set the rotation of.
 * @param {Orientation} orientation The Orientation to set the rotation to reflect.
 */
Automatune.util.setCSSRotation = function(domElement, orientation) {
    "use strict";
    var rotation = orientation * -90;
    var cssString = "rotate(" + rotation + "deg)";
    domElement.style["-ms-transform"] = cssString;
    domElement.style["-webkit-transform"] = cssString;
    domElement.style.transform = cssString;
};

/**
 * Given an Orientation, returns an Orientation rotated 90 degrees to the right.
 * @param {Orientation} orientation The Orientation to rotate.
 * @returns {Orientation} orientationRight The orientation rotated 90 degrees to the right.
 */
Automatune.util.rotateRight = function(orientation) {
    "use strict";
    if (orientation === 3) return 0;
    else return orientation + 1;
};

/**
 * Given an Orientation, returns an Orientation rotated 90 degrees to the left.
 * @param {Orientation} orientation The Orientation to rotate.
 * @returns {Orientation} orientationRight The orientation rotated 90 degrees to the left.
 */
Automatune.util.rotateLeft = function(orientation) {
    "use strict";
    if (orientation === 0) return 3;
    else return orientation - 1;
};

