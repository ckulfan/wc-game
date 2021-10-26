import React, { Component } from 'react';
import classes from './PnpScoring.module.css';

let PnpScoreMatrix = {
    "2F": {
        "Win1Game": 2,
        "3rdInGroup": 5,
        "Last16": 9,
        "Quarters": 13,
        "4th": 15,
        "3rd": 18,
        "2nd": 20,
        "1st": 24
    },
    "2E": {
        "Win1Game": 1,
        "3rdInGroup": 4,
        "Last16": 8,
        "Quarters": 12,
        "4th": 14,
        "3rd": 17,
        "2nd": 19,
        "1st": 23
    },
    "2D": {
        "Win1Game": 0,
        "3rdInGroup": 3,
        "Last16": 7,
        "Quarters": 11,
        "4th": 13,
        "3rd": 16,
        "2nd": 18,
        "1st": 22
    },
    "3F": {
        "Win1Game": 0,
        "3rdInGroup": 3,
        "Last16": 7,
        "Quarters": 11,
        "4th": 13,
        "3rd": 16,
        "2nd": 18,
        "1st": 22
    },
    "2C": {
        "Win1Game": 0,
        "3rdInGroup": 2,
        "Last16": 6,
        "Quarters": 10,
        "4th": 12,
        "3rd": 15,
        "2nd": 17,
        "1st": 21
    },
    "3E": {
        "Win1Game": 0,
        "3rdInGroup": 2,
        "Last16": 6,
        "Quarters": 10,
        "4th": 12,
        "3rd": 15,
        "2nd": 17,
        "1st": 21
    },
    "2B": {
        "Win1Game": 0,
        "3rdInGroup": 1,
        "Last16": 5,
        "Quarters": 9,
        "4th": 11,
        "3rd": 14,
        "2nd": 16,
        "1st": 20
    },
    "3D": {
        "Win1Game": 0,
        "3rdInGroup": 1,
        "Last16": 5,
        "Quarters": 9,
        "4th": 11,
        "3rd": 14,
        "2nd": 16,
        "1st": 20
    },
    "4F": {
        "Win1Game": 0,
        "3rdInGroup": 1,
        "Last16": 5,
        "Quarters": 9,
        "4th": 11,
        "3rd": 14,
        "2nd": 16,
        "1st": 20
    },
    "2A": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 4,
        "Quarters": 8,
        "4th": 10,
        "3rd": 13,
        "2nd": 15,
        "1st": 19
    },
    "3C": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 4,
        "Quarters": 8,
        "4th": 10,
        "3rd": 13,
        "2nd": 15,
        "1st": 19
    },
    "4E": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 4,
        "Quarters": 8,
        "4th": 10,
        "3rd": 13,
        "2nd": 15,
        "1st": 19
    },
    "3B": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 3,
        "Quarters": 7,
        "4th": 9,
        "3rd": 12,
        "2nd": 14,
        "1st": 18
    },
    "4D": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 3,
        "Quarters": 7,
        "4th": 9,
        "3rd": 12,
        "2nd": 14,
        "1st": 18
    },
    "3A": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 2,
        "Quarters": 6,
        "4th": 8,
        "3rd": 11,
        "2nd": 13,
        "1st": 17
    },
    "4C": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 2,
        "Quarters": 6,
        "4th": 8,
        "3rd": 11,
        "2nd": 13,
        "1st": 17
    },
    "4B": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 1,
        "Quarters": 5,
        "4th": 7,
        "3rd": 10,
        "2nd": 12,
        "1st": 16
    },
    "4A": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Last16": 0,
        "Quarters": 4,
        "4th": 6,
        "3rd": 9,
        "2nd": 11,
        "1st": 15
    }
}

