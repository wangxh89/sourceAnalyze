require.config({
baseUrl:'../../src',
});

define(function(require){
	var zrender=require('zrender');
	var Group=require('container/Group');
	var Image=require('graphic/Image');
	var zr = zrender.init(document.getElementById("main"));
	var Rect=require('graphic/shape/Rect');
	var Text =require("graphic/Text");
	var text=new Text({
		position:[70,40],
		style:{
			text:'Text',
		},
		//draggable:true
	})
	var img=new Image({
		position:[10,10],
		style:{
			image:'img/user.png',
		},
		//draggable:true,
	});
	var group=new Group({
		position:[100,100],
		draggable:true
	});
	var roundRect=new Rect({
		position:[0,0],
		shape:{
			width:100,
			height:60,
			r:10
		},
		style:{
			fill:'rgba(255,255,255,1)',
			stroke:'#acaccc'
		},
		//draggable:true,
	});


 


	group.add(roundRect);
	group.add(img);
	group.add(text);
	zr.add(group);
	
})