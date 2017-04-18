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