var Size = function (p5){

	p5.scale;

	var margin = 100;
	
	var sizes = [];
	
	var sizeOutput;


	p5.setup = function(){
		p5.createCanvas(770,100);

		p5.scale = new Scale();
		
		p5.scale.setOrigin( margin , p5.height/2, p5.width - 2*margin);

		var nSizes = 11;
		
		for (var i=0 ; i<nSizes; i++){

			sizes.push(new size(p5,margin + (i * p5.scale.length/(nSizes-1)), p5.height - 30, 30));	
		}

		sizeOutput = new size(p5,margin, p5.height/2, 30);
		
	}

	p5.setupInputLimits = function(minData, maxData){

		p5.scale.setMinMaxInput(minData, maxData);
	}

	p5.setupOutputLimits = function(minOutput, maxOutput){
		
		p5.scale.setMinMaxOutput(minOutput, maxOutput);

		var step = 100 / (sizes.length);

		for (var i=0; i< sizes.length; i++){

			sizes[i].setPercentage(p5.scale.minOutput + (i * step));
		}
	}

	p5.assignInputValue = function (val){

		p5.scale.mappValue(val);

		sizeOutput.setPercentage(p5.scale.getMappedValueInRange(0,100));

		sizeOutput.setPercentage(p5.scale.getMappedValueInRange(0,100));
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
			for (var i=0; i< sizes.length; i++){

				sizes[i].show(p5);
			}

		// show input value in scale
		if (p5.scale.mappedVal != undefined){

			// distance from min in position to mapped value on the scale
			var xIn = p5.scale.getPosFromMinInput();

			// distance from min out position to mapped value on the scale
			
			var xOut;

			if (p5.scale.mapper == "linear"){
				xOut = p5.scale.posOnScale();

			}else if (p5.scale.mapper == "logarithmic"){
				xOut = p5.scale.getMappedValueInRange(0,p5.scale.length);
			}

			p5.stroke(200, 0 , 0, 100);

			p5.fill(200, 0 , 0, 80);

			sizeOutput.x = p5.scale.orgX + xOut;

			sizeOutput.y = p5.scale.orgY - 20;

			sizeOutput.myColor = p5.color(200, 0 , 0, 200);

			sizeOutput.myStrokeWeight = 1;

			p5.noStroke();

			p5.textAlign(p5.CENTER, p5.BOTTOM);

			p5.text(p5.scale.input, p5.scale.orgX + xOut, p5.scale.orgY - 20);

			p5.textAlign(p5.CENTER, p5.TOP);

			p5.text(p5.nf(p5.scale.getMappedValueInRange(p5.scale.minOutput,p5.scale.maxOutput),0,2), p5.scale.orgX + xOut, p5.scale.orgY + 15);

			p5.fill(0);

			sizeOutput.show(p5);

		}
	}

	var size = function (p5, x, y, side){

		this.x = x;
		
		this.y = y;

		this.maxDiam = side;

		this.percentage = 0;

		this.myColor = p5.color(180, 200 , 0, 100);

		this.myStrokeWeight = 1;

		this.setPercentage = function (val){

			this.percentage = val/100;

		}

		this.show = function(p5){

			p5.rectMode(p5.CORNER);

			p5.stroke(this.myColor);

			p5.fill(this.myColor);

			var diam = (this.maxDiam * this.percentage);

			p5.ellipse(this.x, this.y, 5 + diam, 5 + diam);

			p5.rectMode(p5.CORNER);

		}
	}
	
}
var sizeInstance = new p5(Size, 'Size');