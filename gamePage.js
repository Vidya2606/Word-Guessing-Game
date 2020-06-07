const gamePage = {
    startGame: function (wordsList) {
        return `<!DOCTYPE html>
        <html>
            <head>
                <title>Secret Word Game</title>
                <meta charset="utf-8">
                <link rel="stylesheet" href="game.css">
            </head>
            <body>
                <h1>Guess the <span class="secretWordHighlighter"> Secret Word</span></h1>
                <div class="pageBorder">
                    <p class="gameInstructionsSection">A secret word is in the list below, guess the word to win the game.</p>
                    ${gamePage.gameWords(wordsList)} <br>
                    <form action="/sendGuess" method="POST">
                        <input type="text" name="userguess" placeholder="Your guess">
                        <button class="button" type="submit" name="button">Submit</button> <br>
                    </form>
                </div>
            </body>
        </html>
        `;
    },
    updateGame: function (wordsList, guessedWordsList, messageToUser, noOfTries) {
        return `<!DOCTYPE html>
        <html>
            <head>
                <title>Secret Word Game</title>
                <meta charset="utf-8">
                <link rel="stylesheet" href="game.css">
            </head>
            <body>
                <h1>Guess the <span class="secretWordHighlighter"> Secret Word</span></h1>
                <div class="pageBorder">
                    <p class="gameInstructionsSection">A secret word is in the list below, guess the word to win the game.</p>
                    ${gamePage.gameWords(wordsList)} <br>
                    <form action="/sendGuess" method="POST">
                        <input type="text" name="userguess" placeholder="Your guess">
                        <button class="button" type="submit" name="button">Submit</button> <br>
                    </form>
                    <p class="messageToUserSecion">${messageToUser}</p>
                    <h3>Attempts taken</h3>
                    <div class="previousGussedWordsListSection">
                        <p class="matchingLettersCountHighlighter">${noOfTries}</p>
                    </div>
                    ${gamePage.guessedWords(guessedWordsList)}
                </div>
            </body>
        </html>
        `;
    },
    endGame: function (wordsList, guessedWordsList, messageToUser) {
        return `<!DOCTYPE html>
        <html>
            <head>
                <title>Secret Word Game</title>
                <meta charset="utf-8">
                <link rel="stylesheet" href="game.css">
            </head>
            <body>
                <h1>Guess the <span class="secretWordHighlighter"> Secret Word</span></h1>
                <div class="pageBorder">
                    <p>A secret word is in the list below, guess the word to win the game!</p>
                    ${gamePage.gameWords(wordsList)} <br>
                    <form action="/newGame" method="POST"> 
                        ${messageToUser}  <button class="button" type="submit" name="button">New Game</button>
                    </form> <br>    
                    ${gamePage.guessedWords(guessedWordsList)}
                </div>
            </body>
        </html>
        `;
    },
    gameWords: function (wordsList) {
        return `<div class="wordsListSection"><p>[` +
            Object.keys(wordsList).map(word => {
                return `${wordsList[word]}`;
            }).join(', ') + `] </p> </div>`;
    },
    guessedWords: function (guessedWordsList) {
        if (guessedWordsList.length === 0) {
            return ``;
        }
        return  `<h3>Previous guesses</h3>`+
                `<div class="previousGussedWordsListSection">` +
                `<p class="matchingLettersCountHighlighter">` +    
            Object.keys(guessedWordsList).map(guessedWord => {
                return `${guessedWordsList[guessedWord].userguess} (${guessedWordsList[guessedWord].matchingLettersCount + " letters in common"})`;
            }).join('<br>') + `</p>` + `</div>`;
    },
}
module.exports = gamePage;