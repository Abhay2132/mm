import {Body,Events, Engine, Composite,Bodies} from "matter-js"
import {Application, Container} from "pixi.js";
import {rand, randClr,pi,log,getLogger, config, $} from "../utilz.js";
import Box from "./box.js";
import Ball from "./ball.js";

let ih,iw;
function resize() {
	ih = window.innerHeight;
	iw = window.innerWidth;
	document.documentElement.style.setProperty("--ih", ih+"px");
	document.documentElement.style.setProperty("--iw", iw+"px");
	if(window.app) app.resize();
}
resize();

export default function game() {

var engine;

const root = new Container ();
window.app = new Application(config);
app.renderer.background.alpha = 0;
window.onresize = resize;
$("#game").appendChild(app.view);
app.stage.addChild(root);
const clog = getLogger(root);

function kill (me){
	log("Killed", typeof me);
	boxes.delete(me.o.uid);
	Composite.remove(engine.world, [me.body])
	me.destroy();
}

let b1 = new Box(iw/2+20,100,80,80, {kill, bo: {friction: 0}});
let b2 = new Box(iw/2, 202,80,80, {clr: 0x990000,kill, bo: {friction: 0}});
let g = new Box(iw/2,ih*0.9, iw, ih*0.2, {kill,clr:0x037202,
	//onUpdate (me) {Body.setAngle(me.body, me.body.angle+2*Math.PI/180)},
	bo : {staticFriction: 0,restitution:1,friction: 0,angle: 0*Math.PI/180, isStatic: 1 }
});

const boxes = new Map([[b1.o.uid, b1],[b2.o.uid, b2],[g.o.uid, g]])
var lt = 0 // last Tick
const gameLoop = window.requestAnimationFrame(function tick(te){ // time Elapsed
	window.requestAnimationFrame(tick)
	let dt = te - lt;
	lt = te;
	engine && Engine.update(engine, dt);
	
	//let bxy = [];
	//for(let box of boxes.values())
		//bxy.push(`b${bxy.length+1} : ${parseInt(box.position.x)} ${parseInt(box.position.y)}`)
	if(a < 1){a=200; fps = parseInt(1000/dt)}
	clog(`fps : ${fps}`, 
		`shapes : ${boxes.size}`,
		// ...bxy
	)
	boxes.forEach(b => b.update(dt));
	a -= dt
	add(new Ball(iw/2, 0.1*ih, rand(4,10), {kill,
			clr: randClr(),
			bo : { restitution: 1}
		})
	)
})

let a = 0
let fps =0;
function spawnBox (e){
	log(e.touches)
	for(let i=0; i<e.touches.length;i++){ 
	let { clientX: x, clientY: y } = e.touches[i]
	let c = new Ball(x,y,rand(4,10), {clr: randClr(), kill,bo:{staticFriction: 0, friction  : 0,restitution:1}});
	add(c);
	}
}

function spawnBall(x,y,r=4) {
	
}

function add(...i){
	Composite.add(engine.world, i.map(a => a.body))
	i.forEach(a => {
		root.addChild(a)
		boxes.set(a.o.uid,a)
	});
}
app.view.addEventListener("touchstart", spawnBox);
app.view.addEventListener("touchmove", spawnBox);

engine = Engine.create();
//Composite.add(engine.world, [b1.body, b2.body, g.body])
add(b1,b2,g);
}