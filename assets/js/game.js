import Claw from 'claw'
import Rule from 'rule'
import Prompt from 'prompt'
import starPrompt from 'starPrompt'

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
        },
        scoreBkg: {
            default: null,
            type: cc.Node
        },
        voice: {
            default: null,
            type: cc.Node
        },
        activityBox: {
            default: null,
            type: cc.Node
        },
        starBox: {
            default: null,
            type: cc.Node
        },
        qMark: {
            default: null,
            type: cc.Node
        },
        starResultTip: {
            default: null,
            type: cc.Node
        },
        starPrompt: {
            default: null,
            type: starPrompt
        },
        broadcast: {
            default: null,
            type: cc.Node
        }
    },
    onLoad() {
        this.init()
        this.listen()
        window._main.api.monitor('进入游戏', 1)
        window._main.api.onEvent('进入游戏')

        // 循环广播
        this.getBroadcast()
        setInterval(() => {
            this.getBroadcast()
        }, 3e4)
    },

    getBroadcast() {
        const template = '<color=#ffffff>恭喜{}</color>\n<color=#ffffff>获得</color><color=#ffe35b>{}</color>'
        window._main.api.broadcast()
        .then(res => {
            if (res.data.ok && res.data.r.length) {
                this.messages = res.data.r
                this.messageIndex = 0
                this.broadcast.parent.opacity = 255
                if (!this.broadcast.parent.active) {
                    this.broadcast.parent.active = true
                    this.broadcastAnimate()
                    this.broadcast.children.forEach((child, i) => {
                        if (this.messages[this.messageIndex]) {
                            const label = child.getComponent(cc.RichText)
                            label.string = template.replace(/\{\}/g, (x, y) => {
                                if (y === 17) {
                                    return this.messages[this.messageIndex].phone ||
                                        this.messages[this.messageIndex].name
                                }
                                if (y === 68) return this.messages[this.messageIndex].goodsName
                            })
                            this.messageIndex++
                            i === 0 ? child.y = 0 : child.y = -100
                        }
                    })
                }
            }
        })
    },
    // 广播循环动画
    broadcastAnimate() {
        const 
            _this = this,
            template = '<color=#ffffff>恭喜{}</color>\n<color=#ffffff>获得</color><color=#ffe35b>{}</color>'
        const tid = setInterval(() => {
            if (this.messages.length === 1) {
                window.clearInterval(tid)
                _this.broadcast.parent.active = false
            }
            this.broadcast.children.forEach(child => {
                child.runAction(cc.sequence(
                    cc.moveBy(.5, 0, 100),
                    cc.callFunc(function() {
                        if (this.y > 50) {
                            if (_this.messageIndex === _this.messages.length) {
                                setTimeout(function() {
                                    _this.broadcast.parent.active = false
                                    window.clearInterval(tid)
                                }, 2000)
                                return
                            }
                            this.y = -100
                            const label = this.getComponent(cc.RichText)
                            label.string = template.replace(/\{\}/g, function(x, y) {
                                if (y === 17) {
                                    return _this.messages[_this.messageIndex].phone ||
                                        _this.messages[_this.messageIndex].name
                                }
                                if (y === 68) return _this.messages[_this.messageIndex].goodsName 
                            })
                            _this.messageIndex++
                        }
                    }, child)
                ))
            })
        }, 3e3)
    },
    init() {

        window._main.audio.bgm.play()
        //
        this.bgm = window._main.audio.bgm.isPlaying

        this.voice.getComponent(cc.Sprite).spriteFrame = this.bgm ? 
            window._main.spriteFrames.voiceOn : window._main.spriteFrames.voiceClose

        // 坑下围 zIndex < gift.zIndex
        this.pitAround.zIndex = 1

        // 场次id
        this.matchId = null



        // 隐藏结果提示框
        this.result.active = false

        // 隐藏获奖记录
        window._main.record.node.active = false

        // 设置边框的 zIndex
        this.border.zIndex = 3

        // 按钮 zIndex
        this.stakeLayout.zIndex =
        this.startBtn.zIndex = 3

        this.stake.zIndex = 3

        // 设置音效按钮 zIndex
        this.voice.zIndex = 3

        // 下注值
        this.stakeValue = null

        // 获取场次
        // this.getModelList()
        this.matchId = 4

        this.getPrizeList()

    },

    setMatch(index, id) {
        const btn = this.stakeBtns[index]

        btn.getComponent(cc.Sprite).spriteFrame =
            window._main.spriteFrames.stakeBtnPress

        const text = btn.getChildByName('text')
        text.stopAllActions()
        text.runAction(cc.jumpTo(1, 0, 9, 10, 3))

        // 设置 当前下注值
        this.setStake(index)

        // 设置 当前场次 id
        this.matchId = id

        this.getPrizeList()

    },

    setStake(val) {
        switch (val) {
            case 1:
                this.stake.getComponent(cc.Sprite).spriteFrame =
                    window._main.spriteFrames.matchM
                break
            case 2:
                this.stake.getComponent(cc.Sprite).spriteFrame =
                    window._main.spriteFrames.matchL
                break
            default:
                this.stake.getComponent(cc.Sprite).spriteFrame =
                    window._main.spriteFrames.matchS
                break
        }
    },

    // 获取可玩场次
    getModelList() {
        window._main.api.getModelList()
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
                        this.stakeBtns[i].getComponent(cc.Sprite)
                            .spriteFrame = window._main.spriteFrames.stakeBtnDisable
                    } else if (this.stakeValue === null) {
                        this.stakeValue = item.goldExpend
                        this.setMatch(i, item.id)
                    }
                })
            }
        })
    },

    // 获取奖品列表
    getPrizeList() {
        window._main.api.getPrizeList(this.matchId)
        .then(res => {
            if (res.data.ok) {
                window._main.gift.build(res.data.r)
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

        this.starResultTip.active = results.getStars

        this.result.active = true
        this.result.getChildByName('list').getChildByName('text')
            .getComponent(cc.Label).string = results.grabResultStr
        this.result.runAction(cc.sequence(
            cc.jumpBy(.5, 0, 0, 10, 3),
            cc.callFunc(() => {
                setTimeout(() => {
                    this.result.active = false
                    // 5星奖励
                    if (results.starsGoods) {
                        this.starPrompt.show(
                            results.starsGoods.img,
                            results.starsGoods.name
                        )
                    }

                    if (window._main.user.starsNum && !localStorage.getStar) {
                        window._main.node.getChildByName('guide').active = true
                        localStorage.getStar = true
                    }
                    
                }, 1000)
            })
        ))
    },

    update() {
        if (this.bgm && !window._main.audio.bgm.isPlaying) 
            window._main.audio.bgm.play()
    },

    activityBoxShow() {
        this.activityBox.active = true
        setTimeout(() => {
            this.activityBox.active = false
        }, 3000)
    },

    updateStars() {
        this.starBox.children.forEach((star, i) => {
            if (i < window._main.user.starsNum) {
                star.getComponent(cc.Sprite).spriteFrame = 
                    window._main.spriteFrames.starYellow
            } else {
                star.getComponent(cc.Sprite).spriteFrame = 
                    window._main.spriteFrames.starGray
            }
        })
    },

    listen() {
        const _this = this
        // 点击 问号 和 星星
        this.qMark.on(
            cc.Node.EventType.TOUCH_START,
            this.activityBoxShow, this
        )

        this.starBox.on(
            cc.Node.EventType.TOUCH_START,
            this.activityBoxShow, this
        )
        // 音效按钮
        this.voice.on(
            cc.Node.EventType.TOUCH_START,
            function() {
            }
        )
        this.voice.on(
            cc.Node.EventType.TOUCH_END,
            function() {
                _this.bgm ^= 1
                this.getComponent(cc.Sprite).spriteFrame = _this.bgm ? 
                    window._main.spriteFrames.voiceOn : window._main.spriteFrames.voiceClose
                
                _this.bgm ? window._main.audio.bgm.resume() : window._main.audio.bgm.pause()
                
            }
        )
        // 开始按钮
        this.startBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                window._main.audio.clickStart.play()
                this.startBtn.getComponent(cc.Sprite).spriteFrame =
                    window._main.spriteFrames.startBtnPress
            }
        )
        this.startBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.startBtn.getComponent(cc.Sprite).spriteFrame =
                    window._main.spriteFrames.startBtnNormal
                // if (this.matchId === null) alert('请先下注')
                if (window._main.user.balance <= 0) {
                    window._main.shop.show()
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
                    if (val > window._main.user.balance) {
                        window._main.shop.show()
                        return
                    }
                    this.stakeValue = val

                    this.stakeBtns.forEach(btn => {
                        if (btn._openState) {
                            btn.getComponent(cc.Sprite).spriteFrame =
                                window._main.spriteFrames.stakeBtnNormal
                        } else {
                            btn.getComponent(cc.Sprite).spriteFrame =
                                window._main.spriteFrames.stakeBtnDisable
                        }
                        // 移除其他特效
                        btn.getChildByName('text')
                            .stopAllActions()
                        btn.getChildByName('text')
                            .runAction(cc.moveTo(0, 0, 18))

                    })

                    btn.getComponent(cc.Sprite).spriteFrame =
                        window._main.spriteFrames.stakeBtnPress

                    const text = btn.getChildByName('text')


                    text.stopAllActions()
                    text.runAction(cc.jumpTo(1, 0, 9, 10, 3))

                    // 下注
                    this.setStake(btn._index)

                    if (btn._matchId !== this.matchId) {
                        switch(btn._index) {
                            case 0:
                                window._main.api.monitor('500场', 3)
                                break
                            case 1:
                                window._main.api.monitor('1000场', 4)
                                break
                            case 2:
                                window._main.api.monitor('2000场', 5)
                                break
                        }
                    }


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
                window._main.record.show()
            }
        )

        this.scoreBkg.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                window._main.shop.show()
            }
        )
    }
})
