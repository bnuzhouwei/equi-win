/* Copyright (c) 2010-2013 Marcus Westin */
"use strict"; (function (e, t) { typeof define == "function" && define.amd ? define([], t) : typeof exports == "object" ? module.exports = t() : e.store = t() })(this, function () { function o() { try { return r in t && t[r] } catch (e) { return !1 } } var e = {}, t = typeof window != "undefined" ? window : global, n = t.document, r = "localStorage", i = "script", s; e.disabled = !1, e.version = "1.3.20", e.set = function (e, t) { }, e.get = function (e, t) { }, e.has = function (t) { return e.get(t) !== undefined }, e.remove = function (e) { }, e.clear = function () { }, e.transact = function (t, n, r) { r == null && (r = n, n = null), n == null && (n = {}); var i = e.get(t, n); r(i), e.set(t, i) }, e.getAll = function () { }, e.forEach = function () { }, e.serialize = function (e) { return JSON.stringify(e) }, e.deserialize = function (e) { if (typeof e != "string") return undefined; try { return JSON.parse(e) } catch (t) { return e || undefined } }; if (o()) s = t[r], e.set = function (t, n) { return n === undefined ? e.remove(t) : (s.setItem(t, e.serialize(n)), n) }, e.get = function (t, n) { var r = e.deserialize(s.getItem(t)); return r === undefined ? n : r }, e.remove = function (e) { s.removeItem(e) }, e.clear = function () { s.clear() }, e.getAll = function () { var t = {}; return e.forEach(function (e, n) { t[e] = n }), t }, e.forEach = function (t) { for (var n = 0; n < s.length; n++) { var r = s.key(n); t(r, e.get(r)) } }; else if (n && n.documentElement.addBehavior) { var u, a; try { a = new ActiveXObject("htmlfile"), a.open(), a.write("<" + i + ">document.w=window</" + i + '><iframe src="/favicon.ico"></iframe>'), a.close(), u = a.w.frames[0].document, s = u.createElement("div") } catch (f) { s = n.createElement("div"), u = n.body } var l = function (t) { return function () { var n = Array.prototype.slice.call(arguments, 0); n.unshift(s), u.appendChild(s), s.addBehavior("#default#userData"), s.load(r); var i = t.apply(e, n); return u.removeChild(s), i } }, c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"), h = function (e) { return e.replace(/^d/, "___$&").replace(c, "___") }; e.set = l(function (t, n, i) { return n = h(n), i === undefined ? e.remove(n) : (t.setAttribute(n, e.serialize(i)), t.save(r), i) }), e.get = l(function (t, n, r) { n = h(n); var i = e.deserialize(t.getAttribute(n)); return i === undefined ? r : i }), e.remove = l(function (e, t) { t = h(t), e.removeAttribute(t), e.save(r) }), e.clear = l(function (e) { var t = e.XMLDocument.documentElement.attributes; e.load(r); for (var n = t.length - 1; n >= 0; n--) e.removeAttribute(t[n].name); e.save(r) }), e.getAll = function (t) { var n = {}; return e.forEach(function (e, t) { n[e] = t }), n }, e.forEach = l(function (t, n) { var r = t.XMLDocument.documentElement.attributes; for (var i = 0, s; s = r[i]; ++i) n(s.name, e.deserialize(t.getAttribute(s.name))) }) } try { var p = "__storejs__"; e.set(p, p), e.get(p) != p && (e.disabled = !0), e.remove(p) } catch (f) { e.disabled = !0 } return e.enabled = !e.disabled, e });

//i18n
(function () {
    Dengdu.I18N.config("en-US", {
        vtypeRegex: "Invalid format",
        vtypeJson: "Must be JSON",
        edit: "Edit",
        missingRecord: "Please select a record",
        missingUrl: "Missing URL",
        saveUnchange: "No data to be saved",
        search: "Search",
        import: "Import",
        select: "Select",
        inputParameter: "Input Parameter",
        submitUnsaved: "Please save the data before submit it",
        setting: "Setting",
        properties: "Properties",
        buttons: "Buttons",
        form: "Form",
        triggers: "Triggers",
        events: "Events",
        query: "Query",
        gridmove: "Gridmove",
        unsupported: "Unsupported",
        open: "Open"
    });
    Dengdu.I18N.config("zh-Hans", {
        vtypeRegex: "格式不合法",
        vtypeJson: "必须为JSON",
        edit: "编辑",
        missingRecord: "请选择一条记录",
        missingUrl: "缺少URL",
        saveUnchange: "没有需要保存的数据",
        search: "查询",
        import: "导入",
        select: "选择",
        inputParameter: "输入参数",
        submitUnsaved: "请保存后提交",
        setting: "设置",
        properties: "属性",
        buttons: "按钮",
        form: "表单",
        triggers: "触发器",
        events: "事件",
        query: "查询",
        gridmove: "网格移动",
        unsupported: "不被支持",
        open: "打开"
    });
})();

//globals
(function () {
    mini_debugger = false;    
    window.rsaEncrypt = function (plain) {
        var pubkey = mini.Cookie.get("ASP.NET_PublicKey");
        if (pubkey && window.JSEncrypt && window.CryptoJS) {
            var keyStr = CryptoJS.SHA256(Math.uuid()).toString();
            var key = CryptoJS.enc.Hex.parse(keyStr);
            var iv = CryptoJS.enc.Hex.parse(keyStr.substring(0, 32));
            var plainArray = CryptoJS.enc.Utf8.parse(plain);
            var encrypted = CryptoJS.AES.encrypt(plainArray, key, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
            var encryptedPlain = encrypted.toString()
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(pubkey);
            var encryptKey = encrypt.encrypt(keyStr);
            return encryptKey + "," + encryptedPlain;
        }
        return plain;
    }
    window.filterFields = Dengdu.coalesce($.url().param('ff'), '');
    window.filterValues = Dengdu.coalesce($.url().param('fv'), '');    
    window.searchFields = Dengdu.coalesce($.url().param('sf'), '');
    window.searchValues = function () {
        var sv = Dengdu.coalesce($.url().param('sv'), '');
        if (sv) {
            var atts = sv.split(',');
            for (var i = 0; i < atts.length; i++) {
                atts[i] = atts[i] + '%';
            }
            return atts.join(",");
        }
        return "";
    }();
    window._fv2obj = function (field, value) {
        var obj = {};
        if (field && value) {
            var atts = field.split(',');
            var values = value.split(',');
            for (var i = 0; i < atts.length; i++) {
                obj[atts[i]] = values[i];
            }
        }
        return obj;
    };
    window._obj2fv = function (obj) {
        var atts = []; var values = [];
        for (var att in obj) {
            atts.push(att);
            values.push(obj[att]);
        }
        return { field: atts.join(","), value: values.join(",") };
    };
    window.filterObject = window._fv2obj(window.filterFields, window.filterValues);
    Dengdu.uformPath = "/core/uform/";
    //tab with cookie
    var tabs = $(".mini-tabs"); var tabIndex = 0;
    var storeName = "miniuiTabActiveIndex";
    tabs.each(function () {
        $(this).attr("onactivechanged", "onMiniTabsActiveChanged");
        var tabId = location.pathname + "_tabs_" + tabIndex;
        if (!$(this).attr("id")) {
            $(this).attr("id", tabId);
        }
        var storeObj = store.get(storeName) || {};
        var activeIndex = $(this).attr("activeIndex") || storeObj[$.md5(tabId)] || 0;
        $(this).attr("activeIndex", activeIndex == -1 ? 0 : activeIndex);
        tabIndex++;
    });
    window.onMiniTabsActiveChanged = function (e) {
        var id = e.sender.id;
        var storeObj = store.get(storeName) || {};
        storeObj[$.md5(id)] = e.sender.activeIndex;
        store.set(storeName, storeObj);
    };
    JSON.encode = mini.encode;
    JSON.decode = mini.decode;
    var skin = mini.Cookie.get("miniuiSkin") || 'bootstrap';
    if (skin) {
        $('#skin' + skin).attr('iconcls', 'fa-check');
        seajs.use('/scripts/miniui/themes/' + skin + '/skin.css');
    }
    var mode = (mini.Cookie.get("miniuiMode") || 'Medium').toLowerCase();
    if (mode) {
        $('#mode' + mode).attr('iconcls', 'fa-check');
        if (mode != "Default") seajs.use('/scripts/miniui/themes/default/' + mode + '-mode.css');
    }
})();

//mainframe
(function () {
    $(function () {
        var tree = mini.get("dd-mainframe-tree");
        var tab = Dengdu.NavTab = {};
        var tabs = mini.get('#dd-mainframe-tabs');
        tab.refreshTab = function refreshTab() {
            var frame = tabs.getTabIFrameEl(currentTab);
            frame.contentDocument.location.href = frame.contentDocument.location.href;
        };
        tab.onBeforeOpen = function onBeforeOpen(e) {
            window.currentTab = tabs.getTabByEvent(e.htmlEvent);
            if (!currentTab) {
                e.cancel = true;
            }
        };
        tab.closeTab = function closeTab() {
            tabs.removeTab(currentTab);
        };
        tab.closeAllBut = function closeAllBut() {
            tabs.removeAll(currentTab);
        };
        tab.closeAll = function closeAll() {
            tabs.removeAll();
        };
        tab.tabHelp = function tabHelp() {
            Dengdu.createFormSubmit("/core/home/help", { url: currentTab.url }, 'get');
        };
        tab.tabInfo = function tabInfo() {
            mini.alert(" Title: " + currentTab.title + "<br/> Url: " + currentTab.url);
        };
        tab.windowTab = function windowTab() {
            Dengdu.createFormSubmit(currentTab.url, {}, 'get');
        };
        tab.printTab = function printTab() {
            var frame = tabs.getTabIFrameEl(currentTab);
            frame.contentWindow.print();
        };
        tab.showTab = function (node) {
            var id = "tab$" + node.id; var tab = tabs.getTab(id); tab = {}; tab.name = id;
            tab.title = node.text; tab.showCloseButton = true; tab.iconCls = node.iconCls;
            tab.url = node.url; tabs.addTab(tab); tabs.activeTab(tab);
        }
        var mainframe = Dengdu.MainFrame = {};
        mainframe.onNodeSelect = function (e) {
            var node = e.node; var isLeaf = e.isLeaf;
            if (isLeaf) {
                var target = node.target;
                if (target != "_blank")
                    tab.showTab(node);
                else {
                    Dengdu.createFormSubmit(node.url, {}, 'get');
                }
            }
        }
        mainframe.exit = function exit() {
            if (confirm($.t("confirmMessage"))) {
                window.open('', '_self', '');
                window.close();
            }
        };
        mainframe.logout = function logout() {
            if (confirm($.t("confirmMessage"))) {
                Dengdu.ajax("/core/login/DoLogout", {});
            }
        };
        mainframe.password = function password() {
            Dengdu.createFormSubmit("/core/login/changepassword", {}, 'get');
        };
        mainframe.changeSkin = function changeSkin() {
            var skin = this.text;
            mini.Cookie.set('miniuiSkin', skin, 14);
            window.location.reload();
        };
        mainframe.changeMode = function changeSize() {
            var mode = this.text;
            mini.Cookie.set('miniuiMode', mode, 14);
            window.location.reload();
        };
    });
})();

//vtype extension
(function () {
    mini.VTypes["regexErrorText"] = $.t("vtypeRegex");
    mini.VTypes["regex"] = function (v, p) {
        if (v) {
            var re = new RegExp(p.join(","));
            if (re.test(v)) return true; return false;
        }
        return true;
    }
    mini.VTypes["jsonErrorText"] = $.t("vtypeJson");
    mini.VTypes["json"] = function (v) {
        if (v) {
            try {
                mini.decode(v); return true;
            }
            catch (e) {
                return false;
            }
        }
        return true;
    };
    JSVType.validate = function (vtype, text) {
        var items = vtype.split(';');
        for (var i = 0; i < items.length; i++) {
            if (items[i]) {
                var item = items[i].split(':');
                var bool = mini.VTypes[item[0]](text, item[1] ? item[1].split(',') : item[1]);
                if (!bool) return false;
            }
        }
        return true;
    };
})();

//init miniui class
(function () {
    $("[data-options]").each(function () {
        var obj = $(this); var options = obj.attr('data-options');
        if (options) {
            try {
                var opts = JSON.decode(options);
                for (var opt in opts) obj.attr(opt, opts[opt]);
            } catch (e) {
                alert(obj.attr('data-options'));
            }
        }
    });
    $("div.mini-datagrid div[property=columns],div.mini-treegrid div[property=columns]").find("input").each(function () {
        $(this).attr("property", $(this).attr("property") || "editor");
    });

    $("div.mini-datagrid div[property=columns],div.mini-treegrid div[property=columns]").children("div").attr('dateFormat', 'yyyy-MM-dd HH:mm:ss');

    $("input[property=editor]").each(function () {
        if ($(this).attr('width'))
            $(this).parent("div").attr('width', $(this).attr('width'));
    });

    $("input[property=editor].mini-datepicker").parent("div").attr('dateFormat', 'yyyy-MM-dd');
    $("input[property=editor][showTime=true].mini-datepicker").parent("div").attr('dateFormat', 'yyyy-MM-dd HH:mm:ss');

    $(".dd-completion input").each(function () {
        $(this).attr('dwidth', $(this).attr('width'));
    });

    $("div.dd-form input").each(function () {
        addDft($(this), 'width', '99%');
        function addDft(obj, pro, dft) {
            var nw = Dengdu.coalesce(obj.attr("dwidth"), dft);
            obj.attr(pro, nw);
        }
    });

    $("div.dd-survey input").each(function () {
        addDft($(this), 'width', '99%');
        function addDft(obj, pro, dft) {
            var nw = Dengdu.coalesce(obj.attr("width"), dft);
            obj.attr(pro, nw);
        }
    });
    $("div.dd-form input.mini-textarea").attr('width', '99%');

    $("input[name='ddztm']").each(function () {
        var input = $(this);
        var rel = Dengdu.coalesce(input.closest('div.dd-datagrid-panel').attr('rel'), input.closest('div.dd-form').attr('rel'), input.closest('div.dd-treegrid-panel').attr('rel'));
        input.attr('class', 'mini-combobox').attr('allowInput', false).attr('url', '/core/uform/fsmzt/' + rel);
    });

    $("a.mini-button").each(function () {
        $(this).attr("id", Dengdu.coalesce($(this).attr("id"), Math.uuid()));
    });

    $("div.dd-form .mini-checkbox, div.dd-form .mini-textbox, div.dd-form .mini-autocomplete").each(function () {
        $(this).attr("onvaluechanged", Dengdu.coalesce($(this).attr("onvaluechanged"), "onDdControlChanged"));
    });

    $("div.dd-form .mini-combobox").each(function () {
        $(this).attr("onvaluechanged", Dengdu.coalesce($(this).attr("onvaluechanged"), "onDdComboboxChanged"));
        $(this).attr("onbeforeshowpopup", Dengdu.coalesce($(this).attr("onbeforeshowpopup"), "onDdComboboxBeforeShowPopup"));
    });

    $("input[property=editor].mini-combobox").each(function () {
        var editor = $(this); var column = editor.parent();
        if (editor.attr('pc')) {
            column.removeAttr('type').removeAttr('data-options').removeAttr('url');
        }
    });

})();

mini.parse();


//Dengdu.Form Dengdu.gridAjax
$(function () {
    Dengdu.onload.add(function () {
        Dengdu.Form = function (id) {
            var self = this;
            id = id[0] == "#" ? id : "#" + id;
            var miniForm = new mini.Form(id);
            self.getData = function (formatter, deep) {
                var rslt = miniForm.getData();
                if (Dengdu.htmleditor) $.extend(rslt, Dengdu.htmleditor.getData());
                if (Dengdu.codehighlighter) $.extend(rslt, Dengdu.codehighlighter.getData());
                if (Dengdu.monacoEditor) $.extend(rslt, Dengdu.monacoEditor.getData());
                return rslt;
            };
            self.setData = function (data, all, deep) {
                miniForm.setData(data, all, deep);
                if (Dengdu.htmleditor) Dengdu.htmleditor.setData(data);
                if (Dengdu.codehighlighter) Dengdu.codehighlighter.setData(data);
                if (Dengdu.monacoEditor) Dengdu.monacoEditor.setData(data);
                var fields = self.getFields();
                for (var i = 0; i < fields.length; i++) {
                    var editor = fields[i];
                    if (editor.pc) {
                        var parentControls = JSLINQ(editor.pc.split(',')).Select(function (item) { return data[item]; }).ToArray();
                        editor.setUrl(editor.urlformat.format(parentControls));
                    };
                }
                self.setVisibility();
            };
            self.setVisibility = function () {
                var data = self.getData();
                var elements = $(id).find(".dd-element").each(function (index, element) {
                    var dd_element = $(element);
                    var data_dd_visible = dd_element.attr("data-dd-visible");
                    if (data_dd_visible) {
                        var vc = JSON.decode(data_dd_visible);
                        dd_element.hide();
                        var show = 1;
                        for (var attname in vc) {
                            var attvalue = vc[attname];
                            if (attvalue && !(new RegExp(attvalue).test(data[attname]) || data[attname] && attvalue.indexOf(data[attname]) >= 0)) { show = 0; break; }
                        }
                        if (show) dd_element.show();
                    }
                });

            }
            self.reset = function () {
                return miniForm.reset();
            };
            self.validate = function () {
                return miniForm.validate();
            };
            self.isValid = function () {
                return miniForm.isValid();
            };
            self.setIsValid = function (bool) {
                return miniForm.setIsValid(bool);
            };
            self.getErrorTexts = function () {
                return miniForm.getErrorTexts();
            };
            self.getErrors = function () {
                return miniForm.getErrors();
            };
            self.loading = function () {
                return miniForm.loading();
            }
            self.unmask = function () {
                return miniForm.unmask();
            };
            self.setChanged = function (bool) {
                return miniForm.setChanged(bool);
            };
            self.isChanged = function () {
                return miniForm.isChanged();
            }
            self.setEnabled = function (bool) {
                return miniForm.setEnabled(bool);
            };
            self.getFields = function () {
                return miniForm.getFields();
            };
            self.reload = function () {
                window.location = window.location;
            }
        };
    }, 1000);

    Dengdu.ajaxSuccess = function (text) {
        var msg = JSON.decode(text);
        if (msg.message) {
            mini.showTips({
                content: msg.message, state: msg.success ? "success" : "danger",
                x: "center", y: "center", timeout: 3000
            });
        }
        if (msg.script) eval(msg.script);
        if (msg.reload) window.location.reload();
        if (msg.href) window.open(msg.href, msg.target);
        return msg.success;
    };

    Dengdu.gridAjax = function (grid, url, data, async, button) {
        if (button) {
            if (!button.enabled) return;
            button.disable();
        }
        if (typeof (async) == "undefined") async = true;
        grid.loading();
        $.ajax({
            async: async, url: url, data: data, type: "post",
            success: function (text) {
                var msg = mini.decode(text);
                if (msg.script) eval(msg.script);
                if (msg.message) {
                    mini.showTips({
                        content: msg.message, state: msg.success?"success":"danger",
                        x: "center", y: "center", timeout: 3000
                    });
                }
                if (msg.reload && msg.success) grid.reload();
                if (msg.href) Dengdu.createFormSubmit(msg.href, {}, 'get', msg.target);
                grid.unmask();
                if (button) button.enable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Dengdu.nwalert(jqXHR.responseText);
                grid.unmask();
                if (button) button.enable();
            }
        });
    };
});

$(function () {
    // event handlers
    (function () {

        window.onDatagridMenuItemClick = function (e) {
            var panel = $('#' + this.gridid).closest(".dd-datagrid-panel");
            if (panel.length == 0) panel = $('#' + this.gridid).closest(".dd-treegrid-panel");
            var rel = panel.attr('rel'); var pk = panel.attr('pk'); var relkind = panel.attr('relkind'); var relstore = panel.attr('relstore');
            var gridid = this.gridid;
            var grid = mini.get(gridid);
            var state = mini.get(gridid + "_state").getValue();
            var sfc = mini.get(gridid + "_sf");
            var svc = mini.get(gridid + "_sv");
            var searchFields = sfc.getValue();
            var allFields = JSON.decode(sfc.data);
            var searchValues = svc.getValue();
            switch (this.command) {
                case 'view': DatagridView(); break;
                case 'add': DatagridAdd(); break;
                case 'addrow': DatagridCreateRow(); break;
                case 'edit': DatagridEdit('open'); break;
                case 'edit2': DatagridEdit('tab'); break;
                case 'remove': DatagridRemoveRow(); break;
                case 'getselecteds': DatagridGetSelecteds(); break;
                case 'getchanges': DatagridGetChanges(); break;
                case 'save': DatagridSaveData(); break;
                case 'search': DatagridSearch(this); break;
                case 'excel': DatagridExcel('xls', false); break;
                case 'excel2': DatagridExcel('xls', true); break;
                case 'dbf': DatagridExcel('dbf', true); break;
                case 'width': DatagridWidth(); break;
                case 'setting': DatagridSetting(); break;
                case 'import': DatagridImport(); break;
                case 'subversion': DatagridSubversion(); break;
                default: mini.alert('command needed');
            }
            function DatagridDetail(action, row) {
                if (row) {
                    mini.open({
                        showMaxButton: true, height: 768, width: 1024, url: grid.detailurl, title: $.t("edit"),
                        onload: function () {
                            var iframe = this.getIFrameEl();
                            var data = { action: action, row: row };
                            iframe.contentWindow.SetData(data);
                        },
                        ondestroy: function (action) {
                            if (action == "ok") grid.reload();
                        }
                    });
                } else alert($.t("missingRecord"));
            }
            function DatagridView() {
                var row = grid.getSelected();
                DatagridDetail('view', row);
            }
            function DatagridEdit(args) {
                var row = grid.getSelected();
                if (row) {
                    if (args == 'open') {
                        DatagridDetail('edit', row);
                    } else if (args == 'tab') {
                        var newhref = '/core/uform/modify/{0}?ff={1}&fv={2}'.format(rel, pk, row[pk]);
                        Dengdu.createFormSubmit(newhref, {}, 'get');
                    }
                } else alert($.t("missingRecord"));
            }
            function DatagridAdd() {
                var message = Dengdu.ajaxGetObj(grid.newrowurl, { filterFields: filterFields, filterValues: filterValues, viewstate: state });
                if (message.success) {
                    var row = message.data;
                    DatagridDetail('add', row);
                } else {
                    alert(message.message);
                }
            }
            function DatagridGetChanges() {
                var data = grid.getChanges(); var json = mini.encode({ total: data.length, data: data }); Dengdu.createFormSubmit('/core/uform/prettyjson', { json: json });
            }
            function DatagridGetSelecteds() {
                var data = grid.getSelecteds(); var json = mini.encode({ total: data.length, data: data }); Dengdu.createFormSubmit('/core/uform/prettyjson', { json: json });
            }
            function DatagridSaveData() {
                grid.validate();
                if (grid.isValid() == false) {
                    var error = grid.getCellErrors()[0];
                    grid.beginEditCell(error.record, error.column);
                    alert($.t("vtypeRegex"));
                    return;
                }
                var data = grid.getChanges();
                var state = mini.get(gridid + "_state").getValue();
                if (data.length > 0) {
                    var json = mini.encode(data);
                    json = window.rsaEncrypt(json);
                    Dengdu.gridAjax(grid, grid.saveurl, { data: json, viewstate: state, ff: filterFields, fv: filterValues });
                } else {
                    mini.alert($.t("saveUnchange"));
                }
            }
            function DatagridRemoveRow() {
                var rows = grid.getSelecteds();
                if (rows.length > 0) grid.removeRows(rows, true);
            }
            function DatagridCreateRow() {
                var message = Dengdu.ajaxGetObj(grid.newrowurl, { filterFields: filterFields, filterValues: filterValues, viewstate: state });
                if (message.success) {
                    var row = message.data;
                    grid.addRow(row, 0);
                } else {
                    alert(message.message);
                }
            }
            function DatagridSearch(sender) {
                var postobj = { searchFields: searchFields, searchValues: searchValues, filterFields: filterFields, filterValues: filterValues, viewstate: state, qs: mini.encode($.url().param()) };
                var setobj = {};
                setobj.columns = jslinq(grid.columns).where(function (item) { return item.field }).select(function (item) { return { field: item.field, header: item.header.replace(/\n|\s/g, ''), editor: item.editor, type: item.type } }).toArray();
                setobj.searchFields = grid.sf || grid.searchfield;
                var openurl = '/core/uform/SearchTemplate';
                mini.open({
                    showMaxButton: true, height: 400, width: 400, url: openurl, title: $.t("search"),
                    onload: function () {
                        var iframe = this.getIFrameEl();
                        var data = setobj;
                        iframe.contentWindow.SetData(data);
                    },
                    ondestroy: function (action) {
                        if (action == "ok") {
                            var iframe = this.getIFrameEl(); var opendata = iframe.contentWindow.GetData(); opendata = mini.clone(opendata);
                            var dsobj = window._fv2obj(window.searchFields, window.searchValues);
                            var sobj = window._fv2obj(opendata.sf, opendata.sv);
                            sobj = $.extend(dsobj, sobj);
                            var sfsv = window._obj2fv(sobj);
                            postobj.searchFields = sfsv.field;
                            postobj.searchValues = sfsv.value;
                            sfc.setValue(postobj.searchFields);
                            svc.setValue(postobj.searchValues);
                            grid.load(postobj);
                        }
                    }
                });
            }

            function DatagridExcel(ext, all) {
                var columns = grid.getBottomColumns();
                function getColumns(columns) {
                    columns = columns.clone();
                    for (var i = columns.length - 1; i >= 0; i--) {
                        var column = columns[i];
                        if (!column.field || (!all && !column.visible)) {
                            columns.removeAt(i);
                        } else {
                            var c = { header: column.header, field: column.field };
                            columns[i] = c;
                        }
                    }
                    return columns;
                }
                var columns = getColumns(columns);
                var jsonColumns = mini.encode(columns);
                var obj = { rel: rel, relkind: relkind, relstore: relstore, pk: pk, ext: ext, searchFields: searchFields, searchValues: searchValues, filterFields: filterFields, filterValues: filterValues, viewstate: state, columns: jsonColumns, qs: mini.encode($.url().param()) };
                Dengdu.createFormSubmit('/core/uform/export', obj);
            }
            function DatagridImport() {
                var openurl = '/core/uform/ImportTemplate?' + $.param({ rel: rel, relstore: relstore, ff: filterFields, fv: filterValues });
                mini.open({
                    showMaxButton: true, height: 400, width: 400, url: openurl, title: $.t("import"),
                    onload: function () {
                    },
                    ondestroy: function (action) {
                        grid.reload();
                    }
                });
            }
            function DatagridWidth() {
                var columns = grid.getBottomColumns();
                function getColumns(columns) {
                    columns = columns.clone();
                    for (var i = columns.length - 1; i >= 0; i--) {
                        var column = columns[i];
                        if (!column.field || !column.visible) {
                            columns.removeAt(i);
                        } else {
                            var c = { header: column.header, field: column.field, width: column.width };
                            columns[i] = c;
                        }
                    }
                    return columns;
                }
                var columns = getColumns(columns);
                var jsonColumns = mini.encode(columns);
                var obj = { rel: rel, relstore: relstore, columns: jsonColumns };
                Dengdu.gridAjax(grid, '/core/uform/width', obj);
            }
            function DatagridSetting() {
                var obj = {};
                var url = $.url().attr('path').toLowerCase();
                if (url.indexOf('/uform/datagrid') > 0 || url.indexOf('/uform/treegrid') > 0 || url.indexOf('/uform/index') > 0) {
                    obj.data = JSON.encode([
                        { url: "/core/uform/datagrid/dd_element?ff=formid&fv={0}".format(gridid), title: $.t("properties"), iconCls: 'fa-columns' },
                        { url: "/core/uform/datagrid/dd_formbutton?ff=formid&fv={0}".format(gridid), title: $.t("buttons"), iconCls: 'fa-hand-pointer-o' },
                        { url: "/core/uform/modify/dd_form?ff=id&fv={0}".format(gridid), title: $.t("form"), iconCls: 'fa-table' },
                        { url: "/core/uform/formtrigger/{0}".format(rel), title: $.t("triggers"), iconCls: 'fa-bolt' },
                        { url: "/core/uform/datagrid/dd_formevent?ff=formid&fv={0}".format(gridid), title: $.t("events"), iconCls: 'fa-fire' }
                    ]);
                } else if (url.indexOf('/uform/query') > 0) {
                    obj.data = JSON.encode([
                        { url: "/core/uform/datagrid/dd_formbutton?ff=formid&fv={0}".format(gridid), title: $.t("buttons"), iconCls: 'fa-hand-pointer-o' },
                        { url: "/core/uform/modify/dd_libquery?ff=id&fv={0}".format(gridid), title: $.t("query"), iconCls: 'fa-table' },
                        { url: "/core/uform/datagrid/dd_formevent?ff=formid&fv={0}".format(gridid), title: $.t("events"), iconCls: 'fa-fire' }
                    ]);
                } else if (url.indexOf('/uform/gridmove') > 0) {
                    obj.data = JSON.encode([
                        { url: "/core/uform/modify/dd_relmtm?ff=id&fv={0}".format(rel), title: $.t("gridmove"), iconCls: 'fa-exchange' }
                    ]);
                } else {
                    alert($.t("unsupported"));
                    return;
                }
                obj.title = "{0}-{1}".format($.t("setting"), grid.title);
                Dengdu.createFormSubmit('/core/api/tab', obj);
            }
            function DatagridSubversion() {
                var row = grid.getSelected();
                if (row) {
                    var url = '/core/uform/datagrid/dd_subversion?ff=formname,pkattname,pkattvalue&fv={0},{1},{2}'.format(rel, pk, row[pk]);
                    Dengdu.createFormSubmit(url);
                } else alert($.t("missingRecord"));

            }
        }

        window.onDdButtonEdit = function (e) {
            var btnEdit = this; var grid = mini.get(this.gridid); var form = new Dengdu.Form(this.gridid);
            var popupWidth = Dengdu.coalesce(btnEdit['popupwidth'], 800); var popupHeight = Dengdu.coalesce(btnEdit['popupheight'], 600);
            var textField = Dengdu.coalesce(btnEdit['textfield'], 'text'); var valueField = Dengdu.coalesce(btnEdit['valuefield'], 'id');
            var name = btnEdit["name"]; var textName = Dengdu.coalesce(btnEdit["textname"], btnEdit["textName"]);
            var attmap = btnEdit["attmap"];
            mini.open({
                url: btnEdit['url'],
                title: $.t("select"),
                width: popupWidth,
                height: popupHeight,
                ondestroy: function (action) {
                    if (action == "ok") {
                        var iframe = this.getIFrameEl(); var data = iframe.contentWindow.GetData(); data = mini.clone(data);
                        if (data) {
                            if (grid) {
                                grid.cancelEdit(); var row = grid.getSelected();
                                var row2 = {}; row2[name] = data[valueField]; row2[textName] = data[textField];
                                if (attmap) {
                                    var maps = attmap.split(',');
                                    for (i = 0; i < maps.length; i++) {
                                        var map = maps[i].split('-');
                                        row2[map[map.length - 1]] = data[map[0]];
                                    }
                                }
                                grid.updateRow(row, row2);
                            }
                            else {
                                if (form) {
                                    var row2 = form.getData();
                                    if (attmap) {
                                        var maps = attmap.split(',');
                                        for (i = 0; i < maps.length; i++) {
                                            var map = maps[i].split('-');
                                            row2[map[map.length - 1]] = data[map[0]];
                                        }
                                    }
                                    form.setData(row2);
                                }
                                btnEdit.setValue(data[valueField]); btnEdit.setText(data[textField]);
                            }
                        }
                    }
                }
            });
        }

        window.onDdComboboxChanged = function (e) {
            var editor = e.sender;
            if (editor.cc) {
                var childControls = JSLINQ(editor.cc.split(',')).Select(function (item) { return mini.get(item); }).ToArray();
                for (var i = 0; i < childControls.length; i++) {
                    childControls[i].setValue(null);
                }
            }
            var formid = $("#" + editor.id).closest(".dd-form").attr("id");
            var form = new Dengdu.Form("#" + formid);
            form.setVisibility();
        };

        window.onDdControlChanged = function (e) {
            var editor = e.sender;
            var formid = $("#" + editor.id).closest(".dd-form").attr("id");
            var form = new Dengdu.Form("#" + formid);
            form.setVisibility();
        }

        window.onDdComboboxBeforeShowPopup = function (e) {
            var editor = e.sender;
            if (editor.pc) {
                var parentControls = JSLINQ(editor.pc.split(',')).Select(function (item) { return mini.get(item).getValue(); }).ToArray();
                editor.setUrl(editor.urlformat.format(parentControls));
            };
        };

        window.OnDdCellCommitEdit = function (e) {
            var grid = e.sender; var record = e.record; var field = e.field; var value = e.value; var editor = e.editor;
            if (e.editor && e.editor.cc) {
                var obj = {};
                var cc = editor.cc.split(',');
                for (var i = 0; i < cc.length; i++) {
                    obj[cc[i]] = null;
                }
                grid.updateRow(record, obj);
            }
        }

        window.OnDdCellBeginEdit = function (e) {
            var grid = e.sender; var record = e.record; var field = e.field; var value = e.value; var editor = e.editor;
            if (e.editor && editor.pc) {
                var pc = editor.pc.split(',');
                var parentControls = JSLINQ(editor.pc.split(',')).Select(function (item) { return record[item]; }).ToArray();
                editor.setUrl(editor.urlformat.format(parentControls));
            }
        }

    })();

    // mini-form
    $(function () {
        Dengdu.onload.add(function () {
            var timeout = 0;
            if ($('.dd-kindeditor').length > 0 || $('.dd-codemirror').length > 0 || $('.dd-monacoeditor').length > 0 || $('.dd-simplemde').length > 0) {
                timeout = 300;
            }
            setTimeout(function () {
                $(".dd-form.detail,.dd-form.modify").each(function () {
                    var div = $(this);
                    var formid = $(this).attr("id");
                    var form = new Dengdu.Form("#" + formid);
                    var rel = div.attr("rel");
                    var path = Dengdu.uformPath + "load/" + rel;
                    var message = JSON.decode(div.attr("srcdata"));
                    if (!message.success) window.location.href = "/core/error?tips={0}".format(message.message);
                    var row = message.data;
                    div.find(".dd-completion,.dd-tablecontrol").each(function () {
                        var name = $(this).attr('name');
                        row[name] = JSON.decode(row[name]);
                    });
                    form.setData(row, true, true);
                    div.find(".mini-autocomplete").each(function () {
                        var self = $(this); var id = self.attr("id");
                        var auto = mini.get(id); var url = auto.url;
                        if (url) {
                            url = url.replace('/codequery', '/codetext');
                            var v = auto.getValue();
                            if (v) {
                                var obj = Dengdu.ajaxGetObj(url, { data: JSON.encode([v]) });
                                if (obj && obj.length == 1) {
                                    auto.setText(obj[0].text);
                                }
                            }
                        }
                    });
                    div.find(".mini-textboxlist").each(function () {
                        var self = $(this); var id = self.attr('id');
                        var auto = mini.get(id); var url = auto.url;
                        if (url) {
                            url = url.replace('/codequery', '/codetext');
                            var v = auto.getValue();
                            if (v) {
                                var obj = Dengdu.ajaxGetObj(url, { data: JSON.encode(v.split(',')) });
                                if (obj) {
                                    auto.setValue($.map(obj, function (item) { return item.id }).join(','));
                                    auto.setText($.map(obj, function (item) { return item.text }).join(','));
                                }
                            }
                        }
                    });
                    div.find(".dd-form-toolbar").show();
                    if (row.ddztm) {
                        $("div.dd-form.modify div.dd-form-fsm div.mini-datagrid").each(function () {
                            var gridid = this.id;
                            var grid = mini.get(gridid);
                            grid.on("loaderror", onDatagridLoadError);
                            grid.load({ ff: filterFields, fv: filterValues });
                            function onDatagridLoadError(sender) {
                                Dengdu.nwalert(sender.xhr.responseText);
                            }
                        });
                    }
                });
                mini.parse();
            }, timeout);
        }, 1001);
        //mini-datagrid mini-treegrid
        Dengdu.onload.add(function () {
            $(".dd-dropdown-menu>a").click(function () {
                var $a = $(this); var $item = $a.next(); var offset = $a.offset(); var wheight = $(window).height(); $item.css("left", "").css("top", "");
                var iheight = $item.height(); var sheight = $a.height();
                $item.css("position", "fixed").toggle();
                if (offset.top + sheight + iheight < wheight)
                    $item.offset({ left: offset.left, top: offset.top + sheight });
                else
                    $item.offset({ left: offset.left, top: offset.top - iheight });
            });
            $('div.dd-datagrid.mini-datagrid').each(function () {
                var gridid = this.id;
                var grid = mini.get(gridid);
                grid.on("loaderror", onDatagridLoadError);
                grid.on("load", onDatagridLoad);
                var state = mini.get(gridid + "_state").getValue();
                var obj = { filterFields: filterFields, filterValues: filterValues, searchFields: searchFields, searchValues: searchValues, qs: mini.encode($.url().param()), viewstate: state };
                grid.load(obj);
                function onDatagridLoad(e) {
                    var result = grid.getResultObject();
                    if (result.message) $("#" + gridid + "_status").text(result.message);
                }
                function onDatagridLoadError(e) {
                    Dengdu.ajaxSuccess(e.xhr.responseText);
                }
            });

            $('div.dd-treegrid.mini-treegrid').each(function () {
                var gridid = this.id;
                var grid = mini.get(gridid);
                grid.on("loaderror", onDatagridLoadError);
                var state = mini.get(gridid + "_state").getValue();
                var obj = { filterFields: filterFields, filterValues: filterValues, searchFields: searchFields, searchValues: searchValues, qs: mini.encode($.url().param()), viewstate: state };
                grid.load(obj);
                function onDatagridLoadError(sender) {
                    Dengdu.ajaxSuccess(sender.xhr.responseText);
                };
            });

            $(".dd-gridbutton").click(function (e) {
                e.preventDefault();
                var buttonid = this["id"]; var button = mini.get(buttonid); var gridid = button.gridid;
                var async = button.async ? !['0', 'false'].contains(button.async.toLowerCase()) : true;
                var selector = '#{0}'.format(gridid);
                var div = $(selector);
                var isform = div.hasClass('dd-form');
                var grid = isform ? new Dengdu.Form(selector) : mini.get(gridid);
                var href = button.href; var target = button.target;
                var needselect = button.needselect != "0"; var needconfirm = button.needconfirm != "0";
                var rows = isform ? [$.extend(mini.decode(div.attr("srcdata")).data, grid.getData())] : grid.getSelecteds();
                var filteredRows = rows;
                var columns = GetColumns(button.filterfields);
                if (needconfirm) {
                    var confirmTexts = Dengdu.coalesce(button.confirmtext, $.t("confirmMessage")).split("|");
                    for (i = 0; i < confirmTexts.length; i++) {
                        if (!confirm(confirmTexts[i])) return;
                    }
                }
                if (needselect) {
                    if (rows.length == 0) {
                        mini.alert($.t("missingRecord"));
                        return;
                    }
                }
                if (button.filterfields) {
                    filteredRows = GetData(rows, button.filterfields);
                }

                if (target == '_sql') {
                    var postobj = { ff: filterFields, fv: filterValues };
                    postobj.data = mini.encode(filteredRows);
                    Dengdu.gridAjax(grid, href, postobj, async, button);
                }

                if (target == '_input') {
                    if (!button.href) {
                        alert($.t("missingUrl")); return;
                    }
                    var getobj = {};
                    var open = {};
                    if (typeof button.open == "string") {
                        getobj = { data: button.open };
                        open = JSON.decode(button.open);
                    }
                    else {
                        getobj = { data: JSON.encode(button.open) };
                        open = button.open;
                    }
                    var url = '/core/uform/open?' + $.param(getobj);
                    mini.open({
                        url: url,
                        title: Dengdu.coalesce(open.title, $.t("inputParameter")),
                        width: Dengdu.coalesce(open.width, "800"),
                        height: Dengdu.coalesce(open.height, "600"),
                        onload: function () {
                            var iframe = this.getIFrameEl();
                            if (filteredRows && filteredRows[0])
                                iframe.contentWindow.SetData(filteredRows[0]);
                        },
                        ondestroy: function (action) {
                            if (action == "ok") {
                                var iframe = this.getIFrameEl(); var opendata = iframe.contentWindow.GetData(); opendata = mini.clone(opendata);
                                if (opendata) {
                                    var postobj = { ff: filterFields, fv: filterValues, args: JSON.encode(opendata) };
                                    if (needselect) postobj.data = JSON.encode(filteredRows);
                                    if (href)
                                        Dengdu.gridAjax(grid, href, postobj, async, button);
                                    else grid.reload();
                                }
                            }
                        }
                    });
                }

                if (target == '_open') {
                    var obj = (filteredRows && filteredRows[0]) ? filteredRows[0] : {};
                    obj = $.extend({}, window.filterObject, obj);
                    var url = href.format(obj);
                    var open = JSON.decode(Dengdu.coalesce(button.open, "{}"));
                    mini.open({
                        url: url,
                        title: Dengdu.coalesce(open.title, $.t("open")),
                        width: Dengdu.coalesce(open.width, "800"),
                        height: Dengdu.coalesce(open.height, "600"),
                        ondestroy: function (action) {
                            grid.reload();
                        }
                    });
                }

                if (['_fffv', '_data', '_param', '_format'].contains(target)) {
                    var obj = {};
                    if (target == '_fffv') {
                        obj.ff = columns.join(","); obj.fv = $.map(columns, function (column) { return filteredRows[0][column] }).join(",");
                    }
                    if (target == '_data') {
                        obj.data = mini.encode(filteredRows);
                    }
                    if (target == '_param' || target == '_format') {
                        obj = filteredRows[0] || {};
                    }
                    if (target != '_format') {
                        if (button.tf) {
                            var ds = rows[0];
                            obj.title = $.map(button.tf.split(','), function (item) { return ds[item]; }).join("-");
                        }
                        if (target == '_data') {
                            Dengdu.createFormSubmit(href, obj);
                        }
                        else {
                            Dengdu.createFormSubmit(href, obj, 'get');
                        }
                    } else {
                        obj = $.extend({}, window.filterObject, obj);
                        var newhref = href.format(obj);
                        Dengdu.createFormSubmit(newhref, {}, 'get');
                    }
                }

                if (target == '_blank' || target == "_self") {
                    var obj = (filteredRows && filteredRows[0]) ? filteredRows[0] : {};
                    obj = $.extend({}, window.filterObject, obj);
                    var newhref = href.format(obj);
                    Dengdu.createFormSubmit(newhref, {}, 'get', target);
                }

                if (target == '_zip') {
                    var gridpanel = $(this).closest("div[rel]");
                    var rel = Dengdu.coalesce(button.rel, gridpanel.attr("rel"));
                    var pk = gridpanel.attr("pk");
                    mini.open({
                        url: '/core/uform/fileselect/' + rel,
                        title: $.t("select"),
                        width: 400,
                        height: 400,
                        ondestroy: function (action) {
                            if (action == "ok") {
                                var iframe = this.getIFrameEl(); var opendata = iframe.contentWindow.GetData(); opendata = mini.clone(opendata);
                                if (opendata) {
                                    var obj = { rel: rel, attname: opendata, data: JSON.encode(filteredRows) };
                                    Dengdu.createFormSubmit('/core/uform/ZipDownload', obj);
                                }
                            }
                        }
                    });
                }

                if (target == '_file') {
                    var gridpanel = $(this).closest("div[rel]");
                    var rel = Dengdu.coalesce(button.rel, gridpanel.attr("rel"));
                    var pk = gridpanel.attr("pk");
                    mini.open({
                        url: '/core/uform/fileselect/' + rel,
                        title: $.t("select"),
                        width: 400,
                        height: 400,
                        ondestroy: function (action) {
                            if (action == "ok") {
                                var iframe = this.getIFrameEl(); var opendata = iframe.contentWindow.GetData(); opendata = mini.clone(opendata);
                                if (opendata) {
                                    var obj = { rel: rel, attname: opendata, data: JSON.encode(filteredRows) };
                                    Dengdu.createFormSubmit('/core/uform/FileDownload', obj);
                                }
                            }
                        }
                    });
                }

                function GetColumns(select) {
                    if (select) {
                        var sArray = select.split(","); var obj = new Array();
                        for (var i = 0; i < sArray.length; i++) {
                            var map = sArray[i].split("-"); if (map.length == 1) map[1] = map[0];
                            obj[i] = map[1];
                        }
                        return obj;
                    }
                    else return select;
                }

                function GetData(rows, select) {
                    //rows:Array,select:string("p1-a,p2-b")
                    if (!rows) return rows; if (!select) { return rows; }
                    var obj = new Array(); var sArray = select.split(",");
                    for (var r = 0; r < rows.length; r++) {
                        var tmp = {};
                        for (i = 0; i < sArray.length; i++) {
                            var map = sArray[i].split("-"); if (map.length == 1) map[1] = map[0];
                            tmp[map[1]] = rows[r][map[0]];
                        }
                        obj[r] = tmp;
                    }
                    return obj;
                }
            });

            $(".dd-form.modify a.mini-button[target='_ajaxsubmit']").click(function (e) {
                e.preventDefault();
                var button = mini.get($(this).attr("id"));
                if (!button.enabled) return;
                var div = $(this).closest(".dd-form.modify");
                var formid = div.attr("id");
                var form = new Dengdu.Form("#" + formid);
                var rel = div.attr("rel");
                form.validate();
                if (form.isValid() == false) {
                    var errs = form.getErrors();
                    errs[0].focus();
                    var tabsID = $(errs[0].getTextEl()).parents(".dd-form-tabs").attr("id");
                    if (tabsID) {
                        var tabs = mini.get(tabsID);
                        var tabIndex = $(errs[0].getTextEl()).parents(".mini-tabs-body").attr("id");
                        tabIndex = tabIndex[tabIndex.length - 1] - 1;
                        tabs.activeTab(tabIndex);
                    }
                    return;
                }
                var button_text = button.getText(); button.disable(); button.setText("Loading...");
                var message = mini.decode(div.attr("srcdata"));
                if (!message.success) window.location.href = "/core/error?tips={0}".format(message.message);
                var srcdata = message.data;
                var formdata = form.getData();
                $.extend(srcdata, formdata);
                var json = mini.encode([srcdata]);
                json = window.rsaEncrypt(json);
                var dop = button.dop;
                if (button.needconfirm) {
                    if (!confirm($.t("confirmMessage"))) return;
                }
                var url = Dengdu.coalesce(button.href, Dengdu.uformPath + "save/" + rel);
                if (url.toLowerCase().indexOf('/core/uform/fsm') != -1 && srcdata._state == 'added') {
                    alert($.t("submitUnsaved"));
                    return;
                }
                Dengdu.asyncAjax(url, { viewstate: dop, data: json, reload: srcdata._state == "modified" ? 0 : 1 }, function (text) {
                    var msg = mini.decode(text);
                    if (srcdata._state == "modified" && msg.reload == 0 && msg.success) {
                        srcdata["updatedtime"] = msg.time;
                        var control = mini.get("updatedtime");
                        if (control) control.setValue(msg.time);
                        div.attr("srcdata", mini.encode({ success: 1, data: srcdata }));
                    }
                    button.setText(button_text); button.enable();
                });
            });

            $("form .dd-button[target=_submit]").click(function () {
                e.preventDefault(); var href = $(this).attr('href'); var form = $(this).closest("form"); var formid = form.attr("id");
                form.attr(Dengdu.coalesce(form.attr('action'), href)); var miniForm = new Dengdu.Form("#" + formid); miniForm.validate();
                if (form.isValid() == false) return; form.submit();
            });

            $("form .dd-button[target=_ajaxsubmit]").click(function (e) {
                e.preventDefault(); var href = $(this).attr('href'); var form = $(this).closest("form"); var formid = form.attr("id");
                var url = Dengdu.coalesce(form.attr('action'), href); var miniForm = new Dengdu.Form("#" + formid); miniForm.validate();
                if (miniForm.isValid() == false) return; var data = miniForm.getData(); var json = mini.encode(data); Dengdu.ajax(url, data);
            });

            $(".dd-button[target=_ajax]").click(function (e) {
                e.preventDefault(); var sender = mini.get(this.id); var url = $(this).attr('href');
                Dengdu.ajax(url, sender.data ? mini.decode(data) : {});
            });

            $(".dd-cfmbtn[target=_ajax]").click(function (e) {
                e.preventDefault(); var sender = mini.get(this.id); var url = $(this).attr('href');
                if (confirm(Dengdu.coalesce(sender.cfmtxt, $.t("confirmMessage")))) {
                    Dengdu.ajax(url, sender.data ? mini.decode(data) : {});
                }
            });

            $(".dd-gridbutton").removeAttr('href');
        }, 9000);
    });

});