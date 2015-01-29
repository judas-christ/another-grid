//>>excludeStart("exclude", pragmas.exclude);
define([], function() {
    //>>excludeEnd("exclude");
    
    var document = window.document;
    var defaults = {
        cols: 3,
        landscape: 0.6,
        portrait: 0.1
    };

    //storage for calls
    var stored = [];

    //positioning algorithms
    var position = [];
    var positionAndSize;

    function anotherGrid(container, options, resized) {
        if(!resized) {
            stored.push([container, options, true]);
        }

        //if container is a string, get the element otherwise assume it's an element
        container = typeof container === 'string' ? document.querySelector(container) : container;
        var elements = container.children;

        options = mergeOptions(defaults, options);

        if(!positionAndSize) {
            positionAndSize = firstInArray(position, 'isSupported');
            if(!positionAndSize)
                throw Error('No supported positioning algorithm available');
        }

        var containerWidth = container.offsetWidth;
        var cols = functionOrValue(options.cols);
        var columnWidth = containerWidth / cols;
        var colHeights = clearArray(Array(cols));

        //the proability that elements should span two columns
        var landscapeProbability = functionOrValue(options.landscape);
        var portraitProbability = functionOrValue(options.portrait);

        for (var i = 0, l = elements.length; i < l; i++) {
            var element = elements[i];
            var elementWidth = element.offsetWidth;
            var elementHeight = element.offsetHeight;
            var ratio = elementWidth / elementHeight; //ratio > 1 == landscape
            var span = 1;
            
            var col = getShortestColumn(colHeights);

            if (colHeights[col] === colHeights[col + 1]
                //columns have equal height, randomize stretching
                && (ratio > 1 && Math.random() < landscapeProbability || Math.random() < portraitProbability)) {
                    //stretch!
                    span = 2;
            }

            var left = columnWidth * col;
            var top = colHeights[col];
            var width = span * columnWidth;
            var height = span * columnWidth / ratio;

            positionAndSize.layout(element, left, top, width, height);

            colHeights[col] += height;
            if (span === 2) {
                colHeights[col + 1] += height;
            }
        }

        container.style.height = getMaxHeight(colHeights)+'px';
    }

    function getShortestColumn(colHeights) {
        var index, min = Number.MAX_VALUE;
        for (var i = 0, l = colHeights.length; i < l; i++) {
            if (colHeights[i] < min) {
                index = i;
                min = colHeights[i];
            }
        }
        return index;
    }

    function getMaxHeight(colHeights) {
        var max = 0;
        for (var i = 0, l = colHeights.length; i < l; i++) {
            if (colHeights[i] > max) {
                max = colHeights[i];
            }
        }
        return max;
    }

    function mergeOptions(defaults, options) {
        var target = {};
        for(var i in defaults)
            if(defaults.hasOwnProperty(i))
                target[i] = options && i in options ? options[i] : defaults[i];
        return target;
    }

    function clearArray(array) {
        for(var i=array.length;i--;)
            array[i] = 0;
        return array;
    }

    function firstInArray(array, func) {
        for(var i=0,l=array.length;i<l;i++)
            if(array[i] && func in array[i] && array[i][func]())
                return array[i];
    }

    function functionOrValue(potentialFunction) {
        return typeof potentialFunction === 'function' ? potentialFunction() : potentialFunction;
    }

    window.anotherGrid = anotherGrid;

    //>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");