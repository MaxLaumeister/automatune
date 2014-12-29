/**
 * Initializes the Automatune main and context menus.
 * @alias Menu
 * @class
 * @classdesc Manages the Automatune main and context menus.
 * @param {Automatune} pGame The main Automatune instance.
 */
Automatune.Menu = function(pGame) {
    
    "use strict";
    
    /**
     * The parent Automatune game instance.
     * @public
     * @type {Automatune}
     */
    this.parentGame;
    
    /**
     * The DOM Element that this Menu applies to.
     * @public
     * @type {HTMLElement}
     */
    this.domElement;
    
    // Initialize variables
    
    this.parentGame = pGame;
    this.domElement = this.parentGame.domElement;
};

