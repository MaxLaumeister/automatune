/**
 * Initializes an Automatune game grid.
 * @alias Grid
 * @class
 * @classdesc An Automatune game grid. Manages a 2D matrix of {@link GridCell|GridCells}.
 * @param {Automatune} pGame The main Automatune instance.
 * @param {int} size The size (width/height) of the square game grid.
 */
Automatune.Grid = function(pGame, size) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    /**
     * The parent Automatune game instance.
     * @public
     * @type {Automatune}
     */
    this.parentGame;
    
    /**
     * The DOM Element that visually represents the Automatune Grid.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * A 2D array of all {@link GridCell|GridCells} within this Grid.
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
     * The width of an individual cell in this Grid, in CSS percentage.
     * @public
     */
    this.cellCSSWidth;
    
    /**
     * The spacing between individual cells in this Grid, in CSS percentage.
     * @public
     */
    this.cellCSSSpacing;
    
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
    this.parentGame = pGame;
    this.domElement = this.parentGame.domElement;
    gridSize = size;
    
    // Initialize CSS conversion factors
    this.cellCSSSpacing = 10 / gridSize;
    this.cellCSSWidth = ((100 - this.cellCSSSpacing) / gridSize) - this.cellCSSSpacing;
    
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

