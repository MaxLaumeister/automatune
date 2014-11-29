window['Automatune'] = {
    init: function init(divID) {
        // Shared variables
        var gameContainer = document.getElementById(divID);
        var stylesheet = document.styleSheets[0];
        var gameGrid;
        var border_radius_ratio = 0.01;
        var ms_per_tick = 500;
    
        var grid_width = grid_height = 10; // columns and rows
        var cell_spacing_percent = 10 / Math.max(grid_width, grid_height);
        var cell_width_percent = ((100 - cell_spacing_percent) / grid_width) - cell_spacing_percent;
        var cell_height_percent = ((100 - cell_spacing_percent) / grid_height) - cell_spacing_percent;
    
        // Constants
        var O_RIGHT = 0;
        var O_UP = 1;
        var O_LEFT = 2;
        var O_DOWN = 3;
    
        // String constants
        var S_UNEXPECTED_ORIENTATION = "Unexpected value for orientation";
    
        function init() {
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
                    gameContainer.appendChild(el);
                    row[j] = new gridCell(el);
                }
                gameGrid[i] = row;
            }
        
            // Initialize visitor
            var visitor = new gridVisitor(3, 4, O_RIGHT);
        }
    
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
                this.domElement.style["background-color"] = "red";
                var arrow = this.properties.arrow;
                if (arrow == null) {
                    this.createArrow(O_RIGHT);
                } else {
                    arrow.setOrientation(incrementWithinRange(arrow.orientation, 0, 3));
                }
            },
            playSound: function() {
                if (this.properties.sound) {
                    this.properties.sound.play();
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
            gameContainer.appendChild(div);
        
            this.domElement = div;
            this.position = {x: posX, y: posY};
            this.orientation = orientation;
        
            window.setTimeout((function(){
                var dest = this.getDestination();
                this.goToDestination(dest);
            }).bind(this), 1000); // TODO: Make this activated by a play button
        
            this.domElement.addEventListener("transitionend", this.destinationArrival.bind(this), true);
        }
    
        gridVisitor.prototype = {
            goToDestination: function(dest) {
                this.destination = dest;
                setCSSPositionTransition(this.domElement, ms_per_tick * getGridDistance(this.position.x, this.position.y, this.destination.x, this.destination.y)); // TODO: Make time dependent on distance
                var pos = getGridPosition(dest.x, dest.y);
                this.domElement.style.left = pos.x + "%";
                this.domElement.style.top = pos.y + "%";
            },
            destinationArrival: function(dest) {
                var pos = this.position = this.destination;
                gameGrid[pos.x][pos.y].playSound();
            
                this.destination = this.getDestination();
                this.goToDestination(this.destination);
            },
            getDestination: function() {
                function inBounds(x, y) {
                    return (x >= 0 && x < grid_width && y >= 0 && y < grid_height);
                }
                function reverseDirection(dir) {
                    if (dir == O_RIGHT) return O_LEFT;
                    if (dir == O_UP) return O_DOWN;
                    if (dir == O_LEFT) return O_RIGHT;
                    if (dir == O_DOWN) return O_UP;
                    throw S_UNEXPECTED_ORIENTATION;
                }
                function getDelta(dir) {
                    if (dir == O_RIGHT) return {x: 1, y: 0};
                    else if (dir == O_UP) return {x: 0, y: -1};
                    else if (dir == O_LEFT) return {x: -1, y: 0};
                    else if (dir == O_DOWN) return {x: 0, y: 1};
                    throw S_UNEXPECTED_ORIENTATION;
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
            
            
                while(true) {
                    workingPosition.x += delta.x;
                    workingPosition.y += delta.y;
                    var currCell = gameGrid[workingPosition.x][workingPosition.y];
                    if (currCell.properties.arrow != null) {
                        return workingPosition;
                    }
                    if (!inBounds(workingPosition.x + delta.x, workingPosition.y + delta.y)) {
                        return workingPosition;
                    }
                }
                // Control never reaches here
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
    
        init();
    
        // jQuery UI Stuff
    
        var sndpath = "snd/piano/Piano.mf.";
    
        $(gameContainer).contextmenu({
            delegate: ".gridCellDiv",
            menu: [
                {title: "Change Pitch", children: [
                    {title: "C4", cmd: "pitch.C4"},
                    {title: "B3", cmd: "pitch.B3"},
                    {title: "Bb3", cmd: "pitch.Bb3"},
                    {title: "A3", cmd: "pitch.A3"},
                    {title: "Ab3", cmd: "pitch.Ab3"},
                    {title: "G3", cmd: "pitch.G3"},
                    {title: "Gb3", cmd: "pitch.Gb3"},
                    {title: "F3", cmd: "pitch.F3"},
                    {title: "E3", cmd: "pitch.E3"},
                    {title: "Eb3", cmd: "pitch.Eb3"},
                    {title: "D3", cmd: "pitch.D3"},
                    {title: "Db3", cmd: "pitch.Db3"},
                    {title: "C3", cmd: "pitch.C3"}
                ]},
                {title: "Change Launch Speed", children: [
                    {title: "Fast", cmd: "speed.fast"},
                    {title: "Normal", cmd: "speed.normal"},
                    {title: "Slow", cmd: "speed.slow"},
                    {title: "Custom", cmd: "speed.custom"}
                ]},
                {title: "Delete Element", cmd: "delete"}
                ],
            select: function(event, ui) {
                console.log("select " + ui.cmd + " on ", ui.target);
                var el = ui.target[0];
                // Traverse up and get grid cell
                while(el.className != "gridCellDiv") {
                    console.log("Traversal", el);
                    el = el.parentNode;
                    if (el == document.body) {
                        throw "Bad things happened";
                    }
                }
                var elx = parseInt(el.getAttribute("data-pos-x"), 10);
                var ely = parseInt(el.getAttribute("data-pos-y"), 10);
                var gridCell = gameGrid[elx][ely];
                console.log(elx, ely, gridCell);
                var cmdarr = ui.cmd.split(".");
                switch (cmdarr[0]) {
                    case "pitch":
                        gridCell.properties.sound = new Howl({
                            urls: [sndpath + cmdarr[1] + '.mp3']
                        });
                        break;
                    default:
                        console.log("Menu item not implemented");
                }
            }
        });
    },
    play: function() {
        console.log("Play function called");
    }
};

Automatune.init("automatune");
