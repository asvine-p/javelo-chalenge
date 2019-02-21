import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { transformObjectiveToDateValue} from "../../utils/utils";
import OBJECTIVES from "../../data";
import ObjectiveChart from "../ObjectiveChart/ObjectiveChart";
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/es/Button/Button";
import {connect} from "react-redux";
import {updateObjectives} from "../../actions/objectiveAction";
const BUTTON_NAME = "Add Randomly";

class ConnectedObjectiveList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedObjectiveIndex: 0,
        }
    }
    handleSelectObjective = (objectiveIndex) => {
        this.setState({
            selectedObjectiveIndex: objectiveIndex
        })
    };

    isSelected = (index) => {
        return (this.state.selectedObjectiveIndex === index)
    };

    getRandomObjectiveIndex = () => {
        return Math.floor((Math.random() * this.props.objectives.length - 1) + 1);
    };


    onClickAddRandomly = () => {
        const randomIndex               = this.getRandomObjectiveIndex();
        const objectiveToChange         = this.props.objectives[randomIndex];
        const newObjective              = {...objectiveToChange, current: objectiveToChange.current + 1};
        let newObjectiveArray           = [...this.props.objectives];
        newObjectiveArray[randomIndex]  = newObjective;
        this.props.updateObjectives(newObjectiveArray);
    };

    getCounterNumber = (index) => {
        return this.props.objectives[index].current - OBJECTIVES[index].current
    };

    render() {
        const addButton  = <Button onClick={this.onClickAddRandomly} color="primary">
                                {BUTTON_NAME}
                            </Button>;
        return (
            <div className={"ListContainer"}>
                <List component="nav">
                    {
                        this.props.objectives.map((objective, index )=> {
                            return <ListItem
                                key={objective.id}
                                button
                                selected={this.isSelected(index)}
                                onClick={() => this.handleSelectObjective(index)}>
                                <ListItemText>
                                    {objective.title}
                                    <div>{this.getCounterNumber(index)}</div>

                                </ListItemText>
                            </ListItem>
                        })
                    }
                    {addButton}

                </List>
                <div style={{marginLeft: 30, height: "400px"}}>
                    <ObjectiveChart data={transformObjectiveToDateValue(this.props.objectives[this.state.selectedObjectiveIndex])}/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        objectives: state.objectiveReducer.objectives
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateObjectives: (objectives) => {
            dispatch(updateObjectives(objectives));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedObjectiveList);
