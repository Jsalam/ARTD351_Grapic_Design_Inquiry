var Curvature = function (p5){

	p5.scale;
	var margin = 100;
	var curves = [];
	var curvelOutput;

	p5.setup = function(){
		p5.createCanvas(770,100);

		p5.scale = new Scale();

		p5.scale.setOrigin( margin , p5.height/2, p5.width - 2*margin);

		var nCurves = 21;

		for (var i = 0; i < nCurves; i++){

			curves.push(new Curve(p5, margin + (i * p5.scale.length/(nCurves-1)), p5.height/2, 30));
		}

		curveOutput = new Curve(p5, margin, p5.height/2, 30) ;
	}

	p5.setupInputLimits = function(minData, maxData){
		p5.scale.setMinMaxInput(minData, maxData);

	}

	p5.setupOutputLimits = function(minOutput, maxOutput){
		
		p5.scale.setMinMaxOutput(minOutput, maxOutput);

		var step = (p5.scale.maxOutput - p5.scale.minOutput) / (curves.length-1);

		for (var i=0; i< curves.length; i++){

			curves[i].setTightness(p5.scale.minOutput + (i * step));
		}
	}

	p5.assignInputValue = function (val){

		p5.scale.mappValue(val);

		if (p5.scale.mapper == "linear"){
			curveOutput.setTightness(p5.scale.mappedVal);

		}else if (p5.scale.mapper == "logarithmic"){
			curveOutput.setTightness(p5.scale.getMappedValueInRange(p5.scale.minOutput,p5.scale.maxOutput));
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
		for (var i=0; i< curves.length; i++){

			curves[i].show(p5);
		}


		


		// show input value in scale
		if (p5.scale.mappedVal != undefined){

			// distance from min in position to mapped value on the scale
			var xIn = p5.scale.getPosFromMinInput();

			// distance from min out position to mapped value on the scale
			if (p5.scale.mapper == "linear"){
				xOut = p5.scale.posOnScale();

			}else if (p5.scale.mapper == "logarithmic"){
				xOut = p5.scale.getMappedValueInRange(0,p5.scale.length);
			}

			p5.stroke(200, 0 , 0, 200);

			p5.fill(200, 0 , 0, 80);

			//p5.line(p5.scale.orgX + x , p5.scale.orgY-10, p5.scale.orgX + x , p5.scale.orgY+15);

			curveOutput.x = p5.scale.orgX + xOut;

			curveOutput.y = p5.height/2 - curveOutput.lngth;

			curveOutput.myColor = p5.color(200, 0 , 0, 200);

			curveOutput.myStrokeWeight = 3;

			p5.noStroke();

			p5.textAlign(p5.CENTER, p5.BOTTOM);

			p5.text(p5.scale.input, p5.scale.orgX + xOut, p5.scale.orgY - 20);

			p5.textAlign(p5.CENTER, p5.TOP);

			p5.text(p5.nf(curveOutput.tightness,0,2), p5.scale.orgX + xOut, p5.scale.orgY + 15);

			p5.fill(0);

			curveOutput.show(p5);

		}
	}

	var Curve = function (p5, x, y, lngth){

		this.x = x;
		
		this.y = y;
		
		this.lngth = lngth;
		
		this.tightness = 0;

		this.myColor = p5.color(180, 200 , 0 );

		this.myStrokeWeight = 1;

		this.setTightness = function (val){

			this.tightness = val;

		}

		this.show = function(p5){

			p5.stroke(this.myColor);

			p5.strokeWeight(this.myStrokeWeight);

			p5.noFill();

			p5.bezier(this.x, this.y, 
				this.x + this.tightness, this.y + this.tightness, 
				this.x - this.tightness, this.y + lngth - this.tightness, 
				this.x, this.y + lngth);

		}
	}
	
}
var curvatureInstance = new p5(Curvature, 'Curvature');