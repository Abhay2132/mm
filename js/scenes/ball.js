import {Container,Graphics} from "pixi.js"
import {log} from "../utilz.js";
import {Bodies} from "matter-js";

export default class circle extends Container {
	constructor(x,y,r,o={}){
		super()
		o = this.normalize(o);
		this.o = o;
		this.x = x; this.y = y; this.r =r;
		let circle = new Graphics();
		circle.beginFill(o.clr);
		circle.drawCircle(0,0,r);
		circle.endFill();
		
		let line = new Graphics();
		line.beginFill(0x000000)
		.drawRect(-0.5, -r, 1,r)
		.endFill()
		
		this.addChild(circle);
		this.addChild(line);
		
		this.circle = circle;
		log(o.kill.toString())
		this.body = Bodies.circle(x,y,r, o.bo)
		
		//setTimeout(() => o.kill(this) , 3000);
	}
	
	update(dt) {
		if(this.body.position.y < -2*this.r || this.body.position.y > 2*this.r+window.innerHeight) return this.o.kill(this);
		if(this.body.position.x < -2*this.r  || this.body.position.x > 2*this.r+window.innerWidth) return this.o.kill(this);
		this.rotation = this.body.angle
		/*
		this.x = this.body.position.x;
		this.y = this.body.position.y;
		*/
		this.position.set(this.body.position.x, this.body.position.y)
	}
	
	kill() {
		this.o.kill(this);
	}
	
	normalize(opt={}){
		if(!opt.clr) opt.clr = 0x00aa00
		if(!opt.bo) opt.bo = {};
		if(!opt.uid) opt.uid = Math.random().toString(34).slice(2);
		if(!opt.kill) opt.kill = () => console.log("Killed " + opt.id);
		return opt
	}
}