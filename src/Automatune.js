/**
 * The main Automatune class.
 * @constructor
 */
function Automatune() {
    
    /** Returns the GridCell at position {x, y}. 
     * @param {int} x The x position of the GridCell.
     * @param {int} y The y position of the GridCell.
     */
    this.getGridCell = function (x, y) {
        return gridCells[x][y];
    }
    
    /** A 2D list of all grid cells. **/
    var gridCells;
    
    /** Objects to call update() on every step. */
    var updateTargets;
    
}
