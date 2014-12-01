window['Automatune'] = {};
Automatune.init = function init(args) {
    
    /*
     *      Setup
     */
    
    // Read args 
    var divID = args.id;
    var numtiles = args.numtiles;
    var playback_ctx = args.playback;
     
    // Cache dom elements
    var domEls = {
        gameContainer: document.getElementById(divID),
        playback: {
            reset: document.getElementById("playback-reset"),
            play: document.getElementById("playback-play"),
            pause: document.getElementById("playback-pause")
        }
    }
    
    var timeouts = [];
    
    var tickTransitionStyle = document.createElement("style");
    tickTransitionStyle.appendChild(document.createTextNode("")); // Webkit hack
    document.head.appendChild(tickTransitionStyle);
    
    function setTickMs(ms) {
        ms_per_tick = ms;
        var cssString = "left " + ms + "ms linear, top " + ms + "ms linear";
        if (tickTransitionStyle.sheet.cssRules.length > 0) tickTransitionStyle.sheet.deleteRule(0);
        tickTransitionStyle.sheet.insertRule(".gridVisitor { -webkit-transition: " + cssString + "; transition: " + cssString + ";}", 0);
    }
    
    // Shared variables
    var stylesheet = document.styleSheets[0];
    var gameGrid;
    var border_radius_ratio = 0.01;
    var ms_per_tick;
    setTickMs(500);

    var grid_width = grid_height = numtiles; // columns and rows
    var cell_spacing_percent = 10 / Math.max(grid_width, grid_height);
    var cell_width_percent = ((100 - cell_spacing_percent) / grid_width) - cell_spacing_percent;
    var cell_height_percent = ((100 - cell_spacing_percent) / grid_height) - cell_spacing_percent;

    // Constants
    var O_RIGHT = 0;
    var O_UP = 1;
    var O_LEFT = 2;
    var O_DOWN = 3;
    
    /**
     * @constructor
     */
    function gridCellProperty(type, domElement, orientation) {
        this.type = type; // "arrow", etc.
        this.domElement = domElement;
        this.setOrientation(orientation); // 0 is right, 1 is up, 2 is left, 3 is down
    }

    gridCellProperty.prototype = {
        setOrientation: function(orientation) {
            this.orientation = orientation;
            setCSSRotation(this.domElement, orientation);
        }
    }

    /**
     * @constructor
     */
    function gridCell(element) {
        this.domElement = element;
        this.properties = {
            arrow: null,
            sound: null
        }; // Arrows, modifiers, etc.
        this.pos = {
            x: parseInt(element.getAttribute("data-pos-x"), 10),
            y: parseInt(element.getAttribute("data-pos-y"), 10)
        };
        element.onclick = this.onClick.bind(this);
    }

    gridCell.prototype = {
        createArrow: function(dir) {
            // 0 is right, 1 is up, 2 is left, 3 is down
            var img = document.createElement("img");
            img.src = "images/arrow.svg";
            img.className = "gridCellProperty";
        
            this.properties.arrow = new gridCellProperty("arrow", img, dir);
        
            this.domElement.appendChild(img);
        },
        onClick: function() {
            this.domElement.classList.add("active");
            var arrow = this.properties.arrow;
            if (arrow == null) {
                this.createArrow(O_RIGHT);
            } else {
                arrow.setOrientation(incrementWithinRange(arrow.orientation, 0, 3));
            }
            window.setTimeout((function(){
                this.properties.arrow.domElement.classList.add("active");
            }).bind(this), 160);
        },
        playSound: function() {
            if (this.properties.sound) {
                this.properties.sound.play();
                
                var div = document.createElement("div");
                div.classList.add("floatnote");
                this.domElement.appendChild(div);
                (function(d){
                    setTimeout(function() {
                        d.style.opacity = "0";
                        var cssString = "scale(1.75)";
                        d.style["-webkit-transform"] = cssString;
                        d.style["transform"] = cssString;
                        setTimeout(function() {
                            d.parentNode.removeChild(d);
                        }, 1000);
                    }, 25);
                })(div);
            }
        },
        removeTile: function() {
            this.domElement.classList.remove("active");
            
            if (this.properties.arrow) {
                window.setTimeout((function(){
                    var arr = this.properties.arrow.domElement;
                    arr.parentNode.removeChild(arr);
                    this.properties.arrow = null;
                }).bind(this), 160);
            }
        }
    }

    /**
     * @constructor
     */
    function gridVisitor(posX, posY, orientation) {
        var div = document.createElement("div");
        div.className = "gridVisitor";
        div.style.width = cell_width_percent + "%";
        div.style.height = cell_height_percent + "%";
        var pos = getGridPosition(posX, posY);
        div.style.left = pos.x + "%";
        div.style.top = pos.y + "%";
        domEls.gameContainer.appendChild(div);
    
        this.domElement = div;
        this.position = this.destination = {x: posX, y: posY};
        this.orientation = orientation;
    }

    gridVisitor.prototype = {
        // Sets CSS for the visitor to its destination (CSS animation takes care of the rest)
        goToDestination: function() {
            var dest = this.destination;
            
            var pos = getGridPosition(dest.x, dest.y);
            this.domElement.style.left = pos.x + "%";
            this.domElement.style.top = pos.y + "%";
        },
        // This function is called when the visitor reaches its destination
        destinationArrival: function(dest) {
            
            var pos = this.position = this.destination;
            gameGrid[pos.x][pos.y].playSound();
            
            this.calcDestination();
            this.goToDestination();
        },
        // Updates this.destination
        calcDestination: function() {
            function inBounds(x, y) {
                return (x >= 0 && x < grid_width && y >= 0 && y < grid_height);
            }
            function reverseDirection(dir) {
                if (dir == O_RIGHT) return O_LEFT;
                if (dir == O_UP) return O_DOWN;
                if (dir == O_LEFT) return O_RIGHT;
                if (dir == O_DOWN) return O_UP;
                throw "Unexpected value for orientation";
            }
            function getDelta(dir) {
                if (dir == O_RIGHT) return {x: 1, y: 0};
                else if (dir == O_UP) return {x: 0, y: -1};
                else if (dir == O_LEFT) return {x: -1, y: 0};
                else if (dir == O_DOWN) return {x: 0, y: 1};
                throw "Unexpected value for orientation";
            }
        
            var old_delta = getDelta(this.orientation);
        
            var startingCell = gameGrid[this.position.x][this.position.y];
            var sarrow = startingCell.properties.arrow;
            if (sarrow != null) {
                this.orientation = sarrow.orientation;
            } else if (!inBounds(this.position.x + old_delta.x, this.position.y + old_delta.y)) {
                this.orientation = reverseDirection(this.orientation);
            }
        
            var workingPosition = {x: this.position.x, y: this.position.y}; // Clone
            var delta = getDelta(this.orientation);
            
            if (!inBounds(workingPosition.x + delta.x, workingPosition.y + delta.y)) {
                this.destination = workingPosition;
                return;
            } else {
                workingPosition.x += delta.x;
                workingPosition.y += delta.y;
                this.destination = workingPosition;
                return;
            }
            // Control never reaches here
            throw "Bad things happened";
        },
        start: function() {
            // TODO: Refactor this out
            this.destinationArrival();
        },
        updatePosition: function() {
            this.position = this.destination;
        }
    };

    // Convenience function (int, int, int)
    function incrementWithinRange(integer, minVal, maxVal) {
        integer++;
        if (integer > maxVal) return minVal;
        else return integer;
    }

    function setCSSRotation(domElement, orientation) {
        var rotation = orientation * -90;
        var cssString = "rotate(" + rotation + "deg)";
        domElement.style["transform"] = cssString;
        domElement.style["-ms-transform"] = cssString;
        domElement.style["-webkit-transform"] = cssString;
    }

    function setCSSPositionTransition(domElement, duration_ms) {
        var s_left = "left " + duration_ms + "ms linear";
        var s_top = "top " + duration_ms + "ms linear";
        var cssString = s_top + ", " + s_left;
        domElement.style["transition"] = cssString;
        domElement.style["-webkit-transition"] = cssString;
    }

    // Accepts an x, y location on the grid
    // Returns an x, y position, expressed in (top, left) percentages of the game grid div
    function getGridPosition(x, y) {
        var xPercent = ((cell_width_percent + cell_spacing_percent) * x + cell_spacing_percent);
        var yPercent = ((cell_height_percent + cell_spacing_percent) * y + cell_spacing_percent);
        return {x: xPercent, y: yPercent};
    }

    // Returns city-block distance between 2 points
    function getGridDistance(x1, y1, x2, y2) {
        return Math.abs(x2 - x1) + Math.abs(y2 - y1);
    }
    
    /*
     *      Initialization
     */
    
    // Initialize CSS
    stylesheet.insertRule(".gridCellDiv { padding: " + cell_spacing_percent + "%; }", stylesheet.cssRules.length);

    // Initialize grid
    gameGrid = new Array(grid_width);
    for (var i = 0; i < grid_width; i++) {
        var row = new Array(grid_height);
        for (var j = 0; j < grid_height; j++) {
            var el = document.createElement("div");
            el.setAttribute("data-pos-x", i);
            el.setAttribute("data-pos-y", j);
            el.className = "gridCellDiv";
            var pos = getGridPosition(i, j);
            el.style.left = pos.x + "%";
            el.style.top = pos.y + "%";
            el.style.width = cell_width_percent + "%";
            el.style.height = cell_height_percent + "%";
            domEls.gameContainer.appendChild(el);
            row[j] = new gridCell(el);
        }
        gameGrid[i] = row;
    }

    // Initialize visitor
    var visitors = [];

    // jQuery UI Stuff

    var sndpath = "snd/piano/Piano.mf.";
    
    function generatePitchMenu() {
        var pitches = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C"];
        var menu = {title: "Set Pitch", children: []};
        var min_octave = 1;
        var max_octave = 7;
        for (var i = max_octave; i >= min_octave; i--) {
            menu.children.push({
                title: (function(){
                    var result = "Octave " + i;
                    if (i === min_octave) return result + " (Lowest)";
                    if (i === 3) return result + " (Mid)";
                    if (i === max_octave) return result + " (Highest)";
                    return result;
                })(),
                children: (function(){
                    var result = [];
                    for (var j = pitches.length - 1; j >= 0; j--) {
                        var p = pitches[j]; // "C", or "Db", etc.
                        var note_name;
                        if (j === pitches.length - 1) note_name = p + (i + 1);
                        else note_name = p + i;
                        result.push({
                            title: note_name, // "C4", or "Db4", etc.
                            cmd: "pitch." + note_name
                        });
                    }
                    return result;
                })()
            });
        }
        menu.children.push({title: "---"});
        menu.children.push({title: "Delete&nbsp;Pitch", cmd: "pitch.delete"});
        return menu;
    }

    $(domEls.gameContainer).contextmenu({
        delegate: ".gridCellDiv",
        menu: [
            generatePitchMenu(),
            {title: "---"},
            {title: "Clear Tile", cmd: "delete_tile"},
            {title: "---"},
            {title: "Create New Visitor", cmd: "new_visitor"},
            {title: "Delete Visitor", cmd: "delete_visitor"}
            ],
        select: function(event, ui) {
            var el = ui.target[0];
            // Traverse up and get grid cell
            while(!el.classList.contains("gridCellDiv")) {
                el = el.parentNode;
                if (el == document.body) {
                    throw "Bad things happened";
                }
            }
            var elx = parseInt(el.getAttribute("data-pos-x"), 10);
            var ely = parseInt(el.getAttribute("data-pos-y"), 10);
            var gridCell = gameGrid[elx][ely];
            var cmdarr = ui.cmd.split(".");
            switch (cmdarr[0]) {
                case "pitch":
                    var howl = gridCell.properties.sound;
                    if (howl) {
                        gridCell.properties.sound = null;
                        // howl.unload(); Need to leave the cache for other sounds
                    }
                    if (cmdarr[1] === "delete") {
                        $(gridCell.domElement).find(".tileicon.note").remove();
                        return;
                    }
                    
                    var div = document.createElement("div");
                    div.classList.add("tileicon");
                    div.classList.add("note");
                    gridCell.domElement.appendChild(div);
                    
                    gridCell.properties.sound = new Howl({
                        urls: [
                            sndpath + cmdarr[1] + '.mp3',
                            sndpath + cmdarr[1] + '.ogg'
                        ],
                        volume: 0.7
                    });
                    break;
                case "new_visitor":
                    var new_visitor = new gridVisitor(elx, ely, O_RIGHT);
                    visitors.push(new_visitor);
                    break;
                case "delete_tile":
                    gridCell.removeTile();
                    break;
                case "delete_visitor":
                    for (var i = 0; i < visitors.length; i++) {
                        var v = visitors[i];
                        if (v.position.x === elx && v.position.y === ely) {
                            visitors.splice(i, 1);
                            v.domElement.parentNode.removeChild(v.domElement);
                        }
                    }
                    break;
                default:
                    alert("Menu item not yet implemented");
            }
        }
    });
    
    // Automatune menu
    
    $("#menubar > .menu-automatune").contextmenu({
        delegate: "span",
        menu: [
            {title: "About Automatune", cmd: "about"}
        ],
        select: function(event, ui) {
            console.log("select " + ui.cmd + " on ", ui.target);
            switch(ui.cmd) {
                case "about":
                    $("#automatune-about").dialog("open");
                    break;
                default:
                    alert("Menu item not yet implemented");
            }
        },
        autoTrigger: false
    });
    
    $("#automatune-about").dialog({
        autoOpen: false
    });
    
    // File menu
    
    $("#menubar > .menu-file").contextmenu({
        delegate: "span",
        menu: [
            {title: "New (Not Yet Implemented)", cmd: "new", disabled: true},
            {title: "Open (Not Yet Implemented)", cmd: "open", disabled: true},
            {title: "Save (Not Yet Implemented)", cmd: "save", disabled: true}
        ],
        select: function(event, ui) {
            console.log("select " + ui.cmd + " on ", ui.target);
        },
        autoTrigger: false
    });
    
    // Edit menu
    
    $("#menubar > .menu-edit").contextmenu({
        delegate: "span",
        menu: [
            {title: "Select All (Not Yet Implemented)", cmd: "selectall", disabled: true},
            {title: "Copy (Not Yet Implemented)", cmd: "copy", disabled: true},
            {title: "Paste (Not Yet Implemented)", cmd: "paste", disabled: true}
        ],
        select: function(event, ui) {
            console.log("select " + ui.cmd + " on ", ui.target);
        },
        autoTrigger: false
    });
    
    // Sound menu
    
    $("#menubar > .menu-sound").contextmenu({
        delegate: "span",
        menu: [
            {title: "Volume", children: [
                {title: "10&nbsp;(Highest)", cmd: "volume.10"},
                {title: "9", cmd: "volume.9"},
                {title: "8", cmd: "volume.8"},
                {title: "7", cmd: "volume.7"},
                {title: "6", cmd: "volume.6"},
                {title: "5", cmd: "volume.5"},
                {title: "4", cmd: "volume.4"},
                {title: "3", cmd: "volume.3"},
                {title: "2", cmd: "volume.2"},
                {title: "1&nbsp;(Lowest)", cmd: "volume.1"}
            ]},
            {title: "Tempo", children: [
                {title: "Slow", cmd: "tempo.slow"},
                {title: "Normal", cmd: "tempo.normal"},
                {title: "Fast", cmd: "tempo.fast"},
                {title: "Fastest", cmd: "tempo.fastest"}
            ]},
            {title: "Enable Metronome (Not Yet Implemented)", cmd: "metronome", disabled: true}
        ],
        select: function(event, ui) {
            console.log("select " + ui.cmd + " on ", ui.target);
            var cmdarr = ui.cmd.split(".");
            switch (cmdarr[0]) {
                case "volume":
                    var vol_pre = 0.1 * parseInt(cmdarr[1], 10);
                    var vol = vol_pre * vol_pre;
                    Howler.volume(vol);
                    ohSnap("Volume " + cmdarr[1], "black");
                    break;
                case "tempo":
                    switch (cmdarr[1]) {
                        case "slow":
                            setTickMs(1000);
                            ohSnap("Tempo: Slow", "black");
                            break;
                        case "normal":
                            setTickMs(500);
                            ohSnap("Tempo: Normal", "black");
                            break;
                        case "fast":
                            setTickMs(250);
                            ohSnap("Tempo: Fast", "black");
                            break;
                        case "fastest":
                            setTickMs(125);
                            ohSnap("Tempo: Fastest", "black");
                            break;
                        default:
                    }
                    break;
                default:
                    alert("Menu item not yet implemented");
            }
        },
        autoTrigger: false
    });
    // Set initial volume
    Howler.volume(0.25);
    
    // Attach menu click handler
    
    $("#menubar > li").click(function() {
        $(this).contextmenu("open", $(this).find("span"));
    });
    
    function resetPlayback() {
        domEls.playback.reset.classList.remove("active");
        domEls.playback.play.classList.remove("active");
        domEls.playback.pause.classList.remove("active");
    }
    
    var playbackState = "paused";
    Automatune.getPlaybackState = function(){return playbackState;};
    
    var visitors_timeout = null;
    function tickVisitors() {
        for (var i = 0; i < visitors.length; i++) {
            visitors[i].start();
            (function(curr_visitor) {
                setTimeout(function() {
                    curr_visitor.updatePosition();
                }, ms_per_tick);
            })(visitors[i]);
        }
        // Repeat
        visitors_timeout = setTimeout(tickVisitors, ms_per_tick);
    }
    
    // Public auxiliary functions
    Automatune.play = function() {
        resetPlayback();
        domEls.playback.play.classList.add("active");
        
        if (playbackState === "paused") {
            for (var i = 0; i < visitors.length; i++) {
                visitors[i].start();
            }
            visitors_timeout = setTimeout(tickVisitors, ms_per_tick);
        }
        
        playbackState = "playing";
    };
            
    Automatune.pause = function() {
        resetPlayback();
        domEls.playback.pause.classList.add("active");
        
        clearTimeout(visitors_timeout);
        
        playbackState = "paused";
    };
    
    Automatune.reset = function() {
        //resetPlayback();
        //domEls.playback.reset.classList.add("active");
        
        // Automatune.pause();
        
        alert("Reset function not yet implemented");
    };
    
    // Pause when page is not visible
    
    // Set the name of the hidden property and the change event for visibility
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
    
    function handleVisibilityChange() {
      if (document[hidden]) {
        Automatune.pause();
        Howler.mute();
      } else {
        Howler.unmute();
      }
    }
    
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
    
    // Add a visitor
    visitors.push(new gridVisitor(3, 3, O_RIGHT));
    
    // Start it up!
    $(window).load(function() {
        Automatune.play();
    });
};

Automatune.init({
    id: "automatune",
    numtiles: 7,
    playback: "full"
});
