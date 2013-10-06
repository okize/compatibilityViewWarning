/*!
 * Compatibility View Warning v1.0.2 (http://okize.github.com/)
 * Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

;(function (window, document) {

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
        msgStyle = msg.style, // css styling of message
        btn = document.createElement('button'), // button element that will dismiss the warning message
        btnStyle = btn.style; // css styling of button

      // set warning message properties
      msg.id = 'compatibilityViewWarning';
      msg.innerHTML = config.defaultMsg;

      // include close button
      if (config.closeButton) {

        // set close button properties
        btn.id = 'compatibilityViewWarningClose';
        btn.innerText = 'X';
        btn.title = 'Click to dismiss this warning message';

        // when close button is clicked this function removes the warning message from the dom
        btn.dismissMsg = function(e) {

          e = e||window.event;
          e.returnValue = false;

          // unbind event handler for gc
          if (this.removeEventListener) {
            this.removeEventListener('click', btn.dismissMsg, false);
          } else if (this.detachEvent) {
            this.detachEvent('onclick', btn.dismissMsg);
          }

          // remove the warning message
          body.removeChild(msg);

        };

        // attach click handler
        if (btn.addEventListener) {
          btn.addEventListener('click', btn.dismissMsg, false);
        } else if (btn.attachEvent) {
          btn.attachEvent ('onclick', btn.dismissMsg);
        } else {
          btn.onclick = btn.dismissMsg;
        }

        // add close buton to warning message
        msg.appendChild(btn);

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
        btnStyle.backgroundColor = '#333';
        btnStyle.border = 'none';
        btnStyle.color = '#fff';
        btnStyle.cursor = 'pointer';
        btnStyle.display = 'inline';
        btnStyle.fontSize = '10px';
        btnStyle.fontWeight = 'bold';
        btnStyle.height = '16px';
        btnStyle.left = '5px';
        btnStyle.margin = '0';
        btnStyle.padding = '0';
        btnStyle.position = 'absolute';
        btnStyle.textAlign = 'center';
        btnStyle.top = '5px';
        btnStyle.width = '16px';
      }

      // append warning message to the dom
      firstEl.parentNode.insertBefore(msg, firstEl);

    }

  };

  // need to wait for body in case script is in head
  if (document.body) {
    warning.init();
  } else if (window.addEventListener) {
    window.addEventListener('load', function load() {
      window.removeEventListener('load', load, false);
      warning.init();
    }, false);
  } else {
    window.attachEvent('onload', function load() {
      window.detachEvent('onload', load);
      warning.init();
    }, false);
  }

})(window, window.document);