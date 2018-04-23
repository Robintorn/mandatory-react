import React from 'react';

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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      class: Array(9).fill(null)
    }
  }
  

  handleClick = (i) => {
    const squares = this.state.squares.slice();
    const klass = this.state.class.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    if(this.state.xIsNext){
      klass[i] = "tile plr1";
      squares[i] = 'X';  
    }else{
      klass[i] = "tile plr2";
      squares[i] = 'O';
    }

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      class: klass
    });
  }

  renderTils = (i) => {
    return (
      <Tile 
      onClick={() => this.handleClick(i)} 
      value={this.state.squares[i]} class={this.state.class[i]}/>
    );
  }

  resetButton = () => {
    this.setState({ squares: [], class: [], xIsNext: true });
  }

  render(){
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Player ' + (this.state.xIsNext ? '1' : '2') + " to play";
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
      <div className="reset">
      <button onClick={this.resetButton}>Reset</button>
      </div>
      </div>
    );
  }
  
  calculateWinner = (squares) => {
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
        if(squares[a] === 'X'){
          return 'Player 1';
        }else{
          return 'Player 2';
        }
      } 
    }
    return null;
  }  
}
