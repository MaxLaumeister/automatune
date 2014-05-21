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
				el.className = "gridCell";
				el.style.left = (cell_width_percent * i + cell_spacing_percent) + "%";
				el.style.top = (cell_height_percent * j + cell_spacing_percent) + "%";
				el.style.width = (cell_width_percent - cell_spacing_percent)+ "%";
				el.style.height = (cell_height_percent - cell_spacing_percent)+ "%";
				el.style["border-radius"] = "10%";
				gameContainer.appendChild(el);
			}
		}
	}
	
	function onResize() {
		/*var game_width = 800; // TODO: Infer from css instead of hard-coding
		var game_height = 800;
		
		var border_radius = (border_radius_ratio * Math.min(game_width, game_height));
		gameContainer.style["border-radius"] = border_radius + "px";
		gameContainer.style["border-radius"] = border_radius + "px";*/
	}
	
	init();
}
