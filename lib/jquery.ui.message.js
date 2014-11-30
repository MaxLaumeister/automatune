/*
    Message plugin for jQuery UI
    Copyright (c) 2010 John Rummell (jrummell.com)
    Licensed under the GPL license (http://www.gnu.org/licenses/gpl.html)
    Version: 1.5.37
*/

//
// create closure
//
(function (jQuery)
{
    //
    // plugin methods
    //
    var methods = {
        init: function (options)
        {
            options = jQuery.extend({}, jQuery.fn.message.defaults, options);

            return this.each(function ()
            {
                var $this = jQuery(this);
                var data = $this.data("message");

                // only initialize once
                if (!data)
                {
                    // use given message or inner html
                    var messageText = options.message;
                    if (messageText == null || messageText == "")
                    {
                        messageText = $this.html();
                        options.message = messageText;
                    }

                    // info or error?
                    var messageClass = options.type == "info" ? "ui-state-highlight" : "ui-state-error";
                    var iconClass = options.type == "info" ? "ui-icon-info" : "ui-icon-alert";

                    // build message html
                    var messageHtml = "<div class='ui-widget message-container'>";
                    messageHtml += "<div class='" + messageClass + " ui-corner-all' >";
                    messageHtml += "<p><span class='ui-icon " + iconClass + "' style='float:left;'></span>";
                    messageHtml += "<span class='message-text'>" + messageText + "</span>";
                    if (options.dismiss)
                    {
                        messageHtml += "<span class='message-dismiss'>Click to dismiss.</span>";
                    }
                    messageHtml += "</p></div></div>";

                    if (options.dismiss)
                    {
                        // hide messages on click
                        $this.click(function ()
                        {
                            jQuery(this).hide('normal');
                        });
                    }

                    // set html and show the message
                    $this.html(messageHtml).show();

                    // save options
                    $this.data("message", options);
                }
            });
        },
        options: function (options)
        {
            return this.each(function ()
            {
                var $this = jQuery(this);
                var currentOptions = $this.data("message") || {};
                options = jQuery.extend({}, currentOptions, options);
                $this.message("destroy").message("init", options);
            });
        },
        show: function ()
        {
            jQuery(this).show();
        },
        hide: function ()
        {
            jQuery(this).hide();
        },
        destroy: function ()
        {
            return this.each(function ()
            {
                var $this = jQuery(this);
                var data = $this.data("message");

                jQuery(".message-container", $this).remove();
                $this.html(data.message).css("display:none");
                $this.removeData("message");
            });
        }
    };

    jQuery.fn.message = function (method)
    {
        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof (method) === 'object' || !method)
        {
            return methods.init.apply(this, arguments);
        }
        else
        {
            jQuery.error("Method " + method + " does not exist on jQuery.message");
        }
    };

    //
    // plugin defaults
    //
    jQuery.fn.message.defaults = {
        message: "", // leave blank to use element html
        type: "info", // info or error
        dismiss: true // append 'Click to dismiss' to message and hide on click
    };
})(jQuery);
