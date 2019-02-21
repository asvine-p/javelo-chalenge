const fs        = require('fs');

function writeToFile (data, path) {

    fs.writeFile(path, JSON.stringify(data), (err) => {
        if(err)
            console.warn(err);
        console.log("The file was saved!");
    });
}

function getObjectivesByRecord(data, objective_id){
    return data.objectives.find(objective =>
        objective.id === objective_id
    );
}


function getProgressPercentage(objective, progressRecord) {
    return  ((progressRecord.value - objective.start) * 100) / (objective.target - objective.start)
}


function getDiffBetweenTwoDates (startDate, endDate)  {
    let dt1 = new Date(startDate);
    let dt2 = new Date(endDate);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24)) ;

}
function getMilestoneArrayByObjectiveId  (data, objectiveID) {
    return data.milestones.filter(milestone => {
        return milestone.objective_id === objectiveID;
    })
};



module.exports = {
    writeToFile: writeToFile,
    getObjectivesByRecord: getObjectivesByRecord,
    getProgressPercentage: getProgressPercentage,
    getDiffBetweenTwoDates: getDiffBetweenTwoDates,
    getMilestoneArrayByObjectiveId: getMilestoneArrayByObjectiveId,
};
