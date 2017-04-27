export default cc.Class({
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

    init() {
        this.listen()
    },

    listen() {
        this.mask.on(
            cc.Node.EventType.TOUCH_START,
            event => {
                event.stopPropagation()
            }
        )

        /*
        * 关闭按钮
        */
        this.close.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.close.scale = .95
            }
        )

        this.close.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.close.scale = 1
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
    },

    show(info) {
        if (this.node.active) this.node.opacity = 0
        else {
            this.node.active = true
            this.node.opacity = 0
        }
        this.node.runAction(cc.fadeIn(.5))
        this.refresh(info)
    },

    refresh(info) {
        this.panel.getChildByName('phone')
            .getComponent(cc.Label).string = `获奖号码：${window._main.user.phone}`
        
        this.panel.getChildByName('state')
            .getComponent(cc.Label).string = info.state

        this.panel.getChildByName('name')
            .getComponent(cc.Label).string = info.name

        this.panel.getChildByName('text')
            .getComponent(cc.Label).string = info.text.replace(/\\n/g, '\n')

        cc.loader.load(info.uri, (err, res) => {
            const img = this.panel.getChildByName('image')
            img.getComponent(cc.Sprite)
                .spriteFrame = new cc.SpriteFrame(res)
        })
    }
})