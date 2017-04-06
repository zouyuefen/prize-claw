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
    SERVER = 'http://doll.yoosh.tv';

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
            scope: 'snsapi_userinfo',
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
    },
    rise: function rise() {
        var _this2 = this;

        if (this.state !== 'grab') return;
        this.state = 'rise';
        this.node.runAction(cc.sequence(this.actions.up, cc.callFunc(function () {
            if (_this2.catched) {
                if (!_this2.results) {
                    _this2.gift.zIndex = 0;
                    _this2.lose();
                } else {
                    // 重置 gift zIndex < pit-around
                    if (_this2.results.grabResultInt === 2) {
                        _this2.gift.zIndex = 0;
                        _this2.lose();
                        _this2.main.game.showResult(_this2.results);
                    } else if (_this2.results.grabResultInt === 3) {
                        _this2.win();

                        if (_this2.results.goods.type === 0) {
                            _this2.main.game.showResult(_this2.results);
                        } else {
                            // 抓到实物的效果
                            _this2.main.game.prompt.show(_this2.results.goods.img);
                        }
                    }
                }
            } else {
                _this2.free();
                /*
                * 请求抓取处理接口
                */
                _this2.wait = true;
                _this2.main.api.grab(null, _this2.main.game.matchId).then(function (res) {
                    _this2.wait = false;
                    if (res.data.ok) _this2.results = res.data.r;else _this2.results = null;
                    _this2.main.user.update();
                }).catch(function (err) {
                    _this2.wait = false;
                    _this2.results = null;
                    _this2.main.user.update();
                });
            }
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
        var _this3 = this;

        /*
        * 掉落
        */
        this.free();
        // 此时要重置 state 为非 free 状态
        this.state = 'rise';
        // 清除 gift action
        this.gift.stopAllActions();
        this.gift.runAction(cc.sequence(this.actions.flop, cc.callFunc(function () {
            _this3.main.gift.putItem(_this3.gift);
            _this3.state = 'free';
        })));
    },
    catchAnimate: function catchAnimate() {
        var _this4 = this;

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
            _this4.wait = false;
            if (res.data.ok) _this4.results = res.data.r;else _this4.results = null;
            _this4.main.user.update();
        }).catch(function (err) {
            _this4.wait = false;
            _this4.results = null;
            _this4.main.user.update();
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

var script = document.createElement('script');
document.body.appendChild(script);
script.onload = function () {
    axios.defaults.withCredentials = true;
};
script.src = '//cdn.yoosh.tv/js/axios.min.js';

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

        // window._main.api.monitor('获取金币', 7)

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

                    child.getChildByName('btn').getChildByName('text').getComponent(cc.Label).string = '\uFFE5' + item.price / 100;

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
},{}]},{},["api","audio","claw","collision","game","gift","handler","login","main","prompt","purchase","record","rule","shop","spriteFrame","user"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9qcy9hcGkuanMiLCJhc3NldHMvanMvYXVkaW8uanMiLCJhc3NldHMvanMvY2xhdy5qcyIsImFzc2V0cy9qcy9jb2xsaXNpb24uanMiLCJhc3NldHMvanMvZ2FtZS5qcyIsImFzc2V0cy9qcy9naWZ0LmpzIiwiYXNzZXRzL2pzL2hhbmRsZXIuanMiLCJhc3NldHMvanMvbG9naW4uanMiLCJhc3NldHMvanMvbWFpbi5qcyIsImFzc2V0cy9qcy9wcm9tcHQuanMiLCJhc3NldHMvanMvcHVyY2hhc2UuanMiLCJhc3NldHMvanMvcmVjb3JkLmpzIiwiYXNzZXRzL2pzL3J1bGUuanMiLCJhc3NldHMvanMvc2hvcC5qcyIsImFzc2V0cy9qcy9zcHJpdGVGcmFtZS5qcyIsImFzc2V0cy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQUE7O0FBSUE7QUFDSTtBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBRUQ7QUFDSTtBQUFBO0FBQUE7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBM0JROztBQThCYjs7QUFFSTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxXOztBQVFmO0FBQ0k7QUFDSDs7QUFFRDtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNJO0FBREk7QUFENkI7QUFLNUM7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFEeUM7QUFHaEQ7O0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUZJO0FBRDRCO0FBTTNDOztBQUVEO0FBQWlEO0FBQUE7O0FBQzdDO0FBQ0k7QUFDSTtBQUNBO0FBRkk7QUFEbUM7QUFNbEQ7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBSEk7QUFEK0I7QUFPOUM7O0FBRUQ7QUFDSTtBQUNJ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QTs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBRUg7QUFFRDtBQUNJO0FBQ0k7QUFDSTtBQUVBO0FBQ0o7QUFDSTtBQUVBO0FBQ0o7QUFDSTtBQUVBO0FBWlI7QUFjSDs7O0FBRUQ7QUFDQTtBQUFlOztBQUNYO0FBRUk7O0FBRUk7QUFDSTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0k7QUFFSDtBQUNHO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKOzs7QUFFRDtBQUNBO0FBQ0k7QUFFSTtBQUNJO0FBQ0g7QUFDSjtBQUNKO0FBRUQ7QUFBb0I7O0FBQ2hCO0FBQ0k7QUFFSDtBQUNHO0FBRUg7O0FBRUQ7QUFDQTtBQUVBO0FBR1E7QUFDSTtBQUNIO0FBQ0o7QUFJUjtBQUVEO0FBQVM7O0FBQ0w7QUFDQTtBQUdRO0FBQ0E7QUFFSDtBQUVMO0FBR1E7QUFFQTtBQUVJO0FBQ0g7O0FBR0Q7QUFDSDs7QUFHTDtBQUNBO0FBQ0k7QUFDQTs7QUFJUTtBQUNBO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRDs7QUFFQTtBQUNJO0FBQ0k7QUFFSDtBQUNHO0FBRUg7QUFDRDtBQUNBO0FBRUE7QUFHSDs7QUFFRDs7QUFHQTs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFUUjs7QUFhQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0g7QUFFUjs7QUFFRDtBQUNBO0FBR1E7QUFDSDtBQUVMO0FBR1E7QUFDQTtBQUNIOztBQUlMO0FBQ0E7QUFHUTtBQUNIO0FBRUw7QUFHUTtBQUNBO0FBQ0g7O0FBR0w7QUFDQTtBQUdRO0FBQ0g7QUFFTDtBQUdRO0FBQ0E7QUFDSDtBQUVSO0FBdlZtQjs7Ozs7Ozs7Ozs7Ozs7QUNIcEI7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUZLO0FBREQ7O0FBT1o7QUFDSTs7OztBQUlBOztBQUtBO0FB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QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFFSTs7QUFHQTs7QUFFQTtBQUNBO0FBRUg7QUFDRDtBQUVJO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7QUFDRDtBQUVIO0FBQ0o7QUFDSjtBQUVEO0FBQU87O0FBQ0g7QUFHUTtBQUNIO0FBRVI7QUFqTW1COzs7Ozs7Ozs7Ozs7OztBQ0NwQjs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUZZO0FBSWhCO0FBQ0k7QUFDQTtBQUZXO0FBSWY7QUFDSTtBQUNBO0FBRlk7QUFJaEI7QUFDSTtBQUNBO0FBRlc7QUFJZjtBQUNJO0FBQ0E7QUFGYTtBQUlqQjtBQUNJO0FBQ0E7QUFGUTtBQUlaO0FBQ0k7QUFDQTtBQUZPO0FBSVg7QUFDSTtBQUNBO0FBRlk7QUFJaEI7QUFDSTtBQUNBO0FBRlk7QUFJaEI7QUFDSTtBQUNBO0FBRlk7QUFJaEI7QUFDSTtBQUNBO0FBRmE7QUFJakI7QUFDSTtBQUNBO0FBRlU7QUFJZDtBQUNJO0FBQ0E7QUFGVTtBQUlkO0FBQ0k7QUFDQTtBQUZVO0FBSWQ7QUFDSTtBQUNBO0FBRlc7QUFJZjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFyRUE7QUFIUTs7Ozs7Ozs7Ozs7Ozs7QUNDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFBUzs7QUFFTDtBQUVJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSDtBQUNKO0FBRUo7QUFyQlUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIOW4uOmHj1xyXG4qL1xyXG5cclxuY29uc3RcclxuICAgIEFQUElEID0gJ3d4YTk1ZWVlNDhhM2FjNThjNicsXHJcbiAgICBTRVJWRVIgPSAnaHR0cDovL2RvbGwueW9vc2gudHYnXHJcblxyXG5jb25zdCBCYXNlID0ge1xyXG4gICAgZ2V0Q29va2llKGtleSkge1xyXG4gICAgICAgIGtleSA9IGtleS50b1N0cmluZygpXHJcbiAgICAgICAgaWYgKCFrZXkubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICAgICAgY29uc3Qgc3RyID0gZG9jdW1lbnQuY29va2llXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gc3RyLmluZGV4T2YoYCR7a2V5fT1gKSxcclxuICAgICAgICAgICAgZW5kXHJcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgcmV0dXJuICcnXHJcbiAgICAgICAgc3RhcnQgKz0ga2V5Lmxlbmd0aCArIDFcclxuICAgICAgICBlbmQgPSBzdHIuaW5kZXhPZignOycsIHN0YXJ0KVxyXG4gICAgICAgIGVuZCA9PT0gLTEgPyBlbmQgPSBzdHIubGVuZ3RoIDogbnVsbFxyXG4gICAgICAgIHJldHVybiB3aW5kb3cudW5lc2NhcGUoc3RyLnNsaWNlKHN0YXJ0LCBlbmQpKVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQYXJhbShrZXkpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgc3RyID0gbG9jYXRpb24uc2VhcmNoLFxyXG4gICAgICAgICAgICBzdGFydCA9IHN0ci5pbmRleE9mKGtleSksXHJcbiAgICAgICAgICAgIGVuZFxyXG5cclxuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSByZXR1cm4gJydcclxuICAgICAgICBzdGFydCArPSBrZXkubGVuZ3RoICsgMVxyXG4gICAgICAgIGVuZCA9IHN0ci5pbmRleE9mKCcmJywgc3RhcnQpXHJcbiAgICAgICAgZW5kID09PSAtMSA/IGVuZCA9IHN0ci5sZW5ndGggOiBudWxsXHJcbiAgICAgICAgcmV0dXJuIHN0ci5zbGljZShzdGFydCwgZW5kKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBBcGkoKSB7XHJcblxyXG4gICAgdGhpcy5hdXRob3JpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGFwcGlkOiBBUFBJRCxcclxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiAnaHR0cHM6Ly9nYW1lLnlvb3NoLnR2L2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICByZXNwb25zZV90eXBlOiAnY29kZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiAnc25zYXBpX3VzZXJpbmZvJyxcclxuICAgICAgICAgICAgc3RhdGU6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHF1ZXJ5c3RyaW5nID0gT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2tleX09JHtwYXJhbXNba2V5XX1gXHJcbiAgICAgICAgfSkuam9pbignJicpXHJcblxyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBgaHR0cHM6Ly9vcGVuLndlaXhpbi5xcS5jb20vY29ubmVjdC9vYXV0aDIvYXV0aG9yaXplPyR7cXVlcnlzdHJpbmd9YFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvbG9naW5gLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgY29kZTogY29kZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFVzZXJJbmZvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvZ2V0VXNlckluZm9gKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2V0TW9kZWxMaXN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvbW9kZWxMaXN0YClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFByaXplTGlzdCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvcHJpemVMaXN0YCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtnYW1lTW9kZWxJZDogaWR9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyYWIgPSBmdW5jdGlvbihnb29kc0lkLCBtYXRjaElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvZ3JhYmAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTW9kZWxJZDogbWF0Y2hJZCxcclxuICAgICAgICAgICAgICAgIHByaXplSWQ6IGdvb2RzSWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmFiSGlzdG9yeSA9IGZ1bmN0aW9uKHBhZ2U9MSwgcGFnZVNpemU9MTApIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vZG9sbC9ncmFiSGlzdG9yeWAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nb29kc0xpc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vbWFsbC9zYWxlc0dvbGRgKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHVyY2hhc2UgPSBmdW5jdGlvbihpZCwgY2FsbEJhY2tVcmwsIGNhbmNlbFVybCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkLCBjYWxsQmFja1VybCwgY2FuY2VsVXJsKVxyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS9tYWxsL2J1eUdvbGRgLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZ29sZElkOiBpZCxcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrVXJsOiBjYWxsQmFja1VybCB8fCBgJHtsb2NhdGlvbi5vcmlnaW59JHtsb2NhdGlvbi5wYXRobmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVXJsOiBjYW5jZWxVcmwgfHwgYCR7bG9jYXRpb24ub3JpZ2lufSR7bG9jYXRpb24ucGF0aG5hbWV9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldENhcHRjaGEgPSBmdW5jdGlvbihwaG9uZSkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS91c2VyL2dldENvZGVCeVBob25lYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJpbmRQaG9uZSA9IGZ1bmN0aW9uKHBob25lLCBjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvYmluZFBob25lQnlDb2RlYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZSxcclxuICAgICAgICAgICAgICAgIGNvZGU6IGNvZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb25pdG9yID0gZnVuY3Rpb24oZXZlbnQsIGV2ZW50VHlwZSwgZXZlbnRUeXBlVGFiPTApIHtcclxuICAgICAgICBheGlvcy5nZXQoYCR7U0VSVkVSfS9ldmVudC9tb25pdG9yYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlVGFiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQXBpLnByb3RvdHlwZSA9IEJhc2VcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBBcGkoKVxyXG5cclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjbGlja1N0YXJ0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvU291cmNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXRjaGVkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvU291cmNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGVmdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICByaWdodDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3BlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9LFxyXG5cclxuICAgIHNldE1vZGVsKGkpIHtcclxuICAgICAgICBpZiAoaSA9PT0gMykge1xyXG4gICAgICAgICAgICB0aGlzLnJvcGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdSb3BlR29sZFxyXG4gICAgICAgICAgICB0aGlzLmJvZHkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdCb2R5R29sZFxyXG4gICAgICAgICAgICB0aGlzLmxlZnQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdMZWZ0R29sZFxyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3UmlnaHRHb2xkXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3BlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3Um9wZU5vcm1hbFxyXG4gICAgICAgICAgICB0aGlzLmJvZHkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdCb2R5Tm9ybWFsXHJcbiAgICAgICAgICAgIHRoaXMubGVmdC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd0xlZnROb3JtYWxcclxuICAgICAgICAgICAgdGhpcy5yaWdodC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd1JpZ2h0Tm9ybWFsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDliJ3lp4vljJbml7ZcclxuICAgICAgICAqIOiOt+WPliBtYWluIOe7hOS7tlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tYWluID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVxyXG4gICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoJ21haW4nKS5nZXRDb21wb25lbnQoJ21haW4nKVxyXG5cclxuICAgICAgICAvLyDlrprkuYnliqjkvZxcclxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHJvdGF0ZTogY2Mucm90YXRlQnkoLjEsIDU2KSxcclxuICAgICAgICAgICAgbW92ZTogY2MubW92ZUJ5KC4zLCAwLCAtNDQwKSxcclxuICAgICAgICAgICAgdXA6IGNjLm1vdmVCeSguNiwgMCwgNDQwKSxcclxuICAgICAgICAgICAgc2NhbGU6IGNjLnNjYWxlQnkoLjMsIC41KSxcclxuICAgICAgICAgICAgZmxvcDogY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5yb3RhdGVCeSguOCwgMzYwKS5yZXBlYXRGb3JldmVyKCksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoLjgsIDAsIC01MDApLFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVCeSguOCwgMS41KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDniKrlrZDnirbmgIFcclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2ZyZWUnXHJcblxyXG4gICAgICAgIC8vIOeIquWtkOWIneWni+mrmOW6plxyXG4gICAgICAgIHRoaXMueSA9IDM3N1xyXG5cclxuICAgICAgICAvLyDnu7PlrZDliJ3lp4vplb/luqZcclxuICAgICAgICB0aGlzLnJvcGVIZWlnaHQgPSAxMjBcclxuXHJcbiAgICAgICAgLy8g5piv5ZCm5oqT5L2PXHJcbiAgICAgICAgdGhpcy5jYXRjaGVkID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g5oqT5Y+W55qEIGdpZnRcclxuICAgICAgICB0aGlzLmdpZnQgPSBudWxsXHJcblxyXG4gICAgICAgIC8vIOaKk+WPluWKqOeUu1xyXG4gICAgICAgIHRoaXMuY2F0Y2hBbmltYXRlZCA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIOaOpeWPo+ivt+axgueKtuaAgVxyXG4gICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIOaKk+WPlue7k+aenFxyXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IG51bGxcclxuICAgIH0sXHJcblxyXG4gICAgZ3JhYihmdW5jKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09ICdmYWxsJykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdncmFiJ1xyXG4gICAgICAgIHRoaXMubGVmdC5ydW5BY3Rpb24odGhpcy5hY3Rpb25zLnJvdGF0ZS5yZXZlcnNlKCkpXHJcbiAgICAgICAgdGhpcy5yaWdodC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5yb3RhdGUsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmMpXHJcbiAgICAgICAgKSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGZyZWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09ICdyaXNlJykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdmcmVlJ1xyXG4gICAgICAgIHRoaXMubGVmdC5ydW5BY3Rpb24odGhpcy5hY3Rpb25zLnJvdGF0ZSlcclxuICAgICAgICB0aGlzLnJpZ2h0LnJ1bkFjdGlvbih0aGlzLmFjdGlvbnMucm90YXRlLnJldmVyc2UoKSlcclxuICAgICAgICB0aGlzLmNhdGNoZWQgPVxyXG4gICAgICAgIHRoaXMuY2F0Y2hBbmltYXRlZCA9IGZhbHNlXHJcbiAgICB9LFxyXG5cclxuICAgIGZhbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09ICdmcmVlJykgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdmYWxsJ1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5tb3ZlLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyYWIodGhpcy5yaXNlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH0sXHJcblxyXG4gICAgcmlzZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ2dyYWInKSByZXR1cm5cclxuICAgICAgICB0aGlzLnN0YXRlID0gJ3Jpc2UnXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnVwLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXRjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0LnpJbmRleCA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3NlKClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDph43nva4gZ2lmdCB6SW5kZXggPCBwaXQtYXJvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMuZ3JhYlJlc3VsdEludCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0LnpJbmRleCA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9zZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uZ2FtZS5zaG93UmVzdWx0KHRoaXMucmVzdWx0cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlc3VsdHMuZ3JhYlJlc3VsdEludCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4oKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMuZ29vZHMudHlwZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5nYW1lLnNob3dSZXN1bHQodGhpcy5yZXN1bHRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmipPliLDlrp7niannmoTmlYjmnpxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uZ2FtZS5wcm9tcHQuc2hvdyh0aGlzLnJlc3VsdHMuZ29vZHMuaW1nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAqIOivt+axguaKk+WPluWkhOeQhuaOpeWPo1xyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5hcGkuZ3JhYihudWxsLCB0aGlzLm1haW4uZ2FtZS5tYXRjaElkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykgdGhpcy5yZXN1bHRzID0gcmVzLmRhdGEuclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMucmVzdWx0cyA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi51c2VyLnVwZGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICByYW5kb20oKSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KE1hdGgucmFuZG9tKCkgKiAxMClcclxuICAgIH0sXHJcblxyXG4gICAgd2luKCkge1xyXG4gICAgICAgIHRoaXMubWFpbi5naWZ0LnB1dEl0ZW0odGhpcy5naWZ0KVxyXG4gICAgICAgIHRoaXMuZnJlZSgpXHJcbiAgICB9LFxyXG5cclxuICAgIGxvc2UoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOaOieiQvVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5mcmVlKClcclxuICAgICAgICAvLyDmraTml7bopoHph43nva4gc3RhdGUg5Li66Z2eIGZyZWUg54q25oCBXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdyaXNlJ1xyXG4gICAgICAgIC8vIOa4hemZpCBnaWZ0IGFjdGlvblxyXG4gICAgICAgIHRoaXMuZ2lmdC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5naWZ0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZsb3AsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5naWZ0LnB1dEl0ZW0odGhpcy5naWZ0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdmcmVlJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuICAgIGNhdGNoQW5pbWF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYXRjaEFuaW1hdGVkKSByZXR1cm5cclxuICAgICAgICB0aGlzLmNhdGNoQW5pbWF0ZWQgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5naWZ0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB0aGlzLmdpZnQucnVuQWN0aW9uKHRoaXMuYWN0aW9ucy5zY2FsZSlcclxuICAgICAgICB0aGlzLm1haW4uYXVkaW8uY2F0Y2hlZC5wbGF5KClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOivt+axguaKk+WPluWkhOeQhuaOpeWPo1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy53YWl0ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubWFpbi5hcGkuZ3JhYih0aGlzLmdpZnQuX2dvb2RzSWQsIHRoaXMubWFpbi5nYW1lLm1hdGNoSWQpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy53YWl0ID0gZmFsc2VcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB0aGlzLnJlc3VsdHMgPSByZXMuZGF0YS5yXHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICB0aGlzLm1haW4udXNlci51cGRhdGUoKVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IG51bGxcclxuICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApXHJcbiAgICAgICAgLy8gKVxyXG4gICAgICAgIHRoaXMucm9wZS5oZWlnaHQgPSB0aGlzLnJvcGVIZWlnaHQgKyB0aGlzLnkgLSB0aGlzLm5vZGUueVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jYXRjaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0Y2hBbmltYXRlKClcclxuICAgICAgICAgICAgdGhpcy5naWZ0LnggPSB0aGlzLm5vZGUueFxyXG4gICAgICAgICAgICB0aGlzLmdpZnQueSA9IHRoaXMubm9kZS55IC0gMTAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSlcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICAvKiDmo4DmtYvniKrlrZDnirbmgIFcclxuICAgICAgICAqIOmdniBncmFiIOeKtuaAgVxyXG4gICAgICAgICog5LiN5L2c56Kw5pKe5aSE55CGXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAod2luZG93Ll9tYWluLmdhbWUuY2xhdy5zdGF0ZSAhPT0gJ2dyYWInKSByZXR1cm5cclxuICAgICAgICBpZiAoc2VsZi5ub2RlLm5hbWUgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICB3aW5kb3cuX21haW4uZ2FtZS5jbGF3LmNhdGNoZWQgPSB0aGlzLmNoZWNrTGVmdChvdGhlciwgc2VsZilcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGYubm9kZS5uYW1lID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5nYW1lLmNsYXcuY2F0Y2hlZCA9IHRoaXMuY2hlY2tSaWdodChvdGhlciwgc2VsZilcclxuICAgICAgICB9IGVsc2UgY29uc29sZS5lcnJvcign6K+35qOA5p+l57uE5Lu25ZCN6K6+572uJylcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5fbWFpbi5nYW1lLmNsYXcuY2F0Y2hlZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuX21haW4uZ2FtZS5jbGF3LmdpZnQgPSBvdGhlci5ub2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uQ29sbGlzaW9uU3RheShvdGhlciwgc2VsZikge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaGVja0xlZnQoZ2lmdCwgY2xhdykge1xyXG4gICAgICAgIC8vIOi9rOaIkOS4lueVjOWdkOagh1xyXG4gICAgICAgIGNvbnN0IHBvcyA9IHtcclxuICAgICAgICAgICAgZ2lmdDogZ2lmdC5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoMCwgMCksXHJcbiAgICAgICAgICAgIGNsYXc6IGNsYXcubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWx0YSA9IHBvcy5naWZ0LnggLSBwb3MuY2xhdy54XHJcblxyXG4gICAgICAgIGlmIChkZWx0YSA+IDIwKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSxcclxuICAgIGNoZWNrUmlnaHQoZ2lmdCwgY2xhdykge1xyXG4gICAgICAgIC8vIOi9rOaIkOS4lueVjOWdkOagh1xyXG4gICAgICAgIGNvbnN0IHBvcyA9IHtcclxuICAgICAgICAgICAgZ2lmdDogZ2lmdC5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoMCwgMCksXHJcbiAgICAgICAgICAgIGNsYXc6IGNsYXcubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKDAsIDApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWx0YSA9IHBvcy5jbGF3LnggLSBwb3MuZ2lmdC54XHJcblxyXG4gICAgICAgIGlmIChkZWx0YSA+IDEwKSByZXR1cm4gdHJ1ZVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSlcclxuIiwiaW1wb3J0IENsYXcgZnJvbSAnY2xhdydcclxuaW1wb3J0IFJ1bGUgZnJvbSAncnVsZSdcclxuaW1wb3J0IFByb21wdCBmcm9tICdwcm9tcHQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhcnRCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9yZGVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpdEFyb3VuZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZUxheW91dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZUJ0bnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdpZnRCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhdzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBDbGF3XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFJ1bGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb21wdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBQcm9tcHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJ+i/m+WFpea4uOaIjycsIDEpXHJcbiAgICB9LFxyXG4gICAgaW5pdCgpIHtcclxuXHJcbiAgICAgICAgLy8g5Z2R5LiL5Zu0IHpJbmRleCA8IGdpZnQuekluZGV4XHJcbiAgICAgICAgdGhpcy5waXRBcm91bmQuekluZGV4ID0gMVxyXG5cclxuICAgICAgICAvLyDlnLrmrKFpZFxyXG4gICAgICAgIHRoaXMubWF0Y2hJZCA9IG51bGxcclxuXHJcblxyXG5cclxuICAgICAgICAvLyDpmpDol4/nu5Pmnpzmj5DnpLrmoYZcclxuICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICAvLyDpmpDol4/ojrflpZborrDlvZVcclxuICAgICAgICB3aW5kb3cuX21haW4ucmVjb3JkLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g6K6+572u6L655qGG55qEIHpJbmRleFxyXG4gICAgICAgIHRoaXMuYm9yZGVyLnpJbmRleCA9IDNcclxuXHJcbiAgICAgICAgLy8g5oyJ6ZKuIHpJbmRleFxyXG4gICAgICAgIHRoaXMuc3Rha2VMYXlvdXQuekluZGV4ID1cclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLnpJbmRleCA9IDNcclxuXHJcbiAgICAgICAgLy8g6K6+572u5LiL5rOo5oyJ6ZKuIHpJbmRleFxyXG4gICAgICAgIHRoaXMuc3Rha2UuekluZGV4ID0gM1xyXG5cclxuICAgICAgICAvLyDkuIvms6jlgLxcclxuICAgICAgICB0aGlzLnN0YWtlVmFsdWUgPSBudWxsXHJcblxyXG4gICAgICAgIC8vIOiOt+WPluWcuuasoVxyXG4gICAgICAgIHRoaXMuZ2V0TW9kZWxMaXN0KClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldE1hdGNoKGluZGV4LCBpZCkge1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IHRoaXMuc3Rha2VCdG5zW2luZGV4XVxyXG5cclxuICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuUHJlc3NcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgdGV4dC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGV4dC5ydW5BY3Rpb24oY2MuanVtcFRvKDEsIDAsIDksIDEwLCAzKSlcclxuXHJcbiAgICAgICAgLy8g6K6+572uIOW9k+WJjeS4i+azqOWAvFxyXG4gICAgICAgIHRoaXMuc2V0U3Rha2UoaW5kZXgpXHJcblxyXG4gICAgICAgIC8vIOiuvue9riDlvZPliY3lnLrmrKEgaWRcclxuICAgICAgICB0aGlzLm1hdGNoSWQgPSBpZFxyXG5cclxuICAgICAgICB0aGlzLmdldFByaXplTGlzdCgpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRTdGFrZSh2YWwpIHtcclxuICAgICAgICBzd2l0Y2ggKHZhbCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWtlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLm1hdGNoTVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFrZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLnNwcml0ZUZyYW1lcy5tYXRjaExcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWtlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLm1hdGNoU1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPluWPr+eOqeWcuuasoVxyXG4gICAgZ2V0TW9kZWxMaXN0KCkge1xyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkuZ2V0TW9kZWxMaXN0KClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5yLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRuc1tpXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLm5hbWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uX21hdGNoSWQgPSBpdGVtLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uX29wZW5TdGF0ZSA9IGl0ZW0ub3BlblN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uX3ZhbHVlID0gaXRlbS5nb2xkRXhwZW5kXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmdnuW8gOaUvueKtuaAgVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5vcGVuU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3Rha2VCdG5EaXNhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YWtlVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZVZhbHVlID0gaXRlbS5nb2xkRXhwZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF0Y2goaSwgaXRlbS5pZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W5aWW5ZOB5YiX6KGoXHJcbiAgICBnZXRQcml6ZUxpc3QoKSB7XHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5nZXRQcml6ZUxpc3QodGhpcy5tYXRjaElkKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmdpZnQuYnVpbGQocmVzLmRhdGEucilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dSZXN1bHQocmVzdWx0cykge1xyXG4gICAgICAgIGlmIChyZXN1bHRzLmdyYWJSZXN1bHRJbnQgPT09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IGNjLmxvYWRlci5nZXRSZXMoJ2ltYWdlL2dhbWUvcmVzdWx0LXdpbicsIGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBjYy5sb2FkZXIuZ2V0UmVzKCdpbWFnZS9nYW1lL3Jlc3VsdC1mYWlsJywgY2MuU3ByaXRlRnJhbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5yZXN1bHQuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXN1bHRzLmdyYWJSZXN1bHRTdHJcclxuICAgICAgICB0aGlzLnJlc3VsdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmp1bXBCeSguNSwgMCwgMCwgMTAsIDMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICAvLyDlvIDlp4vmjInpkq5cclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmF1ZGlvLmNsaWNrU3RhcnQucGxheSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YXJ0QnRuUHJlc3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3RhcnRCdG5Ob3JtYWxcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoSWQgPT09IG51bGwpIGFsZXJ0KCfor7flhYjkuIvms6gnKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAod2luZG93Ll9tYWluLnVzZXIuYmFsYW5jZSA8IHRoaXMuc3Rha2VWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zaG9wLnNob3coKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmNsYXcuZmFsbCgpXHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKCflvIDlp4vmjInpkq4nLCA2KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvLyDkuIvms6jmjInpkq5cclxuICAgICAgICB0aGlzLnN0YWtlQnRucy5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5faW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICBidG4ub24oXHJcbiAgICAgICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g56aB6YCJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidG4uX29wZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGJ0bi5fdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID4gd2luZG93Ll9tYWluLnVzZXIuYmFsYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc2hvcC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VWYWx1ZSA9IHZhbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidG4uX29wZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuTm9ybWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zcHJpdGVGcmFtZXMuc3Rha2VCdG5EaXNhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g56e76Zmk5YW25LuW54m55pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMCwgMCwgMTgpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuUHJlc3NcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnJ1bkFjdGlvbihjYy5qdW1wVG8oMSwgMCwgOSwgMTAsIDMpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIvms6hcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YWtlKGJ0bi5faW5kZXgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChidG4uX2luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcignNTAw5Zy6JywgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcignMTAwMOWcuicsIDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4uYXBpLm1vbml0b3IoJzIwMDDlnLonLCA1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva4g5b2T5YmN5Zy65qyhIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaElkID0gYnRuLl9tYXRjaElkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWlluWTgeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJpemVMaXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAqIOmrmOe6p+WcuuWIh+aNolxyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGF3LnNldE1vZGVsKHRoaXMubWF0Y2hJZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOinhOWImeaMiemSrlxyXG4gICAgICAgIHRoaXMucnVsZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVsZUJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMucnVsZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVCdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGUuc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvLyBnaWZ0QnRuXHJcbiAgICAgICAgdGhpcy5naWZ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0QnRuLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5naWZ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdEJ0bi5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5yZWNvcmQuc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vIGFkZEJ0blxyXG4gICAgICAgIHRoaXMuYWRkQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLmFkZEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ0bi5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5zaG9wLnNob3coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcHJlZmFiczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDliJ3lp4vljJbml7ZcclxuICAgICAgICAqIOiOt+WPliBtYWluIOe7hOS7tlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tYWluID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVxyXG4gICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoJ21haW4nKS5nZXRDb21wb25lbnQoJ21haW4nKVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vIOS4iuS4gOS4qua3u+WKoOeahCBnaWZ0XHJcbiAgICAgICAgdGhpcy5sYXN0ID0gbnVsbFxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICogZ2lmdCBwb29sXHJcbiAgICAgICAgKiDmr4/np40gZ2lmdCDlr7nlupTkuIDkuKogcG9vbFxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5wb29sID0gdGhpcy5wcmVmYWJzLm1hcChpdGVtID0+IGNjLmluc3RhbnRpYXRlKGl0ZW0pKVxyXG5cclxuICAgICAgICAvLyDpooTlrprkuYkgYWN0aW9uXHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0ge1xyXG4gICAgICAgICAgICBtb3ZlOiBjYy5tb3ZlQnkoNSwgODg4LCAwKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRJdGVtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBvb2wubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvb2wuc3BsaWNlKH5+KE1hdGgucmFuZG9tKCkgKiB0aGlzLnBvb2wubGVuZ3RoKSwgMSlbMF1cclxuICAgICAgICB9IGVsc2UgcmV0dXJuIG51bGxcclxuICAgIH0sXHJcblxyXG4gICAgcHV0SXRlbShpdGVtKSB7XHJcbiAgICAgICAgaXRlbS5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgaXRlbS5yZW1vdmVGcm9tUGFyZW50KClcclxuICAgICAgICB0aGlzLnBvb2wucHVzaChpdGVtKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgKiBAcGFyYW0ge2FycmF5fSBnb29kc0xpc3RcclxuICAgICovXHJcbiAgICBidWlsZChsaXN0KSB7XHJcbiAgICAgICAgY29uc3QgX3Bvb2wgPSB0aGlzLnBvb2wuY29uY2F0KHRoaXMubWFpbi5nYW1lLm5vZGUuY2hpbGRyZW4uZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSAnZ2lmdCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGl0ZW0uc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog6YGN5Y6GIGxpc3RcclxuICAgICAgICAqIOacgOe7iCBwb29sIOeahOS4quaVsOS7pSBsaXN0IOS4uuWHhlxyXG4gICAgICAgICovXHJcbiAgICAgICAgbGV0IGkgPSAwXHJcblxyXG4gICAgICAgIGNvbnN0IGxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBnaWZ0ID0gX3Bvb2xbaV1cclxuICAgICAgICAgICAgaWYgKCFnaWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBnaWZ0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzWzBdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXRJdGVtKGdpZnQpXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDliKTmlq3lpZblk4HnsbvlnotcclxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2lmdC5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaXRlbS5uYW1lLm1hdGNoKC9cXGQrLylbMF1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdpZnQuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdpZnQuX2dvb2RzSWQgPSBpdGVtLmlkXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGUgPSBnaWZ0LmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKGl0ZW0uaW1nLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICBlbHNlIHNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKVxyXG4gICAgICAgICAgICAgICAgaWYgKCsraSA8IGxpc3QubGVuZ3RoKSBsb2FkKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZCgpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAqIOa3u+WKoCBnaWZ0XHJcbiAgICAqIOm7mOiupOS9jee9riDlsY/luZXlt6bkvqdcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IHg6IC00NDFcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IHk6IC0yNTBcclxuICAgICovXHJcbiAgICBhZGQoeD0tNDQxLCB5PS0yNTApIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog6buY6K6k5oOF5Ya15LiLXHJcbiAgICAgICAgKiDlsZXnpLrlpZblk4FcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0XHJcbiAgICAgICAgICAgIGkgPSB+fihNYXRoLnJhbmRvbSgpICogdGhpcy5wcmVmYWJzLmxlbmd0aCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpc1xyXG4gICAgICAgIHRoaXMubGFzdCA9IHRoaXMuZ2V0SXRlbSgpIHx8IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFic1tpXSlcclxuICAgICAgICB0aGlzLmxhc3Quc3RvcEFsbEFjdGlvbnMoKVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdnYW1lJylcclxuICAgICAgICAgICAgLmFkZENoaWxkKHRoaXMubGFzdClcclxuICAgICAgICB0aGlzLmxhc3QubmFtZSA9ICdnaWZ0J1xyXG4gICAgICAgIHRoaXMubGFzdC54ID0geFxyXG4gICAgICAgIHRoaXMubGFzdC55ID0geVxyXG4gICAgICAgIHRoaXMubGFzdC5zY2FsZSA9IDFcclxuICAgICAgICB0aGlzLmxhc3QuekluZGV4ID0gMlxyXG4gICAgICAgIHRoaXMubGFzdC5yb3RhdGlvbiA9IDBcclxuICAgICAgICB0aGlzLmxhc3QuX3R5cGVJbmRleCA9IGlcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLm1vdmUuY2xvbmUoKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wdXRJdGVtKHRoaXMpXHJcbiAgICAgICAgICAgIH0sIHRoaXMubGFzdClcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIGNoZWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3QgJiYgdGhpcy5sYXN0LnggPiAtMTgyKSB0aGlzLmFkZCgpXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrKClcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICAgICAgdGhpcy5hZGQoKVxyXG4gICAgfVxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICB1bnVzZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndW51c2UnKVxyXG4gICAgfSxcclxuXHJcbiAgICByZXVzZSgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwaG9uZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2RlQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWJtaXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNwaXJ0ZUZyYW1lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29kZUJ0blRleHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vIOe9kee7nOivt+axgueKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHdhaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aW1lOiAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBob25lSW5wdXQgPSB0aGlzLnBob25lLmdldENvbXBvbmVudChjYy5FZGl0Qm94KVxyXG4gICAgICAgIHRoaXMuY29kZUlucHV0ID0gdGhpcy5jb2RlLmdldENvbXBvbmVudChjYy5FZGl0Qm94KVxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5zaG9wLm5vZGUuekluZGV4ID0gMVxyXG4gICAgfSxcclxuXHJcbiAgICBjb3VudERvd24oKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS50aW1lLS1cclxuICAgICAgICB0aGlzLmNvZGVCdG5UZXh0LnN0cmluZyA9IHRoaXMuc3RhdGUudGltZS50b1N0cmluZygpICsgJ3MnXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudGltZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvZGVSZXNldCgpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb3VudERvd24oKVxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICB9LFxyXG5cclxuICAgIGNvZGVSZXNldCgpIHtcclxuICAgICAgICB0aGlzLmNvZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICB0aGlzLnNwaXJ0ZUZyYW1lc1swXVxyXG4gICAgICAgIHRoaXMuY29kZUJ0blRleHQuc3RyaW5nID0gJ+iOt+WPlumqjOivgeeggSdcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIHRoaXMubWFzay5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDmiYvmnLrlj7fovpPlhaXkuovku7bnm5HlkKxcclxuICAgICAgICAqIOabv+aNoumdnuaVsOWtl+Wtl+espuS4uuepulxyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIHRoaXMucGhvbmUub24oJ3RleHQtY2hhbmdlZCcsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dC5zdHJpbmcgPSB0aGlzLnBob25lSW5wdXQuc3RyaW5nLnJlcGxhY2UoL1xcRC9nLCAnJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOmqjOivgeeggei+k+WFpeS6i+S7tuebkeWQrFxyXG4gICAgICAgICog5pu/5o2i6Z2e5pWw5a2X5a2X56ym5Li656m6XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgdGhpcy5jb2RlLm9uKCd0ZXh0LWNoYW5nZWQnLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVJbnB1dC5zdHJpbmcgPSB0aGlzLmNvZGVJbnB1dC5zdHJpbmcucmVwbGFjZSgvXFxEL2csICcnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog6aqM6K+B56CB5oyJ6ZKu55uR5ZCsXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvZGVCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVCdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5jb2RlQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZUJ0bi5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLndhaXQpIHJldHVyblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudGltZSkgcmV0dXJuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53YWl0ID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkuZ2V0Q2FwdGNoYSh0aGlzLnBob25lSW5wdXQuc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5ZCv5Yqo5YCS6K6h5pe2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudGltZSA9IDYwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnREb3duKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29kZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaXJ0ZUZyYW1lc1sxXVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5kYXRhLm0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDmj5DkuqTmjInpkq5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc3VibWl0Lm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXQuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5zdWJtaXQub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXQuc2NhbGUgPSAxXHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmFwaS5iaW5kUGhvbmUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waG9uZUlucHV0LnN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZGVJbnB1dC5zdHJpbmdcclxuICAgICAgICAgICAgICAgICkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX21haW4udXNlci5waG9uZSA9IHRoaXMucGhvbmVJbnB1dC5zdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlSW5wdXQuc3RyaW5nID0gJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waG9uZUlucHV0LnN0cmluZyA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLmRhdGEubSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5YWz6Zet5oyJ6ZKuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZU91dCguNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9XHJcbn0pXHJcbiIsImltcG9ydCBHYW1lIGZyb20gJ2dhbWUnXHJcbmltcG9ydCBTaG9wIGZyb20gJ3Nob3AnXHJcbmltcG9ydCBBdWRpbyBmcm9tICdhdWRpbydcclxuaW1wb3J0IFJlY29yZCBmcm9tICdyZWNvcmQnXHJcbmltcG9ydCBMb2dpbiBmcm9tICdsb2dpbidcclxuaW1wb3J0IGFwaSBmcm9tICdhcGknXHJcbmltcG9ydCB1c2VyIGZyb20gJ3VzZXInXHJcblxyXG5cclxuY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXHJcbnNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIGF4aW9zLmRlZmF1bHRzLndpdGhDcmVkZW50aWFscyA9IHRydWVcclxufVxyXG5zY3JpcHQuc3JjID0gJy8vY2RuLnlvb3NoLnR2L2pzL2F4aW9zLm1pbi5qcydcclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IG9wZW5Db2xsaXNpb24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpXHJcbiAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgLypcclxuICAgICog5byA5ZCvIGRlYnVnIOaooeW8j1xyXG4gICAgKiDmraPlvI/njq/looPkuIvlhbPpl61cclxuICAgICovXHJcbiAgICBpZiAobG9jYXRpb24ucG9ydCA9PT0gJzc0NTYnKSB7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdhbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogR2FtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvcDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBTaG9wXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBBdWRpb1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjb3JkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFJlY29yZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogTG9naW5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIOW8gOWQr+eisOaSnuajgOa1i1xyXG4gICAgICAgIG9wZW5Db2xsaXNpb24oKVxyXG5cclxuICAgICAgICB3aW5kb3cuX21haW4gPSB0aGlzXHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5naWZ0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdnYW1lJylcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudCgnZ2lmdCcpXHJcblxyXG4gICAgICAgIHRoaXMuYXBpID0gYXBpXHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVzID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnc3ByaXRlRnJhbWUnKVxyXG5cclxuICAgICAgICBhcGkuZ2V0VXNlckluZm8oKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBhcGkuZ2V0UGFyYW0oJ2NvZGUnKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcGkubG9naW4oY29kZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubmlja25hbWUgPSByZXMuZGF0YS5yLm5pY2tuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmJhbGFuY2UgPSByZXMuZGF0YS5yLmJhbGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucGhvbmUgPSByZXMuZGF0YS5yLnBob25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmF2YXRhciA9IHJlcy5kYXRhLnIucHJvZmlsZUltZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlclxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY29yZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZyA9IHVzZXIuYmFsYW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBhcGkuYXV0aG9yaXplKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVzZXIubmlja25hbWUgPSByZXMuZGF0YS5yLm5pY2tuYW1lXHJcbiAgICAgICAgICAgICAgICB1c2VyLmJhbGFuY2UgPSByZXMuZGF0YS5yLmJhbGFuY2VcclxuICAgICAgICAgICAgICAgIHVzZXIucGhvbmUgPSByZXMuZGF0YS5yLnBob25lXHJcbiAgICAgICAgICAgICAgICB1c2VyLmF2YXRhciA9IHJlcy5kYXRhLnIucHJvZmlsZUltZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlclxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zY29yZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0cmluZyA9IHVzZXIuYmFsYW5jZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBnbG93OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwcml6ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvZ2luQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIHRoaXMubWFzay5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLy8g5YWz6ZetXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvLyBsb2dpblxyXG4gICAgICAgIHRoaXMubG9naW5CdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5sb2dpbi5zaG93KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3codXJpKSB7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWQodXJpLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIGFsZXJ0KGVycilcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDorr7nva7lpZblk4Hlm77niYdcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpemUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oLjUpKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOeCq+WFieWKqOeUu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG93LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDMsIDM2MCkpKVxyXG5cclxuICAgICAgICAgICAgICAgIC8v5piv5ZCm55m75b2VXHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Ll9tYWluLnVzZXIucGhvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZU91dCguNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9XHJcblxyXG59KVxyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDliJ3lp4vljJbml7ZcclxuICAgICAgICAqIOiOt+WPliBtYWluIOe7hOS7tlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tYWluID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVxyXG4gICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoJ21haW4nKS5nZXRDb21wb25lbnQoJ21haW4nKVxyXG5cclxuICAgICAgICAvLyB0aGlzLmxpc3RlbigpXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSlcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMubm9kZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uYXBpLnB1cmNoYXNlKHRoaXMubm9kZS5fX2dvb2RzSWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY2xvc2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG90aGVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZ2luQnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIHRoaXMubWFzay5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDlhbPpl63mjInpkq5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vbG9naW5CdG5cclxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmxvZ2luLnNob3coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcign5oqT5Y676K6w5b2VJywgMTMpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuX21haW4udXNlci5waG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVyLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMub3RoZXIuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkuZ3JhYkhpc3RvcnkoKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICAgICAgICAgIGNvbnN0XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gPSB0aGlzLmxheW91dC5jaGlsZHJlbixcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gcmVzLmRhdGEuclxyXG5cclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gbGlzdFtpXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQ2hpbGQoY2hpbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQub3BhY2l0eSA9IDI1NVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnc3RhdGUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcgPSBpdGVtLmF3YXJkU3RhdHVzU3RyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS5nZXRDaGlsZEJ5TmFtZSgnbmFtZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGl0ZW0uZ29vZHNOYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS5nZXRDaGlsZEJ5TmFtZSgnZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGl0ZW0uY3JlYXRlRGF0ZS5yZXBsYWNlKC8oXFxkezR9KShcXGR7Mn0pKFxcZHsyfSkvLCAnJDEtJDItJDMnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChpdGVtLmdvb2RzSW1nLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5nb29kc1R5cGUgPT09IDEpIGltZy5zY2FsZSA9IC4zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGltZy5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKytpIDwgbGlzdC5sZW5ndGgpIGxvYWQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJrZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHdpbmRvdy5fbWFpbi5hcGkubW9uaXRvcign6KeE5YiZ55WM6Z2iJywgMTQpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIHRoaXMubWFzay5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuYnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH0sXHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KC41KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH1cclxuXHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxheW91dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog5Yib5bu656m65YCf54K5XHJcbiAgICAgICAgKiDmirXmtoggbGF5b3V0IOeahCBjb3Vwb25cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZW1wdHkgPSBuZXcgY2MuTm9kZSgpXHJcbiAgICAgICAgdGhpcy5lbXB0eS5uYW1lID0gJ2VtcHR5J1xyXG4gICAgICAgIHRoaXMuZW1wdHkuaGVpZ2h0ID0gMjZcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuKCkge1xyXG4gICAgICAgIHRoaXMubWFzay5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDlhbPpl63mjInpkq5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgc2hvdygpIHtcclxuXHJcbiAgICAgICAgLy8gd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKCfojrflj5bph5HluIEnLCA3KVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcblxyXG5cclxuXHJcbiAgICAgICAgd2luZG93Ll9tYWluLmFwaS5nb29kc0xpc3QoKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwXHJcbiAgICAgICAgICAgICAgICBjb25zdFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5sYXlvdXQuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IHJlcy5kYXRhLnJcclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZEVtcHR5ID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDmnInnqbroioLngrnliJkgcmVtb3ZlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMubGF5b3V0LmdldENoaWxkQnlOYW1lKCdlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBlbXB0eSA/IGVtcHR5LnJlbW92ZUZyb21QYXJlbnQoKSA6IG51bGxcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2ldXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRDaGlsZChjaGlsZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5fZ29vZHNJZCA9IGl0ZW0uaWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdtb3JlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7aXRlbS5wcm9tb3Rpb25RdWFudGl0eX3ph5HluIFgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS5nZXRDaGlsZEJ5TmFtZSgnbGVzcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2l0ZW0ucXVhbnRpdHl96YeR5biBYFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnYnRuJykuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg77+lJHtpdGVtLnByaWNlIC8gMTAwfWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2NvdXBvbicpLmFjdGl2ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdsZXNzJykuYWN0aXZlID1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnByb21vdGlvblN0YXRlXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkLl9iaW5kKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5fYmluZCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6LSt5Lmw55uR5ZCsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdidG4nKS5vbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnYnRuJykub24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5hcGkucHVyY2hhc2UoY2hpbGQuX2dvb2RzSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gcmVzLmRhdGEuclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9tYWluLmFwaS5tb25pdG9yKGl0ZW0ubmFtZSwgOCwgaXRlbS5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvbW90aW9uU3RhdGUgJiYgaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkRW1wdHkgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChbaXRlbS5pbWcsIGl0ZW0ucHJvbW90aW9uSW1nXSwgKGVyciwgcmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2ltYWdlJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzdWx0cy5nZXRDb250ZW50KGl0ZW0uaW1nKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykueCA9IC00NVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaKmOaJo+Wbvuagh1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2NvdXBvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlc3VsdHMuZ2V0Q29udGVudChpdGVtLnByb21vdGlvbkltZykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsraSA8IGxpc3QubGVuZ3RoKSBsb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmVlZEVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRDaGlsZCh0aGlzLmVtcHR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eS5zZXRTaWJsaW5nSW5kZXgoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkKClcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHN0YXJ0QnRuTm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydEJ0blByZXNzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFrZUJ0bk5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2VCdG5QcmVzczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2VCdG5EaXNhYmxlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN1bHRGYWlsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN1bHRXaW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdSb3BlTm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3Qm9keU5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd0xlZnROb3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdSaWdodE5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd1JvcGVHb2xkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3Qm9keUdvbGQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdMZWZ0R29sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd1JpZ2h0R29sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF0Y2hTOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXRjaE06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hdGNoTDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcGhvbmU6IG51bGwsXHJcbiAgICBiYWxhbmNlOiAwLFxyXG4gICAgYXZhdGFyOiBudWxsLFxyXG4gICAgbmlja25hbWU6IG51bGwsXHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG5cclxuICAgICAgICB3aW5kb3cuX21haW4uYXBpLmdldFVzZXJJbmZvKClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmlja25hbWUgPSByZXMuZGF0YS5yLm5pY2tuYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSByZXMuZGF0YS5yLmJhbGFuY2VcclxuICAgICAgICAgICAgICAgIHRoaXMucGhvbmUgPSByZXMuZGF0YS5yLnBob25lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhciA9IHJlcy5kYXRhLnIucHJvZmlsZUltZ1xyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5fbWFpbi5nYW1lLnNjb3JlLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAuc3RyaW5nID0gdGhpcy5iYWxhbmNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9