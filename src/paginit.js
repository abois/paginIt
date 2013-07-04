(function ($) {
	  $.fn.paginIt = function (options) {
		    var config = {
			    width: 800,
			    matchingElement: 'article',
			    cssPrefix: 'paginit-',
			    prevContent: '&lt;',
			    nextContent: '&gt;'
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
			      $this.css({
			          'position': 'relative',
			      });
			      wrapper.css({
				        'overflow': 'hidden',
                'width': config.width
			      });
            wrapperElements.css({
                'position': 'absolute',
                'width': config.width*nbElements,
            });
			      elements.css({
				        'float': 'left',
				        'width': config.width,
				        'visibility': 'hidden'
			      });
			      currentElement.css({
				        'visibility': 'visible'
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
			    if(current<element) {
				      while(current<element && hasNext()) {
					        next();
				      }
			    } else if(current>element) {
				      while(current>element && hasPrev()) {
					        prev();
				      }
			    }
		    }
		
		    function next() {
			      if(!hasNext()) {
				       return false;
			      }
			      $(config.matchingElement).eq(current).css({
				        'visibility': 'hidden'
			      });
			      current++;
			      $(config.matchingElement).eq(current).css({
				        'visibility': 'visible'
			      });
            wrapperElements.css({
                'left': parseFloat(wrapperElements.css('left').split('px')[0])-config.width
            });
			      selectElement.val(current);
			      if(!hasNext()) {
			          nextElement.css({'opacity': 0.5, 'cursor': 'default'});
			      }
			      prevElement.css({'opacity': 1, 'cursor': 'pointer'});
		    }
		
		    function prev() {
			      if(!hasPrev()) {
				        return false;
			      }
			      $(config.matchingElement).eq(current).css({
				        'visibility': 'hidden'
			      });
			      current--;
			      $(config.matchingElement).eq(current).css({
				        'visibility': 'visible'
			      });
            wrapperElements.css({
                'left': parseFloat(wrapperElements.css('left').split('px')[0])+config.width
            });
			      selectElement.val(current);
			      if(!hasPrev()) {
				        prevElement.css({'opacity': 0.5, 'cursor': 'default'});
			      }
			      nextElement.css({'opacity': 1, 'cursor': 'pointer'});
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
