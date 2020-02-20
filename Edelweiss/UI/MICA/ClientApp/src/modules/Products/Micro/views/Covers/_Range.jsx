import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "components/CustomButtons/Button.jsx";


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

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#e91e63",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


const download = {
    color: 'white',
    backgroundColor: '#1068ac',
    border: 'none',
    height: '40px',
    width: 'max-content',
    marginTop : '10px'
}

const btnAlign = {
    margin: '0 auto',
    marginTop : '10px'
}
const browseBtn = {
    color: 'white',
    backgroundColor: '#1068ac',
    border: 'none',
    height: '40px',
    marginTop: '5px',
    width: '200px'
}

const titleStyle = {
    marginLeft : '185px'
}

const heading = {
    color: '#407ba4',
}
const editBtn = {
    marginLeft: '-30px',
    backgroundColor: 'transparent',
    color: '#1068ac',
    zoom : "1.7",
    border: 'none',
   
}

const deleteBtn = {
    marginLeft: '2px',
    backgroundColor: 'transparent',
    color: 'red',
    border: 'none',
    zoom: "1.7"
}
const browseSec = { marginLeft: '290px' }

const tableStyle = { borderRadius: '2px', display: 'block', overflowX: 'auto', width: 'min-content' }

const thRow = { height: '45px' }

const tbRow = { height: '20px' }

class BulkUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    render() {
        const { classes } = this.props;
        return (
           
                <GridContainer>
                    
                   
                       
                <Table className={classes.table} style={tableStyle} id="cdBalTable">
                                <TableHead>
                                    <TableRow className="table-row" style={thRow}>
                                        <CustomTableCell className="table-row">Cover Factor Unit Value From</CustomTableCell>
        
                            <CustomTableCell className="table-row">Cover Factor Unit Value To </CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className="table-row" style={tbRow}>
                                        <CustomTableCell></CustomTableCell>
                                        
                                        <CustomTableCell></CustomTableCell>
                               
                                    </TableRow>

                                </TableBody>
                            </Table>
                </GridContainer>
            
        );
    }
}

export default withStyles(style)(BulkUpload);