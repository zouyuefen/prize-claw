cc.Class({
    extends: cc.Component,

    properties: {
        percent: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        const percent = this.percent.getComponent(cc.Label)
        percent.string = '0%'
        cc.loader.onProgress = (part, total) => {
            percent.string = `${~~(100 * part / total)}%`
        }
        cc.director.loadScene('main', () => {
            cc.loader.onProgress = null
        })
    }
});
