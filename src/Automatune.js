/**
 * The main Automatune class.
 * @constructor
 */
function Automatune() {
    
    /**
     * Returns the GridCell at position {x, y}. 
     * @public
     * @param {int} x The x position of the GridCell.
     * @param {int} y The y position of the GridCell.
     * @returns {GridCell}
     */
    this.getGridCell = function (x, y) {
        return gridCells[x][y];
    };
    
    /**
     * A 2D list of all grid cells.
     * @private
     */
    var gridCells = [[]];
    
    /**
     * Objects to call update() on every step.
     * @private
     */
    var updateTargets = [];
    
}
