define(function (require, exports, module) {
    require.async(["https://cdn.bootcss.com/monaco-editor/0.12.0/min/vs/loader.js"], function () {
        monacoRequire = window.require;
        monacoRequire.config({ paths: { 'vs': 'https://cdn.bootcss.com/monaco-editor/0.12.0/min/vs' } });
        window.MonacoEnvironment = {
            getWorkerUrl: function (workerId, label) {
                return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
    self.MonacoEnvironment = {
        baseUrl: 'https://cdn.bootcss.com/monaco-editor/0.12.0/min'
    };
    importScripts('https://cdn.bootcss.com/monaco-editor/0.12.0/min/vs/base/worker/workerMain.js');`
                )}`;
            }
        };
        Dengdu.monacoEditor = {};
        var highlighters = Dengdu.monacoEditor.highlighters = {};
        Dengdu.monacoEditor.getData = function () {
            var data = {};
            for (i in highlighters) {
                data[i] = highlighters[i].getValue();
            }
            return data;
        }
        Dengdu.monacoEditor.setData = function (data) {
            for (i in highlighters) {
                var editor = highlighters[i];
                editor.setValue(data[i] ? data[i] : "");
                editor.fit();
            }
        }
        monacoRequire(["vs/editor/editor.main"], function () {
            $('.dd-monacoeditor').each(function () {
                var element = this;
                var self = $(element);
                var name = self.attr('name');
                var mode = self.attr('mode');
                var editor = Dengdu.monacoEditor.highlighters[name] = monaco.editor.create(element, {
                    language: mode, automaticLayout: true
                });
                editor.fit = function () {
                    var height = self.height();
                    if (height < 100 && height > 835) return;
                    self.height(0);
                    editor.layout();
                    var height = Math.min(800, Math.max(editor.getScrollHeight(), 100));
                    self.height(height+35);
                    editor.layout();
                };
                editor.onKeyUp(function (e) {
                    if (e.keyCode == monaco.KeyCode.Enter) {
                        editor.fit();
                    }                    
                });
            });
        });
    });
});