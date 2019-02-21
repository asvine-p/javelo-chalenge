const data = require("./data/input");
const {getObjectivesByRecord, getProgressPercentage, writeToFile, getDiffBetweenTwoDates, getMilestoneArrayByObjectiveId} = require("../utils");

const getAllDatesForObjective = (objective, progress, milestones) => {
    let dates = [
        {date: objective.start_date, value: objective.start},
        {date: objective.end_date, value: objective.target},
        {date: progress.date, value: progress.value}];
    milestones.forEach(milestone => {
        dates.push({date:milestone.date, value: milestone.target})
    });
    dates.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    });
    return dates;
};
const getExessProgressByMilestone = () => {
    let progress_records = data.progress_records.map(progress => {
        const objective                     = getObjectivesByRecord(data, progress.objective_id);
        const milestones                    = getMilestoneArrayByObjectiveId(data,objective.id);
        const allDates                      = getAllDatesForObjective(objective, progress, milestones);

        const progressIndex                 = allDates.findIndex(date => date.date === progress.date);
        const start_date                    = allDates[progressIndex -1].date;
        const end_date                      = allDates[progressIndex + 1].date;
        const progress_date                 = progress.date;
        const diffMilestoneDate             = getDiffBetweenTwoDates(start_date, end_date);
        const milestone1ProgressPercent     = getProgressPercentage(objective, allDates[progressIndex -1]);
        const milestone2ProgressPercent     = getProgressPercentage(objective, allDates[progressIndex +1]);
        const userProgressPercentage        = getProgressPercentage(objective, allDates[progressIndex]);
        const theoricPercentByDay           = (milestone2ProgressPercent - milestone1ProgressPercent) /diffMilestoneDate;
        const userTargetPercentage          = milestone1ProgressPercent + theoricPercentByDay * (getDiffBetweenTwoDates(start_date, progress_date));
        const exess                         = Math.round(((userProgressPercentage - userTargetPercentage) / userTargetPercentage) * 100); // LA Même que getDiffUserProgressFromObjective

        return {
            id: progress.id,
            excess: exess
        }
    });
    writeToFile(progress_records, "./data/output.json");

};

getExessProgressByMilestone();
