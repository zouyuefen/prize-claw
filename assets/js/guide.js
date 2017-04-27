export default cc.Class({
    extends: cc.Component,
    properties: {
        mask: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        this.listen()
    },

    listen() {
        this.mask.on(
            cc.Node.EventType.TOUCH_START,
            function() {
                this.hide()
            }, this
        )
    },

    show() {
        if (this.node.active) this.node.opacity = 0
        else {
            this.node.active = true
            this.node.opacity = 0
        }
        this.node.runAction(cc.fadeIn(.5))
    },

    hide() {
        this.node.runAction(cc.sequence(
            cc.fadeOut(.5),
            cc.callFunc(() => {
                this.node.active = false
            })
        ))
    }
})