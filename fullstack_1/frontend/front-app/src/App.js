import React, { Component } from 'react';
import './App.css';
import OBJECTIVES from "./data.json";
import TabBar from "./components/TabBar/TabBar";
// You're on the good file to start
import Level1 from "./levels/level1";
import Level2 from "./levels/Level2";
import Level3 from "./levels/level3";
import {Provider} from 'react-redux';
import reducers from './reducer/RootReducer';
import Level4 from "./levels/level4";
const headerMessage = `${OBJECTIVES.length} objectives have their current value over their target`

const pages = [
    {title: "React", content: <Level1/>},
    {title: "Tree structure", content: <Level2/>},
    {title: "Dynamic objectives", content: <Level3/>},
    {title: "Redux", content: <Level4/>},

];


class App extends Component {


    render() {
    return (
        <Provider store={reducers}>
            <div className="App">
                <header className="App-header">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    <div>{headerMessage}</div>
                </header>
                <div>
                    <TabBar pages={pages}/>
                </div>
            </div>
        </Provider>
    );
  }
}

export default App;
