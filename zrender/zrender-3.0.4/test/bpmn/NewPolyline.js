require.config({
baseUrl:'../../src',
});

define(function (require) {
	var Polyline=require('graphic/shape/Polyline');
    var Circle=require('graphic/shape/Circle');
    var Group=require('container/Group');
    var Rect=require('graphic/shape/Rect');
    var zrender=require('zrender');
   //var newPolyline=require('graphic/shape/NewPolyline');
    var Task=require('graphic/customShape/UserTask');
    var Polyline=require('graphic/shape/Polyline');
    var Circle=require('graphic/shape/Circle');
    var task=new Task({
       position:[200,200],
       style:{
        text:'sdfaaaaa',
       },
        draggable:true,
    });
    var newPolyline=function(dom,zr,group){
        //每次重绘边框时,清空group,防止重复边框
        group.removeAll();
        var px=dom.position[0];
        var py=dom.position[1];
        var dx=dom.shape.x;
        var dy=dom.shape.y;
        var dw=dom.shape.width;
        var dh=dom.shape.height;
        //设置虚线框与实体间距,也是圆与虚线框顶点的x,y间距
        var gap=5;
        //矩形最小长和宽
        var widthMin=100;
        var heightMin=60;
        //矩形的约数,即拖动后长宽是10的倍数
        var divisor=10;
        //折线的点
        var points=[];
        points[0]=[dx+px-gap,dy+py-gap];
        points[1]=[dx+px+dw+gap,dy+py-gap];
        points[2]=[dx+px+dw+gap,dy+py+dh+gap];
        points[3]=[dx+px-gap,dy+py+dh+gap];
        points[4]=[dx+px-gap,dy+py-gap];
        var circle1=new Circle({
            position:[dx+px-gap-gap,dy+py-gap-gap],
            shape:{
                r:4 
            },
            draggable:true
        });
        var circle2=new Circle({
            position:[dx+px+dw+gap+gap,dy+py+dh+gap+gap],
            shape:{
                r:4 
            },
            draggable:true
        });
        var polyline=new Polyline({
           shape:{
            points:points
           },
           style:{
            lineDash:[2],
           },
        });
        
        circle1.on('drag',function(e){
            //2个圆间距太小时,不在拖动
            if(circle2.position[0]-this.position[0]<(widthMin+gap*4)){
                this.position[0]=circle2.position[0]-(widthMin+gap*4);
            }
            if(circle2.position[1]-this.position[1]<(heightMin+gap*4)){
                this.position[1]=circle2.position[1]-(heightMin+gap*4);
            }
            points[0]=[this.position[0]+gap,this.position[1]+gap];
            points[1][1]=this.position[1]+gap;
            points[3][0]=this.position[0]+gap;
            points[4]=points[0];
            polyline.attr('shape',{points:points});
        });
        circle2.on('drag',function(e){
            //2个圆间距太小时,不在拖动
            if(this.position[0]-circle1.position[0]<(widthMin+gap*4)){
                this.position[0]=circle1.position[0]+(widthMin+gap*4);
            }
            if(this.position[1]-circle1.position[1]<(heightMin+gap*4)){
                this.position[1]=circle1.position[1]+(heightMin+gap*4);
            }
            points[1][0]=this.position[0]-gap;
            points[2]=[this.position[0]-gap,this.position[1]-gap];
            points[3][1]=this.position[1]-gap;
            polyline.attr('shape',{points:points});
        });
        circle1.on('dragend',function(e){
            //设置长宽为divisor的倍数
            var width=points[1][0]-points[0][0]-gap*2;
            var height=points[3][1]-points[0][1]-gap*2;
            width=Math.round(width/divisor)*divisor;
            height=Math.round(height/divisor)*divisor;
            //拖动结束,绘制task,改变position   x,y置零
            dom.attr('position',[points[0][0]+gap,points[0][1]+gap]);
            dom.attr('shape',{
                x:0,
                y:0,
                r:10,
                width:width,
                height:height,
                imgx:10,//固定值
                imgy:10,
                textx:(points[1][0]-points[0][0]-gap*2)/2,//非固定,矩形中间
                texty:(points[3][1]-points[0][1]-gap*2)/2//非固定,矩形中间
            }); 
           //缩放结束,zr中删除group
           zr.remove(group);
        });
        circle2.on('dragend',function(e){
             //设置长宽为divisor的倍数
            var width=points[1][0]-points[0][0]-gap*2;
            var height=points[3][1]-points[0][1]-gap*2;
            width=Math.round(width/divisor)*divisor;
            height=Math.round(height/divisor)*divisor;
            dom.attr('position',[points[0][0]+gap,points[0][1]+gap]);
            dom.attr('shape',{
                x:0,
                y:0,
                r:10,
                width:width,
                height:height,
                imgx:10,//固定值,距离矩形边框值
                imgy:10,
                textx:(points[1][0]-points[0][0]-gap*2)/2,//非固定,矩形中间
                texty:(points[3][1]-points[0][1]-gap*2)/2//非固定,矩形中间
            });
           zr.remove(group);
        });
        group.add(circle1);
        group.add(circle2);
        group.add(polyline);
        zr.add(group);
        }



        
    // var newPolyline=function(dom,zr){
    //      //positionx
    //     var px=dom.position[0];
    //     var py=dom.position[1];
    //     var dx=dom.shape.x;
    //     var dy=dom.shape.y;
    //     var dw=dom.shape.width;
    //     var dh=dom.shape.height;
    //     //设置虚线框与实体间距,也是圆与虚线框顶点的x,y间距
    //     var gap=5;
    //     var points=[];
    //     points[0]=[dx+px-gap,dy+py-gap];
    //     points[1]=[dx+px+dw+gap,dy+py-gap];
    //     points[2]=[dx+px+dw+gap,dy+py+dh+gap];
    //     points[3]=[dx+px-gap,dy+py+dh+gap];
    //     points[4]=[dx+px-gap,dy+py-gap];
    //     var circle1=new Circle({
    //         position:[dx+px-gap-gap,dy+py-gap-gap],
    //         shape:{
    //             r:4 
    //         },
    //         draggable:true
    //     });
    //     var circle2=new Circle({
    //         position:[dx+px+dw+gap+gap,dy+py+dh+gap+gap],
    //         shape:{
    //             r:4 
    //         },
    //         draggable:true
    //     });
    //     var polyline=new Polyline({
    //        shape:{
    //         points:points
    //        },
    //        style:{
    //         lineDash:[2],
    //        },
    //     });
        
    //     circle1.on('drag',function(e){
    //         points[0]=[this.position[0]+gap,this.position[1]+gap];
    //         points[1][1]=this.position[1]+gap;
    //         points[3][0]=this.position[0]+gap;
    //         points[4]=points[0];
    //         polyline.attr('shape',{points:points});
    //     });
    //     circle2.on('drag',function(e){
    //         points[1][0]=this.position[0]-gap;
    //         points[2]=[this.position[0]-gap,this.position[1]-gap];
    //         points[3][1]=this.position[1]-gap;
    //         polyline.attr('shape',{points:points});
    //     });
    //     circle1.on('dragend',function(e){
    //         //拖动结束,绘制task,改变position   x,y置零
    //         dom.attr('position',[points[0][0]+gap,points[0][1]+gap]);
    //         dom.attr('shape',{
    //             x:0,
    //             y:0,
    //             r:10,
    //             width:points[1][0]-points[0][0]-gap*2,
    //             height:points[3][1]-points[0][1]-gap*2,
    //             imgx:10,//固定值
    //             imgy:10,
    //             textx:(points[1][0]-points[0][0]-gap*2)/2,//非固定,矩形中间
    //             texty:(points[3][1]-points[0][1]-gap*2)/2+10//非固定,矩形中间+10
    //         });
           
    //         //删除虚线和圆
    //         zr.remove(circle1);
    //         zr.remove(circle2);
    //         zr.remove(polyline);
    //     });
    //     circle2.on('dragend',function(e){
    //         dom.attr('position',[points[0][0]+gap,points[0][1]+gap]);
    //         dom.attr('shape',{
    //             x:0,
    //             y:0,
    //             r:10,
    //             width:points[1][0]-points[0][0]-gap*2,
    //             height:points[3][1]-points[0][1]-gap*2,
    //             imgx:10,//固定值,距离矩形边框值
    //             imgy:10,
    //             textx:(points[1][0]-points[0][0]-gap*2)/2,//非固定,矩形中间
    //             texty:(points[3][1]-points[0][1]-gap*2)/2//非固定,矩形中间
    //         });
    //         zr.remove(circle1);
    //         zr.remove(circle2);
    //         zr.remove(polyline);
    //     });
    //     zr.add(circle1);
    //     zr.add(circle2);
    //     zr.add(polyline);
    //     }
    //return newPolyline;
    //
        //console.log(task);
    var zr = zrender.init(document.getElementById("div_bpmn_editor"));
    //建个新group,传入newPolyline
    var group=new Group();
    zr.on('click',function(e){
       newPolyline(task,zr,group);
    });
    
    zr.add(task); 
})