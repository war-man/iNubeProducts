import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

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
};



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

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});

const modalStyles = {
    position: 'absolute',
    top: '25%',
    left: '25%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: '50%',
    height: '50%',
    borderRadius: '10px',
    paddingBottom: '5px'
};

const searchBtn = {
   left: "60%"
}

const modalSearch = {
    margin: "0px auto",
    height: "25px",
    textAlign: "center",
    width: "65px",
    padding: "1px"
}


const homeBtn = {
    marginLeft: "250px",
    height: "35px",
    textAlign: "center",
    backgroundColor: "#1068ac",
    color: "white"
}



const textAlign = {
    marginLeft: "180px",
    color: "#4caf50"
}

const prodDet = {
    marginLeft: "210px",
}

const actionBtns = {
    marginLeft: "230px",
    marginTop: "15px"
}

const check = { backgroundColor: 'transparent', color: '#4caf50', boxShadow: 'none', marginLeft: '55px', zoom: '3.5' }

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            simpleSelect: "",
            selectedValue: null,
        };
    }


    handleOpen = () => {
        this.setState({ open: true });
       
    };

    handleClose = () => {
        this.setState({ open: false });
    };



    render() {
        const { classes } = this.props;

        return (
            <div> 
                <GridContainer lg={12} justify="center">
                    <GridItem xs={5} sm={3} md={3} lg={2}>
                      
                        {this.props.btnhide && <Button  color="info" round onClick={this.props.onSave}>
                            Submit
                    </Button>
                        }
                    </GridItem>
                    {/* <GridItem xs={6} sm={6} md={4}>
                        <Button color="danger" round className={classes.marginRight} onClick={this.props.onCancel} style={searchBtn}>
                            Cancel
                            </Button>
                        </GridItem> */}
                </GridContainer>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <div className={classes.paper} style={modalStyles}>
                            <button className="search-close" onClick={this.handleClose}>&times;</button>
                            <Button style={check} className="checkBtn"><i className="far fa-check-circle fa-lg"></i></Button>
                            <h3 style={textAlign}>Product Saved Successfully</h3>
                            <h5 style={prodDet}><strong>Product Name : Taxi Ride</strong></h5>
                            <h5 style={prodDet}><strong>Product Code : XXXX </strong></h5>
                            <Button round className={classes.marginRight} style={homeBtn} onClick={this.handleClose}>
                                Go To Home
                        </Button>
                        </div>

                    </Modal>
            </div>
                );
            }
        }
export default withStyles(styles)(ProductSave);