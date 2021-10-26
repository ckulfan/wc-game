import React, { Component } from 'react';
import classes from './Group.module.css';
import TieControl from './TieControl';

class Group extends Component {
    tieControl = (index, upArrow) => {
        let localTiedWith = null;
        if (this.props.thirdGroup)
            localTiedWith = this.props.group.teams[index].thirdTiedWith;
        else
            localTiedWith = this.props.group.teams[index].tiedWith;
        if (localTiedWith.length === 0) {
            return <TieControl arrow="none" />
        }
        else {
            let canMoveUp = false;
            let canMoveDown = false;
            for (const i of localTiedWith) {
                if (i < index)
                    canMoveUp = true;
                if (i > index)
                    canMoveDown = true;
            }

            if (upArrow) {
                if (canMoveUp)
                    return <TieControl
                        arrow="up"
                        arrowClicked = {this.props.arrowClicked}
                        group = {this.props.group}
                        teamIndex = {index}
                    />;
                else
                    return <TieControl arrow="none" />;
            } else {
                if (canMoveDown)
                    return <TieControl
                        arrow="down"
                        group = {this.props.group}
                        teamIndex = {index}
                        arrowClicked = {this.props.arrowClicked}
                    />;
        else
                    return <TieControl arrow="none" />;
            }

        }
    }

