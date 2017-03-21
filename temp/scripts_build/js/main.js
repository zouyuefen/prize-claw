"use strict";
cc._RFpush(module, '235d9P0nsBF2Kyx+d+FoM2u', 'main');
// js\main.js

cc.Class({
    'extends': cc.Component,

    properties: {
        startBtn: {
            'default': null,
            type: cc.Node
        },
        stakeBtns: {
            'default': [],
            type: cc.Node
        },
        cats: {
            'default': [],
            type: cc.Node
        },
        spirteFrames: {
            'default': [],
            type: cc.SpriteFrame
        },
        stakes: {
            'default': {}
        }
    },

    // use this for initialization

    onLoad: function onLoad() {
        var _this = this;

        // 填充背景色
        document.querySelector('body').style.backgroundColor = '#963bce';

        this.startBtn.on(cc.Node.EventType.TOUCH_START, function () {
            _this.startBtn.scale = .95;
        });

        this.startBtn.on(cc.Node.EventType.TOUCH_END, function () {
            _this.startBtn.scale = 1;
        });

        this.stakeBtns.forEach(function (btn) {
            btn.on(cc.Node.EventType.TOUCH_START, function () {
                _this.stakeBtns.forEach(function (btn) {
                    btn.getComponent(cc.Sprite).spriteFrame = _this.spirteFrames[0];
                });
                btn.getComponent(cc.Sprite).spriteFrame = _this.spirteFrames[1];
            });
        });
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.cats.forEach(function (cat) {
            cat.x++;
            if (cat.x > (cc.winSize.width + cat.width) * .5) {
                cat.x = -(cc.winSize.width + cat.width) * .5;
            }
        });
    }
});

cc._RFpop();