var Grid = function(p5){

	this.gCells = [];
	var gridMode = "categorical";
	var numCells;

	this.setup = function(nCells, wCellSize, hCellSize){
		numCells = nCells; 
		// create all the cells
		this.gCells = [];
		for (var i=0; i < nCells ; i++){
			this.gCells.push(new this.Cell(i, wCellSize, hCellSize));
		}

		/* Assigns the exportPalette function to the button defined in the index.html
		Note that the function does not carry the parenthesis () at the end.
		*/
		document.getElementById("categorical").onclick = setGridCategoricalMode;
		document.getElementById("sequential").onclick = setGridSequentialMode;
		document.getElementById("divergent").onclick = setGridDivergentMode;
	}

	this.show = function (p5, orgX, orgY, gutterH, gutterV){
		
		this.posX = 0;
		this.posY = 0;

		var j=0;

		for (var i = 0; i < this.gCells.length; i++) {
			
			if (this.posX > p5.width - ( 3 * (this.gCells[i].w + gutterV))){
				j = 0;
				this.posY += (this.gCells[i].h + gutterH);
			}

			this.posX = j* (this.gCells[i].w + gutterV);
			
			this.gCells[i].show(p5, orgX + this.posX, orgY + this.posY);

			j++;
		}
	}

	this.Cell = function(id, w, h){
		this.myName = getNameFromId(id); 
		this.idCell = id;
		this.w = w;
		this.h = h;
		this.x;
		this.y;


		this.show = function(p5, x, y){
			this.x = x;
			this.y = y;
			p5.noFill();
			p5.stroke(100);
			p5.rect(this.x, this.y, this.w, this.h);
			p5.textSize(8);
			p5.fill(100);
			p5.noStroke();

			if ( gridMode == "categorical"){
			
				p5.text(this.myName,this.x + 2, this.y - 2);
			
			} else if (gridMode == "sequential"){
			
				p5.text(this.idCell,this.x + 2, this.y - 2);
			
			} else if (gridMode == "divergent"){

				var newLabel = p5.round(this.idCell - numCells/2);

				p5.text(newLabel,this.x + 2, this.y - 2);

			}
			
			this.mouseOver(p5);
		}

		this.mouseOver = function (p5){
			if (p5.mouseX > this.x && p5.mouseX < this.x + this.w && p5.mouseY > this.y && p5.mouseY < this.y + this.h){
				p5.fill(100);
				p5.noStroke();
				p5.textSize(14);
				if ( gridMode == "categorical"){
				
					p5.text(this.myName, p5.mouseX, p5.mouseY);
				
				} else if (gridMode == "sequential"){
				
					p5.text(this.idCell, p5.mouseX, p5.mouseY);
				
				} else if (gridMode == "divergent"){

					var newLabel = p5.round(this.idCell - numCells/2);

					p5.text(newLabel,p5.mouseX, p5.mouseY);

				}
				return true;
			} else{
				return false;
			}
		}
	}

	this.getIndex = function(p5){
		for (var i=0; i< this.gCells.length; i++){
			if (this.gCells[i].mouseOver(p5)){
				return this.gCells[i].idCell;
			}
		}
	}

	getNameFromId = function(id){
		var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		if (id >= 0 && id < alphabet.length){
			return alphabet[id];
		} else if ( id >= 0){
			var index = p5.floor(id/alphabet.length) -1;
			var mod = id % alphabet.length ;
			var rtn = alphabet[index]+ alphabet[mod];
			return(rtn);
		}
	}

	setGridCategoricalMode = function (){
		gridMode = "categorical"
	}

	setGridSequentialMode = function (){
		gridMode = "sequential"
	}

	setGridDivergentMode = function (){
		gridMode = "divergent"
	}

}