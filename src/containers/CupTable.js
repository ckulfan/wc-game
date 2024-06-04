import React, { Component } from 'react';
import Aux from '../hoc/Auxiliary';
import Group from '../components/Group';
import KnockoutStage from '../components/KnockoutStage';
import WorldCupSetup from '../components/WorldCupSetup';
import classes from './CupTable.module.css';
import PnpScoring from '../components/PnPScoring';
import Footer from '../components/Footer';
import SimpleStorage from 'react-simple-storage';
import {mens2018Default, womens2019Default, womens2015Default, mens2002Default, mens1966Default, genaric32Default, genaric24Default, genaric16Default } from './defaults';

class CupTable extends Component {
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    defaultState = mens2018Default;

    deepCopy = (obj) => {
        if(typeof obj !== 'object' || obj === null) {
            return obj;
        }

        if(obj instanceof Date) {
            return new Date(obj.getTime());
        }

        if(obj instanceof Array) {
            return obj.reduce((arr, item, i) => {
                arr[i] = this.deepCopy(item);
                return arr;
            }, []);
        }

        if(obj instanceof Object) {
            return Object.keys(obj).reduce((newObj, key) => {
                newObj[key] = this.deepCopy(obj[key]);
                return newObj;
            }, {})
        }
    }

    teamCompare = (a, b) => {
        for (let i = 0; i < a.tibreakers.length - 1; i++) {
            if (a.tibreakers[i] > b.tibreakers[i])
                return -1;
            else if (a.tibreakers[i] < b.tibreakers[i])
                return 1;
        }

        if (a.tibreakers[6] > b.tibreakers[6])
            return 1;
        else if (a.tibreakers[6] < b.tibreakers[6])
            return -1;

        return 0;
    }

    teamThirdsCompare = (a, b) => {
        for (let i = 0; i < a.thirdBreakers.length - 1; i++) {
            if (a.thirdBreakers[i] > b.thirdBreakers[i])
                return -1;
            else if (a.thirdBreakers[i] < b.thirdBreakers[i])
                return 1;
        }

        if (a.thirdBreakers[6] > b.thirdBreakers[6])
            return 1;
        else if (a.thirdBreakers[6] < b.thirdBreakers[6])
            return -1;

        return 0;
    }

    constructThirdsGroup = (stateObj) => {
        const thirdGroup = {name: "Third Place Teams", teams: []};
        for (const group of stateObj.groups) {
            const team = group.teams[2];
            team.thirdBreakers = this.deepCopy(team.tibreakers);
            team.thirdBreakers[3] = 0;
            team.thirdBreakers[4] = 0;
            team.thirdBreakers[5] = 0;
            team.thirdBreakers[6] = 10;
            thirdGroup.teams.push(team);
        }
        thirdGroup.teams = thirdGroup.teams.sort((a, b) => {
            return this.teamThirdsCompare(a, b);
        });

        let fullyTiedTeams = {};
        for (const team of thirdGroup.teams) {
            fullyTiedTeams[team.id] =
                thirdGroup.teams.filter((subTeam) => {
                    if (team.id === subTeam.id)
                        return false;
                    if ((team.tibreakers[0] === subTeam.tibreakers[0]) &&
                        (team.tibreakers[1] === subTeam.tibreakers[1]) &&
                        (team.tibreakers[2] === subTeam.tibreakers[2]))
                        return true;
                    return false;
                });
        }

        for (let [key, value] of Object.entries(fullyTiedTeams)) {
            let teamIndex = thirdGroup.teams.findIndex((team) => {
                return key === team.id;
            });
            let team = thirdGroup.teams[teamIndex];
            team.thirdTiedWith = [];
            if (fullyTiedTeams[key].length > 0) {
                team.thirdTiedWith.push(
                    thirdGroup.teams.findIndex((subTeam) => {
                    return subTeam.id === team.id;
                }))
                for (const subTeam of value) {
                    team.thirdTiedWith.push(
                        thirdGroup.teams.findIndex((subSubTeam) => {
                        return subSubTeam.id === subTeam.id;
                    }))
                }
            }
            team.thirdTiedWith.sort();
        }

        stateObj["thirds"] = thirdGroup;
        return stateObj;
    }

    constructKnockoutStage = (stateObj) => {
        let knockout = null;

        if (stateObj.groups.length === 4) {
            knockout = this.constructKnockoutStage16(stateObj);
        } else if (stateObj.groups.length === 6) {
            knockout = this.constructKnockoutStage24(stateObj);
        } else if (stateObj.groups.length === 8) {
            knockout =  this.constructKnockoutStage32(stateObj);
        } else {
            knockout =  null;
        }

        stateObj["knockout"] = knockout;
    }

