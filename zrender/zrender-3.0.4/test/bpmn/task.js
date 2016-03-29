require.config({
baseUrl:'../../src',
});

define(function(require){
	var zrender=require('zrender');

	var Task=require('graphic/customShape/Task');
	var zr = zrender.init(document.getElementById("div_bpmn_editor"));
	


	var userTask = new Task ({

		shape: {
			image: 'img/user.png'
		}
	});
 



	zr.add(userTask);
	
})