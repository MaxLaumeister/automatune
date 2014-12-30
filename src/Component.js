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
        Automatune.util.setCSSRotation(this.domElement, orientation);
    };
    
    /**
     * Rotates this component right 90 degrees
     * @public
     */
    this.rotateRight = function() {
        orientation = Automatune.util.rotateRight(orientation);
        Automatune.util.setCSSRotation(this.domElement, orientation);
    };
    
    /**
     * Rotates this component left 90 degrees
     * @public
     */
    this.rotateLeft = function() {
        orientation = Automatune.util.rotateLeft(orientation);
        Automatune.util.setCSSRotation(this.domElement, orientation);
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
    this.parentCell = pCell;
    this.domElement = document.createElement("div");
    this.domElement.className = "gridCellProperty";
    this.parentCell.domElement.appendChild(this.domElement);
    
    this.setOrientation(orientation);
    
    window.setTimeout((function(){
        this.domElement.classList.add("active");
    }).bind(this), 160);
};

/**
 * Creates a new Arrow component.
 * @alias Component_Arrow
 * @class
 * @classdesc A component that changes a {@linkcode Visitor}'s direction upon visiting a {@linkcode GridCell}.
 * @extends Component
 * @param {Orientation} orientation The type of component to create.
 */
Automatune.Component_Arrow = function(pCell, orientation) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    Automatune.Component.call(this, pCell, orientation);
    
    /**
     * Destroys this Arrow, removing it from its {@linkcode GridCell}.
     * @public
     */
    this.destroy = function() {
        // Deconstruct DOM
        //this.domElement.
    };
    
    // Initialize Arrow DOM
    
    var img = document.createElement("img");
    img.src = "images/arrow.svg";
    this.domElement.appendChild(img);
};