    constructKnockoutRounds = () => {
        let knockout = {
            roundOf16: [],
            quarterFinals: [],
            semiFinals: [],
            finals: []
        };

        knockout["quarterFinals"].push({teams:["",""], result:["",""], penalties:["",""]});
        knockout["quarterFinals"].push({teams:["",""], result:["",""], penalties:["",""]});
        knockout["quarterFinals"].push({teams:["",""], result:["",""], penalties:["",""]});
        knockout["quarterFinals"].push({teams:["",""], result:["",""], penalties:["",""]});

        knockout["semiFinals"].push({teams:["",""], result:["",""], penalties:["",""]});
        knockout["semiFinals"].push({teams:["",""], result:["",""], penalties:["",""]});

        knockout["finals"].push({teams:["",""], result:["",""], penalties:["",""]});
        knockout["finals"].push({teams:["",""], result:["",""], penalties:["",""]});

        return knockout;
    }

    constructKnockoutStage16 = (stateObj) => {
        const knockout = this.constructKnockoutRounds();

        knockout["quarterFinals"] = [];

        // Game 1: A1 vs B2
        knockout["quarterFinals"].push({teams:[stateObj.groups[0].teams[0],
            stateObj.groups[1].teams[1]], result:["",""], penalties:["",""]});

        // Game 2: C1 vs D2
        knockout["quarterFinals"].push({teams:[stateObj.groups[2].teams[0],
            stateObj.groups[3].teams[1]], result:["",""], penalties:["",""]});

        // Game 5: B1 vs A2
        knockout["quarterFinals"].push({teams:[stateObj.groups[1].teams[0],
            stateObj.groups[0].teams[1]], result:["",""], penalties:["",""]});

        // Game 6: D1 vs C2
        knockout["quarterFinals"].push({teams:[stateObj.groups[3].teams[0],
            stateObj.groups[2].teams[1]], result:["",""], penalties:["",""]});

        return knockout;
    }

    constructKnockoutStage24 = (stateObj) => {
        const knockout = this.constructKnockoutRounds();

        let thirdTeams = [];
        let thirdGroups = [];

        for (const group of stateObj.groups) {
            for (let i = 0; i < 4; i++) {
                for (const team of group.teams) {
                    if (stateObj.thirds.teams[i].id === team.id) {
                        thirdTeams.push(team);
                        thirdGroups.push(group.name);
                    }
                }
            }
        }

        const thirdGroupsString = thirdGroups.map(groupName => {
            return groupName.slice(-1);
        }).join("");

        let thirdTeam = null;

        // Game 1: 2A vs 2C
        knockout["roundOf16"].push({teams:[stateObj.groups[0].teams[1],
            stateObj.groups[2].teams[1]], result:["",""], penalties:["",""]});

        // Game 2: 1D vs 3B/E/F
        switch (thirdGroupsString) {
            case "ABCD":
                thirdTeam = stateObj.groups[1].teams[2];
                break;

            case "ABCE":
            case "ABDE":
            case "ACDE":
            case "ACEF":
            case "ADEF":
            case "BCDE":
            case "CDEF":
                thirdTeam = stateObj.groups[4].teams[2];
                break;

            case "ABCF":
            case "ABDF":
            case "ABEF":
            case "ACDF":
            case "BCDF":
            case "BCEF":
            case "BDEF":
                thirdTeam = stateObj.groups[5].teams[2];
                break;

            default:
                thirdTeam = null;
        }
        knockout["roundOf16"].push({teams:[stateObj.groups[3].teams[0],
            thirdTeam], result:["",""], penalties:["",""]});

        // Game 3: 1A vs 3CDE
        switch (thirdGroupsString) {
            case "ABCD":
            case "ABCE":
            case "ABCF":
            case "ACDE":
            case "ACDF":
            case "ACEF":
            case "BCDE":
            case "BCDF":
            case "CDEF":
                thirdTeam = stateObj.groups[2].teams[2];
                break;

            case "ABDE":
            case "ABDF":
            case "ADEF":
                thirdTeam = stateObj.groups[3].teams[2];
                break;

            case "ABEF":
            case "BCEF":
            case "BDEF":
                thirdTeam = stateObj.groups[4].teams[2];
                break;

            default:
                thirdTeam = null;
        }
        knockout["roundOf16"].push({teams:[stateObj.groups[0].teams[0],
            thirdTeam], result:["",""], penalties:["",""]});

        // Game 4: 1F vs 2B
         knockout["roundOf16"].push({teams:[stateObj.groups[5].teams[0],
            stateObj.groups[1].teams[1]], result:["",""], penalties:["",""]});

        // Game 5: 1B vs 3A/C/D
        switch (thirdGroupsString) {
            case "ABCE":
            case "ABCF":
            case "ABDE":
            case "ABDF":
            case "ABEF":
            case "ACEF":
            case "ADEF":
                thirdTeam = stateObj.groups[0].teams[2];
                break;

            case "BCEF":
                thirdTeam = stateObj.groups[2].teams[2];
                break;

            case "ABCD":
            case "ACDE":
            case "ACDF":
            case "BCDE":
            case "BCDF":
            case "BDEF":
            case "CDEF":
                thirdTeam = stateObj.groups[3].teams[2];
                break;

            default:
                thirdTeam = null;
        }
        knockout["roundOf16"].push({teams:[stateObj.groups[1].teams[0],
            thirdTeam], result:["",""], penalties:["",""]});

        // Game 6: 2E vs 2F
        knockout["roundOf16"].push({teams:[stateObj.groups[4].teams[1],
            stateObj.groups[5].teams[1]], result:["",""], penalties:["",""]});

        // Game 7: 1C vs 3A/B/F
        switch (thirdGroupsString) {
            case "ABCD":
            case "ACDE":
            case "ACDF":
                thirdTeam = stateObj.groups[0].teams[2];
                break;

            case "ABCE":
            case "ABCF":
            case "ABDE":
            case "ABDF":
            case "ABEF":
            case "BCDE":
            case "BCDF":
            case "BCEF":
            case "BDEF":
                thirdTeam = stateObj.groups[1].teams[2];
                break;

            case "ACEF":
            case "ADEF":
            case "CDEF":
                thirdTeam = stateObj.groups[5].teams[2];
                break;

            default:
                thirdTeam = null;
        }
        knockout["roundOf16"].push({teams:[stateObj.groups[2].teams[0],
            thirdTeam], result:["",""], penalties:["",""]});

        // Game 8: 1E vs 2D
        knockout["roundOf16"].push({teams:[stateObj.groups[4].teams[0],
            stateObj.groups[3].teams[1]], result:["",""], penalties:["",""]});

        return knockout;
    }

