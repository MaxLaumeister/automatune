/**
 * @alias Component
 * @abstract
 * @class
 * @classdesc A component that goes on a grid cell, such as an arrow or note.
 */
Automatune.Component = function() {
    /**
     * The type of component (arrow, note, etc.)
     * @private
     * @type {string}
     */
    var type;
    
    /**
     * The DOM Element that visually represents this Component.
     * @private
     * @type {HTMLElement}
     */
    var domElement;
    
    /**
     * Returns the type of the component (arrow, note, etc.)
     * @public
     */
    this.getType = function(){
        return type;
    };
    
    /**
     * Appends this Component to a GridCell
     * @public
     */
    this.appendTo = function(gridCell) {
        
    };
    
    /**
     * Defines what the Component should do when visited
     * @private
     */
    this.onVisit = function(visitor) {
        
    };
    
    /**
     * Destroys this Component, removing it from its GridCell.
     * @public
     */
    this.destroy = function() {
    
    };
};

/**
 * Creates a new Arrow component.
 * @alias Component_Arrow
 * @class
 * @classdesc A component that changes a Visitor's direction upon visiting a GridCell.
 * @extends Component
 */
Automatune.Component_Arrow = function() {

};

/**
 * Creates a new Note component.
 * @alias Component_Note
 * @class
 * @classdesc A component that plays an audible note when visited by a Visitor.
 * @extends Component
 */
Automatune.Component_Note = function() {

};
