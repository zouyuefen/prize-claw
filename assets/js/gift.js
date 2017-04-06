export default cc.Class({
    extends: cc.Component,
    properties: {
        prefabs: {
            default: [],
            type: cc.Prefab
        }
    },

    init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene()
            .getChildByName('main').getComponent('main')



        // 上一个添加的 gift
        this.last = null

        /*
        * gift pool
        * 每种 gift 对应一个 pool
        */
        this.pool = this.prefabs.map(item => cc.instantiate(item))

        // 预定义 action
        this.actions = {
            move: cc.moveBy(5, 888, 0)
        }


    },

    getItem() {
        if (this.pool.length) {
            return this.pool.splice(~~(Math.random() * this.pool.length), 1)[0]
        } else return null
    },

    putItem(item) {
        item.stopAllActions()
        item.removeFromParent()
        this.pool.push(item)
    },

    /*
    * @param {array} goodsList
    */
    build(list) {
        const _pool = this.pool.concat(this.main.game.node.children.filter(item => {
            if (item.name === 'gift') {
                // item.stopAllActions()
                return true
            }
        }))

        /*
        * 遍历 list
        * 最终 pool 的个数以 list 为准
        */
        let i = 0

        const load = () => {
            const item = list[i]
            let gift = _pool[i]
            if (!gift) {
                gift = cc.instantiate(this.prefabs[0])
                this.putItem(gift)

            }

            // 判断奖品类型
            if (item.type === 0) {
                gift.getChildByName('text')
                    .getComponent(cc.Label).string = item.name.match(/\d+/)[0]
            } else {
                gift.getChildByName('text')
                    .getComponent(cc.Label).string = ''
            }

            gift._goodsId = item.id

            const sprite = gift.getComponent(cc.Sprite)
            cc.loader.load(item.img, (err, texture) => {
                if (err) console.log(err)
                else sprite.spriteFrame = new cc.SpriteFrame(texture)
                if (++i < list.length) load()
            })
        }
        load()
    },

    /*
    * 添加 gift
    * 默认位置 屏幕左侧
    * @param {number} x: -441
    * @param {number} y: -250
    */
    add(x=-441, y=-250) {
        /*
        * 默认情况下
        * 展示奖品
        */
        const
            i = ~~(Math.random() * this.prefabs.length),
            _this = this
        this.last = this.getItem() || cc.instantiate(this.prefabs[i])
        this.last.stopAllActions()

        this.node.parent.getChildByName('game')
            .addChild(this.last)
        this.last.name = 'gift'
        this.last.x = x
        this.last.y = y
        this.last.scale = 1
        this.last.zIndex = 2
        this.last.rotation = 0
        this.last._typeIndex = i

        this.last.runAction(cc.sequence(
            this.actions.move.clone(),
            cc.callFunc(function() {
                _this.putItem(this)
            }, this.last)
        ))
    },



    check() {
        if (this.last && this.last.x > -182) this.add()
    },

    update() {
        this.check()
    },

    onLoad() {
        this.init()
        this.add()
    }
})
