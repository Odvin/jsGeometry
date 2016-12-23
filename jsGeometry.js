// jsGeometry (v 0.0.2)

var gElement;
gElement = {

	Pattern: function () {},

	Picture: function (parentId, width, height) {

		this.parentId = parentId;
		this.id = parentId + '-svg';

		this.width = width;
		this.height = height;

		this.unitX = 100;
		this.unitY = 100;

		this.Ox = 0;
		this.Oy = height;

		this.OxNegativeLength = 1;
		this.OxPositiveLength = 3;

		this.OxNegativeLength = 1;
		this.OxPositiveLength = 3;

        this.draw = true;
	},

	Point: function (x, y) {

		this.is = 'point';

		if (arguments[2] == null) {

			// Cartesian Point(x, y)

			this.x = x;
			this.y = y;

		} else if (arguments[2] == 'rad') {

			//Polar Point(ro, alpha, 'rad')

			this.x = x*Math.cos(y);
			this.y = x*Math.sin(y);

		} else if (arguments[2] == 'deg') {

			//Polar Point(ro, alpha, 'deg')

			this.x = x*Math.cos(y*Math.PI/180);
			this.y = x*Math.sin(y*Math.PI/180);

		} else {
			
			//Error

			this.x = 0;
			this.y = 0;

		}

		this.r = 4;

		this.cssClass = 'point';
	},

	Segment: function (pointA, pointB) {

		this.is = 'segment';

		this.x1 = pointA.x;
		this.y1 = pointA.y;

		this.x2 = pointB.x;
		this.y2 = pointB.y;

		this.cssClass = 'l-main';
	},

	Vector: function () {

		if (arguments[0].is == 'segment') {

			// Vector(segment)

			this.x = arguments[0].x2 - arguments[0].x1;
			this.y = arguments[0].y2 - arguments[0].y1;

			this.x1 = arguments[0].x1;
			this.y1 = arguments[0].y1;

			this.x2 = arguments[0].x2;
			this.y2 = arguments[0].y2;

		} else if (typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {

			//Vector(coordinateX, coordinateY)

			this.x = arguments[0];
			this.y = arguments[1];

			this.x1 = 0;
			this.y1 = 0;

			this.x2 = arguments[0];
			this.y2 = arguments[1];

		} else if (arguments[0].is == 'point' && arguments[1].is == 'point') {

			// Vector(pointA, pointB)

			this.x = arguments[1].x - arguments[0].x;
			this.y = arguments[1].y - arguments[0].y;

			this.x1 = arguments[0].x;
			this.y1 = arguments[0].y;

			this.x2 = arguments[1].x;
			this.y2 = arguments[1].y;

		} else {
			
			//Error

			this.x = 0;
			this.y = 0;

			this.x1 = 0;
			this.y1 = 0;

			this.x2 = 0;
			this.y2 = 0;
		}
		
		this.is = 'vector';
		this.cssClass = 'l-main';
	},
	
	Line: function () {

		// Ax + By + C = 0

		if( arguments[0].is == 'segment' ) {

			// Arguments (segment)

			this.A = arguments[0].y2 - arguments[0].y1;

			this.B = arguments[0].x1 - arguments[0].x2;

			this.C = arguments[0].y1 * (arguments[0].x2 - arguments[0].x1) - arguments[0].x1 * (arguments[0].y2 - arguments[0].y1);
			
		} else if (arguments[0].is == 'vector' && arguments[1].is == 'point') {

			// Arguments (vector, point)

			this.A =  arguments[0].y;

			this.B = -arguments[0].x;

			this.C = arguments[1].y * arguments[0].x - arguments[1].x * arguments[0].y;

		} else if ( arguments[0].is == 'point' && arguments[1].is == 'point' ) {

			// Arguments (pointA, pointB)

			this.A = arguments[1].y - arguments[0].y;

			this.B = arguments[0].x - arguments[1].x;

			this.C = arguments[0].y * (arguments[1].x - arguments[0].x) - arguments[0].x * (arguments[1].y - arguments[0].y);
		
		} else if ( typeof arguments[0] == 'number' && typeof arguments[1] == 'number' && typeof arguments[2] == 'number' ) {

			// Arguments (A, B, C)

			this.A = A;
			this.B = B;
			this.C = C;

		} else {

			// Error

			this.A = 0;
			this.B = 0;
			this.C = 0;

		}


		this.is = 'line';

		this.cssClass = 'l-help';
	},

	Circle: function () {

		if (arguments[0].is == 'point' && typeof arguments[1] == 'number') {

			// Circle(point, radius)

			this.x = arguments[0].x;
			this.y = arguments[0].y;
			
			this.r = arguments[1];

		} else if ( typeof arguments[0] == 'number' && typeof arguments[1] == 'number' && typeof arguments[2] == 'number') {

			// Circle(x, y, radius)

			this.x = arguments[0];
			this.y = arguments[1];
			
			this.r = arguments[2];

		} else {

			//Error

			this.x = 0;
			this.y = 0;
			
			this.r = 0;

		}

		this.is = 'circle';

		this.cssClass = 'mainCircle';
	},

	Polygone: function (pointsArray) {

		this.is = 'polygone';

		this.points = pointsArray;

		this.cssClass = 'polygon';
	},

	Path: function (commandsArray) {

		this.is = 'path';

		this.commands = commandsArray;

		this.cssClass = 'path';
	},

	OxSegment: function(x1, x2, dy) {

		this.is = 'oxSegment';

		this.x1 = x1;
		this.x2 = x2;

		this.dy = dy;

		dy > 0 ? this.cssClass = 'polygonRed' : this.cssClass = 'polygonBlue';
	},

	Distance: function (pointA, pointB, label, shift) {

		this.is = 'distance';

		this.xA = pointA.x; this.xB = pointB.x;
		this.yA = pointA.y; this.yB = pointB.y;

		this.label = label;
		this.cssClass = 'textElement';

		this.shift = shift;
	},

	Text: function (x, y, text) {

		this.is = 'text';

		this.x = x;
		this.y = y;
		this.text = text;

		this.cssClass = 'textElement';
	},

	MathJax: function(x, y, width, height, equation) {

		this.is = 'mathJaxEquation';

		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.equation = equation;
	}
};


var jsGeometry;
jsGeometry = (function (gElement) {

	var xmlns = "http://www.w3.org/2000/svg";
	var xlink = "http://www.w3.org/1999/xlink";

	var _pic, _node;

	var intPic = function (perentId) {

		var svg = document.createElementNS(xmlns, 'svg');
		svg.setAttribute('xmlns', xmlns);
		svg.setAttribute('xmlns:xlink', xlink);

		for (property in _node) {
			svg.setAttributeNS(null, property, _node[property]);
		}

		try {

		document.getElementById(perentId).appendChild(svg);

		} catch (e) {

			console.log('Cannot create svg picture. HTML element with id: ' + perentId + ' does not exist.');

			_pic.draw = false;
		}
	};

	var addNode = function (nodeName, perentId, text) {
		
		var node = document.createElementNS(xmlns, nodeName);

		for (property in _node) {

				node.setAttributeNS(null, property, _node[property]);
		}
		
		if (text !== undefined) {

			if (nodeName == 'foreignObject') {

				var div = document.createElement("div");
				div.setAttribute('xmlns', xmlns);
				div.innerHTML = text;

				node.appendChild(div);

			} else {

                if(text !== ''){

				node.appendChild(document.createTextNode(text));

                }
			}
			
		}

		try {

			document.getElementById(perentId).appendChild(node);

		} catch (e) {

			console.log('Cannot add svg element to parent with id: ' + perentId);

		}
	};

	var getX = function (xInUnitX) {

		return _pic.Ox + xInUnitX * _pic.unitX;
	};

	var scaleX = function (xInUnitX) {

		return xInUnitX * _pic.unitX;
	};

	var setX = function (svgX) {

		return (svgX - _pic.Ox)/_pic.unitX;
	};

	var getY = function (yInUnitY) {

		return _pic.Oy - yInUnitY * _pic.unitY;
	};

	var scaleY = function (yInUnitY) {

		return yInUnitY * _pic.unitY;
	};

	var setY = function (svgY) {

		return (svgY - _pic.OY)/_pic.unitY;
	};

	var getRadians = function (angleDegree) {

		return  Math.PI * angleDegree / 180;
	};

	var getDegrees = function (angleRadians) {

		return   angleRadians * 180 / Math.PI;
	};

	var moveRotate = function (radius, angle, point) {

		return {x: point.x + radius*Math.cos(angle), y: point.y + radius*Math.sin(angle)}
	};

	var getAngleOxVector = function (vector) {

		var temp = Math.acos( vector.x / ( Math.sqrt( vector.x * vector.x + vector.y * vector.y )));

		return  temp;
	};

	var drawPoint = function (element) {

		_node = {	'cx'     : getX(element.x),
					'cy'     : getY(element.y),
					'r'      : element.r,
					'class'  : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('circle', _pic.id);

		if (element.is == 'point' && element.label !== undefined) {

			_node = {	'x' : getX(element.x + element.labelDx),
						'y' : getY(element.y + element.labelDy),
						'class' : element.labelCssClass
					};

			if (typeof element.labelId !==  'undefined') { _node.id = element.labelId; }		

			addNode('text', _pic.id, element.label);
		}
	};

	var drawCircle = function (element) {

		_node = {	'cx'     : getX(element.x),
					'cy'     : getY(element.y),
					'r'      : element.r * _pic.unitX,
					'class'  : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('circle', _pic.id);
	};

	var drawSegment = function (element) {

		_node = {	'x1'     : getX(element.x1),
					'y1'     : getY(element.y1),
					'x2'     : getX(element.x2),
					'y2'     : getY(element.y2),
					'class'  : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('line', _pic.id);
	};

	var drawVector = function (element) {

		_node = {	'x1'           : getX(element.x1),
					'y1'           : getY(element.y1),
					'x2'           : getX(element.x2),
					'y2'           : getY(element.y2),
					'marker-end'   : 'url(#' + _pic.id + '-endAxisArrow)',
					'class'        : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('line', _pic.id);

	};

	var drawLine = function (element) {

		var x1, y1, x2, y2;

		if ( element.xLeft === undefined ) {

			x1 = setX(0);

			y1 = -(element.A * x1 + element.C)/element.B;

			x1 = 0;

			y1 = getY(y1);

		} else {

			x1 = getX(element.xLeft);

			y1 = getY(element.yLeft);
		}

		if ( element.xRight === undefined ) {

			x2 = setX(_pic.width);

			y2 = -(element.A * x2 + element.C)/element.B;

			x2 = _pic.width;

			y2 = getY(y2);
			
		} else {

			x2 = getX(element.xRight);

			y2 = getY(element.yRight);
		}


		_node = {	'x1'     : x1,
					'y1'     : y1,
					'x2'     : x2,
					'y2'     : y2,
					'class'  : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('line', _pic.id);
	};

	var drawPolygone = function (element) {

		var points = '';

		for (var i = 0; i < element.points.length; i++) {

			points += getX( element.points[i].x ) + ',' + getY( element.points[i].y ) + ' ';
		}

		_node = {	'points' : points,
					'class'  : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('polygon', _pic.id);
	};

	var drawPath = function (element) {

		var command = '';

		for (var i = 0; i < element.commands.length; i++) {

			switch (element.commands[i].c) {

				case 'M':

					command += 'M' + getX( element.commands[i].p.x ) + ',' + getY( element.commands[i].p.y ) + ' ';
					break;

				case 'L':

					command += 'L' + getX( element.commands[i].p.x ) + ',' + getY( element.commands[i].p.y ) + ' ';
					break;

				case 'A':

					command += 'A' + scaleX( element.commands[i].r[0] ) + ',' + scaleY( element.commands[i].r[1] ) + ' ';
					command += element.commands[i].o[0] + ' ' + element.commands[i].o[1] + ',' + element.commands[i].o[2] + ' ';
					command += getX( element.commands[i].p.x ) + ',' + getX( element.commands[i].p.y ) + ' ';
					break;

				case 'Z':

					command += 'Z';
					break;
			}
		}

		_node = {	'd'      : command,
					'class'  : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('path', _pic.id);
	};

	var drawOxSegment = function (element) {

		var startPoint   = { 'x' : element.x1, 'y' : 0 };
		
		var startPointUp = { 'x' : element.x1, 'y' : element.dy };

		var endPoint     = { 'x' : element.x2, 'y' : 0 };
		
		var endPointUp   = { 'x' : element.x2, 'y' : element.dy };

		drawPolygone({'points':[startPoint, startPointUp, endPointUp, endPoint], 'cssClass': element.cssClass});
	};

	var showDistance = function (element) {

		var angle = getAngleOxVector({x : element.xB - element.xA, y : element.yB - element.yA});

		//angle <= Math.PI/2 ? angle += Math.PI/2 : angle -= Math.PI/4;

		angle += Math.PI/2;

		var pA2 = moveRotate(element.shift, angle, {x: element.xA, y: element.yA});

		_node = {	'x1'     : getX(element.xA),
					'y1'     : getY(element.yA),
					'x2'     : getX(pA2.x),
					'y2'	 : getY(pA2.y),
					'class'  : 'l-help'
				};

		addNode('line', _pic.id);		

		var pB2 = moveRotate(element.shift, angle, {x: element.xB, y: element.yB});

		_node = {	'x1'     : getX(element.xB),
					'y1'     : getY(element.yB),
					'x2'     : getX(pB2.x),
					'y2'	 : getY(pB2.y),
					'class'  : 'l-help'
				};

		addNode('line', _pic.id);

		pA2 = moveRotate(element.shift - 0.2, angle, {x: element.xA, y: element.yA});
		pB2 = moveRotate(element.shift - 0.2, angle, {x: element.xB, y: element.yB});

		_node = {	'x1'           : getX(pA2.x),
					'y1'           : getY(pA2.y),
					'x2'           : getX(pB2.x),
					'y2'	       : getY(pB2.y),
					'marker-start' : 'url(#' + _pic.id + '-startAxisArrow)',
					'marker-end'   : 'url(#' + _pic.id + '-endAxisArrow)',
					'class'        : 'distanceArrow'
				};

		addNode('line', _pic.id);


		pA2 = moveRotate(element.shift, angle, { x: (element.xB + element.xA)/2, y: (element.yB + element.yA)/2 });

		_node = {	'x'     : getX(pA2.x),
					'y'     : getY(pA2.y),
					'transform' : 'rotate(' + -getDegrees(angle - Math.PI/2) + ',' + getX(pA2.x) +',' + getY(pA2.y)+ ')',
					'class' : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('text', _pic.id, element.label);		
	};

	var setOxArrowMarkers = function () {

		
		_node = {	'id'           : _pic.id + '-startAxisArrow',
					'refX'         : '0',
					'refY'         : '50',
					'markerHeight' : '5',
					'markerWidth'  : '5',
					'viewBox'      : '0 0 100 100',
					'se_type'      : 'leftarrow',
					'orient'       : 'auto',
					'markerUnits'  : 'strokeWidth'
				};

		addNode('marker', _pic.id + '-defs');
		

		_node = {	'class' : 'axisArrow',
					'd'     : 'm0,50l100,40l-30,-40l30,-40z'
				};

		addNode('path', _pic.id + '-startAxisArrow');


		_node = {	'id'           : _pic.id + '-endAxisArrow',
					'refX'         : '100',
					'refY'         : '50',
					'markerHeight' : '5',
					'markerWidth'  : '5',
					'viewBox'      : '0 0 100 100',
					'se_type'      : 'ightarrow',
					'orient'       : 'auto',
					'markerUnits'  : 'strokeWidth'
				};

		addNode('marker', _pic.id + '-defs');


		_node = {	'class' : 'axisArrow',
					'd'     : 'm100,50l-100,40l30,-40l-30,-40z'
				};

		addNode('path', _pic.id + '-endAxisArrow');


		_node = {	'id'           : _pic.id + '-axisVerticalslash',
					'refX'         : '50',
					'refY'         : '50',
					'markerHeight' : '5',
					'markerWidth'  : '5',
					'viewBox'      : '0 0 100 100',
					'se_type'      : 'verticalslash',
					'orient'       : 'auto',
					'markerUnits'  : 'strokeWidth'
				};

		addNode('marker', _pic.id + '-defs');


		_node = {	class : 'axisVerticalslash',
					d     : 'm50,0l0,100'
				};

		addNode('path', _pic.id + '-axisVerticalslash');
	};

	var putText = function (element) {

		_node = {	'x'     : getX(element.x),
					'y'     : getY(element.y),
					'class' : element.cssClass
				};

		if (element.id !==  undefined) { _node.id = element.id; }

		addNode('text', _pic.id, element.text);		
	};

	var putMathJax = function (element) {

		_node = {	'x'     : getX(element.x - element.width/2),
					'y'     : getY(element.y + element.height),
					'width' : element.width * _pic.unitX,
					'height': element.height * _pic.unitY
				};

		addNode('foreignObject', _pic.id, element.equation);

	};

	return {

		appendPic: function (picture) {

			if (picture instanceof gElement.Picture) {

				_pic = picture;

				_node = {	'id'     : _pic.id,
							'width'  : _pic.width,
							'height' : _pic.height
						};

				intPic(_pic.parentId);

				_node = {	'id' : _pic.id + '-defs'
						};

				addNode('defs', _pic.id);

				return this;

			
			} else {

				console.log('appendPic: Argument is not a Picture object');

				this.runFar = false;
				
				return this;
			}
		},

		editPic: function (picture) {

			_pic.Id = 'svg' + picture.parentId;

			return this;
		},

		showGrid: function () {

			if ( _pic.draw ) {

				_node = {	'id'           : _pic.id + '-gridPattern',
							'width'        : _pic.unitX,
							'height'       : _pic.unitY,
							'patternUnits' : 'userSpaceOnUse'
						};

				addNode('pattern', _pic.id + '-defs');
				
				_node = {	'class'  : 'gridUnit',
							'width'  : _pic.unitX,
							'height' : _pic.unitY
						};

				addNode('rect', _pic.id + '-gridPattern');

				_node = {	'id'     : _pic.id + '-gridBackground',
							'x'      : '0',
							'y'      : '0',
							'width'  : '100%',
							'height' : '100%',
							'fill'   : 'url(#' + _pic.id + '-gridPattern' + ')'
						};

				addNode('rect', _pic.id);

			}

			return this;
		},

		showOx: function () {

			if ( _pic.draw ) {

				setOxArrowMarkers();

				var unit = _pic.unitX;
				var x = _pic.Ox - _pic.OxNegativeLength * _pic.unitX - unit / 2;
				var y = _pic.Oy;
				var pointsList = x + ',' + y + ' ';

				x += unit / 2;
				pointsList += x + ',' + y + ' ';

				for (var step = 1; step <= _pic.OxNegativeLength + _pic.OxPositiveLength; step++) {
					x += unit;
					pointsList += x + ',' + y + ' ';
				}

				x += unit / 2;
				pointsList += x + "," + y;

				_node = {	'id'           : _pic.id + '-axisOx',
							'points'       : pointsList,
							'marker-start' : 'url(#' + _pic.id + '-startAxisArrow)',
							'marker-mid'   : 'url(#' + _pic.id + '-axisVerticalslash)',
							'marker-end'   : 'url(#' + _pic.id + '-endAxisArrow)',
							'class'        : 'axisOx'
						};

				addNode('polyline', _pic.id);

			}

			return this;
		},

		draw: function (elements) { 

			if ( _pic.draw ) {

				for (var i = 0; i < elements.length; i++) {

					switch (elements[i].is) {

						case 'point':

							drawPoint(elements[i]);
							break;

						case 'segment':

							drawSegment(elements[i]);
							break;

						case 'oxSegment':
							
                            drawOxSegment(elements[i]);
							break;

						case 'vector':

							drawVector(elements[i]);
							break;

						case 'line':

							drawLine(elements[i]);
							break;

						case 'circle':

							drawCircle(elements[i]);
							break;	

						case 'polygone':

							drawPolygone(elements[i]);
							break;

						case 'path':

							drawPath(elements[i]);
							break;

						case 'text':

							putText(elements[i]);
							break;

						case 'mathJaxEquation':
							
							putMathJax(elements[i]);
							break;	

						case 'distance':

							showDistance(elements[i]);
							break;

					}
				}

			}

			return this;
		}
	};

})(gElement);

// Patterns

gElement.Pattern.prototype.setPattern = function(options) {

	if ( options.css !== undefined ) { this.cssClass = options.css; }
	if ( options.id  !== undefined ) { this.id       = options.id; }
};

// Picture

gElement.Picture.prototype.setGrid = function(unitX, unitY) {
	
	this.unitX = unitX;
	this.unitY = unitY;
};

gElement.Picture.prototype.setOrigin = function(Ox, Oy) {
	
	this.Ox = Ox * this.unitX;
	this.Oy = this.height - Oy * this.unitY;
};

gElement.Picture.prototype.setAxisOx = function(NegativeLength, PositiveLength) {
	
	this.OxNegativeLength = NegativeLength;
	this.OxPositiveLength = PositiveLength;
};

gElement.Picture.prototype.setAxisOy = function(NegativeLength, PositiveLength) {
	
	this.OyNegativeLength = NegativeLength;
	this.OyPositiveLength = PositiveLength;
};

// Point

gElement.Point.prototype = Object.create(gElement.Pattern.prototype);
gElement.Point.prototype.constructor = gElement.Point;

gElement.Point.prototype.setSize = function(r) {

	this.r = r;
};

gElement.Point.prototype.setLabel = function(label, options) {

	this.label = label;

	options.dx  === undefined ? this.labelDx = 0 : this.labelDx = options.dx;
	options.dy  === undefined ? this.labelDy = 0 : this.labelDy = options.dy;

	options.css === undefined ? this.labelCssClass = 'textElement' : this.labelCssClass = options.css;
	if (options.id  !== undefined ) { this.labelId = options.id; }
};

// Segment

gElement.Segment.prototype = Object.create(gElement.Pattern.prototype);
gElement.Segment.prototype.constructor = gElement.Segment;

// Line

gElement.Line.prototype = Object.create(gElement.Pattern.prototype);
gElement.Line.prototype.constructor = gElement.Line;

gElement.Line.prototype.setLeftX = function(xLeft) {

	this.xLeft = xLeft;
	this.yLeft = -(this.A * xLeft + this.C)/this.B;
};

gElement.Line.prototype.setLeftY = function(yLeft) {

	this.yLeft = yLeft;
	this.xLeft = -(this.B * yLeft + this.C)/this.A;
};

gElement.Line.prototype.setRightX = function(xRight) {

	this.xRight = xRight;
	this.yRight = -(this.A * xRight + this.C)/this.B;
};

gElement.Line.prototype.setRightY = function(yRight) {

	this.yRight = yRight;
	this.xRight = -(this.B * yRight + this.C)/this.A;
};

// Segment 

gElement.Segment.prototype = Object.create(gElement.Pattern.prototype);
gElement.Segment.prototype.constructor = gElement.Segment;

// Polygone 

gElement.Polygone.prototype = Object.create(gElement.Pattern.prototype);
gElement.Polygone.prototype.constructor = gElement.Polygone;

// OxSegment

gElement.OxSegment.prototype = Object.create(gElement.Pattern.prototype);
gElement.OxSegment.prototype.constructor = gElement.OxSegment;

// Circle 

gElement.Circle.prototype = Object.create(gElement.Pattern.prototype);
gElement.Circle.prototype.constructor = gElement.Circle;

// Text 

gElement.Text.prototype = Object.create(gElement.Pattern.prototype);
gElement.Text.prototype.constructor = gElement.Text;


// Distance 

gElement.Distance.prototype = Object.create(gElement.Pattern.prototype);
gElement.Distance.prototype.constructor = gElement.Distance;


// Polygone

gElement.Polygone.prototype = Object.create(gElement.Pattern.prototype);
gElement.Polygone.prototype.constructor = gElement.Polygone;


// Path

gElement.Path.prototype = Object.create(gElement.Pattern.prototype);
gElement.Path.prototype.constructor = gElement.Path;