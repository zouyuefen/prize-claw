import Game from 'game'
import Shop from 'shop'
import Audio from 'audio'
import Record from 'record'
import Login from 'login'
import api from 'api'
import user from 'user'


const script = document.createElement('script')
document.body.appendChild(script)
script.onload = function() {
    axios.defaults.withCredentials = true
}
script.src = '//cdn.yoosh.tv/js/axios.min.js'




const openCollision = () => {
    const manager = cc.director.getCollisionManager()
    manager.enabled = true

    /*
    * 开启 debug 模式
    * 正式环境下关闭
    */
    if (location.port === '7456') {
        manager.enabledDebugDraw = true
    }
}


cc.Class({
    extends: cc.Component,
    properties: {
        game: {
            default: null,
            type: Game
        },
        shop: {
            default: null,
            type: Shop
        },
        audio: {
            default: null,
            type: Audio
        },
        record: {
            default: null,
            type: Record
        },
        login: {
            default: null,
            type: Login
        }
    },
    onLoad() {
        // 开启碰撞检测
        openCollision()

        window._main = this

        //
        this.gift = this.node.getChildByName('game')
            .getComponent('gift')

        this.api = api

        this.spriteFrames = this.node.getComponent('spriteFrame')

        api.getUserInfo()
        .then(res => {
            if (!res.data.ok) {
                const code = api.getParam('code')
                if (code) {
                    api.login(code)
                    .then(res => {
                        if (res.data.ok) {
                            user.nickname = res.data.r.nickname
                            user.balance = res.data.r.balance
                            user.phone = res.data.r.phone
                            user.avatar = res.data.r.profileImg
                            this.user = user

                            this.game.score.getComponent(cc.Label)
                                .string = user.balance
                        }
                    })
                } else api.authorize()
            } else {
                user.nickname = res.data.r.nickname
                user.balance = res.data.r.balance
                user.phone = res.data.r.phone
                user.avatar = res.data.r.profileImg
                this.user = user

                this.game.score.getComponent(cc.Label)
                    .string = user.balance
            }
        })

    }
})
