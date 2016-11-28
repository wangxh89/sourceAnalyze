requirejs.config({
baseUrl:'../zrender/src',
});

define(function(require){
	var zrender=require('zrender');
	var Task=require('graphic/shape/Task');
	var task=new Task({
		shape:{
			//img位置是相对此js文件的路径
			image:'../img/avatar.jpg',
		}

		/*position:[100,100],
		shape:{
			width:200,
			height:100,
			text:'11111111111',
			image:'../img/avatar.jpg',
		},
		style:{
			fill:'rgba(200,200,200,0.6)',
			stroke:'#666666'
		}*/
	});
	var zr = zrender.init(document.getElementById("main"));
	zr.add(task);

})