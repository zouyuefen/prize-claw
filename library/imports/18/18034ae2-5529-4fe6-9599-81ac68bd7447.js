'use strict';

cc.Class({
    extends: cc.Component,

    onCollisionEnter: function onCollisionEnter(other, self) {
        /* 检测爪子状态
        * 非 grab 状态
        * 不作碰撞处理
        */
        if (window._main.game.claw.state !== 'grab') return;
        if (self.node.name === 'left') {
            window._main.game.claw.catched = this.checkLeft(other, self);
        } else if (self.node.name === 'right') {
            window._main.game.claw.catched = this.checkRight(other, self);
        } else console.error('请检查组件名设置');

        if (window._main.game.claw.catched) {
            window._main.game.claw.gift = other.node;
        }
    },
    onCollisionStay: function onCollisionStay(other, self) {},
    checkLeft: function checkLeft(gift, claw) {
        // 转成世界坐标
        var pos = {
            gift: gift.node.convertToWorldSpace(0, 0),
            claw: claw.node.convertToWorldSpace(0, 0)
        };

        var delta = pos.gift.x - pos.claw.x;

        if (delta > 20) return true;
        return false;
    },
    checkRight: function checkRight(gift, claw) {
        // 转成世界坐标
        var pos = {
            gift: gift.node.convertToWorldSpace(0, 0),
            claw: claw.node.convertToWorldSpace(0, 0)
        };

        var delta = pos.claw.x - pos.gift.x;

        if (delta > 10) return true;

        return false;
    }
});