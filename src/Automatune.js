/**
 * Initializes Automatune on a div.
 * @class
 * @classdesc The main Automatune class.
 */
function Automatune(domEl, size) {
    
    /**
     * The Grid that contains the GridCells of this Automatune instance.
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
     * Updates all active actors (e.g. {@link Visitor}s and {@link Component}s)
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
