'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        mask: {
            default: null,
            type: cc.Node
        },

        close: {
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

        /*
        * 创建空借点
        * 抵消 layout 的 coupon
        */
        this.empty = new cc.Node();
        this.empty.name = 'empty';
        this.empty.height = 26;
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
    },
    show: function show() {
        var _this2 = this;

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));

        this.main.api.goodsList().then(function (res) {
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

                var needEmpty = false;

                // 有空节点则 remove
                var empty = _this2.layout.getChildByName('empty');
                empty ? empty.removeFromParent() : null;

                var load = function load() {
                    var item = list[i];
                    var child = children[i];
                    if (!child) {
                        child = cc.instantiate(_this2.item);
                        _this2.layout.addChild(child);
                    }
                    child.active = true;

                    child._goodsId = item.id;

                    child.getChildByName('layout').getChildByName('more').getComponent(cc.Label).string = item.promotionQuantity + '\u91D1\u5E01';

                    child.getChildByName('layout').getChildByName('less').getComponent(cc.Label).string = item.quantity + '\u91D1\u5E01';

                    child.getChildByName('btn').getChildByName('text').getComponent(cc.Label).string = '\uFFE5' + item.price / 100;

                    child.getChildByName('coupon').active = child.getChildByName('layout').getChildByName('less').active = item.promotionState;

                    if (!child._bind) {

                        child._bind = true;
                        // 购买监听
                        child.getChildByName('btn').on(cc.Node.EventType.TOUCH_START, function () {
                            this.scale = .95;
                        });

                        child.getChildByName('btn').on(cc.Node.EventType.TOUCH_END, function (event) {
                            event.target.scale = 1;
                            _this2.main.api.purchase(child._goodsId).then(function (res) {
                                if (res.data.ok) {
                                    location.href = res.data.r;
                                }
                            });
                        });
                    }

                    if (item.promotionState && i === 0) {
                        needEmpty = true;
                    }

                    cc.loader.load([item.img, item.promotionImg], function (err, results) {
                        if (err) console.log(err);else {
                            child.getChildByName('image').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(results.getContent(item.img));

                            child.getChildByName('layout').x = -45;

                            // 折扣图标
                            child.getChildByName('coupon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(results.getContent(item.promotionImg));
                        }
                        if (++i < list.length) load();else if (needEmpty) {
                            _this2.layout.addChild(_this2.empty);
                            _this2.empty.setSiblingIndex(0);
                        }
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