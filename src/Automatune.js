/**
 * Initializes Automatune on a div.
 * @class
 * @classdesc The main Automatune class.
 * @param {HTMLElement} domEl The DOM Element (a div) that Automatune should render in.
 * @param {int} size The width/height (in cells) of the square grid.
 */
function Automatune(domEl, size) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    /**
     * The DOM Element that contains the Automatune game.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The {@linkcode Grid} that contains the {@linkcode GridCell|GridCells} of this Automatune instance.
     * @public
     * @type {Grid}
     */
    this.grid;
    
    /**
     * Objects to call update() on every step.
     * @private
     * @type {Object[]}
     */
    var updateTargets;
    
    /**
     * Updates all active actors (e.g. {@linkcode Visitor|Visitors} and {@linkcode Component|Components})
     * in the system, simulating a step.
     * @private
     */
    function update() {
        
    }
    
    
    
    // Initialize this Automatune instance.
    
    // Initialize variables
    updateTargets = [];
    this.domElement = domEl;
    this.grid = new Automatune.Grid(this, size);
    
}

// Initialize Automatune
$(document).ready(function() {
    "use strict";
    new Automatune(document.getElementById("automatune"), 7);
});

