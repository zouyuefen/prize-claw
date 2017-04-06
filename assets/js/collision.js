cc.Class({
    extends: cc.Component,
    onLoad() {
        this.init()
    },

    init() {
        this.main = cc.director.getScene()
            .getChildByName('main').getComponent('main')
    },
    onCollisionEnter(other, self) {
        /* 检测爪子状态
        * 非 grab 状态
        * 不作碰撞处理
        */
        if (this.main.game.claw.state !== 'grab') return
        if (self.node.name === 'left') {
            this.main.game.claw.catched = this.checkLeft(other, self)
        } else if (self.node.name === 'right') {
            this.main.game.claw.catched = this.checkRight(other, self)
        } else console.error('请检查组件名设置')

        if (this.main.game.claw.catched) {
            this.main.game.claw.gift = other.node
        }
    },
    onCollisionStay(other, self) {

    },
    checkLeft(gift, claw) {
        // 转成世界坐标
        const pos = {
            gift: gift.node.convertToWorldSpace(0, 0),
            claw: claw.node.convertToWorldSpace(0, 0)
        }

        const delta = pos.gift.x - pos.claw.x

        if (delta > 20) return true
        return false
    },
    checkRight(gift, claw) {
        // 转成世界坐标
        const pos = {
            gift: gift.node.convertToWorldSpace(0, 0),
            claw: claw.node.convertToWorldSpace(0, 0)
        }

        const delta = pos.claw.x - pos.gift.x

        if (delta > 10) return true

        return false
    }
})
