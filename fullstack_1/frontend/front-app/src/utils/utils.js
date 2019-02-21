export const TODAY = "2018-02-20";

export const transformObjectiveToDateValue = (objective) => {
    const data = [];
    data.push({
        date: objective.start_date,
        value: objective.start
    }, {
        date:  TODAY,
        value: objective.current
    }, {
        date: objective.end_date,
        value: objective.target
    });
    return data;
};




export const addObjectiveInParent = (childObjective, objectives) => {
    objectives.forEach(item => {
        item.name = item.title;
        if (item.id === childObjective.parent_id) {
            // THIS IS FOR D3 DATA SOURCE NAMING
            childObjective.name = childObjective.title;
            if (!item.hasOwnProperty("children"))
                item.children = [childObjective];
            else
                item.children.push(childObjective);
        }
        else if (item.hasOwnProperty("children"))
            addObjectiveInParent(childObjective, item.children);

    });
};


export const convertToThree = (objectives) => {
    let threeArray = [];
    const sortedObjectives = objectives.sort((a, b) => a.parent_id - b.parent_id);
    sortedObjectives.forEach(objective => {
        if (!objective.hasOwnProperty("parent_id"))
            threeArray.push(objective);
        else
            addObjectiveInParent(objective, threeArray);
    });
    return threeArray;
};

