module("DOM", {
    setup: function() {
        stubElement = $('<div></div>');
        ezajaxer = new Ezajaxer();
    },
    teardown: function() {
        stubElement.unbind();
        delete stubElement;
        delete ezajaxer;
    }
});

test("no change to element after calling ezajaxer on a non-tagged element", function() {
});

test("Testing marking of elements", function() {
	expect(2);
    equals(stubElement.outerHTML(), ezajaxer.dom.mark(stubElement).outerHTML(), "Element HTML should be the same");
    ok(ezajaxer.dom.hasMarker(stubElement), "Testing marker added");
});

test("Testing marking of elements using custom marker", function() {
    expect(3);
    var customMarker = 'custom-text';
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(stubElement.outerHTML(), ezajaxer.dom.mark(stubElement).outerHTML(), "Element HTML should be the same");
    equals(customMarker, ezajaxer.dom.getMarker(stubElement), "Marker should be " + customMarker);
    ok(ezajaxer.dom.hasMarker(stubElement), "Testing marker added");
});

test("Testing unmarking of elements", function() {
    expect(3);
    equals(stubElement.outerHTML(), ezajaxer.dom.mark(stubElement).outerHTML(), "Element HTML should be the same");
    equals(stubElement.outerHTML(), ezajaxer.dom.unmark(stubElement).outerHTML(), "Unmark return should be same type");
    ok(!ezajaxer.dom.hasMarker(stubElement), "Testing marker removed");
});

test("Testing unmarking of elements using custom marker", function() {
    expect(4);
    var customMarker = 'custom-text';
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(stubElement.outerHTML(), ezajaxer.dom.mark(stubElement).outerHTML(), "Element HTML should be the same");
    equals(customMarker, ezajaxer.dom.getMarker(stubElement), "Marker should be " + customMarker);
    equals(stubElement.outerHTML(), ezajaxer.dom.unmark(stubElement).outerHTML(), "Unmark return should be same type");
    ok(!ezajaxer.dom.hasMarker(stubElement), "Testing marker removed");
});


