'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        phone: {
            default: null,
            type: cc.Node
        },
        code: {
            default: null,
            type: cc.Node
        },

        codeBtn: {
            default: null,
            type: cc.Node
        },

        submit: {
            default: null,
            type: cc.Node
        },

        mask: {
            default: null,
            type: cc.Node
        },

        spirteFrames: {
            default: [],
            type: cc.SpriteFrame
        },

        close: {
            default: null,
            type: cc.Node
        },

        codeBtnText: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function onLoad() {
        this.init();
        this.listen();
    },

    init: function init() {
        // 网络请求状态
        this.state = {
            wait: false,
            time: 0
        };

        this.phoneInput = this.phone.getComponent(cc.EditBox);
        this.codeInput = this.code.getComponent(cc.EditBox);
        window._main.shop.node.zIndex = 1;
    },
    countDown: function countDown() {
        var _this = this;

        this.state.time--;
        this.codeBtnText.string = this.state.time.toString() + 's';
        if (this.state.time === 0) {
            this.codeReset();
            return;
        }
        setTimeout(function () {
            _this.countDown();
        }, 1000);
    },
    codeReset: function codeReset() {
        this.codeBtn.getComponent(cc.Sprite).spriteFrame = this.spirteFrames[0];
        this.codeBtnText.string = '获取验证码';
    },
    listen: function listen() {
        var _this2 = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        /*
        * 手机号输入事件监听
        * 替换非数字字符为空
        */

        this.phone.on('text-changed', function () {
            _this2.phoneInput.string = _this2.phoneInput.string.replace(/\D/g, '');
        });

        /*
        * 验证码输入事件监听
        * 替换非数字字符为空
        */

        this.code.on('text-changed', function () {
            _this2.codeInput.string = _this2.codeInput.string.replace(/\D/g, '');
        });

        /*
        * 验证码按钮监听
        */
        this.codeBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.codeBtn.scale = .95;
        });

        this.codeBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.codeBtn.scale = 1;
            if (_this2.state.wait) return;
            if (_this2.state.time) return;

            _this2.state.wait = true;

            window._main.api.getCaptcha(_this2.phoneInput.string).then(function (res) {
                if (res.data.ok) {
                    // 启动倒计时
                    _this2.state.time = 60;
                    _this2.countDown();

                    _this2.codeBtn.getComponent(cc.Sprite).spriteFrame = _this2.spirteFrames[1];
                } else {
                    alert(res.data.m);
                }
                _this2.state.wait = false;
            });
        });

        /*
        * 提交按钮
        */
        this.submit.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.submit.scale = .95;
        });

        this.submit.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.submit.scale = 1;

            window._main.api.bindPhone(_this2.phoneInput.string, _this2.codeInput.string).then(function (res) {
                if (res.data.ok) {
                    window._main.user.phone = _this2.phoneInput.string;
                    _this2.hide();
                    _this2.codeInput.string = '';
                    _this2.phoneInput.string = '';
                } else {
                    alert(res.data.m);
                }
            });
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
    },
    show: function show() {
        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
    },
    hide: function hide() {
        var _this3 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this3.node.active = false;
        })));
    }
});