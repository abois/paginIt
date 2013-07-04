(function ($) {
	$.fn.paginIt = function (options) {
		var config = {
			width: 800,
			matchingElement: 'article',
			cssPrefix: 'paginit'
		};
		if (options) {
			$.extend(true, config, options);
		}
		return this.each(function () {
			var $this = $(this);
			// Init
			var nbElements = $this.find(config.matchingElement).length;
			var current = 0;
			
			
			// Build html
			var prevElement = $('<a>', {'href': '#', 'class': config.cssPrefix+'prev'}).prependTo($this);
			var selectElement = $('<select>', {'class': config.cssPrefix+'choice'}).prependTo($this);
			$(config.matchingElement).each(function (i,val) {
				$('<option>', {'value': i}).text($(val).attr('data-title') ? $(val).attr('data-title') : i).appendTo(selectElement);
			});
			var currentElement = $('<span>', {'class': config.cssPrefix+'current'}).text(current).prependTo($this);
			var nextElement = $('<a>', {'href': '#', 'class': config.cssPrefix+'next'}).prependTo($this);
			
			
			$('.graphs').css({
				'position': 'absolute',
				'width': nbElements
			});
			$('.graphs article').css({
				'float': 'left',
				'width': config.width,
				'visibility': 'hidden'
			});

			$('.current').text(current);
			$('.graphs article:eq('+current+')').css({
				'visibility': 'visible'
			});
			
			var selectElement = $('<select>').on('change', function () {
				val = $(this).val();
				$('.current').text(current);
				goTo(val);
			});
			
			// EVENTS
			$('.graphs').on('click', '.next', function () {
				next();
			});
			$('.graphs').on('click', '.prev', function () {
				prev();
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
				$('.graphs article').eq(current).css({
					'visibility': 'hidden'
				});
				current++;
				$('.graphs article').eq(current).css({
					'visibility': 'visible'
				});
				for(var i=0;i<current;i++) {
					$('.graphs article').eq(i).css({
						'margin-left': parseFloat($('.graphs article').eq(i).css('margin-left').split('px')[0])-800
					});
				}
				
				$('.current').text(current);
			}
			
			function prev() {
				if(!hasPrev()) {
					return false;
				}
				$('.graphs article').eq(current).css({
					'visibility': 'hidden'
				});
				current--;
				$('.graphs article').eq(current).css({
					'visibility': 'visible'
				});
				for(i=0;i<=current;i++) {
					$('.graphs article').eq(i).css({
						'margin-left': parseFloat($('.graphs article').eq(i).css('margin-left').split('px')[0])+800
					});
				}
				$('.current').text(current);
			}
			
			function hasNext() {
				console.log(nbElements);
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
		});
	};
})(jQuery);