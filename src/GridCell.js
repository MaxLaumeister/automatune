/**
 * Creates a grid cell
 *
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
     *
     * @public
     * @type {Grid}
     */
    this.parentGrid;
    
    /**
     * The DOM Element that visually represents this GridCell.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The grid position of this GridCell.
     *
     * @private
     * @type {Vector2}
     */
    this.pos;
    
    /**
     * The {@linkcode Modifier|Modifiers} associated with this GridCell.
     *
     * @private
     * @type {Modifier[]}
     */
    this.modifiers;
    
    /**
     * The {@linkcode Component} associated with this GridCell, if any.
     *
     * @private
     * @type {Component[]}
     */
    this.component;
    
    // Initialize this GridCell instance.
    
    // Initialize variables
    this.parentGrid = pGrid;
    this.pos = {x: x, y: y};
    this.modifiers = [];
    this.component = null;
    
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
    
    this.domElement.onclick = this.onClick.bind(this);
};

/**
 * Add a {@linkcode Modifier} to this GridCell.
 *
 * @public
 * @param {Modifier} mod The Modifier to add to this GridCell.
 */
Automatune.GridCell.prototype.addModifier = function(mod) {
    "use strict";
    this.modifiers.push(mod);
};

/**
 * Remove a {@linkcode Modifier} of a certain type from this GridCell.
 * If there are multiple Modifiers of this type, removes the oldest Modifier.
 *
 * @public
 * @param {string} type The type of Modifier to remove from this GridCell.
 */
Automatune.GridCell.prototype.removeModifier = function(type) {
    "use strict";
    for (var i = 0; i < this.modifiers.length; i++) {
        var m = this.modifiers[i];
        if (m.type === type) {
            this.modifiers.splice(i, 1); // Remove modifier from array
            return;
        }
    }
};

/**
 * Remove all {@linkcode Modifier|Modifiers} of a certain type from this GridCell.
 *
 * @public
 * @param {string} type The type of Modifier to remove from this GridCell.
 */
Automatune.GridCell.prototype.removeModifiers = function(type) {
    "use strict";
    for (var i = 0; i < this.modifiers.length; i++) {
        var m = this.modifiers[i];
        if (m.type === type) {
            this.modifiers.splice(i, 1); // Remove modifier from array
            i--; // Correct for removal
            m.destroy(); // Destroy modifier
        }
    }
};

/**
 * Returns true if this GridCell has a {@linkcode Modifier} of type 'type', otherwise returns false.
 *
 * @public
 * @param {string} type The type of Modifier to check.
 * @returns {boolean} hasModifier
 */
Automatune.GridCell.prototype.hasModifier = function(type) {
    "use strict";
    for (var i = 0; i < this.modifiers.length; i++) {
        var m = this.modifiers[i];
        if (m.type === type) {
            return true;
        }
    }
    return false;
};

/**
 * Gets the first {@linkcode Modifier} of a certain type that is attached to this GridCell.
 *
 * @public
 * @param {string} type The type of Modifier to check.
 * @returns {Modifier} mod The Modifier that is attached to this GridCell.
 */
Automatune.GridCell.prototype.getModifier = function(type) {
    
};

/**
 * Returns true if this GridCell has a {@linkcode Component} of type 'type', otherwise returns false.
 *
 * @public
 * @param {string} type The type of Component to check.
 * @returns {boolean} hasComponent 
 */
Automatune.GridCell.prototype.hasComponent = function(type) {
    "use strict";
    return this.component !== null;
};

/**
 * Gets the {@linkcode Component} that is attached to this GridCell.
 * If no Component is attached, returns null.
 *
 * @public
 * @returns {Component} component
 */
Automatune.GridCell.prototype.getComponent = function() {
    "use strict";
    return this.component;
};

/**
 * Sets the {@linkcode Component} that is attached to this GridCell.
 *
 * @public
 * @param {Component} ct The Component to attach to this GridCell.
 */
Automatune.GridCell.prototype.setComponent = function(ct) {
    "use strict";
    this.destroyComponent();
    this.component = ct;
    this.domElement.classList.add("active");
};

/**
 * Destroys the {@linkcode Component} that is attached to this GridCell, if any.
 *
 * @public
 */
Automatune.GridCell.prototype.destroyComponent = function() {
    "use strict";
    if (this.component) this.component.destroy();
    this.component = null;
    this.domElement.classList.remove("active");
};

/**
 * Calculate the CSS position of this cell in percentage points relative to the grid.
 *
 * @public
 * @returns {Vector2} pos The CSS position of this cell.
 */
Automatune.GridCell.prototype.getCSSPosition = function() {
    "use strict";
    var g = this.parentGrid;
    var cx = (g.cellCSSWidth + g.cellCSSSpacing) * this.pos.x + g.cellCSSSpacing;
    var cy = (g.cellCSSWidth + g.cellCSSSpacing) * this.pos.y + g.cellCSSSpacing;
    
    return {x: cx, y: cy};
};

/**
 * Called when a {@linkcode Visitor} visits this GridCell.
 * Triggers the onVisit() event for the Component and all Modifiers attached to this GridCell.
 *
 * @private
 * @param {Visitor} visitor The visitor that is visiting this GridCell.
 */
Automatune.GridCell.prototype.onVisit = function(visitor) {
    "use strict";
    if (this.component) this.component.onVisit(visitor);
    for (var i = 0; i < this.modifiers.length; i++) {
        this.modifiers[i].onVisit(visitor);
    }
};

/**
 * Called when this GridCell is clicked.
 *
 * @private
 */
Automatune.GridCell.prototype.onClick = function() {
    "use strict";
    if (!this.hasComponent()) {
        this.setComponent(new Automatune.Component_Arrow(this, Automatune.O_RIGHT));
    } else {
        this.getComponent().rotateRight();
    }
};

