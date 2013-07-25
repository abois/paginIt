(function ($) {
    $.fn.paginIt = function (options) {
        var config = {
          current: 0,
          matchingElement: 'article',
          width: '100%',
          cssPrefix: 'paginit-',
          navbarPosition: 'top',
          prevContent: '&lt;',
          nextContent: '&gt;',
          // Requires jQuery UI
          useSlideEffect: true,
          effectDuration: 500,
          beforeNext: null,
          beforePrev: null,
          afterNext: null,
          afterPrev: null
        };
        if (options) {
            $.extend(true, config, options);
        }
        return this.each(function () {
            $this = $(this);
            $this.addClass('paginit');

            // Init
            elements = $this.find(config.matchingElement);
            nbElements = elements.length;
            current = config.current;
            currentElement = elements.eq(current).addClass(config.cssPrefix + 'current');

            // Build html
            wrapper = $('<div>', {'class': 'paginit-wrapper'}).appendTo($this);
            wrapperElements = $('<div>').appendTo(wrapper);
            elements.each(function () {
                $(this).appendTo(wrapperElements);
            });

            // Navbar
            navbar = $('<nav>', {'class': config.cssPrefix+'navbar'});
            if(config.navbarPosition === "top")
                navbar.prependTo(wrapper);
            else if(config.navbarPosition === "bottom")
                  navbar.appendTo(wrapper);
            else {
                navbar.prependTo(wrapper);
                console.warn("'" + config.navbarPosition + "' value for navbarPosition is not available. Expected value are 'top' or 'bottom'.");
            }
            prevElement = $('<span>', {'class': config.cssPrefix+'prev'}).html(config.prevContent).appendTo(navbar);
            selectElement = $('<select>', {'class': config.cssPrefix+'choices'}).appendTo(navbar);
            $(config.matchingElement).each(function (i,val) {
                $('<option>', {'value': i}).text($(val).attr('data-title') ? $(val).attr('data-title') : i+1).appendTo(selectElement);
            });
            selectElement.val(current);
            nextElement = $('<span>', {'class': config.cssPrefix+'next'}).html(config.nextContent).appendTo(navbar);

            // Build css
            wrapper.css({
                'overflow': 'hidden',
                'width': config.width,
                'position': 'relative'
            });
            elements.css({
                'display': 'none',
                'width': config.width
            });
            elements.eq(current).css({
                'display': 'block'
            });
            navbar.css({
                'width': config.width,
                'text-align': 'center'
            });
            nextElement.css({
                'display': 'inline-block',
                'text-decoration': 'none',
                'font-family': 'sans-serif',
                'padding': '2px 5px',
                'margin': '1px 3px',
                'min-width': '10px',
                'cursor': 'pointer'
            });
            prevElement.css({
                'text-decoration': 'none',
                'font-family': 'sans-serif',
                'padding': '2px 5px',
                'margin': '1px 3px',
                'min-width': '10px',
                'cursor': 'pointer'
            });
            selectElement.css({
                'display': 'inline-block',
                'text-decoration': 'none',
                'font-family': 'sans-serif',
                'min-width': '100px'
            });

            if(current === 0) {
                prevElement.css({'opacity': 0.5, 'cursor': 'default'}).addClass(config.cssPrefix+'disabled');
            }
            if(current === nbElements-1) {
                nextElement.css({'opacity': 0.5, 'cursor': 'default'}).addClass(config.cssPrefix+'disabled');
            }

            // EVENTS
            selectElement.on('change', function () {
                var val = $(this).val();
                goTo(val);
            });
            nextElement.on('click', function () {
                next();
            });
            prevElement.on('click', function () {
                prev();
            });
        });

        function goTo(element) {
            if(current<element) {
                for(i=current;i<element;i++)
                    if(!_processNext()) {
                        break;
                    }
                _processPage('next');
            } else if(current>element) {
                for(i=current;i>element;i--)
                    if(!_processPrev()) {
                        break;
                    }
                _processPage('prev');
            }
        }

        function next() {
            if(_processNext()) {
                _processPage('next');
            }
        }

        function prev() {
            if(_processPrev()) {
                _processPage('prev');
            }
        }

        function hasNext() {
            if(current>=nbElements-1) {
                return false;
            }
            return true;
        }

        function hasPrev() {
            if(current<=0) {
                return false;
            }
            return true;
        }

        function _processNext() {
            if(hasNext()) {
                if(typeof(config.beforeNext) === 'function')
                    if(config.beforeNext() !== false) {
                        current++;
                    } else {
                        selectElement.val(current);
                        return false;
                    }
                else
                    current++;
                if(typeof(config.afterNext) === 'function')
                    config.afterNext();
                return true;
            }
            return false;
        }

        function _processPrev() {
            if(hasPrev()) {
                if(typeof(config.beforePrev) === 'function')
                    if(config.beforePrev() !== false) {
                        current--;
                     } else {
                        selectElement.val(current);
                        return false;
                     }
                else
                    current--;
                if(typeof(config.afterPrev) === 'function')
                    config.afterPrev();
                return true;
            }
            return false;
        }

        function _processPage(direction) {
            $('.' + config.cssPrefix + 'current').removeClass(config.cssPrefix + 'current').hide();
            if(config.useSlideEffect)
                if(jQuery.ui)
                    elements.eq(current).addClass(config.cssPrefix + 'current').show().effect('slide', {direction: direction === 'next' ? 'left' : 'right'}, config.effectDuration);
                else {
                    elements.eq(current).addClass(config.cssPrefix + 'current').show();
                    console.warn('To use the slide effect, you need to import jQuery UI.');
                }
            else
                elements.eq(current).addClass(config.cssPrefix + 'current').show();
            selectElement.val(current);
            if(direction === 'next') {
                prevElement.css({'opacity': 1, 'cursor': 'pointer'}).removeClass(config.cssPrefix+'disabled');
                if(!hasNext())
                    nextElement.css({'opacity': 0.5, 'cursor': 'default'}).addClass(config.cssPrefix+'disabled');
            } else {
                nextElement.css({'opacity': 1, 'cursor': 'pointer'}).removeClass(config.cssPrefix+'disabled');
                if(!hasPrev())
                    prevElement.css({'opacity': 0.5, 'cursor': 'default'}).addClass(config.cssPrefix+'disabled');
            }
        }
    };
})(jQuery);
