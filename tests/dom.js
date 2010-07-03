function setUp() {
    ezajaxer = new Ezajaxer();
    stubElement = $('<div></div>');   
}
function tearDown() {
    delete stubElement;
    delete ezajaxer;
}

function testMark() {
    assertEquals("Mark return type should be element", stubElement.tagName, ezajaxer.dom.mark(stubElement).tagName);
    assertTrue("Testing marker added", ezajaxer.dom.hasMarker(stubElement));
}

function testMarkCusomMarker() {
    var customMarker = 'custom-text';
    ezajaxer = new Ezajaxer({marker: customMarker});
    assertEquals("Mark return type should be element", stubElement.tagName, ezajaxer.dom.mark(stubElement).tagName);
    assertEquals("Marker should be " + customMarker, customMarker, ezajaxer.dom.getMarker(stubElement));
    assertTrue("Testing marker added", ezajaxer.dom.hasMarker(stubElement));
}


function testUnmark() {
    assertEquals("Mark return type should be element", stubElement.tagName, ezajaxer.dom.mark(stubElement).tagName);
    assertEquals("Unmark return should be element", stubElement.tagName, ezajaxer.dom.unmark(stubElement).tagName);
    assertFalse("Testing marker removed", ezajaxer.dom.hasMarker(stubElement));
}

function testUnmarkCustomMarker() {
    var customMarker = 'custom-text';
    ezajaxer = new Ezajaxer({marker: customMarker});
    assertEquals("Mark return type should be element", stubElement.tagName, ezajaxer.dom.mark(stubElement).tagName);
    assertEquals("Marker should be " + customMarker, customMarker, ezajaxer.dom.getMarker(stubElement));
    assertEquals("Unmark return should be element", stubElement.tagName, ezajaxer.dom.unmark(stubElement).tagName);
    assertFalse("Testing marker removed", ezajaxer.dom.hasMarker(stubElement));
}
