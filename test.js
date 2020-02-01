var Pynab = require('./lib/index').default;
var pynab = new Pynab('http://192.168.0.237:8080');
(async () => {
    await pynab.Mode.setInteractive();
    await pynab.Command.moveEar(0, (Math.ceil(Math.random() * (17 + 17)) - 17) + 1);
    await pynab.Command.moveEar(1, (Math.ceil(Math.random() * (17 + 17)) - 17) + 1);
    await pynab.Command.setLED(0, '#2F329F');
    await pynab.Command.setLED(1, '#D9F637');
    await pynab.Command.setLED(2, 'green');
    await pynab.Command.setLED(3, 'pink');
    await pynab.Command.setLED(4, 'green');
    setTimeout(async () => {
        await pynab.Mode.setIdle();
    }, 5000);
    //let state = await pynab.State.getState();
    //console.log(state);
})();