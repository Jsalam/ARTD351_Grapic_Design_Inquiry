
function setup(){
	start();
}

var slider;

var start = function (){
	

	// Set the min and max values of the input range
	document.getElementById("submitInputLimits").onclick = setInputValues;


	// ****** value *******

	slider = document.getElementById("inputValue");

	slider.oninput = function() {
		var val = Number(this.value);
		val = val.toFixed(2);
		setValue(val);
		document.getElementById("inputBox").value = val;
	}

	document.getElementById("submitInputBox").onclick = assignBoxValue;


	// ***** Set the min and max values of the output range
	document.getElementById("submitOutputPosition").onclick = setOutputPosition;

	document.getElementById("submitOutputlength").onclick = setOutputlength;

	document.getElementById("submitOutputTilt").onclick = setOutputTilt;
	
	document.getElementById("submitOutputArea").onclick = setOutputArea;

	document.getElementById("submitOutputSize").onclick = setOutputSize;
	
	document.getElementById("submitOutputCLuminance").onclick = setOutputCLuminance;
	
	document.getElementById("submitOutputCSaturation").onclick = setOutputCSaturation;
	
	document.getElementById("submitOutputCurvature").onclick = setOutputCurvature;

	// ********** Converters ***********
	
	document.getElementById("linear").onclick = setLinearMapper;

	document.getElementById("logarithmic").onclick = setLogarithmicMapper;

	//document.getElementById("exponential").onclick = setExponentialValue;
}


var setLinearMapper = function (){

	positionInstance.setMapper("linear");

	lengthInstance.setMapper("linear");

	tiltInstance.setMapper("linear");

	areaInstance.setMapper("linear");

	sizeInstance.setMapper("linear");

	cLuminanceInstance.setMapper("linear");

	cSaturationInstance.setMapper("linear");

	curvatureInstance.setMapper("linear");

}


var setLogarithmicMapper = function (){

	positionInstance.setMapper("logarithmic");

	lengthInstance.setMapper("logarithmic");

	tiltInstance.setMapper("logarithmic");

	areaInstance.setMapper("logarithmic");

	sizeInstance.setMapper("logarithmic");

	cLuminanceInstance.setMapper("logarithmic");

	cSaturationInstance.setMapper("logarithmic");

	curvatureInstance.setMapper("logarithmic");

}

/*
Set the min and max input values from the GUI to the instance
*/
var setInputValues = function (){

	this.inputScale = [];

	this.minC = Number(document.getElementById("minC").value);

	this.maxC = Number(document.getElementById("maxC").value);

	// update slider limits
	var inputValue = document.getElementById("inputValue");

	inputValue.min = this.minC;

	inputValue.max = this.maxC;

	// Pass limits to instances

	if (this.minC != this.maxC && this.minC < this.maxC){

		this.inputScale.push(this.minC, this.maxC);

		positionInstance.setupInputLimits(this.minC, this.maxC);

		lengthInstance.setupInputLimits(this.minC, this.maxC);

		tiltInstance.setupInputLimits(this.minC, this.maxC);

		areaInstance.setupInputLimits(this.minC, this.maxC);

		sizeInstance.setupInputLimits(this.minC, this.maxC);

		cLuminanceInstance.setupInputLimits(this.minC, this.maxC);

		cSaturationInstance.setupInputLimits(this.minC, this.maxC);

		curvatureInstance.setupInputLimits(this.minC, this.maxC);

	}else {

		console.log("Input equals to output or switched order. Change Values");
	}
}

/*
Pass the input value from the GUI slider to the instance
*/
var setValue = function(val){

	if (val >= positionInstance.scale.minData && positionInstance.scale.maxData >= val){

		positionInstance.assignInputValue(val);

		lengthInstance.assignInputValue(val);

		tiltInstance.assignInputValue(val);

		areaInstance.assignInputValue(val);

		sizeInstance.assignInputValue(val);

		cLuminanceInstance.assignInputValue(val);

		cSaturationInstance.assignInputValue(val);

		curvatureInstance.assignInputValue(val);
	} else {

		if (positionInstance.scale.minData == undefined){

			window.alert("The input scale range has not been initialized ");

			slider.value = 0;

		} else {

			window.alert("The value entered is out of the input scale range");

			slider.value = positionInstance.scale.minData;

		}

	}

}

/*
Pass the input value from the GUI number box to the slider and then to the instance
*/

var assignBoxValue = function (){

	var val = Number (document.getElementById("inputBox").value);
	console.log (val)
	slider.value = val;
	setValue(val);
}


/*
Gets the min and max output values from the GUI
*/
var getOutputLimits = function( divID ){

	this.outScale = [];

	// min
	this.minL = Number(document.getElementById("minScale" + divID).value);

	// max
	this.maxL = Number(document.getElementById("maxScale" + divID).value);

	if (minL != maxL && minL < maxL){
		this.outScale.push(this.minL);
		this.outScale.push(this.maxL);
		return outScale;
	} else {

		window.alert("Min equals to Max or switched order. Change Values");
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputPosition = function (){

	this.vals = getOutputLimits("Position");

	if (this.vals != undefined){

		positionInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputlength = function (){

	this.vals = getOutputLimits("length");

	if (this.vals != undefined){

		lengthInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputTilt = function (){

	this.vals = getOutputLimits("Tilt");

	if (this.vals != undefined){

		tiltInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputArea = function (){

	this.vals = getOutputLimits("Area");

	if (this.vals != undefined){

		areaInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputSize = function (){

	this.vals = getOutputLimits("Size");

	if (this.vals != undefined){

		sizeInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputCLuminance = function (){

	this.vals = getOutputLimits("Luminance");

	if (this.vals != undefined){

		cLuminanceInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputCSaturation = function (){

	this.vals = getOutputLimits("Saturation");

	if (this.vals != undefined){

		cSaturationInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}

/*
Pass the min and max output values from the GUI to the instance
*/
var setOutputCurvature = function (){

	this.vals = getOutputLimits("Curvature");

	if (this.vals != undefined){

		curvatureInstance.setupOutputLimits(this.vals[0], this.vals[1]);
	}
}