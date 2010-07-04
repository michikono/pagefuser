module("DOM", {
    setup: function() {
        stubElementForDom = $('<a></a>');
        stubElementForPlugin = $('<a class="ezajaxer"></a>');
        ezajaxer = new Ezajaxer();
    },
    teardown: function() {
        stubElementForDom.unbind();
        delete stubElementForDom;
        delete stubElementForPlugin;
        delete ezajaxer;
    }
});

test("no change to element after calling ezajaxer on a non-tagged element", function() {
});

test("Testing marking of elements", function() {
	expect(3);
    equals(stubElementForDom.outerHTML(), ezajaxer.dom.mark(stubElementForDom).outerHTML(), "Element HTML should be the same");
    ok(ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker added manually");
    stubElementForPlugin.ezajaxer();
    ok(ezajaxer.dom.hasMarker(stubElementForPlugin), "Testing marker added via plugin");
});

test("Testing marking of elements using custom marker", function() {
    expect(5);
    var customMarker = 'custom-text';
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(stubElementForDom.outerHTML(), ezajaxer.dom.mark(stubElementForDom).outerHTML(), "Element HTML should be the same");
    ok(ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker added manually");
    equals(customMarker, ezajaxer.dom.getMarker(stubElementForDom), "Marker should be " + customMarker);

    stubElementForPlugin.ezajaxer({marker: customMarker});
    ok(ezajaxer.dom.hasMarker(stubElementForPlugin), "Testing marker added via plugin");
    equals(customMarker, ezajaxer.dom.getMarker(stubElementForDom), "Marker should be " + customMarker);
});

test("Testing unmarking of elements", function() {
    expect(3);
    equals(stubElementForDom.outerHTML(), ezajaxer.dom.mark(stubElementForDom).outerHTML(), "Element HTML should be the same");
    equals(stubElementForDom.outerHTML(), ezajaxer.dom.unmark(stubElementForDom).outerHTML(), "Unmark return should be same type");
    ok(!ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker removed");
});

test("Testing unmarking of elements using custom marker", function() {
    expect(4);
    var customMarker = 'custom-text';
    ezajaxer = new Ezajaxer({marker: customMarker});
    equals(stubElementForDom.outerHTML(), ezajaxer.dom.mark(stubElementForDom).outerHTML(), "Element HTML should be the same");
    equals(customMarker, ezajaxer.dom.getMarker(stubElementForDom), "Marker should be " + customMarker);
    equals(stubElementForDom.outerHTML(), ezajaxer.dom.unmark(stubElementForDom).outerHTML(), "Unmark return should be same type");
    ok(!ezajaxer.dom.hasMarker(stubElementForDom), "Testing marker removed");
});