    constructKnockoutStage32 = (stateObj) => {
        const knockout = this.constructKnockoutRounds();

        // Game 1: A1 vs B2
        knockout["roundOf16"].push({teams:[stateObj.groups[0].teams[0],
            stateObj.groups[1].teams[1]], result:["",""], penalties:["",""]});

        // Game 2: C1 vs D2
        knockout["roundOf16"].push({teams:[stateObj.groups[2].teams[0],
            stateObj.groups[3].teams[1]], result:["",""], penalties:["",""]});

        // Game 3: E1 vs F2
        knockout["roundOf16"].push({teams:[stateObj.groups[4].teams[0],
            stateObj.groups[5].teams[1]], result:["",""], penalties:["",""]});

        // Game 4: G1 vs H2
        knockout["roundOf16"].push({teams:[stateObj.groups[6].teams[0],
            stateObj.groups[7].teams[1]], result:["",""], penalties:["",""]});

        // Game 5: B1 vs A2
        knockout["roundOf16"].push({teams:[stateObj.groups[1].teams[0],
            stateObj.groups[0].teams[1]], result:["",""], penalties:["",""]});

        // Game 6: D1 vs C2
        knockout["roundOf16"].push({teams:[stateObj.groups[3].teams[0],
            stateObj.groups[2].teams[1]], result:["",""], penalties:["",""]});

        // Game 7: F1 vs E2
        knockout["roundOf16"].push({teams:[stateObj.groups[5].teams[0],
            stateObj.groups[4].teams[1]], result:["",""], penalties:["",""]});

        // Game 8: H1 vs G2
        knockout["roundOf16"].push({teams:[stateObj.groups[7].teams[0],
            stateObj.groups[6].teams[1]], result:["",""], penalties:["",""]});

        return knockout;
    }

    state = this.deepCopy(this.constructThirdsGroup(this.defaultState));

    showSetup = () => {
        this.setState({showSetup: true});
    }

    setupCancel = () => {
        this.setState({showSetup: false});
    }

    setupMens2018 = () => {
        this.defaultState = mens2018Default;
        this.setState(this.defaultState);
    }

    setupMens2002 = () => {
        this.defaultState = mens2002Default;
        this.setState(this.defaultState);
    }

    setupMens1966 = () => {
        this.defaultState = mens1966Default;
        this.setState(this.defaultState);
    }

    setupWomens2019 = () => {
        this.defaultState = womens2019Default;
        this.setState(this.constructThirdsGroup(this.defaultState));
    }

    setupWomens2015 = () => {
        this.defaultState = womens2015Default;
        this.setState(this.constructThirdsGroup(this.defaultState));
    }

    setupGeneric32 = () => {
        this.defaultState = genaric32Default;
        this.setState(this.defaultState);
    }

    setupGeneric24 = () => {
        this.defaultState = genaric24Default;
        this.setState(this.constructThirdsGroup(this.defaultState));
    }

    setupGeneric16 = () => {
        this.defaultState = genaric16Default;
        this.setState(this.defaultState);
    }

    resetCurrentWorldCup = () => {
        let stateCopy = this.deepCopy(this.state);
        stateCopy.knockout = {};
        for (const [index, group] of stateCopy.groups.entries()) {
            for (const game of group.games) {
                game[1] = ["",""];
            }
            this.updateTeamsFromGames(stateCopy, index);
        }

        stateCopy.showSetup = false;
        stateCopy.teamEditing = [];

        this.setState(this.constructThirdsGroup(stateCopy));
    }

