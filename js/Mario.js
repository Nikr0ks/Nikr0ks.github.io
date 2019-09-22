Engine.start(640, 480, "cnv");

let enemies = [], score = 0;

let enemy_ai = (node) => {
    node.move(Engine.vector2(0, -0.3))
};

let bullet_ai = (node) => {
    node.move(Engine.vector2(0, 2))
    if(node.position.y+node.size.y < 0)
        node.destroy();
    
    for (let i = enemies.length - 1; i >= 0; i--) {
        if(node.intersect(enemies[i])){
            enemies[i].destroy();
            node.destroy();
            enemies.splice(i, 1);
            score++;
            break;
        }
    }
};

for(let j = 0; j < 3; j++){
    for(let i = 0; i < 10; i++){
        enemies.push(Engine.create_node({position : Engine.vector2(30 + (20 + 40) * i, 20 + (20 + 40) * j), size : Engine.vector2(40, 40), color: "#ff6d5a", code: enemy_ai}));
    }
}

let fire = (position) => {
    if(Engine.get_timer() > 20){
        Engine.create_node({position : Engine.vector2(position.x+20, position.y), size : Engine.vector2(10, 20), color: "#1aff00", code: bullet_ai});
        Engine.clear_timer();
    }
}

Engine.create_node({position : Engine.vector2(640/2-25, 480-50-30), size : Engine.vector2(50, 50), color: "#64c858", code: (node) => {
    if(Engine.key('KeyA'))
        node.move(Engine.vector2(1, 0))
    if(Engine.key('KeyD'))
        node.move(Engine.vector2(-1, 0))
    if(Engine.key('Space'))
        fire(node.position);
}});
Engine.set_draw((s) => {
    s.draw_text(640/2-60, 15, '#8cff00', 'Игровой счет: '+score);
});

