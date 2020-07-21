import P from '../components/paragraph';
import Post from '../components/post';
import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      sizeOfCheckerboard: null,
      build: false,
      board: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBoard = this.createBoard.bind(this);
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

    return (
      <div className="main">
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
        <div>
          <table>
            {board.map((row) => {
              return (
                <tr>
                  {row.map((sq, key) => {
                    return <td style={sq === 0 ? black : white}></td>;
                  })}
                </tr>
              );
            })}
          </table>
        </div>
        <hr />
      </div>
    );
  }
}
