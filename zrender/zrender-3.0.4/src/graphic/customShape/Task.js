/**
 * task
 * @module zrender/graphic/shape/Task
 */


define(function (require) {
    var roundRectHelper = require('../helper/roundRect');
    var Text=require('../Text');
    return require('../Path').extend({
        type: 'task',
        shape: {
            // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
            // r缩写为1         相当于 [1, 1, 1, 1]
            // r缩写为[1]       相当于 [1, 1, 1, 1]
            // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
            // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
            r: 10,
            x: 0,
            y: 0,
            width: 100,
            height: 60,
            image:0,
            text:'Text'    
        },
        style:{
        	//要透明才看见头像,目前样式固定的
			fill:'rgba(255,255,255,0.01)',
			stroke:'#1c1c1c',
			//text写在style里会直接显示,但不好设置位置样式,所以写在shape里     
		},
		draggable:true,

            buildPath: function (ctx, shape) {
            var x = shape.x;
            var y = shape.y;
            var width = shape.width;
            var height = shape.height;
            if (!shape.r) {
                ctx.rect(x, y, width, height);
            }
            else {
                roundRectHelper.buildPath(ctx, shape);
            }
            var img=new Image();
            img.src=shape.image;
            if (img.complete) {
                ctx._ctx&&ctx._ctx.drawImage(img,10,10);
            } else {
                img.onload = function() {
                    //头像的位置固定
                    ctx._ctx&&ctx._ctx.drawImage(img,10,10);
                }                
            }

            //字的位置和最大长度也是固定的
            ctx._ctx&&ctx._ctx.strokeText(shape.text,50,40,50);
            ctx.closePath();
            return;
        }
    });
});
