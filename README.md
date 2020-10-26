## TenPinBowling

TenPinBowling is a Multi-player bowling game.

### Installation

```
Bash
npm install
node app.js
```

```
Docker
docker run -it starsig/tenpinbowling:0.0.1
```

## Usage

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


## Testing

npm test