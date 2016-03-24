/**
 * shape类：icon
 * @module zrender/graphic/shape/Icon
 */
define(function (require) {
    return require('../Path').extend({

        type: 'icon',

        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            iconType: "arrow"
        },

        style: {
            stroke: '#000',
            fill: ""
        },
        

        buildPath: function (ctx, shape) {
            var  iconLibrary = {arrow : this._iconArrow};
            if (iconLibrary[shape.iconType]) {
                iconLibrary[shape.iconType].call(this, ctx, shape);
            }
            else {
                ctx.moveTo(shape.x, shape.y);
                ctx.lineTo(shape.x + shape.width, shape.y);
                ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
                ctx.lineTo(shape.x, shape.y + shape.height);
                ctx.lineTo(shape.x, shape.y);
                ctx.closePath();
            }

            return;
        },

        _iconArrow : function (ctx, shape) {
            var x = shape.x;
            var y = shape.y;
            var dx = shape.width / 16;
            ctx.moveTo(x + 8 * dx,  y);
            ctx.lineTo(x + dx,      y + shape.height);
            ctx.lineTo(x + 8 * dx,  y + shape.height / 4 * 3);
            ctx.lineTo(x + 15 * dx, y + shape.height);
            ctx.lineTo(x + 8 * dx,  y);
            ctx.closePath();
        }        
    });
});
