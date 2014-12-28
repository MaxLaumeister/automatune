/**
 * Creates a grid cell
 * @alias GridCell
 * @class
 * @classdesc A cell on the game grid.
 * @param {Grid} grid The parent game grid.
 * @param {int} x The x position in the grid for this GridCell.
 * @param {int} y The y position in the grid for this GridCell.
 */
Automatune.GridCell = function(grid, x, y) {
    
    /**
     * The parent {@linkcode Grid} of this GridCell.
     * @private
     */
    var parentGrid;
    
    /**
     * The DOM Element that visually represents this GridCell.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The grid position of this GridCell.
     * @private
     * @type {temp}
     */
    var pos;
    
    /**
     * The {@linkcode Component|Components} associated with this GridCell.
     * @private
     * @type {Component[]}
     */
    var components;
    
    /**
     * Append a {@linkcode Component} to this GridCell.
     * @public
     * @param {Component} ct The Component to append to this GridCell.
     */
    this.appendComponent = function(ct) {
        
    };
    
    /**
     * Remove a {@linkcode Component} from this GridCell.
     * @public
     * @param {string} type The type of Component to remove from this GridCell.
     */
    this.removeComponent = function(type) {
        
    };
    
    /**
     * Returns true if this GridCell has a {@linkcode Component} of type 'type', otherwise returns false.
     * @public
     * @param {string} type The type of Component to check.
     * @returns {boolean} hasComponent 
     */
    this.hasComponent = function(type) {
        
    };
    
    /**
     * Gets the first {@linkcode Component} of a certain type that is attached to this GridCell.
     * @public
     * @param {string} type The type of Component to check.
     */
    this.getComponent = function(type) {
        
    };
    
    /**
     * Called when a {@linkcode Visitor} visits this GridCell.
     * Triggers the onVisit() event for all Components attached to this GridCell.
     * @private
     */
    this.onVisit = function() {
    
    };
    
    
    
    // Initialize this GridCell instance.
    
    // Initialize variables
    parentGrid = grid;
    pos = {x: x, y: y};
    components = [];
    
    // Initialize DOM Element
    var grid_size = parentGrid.getGridSize();
    var cell_spacing_percent = 10 / grid_size;
    var cell_width_percent = ((100 - cell_spacing_percent) / grid_size) - cell_spacing_percent;
    var cell_height_percent = ((100 - cell_spacing_percent) / grid_size) - cell_spacing_percent;
    
    this.domElement = document.createElement("div");
    this.domElement.setAttribute("data-pos-x", x);
    this.domElement.setAttribute("data-pos-y", y);
    this.domElement.className = "gridCellDiv";
    var cssPos_x = (cell_width_percent + cell_spacing_percent) * x + cell_spacing_percent;
    var cssPos_y = (cell_height_percent + cell_spacing_percent) * y + cell_spacing_percent;
    this.domElement.style.left = cssPos_x + "%";
    this.domElement.style.top = cssPos_y + "%";
    this.domElement.style.width = cell_width_percent + "%";
    this.domElement.style.height = cell_height_percent + "%";
    
    parentGrid.domElement.appendChild(this.domElement);
        
};
