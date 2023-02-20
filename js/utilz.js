export const $ = a => document.querySelector(a);
import { TextStyle, Text ,Assets } from "pixi.js";

export const config = {
	height: window.innerHeight,
	width: window.innerWidth,
	antialias: true,
	transparent: true,
	resolution: 1,
	autoDensity: true,
	resizeTo: window,
	backgroundAlpha : 0,
};

export const log = console.log

const styly = new TextStyle({
	align: "left",
	fill: "#000000",
	fontSize: 10,
	fontFamily: "sans",
});
const texty = new Text("Logs", styly); // Text supports unicode!
texty.text = "";
texty.backgroundColor = 0x000000;
texty.position.set(10, 10);

export const getLogger = (c) => {
	c.addChild(texty);
	return function (...a) {
		let txt = a.join("\n");
		texty.text = txt;
	};
};

export const pi = parseInt;

export function rand (x,y) {
	return Math.floor((Math.random()*(y-x+1))+x)
}

export function randClr () {
	let clr = Math.random().toString(16).slice(-7,-1)
	return eval("0x"+clr)
}