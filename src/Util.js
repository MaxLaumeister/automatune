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

function getUrlParameter( name, url ) {
  "use strict";
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results === null ? null : results[1];
}

Automatune.util = {};

/**
 * Extends one class with another.
 *
 * @param {Function} baseClass The base class to extend.
 * @param {Function} newClass The class to extend from the base class.
 */
Automatune.util.extend = function(baseClass, newClass) {
    "use strict";
    newClass.prototype = Object.create(baseClass.prototype);
    newClass.prototype.constructor = newClass;
};

/**
 * Sets the CSS rotation of an HTMLElement to reflect an {@linkcode Orientation}.
 *
 * @param {HTMLElement} domElement The DOM Element to set the rotation of.
 * @param {Orientation} orientation The Orientation to set the rotation to reflect.
 */
Automatune.util.setCSSRotation = function(domElement, orientation) {
    "use strict";
    var rotation = orientation * -90;
    var cssString = "rotate(" + rotation + "deg)";
    domElement.style["-webkit-transform"] = cssString;
    domElement.style.transform = cssString;
};

/**
 * Given an Orientation, returns an Orientation rotated 90 degrees to the right.
 *
 * @param {Orientation} orientation The Orientation to rotate.
 * @returns {Orientation} orientationRight The orientation rotated 90 degrees to the right.
 */
Automatune.util.rotateRight = function(orientation) {
    "use strict";
    if (orientation === 3) return 0;
    else return orientation + 1;
    assert(false);
};

/**
 * Given an Orientation, returns an Orientation rotated 90 degrees to the left.
 *
 * @param {Orientation} orientation The Orientation to rotate.
 * @returns {Orientation} orientationRight The orientation rotated 90 degrees to the left.
 */
Automatune.util.rotateLeft = function(orientation) {
    "use strict";
    if (orientation === 0) return 3;
    else return orientation - 1;
    assert(false);
};

/**
 * Given an Orientation, returns an Orientation rotated 180 degrees.
 *
 * @param {Orientation} orientation The Orientation to rotate.
 * @returns {Orientation} orientationRight The orientation rotated 180 degrees.
 */
Automatune.util.getOpposite = function(orientation) {
    "use strict";
    if (orientation == Automatune.O_RIGHT) return Automatune.O_LEFT;
    if (orientation == Automatune.O_UP) return Automatune.O_DOWN;
    if (orientation == Automatune.O_LEFT) return Automatune.O_RIGHT;
    if (orientation == Automatune.O_DOWN) return Automatune.O_UP;
    assert(false);
};

/**
 * Given an Orientation, returns an {x, y} delta of where an object would land if it were to move forward.
 *
 * @param {Orientation} orientation The Orientation to derive the delta from.
 * @returns {Vector2} delta The delta derived from the orientation.
 */
Automatune.util.getOrientationDelta = function(orientation) {
    "use strict";
    if (orientation == Automatune.O_RIGHT) return {x: 1, y: 0};
    if (orientation == Automatune.O_UP) return {x: 0, y: -1};
    if (orientation == Automatune.O_LEFT) return {x: -1, y: 0};
    if (orientation == Automatune.O_DOWN) return {x: 0, y: 1};
    assert(false);
};

