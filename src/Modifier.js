/**
 * @alias Modifier
 * @abstract
 * @class
 * @classdesc A modifier that gets attached to a grid cell, such as a {@linkcode Component_Note|Note}. A {@linkcode GridCell} may have one or more modifiers.
 * @param {GridCell} pCell The parent grid cell.
 */
Automatune.Modifier = function(pCell) {
    
    "use strict";
    
    assert(arguments.length === 1);
    
    /**
     * The parent {@linkcode GridCell} of this Component.
     *
     * @public
     * @type {GridCell}
     */
    this.parentCell;
    
    
    
    // Initialize variables
    
    this.parentCell = pCell;
};

/**
 * Returns the name of the class that this object is an instance of.
 *
 * @public
 * @returns {string} className The name of the class that this object is an instance of.
 */
Automatune.Modifier.prototype.getClassName = function() {
    "use strict";
    return "Automatune.Modifier";
};

/**
 * Appends this Modifier to a {@linkcode GridCell}.
 *
 * @public
 * @param {GridCell} gridCell The GridCell to append this Component to.
 */
Automatune.Modifier.prototype.appendTo = function(gridCell) {
    
};

/**
 * Defines what this Modifier should do when visited.
 *
 * @private
 * @param {Visitor} visitor The visitor that is currently visiting this Component.
 */
Automatune.Modifier.prototype.onVisit = function(visitor) {
    "use strict";
    throw "onVisit called on a Modifier that does not implement onVisit.";
};

/**
 * Destroys this Modifier, removing it from its {@linkcode GridCell}.
 *
 * @public
 */
Automatune.Modifier.prototype.destroy = function() {

};

/**
 * Creates a new Note modifier.
 * @alias Modifier_Note
 * @class
 * @classdesc A modifier that plays an audible note when visited by a {@linkcode Visitor}.
 * @extends Modifier
 * @param {GridCell} pCell The parent cell of this Note Modifier.
 * @param {string} noteName The pitch of this Modifier's note, e.g. "Eb6".
 */
Automatune.Modifier_Note = function(pCell, noteName) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    Automatune.Modifier.call(this, pCell);
    
    /**
     * The DOM Element that visually represents this Note Modifier.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    /**
     * The pitch of this Modifier's note, e.g. "Eb6".
     *
     * @private
     * @type {string}
     */
    this.noteName;
    
    /**
     * The Howler.js sound instance associated with this Note Modifier.
     *
     * @private
     * @type {Howl}
     */
    this.howl;
    
    
    
    
    // Initialize Varaibles
    
    this.noteName = noteName;
    
    var sndpath = "snd/piano/Piano.mf.";
    
    this.howl = new Howl({
        urls: [
            sndpath + noteName + '.mp3',
            sndpath + noteName + '.ogg'
        ],
        volume: 0.7
    });
    
    // Show DOM Element
    this.domElement = document.createElement("div");
    this.domElement.className = "tileicon note";
    this.parentCell.domElement.appendChild(this.domElement);
    
};
Automatune.util.extend(Automatune.Modifier, Automatune.Modifier_Note);

/**
 * Returns the name of the class that this object is an instance of.
 *
 * @public
 * @returns {string} className The name of the class that this object is an instance of.
 */
Automatune.Modifier_Note.prototype.getClassName = function() {
    "use strict";
    return "Automatune.Modifier_Note";
};

Automatune.Modifier_Note.prototype.onVisit = function(visitor) {
    "use strict";
    this.howl.play();
    
    var div = document.createElement("div");
    div.classList.add("floatnote");
    this.parentCell.domElement.appendChild(div);
    (function(d){
        var player = div.animate([
            {transform: "scale(0.15)", opacity: 1},
            {transform: "scale(1.75)", opacity: 0}
        ], {
            duration: 1000
        });
        player.onfinish = function(e) {
            d.parentNode.removeChild(d);
        };
    })(div);
};

Automatune.Modifier_Note.prototype.destroy = function() {
    "use strict";
    this.domElement.parentNode.removeChild(this.domElement);
};

/**
 * Constructs a JSON-compatible object representing the current state of this object.
 *
 * @public
 * @returns {Object} save A JSON-compatible object representing a save state.
 */
Automatune.Modifier_Note.prototype.getSaveState = function() {
    "use strict";
    return {
        instanceOf: this.getClassName(),
        noteName: this.noteName
    };
};

