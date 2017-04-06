'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    phone: null,
    balance: 0,
    avatar: null,
    nickname: null,
    _main: null,

    get main() {
        if (!this._main) {
            this._main = cc.director.getScene().getChildByName('main').getComponent('main');
            return this._main;
        }
        return this._main;
    },

    update: function update() {
        var _this = this;

        this.main.api.getUserInfo().then(function (res) {
            if (res.data.ok) {
                _this.nickname = res.data.r.nickname;
                _this.balance = res.data.r.balance;
                _this.phone = res.data.r.phone;
                _this.avatar = res.data.r.profileImg;

                _this.main.game.score.getComponent(cc.Label).string = _this.balance;
            }
        });
    }
};