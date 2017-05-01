require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"api":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b2c17zYO6FOkZojtYtxHs8B', 'api');
// js\api.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
* 常量
*/

var APPID = 'wxa95eee48a3ac58c6',
    SERVER = location.host.includes('lab') ? '//lab.yoosh.tv' : location.host.includes('localhost') ? '//lab.yoosh.tv' : '//doll.yoosh.tv';

var Base = {
    getCookie: function getCookie(key) {
        key = key.toString();
        if (!key.length) return;

        var str = document.cookie;
        var start = str.indexOf(key + '='),
            end = void 0;
        if (start === -1) return '';
        start += key.length + 1;
        end = str.indexOf(';', start);
        end === -1 ? end = str.length : null;
        return window.unescape(str.slice(start, end));
    },
    getParam: function getParam(key) {
        var str = location.search,
            start = str.indexOf(key),
            end;

        if (start === -1) return '';
        start += key.length + 1;
        end = str.indexOf('&', start);
        end === -1 ? end = str.length : null;
        return str.slice(start, end);
    }
};

function Api() {

    this.authorize = function () {
        var params = {
            appid: APPID,
            redirect_uri: 'https://game.yoosh.tv/login.html',
            response_type: 'code',
            scope: 'snsapi_base',
            state: location.href
        };

        var querystring = Object.keys(params).map(function (key) {
            return key + '=' + params[key];
        }).join('&');

        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + querystring;
    };

    this.login = function (code) {
        return axios.get(SERVER + '/user/login', {
            params: {
                code: code
            }
        });
    };

    this.getUserInfo = function () {
        return axios.get(SERVER + '/user/getUserInfo');
    };

    this.getModelList = function () {
        return axios.get(SERVER + '/doll/modelList');
    };

    this.getPrizeList = function (id) {
        return axios.get(SERVER + '/doll/prizeList', {
            params: { gameModelId: id }
        });
    };

    this.grab = function (goodsId, matchId) {
        return axios.get(SERVER + '/doll/grab', {
            params: {
                gameModelId: matchId,
                prizeId: goodsId
            }
        });
    };

    this.grabHistory = function () {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        return axios.get(SERVER + '/doll/grabHistory', {
            params: {
                page: page,
                pageSize: pageSize
            }
        });
    };

    this.goodsList = function () {
        return axios.get(SERVER + '/mall/salesGold');
    };

    this.purchase = function (id, callBackUrl, cancelUrl) {
        console.log(id, callBackUrl, cancelUrl);
        return axios.get(SERVER + '/mall/buyGold', {
            params: {
                goldId: id,
                callBackUrl: callBackUrl || '' + location.origin + location.pathname,
                cancelUrl: cancelUrl || '' + location.origin + location.pathname
            }
        });
    };

    this.getCaptcha = function (phone) {
        return axios.get(SERVER + '/user/getCodeByPhone', {
            params: {
                phoneNumber: phone
            }
        });
    };

    this.bindPhone = function (phone, code) {
        return axios.get(SERVER + '/user/bindPhoneByCode', {
            params: {
                phoneNumber: phone,
                code: code
            }
        });
    };

    this.monitor = function (event, eventType) {
        var eventTypeTab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        axios.get(SERVER + '/event/monitor', {
            params: {
                event: event,
                eventType: eventType,
                eventTypeTab: eventTypeTab
            }
        });
    };

    this.onEvent = function () {
        if (window.TDAPP) {
            var _window$TDAPP;

            (_window$TDAPP = window.TDAPP).onEvent.apply(_window$TDAPP, arguments);
        }
    };

    this.broadcast = function () {
        return axios.get(SERVER + '/doll/awardInfo');
    };
}

Api.prototype = Base;

exports.default = new Api();

cc._RFpop();
},{}],"audio":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5f7abhaymJEJZrEK2V9qlpg', 'audio');
// js\audio.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        clickStart: {
            default: null,
            type: cc.AudioSource
        },
        catched: {
            default: null,
            type: cc.AudioSource
        },
        bgm: {
            default: null,
            type: cc.AudioSource
        }
    }
});

cc._RFpop();
},{}],"board":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2d1187nfc9Dnp8T+afYuILI', 'board');
// js\board.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        mask: {
            default: null,
            type: cc.Node
        },

        btn: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.listen();
    },

    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        this.btn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.hide();
        });
    },
    hide: function hide() {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this2.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"claw":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'aaa41fSnSdDIIRRML/1vzDh', 'claw');
// js\claw.js

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
                    _this2.main.game.starPrompt.show(res.data.r.starsGoods.img, res.data.r.starsGoods.name);
                }
                if (window._main.user.starsNum && !localStorage.getStar) {
                    window._main.node.getChildByName('guide').active = true;
                    localStorage.getStar = true;
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

cc._RFpop();
},{}],"collision":[function(require,module,exports){
"use strict";
cc._RFpush(module, '18034riVSlP5pWZgaxovXRH', 'collision');
// js\collision.js

'use strict';

cc.Class({
    extends: cc.Component,

    onCollisionEnter: function onCollisionEnter(other, self) {
        /* 检测爪子状态
        * 非 grab 状态
        * 不作碰撞处理
        */
        if (window._main.game.claw.state !== 'grab') return;
        if (self.node.name === 'left') {
            window._main.game.claw.catched = this.checkLeft(other, self);
        } else if (self.node.name === 'right') {
            window._main.game.claw.catched = this.checkRight(other, self);
        } else console.error('请检查组件名设置');

        if (window._main.game.claw.catched) {
            window._main.game.claw.gift = other.node;
        }
    },
    onCollisionStay: function onCollisionStay(other, self) {},
    checkLeft: function checkLeft(gift, claw) {
        // 转成世界坐标
        var pos = {
            gift: gift.node.convertToWorldSpace(0, 0),
            claw: claw.node.convertToWorldSpace(0, 0)
        };

        var delta = pos.gift.x - pos.claw.x;

        if (delta > 20) return true;
        return false;
    },
    checkRight: function checkRight(gift, claw) {
        // 转成世界坐标
        var pos = {
            gift: gift.node.convertToWorldSpace(0, 0),
            claw: claw.node.convertToWorldSpace(0, 0)
        };

        var delta = pos.claw.x - pos.gift.x;

        if (delta > 10) return true;

        return false;
    }
});

cc._RFpop();
},{}],"game":[function(require,module,exports){
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

var _starPrompt = require('starPrompt');

var _starPrompt2 = _interopRequireDefault(_starPrompt);

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
        },
        scoreBkg: {
            default: null,
            type: cc.Node
        },
        voice: {
            default: null,
            type: cc.Node
        },
        activityBox: {
            default: null,
            type: cc.Node
        },
        starBox: {
            default: null,
            type: cc.Node
        },
        qMark: {
            default: null,
            type: cc.Node
        },
        starResultTip: {
            default: null,
            type: cc.Node
        },
        starPrompt: {
            default: null,
            type: _starPrompt2.default
        },
        broadcast: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        var _this2 = this;

        this.init();
        this.listen();
        window._main.api.monitor('进入游戏', 1);
        window._main.api.onEvent('进入游戏');

        // 循环广播
        this.getBroadcast();
        setInterval(function () {
            _this2.getBroadcast();
        }, 3e4);
    },
    getBroadcast: function getBroadcast() {
        var _this3 = this;

        var template = '<color=#ffffff>恭喜{}</color>\n<color=#ffffff>获得</color><color=#ffe35b>{}</color>';
        window._main.api.broadcast().then(function (res) {
            if (res.data.ok && res.data.r.length) {
                _this3.messages = res.data.r;
                _this3.messageIndex = 0;
                _this3.broadcast.parent.opacity = 255;
                if (!_this3.broadcast.parent.active) {
                    _this3.broadcast.parent.active = true;
                    _this3.broadcastAnimate();
                    _this3.broadcast.children.forEach(function (child, i) {
                        if (_this3.messages[_this3.messageIndex]) {
                            var label = child.getComponent(cc.RichText);
                            label.string = template.replace(/\{\}/g, function (x, y) {
                                if (y === 17) {
                                    return _this3.messages[_this3.messageIndex].phone || _this3.messages[_this3.messageIndex].name;
                                }
                                if (y === 68) return _this3.messages[_this3.messageIndex].goodsName;
                            });
                            _this3.messageIndex++;
                            i === 0 ? child.y = 0 : child.y = -100;
                        }
                    });
                }
            }
        });
    },

    // 广播循环动画
    broadcastAnimate: function broadcastAnimate() {
        var _this4 = this;

        var _this = this,
            template = '<color=#ffffff>恭喜{}</color>\n<color=#ffffff>获得</color><color=#ffe35b>{}</color>';
        var tid = setInterval(function () {
            if (_this4.messages.length === 1) {
                window.clearInterval(tid);
                _this.broadcast.parent.active = false;
            }
            _this4.broadcast.children.forEach(function (child) {
                child.runAction(cc.sequence(cc.moveBy(.5, 0, 100), cc.callFunc(function () {
                    if (this.y > 50) {
                        if (_this.messageIndex === _this.messages.length) {
                            setTimeout(function () {
                                _this.broadcast.parent.active = false;
                                window.clearInterval(tid);
                            }, 2000);
                            return;
                        }
                        this.y = -100;
                        var label = this.getComponent(cc.RichText);
                        label.string = template.replace(/\{\}/g, function (x, y) {
                            if (y === 17) {
                                return _this.messages[_this.messageIndex].phone || _this.messages[_this.messageIndex].name;
                            }
                            if (y === 68) return _this.messages[_this.messageIndex].goodsName;
                        });
                        _this.messageIndex++;
                    }
                }, child)));
            });
        }, 3e3);
    },
    init: function init() {

        window._main.audio.bgm.play();
        //
        this.bgm = window._main.audio.bgm.isPlaying;

        this.voice.getComponent(cc.Sprite).spriteFrame = this.bgm ? window._main.spriteFrames.voiceOn : window._main.spriteFrames.voiceClose;

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

        this.stake.zIndex = 3;

        // 设置音效按钮 zIndex
        this.voice.zIndex = 3;

        // 下注值
        this.stakeValue = null;

        // 获取场次
        // this.getModelList()
        this.matchId = 4;

        this.getPrizeList();
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
        var _this5 = this;

        window._main.api.getModelList().then(function (res) {
            if (res.data.ok) {

                res.data.r.forEach(function (item, i) {
                    _this5.stakeBtns[i].active = true;
                    _this5.stakeBtns[i].getChildByName('text').getComponent(cc.Label).string = item.name;

                    _this5.stakeBtns[i]._matchId = item.id;
                    _this5.stakeBtns[i]._openState = item.openState;
                    _this5.stakeBtns[i]._value = item.goldExpend;

                    // 非开放状态
                    if (!item.openState) {
                        _this5.stakeBtns[i].getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.stakeBtnDisable;
                    } else if (_this5.stakeValue === null) {
                        _this5.stakeValue = item.goldExpend;
                        _this5.setMatch(i, item.id);
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
        var _this6 = this;

        if (results.grabResultInt === 3) {
            this.result.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('image/game/result-win', cc.SpriteFrame);
        } else {
            this.result.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('image/game/result-fail', cc.SpriteFrame);
        }

        this.starResultTip.active = results.getStars;

        this.result.active = true;
        this.result.getChildByName('list').getChildByName('text').getComponent(cc.Label).string = results.grabResultStr;
        this.result.runAction(cc.sequence(cc.jumpBy(.5, 0, 0, 10, 3), cc.callFunc(function () {
            setTimeout(function () {
                _this6.result.active = false;
                // 5星奖励
                if (results.starsGoods) {
                    _this6.starPrompt.show(results.starsGoods.img, results.starsGoods.name);
                }

                if (window._main.user.starsNum && !localStorage.getStar) {
                    window._main.node.getChildByName('guide').active = true;
                    localStorage.getStar = true;
                }
            }, 1000);
        })));
    },
    update: function update() {
        if (this.bgm && !window._main.audio.bgm.isPlaying) window._main.audio.bgm.play();
    },
    activityBoxShow: function activityBoxShow() {
        var _this7 = this;

        this.activityBox.active = true;
        setTimeout(function () {
            _this7.activityBox.active = false;
        }, 3000);
    },
    updateStars: function updateStars() {
        this.starBox.children.forEach(function (star, i) {
            if (i < window._main.user.starsNum) {
                star.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.starYellow;
            } else {
                star.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.starGray;
            }
        });
    },
    listen: function listen() {
        var _this8 = this;

        var _this = this;
        // 点击 问号 和 星星
        this.qMark.on(cc.Node.EventType.TOUCH_START, this.activityBoxShow, this);

        this.starBox.on(cc.Node.EventType.TOUCH_START, this.activityBoxShow, this);
        // 音效按钮
        this.voice.on(cc.Node.EventType.TOUCH_START, function () {});
        this.voice.on(cc.Node.EventType.TOUCH_END, function () {
            _this.bgm ^= 1;
            this.getComponent(cc.Sprite).spriteFrame = _this.bgm ? window._main.spriteFrames.voiceOn : window._main.spriteFrames.voiceClose;

            _this.bgm ? window._main.audio.bgm.resume() : window._main.audio.bgm.pause();
        });
        // 开始按钮
        this.startBtn.on(cc.Node.EventType.TOUCH_START, function () {
            window._main.audio.clickStart.play();
            _this8.startBtn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.startBtnPress;
        });
        this.startBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this8.startBtn.getComponent(cc.Sprite).spriteFrame = window._main.spriteFrames.startBtnNormal;
            // if (this.matchId === null) alert('请先下注')
            if (window._main.user.balance <= 0) {
                window._main.shop.show();
            } else _this8.claw.fall();
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
                _this8.stakeValue = val;

                _this8.stakeBtns.forEach(function (btn) {
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
                _this8.setStake(btn._index);

                if (btn._matchId !== _this8.matchId) {
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
                }

                // 设置 当前场次 id
                _this8.matchId = btn._matchId;

                // 获取奖品列表
                _this8.getPrizeList();

                /*
                * 高级场切换
                */
                _this8.claw.setModel(_this8.matchId);
            });
        });

        // 规则按钮
        this.ruleBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this8.ruleBtn.scale = .95;
        });
        this.ruleBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this8.ruleBtn.scale = 1;
            _this8.rule.show();
        });

        // giftBtn
        this.giftBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this8.giftBtn.scale = .95;
        });
        this.giftBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this8.giftBtn.scale = 1;
            window._main.record.show();
        });

        this.scoreBkg.on(cc.Node.EventType.TOUCH_END, function () {
            window._main.shop.show();
        });
    }
});

