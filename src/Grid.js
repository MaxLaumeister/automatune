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
    this.gridCells;
    
    /**
     * The length/width of the grid, in cells.
     *
     * @private
     * @type {int}
     */
    this.gridSize;
    
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
    
    
    
    // Initialize this Grid instance.
    
    // Initialize variables
    this.parentGame = pGame;
    this.domElement = this.parentGame.domElement;
    this.gridSize = size;
    
    // Initialize CSS conversion factors
    this.cellCSSSpacing = 10 / this.gridSize;
    this.cellCSSWidth = ((100 - this.cellCSSSpacing) / this.gridSize) - this.cellCSSSpacing;
    
    // Initialize grid with GridCells.
    this.gridCells = new Array(size);
    for (var i = 0; i < size; i++) {
        var column = new Array(size);
        for (var j = 0; j < size; j++) {
            column[j] = new Automatune.GridCell(this, i, j);
        }
        this.gridCells[i] = column;
    }
};

/**
 * Get the length/width of the Grid, which is also the side length of the Grid.
 *
 * @public
 * @returns {int} gridSize The length/width of the Grid.
 */
Automatune.Grid.prototype.getGridSize = function() {
    "use strict";
    return this.gridSize;
};

/**
 * Given an (x, y) coordinate position, returns whether this position is within bounds of the grid.
 *
 * @public
 * @param {int} x The x coordinate of the location to check.
 * @param {int} y The y coordinate of the location to check.
 * @returns {boolean} isInBounds Whether the location is within the grid's bounds.
 */
Automatune.Grid.prototype.isInBounds = function(x, y) {
    "use strict";
    return (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize);
};

/**
 * Returns the {@link GridCell} at position (x, y) in the Automatune grid.
 *
 * @public
 * @param {int} x The x position of the GridCell.
 * @param {int} y The y position of the GridCell.
 * @returns {GridCell}
 */
Automatune.Grid.prototype.getCell = function (x, y) {
    "use strict";
    return this.gridCells[x][y];
};

/**
 * Constructs a JSON-compatible object representing the current state of this object.
 *
 * @public
 * @returns {Object} save A JSON-compatible object representing a save state.
 */
Automatune.Grid.prototype.getSaveState = function() {
    "use strict";
    
    return {
        instanceOf: "Grid",
        gridCells: (function() {
            var result = [];
            for (var i = 0; i < this.gridSize; i++) {
                for (var j = 0; j < this.gridSize; j++) {
                    result.push(this.gridCells[i][j].getSaveState());
                }
            }
            return result;
        }).call(this)
    };
};

