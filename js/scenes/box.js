import {Container,Graphics} from "pixi.js"
import {log} from "../utilz.js";
import {Bodies} from "matter-js";

export default class Box extends Container {
	constructor(x,y,w,h,o={}){
		super()
		o = this.normalize(o);
		this.o = o;
		this.x = x;
		this.y = y;
		this.h = h;this.w = w;
		let box = new Graphics();
		box.beginFill(o.clr);
		//box.drawRect(-w/2, -h/2, w,h);
		box.drawRect(-w/2, -h/2, w,h);
		box.endFill();
		this.addChild(box);
		this.box = box;
		//log(o.kill.toString())
		this.body = Bodies.rectangle(x, y, w,h, o.bo)
	}
	
	update(dt) {
		if(this.body.position.y < 0 || this.body.position.y > 100+window.innerHeight) return this.o.kill(this);
		this.rotation = this.body.angle
		this.x = this.body.position.x// + this.w/2;
		this.y = this.body.position.y// + this.h/2;
		
		this.o.onUpdate && this.o.onUpdate(this);
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