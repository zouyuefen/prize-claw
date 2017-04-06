export default cc.Class({
    extends: cc.Component,
    properties: {
        glow: {
            default: null,
            type: cc.Node
        },

        prize: {
            default: null,
            type: cc.Node
        },

        close: {
            default: null,
            type: cc.Node
        },

        loginBtn: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        this.init()
        this.listen()
    },

    init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene()
            .getChildByName('main').getComponent('main')

    },

    listen() {
        this.mask.on(
            cc.Node.EventType.TOUCH_START,
            event => {
                event.stopPropagation()
            }
        )
        // 关闭
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

        // login
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
                this.main.login.show()
            }
        )

    },

    show(uri) {
        cc.loader.load(uri, (err, texture) => {
            if (err) alert(err)
            else {
                // 设置奖品图片
                this.prize.getComponent(cc.Sprite).spriteFrame =
                    new cc.SpriteFrame(texture)


                if (this.node.active) this.node.opacity = 0
                else {
                    this.node.active = true
                    this.node.opacity = 0
                }
                this.node.runAction(cc.fadeIn(.5))

                // 炫光动画
                this.glow.runAction(cc.repeatForever(cc.rotateBy(3, 360)))

                //是否登录
                if (this.main.user.phone) {
                    this.loginBtn.active = false
                } else {
                    this.loginBtn.active = true
                }
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
    }

})
