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
    onLoad: function onLoad() {
        this.init();
    },
    init: function init() {
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        /* 检测爪子状态
        * 非 grab 状态
        * 不作碰撞处理
        */
        if (this.main.game.claw.state !== 'grab') return;
        if (self.node.name === 'left') {
            this.main.game.claw.catched = this.checkLeft(other, self);
        } else if (self.node.name === 'right') {
            this.main.game.claw.catched = this.checkRight(other, self);
        } else console.error('请检查组件名设置');

        if (this.main.game.claw.catched) {
            this.main.game.claw.gift = other.node;
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

        // 下注值
        this.stakeValue = null;

        // 获取场次
        this.getModelList();
    },
    setMatch: function setMatch(index, id) {
        var btn = this.stakeBtns[0];

        btn.getComponent(cc.Sprite).spriteFrame = this.main.spriteFrames.stakeBtnPress;

        var text = btn.getChildByName('text');

        text.stopAllActions();
        text.runAction(cc.jumpTo(1, 0, 9, 10, 3));

        // 设置 当前下注值
        this.setStake(index);

        // 设置 当前场次 id
        this.matchId = id;
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
    },


    // 获取可玩场次
    getModelList: function getModelList() {
        var _this = this;

        this.main.api.getModelList().then(function (res) {
            if (res.data.ok) {

                res.data.r.forEach(function (item, i) {
                    _this.stakeBtns[i].active = true;
                    _this.stakeBtns[i].getChildByName('text').getComponent(cc.Label).string = item.name;

                    _this.stakeBtns[i]._matchId = item.id;
                    _this.stakeBtns[i]._openState = item.openState;
                    _this.stakeBtns[i]._value = item.goldExpend;

                    // 非开放状态
                    if (!item.openState) {} else if (_this.stakeValue === null) {
                        _this.stakeValue = item.goldExpend;
                        _this.setStake(i, item.id);
                    }
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
            btn.on(cc.Node.EventType.TOUCH_START, function (event) {

                // 禁选
                if (!btn._openState) {
                    event.stopPropagation();
                    return;
                }

                var val = btn._value;
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
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');

        // 网络请求状态
        this.state = {
            wait: false,
            time: 0
        };

        this.phoneInput = this.phone.getComponent(cc.EditBox);
        this.codeInput = this.code.getComponent(cc.EditBox);
        this.main.shop.node.zIndex = 1;
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

            _this2.main.api.getCaptcha(_this2.phoneInput.string).then(function (res) {
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

            _this2.main.api.bindPhone(_this2.phoneInput.string, _this2.codeInput.string).then(function (res) {
                if (res.data.ok) {
                    _this2.main.user.phone = _this2.phoneInput.string;
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

'use strict';

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
        this.init();
        this.listen();
    },
    init: function init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');
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
            _this.main.login.show();
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
                if (_this2.main.user.phone) {
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
        this.init();
        this.listen();
    },
    init: function init() {
        /*
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');
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
            _this.main.login.show();
        });
    },
    show: function show() {
        var _this2 = this;

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));

        if (!this.main.user.phone) {
            this.other.active = true;
            this.layout.active = false;
        } else {
            this.layout.active = true;
            this.other.active = false;
        }

        this.main.api.grabHistory().then(function (res) {
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
                            if (item.goodsType === 1) img.scale = .3;
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

"use strict";

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
        this.init();
        this.listen();
    },
    init: function init() {
        this.node.active = false;
    },
    show: function show() {
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
        * 初始化时
        * 获取 main 组件
        */
        this.main = cc.director.getScene().getChildByName('main').getComponent('main');

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

        if (this.node.active) this.node.opacity = 0;else {
            this.node.active = true;
            this.node.opacity = 0;
        }
        this.node.runAction(cc.fadeIn(.5));

        this.main.api.goodsList().then(function (res) {
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
                            _this2.main.api.purchase(child._goodsId).then(function (res) {
                                if (res.data.ok) {
                                    location.href = res.data.r;
                                }
                            });
                        });
                    }

                    if (item.promotionState && i === 0) {
                        needEmpty = true;
                    }

                    cc.loader.load(item.img, function (err, texture) {
                        if (err) console.log(err);else {
                            child.getChildByName('image').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);

                            child.getChildByName('layout').x = -45;
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

cc._RFpop();
},{}]},{},["api","audio","claw","collision","game","gift","handler","login","main","prompt","purchase","record","rule","shop","spriteFrame","user"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9qcy9hcGkuanMiLCJhc3NldHMvanMvYXVkaW8uanMiLCJhc3NldHMvanMvY2xhdy5qcyIsImFzc2V0cy9qcy9jb2xsaXNpb24uanMiLCJhc3NldHMvanMvZ2FtZS5qcyIsImFzc2V0cy9qcy9naWZ0LmpzIiwiYXNzZXRzL2pzL2hhbmRsZXIuanMiLCJhc3NldHMvanMvbG9naW4uanMiLCJhc3NldHMvanMvbWFpbi5qcyIsImFzc2V0cy9qcy9wcm9tcHQuanMiLCJhc3NldHMvanMvcHVyY2hhc2UuanMiLCJhc3NldHMvanMvcmVjb3JkLmpzIiwiYXNzZXRzL2pzL3J1bGUuanMiLCJhc3NldHMvanMvc2hvcC5qcyIsImFzc2V0cy9qcy9zcHJpdGVGcmFtZS5qcyIsImFzc2V0cy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBO0FBQUE7O0FBSUE7QUFDSTtBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBRUQ7QUFDSTtBQUFBO0FBQUE7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBM0JROztBQThCYjs7QUFFSTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxXOztBQVFmO0FBQ0k7QUFDSDs7QUFFRDtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNJO0FBREk7QUFENkI7QUFLNUM7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFEeUM7QUFHaEQ7O0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUZJO0FBRDRCO0FBTTNDOztBQUVEO0FBQWlEO0FBQUE7O0FBQzdDO0FBQ0k7QUFDSTtBQUNBO0FBRkk7QUFEbUM7QUFNbEQ7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBSEk7QUFEK0I7QUFPOUM7O0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFESTtBQURzQztBQUtyRDs7QUFFRDtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBRkk7QUFEdUM7QUFNdEQ7QUFFSjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUNqSUk7QUFDQTtBQUNJO0FBQ0k7QUFDQTs7QUFFSjtBQUNJO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JSO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFGRTtBQUlOO0FBQ0k7QUFDQTtBQUZHO0FBSVA7QUFDSTtBQUNBO0FBRkU7QUFJTjtBQUNJO0FBQ0E7QUFGRTtBQWJFOztBQW1CWjtBQUNJO0FBQ0g7QUFFRDtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUVEO0FBQ0k7Ozs7QUFJQTs7QUFHQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxXOztBQVlmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNIO0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUtIO0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUg7QUFFRDtBQUFPOztBQUNIO0FBQ0E7QUFDQTtBQUdRO0FBQ0g7QUFFUjtBQUVEO0FBQU87O0FBQ0g7QUFDQTtBQUNBO0FBR1E7QUFDSTtBQUNJO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNHOztBQUVBO0FBQ0k7QUFDSDtBQUNHO0FBQ0E7QUFDSDtBQUNKO0FBRUo7QUFFSjtBQUNHO0FBQ0E7OztBQUdBO0FBQ0E7QUFFSTtBQUNBO0FBRUE7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDSjtBQUVSO0FBRUQ7QUFDSTtBQUNIO0FBRUQ7QUFDSTtBQUNBO0FBQ0g7QUFFRDtBQUFPOztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHUTtBQUNBO0FBQ0g7QUFFUjtBQUVEO0FBQWU7O0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUVJO0FBQ0E7QUFFQTtBQUNIO0FBQ0c7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUVEO0FBQ0k7QUFDSTtBQUNKO0FBQ0E7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBck9tQjs7Ozs7Ozs7OztBQ0F4QjtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBRUQ7QUFDSTtBQUVIO0FBQ0Q7QUFDSTs7OztBQUlBO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUFDSjtBQUNEO0FBR0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUZROztBQUtaOztBQUVBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFGUTs7QUFLWjs7QUFFQTs7QUFFQTtBQUNIO0FBckRJOzs7Ozs7Ozs7Ozs7OztBQ0FUOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OztBQUdJO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFGTTtBQUlWO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGUztBQUliO0FBQ0k7QUFDQTtBQUZPO0FBSVg7QUFDSTtBQUNBO0FBRks7QUFJVDtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZLO0FBSVQ7QUFDSTtBQUNBO0FBRkU7QUFJTjtBQUNJO0FBQ0E7QUFGRTtBQUlOO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZHO0FBckRDO0FBMERaO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFDSTs7OztBQUlBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBRUg7QUFFRDtBQUNJOztBQUVBOztBQUdBOztBQUdBO0FBQ0E7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STtBQUNBO0FBQ0g7QUFDSjtBQUNKO0FBQ0Q7QUFFSDtBQUNKO0FBQ0o7QUFFRDtBQUFPOztBQUNIO0FBR1E7QUFDSDtBQUVSO0FBaE1tQjs7Ozs7Ozs7Ozs7Ozs7QUNDcEI7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFGWTtBQUloQjtBQUNJO0FBQ0E7QUFGVztBQUlmO0FBQ0k7QUFDQTtBQUZZO0FBSWhCO0FBQ0k7QUFDQTtBQUZXO0FBSWY7QUFDSTtBQUNBO0FBRlE7QUFJWjtBQUNJO0FBQ0E7QUFGTztBQUlYO0FBQ0k7QUFDQTtBQUZZO0FBSWhCO0FBQ0k7QUFDQTtBQUZZO0FBSWhCO0FBQ0k7QUFDQTtBQUZZO0FBSWhCO0FBQ0k7QUFDQTtBQUZhO0FBSWpCO0FBQ0k7QUFDQTtBQUZVO0FBSWQ7QUFDSTtBQUNBO0FBRlU7QUFJZDtBQUNJO0FBQ0E7QUFGVTtBQUlkO0FBQ0k7QUFDQTtBQUZXO0FBSWY7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZJO0FBakVBO0FBSFE7Ozs7Ozs7Ozs7Ozs7O0FDQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSTtBQUNJO0FBRUE7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFBUzs7QUFFTDtBQUVJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSDtBQUNKO0FBRUo7QUEvQlUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIOW4uOmHj1xyXG4qL1xyXG5cclxuY29uc3RcclxuICAgIEFQUElEID0gJ3d4YTk1ZWVlNDhhM2FjNThjNicsXHJcbiAgICBTRVJWRVIgPSAnaHR0cDovL2RvbGwueW9vc2gudHYnXHJcblxyXG5jb25zdCBCYXNlID0ge1xyXG4gICAgZ2V0Q29va2llKGtleSkge1xyXG4gICAgICAgIGtleSA9IGtleS50b1N0cmluZygpXHJcbiAgICAgICAgaWYgKCFrZXkubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICAgICAgY29uc3Qgc3RyID0gZG9jdW1lbnQuY29va2llXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gc3RyLmluZGV4T2YoYCR7a2V5fT1gKSxcclxuICAgICAgICAgICAgZW5kXHJcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgcmV0dXJuICcnXHJcbiAgICAgICAgc3RhcnQgKz0ga2V5Lmxlbmd0aCArIDFcclxuICAgICAgICBlbmQgPSBzdHIuaW5kZXhPZignOycsIHN0YXJ0KVxyXG4gICAgICAgIGVuZCA9PT0gLTEgPyBlbmQgPSBzdHIubGVuZ3RoIDogbnVsbFxyXG4gICAgICAgIHJldHVybiB3aW5kb3cudW5lc2NhcGUoc3RyLnNsaWNlKHN0YXJ0LCBlbmQpKVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQYXJhbShrZXkpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgc3RyID0gbG9jYXRpb24uc2VhcmNoLFxyXG4gICAgICAgICAgICBzdGFydCA9IHN0ci5pbmRleE9mKGtleSksXHJcbiAgICAgICAgICAgIGVuZFxyXG5cclxuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSByZXR1cm4gJydcclxuICAgICAgICBzdGFydCArPSBrZXkubGVuZ3RoICsgMVxyXG4gICAgICAgIGVuZCA9IHN0ci5pbmRleE9mKCcmJywgc3RhcnQpXHJcbiAgICAgICAgZW5kID09PSAtMSA/IGVuZCA9IHN0ci5sZW5ndGggOiBudWxsXHJcbiAgICAgICAgcmV0dXJuIHN0ci5zbGljZShzdGFydCwgZW5kKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBBcGkoKSB7XHJcblxyXG4gICAgdGhpcy5hdXRob3JpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGFwcGlkOiBBUFBJRCxcclxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiAnaHR0cHM6Ly9nYW1lLnlvb3NoLnR2L2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICByZXNwb25zZV90eXBlOiAnY29kZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiAnc25zYXBpX3VzZXJpbmZvJyxcclxuICAgICAgICAgICAgc3RhdGU6IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHF1ZXJ5c3RyaW5nID0gT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2tleX09JHtwYXJhbXNba2V5XX1gXHJcbiAgICAgICAgfSkuam9pbignJicpXHJcblxyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBgaHR0cHM6Ly9vcGVuLndlaXhpbi5xcS5jb20vY29ubmVjdC9vYXV0aDIvYXV0aG9yaXplPyR7cXVlcnlzdHJpbmd9YFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvbG9naW5gLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgY29kZTogY29kZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFVzZXJJbmZvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvZ2V0VXNlckluZm9gKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2V0TW9kZWxMaXN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvbW9kZWxMaXN0YClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFByaXplTGlzdCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvcHJpemVMaXN0YCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtnYW1lTW9kZWxJZDogaWR9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyYWIgPSBmdW5jdGlvbihnb29kc0lkLCBtYXRjaElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L2RvbGwvZ3JhYmAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lTW9kZWxJZDogbWF0Y2hJZCxcclxuICAgICAgICAgICAgICAgIHByaXplSWQ6IGdvb2RzSWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmFiSGlzdG9yeSA9IGZ1bmN0aW9uKHBhZ2U9MSwgcGFnZVNpemU9MTApIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vZG9sbC9ncmFiSGlzdG9yeWAsIHtcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nb29kc0xpc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke1NFUlZFUn0vbWFsbC9zYWxlc0dvbGRgKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHVyY2hhc2UgPSBmdW5jdGlvbihpZCwgY2FsbEJhY2tVcmwsIGNhbmNlbFVybCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkLCBjYWxsQmFja1VybCwgY2FuY2VsVXJsKVxyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS9tYWxsL2J1eUdvbGRgLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZ29sZElkOiBpZCxcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrVXJsOiBjYWxsQmFja1VybCB8fCBgJHtsb2NhdGlvbi5vcmlnaW59JHtsb2NhdGlvbi5wYXRobmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVXJsOiBjYW5jZWxVcmwgfHwgYCR7bG9jYXRpb24ub3JpZ2lufSR7bG9jYXRpb24ucGF0aG5hbWV9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldENhcHRjaGEgPSBmdW5jdGlvbihwaG9uZSkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7U0VSVkVSfS91c2VyL2dldENvZGVCeVBob25lYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJpbmRQaG9uZSA9IGZ1bmN0aW9uKHBob25lLCBjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtTRVJWRVJ9L3VzZXIvYmluZFBob25lQnlDb2RlYCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZSxcclxuICAgICAgICAgICAgICAgIGNvZGU6IGNvZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5BcGkucHJvdG90eXBlID0gQmFzZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEFwaSgpXHJcblxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNsaWNrU3RhcnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9Tb3VyY2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhdGNoZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9Tb3VyY2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsZWZ0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJpZ2h0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvcGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgIH0sXHJcblxyXG4gICAgc2V0TW9kZWwoaSkge1xyXG4gICAgICAgIGlmIChpID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9wZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd1JvcGVHb2xkXHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd0JvZHlHb2xkXHJcbiAgICAgICAgICAgIHRoaXMubGVmdC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd0xlZnRHb2xkXHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdSaWdodEdvbGRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvcGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLmNsYXdSb3BlTm9ybWFsXHJcbiAgICAgICAgICAgIHRoaXMuYm9keS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuY2xhd0JvZHlOb3JtYWxcclxuICAgICAgICAgICAgdGhpcy5sZWZ0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3TGVmdE5vcm1hbFxyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5jbGF3UmlnaHROb3JtYWxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG4gICAgICAgIC8vIOWumuS5ieWKqOS9nFxyXG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHtcclxuICAgICAgICAgICAgcm90YXRlOiBjYy5yb3RhdGVCeSguMSwgNTYpLFxyXG4gICAgICAgICAgICBtb3ZlOiBjYy5tb3ZlQnkoLjMsIDAsIC00NDApLFxyXG4gICAgICAgICAgICB1cDogY2MubW92ZUJ5KC42LCAwLCA0NDApLFxyXG4gICAgICAgICAgICBzY2FsZTogY2Muc2NhbGVCeSguMywgLjUpLFxyXG4gICAgICAgICAgICBmbG9wOiBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnJvdGF0ZUJ5KC44LCAzNjApLnJlcGVhdEZvcmV2ZXIoKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSguOCwgMCwgLTUwMCksXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZUJ5KC44LCAxLjUpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOeIquWtkOeKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAnZnJlZSdcclxuXHJcbiAgICAgICAgLy8g54iq5a2Q5Yid5aeL6auY5bqmXHJcbiAgICAgICAgdGhpcy55ID0gMzc3XHJcblxyXG4gICAgICAgIC8vIOe7s+WtkOWIneWni+mVv+W6plxyXG4gICAgICAgIHRoaXMucm9wZUhlaWdodCA9IDEyMFxyXG5cclxuICAgICAgICAvLyDmmK/lkKbmipPkvY9cclxuICAgICAgICB0aGlzLmNhdGNoZWQgPSBmYWxzZVxyXG5cclxuICAgICAgICAvLyDmipPlj5bnmoQgZ2lmdFxyXG4gICAgICAgIHRoaXMuZ2lmdCA9IG51bGxcclxuXHJcbiAgICAgICAgLy8g5oqT5Y+W5Yqo55S7XHJcbiAgICAgICAgdGhpcy5jYXRjaEFuaW1hdGVkID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g5o6l5Y+j6K+35rGC54q25oCBXHJcbiAgICAgICAgdGhpcy53YWl0ID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g5oqT5Y+W57uT5p6cXHJcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgfSxcclxuXHJcbiAgICBncmFiKGZ1bmMpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ2ZhbGwnKSByZXR1cm5cclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2dyYWInXHJcbiAgICAgICAgdGhpcy5sZWZ0LnJ1bkFjdGlvbih0aGlzLmFjdGlvbnMucm90YXRlLnJldmVyc2UoKSlcclxuICAgICAgICB0aGlzLnJpZ2h0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnJvdGF0ZSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuYylcclxuICAgICAgICApKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZnJlZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ3Jpc2UnKSByZXR1cm5cclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2ZyZWUnXHJcbiAgICAgICAgdGhpcy5sZWZ0LnJ1bkFjdGlvbih0aGlzLmFjdGlvbnMucm90YXRlKVxyXG4gICAgICAgIHRoaXMucmlnaHQucnVuQWN0aW9uKHRoaXMuYWN0aW9ucy5yb3RhdGUucmV2ZXJzZSgpKVxyXG4gICAgICAgIHRoaXMuY2F0Y2hlZCA9XHJcbiAgICAgICAgdGhpcy5jYXRjaEFuaW1hdGVkID0gZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgZmFsbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gJ2ZyZWUnKSByZXR1cm5cclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2ZhbGwnXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLm1vdmUsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhYih0aGlzLnJpc2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICByaXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSAnZ3JhYicpIHJldHVyblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAncmlzZSdcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMudXAsXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhdGNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnQuekluZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjee9riBnaWZ0IHpJbmRleCA8IHBpdC1hcm91bmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzdWx0cy5ncmFiUmVzdWx0SW50ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnQuekluZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3NlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5nYW1lLnNob3dSZXN1bHQodGhpcy5yZXN1bHRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVzdWx0cy5ncmFiUmVzdWx0SW50ID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpbigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzdWx0cy5nb29kcy50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLmdhbWUuc2hvd1Jlc3VsdCh0aGlzLnJlc3VsdHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaKk+WIsOWunueJqeeahOaViOaenFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5nYW1lLnByb21wdC5zaG93KHRoaXMucmVzdWx0cy5nb29kcy5pbWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlKClcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICog6K+35rGC5oqT5Y+W5aSE55CG5o6l5Y+jXHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLmFwaS5ncmFiKG51bGwsIHRoaXMubWFpbi5nYW1lLm1hdGNoSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB0aGlzLnJlc3VsdHMgPSByZXMuZGF0YS5yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4udXNlci51cGRhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIudXBkYXRlKClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuICAgIHJhbmRvbSgpIHtcclxuICAgICAgICByZXR1cm4gfn4oTWF0aC5yYW5kb20oKSAqIDEwKVxyXG4gICAgfSxcclxuXHJcbiAgICB3aW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYWluLmdpZnQucHV0SXRlbSh0aGlzLmdpZnQpXHJcbiAgICAgICAgdGhpcy5mcmVlKClcclxuICAgIH0sXHJcblxyXG4gICAgbG9zZSgpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog5o6J6JC9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmZyZWUoKVxyXG4gICAgICAgIC8vIOatpOaXtuimgemHjee9riBzdGF0ZSDkuLrpnZ4gZnJlZSDnirbmgIFcclxuICAgICAgICB0aGlzLnN0YXRlID0gJ3Jpc2UnXHJcbiAgICAgICAgLy8g5riF6ZmkIGdpZnQgYWN0aW9uXHJcbiAgICAgICAgdGhpcy5naWZ0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB0aGlzLmdpZnQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuZmxvcCxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmdpZnQucHV0SXRlbSh0aGlzLmdpZnQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2ZyZWUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH0sXHJcblxyXG4gICAgY2F0Y2hBbmltYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhdGNoQW5pbWF0ZWQpIHJldHVyblxyXG4gICAgICAgIHRoaXMuY2F0Y2hBbmltYXRlZCA9IHRydWVcclxuICAgICAgICB0aGlzLmdpZnQuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuZ2lmdC5ydW5BY3Rpb24odGhpcy5hY3Rpb25zLnNjYWxlKVxyXG4gICAgICAgIHRoaXMubWFpbi5hdWRpby5jYXRjaGVkLnBsYXkoKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog6K+35rGC5oqT5Y+W5aSE55CG5o6l5Y+jXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLndhaXQgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5tYWluLmFwaS5ncmFiKHRoaXMuZ2lmdC5fZ29vZHNJZCwgdGhpcy5tYWluLmdhbWUubWF0Y2hJZClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndhaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHRoaXMucmVzdWx0cyA9IHJlcy5kYXRhLnJcclxuICAgICAgICAgICAgZWxzZSB0aGlzLnJlc3VsdHMgPSBudWxsXHJcbiAgICAgICAgICAgIHRoaXMubWFpbi51c2VyLnVwZGF0ZSgpXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgdGhpcy53YWl0ID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gbnVsbFxyXG4gICAgICAgICAgICB0aGlzLm1haW4udXNlci51cGRhdGUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoMCwgMClcclxuICAgICAgICAvLyApXHJcbiAgICAgICAgdGhpcy5yb3BlLmhlaWdodCA9IHRoaXMucm9wZUhlaWdodCArIHRoaXMueSAtIHRoaXMubm9kZS55XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNhdGNoZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXRjaEFuaW1hdGUoKVxyXG4gICAgICAgICAgICB0aGlzLmdpZnQueCA9IHRoaXMubm9kZS54XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdC55ID0gdGhpcy5ub2RlLnkgLSAxMDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KVxyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcbiAgICB9LFxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xyXG4gICAgICAgIC8qIOajgOa1i+eIquWtkOeKtuaAgVxyXG4gICAgICAgICog6Z2eIGdyYWIg54q25oCBXHJcbiAgICAgICAgKiDkuI3kvZznorDmkp7lpITnkIZcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmICh0aGlzLm1haW4uZ2FtZS5jbGF3LnN0YXRlICE9PSAnZ3JhYicpIHJldHVyblxyXG4gICAgICAgIGlmIChzZWxmLm5vZGUubmFtZSA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbi5nYW1lLmNsYXcuY2F0Y2hlZCA9IHRoaXMuY2hlY2tMZWZ0KG90aGVyLCBzZWxmKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZi5ub2RlLm5hbWUgPT09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluLmdhbWUuY2xhdy5jYXRjaGVkID0gdGhpcy5jaGVja1JpZ2h0KG90aGVyLCBzZWxmKVxyXG4gICAgICAgIH0gZWxzZSBjb25zb2xlLmVycm9yKCfor7fmo4Dmn6Xnu4Tku7blkI3orr7nva4nKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tYWluLmdhbWUuY2xhdy5jYXRjaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbi5nYW1lLmNsYXcuZ2lmdCA9IG90aGVyLm5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Db2xsaXNpb25TdGF5KG90aGVyLCBzZWxmKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGNoZWNrTGVmdChnaWZ0LCBjbGF3KSB7XHJcbiAgICAgICAgLy8g6L2s5oiQ5LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgY29uc3QgcG9zID0ge1xyXG4gICAgICAgICAgICBnaWZ0OiBnaWZ0Lm5vZGUuY29udmVydFRvV29ybGRTcGFjZSgwLCAwKSxcclxuICAgICAgICAgICAgY2xhdzogY2xhdy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoMCwgMClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gcG9zLmdpZnQueCAtIHBvcy5jbGF3LnhcclxuXHJcbiAgICAgICAgaWYgKGRlbHRhID4gMjApIHJldHVybiB0cnVlXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgY2hlY2tSaWdodChnaWZ0LCBjbGF3KSB7XHJcbiAgICAgICAgLy8g6L2s5oiQ5LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgY29uc3QgcG9zID0ge1xyXG4gICAgICAgICAgICBnaWZ0OiBnaWZ0Lm5vZGUuY29udmVydFRvV29ybGRTcGFjZSgwLCAwKSxcclxuICAgICAgICAgICAgY2xhdzogY2xhdy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoMCwgMClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gcG9zLmNsYXcueCAtIHBvcy5naWZ0LnhcclxuXHJcbiAgICAgICAgaWYgKGRlbHRhID4gMTApIHJldHVybiB0cnVlXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59KVxyXG4iLCJpbXBvcnQgQ2xhdyBmcm9tICdjbGF3J1xyXG5pbXBvcnQgUnVsZSBmcm9tICdydWxlJ1xyXG5pbXBvcnQgUHJvbXB0IGZyb20gJ3Byb21wdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzdGFydEJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib3JkZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGl0QXJvdW5kOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlTGF5b3V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlQnRuczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZUJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2lmdEJ0bjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IENsYXdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogUnVsZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvbXB0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFByb21wdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzdWx0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjb3JlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKVxyXG4gICAgfSxcclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG4gICAgICAgIC8vIOWdkeS4i+WbtCB6SW5kZXggPCBnaWZ0LnpJbmRleFxyXG4gICAgICAgIHRoaXMucGl0QXJvdW5kLnpJbmRleCA9IDFcclxuXHJcbiAgICAgICAgLy8g5Zy65qyhaWRcclxuICAgICAgICB0aGlzLm1hdGNoSWQgPSBudWxsXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8g6ZqQ6JeP57uT5p6c5o+Q56S65qGGXHJcbiAgICAgICAgdGhpcy5yZXN1bHQuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgLy8g6ZqQ6JeP6I635aWW6K6w5b2VXHJcbiAgICAgICAgdGhpcy5tYWluLnJlY29yZC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIOiuvue9rui+ueahhueahCB6SW5kZXhcclxuICAgICAgICB0aGlzLmJvcmRlci56SW5kZXggPSAzXHJcblxyXG4gICAgICAgIC8vIOaMiemSriB6SW5kZXhcclxuICAgICAgICB0aGlzLnN0YWtlTGF5b3V0LnpJbmRleCA9XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi56SW5kZXggPSAzXHJcblxyXG4gICAgICAgIC8vIOiuvue9ruS4i+azqOaMiemSriB6SW5kZXhcclxuICAgICAgICB0aGlzLnN0YWtlLnpJbmRleCA9IDNcclxuXHJcbiAgICAgICAgLy8g5LiL5rOo5YC8XHJcbiAgICAgICAgdGhpcy5zdGFrZVZhbHVlID0gbnVsbFxyXG5cclxuICAgICAgICAvLyDojrflj5blnLrmrKFcclxuICAgICAgICB0aGlzLmdldE1vZGVsTGlzdCgpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRNYXRjaChpbmRleCwgaWQpIHtcclxuICAgICAgICBjb25zdCBidG4gPSB0aGlzLnN0YWtlQnRuc1swXVxyXG5cclxuICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuUHJlc3NcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcblxyXG5cclxuICAgICAgICB0ZXh0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB0ZXh0LnJ1bkFjdGlvbihjYy5qdW1wVG8oMSwgMCwgOSwgMTAsIDMpKVxyXG5cclxuICAgICAgICAvLyDorr7nva4g5b2T5YmN5LiL5rOo5YC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGFrZShpbmRleClcclxuXHJcbiAgICAgICAgLy8g6K6+572uIOW9k+WJjeWcuuasoSBpZFxyXG4gICAgICAgIHRoaXMubWF0Y2hJZCA9IGlkXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRTdGFrZSh2YWwpIHtcclxuICAgICAgICBzd2l0Y2ggKHZhbCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWtlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLm1hdGNoTVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFrZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLnNwcml0ZUZyYW1lcy5tYXRjaExcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWtlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLm1hdGNoU1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOiOt+WPluWPr+eOqeWcuuasoVxyXG4gICAgZ2V0TW9kZWxMaXN0KCkge1xyXG4gICAgICAgIHRoaXMubWFpbi5hcGkuZ2V0TW9kZWxMaXN0KClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5yLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWtlQnRuc1tpXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLm5hbWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uX21hdGNoSWQgPSBpdGVtLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uX29wZW5TdGF0ZSA9IGl0ZW0ub3BlblN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZUJ0bnNbaV0uX3ZhbHVlID0gaXRlbS5nb2xkRXhwZW5kXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmdnuW8gOaUvueKtuaAgVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5vcGVuU3RhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YWtlVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZVZhbHVlID0gaXRlbS5nb2xkRXhwZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3Rha2UoaSwgaXRlbS5pZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W5aWW5ZOB5YiX6KGoXHJcbiAgICBnZXRQcml6ZUxpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluLmFwaS5nZXRQcml6ZUxpc3QodGhpcy5tYXRjaElkKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmdpZnQuYnVpbGQocmVzLmRhdGEucilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dSZXN1bHQocmVzdWx0cykge1xyXG4gICAgICAgIGlmIChyZXN1bHRzLmdyYWJSZXN1bHRJbnQgPT09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IGNjLmxvYWRlci5nZXRSZXMoJ2ltYWdlL2dhbWUvcmVzdWx0LXdpbicsIGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBjYy5sb2FkZXIuZ2V0UmVzKCdpbWFnZS9nYW1lL3Jlc3VsdC1mYWlsJywgY2MuU3ByaXRlRnJhbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5yZXN1bHQuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXN1bHRzLmdyYWJSZXN1bHRTdHJcclxuICAgICAgICB0aGlzLnJlc3VsdC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmp1bXBCeSguNSwgMCwgMCwgMTAsIDMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICAvLyDlvIDlp4vmjInpkq5cclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmF1ZGlvLmNsaWNrU3RhcnQucGxheSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLnN0YXJ0QnRuUHJlc3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuc3RhcnRCdG5Ob3JtYWxcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoSWQgPT09IG51bGwpIGFsZXJ0KCfor7flhYjkuIvms6gnKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYWluLnVzZXIuYmFsYW5jZSA8IHRoaXMuc3Rha2VWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5zaG9wLnNob3coKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmNsYXcuZmFsbCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vIOS4i+azqOaMiemSrlxyXG4gICAgICAgIHRoaXMuc3Rha2VCdG5zLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnRuLl9pbmRleCA9IGluZGV4XHJcbiAgICAgICAgICAgIGJ0bi5vbihcclxuICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDnpoHpgIlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJ0bi5fb3BlblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gYnRuLl92YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPiB0aGlzLm1haW4udXNlci5iYWxhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5zaG9wLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFrZVZhbHVlID0gdmFsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5zcHJpdGVGcmFtZXMuc3Rha2VCdG5Ob3JtYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g56e76Zmk5YW25LuW54m55pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMCwgMCwgMTgpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW4uc3ByaXRlRnJhbWVzLnN0YWtlQnRuUHJlc3NcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ0bi5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnJ1bkFjdGlvbihjYy5qdW1wVG8oMSwgMCwgOSwgMTAsIDMpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIvms6hcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YWtlKGJ0bi5faW5kZXgpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva4g5b2T5YmN5Zy65qyhIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaElkID0gYnRuLl9tYXRjaElkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiOt+WPluWlluWTgeWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJpemVMaXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAqIOmrmOe6p+WcuuWIh+aNolxyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGF3LnNldE1vZGVsKHRoaXMubWF0Y2hJZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOinhOWImeaMiemSrlxyXG4gICAgICAgIHRoaXMucnVsZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVsZUJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMucnVsZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVCdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGUuc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vIGdpZnRCdG5cclxuICAgICAgICB0aGlzLmdpZnRCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRCdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLmdpZnRCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0QnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLnJlY29yZC5zaG93KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLy8gYWRkQnRuXHJcbiAgICAgICAgdGhpcy5hZGRCdG4ub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ0bi5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMuYWRkQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLnNob3Auc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwcmVmYWJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8g5LiK5LiA5Liq5re75Yqg55qEIGdpZnRcclxuICAgICAgICB0aGlzLmxhc3QgPSBudWxsXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiBnaWZ0IHBvb2xcclxuICAgICAgICAqIOavj+enjSBnaWZ0IOWvueW6lOS4gOS4qiBwb29sXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLnByZWZhYnMubWFwKGl0ZW0gPT4gY2MuaW5zdGFudGlhdGUoaXRlbSkpXHJcblxyXG4gICAgICAgIC8vIOmihOWumuS5iSBhY3Rpb25cclxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIG1vdmU6IGNjLm1vdmVCeSg1LCA4ODgsIDApXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9vbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9vbC5zcGxpY2Uofn4oTWF0aC5yYW5kb20oKSAqIHRoaXMucG9vbC5sZW5ndGgpLCAxKVswXVxyXG4gICAgICAgIH0gZWxzZSByZXR1cm4gbnVsbFxyXG4gICAgfSxcclxuXHJcbiAgICBwdXRJdGVtKGl0ZW0pIHtcclxuICAgICAgICBpdGVtLnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICBpdGVtLnJlbW92ZUZyb21QYXJlbnQoKVxyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKGl0ZW0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAqIEBwYXJhbSB7YXJyYXl9IGdvb2RzTGlzdFxyXG4gICAgKi9cclxuICAgIGJ1aWxkKGxpc3QpIHtcclxuICAgICAgICBjb25zdCBfcG9vbCA9IHRoaXMucG9vbC5jb25jYXQodGhpcy5tYWluLmdhbWUubm9kZS5jaGlsZHJlbi5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdnaWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gaXRlbS5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDpgY3ljoYgbGlzdFxyXG4gICAgICAgICog5pyA57uIIHBvb2wg55qE5Liq5pWw5LulIGxpc3Qg5Li65YeGXHJcbiAgICAgICAgKi9cclxuICAgICAgICBsZXQgaSA9IDBcclxuXHJcbiAgICAgICAgY29uc3QgbG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgbGV0IGdpZnQgPSBfcG9vbFtpXVxyXG4gICAgICAgICAgICBpZiAoIWdpZnQpIHtcclxuICAgICAgICAgICAgICAgIGdpZnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNbMF0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1dEl0ZW0oZ2lmdClcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOWIpOaWreWlluWTgeexu+Wei1xyXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnaWZ0LmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLm5hbWUubWF0Y2goL1xcZCsvKVswXVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2lmdC5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJydcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2lmdC5fZ29vZHNJZCA9IGl0ZW0uaWRcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IGdpZnQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoaXRlbS5pbWcsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgIGVsc2Ugc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpXHJcbiAgICAgICAgICAgICAgICBpZiAoKytpIDwgbGlzdC5sZW5ndGgpIGxvYWQoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkKClcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICog5re75YqgIGdpZnRcclxuICAgICog6buY6K6k5L2N572uIOWxj+W5leW3puS+p1xyXG4gICAgKiBAcGFyYW0ge251bWJlcn0geDogLTQ0MVxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0geTogLTI1MFxyXG4gICAgKi9cclxuICAgIGFkZCh4PS00NDEsIHk9LTI1MCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDpu5jorqTmg4XlhrXkuItcclxuICAgICAgICAqIOWxleekuuWlluWTgVxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3RcclxuICAgICAgICAgICAgaSA9IH5+KE1hdGgucmFuZG9tKCkgKiB0aGlzLnByZWZhYnMubGVuZ3RoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgdGhpcy5sYXN0ID0gdGhpcy5nZXRJdGVtKCkgfHwgY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzW2ldKVxyXG4gICAgICAgIHRoaXMubGFzdC5zdG9wQWxsQWN0aW9ucygpXHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2dhbWUnKVxyXG4gICAgICAgICAgICAuYWRkQ2hpbGQodGhpcy5sYXN0KVxyXG4gICAgICAgIHRoaXMubGFzdC5uYW1lID0gJ2dpZnQnXHJcbiAgICAgICAgdGhpcy5sYXN0LnggPSB4XHJcbiAgICAgICAgdGhpcy5sYXN0LnkgPSB5XHJcbiAgICAgICAgdGhpcy5sYXN0LnNjYWxlID0gMVxyXG4gICAgICAgIHRoaXMubGFzdC56SW5kZXggPSAyXHJcbiAgICAgICAgdGhpcy5sYXN0LnJvdGF0aW9uID0gMFxyXG4gICAgICAgIHRoaXMubGFzdC5fdHlwZUluZGV4ID0gaVxyXG5cclxuICAgICAgICB0aGlzLmxhc3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMubW92ZS5jbG9uZSgpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnB1dEl0ZW0odGhpcylcclxuICAgICAgICAgICAgfSwgdGhpcy5sYXN0KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgY2hlY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdCAmJiB0aGlzLmxhc3QueCA+IC0xODIpIHRoaXMuYWRkKClcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2soKVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmFkZCgpXHJcbiAgICB9XHJcbn0pXHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHVudXNlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1bnVzZScpXHJcbiAgICB9LFxyXG5cclxuICAgIHJldXNlKCkge1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBob25lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvZGVCdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN1Ym1pdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BpcnRlRnJhbWVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2RlQnRuVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVxyXG4gICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoJ21haW4nKS5nZXRDb21wb25lbnQoJ21haW4nKVxyXG5cclxuICAgICAgICAvLyDnvZHnu5zor7fmsYLnirbmgIFcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB3YWl0OiBmYWxzZSxcclxuICAgICAgICAgICAgdGltZTogMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5waG9uZUlucHV0ID0gdGhpcy5waG9uZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveClcclxuICAgICAgICB0aGlzLmNvZGVJbnB1dCA9IHRoaXMuY29kZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveClcclxuICAgICAgICB0aGlzLm1haW4uc2hvcC5ub2RlLnpJbmRleCA9IDFcclxuICAgIH0sXHJcblxyXG4gICAgY291bnREb3duKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudGltZS0tXHJcbiAgICAgICAgdGhpcy5jb2RlQnRuVGV4dC5zdHJpbmcgPSB0aGlzLnN0YXRlLnRpbWUudG9TdHJpbmcoKSArICdzJ1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb2RlUmVzZXQoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnREb3duKClcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgfSxcclxuXHJcbiAgICBjb2RlUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb2RlQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgdGhpcy5zcGlydGVGcmFtZXNbMF1cclxuICAgICAgICB0aGlzLmNvZGVCdG5UZXh0LnN0cmluZyA9ICfojrflj5bpqozor4HnoIEnXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5omL5py65Y+36L6T5YWl5LqL5Lu255uR5ZCsXHJcbiAgICAgICAgKiDmm7/mjaLpnZ7mlbDlrZflrZfnrKbkuLrnqbpcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICB0aGlzLnBob25lLm9uKCd0ZXh0LWNoYW5nZWQnLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBob25lSW5wdXQuc3RyaW5nID0gdGhpcy5waG9uZUlucHV0LnN0cmluZy5yZXBsYWNlKC9cXEQvZywgJycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDpqozor4HnoIHovpPlhaXkuovku7bnm5HlkKxcclxuICAgICAgICAqIOabv+aNoumdnuaVsOWtl+Wtl+espuS4uuepulxyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIHRoaXMuY29kZS5vbigndGV4dC1jaGFuZ2VkJyxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlSW5wdXQuc3RyaW5nID0gdGhpcy5jb2RlSW5wdXQuc3RyaW5nLnJlcGxhY2UoL1xcRC9nLCAnJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOmqjOivgeeggeaMiemSruebkeWQrFxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb2RlQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlQnRuLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuY29kZUJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVCdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS53YWl0KSByZXR1cm5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRpbWUpIHJldHVyblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUud2FpdCA9IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uYXBpLmdldENhcHRjaGEodGhpcy5waG9uZUlucHV0LnN0cmluZylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWQr+WKqOWAkuiuoeaXtlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWUgPSA2MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50RG93bigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGlydGVGcmFtZXNbMV1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuZGF0YS5tKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLndhaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5o+Q5Lqk5oyJ6ZKuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnN1Ym1pdC5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHRoaXMuc3VibWl0Lm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LnNjYWxlID0gMVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5hcGkuYmluZFBob25lKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dC5zdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlSW5wdXQuc3RyaW5nXHJcbiAgICAgICAgICAgICAgICApLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluLnVzZXIucGhvbmUgPSB0aGlzLnBob25lSW5wdXQuc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29kZUlucHV0LnN0cmluZyA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dC5zdHJpbmcgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5kYXRhLm0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWFs+mXreaMiemSrlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oLjUpKVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoLjUpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApKVxyXG4gICAgfVxyXG59KVxyXG4iLCJpbXBvcnQgR2FtZSBmcm9tICdnYW1lJ1xyXG5pbXBvcnQgU2hvcCBmcm9tICdzaG9wJ1xyXG5pbXBvcnQgQXVkaW8gZnJvbSAnYXVkaW8nXHJcbmltcG9ydCBSZWNvcmQgZnJvbSAncmVjb3JkJ1xyXG5pbXBvcnQgTG9naW4gZnJvbSAnbG9naW4nXHJcbmltcG9ydCBhcGkgZnJvbSAnYXBpJ1xyXG5pbXBvcnQgdXNlciBmcm9tICd1c2VyJ1xyXG5cclxuXHJcbmNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxyXG5zY3JpcHQub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBheGlvcy5kZWZhdWx0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXHJcbn1cclxuc2NyaXB0LnNyYyA9ICcvL2Nkbi55b29zaC50di9qcy9heGlvcy5taW4uanMnXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBvcGVuQ29sbGlzaW9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKVxyXG4gICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZVxyXG5cclxuICAgIC8qXHJcbiAgICAqIOW8gOWQryBkZWJ1ZyDmqKHlvI9cclxuICAgICog5q2j5byP546v5aKD5LiL5YWz6ZetXHJcbiAgICAqL1xyXG4gICAgaWYgKGxvY2F0aW9uLnBvcnQgPT09ICc3NDU2Jykge1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBnYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IEdhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3A6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogU2hvcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQXVkaW9cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY29yZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBSZWNvcmRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZ2luOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IExvZ2luXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyDlvIDlkK/norDmkp7mo4DmtYtcclxuICAgICAgICBvcGVuQ29sbGlzaW9uKClcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmdpZnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dhbWUnKVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KCdnaWZ0JylcclxuXHJcbiAgICAgICAgdGhpcy5hcGkgPSBhcGlcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZXMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdzcHJpdGVGcmFtZScpXHJcblxyXG4gICAgICAgIGFwaS5nZXRVc2VySW5mbygpXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGFwaS5nZXRQYXJhbSgnY29kZScpXHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaS5sb2dpbihjb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5uaWNrbmFtZSA9IHJlcy5kYXRhLnIubmlja25hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuYmFsYW5jZSA9IHJlcy5kYXRhLnIuYmFsYW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5waG9uZSA9IHJlcy5kYXRhLnIucGhvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuYXZhdGFyID0gcmVzLmRhdGEuci5wcm9maWxlSW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNjb3JlLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nID0gdXNlci5iYWxhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGFwaS5hdXRob3JpemUoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXNlci5uaWNrbmFtZSA9IHJlcy5kYXRhLnIubmlja25hbWVcclxuICAgICAgICAgICAgICAgIHVzZXIuYmFsYW5jZSA9IHJlcy5kYXRhLnIuYmFsYW5jZVxyXG4gICAgICAgICAgICAgICAgdXNlci5waG9uZSA9IHJlcy5kYXRhLnIucGhvbmVcclxuICAgICAgICAgICAgICAgIHVzZXIuYXZhdGFyID0gcmVzLmRhdGEuci5wcm9maWxlSW1nXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNjb3JlLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAuc3RyaW5nID0gdXNlci5iYWxhbmNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdsb3c6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByaXplOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9naW5CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFzazoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYXNrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAvLyDlhbPpl61cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMuY2xvc2Uub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vIGxvZ2luXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmxvZ2luLnNob3coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdyh1cmkpIHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZCh1cmksIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikgYWxlcnQoZXJyKVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOiuvue9ruWlluWTgeWbvueJh1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcml6ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g54Kr5YWJ5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb3cucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMywgMzYwKSkpXHJcblxyXG4gICAgICAgICAgICAgICAgLy/mmK/lkKbnmbvlvZVcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1haW4udXNlci5waG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkJ0bi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KC41KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH1cclxuXHJcbn0pXHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG4gICAgICAgIC8vIHRoaXMubGlzdGVuKClcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKVxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gLjk1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5hcGkucHVyY2hhc2UodGhpcy5ub2RlLl9fZ29vZHNJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxheW91dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpdGVtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3RoZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW5CdG46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog5YWz6Zet5oyJ6ZKuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZS5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICAvL2xvZ2luQnRuXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5CdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5sb2dpbi5zaG93KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5tYWluLnVzZXIucGhvbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vdGhlci5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm90aGVyLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1haW4uYXBpLmdyYWJIaXN0b3J5KClcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5yLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwXHJcbiAgICAgICAgICAgICAgICBjb25zdFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5sYXlvdXQuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IHJlcy5kYXRhLnJcclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0LmFkZENoaWxkKGNoaWxkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLm9wYWNpdHkgPSAyNTVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ3N0YXRlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nID0gaXRlbS5hd2FyZFN0YXR1c1N0clxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLmdvb2RzTmFtZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ2RhdGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtLmNyZWF0ZURhdGUucmVwbGFjZSgvKFxcZHs0fSkoXFxkezJ9KShcXGR7Mn0pLywgJyQxLSQyLSQzJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoaXRlbS5nb29kc0ltZywgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2ltYWdlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ29vZHNUeXBlID09PSAxKSBpbWcuc2NhbGUgPSAuM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2kgPCBsaXN0Lmxlbmd0aCkgbG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZU91dCguNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmtnOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIHRoaXMubGlzdGVuKClcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbiguNSkpXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbigpIHtcclxuICAgICAgICB0aGlzLm1hc2sub24oXHJcbiAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLmJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZmFkZU91dCguNSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkpXHJcbiAgICB9XHJcblxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG1hc2s6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB0aGlzLmxpc3RlbigpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWIneWni+WMluaXtlxyXG4gICAgICAgICog6I635Y+WIG1haW4g57uE5Lu2XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1haW4gPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSgnbWFpbicpLmdldENvbXBvbmVudCgnbWFpbicpXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDliJvlu7rnqbrlgJ/ngrlcclxuICAgICAgICAqIOaKtea2iCBsYXlvdXQg55qEIGNvdXBvblxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lbXB0eSA9IG5ldyBjYy5Ob2RlKClcclxuICAgICAgICB0aGlzLmVtcHR5Lm5hbWUgPSAnZW1wdHknXHJcbiAgICAgICAgdGhpcy5lbXB0eS5oZWlnaHQgPSAyNlxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW4oKSB7XHJcbiAgICAgICAgdGhpcy5tYXNrLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIOWFs+mXreaMiemSrlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uuc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlLnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB0aGlzLm5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKC41KSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5tYWluLmFwaS5nb29kc0xpc3QoKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwXHJcbiAgICAgICAgICAgICAgICBjb25zdFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5sYXlvdXQuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IHJlcy5kYXRhLnJcclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZEVtcHR5ID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDmnInnqbroioLngrnliJkgcmVtb3ZlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMubGF5b3V0LmdldENoaWxkQnlOYW1lKCdlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBlbXB0eSA/IGVtcHR5LnJlbW92ZUZyb21QYXJlbnQoKSA6IG51bGxcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2ldXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5hZGRDaGlsZChjaGlsZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5fZ29vZHNJZCA9IGl0ZW0uaWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdtb3JlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7aXRlbS5wcm9tb3Rpb25RdWFudGl0eX3ph5HluIFgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS5nZXRDaGlsZEJ5TmFtZSgnbGVzcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2l0ZW0ucXVhbnRpdHl96YeR5biBYFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnYnRuJykuZ2V0Q2hpbGRCeU5hbWUoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBg77+lJHtpdGVtLnByaWNlIC8gMTAwfWBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2NvdXBvbicpLmFjdGl2ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdsZXNzJykuYWN0aXZlID1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnByb21vdGlvblN0YXRlXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkLl9iaW5kKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5fYmluZCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6LSt5Lmw55uR5ZCsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdidG4nKS5vbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IC45NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnYnRuJykub24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnNjYWxlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbi5hcGkucHVyY2hhc2UoY2hpbGQuX2dvb2RzSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gcmVzLmRhdGEuclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvbW90aW9uU3RhdGUgJiYgaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkRW1wdHkgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChpdGVtLmltZywgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q2hpbGRCeU5hbWUoJ2ltYWdlJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykueCA9IC00NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2kgPCBsaXN0Lmxlbmd0aCkgbG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5lZWRFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuYWRkQ2hpbGQodGhpcy5lbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHkuc2V0U2libGluZ0luZGV4KDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZCgpXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KC41KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKSlcclxuICAgIH1cclxufSlcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzdGFydEJ0bk5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhcnRCdG5QcmVzczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2VCdG5Ob3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlQnRuUHJlc3M6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdEZhaWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3VsdFdpbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd1JvcGVOb3JtYWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdCb2R5Tm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3TGVmdE5vcm1hbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd1JpZ2h0Tm9ybWFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3Um9wZUdvbGQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsYXdCb2R5R29sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhd0xlZnRHb2xkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGF3UmlnaHRHb2xkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXRjaFM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hdGNoTToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF0Y2hMOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwaG9uZTogbnVsbCxcclxuICAgIGJhbGFuY2U6IDAsXHJcbiAgICBhdmF0YXI6IG51bGwsXHJcbiAgICBuaWNrbmFtZTogbnVsbCxcclxuICAgIF9tYWluOiBudWxsLFxyXG5cclxuICAgIGdldCBtYWluKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVxyXG4gICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoJ21haW4nKS5nZXRDb21wb25lbnQoJ21haW4nKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFpblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFpblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcblxyXG4gICAgICAgIHRoaXMubWFpbi5hcGkuZ2V0VXNlckluZm8oKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uaWNrbmFtZSA9IHJlcy5kYXRhLnIubmlja25hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFsYW5jZSA9IHJlcy5kYXRhLnIuYmFsYW5jZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5waG9uZSA9IHJlcy5kYXRhLnIucGhvbmVcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFyID0gcmVzLmRhdGEuci5wcm9maWxlSW1nXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmdhbWUuc2NvcmUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHJpbmcgPSB0aGlzLmJhbGFuY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=