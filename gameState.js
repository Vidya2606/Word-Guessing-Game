const gameState = {
    users: {
    },
    // state: 
    // 0 (loaded page for first time/new game) 
    // 1 (Game in progress)
    // 2 (Game ended since user guessed corectly)
    storeGameState: function(uuid, state, wordsList, answer, guessedWordsList, messageToUser, noOfTries) {
        gameState.users[uuid] = {state, wordsList, answer, guessedWordsList, messageToUser, noOfTries};
    },
    getGameState: function(uuid) {
        return gameState.users[uuid];
    }
}
module.exports = gameState;