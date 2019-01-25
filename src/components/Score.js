import React from 'react';
import CountUp from 'react-countup';

export default class Score extends React.Component {

    state = {
        oldScore: 0,
        newScore: 0
    }

    componentWillReceiveProps(newProps) {
        const oldScore = this.state.newScore;
        this.setState({
            oldScore,
            newScore: newProps.score
        });
    }

    render() {
        return (
            <div className="score">
                <div className="score-text">Your current score is: </div>
                <div className="score-number">
                    <CountUp
                        start={this.state.oldScore}
                        end={this.state.newScore}
                        duration={2}
                    />

                </div>
            </div>
        )
    }


};

// export default Score;