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
        layout: {
            default: null,
            type: cc.Node
        },
        item: {
            default: null,
            type: cc.Prefab
        },
        other: {
            default: null,
            type: cc.Node
        },
        loginBtn: {
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

        //loginBtn
        this.loginBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.loginBtn.scale = .95
            }
        )

        this.loginBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.loginBtn.scale = 1
                this.hide()
                window._main.login.show()
            }
        )
    },

    show() {
        window._main.api.monitor('抓去记录', 13)

        if (this.node.active) this.node.opacity = 0
        else {
            this.node.active = true
            this.node.opacity = 0
        }
        this.node.runAction(cc.fadeIn(.5))

        if (!window._main.user.phone) {
            this.other.active = true
            this.layout.active = false
        } else {
            this.layout.active = true
            this.other.active = false
        }

        window._main.api.grabHistory()
        .then(res => {
            if (res.data.ok) {
                if (res.data.r.length === 0) {
                    return
                }
                let i = 0
                const
                    children = this.layout.children,
                    list = res.data.r

                children.forEach(child => {
                    child.active = false
                })
                const load = () => {
                    const
                        item = list[i]
                    let child = children[i]
                    if (!child) {
                        child = cc.instantiate(this.item)
                        this.layout.addChild(child)
                    }

                    child.active = true
                    child.opacity = 255

                    child.getChildByName('state').getComponent(cc.Label)
                        .string = item.awardStatusStr

                    child.getChildByName('layout').getChildByName('name')
                        .getComponent(cc.Label).string = item.goodsName

                    child.getChildByName('layout').getChildByName('date')
                        .getComponent(cc.Label).string = item.createDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')

                    cc.loader.load(item.goodsImg, (err, texture) => {
                        if (err) console.log(err)
                        else {
                            const img = child.getChildByName('image')
                            img.getComponent(cc.Sprite)
                                .spriteFrame = new cc.SpriteFrame(texture)
                            if (item.goodsType === 1) img.scale = .3
                            else img.scale = 1
                        }
                        if (++i < list.length) load()
                    })

                }
                load()
            }
        })
    },

    hide() {
        this.node.runAction(cc.sequence(
            cc.fadeOut(.5),
            cc.callFunc(() => {
                this.node.active = false
            })
        ))
    },



})
