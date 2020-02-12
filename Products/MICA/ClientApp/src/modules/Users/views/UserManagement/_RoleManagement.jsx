import React from "react";
//import FilterNone from "@material-ui/icons/FilterNone";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import $ from 'jquery';



// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import RolePrivilages from "./_RolePrivileges";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",                                                                                                                    
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};


const message = {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#1068ac',
    zoom: '1.25',
    marginLeft: '-3px'
}

const feedback = {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'red',
    zoom: '1.25',
    marginLeft: '-16px',
}
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#e91e63",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class Role extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backFlag: false,
            editFlag : false
        }
        this.editFunction = this.editFunction.bind(this);
    }

    getInitialState() {
        return { tableData: null }
    }

    componentDidMount() {
        $.getJSON('api/SampleData/GetDropDownFromList', (response) => {
            this.setState({ tableData: response })
        })
    }

    editFunction() {
        this.setState({
            editFlag : true
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                {!this.state.editFlag ?
                <Table className={classes.table} style={{ borderRadius: '2px', display: 'block', overflowX: 'auto', width: 'min-content' }} id="rolePrivTable">
                    <TableHead>
                        <TableRow className="table-row" style={{ height: '45px' }}>
                            <CustomTableCell className="table-row">ROLE TYPE</CustomTableCell>
                            <CustomTableCell className="table-row">ROLE NAME</CustomTableCell>
                            <CustomTableCell className="table-row">ROLE DESCRIPTION</CustomTableCell>
                            <CustomTableCell className="table-row">DATE OF CREATION</CustomTableCell>
                            <CustomTableCell className="table-row">USER STATUS</CustomTableCell>
                            <CustomTableCell className="table-row">ACTION</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="table-row" style={{ height: '20px' }} >
                            <CustomTableCell>External</CustomTableCell>
                            <CustomTableCell>Admin</CustomTableCell>
                            <CustomTableCell>Taxi Ride</CustomTableCell>
                            <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                            <CustomTableCell>Active</CustomTableCell>
                            <CustomTableCell>
                                    <button style={feedback} className="del-zoom"><i className="fa fa-trash fa-lg"></i></button> 
                                    <button style={message} className="del-zoom"onClick={this.editFunction}><i className="fa fa-pencil fa-lg"></i></button>
                            </CustomTableCell>
                            </TableRow>
                            <TableRow className="table-row" style={{ height: '20px' }} >
                                <CustomTableCell>Internal</CustomTableCell>
                                <CustomTableCell>Partner</CustomTableCell>
                                <CustomTableCell>Taxi Ride</CustomTableCell>
                                <CustomTableCell>DD/MM/YYYY</CustomTableCell>
                                <CustomTableCell>Active</CustomTableCell>
                                <CustomTableCell>
                                    <button style={feedback} className="del-zoom"><i className="fa fa-trash fa-lg"></i></button> 
                                    <button style={message} className="del-zoom" onClick={this.editFunction}><i className="fa fa-pencil fa-lg"></i></button>
                                </CustomTableCell>
                            </TableRow>
                    </TableBody>
                    </Table>
                    : null }
                <GridContainer style={{marginLeft : "10px"}}>
                    {this.state.editFlag ? <RolePrivilages /> : null}
                </GridContainer>
            </GridContainer>
        );
    }
}

export default withStyles(style)(Role);
