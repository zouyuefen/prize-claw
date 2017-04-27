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
        panel: {
            default: null,
            type: cc.Node
        }
    },

    init: function init() {
        this.listen();
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
    hide: function hide() {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this2.node.active = false;
        })));
    },
    show: function show(info) {
        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
        this.refresh(info);
    },
    refresh: function refresh(info) {
        var _this3 = this;

        this.panel.getChildByName('phone').getComponent(cc.Label).string = '\u83B7\u5956\u53F7\u7801\uFF1A' + window._main.user.phone;

        this.panel.getChildByName('state').getComponent(cc.Label).string = info.state;

        this.panel.getChildByName('name').getComponent(cc.Label).string = info.name;

        this.panel.getChildByName('text').getComponent(cc.Label).string = info.text.replace(/\\n/g, '\n');

        cc.loader.load(info.uri, function (err, res) {
            var img = _this3.panel.getChildByName('image');
            img.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
        });
    }
});