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