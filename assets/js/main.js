import Game from 'game'
import Shop from 'shop'
import Audio from 'audio'
import Record from 'record'
import Login from 'login'
import api from 'api'
import user from 'user'


const addScript = uri => {
    const script = document.createElement('script')
    document.body.appendChild(script)
    script.src = uri
    return {
        then(func) {
            func ? script.onload = func : null
        }
    }

}

addScript('//cdn.yoosh.tv/js/axios.min.js')
.then(() => {
    axios.defaults.withCredentials = true
})


if (location.search.includes('alpha')) {
    addScript('//cdn.yoosh.tv/js/eruda.min.js')
    .then(() => eruda.init())
}





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

        this.game.node.active = false

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
                            user.starsNum = res.data.r.starsNum
                            this.user = user

                            this.game.score.getComponent(cc.Label)
                                .string = user.balance

                            this.game.node.active = true
                            this.game.updateStars()
                        }
                    })
                } else api.authorize()
            } else {
                user.nickname = res.data.r.nickname
                user.balance = res.data.r.balance
                user.phone = res.data.r.phone
                user.avatar = res.data.r.profileImg
                user.starsNum = res.data.r.starsNum

                this.user = user

                this.game.score.getComponent(cc.Label)
                    .string = user.balance

                this.game.node.active = true
                this.game.updateStars()
                
            }
        })
    }
})
