/**
 * Creates a grid cell
 * @alias GridCell
 * @class
 * @classdesc A cell on the game grid.
 * @param {Grid} pGrid The parent game grid.
 * @param {int} x The x position in the grid for this GridCell.
 * @param {int} y The y position in the grid for this GridCell.
 */
Automatune.GridCell = function(pGrid, x, y) {
    
    "use strict";
    
    assert(arguments.length === 3);
    
    /**
     * The parent {@linkcode Grid} of this GridCell.
     * @public
     * @type {Grid}
     */
    this.parentGrid;
    
    /**
     * The .
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The grid position of this GridCell.
     * @private
     * @type {Vector2}
     */
    var pos;
    
    /**
     * The {@linkcode Modifier|Modifiers} associated with this GridCell.
     * @private
     * @type {Modifier[]}
     */
    var modifiers;
    
    /**
     * The {@linkcode Component} associated with this GridCell, if any.
     * @private
     * @type {Component[]}
     */
    var component;
    
    /**
     * Append a {@linkcode Modifier} to this GridCell.
     * @public
     * @param {Modifier} mod The Modifier to append to this GridCell.
     */
    this.addModifier = function(mod) {
        
    };
    
    /**
     * Remove a {@linkcode Modifier} of a certain type from this GridCell.
     * If there are multiple Modifiers of this type, removes the oldest Modifier.
     * @public
     * @param {string} type The type of Modifier to remove from this GridCell.
     */
    this.removeModifier = function(type) {
        
    };
    
    /**
     * Returns true if this GridCell has a {@linkcode Modifier} of type 'type', otherwise returns false.
     * @public
     * @param {string} type The type of Modifier to check.
     * @returns {boolean} hasModifier
     */
    this.hasModifier = function(type) {
        
    };
    
    /**
     * Gets the first {@linkcode Modifier} of a certain type that is attached to this GridCell.
     * @public
     * @param {string} type The type of Modifier to check.
     */
    this.getModifier = function(type) {
        
    };
    
    /**
     * Returns true if this GridCell has a {@linkcode Component} of type 'type', otherwise returns false.
     * @public
     * @param {string} type The type of Component to check.
     * @returns {boolean} hasComponent 
     */
    this.hasComponent = function(type) {
        return component !== null;
    };
    
    /**
     * Gets the {@linkcode Component} that is attached to this GridCell.
     * If no Component is attached, returns null.
     * @public
     * @returns {Component} component
     */
    this.getComponent = function() {
        return component;
    };
    
    /**
     * Sets the {@linkcode Component} that is attached to this GridCell.
     * @public
     * @param {Component} ct The Component to attach to this GridCell.
     */
    this.setComponent = function(ct) {
        this.destroyComponent();
        component = ct;
        this.domElement.classList.add("active");
    };
    
    /**
     * Destroys the {@linkcode Component} that is attached to this GridCell, if any.
     * @public
     */
    this.destroyComponent = function(ct) {
        if (component) component.destroy();
        component = null;
        this.domElement.classList.remove("active");
    };

    /**
     * Calculate the CSS position of this cell in percentage points relative to the grid.
     * @public
     */
    this.getCSSPosition = function() {
        var g = this.parentGrid;
        var cx = (g.cellCSSWidth + g.cellCSSSpacing) * pos.x + g.cellCSSSpacing;
        var cy = (g.cellCSSWidth + g.cellCSSSpacing) * pos.y + g.cellCSSSpacing;
        
        return {x: cx, y: cy};
    };
    
    /**
     * Called when a {@linkcode Visitor} visits this GridCell.
     * Triggers the onVisit() event for the Component and all Modifiers attached to this GridCell.
     * @private
     * @param {Visitor} visitor The visitor that is visiting this GridCell.
     */
    this.onVisit = function(visitor) {
        if (component) component.onVisit.call(component, visitor);
        for (var i = 0; i < modifiers.length; i++) {
            modifiers[i].onVisit.call(modifiers[i], visitor);
        }
    };
    
    /**
     * Called when this GridCell is clicked.
     * @private
     */
    var onClick = function() {
        if (!this.hasComponent()) {
            this.setComponent(new Automatune.Component_Arrow(this, Automatune.O_RIGHT));
        } else {
            this.getComponent().rotateRight();
        }
    };
    
    // Initialize this GridCell instance.
    
    // Initialize variables
    this.parentGrid = pGrid;
    pos = {x: x, y: y};
    modifiers = [];
    component = null;
    
    // Initialize DOM Element
    var grid_size = this.parentGrid.getGridSize();
    var cell_spacing_percent = 10 / grid_size;
    var cell_size_percent = ((100 - cell_spacing_percent) / grid_size) - cell_spacing_percent;
    
    this.domElement = document.createElement("div");
    this.domElement.setAttribute("data-pos-x", x);
    this.domElement.setAttribute("data-pos-y", y);
    this.domElement.className = "gridCellDiv";
    var cssPos_x = (cell_size_percent + cell_spacing_percent) * x + cell_spacing_percent;
    var cssPos_y = (cell_size_percent + cell_spacing_percent) * y + cell_spacing_percent;
    this.domElement.style.left = cssPos_x + "%";
    this.domElement.style.top = cssPos_y + "%";
    this.domElement.style.width = cell_size_percent + "%";
    this.domElement.style.height = cell_size_percent + "%";
    this.domElement.style.padding = cell_spacing_percent + "%";
    
    this.parentGrid.domElement.appendChild(this.domElement);
    
    // Register onClick
    
    this.domElement.onclick = onClick.bind(this);
};

