/**
 * 圆弧
 * @module zrender/graphic/shape/Arc
 */
 define(function (require) {

    return require('../Path').extend({

        type: 'arc',

        shape: {

            cx: 0,

            cy: 0,   //圆心位置

            r: 0,   //半径

            startAngle: 0,  //开始角度

            endAngle: Math.PI * 2,  //默认整个圆

            clockwise: true    //默认是顺时针
        },

        style: {

            stroke: '#000',

            fill: null
        },

        buildPath: function (ctx, shape) {

            var x = shape.cx;
            var y = shape.cy;
            var r = Math.max(shape.r, 0);
            var startAngle = shape.startAngle;
            var endAngle = shape.endAngle;
            var clockwise = shape.clockwise;

            var unitX = Math.cos(startAngle);
            var unitY = Math.sin(startAngle);

            ctx.moveTo(unitX * r + x, unitY * r + y);
            ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
        }
    });
});