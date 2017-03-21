cc.Class({
    extends: cc.Component,

    properties: {
        startBtn: {
            default: null,
            type: cc.Node
        },
        stakeBtns: {
            default: [],
            type: cc.Node
        },
        cats: {
            default: [],
            type: cc.Node
        },
        spirteFrames: {
            default: [],
            type: cc.SpriteFrame
        },
        stakes: {
            default: {}
        }
    },


    // use this for initialization


    onLoad: function () {
        // 填充背景色
        document.querySelector('body').style.backgroundColor = '#963bce'

        this.startBtn.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.startBtn.scale = .95
            }
        )

        this.startBtn.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.startBtn.scale = 1
            }
        )

        this.stakeBtns.forEach(btn => {
            btn.on(
                cc.Node.EventType.TOUCH_START,
                () => {
                    this.stakeBtns.forEach(btn => {
                        btn.getComponent(cc.Sprite).spriteFrame =
                            this.spirteFrames[0]
                    })
                    btn.getComponent(cc.Sprite).spriteFrame =
                        this.spirteFrames[1]
                }
            )
        })
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.cats.forEach(cat => {
            cat.x++
            if (cat.x > (cc.winSize.width + cat.width)* .5) {
                cat.x = -(cc.winSize.width + cat.width) * .5
            }

        })
    },
});
