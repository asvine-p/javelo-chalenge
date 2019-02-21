const data = require("./data/input");
const {getObjectivesByRecord, getProgressPercentage, writeToFile, getDiffBetweenTwoDates} = require("../utils");


const getNeededProgressPercentByDay = (nbDays, objective) => {
    if (objective.target > objective.start)
        return ((objective.target / nbDays)) * ((1/ objective.target) * 100);
    else
        return ((objective.start / nbDays)) * ((1/ objective.start) * 100)

};

const getDiffUserProgressFromObjective = (progress, nbDays, dayProgress) => {
    const progressToAchieve     =  nbDays * dayProgress;
    const diffProgressPercent   =  ((progress - progressToAchieve) / progressToAchieve) * 100;
    return diffProgressPercent
};

const getExessProgressRecords = () => {
    const progressRecord = data.progress_records.map(progress => {
        const objective = getObjectivesByRecord(data, progress.objective_id);
        const diffTotalDate  = getDiffBetweenTwoDates(objective.start_date, objective.end_date);
        const diffDateFromProgress = getDiffBetweenTwoDates(objective.start_date, progress.date);
        const needProgressPerDay = getNeededProgressPercentByDay(diffTotalDate, objective);
        const userProgress = getProgressPercentage(objective, progress);
        const diffUserProgress = getDiffUserProgressFromObjective(userProgress, diffDateFromProgress, needProgressPerDay);
        return {
            id: progress.id,
            excess: Math.round(diffUserProgress),
        }
    });
    writeToFile(progressRecord, "./data/output.json");
};

getExessProgressRecords();
