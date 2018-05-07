/// <reference path="../jquery/jquery.js" />
/// <reference path="../bootstrap/js/bootstrap.min.js" />
/// <reference path="dengdu.js" />
/// <reference path="../jquery/jquery.validate.min.js" />
$(".dd-bootstrap-tab").each(function (index, tab) {
    var tabid = "dd-bootstrap-tab-" + index;
    $(tab).attr("id", tabid);
    $(tab).children("ul").children().each(function (index, li) { $(li).children('a').attr("href", '#' + tabid + "-" + index); });
    $(tab).children("div").children().each(function (index, div) { $(div).attr("id", tabid + "-" + index); });
});
$(function () {
    function serializeJson(form) {
        var serializeObj = {};
        var array = form.serializeArray();
        var str = form.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        var atts = []
        for (var name in serializeObj) {
            if (name.startWith("data.")) {
                serializeObj[name] = $.isArray(serializeObj[name]) ? serializeObj[name] : [serializeObj[name]];
                atts.push(name);
            }
        }
        var rows = [];
        if (atts.length > 0) {
            var rowCount = serializeObj[atts[0]].length;
            for (var i = 0; i < rowCount; i++) {
                var row = {};
                for (var j = 0; j < atts.length; j++) {
                    row[atts[j].substr(5)] = serializeObj[atts[j]][i];
                }
                rows.push(row);
            }
            serializeObj.data = rows;
        }
        for (var name in serializeObj) {
            var value = serializeObj[name];
            serializeObj[name] = $.isArray(value) || $.isPlainObject(value) ? JSON.encode(value) : value;
        }
        return serializeObj;
    }
    $(function () {
        if (jQuery.validator) {
            $("form").validate({
                errorElement: 'div',
                highlight: function (element) {
                    $(element).closest('.form-group').addClass("has-error");
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass("has-error").addClass("has-success");
                    $(element).closest('.form-group').find(".tooltip.error").remove();
                },
                errorPlacement: function (error, element) {
                    element.closest('.form-group').find(".tooltip.error").remove();
                    error.addClass("tooltip-inner");
                    tooltip = $('<div class="tooltip top error" role="tooltip" style="display: block;"><div class="tooltip-arrow"></div></div>');
                    tooltip.append(error);
                    var pos = $.extend({}, element.offset(), {
                        width: element.outerWidth()
                      , height: element.outerHeight()
                    });
                    element.closest('.form-group').append(tooltip);
                    var actualWidth = tooltip.outerWidth();
                    var actualHeight = tooltip.outerHeight();
                    tooltip.css({ display: 'block', opacity: '0.8' });
                    tooltip.offset({ left: pos.left + (pos.width - actualWidth) / 2, top: pos.top - pos.height });
                }
            });
        }
    });
    $("form a.btn-ajaxsubmit,form button.btn-ajaxsubmit,form input.btn-ajaxsubmit").click(function (e) {
        e.preventDefault();
        var btn = $(this);
        var form = btn.closest("form");
        if (jQuery && jQuery.validator) {
            if (!form.valid()) return;
        }
        if (btn.hasClass('btn-confirm')) {
            if (!confirm($.t("confirmMessage"))) return;
        };
        var postUrl = btn.attr('href') || form.attr("action");
        var postObj = serializeJson(form);
        var doneFunc = function () { btn.button('reset'); }
        btn.button('loading');
        Dengdu.asyncAjax(postUrl, postObj, doneFunc, doneFunc);
    });
});