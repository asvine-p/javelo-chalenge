export const objectiveActions = {
    UPDATE_OBJECTIVES: "UPDATE_OBJECTIVES"
};

export const updateObjectives = payload =>{
    return {
        type: objectiveActions.UPDATE_OBJECTIVES,
        payload: payload
    }
};
