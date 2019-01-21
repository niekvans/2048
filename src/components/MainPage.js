import React from 'react';
import ReactDOM from 'react-dom';
import ArrowKeysReact from 'arrow-keys-react';
import _ from 'lodash';
import Modal from 'react-responsive-modal';

import Box from './Box';
import { moveLeft, moveRight, moveUp, moveDown, checkNextMove } from '../functions/2048';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            gameEnded: false
        };

        ArrowKeysReact.config({
            left: () => {
                let wArr = this.state.grid.map((item) => item);
                moveLeft(wArr).then((result) => {
                    if (!_.isEqual(result, this.state.grid)) {
                        this.setStateAndNext(result);
                    }
                });
            },
            right: () => {
                let wArr = this.state.grid.map((item) => item);
                moveRight(wArr).then((result) => {
                    if (!_.isEqual(result, this.state.grid)) {
                        this.setStateAndNext(result);
                    }
                });
            },
            up: () => {
                let wArr = this.state.grid.map((item) => item);
                moveUp(wArr).then((result) => {
                    if (!_.isEqual(result, this.state.grid)) {
                        this.setStateAndNext(result);
                    }
                });
            },
            down: () => {
                let wArr = this.state.grid.map((item) => item);
                moveDown(wArr).then((result) => {
                    if (!_.isEqual(result, this.state.grid)) {
                        this.setStateAndNext(result);
                    }
                });
            }
        });
    };

    componentDidMount() {
        this.startNewGame();
    };

    setStateAndNext = (newGrid) => {
        this.setState({
            grid: newGrid
        }, () => {
            const result = checkNextMove(this.state.grid);
            if (result.availableMove) {
                this.setState({
                    grid: result.grid
                });
            }
            else {
                this.setState({
                    gameEnded: true
                });
            }
        });
    };

    startNewGame = () => {
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
            <div {...ArrowKeysReact.events} ref="playarea" tabIndex="0" className="container">
                <div className="container">
                    <h1>Start playing 2048 now!</h1>
                    <button
                        onClick={this.startNewGame}
                        className="start-button"
                    >Start new Game</button>
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
        )
    }
}