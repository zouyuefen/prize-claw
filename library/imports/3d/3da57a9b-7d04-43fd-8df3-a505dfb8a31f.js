'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        glow: {
            default: null,
            type: cc.Node
        },

        prize: {
            default: null,
            type: cc.Node
        },

        close: {
            default: null,
            type: cc.Node
        },

        loginBtn: {
            default: null,
            type: cc.Node
        },
        mask: {
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
        // 关闭
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.close.scale = .95;
        });
        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this.close.scale = 1;
            _this.hide();
        });

        // login
        this.loginBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.loginBtn.scale = .95;
        });
        this.loginBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this.loginBtn.scale = 1;
            _this.hide();
            _this.main.login.show();
        });
    },
    show: function show(uri) {
        var _this2 = this;

        cc.loader.load(uri, function (err, texture) {
            if (err) alert(err);else {
                // 设置奖品图片
                _this2.prize.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);

                if (_this2.node.active) _this2.node.opacity = 0;else {
                    _this2.node.active = true;
                    _this2.node.opacity = 0;
                }
                _this2.node.runAction(cc.fadeIn(.5));

                // 炫光动画
                _this2.glow.runAction(cc.repeatForever(cc.rotateBy(3, 360)));

                //是否登录
                if (_this2.main.user.phone) {
                    _this2.loginBtn.active = false;
                } else {
                    _this2.loginBtn.active = true;
                }
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