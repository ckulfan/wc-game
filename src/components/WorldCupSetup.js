import React, { Component } from 'react';
import classes from './WorldCupSetup.module.css';
import deleteImg from '../assets/delete.png';

class WorldCupSetup extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.commentInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.saveWorldCup(event, this.commentInput.current.value);
        this.commentInput.current.value = "";
    }

    render() {
        let saveStorage = localStorage.getItem("saves");

        let saveArray = []
        if (saveStorage !== null) {
            saveArray = JSON.parse(saveStorage);
        }

        const indexedArray = saveArray.map((save, index) => {
            return ([save, index]);
        });

        indexedArray.reverse();

        const savesRows = indexedArray.map(save => {
            let dateString = new Date(save[0].timestamp).toLocaleDateString("en-US")
            let timeString = new Date(save[0].timestamp).toLocaleTimeString("en-US")

            return (
                <tr key={save[0].timestamp}>
                    <td>{save[0].savedState.title}</td>
                    <td>{save[0].comment}</td>
                    <td>{dateString + " " + timeString}</td>
                    <td>
                        <img 
                            src={deleteImg} 
                            alt="Delete this Saved World Cup"
                            title="Delete this Saved World Cup"
                            onClick={(event) => this.props.deleteSave(event, save[1])}
                        />
                    </td>
                   <td>
                       <button onClick={(event) => this.props.loadWorldCup(event, save[1])}>Load</button>
                    </td>
                </tr>
            );
        });

        return (
            <div className={classes.Setup}>
                <h3>World Cup Setup</h3>
                <p>
                    Chosing a setup will erase your current World Cup. &nbsp;
                    <button onClick={this.props.setupCancel}>Exit</button>
                </p>
                <p>
                    Reset the scores of your current World Cup but retain all the team information. &nbsp;
                    <button onClick={this.props.resetCurrentWorldCup}>Reset</button>
                </p>
                <form onSubmit={this.handleSubmit}>
                    <table className={classes.SaveTable}><tbody>
                        <tr>
                            <th colSpan="3">Save your World Cup</th>
                        </tr>    
                        <tr>
                            <th>Title</th>
                            <th>Comment</th>
                        </tr>    
                        <tr>
                        <td>
                                <input 
                                    className={classes.TeamInput}
                                    type="text"
                                    onChange={(event) => 
                                        this.props.worldCupTitleChanged(event)}    
                                    value={this.props.currentState.title} 
                                />
                            </td>
                            <td>
                                <input 
                                    className={classes.CommentInput}
                                    ref={this.commentInput}
                                    type="text"
                                />
                            </td>
                            <td>
                                <input type="submit" value="Save" />
                            </td>
                        </tr>
                    </tbody></table>
                </form>
                <table className={classes.SetupTable}><tbody>
                    <tr>
                        <th colSpan="2">Choose Setup</th>
                    </tr>
                    <tr>
                        <th>Historical</th>
                        <th>Build Your Own</th>
                    </tr>    
                    <tr>
                        <td><button onClick={this.props.setupMens2018}>Men's 2018</button></td>
                        <td><button onClick={this.props.setupGeneric32}>32 Team</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={this.props.setupWomens2019}>Womens 2019</button></td>
                        <td><button onClick={this.props.setupGeneric24}>24 Team</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={this.props.setupWomens2015}>Womens 2015</button></td>
                        <td><button onClick={this.props.setupGeneric16}>16 Team</button></td>
                   </tr>
                   <tr>
                        <td><button onClick={this.props.setupMens2002}>Men's 2002</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={this.props.setupMens1966}>Men's 1966</button></td>
                    </tr>
                </tbody></table>
                <table className={classes.SaveTable}><tbody>
                    <tr>
                        <th colSpan="5">Load a Saved World Cup</th>
                    </tr>
                    {savesRows}
                </tbody></table>
                <hr></hr>
            </div>
        );
    }
}

export default WorldCupSetup;