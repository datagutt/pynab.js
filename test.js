var Pynab = require('./lib/index').default;
var pynab = new Pynab('http://192.168.0.237:8080');
(async () => {
    await pynab.Mode.setInteractive();
    await pynab.Command.setLED(0, 'red');
    await pynab.Command.setLED(1, 'green');
    await pynab.Command.setLED(2, 'blue');
    await pynab.Command.setLED(3, 'yellow');
    setTimeout(async () => {
        await pynab.Mode.setIdle();
    }, 5000);
    //let state = await pynab.State.getState();
    //console.log(state);
})();