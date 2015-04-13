var svgNS = 'http://www.w3.org/2000/svg';


function gFigure (width, height, parentId, figureId) {

	this.width = width;
	this.height = height;
	this.parentId = parentId;

	if (typeof(figureId)==='undefined')
		this.figureId = 'SVG';
	else
		this.figureId = figureId;

	this.putFigure = function (className) {
	var svg = document.createElementNS(svgNS, 'svg');
	svg.setAttributeNS(null,'xlink','http://www.w3.org/1999/xlink');
	svg.setAttributeNS(null,'width',this.width);
	svg.setAttributeNS(null,'height',this.height);
	svg.setAttributeNS(null,'id',this.figureId);

	if (typeof(className)!=='undefined') 
			svg.setAttributeNS(null,'class',className);

	document.getElementById(this.parentId).appendChild(svg);
	}
}


function gPoint (x,y,pointId) {

	this.x = x;
	this.y = y;
	if (typeof(pointId)!=='undefined') this.id = pointId;

	this.putPoint = function (className) {
		var Point = document.createElementNS(svgNS,'circle');
		Point.setAttributeNS(null,'cx',this.x);
		Point.setAttributeNS(null,'cy',this.y);
		Point.setAttributeNS(null,'r',3);
		
		if (typeof(this.id)!=='undefined') 
			Point.setAttributeNS(null,'id',this.id);

		if (typeof(className)==='undefined') {
			Point.setAttributeNS(null,'fill','black');
			Point.setAttributeNS(null,'stroke','none');
		} else {
			Point.setAttributeNS(null,'class',className);
		}	

		document.getElementById(currentFigure).appendChild(Point);
	}
}


function gLabel (L,point,dx,dy) {

	if (typeof(dx)==='undefined') dx = 0;
	if (typeof(dy)==='undefined') dy = -10;

	this.L = L;
	this.x = point.x + dx;
	this.y = point.y + dy;

	this.putLabel = function (className) {
		var Label = document.createElementNS(svgNS,'text');
		Label.setAttribute('x', this.x);
		Label.setAttribute('y', this.y);
		Label.textContent = this.L;
	
		if (typeof(className)==='undefined') {
			Label.setAttributeNS(null,'class','label');
		} else {
			Label.setAttributeNS(null,'class',className);
		}	

		document.getElementById(currentFigure).appendChild(Label);
	}
}


function hShiftPointA2B (pointA, pointB, delta) {
	var vlx = pointB.x - pointA.x;
	var vly = pointB.y - pointA.y;
	var dis = Math.sqrt(vlx*vlx + vly*vly);
	var cos = vlx/dis;
	var sin = vly/dis;

	var shiftA = new gPoint(pointA.x + delta*cos, pointA.y + delta*sin);

	return shiftA;
}


function gSegment (pointA, pointB, dA, dB) {
	if (typeof(dA)==='undefined') dA = 0;
	if (typeof(dB)==='undefined') dB = 0;

	this.vlx = pointB.x - pointA.x;
	this.vly = pointB.y - pointA.y;
	this.dis = Math.sqrt(this.vlx*this.vlx + this.vly*this.vly);
	this.cos = this.vlx/this.dis;
	this.sin = this.vly/this.dis;

	if (dA === 0) {
		this.x1 = pointA.x;
		this.y1 = pointA.y;
	} else {
		this.x1 = pointA.x - dA*this.cos;
		this.y1 = pointA.y - dA*this.sin;
	}


	if (dB === 0) {
		this.x2 = pointB.x;
		this.y2 = pointB.y;
	} else {
		this.x2 = pointB.x + dB*this.cos;
		this.y2 = pointB.y + dB*this.sin;
	}

	
}


function gAngleABC (pointA, pointB, pointC, radius) {
	if (typeof(radius)==='undefined') {this.radius = 10;} else {this.radius = radius;};

	this.sA = hShiftPointA2B (pointB, pointA, radius);
	this.sB = hShiftPointA2B (pointB, pointC, radius);

	
} 




// var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
// svg.setAttribute('xlink','http://www.w3.org/1999/xlink');
// svg.setAttribute('width','187');
// svg.setAttribute('height','234');

// var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
// rect.setAttribute('width','187');
// rect.setAttribute('height','234');
// rect.setAttribute('fill','#fff');
// rect.setAttribute('stroke','#000');
// rect.setAttribute('stroke-width','2');
// rect.setAttribute('rx','7');

// var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
// text.setAttribute('x', '10');
// text.setAttribute('y', '20');
// text.setAttribute('fill', '#000');
// text.textContent = '2';

// svg.appendChild(rect);
// svg.appendChild(text); 

// var wp = document.getElementById('wrapper'); 
// wp.appendChild(svg);

































function createCircle()
{

    var myCircle = document.createElementNS(svgNS,'circle'); //to create a circle. for rectangle use 'rectangle'
    myCircle.setAttributeNS(null,'id','mycircle');
    myCircle.setAttributeNS(null,'cx',100);
    myCircle.setAttributeNS(null,'cy',100);
    myCircle.setAttributeNS(null,'r',50);
    myCircle.setAttributeNS(null,'fill','black');
    myCircle.setAttributeNS(null,'stroke','none');

    document.getElementById('mySVG').appendChild(myCircle);
}    


