export default cc.Class({
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
})
