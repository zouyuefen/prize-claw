"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        btn: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        bkg: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.init();
        this.listen();
    },
    init: function init() {
        this.node.active = false;
    },
    show: function show() {
        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
    },
    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        this.btn.on(cc.Node.EventType.TOUCH_START, function () {
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