module("Basic DOM", {
    setup: function() {
        originalDefaults = Ezajaxer.defaults;
        stubElementForDom = $('<a>link</a>');
        stubElementForPlugin = $('<a class="ezajaxer">link</a>');
        stubElementForNoMatch = $('<div></div>');
        ezajaxer = new Ezajaxer();
    },
    teardown: function() {
        Ezajaxer.defaults = originalDefaults;
        stubElementForDom.unbind();
        delete stubElementForDom;
        delete stubElementForPlugin;
        delete stubElementForNoMatch;
        delete ezajaxer;
    }
});

test("no change to element after calling ezajaxer() on a non-target element", function() {
	expect(2);
	var originalNoMatch = stubElementForNoMatch.outerHTML();

    equals(stubElementForNoMatch.ezajaxer().outerHTML(), originalNoMatch, "Element HTML should be the same");
    ok(!ezajaxer.dom.hasMarker(stubElementForNoMatch), "Should have no marker");
});

test("no change to element after attaching on a non-target element", function() {
	expect(2);
	var originalNoMatch = stubElementForNoMatch.outerHTML();
	ezajaxer = new Ezajaxer();
	ezajaxer.attach(stubElementForNoMatch);
    equals(stubElementForNoMatch.outerHTML(), originalNoMatch, "Element HTML should be the same");
    ok(!ezajaxer.dom.hasMarker(stubElementForNoMatch), "Should have no marker");
});

test("Testing marking of elements via DOM", function() {
	expect(3);
    originalDom = stubElementForDom.outerHTML();
    equals(ezajaxer.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    equals(ezajaxer.dom.getMarker(stubElementForDom), Ezajaxer.defaults.marker, "Marker should be the default");
    ok(ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker added manually");
});

test("Testing marking of elements via plugin", function() {
	expect(3);
    var originalPlugin = stubElementForPlugin.outerHTML();
    stubElementForPlugin.ezajaxer();
    equals(ezajaxer.dom.getMarker(stubElementForPlugin), Ezajaxer.defaults.marker, "Marker should be the default");
    ok(ezajaxer.dom.hasMarker(stubElementForPlugin), "Testing marker added via plugin");
    equals(stubElementForPlugin.outerHTML(), originalPlugin, "Element HTML should be the same");
});

test("Testing marking of elements using custom marker via DOM", function() {
    expect(3);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(ezajaxer.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    ok(ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker added manually");
    equals(ezajaxer.dom.getMarker(stubElementForDom), customMarker, "Marker should be " + customMarker);
});

test("Testing marking of elements using custom marker via plugin", function() {
    var customMarker = 'custom-text';
    var originalPlugin = stubElementForPlugin.outerHTML();
    stubElementForPlugin.ezajaxer({marker: customMarker});
    ok(ezajaxer.dom.hasMarker(stubElementForPlugin), "Testing marker added via plugin");
    equals(ezajaxer.dom.getMarker(stubElementForPlugin), customMarker, "Marker should be " + customMarker);
    equals(stubElementForPlugin.outerHTML(), originalPlugin, "Element HTML should be the same");
});

test("Testing unmarking of elements", function() {
    expect(3);
    originalDom = stubElementForDom.outerHTML();
    equals(ezajaxer.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    equals(ezajaxer.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Should also not modify the element");
    ok(!ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker removed");
});

test("Testing unmarking of elements using custom marker", function() {
    expect(4);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(ezajaxer.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    equals(ezajaxer.dom.getMarker(stubElementForDom), customMarker, "Marker should be " + customMarker);
    equals(ezajaxer.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Unmark return should be same type");
    ok(!ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker removed");
});


