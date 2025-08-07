# Griffeath-model
This cyclic cellular automaton is a kind of automaton rule invented by David Griffeath from University of Wisconsin – Madison.
## Standard version
This auto-reproductive cell automaton is two-dimensional, and its cells can take four states (1, 2, 3 or 4) in the standard version. 

The state of a cell at time t + 1 depends on its state at time t and the state of its 4 neighbors (Von Neumann's neighborhood). 
A cell moves from a state i to a state i + 1 (mod 4) in the state cycle when the state i + 1 (mod 4) is present in at least one neighboring cell.
![](_media/griffeath/cycle.png)

## Version with threshold
For 8 neighbors (Moore), Griffeath did modifications by adding a threshold (3 by default) for wich a cell changes its state:
![3orMore](https://github.com/user-attachments/assets/ca78ea77-5bf5-4497-8055-a741d76aea63)

For this version, if you simulate with 5 states, you may observe such figure:
<img width="638" alt="5states" src="https://github.com/user-attachments/assets/dd4f4672-618f-4482-9fc4-afaf6e8fa7a6" />

## Version with range of states
The current cell in state i checks its state against the neighbors' states. If 3 (threshold) or more neighbors have a state between (i+1) and (i + nbStates/3), then the current cell changes to that state. 
For example, if the current cell state is 2, and 3 of its  neighbors are in state 3 to 6, then the current cell changes its state to 3:
<img width="368" alt="average" src="https://github.com/user-attachments/assets/fecd1231-ef8b-4504-8a21-ae8602052b57" />

For this version, if you simulate with 14 states, you may observe such figure:
<img width="609" alt="14states" src="https://github.com/user-attachments/assets/20e9c768-b3dc-4176-bfaf-f7290816b0eb" />
