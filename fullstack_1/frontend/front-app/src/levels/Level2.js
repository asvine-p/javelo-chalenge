import React from 'react';
import OBJECTIVES from "../data.json";
import {convertToThree} from "../utils/utils";
import ObjectiveThreeChart from "../components/ObjectiveThreeChart/ObjectiveThreeChart";
const ObjectivesThreeArray = convertToThree(OBJECTIVES);

const Level2 = () => (
    <div>
        <ObjectiveThreeChart
            data={ObjectivesThreeArray}/>
    </div>
);


export default Level2;
