module("Advanced DOM", {
    setup: function() {
        originalDefaults = Pagefuser.defaults;
        stubElementForDom = $('<div><p><a>link</a></p><p>test</p></div>');
        stubDivElementForPlugin = $('<div class="pagefuser"><p><a>link</a></p><p>test</p></div>');
        stubAElementForPlugin = $('<div><p><a class="pagefuser">link</a></p><p>test</p></div>');
        stubElementForNoMatch = $('<div><p><span>link</span></p><p>test</p></div>');
        pagefuser = new Pagefuser();
    },
    teardown: function() {
        Pagefuser.defaults = originalDefaults;
        stubElementForDom.unbind();
        delete stubElementForDom;
        delete stubDivElementForPlugin;
        delete stubAElementForPlugin;
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

test("Testing marking of link elements inside a container element via plugin", function() {
	expect(3);
    originalPlugin = stubDivElementForPlugin.outerHTML();
    stubDivElementForPlugin.pagefuser();
    equals(pagefuser.dom.getMarker(stubDivElementForPlugin.find('a')), Pagefuser.defaults.marker, "Non-link container plugin: Marker should be the default on the link INSIDE the container");
    ok(pagefuser.dom.hasMarker(stubDivElementForPlugin.find('a')), "Non-link container plugin: Testing marker added via plugin");
    equals(stubDivElementForPlugin.outerHTML(), originalPlugin, "Non-link container plugin: Element HTML should be the same");
});


test("Testing marking of link elements inside complex DOM via plugin", function() {
	expect(3);
    originalPlugin = stubAElementForPlugin.outerHTML();
    stubAElementForPlugin.pagefuser();
    equals(pagefuser.dom.getMarker(stubAElementForPlugin.find('a')), Pagefuser.defaults.marker, "Non-link container plugin: Marker should be the default on the link INSIDE the container");
    ok(pagefuser.dom.hasMarker(stubAElementForPlugin.find('a')), "Non-link container plugin: Testing marker added via plugin");
    equals(stubAElementForPlugin.outerHTML(), originalPlugin, "Non-link container plugin: Element HTML should be the same");
});


test("Testing marking of elements using custom marker via DOM", function() {
    expect(4);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    pagefuser = new Pagefuser({marker: customMarker});
    equals(pagefuser.attach(stubElementForDom), 1)
    equals(stubElementForDom.outerHTML(), originalDom, "Element HTML should be the same");
    ok(pagefuser.dom.hasMarker(stubElementForDom.find('a')), "Testing marker added manually");
    equals(pagefuser.dom.getMarker(stubElementForDom.find('a')), customMarker, "Marker should be " + customMarker);
});

test("Testing marking of elements using custom marker via plugin", function() {
    expect(3);
    var customMarker = 'custom-text';
    originalPlugin = stubDivElementForPlugin.outerHTML();
    stubDivElementForPlugin.pagefuser({marker: customMarker});
    ok(pagefuser.dom.hasMarker(stubDivElementForPlugin.find('a')), "Testing marker added via plugin");
    equals(pagefuser.dom.getMarker(stubDivElementForPlugin.find('a')), customMarker, "Marker should be " + customMarker);
    equals(stubDivElementForPlugin.outerHTML(), originalPlugin, "Element HTML should be the same");
});

test("Testing unmarking of elements", function() {
    expect(4);
    originalDom = stubElementForDom.outerHTML();
    equals(pagefuser.attach(stubElementForDom), 1)
    equals(stubElementForDom.outerHTML(), originalDom, "Element HTML should be the same");
    equals(pagefuser.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Should also not modify the element");
    ok(!pagefuser.dom.hasMarker(stubElementForDom), "Testing marker removed");
});

test("Testing unmarking of elements using custom marker", function() {
    expect(5);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    pagefuser = new Pagefuser({marker: customMarker});
    equals(pagefuser.attach(stubElementForDom), 1)
    equals(stubElementForDom.outerHTML(), originalDom, "Element HTML should be the same");
    equals(pagefuser.dom.getMarker(stubElementForDom.find('a')), customMarker, "Marker should be " + customMarker);
    equals(pagefuser.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Unmark return should be same type");
    ok(!pagefuser.dom.hasMarker(stubElementForDom), "Testing marker removed");
});