let PnpScoreMatrix16 = {
    "2F": {
        "Win1Game": 2,
        "3rdInGroup": 5,
        "Quarters": 9,
        "4th": 11,
        "3rd": 14,
        "2nd": 16,
        "1st": 20
    },
    "2E": {
        "Win1Game": 1,
        "3rdInGroup": 4,
        "Quarters": 8,
        "4th": 10,
        "3rd": 13,
        "2nd": 15,
        "1st": 19
    },
    "2D": {
        "Win1Game": 0,
        "3rdInGroup": 3,
        "Quarters": 7,
        "4th": 9,
        "3rd": 12,
        "2nd": 14,
        "1st": 18
    },
    "3F": {
        "Win1Game": 0,
        "3rdInGroup": 3,
        "Quarters": 7,
        "4th": 9,
        "3rd": 12,
        "2nd": 14,
        "1st": 18
    },
    "2C": {
        "Win1Game": 0,
        "3rdInGroup": 2,
        "Quarters": 6,
        "4th": 8,
        "3rd": 11,
        "2nd": 13,
        "1st": 17
    },
    "3E": {
        "Win1Game": 0,
        "3rdInGroup": 2,
        "Quarters": 6,
        "4th": 8,
        "3rd": 11,
        "2nd": 13,
        "1st": 17
    },
    "2B": {
        "Win1Game": 0,
        "3rdInGroup": 1,
        "Quarters": 5,
        "4th": 7,
        "3rd": 10,
        "2nd": 12,
        "1st": 16
    },
    "3D": {
        "Win1Game": 0,
        "3rdInGroup": 1,
        "Quarters": 5,
        "4th": 7,
        "3rd": 10,
        "2nd": 12,
        "1st": 16
    },
    "4F": {
        "Win1Game": 0,
        "3rdInGroup": 1,
        "Quarters": 5,
        "4th": 7,
        "3rd": 10,
        "2nd": 12,
        "1st": 16
    },
    "2A": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 4,
        "4th": 6,
        "3rd": 9,
        "2nd": 11,
        "1st": 15
    },
    "3C": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 4,
        "4th": 6,
        "3rd": 9,
        "2nd": 11,
        "1st": 15
    },
    "4E": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 4,
        "4th": 6,
        "3rd": 9,
        "2nd": 11,
        "1st": 15
    },
    "3B": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 3,
        "4th": 5,
        "3rd": 82,
        "2nd": 10,
        "1st": 14
    },
    "4D": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 3,
        "4th": 5,
        "3rd": 8,
        "2nd": 10,
        "1st": 14
    },
    "3A": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 2,
        "4th": 4,
        "3rd": 7,
        "2nd": 9,
        "1st": 13
    },
    "4C": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 2,
        "4th": 4,
        "3rd": 7,
        "2nd": 9,
        "1st": 13
    },
    "4B": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 1,
        "4th": 3,
        "3rd": 6,
        "2nd": 8,
        "1st": 12
    },
    "4A": {
        "Win1Game": 0,
        "3rdInGroup": 0,
        "Quarters": 0,
        "4th": 2,
        "3rd": 5,
        "2nd": 7,
        "1st": 11
    }
}

class PnpScoring extends Component {

    teamDidWinKnockout = (teamID, games) => {
        for (const game of games) {
            let teamIndex = -1;
            let otherTeamIndex = -1;
            if (game.teams[0]["id"] === teamID) {
                teamIndex = 0;
                otherTeamIndex = 1;
            } else if (game.teams[1]["id"] === teamID) {
                teamIndex = 1;
                otherTeamIndex = 0;
            }
            
            if (teamIndex !== -1) {
                let team1Goals = 0;
                let team2Goals = 0;
                let team1Penalties = 0;
                let team2Penalties = 0;
            
                let goalsParsed1 = Number.parseInt(game.result[teamIndex]);
                if (Number.isNaN(goalsParsed1))
                    team1Goals = 0;
                else
                    team1Goals = goalsParsed1;
            
                let goalsParsed2 = Number.parseInt(game.result[otherTeamIndex]);
                if (Number.isNaN(goalsParsed2))
                    team2Goals = 0;
                else
                    team2Goals = goalsParsed2;
            
                let penaltiesParsed1 = Number.parseInt(game.penalties[teamIndex]);
                if (Number.isNaN(penaltiesParsed1))
                    team1Penalties = 0;
                else
                    team1Penalties = penaltiesParsed1;
            
                let penaltiesParsed2 = Number.parseInt(game.penalties[otherTeamIndex]);
                if (Number.isNaN(penaltiesParsed2))
                    team2Penalties = 0;
                else
                    team2Penalties = penaltiesParsed2;
            
                if (team1Goals > team2Goals) {
                    return true;
                } else if (team1Goals === team2Goals) {
                    if (team1Penalties > team2Penalties) {
                        return true;                
                    }
                }
            }
        }

        return false;
    }

