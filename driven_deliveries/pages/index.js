import P from '../components/paragraph';
import Post from '../components/post';
import React from 'react';
import $ from 'jquery';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      sizeOfCheckerboard: null,
      build: false,
      board: [],
      movePiece: false,
      coordinates: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    this.createBoard(8);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Size of Board ' + this.state.value);

    this.setState({
      sizeOfCheckerboard: this.state.value,
      build: true,
    });

    this.createBoard(this.state.value);
  }

  createBoard(num) {
    let board = [];
    for (let i = 0; i < num; i++) {
      let row = [];
      if (i % 2 === 0) {
        for (let j = 0; j < num; j++) {
          if (j % 2 === 0) {
            row.push(0);
          } else {
            row.push(1);
          }
        }
      } else {
        for (let j = 0; j < num; j++) {
          if (j % 2 === 0) {
            row.push(1);
          } else {
            row.push(0);
          }
        }
      }
      board.push(row);
    }
    this.setState({
      board: board,
    });
  }

  changeColor() {
    console.log(event.target.id);
    let coordinates = event.target.id;
    this.setState({
      movePiece: true,
      coordinates: coordinates,
    });
  }

  render() {
    const board = this.state.board;

    const black = {
      backgroundColor: 'black',
      color: 'white',
      width: '75px',
      height: '75px',
    };

    const white = {
      backGroundColor: 'white',
      color: 'black',
      width: '75px',
      height: '75px',
    };

    const blackPiece = {
      padding: 10,
      margin: 20,
      display: 'inline-block',
      backgroundColor: 'grey',
      borderRadius: '50%',
      width: 75,
      height: 75,
    };

    const redPiece = {
      padding: 10,
      margin: 20,
      display: 'inline-block',
      backgroundColor: 'red',
      borderRadius: '50%',
      width: 75,
      height: 75,
    };

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Size of Checkerboard
            <input
              type="text"
              placeholder="8"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          You have <b>{this.state.build ? 'currently' : 'not'}</b> modified the
          size of a checkerboard.
        </div>
        <div style={{ textAlign: 'center' }}>
          <table>
            {board.map((row, key1) => {
              return (
                <tr>
                  {row.map((sq, key2) => {
                    return (
                      <td style={sq === 0 ? black : white}>
                        col {key2} row {key1}
                        {key1 < 2 && (
                          <div
                            id={[key1, key2]}
                            onClick={this.changeColor.bind(this)}
                            style={redPiece}
                          ></div>
                        )}
                        {key1 > 5 && (
                          <div
                            id={[key1, key2]}
                            onClick={this.changeColor.bind(this)}
                            style={blackPiece}
                          ></div>
                        )}
                        {/* <br></br> */}
                        {/* {<input type="radio"></input>} */}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
          <div>
            {this.state.movePiece && (
              <span>
                <button>Up and Left</button> <button>Up and Right</button>
              </span>
            )}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
