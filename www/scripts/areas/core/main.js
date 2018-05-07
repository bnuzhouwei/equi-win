/// <reference path="../../seajs/sea.js" />
/// <reference path="../../jquery/jquery.js" />
//define(function (require, exports, module) {
//    if ($('.dd-kindeditor').length > 0) {
//        require('core.kindeditor');
//    }
//    if ($('.dd-codemirror').length > 0) {
//        require('core.codemirror');
//    }
//    if ($('.dd-chart').length > 0) {
//        require('dengdu.echarts');
//    }
//    if ($('.dd-monaco').length > 0) {
//        require('core.monaco');
//    }
//});
define(function (require, exports, module) {
    if ($('.dd-kindeditor').length > 0) {
        require.async('core.kindeditor', function (k) { });
    }
    if ($('.dd-codemirror').length > 0) {
        require.async('core.codemirror', function (c) { });
    }
    if ($('.dd-chart').length > 0) {
        require.async('dengdu.echarts', function (e) { });
    }
    if ($('.dd-monacoeditor').length > 0) {
        require.async('core.monaco', function (m) { });
    }
});