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
    SERVER = '//doll.yoosh.tv';

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
        if (TDAPP) {
            var _TDAPP;

            (_TDAPP = TDAPP).onEvent.apply(_TDAPP, arguments);
        }
    };
}

Api.prototype = Base;

exports.default = new Api();

cc._RFpop();
},{}],"audio":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5f7abhaymJEJZrEK2V9qlpg', 'audio');
// js\audio.js

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = cc.Class({
    "extends": cc.Component,
    properties: {
        clickStart: {
            "default": null,
            type: cc.AudioSource
        },
        catched: {
            "default": null,
            type: cc.AudioSource
        }
    }
});
module.exports = exports["default"];

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
                if (res.data.ok) _this2.results = res.data.r;else _this2.results = null;
                _this2.main.user.update();
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
        window._main.api.onEvent('进入游戏');
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

                if (btn._matchId !== _this3.matchId) {
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
},{"claw":"claw","prompt":"prompt","rule":"rule"}],"gift":[function(require,module,exports){
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
                gift.getChildByName('text').getComponent(cc.Label).string = item.name.match(/\d+/)[0];
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
                            _this.user = _user2.default;

                            _this.game.score.getComponent(cc.Label).string = _user2.default.balance;

                            _this.game.node.active = true;
                        }
                    });
                } else _api2.default.authorize();
            } else {
                _user2.default.nickname = res.data.r.nickname;
                _user2.default.balance = res.data.r.balance;
                _user2.default.phone = res.data.r.phone;
                _user2.default.avatar = res.data.r.profileImg;
                _this.user = _user2.default;

                _this.game.score.getComponent(cc.Label).string = _user2.default.balance;

                _this.game.node.active = true;
            }
        });
    }
});

cc._RFpop();
},{"api":"api","audio":"audio","game":"game","login":"login","record":"record","shop":"shop","user":"user"}],"prompt":[function(require,module,exports){
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

        //loginBtn
        this.loginBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.loginBtn.scale = .95;
        });

        this.loginBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this.loginBtn.scale = 1;
            _this.hide();
            window._main.login.show();
        });
    },
    show: function show() {
        var _this2 = this;

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
                var children = _this2.layout.children,
                    list = res.data.r;

                children.forEach(function (child) {
                    child.active = false;
                });
                var load = function load() {
                    var item = list[i];
                    var child = children[i];
                    if (!child) {
                        child = cc.instantiate(_this2.item);
                        _this2.layout.addChild(child);
                    }

                    child.active = true;
                    child.opacity = 255;

                    child.getChildByName('state').getComponent(cc.Label).string = item.awardStatusStr;

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
        var _this3 = this;

        this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
            _this3.node.active = false;
        })));
    }
});

cc._RFpop();
},{}],"rule":[function(require,module,exports){
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

                    child.getChildByName('layout').getChildByName('more').getComponent(cc.Label).string = item.promotionQuantity + '\u91D1\u5E01';

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
        }
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

    update: function update() {
        var _this = this;

        window._main.api.getUserInfo().then(function (res) {
            if (res.data.ok) {
                _this.nickname = res.data.r.nickname;
                _this.balance = res.data.r.balance;
                _this.phone = res.data.r.phone;
                _this.avatar = res.data.r.profileImg;

                window._main.game.score.getComponent(cc.Label).string = _this.balance;
            }
        });
    }
};

