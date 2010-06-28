/**
 * @author Michi Kono
 * @date 2010-06-27
 */

/**
 * This is not a singleton and should be managed as a regular class object
 *
 *
 */
var Ezajaxer = (function() {
    
    /**
     * key value of marker data
     */
    this.marker = 'ezajaxer-marker';
    
    /**
     * Stores event handlers created by this class
     */
    this.events = [];
    
    /**
     * Mark a DOM object as altered by this class so additional
     * event handlers are added to it
     * 
     * @param DOM element
     * @return jQuery DOM element
     */
    this.mark = function(element) { 
        return $(element).data(this.marker, true);
    };
    
    /**
     * Unmark a DOM object that was altered by mark()
     * 
     * @param DOM element
     * @return jQuery DOM element
     */
    this.unmark = function(element) {
        return $(element).data(this.marker, false);
    };
    
    /**
     * Tests if an element has been marked
     *
     * @param DOM element
     * @return TRUE if has been marked
     */
    this.hasMarker = function(element) {
        return $(element).data(this.marker) || false;
    };
    
    /**
     * creates and returns an event to trigger ezajaxer behavior
     */
    this.registerEvent = function() {
        var event = function() {
            // ajax request for target content
            // render into target div
        };
        this.events.push(event);
    };
    
    this.unregisterEvent = function(event) {
          
    };
    
    /**
     * Attach an event handler to an element that will allow ezajaxer behavior
     *
     * @param event name (e.g., click, submit)
     * @param DOM element
     * @return jQuery DOM element
     */
    this.process = function(event, element) {
        if(!this.hasMarker(element)) {
            /*
             * add the ajax event to the element provided using the event specified
             */
            this.mark(element);
            element.bind(event, element, this.registerEvent());         
        }
    };
    
    /**
     * If the provided element is an A tag, mark it and
     * add appropriate event handlers
     */
    //this.convertLink(element) {
    //}
});