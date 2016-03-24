/**
 * 多边形
 * @module zrender/shape/Polygon
 */
define(function (require) {

    var polyHelper = require('../helper/poly');

    return require('../Path').extend({
        
        type: 'polygon',

        shape: {
            points: null,  //数组 [[310,120],[350,210],[334,3443]]

            smooth: false,   

            smoothConstraint: null
        },

        buildPath: function (ctx, shape) {
            polyHelper.buildPath(ctx, shape, true);
        }
    });
});