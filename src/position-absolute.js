//>>excludeStart("exclude", pragmas.exclude);
define([], function() {
    //>>excludeEnd("exclude");
    
    position.push({
        layout: function(element, left, top, width, height) {
            element.style.top = top + 'px';
            element.style.left = left + 'px';
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.position = 'absolute';
        },
        isSupported: function() { return true; }
    });

    //>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");