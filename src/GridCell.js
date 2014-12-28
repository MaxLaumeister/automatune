/**
 * Creates a grid cell
 * @alias GridCell
 * @class
 * @classdesc A cell on the game grid.
 */
Automatune.GridCell = function() {
    
    /**
     * The DOM Element that visually represents this GridCell.
     * @private
     * @type {HTMLElement}
     */
    var domElement;
    
    /**
     * The Components associated with this GridCell.
     * @private
     * @type {Component[]}
     */
    var components = [];
    
    /**
     * Append a component to this GridCell.
     * @public
     * @param {Component} ct The Component to append to this GridCell.
     */
    this.append = function(ct) {
        
    };
    
    /**
     * Remove a component from this GridCell.
     * @public
     * @param {string} type The type of Component to remove from this GridCell.
     */
    this.removeComponent = function(type) {
        
    };
    
    /**
     * Called when a Visitor visits this GridCell.
     * Triggers the onVisit() event for all Components attached to this GridCell.
     * @private
     */
    this.onVisit = function() {
    
    };
};
