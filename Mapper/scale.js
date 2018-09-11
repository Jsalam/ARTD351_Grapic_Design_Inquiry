var Scale = function(){
	this.orgX;
	this.orgY;
	this.length;
	this.minData;
	this.maxData;
	this.minOutput;
	this.maxOutput;
	this.unit;
	this.input;
	this.mappedVal;
	this.mapper = "linear";
	this.forcedMapped = false;


	this.setOrigin = function(orgX, orgY, length){
		this.orgX = orgX;
		this.orgY = orgY;
		this.length = length;
	}

	this.setMinMaxInput = function(minData, maxData){
		this.minData = minData;
		this.maxData = maxData;
		//console.log("scale + limits defined" + this.minData + " " + this.maxData + " "+ this.minOutput + " "+ this.maxOutput);
	}

	this.setMinMaxOutput = function(minOutput, maxOutput){
		this.minOutput = minOutput;
		this.maxOutput = maxOutput;
		//console.log("scale + limits defined" + this.minData + " " + this.maxData + " "+ this.minOutput + " "+ this.maxOutput);
	}

	this.setUnit = function (val){
		this.unit = val;
	}

	this.setMapper = function (val){
		this.mapper = val;
	}

	// Mapping values
	this.mappValue = function (val){

		if (val >= this.minData && val <= this.maxData){

			this.input = val;

			switch(this.mapper){

				case "linear":
				this.mappedVal = this.linearMapping(this.input);
				break;

				// case "exponential":
				// this.mappedVal = this.exponentialMapping(this.input);
				// break;

				case "logarithmic":

				if (this.minOutput != undefined){

					if (this.minOutput >= 0){

						if (val > 0){

							this.mappedVal = Math.log10(this.input);

						}else{
							
							console.log ("Logarithmic scale! The value to be mapped ("+val+") must be larger than 0")
						}

					}else {

						window.alert("Logarithmic scale! The min output("+this.minOutput+") must be positive");
					}
				}
				break;
			}

			this.forcedMapped = false;

			if (this.minOutput > this.mappedVal  || this.mappedVal > this.maxOutput){

				console.log("Mapped value exceeds output scale limits. Value: " + this.mappedVal + ". Output scale limits: " + this.minOutput+" to " + this.maxOutput);

				this.mappedVal = this.getMappedValueInRange(this.minOutput, this.maxOutput);

				this.forcedMapped = true;
			}

		}else{
			if (this.minData == undefined || this.maxData == undefined){

				window.alert("Input limits are undefined. Min: " + this.minData+", Max: " + this.maxData);

			} else {

				window.alert("Value exceeds scale limits. Value: " + val + " Scale limits: " + this.minData+" - " + this.maxData);

			}
		}

	}

	this.linearMapping = function (val){
		return this.minOutput + (this.maxOutput - this.minOutput) * ((val - this.minData) / (this.maxData - this.minData));
	}

	this.linearMapping2 = function (val,minIn, maxIn, minOut, maxOut){
		return minOut + (maxOut - minOut) * ((val - minIn) / (maxIn - minIn));
	}

	this.getMappedValueInRange = function(minOut, maxOut){

		if (this.mapper == "linear"){

			return this.linearMapping2(this.mappedVal, this.minOutput, this.maxOutput, minOut, maxOut);

		} else if (this.mapper == "logarithmic"){

			var minIn = Math.log10(this.minData);

			var maxIn = Math.log10(this.maxData);

			if (minIn < 0 || minIn == NaN){
				minIn = 0;
			}

			return this.linearMapping2(this.mappedVal, minIn, maxIn, minOut, maxOut);

		}

	}


	this.posOnScale = function (){

		var x;

		if (this.mapper == "linear"){
			x = ((this.mappedVal - this.minOutput) / (this.maxOutput - this.minOutput)) *  this.length;

			if (x == NaN){
				x = 0;
			}

		} else if (this.mapper == "logarithmic"){

			var minIn = Math.log10(this.minData);

			var maxIn = Math.log10(this.maxData);

			if (minIn < 0 || minIn == NaN){
				minIn = 0;
			}

			//x = this.linearMapping2(this.mappedVal, minIn, maxIn, 0, this.length);

			x = this.linearMapping2(this.mappedVal, this.minOutput, this.maxOutput, 0, this.length);
		}

		return x;
	}

	this.getPosFromMinInput = function (){

		var x = (( this.input - this.minData) / (this.maxData - this.minData)) *  this.length;

		if (x == NaN){
			x = 0;
		}

		return x;
	}


	// Displaying scale

	this.show = function(p5){
		// check that the basic coordinates are assigned
		if (this.orgX != undefined && this.orgY != undefined && this.length != undefined){

			p5.stroke(100,20);

			p5.fill(100,100);

			p5.line(this.orgX, this.orgY, this.orgX + this.length, this.orgY);

			p5.textAlign(p5.LEFT, p5.BOTTOM);

			p5.noStroke();

			p5.text(this.mapper, p5.width - 70, p5.height - 10);
			
			// Check that the INPUT limits are assigned
			if ( this.minData != undefined && this.maxData != undefined){

				p5.fill(100,100);

				p5.noStroke();

				p5.textAlign(p5.CENTER, p5.BOTTOM);

				p5.text("Input ", this.orgX - 50, this.orgY - 5);

				p5.text(this.minData, this.orgX, this.orgY - 5);

				p5.text(this.maxData, this.orgX + this.length ,this.orgY - 5);

				// Check that the OUTPUT limits are defined 

				if (this.minOutput != undefined && this.maxOutput != undefined){

					p5.textAlign(p5.CENTER, p5.TOP);

					if (this.forcedMapped){

						p5.fill(255,0,0);

						p5.text("Forced output ", this.orgX - 60, this.orgY + 7.5);
					} else {

						p5.text("Output ", this.orgX - 50, this.orgY + 7.5);
					}

					

					p5.text(this.minOutput, this.orgX, this.orgY + 7.5);

					p5.text(this.maxOutput, this.orgX + this.length, this.orgY + 7.5);

					p5.textAlign(p5.LEFT);

					// Check that the scale unit is assigned

					if (this.unit != undefined){

						var steps = this.length / this.unit;
						
						for(var i=0; i<= steps ; i++){

							p5.ellipse(this.orgX + i* this.unit , this.orgY, 5, 5);
						}

					} else {

						// default unit

						//this.unit = this.length/10;

					}


				} else{

				// default output limits
				p5.noStroke();
				p5.text("Output undefined", 50,80);

			}

		} else{

				// default scale limits
				p5.noStroke();
				p5.text("Input undefined", 10,40);

			}

		} else{

			p5.noStroke();
			p5.text("Coordinates undefined", 10,20);
			// default basic coordinates

		}

	}

}