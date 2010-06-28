function setUp() {
    ezajaxer = new Ezajaxer();
    stubElement = $('<div></div>');   
}
function tearDown() {
    delete stubElement;
    delete ezajaxer;
}

function testMark() {
    assertEquals("Mark return type should be element", stubElement.tagName, ezajaxer.mark(stubElement).tagName);
    assertTrue("Testing marker added", ezajaxer.hasMarker(stubElement));
}

function testUnmark() {
    assertEquals("Mark return type should be element", stubElement.tagName, ezajaxer.mark(stubElement).tagName);
    assertEquals("Unmark return should be element", stubElement.tagName, ezajaxer.unmark(stubElement).tagName);
    assertFalse("Testing marker removed", ezajaxer.hasMarker(stubElement));
}
