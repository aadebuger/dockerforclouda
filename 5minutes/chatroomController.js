App.chatroom = sumeru.controller.create(function(env, session){
	
	var getMsgs = function(){
		session.chatMessages = env.subscribe('pub-chatRoom', function(msgCollection){
          	session.bind('chatroom_container', {
              		data    :   msgCollection.find(),
          	});
		});
	};
	
	//onready is respond for event binding and data manipulate
	env.onready = function(){
        session.event('chatroom_container', function(){
            document.getElementById("messages").style.height = document.body.clientHeight - 80 + "px";
            document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
        });
	   window.onresize = function(){
	   		document.getElementById("messages").style.height = document.body.clientHeight - 80 + "px";
			document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
	   };
	    
	    session.eventMap('#inputMessage', {
            'keydown' : function(e){
                if(e.keyCode == 13){
                    sendMessage();
                }   
            }
    	});
    	 	
        //send message
        document.getElementById("send").addEventListener('click',sendMessage);
	};
	
	var sendMessage = function(){
		var input = document.getElementById('inputMessage'),
	        inputVal = input.value.trim();
	        
	    var inputName = document.getElementById('inputName'),
	        inputValName = inputName.value.trim();
	
	  	if (inputVal == '' || inputValName == '') {
	  		
	  		alert("xxxx");
	  		return false; 
	  	};
	  
session.chatMessages.add({
		  	username: inputValName,
		  	message : inputVal, 
		  	time : (new Date()).valueOf()  
	  	});
	
	  	session.chatMessages.save();	
	  	
	  	
	  	input.value = '';
	  	input.focus();	  	      
	};	
	
	//onload is respond for handle all data subscription
	env.onload = function(){            
		return [getMsgs];            
	};
	
	//sceneRender is respond for handle view render and transition
	env.onrender = function(doRender){
		doRender('chatroom', ['push', 'left']);
	};
	
	
});
sumeru.router.add(
		{
			pattern: '/chatroom',
			action: 'App.chatroom'
		}
	);
sumeru.router.setDefault('App.chatroom');
