/**
 * Initializes Automatune on a div.
 *
 * @class
 * @classdesc The main Automatune class.
 * @param {HTMLElement} domEl The DOM Element (a square div) that Automatune should render in.
 * @param {HTMLElement} playbackEl The DOM Element that contains the Automatune playback controls.
 * @param {HTMLElement} menuEl The DOM Element that contains the Automatune menu bar.
 * @param {int} size The width/height (in cells) of the square grid.
 */
function Automatune(domEl, playbackEl, menuEl, size) {
    
    "use strict";
    
    assert(arguments.length === 4);
    
    /**
     * The DOM Element that contains the Automatune game.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The DOM Element that contains the Automatune playback controls.
     *
     * @public
     * @type {HTMLElement}
     */
    this.playbackElement;
    
    /**
     * The {@linkcode Grid} that contains the {@linkcode GridCell|GridCells} of this Automatune instance.
     *
     * @public
     * @type {Grid}
     */
    this.grid;
    
    /**
     * Objects to call update() on every step.
     *
     * @private
     * @type {Object[]}
     */
    var updateTargets;
    
    /**
     * The interval that calls update on the updateTargets.
     *
     * @private
     * @type {intervalID}
     */
    var updateInterval;
    
    /**
     * The amount of milliseconds between "ticks" of the Automatune simulation.
     *
     * @private
     * @type {float}
     */
    var tickMs;
    
    /**
     * Updates all active actors (e.g. {@linkcode Visitor|Visitors}, {@linkcode Component|Components},
     * and {@linkcode Modifier|Modifiers} in the system, simulating a step.
     *
     * @private
     */
    function update() {
        for (var i = 0; i < updateTargets.length; i++) {
            var target = updateTargets[i];
            target.update();
        }
    }
    
    /**
     * Sets the number of milliseconds between ticks in the Automatune simulation.
     *
     * @public
     * @param {float} ms Milliseconds between ticks.
     */
    this.setTickMs = function(ms) {
        window.clearInterval(updateInterval);
        tickMs = ms;
        updateInterval = window.setInterval(update, tickMs);
    };
    
    /**
     * Gets the number of milliseconds between ticks in the Automatune simulation.
     *
     * @public
     * @returns {float} ms Milliseconds between ticks.
     */
    this.getTickMs = function() {
        return tickMs;
    };
    
    var playing = false;
    /**
     * Plays the Automatune by starting all {@linkcode Visitor|Visitors},
     * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}.
     *
     * @public
     */
    this.play = function() {
        if (!playing) {
            playing = true;
            updateInterval = window.setInterval(update, tickMs);
            update();
        }
    };
    
    /**
     * Constructs a JSON-compatible object representing the current state of the entire game.
     *
     * @public
     * @returns {Object} save A JSON-compatible object representing a save state.
     */
    this.getSaveState = function() {
        return {
            version: "prototype",
            tickMs: tickMs,
            updateTargets: (function() {
                var result = [];
                for (var i = 0; i < updateTargets.length; i++) {
                    result.push(updateTargets[i].getSaveState());
                }
                return result;
            })(),
            grid: this.grid.getSaveState()
        };
    };
    
    /**
     * Pauses the Automatune by stopping all {@linkcode Visitor|Visitors},
     * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}.
     *
     * @public
     */
    this.pause = function() {
        playing = false;
        window.clearInterval(updateInterval);
    };
    
    /**
     * Resets all {@linkcode Visitor|Visitors},
     * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}
     * to their original position and orientation.
     *
     * @public
     */
    this.reset = function() {
        // TODO: Implement
    };
    
    /**
     * Creates a new {@linkcode Visitor} on the Automatune grid.
     *
     * @public
     * @param {int} x The grid x coordinate for the new Visitor.
     * @param {int} y The grid y coordinate for the new Visitor.
     * @param {Orientation} orientation The {@linkcode Orientation} for the new Visitor.
     */
    this.createVisitor = function(x, y, orientation) {
        var vis = new Automatune.Visitor(this, x, y, orientation);
        updateTargets.push(vis);
    };
    
    
    // Initialize this Automatune instance.
    
    // Initialize variables
    updateTargets = [];
    tickMs = Automatune.TICK_NORMAL;
    this.domElement = domEl;
    this.playbackElement = playbackEl;
    this.grid = new Automatune.Grid(this, size);
    
    // Attach menu system
    new Automatune.Menu(this, menuEl);
    
    // Attach playback onclick events
    var playButton;
    var pauseButton;
    var resetButton;
    for (var i = 0; i < playbackEl.childNodes.length; i++) {
        var el = playbackEl.childNodes[i];
        
        if (!el.classList) continue;
        
        if (el.classList.contains("playback-play")) {
            playButton = el;
        } else if (el.classList.contains("playback-pause")) {
            pauseButton = el;
        } else if (el.classList.contains("playback-reset")) {
            resetButton = el;
        }
    }
    assert(playButton && pauseButton && resetButton); // Make sure all the buttons are there
    playButton.onclick = this.play;
    pauseButton.onclick = this.pause;
    resetButton.onclick = this.reset;
}

// Initialize Automatune
$(document).ready(function() {
    "use strict";
    var el = document.getElementById("automatune");
    var pb = document.getElementsByClassName("playback-controls")[0];
    var mn = document.getElementById("menubar");
    var AutomatuneInst = new Automatune(el, pb, mn, 7);
    AutomatuneInst.createVisitor(3, 4, Automatune.O_RIGHT);
    AutomatuneInst.play();
    console.log("SaveState: ", AutomatuneInst.getSaveState());
});

