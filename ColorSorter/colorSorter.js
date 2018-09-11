// Runs on a local server. For instruccions see: https://github.com/processing/p5.js/wiki/Local-server

var colorSorter = function(p5){

	var dropzone;
	var myColor = p5.color(255);
	var paletteSize = 256;
	var colorList;
	var colorComparator;

	p5.setup = function(){
		//p5.createCanvas(960,500);

		p5.noCanvas();

		// Initial color
		myColor = p5.color(255);

		// Drag and drop
		dropzone = p5.select('#drop_zone');
		dropzone.dragOver(highlight);
		dropzone.dragLeave(unhighlight);
		dropzone.drop(gotFile);
		colorComparator = new ColorComparation(p5);

		document.getElementById("evaluate_Palette").onclick = comparePalette;

	}

	gotFile = function(file){
		var text = document.getElementById("drop_zone");

		text.textContent = "File: " +  file.name;

		colorList = file.data;

		colorList = colorList.split('\n');

		instance2.setColors(colorList);

		// Color comparator

		colorComparator.setColorList(getSelectedColors());

		colorComparator.setColorDistances(evaluatePalette());
	}

	function comparePalette(){

		colorComparator.setColorList(getSelectedColors());

		colorComparator.setColorDistances(evaluatePalette());
	
	}


	function highlight(){

		dropzone.style('background-color', '#ccc');
	}

	function unhighlight(){

		dropzone.style('background-color', '#fff');
	}

}
var instance1 = new p5(colorSorter);