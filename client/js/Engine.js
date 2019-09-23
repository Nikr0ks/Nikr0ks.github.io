const Engine = new function() {
    let Engine = this,
        cnv, ctx, width, height, size, canvas_offset, box, nodes = [], for_destroy = {}, node_count = 0, down_keys = {}, timer = 0, user_draw;
    let $ = (id) => {
        return document.getElementById(id)
    };

    Engine.start = (W, H, cnvid) => {
        if(typeof cnvid !== 'object')
            cnv = $(cnvid);
        else cnv = cnvid;

        box = cnv.getBoundingClientRect();
        canvas_offset = vector2(box.left, box.top);
        size = vector2(box.widht, box.height);

        ctx = cnv.getContext('2d');
        width = W;
        height = H;
        cnv.width = width;
        cnv.height = height;
        ctx.textBaseLine = 'top';
        ctx.font = '20px Troika';
        window.addEventListener('keydown', (e) => {
            down_keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            delete down_keys[e.code];
        });
        Engine.update();
    };

    let rect = (x, y, w, h, clr) => {
        ctx.fillStyle = clr;
        ctx.fillRect(x, y, w, h);
    };

    let text = (x, y, clr, _text) => {
        ctx.fillStyle = clr;
        ctx.fillText(_text, x, y);
    };

    class Node {
        constructor (p){
            this.id = node_count++;
            this.position = p.position;
            this.size = p.size;
            this.clr = p.color;
            this.update = p.code;
            nodes.push(this);
        }
        _update(){
            if(this.update)
                this.update(this);
        }

        draw(){
            rect(this.position.x, this.position.y, this.size.x, this.size.y, this.clr);
        }
        destroy(){
            for_destroy[this.id] = this;
        }
        move(p) {
            this.position.minus(p);
        }
        intersect (node) {
            return !(
                this.position.x+this.size.x < node.position.x || 
                this.position.y+this.size.y < node.position.y || 
                this.position.x > node.position.x+node.size.x ||
                this.position.y > node.position.y+node.size.y);
        }
    }

    Engine.create_node = (p) => {
        return new Node(p);
    };

    Engine.draw_text = (x, y, clr, _text) => {
        text(x, y, clr, _text);
    };

    Engine.update = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = nodes.length-1; i >=  0; i--){
            if(for_destroy[nodes[i].id]){
                nodes.splice(i, 1);
                continue;
            }
            nodes[i]._update();
            nodes[i].draw();
        }
        if(user_draw){
            user_draw(Engine);
        }
        requestAnimationFrame(Engine.update);
        timer++;
    };

    Engine.key = (key) => {
        return down_keys[key];
    };

    Engine.clear_timer = () => {
        timer = 0;
    };

    Engine.get_timer = () => {
        return timer;
    };

    Engine.set_draw = (f) => {
        user_draw = f;
    };

    class Vector2 {
        constructor (x, y){
            this.x = x || 0;
            this.y = y || 0; 
        }

        plus (p){
           this.x += p.x;
           this.y += p.y; 
        }
        minus (p){
            this.x -= p.x;
            this.y -= p.y; 
         }
    }
    var vector2 = this.vector2 = function(x, y){
        return new Vector2(x, y)
    };

    window.NikroksEngineGlobal = Engine;
};