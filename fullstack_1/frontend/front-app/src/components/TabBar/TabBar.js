import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import { withStyles } from '@material-ui/core/styles';
import TabContent from "./TabContent";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
});

class TabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        }
    }


    handleChange = (event, tabIndex) => {
        this.setState({ tabIndex });
    };


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Paper >
                        <Tabs
                            value={this.state.tabIndex}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered>
                            {this.props.pages.map(page =>{
                                return <Tab label={page.title} />
                            })}
                        </Tabs>
                    </Paper>
                </AppBar>
                <TabContent>
                    {this.props.pages[this.state.tabIndex].content}
                </TabContent>
            </div>
        );
    }
}

export default withStyles(styles)(TabBar);
