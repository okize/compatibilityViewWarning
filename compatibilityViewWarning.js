/*!
 * Compatibility View Warning v1.0.1 (http://okize.github.com/)
 * Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

;(function (window, document, undefined) {

	'use strict';

	// default configuration
	var config = {
		inlineCss: true,
		closeButton: true,
		defaultMsg: 'We noticed that you are using Internet Explorer in Compatibility View ' +
					'<sup><a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie-9/features/compatibility-view" target="_new">?</a></sup><br />' +
					'<strong>For the best experience, Compatibility View should be turned off.</strong>'
	};

	// warning object
	var warning = {

		init : function() {

			// show the warning if we're in compatibility mode
			if (this.isIeCompatibilityMode()) {
				this.showWarningMessage();
			} else {
				return;
			}

		},

		// checks user agent string to see if browser claims to be IE and is in compatibility mode
		isIeCompatibilityMode : function() {

			// user agent string
			var ua = window.navigator.userAgent;

			// does the browser self-identify as IE7?
			if (~ua.indexOf('MSIE 7.0')) {

				// does the browser also self-identify as using a newer version of Trident than IE7?
				if (~ua.indexOf('Trident/6.0') || ~ua.indexOf('Trident/5.0') || ~ua.indexOf('Trident/4.0')) {
					return true;
				}

			} else {
				return false;
			}

		},

		// displays the warning message to the user
		showWarningMessage : function() {

			var body = document.getElementsByTagName('body')[0],
				firstEl = body.firstElementChild || body.children[0], // ie7 doesn't support firstElementChild
				msg = document.createElement('div'), // the warning message element
				msgStyle = msg.style,
				closeBtn = document.createElement('button'), // button element that will dismiss the warning message
				closeBtnStyle = closeBtn.style;

			// set warning message properties
			msg.id = 'compatibilityViewWarning';
			msg.innerHTML = config.defaultMsg;

			// include close button
			if (config.closeButton) {

				// set close button properties
				closeBtn.id = 'compatibilityViewWarningClose';
				closeBtn.innerText = 'X';
				closeBtn.title = 'Click to dismiss this warning message';

				// when close button is clicked this function removes the warning message from the dom
				closeBtn.dismissMsg = function(e) {

					e = e||window.event;
					e.returnValue = false;

					// unbind event handler for gc
					if (this.removeEventListener) {
						this.removeEventListener('click', closeBtn.dismissMsg, false);
					} else if (this.detachEvent) {
						this.detachEvent('onclick', closeBtn.dismissMsg);
					}

					// remove the warning message
					body.removeChild(msg);

				};

				// attach click handler
				if (closeBtn.addEventListener) {
					closeBtn.addEventListener('click', closeBtn.dismissMsg, false);
				} else if (closeBtn.attachEvent) {
					closeBtn.attachEvent ('onclick', closeBtn.dismissMsg);
				} else {
					closeBtn.onclick = closeBtn.dismissMsg;
				}

				// add close buton to warning message
				msg.appendChild(closeBtn);

			}

			// set warning message styles
			if (config.inlineCss) {
				msgStyle.backgroundColor = '#ffc';
				msgStyle.border = '2px solid #333';
				msgStyle.color = '#333';
				msgStyle.margin = '0';
				msgStyle.padding = '6px 0';
				msgStyle.position = 'relative';
				msgStyle.textAlign = 'center';
				msgStyle.width = '100%';
			}

			// set close button styles
			if (config.closeButton && config.inlineCss) {
				closeBtnStyle.backgroundColor = '#333';
				closeBtnStyle.border = 'none';
				closeBtnStyle.color = '#fff';
				closeBtnStyle.cursor = 'pointer';
				closeBtnStyle.display = 'inline';
				closeBtnStyle.fontSize = '10px';
				closeBtnStyle.fontWeight = 'bold';
				closeBtnStyle.height = '16px';
				closeBtnStyle.left = '5px';
				closeBtnStyle.margin = '0';
				closeBtnStyle.padding = '0';
				closeBtnStyle.position = 'absolute';
				closeBtnStyle.textAlign = 'center';
				closeBtnStyle.top = '5px';
				closeBtnStyle.width = '16px';
			}

			// append warning message to the dom
			firstEl.parentNode.insertBefore(msg, firstEl);

		}

	};

	// need to wait for body in case script is in head
	if (document.body) {
		warning.init();
	} else if (window.addEventListener) {
		window.addEventListener('load', function load(e) {
			window.removeEventListener('load', load, false);
			warning.init();
		}, false);
	} else {
		window.attachEvent('onload', function load(e) {
			window.detachEvent('onload', load);
			warning.init();
		}, false);
	}

})(window, window.document);