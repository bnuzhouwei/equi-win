/// <reference path="../../seajs/sea.js" />
/// <reference path="../../jquery/jquery.js" />
/// <reference path="../../codemirror/lib/codemirror.js" />
define(function (require, exports, module) {
    require('codemirror/lib/codemirror.css');
    require('codemirror/addon/display/fullscreen.css');
    require('codemirror/addon/hint/show-hint.css');
    require('codemirror/addon/fold/foldgutter.css');
    require('areas/core/core.codemirror.css');
    Dengdu.codehighlighter = {};
    var highlighters = Dengdu.codehighlighter.highlighters = {};
    Dengdu.codehighlighter.getData = function () {
        var data = {};
        for (i in Dengdu.codehighlighter.highlighters) {
            data[i] = Dengdu.codehighlighter.highlighters[i].getValue();
        }
        return data;
    }
    Dengdu.codehighlighter.setData = function (data) {
        for (i in Dengdu.codehighlighter.highlighters) {
            var editor = Dengdu.codehighlighter.highlighters[i];
            editor.setValue(data[i] ? data[i] : "");
            editor.refresh();
        }
    }
    require("codemirror/lib/codemirror");
    require.async(['codemirror/addon/edit/closebrackets', 'codemirror/addon/edit/matchbrackets', 'codemirror/addon/display/fullscreen', 'codemirror/addon/hint/show-hint', 'codemirror/addon/hint/anyword-hint', 'codemirror/addon/search/searchcursor', 'codemirror/addon/search/match-highlighter', 'codemirror/addon/fold/foldcode', 'codemirror/addon/fold/foldgutter'], function () {
        $('.dd-codemirror').each(function () {
            var options = {
                indentUnit: 4, lineNumbers: true, viewportMargin: Infinity, matchBrackets: true, autoCloseBrackets: true, extraKeys: {
                    "F11": function (cm) {
                        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                    },
                    "Esc": function (cm) {
                        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                    },
                    "Ctrl-Q": "autocomplete"
                }, completeSingle: false, lineWrapping: true, autofocus: false,
                highlightSelectionMatches: { showToken: /\w/ }
            };
            var self = $(this);
            var name = self.attr('name');
            var mode = self.attr('mode');
            if (mode == "html") {
                require.async(['codemirror/addon/edit/closetag', 'codemirror/addon/edit/matchtags', 'codemirror/mode/xml/xml', 'codemirror/mode/javascript/javascript', 'codemirror/mode/css/css', 'codemirror/mode/htmlmixed/htmlmixed', 'codemirror/addon/hint/xml-hint', 'codemirror/addon/hint/html-hint', 'codemirror/addon/fold/xml-fold', 'codemirror/addon/fold/brace-fold'], function () {
                    var mime = {
                        name: "htmlmixed",
                        scriptTypes: [{ matches: /\/x-handlebars-template|\/x-mustache/i, mode: null }, { matches: /(text|application)\/(x-)?vb(a|script)/i, mode: "vbscript" }]
                    };
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mime, autoCloseTags: true, matchTags: { bothTags: true }, foldGutter: true, gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] }));
                });
            }
            else if (mode == "markdown") {
                require.async(['codemirror/addon/mode/overlay', 'codemirror/mode/xml/xml', 'codemirror/mode/markdown/markdown', 'codemirror/mode/gfm/gfm', 'codemirror/mode/javascript/javascript', 'codemirror/mode/css/css', 'codemirror/mode/htmlmixed/htmlmixed', 'codemirror/mode/clike/clike'], function () {
                    var mime = 'gfm';
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mime }));
                });
            }
            else if (mode == "css") {
                var mime = 'text/css';
                require.async(['codemirror/mode/css/css', 'codemirror/addon/hint/css-hint'], function () {
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mime }));
                });
            }
            else if (mode == "javascript") {
                var mime = 'text/javascript';
                require.async(['codemirror/mode/javascript/javascript', 'codemirror/addon/hint/javascript-hint'], function () {
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mime }));
                });
            }
            else if (mode == "tsql") {
                var mime = 'text/x-mssql';
                require.async(['codemirror/mode/sql/sql', 'codemirror/addon/hint/sql-hint'], function () {
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, {
                        mode: mime
                    }));
                });
            }
            else if (mode == "json") {
                var mime = 'application/json';
                require.async(['codemirror/mode/javascript/javascript'], function () {
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mime }));
                });
            }
            else if (mode == "python") {
                var mime = "ironpython";
                CodeMirror.defineMIME(mime, {
                    name: "python",
                    extra_keywords: "Server Request Response Session controller ViewBag dh db jh dc linq args data ph ar dynamic".split(" ")
                });
                require.async(['codemirror/mode/python/python', 'codemirror/addon/hint/python-hint'], function () {
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mime }));
                });
            }
            else if (mode == "jsontsql") {
                var mime = "jsontsql";
                require.async(['codemirror/addon/mode/multiplex', 'codemirror/mode/javascript/javascript', 'codemirror/mode/sql/sql'], function () {
                    CodeMirror.defineMode(mime, function (config) {
                        return CodeMirror.multiplexingMode(
                            CodeMirror.getMode(config, "application/json"),
                            {
                                open: '"', close: '"',
                                mode: CodeMirror.getMode(config, "text/x-mssql")
                            }
                            // .. more multiplexed styles can follow here
                        );
                    });
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mime }));
                });
            }
            else {
                require.async(['codemirror/mode/' + mode + '/' + mode], function () {
                    Dengdu.codehighlighter.highlighters[name] = CodeMirror.fromTextArea(document.getElementById(name), $.extend(options, { mode: mode, autoCloseTags: true, matchTags: { bothTags: true }, foldGutter: true, gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] }));
                });
            }
        });
        Dengdu.onload.add(function () {
            function bihint(hint1, hint2) {
                var myhint = function (editor, options) {
                    var rslt1 = hint1(editor, options);
                    var rslt2 = hint2(editor, options);
                    var list = []; var from = 0; var to = 0;
                    if (rslt1 && rslt1.list) {
                        list = list.concat(rslt1.list);
                        from = rslt1.from;
                        to = rslt1.to;
                    }
                    if (rslt2 && rslt2.list) {
                        list = list.concat(rslt2.list);
                        from = rslt2.from;
                        to = rslt2.to;
                    }
                    list = JSLINQ(list).Distinct(function (item) { return item; }).ToArray();
                    return { list: list, from: from, to: to };
                }
                return myhint;
            }
            for (var i in Dengdu.codehighlighter.highlighters) {
                var editor = Dengdu.codehighlighter.highlighters[i];
                editor.on('keypress', function (editor, obj) {
                    CodeMirror.showHint(editor, bihint(CodeMirror.hint.anyword, CodeMirror.hint.auto), { completeSingle: false });
                });
            }

        }, 2000);
    });
});