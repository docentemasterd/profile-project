/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Touch?
		if (skel.vars.mobile)
			$body.addClass('is-touch');

		// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
		$form.find('textarea').each(function () {

			var $this = $(this),
				$wrapper = $('<div class="textarea-wrapper"></div>'),
				$submits = $this.find('input[type="submit"]');

			$this
				.wrap($wrapper)
				.attr('rows', 1)
				.css('overflow', 'hidden')
				.css('resize', 'none')
				.on('keydown', function (event) {

					if (event.keyCode == 13
						&& event.ctrlKey) {

						event.preventDefault();
						event.stopPropagation();

						$(this).blur();

					}

				})
				.on('blur focus', function () {
					$this.val($.trim($this.val()));
				})
				.on('input blur focus --init', function () {

					$wrapper
						.css('height', $this.height());

					$this
						.css('height', 'auto')
						.css('height', $this.prop('scrollHeight') + 'px');

				})
				.on('keyup', function (event) {

					if (event.keyCode == 9)
						$this
							.select();

				})
				.triggerHandler('--init');

			// Fix.
			if (skel.vars.browser == 'ie'
				|| skel.vars.mobile)
				$this
					.css('max-height', '10em')
					.css('overflow-y', 'auto');

		});

		// Fix: Placeholder polyfill.
		$form.placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function () {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function () {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function () {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function () {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function () {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function (event) {
				event.stopPropagation();
			})
			.on('click', 'a', function (event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
				$menu._hide();

				// Redirect.
				if (href == '#menu')
					return;

				window.setTimeout(function () {
					window.location.href = href;
				}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function (event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
				$menu._toggle();

			})
			.on('click', function (event) {

				// Hide.
				$menu._hide();

			})
			.on('keydown', function (event) {

				// Hide on escape.
				if (event.keyCode == 27)
					$menu._hide();

			});

	});

})(jQuery);

$(document).ready(function () {
	if (window.location.pathname == '/index.html') {
		setTimeout(function () {
			alert("Bienvenido a mi sitio web personal");
		}, 5000);
	}


	$("#select1").change(function () {
		/* Reseteamos el segundo select si estuviera activo  */
		var select = $('#select2');
		select.val($('option:first', select).val());
		/*  Calculamos el total sacando el valor del primer select */
		var precioWeb = $("select[id=select1]").val();
		alert(precioWeb);
		$("#total").val(precioWeb);
	});

	$("#select2").change(function () {
		var totalWeb = $("select[id=select1").val();
		if (totalWeb == "") {
			alert("Debes seleccionar un tipo de página.");
		}
		else {
			var porcentaje = $("select[id=select2]").val();
			if (porcentaje == "") {
				$("#total").val(totalWeb);
			} else {
				totalWeb = totalWeb * porcentaje;
				$("#total").val(totalWeb);
			}
		}
	});

	$('.extras').on('change', function () {
		var totalWeb = $("select[id=select1").val();
		var porcentaje = $("select[id=select2]").val();
		if (totalWeb == "" || porcentaje == "") {
			alert("Debes elegir primero el tipo de Web y los plazos.");
			$('.extras:checked').prop('checked', false);
		}
		else {
			var totalWeb = $("#total").val();
			if ($(this).is(':checked')) {
				totalWeb = parseInt(totalWeb) + 400;
				$("#total").val(totalWeb);
			} else {
				totalWeb = parseInt(totalWeb) - 400;
				$("#total").val(totalWeb);
			}
		}
	});
});

/*

document.getElementById("links").onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
};
*/
