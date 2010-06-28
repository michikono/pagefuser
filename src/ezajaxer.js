/*

Copyright (c) 2010 Michi Kono
www.ezajaxer.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

Ezajaxer = function() {
    
    
    /*
     * key value of marker data
     */
    this.marker = 'ezajaxer-marker';
    
    /*
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
    
    /*
     * Tests if an element has been marked
     *
     * @param DOM element
     * @return TRUE if has been marked
     */
    this.hasMarker = function(element) {
        return $(element).data(this.marker) || false;
    };
};