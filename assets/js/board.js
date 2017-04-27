cc.Class({
    extends: cc.Component,

    properties: {
        mask: {
            default: null,
            type: cc.Node
        },

        btn: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        this.listen()
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

});
