(function ($) {
	  $.fn.paginIt = function (options) {
		    var config = {
          current: 0,
			    matchingElement: 'article',
			    width: 800,
			    cssPrefix: 'paginit-',
			    prevContent: '&lt;',
			    nextContent: '&gt;',
			    // Requires jQuery UI
			    slideEffect: true,
          effectDuration: 0
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
			      currentElement = elements.eq(current);
			
			      // Build html
			      wrapper = $('<div>', {'class': 'paginit-wrapper'}).appendTo($this);
            wrapperElements = $('<div>').appendTo(wrapper);
			      elements.each(function () {
			          $(this).appendTo(wrapperElements);
			      });
			      navbar = $('<nav>', {'class': config.cssPrefix+'navbar'}).prependTo(wrapper);
			      prevElement = $('<span>', {'class': config.cssPrefix+'prev'}).html(config.prevContent).appendTo(navbar);
			      selectElement = $('<select>', {'class': config.cssPrefix+'choices'}).appendTo(navbar);
			      $(config.matchingElement).each(function (i,val) {
				      $('<option>', {'value': i}).text($(val).attr('data-title') ? $(val).attr('data-title') : i+1).appendTo(selectElement);
			      });
			      selectElement.val(current);
			      nextElement = $('<span>', {'class': config.cssPrefix+'next'}).html(config.nextContent).appendTo(navbar);

			      // build css
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
            elements.eq(current).hide();
            if(config.slideEffect)
                if(jQuery.ui)
                    elements.eq(element).show().effect('slide', {direction: current<element ? 'right' : 'left'}, config.effectDuration);
                else {
                    elements.eq(element).show();
                    console.warn('To use the slide effect, you need to import jQuery UI.');
                }
            else
                elements.eq(element).show();
            current = element;
            selectElement.val(current);
            prevElement.css({'opacity': 1, 'cursor': 'pointer'}).removeClass(config.cssPrefix+'disabled');
            nextElement.css({'opacity': 1, 'cursor': 'pointer'}).removeClass(config.cssPrefix+'disabled');
            if(!hasNext())
                nextElement.css({'opacity': 0.5, 'cursor': 'default'}).addClass(config.cssPrefix+'disabled');
            if(!hasPrev())
				        prevElement.css({'opacity': 0.5, 'cursor': 'default'}).addClass(config.cssPrefix+'disabled');
		    }
		
		    function next() {
            if(hasNext())
                goTo(parseInt(current)+1);
		    }
		
		    function prev() {
            if(hasPrev())
                goTo(parseInt(current)-1);
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
    };
})(jQuery);
