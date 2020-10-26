## TenPinBowling

### Description

TenPinBowling is a Multi-player turn based bowling game.
Each player playes 10 frames, one turn at a time. Each frame contains the number of pins that were taken down in it.

#### Scoring

- A frame can be open - 2 non-negative integers < 10 each.
The score of the frame is the sum of those integers.

- A frame can be closed - either a strike or a spare. Both strike and spare 
award the player with 10 points, plus a bonus.
A strike ('X') recieves a bonus of the sum of the next 2 throws.
A spare (non-negative integer < 10 followed by '/') recieves the following throw as a bonus.

- A special case is a closed frame in the last round. In that case the frame will consist of
three throws.

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

### Usage

After running the app, you will be asked to enter the names of the players, or hit enter
for a single player.
Players are assigned in the order they are provided. In each turn, the current
player should enter a valid frame, comma seperated.
Examples:
Open frame: 1,2
Spare: 3,/
Strike: X
If a closed frame (stike/spare) is provided at the last round, an extra throw is granted: 1,/,4 X,1,X, X,X,X
If an invalid input was given at any stage, you will be prompt with a descriptive message and will be asked to re-play yor move

### structure

### Testing

npm test