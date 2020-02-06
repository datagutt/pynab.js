var Pynab = require('./lib/index').default;
var pynab = new Pynab('http://192.168.0.237:8080');
function randomHex(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
(async () => {
    await pynab.Mode.setInteractive();
    await pynab.Command.playAudio(`nabweatherd/today.mp3`);
    await pynab.Command.playAudio(`nabweatherd/sky/sunny.mp3`);
    await pynab.Command.playAudio(`nabweatherd/temp/30.mp3`);
    await pynab.Command.playAudio(`nabweatherd/degree.mp3`);
    await pynab.Mode.setIdle();
    //let state = await pynab.State.getState();
    //console.log(state);
})();