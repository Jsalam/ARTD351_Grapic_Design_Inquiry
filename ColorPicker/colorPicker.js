/*
See http://gka.github.io/chroma.js/#color-luminance
*/
var selectedColors = [];
var blockSize = 40;

var colorPicker = function (p5) {

	var dropzone;
	var img;
	var imgW, imgH;
	var myColor = p5.color(255);
	var paletteSize = 256;
	var ellipseY;
	var step = 20;

	p5.setup = function(){
		p5.createCanvas(960,500);

		// Initial color
		myColor = p5.color(255);

		// Drag and drop
		dropzone = p5.select('#drop_zone');
		dropzone.dragOver(highlight);
		dropzone.dragLeave(unhighlight);
		dropzone.drop(gotFile);
		ellipseY = p5.height/2;
	}

	p5.draw = function(){
		p5.background(30,100);
		if (img != undefined){
			resizeImage();
			p5.image(img,0,0,imgW, imgH);
			p5.fill(myColor);
			displayColorOver();
			p5.fill(200);
			p5.text(p5.red(myColor) + "," + p5.green(myColor)+ "," + p5.blue(myColor), p5.mouseX, p5.mouseY);
		}
	}



	function displayColorOver(){

		p5.strokeWeight(5);
		// top half 
		if (p5.mouseY < imgH/2){

			if (ellipseY < imgH *(3/4)){
				ellipseY += step;
			}
			
			p5.ellipse (p5.mouseX, ellipseY, 70, 70);

		}else {

			if (ellipseY > imgH *(1/4)){
				ellipseY -= step;
			}

			p5.ellipse (p5.mouseX, ellipseY, 70, 70);
		}

		p5.strokeWeight(1);
	}

	function gotFile(file){
		var text = document.getElementById("drop_zone");
		text.textContent = "File: " +  file.name;
		img = p5.createImg(file.data);
		img.hide();
	}

	function resizeImage(){
		// determine proportion alignment between canvas and image
		// if portrait or square alignment
		if ( (p5.width / p5.height ) >= (img.width / img.height)){
			imgW = img.width * (p5.height/img.height);
			imgH = img.height * (p5.height/img.height);

		} // if lansdcape
		 else {
		 	imgW = img.width * (p5.width/img.width); 
		 	imgH = img.height * (p5.width/img.width);
		 } 
	}

	function getColor(){
		var r, g, b, alpha, pos;
		
		if (p5.mouseX > 0 && p5.mouseX < imgW && p5.mouseY > 0 && p5.mouseY < imgH){
			var index = (p5.floor(p5.mouseX) + (p5.mouseY * p5.width * p5.pixelDensity())) * 4 * p5.pixelDensity();
			index = p5.floor(index);
			p5.loadPixels();
			r = p5.pixels[index];
			g = p5.pixels[index+1];
			b = p5.pixels[index+2];
			alpha = p5.pixels[index+3];
			p5.updatePixels();
			//console.log("x: "+p5.mouseX + " y:" +p5.mouseY + " index: "+index);
		}
			return p5.color(r, g, b, alpha);
	}

	p5.mouseClicked = function(){

		if (p5.mouseX > 0 && p5.mouseX < imgW && p5.mouseY > 0 && p5.mouseY < imgH){	

			var temp = new ColorBlock(p5,getColor());
		
			if (temp != undefined){

				// true if the color has already picked
				var exists = selectedColors.find(function(ele){
					return ele.blockID() === temp.blockID();
				})

				if (!exists){

					/***** paletteSize is currently undefined, but it should be 
					retrieved from the colorPalette instance (instance2) ******/
					
					if (paletteSize > selectedColors.length){
						selectedColors.push(temp);
					}else{
						window.alert("The palette is full. Clear spots if you want to add more");
					}
				} else {
					window.alert("The color " + temp.blockID()+ " is already in the palette!");
				}
			} else {

				// no color picked
			}
		}
	}

	p5.mouseDragged = function (){

	}

	p5.mouseMoved = function(){
		if (p5.mouseX > 0 && p5.mouseX < imgW && p5.mouseY > 0 && p5.mouseY < imgH){
			myColor = getColor();
		}
	}


	function highlight(){
		dropzone.style('background-color', '#ccc');
	}

	function unhighlight(){
		dropzone.style('background-color', '#fff');
	}

	setGrid = function(){
		paletteSize = document.getElementById("gridSize").value;
		console.log(paletteSize);
	}

}

var instance1 = new p5(colorPicker, 'colorPicker');
