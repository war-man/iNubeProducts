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
import { Redirect } from 'react-router-dom';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Coin2 from "modules/Coinsurance/views/Coin2.jsx"
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

class Coin1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:false,
            flag: false,
            flaghide: false,
            flagfollower: false,
            Coinsurance: {
                case: "",
                status: "",
                BrokerCommission: "",
                share: "",
                productcode: "",
                commission:""
            }
        };

    } 

    handleRadioOnChange = (event) => {
        let value = event.target.value;
        //this.state.BrokerRadio = event.target.value;
        this.state.Coinsurance.case = event.target.value;
        this.setState({ value });
        console.log("isActive1", this.state.Coinsurance.case);
        if (this.state.Coinsurance.case == 'Y') {
            this.setState({ flag: true });
        }
        if (this.state.Coinsurance.case  == 'N') {
            this.setState({ flag: false,flaghide:false,flagfollower:false });
        }
        console.log("isActive1", this.state.Coinsurance.case);
    }
    handleRadioOnChange1 = (event) => {
        let value = event.target.value;
        //this.state.BrokerRadio = event.target.value;
        this.state.Coinsurance.status = event.target.value;
        this.setState({ value });
        console.log("isActive3", this.state.Coinsurance.status);
        if (this.state.Coinsurance.status == 'Y') {
            this.setState({ flaghide: true,flagfollower:false });
        }
        if (this.state.Coinsurance.status == 'N') {
            this.setState({ flagfollower: true,flaghide:false });
        }
        console.log("isActive2", this.state.Coinsurance.status);
    }
    handleRadioOnChange2 = (event) => {
        let value = event.target.value;
        //this.state.BrokerRadio = event.target.value;
        this.state.Coinsurance.share = event.target.value;
        this.setState({ value });
        console.log("isActive3", this.state.Coinsurance.share);
        //if (this.state.Coinsurance.share == 'Yes') {
        //    this.setState({ flaghide: true });
        //}
        //if (this.state.Coinsurance.share == 'No') {
        //    this.setState({ flaghide: false });
        //}
        //console.log("isActive2", this.state.Coinsurance.share);
    }
    onInputChange = (evt) => {
        const Data = this.state.Coinsurance;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });

        console.log("Data", this.state.Coinsurance)

    }
    handleAdd = () => {
        debugger;
        this.setState({ redirect: true });
        this.renderRedirect();
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/Coinsurance/Coin2',

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
                                <small>Coinsurance</small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem style={{ marginTop: "1.5rem" }} xs={12} sm={12} md={6}>
                                <label style={{ marginRight: "1rem" }}><TranslationContainer translationKey="Is this a Coinsurance case" /></label>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.Coinsurance.case === 'Y'}
                                            onChange={this.handleRadioOnChange}
                                            //disabled={this.props.viewdisable}
                                            value={'Y'}

                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="Yes" />}
                                />

                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.Coinsurance.case === 'N'}
                                            onChange={this.handleRadioOnChange}
                                            //disabled={this.props.viewdisable}
                                            value={'N'}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="No" />}
                                />
                            </GridItem>
                        </GridContainer>
                        {this.state.flag &&
                            <GridContainer>
                                <GridItem style={{ marginTop: "1.5rem" }} xs={12} sm={12} md={6}>
                                    <label style={{ marginRight: "1rem" }}><TranslationContainer translationKey="Coinsurance Status" /></label>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.Coinsurance.status === 'Y'}
                                                onChange={this.handleRadioOnChange1}
                                                //disabled={this.props.viewdisable}
                                                value={'Y'}

                                                name="radio button demo"
                                                aria-label="B"
                                                icon={
                                                    <FiberManualRecord
                                                        className={classes.radioUnchecked}
                                                    />
                                                }
                                                checkedIcon={
                                                    <FiberManualRecord
                                                        className={classes.radioChecked}
                                                    />
                                                }
                                                classes={{
                                                    checked: classes.radio,
                                                    root: classes.radioRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label
                                        }}
                                        label={<TranslationContainer translationKey="Leader" />}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.Coinsurance.status === 'N'}
                                                onChange={this.handleRadioOnChange1}
                                                //disabled={this.props.viewdisable}
                                                value={'N'}
                                                name="radio button demo"
                                                aria-label="B"
                                                icon={
                                                    <FiberManualRecord
                                                        className={classes.radioUnchecked}
                                                    />
                                                }
                                                checkedIcon={
                                                    <FiberManualRecord
                                                        className={classes.radioChecked}
                                                    />
                                                }
                                                classes={{
                                                    checked: classes.radio,
                                                    root: classes.radioRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label
                                        }}
                                        label={<TranslationContainer translationKey="Follower" />}
                                    />
                                </GridItem>
                            </GridContainer>
                        }
                        {this.state.flaghide &&
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.handleAdd}> <TranslationContainer translationKey="Add" />  </Button>

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Broker Commission"
                                    id="Name"
                                    //required={true}
                                    //error={this.state.participantNameState}
                                    value={this.state.Coinsurance.BrokerCommission}
                                    name='BrokerCommission'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem style={{ marginTop: "1.5rem" }} xs={12} sm={12} md={6}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.Coinsurance.share === 'Y'}
                                            onChange={this.handleRadioOnChange2}
                                            //disabled={this.props.viewdisable}
                                            value={'Y'}

                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="100% Payable" />}
                                />

                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.Coinsurance.share === 'N'}
                                            onChange={this.handleRadioOnChange2}
                                            //disabled={this.props.viewdisable}
                                            value={'N'}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="Leader's share payable" />}
                                />
                            </GridItem>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                    <ReactTable
                                        //title={"Treaty List"}
                                        //data={this.state.newdata}
                                        //data={this.state.Billingdata}
                                        filterable
                                        columns={[
                                            //{
                                            //    Header: "",
                                            //    accessor: "radio",
                                            //    minWidth: 20,
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    sortable: false,
                                            //    filterable: false,
                                            //    resizable: false,
                                            //},

                                            {
                                                Header: " CoInsurance Company",
                                                accessor: "coinsurancecompany",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,

                                            },

                                            {
                                                Header: "IC Code",
                                                accessor: "iccode",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,

                                            },

                                            {
                                                Header: "Branch",
                                                accessor: "branch",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Office Code",
                                                accessor: "officecode",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Address",
                                                accessor: "address",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },

                                            {
                                                Header: "Share",
                                                accessor: "share",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Coinsurance Status",
                                                accessor: "coinsurancestatus",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },




                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        // pageSize={([this.state.Billingdata.length + 1] < 5) ? [this.state.Billingdata.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />

                                </Animated>


                            </GridItem>
                            </GridContainer>
                        }
                        {this.state.flagfollower &&
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.handleAdd}> <TranslationContainer translationKey="Add" />  </Button>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Product Code"
                                        id="Name"
                                        //required={true}
                                        //error={this.state.participantNameState}
                                        value={this.state.Coinsurance.productcode}
                                        name='productcode'
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Broker Commission"
                                        id="Name"
                                        //required={true}
                                        //error={this.state.participantNameState}
                                        value={this.state.Coinsurance.commission}
                                        name='commission'
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />

                            </GridItem>
                            <GridItem style={{ marginTop: "1.5rem" }} xs={12} sm={12} md={3}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.Coinsurance.share === 'Y'}
                                            onChange={this.handleRadioOnChange2}
                                            //disabled={this.props.viewdisable}
                                            value={'Y'}

                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="100% Paid by leader" />}
                                />

                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.Coinsurance.share === 'N'}
                                            onChange={this.handleRadioOnChange2}
                                            //disabled={this.props.viewdisable}
                                            value={'N'}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={<TranslationContainer translationKey="Follower's share payable" />}
                                />
                            </GridItem>

                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                    <ReactTable
                                        //title={"Treaty List"}
                                        //data={this.state.newdata}
                                        //data={this.state.Billingdata}
                                        filterable
                                        columns={[
                                            //{
                                            //    Header: "",
                                            //    accessor: "radio",
                                            //    minWidth: 20,
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    sortable: false,
                                            //    filterable: false,
                                            //    resizable: false,
                                            //},

                                            {
                                                Header: " CoInsurance Company",
                                                accessor: "coinsurancecompany",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,

                                            },

                                            {
                                                Header: "IC Code",
                                                accessor: "iccode",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,

                                            },

                                            {
                                                Header: "Branch",
                                                accessor: "branch",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Office Code",
                                                accessor: "officecode",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Address",
                                                accessor: "address",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },

                                            {
                                                Header: "Share",
                                                accessor: "share",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Coinsurance Status",
                                                accessor: "coinsurancestatus",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },




                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        // pageSize={([this.state.Billingdata.length + 1] < 5) ? [this.state.Billingdata.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />

                                </Animated>


                            </GridItem>
                            </GridContainer>
                        }
                    </CardBody>
                </Card>
                {this.renderRedirect()}
            </div>
        );
    }
}

export default withStyles(style)(Coin1);