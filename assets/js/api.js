/*
* 常量
*/

const
    APPID = 'wxa95eee48a3ac58c6',
    SERVER = '//doll.yoosh.tv'

const Base = {
    getCookie(key) {
        key = key.toString()
        if (!key.length) return

        const str = document.cookie
        let
            start = str.indexOf(`${key}=`),
            end
        if (start === -1) return ''
        start += key.length + 1
        end = str.indexOf(';', start)
        end === -1 ? end = str.length : null
        return window.unescape(str.slice(start, end))
    },

    getParam(key) {
        var
            str = location.search,
            start = str.indexOf(key),
            end

        if (start === -1) return ''
        start += key.length + 1
        end = str.indexOf('&', start)
        end === -1 ? end = str.length : null
        return str.slice(start, end)
    }
}

function Api() {

    this.authorize = function() {
        const params = {
            appid: APPID,
            redirect_uri: 'https://game.yoosh.tv/login.html',
            response_type: 'code',
            scope: 'snsapi_base',
            state: location.href
        }

        const querystring = Object.keys(params).map(key => {
            return `${key}=${params[key]}`
        }).join('&')

        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?${querystring}`
    }

    this.login = function(code) {
        return axios.get(`${SERVER}/user/login`, {
            params: {
                code: code
            }
        })
    }

    this.getUserInfo = function() {
        return axios.get(`${SERVER}/user/getUserInfo`)
    }

    this.getModelList = function() {
        return axios.get(`${SERVER}/doll/modelList`)
    }

    this.getPrizeList = function(id) {
        return axios.get(`${SERVER}/doll/prizeList`, {
            params: {gameModelId: id}
        })
    }

    this.grab = function(goodsId, matchId) {
        return axios.get(`${SERVER}/doll/grab`, {
            params: {
                gameModelId: matchId,
                prizeId: goodsId
            }
        })
    }

    this.grabHistory = function(page=1, pageSize=10) {
        return axios.get(`${SERVER}/doll/grabHistory`, {
            params: {
                page,
                pageSize
            }
        })
    }

    this.goodsList = function() {
        return axios.get(`${SERVER}/mall/salesGold`)
    }

    this.purchase = function(id, callBackUrl, cancelUrl) {
        console.log(id, callBackUrl, cancelUrl)
        return axios.get(`${SERVER}/mall/buyGold`, {
            params: {
                goldId: id,
                callBackUrl: callBackUrl || `${location.origin}${location.pathname}`,
                cancelUrl: cancelUrl || `${location.origin}${location.pathname}`
            }
        })
    }

    this.getCaptcha = function(phone) {
        return axios.get(`${SERVER}/user/getCodeByPhone`, {
            params: {
                phoneNumber: phone
            }
        })
    }

    this.bindPhone = function(phone, code) {
        return axios.get(`${SERVER}/user/bindPhoneByCode`, {
            params: {
                phoneNumber: phone,
                code: code
            }
        })
    }

    this.monitor = function(event, eventType, eventTypeTab=0) {
        axios.get(`${SERVER}/event/monitor`, {
            params: {
                event,
                eventType,
                eventTypeTab
            }
        })
    }

    this.onEvent = function(...args) {
        if (TDAPP) {
            TDAPP.onEvent(...args)
        }
    }

}

Api.prototype = Base

export default new Api()


