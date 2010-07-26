module("Advanced DOM", {
    setup: function() {
        originalDefaults = Ezajaxer.defaults;
        stubElementForDom = $('<div><p><a>link</a></p><p>test</p></div>');
        stubDivElementForPlugin = $('<div class="ezajaxer"><p><a>link</a></p><p>test</p></div>');
        stubAElementForPlugin = $('<div><p><a class="ezajaxer">link</a></p><p>test</p></div>');
        stubElementForNoMatch = $('<div><p><span>link</span></p><p>test</p></div>');
        ezajaxer = new Ezajaxer();
    },
    teardown: function() {
        Ezajaxer.defaults = originalDefaults;
        stubElementForDom.unbind();
        delete stubElementForDom;
        delete stubDivElementForPlugin;
        delete stubAElementForPlugin;
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

test("Testing marking of link elements inside a container element via plugin", function() {
	expect(3);
    originalPlugin = stubDivElementForPlugin.outerHTML();
    stubDivElementForPlugin.ezajaxer();
    equals(ezajaxer.dom.getMarker(stubDivElementForPlugin.find('a')), Ezajaxer.defaults.marker, "Non-link container plugin: Marker should be the default on the link INSIDE the container");
    ok(ezajaxer.dom.hasMarker(stubDivElementForPlugin.find('a')), "Non-link container plugin: Testing marker added via plugin");
    equals(stubDivElementForPlugin.outerHTML(), originalPlugin, "Non-link container plugin: Element HTML should be the same");
});


test("Testing marking of link elements inside complex DOM via plugin", function() {
	expect(3);
    originalPlugin = stubAElementForPlugin.outerHTML();
    stubAElementForPlugin.ezajaxer();
    equals(ezajaxer.dom.getMarker(stubAElementForPlugin.find('a')), Ezajaxer.defaults.marker, "Non-link container plugin: Marker should be the default on the link INSIDE the container");
    ok(ezajaxer.dom.hasMarker(stubAElementForPlugin.find('a')), "Non-link container plugin: Testing marker added via plugin");
    equals(stubAElementForPlugin.outerHTML(), originalPlugin, "Non-link container plugin: Element HTML should be the same");
});


test("Testing marking of elements using custom marker via DOM", function() {
    expect(4);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(ezajaxer.attach(stubElementForDom), 1)
    equals(stubElementForDom.outerHTML(), originalDom, "Element HTML should be the same");
    ok(ezajaxer.dom.hasMarker(stubElementForDom.find('a')), "Testing marker added manually");
    equals(ezajaxer.dom.getMarker(stubElementForDom.find('a')), customMarker, "Marker should be " + customMarker);
});

test("Testing marking of elements using custom marker via plugin", function() {
    expect(3);
    var customMarker = 'custom-text';
    originalPlugin = stubDivElementForPlugin.outerHTML();
    stubDivElementForPlugin.ezajaxer({marker: customMarker});
    ok(ezajaxer.dom.hasMarker(stubDivElementForPlugin.find('a')), "Testing marker added via plugin");
    equals(ezajaxer.dom.getMarker(stubDivElementForPlugin.find('a')), customMarker, "Marker should be " + customMarker);
    equals(stubDivElementForPlugin.outerHTML(), originalPlugin, "Element HTML should be the same");
});

test("Testing unmarking of elements", function() {
    expect(4);
    originalDom = stubElementForDom.outerHTML();
    equals(ezajaxer.attach(stubElementForDom), 1)
    equals(stubElementForDom.outerHTML(), originalDom, "Element HTML should be the same");
    equals(ezajaxer.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Should also not modify the element");
    ok(!ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker removed");
});

test("Testing unmarking of elements using custom marker", function() {
    expect(5);
    var customMarker = 'custom-text';
    originalDom = stubElementForDom.outerHTML();
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(ezajaxer.attach(stubElementForDom), 1)
    equals(stubElementForDom.outerHTML(), originalDom, "Element HTML should be the same");
    equals(ezajaxer.dom.getMarker(stubElementForDom.find('a')), customMarker, "Marker should be " + customMarker);
    equals(ezajaxer.dom.unmark(stubElementForDom).outerHTML(), originalDom, "Unmark return should be same type");
    ok(!ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker removed");
});

