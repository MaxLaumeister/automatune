/**
 * Initializes an Automatune game grid.
 * @alias Grid
 * @class
 * @classdesc An Automatune game grid. Contains a 2D array of {@link GridCell}s.
 * @param {HTMLElement} domEl The outermost Automatune DOM Element.
 * @param {int} size The size (width/height) of the square game grid.
 */
Automatune.Grid = function(domEl, size) {
    
    /**
     * The DOM Element that visually represents the Automatune Grid.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * A 2D list of all {@link GridCell}s.
     * @private
     * @type {Array<Array<GridCell>>}
     */
    var gridCells;
    
    /**
     * The length/width of the grid, in cells.
     * @private
     * @type {int}
     */
    var gridSize;
    
    /**
     * Get the length/width of the grid, in cells.
     * @public
     * @type {int}
     */
    this.getGridSize = function() {
        return gridSize;
    };
    
    /**
     * Returns the {@link GridCell} at position (x, y) in the Automatune grid. 
     * @public
     * @param {int} x The x position of the GridCell.
     * @param {int} y The y position of the GridCell.
     * @returns {GridCell}
     */
    this.getCell = function (x, y) {
        return gridCells[x][y];
    };
    
    
    
    // Initialize this Grid instance.
    
    // Initialize variables
    this.domElement = domEl;
    gridSize = size;
    
    // Initialize grid with GridCells.
    gridCells = new Array(size);
    for (var i = 0; i < size; i++) {
        var column = new Array(size);
        for (var j = 0; j < size; j++) {
            column[j] = new Automatune.GridCell(this, i, j);
        }
        gridCells[i] = column;
    }
};
