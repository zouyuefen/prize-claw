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