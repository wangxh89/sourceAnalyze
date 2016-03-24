/**
 * @module zrender/graphic/Style
 */

define(function (require) {

    var STYLE_LIST_COMMON = [
        'lineCap', 'lineJoin', 'miterLimit',
        'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'shadowColor'
    ];

    var Style = function (opts) {
        this.extendFrom(opts);
    };

    Style.prototype = {

        constructor: Style,

        /**
         * 填充颜色
         * @type {string}
         */
        fill: '#000000',

        /**
         * 描边颜色
         * @type {string}
         */
        stroke: null,

        /**
         * 绘制透明度
         * @type {number}
         */
        opacity: 1,

        /**
         * 破折线
         * @type {Array.<number>}
         */
        lineDash: null,

        /**
         * 破折线阴影偏移
         * @type {number}
         */
        lineDashOffset: 0,

        /**
         * 阴影模糊度
         * @type {number}
         */
        shadowBlur: 0,

        /**
         * 阴影横向偏移
         * @type {number}
         */
        shadowOffsetX: 0,

        /**
         * 阴影纵向偏移
         * @type {number}
         */
        shadowOffsetY: 0,

        /**
         * 描边宽度
         * @type {number}
         */
        lineWidth: 1,

        /**
         * 描边是否忽略 缩放
         * If stroke ignore scale
         * @type {Boolean}
         */
        strokeNoScale: false,

        // Bounding rect text configuration
        // Not affected by element transform
        /**
         * 图形的附加的文字
         * @type {string}
         */
        text: null,

        /**
         * 附加文字颜色
         * @type {string}
         */
        textFill: '#000',

        /**
         * 附加文字描边
         * @type {string}
         */
        textStroke: null,

        /**
         * 附加文字位置
         * 'inside', 'left', 'right', 'top', 'bottom'
         * [x, y]
         * @type {string|Array.<number>}
         * @default 'inside'
         */
        textPosition: 'inside',

        /**
         * 附加文字baseline top bottom middle, alphabetic, hanging, ideographic
         * @type {string}
         */
        textBaseline: null,

        /**
         * 附加文字水平对齐 start,end,left,right,center
         * @type {string}
         */
        textAlign: null,

        /**
         * 附加文字垂直对齐
         * @type {string}
         */
        textVerticalAlign: null,

        /**
         * 附加文字距离
         * @type {number}
         */
        textDistance: 5,

        /**
         *  附加文字 阴影模糊值
         * @type {number}
         */
        textShadowBlur: 0,

        /**
         * 附加文字 阴影横向偏移值
         * @type {number}
         */
        textShadowOffsetX: 0,

        /**
         * 附加文字 阴影纵向偏移值
         * @type {number}
         */
        textShadowOffsetY: 0,

        /**
         * @param {CanvasRenderingContext2D} ctx
         */
        bind: function (ctx, el) {
            var fill = this.fill;
            var stroke = this.stroke;
            for (var i = 0; i < STYLE_LIST_COMMON.length; i++) {
                var styleName = STYLE_LIST_COMMON[i];

                if (this[styleName] != null) {
                    ctx[styleName] = this[styleName];
                }
            }
            if (stroke != null) {
                var lineWidth = this.lineWidth;
                ctx.lineWidth = lineWidth / (
                    (this.strokeNoScale && el && el.getLineScale) ? el.getLineScale() : 1
                );
            }
            if (fill != null) {
                 // Use canvas gradient if has
                ctx.fillStyle = fill.canvasGradient ? fill.canvasGradient : fill;
            }
            if (stroke != null) {
                 // Use canvas gradient if has
                ctx.strokeStyle = stroke.canvasGradient ? stroke.canvasGradient : stroke;
            }
            this.opacity != null && (ctx.globalAlpha = this.opacity);
        },

        /**
         * Extend from other style
         * @param {zrender/graphic/Style} otherStyle
         * @param {boolean} overwrite
         */
        extendFrom: function (otherStyle, overwrite) {
            if (otherStyle) {
                var target = this;
                for (var name in otherStyle) {
                    if (otherStyle.hasOwnProperty(name)
                        && (overwrite || ! target.hasOwnProperty(name))
                    ) {
                        target[name] = otherStyle[name];
                    }
                }
            }
        },

        /**
         * Batch setting style with a given object
         * @param {Object|string} obj
         * @param {*} [obj]
         */
        set: function (obj, value) {
            if (typeof obj === 'string') {
                this[obj] = value;
            }
            else {
                this.extendFrom(obj, true);
            }
        },

        /**
         * Clone
         * @return {zrender/graphic/Style} [description]
         */
        clone: function () {
            var newStyle = new this.constructor();
            newStyle.extendFrom(this, true);
            return newStyle;
        }
    };

    var styleProto = Style.prototype;
    var name;
    var i;
    for (i = 0; i < STYLE_LIST_COMMON.length; i++) {
        name = STYLE_LIST_COMMON[i];
        if (!(name in styleProto)) {
            styleProto[name] = null;
        }
    }

    return Style;
});