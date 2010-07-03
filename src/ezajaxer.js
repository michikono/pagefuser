/**
 * @author Michi Kono
 * @date 2010-06-27
 */

/**
 * This is not a singleton and should be managed as a regular class object
 *
 *
 */
var Ezajaxer = (function(userConfig) {
    
    /** 
     * Stores configuration values -- either defaults or those provided in a constructor
     */
    this.config = (function(config) {
        return {
          /**
           * key value of marker data
           */
           marker: (config.marker || 'ezajaxer-marker')
        };
    
    /*
     * pass nothing in if null is provided
     */    
    })(userConfig || {});
        
    /** 
     * DOM manipulation functionality helper
     */
    this.dom = (function(config) {
        return {
        /**
         * Mark a DOM object as altered by this class so additional
         * event handlers are added to it
         * 
         * @param DOM element
         * @return jQuery DOM element
         */
        mark: function(element) {
            return $(element).data(config.marker, config.marker);
        },
        
        /**
         * Unmark a DOM object that was altered by mark()
         * 
         * @param DOM element
         * @return jQuery DOM element
         */
        unmark: function(element) {
            return $(element).data(config.marker, null);
        },
        
        /**
         * Tests if an element has been marked
         *
         * @param DOM element
         * @return Returns the marker name associated to this element
         */
        getMarker: function(element) {
            return $(element).data(config.marker);
        },
        
        /**
         * Tests if an element has been marked
         *
         * @param DOM element
         * @return TRUE if has been marked
         */
        hasMarker: function(element) {
            return Boolean($(element).data(config.marker) || false);
        }
    };
    }(this.config));
});

