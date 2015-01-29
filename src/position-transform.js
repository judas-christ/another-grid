//>>excludeStart("exclude", pragmas.exclude);
define([], function() {
    //>>excludeEnd("exclude");
    
    position.push({
        layout: function(element, left, top, width, height) {
            var elW = element.offsetWidth;
            var scale = width/elW;
            element.style.transform = 'translate('+(left-element.offsetLeft)+'px,'+(top-element.offsetTop)+'px)';// scale('+scale+')';
            element.style.width = width+'px';
            element.style.height = height+'px';
            element.style.transformOrigin = '0 0';
        },
        isSupported: function() { return 'transform' in document.body.style; }
    });

    //>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");