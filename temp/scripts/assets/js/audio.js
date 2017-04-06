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