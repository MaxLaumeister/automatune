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
    
    /**
     * Steps this Visitor forward, sending it on its way to the next grid cell.
     *
     * @private
     */
    this.update = function() {
        var grid = this.parentGame.grid;
        var delta = Automatune.util.getOrientationDelta(this.orientation);
        if (!grid.isInBounds(this.pos.x + delta.x, this.pos.y + delta.y)) {
            this.orientation = Automatune.util.getOpposite(this.orientation);
            delta = Automatune.util.getOrientationDelta(this.orientation);
        }
        var destination = {x: this.pos.x + delta.x, y: this.pos.y + delta.y};
        this.updateCSSPosition();
        
        this.pos = {x: this.pos.x + delta.x, y: this.pos.y + delta.y};
        this.parentGame.grid.getCell(this.pos.x, this.pos.y).onVisit(this);
    };
    
    /**
     * Updates the element's CSS position to reflect its grid position.
     *
     * @private
     */
    this.updateCSSPosition = function() {
        var cssPos = this.parentGame.grid.getCell(this.pos.x, this.pos.y).getCSSPositionAbsolute();
        var cssTransform = "translate(" + cssPos.x + "px, " + cssPos.y + "px)";
        this.domElement.style["-webkit-transform"] = cssTransform;
        this.domElement.style.transform = cssTransform;
    };
    
    /**
     * Constructs a JSON-compatible object representing the current state of this object.
     *
     * @public
     * @returns {Object} save A JSON-compatible object representing a save state.
     */
    this.getSaveState = function() {
        return {
            instanceOf: "Visitor",
            pos: this.pos,
            orientation: this.orientation
        };
    };
    
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
    var ms = this.parentGame.getTickMs();
    this.domElement.style["webkit-transition"] = "-webkit-transform " + ms + "ms linear";
    this.domElement.style.transition = "transform " + ms + "ms linear";
};

