const data  = require("./data/input");
const {getObjectivesByRecord, getProgressPercentage, writeToFile} = require("../utils");

const getUserProgressPercentage = () => {
    const progressRecord = data.progress_records.map(progress => {
        const objective = getObjectivesByRecord(data, progress.objective_id);
        return {
            id: progress.id,
            progress: Math.ceil(getProgressPercentage(objective, progress))
        }
    });
    writeToFile(progressRecord, "./data/output.js")

};



getUserProgressPercentage();
