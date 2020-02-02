var Pynab = require('./lib/index').default;
var pynab = new Pynab('http://192.168.0.237:8080');
function randomHex(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
(async () => {
    await pynab.Mode.setInteractive();
    await pynab.Command.moveEar(0, (Math.ceil(Math.random() * (17 + 17)) - 17) + 1);
    await pynab.Command.moveEar(1, (Math.ceil(Math.random() * (17 + 17)) - 17) + 1);
    await pynab.Command.setLED(0, randomHex());
    await pynab.Command.setLED(1, randomHex());
    await pynab.Command.setLED(2, randomHex());
    await pynab.Command.setLED(3, randomHex());
    await pynab.Command.setLED(4, randomHex());
    await pynab.Command.playAudio(`nabsurprised/${Math.floor(Math.random(0,1) * 297)}.mp3`);
    setTimeout(async () => {
        await pynab.Mode.setIdle();
    }, 5000);
    //let state = await pynab.State.getState();
    //console.log(state);
})();