    teamDidLoseKnockout = (teamID, games) => {
        for (const game of games) {
            let teamIndex = -1;
            let otherTeamIndex = -1;
            if (game.teams[0]["id"] === teamID) {
                teamIndex = 0;
                otherTeamIndex = 1;
            } else if (game.teams[1]["id"] === teamID) {
                teamIndex = 1;
                otherTeamIndex = 0;
            }
            
            if (teamIndex !== -1) {
                let team1Goals = 0;
                let team2Goals = 0;
                let team1Penalties = 0;
                let team2Penalties = 0;
            
                let goalsParsed1 = Number.parseInt(game.result[teamIndex]);
                if (Number.isNaN(goalsParsed1))
                    team1Goals = 0;
                else
                    team1Goals = goalsParsed1;
            
                let goalsParsed2 = Number.parseInt(game.result[otherTeamIndex]);
                if (Number.isNaN(goalsParsed2))
                    team2Goals = 0;
                else
                    team2Goals = goalsParsed2;
            
                let penaltiesParsed1 = Number.parseInt(game.penalties[teamIndex]);
                if (Number.isNaN(penaltiesParsed1))
                    team1Penalties = 0;
                else
                    team1Penalties = penaltiesParsed1;
            
                let penaltiesParsed2 = Number.parseInt(game.penalties[otherTeamIndex]);
                if (Number.isNaN(penaltiesParsed2))
                    team2Penalties = 0;
                else
                    team2Penalties = penaltiesParsed2;
            
                if (team1Goals < team2Goals) {
                    return true;
                } else if (team1Goals === team2Goals) {
                    if (team1Penalties < team2Penalties) {
                        return true;                
                    }
                }
            }
        }

        return false;
    }

    teamDidMakeItToGames = (teamID, games) => {
        for (const game of games) {
            if ((game.teams[0]["id"] === teamID) || (game.teams[1]["id"] === teamID)) {
                return true;
            }
        }

        return false;
    }

    teamDidFinish3rdInGroup = (teamID) => {
        for (const group of this.props.currentState.groups) {
            if (teamID === group.teams[2].id) {
                return true;
            }
        }

        return false;
    }

    teamDidWinGroupGame = (teamID) => {
        for (const group of this.props.currentState.groups) {
            for (const game of group.games.filter((subGame) => {
                if ((subGame[0][0] === teamID) || (subGame[0][1] === teamID))
                    return true;
                else
                    return false;
            })) {
                let teamIndex = -1;
                let otherTeamIndex = -1;
                if (game[0][0] === teamID) {
                    teamIndex = 0;
                    otherTeamIndex = 1;
                } else {
                    teamIndex = 1;
                    otherTeamIndex = 0;
                }
                
                let team1Goals = 0;
                let team2Goals = 0;
            
                let goalsParsed1 = Number.parseInt(game[1][teamIndex]);
                if (Number.isNaN(goalsParsed1))
                    team1Goals = 0;
                else
                    team1Goals = goalsParsed1;
            
                let goalsParsed2 = Number.parseInt(game[1][otherTeamIndex]);
                if (Number.isNaN(goalsParsed2))
                    team2Goals = 0;
                else
                    team2Goals = goalsParsed2;
            
                if (team1Goals > team2Goals) {
                    return true;
                }
            }
        }
        
        return false;
    }

