/**
 * Initializes an Automatune game grid.
 *
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
     *
     * @public
     * @type {Automatune}
     */
    this.parentGame;
    
    /**
     * The DOM Element that visually represents the Automatune Grid.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * A 2D array of all {@link GridCell|GridCells} within this Grid.
     *
     * @private
     * @type {Array<Array<GridCell>>}
     */
    var gridCells;
    
    /**
     * The length/width of the grid, in cells.
     *
     * @private
     * @type {int}
     */
    var gridSize;
    
    /**
     * The width of an individual cell in this Grid, in CSS percentage.
     *
     * @public
     * @type {float}
     */
    this.cellCSSWidth;
    
    /**
     * The spacing between individual cells in this Grid, in CSS percentage.
     *
     * @public
     * @type {float}
     */
    this.cellCSSSpacing;
    
    /**
     * Get the length/width of the Grid, which is also the side length of the Grid.
     *
     * @public
     * @returns {int} gridSize The length/width of the Grid.
     */
    this.getGridSize = function() {
        return gridSize;
    };
    
    /**
     * Given an (x, y) coordinate position, returns whether this position is within bounds of the grid.
     *
     * @public
     * @param {int} x The x coordinate of the location to check.
     * @param {int} y The y coordinate of the location to check.
     * @returns {boolean} isInBounds Whether the location is within the grid's bounds.
     */
    this.isInBounds = function(x, y) {
        return (x >= 0 && x < gridSize && y >= 0 && y < gridSize);
    };
    
    /**
     * Returns the {@link GridCell} at position (x, y) in the Automatune grid.
     *
     * @public
     * @param {int} x The x position of the GridCell.
     * @param {int} y The y position of the GridCell.
     * @returns {GridCell}
     */
    this.getCell = function (x, y) {
        return gridCells[x][y];
    };
    
    /**
     * Constructs a JSON-compatible object representing the current state of this object.
     *
     * @public
     * @returns {Object} save A JSON-compatible object representing a save state.
     */
    this.getSaveState = function() {
        return {
            instanceOf: "Grid"
            // TODO: Finish save state implementation
        };
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

