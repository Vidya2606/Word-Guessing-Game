const gameState = require('./gameState');
const gamePage = require('./gamePage');
const words = require('./words');

const game = {
    randomWord: function(wordsList) {
        const arrayLength = wordsList.length;
        const randomWordIndex = Math.floor(Math.random() * arrayLength);
        return wordsList[randomWordIndex];
    },
    letterMatchCounter: function(usersGuess, answer) {
        let guessedWords = usersGuess.toUpperCase().split('').sort().join('');
        let randomWords = answer.toUpperCase().split('').sort().join('');
        let matchCount = 0;
        let guessIndex = 0;
        let randomIndex = 0;
        while(guessIndex < guessedWords.length && randomIndex < randomWords.length){
            if(guessedWords[guessIndex] === randomWords[randomIndex]){
                matchCount++;
                guessIndex++;
                randomIndex++;
            } else if(guessedWords[guessIndex] < randomWords[randomIndex]){
                guessIndex++;
            } else{
                randomIndex++;
            }
        }
        return matchCount;
    },
    upperCaseWordList: function(wordList) {
        let upperCasedWordList = [];
        for (aWord in wordList) {
            upperCasedWordList.push(wordList[aWord].toUpperCase());
        }
        return upperCasedWordList;
    },
    gameLogic: function(req) {
        if(req.cookies === null || req.cookies.gamestate === undefined) {
            // If cookie is not available then create a new game.
            let uuid =  game.generateNewGame();
            return uuid;
        }
        let uuid = req.cookies.gamestate.uuid;
        const {userguess} = req.body;
        let caseAdjustedUserGuess = userguess.toUpperCase();
        let currGameState = gameState.getGameState(uuid);
        if (currGameState.wordsList.indexOf(caseAdjustedUserGuess) < 0) {
            // User guess is not is the game word list
            let messageToUser = "Invalid word, try again!";
            gameState.storeGameState(uuid, 1, currGameState.wordsList, currGameState.answer, currGameState.guessedWordsList, messageToUser, currGameState.noOfTries);
            // set Cookies
            return uuid;
        }
        // Increment the tries count.
        let noOfTries = currGameState.noOfTries + 1;
        if (caseAdjustedUserGuess === currGameState.answer) {
            // Correct word was guessed
            let messageToUser = "Yay!!! you guessed it right in " + noOfTries + " attempts";
            gameState.storeGameState(uuid, 2, currGameState.wordsList, currGameState.answer, currGameState.guessedWordsList, messageToUser, noOfTries);
            return uuid;
        } else {
            // Wrong word was guessed
            // Find matching letters.
            let matchingLettersCount = game.letterMatchCounter(caseAdjustedUserGuess, currGameState.answer);
            // Update Guessed Word List
            currGameState.guessedWordsList.push({ userguess, matchingLettersCount})
            // Build message for the player
            let messageToUser = userguess + " is not the secret word.\nBut it has " + matchingLettersCount  + " letters in common.";
            // Update game state.
            gameState.storeGameState(uuid, 1, currGameState.wordsList, currGameState.answer, currGameState.guessedWordsList, messageToUser, noOfTries);
            return uuid;
        }
    },
    // Generates a web page based on the current state
    loadPage: function(req) {
        if(req.cookies === null || req.cookies.gamestate === undefined){
            let uuid = game.generateNewGame();
            let userPage = game.generatePage(uuid);
            return {uuid, userPage};
        }
        let uuid = req.cookies.gamestate.uuid;
        let currGameState = gameState.getGameState(uuid);
        if (currGameState === undefined || currGameState.state === undefined) {
            // Extra check added to handle a wierd bug in Opera's incognito mode.
            // When opening this game page on a new incognito window, the browser 
            // kept sending a stale cookie. Same uuid was in the cookie even when 
            // retrying on new incognito windows.
            let uuid = game.generateNewGame();
            let userPage = game.generatePage(uuid);
            return {uuid, userPage};
        }
        let userPage = game.generatePage(uuid);
        return {uuid, userPage};
    },
    generateNewGame: function() {
        const wordsList = game.upperCaseWordList(words.wordsArray);
        let answer = game.randomWord(wordsList);
        let uuid = Math.floor(Math.random() * 1000000) + 1;
        let state = 0;
        let noOfTries = 0;
        // Empty array because no guesses from user yet
        let guessedWordsList = [];
        // Store new game: uuid, state, wordsList, answer, guessedWordsList, messageToUser
        gameState.storeGameState(uuid, state, wordsList, answer, guessedWordsList, "", noOfTries);
        // set Cookies
        return uuid;
    },
    generatePage: function(uuid) {
        // Read current game state
        let currGameState = gameState.getGameState(uuid);
        if (currGameState.state === 0) {
            // Load new game page
            return gamePage.startGame(currGameState.wordsList);
        } 
        else if (currGameState.state === 1) {
            // Should update current game page
            return gamePage.updateGame(currGameState.wordsList, currGameState.guessedWordsList, currGameState.messageToUser, currGameState.noOfTries);
        }
        else if (currGameState.state === 2) {
            // User has guessed the game
            return gamePage.endGame(currGameState.wordsList, currGameState.guessedWordsList, currGameState.messageToUser);
        }
        else {
            // Corrupted state
        }
    },
}
module.exports = game;