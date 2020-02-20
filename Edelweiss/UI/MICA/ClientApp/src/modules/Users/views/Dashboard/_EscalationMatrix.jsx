import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import customStyles from "assets/jss/material-dashboard-pro-react/views/customStyles.jsx";

const style = {
    ...customStyles,
    ...dashboardStyle
};

class EscalationMatrix extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridContainer >
                    <GridItem xs={12} sm={12} md={4}>
                        <h5 id="heading" className={classes.levels}><strong>Level 1</strong></h5>
                        <div id="levels" className={classes.escalationDiv}>
                        <div className={classes.innerDiv}>
                            <h5 className={classes.name}><u>Name</u></h5>

                            <h5 className={classes.divContent}>S Ramachandra Rao</h5>
                            <h5 className={classes.divContent}><u>Email Address</u></h5>
                            <h5 className={classes.level1}>sramachandrarao@gmail.com</h5>
                            <h5 className={classes.divContent}><u>Phone number</u></h5>
                            <h5 className={classes.divContent}>+91-8147589081</h5>
                       </div>
                     </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <h5 id="heading" className={classes.levels}><strong>Level 2</strong></h5>
                        <div id="levels" className={classes.escalationDiv}>
                        <div className={classes.innerDiv}>
                            <h5 className={classes.name}><u>Name</u></h5>
                            <h5 className={classes.divContent}>S Ramachandra Rao</h5>
                            <h5 className={classes.divContent}><u>Email Address</u></h5>
                            <h5 className={classes.level1}>sramachandrarao@gmail.com</h5>
                            <h5 className={classes.divContent}><u>Phone number</u></h5>
                            <h5 className={classes.divContent}>+91-8147589081</h5>
                        </div>
                    </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <h5 id="heading" className={classes.levels} ><strong>Level 3</strong></h5>
                        <div id="levels" className={classes.escalationDiv}>
                        <div className={classes.innerDiv}>
                            <h5 className={classes.name}><u>Name</u></h5>
                            <h5 className={classes.divContent}>S Ramachandra Rao</h5>
                            <h5 className={classes.divContent}><u>Email Address</u></h5>
                            <h5 className={classes.level1}>sramachandrarao@gmail.com </h5>
                            <h5 className={classes.divContent}><u>Phone number</u></h5>
                            <h5 className={classes.divContent}>+91-8147589081</h5>
                        </div>
                    </div>
                    </GridItem>
                 </GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                   
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                   
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                   
                </GridItem>
                </GridContainer>
        );
    }
}
export default withStyles(style)(EscalationMatrix);