/* Editable Plugin
 * @author: Pablo Cazorla
 * @e-mail: pablo.cazorla@huddle.com.ar
 * @date: 22/08/2012
 */
(function($) {
	$.fn.editable = function(options) {
		//Settings
		var setting = $.extend({
			duration: 200,
			zIndex: 200,
			label: 'Editar',
			onBlurFunction: function(){}
		}, options);

		return this.each(function() {
			var $this = $(this),
				$editableContent = $('<span>' + $this.text() + '</span>');
				$this.html('').append($editableContent);

			if ($this.css('position') === 'static') {
				$this.css('position', 'relative');
			}

			var $labelText = $('<div/>')
				.css({
					'position': 'absolute',
					'top': '50%',
					'left': '50%',
					'resize': 'none',
					'color': '#111',
					'font-family': 'Open Sans, Arial, sans-serif',
					'font-size': '16px',
					'text-align': 'center',
					'line-height': '16px',
					'height': '16px',
					'width': '100px',
					'margin': '-9px 0 0 -50px'
				})
				.text(setting.label);


			var $label = $('<div/>')
				.css({
					'position': 'absolute',
					'z-index': setting.zIndex,
					'top': '0',
					'left': '0',
					'background-color': 'rgba(255,255,255,.9)',
					'cursor': 'pointer',
					'display': 'none'
				})
				.width($this.width())
				.height($this.height())
				.append($labelText)
				.appendTo($this);

			var $textarea = $('<textarea/>')
				.css({
					'position': 'absolute',
					'z-index': setting.zIndex,
					'top': '0',
					'left': '0',
					'resize': 'none',
					'background-color': '#FFF',
					'border': 'solid 1px #CCC',
					'color': '#444',
					'font-family': 'Open Sans, Arial, sans-serif',
					'font-size': '11px',
					'line-height': '1.3em',
					'padding': '0',
					'display': 'none'
				})
				.width($this.width())
				.height($this.height())
				.val($editableContent.text())
				.appendTo($this);


			$this.hover(function() {
				$label.fadeIn(200);
			}, function() {
				$label.fadeOut(200);
			});

			$label.click(function(e) {
				e.preventDefault();
				$textarea
					.width($this.width())
					.height($this.height())
					.val($editableContent.text())
					.show()
					.focus()
			});
			$textarea.blur(function(){
				$editableContent.text($textarea.val());
				$textarea.hide();
				$label
					.width($this.width())
					.height($this.height());
				setting.onBlurFunction.apply(null,[$this]);
			});

		});
	};
})(jQuery);