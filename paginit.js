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
			      navbar = $('<nav>', {'class': config.cssPrefix+'navbar'}).prependTo($this);
			      prevElement = $('<a>', {'href': '#', 'class': config.cssPrefix+'prev'}).html(config.prevContent).appendTo(navbar);
			      selectElement = $('<select>', {'class': config.cssPrefix+'choice'}).appendTo(navbar);
			      $(config.matchingElement).each(function (i,val) {
				      $('<option>', {'value': i}).text($(val).attr('data-title') ? $(val).attr('data-title') : i).appendTo(selectElement);
			      });
			      nextElement = $('<a>', {'href': '#', 'class': config.cssPrefix+'next'}).html(config.nextContent).appendTo(navbar);
//			      inputElement = $('<span>', {'class': config.cssPrefix+'current'}).text(current).appendTo(navbar);

			      // build css
			      $this.css({
				      'position': 'absolute',
				      'width': nbElements
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
			        'width': config.width
			      });

			      // EVENTS
			      selectElement.on('change', function () {
				        var val = $(this).val();
				        goTo(val);
				        inputElement.text(current);
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
			      for(var i=0;i<current;i++) {
			          var element = $(config.matchingElement).eq(i);
				        element.css({
					        'margin-left': parseFloat(element.css('margin-left').split('px')[0])-config.width
				        });
			      }
			      inputElement.text(current);
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
			      for(i=0;i<=current;i++) {
			          var element = $(config.matchingElement).eq(i);
				        element.css({
					        'margin-left': parseFloat(element.css('margin-left').split('px')[0])+config.width
				        });
			      }
			      inputElement.text(current);
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
