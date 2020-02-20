import React from "react";
import Heading from "components/Heading/Heading.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
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



function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const modalStyles = {
    position: 'absolute',
    top: '25%',
    left: '25%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: '50%',
    height: '40%',
    borderRadius: '8px',
    paddingBottom : '5px'
};

const tableStyle = {
    borderRadius: '4px', display: 'block', overflowX: 'auto', whiteSpace: 'nowrap'
}

const tableRow = {
    height : '35px'
}

const btnStyle = {
    textAlign: 'center',
    height: "35px",
    marginLeft: "220px"
}

const clsBtn = {
    marginLeft: '8px',
    textAlign: 'center',
     height: "35px",
}

class ClauseCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            viewFlag: false,
            editFlag : false
        };
    }

    handleOpen = () => {
        this.setState({ open: true, viewFlag: true, editFlag :false});

    };
    handleEditOpen = () => {
        this.setState({ open: true, editFlag: true, viewFlag : false});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
       
        return (
            <div>
                   <GridContainer style={{ marginTop: '10px' }} id="createSection">
                    <Paper className={classes.root}>
                        <Table className={classes.table} style={tableStyle}>
                            <TableHead>
                                <TableRow className="table-row" style={tableRow}>
                                    <CustomTableCell className="table-row">NAME</CustomTableCell>
                                    <CustomTableCell className="table-row">TYPE</CustomTableCell>
                                    <CustomTableCell colSpan='2' className="table-row merge-style"> &nbsp; &nbsp; DESCRIPTION</CustomTableCell>
                                    <CustomTableCell className="table-row">PRINT</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <CustomTableCell className="cover-table">Clause Name One</CustomTableCell>
                                <CustomTableCell className="cover-table">Clause</CustomTableCell>
                                <CustomTableCell className='view-style'>
                                    <button className='view-btn' onClick={this.handleOpen}><i class="fa fa-eye" aria-hidden="true" ></i></button>
                                </CustomTableCell>
                                <CustomTableCell className='edit-style'>
                                    <button className='edit-btn' onClick={this.handleEditOpen}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                   
                                </CustomTableCell>
                                <CustomTableCell>Yes</CustomTableCell>
                            </TableBody>
                        </Table>
                    </Paper>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <div className={classes.paper} style={modalStyles}>
                           

                            <h4 className="view-heading">Clause Name One<button className="view-close" onClick={this.handleClose}>&times;</button></h4>
                            {this.state.viewFlag ?
                                <div>
                                     <blockquote>
                                        It is Agreed and Declared that the condition of risk under within mentioned policy
                                        shall not be modified,upgraded or enchanced during the currency of the policy failing
                                        which the insurance cover under within mentioned policy stands cancelled
                                     </blockquote>
                                    <br/>
                                    <Button color="info" round className={classes.marginRight} style={btnStyle} onClick={this.handleEditOpen}>
                                        Edit
                                    </Button>
                                    <Button color="info" round className={classes.marginRight} style={clsBtn} onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    
                                    <div className="clearfix"></div> 
                                </div>
                                :
                                <div>
                                <blockquote className="edit-content">
                                    It is Agreed and Declared that the condition of risk under within mentioned policy
                                        shall not be modified,upgraded or enchanced during the currency of the policy failing
                                        which the insurance cover under within mentioned policy stands cancelled
                                </blockquote>
                                    <br />
                                    <Button color="success" round className={classes.marginRight} style={btnStyle} >
                                        Save
                                    </Button>
                                    <Button color="info" round className={classes.marginRight} style={clsBtn} onClick={this.handleClose}>
                                        Close
                                    </Button>
                                 <div className="clearfix"></div>
                                 </div>
                                }
                        </div>
                    </Modal>
                </GridContainer>
              

            </div>
        );
    }
}

export default withStyles(style)(ClauseCreate);
