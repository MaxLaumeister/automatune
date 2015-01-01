/**
 * @alias Component
 * @abstract
 * @class
 * @classdesc A component on a grid cell, such as an {@linkcode Component_Arrow|Arrow}. A {@linkcode GridCell} can only contain one component at a time.
 * @param {GridCell} pCell The parent {@linkcode GridCell} of this Component.
 * @param {Orientation} orient The orientation the new Component should have.
 */
Automatune.Component = function(pCell, orient) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    /**
     * The parent {@linkcode GridCell} of this Component.
     *
     * @public
     * @type {GridCell}
     */
    this.parentCell;
    
    /**
     * The {@linkcode Orientation} (right, up, left, or down) that this Component has.
     *
     * @private
     * @type {Orientation}
     */
    this.orientation;
    
    /**
     * The DOM Element that visually represents this Component.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    
    
    // Initialize variables
    
    this.orientation = orient;
    this.parentCell = pCell;
    this.domElement = document.createElement("div");
    this.domElement.className = "gridCellProperty";
    this.parentCell.domElement.insertBefore(this.domElement, this.parentCell.domElement.firstChild);
    
    this.setOrientation(this.orientation);
    
    window.setTimeout((function(){
        this.domElement.classList.add("active");
    }).bind(this), 160);
};

/**
 * Returns the name of the class that this object is an instance of.
 *
 * @public
 * @returns {string} className The name of the class that this object is an instance of.
 */
Automatune.Component.prototype.getClassName = function() {
    "use strict";
    return "Automatune.Component";
};

/**
 * Appends this Component to a {@linkcode GridCell}.
 *
 * @public
 * @param {GridCell} gridCell The GridCell to append this Component to.
 */
Automatune.Component.prototype.appendTo = function(gridCell) {
    
};

/**
 * Rotates this Component to face an arbitrary {@linkcode Orientation}.
 *
 * @public
 * @param {Orientation} orient The new Orientation for the component.
 */
Automatune.Component.prototype.setOrientation = function(orient) {
    "use strict";
    this.orientation = orient;
    Automatune.util.setCSSRotation(this.domElement, this.orientation);
};

/**
 * Rotates this Component right 90 degrees.
 *
 * @public
 */
Automatune.Component.prototype.rotateRight = function() {
    "use strict";
    this.orientation = Automatune.util.rotateRight(this.orientation);
    Automatune.util.setCSSRotation(this.domElement, this.orientation);
};

/**
 * Rotates this Component left 90 degrees.
 *
 * @public
 */
Automatune.Component.prototype.rotateLeft = function() {
    "use strict";
    this.orientation = Automatune.util.rotateLeft(this.orientation);
    Automatune.util.setCSSRotation(this.domElement, this.orientation);
};

/**
 * Defines what this Component should do when visited.
 *
 * @private
 * @param {Visitor} visitor The visitor that is currently visiting this Component.
 */
Automatune.Component.prototype.onVisit = function(visitor) {
    "use strict";
    throw "onVisit called on a Component that does not implement onVisit.";
};

/**
 * Destroys this Component, removing it from its {@linkcode GridCell}.
 *
 * @public
 */
Automatune.Component.prototype.destroy = function() {
    "use strict";
    this.domElement.parentNode.removeChild(this.domElement);
};

/**
 * Creates a new Arrow component.
 * @alias Component_Arrow
 * @class
 * @classdesc A component that changes a {@linkcode Visitor}'s direction upon visiting a {@linkcode GridCell}.
 * @extends Component
 * @param {Orientation} orient The type of component to create.
 */
Automatune.Component_Arrow = function(pCell, orient) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    Automatune.Component.call(this, pCell, orient);
    
    
    
    // Initialize Arrow DOM
    
    this.img = document.createElement("img");
    this.img.src = "images/arrow.svg";
    this.domElement.appendChild(this.img);
};
Automatune.util.extend(Automatune.Component, Automatune.Component_Arrow);

/**
 * Returns the name of the class that this object is an instance of.
 *
 * @public
 * @returns {string} className The name of the class that this object is an instance of.
 */
Automatune.Component_Arrow.prototype.getClassName = function() {
    "use strict";
    return "Automatune.Component_Arrow";
};

/**
 * Destroys this Arrow, removing it from its {@linkcode GridCell}.
 * @public
 */
Automatune.Component_Arrow.prototype.destroy = function() {
    "use strict";
    // Deconstruct DOM
    this.domElement.removeChild(this.img);
    Automatune.Component.prototype.destroy.call(this);
};

Automatune.Component_Arrow.prototype.onVisit = function(visitor) {
    "use strict";
    visitor.orientation = this.orientation;
};

/**
 * Constructs a JSON-compatible object representing the current state of this object.
 *
 * @public
 * @returns {Object} save A JSON-compatible object representing a save state.
 */
Automatune.Component_Arrow.prototype.getSaveState = function() {
    "use strict";
    return {
        instanceOf: this.getClassName(),
        orientation: this.orientation
    };
};

