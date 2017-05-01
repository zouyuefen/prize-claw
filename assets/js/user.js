export default {
    phone: null,
    balance: 0,
    avatar: null,
    nickname: null,
    starsNum: 0,

    update() {

        window._main.api.getUserInfo()
        .then(res => {
            if (res.data.ok) {
                this.nickname = res.data.r.nickname
                this.balance = res.data.r.balance
                this.phone = res.data.r.phone
                this.avatar = res.data.r.profileImg
                this.starsNum = res.data.r.starsNum

                window._main.game.updateStars()

                window._main.game.score.getComponent(cc.Label)
                    .string = this.balance
            }
        })

    }
}
