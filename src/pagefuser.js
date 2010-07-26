/**
 * @author Michi Kono
 * @date 2010-06-27
 */

/*
 * jQuery plugin syntax
 * This will wrap the Pagefuser class. By keeping the class separate, 
 * unit testing is simpler.
 */
(function($) {
	
    /**
     * attaching pagefuser as a plugin 
     */
    $.fn.pagefuser = function(settings) {
        
        /*
         * build main options before element iteration
         */
        return this.each(function() {
            var $this = $(this);
            /*
             * build element specific options
             */
            var pagefuser = new Pagefuser($.metadata ? $.extend({}, settings, $this.metadata()) : settings);
            pagefuser.attach($this);
            
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
var Pagefuser = (function(config) {
    
    /** 
     * Stores configuration values -- either defaults or those provided in a constructor
     */
    config = $.extend(Pagefuser.defaults, config);
    
    /**
     * Attaches this instance of Pagefuser to the element triggers all 
     * associated behavior on it (such as event handlers)
     *
     * Returns the number of elements converted
     */
    this.attach = function(element) {
        element = $(element);
        var counter = 0;
        /**
         * recursively looks into a DOM element and its children; for each, will 
         * mark it
         */
        if(element.is(config.attachTargets)) {
            this.dom.mark(element);
            counter++;
        }
        element.find(config.attachTargets).each($.proxy(function(index, child) {
            this.dom.mark(child);
            counter++;
        }, this));
        return counter;
    };

    /** 
     * DOM manipulation functionality helper
     */
    this.dom = {
        /**
         * Mark a DOM object as altered by this class so no additional
         * alterations affect it (for speed)
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
});

/*
    * default settings for the plugin
    */
Pagefuser.defaults = {
    /**
     * key value of marker data
     */
    marker: 'pagefuser-marker',
    
    /**
     * Targets that get the event handler attached to it. Accepts any valid selector from
     * the jQuery selector library
     */
    attachTargets: 'a,form'
};
