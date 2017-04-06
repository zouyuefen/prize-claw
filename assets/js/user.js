export default {
    phone: null,
    balance: 0,
    avatar: null,
    nickname: null,

    update() {

        window._main.api.getUserInfo()
        .then(res => {
            if (res.data.ok) {
                this.nickname = res.data.r.nickname
                this.balance = res.data.r.balance
                this.phone = res.data.r.phone
                this.avatar = res.data.r.profileImg

                window._main.game.score.getComponent(cc.Label)
                    .string = this.balance
            }
        })

    }
}
