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
        window._main.api.monitor('进入游戏', 1);
    },
    init: function init() {

        // 坑下围 zIndex < gift.zIndex
        this.pitAround.zIndex = 1;

        // 场次id
        this.matchId = null;

        // 隐藏结果提示框
        this.result.active = false;

        // 隐藏获奖记录
        window._main.record.node.active = false;

        // 设置边框的 zIndex
        this.border.zIndex = 3;

        // 按钮 zIndex
        this.stakeLayout.zIndex = this.startBtn.zIndex = 3;

        // 设置下注按钮 zIndex
        this.stake.zIndex = 3;

        // 下注值
        this.stakeValue = null;

        // 获取场次
        this.getModelList();
    },
    setMatch: function setMatch(index, id) {
        var btn = this.stakeBtns[index];

        btn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.stakeBtnPress;

        var text = btn.getChildByName('text');
        text.stopAllActions();
        text.runAction(cc.jumpTo(1, 0, 9, 10, 3));

        // 设置 当前下注值
        this.setStake(index);

        // 设置 当前场次 id
        this.matchId = id;

        this.getPrizeList();
    },
    setStake: function setStake(val) {
        switch (val) {
            case 1:
                this.stake.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.matchM;
                break;
            case 2:
                this.stake.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.matchL;
                break;
            default:
                this.stake.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.matchS;
                break;
        }
    },


    // 获取可玩场次
    getModelList: function getModelList() {
        var _this = this;

        window._main.api.getModelList().then(function (res) {
            if (res.data.ok) {

                res.data.r.forEach(function (item, i) {
                    _this.stakeBtns[i].active = true;
                    _this.stakeBtns[i].getChildByName('text').getComponent(cc.Label).string = item.name;

                    _this.stakeBtns[i]._matchId = item.id;
                    _this.stakeBtns[i]._openState = item.openState;
                    _this.stakeBtns[i]._value = item.goldExpend;

                    // 非开放状态
                    if (!item.openState) {
                        _this.stakeBtns[i].getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.stakeBtnDisable;
                    } else if (_this.stakeValue === null) {
                        _this.stakeValue = item.goldExpend;
                        _this.setMatch(i, item.id);
                    }
                });
            }
        });
    },


    // 获取奖品列表
    getPrizeList: function getPrizeList() {
        window._main.api.getPrizeList(this.matchId).then(function (res) {
            if (res.data.ok) {
                window._main.gift.build(res.data.r);
            }
        });
    },
    showResult: function showResult(results) {
        var _this2 = this;

        if (results.grabResultInt === 3) {
            this.result.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('image/game/result-win', cc.SpriteFrame);
        } else {
            this.result.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('image/game/result-fail', cc.SpriteFrame);
        }

        this.result.active = true;
        this.result.getChildByName('text').getComponent(cc.Label).string = results.grabResultStr;
        this.result.runAction(cc.sequence(cc.jumpBy(.5, 0, 0, 10, 3), cc.callFunc(function () {
            setTimeout(function () {
                _this2.result.active = false;
            }, 1000);
        })));
    },
    listen: function listen() {
        var _this3 = this;

        // 开始按钮
        this.startBtn.on(cc.Node.EventType.TOUCH_START, function () {
            window._main.audio.clickStart.play();
            _this3.startBtn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.startBtnPress;
        });
        this.startBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this3.startBtn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.startBtnNormal;
            if (_this3.matchId === null) alert('请先下注');else if (window._main.user.balance < _this3.stakeValue) {
                window._main.shop.show();
            } else _this3.claw.fall();

            window._main.api.monitor('开始按钮', 6);
        });

        // 下注按钮
        this.stakeBtns.forEach(function (btn, index) {
            btn._index = index;
            btn.on(cc.Node.EventType.TOUCH_START, function (event) {

                // 禁选
                if (!btn._openState) {
                    event.stopPropagation();
                    return;
                }

                var val = btn._value;
                if (val > window._main.user.balance) {
                    window._main.shop.show();
                    return;
                }
                _this3.stakeValue = val;

                _this3.stakeBtns.forEach(function (btn) {
                    if (btn._openState) {
                        btn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.stakeBtnNormal;
                    } else {
                        btn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.stakeBtnDisable;
                    }
                    // 移除其他特效
                    btn.getChildByName('text').stopAllActions();
                    btn.getChildByName('text').runAction(cc.moveTo(0, 0, 18));
                });

                btn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.stakeBtnPress;

                var text = btn.getChildByName('text');

                text.stopAllActions();
                text.runAction(cc.jumpTo(1, 0, 9, 10, 3));

                // 下注
                _this3.setStake(btn._index);

                switch (btn._index) {
                    case 0:
                        window._main.api.monitor('500场', 3);
                        break;
                    case 1:
                        window._main.api.monitor('1000场', 4);
                        break;
                    case 2:
                        window._main.api.monitor('2000场', 5);
                        break;
                }

                // 设置 当前场次 id
                _this3.matchId = btn._matchId;

                // 获取奖品列表
                _this3.getPrizeList();

                /*
                * 高级场切换
                */
                _this3.claw.setModel(_this3.matchId);
            });
        });

        // 规则按钮
        this.ruleBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this3.ruleBtn.scale = .95;
        });
        this.ruleBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this3.ruleBtn.scale = 1;
            _this3.rule.show();
        });

        // giftBtn
        this.giftBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this3.giftBtn.scale = .95;
        });
        this.giftBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this3.giftBtn.scale = 1;
            window._main.record.show();
        });

        // addBtn
        this.addBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this3.addBtn.scale = .95;
        });
        this.addBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this3.addBtn.scale = 1;
            window._main.shop.show();
        });
    }
});

cc._RFpop();