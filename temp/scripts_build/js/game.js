"use strict";
cc._RFpush(module, 'be740OC+ZdLJbeMsYWW/y50', 'game');
// js\game.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _claw = require('claw');

var _claw2 = _interopRequireDefault(_claw);

var _rule = require('rule');

var _rule2 = _interopRequireDefault(_rule);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        startBtn: {
            default: null,
            type: cc.Node
        },
        border: {
            default: null,
            type: cc.Node
        },
        pitAround: {
            default: null,
            type: cc.Node
        },
        stakeLayout: {
            default: null,
            type: cc.Node
        },
        stakeBtns: {
            default: [],
            type: cc.Node
        },
        ruleBtn: {
            default: null,
            type: cc.Node
        },
        addBtn: {
            default: null,
            type: cc.Node
        },
        giftBtn: {
            default: null,
            type: cc.Node
        },
        claw: {
            default: null,
            type: _claw2.default
        },
        rule: {
            default: null,
            type: _rule2.default
        },
        prompt: {
            default: null,
            type: _prompt2.default
        },
        stake: {
            default: null,
            type: cc.Node
        },
        result: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        this.init();
        this.listen();
    },
    init: function init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = this.node.parent.getComponent('main');

        // 坑下围 zIndex < gift.zIndex
        this.pitAround.zIndex = 1;

        // 场次id
        this.matchId = null;

        // 隐藏结果提示框
        this.result.active = false;

        // 隐藏获奖记录
        this.main.record.node.active = false;

        // 设置边框的 zIndex
        this.border.zIndex = 3;

        // 按钮 zIndex
        this.stakeLayout.zIndex = this.startBtn.zIndex = 3;

        // 设置下注按钮 zIndex
        this.stake.zIndex = 3;

        // 下注金额：默认 500
        this.stakeValue = 500;

        // 设置
        this.setMatch();

        // 获取场次
        this.getModelList();
    },
    setMatch: function setMatch() {
        var btn = this.stakeBtns[0];

        btn.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.stakeBtnPress;

        var text = btn.getChildByName('text');

        text.stopAllActions();
        text.runAction(cc.jumpTo(1, 0, 9, 10, 3));

        // 设置 当前下注值
        this.setStake(0);

        // 设置 当前场次 id
        this.matchId = 1;

        // 获取奖品列表
        this.getPrizeList();
    },
    setStake: function setStake(val) {
        switch (val) {
            case 1:
                this.stake.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.matchM;
                break;
            case 2:
                this.stake.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.matchL;
                break;
            default:
                this.stake.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.matchS;
                break;
        }
        this.stake.getChildByName('stake').getComponent(cc.Label).string = val;
    },


    // 获取可玩场次
    getModelList: function getModelList() {
        var _this = this;

        this.main.api.getModelList().then(function (res) {
            if (res.data.ok) {
                _this.stakeBtns.forEach(function (item) {
                    item.active = false;
                });
                res.data.r.forEach(function (item, i) {
                    _this.stakeBtns[i].active = true;
                    _this.stakeBtns[i].getChildByName('text').getComponent(cc.Label).string = item.name;

                    _this.stakeBtns[i]._matchId = item.id;
                });
            }
        });
    },


    // 获取奖品列表
    getPrizeList: function getPrizeList() {
        var _this2 = this;

        this.main.api.getPrizeList(this.matchId).then(function (res) {
            if (res.data.ok) {
                _this2.main.gift.build(res.data.r);
            }
        });
    },
    showResult: function showResult(results) {
        var _this3 = this;

        if (results.grabResultInt === 3) {
            this.result.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('image/game/result-win', cc.SpriteFrame);
        } else {
            this.result.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('image/game/result-fail', cc.SpriteFrame);
        }

        this.result.active = true;
        this.result.getChildByName('text').getComponent(cc.Label).string = results.grabResultStr;
        this.result.runAction(cc.sequence(cc.jumpBy(.5, 0, 0, 10, 3), cc.callFunc(function () {
            setTimeout(function () {
                _this3.result.active = false;
            }, 1000);
        })));
    },
    listen: function listen() {
        var _this4 = this;

        // 开始按钮
        this.startBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this4.main.audio.clickStart.play();
            _this4.startBtn.getComponent(cc.Sprite).spriteFrame = _this4.main.spriteFrames.startBtnPress;
        });
        this.startBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this4.startBtn.getComponent(cc.Sprite).spriteFrame = _this4.main.spriteFrames.startBtnNormal;
            if (_this4.matchId === null) alert('请先下注');else if (_this4.main.user.balance < _this4.stakeValue) {
                _this4.main.shop.show();
            } else _this4.claw.fall();
        });

        // 下注按钮
        this.stakeBtns.forEach(function (btn, index) {
            btn._index = index;
            btn.on(cc.Node.EventType.TOUCH_START, function () {
                var val = btn.getChildByName('text').getComponent(cc.Label).string;
                if (val > _this4.main.user.balance) {
                    _this4.main.shop.show();
                    return;
                }
                _this4.stakeValue = val;

                _this4.stakeBtns.forEach(function (btn) {
                    btn.getComponent(cc.Sprite).spriteFrame = _this4.main.spriteFrames.stakeBtnNormal;
                    // 移除其他特效
                    btn.getChildByName('text').stopAllActions();
                    btn.getChildByName('text').runAction(cc.moveTo(0, 0, 18));
                });

                btn.getComponent(cc.Sprite).spriteFrame = _this4.main.spriteFrames.stakeBtnPress;

                var text = btn.getChildByName('text');

                text.stopAllActions();
                text.runAction(cc.jumpTo(1, 0, 9, 10, 3));

                // 下注
                _this4.setStake(btn._index);

                // 设置 当前场次 id
                _this4.matchId = btn._matchId;

                // 获取奖品列表
                _this4.getPrizeList();

                /*
                * 高级场切换
                */
                _this4.claw.setModel(_this4.matchId);
            });
        });

        // 规则按钮
        this.ruleBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this4.ruleBtn.scale = .95;
        });
        this.ruleBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this4.ruleBtn.scale = 1;
            _this4.rule.show();
        });

        // giftBtn
        this.giftBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this4.giftBtn.scale = .95;
        });
        this.giftBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this4.giftBtn.scale = 1;
            _this4.main.record.show();
        });

        // addBtn
        this.addBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this4.addBtn.scale = .95;
        });
        this.addBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this4.addBtn.scale = 1;
            _this4.main.shop.show();
        });
    }
});

cc._RFpop();