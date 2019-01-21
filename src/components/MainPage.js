import React from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import _ from 'lodash';

import Box from './Box';
import { moveLeft, moveRight, moveUp, moveDown, checkNextMove } from '../functions/2048';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
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
        const result = checkNextMove(this.state.grid);
        this.setState({
            grid: result.grid
        });
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
            <div {...ArrowKeysReact.events} tabIndex="0" className="container">
                <h1>Start playing 2048 now!</h1>
                {this.state.gameEnded ? <h1>This game has Ended!</h1> : <h1>Still an active game going!</h1>}
                <div className="grid">
                    {this.state.grid.map((row, index1) => {
                        return row.map((item, index2) => {
                            return (
                                <Box key={[index1, index2]} number={item} />
                            )
                        })
                    })}
                </div>
            </div>

        )
    }
}