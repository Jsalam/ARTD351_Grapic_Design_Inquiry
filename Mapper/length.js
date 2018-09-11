var length = function (p5){

	p5.scale;
	var margin = 100;

	p5.setup = function(){
		p5.createCanvas(770,100);
		p5.scale = new Scale();
		p5.scale.setOrigin( margin , p5.height/2, p5.width - 2*margin);
	}

	p5.setupInputLimits = function(minData, maxData){
		p5.scale.setMinMaxInput(minData, maxData);
	}

	p5.setupOutputLimits = function(minOutput, maxOutput){
		p5.scale.setMinMaxOutput(minOutput, maxOutput);
	}

	p5.assignInputValue = function (val){
		p5.scale.mappValue(val);
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


		// thickness marks

			p5.stroke(180,200,0);

			p5.strokeWeight(1);

			p5.line(p5.scale.orgX, p5.scale.orgY +25, p5.scale.orgX, p5.scale.orgY+45);

			p5.strokeWeight(10);

			p5.strokeCap(p5.SQUARE);

			p5.line(p5.scale.orgX + p5.scale.length, p5.scale.orgY+25, p5.scale.orgX + p5.scale.length, p5.scale.orgY+45);

			p5.strokeWeight(1);

		// show input value in scale
		if (p5.scale.mappedVal != undefined){

			// distance from min in position to mapped value on the scale
			var xIn = p5.scale.getPosFromMinInput();

			// distance from min out position to mapped value on the scale
			var xOut = p5.scale.posOnScale();

			// BAR
			p5.noStroke();

			p5.fill(200, 0 , 0, 40);

			p5.rect(p5.scale.orgX, p5.scale.orgY-10, xIn, 10);

			p5.rect(p5.scale.orgX, p5.scale.orgY, xOut, 10);


			// THICKNESS

			p5.stroke(200,0,0);

			var thickness = 0;

			if (p5.scale.minOutput != undefined, p5.scale.maxOutput != undefined){

				thickness = p5.map(p5.scale.mappedVal, p5.scale.minOutput, p5.scale.maxOutput ,1, 10);
			
			} 

			p5.strokeWeight(1);

			p5.line(p5.scale.orgX + xIn , p5.scale.orgY-10, p5.scale.orgX + xIn , p5.scale.orgY);

			p5.strokeWeight(thickness);

			p5.line(p5.scale.orgX + xOut , p5.scale.orgY, p5.scale.orgX + xOut , p5.scale.orgY+10);

			p5.strokeWeight(1);

			p5.strokeCap(p5.ROUND);

			// LABELS

			p5.noStroke();

			// in

			p5.textAlign(p5.CENTER, p5.BOTTOM);

			p5.text(nf(p5.scale.input,0,2), p5.scale.orgX + xIn, p5.scale.orgY - 10);

			// out

			p5.textAlign(p5.CENTER, p5.TOP);

			p5.text(p5.nf(p5.scale.mappedVal,0,2), p5.scale.orgX + xOut, p5.scale.orgY + 15);

			p5.text("(" + p5.nf(thickness,0,1) + ")", p5.scale.orgX + xOut, p5.scale.orgY + 30);

			p5.fill(0);

		}
	}
	
};

var lengthInstance = new p5(length, 'length');