    resetToDefaultState = () => {
        this.setState(this.constructThirdsGroup(this.defaultState));
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({teamEditing: [], showSetup: false});

        }
    }

    componentDidMount() {
        // clearStorage();
        // this.resetToDefaultState();

        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    updateTeamsInGroupFromGames = (group) => {
        for (const game of group.games) {
            for (const team of group.teams) {
                if (team.id === game[0][0]) {
                    if (game[1][0] !== "") {
                        team.gf += parseInt(game[1][0]);
                        team.tibreakers[1] += parseInt(game[1][0]);
                        team.tibreakers[2] += parseInt(game[1][0]);
                    }
                    if (game[1][1] !== "") {
                        team.tibreakers[1] -= parseInt(game[1][1]);
                        team.ga = team.ga + parseInt(game[1][1]);
                    }
                    if ((game[1][0] !== "") && (game[1][1] !== "")) {
                        let gf = parseInt(game[1][0]);
                        let ga = parseInt(game[1][1]);
                        if (gf > ga) {
                            team.tibreakers[0] += 3;
                            team.wins += 1;
                        } else if (gf < ga) {
                            team.loses += 1;
                        } else {
                            team.tibreakers[0] += 1
                            team.ties += 1;
                        }
                    }
                } else if (team.id === game[0][1]) {
                    if (game[1][1] !== "") {
                        team.gf += parseInt(game[1][1]);
                        team.tibreakers[1] += parseInt(game[1][1]);
                        team.tibreakers[2] += parseInt(game[1][1]);
                    }
                    if (game[1][0] !== "") {
                        team.tibreakers[1] -= parseInt(game[1][0]);
                        team.ga += parseInt(game[1][0]);
                    }
                    if ((game[1][0] !== "") && (game[1][1] !== "")) {
                        let gf = parseInt(game[1][1]);
                        let ga = parseInt(game[1][0]);
                        if (gf > ga) {
                            team.tibreakers[0] += 3;
                            team.wins += 1;
                        } else if (gf < ga) {
                            team.loses += 1;
                        } else {
                            team.tibreakers[0] += 1;
                            team.ties += 1;
                        }
                    }
                }
            }
        }
        return(group);
    }

    updateTeamsFromGames = (stateCopy, groupIndex) => {
        stateCopy.groups[groupIndex].teams =
            this.deepCopy(this.defaultState.groups[groupIndex].teams);

        stateCopy.groups[groupIndex] = this.updateTeamsInGroupFromGames(stateCopy.groups[groupIndex]);
        stateCopy.groups[groupIndex].teams =
            stateCopy.groups[groupIndex].teams.sort((a, b) => {
                return this.teamCompare(a, b);
            });

        let tiedTeams = {};
        for (const team of stateCopy.groups[groupIndex].teams) {
            tiedTeams[team.id] =
                stateCopy.groups[groupIndex].teams.filter((subTeam) => {
                    if (team.id === subTeam.id)
                        return false;
                    if ((team.tibreakers[0] === subTeam.tibreakers[0]) &&
                        (team.tibreakers[1] === subTeam.tibreakers[1]) &&
                        (team.tibreakers[2] === subTeam.tibreakers[2]))
                        return true;
                    return false;
                });
        }

        const newTiedTeams = this.deepCopy(tiedTeams);
        for (const team of stateCopy.groups[groupIndex].teams) {
            if (newTiedTeams.hasOwnProperty(team.id)) {
                for (const subTeam of newTiedTeams[team.id]) {
                    delete newTiedTeams[subTeam.id];
                }
            }
        }

        tiedTeams = newTiedTeams;

        for (let [key, value] of Object.entries(tiedTeams)) {
            if (value.length > 0) {
                let tieGroup = this.constructTiebreakerGroup(stateCopy.groups[groupIndex], key, value);
                tieGroup = this.updateTeamsInGroupFromGames(tieGroup);

                for (const subTeam of stateCopy.groups[groupIndex].teams) {
                    for (const subSubTeam of tieGroup.teams) {
                        if (subTeam.id === subSubTeam.id) {
                            subTeam.tibreakers[3] = subSubTeam.tibreakers[0];
                            subTeam.tibreakers[4] = subSubTeam.tibreakers[1];
                            subTeam.tibreakers[5] = subSubTeam.tibreakers[2];
                        }
                    }
                }
            }
        }

        stateCopy.groups[groupIndex].teams =
            stateCopy.groups[groupIndex].teams.sort((a, b) => {
                return this.teamCompare(a, b);
        });

        let fullyTiedTeams = {};
        for (const team of stateCopy.groups[groupIndex].teams) {
            fullyTiedTeams[team.id] =
                stateCopy.groups[groupIndex].teams.filter((subTeam) => {
                    if (team.id === subTeam.id)
                        return false;
                    if ((team.tibreakers[0] === subTeam.tibreakers[0]) &&
                        (team.tibreakers[1] === subTeam.tibreakers[1]) &&
                        (team.tibreakers[2] === subTeam.tibreakers[2]) &&
                        (team.tibreakers[3] === subTeam.tibreakers[3]) &&
                        (team.tibreakers[4] === subTeam.tibreakers[4]) &&
                        (team.tibreakers[5] === subTeam.tibreakers[5]))
                        return true;
                    return false;
                });
        }

        for (let [key, value] of Object.entries(fullyTiedTeams)) {
            let teamIndex = stateCopy.groups[groupIndex].teams.findIndex((team) => {
                return key === team.id;
            });
            let team = stateCopy.groups[groupIndex].teams[teamIndex];
            if (fullyTiedTeams[key].length > 0) {
                team.tiedWith.push(
                    stateCopy.groups[groupIndex].teams.findIndex((subTeam) => {
                    return subTeam.id === team.id;
                }))
                for (const subTeam of value) {
                    team.tiedWith.push(
                        stateCopy.groups[groupIndex].teams.findIndex((subSubTeam) => {
                        return subSubTeam.id === subTeam.id;
                    }))
                }
            }
            team.tiedWith.sort();
        }
    }

    calculateKnockoutFixture = (currentRound, nextRound, index) => {
        let fixture = currentRound[index];
        let nextRoundIndex = Math.floor(index / 2);
        let nextRoundGameIndex = index % 2;

        if (fixture.result[0] === "" && fixture.result[1] === "") {
            nextRound[nextRoundIndex].teams[nextRoundGameIndex] = ""
            nextRound[nextRoundIndex].result[nextRoundGameIndex] = ""
            nextRound[nextRoundIndex].penalties[nextRoundGameIndex] = ""
        }
        else {
            let team1Goals = 0;
            let team2Goals = 0;
            if (fixture.result[0] !== "") {
                let parsed = Number.parseInt(fixture.result[0]);
                if (!Number.isNaN(parsed))
                    team1Goals = parsed;
            }
            if (fixture.result[1] !== "") {
                let parsed = Number.parseInt(fixture.result[1]);
                if (!Number.isNaN(parsed))
                    team2Goals = parsed;
            }

            if (team1Goals > team2Goals) {
                nextRound[nextRoundIndex].teams[nextRoundGameIndex] =
                    fixture.teams[0]
            }
            else if (team2Goals > team1Goals) {
                nextRound[nextRoundIndex].teams[nextRoundGameIndex] =
                    fixture.teams[1]
            }
            else {
                let team1Penalties = 0;
                let team2Penalties = 0;
                if (fixture.penalties[0] !== "") {
                    let parsed = Number.parseInt(fixture.penalties[0]);
                    if (!Number.isNaN(parsed))
                        team1Penalties = parsed;
                }
                if (fixture.penalties[1] !== "") {
                    let parsed = Number.parseInt(fixture.penalties[1]);
                    if (!Number.isNaN(parsed))
                        team2Penalties = parsed;
                }

                if (team1Penalties > team2Penalties) {
                    nextRound[nextRoundIndex].teams[nextRoundGameIndex] =
                        fixture.teams[0]
                }
                else if (team2Penalties > team1Penalties) {
                    nextRound[nextRoundIndex].teams[nextRoundGameIndex] =
                        fixture.teams[1]
                }
                else {
                    nextRound[nextRoundIndex].teams[nextRoundGameIndex] = ""
                    nextRound[nextRoundIndex].result[nextRoundGameIndex] = ""
                    nextRound[nextRoundIndex].penalties[nextRoundGameIndex] = ""
                }
            }
        }
    }

    updateKnockoutStage = (stateCopy) => {
        if (stateCopy.knockout.roundOf16.length > 0) {
            for (let i = 0; i < 8; i++) {
                this.calculateKnockoutFixture(stateCopy.knockout.roundOf16,
                    stateCopy.knockout.quarterFinals, i);
            }
        }

        for (let i = 0; i < 4; i++) {
            this.calculateKnockoutFixture(stateCopy.knockout.quarterFinals,
                stateCopy.knockout.semiFinals, i);
        }

        for (let i = 0; i < 2; i++) {
            let fixture = stateCopy.knockout.semiFinals[i];
            if (fixture.result[0] === "" && fixture.result[1] === "") {
                stateCopy.knockout.finals[0].teams[i] = ""
                stateCopy.knockout.finals[0].result[i] = ""
                stateCopy.knockout.finals[0].penalties[i] = ""

                stateCopy.knockout.finals[1].teams[i] = ""
                stateCopy.knockout.finals[1].result[i] = ""
                stateCopy.knockout.finals[1].penalties[i] = ""
            }
            else {
                let team1Goals = 0;
                let team2Goals = 0;

                if (fixture.result[0] !== "") {
                    let parsed = Number.parseInt(fixture.result[0]);
                    if (!Number.isNaN(parsed))
                        team1Goals = parsed;
                }
                if (fixture.result[1] !== "") {
                    let parsed = Number.parseInt(fixture.result[1]);
                    if (!Number.isNaN(parsed))
                        team2Goals = parsed;
                }

                if (team1Goals > team2Goals) {
                    stateCopy.knockout.finals[0].teams[i] =
                        fixture.teams[0]
                    stateCopy.knockout.finals[1].teams[i] =
                        fixture.teams[1]
                }
                else if (team2Goals > team1Goals) {
                    stateCopy.knockout.finals[0].teams[i] =
                        fixture.teams[1]
                    stateCopy.knockout.finals[1].teams[i] =
                        fixture.teams[0]
                } else {
                    let team1Penalties = 0;
                    let team2Penalties = 0;
                    if (fixture.penalties[0] !== "") {
                        let parsed = Number.parseInt(fixture.penalties[0]);
                        if (!Number.isNaN(parsed))
                            team1Penalties = parsed;
                    }
                    if (fixture.penalties[1] !== "") {
                        let parsed = Number.parseInt(fixture.penalties[1]);
                        if (!Number.isNaN(parsed))
                            team2Penalties = parsed;
                    }

                    if (team1Penalties > team2Penalties) {
                        stateCopy.knockout.finals[0].teams[i] =
                            fixture.teams[0]
                        stateCopy.knockout.finals[1].teams[i] =
                            fixture.teams[1]
                    }
                    else if (team2Penalties > team1Penalties) {
                        stateCopy.knockout.finals[0].teams[i] =
                            fixture.teams[1]
                        stateCopy.knockout.finals[1].teams[i] =
                            fixture.teams[0]
                    }
                    else {
                        stateCopy.knockout.finals[0].teams[i] = ""
                        stateCopy.knockout.finals[0].result[i] = ""
                        stateCopy.knockout.finals[0].penalties[i] = ""

                        stateCopy.knockout.finals[1].teams[i] = ""
                        stateCopy.knockout.finals[1].result[i] = ""
                        stateCopy.knockout.finals[1].penalties[i] = ""
                    }
                }
            }
        }
    }

    knockoutScoreChangedHandler = (event, id) => {
        let stateCopy = this.deepCopy(this.state);
        if (event.target.validity.valid) {
            stateCopy.knockout[id["round"]][id["gameIndex"]].result[id["teamIndex"]] =
                event.target.value;
            this.updateKnockoutStage(stateCopy);
            this.setState(stateCopy);
        }
    }

    knockoutPenaltyChangedHandler = (event, id) => {
        let stateCopy = this.deepCopy(this.state);
        if (event.target.validity.valid) {
            stateCopy.knockout[id["round"]][id["gameIndex"]].penalties[id["teamIndex"]] =
                event.target.value;
            this.updateKnockoutStage(stateCopy);
            this.setState(stateCopy);
        }
    }

    scoreChangedHandler = (event, id) => {
        const groupIndex = this.state.groups.findIndex(group => {
            return group.name === id[0];
        });

       if (event.target.validity.valid) {
            let stateCopy = this.deepCopy(this.state);
            stateCopy.groups[groupIndex].games[id[1]][1][id[2]] =
                event.target.value;
            this.updateTeamsFromGames(stateCopy, groupIndex);
            this.constructThirdsGroup(stateCopy);
            this.constructKnockoutStage(stateCopy);
            this.setState(stateCopy);
       }
    }

    toggleFixtures = (event) => {
        let stateCopy = this.deepCopy(this.state);
        stateCopy.renderFixtures = !this.state.renderFixtures;
        this.setState(stateCopy);
    }

    tieArrowHandler = (event, [group, teamIndex, upArrow]) => {
        const groupIndex = this.state.groups.findIndex(subGroup => {
            return subGroup.name === group.name;
        });

        let stateCopy = this.deepCopy(this.state);
        for (const i of stateCopy.groups[groupIndex].teams[teamIndex].tiedWith) {
            if (upArrow) {
                if (i === teamIndex - 1)
                    stateCopy.groups[groupIndex].teams[i].tibreakers[6] = teamIndex;
                else if (i === teamIndex)
                    stateCopy.groups[groupIndex].teams[i].tibreakers[6] = teamIndex - 1;
                else
                    stateCopy.groups[groupIndex].teams[i].tibreakers[6] = i;
            } else {
                if (i === teamIndex + 1)
                    stateCopy.groups[groupIndex].teams[i].tibreakers[6] = teamIndex;
                else if (i === teamIndex)
                    stateCopy.groups[groupIndex].teams[i].tibreakers[6] = teamIndex + 1;
                else
                    stateCopy.groups[groupIndex].teams[i].tibreakers[6] = i;
            }
        }
        stateCopy.groups[groupIndex].teams = stateCopy.groups[groupIndex].teams.sort((a, b) => {
            return this.teamCompare(a, b);
        });
        this.constructThirdsGroup(stateCopy);
        this.constructKnockoutStage(stateCopy);
        this.setState(stateCopy);
    };

    thirdTieArrowHandler = (event, [group, teamIndex, upArrow]) => {
        let stateCopy = this.deepCopy(this.state);
        for (const i of stateCopy.thirds.teams[teamIndex].thirdTiedWith) {
            if (upArrow) {
                if (i === teamIndex - 1)
                    stateCopy.thirds.teams[i].thirdBreakers[6] = teamIndex;
                else if (i === teamIndex)
                    stateCopy.thirds.teams[i].thirdBreakers[6] = teamIndex - 1;
                else
                    stateCopy.thirds.teams[i].thirdBreakers[6] = i;
            } else {
                if (i === teamIndex + 1)
                    stateCopy.thirds.teams[i].thirdBreakers[6] = teamIndex;
                else if (i === teamIndex)
                    stateCopy.thirds.teams[i].thirdBreakers[6] = teamIndex + 1;
                else
                    stateCopy.thirds.teams[i].thirdBreakers[6] = i;
            }
        }
        stateCopy.thirds.teams = stateCopy.thirds.teams.sort((a, b) => {
            return this.teamThirdsCompare(a, b);
        });

        this.constructKnockoutStage(stateCopy);
        this.setState(stateCopy);
    };

    constructTiebreakerGroup = (group, teamId, tiedTeams) => {
        let tiebreakerGroup = {name: group.name};
        const teams = [{
            id: teamId,
            wins: 0,
            loses: 0,
            ties: 0,
            gf: 0,
            ga: 0,
            tibreakers: [0,0,0,0,0,0,10]
        }];

        for (const team of tiedTeams) {
            teams.push({
                id: team.id,
                wins: 0,
                loses: 0,
                ties: 0,
                gf: 0,
                ga: 0,
                tibreakers: [0,0,0,0,0,0,10]
            })
        }

        const tiebreakerTeams = {teams: teams};
        tiebreakerGroup = {...tiebreakerGroup, ...tiebreakerTeams};
        const filteredGames = group.games.filter((game) => {
            let homeIn = false;
            let visitorIn = false;

            for (const team of tiebreakerTeams["teams"]) {
                if (team.id === game[0][0])
                    homeIn = true;
                if (team.id === game[0][1])
                    visitorIn = true;
            }

            if (homeIn && visitorIn) {
                return true;
            }

            return false;
        });
        const tiebreakerGames = {games: filteredGames};
        tiebreakerGroup = {...tiebreakerGroup, ...tiebreakerGames};

        return tiebreakerGroup;
    }

    teamClickHandler = (event, [groupName, teamIndex]) => {
        let teamEditing = this.deepCopy(this.state.teamEditing);
        teamEditing.push({groupName: groupName, teamIndex: teamIndex});
        this.setState({teamEditing: teamEditing});
    }

    ownerClickHandler = (event, ownerName) => {
        let teamEditing = [];

        for (const group of this.state.groups) {
            for (const [index, team] of group.teams.entries()) {
                if (this.state.teams[team.id].owner === ownerName) {
                    teamEditing.push({groupName: group.name, teamIndex: index})
                }
            }
        }

        this.setState({teamEditing: teamEditing});
    }

    teamNameChangedHandler = (event, id) => {
        const groupIndex = this.state.groups.findIndex(group => {
            return group.name === id[0];
        });

        let stateCopy = this.deepCopy(this.state);
        let teamId = stateCopy.groups[groupIndex].teams[id[1]].id;
        stateCopy.teams[teamId].name = event.target.value;

        this.setState(stateCopy);
    }

    ownerNameChangedHandler = (event, id) => {
        let stateCopy = this.deepCopy(this.state);
        for (const editing of this.state.teamEditing) {
            let groupIndex = this.state.groups.findIndex(group => {
                return group.name === editing.groupName;
            });
            let teamId = stateCopy.groups[groupIndex].teams[editing.teamIndex].id;
            stateCopy.teams[teamId].owner = event.target.value;
        }

        this.setState(stateCopy);
    }

    originalRankingChangedHandler = (event, id) => {
        const groupIndex = this.state.groups.findIndex(group => {
            return group.name === id[0];
        });

        let stateCopy = this.deepCopy(this.state);
        let teamId = stateCopy.groups[groupIndex].teams[id[1]].id;
        stateCopy.teams[teamId].originalRanking = event.target.value;

        this.setState(stateCopy);
    }

    pnpRankingChangedHandler = (event, id) => {
        const groupIndex = this.state.groups.findIndex(group => {
            return group.name === id[0];
        });

        let stateCopy = this.deepCopy(this.state);
        let teamId = stateCopy.groups[groupIndex].teams[id[1]].id;
        stateCopy.teams[teamId].pnpRanking = event.target.value;

        this.setState(stateCopy);
    }

    worldCupTitleChangedHandler = (event) => {
        let stateCopy = this.deepCopy(this.state);
        stateCopy.title = event.target.value;
        this.setState(stateCopy);
    }

    saveWorldCupHandler = (event, comment) => {
        let saveStorage = localStorage.getItem("saves");

        let saveArray = [];
        if (saveStorage !== null) {
            saveArray = JSON.parse(saveStorage);
        }

        let stateCopy = this.deepCopy(this.state);
        stateCopy.showSetup = false;
        saveArray.push({
            savedState: stateCopy,
            comment: comment,
            timestamp: Date.now()
        });

        localStorage.setItem("saves", JSON.stringify(saveArray));

        this.setState({ state: this.state });
    }

    loadWordCupHandler = (event, saveIndex) => {
        let saveStorage = localStorage.getItem("saves");

        let saveArray = [];
        if (saveStorage !== null) {
            saveArray = JSON.parse(saveStorage);
        }

        if (saveArray.length > saveIndex) {
            this.setState(saveArray[saveIndex].savedState);
        }
    }

    deleteSaveHandler = (event, saveIndex) => {
        let saveStorage = localStorage.getItem("saves");

        let saveArray = [];
        if (saveStorage !== null) {
            saveArray = JSON.parse(saveStorage);
        }

        if (saveArray.length > saveIndex) {
            saveArray.splice(saveIndex, 1);
            localStorage.setItem("saves", JSON.stringify(saveArray));
            this.setState({ state: this.state });
        }
    }

    doneEditingHandler = (event, id) => {
        let newTeamEditing = this.state.teamEditing.filter((editStruct) => {
            return (editStruct.groupName !== id);
        })

        this.setState({teamEditing: newTeamEditing});
    }

    shouldRenderPrintAndPlayScoring = () => {
        if (Object.keys(this.state.knockout).length > 0) {
            for (const teamID of Object.keys(this.state.teams)) {
                if (this.state.teams[teamID].owner !== "")
                    return true;
            }
        }

        return false
    }

    render () {
        const groups = this.state.groups.map(group => {
            const sortedTeams = group.teams.sort((a, b) => {
                return this.teamCompare(a, b);
            });
            const sortedGroup = {
                name: group.name,
                teams: sortedTeams,
                games: group.games
            }

            let editing = false;
            let editingTeamIndex = 0;
            for (const edit of this.state.teamEditing) {
                if (edit.groupName === group.name) {
                    editing = true;
                    editingTeamIndex = edit.teamIndex;
                }
            }

            return <Group
                key={group.name}
                groupName={group.name}
                group={sortedGroup}
                teamsDB={this.state.teams}
                changed={this.scoreChangedHandler}
                arrowClicked={this.tieArrowHandler}
                renderFixtures={this.state.renderFixtures}
                teamClicked = {this.teamClickHandler}
                editing = {editing}
                editingTeamIndex = {editingTeamIndex}
                teamNameChanged = {this.teamNameChangedHandler}
                ownerNameChanged = {this.ownerNameChangedHandler}
                originalRankingChanged = {this.originalRankingChangedHandler}
                pnpRankingChanged = {this.pnpRankingChangedHandler}
                doneEditing = {this.doneEditingHandler}
            />
        });

        let thirdPlaceGroup = null;
        if (this.state.groups.length === 6) {
            thirdPlaceGroup = <Group
                    key={this.state.thirds.name}
                    groupName={this.state.thirds.name}
                    teamsDB={this.state.teams}
                    group={this.state.thirds}
                    arrowClicked={this.thirdTieArrowHandler}
                    thirdGroup="true"
                />
            }

		let groupStandingsClass = this.state.renderFixtures ? classes.GroupStandingsAndScores : classes.GroupStandings;
        return (
            <Aux>
                <SimpleStorage parent={this} />
                <h3>The World Cup Table</h3>
                {this.state.showSetup ?
                    <WorldCupSetup
                        currentState={this.state}
                        setupCancel={this.setupCancel}
                        resetCurrentWorldCup={this.resetCurrentWorldCup}
                        setupMens2018={this.setupMens2018}
                        setupMens2002={this.setupMens2002}
                        setupMens1966={this.setupMens1966}
                        setupWomens2019={this.setupWomens2019}
                        setupWomens2015={this.setupWomens2015}
                        setupGeneric32={this.setupGeneric32}
                        setupGeneric24={this.setupGeneric24}
                        setupGeneric16={this.setupGeneric16}
                        worldCupTitleChanged={this.worldCupTitleChangedHandler}
                        saveWorldCup={this.saveWorldCupHandler}
                        loadWorldCup={this.loadWordCupHandler}
                        deleteSave={this.deleteSaveHandler}
                    /> :
                    <button onClick={this.showSetup}>Setup / Save</button>
                }
                <h1>{this.state.title}</h1>
                <h2>Group Stage</h2>
					<button onClick={(event) => this.toggleFixtures(event)}>Toggle Score Display</button>
                <div className={groupStandingsClass}>
                    {groups}
                </div>
                {thirdPlaceGroup}
                {  Object.keys(this.state.knockout).length > 0
                    ? <KnockoutStage
                        knockout={this.state.knockout}
                        teamsDB={this.state.teams}
                        changed={this.knockoutScoreChangedHandler}
                        changedPenalty={this.knockoutPenaltyChangedHandler} />
                        : <React.Fragment></React.Fragment>
                }
                { this.shouldRenderPrintAndPlayScoring()
                    ? <PnpScoring
                        currentState = {this.state}
                        ownerClicked = {this.ownerClickHandler}
                    />
                    : <React.Fragment></React.Fragment>
                }
                <Footer />
            </Aux>
        );
    }
}

export default CupTable;
