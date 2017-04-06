export default cc.Class({
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

    onLoad() {
        this.listen()
    },

    show() {
        window._main.api.monitor('规则界面', 14)

        if (this.node.active) this.node.opacity = 0
        else {
            this.node.active = true
            this.node.opacity = 0
        }
        this.node.runAction(cc.fadeIn(.5))
    },

    listen() {
        this.mask.on(
            cc.Node.EventType.TOUCH_START,
            event => {
                event.stopPropagation()
            }
        )

        this.btn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.hide()
            }
        )
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
