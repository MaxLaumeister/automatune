/**
 * A component that goes on a cell, such as an arrow or note.
 * @constructor
 */
Automatune.Component = function(t) {
    /**
     * The type of component (arrow, note, etc.)
     * @type {string}
     */
    var type = t;
    
    /**
     * The DOM Element associated with this Component.
     * @type {HTMLElement}
     */
    var domElement;
    
    /**
     * The DOM Element associated with this Component.
     * @type {HTMLElement}
     * @returns {string} type
     */
    this.getType = function(){
        return type;
    }
    
    this.appendTo = function(gridCell) {
        
    }
    
    this.onVisit = function(visitor) {
        
    }
    
    this.destroy = function() {
    
    }
}
