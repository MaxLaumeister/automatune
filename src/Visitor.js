/**
 * Create a new visitor
 * @alias Visitor
 * @class
 * @classdesc A circle that visits GridCells on the game grid.
 * @param {Grid} pGrid The parent game grid.
 * @param {int} x The x position in the grid for the new Visitor.
 * @param {int} y The y position in the grid for the new Visitor.
 */
Automatune.Visitor = function(pGrid, x, y) {
    
    "use strict";
    
    /**
     * The parent {@linkcode Grid} of this GridCell.
     * @public
     */
    this.parentGrid;
    
    /**
     * The DOM Element that visually represents this Visitor.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The current grid position of this Visitor.
     * @public
     * @type {Object}
     */
    this.pos = {x: x, y: y};
    
    /**
     * Appends this Visitor to a {@linkcode GridCell}.
     * @public
     * @param {GridCell} gridCell The GridCell to append this Visitor to.
     */
    this.appendTo = function(gridCell) {
        
    };
    
    /**
     * Steps this Visitor forward, sending it on its way to the next grid cell.
     * @private
     */
    this.update = function() {
        
    };
    
    // Initialize variables
    this.parentGrid = pGrid;
};

