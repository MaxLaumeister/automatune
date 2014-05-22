function initGame(divID) {
	
	// Shared variables
	var gameContainer;
	var border_radius_ratio;
	
	function init() {
		gameContainer = document.getElementById(divID);
		border_radius_ratio = 0.01;
		onResize();
		
		var grid_width = 10; // columns
		var grid_height = 10; // rows
		var cell_spacing_percent = 1;
		var cell_width_percent = ((100 - cell_spacing_percent) / grid_width);
		var cell_height_percent = ((100 - cell_spacing_percent) / grid_height);
		
	
		// Initialize grid
		var grid = new Array(grid_width);
		for (var i = 0; i < grid_width; i++) {
			var row = new Array(grid_height);
			for (var j = 0; j < grid_height; j++) {
				var el = document.createElement("div");
				el.className = "gridCellDiv";
				el.style.left = (cell_width_percent * i + cell_spacing_percent) + "%";
				el.style.top = (cell_height_percent * j + cell_spacing_percent) + "%";
				el.style.width = (cell_width_percent - cell_spacing_percent)+ "%";
				el.style.height = (cell_height_percent - cell_spacing_percent)+ "%";
				el.style["border-radius"] = "10%";
				gameContainer.appendChild(el);
				row[j] = new gridCell(el);
			}
			grid[i] = row;
		}
		
		console.log(grid);
	}
	
	function onResize() {
		/*var game_width = 800; // TODO: Infer from css instead of hard-coding
		var game_height = 800;
		
		var border_radius = (border_radius_ratio * Math.min(game_width, game_height));
		gameContainer.style["border-radius"] = border_radius + "px";
		gameContainer.style["border-radius"] = border_radius + "px";*/
	}
	
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
	
	function gridCell(element) {
		this.domElement = element;
		this.properties = {
			arrow: null
		}; // Arrows, modifiers, etc.
		element.onclick = this.onClick.bind(this);
	}
	
	gridCell.prototype = {
		createArrow: function(dir) {
			// 0 is right, 1 is up, 2 is left, 3 is down
			var img = document.createElement("img");
			img.src = "images/arrow.svg";
			img.style.width = "100%";
			img.style.height = "100%";
			
			this.properties.arrow = new gridCellProperty("arrow", img, dir);
			
			this.domElement.appendChild(img);
		},
		onClick: function() {
			console.log("Clicked");
			this.domElement.style["background-color"] = "red";
			var arrow = this.properties.arrow;
			if (arrow == null) {
				this.createArrow(0);
			} else {
				arrow.setOrientation(incrementWithinRange(arrow.orientation, 0, 3));
			}
			console.log(this);
		}
	}
	
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
	
	init();
}
