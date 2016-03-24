/**
 * shape类：icon
 * @module zrender/graphic/shape/Icon
 */
define(function (require) {
    var IconShape = require('./Icon');
    return require('../Path').extend({

        type: 'MarkLine',
         // * @property {number} xStart 起点x坐标
         // * @property {number} yStart 起点y坐标
         // * @property {number} xEnd 终止点x坐标
         // * @property {number} yEnd 终止点y坐标
        shape: {
            xStart: 0,
            yStart: 0,
            xEnd: 0,
            yEnd: 0,
            symbol: "arrow",
            symbolSize:[10,10]
        },

        style: {
            stroke: '#000',
            fill: ""
        },
        

        buildPath: function (ctx, shape) {
            ctx.moveTo(shape.xStart, shape.yStart);
            ctx.lineTo(shape.xEnd, shape.yEnd);
            this.brushSymbol(ctx,shape,0);
            this.brushSymbol(ctx,shape,1);

            return;
        },

        /**
         * 标线始末标注
         */
        brushSymbol : function (ctx, style, idx) {
            // symbolRotate
            var x0 = style.xStart;
            var y0 = style.yStart;
            var x2 = style.xEnd;
            var y2 = style.yEnd;
            var x = idx === 0 ? x0 : x2;
            var y = idx === 0 ? y0 : y2;

            if (style.symbol == 'arrow' ) {
                    var sign = idx === 0 ? -1 : 1; 
                    rotate = Math.PI / 2 + Math.atan2(
                        sign * (y2 - y0), sign * (x2 - x0)
                    );
            }
            var context = ctx.getContext();
            if( context) {
                context.translate(x, y);
                if (rotate !== 0) {
                    context.rotate(rotate);
                }                
            }
            



            // symbolSize
            var symbolSize = style.symbolSize[idx];
            IconShape.prototype.buildPath(ctx, {
                x: -symbolSize,
                y: -symbolSize,
                width: symbolSize * 2,
                height: symbolSize * 2,
                iconType: style.symbol
            });
        },        
    });
});
