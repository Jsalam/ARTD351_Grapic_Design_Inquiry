var Area = function (p5){

	p5.scale;

	var margin = 100;
	
	var areas = [];
	
	var areaOutput;


	p5.setup = function(){
		p5.createCanvas(770,100);

		p5.scale = new Scale();
		
		p5.scale.setOrigin( margin , p5.height/2, p5.width - 2*margin);

		var nAreas = 11;
		
		for (var i=0 ; i<nAreas; i++){

			areas.push(new area(p5,margin + (i * p5.scale.length/(nAreas-1)), p5.height - 30, 20));	
		}

		areaOutput = new area(p5,margin, p5.height/2, 30);
		
	}

	p5.setupInputLimits = function(minData, maxData){

		p5.scale.setMinMaxInput(minData, maxData);
	}

	p5.setupOutputLimits = function(minOutput, maxOutput){
		
		p5.scale.setMinMaxOutput(minOutput, maxOutput);

		var step = (p5.scale.maxOutput - p5.scale.minOutput) / (areas.length-1);

		for (var i=0; i< areas.length; i++){

			areas[i].setPercentage(p5.scale.minOutput + (i * step));
		}
	}

	p5.assignInputValue = function (val){
		p5.scale.mappValue(val);

		if (p5.scale.mapper == "linear"){
			areaOutput.setPercentage(p5.scale.mappedVal);

		}else if (p5.scale.mapper == "logarithmic"){
			areaOutput.setPercentage(p5.scale.getMappedValueInRange(0,100));
		}
		
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
			for (var i=0; i< areas.length; i++){

				areas[i].show(p5);
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

			areaOutput.x = p5.scale.orgX + xOut;

			areaOutput.y = p5.scale.orgY - 20;

			areaOutput.areaColor = p5.color(200, 0 , 0, 200);

			areaOutput.areaStrokeWeight = 1;

			p5.noStroke();

			p5.textAlign(p5.CENTER, p5.BOTTOM);

			p5.text(p5.scale.input, p5.scale.orgX + xOut, p5.scale.orgY - 20);

			p5.textAlign(p5.CENTER, p5.TOP);

			p5.text(p5.nf(areaOutput.percentage*100,0,2) + "%", p5.scale.orgX + xOut, p5.scale.orgY + 15);

			p5.fill(0);

			areaOutput.show(p5);

		}
	}

	var area = function (p5, x, y, side){

		this.x = x;
		
		this.y = y;

		this.side = side;

		this.percentage = 0;

		this.areaColor = p5.color(180, 200 , 0);

		this.areaStrokeWeight = 1;

		this.setPercentage = function (val){

			this.percentage = (val / p5.scale.maxOutput);
		}

		this.show = function(p5){

			p5.rectMode(p5.CORNER);

			p5.stroke(this.areaColor);

			p5.noFill();

			p5.strokeWeight(this.areaStrokeWeight);

			p5.rect(this.x - this.side/2, this.y, this.side, this.side);

			p5.fill(this.areaColor);

			p5.rect(this.x - this.side/2, this.y, this.side , this.side * this.percentage);


			p5.rectMode(p5.CORNER);

		}
	}
	
}
var areaInstance = new p5(Area, 'Area');