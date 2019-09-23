const ws = new WebSocket('wss://35ffcf94.ngrok.io');

Engine.start(1024, 768, "cnv");

let bullet_ai = (node) => {
    node.move(Engine.vector2(0, 2))
    if(node.position.y+node.size.y < 0)
        node.destroy();
};

let fire = (position, i) => {
    if(Engine.get_timer() > 20){
        Engine.create_node({position : Engine.vector2(position.x+20, position.y), size : Engine.vector2(10, 20), color: "#1aff00", code: (node) => {
            if(i = 'up')
                node.move(Engine.vector2(0, 2))
            if(i = 'down')
                node.move(Engine.vector2(0, -2))
            if(node.position.y+node.size.y < 0)
                node.destroy();
        }});
        Engine.clear_timer();
    }
}

Engine.create_node({position : Engine.vector2(1024/2-25, 768-50-30), size : Engine.vector2(50, 50), color: "#64c858", code: (node) => {
    console.log("Player down X:" + node.position.x);
    if(Engine.key('KeyA')){
        ws.send(node.position.x);
        node.move(Engine.vector2(1, 0))
    }
       
    if(Engine.key('KeyD')){
        ws.send(node.position.x);
        node.move(Engine.vector2(-1, 0));
    }
    if(Engine.key('Space'))
        fire(node.position, up);
}});

Engine.create_node({position : Engine.vector2(1024/2-25, 768-50-30), size : Engine.vector2(50, 50), color: "#64c858", code: (node) => {
    console.log("Player up X:" + node.position.x);
    if(Engine.key('KeyA')){
        ws.send(node.position.x);
        node.move(Engine.vector2(1, 0))
    }
       
    if(Engine.key('KeyD')){
        ws.send(node.position.x);
        node.move(Engine.vector2(-1, 0));
    }
    if(Engine.key('Space'))
        fire(node.position, down);
}});

