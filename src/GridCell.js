/**
 * A cell on the game grid.
 * @constructor
 */
Automatune.GridCell = function() {
    
    /**
     * The DOM Element associated with this GridCell.
     * @type {HTMLElement}
     */
    var domElement;
    
    /**
     * The Components associated with this GridCell.
     * @type {Component[]}
     */
    var components = [];
    
    /**
     * Append a component to this GridCell.
     * @param {Component} ct The Component to append to this GridCell.
     */
    this.append = function(ct) {
        
    };
    
    /**
     * Remove a component from this GridCell.
     * @param {Component} ct The Component to remove from this GridCell.
     */
    this.remove = function(ct) {
        
    };
    
    /**
     * Called when this GridCell is visited by a Visitor.
     */
    this.onVisit = function() {
    
    };
};