cc._RFpop();
},{"claw":"claw","prompt":"prompt","rule":"rule","starPrompt":"starPrompt"}],"gift":[function(require,module,exports){
"use strict";
cc._RFpush(module, '93c20+oiMlDXpsf72IuTAI5', 'gift');
// js\gift.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        prefabs: {
            default: [],
            type: cc.Prefab
        }
    },

    init: function init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');

        // 上一个添加的 gift
        this.last = null;

        /*
        * gift pool
        * 每种 gift 对应一个 pool
        */
        this.pool = this.prefabs.map(function (item) {
            return cc.instantiate(item);
        });

        // 预定义 action
        this.actions = {
            move: cc.moveBy(5, 888, 0)
        };
    },
    getItem: function getItem() {
        if (this.pool.length) {
            return this.pool.splice(~~(Math.random() * this.pool.length), 1)[0];
        } else return null;
    },
    putItem: function putItem(item) {
        item.stopAllActions();
        item.removeFromParent();
        this.pool.push(item);
    },


    /*
    * @param {array} goodsList
    */
    build: function build(list) {
        var _this2 = this;

        var _pool = this.pool.concat(this.main.game.node.children.filter(function (item) {
            if (item.name === 'gift') {
                // item.stopAllActions()
                return true;
            }
        }));

        /*
        * 遍历 list
        * 最终 pool 的个数以 list 为准
        */
        var i = 0;

        var load = function load() {
            var item = list[i];
            var gift = _pool[i];
            if (!gift) {
                gift = cc.instantiate(_this2.prefabs[0]);
                _this2.putItem(gift);
            }

            // 判断奖品类型
            if (item.type === 0) {
                // gift.getChildByName('text')
                //     .getComponent(cc.Label).string = item.name.match(/\d+/)[0]
            } else {
                gift.getChildByName('text').getComponent(cc.Label).string = '';
            }

            gift._goodsId = item.id;

            var sprite = gift.getComponent(cc.Sprite);
            cc.loader.load(item.img, function (err, texture) {
                if (err) console.log(err);else sprite.spriteFrame = new cc.SpriteFrame(texture);
                if (++i < list.length) load();
            });
        };
        load();
    },


    /*
    * 添加 gift
    * 默认位置 屏幕左侧
    * @param {number} x: -441
    * @param {number} y: -250
    */
    add: function add() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -441;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -250;

        /*
        * 默认情况下
        * 展示奖品
        */
        var i = ~~(Math.random() * this.prefabs.length),
            _this = this;
        this.last = this.getItem() || cc.instantiate(this.prefabs[i]);
        this.last.stopAllActions();

        this.node.parent.getChildByName('game').addChild(this.last);
        this.last.name = 'gift';
        this.last.x = x;
        this.last.y = y;
        this.last.scale = 1;
        this.last.zIndex = 2;
        this.last.rotation = 0;
        this.last._typeIndex = i;

        this.last.runAction(cc.sequence(this.actions.move.clone(), cc.callFunc(function () {
            _this.putItem(this);
        }, this.last)));
    },
    check: function check() {
        if (this.last && this.last.x > -182) this.add();
    },
    update: function update() {
        this.check();
    },
    onLoad: function onLoad() {
        this.init();
        this.add();
    }
});

cc._RFpop();
},{}],"guide":[function(require,module,exports){
"use strict";
cc._RFpush(module, '99067QzNQlIhYwgTEA9ISzp', 'guide');
// js\guide.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        mask: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.listen();
    },
    listen: function listen() {
        this.mask.on(cc.Node.EventType.TOUCH_START, function () {
            this.hide();
        }, this);
    },
    show: function show() {
        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
    },
    hide: function hide() {
        var _this = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"handler":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8a5be6lsZlMz6RR7XwcEzNE', 'handler');
// js\handler.js

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {
    unuse: function unuse() {
        console.log('unuse');
    },

    reuse: function reuse() {}
};
module.exports = exports['default'];

cc._RFpop();
},{}],"login":[function(require,module,exports){
"use strict";
cc._RFpush(module, '747c7EcfgRNW6qEJNE5UOQh', 'login');
// js\login.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        phone: {
            default: null,
            type: cc.Node
        },
        code: {
            default: null,
            type: cc.Node
        },

        codeBtn: {
            default: null,
            type: cc.Node
        },

        submit: {
            default: null,
            type: cc.Node
        },

        mask: {
            default: null,
            type: cc.Node
        },

        spirteFrames: {
            default: [],
            type: cc.SpriteFrame
        },

        close: {
            default: null,
            type: cc.Node
        },

        codeBtnText: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function onLoad() {
        this.init();
        this.listen();
    },

    init: function init() {
        // 网络请求状态
        this.state = {
            wait: false,
            time: 0
        };

        this.phoneInput = this.phone.getComponent(cc.EditBox);
        this.codeInput = this.code.getComponent(cc.EditBox);
        window._main.shop.node.zIndex = 1;
    },
    countDown: function countDown() {
        var _this = this;

        this.state.time--;
        this.codeBtnText.string = this.state.time.toString() + 's';
        if (this.state.time === 0) {
            this.codeReset();
            return;
        }
        setTimeout(function () {
            _this.countDown();
        }, 1000);
    },
    codeReset: function codeReset() {
        this.codeBtn.getComponent(cc.Sprite).spriteFrame = this.spirteFrames[0];
        this.codeBtnText.string = '获取验证码';
    },
    listen: function listen() {
        var _this2 = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        /*
        * 手机号输入事件监听
        * 替换非数字字符为空
        */

        this.phone.on('text-changed', function () {
            _this2.phoneInput.string = _this2.phoneInput.string.replace(/\D/g, '');
        });

        /*
        * 验证码输入事件监听
        * 替换非数字字符为空
        */

        this.code.on('text-changed', function () {
            _this2.codeInput.string = _this2.codeInput.string.replace(/\D/g, '');
        });

        /*
        * 验证码按钮监听
        */
        this.codeBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.codeBtn.scale = .95;
        });

        this.codeBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.codeBtn.scale = 1;
            if (_this2.state.wait) return;
            if (_this2.state.time) return;

            _this2.state.wait = true;

            window._main.api.getCaptcha(_this2.phoneInput.string).then(function (res) {
                if (res.data.ok) {
                    // 启动倒计时
                    _this2.state.time = 60;
                    _this2.countDown();

                    _this2.codeBtn.getComponent(cc.Sprite).spriteFrame = _this2.spirteFrames[1];
                } else {
                    alert(res.data.m);
                }
                _this2.state.wait = false;
            });
        });

        /*
        * 提交按钮
        */
        this.submit.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.submit.scale = .95;
        });

        this.submit.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.submit.scale = 1;

            window._main.api.bindPhone(_this2.phoneInput.string, _this2.codeInput.string).then(function (res) {
                if (res.data.ok) {
                    window._main.user.phone = _this2.phoneInput.string;
                    _this2.hide();
                    _this2.codeInput.string = '';
                    _this2.phoneInput.string = '';
                } else {
                    alert(res.data.m);
                }
            });
        });

        /*
        * 关闭按钮
        */
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.close.scale = .95;
        });

        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.close.scale = 1;
            _this2.hide();
        });
    },
    show: function show() {
        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
    },
    hide: function hide() {
        var _this3 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this3.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"main":[function(require,module,exports){
"use strict";
cc._RFpush(module, '235d9P0nsBF2Kyx+d+FoM2u', 'main');
// js\main.js

'use strict';

var _game = require('game');

var _game2 = _interopRequireDefault(_game);

var _shop = require('shop');

var _shop2 = _interopRequireDefault(_shop);

var _audio = require('audio');

var _audio2 = _interopRequireDefault(_audio);

var _record = require('record');

var _record2 = _interopRequireDefault(_record);

var _login = require('login');

var _login2 = _interopRequireDefault(_login);

var _api = require('api');

var _api2 = _interopRequireDefault(_api);

var _user = require('user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addScript = function addScript(uri) {
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = uri;
    return {
        then: function then(func) {
            func ? script.onload = func : null;
        }
    };
};

addScript('//cdn.yoosh.tv/js/axios.min.js').then(function () {
    axios.defaults.withCredentials = true;
});

if (location.search.includes('alpha')) {
    addScript('//cdn.yoosh.tv/js/eruda.min.js').then(function () {
        return eruda.init();
    });
}

var openCollision = function openCollision() {
    var manager = cc.director.getCollisionManager();
    manager.enabled = true;

    /*
    * 开启 debug 模式
    * 正式环境下关闭
    */
    if (location.port === '7456') {
        manager.enabledDebugDraw = true;
    }
};

cc.Class({
    extends: cc.Component,
    properties: {
        game: {
            default: null,
            type: _game2.default
        },
        shop: {
            default: null,
            type: _shop2.default
        },
        audio: {
            default: null,
            type: _audio2.default
        },
        record: {
            default: null,
            type: _record2.default
        },
        login: {
            default: null,
            type: _login2.default
        }
    },
    onLoad: function onLoad() {
        var _this = this;

        // 开启碰撞检测
        openCollision();

        window._main = this;

        //
        this.gift = this.node.getChildByName('game').getComponent('gift');

        this.api = _api2.default;

        this.spriteFrames = this.node.getComponent('spriteFrame');

        this.game.node.active = false;

        _api2.default.getUserInfo().then(function (res) {
            if (!res.data.ok) {
                var code = _api2.default.getParam('code');
                if (code) {
                    _api2.default.login(code).then(function (res) {
                        if (res.data.ok) {
                            _user2.default.nickname = res.data.r.nickname;
                            _user2.default.balance = res.data.r.balance;
                            _user2.default.phone = res.data.r.phone;
                            _user2.default.avatar = res.data.r.profileImg;
                            _user2.default.starsNum = res.data.r.starsNum;
                            _this.user = _user2.default;

                            _this.game.score.getComponent(cc.Label).string = _user2.default.balance;

                            _this.game.node.active = true;
                            _this.game.updateStars();
                        }
                    });
                } else _api2.default.authorize();
            } else {
                _user2.default.nickname = res.data.r.nickname;
                _user2.default.balance = res.data.r.balance;
                _user2.default.phone = res.data.r.phone;
                _user2.default.avatar = res.data.r.profileImg;
                _user2.default.starsNum = res.data.r.starsNum;

                _this.user = _user2.default;

                _this.game.score.getComponent(cc.Label).string = _user2.default.balance;

                _this.game.node.active = true;
                _this.game.updateStars();
            }
        });
    }
});

cc._RFpop();
},{"api":"api","audio":"audio","game":"game","login":"login","record":"record","shop":"shop","user":"user"}],"prizeDetail":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0a34bLa/ZNHbYLBultjiRAN', 'prizeDetail');
// js\prizeDetail.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        close: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        panel: {
            default: null,
            type: cc.Node
        }
    },

    init: function init() {
        this.listen();
    },
    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        /*
        * 关闭按钮
        */
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.close.scale = .95;
        });

        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this.close.scale = 1;
            _this.hide();
        });
    },
    hide: function hide() {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this2.node.active = false;
        })));
    },
    show: function show(info) {
        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
        this.refresh(info);
    },
    refresh: function refresh(info) {
        var _this3 = this;

        this.panel.getChildByName('phone').getComponent(cc.Label).string = '\u83B7\u5956\u53F7\u7801\uFF1A' + window._main.user.phone;

        this.panel.getChildByName('state').getComponent(cc.Label).string = info.state;

        this.panel.getChildByName('name').getComponent(cc.Label).string = info.name;

        this.panel.getChildByName('text').getComponent(cc.Label).string = info.text.replace(/\\n/g, '\n');

        cc.loader.load(info.uri, function (err, res) {
            var img = _this3.panel.getChildByName('image');
            img.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
        });
    }
});

