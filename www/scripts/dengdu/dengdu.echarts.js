/// <reference path="../jquery/jquery.js" />
/// <reference path="../bootstrap/js/bootstrap.min.js" />
/// <reference path="dengdu.js" />
/// <reference path="dengdu.bootstrap.js" />
/// <reference path="../jquery/jquery.linq.min.js" />
/// <reference path="../seajs/sea.js" />
/// <reference path="../echarts/echarts.min.js" />
define(function (require, exports, module) {    
    function Matrix(table) {
        var self = this;
        var data = (function () {
            if (table instanceof Array) {
                return table;
            } else {
                self.title = $("table").children("caption").text();
                return jslinq($(table).find("tr")).select(function (tr) { return jslinq($(tr).find("td,th")).select(function (td) { return $(td).text(); }).toArray() }).toArray();
            }
        })();
        self.data = data;
        self.item = function (row, column) {
            return data[row][column];
        }
        self.row = function (index) {
            return data[index];
        }
        self.column = function (index) {
            return jslinq(data).select(function (row) { return row[index] }).toArray();
        }
        self.rows = self.data;
        self.columns = jslinq.range(0, data[0].length).select(function (index) { return self.column(index); }).toArray();
        self.skip = function (i, j) {
            return new Matrix(jslinq(data).skip(i).select(function (row) { return jslinq(row).skip(j).toArray(); }).toArray());
        }
    }
    var ddChart = {};
    ddChart.get = function (name) {
        for (var att in ddChart) {
            if (ddChart[att].name && (ddChart[att].name == name)) {
                return ddChart[att];
            }
        }
    }
    ddChart.add = function (name, createOptions) {
        ddChart[name] = { name: name, createOptions: createOptions };
    }
    ddChart.add("bar", function (matrix) {
        return {
            title: { text: matrix.title },
            tooltip: { trigger: 'axis' },
            legend: {
                data: jslinq(matrix.row(0)).skip(1).toArray()
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: jslinq(matrix.column(0)).skip(1).toArray()
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: (function () {
                return jslinq.range(0, matrix.row(0).length).select(function (index) {
                    return matrix.column(index);
                }).skip(1).select(function (item) {
                    return { name: item[0], type: "bar", data: jslinq(item).skip(1).select(function (item) { return JSON.decode(item) }).toArray() }
                }).toArray();
            })()
        };
    });
    ddChart.add("stackedbar", function (matrix) {
        var option = ddChart["bar"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].stack = "Total";
        }
        return option;
    });
    ddChart.add("line", function (matrix) {
        var option = ddChart["bar"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].type = "line";
        }
        return option;
    });
    ddChart.add("stackedline", function (matrix) {
        var option = ddChart["line"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].stack = "Total";
        }
        return option;
    });
    ddChart.add("area", function (matrix) {
        var option = ddChart["line"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].itemStyle = { normal: { areaStyle: { type: 'default' } } }
        }
        return option;
    });
    ddChart.add("stackedarea", function (matrix) {
        var option = ddChart["area"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].stack = "Total";
        }
        return option;
    });
    ddChart.add("column", function (matrix) {
        var option = ddChart["bar"].createOptions(matrix);
        var tmp = option.xAxis;
        option.xAxis = option.yAxis;
        option.yAxis = tmp;
        return option;
    });
    ddChart.add("stackedcolumn", function (matrix) {
        var option = ddChart["column"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].stack = "Total";
        }
        return option;
    });
    ddChart.add("scatter", function (matrix) {
        return {
            title: { text: matrix.title },
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
            },
            legend: {
                data: matrix.row(0)
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataZoom: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            xAxis: [
                {
                    type: 'value',
                    scale: true
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true
                }
            ],
            series: (function () {
                return jslinq.range(0, matrix.row(0).length).select(function (index) { return { name: matrix.column(index)[0], type: 'scatter', data: jslinq(matrix.column(index)).skip(1).select(function (item) { return JSON.decode(item); }).toArray() } }).toArray();
            })()
        };
    });
    ddChart.add("bubble", function (matrix) {
        var option = ddChart["scatter"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].symbol = "circle";
            option.series[i].symbolSize = function (value) {
                return Math.round(value[2]);
            }
        }
        return option;
    });
    ddChart.add("pie", function (matrix) {
        return {
            title: {
                text: matrix.title,
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: jslinq(matrix.column(0)).skip(1).toArray()
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            series: [
                {
                    name: matrix.item(0, 0),
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: (function () {
                        return jslinq(matrix.data).skip(1).select(function (item) { return { name: item[0], value: JSON.decode(item[1]) } }).toArray();
                    })()

                }
            ]
        };

    });
    ddChart.add("doughnut", function (matrix) {
        var option = ddChart["pie"].createOptions(matrix);
        for (var i in option.series) {
            option.series[i].radius = ['50%', '70%'];
            option.series[i].itemStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                }
            };
        }
        return option;
    });
    ddChart.add("radar", function (matrix) {
        return {
            title: {
                text: matrix.title
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y: 'bottom',
                data: jslinq(matrix.column(0)).skip(2).toArray()
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            polar: [
               {
                   indicator: jslinq(matrix.columns).skip(1).select(function (item) { return { text: item[0], max: JSON.decode(item[1]) } }).toArray()
               }
            ],
            calculable: true,
            series: [
                {
                    name: matrix.item(0, 0),
                    type: 'radar',
                    data: jslinq(matrix.rows).skip(2).select(function (item) { return { name: item[0], value: jslinq(item).skip(1).toArray() }; }).toArray()
                }
            ]
        };
    });
    ddChart.add("k", function (matrix) {
        return {
            title: {
                text: matrix.title
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var res = params[0].seriesName + ' ' + params[0].name;
                    res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[0].value[3];
                    res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[0].value[2];
                    return res;
                }
            },
            legend: {
                data: matrix.item(0, 0)
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataZoom: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            dataZoom: {
                show: true,
                realtime: true,
                start: 50,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisTick: { onGap: false },
                    splitLine: { show: false },
                    data: jslinq(matrix.column(0)).skip(1).toArray()
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    boundaryGap: [0.01, 0.01]
                }
            ],
            series: [
                {
                    name: matrix.item(0, 0),
                    type: 'k',
                    data: matrix.skip(1, 1).data
                }
            ]
        };
    });
    ddChart.add("map_china", function (matrix) {
        return {
            title: {
                text: matrix.title,
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: jslinq(matrix.row(0)).skip(1).toArray()
            },
            dataRange: {
                min: 0,
                max: $.Enumerable.From(matrix.skip(1, 1).rows).Select(function (row) {
                    return $.Enumerable.From(row).Select(function (item) { return JSON.decode(item) }).Sum();
                }).Max(),
                x: 'left',
                y: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: (function () {
                return jslinq.range(0, matrix.row(0).length).skip(1).select(function (index) {
                    var header = matrix.row(0);
                    return {
                        name: header[index],
                        type: 'map',
                        map: 'china',
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        data: jslinq(matrix.rows).skip(1).select(function (row) {
                            return { name: row[0], value: JSON.decode(row[index]) }
                        }).toArray()
                    }
                }).toArray();
            })()
        };
    });
    ddChart.add("map_world", function (matrix) {
        return {
            title: {
                text: matrix.title,
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: jslinq(matrix.row(0)).skip(1).toArray()
            },
            dataRange: {
                min: 0,
                max: $.Enumerable.From(matrix.skip(1, 1).rows).Select(function (row) {
                    return $.Enumerable.From(row).Select(function (item) { return JSON.decode(item) }).Sum();
                }).Max(),
                x: 'left',
                y: 'bottom',
                text: ['高', '低'],
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: (function () {
                return jslinq.range(0, matrix.row(0).length).skip(1).select(function (index) {
                    var header = matrix.row(0);
                    return {
                        name: header[index],
                        type: 'map',
                        map: 'world',
                        roam: false,
                        itemStyle: {
                            emphasis: { label: { show: true } }
                        },
                        data: jslinq(matrix.rows).skip(1).select(function (row) {
                            return { name: row[0], value: JSON.decode(row[index]) }
                        }).toArray()
                    }
                }).toArray();
            })()
        };
    });
    ddChart.add("wordCloud", function (matrix) {
        function createRandomItemStyle() {
            return {
                normal: {
                    color: 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')'
                }
            };
        }
        return {
            title: {
                text: matrix.title,
            },
            tooltip: {
                show: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [{
                name: matrix.item(0, 0),
                type: 'wordCloud',
                textRotation: [0, 45, 90, -45],
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 16
                },
                data: (function () {
                    return jslinq(matrix.data).skip(1).select(function (item) { return { name: item[0], value: JSON.decode(item[1]), itemStyle: createRandomItemStyle() } }).toArray();
                })()
            }]
        }
    });
    ddChart.init = function () {
        require("echarts/echarts.min");
        $(".dd-chart[data-toggle='chart']").each(function () {
            var dataElement = $(this).find(".dd-chart-data")[0];
            var matrix = new Matrix(dataElement);
            var graphElement = $(this).find(".dd-chart-graph")[0];            
            var option = eval("(" + ($(this).attr("data-chart-option") || "{}") + ")");
            if (option.height) {
                $(graphElement).height(option.height);
                delete option.height;
            }
            var charttype = $(this).attr("data-chart-type");
            var ddchart = ddChart.get(charttype);
            option = $.extend(true, ddchart.createOptions(matrix), option);
            var chart = echarts.init(graphElement);
            if (charttype == "map_china") {
                require.async('echarts/map/china', function () { chart.setOption(option); });
            }
            else if (charttype == "map_world") {
                require.async('echarts/map/world', function () { chart.setOption(option); });
            }
            else {
                chart.setOption(option);
            }
        });
    }
    ddChart.init();
});