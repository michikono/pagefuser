function setUp() {
    ezajaxer = new Ezajaxer();
    stubElement = $('<div></div>');   
}
function tearDown() {
    delete stubElement;
    delete ezajaxer;
}

function testMark() {
    ezajaxer.mark(stubElement);
    assertTrue("Testing marker added", ezajaxer.hasMarker(stubElement));
}

function testUnmark() {
    ezajaxer.mark(stubElement);
    ezajaxer.unmark(stubElement);
    assertFalse("Testing marker removed", ezajaxer.hasMarker(stubElement));
}
