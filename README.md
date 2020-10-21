#TenPinBowling

============
Description:
Multi-player bowling game.

=============
Setup:

Bash:
1. npm install
2. node app.js

Docker:
1. docker pull starsig/tenpinbowling:0.0.1 
2. docker run -it <container_id>

============
Testing:

npm test

============
Usage:

You will first be asked to enter the names of the players, or hit enter
for a single player.
Players are assigned at the order they are given. In each turn, the current
player should enter a frame, comma seperated.
Examples:
Open frame: 1,2
Spare: 3,/
Strike: X
Last round closed frame (spare/strike), extra throw is granted: 1,/,4 X,1,X, X,X,X
If an invalid input was given, you will be prompt with a descriptive message and be asked 
to re-play yor move