import React from 'react';

import database from '../firebase/firebase';

export default class WinnersList extends React.Component {

    state = {
        winners: []
    };

    componentDidMount() {
        database.ref('/scores').on('value', (snapshot) => {
            const snap = snapshot.val();
            const winners = [];
            for (let winner in snap) {
                winners.push({
                    name: snap[winner].name,
                    score: parseInt(snap[winner].score)
                })
            };
            winners.sort((a, b) => {
                if (a.score > b.score) {
                    return -1
                }
                else {
                    return 1
                }
            });
            this.setState({
                winners: winners
            });



        });
    }

    render() {

        return (
            <div className="winner-list">
                <h3>High Scores!</h3>

                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-item">Ranking</th>
                            <th className="table-item">Name</th>
                            <th className="table-item">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.winners.map((winner, index) => {
                            return (
                                <tr key={winner.score} className="table-row">
                                    <th className="table-item">{index + 1}</th>
                                    <th className="table-item">{winner.name}</th>
                                    <th className="table-item">{winner.score}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}