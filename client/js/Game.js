Engine.start(1024, 768, "cnv");

let enemies = [], score = 0;

let enemy_ai = (node) => {
    node.move(Engine.vector2(0, -0.1))
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

for(let j = 0; j < 7; j++){
    for(let i = 0; i < 16; i++){
        enemies.push(Engine.create_node({position : Engine.vector2(30 + (20 + 42) * i, 20 + (20 + 40) * j), size : Engine.vector2(40, 40), color: "#ff6d5a", code: enemy_ai}));
    }
}

let fire = (position) => {
    if(Engine.get_timer() > 20){
        Engine.create_node({position : Engine.vector2(position.x+20, position.y), size : Engine.vector2(10, 20), color: "#1aff00", code: bullet_ai});
        Engine.clear_timer();
    }
}

Engine.create_node({position : Engine.vector2(1024/2-25, 768-50-30), size : Engine.vector2(50, 50), color: "#64c858", code: (node) => {
    if(Engine.key('KeyA'))
        node.move(Engine.vector2(1, 0))
    if(Engine.key('KeyD'))
        node.move(Engine.vector2(-1, 0))
    node.position.x++;
    if(Engine.key('Space'))
        fire(node.position);
}});
Engine.set_draw((s) => {
    s.draw_text(1024/2-60, 15, '#8cff00', 'Игровой счет: '+score);
    s.draw_text(1024/2-40, 35, '#ff0000', 'Врагов: '+enemies.length);
});

