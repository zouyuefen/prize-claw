export default cc.Class({
    extends: cc.Component,

    properties: {
        phone: {
            default: null,
            type: cc.Node
        },
        code: {
            default: null,
            type: cc.Node
        },

        codeBtn: {
            default: null,
            type: cc.Node
        },

        submit: {
            default: null,
            type: cc.Node
        },

        mask: {
            default: null,
            type: cc.Node
        },

        spirteFrames: {
            default: [],
            type: cc.SpriteFrame
        },

        close: {
            default: null,
            type: cc.Node
        },

        codeBtnText: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function () {
        this.init()
        this.listen()
    },

    init() {
        this.main = cc.director.getScene()
            .getChildByName('main').getComponent('main')

        // 网络请求状态
        this.state = {
            wait: false,
            time: 0
        }

        this.phoneInput = this.phone.getComponent(cc.EditBox)
        this.codeInput = this.code.getComponent(cc.EditBox)
        this.main.shop.node.zIndex = 1
    },

    countDown() {
        this.state.time--
        this.codeBtnText.string = this.state.time.toString() + 's'
        if (this.state.time === 0) {
            this.codeReset()
            return
        }
        setTimeout(() => {
            this.countDown()
        }, 1000)
    },

    codeReset() {
        this.codeBtn.getComponent(cc.Sprite).spriteFrame =
            this.spirteFrames[0]
        this.codeBtnText.string = '获取验证码'
    },

    listen() {
        this.mask.on(
            cc.Node.EventType.TOUCH_START,
            event => {
                event.stopPropagation()
            }
        )

        /*
        * 手机号输入事件监听
        * 替换非数字字符为空
        */

        this.phone.on('text-changed',
            () => {
                this.phoneInput.string = this.phoneInput.string.replace(/\D/g, '')
            }
        )

        /*
        * 验证码输入事件监听
        * 替换非数字字符为空
        */

        this.code.on('text-changed',
            () => {
                this.codeInput.string = this.codeInput.string.replace(/\D/g, '')
            }
        )

        /*
        * 验证码按钮监听
        */
        this.codeBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.codeBtn.scale = .95
            }
        )

        this.codeBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.codeBtn.scale = 1
                if (this.state.wait) return
                if (this.state.time) return

                this.state.wait = true

                this.main.api.getCaptcha(this.phoneInput.string)
                .then(res => {
                    if (res.data.ok) {
                        // 启动倒计时
                        this.state.time = 60
                        this.countDown()

                        this.codeBtn.getComponent(cc.Sprite).spriteFrame =
                            this.spirteFrames[1]
                    } else {
                        alert(res.data.m)
                    }
                    this.state.wait = false
                })

            }
        )


        /*
        * 提交按钮
        */
        this.submit.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.submit.scale = .95
            }
        )

        this.submit.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.submit.scale = 1

                this.main.api.bindPhone(
                    this.phoneInput.string,
                    this.codeInput.string
                ).then(res => {
                    if (res.data.ok) {
                        this.main.user.phone = this.phoneInput.string
                        this.hide()
                        this.codeInput.string = ''
                        this.phoneInput.string = ''
                    } else {
                        alert(res.data.m)
                    }
                })
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
