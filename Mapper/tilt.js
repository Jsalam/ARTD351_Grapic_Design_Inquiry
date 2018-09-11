var Tilt = function (p5){

	p5.scale;
	var margin = 100;
	var dials = [];
	var dialOutput;

	p5.setup = function(){
		p5.createCanvas(770,100);

		p5.scale = new Scale();

		p5.scale.setOrigin( margin , p5.height/2, p5.width - 2*margin);

		var nDials = 7;

		for (var i = 0; i < nDials; i++){

			dials.push(new Dial(p5, margin + (i * p5.scale.length/(nDials-1)), p5.height/2, 20));
		}

		dialOutput = new Dial(p5, margin, p5.height/2, 30) ;
	}

	p5.setupInputLimits = function(minData, maxData){
		p5.scale.setMinMaxInput(minData, maxData);

	}

	p5.setupOutputLimits = function(minOutput, maxOutput){
		
		p5.scale.setMinMaxOutput(minOutput, maxOutput);

		var step = (p5.scale.maxOutput - p5.scale.minOutput) / (dials.length-1);

		for (var i=0; i< dials.length; i++){

			dials[i].setAngle(p5.scale.minOutput + (i * step));
		}
	}

	p5.assignInputValue = function (val){
	
		p5.scale.mappValue(val);

		// the engle in degrees
		dialOutput.setAngle(p5.scale.mappedVal);
	
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
		for (var i=0; i< dials.length; i++){

			dials[i].show(p5);
		}

		// show input value in scale
		if (p5.scale.mappedVal != undefined){

			// distance from min in position to mapped value on the scale
			// var xIn = p5.scale.getPosFromMinInput();

			// distance from min out position to mapped value on the scale
			var xOut = p5.scale.posOnScale();

			p5.stroke(200, 0 , 0, 200);

			p5.fill(200, 0 , 0, 80);

			dialOutput.x = p5.scale.orgX + xOut;

			dialOutput.dialColor = p5.color(200, 0 , 0, 200);

			dialOutput.dialStrokeWeight = 3;

			p5.noStroke();

			p5.textAlign(p5.CENTER, p5.BOTTOM);

			p5.text(p5.scale.input, p5.scale.orgX + xOut, p5.scale.orgY - 20);

			p5.textAlign(p5.CENTER, p5.TOP);

			if (p5.scale.mapper == "linear"){

				p5.text(p5.nf(p5.scale.mappedVal,0,1), p5.scale.orgX + xOut, p5.scale.orgY + 15);

			} else if (p5.scale.mapper == "logarithmic"){
				
				//p5.text(p5.nf(p5.scale.posFromScaleOrigin(),0,1), p5.scale.orgX + xOut, p5.scale.orgY + 15);
			}

			p5.fill(0);

			dialOutput.show(p5);

		}
	}

	var Dial = function (p5, x, y, radius){

			this.x = x;
		
			this.y = y;
		
			this.radius = radius;
		
			this.angle = 0;

			this.dialColor = p5.color(180, 200 , 0 );

			this.dialStrokeWeight = 1;

			this.setAngle = function (val){

				this.angle = val;
			}

			this.show = function(p5){

				p5.angleMode(DEGREES);
		
				p5.ellipseMode(p5.CENTER);

				p5.stroke(this.dialColor);

				p5.strokeWeight(this.dialStrokeWeight);
		
				p5.ellipse(this.x, this.y, 5, 5);

				var xT = p5.cos(this.angle) * this.radius;

				var yT = p5.sin(this.angle) * this.radius;

				p5.line(this.x, this.y,this.x + xT, this.y + yT);

				p5.angleMode(RADIANS);

			}
	}
	
}
var tiltInstance = new p5(Tilt, 'Tilt');