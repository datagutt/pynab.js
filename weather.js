var Pynab = require('./lib/index').default;
var pynab = new Pynab('http://192.168.0.237:8080');

(async () => {
    await pynab.Mode.setInteractive();
    await pynab.Command.playMultipleAudio([
        `nabweatherd/signature.mp3`,
        `nabweatherd/today.mp3`,
        `nabweatherd/sky/sunny.mp3`,
        `nabweatherd/temp/30.mp3`,
        `nabweatherd/degree.mp3`
    ])
    /*await pynab.Command.playAudio(`nabweatherd/today.mp3`);
    await pynab.Command.playAudio(`nabweatherd/sky/sunny.mp3`);
    await pynab.Command.playAudio(`nabweatherd/temp/30.mp3`);
    await pynab.Command.playAudio(`nabweatherd/degree.mp3`);*/
    await pynab.Mode.setIdle();
    //let state = await pynab.State.getState();
    //console.log(state);
})();