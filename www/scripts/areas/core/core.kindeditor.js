/// <reference path="../../seajs/sea.js" />
/// <reference path="../../jquery/jquery.js" />
/// <reference path="../../dengdu/dengdu.js" />
define(function (require, exports, module) {
    require("kindeditor/themes/default/default.css");
    require("kindeditor");
    (function () {
        //htmleditor
        var kindeditor = Dengdu.htmleditor = {};
        Dengdu.htmleditor.editors = {};
        Dengdu.htmleditor.getData = function () {
            var data = {};
            for (i in Dengdu.htmleditor.editors) {
                data[i] = Dengdu.htmleditor.editors[i].html();
            }
            $("span.dd-kindeditor-filedialog").each(function () { var span = $(this); var button = span.children("input[type='button']"); var furl = span.children("input[type='text']"); data[span.attr("name")] = furl.val() });
            return data;
        }
        Dengdu.htmleditor.setData = function (data) {
            for (i in kindeditor.editors) {
                Dengdu.htmleditor.editors[i].html(data[i]);
            }
            $("span.dd-kindeditor-filedialog").each(function () { var span = $(this); var button = span.children("input[type='button']"); var furl = span.children("input[type='text']"); furl.val(data[span.attr("name")]); });
        }

        $(".dd-form span.dd-kindeditor-filedialog").each(function () {
            var span = $(this);
            span.attr("rel", span.parents(".dd-form").attr("rel"));
        });

        $(".dd-form.detail,.dd-form[updatable='false']").each(function () {
            $(this).find(".dd-kindeditor-filedialog").find("input.dd-kindeditor-filedialog-button").remove();
        });

        $("textarea.dd-kindeditor").each(function () {
            var obj = $(this); var id = obj.attr("id"); var name = obj.attr("name"); var myoptions = $(this).attr("options");
            var dftoptions = {
                resizeType: 1,
                allowPreviewEmoticons: false,
                allowImageUpload: false,
                items: ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr',
                        'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink']
            };
            var options = myoptions ? JSON.decode(myoptions) : dftoptions;
            kindeditor.editors[name] = KindEditor.create('#{0}'.format(id), options);
        });

        $(".dd-form .dd-kindeditor-filedialog").each(function () {
            var span = $(this); var button = span.children("input[type='button']")[0]; var furl = span.children("input[type='text']");
            if (button) {
                var dftoptions = { uploadJson: '/core/uform/uj' };
                var myoptions = span.attr("options") || "{}";
                var options = $.extend(dftoptions, JSON.decode(myoptions));
                var up = { rel: span.attr("rel"), name: span.attr("name"), old: furl.val() };
                var uploadurl = $.url(options.uploadJson);
                options.uploadJson = "{0}?{1}".format(uploadurl.attr('path'), $.param($.extend({}, uploadurl.param(), up)));
                var uploadbutton = KindEditor.uploadbutton({
                    button: button,
                    fieldName: 'imgFile',
                    url: options.uploadJson,
                    afterUpload: function (data) {
                        if (data.error === 0) {
                            furl.val(data.url);
                        }
                        else alert(data.message);
                    },
                    afterError: function (str) {
                        alert(str);
                    }
                });
                uploadbutton.fileBox.change(function (e) {
                    uploadbutton.submit();
                });
            }
        });

        $(".dd-survey span[enabled='true'].dd-kindeditor-filedialog").each(function () {
            var span = $(this); var button = span.children("input[type='button']")[0]; var furl = span.children("input[type='text']");
            if (button) {
                var dftoptions = { uploadJson: '/core/survey/uj' };
                var myoptions = span.attr("options") || "{}";
                var options = $.extend(dftoptions, JSON.decode(myoptions));
                var up = { rel: span.attr("rel"), name: span.attr("name"), old: furl.val() };
                var uploadurl = $.url(options.uploadJson);
                options.uploadJson = "{0}?{1}".format(uploadurl.attr('path'), $.param($.extend({}, uploadurl.param(), up)));
                var uploadbutton = KindEditor.uploadbutton({
                    button: button,
                    fieldName: 'imgFile',
                    url: options.uploadJson,
                    afterUpload: function (data) {
                        if (data.error === 0) {
                            furl.val(data.url);
                        }
                        else alert(data.message);
                    },
                    afterError: function (str) {
                        alert(str);
                    }
                });
                uploadbutton.fileBox.change(function (e) {
                    uploadbutton.submit();
                });
            }
        });

        $("div.dd-element-body form.ke-upload-area").attr("style", "width: 50px;");
    })();
});