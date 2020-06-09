import React from "react";
import Radio from "@material-ui/core/Radio";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import retention from "assets/img/retention.png";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import validationPage from "modules/Accounts/views/ValidationPage.jsx";
import swal from 'sweetalert';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
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

class Coin4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >

                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={retention} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small>Coinsurance</small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>


                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(Coin4);