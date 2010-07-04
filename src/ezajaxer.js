/**
 * @author Michi Kono
 * @date 2010-06-27
 */

/*
 * jQuery plugin syntax
 * This will wrap the Ezajaxer class. By keeping the class separate, 
 * unit testing is simpler.
 */
(function($) {
	
    /**
     * attaching ezajaxer as a plugin 
     */
    $.fn.ezajaxer = function(settings) {
        
        /*
         * build main options before element iteration
         */
        return this.each(function() {
            var $this = $(this);
            /*
             * build element specific options
             */
            $this.data.ezajaxer = new Ezajaxer($.metadata ? $.extend({}, settings, $this.metadata()) : settings);
            $this.data.ezajaxer.attach($this);
            return $(this);
        });
    };    
})(jQuery);


/**
 * This is NOT a singleton and should be managed as a regular class object
 * @param   Element that will be modified
 * @param   Configs
 *
 */
var Ezajaxer = (function(userConfig) {
    
    /** 
     * Stores configuration values -- either defaults or those provided in a constructor
     */
    this.config = (function(config) {
        return $.extend({
          /**
           * key value of marker data
           */
           marker: 'ezajaxer-marker'
        }, config);
    
    /*
     * pass nothing in if null is provided
     */    
    })(userConfig || {});
    
    /**
     * Attaches this instance of Ezajaxer to the element triggers all 
     * associated behavior on it (such as event handlers)
     */
    this.attach = function(element) {
        
    };
     
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

/*
    * default settings for the plugin
    */
Ezajaxer.defaults = {
    /**
    * key value of marker data
    */
    marker: 'ezajaxer-marker'
};
