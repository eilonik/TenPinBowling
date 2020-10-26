## TenPinBowling

### Description

TenPinBowling is a Multi-player turn based bowling game.  
Each player playes 10 frames, one turn at a time. The goal is to take down  
as many pins as possible out of 10 in each frame, 1/2 throws at a time, except for  
the last frame, where it can also be 3 throws.

#### Scoring

- A frame can be open - 2 non-negative integers < 10 each.  
The score of the frame is the sum of those integers.  

- A frame can be closed - either a strike or a spare. A strike is when all 10  
pins were taken down at the first shot, and a spare is when 10 pins were taken  
down within 2 throws. Both strike and spare carry a bonus as follows:  
A strike ('X') recieves a bonus of the sum of the next 2 throws.  
A spare (non-negative integer < 10 followed by '/') recieves the  
following throw as a bonus.  

- A special case is a closed frame in the last round. In that case
the frame will consist of three throws. No bonus is awarded for that round

The maximum score for the game is 300 (12 strikes in a row)  

The game ends when all players played all 10 frmaes.  
The winner is the player with the highest score.

### Installation

```bash
npm install
node app.js
```
or

```bash
docker run -it starsig/tenpinbowling:0.0.1
```

### Testing

npm test

### Usage

After running the app, you will be asked to enter the names of the players,  
or hit enter for a single player.  
Players are assigned in the order they are provided. In each turn,  
the current player should enter a valid frame, comma seperated.  
Examples:  
-Open frame: 1,2  
-Spare: 3,/  
-Strike: X  
If a closed frame (stike/spare) is provided at the last round,  
an extra throw is granted.  
Examples of closed last round:  
-1,/,4  
-X,1,X  
-X,1,1  
-X,X,1   
-X,X,X  
If an invalid input was given at any stage, you will be prompted   
with a message describing the error and will be asked to re-play yor move

### structure

#### Player class

The Player class holds the state of the player's frames.  
It recieves a name at the constructor, and a frame for  
each turn. A turn is played using the *play(frame)* method.  
It validates the input, adds the frame to it's state, and returns  
a summary object consists of the player's name, current frame, score,  
and a string formatted frames state.  
The score is calculated using the *Player.calculateScore(frames)* method  
that recieves an array of frames and return the score.  
It allso has a *isDone()* method that returns true if the player has  
played 10 frames.

#### Game class

The game class is initialized using the *init(players)* method, and recieves  
and array of players as an arguments. It initializes a queue of players and  
holds the current player in each round. A round is played using the *makeMove(frame)*  
method, that recieves a frame, validates and executes the *play(frame)* move on  
the current player. If the current player returns false for *isDone()*, it is  
pushed back to the queue from the end. This class also has a *isDone()* method,  
that returns true once all players are out of the queue.

#### IO module

The IO module is responsible for the interaction with the players.  
It has a *read(question, cb)* method that receives a string and a callback  
function, and returns a promise. It prompts the user with the question  
argument and expects an input. if the input is valid, the promise is  
resolved. Otherwise, it keeps asking for an input.  
This module also has a *message(msg)* method that prints a formatted message  
to the console, a *table(rows)* method that recieves an array of objects and  
prints a formatted table to the console, and an *error(msg)* function that  
prints a formatted error message to the console.


I used mocha.js for testings. Tests can be found under the tests directory