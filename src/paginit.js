(function ($) {
	  $.fn.paginIt = function (options) {
		    var config = {
			    width: 800,
			    matchingElement: 'article',
			    cssPrefix: 'paginit-',
			    prevContent: '&lt;',
			    nextContent: '&gt;',
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
			      current = 0;
			      currentElement = elements.eq(current);
			
			      // Build html
			      wrapper = $('<div>', {'class': 'paginit-wrapper'}).appendTo($this);
            wrapperElements = $('<div>').appendTo(wrapper);
			      elements.each(function () {
			          $(this).appendTo(wrapperElements);
			      });
			      navbar = $('<nav>', {'class': config.cssPrefix+'navbar'}).prependTo(wrapper);
			      prevElement = $('<span>', {'class': config.cssPrefix+'prev'}).html(config.prevContent).appendTo(navbar);
			      selectElement = $('<select>', {'class': config.cssPrefix+'choice'}).appendTo(navbar);
			      $(config.matchingElement).each(function (i,val) {
				      $('<option>', {'value': i}).text($(val).attr('data-title') ? $(val).attr('data-title') : i+1).appendTo(selectElement);
			      });
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
                'width': '10px',
                'cursor': 'pointer'
			      });
			      prevElement.css({
			          'text-decoration': 'none',
                'font-family': 'sans-serif',
                'padding': '2px 5px',
                'margin': '1px 3px',
                'width': '10px',
                'cursor': 'pointer'
			      });
			      selectElement.css({
			          'display': 'inline-block',
                'text-decoration': 'none',
                'font-family': 'sans-serif',
                'min-width': '100px'
			      });

			      if(current === 0) {
			          prevElement.css({'opacity': 0.5, 'cursor': 'default'});
			      } else if(current === nbElements) {
			          nextElement.css({'opacity': 0.5, 'cursor': 'default'});
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
            current = element;
            elements.eq(current).show(config.effectDuration);
            selectElement.val(current);
            prevElement.css({'opacity': 1, 'cursor': 'pointer'});
            nextElement.css({'opacity': 1, 'cursor': 'pointer'});
            if(!hasNext())
                nextElement.css({'opacity': 0.5, 'cursor': 'default'});
            if(!hasPrev())
				        prevElement.css({'opacity': 0.5, 'cursor': 'default'});
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
