"use strict";
cc._RFpush(module, 'd1fdcYeYzFIcpkTKkk9ibh4', 'user');
// js\user.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    phone: null,
    balance: 0,
    avatar: null,
    nickname: null,
    starsNum: 0,

    update: function update() {
        var _this = this;

        window._main.api.getUserInfo().then(function (res) {
            if (res.data.ok) {
                _this.nickname = res.data.r.nickname;
                _this.balance = res.data.r.balance;
                _this.phone = res.data.r.phone;
                _this.avatar = res.data.r.profileImg;
                _this.starsNum = res.data.r.starsNum;

                window._main.game.updateStars();

                window._main.game.score.getComponent(cc.Label).string = _this.balance;
            }
        });
    }
};

cc._RFpop();