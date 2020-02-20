import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
//import profileStyles from "./profileStyles.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const modalStyles = {
    position: 'absolute',
    top: '25%',
    left: '25%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: '40%',
    height: '25%',
    borderRadius: '8px',
    paddingBottom: '5px'
};

//function rand() {
//    return Math.round(Math.random() * 20) - 10;
//}

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

class PinCodeModal extends React.Component {
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
                <Button color="info" size="sm" className={classes.searchBtn} onClick={this.handleOpen}>
                    Search
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={classes.paper} style={modalStyles}>
                        <button className="search-close" onClick={this.handleClose}>&times;</button>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Pin Code"
                                    id="pinCode"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6} style={{ marginTop: "25px" }}>

                                <Button color="info" size="sm" className={classes.pinSearch}>
                                    Search
                                </Button> &nbsp;

                                <Button color="default" size="sm" className={classes.pinSearch} onClick={this.handleClose}>
                                    Cancel
                                </Button>
                            </GridItem>

                        </GridContainer>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default withStyles(styles)(PinCodeModal);