cc._RFpop();
},{}]},{},["api","audio","claw","collision","game","gift","handler","login","main","prompt","purchase","record","rule","shop","splash","spriteFrame","user"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9qcy9hcGkuanMiLCJhc3NldHMvanMvYXVkaW8uanMiLCJhc3NldHMvanMvY2xhdy5qcyIsImFzc2V0cy9qcy9jb2xsaXNpb24uanMiLCJhc3NldHMvanMvZ2FtZS5qcyIsImFzc2V0cy9qcy9naWZ0LmpzIiwiYXNzZXRzL2pzL2hhbmRsZXIuanMiLCJhc3NldHMvanMvbG9naW4uanMiLCJhc3NldHMvanMvbWFpbi5qcyIsImFzc2V0cy9qcy9wcm9tcHQuanMiLCJhc3NldHMvanMvcHVyY2hhc2UuanMiLCJhc3NldHMvanMvcmVjb3JkLmpzIiwiYXNzZXRzL2pzL3J1bGUuanMiLCJhc3NldHMvanMvc2hvcC5qcyIsImFzc2V0cy9qcy9zcGxhc2guanMiLCJhc3NldHMvanMvc3ByaXRlRnJhbWUuanMiLCJhc3NldHMvanMvdXNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQTtBQUFBOztBQUlBO0FBQ0k7QUFDSTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUVEO0FBQ0k7QUFBQTtBQUFBOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQTNCUTs7QUE4QmI7O0FBRUk7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMVzs7QUFRZjtBQUNJO0FBQ0g7O0FBRUQ7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDSTtBQURJO0FBRDZCO0FBSzVDOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTtBQUNJO0FBRHlDO0FBR2hEOztBQUVEO0FBQ0k7QUFDSTtBQUNJO0FBQ0E7QUFGSTtBQUQ0QjtBQU0zQzs7QUFFRDtBQUFpRDtBQUFBOztBQUM3QztBQUNJO0FBQ0k7QUFDQTtBQUZJO0FBRG1DO0FBTWxEOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUhJO0FBRCtC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QUNIO0FBQ0Q7O0FBRUk7QUFDQTs7QUFFQTtBQUNBOztBQUlBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFFSDtBQUVEO0FBQ0k7O0FBRUE7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUVIO0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFFQTtBQUNKO0FBQ0k7QUFFQTtBQUNKO0FBQ0k7QUFFQTtBQVpSO0FBY0g7OztBQUVEO0FBQ0E7QUFBZTs7QUFDWDtBQUVJOztBQUVJO0FBQ0k7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNJO0FBRUg7QUFDRztBQUNBO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSjs7O0FBRUQ7QUFDQTtBQUNJO0FBRUk7QUFDSTtBQUNIO0FBQ0o7QUFDSjtBQUVEO0FBQW9COztBQUNoQjtBQUNJO0FBRUg7QUFDRztBQUVIOztBQUVEO0FBQ0E7QUFFQTtBQUdRO0FBQ0k7QUFDSDtBQUNKO0FBSVI7QUFFRDtBQUFTOztBQUNMO0FBQ0E7QUFHUTtBQUNBO0FBRUg7QUFFTDtBQUdRO0FBRUE7QUFFSTtBQUNIO0FBRUo7O0FBR0w7QUFDQTtBQUNJO0FBQ0E7O0FBSVE7QUFDQTtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7O0FBRUE7QUFDSTtBQUNJO0FBRUg7QUFDRztBQUVIO0FBQ0Q7QUFDQTtBQUVBO0FBR0g7O0FBRUQ7O0FBR0E7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0k7QUFDSTtBQUNJO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFUUjtBQVdIOztBQUdEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDSDtBQUVSOztBQUVEO0FBQ0E7QUFHUTtBQUNIO0FBRUw7QUFHUTtBQUNBO0FBQ0g7O0FBSUw7QUFDQTtBQUdRO0FBQ0g7QUFFTDtBQUdRO0FBQ0E7QUFD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Uzs7QUFFTDtBQUVJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSDtBQUNKO0FBRUo7QUFyQlUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIOW4uOmHj1xyXG4qL1xyXG5cclxuY29uc3RcclxuICAgIEFQUElEID0gJ3d4YTk1ZWVlNDhhM2FjNThjNicsXHJcbiAgICBTRVJWRVIgPSAnLy9kb2xsLnlvb3NoLnR2J1xyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuICAgIGdldENvb2tpZShrZXkpIHtcclxuICAgICAgICBrZXkgPSBrZXkudG9TdHJpbmcoKVxyXG4gICAgICAgIGlmICgha2V5Lmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgICAgIGNvbnN0IHN0ciA9IGRvY3VtZW50LmNvb2tpZVxyXG4gICAgICAgIGxldFxyXG4gICAgICAgICAgICBzdGFydCA9IHN0ci5pbmRleE9mKGAke2tleX09YCksXHJcbiAgICAgICAgICAgIGVuZFxyXG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHJldHVybiAnJ1xyXG4gICAgICAgIHN0YXJ0ICs9IGtleS5sZW5ndGggKyAxXHJcbiAgICAgICAgZW5kID0gc3RyLmluZGV4T2YoJzsnLCBzdGFydClcclxuICAgICAgICBlbmQgPT09IC0xID8gZW5kID0gc3RyLmxlbmd0aCA6IG51bGxcclxuICAgICAgICByZXR1cm4gd2luZG93LnVuZXNjYXBlKHN0ci5zbGljZShzdGFydCwgZW5kKSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGFyYW0oa2V5KSB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIHN0ciA9IGxvY2F0aW9uLnNlYXJjaCxcclxuICAgICAgICAgICAgc3RhcnQgPSBzdHIuaW5kZXhPZihrZXkpLFxyXG4gICAgICAgICAgICBlbmRcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgcmV0dXJuICcnXHJcbiAgICAgICAgc3RhcnQgKz0ga2V5Lmxlbmd0aCArIDFcclxuICAgICAgICBlbmQgPSBzdHIuaW5kZXhPZignJicsIHN0YXJ0KVxyXG4gICAgICAgIGVuZCA9PT0gLTEgPyBlbmQgPSBzdHIubGVuZ3RoIDogbnVsbFxyXG4gICAgICAgIHJldHVybiBzdHIuc2xpY2Uoc3RhcnQsIGVuZClcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gQXBpKCkge1xyXG5cclxuICAgIHRoaXMuYXV0aG9yaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBhcHBpZDogQVBQSUQsXHJcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogJ2h0dHBzOi8vZ2FtZS55b29zaC50di9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgcmVzcG9uc2VfdHlwZTogJ2NvZGUnLFxyXG4gICAgICAgICAgICBzY29wZTogJ3Nuc2FwaV9iYXNlJyxcclxuICAgICAgICAgICAgc3RhdGU6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHF1ZXJ5c3RyaW5nID0gT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2tleX09JHtwYXJhbXNba2V5XX1gXHJcbiAgICAgICAgfSkuam9pbignJicpXHJcblxyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBgaHR0cHM6Ly9vcGVuLndlaXhpbi5xcS5jb20vY29ubmVjdC9vYXV0aDIvYXV0aG9yaXplPyR7cXVlcnlzdHJpbmd9YFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvbG9naW5gLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgY29kZTogY29kZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFVzZXJJbmZvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvZ2V0VXNlckluZm9gKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2V0TW9kZWxMaXN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvbW9kZWxMaXN0YClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFByaXplTGlzdCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvcHJpemVMaXN0YCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtnYW1lTW9kZWxJZDogaWR9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyYWIgPSBmdW5jdGlvbihnb29kc0lkLCBtYXRjaElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvZ3JhYmAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTW9kZWxJZDogbWF0Y2hJZCxcclxuICAgICAgICAgICAgICAgIHByaXplSWQ6IGdvb2RzSWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmFiSGlzdG9yeSA9IGZ1bmN0aW9uKHBhZ2U9MSwgcGFnZVNpemU9MTApIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vZG9sbC9ncmFiSGlzdG9yeWAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nb29kc0xpc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vbWFsbC9zYWxlc0dvbGRgKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHVyY2hhc2UgPSBmdW5jdGlvbihpZCwgY2FsbEJhY2tVcmwsIGNhbmNlbFVybCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkLCBjYWxsQmFja1VybCwgY2FuY2VsVXJsKVxyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS9tYWxsL2J1eUdvbGRgLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZ29sZElkOiBpZCxcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrVXJsOiBjYWxsQmFja1VybCB8fCBgJHtsb2NhdGlvbi5vcmlnaW59JHtsb2NhdGlvbi5wYXRobmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVXJsOiBjYW5jZWxVcmwgfHwgYCR7bG9jYXRpb24ub3JpZ2lufSR7bG9jYXRpb24ucGF0aG5hbWV9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldENhcHRjaGEgPSBmdW5jdGlvbihwaG9uZSkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS91c2VyL2dldENvZGVCeVBob25lYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJpbmRQaG9uZSA9IGZ1bmN0aW9uKHBob25lLCBjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvYmluZFBob25lQnlDb2RlYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZSxcclxuICAgICAgICAgICAgICAgIGNvZGU6IGNvZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb25pdG9yID0gZnVuY3Rpb24oZXZlbnQsIGV2ZW50VHlwZSwgZXZlbnRUeXBlVGFiPTApIHtcclxuICAgICAgICBheGlvcy5nZXQoYCR7U0VSVkVSfS9ldmVudC9tb25pdG9yYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlVGFiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25FdmVudCA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAoVERBUFApIHtcclxuICAgICAgICAgICAgVERBUFAub25FdmVudCguLi5hcmdzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkFwaS5wcm90b3R5cGUgPSBCYXNlXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQXBpKClcclxuXHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY2xpY2tTdGFydDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb1NvdXJjZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2F0Y2hlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb1NvdXJjZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxlZnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmlnaHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9wZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRNb2RlbChpKSB7XHJcbiAgICAgICAgaWYgKGkgPT09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3BlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3Um9wZUdvbGRcclxuICAgICAgICAgICAgdGhpcy5ib2R5LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3Qm9keUdvbGRcclxuICAgICAgICAgICAgdGhpcy5sZWZ0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3TGVmdEdvbGRcclxuICAgICAgICAgICAgdGhpcy5yaWdodC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd1JpZ2h0R29sZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9wZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd1JvcGVOb3JtYWxcclxuICAgICAgICAgICAgdGhpcy5ib2R5LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3Qm9keU5vcm1hbFxyXG4gICAgICAgICAgICB0aGlzLmxlZnQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdMZWZ0Tm9ybWFsXHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdSaWdodE5vcm1hbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog5Yid5aeL5YyW5pe2XHJcbiAgICAgICAgKiDojrflj5YgbWFpbiDnu4Tku7ZcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubWFpbiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKClcclxuICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q29tcG9uZW50KCdtYWluJylcclxuXHJcbiAgICAgICAgLy8g5a6a5LmJ5Yqo5L2cXHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0ge1xyXG4gICAgICAgICAgICByb3RhdGU6IGNjLnJvdGF0ZUJ5KC4xLCA1NiksXHJcbiAgICAgICAgICAgIG1vdmU6IGNjLm1vdmVCeSguMywgMCwgLTQ0MCksXHJcbiAgICAgICAgICAgIHVwOiBjYy5tb3ZlQnkoLjYsIDAsIDQ0MCksXHJcbiAgICAgICAgICAgIHNjYWxlOiBjYy5zY2FsZUJ5KC4zLCAuNSksXHJcbiAgICAgICAgICAgIGZsb3A6IGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Mucm90YXRlQnkoLjgsIDM2MCkucmVwZWF0Rm9yZXZlcigpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KC44LCAwLCAtNTAwKSxcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlQnkoLjgsIDEuNSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g54iq5a2Q54q25oCBXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdmcmVlJ1xyXG5cclxuICAgICAgICAvLyDniKrlrZDliJ3lp4vpq5jluqZcclxuICAgICAgICB0aGlzLnkgPSAzNzdcclxuXHJcbiAgICAgICAgLy8g57uz5a2Q5Yid5aeL6ZW/5bqmXHJcbiAgICAgICAgdGhpcy5yb3BlSGVpZ2h0ID0gMTIwXHJcblxyXG4gICAgICAgIC8vIOaYr+WQpuaKk+S9j1xyXG4gICAgICAgIHRoaXMuY2F0Y2hlZCA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIOaKk+WPlueahCBnaWZ0XHJcbiAgICAgICAgdGhpcy5naWZ0ID0gbnVsbFxyXG5cclxuICAgICAgICAvLyDmipPlj5bliqjnlLtcclxuICAgICAgICB0aGlzLmNhdGNoQW5pbWF0ZWQgPSBmYWxzZVxyXG5cclxuICAgICAgICAvLyDmjqXlj6Por7fmsYLnirbmgIFcclxuICAgICAgICB0aGlzLndhaXQgPSBmYWxzZVxyXG5cclxuICAgICAgICAvLyDmipPlj5bnu5PmnpxcclxuICAgICAgICB0aGlzLnJlc3VsdHMgPSBudWxsXHJcblxyXG4gICAgICAgIC8vIOetieW+heaOpeWPo+iAjOS4reatoumHiuaUvuaTjeS9nFxyXG4gICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZVxyXG4gICAgfSxcclxuXHJcbiAgICBncmFiKGZ1bmMpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ2ZhbGwnKSByZXR1cm5cclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2dyYWInXHJcbiAgICAgICAgdGhpcy5sZWZ0LnJ1bkFjdGlvbih0aGlzLmFjdGlvbnMucm90YXRlLnJldmVyc2UoKSlcclxuICAgICAgICB0aGlzLnJpZ2h0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnJvdGF0ZSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuYylcclxuICAgICAgICApKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZnJlZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ3Jpc2UnKSByZXR1cm5cclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2ZyZWUnXHJcbiAgICAgICAgdGhpcy5sZWZ0LnJ1bkFjdGlvbih0aGlzLmFjdGlvbnMucm90YXRlKVxyXG4gICAgICAgIHRoaXMucmlnaHQucnVuQWN0aW9uKHRoaXMuYWN0aW9ucy5yb3RhdGUucmV2ZXJzZSgpKVxyXG4gICAgICAgIHRoaXMuY2F0Y2hlZCA9XHJcbiAgICAgICAgdGhpcy5jYXRjaEFuaW1hdGVkID0gZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgZmFsbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ2ZyZWUnKSByZXR1cm5cclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2ZhbGwnXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLm1vdmUsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhYih0aGlzLnJpc2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcign5byA5aeL5oyJ6ZKuJywgNilcclxuICAgIH0sXHJcblxyXG4gICAgb3ZlcigpIHtcclxuICAgICAgICAvLyDph43nva4gcGF1c2VcclxuICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2VcclxuICAgICAgICBpZiAodGhpcy5jYXRjaGVkKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnQuekluZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb3NlKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOmHjee9riBnaWZ0IHpJbmRleCA8IHBpdC1hcm91bmRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMuZ3JhYlJlc3VsdEludCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdC56SW5kZXggPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3NlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uZ2FtZS5zaG93UmVzdWx0KHRoaXMucmVzdWx0cylcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZXN1bHRzLmdyYWJSZXN1bHRJbnQgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpbigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMuZ29vZHMudHlwZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uZ2FtZS5zaG93UmVzdWx0KHRoaXMucmVzdWx0cylcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmipPliLDlrp7niannmoTmlYjmnpxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLmdhbWUucHJvbXB0LnNob3codGhpcy5yZXN1bHRzLmdvb2RzLmltZylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mcmVlKClcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgKiDor7fmsYLmipPlj5blpITnkIbmjqXlj6NcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy53YWl0ID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm1haW4uYXBpLmdyYWIobnVsbCwgdGhpcy5tYWluLmdhbWUubWF0Y2hJZClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHRoaXMucmVzdWx0cyA9IHJlcy5kYXRhLnJcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMgPSBudWxsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4udXNlci51cGRhdGUoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJpc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09ICdncmFiJykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdyaXNlJ1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy51cCxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2FpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgdGhpcy5vdmVyKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICByYW5kb20oKSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgIH0sXHJcblxyXG4gICAgd2luKCkge1xyXG4gICAgICAgIHRoaXMubWFpbi5naWZ0LnB1dEl0ZW0odGhpcy5naWZ0KVxyXG4gICAgICAgIHRoaXMuZnJlZSgpXHJcbiAgICB9LFxyXG5cclxuICAgIGxvc2UoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOaOieiQvVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5mcmVlKClcclxuICAgICAgICAvLyDmraTml7bopoHph43nva4gc3RhdGUg5Li66Z2eIGZyZWUg54q25oCBXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdyaXNlJ1xyXG4gICAgICAgIC8vIOa4hemZpCBnaWZ0IGFjdGlvblxyXG4gICAgICAgIHRoaXMuZ2lmdC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5naWZ0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZsb3AsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5naWZ0LnB1dEl0ZW0odGhpcy5naWZ0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdmcmVlJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuICAgIGNhdGNoQW5pbWF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYXRjaEFuaW1hdGVkKSByZXR1cm5cclxuICAgICAgICB0aGlzLmNhdGNoQW5pbWF0ZWQgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5naWZ0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB0aGlzLmdpZnQucnVuQWN0aW9uKHRoaXMuYWN0aW9ucy5zY2FsZSlcclxuICAgICAgICB0aGlzLm1haW4uYXVkaW8uY2F0Y2hlZC5wbGF5KClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOivt+axguaKk+WPluWkhOeQhuaOpeWPo1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy53YWl0ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubWFpbi5hcGkuZ3JhYih0aGlzLmdpZnQuX2dvb2RzSWQsIHRoaXMubWFpbi5nYW1lLm1hdGNoSWQpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy53YWl0ID0gZmFsc2VcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB0aGlzLnJlc3VsdHMgPSByZXMuZGF0YS5yXHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICB0aGlzLm1haW4udXNlci51cGRhdGUoKVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGF1c2UpIHRoaXMub3ZlcigpXHJcblxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IG51bGxcclxuICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICAgICAgaWYgKHRoaXMucGF1c2UpIHRoaXMub3ZlcigpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZSgwLCAwKVxyXG4gICAgICAgIC8vIClcclxuICAgICAgICB0aGlzLnJvcGUuaGVpZ2h0ID0gdGhpcy5yb3BlSGVpZ2h0ICsgdGhpcy55IC0gdGhpcy5ub2RlLnlcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2F0Y2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhdGNoQW5pbWF0ZSgpXHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdC54ID0gdGhpcy5ub2RlLnhcclxuICAgICAgICAgICAgdGhpcy5naWZ0LnkgPSB0aGlzLm5vZGUueSAtIDEwMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pXHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XHJcbiAgICAgICAgLyog5qOA5rWL54iq5a2Q54q25oCBXHJcbiAgICAgICAgKiDpnZ4gZ3JhYiDnirbmgIFcclxuICAgICAgICAqIOS4jeS9nOeisOaSnuWkhOeQhlxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKHdpbmRvdy5fbWFpbi5nYW1lLmNsYXcuc3RhdGUgIT09ICdncmFiJykgcmV0dXJuXHJcbiAgICAgICAgaWYgKHNlbGYubm9kZS5uYW1lID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgd2luZG93Ll9tYWluLmdhbWUuY2xhdy5jYXRjaGVkID0gdGhpcy5jaGVja0xlZnQob3RoZXIsIHNlbGYpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLm5vZGUubmFtZSA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICB3aW5kb3cuX21haW4uZ2FtZS5jbGF3LmNhdGNoZWQgPSB0aGlzLmNoZWNrUmlnaHQob3RoZXIsIHNlbGYpXHJcbiAgICAgICAgfSBlbHNlIGNvbnNvbGUuZXJyb3IoJ+ivt+ajgOafpee7hOS7tuWQjeiuvue9ricpXHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuX21haW4uZ2FtZS5jbGF3LmNhdGNoZWQpIHtcclxuICAgICAgICAgICAgd2luZG93Ll9tYWluLmdhbWUuY2xhdy5naWZ0ID0gb3RoZXIubm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgY2hlY2tMZWZ0KGdpZnQsIGNsYXcpIHtcclxuICAgICAgICAvLyDovazmiJDkuJbnlYzlnZDmoIdcclxuICAgICAgICBjb25zdCBwb3MgPSB7XHJcbiAgICAgICAgICAgIGdpZnQ6IGdpZnQubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApLFxyXG4gICAgICAgICAgICBjbGF3OiBjbGF3Lm5vZGUuY29udmVydFRvV29ybGRTcGFjZSgwLCAwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVsdGEgPSBwb3MuZ2lmdC54IC0gcG9zLmNsYXcueFxyXG5cclxuICAgICAgICBpZiAoZGVsdGEgPiAyMCkgcmV0dXJuIHRydWVcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0sXHJcbiAgICBjaGVja1JpZ2h0KGdpZnQsIGNsYXcpIHtcclxuICAgICAgICAvLyDovazmiJDkuJbnlYzlnZDmoIdcclxuICAgICAgICBjb25zdCBwb3MgPSB7XHJcbiAgICAgICAgICAgIGdpZnQ6IGdpZnQubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApLFxyXG4gICAgICAgICAgICBjbGF3OiBjbGF3Lm5vZGUuY29udmVydFRvV29ybGRTcGFjZSgwLCAwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVsdGEgPSBwb3MuY2xhdy54IC0gcG9zLmdpZnQueFxyXG5cclxuICAgICAgICBpZiAoZGVsdGEgPiAxMCkgcmV0dXJuIHRydWVcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0pXHJcbiIsImltcG9ydCBDbGF3IGZyb20gJ2NsYXcnXHJcbmltcG9ydCBSdWxlIGZyb20gJ3J1bGUnXHJcbmltcG9ydCBQcm9tcHQgZnJvbSAncHJvbXB0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHN0YXJ0QnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvcmRlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaXRBcm91bmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2VMYXlvdXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2VCdG5zOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnaWZ0QnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQ2xhd1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBSdWxlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9tcHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogUHJvbXB0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN1bHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NvcmU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKCfov5vlhaXmuLjmiI8nLCAxKVxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkub25FdmVudCgn6L+b5YWl5ri45oiPJylcclxuICAgIH0sXHJcbiAgICBpbml0KCkge1xyXG5cclxuICAgICAgICAvLyDlnZHkuIvlm7QgekluZGV4IDwgZ2lmdC56SW5kZXhcclxuICAgICAgICB0aGlzLnBpdEFyb3VuZC56SW5kZXggPSAxXHJcblxyXG4gICAgICAgIC8vIOWcuuasoWlkXHJcbiAgICAgICAgdGhpcy5tYXRjaElkID0gbnVsbFxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vIOmakOiXj+e7k+aenOaPkOekuuahhlxyXG4gICAgICAgIHRoaXMucmVzdWx0LmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIOmakOiXj+iOt+WlluiusOW9lVxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5yZWNvcmQubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICAvLyDorr7nva7ovrnmoYbnmoQgekluZGV4XHJcbiAgICAgICAgdGhpcy5ib3JkZXIuekluZGV4ID0gM1xyXG5cclxuICAgICAgICAvLyDmjInpkq4gekluZGV4XHJcbiAgICAgICAgdGhpcy5zdGFrZUxheW91dC56SW5kZXggPVxyXG4gICAgICAgIHRoaXMuc3RhcnRCdG4uekluZGV4ID0gM1xyXG5cclxuICAgICAgICAvLyDorr7nva7kuIvms6jmjInpkq4gekluZGV4XHJcbiAgICAgICAgdGhpcy5zdGFrZS56SW5kZXggPSAzXHJcblxyXG4gICAgICAgIC8vIOS4i+azqOWAvFxyXG4gICAgICAgIHRoaXMuc3Rha2VWYWx1ZSA9IG51bGxcclxuXHJcbiAgICAgICAgLy8g6I635Y+W5Zy65qyhXHJcbiAgICAgICAgdGhpcy5nZXRNb2RlbExpc3QoKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0TWF0Y2goaW5kZXgsIGlkKSB7XHJcbiAgICAgICAgY29uc3QgYnRuID0gdGhpcy5zdGFrZUJ0bnNbaW5kZXhdXHJcblxyXG4gICAgICAgIGJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3Rha2VCdG5QcmVzc1xyXG5cclxuICAgICAgICBjb25zdCB0ZXh0ID0gYnRuLmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICB0ZXh0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB0ZXh0LnJ1bkFjdGlvbihjYy5qdW1wVG8oMSwgMCwgOSwgMTAsIDMpKVxyXG5cclxuICAgICAgICAvLyDorr7nva4g5b2T5YmN5LiL5rOo5YC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGFrZShpbmRleClcclxuXHJcbiAgICAgICAgLy8g6K6+572uIOW9k+WJjeWcuuasoSBpZFxyXG4gICAgICAgIHRoaXMubWF0Y2hJZCA9IGlkXHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UHJpemVMaXN0KClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFN0YWtlKHZhbCkge1xyXG4gICAgICAgIHN3aXRjaCAodmFsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Rha2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMubWF0Y2hNXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWtlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLm1hdGNoTFxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Rha2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMubWF0Y2hTXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W5Y+v546p5Zy65qyhXHJcbiAgICBnZXRNb2RlbExpc3QoKSB7XHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5nZXRNb2RlbExpc3QoKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlcy5kYXRhLnIuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zW2ldLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRuc1tpXS5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGl0ZW0ubmFtZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRuc1tpXS5fbWF0Y2hJZCA9IGl0ZW0uaWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRuc1tpXS5fb3BlblN0YXRlID0gaXRlbS5vcGVuU3RhdGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRuc1tpXS5fdmFsdWUgPSBpdGVtLmdvbGRFeHBlbmRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Z2e5byA5pS+54q25oCBXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLm9wZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRuc1tpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwcml0ZUZyYW1lID0gd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5zdGFrZUJ0bkRpc2FibGVcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3Rha2VWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlVmFsdWUgPSBpdGVtLmdvbGRFeHBlbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXRjaChpLCBpdGVtLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5blpZblk4HliJfooahcclxuICAgIGdldFByaXplTGlzdCgpIHtcclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLmdldFByaXplTGlzdCh0aGlzLm1hdGNoSWQpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uZ2lmdC5idWlsZChyZXMuZGF0YS5yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1Jlc3VsdChyZXN1bHRzKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdHMuZ3JhYlJlc3VsdEludCA9PT0gMykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgLnNwcml0ZUZyYW1lID0gY2MubG9hZGVyLmdldFJlcygnaW1hZ2UvZ2FtZS9yZXN1bHQtd2luJywgY2MuU3ByaXRlRnJhbWUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IGNjLmxvYWRlci5nZXRSZXMoJ2ltYWdlL2dhbWUvcmVzdWx0LWZhaWwnLCBjYy5TcHJpdGVGcmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVzdWx0LmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnJlc3VsdC5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlc3VsdHMuZ3JhYlJlc3VsdFN0clxyXG4gICAgICAgIHRoaXMucmVzdWx0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuanVtcEJ5KC41LCAwLCAwLCAxMCwgMyksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIC8vIOW8gOWni+aMiemSrlxyXG4gICAgICAgIHRoaXMuc3RhcnRCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXVkaW8uY2xpY2tTdGFydC5wbGF5KClcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3RhcnRCdG5QcmVzc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMuc3RhcnRCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5zdGFydEJ0bk5vcm1hbFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hJZCA9PT0gbnVsbCkgYWxlcnQoJ+ivt+WFiOS4i+azqCcpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3aW5kb3cuX21haW4udXNlci5iYWxhbmNlIDwgdGhpcy5zdGFrZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNob3Auc2hvdygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuY2xhdy5mYWxsKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLy8g5LiL5rOo5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5zdGFrZUJ0bnMuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBidG4uX2luZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgYnRuLm9uKFxyXG4gICAgICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICAgICBldmVudCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOemgemAiVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYnRuLl9vcGVuU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBidG4uX3ZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA+IHdpbmRvdy5fbWFpbi51c2VyLmJhbGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNob3Auc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlVmFsdWUgPSB2YWxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnRuLl9vcGVuU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5zdGFrZUJ0bk5vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuRGlzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOenu+mZpOWFtuS7lueJueaViFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ydW5BY3Rpb24oY2MubW92ZVRvKDAsIDAsIDE4KSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5zdGFrZUJ0blByZXNzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC5ydW5BY3Rpb24oY2MuanVtcFRvKDEsIDAsIDksIDEwLCAzKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiL5rOoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFrZShidG4uX2luZGV4KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnRuLl9tYXRjaElkICE9PSB0aGlzLm1hdGNoSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGJ0bi5faW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJzUwMOWcuicsIDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJzEwMDDlnLonLCA0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKCcyMDAw5Zy6JywgNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572uIOW9k+WJjeWcuuasoSBpZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hJZCA9IGJ0bi5fbWF0Y2hJZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDojrflj5blpZblk4HliJfooahcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByaXplTGlzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgKiDpq5jnuqflnLrliIfmjaJcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhdy5zZXRNb2RlbCh0aGlzLm1hdGNoSWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDop4TliJnmjInpkq5cclxuICAgICAgICB0aGlzLnJ1bGVCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVCdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLnJ1bGVCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlQnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlLnNob3coKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLy8gZ2lmdEJ0blxyXG4gICAgICAgIHRoaXMuZ2lmdEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdEJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMuZ2lmdEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRCdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4ucmVjb3JkLnNob3coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvLyBhZGRCdG5cclxuICAgICAgICB0aGlzLmFkZEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQnRuLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5hZGRCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc2hvcC5zaG93KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHByZWZhYnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog5Yid5aeL5YyW5pe2XHJcbiAgICAgICAgKiDojrflj5YgbWFpbiDnu4Tku7ZcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubWFpbiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKClcclxuICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q29tcG9uZW50KCdtYWluJylcclxuXHJcblxyXG5cclxuICAgICAgICAvLyDkuIrkuIDkuKrmt7vliqDnmoQgZ2lmdFxyXG4gICAgICAgIHRoaXMubGFzdCA9IG51bGxcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIGdpZnQgcG9vbFxyXG4gICAgICAgICog5q+P56eNIGdpZnQg5a+55bqU5LiA5LiqIHBvb2xcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMucHJlZmFicy5tYXAoaXRlbSA9PiBjYy5pbnN0YW50aWF0ZShpdGVtKSlcclxuXHJcbiAgICAgICAgLy8g6aKE5a6a5LmJIGFjdGlvblxyXG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHtcclxuICAgICAgICAgICAgbW92ZTogY2MubW92ZUJ5KDUsIDg4OCwgMClcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0SXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wb29sLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb29sLnNwbGljZSh+fihNYXRoLnJhbmRvbSgpICogdGhpcy5wb29sLmxlbmd0aCksIDEpWzBdXHJcbiAgICAgICAgfSBlbHNlIHJldHVybiBudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIHB1dEl0ZW0oaXRlbSkge1xyXG4gICAgICAgIGl0ZW0uc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIGl0ZW0ucmVtb3ZlRnJvbVBhcmVudCgpXHJcbiAgICAgICAgdGhpcy5wb29sLnB1c2goaXRlbSlcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICogQHBhcmFtIHthcnJheX0gZ29vZHNMaXN0XHJcbiAgICAqL1xyXG4gICAgYnVpbGQobGlzdCkge1xyXG4gICAgICAgIGNvbnN0IF9wb29sID0gdGhpcy5wb29sLmNvbmNhdCh0aGlzLm1haW4uZ2FtZS5ub2RlLmNoaWxkcmVuLmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ2dpZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpdGVtLnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSlcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOmBjeWOhiBsaXN0XHJcbiAgICAgICAgKiDmnIDnu4ggcG9vbCDnmoTkuKrmlbDku6UgbGlzdCDkuLrlh4ZcclxuICAgICAgICAqL1xyXG4gICAgICAgIGxldCBpID0gMFxyXG5cclxuICAgICAgICBjb25zdCBsb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgZ2lmdCA9IF9wb29sW2ldXHJcbiAgICAgICAgICAgIGlmICghZ2lmdCkge1xyXG4gICAgICAgICAgICAgICAgZ2lmdCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFic1swXSlcclxuICAgICAgICAgICAgICAgIHRoaXMucHV0SXRlbShnaWZ0KVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5Yik5pat5aWW5ZOB57G75Z6LXHJcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGdpZnQuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGl0ZW0ubmFtZS5tYXRjaCgvXFxkKy8pWzBdXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnaWZ0LmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnaWZ0Ll9nb29kc0lkID0gaXRlbS5pZFxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlID0gZ2lmdC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChpdGVtLmltZywgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSlcclxuICAgICAgICAgICAgICAgIGlmICgrK2kgPCBsaXN0Lmxlbmd0aCkgbG9hZCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvYWQoKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgKiDmt7vliqAgZ2lmdFxyXG4gICAgKiDpu5jorqTkvY3nva4g5bGP5bmV5bem5L6nXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB4OiAtNDQxXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB5OiAtMjUwXHJcbiAgICAqL1xyXG4gICAgYWRkKHg9LTQ0MSwgeT0tMjUwKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOm7mOiupOaDheWGteS4i1xyXG4gICAgICAgICog5bGV56S65aWW5ZOBXHJcbiAgICAgICAgKi9cclxuICAgICAgICBjb25zdFxyXG4gICAgICAgICAgICBpID0gfn4oTWF0aC5yYW5kb20oKSAqIHRoaXMucHJlZmFicy5sZW5ndGgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXNcclxuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLmdldEl0ZW0oKSB8fCBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNbaV0pXHJcbiAgICAgICAgdGhpcy5sYXN0LnN0b3BBbGxBY3Rpb25zKClcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnZ2FtZScpXHJcbiAgICAgICAgICAgIC5hZGRDaGlsZCh0aGlzLmxhc3QpXHJcbiAgICAgICAgdGhpcy5sYXN0Lm5hbWUgPSAnZ2lmdCdcclxuICAgICAgICB0aGlzLmxhc3QueCA9IHhcclxuICAgICAgICB0aGlzLmxhc3QueSA9IHlcclxuICAgICAgICB0aGlzLmxhc3Quc2NhbGUgPSAxXHJcbiAgICAgICAgdGhpcy5sYXN0LnpJbmRleCA9IDJcclxuICAgICAgICB0aGlzLmxhc3Qucm90YXRpb24gPSAwXHJcbiAgICAgICAgdGhpcy5sYXN0Ll90eXBlSW5kZXggPSBpXHJcblxyXG4gICAgICAgIHRoaXMubGFzdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5tb3ZlLmNsb25lKCksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucHV0SXRlbSh0aGlzKVxyXG4gICAgICAgICAgICB9LCB0aGlzLmxhc3QpXHJcbiAgICAgICAgKSlcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBjaGVjaygpIHtcclxuICAgICAgICBpZiAodGhpcy5sYXN0ICYmIHRoaXMubGFzdC54ID4gLTE4MikgdGhpcy5hZGQoKVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5jaGVjaygpXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIHRoaXMuYWRkKClcclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgdW51c2UoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VudXNlJylcclxuICAgIH0sXHJcblxyXG4gICAgcmV1c2UoKSB7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGhvbmU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29kZUJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VibWl0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcGlydGVGcmFtZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvZGVCdG5UZXh0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyDnvZHnu5zor7fmsYLnirbmgIFcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB3YWl0OiBmYWxzZSxcclxuICAgICAgICAgICAgdGltZTogMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5waG9uZUlucHV0ID0gdGhpcy5waG9uZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveClcclxuICAgICAgICB0aGlzLmNvZGVJbnB1dCA9IHRoaXMuY29kZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveClcclxuICAgICAgICB3aW5kb3cuX21haW4uc2hvcC5ub2RlLnpJbmRleCA9IDFcclxuICAgIH0sXHJcblxyXG4gICAgY291bnREb3duKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudGltZS0tXHJcbiAgICAgICAgdGhpcy5jb2RlQnRuVGV4dC5zdHJpbmcgPSB0aGlzLnN0YXRlLnRpbWUudG9TdHJpbmcoKSArICdzJ1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb2RlUmVzZXQoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnREb3duKClcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgfSxcclxuXHJcbiAgICBjb2RlUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb2RlQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgdGhpcy5zcGlydGVGcmFtZXNbMF1cclxuICAgICAgICB0aGlzLmNvZGVCdG5UZXh0LnN0cmluZyA9ICfojrflj5bpqozor4HnoIEnXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5omL5py65Y+36L6T5YWl5LqL5Lu255uR5ZCsXHJcbiAgICAgICAgKiDmm7/mjaLpnZ7mlbDlrZflrZfnrKbkuLrnqbpcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICB0aGlzLnBob25lLm9uKCd0ZXh0LWNoYW5nZWQnLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBob25lSW5wdXQuc3RyaW5nID0gdGhpcy5waG9uZUlucHV0LnN0cmluZy5yZXBsYWNlKC9cXEQvZywgJycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDpqozor4HnoIHovpPlhaXkuovku7bnm5HlkKxcclxuICAgICAgICAqIOabv+aNoumdnuaVsOWtl+Wtl+espuS4uuepulxyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIHRoaXMuY29kZS5vbigndGV4dC1jaGFuZ2VkJyxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlSW5wdXQuc3RyaW5nID0gdGhpcy5jb2RlSW5wdXQuc3RyaW5nLnJlcGxhY2UoL1xcRC9nLCAnJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOmqjOivgeeggeaMiemSruebkeWQrFxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb2RlQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlQnRuLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuY29kZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVCdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS53YWl0KSByZXR1cm5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRpbWUpIHJldHVyblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUud2FpdCA9IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXBpLmdldENhcHRjaGEodGhpcy5waG9uZUlucHV0LnN0cmluZylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWQr+WKqOWAkuiuoeaXtlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWUgPSA2MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50RG93bigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGlydGVGcmFtZXNbMV1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuZGF0YS5tKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLndhaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5o+Q5Lqk5oyJ6ZKuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnN1Ym1pdC5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuc3VibWl0Lm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LnNjYWxlID0gMVxyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkuYmluZFBob25lKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dC5zdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlSW5wdXQuc3RyaW5nXHJcbiAgICAgICAgICAgICAgICApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnVzZXIucGhvbmUgPSB0aGlzLnBob25lSW5wdXQuc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29kZUlucHV0LnN0cmluZyA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dC5zdHJpbmcgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5kYXRhLm0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWFs+mXreaMiemSrlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oLjUpKVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG59KVxyXG4iLCJpbXBvcnQgR2FtZSBmcm9tICdnYW1lJ1xyXG5pbXBvcnQgU2hvcCBmcm9tICdzaG9wJ1xyXG5pbXBvcnQgQXVkaW8gZnJvbSAnYXVkaW8nXHJcbmltcG9ydCBSZWNvcmQgZnJvbSAncmVjb3JkJ1xyXG5pbXBvcnQgTG9naW4gZnJvbSAnbG9naW4nXHJcbmltcG9ydCBhcGkgZnJvbSAnYXBpJ1xyXG5pbXBvcnQgdXNlciBmcm9tICd1c2VyJ1xyXG5cclxuXHJcbmNvbnN0IGFkZFNjcmlwdCA9IHVyaSA9PiB7XHJcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXHJcbiAgICBzY3JpcHQuc3JjID0gdXJpXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRoZW4oZnVuYykge1xyXG4gICAgICAgICAgICBmdW5jID8gc2NyaXB0Lm9ubG9hZCA9IGZ1bmMgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYWRkU2NyaXB0KCcvL2Nkbi55b29zaC50di9qcy9heGlvcy5taW4uanMnKVxyXG4udGhlbigoKSA9PiB7XHJcbiAgICBheGlvcy5kZWZhdWx0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXHJcbn0pXHJcblxyXG5cclxuaWYgKGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnYWxwaGEnKSkge1xyXG4gICAgYWRkU2NyaXB0KCcvL2Nkbi55b29zaC50di9qcy9lcnVkYS5taW4uanMnKVxyXG4gICAgLnRoZW4oKCkgPT4gZXJ1ZGEuaW5pdCgpKVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3Qgb3BlbkNvbGxpc2lvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKClcclxuICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWVcclxuXHJcbiAgICAvKlxyXG4gICAgKiDlvIDlkK8gZGVidWcg5qih5byPXHJcbiAgICAqIOato+W8j+eOr+Wig+S4i+WFs+mXrVxyXG4gICAgKi9cclxuICAgIGlmIChsb2NhdGlvbi5wb3J0ID09PSAnNzQ1NicpIHtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ2FtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBHYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG9wOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFNob3BcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IEF1ZGlvXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWNvcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogUmVjb3JkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBMb2dpblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgICAgIC8vIOW8gOWQr+eisOaSnuajgOa1i1xyXG4gICAgICAgIG9wZW5Db2xsaXNpb24oKVxyXG5cclxuICAgICAgICB3aW5kb3cuX21haW4gPSB0aGlzXHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5naWZ0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdnYW1lJylcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudCgnZ2lmdCcpXHJcblxyXG4gICAgICAgIHRoaXMuYXBpID0gYXBpXHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVzID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnc3ByaXRlRnJhbWUnKVxyXG5cclxuICAgICAgICB0aGlzLmdhbWUubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICBhcGkuZ2V0VXNlckluZm8oKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBhcGkuZ2V0UGFyYW0oJ2NvZGUnKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcGkubG9naW4oY29kZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubmlja25hbWUgPSByZXMuZGF0YS5yLm5pY2tuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmJhbGFuY2UgPSByZXMuZGF0YS5yLmJhbGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucGhvbmUgPSByZXMuZGF0YS5yLnBob25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmF2YXRhciA9IHJlcy5kYXRhLnIucHJvZmlsZUltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlclxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY29yZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZyA9IHVzZXIuYmFsYW5jZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgYXBpLmF1dGhvcml6ZSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLm5pY2tuYW1lID0gcmVzLmRhdGEuci5uaWNrbmFtZVxyXG4gICAgICAgICAgICAgICAgdXNlci5iYWxhbmNlID0gcmVzLmRhdGEuci5iYWxhbmNlXHJcbiAgICAgICAgICAgICAgICB1c2VyLnBob25lID0gcmVzLmRhdGEuci5waG9uZVxyXG4gICAgICAgICAgICAgICAgdXNlci5hdmF0YXIgPSByZXMuZGF0YS5yLnByb2ZpbGVJbWdcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXJcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc2NvcmUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHJpbmcgPSB1c2VyLmJhbGFuY2VcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ2xvdzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJpemU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb2dpbkJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC8vIOWFs+mXrVxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLy8gbG9naW5cclxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMubG9naW5CdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4ubG9naW4uc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93KHVyaSkge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkKHVyaSwgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSBhbGVydChlcnIpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g6K6+572u5aWW5ZOB5Zu+54mHXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaXplLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDngqvlhYnliqjnlLtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvdy5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgzLCAzNjApKSlcclxuXHJcbiAgICAgICAgICAgICAgICAvL+aYr+WQpueZu+W9lVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5fbWFpbi51c2VyLnBob25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG5cclxufSlcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog5Yid5aeL5YyW5pe2XHJcbiAgICAgICAgKiDojrflj5YgbWFpbiDnu4Tku7ZcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubWFpbiA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKClcclxuICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKCdtYWluJykuZ2V0Q29tcG9uZW50KCdtYWluJylcclxuXHJcbiAgICAgICAgLy8gdGhpcy5saXN0ZW4oKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLm5vZGUub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmFwaS5wdXJjaGFzZSh0aGlzLm5vZGUuX19nb29kc0lkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdGhlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbkJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5YWz6Zet5oyJ6ZKuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvL2xvZ2luQnRuXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5sb2dpbi5zaG93KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJ+aKk+WOu+iusOW9lScsIDEzKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcblxyXG4gICAgICAgIGlmICghd2luZG93Ll9tYWluLnVzZXIucGhvbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vdGhlci5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm90aGVyLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLmdyYWJIaXN0b3J5KClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5yLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwXHJcbiAgICAgICAgICAgICAgICBjb25zdFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5sYXlvdXQuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IHJlcy5kYXRhLnJcclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZENoaWxkKGNoaWxkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLm9wYWNpdHkgPSAyNTVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ3N0YXRlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nID0gaXRlbS5hd2FyZFN0YXR1c1N0clxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLmdvb2RzTmFtZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ2RhdGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLmNyZWF0ZURhdGUucmVwbGFjZSgvKFxcZHs0fSkoXFxkezJ9KShcXGR7Mn0pLywgJyQxLSQyLSQzJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoaXRlbS5nb29kc0ltZywgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2ltYWdlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ29vZHNUeXBlID09PSAxKSBpbWcuc2NhbGUgPSAuM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpbWcuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsraSA8IGxpc3QubGVuZ3RoKSBsb2FkKClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvYWQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KC41KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBidG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBia2c6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJ+inhOWImeeVjOmdoicsIDE0KVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZU91dCguNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9XHJcblxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIm+W7uuepuuWAn+eCuVxyXG4gICAgICAgICog5oq15raIIGxheW91dCDnmoQgY291cG9uXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVtcHR5ID0gbmV3IGNjLk5vZGUoKVxyXG4gICAgICAgIHRoaXMuZW1wdHkubmFtZSA9ICdlbXB0eSdcclxuICAgICAgICB0aGlzLmVtcHR5LmhlaWdodCA9IDI2XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5YWz6Zet5oyJ6ZKuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIHNob3coKSB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcign6I635Y+W6YeR5biBJywgNylcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oLjUpKVxyXG5cclxuXHJcblxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkuZ29vZHNMaXN0KClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5yLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpID0gMFxyXG4gICAgICAgICAgICAgICAgY29uc3RcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IHRoaXMubGF5b3V0LmNoaWxkcmVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSByZXMuZGF0YS5yXHJcblxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWRFbXB0eSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5pyJ56m66IqC54K55YiZIHJlbW92ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmxheW91dC5nZXRDaGlsZEJ5TmFtZSgnZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgZW1wdHkgPyBlbXB0eS5yZW1vdmVGcm9tUGFyZW50KCkgOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gbGlzdFtpXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQ2hpbGQoY2hpbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuX2dvb2RzSWQgPSBpdGVtLmlkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS5nZXRDaGlsZEJ5TmFtZSgnbW9yZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2l0ZW0ucHJvbW90aW9uUXVhbnRpdHl96YeR5biBYFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ2xlc3MnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHtpdGVtLnF1YW50aXR5femHkeW4gWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2J0bicpLmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYO+/pSR7KGl0ZW0ucHJpY2UgLyAxMDApLnRvRml4ZWQoMil9YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnY291cG9uJykuYWN0aXZlID1cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ2xlc3MnKS5hY3RpdmUgPVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJvbW90aW9uU3RhdGVcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGQuX2JpbmQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLl9iaW5kID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDotK3kubDnm5HlkKxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2J0bicpLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdidG4nKS5vbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmFwaS5wdXJjaGFzZShjaGlsZC5fZ29vZHNJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSByZXMuZGF0YS5yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoaXRlbS5uYW1lLCA4LCBpdGVtLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcm9tb3Rpb25TdGF0ZSAmJiBpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRFbXB0eSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKFtpdGVtLmltZywgaXRlbS5wcm9tb3Rpb25JbWddLCAoZXJyLCByZXN1bHRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnaW1hZ2UnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShyZXN1bHRzLmdldENvbnRlbnQoaXRlbS5pbWcpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS54ID0gLTQ1XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5oqY5omj5Zu+5qCHXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnY291cG9uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzdWx0cy5nZXRDb250ZW50KGl0ZW0ucHJvbW90aW9uSW1nKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKytpIDwgbGlzdC5sZW5ndGgpIGxvYWQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChuZWVkRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZENoaWxkKHRoaXMuZW1wdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5LnNldFNpYmxpbmdJbmRleCgwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvYWQoKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZU91dCguNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9XHJcbn0pXHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGVyY2VudDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gdGhpcy5wZXJjZW50LmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICBwZXJjZW50LnN0cmluZyA9ICcwJSdcclxuICAgICAgICBjYy5sb2FkZXIub25Qcm9ncmVzcyA9IChwYXJ0LCB0b3RhbCkgPT4ge1xyXG4gICAgICAgICAgICBwZXJjZW50LnN0cmluZyA9IGAke35+KDEwMCAqIHBhcnQgLyB0b3RhbCl9JWBcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdtYWluJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIub25Qcm9ncmVzcyA9IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzdGFydEJ0bk5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhcnRCdG5QcmVzczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2VCdG5Ob3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlQnRuUHJlc3M6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlQnRuRGlzYWJsZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzdWx0RmFpbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzdWx0V2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3Um9wZU5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd0JvZHlOb3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdMZWZ0Tm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3UmlnaHROb3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdSb3BlR29sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd0JvZHlHb2xkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3TGVmdEdvbGQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdSaWdodEdvbGQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hdGNoUzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF0Y2hNOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXRjaEw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHBob25lOiBudWxsLFxyXG4gICAgYmFsYW5jZTogMCxcclxuICAgIGF2YXRhcjogbnVsbCxcclxuICAgIG5pY2tuYW1lOiBudWxsLFxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5nZXRVc2VySW5mbygpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tuYW1lID0gcmVzLmRhdGEuci5uaWNrbmFtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWxhbmNlID0gcmVzLmRhdGEuci5iYWxhbmNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBob25lID0gcmVzLmRhdGEuci5waG9uZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXIgPSByZXMuZGF0YS5yLnByb2ZpbGVJbWdcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uZ2FtZS5zY29yZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0cmluZyA9IHRoaXMuYmFsYW5jZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==