import React from 'react';

import {makeMove, newGame} from '../logic';
import Tile from './tile';

/*
The main game App! It should have a TicTacToe game state in its component state,
and use the Tile and Message components to render the game.

Then the `makeMove` function from the logic layer should be used to update the
game state as the tiles are being clicked.

The user should also be able to reset the game.

The App component should render an outer element with a `container` CSS class,
and all tiles in an element with a `board` CSS class.
*/

export default class Game extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderTils(i) {
    return (
      <Tile 
      onClick={() => this.handleClick(i)} 
      value={this.state.squares[i]} />
    );
  }

  render(){
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div>
      <div>{status}</div>
      <div className="board">
        {this.renderTils(0)}
        {this.renderTils(1)}
        {this.renderTils(2)}
        {this.renderTils(3)}
        {this.renderTils(4)}
        {this.renderTils(5)}
        {this.renderTils(6)}
        {this.renderTils(7)}
        {this.renderTils(8)}
      </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    } 
  }
  return null;
}

