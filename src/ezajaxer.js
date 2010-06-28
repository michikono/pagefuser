/**
 * @author Michi Kono
 * @date 2010-06-27
 */

/**
 * This is not a singleton and should be managed as a regular class object
 *
 *
 */
Ezajaxer = function() {
    
    
    /**
     * key value of marker data
     */
    this.marker = 'ezajaxer-marker';
    
    /**
     * mark a DOM object as altered by this class so additional
     * event handlers are added to it
     * 
     * @param DOM element
     * @return element
     */
    this.mark = function(element) { 
        return $(element).data(this.marker, true);
    };
    
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
};