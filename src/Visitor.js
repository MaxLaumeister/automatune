/**
 * Create a new visitor
 *
 * @alias Visitor
 * @class
 * @classdesc A circle that visits GridCells on the game grid.
 * @param {Automatune} pGame The parent game instance.
 * @param {int} x The initial x position in the grid for the Visitor.
 * @param {int} y The initial y position in the grid for the Visitor.
 * @param {Orientation} orient The starting {@linkcode Orientation} of the Visitor.
 */
Automatune.Visitor = function(pGame, x, y, orient) {
    
    "use strict";
    
    assert(arguments.length === 4);
    
    /**
     * The parent {@linkcode Automatune} instance of this Visitor.
     *
     * @public
     * @type {Automatune}
     */
    this.parentGame;
    
    /**
     * The DOM Element that visually represents this Visitor.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The current grid position of this Visitor.
     *
     * @public
     * @type {Object}
     */
    this.pos;
    
    /**
     * The {@linkcode Orientation} (right, up, left, or down) of this Visitor.
     *
     * @private
     * @type {Orientation}
     */
    this.orientation;
    
    // Initialize variables
    
    this.parentGame = pGame;
    this.pos = {x: x, y: y};
    this.orientation = orient;
    
    // Initialize DOM
    
    this.domElement = document.createElement("div");
    this.domElement.className = "gridVisitor";
    var grid = this.parentGame.grid;
    this.domElement.style.width = grid.cellCSSWidth + "%";
    this.domElement.style.height = grid.cellCSSWidth + "%";
    this.updateCSSPosition();
    this.parentGame.domElement.appendChild(this.domElement);
    
    // Initialize DOM Transition
    this.updateTickMs();
};

/**
 * Returns the name of the class that this object is an instance of.
 *
 * @public
 * @returns {string} className The name of the class that this object is an instance of.
 */
Automatune.Visitor.prototype.getClassName = function() {
    "use strict";
    return "Automatune.Visitor";
};

/**
 * Steps this Visitor forward, sending it on its way to the next grid cell.
 *
 * @private
 */
Automatune.Visitor.prototype.update = function() {
    "use strict";
    this.parentGame.grid.getCell(this.pos.x, this.pos.y).onVisit(this);
    
    var grid = this.parentGame.grid;
    var delta = Automatune.util.getOrientationDelta(this.orientation);
    if (!grid.isInBounds(this.pos.x + delta.x, this.pos.y + delta.y)) {
        this.orientation = Automatune.util.getOpposite(this.orientation);
        delta = Automatune.util.getOrientationDelta(this.orientation);
    }
    this.pos = {x: this.pos.x + delta.x, y: this.pos.y + delta.y};
    this.updateCSSPosition();
};

/**
 * Updates the element's CSS position to reflect its grid position.
 *
 * @private
 */
Automatune.Visitor.prototype.updateCSSPosition = function() {
    "use strict";
    var cell_width_percent = this.parentGame.grid.cellCSSWidth;
    
    var cssPos = this.parentGame.grid.getCell(this.pos.x, this.pos.y).getCSSPosition();
    var factor = 100 / cell_width_percent;
    
    cssPos = {
        x: cssPos.x * factor,
        y: cssPos.y * factor
    };
    
    var cssTransform = "translate(" + cssPos.x + "%, " + cssPos.y + "%)";
    this.domElement.style["-webkit-transform"] = cssTransform;
    this.domElement.style.transform = cssTransform;
};

/**
 * Notifies this visitor that the simulation speed (tickMs) has changed,
 * and to update accordingly.
 *
 * @public
 */
Automatune.Visitor.prototype.updateTickMs = function() {
    "use strict";
    var ms = this.parentGame.getTickMs();
    this.domElement.style["webkit-transition"] = "-webkit-transform " + ms + "ms linear";
    this.domElement.style.transition = "transform " + ms + "ms linear";
};

/**
 * Removes this Visitor from the DOM.
 *
 * @private
 */
Automatune.Visitor.prototype.destroy = function() {
    "use strict";
    this.domElement.parentNode.removeChild(this.domElement);
};

/**
 * Constructs a JSON-compatible object representing the current state of this object.
 *
 * @public
 * @returns {Object} save A JSON-compatible object representing a save state.
 */
Automatune.Visitor.prototype.getSaveState = function() {
    "use strict";
    return {
        pos: this.pos,
        orientation: this.orientation
    };
};

