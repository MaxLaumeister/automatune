/**
 * @alias Modifier
 * @abstract
 * @class
 * @classdesc A modifier that gets attached to a grid cell, such as a {@linkcode Component_Note|Note}. A {@linkcode GridCell} may have one or more modifiers.
 * @param {GridCell} pCell The parent grid cell.
 */
Automatune.Modifier = function(pCell) {
    
    "use strict";
    
    assert(arguments.length === 1);
    
    /**
     * The parent {@linkcode GridCell} of this Component.
     * @public
     */
    this.parentCell;
    
    /**
     * The DOM Element that visually represents this Modifier.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * Appends this Modifier to a {@linkcode GridCell}.
     * @public
     * @param {GridCell} gridCell The GridCell to append this Component to.
     */
    this.appendTo = function(gridCell) {
        
    };
    
    /**
     * Defines what this Modifier should do when visited.
     * @private
     * @param {Visitor} visitor The visitor that is currently visiting this Component.
     */
    this.onVisit = function(visitor) {
        throw "onVisit called on a Modifier that does not implement onVisit.";
    };
    
    /**
     * Destroys this Modifier, removing it from its {@linkcode GridCell}.
     * @public
     */
    this.destroy = function() {
    
    };
    
    // Initialize variables
    
    this.parentCell = pCell;
};

/**
 * Creates a new Note modifier.
 * @alias Modifier_Note
 * @class
 * @classdesc A modifier that plays an audible note when visited by a {@linkcode Visitor}.
 * @extends Modifier
 */
Automatune.Modifier_Note = function() {
    
    //assert(arguments.length === 3);
    
};

