import game from "./scenes/game.js"

const {documentElement : elem } = document 
document.body.onclick = () => {
	window.rootElement.documentElement.requestFullscreen();
}

game();