'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        left: {
            default: null,
            type: cc.Node
        },
        right: {
            default: null,
            type: cc.Node
        },
        rope: {
            default: null,
            type: cc.Node
        },
        body: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.init();
    },
    setModel: function setModel(i) {
        if (i === 3) {
            this.rope.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRopeGold;
            this.body.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawBodyGold;
            this.left.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawLeftGold;
            this.right.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRightGold;
        } else {
            this.rope.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRopeNormal;
            this.body.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawBodyNormal;
            this.left.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawLeftNormal;
            this.right.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.clawRightNormal;
        }
    },
    init: function init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');

        // 定义动作
        this.actions = {
            rotate: cc.rotateBy(.1, 56),
            move: cc.moveBy(.3, 0, -440),
            up: cc.moveBy(.6, 0, 440),
            scale: cc.scaleBy(.3, .5),
            flop: cc.spawn(cc.rotateBy(.8, 360).repeatForever(), cc.moveBy(.8, 0, -500), cc.scaleBy(.8, 1.5))
        };

        // 爪子状态
        this.state = 'free';

        // 爪子初始高度
        this.y = 377;

        // 绳子初始长度
        this.ropeHeight = 120;

        // 是否抓住
        this.catched = false;

        // 抓取的 gift
        this.gift = null;

        // 抓取动画
        this.catchAnimated = false;

        // 接口请求状态
        this.wait = false;

        // 抓取结果
        this.results = null;

        // 等待接口而中止释放操作
        this.pause = false;
    },
    grab: function grab(func) {
        if (this.state !== 'fall') return;
        this.state = 'grab';
        this.left.runAction(this.actions.rotate.reverse());
        this.right.runAction(cc.sequence(this.actions.rotate, cc.callFunc(func)));
    },
    free: function free() {
        if (this.state !== 'rise') return;
        this.state = 'free';
        this.left.runAction(this.actions.rotate);
        this.right.runAction(this.actions.rotate.reverse());
        this.catched = this.catchAnimated = false;
    },
    fall: function fall() {
        var _this = this;

        if (this.state !== 'free') return;
        this.state = 'fall';
        this.node.runAction(cc.sequence(this.actions.move, cc.callFunc(function () {
            _this.grab(_this.rise.bind(_this));
        })));
        window._main.api.monitor('开始按钮', 6);
    },
    over: function over() {
        var _this2 = this;

        // 重置 pause
        this.pause = false;
        if (this.catched) {
            if (!this.results) {
                this.gift.zIndex = 0;
                this.lose();
            } else {
                // 重置 gift zIndex < pit-around
                if (this.results.grabResultInt === 2) {
                    this.gift.zIndex = 0;
                    this.lose();
                    this.main.game.showResult(this.results);
                } else if (this.results.grabResultInt === 3) {
                    this.win();
                    if (this.results.goods.type === 0) {
                        this.main.game.showResult(this.results);
                    } else {
                        // 抓到实物的效果
                        this.main.game.prompt.show(this.results.goods.img);
                    }
                }

                // 5星奖励
                if (this.results.starsGoods) {
                    this.main.game.starPrompt.show(this.results.starsGoods.img);
                }
            }
        } else {
            this.free();
            /*
            * 请求抓取处理接口
            */
            this.wait = true;
            this.main.api.grab(null, this.main.game.matchId).then(function (res) {
                _this2.wait = false;
                if (res.data.r.starsGoods) {
                    _this2.main.game.starPrompt.show(res.data.r.starsGoods.img);
                }
                if (res.data.ok) _this2.results = res.data.r;else _this2.results = null;
                _this2.main.user.update();
                // 5星奖励

            }).catch(function (err) {
                _this2.wait = false;
                _this2.results = null;
                _this2.main.user.update();
            });
        }
    },
    rise: function rise() {
        var _this3 = this;

        if (this.state !== 'grab') return;
        this.state = 'rise';
        this.node.runAction(cc.sequence(this.actions.up, cc.callFunc(function () {
            if (_this3.wait) {
                _this3.pause = true;
            } else _this3.over();
        })));
    },
    random: function random() {
        return ~~(Math.random() * 10);
    },
    win: function win() {
        this.main.gift.putItem(this.gift);
        this.free();
    },
    lose: function lose() {
        var _this4 = this;

        /*
        * 掉落
        */
        this.free();
        // 此时要重置 state 为非 free 状态
        this.state = 'rise';
        // 清除 gift action
        this.gift.stopAllActions();
        this.gift.runAction(cc.sequence(this.actions.flop, cc.callFunc(function () {
            _this4.main.gift.putItem(_this4.gift);
            _this4.state = 'free';
        })));
    },
    catchAnimate: function catchAnimate() {
        var _this5 = this;

        if (this.catchAnimated) return;
        this.catchAnimated = true;
        this.gift.stopAllActions();
        this.gift.runAction(this.actions.scale);
        this.main.audio.catched.play();

        /*
        * 请求抓取处理接口
        */
        this.wait = true;
        this.main.api.grab(this.gift._goodsId, this.main.game.matchId).then(function (res) {
            _this5.wait = false;
            if (res.data.ok) _this5.results = res.data.r;else _this5.results = null;
            _this5.main.user.update();
            if (_this5.pause) _this5.over();
        }).catch(function (err) {
            _this5.wait = false;
            _this5.results = null;
            _this5.main.user.update();
            if (_this5.pause) _this5.over();
        });
    },
    update: function update() {
        // console.log(
        // this.node.convertToWorldSpace(0, 0)
        // )
        this.rope.height = this.ropeHeight + this.y - this.node.y;

        if (this.catched) {
            this.catchAnimate();
            this.gift.x = this.node.x;
            this.gift.y = this.node.y - 100;
        }
    }
});