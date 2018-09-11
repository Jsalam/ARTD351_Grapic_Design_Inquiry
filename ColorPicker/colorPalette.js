/// ****** Class for color palette instance *******


var colorPalette = function(p5){

	var grid;
	var gutterH;
	var gutterV;
	var canvas;
	var removeEnabled = true;
	var tempColorBlock;
	this.mode = "switch_Normal" ;
	var deleteButton;
	var gridSize = 51;
	var getSelectedForSorting;

	p5.setup = function(){
		/* Assigns the exportPalette function to the button defined in the index.html
		Note that the function does not carry the parenthesis () at the end.
		*/
		document.getElementById("save_palette_rgb").onclick = exportPaletteRgb;
		document.getElementById("save_palette_hsb").onclick = exportPaletteHsb;
		document.getElementById("save_palette_lab").onclick = exportPaletteLab;
		document.getElementById("save_palette").onclick = savePalette;
		document.getElementById("submitSize").onclick = setupGrid;

		var canvasH = (p5.floor(gridSize/20) * 60) + 100;
		canvas = p5.createCanvas(960,canvasH);
		grid = new Grid(p5);
		grid.setup(gridSize,blockSize, blockSize);
		gutterH = 16;
		gutterV = 5;
		deleteButton = new DeleteButton(p5.width - 30, p5.height - 30, 40);
	}

	p5.draw = function(){
		p5.background(250);
		
		grid.show(p5, blockSize, blockSize, gutterH, gutterV);

		showPalette(blockSize, blockSize, this.mode);

		for (var i = 0; i < selectedColors.length; i++) {

			if (selectedColors[i] != undefined){
			
				selectedColors[i].showOriginalColor(p5);

			}

		}

		
			if (tempColorBlock != undefined && tempColorBlock.length > 0){

				tempColorBlock[0].display(p5,mode, p5.mouseX , p5.mouseY);
				p5.fill(0);
				p5.text("selected color",  p5.mouseX + 2 , p5.mouseY - 4);


			}

		deleteButton.show();
	}


	showPalette = function (x, y, mode){
		var j=0;
		var posY = 0;
		var posX = 0;

		for (var i = 0; i < selectedColors.length; i++) {
			
			if (posX >= p5.width - (3 * blockSize + gutterV)){
				j = 0;
				posY += (blockSize + gutterH);
			}
			posX = j* (blockSize + gutterV);

			 if (selectedColors[i] != undefined){

			 	selectedColors[i].display(p5, mode , x + posX , y + posY);

			 }
			
			j++;
		}
	}

	p5.mouseClicked = function(){

		// Gets the display mode form the clickled element on document 
		this.mode = setColorDisplayMode((event.target).id);

		if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height){

			if (removeEnabled){
				for (var i = 0; i < selectedColors.length; i++) {
					
					if (selectedColors[i].isMouseOver(p5)){
						// remove the color and store it in temp
						tempColorBlock = selectedColors.splice(grid.getIndex(p5), 1);
						removeEnabled = false;
						break;
					} 
				}
				if (removeEnabled){
						window.alert("No color picked");
				}

			} else {
				// remove the color from the original array
				if (deleteButton.isMouseOver()){
					var removeIndex = selectedColors.indexOf(tempColorBlock[0]);
					selectedColors.splice(removeIndex, 0);
					tempColorBlock.splice(0, 1);
					window.alert("Color removed from palette");
				}else{
					// add the color at the designated index
					selectedColors.splice(grid.getIndex(p5),0,tempColorBlock[0]);
				}
				
				removeEnabled = true;
				tempColorBlock = undefined;
			} 
		}
	}

	setColorDisplayMode = function(val){
		
		switch(val){
			case"switch_Luminance":
				mode = "switch_Luminance";
				break;
			case"switch_Hue":
				mode = "switch_Hue";
				break;
			case"switch_Saturation":
				mode = "switch_Saturation";
				break;
			case"switch_Value":
				mode = "switch_Value";
				break;
			case"switch_Normal":
				mode = "switch_Normal";
		}
	}

	exportPaletteRgb = function (){

		var output = [];

		for (var i =0; i< selectedColors.length ; i++){
			output[i] = (selectedColors[i].getRGB());
		}
 
		p5.save(output, 'paletteRgb.txt');
	}

	exportPaletteHsb = function (){

		var output = [];

		for (var i =0; i< selectedColors.length ; i++){
			output[i] = selectedColors[i].getHSV();
		}

		p5.save(output, 'paletteHsb.txt');

	}


	exportPaletteLab = function (){
		
		var output = [];

		for (var i =0; i< selectedColors.length ; i++){
			output[i] = selectedColors[i].getLab();
		}

		p5.save(output, 'paletteLab.txt');
	}

	savePalette = function (){

		p5.save('palette.jpg');
	}

	DeleteButton = function(x, y, diam){
		this.x = x;
		this.y = y;
		this.diam = diam;
		this.halfDiam = diam/2;
		this.strokeColor = p5.color(0);

		this.show = function (){
			this.isMouseOver();
			p5.stroke(this.strokeColor);
			p5.noFill();
			p5.ellipse(this.x, this.y, this.diam, this.diam);
			p5.line(this.x - this.halfDiam, 
				this.y - this.halfDiam, 
				this.x + this.diam - this.halfDiam, 
				this.y + this.diam - this.halfDiam);
			p5.line(this.x - this.halfDiam,
				this.y + this.diam - this.halfDiam,
				this.x + this.diam - this.halfDiam,
				this.y - this.halfDiam);
		}

		this.isMouseOver = function(){
			if (p5.dist(p5.mouseX, p5.mouseY, this.x, this.y) < this.halfDiam){
				this.strokeColor = p5.color(255,0,0);
				return true;
			}else{
				this.strokeColor = p5.color(0,100);
				return false;
			}
		}

	}

	setupGrid = function(){
		gridSize = document.getElementById("gridSize").value;
		grid.setup(gridSize,blockSize, blockSize);
		var canvasH = (p5.floor(gridSize/20) * 60) + 100;
		canvas.size(960,canvasH);
		deleteButton = new DeleteButton(p5.width - 30, p5.height - 30, 40);
	}

}

var instance2 = new p5(colorPalette, 'colorPalette');