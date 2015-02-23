/*!
 * mod_phproberto_github
 * Copyright (C) 2015 Roberto Segura. All rights reserved.
 * Licensed under http://www.gnu.org/licenses/gpl-2.0.html
 */
(function($){
	$(document).ready(function () {
		/**
		 * Hide fields through javascript
		 *
		 * @param   string  mode          Speficic selector of fields to hide
		 * @param   string  baseSelector  Prefix for selector
		 *
		 * @return  void
		 */
		function hideFields(mode, baseSelector) {
			$(baseSelector + '-' + mode).closest('.control-group').fadeOut();
		}

		/**
		 * Show fields through javascript
		 *
		 * @param   string  mode          Speficic selector of fields to show
		 * @param   string  baseSelector  Prefix for selector
		 *
		 * @return  void
		 */
		function showFields(mode, baseSelector) {
			$(baseSelector + '-' + mode).closest('.control-group').fadeIn();
		}

		var authenticationSelector = 'input[name="jform[params][authenticate]"]';

		// Authentication switcher
		$(authenticationSelector).click(function(){
			var activeMode = $(this).val();
			console.log('value: ' + activeMode);
			var baseSelector = '.js-ghcard-authentication';

			switch (activeMode) {
				case '1':
					showFields('enabled', baseSelector);
					break;
				case '0':
				default:
					hideFields('enabled', baseSelector);
					break;
			}

		});

		$(authenticationSelector + '[checked="checked"]').trigger('click');
	});
})(jQuery);