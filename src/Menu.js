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
    
    // Initialize variables
    
    this.parentGame = pGame;
    
    // Init Menus
    
    var gameDiv = $(pGame.domElement);
    var menuDiv = $(menuEl);
    
    var MenuInst = this;
    
    function generatePitchMenu() {
        var pitches = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C"];
        var menu = {title: "Add Note", children: []};
        var min_octave = 1;
        var max_octave = 7;
        
        function getOctaveName(num) {
            var result = "Octave " + num;
            if (num === min_octave) return result + " (Lowest)";
            if (num === 3) return result + " (Mid)";
            if (num === max_octave) return result + " (Highest)";
            return result;
        }
        
        function getPitchNames(num) {
            var result = [];
            for (var j = pitches.length - 1; j >= 0; j--) {
                var p = pitches[j]; // "C", or "Db", etc.
                var note_name;
                if (j === pitches.length - 1) note_name = p + (num + 1);
                else note_name = p + num;
                result.push({
                    title: note_name, // "C4", or "Db4", etc.
                    cmd: "pitch." + note_name
                });
            }
            return result;
        }
        
        for (var i = max_octave; i >= min_octave; i--) {
            menu.children.push({
                title: getOctaveName(i),
                children: getPitchNames(i)
            });
        }
        return menu;
    }

    gameDiv.contextmenu({
        delegate: ".gridCellDiv",
        menu: [
            generatePitchMenu(),
            {title: "Delete&nbsp;All&nbsp;Notes", cmd: "pitch.delete"},
            {title: "---"},
            {title: "Delete Component", cmd: "delete_component"},
            {title: "---"},
            {title: "Create New Visitor", cmd: "new_visitor"},
            {title: "Delete Visitor", cmd: "delete_visitor"}
            ],
        select: function(event, ui) {
            var el = ui.target[0];
            // Traverse up and get grid cell
            while(!el.classList.contains("gridCellDiv")) {
                el = el.parentNode;
                assert(el != document.body);
            }
            var elx = parseInt(el.getAttribute("data-pos-x"), 10);
            var ely = parseInt(el.getAttribute("data-pos-y"), 10);
            var gridCell = MenuInst.parentGame.grid.getCell(elx, ely);
            var cmdarr = ui.cmd.split(".");
            switch (cmdarr[0]) {
                case "pitch":
                    if (cmdarr[1] === "delete") {
                        gridCell.removeModifiers("note");
                    } else {
                        gridCell.addModifier(new Automatune.Modifier_Note(gridCell, cmdarr[1]));
                    }
                    break;
                case "new_visitor":
                    MenuInst.parentGame.createVisitor(elx, ely, Automatune.O_RIGHT);
                    break;
                case "delete_component":
                    MenuInst.parentGame.grid.getCell(elx, ely).destroyComponent();
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
    
    menuDiv.find("> .menu-automatune").contextmenu({
        delegate: "span",
        menu: [
            {title: "About Automatune", cmd: "about"}
        ],
        select: function(event, ui) {
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
    
    menuDiv.find("> .menu-file").contextmenu({
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
    
    menuDiv.find("> .menu-edit").contextmenu({
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
    
    menuDiv.find("> .menu-sound").contextmenu({
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
                            MenuInst.parentGame.setTickMs(Automatune.TICK_SLOW);
                            ohSnap("Tempo: Slow", "black");
                            break;
                        case "normal":
                            MenuInst.parentGame.setTickMs(Automatune.TICK_NORMAL);
                            ohSnap("Tempo: Normal", "black");
                            break;
                        case "fast":
                            MenuInst.parentGame.setTickMs(Automatune.TICK_FAST);
                            ohSnap("Tempo: Fast", "black");
                            break;
                        case "fastest":
                            MenuInst.parentGame.setTickMs(Automatune.TICK_FASTEST);
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
    
    menuDiv.find("> li").click(function() {
        $(this).contextmenu("open", $(this).find("span"));
    });
};

