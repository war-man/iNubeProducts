import React from "react";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import customStyles from "assets/jss/material-dashboard-pro-react/views/customStyles.jsx";



const style = {
    ...customStyles,
    ...dashboardStyle
};

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "transparent",
        color: "#00acc1",
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


class TrackClaims extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableFlag : false
        };
    }
    showClaimsDetials = () => {
        this.setState({
            tableFlag : true
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer className="trackGridBox">
              
                <GridItem id="claimNuber" xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Claim Number"
                            id="claimNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                </GridItem>
                <GridItem id="clainFrom"  xs={12} sm={12} md={3}>
                    <InputLabel className={classes.label}>Claim Intimation From</InputLabel>
                    <br />
                    <FormControl fullWidth>
                        <Datetime
                            timeFormat={false}
                            inputProps={{ placeholder: "Click Here" }}
                        /><button className={classes.intimationDates}><i className="fa fa-calendar fa-lg"></i></button>
                    </FormControl>
                </GridItem>
                <GridItem id="clainTo" xs={12} sm={12} md={3}>
                    <InputLabel className={classes.label}>Claim Intimation To</InputLabel>
                    <br />
                    <FormControl fullWidth>
                        <Datetime
                            timeFormat={false}
                            inputProps={{ placeholder: "Click Here" }}
                        /><button className={classes.intimationDates}><i className="fa fa-calendar fa-lg"></i></button>
                    </FormControl>
                </GridItem>



                    <GridItem id="policyNumber" xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Policy Number"
                            id="policyNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                </GridItem>
                <GridItem>
                    <Button color="info" className={classes.searchBtn} onClick={this.showClaimsDetials}><i className="fa fa-search fa-lg" />&nbsp; Search</Button>
                </GridItem>
                {this.state.tableFlag ?
                    <GridItem xs={12} sm={12} md={12} className={classes.claimTable}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell><h5><strong>Claim Number</strong></h5></CustomTableCell>
                                    <CustomTableCell><h5><strong>Policy Number</strong></h5></CustomTableCell>
                                    <CustomTableCell><h5><strong>Claim Status</strong></h5></CustomTableCell>
                                    <CustomTableCell><h5><strong>Claim Intimation</strong></h5></CustomTableCell>
                                    <CustomTableCell><h5><strong>Claim Settled</strong></h5></CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                    <CustomTableCell>XXXXXX</CustomTableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </GridItem> : null}
            </GridContainer>
        );
    }
}
export default withStyles(style)(TrackClaims);