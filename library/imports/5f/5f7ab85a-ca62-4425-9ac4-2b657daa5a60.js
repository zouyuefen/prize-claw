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