
var pic01 = new gElement.Picture('pic01', 600, 300);
	pic01.setGrid(60, 60);
	pic01.setOrigin(1, 1);
	pic01.setAxisOx(0, 4);

var t01 = new gElement.Text (0, -0.5, 'text');
	t01.setPattern({id : 't01'});


var pA = new gElement.Point(2, 0);
	pA.setPattern({css : 'dot'});
var pB = new gElement.Point(3, 3);
	pB.setLabel('𝐴', {dy : 0.2});


var p1 = new gElement.Point(0, 0);
var p2 = new gElement.Point(1, 0);
var p3 = new gElement.Point(1, 1);
var p4 = new gElement.Point(0, 1);

var polygon = new gElement.Polygone([p1,p2,p3,p4]);

var c1 = new gElement.Circle(pA, 2);	

var d1 = new gElement.Distance(pA, pB, '𝐴', 1);

var s1 = new gElement.Segment(pA, pB);

var v1 = new gElement.Vector(pA, pB);

var lAB = new gElement.Line(s1);

jsGeometry.appendPic(pic01)
	      .showGrid()
		  .showOx()
		  .draw([pB, d1, polygon]).draw([pA, c1]).draw([v1]);


var pic02 = new gElement.Picture('pic02', 160, 160);
	pic02.setGrid(20, 20);
	pic02.setOrigin(4, 4);

var pO = new gElement.Point(0, 0);
	pO.setPattern({css : 'pointRed'});

var p30d = new gElement.Point(3, 30, 'deg');
	p30d.setPattern({css : 'pointRed'});

var pPIr = new gElement.Point(3, Math.PI, 'rad');
	pPIr.setPattern({css : 'pointRed'});

var c0 = new gElement.Circle(pO, 3);


var comands = [ {c:'M', p:pO}, {c:'L', p: p30d}, {c:'A', r:[3,3], o:[0,0,0], p:pPIr}, {c:'Z'} ];
var path01 = new gElement.Path(comands);
	path01.setPattern({css : 'path red'});


jsGeometry.appendPic(pic02)
	      .showGrid()
	      .draw([c0, path01, pO, p30d, pPIr]);
