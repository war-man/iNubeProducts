import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../components/Grid/GridItem";
import UserConfig from 'modules/Users/UserConfig.js';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import swal from 'sweetalert';
import GridContainer from "../../components/Grid/GridContainer";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";


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

class DynamicFormTesting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            dynamicdata: {
                firstname: "",
                dob: "",
                countryName: "",
                maritalStatusId: "",
                checkbox: "",
                radio: "",
            },
        };

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("gds:p:s", nextProps.defaultValues, prevState);

        let derivedState = {};

        if (
            nextProps.defaultValues &&
            nextProps.defaultValues.id !== prevState.id
        ) {
            //   Object.keys(prevState).forEach(k => {
            //     derivedState[k] = "";
            //   });
            return {
                ...nextProps.defaultValues
            };
        }

        console.log("no state change");
        return null;
    }

    componentDidMount() {
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("masterlist: ", this.state.masterList)
            });
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state);
    };

    SetValue = (type, tname, event) => {
        if (type == 'date') {
            var today = event.toDate();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            let data = this.state.dynamicdata;
            data[tname] = date;
            this.setState({ data });
        } else {
            let data = this.state.dynamicdata;
            let name = event.target.name;
            let value = event.target.value;
            let check = event.target.checked;

            data[name] = value;
            this.setState({ data });

            if (type == 'checkbox') {
                data[name] = check;
                this.setState({ data });
                console.log("data: ", event.target.checked);
            }
            if (type == 'radio') {
                data[name] = value;
                this.setState({ data, selectedValue: value });
            }
            //this.setState({ [event.target.name]: event.target.value })
            console.log("data: ", event.target.value);
        }
        console.log("dynamic", this.state.dynamic)
        this.state.dynamic[0].props.value = event.target.value;
        console.log("dynamic", this.state.dynamic)
        this.renderFun();
    }

    onChange = (e, key, type = "single") => {
        //console.log(`${key} changed ${e.target.value} type ${type}`);
        if (type === "single") {
            this.setState(
                {
                    [key]: e.target.value
                },
                () => { }
            );
        } else {
            // Array of values (e.g. checkbox): TODO: Optimization needed.
            let found = this.state[key]
                ? this.state[key].find(d => d === e.target.value)
                : false;

            if (found) {
                let data = this.state[key].filter(d => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                });
            } else {
                console.log("found", key, this.state[key]);
                // this.setState({
                //   [key]: [e.target.value, ...this.state[key]]
                // });
                let others = this.state[key] ? [...this.state[key]] : [];

                this.setState({
                    [key]: [e.target.value, ...others]
                });
            }
        }
    };

    renderForm = () => {
        let model = this.props.model;
        let defaultValues = this.props.defaultValues;

        let formUI = model.map(m => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name = m.name;
            let value = m.value;
            let label = m.label;

            let target = key;
            value = this.state[target] || "";

            let input = (
                //<input
                //    {...props}
                //    className="form-input"
                //    type={type}
                //    key={key}
                //    name={name}
                //    value={value}
                //    onChange={e => {
                //        this.onChange(e, target);
                //    }}
                ///>
                <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                        key={key}
                        labelText={label}
                        id="fName"
                        value={value}
                        name={name}
                        onChange={e => {
                            this.onChange(e, target);
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            );

            if (type == "text") {
                return (
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            key={key}
                            labelText={label}
                            id="fName"
                            value={value}
                            name={name}
                            onChange={e => {
                                this.onChange(e, target);
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                );
            }

            if (type == "number") {
                return (
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            key={key}
                            labelText={label}
                            id="fName"
                            value={value}
                            name={name}
                            inputType="number"
                            onChange={e => {
                                this.onChange(e, target);
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                );
            }
            if (type == "radio") {
                //input = m.options.map(o => {
                //let checked = o.value == value;

                return (
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomRadioButton
                            radiolist={m.options}
                            onChange={e => {
                                this.onChange(e, m.options.name);
                            }}
                            disabled={false} />
                        {/* <React.Fragment key={"fr" + o.key}>
                                <input
                                    {...props}
                                    className="form-input"
                                    type={type}
                                    key={o.key}
                                    name={o.name}
                                    checked={checked}
                                    value={o.value}
                                    onChange={e => {
                                        this.onChange(e, o.name);
                                    }}
                                />
                                <label key={"ll" + o.key}>{o.label}</label>
                            </React.Fragment>*/}
                    </GridItem>
                );
                //});
                // input = <div className="form-group-radio">{input}</div>;
            }

            if (type == "masterdropdown") {
                return (
                    <GridItem xs={12} sm={4} md={3}>
                        <MasterDropdown
                            labelText={label}
                            //required={true}
                            //value={this.state.dynamicdata.maritalStatusId}
                            id="MaritalStatus"
                            lstObject={this.state.masterList}
                            filterName='MaritalStatus'
                            name='maritalStatusId'
                            //onChange={(e) => this.GetMasterData(e)}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>
                );
            }
            if (type == "date") {
                return (
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomDatetime
                            labelText={label}
                            id='dob'
                            name='dob'
                            //value={this.state.dynamicdata.dob} 
                            Futuredatevalidate={true}
                            //required={true}
                            //onChange={(evt) => this.onDateChange('dob', evt)} 
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>
                );
            }
            if (type == "select") {
                //input = m.options.map(o => {
                //let checked = o.value == value;
                //console.log("select: ", o.value, value);
                return (
                    <GridItem xs={12} sm={4} md={3}>
                        <Dropdown
                            labelText="City"
                            value={m.options.value}
                            lstObject={m.options}
                            name={m.options.value}
                            onChange={e => {
                                this.onChange(e, m.key);
                            }}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    //<option
                    //    {...props}
                    //    className="form-input"
                    //    key={o.key}
                    //    value={o.value}
                    //>
                    //    {o.value}
                    //</option>
                );
                //});

                //console.log("Select default: ", value);
                //input = (
                //    <GridItem xs={12} sm={4} md={3}>

                //        <select
                //            value={value}
                //            onChange={e => {
                //                this.onChange(e, m.key);
                //            }}
                //        >
                //            {input}
                //        </select>
                //    </GridItem>
                //);
            }

            if (type == "checkbox") {
                input = m.options.map(o => {
                    //let checked = o.value == value;
                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true : false;
                    }
                    //console.log("Checkbox: ", checked);
                    return (
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomCheckbox
                                key={o.key}
                                name={o.name}
                                labelText={o.label}
                                value={o.value}
                                onChange={e => {
                                    this.onChange(e, m.key, "multiple");
                                }}
                                formControlProps={{ fullWidth: true }}
                            /*checked={item.mIsRequired} 
                             * disabled={(props.componentData.viewdisable == true) ? true : false} */
                            />
                        </GridItem>
                        //<GridItem xs={12} sm={4} md={3}>
                        //    <React.Fragment key={"cfr" + o.key}>
                        //        <input
                        //            {...props}
                        //            className="form-input"
                        //            type={type}
                        //            key={o.key}
                        //            name={o.name}
                        //            checked={checked}
                        //            value={o.value}
                        //            onChange={e => {
                        //                this.onChange(e, m.key, "multiple");
                        //            }}
                        //        />
                        //        <label key={"ll" + o.key}>{o.label}</label>
                        //    </React.Fragment>
                        //</GridItem>

                    );
                });

                input = <div className="form-group-checkbox">{input}</div>;

            }

            return (
                <div key={"g" + key} className="form-group">
                    <label className="form-label" key={"l" + key} htmlFor={key}>
                        {m.label}
                    </label>
                    {input}


                </div>
            );
        });
        return formUI;
    };

    render() {
        let title = this.props.title || "Dynamic Form";

        return (
            <Card>
                <CardBody>
                    <div className={this.props.className}>
                        <h3 className="form-title">{title}</h3>
                        <form
                            className="dynamic-form"
                            onSubmit={e => {
                                this.onSubmit(e);
                            }}
                        >
                            <GridContainer>
                                {this.renderForm()}
                            </GridContainer>
                            <div className="form-actions">
                                <Button round color="success" type="submit">submit</Button>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(style)(DynamicFormTesting);