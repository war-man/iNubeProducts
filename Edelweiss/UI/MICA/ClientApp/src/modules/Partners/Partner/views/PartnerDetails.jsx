import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import SearchPartner from "./SearchPartner.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import partnereDetails from "assets/img/workers.png";
import Icon from "@material-ui/core/Icon";
import { Animated } from "react-animated-css";
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

class PartnerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            topics: [],
            lob: "",
            selectedValue: null,
            open: false,
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    showPartnerSearchTable() {
        document.getElementById('searchResult').style.display = 'block';
    }

    render() {
        const { classes } = this.props;
        const styles = theme => ({
            paper: {
                position: 'absolute',
                width: theme.spacing.unit * 50,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[5],
                padding: theme.spacing.unit * 4,
                outline: 'none',
            }
        });
        return (
            <div>
                <SearchPartner />
            </div>
        );
    }
}
export default withStyles(style)(PartnerDetails);