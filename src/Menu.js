/**
 * Initializes the Automatune main and context menus.
 *
 * @alias Menu
 * @class
 * @classdesc Manages the Automatune main and context menus.
 * @param {Automatune} pGame The main Automatune instance.
 * @param {HTMLElement} menuEl The DOM Element of the main Automatune menu bar.
 */
Automatune.Menu = function(pGame, menuEl) {
    
    "use strict";
    
    assert(arguments.length === 2);
    
    /**
     * The parent Automatune game instance.
     *
     * @public
     * @type {Automatune}
     */
    this.parentGame;
    
    /**
     * The "Menu Bar" DOM Element, containing the menus.
     *
     * @public
     * @type {HTMLElement}
     */
    this.menuDomElement;
    
    // Initialize variables
    
    this.parentGame = pGame;
};

