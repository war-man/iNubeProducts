import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import DynamicFormTesting from "./DynamicFormTesting.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import { withStyles } from '@material-ui/core/styles';
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { fade } from "@material-ui/core/styles";
import swal from 'sweetalert';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { config } from "../../config";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";
import DragNDrop from "./DragNDrop.jsx";
import Modal from '@material-ui/core/Modal';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';

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

//const maritalstatus = {
//        [ mID= "Package", mValue= "Male", mType= 1 ],
//        [ mID= "Product", mValue= "Female", mType= 2 ],
//};


class DynamicForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    id: 1,
                    name: "a",
                    age: 29,
                    qualification: "B.Com",
                    rating: 3,
                    gender: "male",
                    city: "Kerala",
                    skills: ["reactjs", "angular", "vuejs"]
                },
                {
                    id: 2,
                    name: "b",
                    age: 35,
                    qualification: "B.Sc",
                    rating: 5,
                    gender: "female",
                    city: "Mumbai",
                    skills: ["reactjs", "angular"]
                },
                {
                    id: 3,
                    name: "c",
                    age: 42,
                    qualification: "B.E",
                    rating: 3,
                    gender: "female",
                    city: "Bangalore",
                    skills: ["reactjs"]
                }
            ],
            tabledata: [],
            tablelist: [
                { Header: "Id", accessor: "id" },
                { Header: "Name", accessor: "name" },
                { Header: "Qualification", accessor: "qualification" },
                { Header: "Rating", accessor: "rating" },
                { Header: "Gender", accessor: "gender" },
                { Header: "City", accessor: "city" },
                { Header: "Skills", accessor: "uskills" },
                { Header: "Action", accessor: "action" },
            ],
            current: {}
        };
    }

    onSubmit = model => {
        console.log("hitting", model);
        let data = [];
        if (model.id) {
            data = this.state.data.filter(d => {
                return d.id != model.id;
            });
            console.log("response data", data);
        } else {
            model.id = +new Date();
            data = this.state.data.slice();
        }

        this.setState({
            data: [model, ...data],
            current: {} // todo
        });
        console.log("response data", data);
        //this.tabledatalist(data);
    };

    componentDidMount() {
        this.tabledatalist(this.state.data);
    }

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
        //this.renderFun();
    }

    tabledatalist = (data) => {
        this.setState({
            tabledata: data.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: prop.id,
                    name: prop.name,
                    age: prop.age,
                    qualification: prop.qualification,
                    gender: prop.gender,
                    rating: prop.rating,
                    city: prop.city,
                    uskills: prop.skills && prop.skills.join(","),
                    action: <Tooltip title={< TranslationContainer translationKey="Edit" />} placement="bottom" arrow>
                        <IconButton color="info" justIcon round simple className="edit" onClick={() => { this.onEdit(prop.id); }} ><Edit /></IconButton>
                    </Tooltip >
                    //<div><Button round color="info" onClick={() => { this.onEdit(prop.id); }}> edit </Button></div>
                };
            })
        })
    }

    onEdit = id => {
        let record = this.state.data.find(d => {
            return d.id == id;
        });
        //alert(JSON.stringify(record));
        this.setState({
            current: record
        });
    };

    onNewClick = e => {
        this.setState({
            current: {}
        });
    };

    render() {
        let data = this.state.data.map(d => {

            return (
                <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.age}</td>
                    <td>{d.qualification}</td>
                    <td>{d.gender}</td>
                    <td>{d.rating}</td>
                    <td>{d.city}</td>
                    <td>{d.skills && d.skills.join(",")}</td>
                    <td>
                        <Button
                            onClick={() => {
                                this.onEdit(d.id);
                            }}
                        >
                            edit
            </Button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="App">
                <div className="form-actions">
                    <Button round color="success" onClick={this.onNewClick} type="submit">NEW</Button>
                </div>
                <DynamicFormTesting
                    key={this.state.current.id}
                    className="form"
                    title="Registration"
                    defaultValues={this.state.current}
                    model={[
                        { key: "name", label: "Name", type: "text", props: { required: true } },
                        { key: "age", label: "Age", type: "number" },
                        { key: "rating", label: "Rating", type: "number", props: { min: 0, max: 10 } },
                        {
                            key: "gender", label: "Gender", type: "radio",
                            options: [
                                { key: "male", label: "Male", selectedValue: "", mID: 1, mValue: "Male", name: "gender", value: "male" },
                                { key: "female", label: "Female", selectedValue: "", mID: 2, mValue: "Female", name: "gender", value: "female" }
                            ]
                        },
                        { key: "MaritalStatus", label: "Marital Status", type: "masterdropdown", value: "" },
                        { key: "DOB", label: "Date of Birth", type: "date", value: "" },
                        { key: "qualification", label: "Qualification", type: "text" },
                        {
                            key: "city", label: "City", type: "select", value: "Kerala",
                            options: [
                                //{ key: "mumbai", label: "Mumbai", value: "Mumbai" },
                                //{ key: "bangalore", label: "Bangalore", value: "Bangalore" },
                                //{ key: "kerala", label: "Kerala", value: "Kerala" }
                                { key: "mumbai", label: "Mumbai", mID: "mumbai", mValue: "Mumbai", value: "Mumbai" },
                                { key: "bangalore", label: "Bangalore", mID: "bangalore", mValue: "Bangalore", value: "Bangalore" },
                                { key: "kerala", label: "Kerala", mID: "kerala", mValue: "Kerala", value: "Kerala" }
                            ]
                        },
                        {
                            key: "skills", label: "Skills", type: "checkbox",
                            options: [
                                { key: "reactjs", label: "ReactJS", value: "reactjs" },
                                { key: "angular", label: "Angular", value: "angular" },
                                { key: "vuejs", label: "VueJS", value: "vuejs" }
                            ]
                        },

                    ]}
                    onSubmit={model => {
                        this.onSubmit(model);
                    }}
                />
                <ReactTable
                    data={this.state.tabledata}
                    filterable
                    columns={this.state.tablelist}

                    defaultPageSize={5}
                    showPaginationTop={false}
                    showPaginationBottom
                    className="-striped -highlight discription-tab"
                /> {/**/}
                <table border="1">

                    <tbody>{data}</tbody>
                </table>

            </div>
        );
    }
}

export default withStyles(style)(DynamicForm);