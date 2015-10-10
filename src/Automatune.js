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
    
    /**
     * Whether this Automatune simulation is currently running.
     *
     * @private
     * @type {float}
     */
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
    
    // Pause when page is hidden (with polyfill)
    var hidden, visibilityChange; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    
    document.addEventListener(visibilityChange, (function() {
        if (document[hidden]) {
            this.pause();
            Howler.mute();
        } else {
            Howler.unmute();
        }
    }).bind(this), false);
}

/**
 * Returns the name of the class that this object is an instance of.
 *
 * @public
 * @returns {string} className The name of the class that this object is an instance of.
 */
Automatune.prototype.getClassName = function() {
    "use strict";
    return "Automatune";
};

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

/**
 * Removes the "active" class from all playback buttons, making them appear
 * inactive to the user. Generally used before activating a particular button.
 *
 * @private
 */
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

/* // (When implemented, enable as a jsdoc)
 * Resets all {@linkcode Visitor|Visitors},
 * {@linkcode Component|Components}, and {@linkcode Modifier|Modifiers}
 * to their original position and orientation.
 *
 * @public
 */
Automatune.prototype.reset = function() {
    "use strict";
    // Not yet implemented
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
 * Destroys the {@linkcode Visitor} at a specific {x, y} grid position.
 *
 * @public
 * @param {int} x The grid x coordinate of the Visitor to delete.
 * @param {int} y The grid y coordinate of the Visitor to delete.
 */
Automatune.prototype.destroyVisitor = function(x, y) {
    "use strict";
    for (var i = 0; i < this.updateTargets.length; i++) {
        var vis = this.updateTargets[i];
        if (vis.pos.x === x && vis.pos.y === y) {
            this.updateTargets.splice(i, 1); // Remove visitor from array
            i--; // Correct for removal
            vis.destroy();
        }
    }
};

/**
 * Destroys the current grid including all visitors, components, etc., and initializes a new grid of a specific size.
 * 
 * @public
 * @param {int} size The width/height of the new grid to be created.
 */
Automatune.prototype.newGrid = function(size) {
    "use strict";
    
    // Destroy all update targets
    for (var i = 0; i < this.updateTargets.length; i++) {
        this.updateTargets[i].destroy();
    }
    this.updateTargets = [];
    
    // Destroy the old grid
    this.grid.destroy();
    
    // Create a new grid
    this.grid = new Automatune.Grid(this, size);
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
        info: "Automatune Save File - www.automatune.com",
        save: {
            version: "alpha1",
            data: {
                date: Date.now(),
                tickMs: self.tickMs,
                updateTargets: getUpdateTargets(),
                grid: self.grid.getSaveState()
            }
        }
    };
};

/**
 * Applies a save state to this Automatune instance, overwriting the tune that is currently open.
 *
 * @public
 * @param {Object} o The save state object to apply.
 */
Automatune.prototype.applySaveState = function(o) {
    "use strict";
    
    try {
        o = o.save.data;
            
        // Set tick speed
        this.setTickMs(o.tickMs);
        
        // Clear Grid
        this.newGrid(o.grid.size);
        
        // Create Visitors
        for (var i = 0; i < o.updateTargets.length; i++) {
            var visSave = o.updateTargets[i];
            this.createVisitor(visSave.pos.x, visSave.pos.y, visSave.orientation);
        }
        
        // Apply Grid
        this.grid.applySaveState(o.grid);
        
    } catch(err) {
        console.error("Loading of save state failed. The save is either corrupt or incompatible with this version of Automatune.");
        console.error("The exception produced was: ");
        throw err;
    }
};

/**
 * Saves the current game state to a file (download) on the user's computer.
 *
 * @public
 */
Automatune.prototype.downloadSaveState = function() {
    "use strict";
    download(JSON.stringify(this.getSaveState(), null, 4), "tune.atune", "text/plain");
};

/**
 * Shows the user a sharing URL that represents the current save state.
 *
 * @public
 */
Automatune.prototype.getSharingURL = function() {
    "use strict";
    // TODO: Display a sharing url in a dialog
    var state = JSON.stringify(this.getSaveState());
    var encodedState = LZMA.compress(state, 1, function(result) {
        for (var i in result) {
            result[i] += 128;
        }
        var str = String.fromCharCode.apply(null,result);
        var finalUrl = "http://www.automatune.com/app/?state=" + encodeURIComponent(btoa(str));
        var docstr = "<div><p>Here's your sharing URL!<br />(" + (navigator.userAgent.indexOf('Mac OS X') != -1 ? "cmd" : "ctrl") + "-c to copy it)</p>" +
        "<input type='text' style='width: 100%;' onfocus='this.select();' onmouseup='return false;' value='" + finalUrl + "'></div>";
        $(docstr).dialog();
    });
};

/**
 * Loads a save state from the "state" url component.
 *
 * @public
 */
Automatune.prototype.loadFromUrlComponent = function(encstate) {
    "use strict";
    try {
        var self = this;
        var strstate = atob(decodeURIComponent(encstate));
        var bytearray = [];
        for (var i = 0; i < strstate.length; i++) {
            bytearray.push(strstate.charCodeAt(i) - 128);
        }
        LZMA.decompress(bytearray, function(result) {
            self.applySaveState(JSON.parse(result));
        });
    } catch(err) {
        $("<p>Sorry, the URL seems to be invalid, so we couldn't load that tune :(</p>").dialog(); 
        console.error("Loading of save state from URL failed. The URL is either corrupt or contains a save that is incompatible with this version of Automatune.");
        console.error("The exception produced was: ");
        throw err;
    }
};

// Initialize Automatune
$(document).ready(function() {
    "use strict";
    var el = document.getElementById("automatune");
    var pb = document.getElementsByClassName("playback-controls")[0];
    var mn = document.getElementById("menubar");
    var AutomatuneInst = new Automatune(el, pb, mn, 7);
    
    AutomatuneInst.loadFromUrlComponent(getUrlParameter("state"));
    
    AutomatuneInst.createVisitor(3, 4, Automatune.O_RIGHT);
    if (Automatune.browserSupported) AutomatuneInst.play();
});

/**
 * Whether the user's web browser is supported by Automatune.
 *
 * @public
 * @static
 */
Automatune.browserSupported = 
        (
            bowser.chrome ||
            bowser.firefox ||
            (bowser.msie && bowser.version >= 11)
        ) &&
        !bowser.mobile &&
        !bowser.tablet;

