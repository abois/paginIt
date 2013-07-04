(function ($) {
	  $.fn.paginIt = function (options) {
		    var config = {
			    width: 800,
			    matchingElement: 'article',
			    cssPrefix: 'paginit',
			    prevContent: '<',
			    nextContent: '>'
		    };
		    if (options) {
			      $.extend(true, config, options);
		    }
		    return this.each(function () {
			      $this = $(this);
			      // Init
			      nbElements = $this.find(config.matchingElement).length;
			      current = 0;
			
			
			      // Build html
			      nextElement = $('<a>', {'href': '#', 'class': config.cssPrefix+'next'}).html(config.nextContent).prependTo($this);
			      currentElement = $('<span>', {'class': config.cssPrefix+'current'}).text(current).prependTo($this);
			      selectElement = $('<select>', {'class': config.cssPrefix+'choice'}).prependTo($this);
			      $(config.matchingElement).each(function (i,val) {
				      $('<option>', {'value': i}).text($(val).attr('data-title') ? $(val).attr('data-title') : i).appendTo(selectElement);
			      });
			      prevElement = $('<a>', {'href': '#', 'class': config.cssPrefix+'prev'}).html(config.prevContent).prependTo($this);
			
			      // build css
			      $('.graphs').css({
				      'position': 'absolute',
				      'width': nbElements
			      });
			      $('.graphs article').css({
				      'float': 'left',
				      'width': config.width,
				      'visibility': 'hidden'
			      });
			      $('.graphs article').eq(current).css({
				      'visibility': 'visible'
			      });
			
			      // EVENTS
			      selectElement.on('change', function () {
				        var val = $(this).val();
				        goTo(val);
				        currentElement.text(current);
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
			      $('.current').text(current);
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
			      $('.current').text(current);
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


