require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"main":[function(require,module,exports){
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
},{}]},{},["main"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NvZnR3YXJlL2NvY29zL3Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNJO0FBQ0E7QUFDWjtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNRO0FBQ0k7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0k7QUFESjtBQUNBO0FBQ0E7QUFDUTtBQUNSO0FBQ1E7QUFHUTtBQURoQjtBQUNBO0FBSVE7QUFHUTtBQUpoQjtBQUNBO0FBT1E7QUFDSTtBQUdRO0FBQ0k7QUFQeEI7QUFVb0I7QUFScEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlJO0FBQ0k7QUFDSTtBQUNBO0FBQ0k7QUFWaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHN0YXJ0QnRuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YWtlQnRuczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2F0czoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BpcnRlRnJhbWVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Rha2VzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcblxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIOWhq+WFheiDjOaZr+iJslxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzk2M2JjZSdcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCdG4uc2NhbGUgPSAuOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnRuLnNjYWxlID0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICB0aGlzLnN0YWtlQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5vbihcclxuICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Rha2VCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpcnRlRnJhbWVzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaXJ0ZUZyYW1lc1sxXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdGhpcy5jYXRzLmZvckVhY2goY2F0ID0+IHtcclxuICAgICAgICAgICAgY2F0LngrK1xyXG4gICAgICAgICAgICBpZiAoY2F0LnggPiAoY2Mud2luU2l6ZS53aWR0aCArIGNhdC53aWR0aCkqIC41KSB7XHJcbiAgICAgICAgICAgICAgICBjYXQueCA9IC0oY2Mud2luU2l6ZS53aWR0aCArIGNhdC53aWR0aCkgKiAuNVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG59KTtcclxuIl19