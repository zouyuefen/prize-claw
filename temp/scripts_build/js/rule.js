"use strict";
cc._RFpush(module, '1258dwowHJHp4dxnVYNTBFd', 'rule');
// js\rule.js

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = cc.Class({
    'extends': cc.Component,
    properties: {
        btn: {
            'default': null,
            type: cc.Node
        },
        mask: {
            'default': null,
            type: cc.Node
        },
        bkg: {
            'default': null,
            type: cc.Node
        },
        checkMark: {
            'default': null,
            type: cc.Toggle
        }
    },

    onLoad: function onLoad() {
        this.init();
        this.listen();
    },

    init: function init() {
        // this.checkMark.opacity = 0
        // this.checkMark.runAction(cc.hide())
        this.checkMark.isChecked = false;
    },

    show: function show() {
        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
        // this.bkg.y -= 200
        // this.bkg.runAction(cc.moveBy(1, 0, 200).easing(cc.easeOut(3)))
    },

    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        this.btn.on(cc.Node.EventType.TOUCH_START, function () {
            if (!_this.checkMark.isChecked) {
                alert('请同意协议后继续');
                return;
            }
            _this.hide();
        });
    },

    hide: function hide() {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this2.node.active = false;
        })));
    }

});
module.exports = exports['default'];

cc._RFpop();