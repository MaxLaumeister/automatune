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
     * A simple object containing each of the playback control buttons.
     *
     * @private
     * @type {HTMLElements}
     */
    this.playbackButtons;
    
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
    this.updateTargets;
    
    /**
     * The interval that calls update on the updateTargets.
     *
     * @private
     * @type {intervalID}
     */
    this.updateInterval;
    
    /**
     * The amount of milliseconds between "ticks" of the Automatune simulation.
     *
     * @private
     * @type {float}
     */
    this.tickMs;
    
    // TODO doc
    this.playing = false;
    
    // Initialize this Automatune instance.
    
    // Initialize variables
    this.updateTargets = [];
    this.tickMs = Automatune.TICK_NORMAL;
    this.domElement = domEl;
    this.playbackElement = playbackEl;
    this.grid = new Automatune.Grid(this, size);
    
    // Attach menu system
    new Automatune.Menu(this, menuEl);
    
    // Attach playback onclick events
    this.playbackButtons = {};
    for (var i = 0; i < playbackEl.childNodes.length; i++) {
        var el = playbackEl.childNodes[i];
        
        if (!el.classList) continue;
        
        if (el.classList.contains("playback-play")) {
            this.playbackButtons.playButton = el;
        } else if (el.classList.contains("playback-pause")) {
            this.playbackButtons.pauseButton = el;
        } else if (el.classList.contains("playback-reset")) {
            this.playbackButtons.resetButton = el;
        }
    }
    // Make sure all the buttons are there
    assert(     
        this.playbackButtons.playButton &&
        this.playbackButtons.pauseButton &&
        this.playbackButtons.resetButton
    );
    this.playbackButtons.playButton.onclick = this.play.bind(this);
    this.playbackButtons.pauseButton.onclick = this.pause.bind(this);
    this.playbackButtons.resetButton.onclick = this.reset.bind(this);
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

/**
 * Updates all active actors (e.g. {@linkcode Visitor|Visitors}, {@linkcode Component|Components},
 * and {@linkcode Modifier|Modifiers} in the system, simulating a step.
 *
 * @private
 */
Automatune.prototype.update = function() {
    "use strict";
    for (var i = 0; i < this.updateTargets.length; i++) {
        var target = this.updateTargets[i];
        target.update();
    }
};

/**
 * Sets the number of milliseconds between ticks in the Automatune simulation.
 *
 * @public
 * @param {float} ms Milliseconds between ticks.
 */
Automatune.prototype.setTickMs = function(ms) {
    "use strict";
    
    this.tickMs = ms;
    // Update targets tick ms
    for (var i = 0; i < this.updateTargets.length; i++) {
        this.updateTargets[i].updateTickMs();
    }
    
    if (this.playing) {
        window.clearInterval(this.updateInterval);
        this.updateInterval = window.setInterval(this.update.bind(this), this.tickMs);
    }
    
};

/**
 * Gets the number of milliseconds between ticks in the Automatune simulation.
 *
 * @public
 * @returns {float} ms Milliseconds between ticks.
 */
Automatune.prototype.getTickMs = function() {
    "use strict";
    return this.tickMs;
};

//TODO doc
Automatune.prototype.resetPlaybackButtons = function() {
    "use strict";
    this.playbackButtons.playButton.classList.remove("active");
    this.playbackButtons.pauseButton.classList.remove("active");
    this.playbackButtons.resetButton.classList.remove("active");
};

/**
 * Plays the Automatune by starting all {@linkcode Visitor|Visitors},
 * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}.
 *
 * @public
 */
Automatune.prototype.play = function() {
    "use strict";
    if (!this.playing) {
        this.playing = true;
        this.resetPlaybackButtons();
        this.playbackButtons.playButton.classList.add("active");
        this.updateInterval = window.setInterval(this.update.bind(this), this.tickMs);
        this.update();
    }
};

/**
 * Pauses the Automatune by stopping all {@linkcode Visitor|Visitors},
 * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}.
 *
 * @public
 */
Automatune.prototype.pause = function() {
    "use strict";
    this.playing = false;
    this.resetPlaybackButtons();
    this.playbackButtons.pauseButton.classList.add("active");
    window.clearInterval(this.updateInterval);
};

/**
 * Resets all {@linkcode Visitor|Visitors},
 * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}
 * to their original position and orientation.
 *
 * @public
 */
Automatune.prototype.reset = function() {
    "use strict";
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
Automatune.prototype.createVisitor = function(x, y, orientation) {
    "use strict";
    var vis = new Automatune.Visitor(this, x, y, orientation);
    this.updateTargets.push(vis);
};

/**
 * Constructs a JSON-compatible object representing the current state of the entire game.
 *
 * @public
 * @returns {Object} save A JSON-compatible object representing a save state.
 */
Automatune.prototype.getSaveState = function() {
    "use strict";
    
    var self = this;
    
    function getUpdateTargets() {
        var result = [];
        for (var i = 0; i < self.updateTargets.length; i++) {
            result.push(self.updateTargets[i].getSaveState());
        }
        return result;
    }
    
    return {
        version: "prototype",
        tickMs: self.tickMs,
        updateTargets: getUpdateTargets(),
        grid: self.grid.getSaveState()
    };
};

