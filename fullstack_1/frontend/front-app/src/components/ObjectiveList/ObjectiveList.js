import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { transformObjectiveToDateValue} from "../../utils/utils";
import OBJECTIVES from "../../data";
import ObjectiveChart from "../ObjectiveChart/ObjectiveChart";
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/es/Button/Button";
import { withStyles } from '@material-ui/core/styles';
const ADD_LABEL = "Add to current objective";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class ObjectiveList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objectives: [...OBJECTIVES],
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

    setObjective = newObjective => {
        const newObjectives = [...this.state.objectives];
        newObjectives[this.state.selectedObjectiveIndex] = newObjective;
        this.setState({
            objectives: newObjectives
        });
    };

    onClickAdd = () => {
        const currentObjective =this.state.objectives[this.state.selectedObjectiveIndex];
        const newObjective = {...currentObjective, current:currentObjective.current + 1};
        this.setObjective(newObjective);
    };

    getCounterNumber = (index) => {
        return this.state.objectives[index].current - OBJECTIVES[index].current
    };

    getCounterButton = (index) => {
        if (this.props.withButton)
            return  <div>{this.getCounterNumber(index)}</div>
    };

    render() {
        const { classes } = this.props;
        const addButton  = (this.props.withButton)
            ?  <Button onClick={this.onClickAdd} color="primary" className={classes.button}>
                {ADD_LABEL}
            </Button>
            : null;
        return (
            <div className={"ListContainer"}>
                <List component="nav">
                    {
                        this.state.objectives.map((objective, index )=> {
                            return <ListItem
                                key={objective.id}
                                button
                                selected={this.isSelected(index)}
                                onClick={() => this.handleSelectObjective(index)}>
                                <ListItemText>
                                    {objective.title}
                                    {this.getCounterButton(index)}
                                </ListItemText>

                            </ListItem>
                        })
                    }
                    {addButton}

                </List>
                <div style={{marginLeft: 30, height: "400px"}}>
                    <ObjectiveChart data={transformObjectiveToDateValue(this.state.objectives[this.state.selectedObjectiveIndex])}/>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(ObjectiveList);
