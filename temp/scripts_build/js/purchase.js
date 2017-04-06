"use strict";
cc._RFpush(module, '973f650eVxND5NWP7f7tH0V', 'purchase');
// js\purchase.js

'use strict';

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');

        // this.listen()

        console.log(this.name);
    },
    onEnable: function onEnable() {
        console.log(this.name);
    },
    listen: function listen() {
        var _this = this;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.node.scale = .95;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            _this.node.scale = 1;
            _this.main.api.purchase(_this.node.__goodsId).then(function (res) {
                console.log(res);
            });
        });
    }
});

cc._RFpop();