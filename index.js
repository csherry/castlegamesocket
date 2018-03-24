const port = process.env.PORT || 8001;
const server = require("http").Server();

var io = require("socket.io")(server);

var allusers =[];

io.on("connection", function(socket){
    console.log("connected");
    
    socket.on("joingame", function(data){
        console.log(data);
/*        socket.join(data);
        
        socket.myRoom = data;*/
//        socket.emit('yourid', socket.id);
        
/*        if(!allusers[data]){
            allusers[data] = [];
        }*/
        
        io.emit("userjoined", socket.id);
        
        
        allusers.push(socket.id);
        console.log(allusers);
        
        if(allusers.length === 1){
            io.emit("Wait", allusers);
        }else if(allusers.length === 2){
             io.emit("Start", allusers);
        }
    });
    
/*    socket.on("disconnect", function(){
        
    })*/
})
      
server.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("Game Port is runnning");
})