// Compares the distance between color of a given palette

var ColorComparation = function(p5){

	this.colorList = [];
	this.colorDistances = [];
	var canvas;

	p5.setup = function(){
		canvas = p5.createCanvas(960,200);

	}

	this.setColorList = function(colors){
		colorList = [];
		for (var i = 0; i < colors.length; i++) {
			colorList.push(colors[i]);
		}

	}

	this.setColorDistances = function (distances){
		colorDistances = distances;
	}

	p5.draw = function(){
		p5.background(205);

		p5.stroke(180);
		p5.strokeWeight(1);
		p5.line(10, 170, p5.width - 10, 170);
		p5.line(10, 40, p5.width - 10, 40);
		p5.fill (180);
		p5.noStroke();
		p5.text ("close", 10, 165);
		p5.text ("far", 10, 35);

		for (var i = 0; i < colorDistances.length; i++) {
			p5.noStroke();
			p5.fill(colorList[i].sourceColor);
			p5.text (colorDistances[i].key.a, i * 18 + 70, 170 );
			p5.stroke(80);
			p5.strokeWeight(3);
			p5.line (i * 18 + 70 , 155, i * 18 + 70 , 155 - colorDistances[i].value );
			p5.fill(colorList[i+1].sourceColor);
			p5.noStroke();
			p5.text (colorDistances[i].key.b, i * 18 + 70 , 147 - colorDistances[i].value);
		}
	}
}
var instance3 = new p5(ColorComparation, 'ColorComparation');