/**
 * @alias Component
 * @abstract
 * @class
 * @classdesc A component on a grid cell, such as an {@linkcode Component_Arrow|Arrow}. A {@linkcode GridCell} can only contain one component at a time.
 * @param {Orientation} orient The orientation the new Component should have.
 */
Automatune.Component = function(orient) {
    
    "use strict";
    
    assert(arguments.length === 1);
    
    /**
     * The parent {@linkcode GridCell} of this Component.
     * @public
     */
    this.parentCell;
    
    /**
     * The {@linkcode Orientation} (right, up, left, or down) that this Component has.
     * @private
     * @type {Orientation}
     */
    var orientation;
    
    /**
     * The DOM Element that visually represents this Component.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * Appends this Component to a {@linkcode GridCell}.
     * @public
     * @param {GridCell} gridCell The GridCell to append this Component to.
     */
    this.appendTo = function(gridCell) {
        
    };
    
    /**
     * Changes the direction that this Component is facing.
     * @public
     * @param {Orientation} orient The new Orientation for the component.
     */
    this.setOrientation = function(orient) {
        orientation = orient;
        // TODO: Update DOM Element
    };
    
    /**
     * Defines what this Component should do when visited.
     * @private
     * @param {Visitor} visitor The visitor that is currently visiting this Component.
     */
    this.onVisit = function(visitor) {
        throw "onVisit called on a Component that does not implement onVisit.";
    };
    
    /**
     * Destroys this Component, removing it from its {@linkcode GridCell}.
     * @public
     */
    this.destroy = function() {
    
    };
    
    // Initialize variables
    
    orientation = orient;
};

/**
 * Creates a new Arrow component.
 * @alias Component_Arrow
 * @class
 * @classdesc A component that changes a {@linkcode Visitor}'s direction upon visiting a {@linkcode GridCell}.
 * @extends Component
 * @param {Orientation} orientation The type of component to create.
 */
Automatune.Component_Arrow = function(orientation) {
    
    "use strict";
    
    assert(arguments.length === 1);
    
    Automatune.Component.call(this, orientation);
    
    // Init DOM
    
    var img = document.createElement("img");
    img.src = "images/arrow.svg";
    img.className = "gridCellProperty";

    this.domElement = img;
    this.parentCell.domElement.appendChild(img);
    
    /**
     * Destroys this Arrow, removing it from its {@linkcode GridCell}.
     * @public
     */
    this.destroy = function() {
        // Deconstruct DOM
        //this.domElement.
    };
};

