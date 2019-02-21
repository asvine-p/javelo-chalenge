import OBJECTIVES from "../data.json";
import {objectiveActions} from "../actions/objectiveAction";

const initial_state = {
    objectives: [...OBJECTIVES]
};


const objectiveReducer = (state = initial_state, action) => {
    if (action.type === objectiveActions.UPDATE_OBJECTIVES) {
        return{
            ...state,
            objectives: action.payload
        }
    }
    return state;
};

export default objectiveReducer;
