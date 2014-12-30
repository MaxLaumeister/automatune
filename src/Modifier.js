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
    
    /**
     * The DOM Element that visually represents this Modifier.
     *
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    //TODO docs
    this.type;
    
    
    
    // Initialize variables
    
    this.parentCell = pCell;
    this.type = "abstract";
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

//TODO docs
/**
 * Creates a new Note modifier.
 * @alias Modifier_Note
 * @class
 * @classdesc A modifier that plays an audible note when visited by a {@linkcode Visitor}.
 * @extends Modifier
 */
Automatune.Modifier_Note = function(pCell, noteName) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    Automatune.Modifier.call(this, pCell);
    
    // TODO docs
    this.howl;
    
    
    
    // Initialize Varaibles
    
    this.type = "note";
    
    var sndpath = "snd/piano/Piano.mf.";
    
    this.howl = new Howl({
        urls: [
            sndpath + noteName + '.mp3',
            sndpath + noteName + '.ogg'
        ],
        volume: 0.7
    });
    
};
Automatune.util.extend(Automatune.Modifier, Automatune.Modifier_Note);

//TODO docs
Automatune.Modifier_Note.prototype.onVisit = function(visitor) {
    "use strict";
    this.howl.play();
};

