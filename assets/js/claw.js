export default cc.Class({
    extends: cc.Component,
    properties: {
        left: {
            default: null,
            type: cc.Node
        },
        right: {
            default: null,
            type: cc.Node
        },
        rope: {
            default: null,
            type: cc.Node
        },
        body: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        this.init()
    },

    setModel(i) {
        if (i === 3) {
            this.rope.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRopeGold
            this.body.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawBodyGold
            this.left.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawLeftGold
            this.right.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRightGold
        } else {
            this.rope.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRopeNormal
            this.body.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawBodyNormal
            this.left.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawLeftNormal
            this.right.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRightNormal
        }
    },

    init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene()
            .getChildByName('main').getComponent('main')

        // 定义动作
        this.actions = {
            rotate: cc.rotateBy(.1, 56),
            move: cc.moveBy(.3, 0, -440),
            up: cc.moveBy(.6, 0, 440),
            scale: cc.scaleBy(.3, .5),
            flop: cc.spawn(
                cc.rotateBy(.8, 360).repeatForever(),
                cc.moveBy(.8, 0, -500),
                cc.scaleBy(.8, 1.5)
            )
        }

        // 爪子状态
        this.state = 'free'

        // 爪子初始高度
        this.y = 377

        // 绳子初始长度
        this.ropeHeight = 120

        // 是否抓住
        this.catched = false

        // 抓取的 gift
        this.gift = null

        // 抓取动画
        this.catchAnimated = false

        // 接口请求状态
        this.wait = false

        // 抓取结果
        this.results = null
    },

    grab(func) {
        if (this.state !== 'fall') return
        this.state = 'grab'
        this.left.runAction(this.actions.rotate.reverse())
        this.right.runAction(cc.sequence(
            this.actions.rotate,
            cc.callFunc(func)
        ))

    },

    free() {
        if (this.state !== 'rise') return
        this.state = 'free'
        this.left.runAction(this.actions.rotate)
        this.right.runAction(this.actions.rotate.reverse())
        this.catched =
        this.catchAnimated = false
    },

    fall() {
        if (this.state !== 'free') return
        this.state = 'fall'
        this.node.runAction(cc.sequence(
            this.actions.move,
            cc.callFunc(() => {
                this.grab(this.rise.bind(this))
            })
        ))
    },

    rise() {
        if (this.state !== 'grab') return
        this.state = 'rise'
        this.node.runAction(cc.sequence(
            this.actions.up,
            cc.callFunc(() => {
                if (this.catched) {
                    if (!this.results) {
                        this.gift.zIndex = 0
                        this.lose()
                    } else {
                        // 重置 gift zIndex < pit-around
                        if (this.results.grabResultInt === 2) {
                            this.gift.zIndex = 0
                            this.lose()
                            this.main.game.showResult(this.results)
                        } else if (this.results.grabResultInt === 3) {
                            this.win()

                            if (this.results.goods.type === 0) {
                                this.main.game.showResult(this.results)
                            } else {
                                // 抓到实物的效果
                                this.main.game.prompt.show(this.results.goods.img)
                            }
                        }

                    }

                } else {
                    this.free()
                    /*
                    * 请求抓取处理接口
                    */
                    this.wait = true
                    this.main.api.grab(null, this.main.game.matchId)
                    .then(res => {
                        this.wait = false
                        if (res.data.ok) this.results = res.data.r
                        else this.results = null
                        this.main.user.update()
                    }).catch(err => {
                        this.wait = false
                        this.results = null
                        this.main.user.update()
                    })
                }
            })
        ))
    },

    random() {
        return ~~(Math.random() * 10)
    },

    win() {
        this.main.gift.putItem(this.gift)
        this.free()
    },

    lose() {
        /*
        * 掉落
        */
        this.free()
        // 此时要重置 state 为非 free 状态
        this.state = 'rise'
        // 清除 gift action
        this.gift.stopAllActions()
        this.gift.runAction(cc.sequence(
            this.actions.flop,
            cc.callFunc(() => {
                this.main.gift.putItem(this.gift)
                this.state = 'free'
            })
        ))
    },

    catchAnimate() {
        if (this.catchAnimated) return
        this.catchAnimated = true
        this.gift.stopAllActions()
        this.gift.runAction(this.actions.scale)
        this.main.audio.catched.play()

        /*
        * 请求抓取处理接口
        */
        this.wait = true
        this.main.api.grab(this.gift._goodsId, this.main.game.matchId)
        .then(res => {
            this.wait = false
            if (res.data.ok) this.results = res.data.r
            else this.results = null
            this.main.user.update()
        }).catch(err => {
            this.wait = false
            this.results = null
            this.main.user.update()
        })
    },

    update() {
        // console.log(
            // this.node.convertToWorldSpace(0, 0)
        // )
        this.rope.height = this.ropeHeight + this.y - this.node.y

        if (this.catched) {
            this.catchAnimate()
            this.gift.x = this.node.x
            this.gift.y = this.node.y - 100
        }
    }

})
