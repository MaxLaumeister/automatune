/**
 * Create a new visitor
 * @alias Visitor
 * @class
 * @classdesc A circle that visits GridCells on the game grid.
 * @param {int} x The x position for the new Visitor.
 * @param {int} y The y position for the new Visitor.
 */
Automatune.Visitor = function(x, y) {
    /**
     * The DOM Element that visually represents this Visitor.
     * @private
     * @type {HTMLElement}
     */
    var domElement;
    
    /**
     * The current grid position of this Visitor.
     * @private
     * @type {{x, y}}
     */
    var pos = {x: x, y: y};
    
    /**
     * Appends this Visitor to a GridCell.
     * @public
     */
    this.appendTo = function(gridCell) {
        
    };
    
    /**
     * Steps this Visitor forward, sending it on its way to the next grid cell.
     * @private
     */
    this.update = function() {
        
    };
};