    render() {
        let fixtureRows = null
        if (this.props.renderFixtures) {
            fixtureRows = this.props.group.games.map((game, index) => {
                let team1Goals = 0;
                let team2Goals = 0;

                team1Goals = Number.parseInt(game[1][0]);
                if (Number.isNaN(team1Goals))
                    team1Goals = 0;

                team2Goals = Number.parseInt(game[1][1]);
                if (Number.isNaN(team2Goals))
                    team2Goals = 0;

                let team1Class = classes.Normal;
                let team2Class = classes.Normal;
                if (team1Goals > team2Goals)
                    team1Class = classes.Winner;
                if (team2Goals > team1Goals)
                    team2Class = classes.Winner;

                let color1Item = classes.BlackItem;
                if (this.props.teamsDB[game[0][0]].originalRanking !== "") {
                    switch (this.props.teamsDB[game[0][0]].originalRanking) {
                        case "Black":
                            color1Item = classes.BlackItem;
                            break;

                        case "Red":
                            color1Item = classes.RedItem;
                            break;

                        case "Blue":
                            color1Item = classes.BlueItem;
                            break;

                        case "Green":
                            color1Item = classes.GreenItem;
                            break;

                        case "Yellow":
                            color1Item = classes.YellowItem;
                            break;

                        case "Gray":
                            color1Item = classes.GrayItem;
                            break;

                        default:
                            color1Item = classes.BlackItem;
                            break;
                    }
                }

                let color2Item = classes.BlackItem;
                if (this.props.teamsDB[game[0][1]].originalRanking !== "") {
                    switch (this.props.teamsDB[game[0][1]].originalRanking) {
                        case "Black":
                            color2Item = classes.BlackItem;
                            break;

                        case "Red":
                            color2Item = classes.RedItem;
                            break;

                        case "Blue":
                            color2Item = classes.BlueItem;
                            break;

                        case "Green":
                            color2Item = classes.GreenItem;
                            break;

                        case "Yellow":
                            color2Item = classes.YellowItem;
                            break;

                        case "Gray":
                            color2Item = classes.GrayItem;
                            break;

                        default:
                            color2Item = classes.BlackItem;
                            break;
                    }
                }

                return (
                    <tr key={game[0][0] + game[0][1]}>
                        <td className={classes.GameLeftTeamName}>
                            <span className={team1Class + " " + color1Item}>{this.props.teamsDB[game[0][0]].name}</span>
                        </td>
                        <td className={classes.GameScore}>
                            {
                                game[1][0] == null ?
                                    <input
                                        className={classes.LeftScoreInput}
                                        type="text"
                                        pattern="^[0-9]*$"
                                        onChange={(event) => this.props.changed(event, [this.props.groupName,index,0])}
                                        value="" /> :
                                    <input
                                        className={classes.LeftScoreInput}
                                        type="text"
                                        pattern="^[0-9]*$"
                                        onChange={(event) => this.props.changed(event, [this.props.groupName,index,0])}
                                        value={game[1][0]} />
                            }
                        </td>
                        <td className={classes.ScoreDivider}>-</td>
                        <td className={classes.GameScore}>
                        {
                                game[1][1] == null ?
                                    <input
                                        className={classes.LeftScoreInput}
                                        type="text"
                                        pattern="^[0-9]*$"
                                        onChange={(event) => this.props.changed(event, [this.props.groupName,index,1])}
                                        value="" /> :
                                    <input
                                        className={classes.LeftScoreInput}
                                        type="text"
                                        pattern="^[0-9]*$"
                                        onChange={(event) => this.props.changed(event, [this.props.groupName,index,1])}
                                        value={game[1][1]} />
                            }
                        </td>
                        <td className={classes.GameRightTeamName}>
                            <span className={team2Class + " " + color2Item}>{this.props.teamsDB[game[0][1]].name}</span>
                        </td>
                    </tr>
                )
            });
        }

        let groupDisplay = null;
        if (!this.props.editing) {
            let teamRows = this.props.group.teams.map((team, index) => {
                let teamNameTD = null;

                let color1Item = classes.BlackItem;
                if (this.props.teamsDB[team.id].originalRanking !== "") {
                    switch (this.props.teamsDB[team.id].originalRanking) {
                        case "Black":
                            color1Item = classes.BlackItem;
                            break;

                        case "Red":
                            color1Item = classes.RedItem;
                            break;

                        case "Blue":
                            color1Item = classes.BlueItem;
                            break;

                        case "Green":
                            color1Item = classes.GreenItem;
                            break;

                        case "Yellow":
                            color1Item = classes.YellowItem;
                            break;

                        case "Gray":
                            color1Item = classes.GrayItem;
                            break;

                        default:
                            color1Item = classes.BlackItem;
                            break;
                    }
                }

                if (this.props.thirdGroup) {
                    teamNameTD = <td
                        className={classes.ThirdTeamName + " " + color1Item}
                        >{this.props.teamsDB[team.id].name}</td>
        } else {
                    teamNameTD = <td
                        className={classes.TeamName + " " + color1Item}
                        title="Click to edit team inforamtion."
                        onClick={(event) => this.props.teamClicked(event, [this.props.groupName, index])}
                        >{this.props.teamsDB[team.id].name}</td>
        }

                return (
                    <tr key={team.id}>
                        {/* <td className={classes.TeamName}>{team.name} {team.tibreakers.join(",")} {team.tiedWith.join(",")}</td> */}
                        <td className={classes.OwnerData} title="Print and Play team ranking.">{this.props.teamsDB[team.id].pnpRanking}</td>
                        {teamNameTD}
                        <td className={classes.TieControl}>
                            {this.tieControl(index, true)}
                        </td>
                        <td className={classes.TieControl}>
                            {this.tieControl(index, false)}
                        </td>
                        <td className={classes.OwnerData} title="Team owner.">{this.props.teamsDB[team.id].owner}</td>
                        <td className={classes.Number}>{team.wins}</td>
                        <td className={classes.Number}>{team.loses}</td>
                        <td className={classes.Number}>{team.ties}</td>
                        <td className={classes.Number}>{team.gf}</td>
                        <td className={classes.Number}>{team.ga}</td>
                        <td className={classes.Number}>{team.gf - team.ga}</td>
                        <td className={classes.Number}>{(team.wins * 3) + (team.ties)}</td>
                    </tr>
                )
            });

            groupDisplay = <table className = {classes.Table}><tbody>
                <tr className = {classes.GroupHeading}>
                    <td></td>
                    <td className = {classes.GroupHeadingTeam}>Team</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>W</td>
                    <td>L</td>
                    <td>T</td>
                    <td>GF</td>
                    <td>GA</td>
                    <td>GD</td>
                    <td>Pts</td>
                </tr>
                {teamRows}
            </tbody></table>
        } else {
            groupDisplay = <div className={classes.EditingArea}>
                <p className={classes.Label}>Team: </p>
                <input
                    className={classes.TeamInput}
                    type="text"
                    onChange={(event) =>
                        this.props.teamNameChanged(event, [this.props.groupName,this.props.editingTeamIndex])}
                    value={this.props.teamsDB[this.props.group.teams[this.props.editingTeamIndex].id].name}
                />
                <p className={classes.EditLineBreak}></p>
                <p className={classes.Label}>Owner: </p>
                <input
                    className={classes.TeamInput}
                    type="text"
                    title="Edit multiple teams simultaneously to change the owners for all of them."
                    onChange={(event) =>
                        this.props.ownerNameChanged(event, [this.props.groupName,this.props.editingTeamIndex])}
                    value={this.props.teamsDB[this.props.group.teams[this.props.editingTeamIndex].id].owner}
                />
                <p></p>
                <p className={classes.SelectLineBread}></p>
                <p className={classes.Label}>Original Game Rating: </p>
                <select
                    className={classes.selectcss}
                    value={this.props.teamsDB[this.props.group.teams[this.props.editingTeamIndex].id].originalRanking}
                    onChange={(event) =>
                        this.props.originalRankingChanged(event, [this.props.groupName,this.props.editingTeamIndex])}
                >
                    <option value=""></option>
                    <option className={classes.BlackItem}value="Black">Black</option>
                    <option className={classes.RedItem} value="Red">Red</option>
                    <option className={classes.BlueItem} value="Blue">Blue</option>
                    <option className={classes.GreenItem} value="Green">Green</option>
                    <option className={classes.YellowItem} value="Yellow">Yellow</option>
                    <option className={classes.GrayItem} value="Gray">Gray</option>
                </select>
                <p className={classes.SelectLineBread}></p>
                <p className={classes.Label}>PnP Game Rating: </p>
                <select
                    className={classes.selectcss}
                    value={this.props.teamsDB[this.props.group.teams[this.props.editingTeamIndex].id].pnpRanking}
                    onChange={(event) =>
                        this.props.pnpRankingChanged(event, [this.props.groupName,this.props.editingTeamIndex])}
                >
                    <option value=""></option>
                    <option value="4A">4A</option>
                    <option value="4B">4B</option>
                    <option value="4C">4C</option>
                    <option value="4D">4D</option>
                    <option value="4E">4E</option>
                    <option value="4F">4F</option>
                    <option value="3A">3A</option>
                    <option value="3B">3B</option>
                    <option value="3C">3C</option>
                    <option value="3D">3D</option>
                    <option value="3E">3E</option>
                    <option value="3F">3F</option>
                    <option value="2A">2A</option>
                    <option value="2B">2B</option>
                    <option value="2C">2C</option>
                    <option value="2D">2D</option>
                    <option value="2E">2E</option>
                    <option value="2F">2F</option>
                </select>
                <p></p>
                <button onClick={(event) =>
                    this.props.doneEditing(event, this.props.groupName)}>Done</button>
            </div>
        }

        let groupStyle = this.props.renderFixtures ? classes.Group : classes.NarrowGroup;
        let groupTableStyle = this.props.renderFixtures ? classes.GroupTable : classes.NarrowGroupTable;

        return (
            <div className = {groupStyle}>
                <div className = {groupTableStyle}>
                    <p className = {classes.GroupName}>{this.props.group.name}</p>
                    {groupDisplay}
                </div>
                {
                    this.props.renderFixtures ?
                        <div className={classes.Fixtures}>
                            <table className = {classes.FixtureTable}><tbody>
                                {fixtureRows}
                            </tbody></table>
                        </div> :
                        <div></div>
                }
            </div>
        )
    }
}

export default Group;