cc._RFpop();
},{}],"prompt":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3da57qbfQRD/Y3zpQXfuKMf', 'prompt');
// js\prompt.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        glow: {
            default: null,
            type: cc.Node
        },

        prize: {
            default: null,
            type: cc.Node
        },

        close: {
            default: null,
            type: cc.Node
        },

        loginBtn: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.listen();
    },
    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });
        // 关闭
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.close.scale = .95;
        });
        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this.close.scale = 1;
            _this.hide();
        });

        // login
        this.loginBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.loginBtn.scale = .95;
        });
        this.loginBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this.loginBtn.scale = 1;
            _this.hide();
            window._main.login.show();
        });
    },
    show: function show(uri) {
        var _this2 = this;

        cc.loader.load(uri, function (err, texture) {
            if (err) alert(err);else {
                // 设置奖品图片
                _this2.prize.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);

                if (_this2.node.active) _this2.node.opacity = 0;else {
                    _this2.node.active = true;
                    _this2.node.opacity = 0;
                }
                _this2.node.runAction(cc.fadeIn(.5));

                // 炫光动画
                _this2.glow.runAction(cc.repeatForever(cc.rotateBy(3, 360)));

                //是否登录
                if (window._main.user.phone) {
                    _this2.loginBtn.active = false;
                } else {
                    _this2.loginBtn.active = true;
                }
            }
        });
    },
    hide: function hide() {
        var _this3 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this3.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"purchase":[function(require,module,exports){
"use strict";
cc._RFpush(module, '973f650eVxND5NWP7f7tH0V', 'purchase');
// js\purchase.js

'use strict';

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');

        // this.listen()

        console.log(this.name);
    },
    onEnable: function onEnable() {
        console.log(this.name);
    },
    listen: function listen() {
        var _this = this;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.node.scale = .95;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            _this.node.scale = 1;
            _this.main.api.purchase(_this.node.__goodsId).then(function (res) {
                console.log(res);
            });
        });
    }
});

cc._RFpop();
},{}],"record":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6b7ccFP5wRN/qmzVt8r34qS', 'record');
// js\record.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _prizeDetail = require('prizeDetail');

var _prizeDetail2 = _interopRequireDefault(_prizeDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        close: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        layout: {
            default: null,
            type: cc.Node
        },
        item: {
            default: null,
            type: cc.Prefab
        },
        other: {
            default: null,
            type: cc.Node
        },
        loginBtn: {
            default: null,
            type: cc.Node
        },
        prizeDetail: {
            default: null,
            type: _prizeDetail2.default
        }
    },

    onLoad: function onLoad() {
        this.prizeDetail.init();
        this.listen();
    },
    listen: function listen() {
        var _this2 = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        /*
        * 关闭按钮
        */
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.close.scale = .95;
        });

        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.close.scale = 1;
            _this2.hide();
        });

        //loginBtn
        this.loginBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this2.loginBtn.scale = .95;
        });

        this.loginBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this2.loginBtn.scale = 1;
            _this2.hide();
            window._main.login.show();
        });
    },
    show: function show() {
        var _this3 = this;

        var _this = this;

        window._main.api.monitor('抓去记录', 13);

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));

        if (!window._main.user.phone) {
            this.other.active = true;
            this.layout.active = false;
        } else {
            this.layout.active = true;
            this.other.active = false;
        }

        window._main.api.grabHistory().then(function (res) {
            if (res.data.ok) {
                if (res.data.r.length === 0) {
                    return;
                }
                var i = 0;
                var children = _this3.layout.children,
                    list = res.data.r;

                children.forEach(function (child) {
                    child.active = child._bind = false;
                });
                var load = function load() {
                    var item = list[i];
                    var child = children[i];
                    if (!child) {
                        child = cc.instantiate(_this3.item);
                        _this3.layout.addChild(child);
                    }

                    child.active = true;
                    child.opacity = 255;

                    // 获奖状态
                    var btn = child.getChildByName('btn'),
                        state = child.getChildByName('state');
                    btn.active = state.active = false;
                    if (item.awardStatus === 0) {
                        btn.active = true;
                    } else {
                        state.active = true;
                        state.getComponent(cc.Label).string = item.awardStatusStr;
                    }

                    if (!child._bind) {
                        child._bind = true;

                        btn.on(cc.Node.EventType.TOUCH_START, function () {
                            this.scale = .95;
                        });

                        btn.on(cc.Node.EventType.TOUCH_END, function () {
                            this.scale = 1;
                            _this.prizeDetail.show({
                                uri: item.goodsImg,
                                name: item.goodsName,
                                state: item.awardStatusStr,
                                text: item.receiveInfo
                            });
                        });
                    }

                    child.getChildByName('layout').getChildByName('name').getComponent(cc.Label).string = item.goodsName;

                    child.getChildByName('layout').getChildByName('date').getComponent(cc.Label).string = item.createDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

                    cc.loader.load(item.goodsImg, function (err, texture) {
                        if (err) console.log(err);else {
                            var img = child.getChildByName('image');
                            img.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                            if (item.goodsType === 1) img.scale = .3;else img.scale = 1;
                        }
                        if (++i < list.length) load();
                    });
                };
                load();
            }
        });
    },
    hide: function hide() {
        var _this4 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this4.node.active = false;
        })));
    }
});

cc._RFpop();
},{"prizeDetail":"prizeDetail"}],"rule":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1258dwowHJHp4dxnVYNTBFd', 'rule');
// js\rule.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        btn: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        bkg: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.listen();
    },
    show: function show() {
        window._main.api.monitor('规则界面', 14);

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));
    },
    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        this.btn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.hide();
        });
    },
    hide: function hide() {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this2.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"shop":[function(require,module,exports){
"use strict";
cc._RFpush(module, '809edQZe/RP77QQ8wFvU2PC', 'shop');
// js\shop.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        mask: {
            default: null,
            type: cc.Node
        },

        close: {
            default: null,
            type: cc.Node
        },

        layout: {
            default: null,
            type: cc.Node
        },

        item: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function onLoad() {
        this.init();
        this.listen();
    },
    init: function init() {
        /*
        * 创建空借点
        * 抵消 layout 的 coupon
        */
        this.empty = new cc.Node();
        this.empty.name = 'empty';
        this.empty.height = 26;
    },
    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });

        /*
        * 关闭按钮
        */
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.close.scale = .95;
        });

        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this.close.scale = 1;
            _this.hide();
        });
    },
    show: function show() {
        var _this2 = this;

        window._main.api.monitor('获取金币', 7);

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));

        window._main.api.goodsList().then(function (res) {
            if (res.data.ok) {
                if (res.data.r.length === 0) {
                    return;
                }

                var i = 0;
                var children = _this2.layout.children,
                    list = res.data.r;

                children.forEach(function (child) {
                    child.active = false;
                });

                var needEmpty = false;

                // 有空节点则 remove
                var empty = _this2.layout.getChildByName('empty');
                empty ? empty.removeFromParent() : null;

                var load = function load() {
                    var item = list[i];
                    var child = children[i];
                    if (!child) {
                        child = cc.instantiate(_this2.item);
                        _this2.layout.addChild(child);
                    }
                    child.active = true;

                    child._goodsId = item.id;

                    // child.getChildByName('layout').getChildByName('more')
                    //     .getComponent(cc.Label).string = `${item.promotionQuantity}金币`

                    child.getChildByName('layout').getChildByName('more').getComponent(cc.Label).string = '' + item.name;

                    child.getChildByName('layout').getChildByName('less').getComponent(cc.Label).string = item.quantity + '\u91D1\u5E01';

                    child.getChildByName('btn').getChildByName('text').getComponent(cc.Label).string = '\uFFE5' + (item.price / 100).toFixed(2);

                    child.getChildByName('coupon').active = child.getChildByName('layout').getChildByName('less').active = item.promotionState;

                    if (!child._bind) {

                        child._bind = true;
                        // 购买监听
                        child.getChildByName('btn').on(cc.Node.EventType.TOUCH_START, function () {
                            this.scale = .95;
                        });

                        child.getChildByName('btn').on(cc.Node.EventType.TOUCH_END, function (event) {
                            event.target.scale = 1;
                            window._main.api.purchase(child._goodsId).then(function (res) {
                                if (res.data.ok) {
                                    location.href = res.data.r;
                                }
                            });

                            window._main.api.monitor(item.name, 8, item.id);
                        });
                    }

                    if (item.promotionState && i === 0) {
                        needEmpty = true;
                    }

                    cc.loader.load([item.img, item.promotionImg], function (err, results) {
                        if (err) console.log(err);else {
                            child.getChildByName('image').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(results.getContent(item.img));

                            child.getChildByName('layout').x = -45;

                            // 折扣图标
                            child.getChildByName('coupon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(results.getContent(item.promotionImg));
                        }
                        if (++i < list.length) load();else if (needEmpty) {
                            _this2.layout.addChild(_this2.empty);
                            _this2.empty.setSiblingIndex(0);
                        }
                    });
                };
                load();
            }
        });
    },
    hide: function hide() {
        var _this3 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this3.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"splash":[function(require,module,exports){
"use strict";
cc._RFpush(module, '14680nCEWBA3616ctUajUyx', 'splash');
// js\splash.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        percent: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        var percent = this.percent.getComponent(cc.Label);
        percent.string = '0%';
        cc.loader.onProgress = function (part, total) {
            percent.string = ~~(100 * part / total) + '%';
        };
        cc.director.loadScene('main', function () {
            cc.loader.onProgress = null;
        });
    }
});

cc._RFpop();
},{}],"spriteFrame":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e1ec8A8Qm9JuLJgbnuZ6fTW', 'spriteFrame');
// js\spriteFrame.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,

    properties: {
        startBtnNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        startBtnPress: {
            default: null,
            type: cc.SpriteFrame
        },
        stakeBtnNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        stakeBtnPress: {
            default: null,
            type: cc.SpriteFrame
        },
        stakeBtnDisable: {
            default: null,
            type: cc.SpriteFrame
        },
        resultFail: {
            default: null,
            type: cc.SpriteFrame
        },
        resultWin: {
            default: null,
            type: cc.SpriteFrame
        },
        clawRopeNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        clawBodyNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        clawLeftNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        clawRightNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        clawRopeGold: {
            default: null,
            type: cc.SpriteFrame
        },
        clawBodyGold: {
            default: null,
            type: cc.SpriteFrame
        },
        clawLeftGold: {
            default: null,
            type: cc.SpriteFrame
        },
        clawRightGold: {
            default: null,
            type: cc.SpriteFrame
        },
        matchS: {
            default: null,
            type: cc.SpriteFrame
        },
        matchM: {
            default: null,
            type: cc.SpriteFrame
        },
        matchL: {
            default: null,
            type: cc.SpriteFrame
        },
        voiceOn: {
            default: null,
            type: cc.SpriteFrame
        },
        voiceClose: {
            default: null,
            type: cc.SpriteFrame
        },
        starGray: {
            default: null,
            type: cc.SpriteFrame
        },
        starYellow: {
            default: null,
            type: cc.SpriteFrame
        }
    }
});

