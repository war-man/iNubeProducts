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

import swal from 'sweetalert';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Coin1 from "modules/Coinsurance/views/Coin1.jsx";
import { Redirect } from 'react-router-dom';
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

class Coin2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:false,
            masterlist: [],
            participant: {
                coincompany: "",
                iccode: "",
                Branch: "",
                OfficeCode:"",
                Address: "",
                Share: "",
                Coinsurancestatus:""
            }
        };

    }

    onInputChange = (evt) => {
        const Data = this.state.participant;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });

        console.log("Data", this.state.participant)

    }
    handleAdd = () => {
        debugger;
        this.setState({ redirect: true });
        this.renderRedirect();
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/Coinsurance/Coin1',

            }} />
        }
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
                                <small>Participant</small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="CoInsurance Company"
                                    id="ddlstatus"
                                    //required={true}
                                    lstObject={this.state.masterlist}
                                    //filterName=''
                                    value={this.state.participant.coincompany}
                                    name='coincompany'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="IC Code"
                                id="iccode"
                                //required={true}
                                //error={this.state.retentionGroupNameState}
                                value={this.state.participant.iccode}
                                name='iccode'
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Branch"
                                    id="Branch"
                                    //required={true}
                                    //error={this.state.retentionGroupNameState}
                                    value={this.state.participant.Branch}
                                    name='Branch'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}

                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Office Code"
                                    id="OfficeCode"
                                    //required={true}
                                    //error={this.state.retentionGroupNameState}
                                    value={this.state.participant.OfficeCode}
                                    name='OfficeCode'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Address"
                                    id="Address"
                                    //required={true}
                                    //error={this.state.retentionGroupNameState}
                                    value={this.state.participant.Address}
                                    name='Address'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Share"
                                    id="Share"
                                    //required={true}
                                    //error={this.state.retentionGroupNameState}
                                    value={this.state.participant.Share}
                                    name='Share'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="CoInsurance Status"
                                    id="Coinsurancestatus"
                                    //required={true}
                                    //error={this.state.retentionGroupNameState}
                                    value={this.state.participant.Coinsurancestatus}
                                    name='Coinsurancestatus'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.handleAdd}> <TranslationContainer translationKey="Add" />  </Button>
                            </GridItem>
                            </GridContainer>

                    </CardBody>
                </Card>
                {this.renderRedirect()}
            </div>
        );
    }
}


export default withStyles(style)(Coin2);