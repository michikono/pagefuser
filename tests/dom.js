module("Basic DOM", {
    setup: function() {
        originalDefaults = Pagefuser.defaults;
        stubElementForDom = $('<a>link</a>');
        stubElementForPlugin = $('<a class="pagefuser">link</a>');
        stubElementForNoMatch = $('<div></div>');
        pagefuser = new Pagefuser();
    },
    teardown: function() {
        Pagefuser.defaults = originalDefaults;
        stubElementForDom.unbind();
        delete stubElementForDom;
        delete stubElementForPlugin;
        delete stubElementForNoMatch;
        delete pagefuser;
    }
});

test("no change to element after calling pagefuser() on a non-target element", function() {
	expect(2);
	var originalNoMatch = stubElementForNoMatch.outerHTML();

    equals(stubElementForNoMatch.pagefuser().outerHTML(), originalNoMatch, "Element HTML should be the same");
    ok(!pagefuser.dom.hasMarker(stubElementForNoMatch), "Should have no marker");
});

test("no change to element after attaching on a non-target element", function() {
	expect(2);
	var originalNoMatch = stubElementForNoMatch.outerHTML();
	pagefuser = new Pagefuser();
	pagefuser.attach(stubElementForNoMatch);
    equals(stubElementForNoMatch.outerHTML(), originalNoMatch, "Element HTML should be the same");
    ok(!pagefuser.dom.hasMarker(stubElementForNoMatch), "Should have no marker");
});

test("Testing marking of elements via DOM", function() {
	expect(3);
    originalDom = stubElementForDom.outerHTML();
    equals(pagefuser.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    equals(pagefuser.dom.getMarker(stubElementForDom), Pagefuser.defaults.marker, "Marker should be the default");
    ok(pagefuser.dom.hasMarker(stubElementForDom), "Testing marker added manually");
});

test("Testing marking of elements via plugin", function() {
	expect(3);
    var originalPlugin = stubElementForPlugin.outerHTML();
    stubElementForPlugin.pagefuser();
    equals(pagefuser.dom.getMarker(stubElementForPlugin), Pagefuser.defaults.marker, "Marker should be the default");
    ok(pagefuser.dom.hasMarker(stubElementForPlugin), "Testing marker added via plugin");
    equals(stubElementForPlugin.outerHTML(), originalPlugin, "Element HTML should be the same");
});

test("Testing marking of elements using custom marker via DOM", function() {
    expect(3);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    pagefuser = new Pagefuser({marker: customMarker});
    equals(pagefuser.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    ok(pagefuser.dom.hasMarker(stubElementForDom), "Testing marker added manually");
    equals(pagefuser.dom.getMarker(stubElementForDom), customMarker, "Marker should be " + customMarker);
});

test("Testing marking of elements using custom marker via plugin", function() {
    var customMarker = 'custom-text';
    var originalPlugin = stubElementForPlugin.outerHTML();
    stubElementForPlugin.pagefuser({marker: customMarker});
    ok(pagefuser.dom.hasMarker(stubElementForPlugin), "Testing marker added via plugin");
    equals(pagefuser.dom.getMarker(stubElementForPlugin), customMarker, "Marker should be " + customMarker);
    equals(stubElementForPlugin.outerHTML(), originalPlugin, "Element HTML should be the same");
});

test("Testing unmarking of elements", function() {
    expect(3);
    originalDom = stubElementForDom.outerHTML();
    equals(pagefuser.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    equals(pagefuser.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Should also not modify the element");
    ok(!pagefuser.dom.hasMarker(stubElementForDom), "Testing marker removed");
});

test("Testing unmarking of elements using custom marker", function() {
    expect(4);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    pagefuser = new Pagefuser({marker: customMarker});
    equals(pagefuser.dom.mark(stubElementForDom).outerHTML(), originalDom, "Element HTML should be the same");
    equals(pagefuser.dom.getMarker(stubElementForDom), customMarker, "Marker should be " + customMarker);
    equals(pagefuser.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Unmark return should be same type");
    ok(!pagefuser.dom.hasMarker(stubElementForDom), "Testing marker removed");
});


