export default {
    phone: null,
    balance: 0,
    avatar: null,
    nickname: null,
    _main: null,

    get main() {
        if (!this._main) {
            this._main = cc.director.getScene()
            .getChildByName('main').getComponent('main')
            return this._main
        }
        return this._main
    },

    update() {

        this.main.api.getUserInfo()
        .then(res => {
            if (res.data.ok) {
                this.nickname = res.data.r.nickname
                this.balance = res.data.r.balance
                this.phone = res.data.r.phone
                this.avatar = res.data.r.profileImg

                this.main.game.score.getComponent(cc.Label)
                    .string = this.balance
            }
        })

    }
}
