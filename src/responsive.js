//>>excludeStart("exclude", pragmas.exclude);
define([], function() {
    //>>excludeEnd("exclude");
    
    var resizeTimer;
    function resizeHandler() {
        for(var i=0,l=stored.length;i<l;i++) {
            anotherGrid.apply(null, stored[i]);
        }
    };

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeHandler, 50);
    });

    //>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");