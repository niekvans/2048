import React from 'react';
import ReactDOM from 'react-dom';
import ArrowKeysReact from 'arrow-keys-react';
import _ from 'lodash';
import Modal from 'react-responsive-modal';
import Swipeable from 'react-swipeable';

import Box from './Box';
import { moveLeft, moveRight, moveUp, moveDown, checkNextMove } from '../functions/2048';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            gameEnded: false,
            score: 0
        };

        ArrowKeysReact.config({
            left: () => { this.move('left') },
            right: () => { this.move('right') },
            up: () => { this.move('up') },
            down: () => { this.move('down') }
        });
    };

    componentDidMount() {
        let grid = JSON.parse(localStorage.getItem('grid'));
        let score = JSON.parse(localStorage.getItem('score'));
        if (grid) {
            this.setState({
                grid,
                score
            });
            this.setFocus();
        }
        else {
            this.startNewGame();
        }

    };

    setStateAndNext = (newGrid) => {
        this.setState({
            grid: newGrid
        }, () => {
            const result = checkNextMove(this.state.grid);
            if (result.availableMove) {
                this.setState({
                    grid: result.grid,
                    score: localStorage.getItem('score')
                });
                localStorage.setItem('grid', JSON.stringify(result.grid));
            }
            else {
                this.setState({
                    gameEnded: true,
                    score: localStorage.getItem('score')
                });
            }
        });
    };

    move = (direction) => {
        const wArr = this.state.grid.map((item) => item);
        let result;
        if (direction == 'left') {
            result = moveLeft(wArr)
        }
        else if (direction == 'right') {
            result = moveRight(wArr)
        }
        else if (direction == 'up') {
            result = moveUp(wArr)
        }
        else if (direction == 'down') {
            result = moveDown(wArr)
        }

        if (!_.isEqual(result, this.state.grid)) {
            this.setStateAndNext(result);
        }
    }

    leftMove = () => {
        this.move('left');
    };

    rightMove = () => {
        this.move('right');
    };

    upMove = () => {
        this.move('up');
    };

    downMove = () => {
        this.move('down');
    };

    startNewGame = () => {
        localStorage.setItem('grid', null);
        localStorage.setItem('score', 0);
        const result = checkNextMove([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]);
        this.setState({
            grid: result.grid,
            gameEnded: false
        });

        this.setFocus();
    };

    setFocus = () => {
        ReactDOM.findDOMNode(this.refs.playarea).focus();
    }

    chooseClass = (item) => {
        if (item == 0) {
            return 'grid-number';
        }
        else if (item < 10) {
            return 'small';
        }
        else if (item < 100) {
            return 'medium';
        }
        else if (item < 1000) {
            return 'big';
        }
        else if (item < 10000) {
            return 'super';
        }
        else {
            return 'grid-number';
        }
    }

    render() {
        return (
            <Swipeable
                onSwipedLeft={this.leftMove}
                onSwipedRight={this.rightMove}
                onSwipedUp={this.upMove}
                onSwipedDown={this.downMove}
                preventDefaultTouchmoveEvent={true}
            >
                <div {...ArrowKeysReact.events} ref="playarea" tabIndex="0" className="container">
                    <div className="container">
                        <h1>Start playing 2048 now!</h1>
                        <button
                            onClick={this.startNewGame}
                            className="start-button"
                        >Start new Game</button>
                        <div>
                            Your score: {this.state.score}
                        </div>
                        <Modal
                            open={this.state.gameEnded}
                            onClose={this.startNewGame}
                        >
                            <h1>Thanks for playing 2048.</h1>
                            <button onClick={this.startNewGame}>Start a new game!</button>
                        </Modal>
                        <div className="grid">
                            {this.state.grid.map((row, index1) => {
                                return (
                                    <div className="grid-row" key={index1}>
                                        {row.map((item, index2) => {
                                            return (
                                                <Box key={[index1, index2]} number={item} />
                                            )
                                        })
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Swipeable>
        )
    }
};

