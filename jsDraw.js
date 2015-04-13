var fTest = new gFigure (200,200, 'svg01');
fTest.putFigure();

var currentFigure = fTest.figureId;

var pA = new gPoint(100,100,'pA');
pA.putPoint('dot'); 

var lA = new gLabel('𝐴',pA,20,-10);
lA.putLabel();

var pB = new gPoint(30,30);
pB.putPoint('dot');

var fTest02 = new gFigure (200,200, 'svg02', 'mysvg');
fTest02.putFigure();

currentFigure = fTest02.figureId;

var pC = new gPoint(70,100,'pC');
pC.putPoint('dot');
var lC = new gLabel('𝐶',pC);
lC.putLabel();