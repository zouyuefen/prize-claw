"use strict";
cc._RFpush(module, '6b7ccFP5wRN/qmzVt8r34qS', 'record');
// js\record.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        close: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        layout: {
            default: null,
            type: cc.Node
        },
        item: {
            default: null,
            type: cc.Prefab
        },
        other: {
            default: null,
            type: cc.Node
        },
        loginBtn: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        this.init();
        this.listen();
    },
    init: function init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');
    },
    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        /*
        * 关闭按钮
        */
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.close.scale = .95;
        });

        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this.close.scale = 1;
            _this.hide();
        });

        //loginBtn
        this.loginBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.loginBtn.scale = .95;
        });

        this.loginBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this.loginBtn.scale = 1;
            _this.hide();
            _this.main.login.show();
        });
    },
    show: function show() {
        var _this2 = this;

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));

        if (!this.main.user.phone) {
            this.other.active = true;
            this.layout.active = false;
        } else {
            this.layout.active = true;
            this.other.active = false;
        }

        this.main.api.grabHistory().then(function (res) {
            if (res.data.ok) {
                if (res.data.r.length === 0) {
                    return;
                }
                var i = 0;
                var children = _this2.layout.children,
                    list = res.data.r;

                children.forEach(function (child) {
                    child.active = false;
                });
                var load = function load() {
                    var item = list[i];
                    var child = children[i];
                    if (!child) {
                        child = cc.instantiate(_this2.item);
                        _this2.layout.addChild(child);
                    }

                    child.active = true;
                    child.opacity = 255;

                    child.getChildByName('state').getComponent(cc.Label).string = item.awardStatusStr;

                    child.getChildByName('layout').getChildByName('name').getComponent(cc.Label).string = item.goodsName;

                    child.getChildByName('layout').getChildByName('date').getComponent(cc.Label).string = item.createDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

                    cc.loader.load(item.goodsImg, function (err, texture) {
                        if (err) console.log(err);else {
                            var img = child.getChildByName('image');
                            img.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                            if (item.goodsType === 1) img.scale = .3;
                        }
                        if (++i < list.length) load();
                    });
                };
                load();
            }
        });
    },
    hide: function hide() {
        var _this3 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this3.node.active = false;
        })));
    }
});

cc._RFpop();