    groupFromTeamID = (teamID) => {
        for (const group of this.props.currentState.groups) {
            for (const team of group.teams) {
                if (teamID === team.id)
                    return group.name;
            }
        }

        return false;
    }

    getTeamPnpScore = (teamID) => {
        if (this.props.currentState.teams[teamID].pnpRanking === "") {
            return ({comment: "No Print and Play Rating", score: 0});
        } else if (this.teamDidWinKnockout(teamID, [this.props.currentState.knockout.finals[0]])) {
            return ({comment: "Won World Cup!", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["1st"]});
        } else if (this.teamDidLoseKnockout(teamID, [this.props.currentState.knockout.finals[0]])) {
            return ({comment: "2nd Place", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["2nd"]});
        } else if (this.teamDidWinKnockout(teamID, [this.props.currentState.knockout.finals[1]])) {
            return ({comment: "3rd Place", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["3rd"]});
        } else if (this.teamDidLoseKnockout(teamID, [this.props.currentState.knockout.finals[1]])) {
            return ({comment: "4th Place", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["4th"]});
        } else if (this.teamDidMakeItToGames(teamID, this.props.currentState.knockout.quarterFinals)) {
            return ({comment: "Quarterfinalist", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["Quarters"]});
        } else if (this.teamDidMakeItToGames(teamID, this.props.currentState.knockout.roundOf16)) {
            return ({comment: "Last 16", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["Last16"]});
        } else if (this.teamDidFinish3rdInGroup(teamID)) {
            return ({comment: "3rd in Group", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["3rdInGroup"]});
        } else if (this.teamDidWinGroupGame(teamID)) {
            return ({comment: "Won 1 Game", score: PnpScoreMatrix[this.props.currentState.teams[teamID].pnpRanking]["Win1Game"]});
        }

        return ({comment: "---", score: 0});
    }

    getTeamPnpScore16 = (teamID) => {
        if (this.props.currentState.teams[teamID].pnpRanking === "") {
            return ({comment: "No Print and Play Rating", score: 0});
        } else if (this.teamDidWinKnockout(teamID, [this.props.currentState.knockout.finals[0]])) {
            return ({comment: "Won World Cup!", score: PnpScoreMatrix16[this.props.currentState.teams[teamID].pnpRanking]["1st"]});
        } else if (this.teamDidLoseKnockout(teamID, [this.props.currentState.knockout.finals[0]])) {
            return ({comment: "2nd Place", score: PnpScoreMatrix16[this.props.currentState.teams[teamID].pnpRanking]["2nd"]});
        } else if (this.teamDidWinKnockout(teamID, [this.props.currentState.knockout.finals[1]])) {
            return ({comment: "3rd Place", score: PnpScoreMatrix16[this.props.currentState.teams[teamID].pnpRanking]["3rd"]});
        } else if (this.teamDidLoseKnockout(teamID, [this.props.currentState.knockout.finals[1]])) {
            return ({comment: "4th Place", score: PnpScoreMatrix16[this.props.currentState.teams[teamID].pnpRanking]["4th"]});
        } else if (this.teamDidMakeItToGames(teamID, this.props.currentState.knockout.quarterFinals)) {
            return ({comment: "Quarterfinalist", score: PnpScoreMatrix16[this.props.currentState.teams[teamID].pnpRanking]["Quarters"]});
        } else if (this.teamDidFinish3rdInGroup(teamID)) {
            return ({comment: "3rd in Group", score: PnpScoreMatrix16[this.props.currentState.teams[teamID].pnpRanking]["3rdInGroup"]});
        } else if (this.teamDidWinGroupGame(teamID)) {
            return ({comment: "Won 1 Game", score: PnpScoreMatrix16[this.props.currentState.teams[teamID].pnpRanking]["Win1Game"]});
        }

        return ({comment: "---", score: 0});
    }