cc._RFpop();
},{}],"starPrompt":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b9d0ay+gHFEO4snhcCToOlc', 'starPrompt');
// js\starPrompt.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cc.Class({
    extends: cc.Component,
    properties: {
        glow: {
            default: null,
            type: cc.Node
        },

        prize: {
            default: null,
            type: cc.Node
        },

        close: {
            default: null,
            type: cc.Node
        },

        loginBtn: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        prizeName: {
            default: null,
            type: cc.Component
        }
    },

    onLoad: function onLoad() {
        this.listen();
    },
    listen: function listen() {
        var _this = this;

        this.mask.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        });
        // 关闭
        this.close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.close.scale = .95;
        });
        this.close.on(cc.Node.EventType.TOUCH_END, function () {
            _this.close.scale = 1;
            _this.hide();
        });

        // login
        this.loginBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.loginBtn.scale = .95;
        });
        this.loginBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this.loginBtn.scale = 1;
            _this.hide();
            window._main.login.show();
        });
    },
    show: function show(uri, name) {
        var _this2 = this;

        cc.loader.load(uri, function (err, texture) {
            if (err) alert(err);else {
                // 设置奖品图片
                _this2.prize.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);

                if (_this2.node.active) _this2.node.opacity = 0;else {
                    _this2.node.active = true;
                    _this2.node.opacity = 0;
                }
                _this2.node.runAction(cc.fadeIn(.5));

                // 炫光动画
                _this2.glow.runAction(cc.repeatForever(cc.rotateBy(3, 360)));

                _this2.prizeName.string = "\u606D\u559C\u83B7\u5F97" + name;

                //是否登录
                if (window._main.user.phone) {
                    _this2.loginBtn.active = false;
                } else {
                    _this2.loginBtn.active = true;
                }
            }
        });
    },
    hide: function hide() {
        var _this3 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this3.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"user":[function(require,module,exports){
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
},{}]},{},["api","audio","board","claw","collision","game","gift","guide","handler","login","main","prizeDetail","prompt","purchase","record","rule","shop","splash","spriteFrame","starPrompt","user"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9qcy9hcGkuanMiLCJhc3NldHMvanMvYXVkaW8uanMiLCJhc3NldHMvanMvYm9hcmQuanMiLCJhc3NldHMvanMvY2xhdy5qcyIsImFzc2V0cy9qcy9jb2xsaXNpb24uanMiLCJhc3NldHMvanMvZ2FtZS5qcyIsImFzc2V0cy9qcy9naWZ0LmpzIiwiYXNzZXRzL2pzL2d1aWRlLmpzIiwiYXNzZXRzL2pzL2hhbmRsZXIuanMiLCJhc3NldHMvanMvbG9naW4uanMiLCJhc3NldHMvanMvbWFpbi5qcyIsImFzc2V0cy9qcy9wcml6ZURldGFpbC5qcyIsImFzc2V0cy9qcy9wcm9tcHQuanMiLCJhc3NldHMvanMvcHVyY2hhc2UuanMiLCJhc3NldHMvanMvcmVjb3JkLmpzIiwiYXNzZXRzL2pzL3J1bGUuanMiLCJhc3NldHMvanMvc2hvcC5qcyIsImFzc2V0cy9qcy9zcGxhc2guanMiLCJhc3NldHMvanMvc3ByaXRlRnJhbWUuanMiLCJhc3NldHMvanMvc3RhclByb21wdC5qcyIsImFzc2V0cy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQUE7O0FBS0E7QUFDSTtBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBRUQ7QUFDSTtBQUFBO0FBQUE7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBM0JROztBQThCYjs7QUFFSTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxXOztBQVFmO0FBQ0k7QUFDSDs7QUFFRDtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNJO0FBREk7QUFENkI7QUFLNUM7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFEeUM7QUFHaEQ7O0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUZJO0FBRDRCO0FBTTNDOztBQUVEO0FBQWlEO0FBQUE7O0FBQzdD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O0FBRUE7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUlBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUVIO0FBRUQ7QUFDSTs7QUFFQTs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBRUg7QUFFRDtBQUNJO0FBQ0k7QUFDSTtBQUVBO0FBQ0o7QUFDSTtBQUVBO0FBQ0o7QUFDSTtBQUVBO0FBWlI7QUFjSDs7O0FBRUQ7QUFDQTtBQUFlOztBQUNYO0FBRUk7O0FBRUk7QUFDSTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0k7QUFFSDtBQUNHO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKOzs7QUFFRDtBQUNBO0FBQ0k7QUFFSTtBQUNJO0FBQ0g7QUFDSjtBQUNKO0FBRUQ7QUFBb0I7O0FBQ2hCO0FBQ0k7QUFFSDtBQUNHO0FBRUg7O0FBRUQ7O0FBRUE7QUFDQTtBQUVBO0FBR1E7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUlIOztBQUVEO0FBQ0k7QUFDQTtBQUNIO0FBRUo7QUFDSjtBQUVSO0FBRUQ7QUFDSTtBQUVIO0FBRUQ7QUFBa0I7O0FBQ2Q7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQUVEO0FBQ0k7QUFDSTtBQUNJO0FBRUg7QUFDRztBQUVIO0FBQ0o7QUFDSjtBQUVEO0FBQVM7O0FBQ0w7QUFDQTtBQUNBOztBQUtBO0FBSUE7QUFDQTtBQUtBO0FBR1E7QUFDQTs7QUFHQTtBQUVIO0FBRUw7QUFDQTtBQUdRO0FBQ0E7QUFFSDtBQUVMO0FBR1E7QUFFQTtBQUNBO0FBQ0k7QUFDSDtBQUVKOztBQUdMO0FBQ0E7QUFDSTtBQUNBOztBQUlRO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNEOztBQUVBO0FBQ0k7QUFDSTtBQUVIO0FBQ0c7QUFFSDtBQUNEO0FBQ0E7QUFFQTtBQUdIOztBQUVE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Q0E7QUFGUTtBQXJGSjtBQUhROzs7Ozs7Ozs7Ozs7OztBQ0NwQjtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBRkU7O0FBS047QUFDSTtBQUNBO0FBRkc7O0FBS1A7QUFDSTtBQUNBO0FBRkc7O0FBS1A7QUFDSTtBQUNBO0FBRk07QUFJVjtBQUNJO0FBQ0E7QUFGRTtBQUlOO0FBQ0k7QUFDQTtBQUZPO0FBeEJIOztBQThCWjtBQUNJO0FBQ0g7QUFFRDtBQUFTOztBQUNMO0FBR1E7QUFDSDtBQUVMO0FBQ0E7QUFHUTtBQUNIO0FBRUw7QUFHUTtBQUNBO0FBQ0g7O0FBR0w7QUFDQTtBQUdRO0FBQ0g7QUFFTDtBQUdRO0FBQ0E7QUFDQTtBQUNIO0FBR1I7QUFFRDtBQUFnQjs7QUFDWjtBQUNJO0FBRUk7QUFDQTs7QUFJQTtBQUVJO0FBQ0E7QUFDSDtBQUNEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFFSjtBQUNKO0FBRUQ7QUFBTzs7QUFDSDtBQUdRO0FBQ0g7QUFFUjtBQW5IbUI7Ozs7Ozs7Ozs7Ozs7O0FDQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFBUzs7QUFFTDtBQUVJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUVIO0FBQ0o7QUFFSjtBQXpCVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiog5bi46YePXHJcbiovXHJcblxyXG5jb25zdFxyXG4gICAgQVBQSUQgPSAnd3hhOTVlZWU0OGEzYWM1OGM2JyxcclxuICAgIFNFUlZFUiA9IGxvY2F0aW9uLmhvc3QuaW5jbHVkZXMoJ2xhYicpID8gJy8vbGFiLnlvb3NoLnR2JyA6XHJcbiAgICAgICAgbG9jYXRpb24uaG9zdC5pbmNsdWRlcygnbG9jYWxob3N0JykgPyAnLy9sYWIueW9vc2gudHYnIDogJy8vZG9sbC55b29zaC50didcclxuXHJcbmNvbnN0IEJhc2UgPSB7XHJcbiAgICBnZXRDb29raWUoa2V5KSB7XHJcbiAgICAgICAga2V5ID0ga2V5LnRvU3RyaW5nKClcclxuICAgICAgICBpZiAoIWtleS5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgICAgICBjb25zdCBzdHIgPSBkb2N1bWVudC5jb29raWVcclxuICAgICAgICBsZXRcclxuICAgICAgICAgICAgc3RhcnQgPSBzdHIuaW5kZXhPZihgJHtrZXl9PWApLFxyXG4gICAgICAgICAgICBlbmRcclxuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSByZXR1cm4gJydcclxuICAgICAgICBzdGFydCArPSBrZXkubGVuZ3RoICsgMVxyXG4gICAgICAgIGVuZCA9IHN0ci5pbmRleE9mKCc7Jywgc3RhcnQpXHJcbiAgICAgICAgZW5kID09PSAtMSA/IGVuZCA9IHN0ci5sZW5ndGggOiBudWxsXHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy51bmVzY2FwZShzdHIuc2xpY2Uoc3RhcnQsIGVuZCkpXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFBhcmFtKGtleSkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICBzdHIgPSBsb2NhdGlvbi5zZWFyY2gsXHJcbiAgICAgICAgICAgIHN0YXJ0ID0gc3RyLmluZGV4T2Yoa2V5KSxcclxuICAgICAgICAgICAgZW5kXHJcblxyXG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHJldHVybiAnJ1xyXG4gICAgICAgIHN0YXJ0ICs9IGtleS5sZW5ndGggKyAxXHJcbiAgICAgICAgZW5kID0gc3RyLmluZGV4T2YoJyYnLCBzdGFydClcclxuICAgICAgICBlbmQgPT09IC0xID8gZW5kID0gc3RyLmxlbmd0aCA6IG51bGxcclxuICAgICAgICByZXR1cm4gc3RyLnNsaWNlKHN0YXJ0LCBlbmQpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFwaSgpIHtcclxuXHJcbiAgICB0aGlzLmF1dGhvcml6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgYXBwaWQ6IEFQUElELFxyXG4gICAgICAgICAgICByZWRpcmVjdF91cmk6ICdodHRwczovL2dhbWUueW9vc2gudHYvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlX3R5cGU6ICdjb2RlJyxcclxuICAgICAgICAgICAgc2NvcGU6ICdzbnNhcGlfYmFzZScsXHJcbiAgICAgICAgICAgIHN0YXRlOiBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBxdWVyeXN0cmluZyA9IE9iamVjdC5rZXlzKHBhcmFtcykubWFwKGtleSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtrZXl9PSR7cGFyYW1zW2tleV19YFxyXG4gICAgICAgIH0pLmpvaW4oJyYnKVxyXG5cclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gYGh0dHBzOi8vb3Blbi53ZWl4aW4ucXEuY29tL2Nvbm5lY3Qvb2F1dGgyL2F1dGhvcml6ZT8ke3F1ZXJ5c3RyaW5nfWBcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24oY29kZSkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS91c2VyL2xvZ2luYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IGNvZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRVc2VySW5mbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS91c2VyL2dldFVzZXJJbmZvYClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldE1vZGVsTGlzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS9kb2xsL21vZGVsTGlzdGApXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRQcml6ZUxpc3QgPSBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS9kb2xsL3ByaXplTGlzdGAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7Z2FtZU1vZGVsSWQ6IGlkfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmFiID0gZnVuY3Rpb24oZ29vZHNJZCwgbWF0Y2hJZCkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS9kb2xsL2dyYWJgLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZ2FtZU1vZGVsSWQ6IG1hdGNoSWQsXHJcbiAgICAgICAgICAgICAgICBwcml6ZUlkOiBnb29kc0lkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JhYkhpc3RvcnkgPSBmdW5jdGlvbihwYWdlPTEsIHBhZ2VTaXplPTEwKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvZ3JhYkhpc3RvcnlgLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ29vZHNMaXN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L21hbGwvc2FsZXNHb2xkYClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB1cmNoYXNlID0gZnVuY3Rpb24oaWQsIGNhbGxCYWNrVXJsLCBjYW5jZWxVcmwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZCwgY2FsbEJhY2tVcmwsIGNhbmNlbFVybClcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vbWFsbC9idXlHb2xkYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGdvbGRJZDogaWQsXHJcbiAgICAgICAgICAgICAgICBjYWxsQmFja1VybDogY2FsbEJhY2tVcmwgfHwgYCR7bG9jYXRpb24ub3JpZ2lufSR7bG9jYXRpb24ucGF0aG5hbWV9YCxcclxuICAgICAgICAgICAgICAgIGNhbmNlbFVybDogY2FuY2VsVXJsIHx8IGAke2xvY2F0aW9uLm9yaWdpbn0ke2xvY2F0aW9uLnBhdGhuYW1lfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRDYXB0Y2hhID0gZnVuY3Rpb24ocGhvbmUpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vdXNlci9nZXRDb2RlQnlQaG9uZWAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5iaW5kUGhvbmUgPSBmdW5jdGlvbihwaG9uZSwgY29kZSkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS91c2VyL2JpbmRQaG9uZUJ5Q29kZWAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmUsXHJcbiAgICAgICAgICAgICAgICBjb2RlOiBjb2RlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9uaXRvciA9IGZ1bmN0aW9uKGV2ZW50LCBldmVudFR5cGUsIGV2ZW50VHlwZVRhYj0wKSB7XHJcbiAgICAgICAgYXhpb3MuZ2V0KGAke1NFUlZFUn0vZXZlbnQvbW9uaXRvcmAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZSxcclxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZVRhYlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uRXZlbnQgPSBmdW5jdGlvbiguLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5UREFQUCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuVERBUFAub25FdmVudCguLi5hcmdzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJyb2FkY2FzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS9kb2xsL2F3YXJkSW5mb2ApXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5BcGkucHJvdG90eXBlID0gQmFzZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEFwaSgpXHJcblxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNsaWNrU3RhcnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9Tb3VyY2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhdGNoZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9Tb3VyY2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJnbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb1NvdXJjZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYXNrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5idG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG5cclxufSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsZWZ0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJpZ2h0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvcGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgIH0sXHJcblxyXG4gICAgc2V0TW9kZWwoaSkge1xyXG4gICAgICAgIGlmIChpID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9wZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd1JvcGVHb2xkXHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd0JvZHlHb2xkXHJcbiAgICAgICAgICAgIHRoaXMubGVmdC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd0xlZnRHb2xkXHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdSaWdodEdvbGRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvcGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdSb3BlTm9ybWFsXHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd0JvZHlOb3JtYWxcclxuICAgICAgICAgICAgdGhpcy5sZWZ0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3TGVmdE5vcm1hbFxyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3UmlnaHROb3JtYWxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG4gICAgICAgIC8vIOWumuS5ieWKqOS9nFxyXG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHtcclxuICAgICAgICAgICAgcm90YXRlOiBjYy5yb3RhdGVCeSguMSwgNTYpLFxyXG4gICAgICAgICAgICBtb3ZlOiBjYy5tb3ZlQnkoLjMsIDAsIC00NDApLFxyXG4gICAgICAgICAgICB1cDogY2MubW92ZUJ5KC42LCAwLCA0NDApLFxyXG4gICAgICAgICAgICBzY2FsZTogY2Muc2NhbGVCeSguMywgLjUpLFxyXG4gICAgICAgICAgICBmbG9wOiBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KC44LCAzNjApLnJlcGVhdEZvcmV2ZXIoKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSguOCwgMCwgLTUwMCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZUJ5KC44LCAxLjUpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOeIquWtkOeKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAnZnJlZSdcclxuXHJcbiAgICAgICAgLy8g54iq5a2Q5Yid5aeL6auY5bqmXHJcbiAgICAgICAgdGhpcy55ID0gMzc3XHJcblxyXG4gICAgICAgIC8vIOe7s+WtkOWIneWni+mVv+W6plxyXG4gICAgICAgIHRoaXMucm9wZUhlaWdodCA9IDEyMFxyXG5cclxuICAgICAgICAvLyDmmK/lkKbmipPkvY9cclxuICAgICAgICB0aGlzLmNhdGNoZWQgPSBmYWxzZVxyXG5cclxuICAgICAgICAvLyDmipPlj5bnmoQgZ2lmdFxyXG4gICAgICAgIHRoaXMuZ2lmdCA9IG51bGxcclxuXHJcbiAgICAgICAgLy8g5oqT5Y+W5Yqo55S7XHJcbiAgICAgICAgdGhpcy5jYXRjaEFuaW1hdGVkID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g5o6l5Y+j6K+35rGC54q25oCBXHJcbiAgICAgICAgdGhpcy53YWl0ID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g5oqT5Y+W57uT5p6cXHJcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG5cclxuICAgICAgICAvLyDnrYnlvoXmjqXlj6PogIzkuK3mraLph4rmlL7mk43kvZxcclxuICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgZ3JhYihmdW5jKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09ICdmYWxsJykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdncmFiJ1xyXG4gICAgICAgIHRoaXMubGVmdC5ydW5BY3Rpb24odGhpcy5hY3Rpb25zLnJvdGF0ZS5yZXZlcnNlKCkpXHJcbiAgICAgICAgdGhpcy5yaWdodC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5yb3RhdGUsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmMpXHJcbiAgICAgICAgKSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGZyZWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09ICdyaXNlJykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdmcmVlJ1xyXG4gICAgICAgIHRoaXMubGVmdC5ydW5BY3Rpb24odGhpcy5hY3Rpb25zLnJvdGF0ZSlcclxuICAgICAgICB0aGlzLnJpZ2h0LnJ1bkFjdGlvbih0aGlzLmFjdGlvbnMucm90YXRlLnJldmVyc2UoKSlcclxuICAgICAgICB0aGlzLmNhdGNoZWQgPVxyXG4gICAgICAgIHRoaXMuY2F0Y2hBbmltYXRlZCA9IGZhbHNlXHJcbiAgICB9LFxyXG5cclxuICAgIGZhbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09ICdmcmVlJykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdmYWxsJ1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5tb3ZlLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyYWIodGhpcy5yaXNlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJ+W8gOWni+aMiemSricsIDYpXHJcbiAgICB9LFxyXG5cclxuICAgIG92ZXIoKSB7XHJcbiAgICAgICAgLy8g6YeN572uIHBhdXNlXHJcbiAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlXHJcbiAgICAgICAgaWYgKHRoaXMuY2F0Y2hlZCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0LnpJbmRleCA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMubG9zZSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDph43nva4gZ2lmdCB6SW5kZXggPCBwaXQtYXJvdW5kXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRzLmdyYWJSZXN1bHRJbnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnQuekluZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9zZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLmdhbWUuc2hvd1Jlc3VsdCh0aGlzLnJlc3VsdHMpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVzdWx0cy5ncmFiUmVzdWx0SW50ID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4oKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMuZ29vZHMudHlwZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uZ2FtZS5zaG93UmVzdWx0KHRoaXMucmVzdWx0cylcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmipPliLDlrp7niannmoTmlYjmnpxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLmdhbWUucHJvbXB0LnNob3codGhpcy5yZXN1bHRzLmdvb2RzLmltZylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlKClcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgKiDor7fmsYLmipPlj5blpITnkIbmjqXlj6NcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy53YWl0ID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm1haW4uYXBpLmdyYWIobnVsbCwgdGhpcy5tYWluLmdhbWUubWF0Y2hJZClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuci5zdGFyc0dvb2RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLmdhbWUuc3RhclByb21wdC5zaG93KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZGF0YS5yLnN0YXJzR29vZHMuaW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZGF0YS5yLnN0YXJzR29vZHMubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuX21haW4udXNlci5zdGFyc051bSAmJiAhbG9jYWxTdG9yYWdlLmdldFN0YXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4ubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ3VpZGUnKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldFN0YXIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHRoaXMucmVzdWx0cyA9IHJlcy5kYXRhLnJcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICAgICAgICAgIC8vIDXmmJ/lpZblirFcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByaXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSAnZ3JhYicpIHJldHVyblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAncmlzZSdcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMudXAsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLndhaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdXNlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHRoaXMub3ZlcigpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH0sXHJcblxyXG4gICAgcmFuZG9tKCkge1xyXG4gICAgICAgIHJldHVybiB+fihNYXRoLnJhbmRvbSgpICogMTApXHJcbiAgICB9LFxyXG5cclxuICAgIHdpbigpIHtcclxuICAgICAgICB0aGlzLm1haW4uZ2lmdC5wdXRJdGVtKHRoaXMuZ2lmdClcclxuICAgICAgICB0aGlzLmZyZWUoKVxyXG4gICAgfSxcclxuXHJcbiAgICBsb3NlKCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDmjonokL1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZnJlZSgpXHJcbiAgICAgICAgLy8g5q2k5pe26KaB6YeN572uIHN0YXRlIOS4uumdniBmcmVlIOeKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAncmlzZSdcclxuICAgICAgICAvLyDmuIXpmaQgZ2lmdCBhY3Rpb25cclxuICAgICAgICB0aGlzLmdpZnQuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuZ2lmdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5mbG9wLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uZ2lmdC5wdXRJdGVtKHRoaXMuZ2lmdClcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZnJlZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICBjYXRjaEFuaW1hdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2F0Y2hBbmltYXRlZCkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5jYXRjaEFuaW1hdGVkID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2lmdC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5naWZ0LnJ1bkFjdGlvbih0aGlzLmFjdGlvbnMuc2NhbGUpXHJcbiAgICAgICAgdGhpcy5tYWluLmF1ZGlvLmNhdGNoZWQucGxheSgpXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDor7fmsYLmipPlj5blpITnkIbmjqXlj6NcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMud2FpdCA9IHRydWVcclxuICAgICAgICB0aGlzLm1haW4uYXBpLmdyYWIodGhpcy5naWZ0Ll9nb29kc0lkLCB0aGlzLm1haW4uZ2FtZS5tYXRjaElkKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykgdGhpcy5yZXN1bHRzID0gcmVzLmRhdGEuclxyXG4gICAgICAgICAgICBlbHNlIHRoaXMucmVzdWx0cyA9IG51bGxcclxuICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICAgICAgaWYgKHRoaXMucGF1c2UpIHRoaXMub3ZlcigpXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgdGhpcy53YWl0ID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICB0aGlzLm1haW4udXNlci51cGRhdGUoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXVzZSkgdGhpcy5vdmVyKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApXHJcbiAgICAgICAgLy8gKVxyXG4gICAgICAgIHRoaXMucm9wZS5oZWlnaHQgPSB0aGlzLnJvcGVIZWlnaHQgKyB0aGlzLnkgLSB0aGlzLm5vZGUueVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jYXRjaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0Y2hBbmltYXRlKClcclxuICAgICAgICAgICAgdGhpcy5naWZ0LnggPSB0aGlzLm5vZGUueFxyXG4gICAgICAgICAgICB0aGlzLmdpZnQueSA9IHRoaXMubm9kZS55IC0gMTAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSlcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICAvKiDmo4DmtYvniKrlrZDnirbmgIFcclxuICAgICAgICAqIOmdniBncmFiIOeKtuaAgVxyXG4gICAgICAgICog5LiN5L2c56Kw5pKe5aSE55CGXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAod2luZG93Ll9tYWluLmdhbWUuY2xhdy5zdGF0ZSAhPT0gJ2dyYWInKSByZXR1cm5cclxuICAgICAgICBpZiAoc2VsZi5ub2RlLm5hbWUgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICB3aW5kb3cuX21haW4uZ2FtZS5jbGF3LmNhdGNoZWQgPSB0aGlzLmNoZWNrTGVmdChvdGhlciwgc2VsZilcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGYubm9kZS5uYW1lID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5nYW1lLmNsYXcuY2F0Y2hlZCA9IHRoaXMuY2hlY2tSaWdodChvdGhlciwgc2VsZilcclxuICAgICAgICB9IGVsc2UgY29uc29sZS5lcnJvcign6K+35qOA5p+l57uE5Lu25ZCN6K6+572uJylcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5fbWFpbi5nYW1lLmNsYXcuY2F0Y2hlZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuX21haW4uZ2FtZS5jbGF3LmdpZnQgPSBvdGhlci5ub2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uQ29sbGlzaW9uU3RheShvdGhlciwgc2VsZikge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaGVja0xlZnQoZ2lmdCwgY2xhdykge1xyXG4gICAgICAgIC8vIOi9rOaIkOS4lueVjOWdkOagh1xyXG4gICAgICAgIGNvbnN0IHBvcyA9IHtcclxuICAgICAgICAgICAgZ2lmdDogZ2lmdC5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoMCwgMCksXHJcbiAgICAgICAgICAgIGNsYXc6IGNsYXcubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWx0YSA9IHBvcy5naWZ0LnggLSBwb3MuY2xhdy54XHJcblxyXG4gICAgICAgIGlmIChkZWx0YSA+IDIwKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSxcclxuICAgIGNoZWNrUmlnaHQoZ2lmdCwgY2xhdykge1xyXG4gICAgICAgIC8vIOi9rOaIkOS4lueVjOWdkOagh1xyXG4gICAgICAgIGNvbnN0IHBvcyA9IHtcclxuICAgICAgICAgICAgZ2lmdDogZ2lmdC5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoMCwgMCksXHJcbiAgICAgICAgICAgIGNsYXc6IGNsYXcubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWx0YSA9IHBvcy5jbGF3LnggLSBwb3MuZ2lmdC54XHJcblxyXG4gICAgICAgIGlmIChkZWx0YSA+IDEwKSByZXR1cm4gdHJ1ZVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSlcclxuIiwiaW1wb3J0IENsYXcgZnJvbSAnY2xhdydcclxuaW1wb3J0IFJ1bGUgZnJvbSAncnVsZSdcclxuaW1wb3J0IFByb21wdCBmcm9tICdwcm9tcHQnXHJcbmltcG9ydCBzdGFyUHJvbXB0IGZyb20gJ3N0YXJQcm9tcHQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhcnRCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9yZGVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpdEFyb3VuZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZUxheW91dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZUJ0bnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdpZnRCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhdzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBDbGF3XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFJ1bGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb21wdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBQcm9tcHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZUJrZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2b2ljZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3Rpdml0eUJveDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFyQm94OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHFNYXJrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJSZXN1bHRUaXA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhclByb21wdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBzdGFyUHJvbXB0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBicm9hZGNhc3Q6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKCfov5vlhaXmuLjmiI8nLCAxKVxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkub25FdmVudCgn6L+b5YWl5ri45oiPJylcclxuXHJcbiAgICAgICAgLy8g5b6q546v5bm/5pKtXHJcbiAgICAgICAgdGhpcy5nZXRCcm9hZGNhc3QoKVxyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRCcm9hZGNhc3QoKVxyXG4gICAgICAgIH0sIDNlNClcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QnJvYWRjYXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gJzxjb2xvcj0jZmZmZmZmPuaBreWWnHt9PC9jb2xvcj5cXG48Y29sb3I9I2ZmZmZmZj7ojrflvpc8L2NvbG9yPjxjb2xvcj0jZmZlMzViPnt9PC9jb2xvcj4nXHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5icm9hZGNhc3QoKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vayAmJiByZXMuZGF0YS5yLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHJlcy5kYXRhLnJcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUluZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QucGFyZW50Lm9wYWNpdHkgPSAyNTVcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5icm9hZGNhc3QucGFyZW50LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0LnBhcmVudC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3RBbmltYXRlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlc1t0aGlzLm1lc3NhZ2VJbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gY2hpbGQuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gdGVtcGxhdGUucmVwbGFjZSgvXFx7XFx9L2csICh4LCB5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT09IDE3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzW3RoaXMubWVzc2FnZUluZGV4XS5waG9uZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1t0aGlzLm1lc3NhZ2VJbmRleF0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA9PT0gNjgpIHJldHVybiB0aGlzLm1lc3NhZ2VzW3RoaXMubWVzc2FnZUluZGV4XS5nb29kc05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VJbmRleCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID09PSAwID8gY2hpbGQueSA9IDAgOiBjaGlsZC55ID0gLTEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8g5bm/5pKt5b6q546v5Yqo55S7XHJcbiAgICBicm9hZGNhc3RBbmltYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gJzxjb2xvcj0jZmZmZmZmPuaBreWWnHt9PC9jb2xvcj5cXG48Y29sb3I9I2ZmZmZmZj7ojrflvpc8L2NvbG9yPjxjb2xvcj0jZmZlMzViPnt9PC9jb2xvcj4nXHJcbiAgICAgICAgY29uc3QgdGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpZClcclxuICAgICAgICAgICAgICAgIF90aGlzLmJyb2FkY2FzdC5wYXJlbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJyb2FkY2FzdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoLjUsIDAsIDEwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnkgPiA1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLm1lc3NhZ2VJbmRleCA9PT0gX3RoaXMubWVzc2FnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYnJvYWRjYXN0LnBhcmVudC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IC0xMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZW1wbGF0ZS5yZXBsYWNlKC9cXHtcXH0vZywgZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ID09PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMubWVzc2FnZXNbX3RoaXMubWVzc2FnZUluZGV4XS5waG9uZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWVzc2FnZXNbX3RoaXMubWVzc2FnZUluZGV4XS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ID09PSA2OCkgcmV0dXJuIF90aGlzLm1lc3NhZ2VzW190aGlzLm1lc3NhZ2VJbmRleF0uZ29vZHNOYW1lIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1lc3NhZ2VJbmRleCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBjaGlsZClcclxuICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgM2UzKVxyXG4gICAgfSxcclxuICAgIGluaXQoKSB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hdWRpby5iZ20ucGxheSgpXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmJnbSA9IHdpbmRvdy5fbWFpbi5hdWRpby5iZ20uaXNQbGF5aW5nXHJcblxyXG4gICAgICAgIHRoaXMudm9pY2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJnbSA/IFxyXG4gICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnZvaWNlT24gOiB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnZvaWNlQ2xvc2VcclxuXHJcbiAgICAgICAgLy8g5Z2R5LiL5Zu0IHpJbmRleCA8IGdpZnQuekluZGV4XHJcbiAgICAgICAgdGhpcy5waXRBcm91bmQuekluZGV4ID0gMVxyXG5cclxuICAgICAgICAvLyDlnLrmrKFpZFxyXG4gICAgICAgIHRoaXMubWF0Y2hJZCA9IG51bGxcclxuXHJcblxyXG5cclxuICAgICAgICAvLyDpmpDol4/nu5Pmnpzmj5DnpLrmoYZcclxuICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICAvLyDpmpDol4/ojrflpZborrDlvZVcclxuICAgICAgICB3aW5kb3cuX21haW4ucmVjb3JkLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g6K6+572u6L655qGG55qEIHpJbmRleFxyXG4gICAgICAgIHRoaXMuYm9yZGVyLnpJbmRleCA9IDNcclxuXHJcbiAgICAgICAgLy8g5oyJ6ZKuIHpJbmRleFxyXG4gICAgICAgIHRoaXMuc3Rha2VMYXlvdXQuekluZGV4ID1cclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLnpJbmRleCA9IDNcclxuXHJcbiAgICAgICAgdGhpcy5zdGFrZS56SW5kZXggPSAzXHJcblxyXG4gICAgICAgIC8vIOiuvue9rumfs+aViOaMiemSriB6SW5kZXhcclxuICAgICAgICB0aGlzLnZvaWNlLnpJbmRleCA9IDNcclxuXHJcbiAgICAgICAgLy8g5LiL5rOo5YC8XHJcbiAgICAgICAgdGhpcy5zdGFrZVZhbHVlID0gbnVsbFxyXG5cclxuICAgICAgICAvLyDojrflj5blnLrmrKFcclxuICAgICAgICAvLyB0aGlzLmdldE1vZGVsTGlzdCgpXHJcbiAgICAgICAgdGhpcy5tYXRjaElkID0gNFxyXG5cclxuICAgICAgICB0aGlzLmdldFByaXplTGlzdCgpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRNYXRjaChpbmRleCwgaWQpIHtcclxuICAgICAgICBjb25zdCBidG4gPSB0aGlzLnN0YWtlQnRuc1tpbmRleF1cclxuXHJcbiAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5zdGFrZUJ0blByZXNzXHJcblxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgIHRleHQuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRleHQucnVuQWN0aW9uKGNjLmp1bXBUbygxLCAwLCA5LCAxMCwgMykpXHJcblxyXG4gICAgICAgIC8vIOiuvue9riDlvZPliY3kuIvms6jlgLxcclxuICAgICAgICB0aGlzLnNldFN0YWtlKGluZGV4KVxyXG5cclxuICAgICAgICAvLyDorr7nva4g5b2T5YmN5Zy65qyhIGlkXHJcbiAgICAgICAgdGhpcy5tYXRjaElkID0gaWRcclxuXHJcbiAgICAgICAgdGhpcy5nZXRQcml6ZUxpc3QoKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0U3Rha2UodmFsKSB7XHJcbiAgICAgICAgc3dpdGNoICh2YWwpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFrZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5tYXRjaE1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Rha2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMubWF0Y2hMXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFrZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5tYXRjaFNcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5blj6/njqnlnLrmrKFcclxuICAgIGdldE1vZGVsTGlzdCgpIHtcclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLmdldE1vZGVsTGlzdCgpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEuci5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zW2ldLmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaXRlbS5uYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zW2ldLl9tYXRjaElkID0gaXRlbS5pZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zW2ldLl9vcGVuU3RhdGUgPSBpdGVtLm9wZW5TdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zW2ldLl92YWx1ZSA9IGl0ZW0uZ29sZEV4cGVuZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDpnZ7lvIDmlL7nirbmgIFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ub3BlblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuRGlzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGFrZVZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VWYWx1ZSA9IGl0ZW0uZ29sZEV4cGVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1hdGNoKGksIGl0ZW0uaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPluWlluWTgeWIl+ihqFxyXG4gICAgZ2V0UHJpemVMaXN0KCkge1xyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkuZ2V0UHJpemVMaXN0KHRoaXMubWF0Y2hJZClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5naWZ0LmJ1aWxkKHJlcy5kYXRhLnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93UmVzdWx0KHJlc3VsdHMpIHtcclxuICAgICAgICBpZiAocmVzdWx0cy5ncmFiUmVzdWx0SW50ID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBjYy5sb2FkZXIuZ2V0UmVzKCdpbWFnZS9nYW1lL3Jlc3VsdC13aW4nLCBjYy5TcHJpdGVGcmFtZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgLnNwcml0ZUZyYW1lID0gY2MubG9hZGVyLmdldFJlcygnaW1hZ2UvZ2FtZS9yZXN1bHQtZmFpbCcsIGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGFyUmVzdWx0VGlwLmFjdGl2ZSA9IHJlc3VsdHMuZ2V0U3RhcnNcclxuXHJcbiAgICAgICAgdGhpcy5yZXN1bHQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMucmVzdWx0LmdldENoaWxkQnlOYW1lKCdsaXN0JykuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXN1bHRzLmdyYWJSZXN1bHRTdHJcclxuICAgICAgICB0aGlzLnJlc3VsdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmp1bXBCeSguNSwgMCwgMCwgMTAsIDMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDXmmJ/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5zdGFyc0dvb2RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhclByb21wdC5zaG93KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5zdGFyc0dvb2RzLmltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMuc3RhcnNHb29kcy5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuX21haW4udXNlci5zdGFyc051bSAmJiAhbG9jYWxTdG9yYWdlLmdldFN0YXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2d1aWRlJykuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0U3RhciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5iZ20gJiYgIXdpbmRvdy5fbWFpbi5hdWRpby5iZ20uaXNQbGF5aW5nKSBcclxuICAgICAgICAgICAgd2luZG93Ll9tYWluLmF1ZGlvLmJnbS5wbGF5KClcclxuICAgIH0sXHJcblxyXG4gICAgYWN0aXZpdHlCb3hTaG93KCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlCb3guYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5Qm94LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSwgMzAwMClcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlU3RhcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFyQm94LmNoaWxkcmVuLmZvckVhY2goKHN0YXIsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPCB3aW5kb3cuX21haW4udXNlci5zdGFyc051bSkge1xyXG4gICAgICAgICAgICAgICAgc3Rhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3RhclllbGxvd1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3Rhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3RhckdyYXlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXNcclxuICAgICAgICAvLyDngrnlh7sg6Zeu5Y+3IOWSjCDmmJ/mmJ9cclxuICAgICAgICB0aGlzLnFNYXJrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUJveFNob3csIHRoaXNcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuc3RhckJveC5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlCb3hTaG93LCB0aGlzXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC8vIOmfs+aViOaMiemSrlxyXG4gICAgICAgIHRoaXMudm9pY2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLnZvaWNlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYmdtIF49IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBfdGhpcy5iZ20gPyBcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnZvaWNlT24gOiB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnZvaWNlQ2xvc2VcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuYmdtID8gd2luZG93Ll9tYWluLmF1ZGlvLmJnbS5yZXN1bWUoKSA6IHdpbmRvdy5fbWFpbi5hdWRpby5iZ20ucGF1c2UoKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLy8g5byA5aeL5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hdWRpby5jbGlja1N0YXJ0LnBsYXkoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5zdGFydEJ0blByZXNzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YXJ0QnRuTm9ybWFsXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5tYXRjaElkID09PSBudWxsKSBhbGVydCgn6K+35YWI5LiL5rOoJylcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuX21haW4udXNlci5iYWxhbmNlIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc2hvcC5zaG93KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5jbGF3LmZhbGwoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvLyDkuIvms6jmjInpkq5cclxuICAgICAgICB0aGlzLnN0YWtlQnRucy5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5faW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICBidG4ub24oXHJcbiAgICAgICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g56aB6YCJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidG4uX29wZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGJ0bi5fdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID4gd2luZG93Ll9tYWluLnVzZXIuYmFsYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc2hvcC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VWYWx1ZSA9IHZhbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidG4uX29wZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuTm9ybWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3Rha2VCdG5EaXNhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g56e76Zmk5YW25LuW54m55pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMCwgMCwgMTgpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuUHJlc3NcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnJ1bkFjdGlvbihjYy5qdW1wVG8oMSwgMCwgOSwgMTAsIDMpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIvms6hcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YWtlKGJ0bi5faW5kZXgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidG4uX21hdGNoSWQgIT09IHRoaXMubWF0Y2hJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goYnRuLl9pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcignNTAw5Zy6JywgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcignMTAwMOWcuicsIDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJzIwMDDlnLonLCA1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva4g5b2T5YmN5Zy65qyhIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaElkID0gYnRuLl9tYXRjaElkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWlluWTgeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJpemVMaXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAqIOmrmOe6p+WcuuWIh+aNolxyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGF3LnNldE1vZGVsKHRoaXMubWF0Y2hJZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOinhOWImeaMiemSrlxyXG4gICAgICAgIHRoaXMucnVsZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVsZUJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMucnVsZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVCdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGUuc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvLyBnaWZ0QnRuXHJcbiAgICAgICAgdGhpcy5naWZ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0QnRuLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5naWZ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdEJ0bi5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5yZWNvcmQuc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuc2NvcmVCa2cub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNob3Auc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwcmVmYWJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8g5LiK5LiA5Liq5re75Yqg55qEIGdpZnRcclxuICAgICAgICB0aGlzLmxhc3QgPSBudWxsXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiBnaWZ0IHBvb2xcclxuICAgICAgICAqIOavj+enjSBnaWZ0IOWvueW6lOS4gOS4qiBwb29sXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLnByZWZhYnMubWFwKGl0ZW0gPT4gY2MuaW5zdGFudGlhdGUoaXRlbSkpXHJcblxyXG4gICAgICAgIC8vIOmihOWumuS5iSBhY3Rpb25cclxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIG1vdmU6IGNjLm1vdmVCeSg1LCA4ODgsIDApXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9vbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9vbC5zcGxpY2Uofn4oTWF0aC5yYW5kb20oKSAqIHRoaXMucG9vbC5sZW5ndGgpLCAxKVswXVxyXG4gICAgICAgIH0gZWxzZSByZXR1cm4gbnVsbFxyXG4gICAgfSxcclxuXHJcbiAgICBwdXRJdGVtKGl0ZW0pIHtcclxuICAgICAgICBpdGVtLnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICBpdGVtLnJlbW92ZUZyb21QYXJlbnQoKVxyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKGl0ZW0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAqIEBwYXJhbSB7YXJyYXl9IGdvb2RzTGlzdFxyXG4gICAgKi9cclxuICAgIGJ1aWxkKGxpc3QpIHtcclxuICAgICAgICBjb25zdCBfcG9vbCA9IHRoaXMucG9vbC5jb25jYXQodGhpcy5tYWluLmdhbWUubm9kZS5jaGlsZHJlbi5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdnaWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gaXRlbS5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDpgY3ljoYgbGlzdFxyXG4gICAgICAgICog5pyA57uIIHBvb2wg55qE5Liq5pWw5LulIGxpc3Qg5Li65YeGXHJcbiAgICAgICAgKi9cclxuICAgICAgICBsZXQgaSA9IDBcclxuXHJcbiAgICAgICAgY29uc3QgbG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgbGV0IGdpZnQgPSBfcG9vbFtpXVxyXG4gICAgICAgICAgICBpZiAoIWdpZnQpIHtcclxuICAgICAgICAgICAgICAgIGdpZnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNbMF0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1dEl0ZW0oZ2lmdClcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOWIpOaWreWlluWTgeexu+Wei1xyXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBnaWZ0LmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgIC8vICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLm5hbWUubWF0Y2goL1xcZCsvKVswXVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2lmdC5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJydcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2lmdC5fZ29vZHNJZCA9IGl0ZW0uaWRcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IGdpZnQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoaXRlbS5pbWcsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgIGVsc2Ugc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpXHJcbiAgICAgICAgICAgICAgICBpZiAoKytpIDwgbGlzdC5sZW5ndGgpIGxvYWQoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkKClcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICog5re75YqgIGdpZnRcclxuICAgICog6buY6K6k5L2N572uIOWxj+W5leW3puS+p1xyXG4gICAgKiBAcGFyYW0ge251bWJlcn0geDogLTQ0MVxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0geTogLTI1MFxyXG4gICAgKi9cclxuICAgIGFkZCh4PS00NDEsIHk9LTI1MCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDpu5jorqTmg4XlhrXkuItcclxuICAgICAgICAqIOWxleekuuWlluWTgVxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3RcclxuICAgICAgICAgICAgaSA9IH5+KE1hdGgucmFuZG9tKCkgKiB0aGlzLnByZWZhYnMubGVuZ3RoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgdGhpcy5sYXN0ID0gdGhpcy5nZXRJdGVtKCkgfHwgY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzW2ldKVxyXG4gICAgICAgIHRoaXMubGFzdC5zdG9wQWxsQWN0aW9ucygpXHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2dhbWUnKVxyXG4gICAgICAgICAgICAuYWRkQ2hpbGQodGhpcy5sYXN0KVxyXG4gICAgICAgIHRoaXMubGFzdC5uYW1lID0gJ2dpZnQnXHJcbiAgICAgICAgdGhpcy5sYXN0LnggPSB4XHJcbiAgICAgICAgdGhpcy5sYXN0LnkgPSB5XHJcbiAgICAgICAgdGhpcy5sYXN0LnNjYWxlID0gMVxyXG4gICAgICAgIHRoaXMubGFzdC56SW5kZXggPSAyXHJcbiAgICAgICAgdGhpcy5sYXN0LnJvdGF0aW9uID0gMFxyXG4gICAgICAgIHRoaXMubGFzdC5fdHlwZUluZGV4ID0gaVxyXG5cclxuICAgICAgICB0aGlzLmxhc3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMubW92ZS5jbG9uZSgpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnB1dEl0ZW0odGhpcylcclxuICAgICAgICAgICAgfSwgdGhpcy5sYXN0KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgY2hlY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdCAmJiB0aGlzLmxhc3QueCA+IC0xODIpIHRoaXMuYWRkKClcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2soKVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmFkZCgpXHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH0sIHRoaXNcclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oLjUpKVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG59KSIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHVudXNlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1bnVzZScpXHJcbiAgICB9LFxyXG5cclxuICAgIHJldXNlKCkge1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBob25lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvZGVCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN1Ym1pdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BpcnRlRnJhbWVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2RlQnRuVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy8g572R57uc6K+35rGC54q25oCBXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgd2FpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpbWU6IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dCA9IHRoaXMucGhvbmUuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpXHJcbiAgICAgICAgdGhpcy5jb2RlSW5wdXQgPSB0aGlzLmNvZGUuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpXHJcbiAgICAgICAgd2luZG93Ll9tYWluLnNob3Aubm9kZS56SW5kZXggPSAxXHJcbiAgICB9LFxyXG5cclxuICAgIGNvdW50RG93bigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnRpbWUtLVxyXG4gICAgICAgIHRoaXMuY29kZUJ0blRleHQuc3RyaW5nID0gdGhpcy5zdGF0ZS50aW1lLnRvU3RyaW5nKCkgKyAncydcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50aW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29kZVJlc2V0KClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50RG93bigpXHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgIH0sXHJcblxyXG4gICAgY29kZVJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuY29kZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgIHRoaXMuc3BpcnRlRnJhbWVzWzBdXHJcbiAgICAgICAgdGhpcy5jb2RlQnRuVGV4dC5zdHJpbmcgPSAn6I635Y+W6aqM6K+B56CBJ1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYXNrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOaJi+acuuWPt+i+k+WFpeS6i+S7tuebkeWQrFxyXG4gICAgICAgICog5pu/5o2i6Z2e5pWw5a2X5a2X56ym5Li656m6XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgdGhpcy5waG9uZS5vbigndGV4dC1jaGFuZ2VkJyxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waG9uZUlucHV0LnN0cmluZyA9IHRoaXMucGhvbmVJbnB1dC5zdHJpbmcucmVwbGFjZSgvXFxEL2csICcnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog6aqM6K+B56CB6L6T5YWl5LqL5Lu255uR5ZCsXHJcbiAgICAgICAgKiDmm7/mjaLpnZ7mlbDlrZflrZfnrKbkuLrnqbpcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICB0aGlzLmNvZGUub24oJ3RleHQtY2hhbmdlZCcsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZUlucHV0LnN0cmluZyA9IHRoaXMuY29kZUlucHV0LnN0cmluZy5yZXBsYWNlKC9cXEQvZywgJycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDpqozor4HnoIHmjInpkq7nm5HlkKxcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29kZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZUJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmNvZGVCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlQnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUud2FpdCkgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50aW1lKSByZXR1cm5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLndhaXQgPSB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmFwaS5nZXRDYXB0Y2hhKHRoaXMucGhvbmVJbnB1dC5zdHJpbmcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlkK/liqjlgJLorqHml7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50aW1lID0gNjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudERvd24oKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpcnRlRnJhbWVzWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLmRhdGEubSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53YWl0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOaPkOS6pOaMiemSrlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdWJtaXQub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdC5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLnN1Ym1pdC5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdC5zY2FsZSA9IDFcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXBpLmJpbmRQaG9uZShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBob25lSW5wdXQuc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29kZUlucHV0LnN0cmluZ1xyXG4gICAgICAgICAgICAgICAgKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi51c2VyLnBob25lID0gdGhpcy5waG9uZUlucHV0LnN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZGVJbnB1dC5zdHJpbmcgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBob25lSW5wdXQuc3RyaW5nID0gJydcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuZGF0YS5tKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDlhbPpl63mjInpkq5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuICAgIH0sXHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KC41KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH1cclxufSlcclxuIiwiaW1wb3J0IEdhbWUgZnJvbSAnZ2FtZSdcclxuaW1wb3J0IFNob3AgZnJvbSAnc2hvcCdcclxuaW1wb3J0IEF1ZGlvIGZyb20gJ2F1ZGlvJ1xyXG5pbXBvcnQgUmVjb3JkIGZyb20gJ3JlY29yZCdcclxuaW1wb3J0IExvZ2luIGZyb20gJ2xvZ2luJ1xyXG5pbXBvcnQgYXBpIGZyb20gJ2FwaSdcclxuaW1wb3J0IHVzZXIgZnJvbSAndXNlcidcclxuXHJcblxyXG5jb25zdCBhZGRTY3JpcHQgPSB1cmkgPT4ge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxyXG4gICAgc2NyaXB0LnNyYyA9IHVyaVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0aGVuKGZ1bmMpIHtcclxuICAgICAgICAgICAgZnVuYyA/IHNjcmlwdC5vbmxvYWQgPSBmdW5jIDogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFkZFNjcmlwdCgnLy9jZG4ueW9vc2gudHYvanMvYXhpb3MubWluLmpzJylcclxuLnRoZW4oKCkgPT4ge1xyXG4gICAgYXhpb3MuZGVmYXVsdHMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxyXG59KVxyXG5cclxuXHJcbmlmIChsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2FscGhhJykpIHtcclxuICAgIGFkZFNjcmlwdCgnLy9jZG4ueW9vc2gudHYvanMvZXJ1ZGEubWluLmpzJylcclxuICAgIC50aGVuKCgpID0+IGVydWRhLmluaXQoKSlcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IG9wZW5Db2xsaXNpb24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpXHJcbiAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgLypcclxuICAgICog5byA5ZCvIGRlYnVnIOaooeW8j1xyXG4gICAgKiDmraPlvI/njq/looPkuIvlhbPpl61cclxuICAgICovXHJcbiAgICBpZiAobG9jYXRpb24ucG9ydCA9PT0gJzc0NTYnKSB7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdhbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogR2FtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvcDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBTaG9wXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBBdWRpb1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjb3JkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFJlY29yZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogTG9naW5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgICAgICAvLyDlvIDlkK/norDmkp7mo4DmtYtcclxuICAgICAgICBvcGVuQ29sbGlzaW9uKClcclxuXHJcbiAgICAgICAgd2luZG93Ll9tYWluID0gdGhpc1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuZ2lmdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ2FtZScpXHJcbiAgICAgICAgICAgIC5nZXRDb21wb25lbnQoJ2dpZnQnKVxyXG5cclxuICAgICAgICB0aGlzLmFwaSA9IGFwaVxyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lcyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoJ3Nwcml0ZUZyYW1lJylcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgYXBpLmdldFVzZXJJbmZvKClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2RlID0gYXBpLmdldFBhcmFtKCdjb2RlJylcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBpLmxvZ2luKGNvZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLm5pY2tuYW1lID0gcmVzLmRhdGEuci5uaWNrbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5iYWxhbmNlID0gcmVzLmRhdGEuci5iYWxhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLnBob25lID0gcmVzLmRhdGEuci5waG9uZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5hdmF0YXIgPSByZXMuZGF0YS5yLnByb2ZpbGVJbWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuc3RhcnNOdW0gPSByZXMuZGF0YS5yLnN0YXJzTnVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNjb3JlLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nID0gdXNlci5iYWxhbmNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnVwZGF0ZVN0YXJzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgYXBpLmF1dGhvcml6ZSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLm5pY2tuYW1lID0gcmVzLmRhdGEuci5uaWNrbmFtZVxyXG4gICAgICAgICAgICAgICAgdXNlci5iYWxhbmNlID0gcmVzLmRhdGEuci5iYWxhbmNlXHJcbiAgICAgICAgICAgICAgICB1c2VyLnBob25lID0gcmVzLmRhdGEuci5waG9uZVxyXG4gICAgICAgICAgICAgICAgdXNlci5hdmF0YXIgPSByZXMuZGF0YS5yLnByb2ZpbGVJbWdcclxuICAgICAgICAgICAgICAgIHVzZXIuc3RhcnNOdW0gPSByZXMuZGF0YS5yLnN0YXJzTnVtXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlclxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY29yZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0cmluZyA9IHVzZXIuYmFsYW5jZVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS51cGRhdGVTdGFycygpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY2xvc2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYW5lbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIHRoaXMubWFzay5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDlhbPpl63mjInpkq5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93KGluZm8pIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKGluZm8pXHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2goaW5mbykge1xyXG4gICAgICAgIHRoaXMucGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ3Bob25lJylcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOiOt+WlluWPt+egge+8miR7d2luZG93Ll9tYWluLnVzZXIucGhvbmV9YFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ3N0YXRlJylcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaW5mby5zdGF0ZVxyXG5cclxuICAgICAgICB0aGlzLnBhbmVsLmdldENoaWxkQnlOYW1lKCduYW1lJylcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaW5mby5uYW1lXHJcblxyXG4gICAgICAgIHRoaXMucGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpbmZvLnRleHQucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXHJcblxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkKGluZm8udXJpLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gdGhpcy5wYW5lbC5nZXRDaGlsZEJ5TmFtZSgnaW1hZ2UnKVxyXG4gICAgICAgICAgICBpbWcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSkiLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ2xvdzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJpemU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb2dpbkJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC8vIOWFs+mXrVxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLy8gbG9naW5cclxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMubG9naW5CdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4ubG9naW4uc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93KHVyaSkge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkKHVyaSwgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSBhbGVydChlcnIpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g6K6+572u5aWW5ZOB5Zu+54mHXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaXplLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDngqvlhYnliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvdy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgzLCAzNjApKSlcclxuXHJcbiAgICAgICAgICAgICAgICAvL+aYr+WQpueZu+W9lVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5fbWFpbi51c2VyLnBob25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG5cclxufSlcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog5Yid5aeL5YyW5pe2XHJcbiAgICAgICAgKiDojrflj5YgbWFpbiDnu4Tku7ZcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubWFpbiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKClcclxuICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q29tcG9uZW50KCdtYWluJylcclxuXHJcbiAgICAgICAgLy8gdGhpcy5saXN0ZW4oKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLm5vZGUub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmFwaS5wdXJjaGFzZSh0aGlzLm5vZGUuX19nb29kc0lkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KVxyXG4iLCJpbXBvcnQgUHJpemVEZXRhaWwgZnJvbSAncHJpemVEZXRhaWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdGhlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbkJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcml6ZURldGFpbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBQcml6ZURldGFpbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnByaXplRGV0YWlsLmluaXQoKVxyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5YWz6Zet5oyJ6ZKuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvL2xvZ2luQnRuXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5sb2dpbi5zaG93KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdygpIHtcclxuXHJcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzXHJcblxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcign5oqT5Y676K6w5b2VJywgMTMpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuX21haW4udXNlci5waG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVyLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMub3RoZXIuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkuZ3JhYkhpc3RvcnkoKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICAgICAgICAgIGNvbnN0XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gPSB0aGlzLmxheW91dC5jaGlsZHJlbixcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gcmVzLmRhdGEuclxyXG5cclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuX2JpbmQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZENoaWxkKGNoaWxkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLm9wYWNpdHkgPSAyNTVcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyDojrflpZbnirbmgIFcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuID0gY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2J0bicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IGNoaWxkLmdldENoaWxkQnlOYW1lKCdzdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmFjdGl2ZSA9IFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uYXdhcmRTdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcgPSBpdGVtLmF3YXJkU3RhdHVzU3RyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkLl9iaW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLl9iaW5kID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5vbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucHJpemVEZXRhaWwuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogaXRlbS5nb29kc0ltZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5nb29kc05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBpdGVtLmF3YXJkU3RhdHVzU3RyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtLnJlY2VpdmVJbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCduYW1lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaXRlbS5nb29kc05hbWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdkYXRlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaXRlbS5jcmVhdGVEYXRlLnJlcGxhY2UoLyhcXGR7NH0pKFxcZHsyfSkoXFxkezJ9KS8sICckMS0kMi0kMycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKGl0ZW0uZ29vZHNJbWcsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGNoaWxkLmdldENoaWxkQnlOYW1lKCdpbWFnZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmdvb2RzVHlwZSA9PT0gMSkgaW1nLnNjYWxlID0gLjNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaW1nLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2kgPCBsaXN0Lmxlbmd0aCkgbG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZU91dCguNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmtnOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKCfop4TliJnnlYzpnaInLCAxNClcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oLjUpKVxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYXNrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5idG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG5cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpdGVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDliJvlu7rnqbrlgJ/ngrlcclxuICAgICAgICAqIOaKtea2iCBsYXlvdXQg55qEIGNvdXBvblxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lbXB0eSA9IG5ldyBjYy5Ob2RlKClcclxuICAgICAgICB0aGlzLmVtcHR5Lm5hbWUgPSAnZW1wdHknXHJcbiAgICAgICAgdGhpcy5lbXB0eS5oZWlnaHQgPSAyNlxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYXNrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWFs+mXreaMiemSrlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBzaG93KCkge1xyXG5cclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJ+iOt+WPlumHkeW4gScsIDcpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuXHJcblxyXG5cclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLmdvb2RzTGlzdCgpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICAgICAgICAgIGNvbnN0XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gPSB0aGlzLmxheW91dC5jaGlsZHJlbixcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gcmVzLmRhdGEuclxyXG5cclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZWVkRW1wdHkgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOacieepuuiKgueCueWImSByZW1vdmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5sYXlvdXQuZ2V0Q2hpbGRCeU5hbWUoJ2VtcHR5JylcclxuICAgICAgICAgICAgICAgIGVtcHR5ID8gZW1wdHkucmVtb3ZlRnJvbVBhcmVudCgpIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZENoaWxkKGNoaWxkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLl9nb29kc0lkID0gaXRlbS5pZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ21vcmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHtpdGVtLnByb21vdGlvblF1YW50aXR5femHkeW4gWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdtb3JlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7aXRlbS5uYW1lfWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdsZXNzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7aXRlbS5xdWFudGl0eX3ph5HluIFgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdidG4nKS5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGDvv6UkeyhpdGVtLnByaWNlIC8gMTAwKS50b0ZpeGVkKDIpfWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2NvdXBvbicpLmFjdGl2ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdsZXNzJykuYWN0aXZlID1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnByb21vdGlvblN0YXRlXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkLl9iaW5kKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5fYmluZCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6LSt5Lmw55uR5ZCsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdidG4nKS5vbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnYnRuJykub24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkucHVyY2hhc2UoY2hpbGQuX2dvb2RzSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gcmVzLmRhdGEuclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKGl0ZW0ubmFtZSwgOCwgaXRlbS5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvbW90aW9uU3RhdGUgJiYgaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkRW1wdHkgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChbaXRlbS5pbWcsIGl0ZW0ucHJvbW90aW9uSW1nXSwgKGVyciwgcmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2ltYWdlJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzdWx0cy5nZXRDb250ZW50KGl0ZW0uaW1nKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykueCA9IC00NVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaKmOaJo+Wbvuagh1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2NvdXBvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlc3VsdHMuZ2V0Q29udGVudChpdGVtLnByb21vdGlvbkltZykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsraSA8IGxpc3QubGVuZ3RoKSBsb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmVlZEVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRDaGlsZCh0aGlzLmVtcHR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eS5zZXRTaWJsaW5nSW5kZXgoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkKClcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG59KVxyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBlcmNlbnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IHRoaXMucGVyY2VudC5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgcGVyY2VudC5zdHJpbmcgPSAnMCUnXHJcbiAgICAgICAgY2MubG9hZGVyLm9uUHJvZ3Jlc3MgPSAocGFydCwgdG90YWwpID0+IHtcclxuICAgICAgICAgICAgcGVyY2VudC5zdHJpbmcgPSBgJHt+figxMDAgKiBwYXJ0IC8gdG90YWwpfSVgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnbWFpbicsICgpID0+IHtcclxuICAgICAgICAgICAgY2MubG9hZGVyLm9uUHJvZ3Jlc3MgPSBudWxsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhcnRCdG5Ob3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0QnRuUHJlc3M6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlQnRuTm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZUJ0blByZXNzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZUJ0bkRpc2FibGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdEZhaWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdFdpbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd1JvcGVOb3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdCb2R5Tm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3TGVmdE5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd1JpZ2h0Tm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3Um9wZUdvbGQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdCb2R5R29sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd0xlZnRHb2xkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3UmlnaHRHb2xkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXRjaFM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hdGNoTToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF0Y2hMOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2b2ljZU9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2b2ljZUNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFyR3JheToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhclllbGxvdzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdsb3c6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByaXplOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9naW5CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcml6ZU5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYXNrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAvLyDlhbPpl61cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vIGxvZ2luXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmxvZ2luLnNob3coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdyh1cmksIG5hbWUpIHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZCh1cmksIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikgYWxlcnQoZXJyKVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOiuvue9ruWlluWTgeWbvueJh1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcml6ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g54Kr5YWJ5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb3cucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMywgMzYwKSkpXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcml6ZU5hbWUuc3RyaW5nID0gYOaBreWWnOiOt+W+lyR7bmFtZX1gXHJcblxyXG4gICAgICAgICAgICAgICAgLy/mmK/lkKbnmbvlvZVcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuX21haW4udXNlci5waG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KC41KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH1cclxuXHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHBob25lOiBudWxsLFxyXG4gICAgYmFsYW5jZTogMCxcclxuICAgIGF2YXRhcjogbnVsbCxcclxuICAgIG5pY2tuYW1lOiBudWxsLFxyXG4gICAgc3RhcnNOdW06IDAsXHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG5cclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLmdldFVzZXJJbmZvKClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmlja25hbWUgPSByZXMuZGF0YS5yLm5pY2tuYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSByZXMuZGF0YS5yLmJhbGFuY2VcclxuICAgICAgICAgICAgICAgIHRoaXMucGhvbmUgPSByZXMuZGF0YS5yLnBob25lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhciA9IHJlcy5kYXRhLnIucHJvZmlsZUltZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFyc051bSA9IHJlcy5kYXRhLnIuc3RhcnNOdW1cclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uZ2FtZS51cGRhdGVTdGFycygpXHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmdhbWUuc2NvcmUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHJpbmcgPSB0aGlzLmJhbGFuY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=