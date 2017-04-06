import Claw from 'claw'
import Rule from 'rule'
import Prompt from 'prompt'

export default cc.Class({
    extends: cc.Component,
    properties: {
        startBtn: {
            default: null,
            type: cc.Node
        },
        border: {
            default: null,
            type: cc.Node
        },
        pitAround: {
            default: null,
            type: cc.Node
        },
        stakeLayout: {
            default: null,
            type: cc.Node
        },
        stakeBtns: {
            default: [],
            type: cc.Node
        },
        ruleBtn: {
            default: null,
            type: cc.Node
        },
        addBtn: {
            default: null,
            type: cc.Node
        },
        giftBtn: {
            default: null,
            type: cc.Node
        },
        claw: {
            default: null,
            type: Claw
        },
        rule: {
            default: null,
            type: Rule
        },
        prompt: {
            default: null,
            type: Prompt
        },
        stake: {
            default: null,
            type: cc.Node
        },
        result: {
            default: null,
            type: cc.Node
        },
        score: {
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
        this.main = this.node.parent.getComponent('main')

        // 坑下围 zIndex < gift.zIndex
        this.pitAround.zIndex = 1

        // 场次id
        this.matchId = null



        // 隐藏结果提示框
        this.result.active = false

        // 隐藏获奖记录
        this.main.record.node.active = false

        // 设置边框的 zIndex
        this.border.zIndex = 3

        // 按钮 zIndex
        this.stakeLayout.zIndex =
        this.startBtn.zIndex = 3

        // 设置下注按钮 zIndex
        this.stake.zIndex = 3

        // 下注值
        this.stakeValue = null

        // 获取场次
        this.getModelList()

    },

    setMatch(index, id) {
        const btn = this.stakeBtns[0]

        btn.getComponent(cc.Sprite).spriteFrame =
            this.main.spriteFrames.stakeBtnPress

        const text = btn.getChildByName('text')


        text.stopAllActions()
        text.runAction(cc.jumpTo(1, 0, 9, 10, 3))

        // 设置 当前下注值
        this.setStake(index)

        // 设置 当前场次 id
        this.matchId = id

    },

    setStake(val) {
        switch (val) {
            case 1:
                this.stake.getComponent(cc.Sprite).spriteFrame =
                    this.main.spriteFrames.matchM
                break
            case 2:
                this.stake.getComponent(cc.Sprite).spriteFrame =
                    this.main.spriteFrames.matchL
                break
            default:
                this.stake.getComponent(cc.Sprite).spriteFrame =
                    this.main.spriteFrames.matchS
                break
        }
    },

    // 获取可玩场次
    getModelList() {
        this.main.api.getModelList()
        .then(res => {
            if (res.data.ok) {

                res.data.r.forEach((item, i) => {
                    this.stakeBtns[i].active = true
                    this.stakeBtns[i].getChildByName('text')
                        .getComponent(cc.Label).string = item.name

                    this.stakeBtns[i]._matchId = item.id
                    this.stakeBtns[i]._openState = item.openState
                    this.stakeBtns[i]._value = item.goldExpend

                    // 非开放状态
                    if (!item.openState) {

                    } else if (this.stakeValue === null) {
                        this.stakeValue = item.goldExpend
                        this.setStake(i, item.id)
                    }
                })
            }
        })
    },

    // 获取奖品列表
    getPrizeList() {
        this.main.api.getPrizeList(this.matchId)
        .then(res => {
            if (res.data.ok) {
                this.main.gift.build(res.data.r)
            }
        })
    },

    showResult(results) {
        if (results.grabResultInt === 3) {
            this.result.getComponent(cc.Sprite)
                .spriteFrame = cc.loader.getRes('image/game/result-win', cc.SpriteFrame)
        } else {
            this.result.getComponent(cc.Sprite)
                .spriteFrame = cc.loader.getRes('image/game/result-fail', cc.SpriteFrame)
        }

        this.result.active = true
        this.result.getChildByName('text')
            .getComponent(cc.Label).string = results.grabResultStr
        this.result.runAction(cc.sequence(
            cc.jumpBy(.5, 0, 0, 10, 3),
            cc.callFunc(() => {
                setTimeout(() => {
                    this.result.active = false
                }, 1000)
            })
        ))


    },

    listen() {
        // 开始按钮
        this.startBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.main.audio.clickStart.play()
                this.startBtn.getComponent(cc.Sprite).spriteFrame =
                    this.main.spriteFrames.startBtnPress
            }
        )
        this.startBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.startBtn.getComponent(cc.Sprite).spriteFrame =
                    this.main.spriteFrames.startBtnNormal
                if (this.matchId === null) alert('请先下注')
                else if (this.main.user.balance < this.stakeValue) {
                    this.main.shop.show()
                }
                else this.claw.fall()
            }
        )

        // 下注按钮
        this.stakeBtns.forEach((btn, index) => {
            btn._index = index
            btn.on(
                cc.Node.EventType.TOUCH_START,
                event => {

                    // 禁选
                    if (!btn._openState) {
                        event.stopPropagation()
                        return
                    }

                    const val = btn._value
                    if (val > this.main.user.balance) {
                        this.main.shop.show()
                        return
                    }
                    this.stakeValue = val

                    this.stakeBtns.forEach(btn => {
                        btn.getComponent(cc.Sprite).spriteFrame =
                            this.main.spriteFrames.stakeBtnNormal
                        // 移除其他特效
                        btn.getChildByName('text')
                            .stopAllActions()
                        btn.getChildByName('text')
                            .runAction(cc.moveTo(0, 0, 18))

                    })

                    btn.getComponent(cc.Sprite).spriteFrame =
                        this.main.spriteFrames.stakeBtnPress

                    const text = btn.getChildByName('text')


                    text.stopAllActions()
                    text.runAction(cc.jumpTo(1, 0, 9, 10, 3))

                    // 下注
                    this.setStake(btn._index)


                    // 设置 当前场次 id
                    this.matchId = btn._matchId

                    // 获取奖品列表
                    this.getPrizeList()

                    /*
                    * 高级场切换
                    */
                    this.claw.setModel(this.matchId)
                }
            )
        })

        // 规则按钮
        this.ruleBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.ruleBtn.scale = .95
            }
        )
        this.ruleBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.ruleBtn.scale = 1
                this.rule.show()
            }
        )

        // giftBtn
        this.giftBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.giftBtn.scale = .95
            }
        )
        this.giftBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.giftBtn.scale = 1
                this.main.record.show()
            }
        )

        // addBtn
        this.addBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.addBtn.scale = .95
            }
        )
        this.addBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.addBtn.scale = 1
                this.main.shop.show()
            }
        )
    }
})
