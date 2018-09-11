var ColorBlock = function(p5, color){
	this.x = 0;
	this.y = 0;
	this.myWidth = blockSize;
	this.myHeight = blockSize;
	this.sourceColor = color;
	

	// RGB
	this.red = p5.red(color);
	this.green = p5.green(color);
	this.blue = p5.blue(color);

	// Chroma color
	this.chromaColor = chroma(this.red , this.green , this.blue);
	this.ID = this.chromaColor.hex();
	
	// HSV
	this.hue = chroma(this.chromaColor).get('hsv.h');
	this.saturation = chroma(this.chromaColor).get('hsv.s');
	this.val = chroma(this.chromaColor).get('hsv.v');

	// CIE Lab
	this.lightness = chroma(this.chromaColor).get('lab.l');
	this.a = chroma(this.chromaColor).get('lab.a');
	this.b = chroma(this.chromaColor).get('lab.b');

	// Luminance
	this.luminance = chroma(this.chromaColor).luminance();

	this.showOriginalColor = function (p5){
		if (this.isMouseOver(p5)){
			p5.fill(this.sourceColor);
			p5.rect(p5.mouseX, p5.mouseY, this.myWidth, this.myHeight);
		}
	}

	this.display = function(p5, mode, x, y){
		switch(mode){
			case"switch_Luminance":
				this.displayLuminance(p5, x, y);
				break;
			case"switch_Hue":
				this.displayHue(p5, x, y);
				break;
			case"switch_Saturation":
				this.displaySaturation(p5, x, y);
				break;
			case"switch_Value":
				this.displayValue(p5, x, y);
				break;
			default:
				this.displayNormal(p5, x, y);
		}
	}

	this.displayNormal = function(p5,x,y){
		this.x = x;
		this.y = y;
		p5.noStroke();
		p5.fill(this.sourceColor);
		p5.rect(this.x,this.y,this.myWidth,this.myHeight);
	}

	this.displayLuminance = function(p5,x,y){
		this.x = x;
		this.y = y;
		p5.noStroke();
		p5.fill(p5.map(this.luminance,0,1,0,255));
		p5.rect(this.x,this.y ,this.myWidth,this.myHeight );
	}

	this.displayHue = function(p5,x,y){
		this.x = x;
		this.y = y;
		p5.noStroke();
		p5.colorMode(p5.HSB,360,1,1);
		p5.fill(this.hue, 1, 1);
		p5.rect(this.x,this.y ,this.myWidth,this.myHeight );
		p5.colorMode(p5.RGB,255);
	}

	this.displaySaturation = function(p5,x,y){
		this.x = x;
		this.y = y;
		p5.noStroke();
		p5.colorMode(p5.HSB,360,1,1);
		p5.fill(this.hue, this.saturation, 1);
		p5.rect(this.x,this.y ,this.myWidth,this.myHeight );
		p5.colorMode(p5.RGB,255);
	}


	this.displayValue = function(p5,x,y){
		this.x = x;
		this.y = y;
		p5.noStroke();
		p5.colorMode(p5.HSB,360,1,1);
		p5.fill(this.val);
		p5.rect(this.x,this.y ,this.myWidth,this.myHeight );
		p5.colorMode(p5.RGB,255);
	}

	this.blockID = function(){
		return this.ID;
	}

	this.getRGB = function(){
		return (this.normalizeColorVal(this.red,255) + " " 
			+ this.normalizeColorVal(this.green,255) + " " 
			+ this.normalizeColorVal(this.blue,255));
	}

	this.getHSV = function(){
		return (this.normalizeColorVal(this.hue,360) + " " 
			+ this.saturation + " "
			+ this.val);
	}

	this.getLab = function(){
		return (this.lightness + " "+ this.a + " "+ this.b);
	}

	this.normalizeColorVal = function(val, max){
		return (val/max);
	}

	this.isMouseOver = function (p5){
		if (p5.mouseX > this.x && p5.mouseX < this.x + this.myWidth && p5.mouseY > this.y && p5.mouseY < this.y + this.myHeight){
			return true;
		} else{
			
			return false;
		}
	}
}