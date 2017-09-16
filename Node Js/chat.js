var express = require('express');
var app = express();
var port = 8011;
var io = require('socket.io').listen(app.listen(port));
var room = ['admin','user'];
var users = [];
app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
});
console.log("Listening on port " + port);
io.sockets.on('connection', function(socket){
    socket.on('disconnect', function(){ });
	//var sessionID = socket.id;
	console.log('client: ' + socket.id);
	//join room
	socket.on('join-room',function(obj){
		var userId = obj.userId;
		console.log(userId);
		if(obj.isAdmin){
			console.log('join room admin');
			socket.join('admin');
		}
		else{
			console.log('join room user:' + userId);
			socket.join('user');
			var existUser = false;
			for(var i = 0;i< users.length ;i++){
				if(users[i].id === userId){
					existUser = true;
					users[i].sessionId = socket.id;
					console.log('user exist ' + userId);
					break;
				}
			}
			if(!existUser){
				console.log('add user to list');
				var user = {};
				user.id = userId;
				user.sessionId = socket.id;
				//add user to aray
				users.push(user);
			}
		}
	});
	
	//send notify to admin
    socket.on('send-to-admin', function(obj){
		console.log('send notify to admin');
		io.to('admin').emit('show-notify', obj);
	});
	
	//send request call notify to group user 
    socket.on('request-call-notify-all-user', function(){
		console.log('request call notify all user');
		io.to('user').emit('refresh-notify');
	});
	
	//send request call notify to specific user 
    socket.on('request-call-notify-specific-user', function(obj){
		console.log('request call notify  user :'+ obj.userId);
		var sessionId = null;
		for(var i = 0;i< users.length ;i++){
			if(users[i].id === obj.userId){
				existUser = true;
				sessionId = users[i].sessionId;
				break;
			}
		}
		console.log('send notify to userid:'+obj.userId);
		console.log('send notify to user:'+sessionId);
		io.to(sessionId).emit('refresh-notify-specific');
	});
	
	
	//send notify to user
    socket.on('send-to-user', function(obj){
		var sessionId = null;
		for(var i = 0;i< users.length ;i++){
			if(users[i].id === obj.userId){
				existUser = true;
				sessionId = users[i].sessionId;
				break;
			}
		}
		console.log('send notify to userid:'+obj.userId);
		console.log('send notify to user:'+sessionId);
		io.to(sessionId).emit('show-notify', obj);
	});
	
//Chat applycation start  
	
	//send notify to admin
    socket.on('send-message-to-admin', function(obj){
		console.log('send message to admin');
		io.to('admin').emit('show-message', obj);
	});
	
	//send notify to user
    socket.on('send-message-to-user', function(obj){
		console.log('send message to user');
		var sessionId = null;
		for(var i = 0;i< users.length ;i++){
			if(users[i].id === obj.ReceiveId){
				sessionId = users[i].sessionId;
				break;
			}
		}
		console.log(sessionId);
		io.to(sessionId).emit('show-message', obj);
		//socket.to('admin').emit('show-message', obj);
	});

//notify applycation start 	
    //send notify to user
    socket.on('send-notify-to-user', function(obj){
		console.log('send notify to user');
		var sessionId = null;
		for(var i = 0;i< users.length ;i++){
			if(users[i].id === obj.ReceiveId){
				sessionId = users[i].sessionId;
				break;
			}
		}
		console.log(sessionId);
		io.to(sessionId).emit('show-notify', obj);
		//socket.to('admin').emit('show-message', obj);
	});
});