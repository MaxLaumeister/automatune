/**
 * Initializes Automatune on a div.
 * @class
 * @classdesc The main Automatune class.
 */
function Automatune(domEl) {
    
    /**
     * The DOM Element that contains the Automatune game.
     * @private
     */
    var domElement;
    
    /**
     * A 2D list of all {@link GridCell}s.
     * @private
     */
    var gridCells = [[]];
    
    /**
     * Objects to call update() on every step.
     * @private
     */
    var updateTargets = [];
    
    /**
     * Returns the {@link GridCell} at position (x, y) in the Automatune grid. 
     * @public
     * @param {int} x The x position of the GridCell.
     * @param {int} y The y position of the GridCell.
     * @returns {GridCell}
     */
    this.getGridCell = function (x, y) {
        return gridCells[x][y];
    };
    
    /**
     * Updates all active actors (e.g. {@link Visitor}s and {@link Component}s)
     * in the system, simulating a step.
     * @private
     */
    function update() {
        
    }
    
}