    render() {
        let ownersDB = {};
        for (const teamID of Object.keys(this.props.currentState.teams)) {
            if (this.props.currentState.teams[teamID].owner !== "")
            {
                if (!ownersDB.hasOwnProperty(this.props.currentState.teams[teamID].owner)) {
                    ownersDB[this.props.currentState.teams[teamID].owner] = [];
                }

                let teamEntry = {teamID: teamID, comment: "", score: 0};
                ownersDB[this.props.currentState.teams[teamID].owner].push(teamEntry);
            }
        }

        for (const owner of Object.keys(ownersDB)) {
            for (let i = 0; i < ownersDB[owner].length; i++) {
                let scoreStruct = {};
                if (this.props.currentState.knockout.roundOf16.length > 0) {
                    scoreStruct = this.getTeamPnpScore(ownersDB[owner][i]["teamID"]);
                } else {
                    scoreStruct = this.getTeamPnpScore16(ownersDB[owner][i]["teamID"]);
                }
                ownersDB[owner][i]["comment"] = scoreStruct["comment"];
                ownersDB[owner][i]["score"] = scoreStruct["score"];
            }
        }

        let scoreSorter = [];
        for (const owner of Object.keys(ownersDB)) {
            let ownerScore = 0;
            for (const teamScoreStruct of ownersDB[owner]) {
                ownerScore += teamScoreStruct["score"];
            }
            scoreSorter.push([owner, ownerScore]);
            ownersDB[owner] = ownersDB[owner].sort((a, b) => {
                if (a["score"] < b["score"])
                    return 1;
                else if (a["score"] > b["score"])
                    return -1;
                return 0;
            });
        }

        scoreSorter = scoreSorter.sort((a, b) => {
            if (a[1] < b[1])
                return 1;
            else if (a[1] > b[1])
                return -1;
            return 0;
        });


        const scoringRows = [];
        for (const sortedScorer of scoreSorter) {
            let owner = sortedScorer[0];
            let ownerScore = sortedScorer[1];
            scoringRows.push(
                <tr className={classes.RightField} key={owner}>
                    <th className={classes.OwnerName}
                        title="Click to open editing of owner's teams."
                        onClick={(event) => this.props.ownerClicked(event, owner)}
                    >
                        {owner}
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>{ownerScore}</th>
                </tr>);
            scoringRows.push(
                ownersDB[owner].map((team, index) => {

                    let colorItem = classes.BlackItem;
                    if (this.props.currentState.teams[team["teamID"]].originalRanking === "Black") {
                        colorItem = classes.BlackItem;
                    } else if (this.props.currentState.teams[team["teamID"]].originalRanking === "Red") {
                        colorItem = classes.RedItem;
                    } else if (this.props.currentState.teams[team["teamID"]].originalRanking === "Blue") {
                        colorItem = classes.BlueItem;
                    } else if (this.props.currentState.teams[team["teamID"]].originalRanking === "Green") {
                        colorItem = classes.GreenItem;
                    } else if (this.props.currentState.teams[team["teamID"]].originalRanking === "Yellow") {
                        colorItem = classes.YellowItem;
                    } else if (this.props.currentState.teams[team["teamID"]].originalRanking === "Gray") {
                        colorItem = classes.GrayItem;
                    }
                    
                    return (
                        <tr key={owner + " " + team["teamID"]}>
                            <td className={classes.GroupName}>
                                {this.groupFromTeamID(team["teamID"])}
                            </td>
                            <td className={colorItem}>
                                {this.props.currentState.teams[team["teamID"]].name}
                            </td>
                            <td>
                                {this.props.currentState.teams[team["teamID"]].pnpRanking}
                            </td>
                            <td>
                                {team["comment"]}
                            </td>
                            <td className={classes.RightField}>
                                {team["score"]}
                            </td>
                        </tr>
                    )
                })
            )
        }

        return (
            <div>
                <h2>Print and Play Scoring</h2>
                <div className={classes.PnpScoring}>
                    <table className={classes.ScoringTable}><tbody>
                        {scoringRows}
                    </tbody></table>
                </div>
            </div>
        );
    }
}

export default PnpScoring