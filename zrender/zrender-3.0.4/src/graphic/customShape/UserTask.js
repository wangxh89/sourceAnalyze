/**
 * UserTask element
 * @module zrender/graphic/UserTask
 */


define(function (require) {
    
    var Displayable = require('graphic/Displayable');
    var BoundingRect = require('../../core/BoundingRect');
    var zrUtil = require('../../core/util');
    var roundRectHelper = require('../helper/roundRect');
    var LRU = require('../../core/LRU');
    var globalImageCache = new LRU(50);
    /**
     * @alias zrender/graphic/UserTask
     * @extends module:zrender/graphic/Displayable
     * @constructor
     * @param {Object} opts
     */
    var UserTask = function (opts) {
        //默认样式
        var defaultOpts={
        position:[0,0],
        shape:{
            x:0,
            y:0,
            imgx:10,
            imgy:10,
            textx:50,
            texty:50,
            r:10,
            width:100,
            height:80,
        },
        style:{
            //边框
            stroke:'black',
            //字颜色
            fill:'black',
            image:'img/user.png',
            text:'Task',
        },
        draggable:false
        };
        //继承用户样式
        zrUtil.merge(defaultOpts,opts,true);
        Displayable.call(this, defaultOpts);
    };
    UserTask.prototype = {
        constructor: UserTask,
        type: 'UserTask',
        brush: function (ctx) {
            ctx.strokeStyle=this.style.stroke;
            ctx.fillStyle=this.style.fill;
            var style = this.style;
            var src = style.image;
            var shape=this.shape;
            /*var rectShape={
                x:shape.rectx,
                y:shape.recty,
                r:shape.r,
                width:shape.width,
                height:shape.height
            };*/
            function drawRoundRect (ctx, shape) {
            var x = shape.x;
            var y = shape.y;
            var width = shape.width;
            var height = shape.height;
            var r = shape.r;
            var r1;
            var r2;
            var r3;
            var r4;
            // Convert width and height to positive for better borderRadius
            if (width < 0) {
                x = x + width;
                width = -width;
            }
            if (height < 0) {
                y = y + height;
                height = -height;
            }

            if (typeof r === 'number') {
                r1 = r2 = r3 = r4 = r;
            }
            else if (r instanceof Array) {
                if (r.length === 1) {
                    r1 = r2 = r3 = r4 = r[0];
                }
                else if (r.length === 2) {
                    r1 = r3 = r[0];
                    r2 = r4 = r[1];
                }
                else if (r.length === 3) {
                    r1 = r[0];
                    r2 = r4 = r[1];
                    r3 = r[2];
                }
                else {
                    r1 = r[0];
                    r2 = r[1];
                    r3 = r[2];
                    r4 = r[3];
                }
            }
            else {
                r1 = r2 = r3 = r4 = 0;
            }

            var total;
            if (r1 + r2 > width) {
                total = r1 + r2;
                r1 *= width / total;
                r2 *= width / total;
            }
            if (r3 + r4 > width) {
                total = r3 + r4;
                r3 *= width / total;
                r4 *= width / total;
            }
            if (r2 + r3 > height) {
                total = r2 + r3;
                r2 *= height / total;
                r3 *= height / total;
            }
            if (r1 + r4 > height) {
                total = r1 + r4;
                r1 *= height / total;
                r4 *= height / total;
            }
            ctx.moveTo(x + r1, y);
            ctx.lineTo(x + width - r2, y);
            r2 !== 0 && ctx.quadraticCurveTo(
                x + width, y, x + width, y + r2
            );
            ctx.lineTo(x + width, y + height - r3);
            r3 !== 0 && ctx.quadraticCurveTo(
                x + width, y + height, x + width - r3, y + height
            );
            ctx.lineTo(x + r4, y + height);
            r4 !== 0 && ctx.quadraticCurveTo(
                x, y + height, x, y + height - r4
            );
            ctx.lineTo(x, y + r1);
            r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
            }
           
            //开始图片绘制
            var image;
            // style.image is a url string
            if (typeof src === 'string') {
                image = this._image;
            }
            // style.image is an HTMLImageElement or HTMLCanvasElement or Canvas
            else {
                image = src;
            }
            // FIXME Case create many images with src
            if (!image && src) {
                // Try get from global image cache
                var cachedImgObj = globalImageCache.get(src);
                if (!cachedImgObj) {
                    // Create a new image
                    image = new Image();
                    image.onload = function () {
                    image.onload = null;
                     for (var i = 0; i < cachedImgObj.pending.length; i++) {
                            cachedImgObj.pending[i].dirty();
                        }
                    };
                    cachedImgObj = {
                        image: image,
                        pending: [this]
                    };
                    image.src = src;
                    globalImageCache.put(src, cachedImgObj);
                    this._image = image;
                    return;
                }
                else {
                    image = cachedImgObj.image;
                    this._image = image;
                    // Image is not complete finish, add to pending list
                    if (!image.width || !image.height) {
                        cachedImgObj.pending.push(this);
                        return;
                    }
                }
            }

                if (image) {
                // 图片已经加载完成
                // if (image.nodeName.toUpperCase() == 'IMG') {
                //     if (!image.complete) {
                //         return;
                //     }
                // }
                // Else is canvas

                var imgwidth = shape.imgwidth || image.width;
                var imgheight = shape.imgheight || image.height;
                var imgx = shape.imgx || 0;
                var imgy = shape.imgy || 0;
                // 图片加载失败
                if (!image.width || !image.height) {
                    return;
                }

                ctx.save();

                style.bind(ctx);

                // 设置transform
                this.setTransform(ctx);

                if (style.r) {
                    // Border radius clipping
                    // FIXME
                    ctx.beginPath();
                    roundRectHelper.buildPath(ctx, style);
                    ctx.clip();
                }

                if (style.sWidth && style.sHeight) {
                    var sx = style.sx || 0;
                    var sy = style.sy || 0;
                    ctx.drawImage(
                        image,
                        sx, sy, style.sWidth, style.sHeight,
                        imgx, imgy, imgwidth, imgheight
                    );
                }
                else if (style.sx && style.sy) {
                    var sx = style.sx;
                    var sy = style.sy;
                    var sWidth = imgwidth - sx;
                    var sHeight = imgheight - sy;
                    ctx.drawImage(
                        image,
                        sx, sy, sWidth, sHeight,
                        imgx, imgy, imgwidth, imgheight
                    );
                }
                else {
                    ctx.drawImage(image, imgx, imgy, imgwidth, imgheight);
                }      
                ctx.beginPath();
                drawRoundRect(ctx,shape);
                ctx.stroke();
                ctx.closePath();
                ctx.fillText(style.text,shape.textx,shape.texty);
                //ctx.drawImage(image, imgx, imgy, imgwidth, imgheight);
                ctx.restore();
            }
        },
        getBoundingRect: function () {
            var style = this.style;
            if (! this._rect) {
                this._rect = new BoundingRect(
                    style.x || 0, style.y || 0, style.width || 0, style.height || 0
                );
            }
            return this._rect;
        }
    };
    zrUtil.inherits(UserTask, Displayable);
    return UserTask;
});