/// <reference path="../../seajs/sea.js" />
/// <reference path="../../seajs/seajs-css.js" />
seajs.config({
    base: "/scripts",
    alias: {
        "bootstrap": "bootstrap/js/bootstrap.min.js",
        "miniui": "miniui/miniui.js",
        "codemirror": "codemirror/lib/codemirror.js",
        "kindeditor": "kindeditor/kindeditor.js",
        "knockout": "knockout/knockout.min.js",
        "core.miniui": "areas/core/core.miniui.js",
        "core.kindeditor": "areas/core/core.kindeditor.js",
        "core.highcharts": "areas/core/core.highcharts.js",
        "core.codemirror": "areas/core/core.codemirror.js",
        "core.monaco": "areas/core/core.monaco.js",
        "dengdu.echarts": "dengdu/dengdu.echarts.js"
    }
});
seajs.use('areas/core/main');