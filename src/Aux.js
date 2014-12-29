function assert(obj) {
    
    "use strict";
    
    function getErrorObject(){
        try { throw Error(''); } catch(err) { return err; }
    }
    
    // If obj is "falsey", then throw an exception.
    if (!obj || arguments.length !== 1) {
        var err = getErrorObject();
        var caller_line = err.stack.split("\n")[4];
        var index = caller_line.indexOf("at ");
        var clean = caller_line.slice(index+2, caller_line.length).trim();
        throw "\"Assert Failed\" at " + clean;
    }
}
