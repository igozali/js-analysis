
      var removeFlashMsgTimeout;
      function flash(message, duration) {
        $("#subscription_message").text(message);

        clearTimeout(removeFlashMsgTimeout);
        removeFlashMsgTimeout = window.setTimeout(function() {
          $("#subscription_message").text('');
        }, duration ? duration : 7500);
      }

      // Return a string representation of roughly how long ago the 
      // given ticks were, e.g. "just now" or "2 hours ago".  If ticks is
      // undefined, return blank.
      function how_long_ago(duration) {
        var seconds = Math.round(duration / 1000);
        if (seconds < 10)
          return translate("updatedrightnow");
        if (seconds < 60)
          return translate("updatedsecondsago", [seconds]);
        var minutes = Math.round(seconds / 60);
        if (minutes == 1)
          return translate("updatedminuteago");
        if (minutes < 60)
          return translate("updatedminutesago", [minutes]);
        var hours = Math.round(minutes / 60);
        if (hours == 1)
          return translate("updatedhourago");
        if (hours < 24)
          return translate("updatedhoursago", [hours]);
        var days = Math.round(hours / 24);
        if (days == 1)
          return translate("updateddayago");
        return translate("updateddaysago", [days]);
      }


      // If true, change events won't run.
      global_refreshing_subscription_view = false;
      // Cache the fetched subscriptions so we can update their times.
      global_subscriptions_cached_copy = undefined;

      // Update the "last updated" messages in the subscription view.
      function redisplay_subscription_update_times() {
        var subs = global_subscriptions_cached_copy;
        var lessThanMinute = false;
        if (subs == undefined)
          return;
        $(".subscription").each(function(i,el) {
          var when_text = "";
          var id = $("input", el).attr("name");
          if (subs[id] && subs[id].subscribed && subs[id].last_update) {
            var timeSinceUpdate = new Date().getTime() - subs[id].last_update;
            when_text = how_long_ago(timeSinceUpdate);
            if (timeSinceUpdate < 60000)
              lessThanMinute = true;
          }

          $(".update_time", el).text(when_text);
        });

        // Every so often, redisplay "last update" times on subscriptions.
        if (typeof lastUpdateInterval != "undefined") 
          clearInterval(lastUpdateInterval);
        lastUpdateInterval = window.setInterval(function() { 
          redisplay_subscription_update_times();
        }, lessThanMinute ? 1000 : 60000);
      }

      // Load the latest subscription model object and display it in
      // the checkboxes.
      function refresh_subscription_view() {
        BGcall("get_subscriptions_minus_text", function(subs) {
          global_refreshing_subscription_view = true;

          $(".subscription").each(function(i,el) {
            var is_checked = "";

            var id = $("input", el).attr("name");
            if (subs[id] && subs[id].subscribed)
              is_checked = "checked";

            $("input", el).attr("checked", is_checked);

            if (subs[id] && subs[id].user_submitted && is_checked == false) {
              $(this).find(".remove_filter").css("display", "inline");
              $(this).closest("div").find(".update_time").text("");
            }
          });
        
          global_refreshing_subscription_view = false;

          // Keep this around to update the "last updated" displays.
          global_subscriptions_cached_copy = subs;
          redisplay_subscription_update_times();
        });
      }

      chrome.extension.onRequest.addListener(function(request) {
        if (request.command != "filters_updated") 
          return;
        refresh_subscription_view();
      });

      // Unsubscribe from the given filterlist id.
      // 'del' determines if it should be deleted too
      function unsubscribe(id, del) {
        BGcall("unsubscribe", id, del);
        var message = (del) ? translate("removedlabel")
                            : translate("unsubscribedlabel");
        flash(message);
      }
      // Subscribe to the given filterlist id.  id is either a well-known id, or
      // "url:xyz", where xyz is the URL of a user-specified filter list.
      // If you can't fetch the latest version of the list, fail.  If 
      // then_reload is specified and is true, reload the tab upon 
      // success.
      function subscribe(id, then_reload) {
        var url;
        if (id in global_subscriptions_cached_copy)
          url = global_subscriptions_cached_copy[id].url;
        else
          url = id.substring(4); // "url:xyz"

        flash(translate("fetchinglabel"), 60000);
        var onError = function() {
          alert(translate("failedtofetchfilter"));
          var myIndex = $("#tabpages").tabs("option", "selected");
          $("#tabpages").tabs("load", myIndex);
        }
        $.ajax({
          url: url,
          cache: false,
          success: function(text) {
            if (!text) {
              onError(); // not sure why we even get here, but we do
              return;
            }
            if (text[0] != '!' && 
                text[0] != '[' &&
                text.indexOf('(Adblock') != 0) {
              alert(translate("enterurloflist"));
              flash(translate("nolisturllabel"));
              return;
            }
            BGcall("subscribe", id, text, null);
            flash(translate("subscribedlabel"));
            if (then_reload) {
              var myIndex = $("#tabpages").tabs("option", "selected");
              $("#tabpages").tabs("load", myIndex);
            }
          },
          error: onError
        });
      }

      $(function() {
        BGcall("get_subscriptions_minus_text", function(subscriptions) {
          //sorting the list
          //1, 2: AB custom and easylist
          //3: additional easylist filters
          //4: other default filters
          //5: EasyPrivacy
          //6: custom filter lists
          var sorted_list = [];
          for (var id in subscriptions) {
            var entry = subscriptions[id];
            if (id == 'adblock_custom')
              entry.order = "1adblock_custom";
            else if (id == 'easylist')
              entry.order = "2easylist";
            else if (id == 'easyprivacy')
              entry.order = "5easyprivacy";
            else if (entry.user_submitted)
              entry.order = "6" +
                  (translate("filter" + id) || entry.name).toLowerCase();
            else if (entry.name.indexOf(" - additional ") == 0)
              entry.order = "3" +
                  (translate("filter" + id) || entry.name).toLowerCase();
            else
              entry.order = "4" +
                  (translate("filter" + id) || entry.name).toLowerCase();
            entry.id = id;
            entry.name = translate("filter" + id) || entry.name;
            sorted_list.push(entry);
          }
          sorted_list.sort(function(a,b) {
            return a.order > b.order ? 1 : (a.order == b.order ? 0 : -1);
          });

          // Build subscription checkboxes.
          for (var i = 0; i < sorted_list.length; i++) {
            var entry = sorted_list[i];
            var div = $("<div></div>").
              addClass("subscription");

            var checkbox = $('<input type="checkbox" />').
              attr("name", entry.id).
              attr("id", "subscription" + i);

            var name = $("<label>").
              text(entry.name).
              attr("title", entry.url).
              attr("for", "subscription" + i);

            var link_to_list = $("<a>", { target: "_new" }).
              text(translate('labelshow')).
              css("margin-left", "6px").
              css("font-size", "10px").
              css("display", "none").
              attr("class", "linkToList").
              attr("href", entry.url);
              
            var remove_filter_label = $("<a>").
              css("font-size", "10px").
              css("display", "none").
              attr("href", "#").
              text(translate("removefromlist")).
              addClass("remove_filter").
              click(function(event) {
                event.preventDefault();
                unsubscribe($(this).closest("div").children("input").attr("name"), true);
                $(this).closest("div").remove();
              });

            div.
              append(checkbox).
              append(name).
              append(link_to_list).
              append($("<span></span>").addClass("update_time")).
              append(remove_filter_label);

            $("#filter_subscriptions").
              append(div);
          }

          // Now that it's built, fill it in.
          refresh_subscription_view();

          // Each subscription checkbox, upon change, should subscribe
          // or unsubscribe the user and refresh the subscriptions.
          $('.subscription input:checkbox').change(function() {
            var checked = $(this).is(":checked");
            if (checked)
              $(this).closest("div").find(".remove_filter").css("display", "none");
              
            // If it changed in response to a model change event,
            // don't naively go tell the model about the event.
            if (global_refreshing_subscription_view) 
              return;
            
            var id = $(this).attr("name");
            if (!checked)
              unsubscribe(id, false);
            else
              subscribe(id);
          });

          $("#btnUpdateNow").click(function() {
            $(this).attr("disabled", "disabled");
            BGcall("update_subscriptions_now");
            setTimeout(function() {
              $("#btnUpdateNow").removeAttr("disabled");
            }, 300000); //re-enable after 5 minutes
          });

          $("#btnNewSubscriptionUrl").click(function() {
            var url = $("#txtNewSubscriptionUrl").val();
            var abp_regex = /^abp.*location=(.*)$/;
            if (abp_regex.test(url)) {
              url = url.match(abp_regex)[1]; // the part after 'location='
              if (/&title/.test(url)) // then strip it
                url = url.substring(0, url.indexOf('&title'));
              url = unescape(url);
            }
            subscribe("url:" + url, true);
          });

          $('#txtNewSubscriptionUrl').keypress(function(event) {
            if (event.keyCode == '13') {
              event.preventDefault();
              $("#btnNewSubscriptionUrl").click();
            }
          });
        });
      });

  