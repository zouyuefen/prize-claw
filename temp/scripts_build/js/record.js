"use strict";
cc._RFpush(module, '6b7ccFP5wRN/qmzVt8r34qS', 'record');
// js\record.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _prizeDetail = require('prizeDetail');

var _prizeDetail2 = _interopRequireDefault(_prizeDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        },
        prizeDetail: {
            default: null,
            type: _prizeDetail2.default
        }
    },

    onLoad: function onLoad() {
        this.prizeDetail.init();
        this.listen();
    },
    listen: function listen() {
        var _this2 = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        /*
        * 关闭按钮
        */
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.close.scale = .95;
        });

        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.close.scale = 1;
            _this2.hide();
        });

        //loginBtn
        this.loginBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.loginBtn.scale = .95;
        });

        this.loginBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.loginBtn.scale = 1;
            _this2.hide();
            window._main.login.show();
        });
    },
    show: function show() {
        var _this3 = this;

        var _this = this;

        window._main.api.monitor('抓去记录', 13);

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));

        if (!window._main.user.phone) {
            this.other.active = true;
            this.layout.active = false;
        } else {
            this.layout.active = true;
            this.other.active = false;
        }

        window._main.api.grabHistory().then(function (res) {
            if (res.data.ok) {
                if (res.data.r.length === 0) {
                    return;
                }
                var i = 0;
                var children = _this3.layout.children,
                    list = res.data.r;

                children.forEach(function (child) {
                    child.active = child._bind = false;
                });
                var load = function load() {
                    var item = list[i];
                    var child = children[i];
                    if (!child) {
                        child = cc.instantiate(_this3.item);
                        _this3.layout.addChild(child);
                    }

                    child.active = true;
                    child.opacity = 255;

                    // 获奖状态
                    var btn = child.getChildByName('btn'),
                        state = child.getChildByName('state');
                    btn.active = state.active = false;
                    if (item.awardStatus === 0) {
                        btn.active = true;
                    } else {
                        state.active = true;
                        state.getComponent(cc.Label).string = item.awardStatusStr;
                    }

                    if (!child._bind) {
                        child._bind = true;

                        btn.on(cc.Node.EventType.TOUCH_START, function () {
                            this.scale = .95;
                        });

                        btn.on(cc.Node.EventType.TOUCH_END, function () {
                            this.scale = 1;
                            _this.prizeDetail.show({
                                uri: item.goodsImg,
                                name: item.goodsName,
                                state: item.awardStatusStr,
                                text: item.receiveInfo
                            });
                        });
                    }

                    child.getChildByName('layout').getChildByName('name').getComponent(cc.Label).string = item.goodsName;

                    child.getChildByName('layout').getChildByName('date').getComponent(cc.Label).string = item.createDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

                    cc.loader.load(item.goodsImg, function (err, texture) {
                        if (err) console.log(err);else {
                            var img = child.getChildByName('image');
                            img.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                            if (item.goodsType === 1) img.scale = .3;else img.scale = 1;
                        }
                        if (++i < list.length) load();
                    });
                };
                load();
            }
        });
    },
    hide: function hide() {
        var _this4 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this4.node.active = false;
        })));
    }
});

cc._RFpop();