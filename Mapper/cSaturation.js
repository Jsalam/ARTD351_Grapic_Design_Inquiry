var cSaturation = function (p5){

	p5.scale;

	var margin = 100;
	
	var colors = [];
	
	var colorOutput;


	p5.setup = function(){
		p5.createCanvas(770,100);

		p5.scale = new Scale();
		
		p5.scale.setOrigin( margin , p5.height/2, p5.width - 2*margin);

		var nColors= 256;
		
		for (var i=0 ; i<nColors; i++){

			colors.push(new MyColor(p5,margin + (i * p5.scale.length/(nColors-1)), p5.height - 27, 3, 20));	
		}

		colorOutput = new MyColor(p5,margin, p5.height/2, 30, 30);
		
	}

	p5.setupInputLimits = function(minData, maxData){

		p5.scale.setMinMaxInput(minData, maxData);
	}

	p5.setupOutputLimits = function(minOutput, maxOutput){
		
		p5.scale.setMinMaxOutput(minOutput, maxOutput);

		var step = (p5.scale.maxOutput - p5.scale.minOutput) / (colors.length-1);

		for (var i=0; i< colors.length; i++){

			colors[i].setSaturation(p5.scale.minOutput + (i * step));
		}
	}

	p5.assignInputValue = function (val){

		p5.scale.mappValue(val);

		colorOutput.setSaturation(p5.scale.mappedVal);
	}

	p5.setMapper = function (mapper){

		p5.scale.setMapper(mapper);
	}

	p5.draw = function(){

		// background
		p5.background(240);

		// scale
		p5.scale.show(p5);

		//Channel
		plotOutput(p5);
	}

	var plotOutput = function(p5){

			// tilt marks
			for (var i=0; i< colors.length; i++){

				colors[i].show(p5);
			}

		// show input value in scale
		if (p5.scale.mappedVal != undefined){

			// distance from min in position to mapped value on the scale
			var xIn = p5.scale.getPosFromMinInput();

			// distance from min out position to mapped value on the scale
			var xOut = p5.scale.posOnScale();

			p5.stroke(200, 0 , 0, 200);

			p5.fill(200, 0 , 0, 80);

			p5.line(p5.scale.orgX + xOut , p5.scale.orgY-10, p5.scale.orgX + xOut , p5.scale.orgY+25);

			colorOutput.x = p5.scale.orgX + xOut - colorOutput.wdt/2;

			colorOutput.y = p5.scale.orgY - 20;

			colorOutput.areaColor = p5.color(200, 0 , 0, 200);

			colorOutput.colorStrokeWeight = 1;

			p5.noStroke();

			p5.textAlign(p5.CENTER, p5.BOTTOM);

			p5.text(p5.scale.input, p5.scale.orgX + xOut, p5.scale.orgY - 20);

			p5.textAlign(p5.CENTER, p5.TOP);

			p5.text(p5.nf(p5.scale.mappedVal,0,3), p5.scale.orgX + xOut, p5.scale.orgY + 15);

			p5.fill(0);

			colorOutput.show(p5);

		}
	}

	var MyColor = function (p5, x, y, wdt, hght){

		this.x = x;
		
		this.y = y;

		this.wdt = wdt;

		this.side = hght;

		this.myChroma = chroma(180, 200 , 0);

		this.myColor = p5.color(180, 200 , 0 , 50);

		this.myStrokeWeight = 1;

		this.setSaturation = function (val){

			if (val >=0 || val <=1 ){

				var tmp = this.myChroma.set('hsl.s',val);

				this.myColor = p5.color(tmp.get('rgb.r'), tmp.get('rgb.g'),tmp.get('rgb.b')); 
			}
		}

		this.show = function(p5){

			p5.rectMode(p5.CORNER);

			p5.noStroke();

			p5.fill(this.myColor);

			p5.strokeWeight(this.myStrokeWeight);

			p5.rect(this.x , this.y, this.wdt, this.side);

			p5.rectMode(p5.CORNER);

		}
	}
	
}
var cSaturationInstance = new p5(cSaturation, 'cSaturation');