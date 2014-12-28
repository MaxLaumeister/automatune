/**
 * Initializes Automatune on a div.
 * @class
 * @classdesc The main Automatune class.
 * @param {HTMLElement} domEl The DOM Element (a div) that Automatune should render in.
 * @param {int} size The width/height (in cells) of the square grid.
 */
function Automatune(domEl, size) {
    
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
    this.grid = new Automatune.Grid(domEl, size);
    
}

// Initialize Automatune
$(document).ready(function() {
    new Automatune(document.getElementById("automatune"), 7);
});
