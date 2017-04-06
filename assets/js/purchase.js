cc.Class({
    extends: cc.Component,

    onLoad() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene()
            .getChildByName('main').getComponent('main')

        // this.listen()

        console.log(this.name)

    },

    onEnable() {
        console.log(this.name)
    },

    listen() {
        this.node.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.node.scale = .95
            }
        )
        this.node.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.node.scale = 1
                this.main.api.purchase(this.node.__goodsId)
                .then(res => {
                    console.log(res)
                })
            }
        )
    }
})
