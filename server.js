const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const game = require('./game');

app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.get('/', (req, res) => {
    let {uuid, userPage} = game.loadPage(req);
    res.cookie("gamestate", {uuid});
    res.send(userPage)
});
app.post('/sendGuess', express.urlencoded({ extended: false }), (req, res) => {
    let uuid = game.gameLogic(req);
    res.cookie("gamestate", {uuid});
    res.redirect('/');
});
app.post('/newGame', express.urlencoded({ extended: false}), (req, res) => {
    let uuid = game.generateNewGame();
    res.cookie("gamestate", {uuid});
    res.redirect('/');
});
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));