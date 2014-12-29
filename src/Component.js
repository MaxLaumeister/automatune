/**
 * @alias Component
 * @abstract
 * @class
 * @classdesc A modifier that gets attached to a grid cell, such as an {@linkcode Component_Arrow|Arrow} or {@linkcode Component_Note|Note}.
 * @param {GridCell} pCell The parent grid cell.
 * @param {string} t The type of component to create.
 */
Automatune.Component = function(pCell, t) {
    
    "use strict";
    
    /**
     * The parent {@linkcode GridCell} of this Component.
     * @public
     */
    this.parentCell;
    
    /**
     * The type of component (arrow, note, etc.)
     * @private
     * @type {string}
     */
    var type;
    
    /**
     * The DOM Element that visually represents this Component.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * Returns the type of this Component (arrow, note, etc.).
     * @public
     * @returns {string} type The type of this Component.
     */
    this.getType = function(){
        return type;
    };
    
    /**
     * Appends this Component to a {@linkcode GridCell}.
     * @public
     * @param {GridCell} gridCell The GridCell to append this Component to.
     */
    this.appendTo = function(gridCell) {
        
    };
    
    /**
     * Defines what this Component should do when visited.
     * @private
     * @param {Visitor} visitor The visitor that is currently visiting this Component.
     */
    this.onVisit = function(visitor) {
        
    };
    
    /**
     * Destroys this Component, removing it from its {@linkcode GridCell}.
     * @public
     */
    this.destroy = function() {
    
    };
    
    // Initialize variables
    
    this.parentCell = pCell;
    type = t;
};

/**
 * Creates a new Arrow component.
 * @alias Component_Arrow
 * @class
 * @classdesc A component that changes a {@linkcode Visitor}'s direction upon visiting a {@linkcode GridCell}.
 * @extends Component
 */
Automatune.Component_Arrow = function() {

};

/**
 * Creates a new Note component.
 * @alias Component_Note
 * @class
 * @classdesc A component that plays an audible note when visited by a {@linkcode Visitor}.
 * @extends Component
 */
Automatune.Component_Note = function() {

};

