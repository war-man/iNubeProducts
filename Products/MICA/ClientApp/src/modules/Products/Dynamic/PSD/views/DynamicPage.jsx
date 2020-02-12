import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import role from "assets/img/users.png";
import DynamicForm from './DynamicFields';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


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

};

class Page1 extends React.Component {

    state = {

      
        current: {}



    };
    constructor(props) {
        super(props);
    }

    onSubmit = model => {

        let data = [];
        if (model.id) {
            data = this.props.data.filter(d => {
                return d.id != model.id;
            });
        } else {
            model.id = +new Date();
            data = this.props.data.slice();
        }

        this.setState({
            data: [model, ...data],
            current: {} // todo
        });
    };

    onEdit = id => {
        let record = this.props.data.find(d => {
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

        let data = this.props.data.map(d => {
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
                        <button
                            onClick={() => {
                                this.onEdit(d.id);
                            }}
                        >
                            edit
            </button>
                    </td>
                </tr>
            );
        });


        return (
            <div>

                <Card >
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={role} /></Icon>
                    </CardIcon>
                    <h4 >
                        <small>  Product Config</small>
                    </h4>

                        <div id="icons">
                            <i class="material-icons" id="color">color_lens</i>
                            <i class="material-icons" id="pin">vertical_align_top</i>
                            <i class="material-icons" id="invert">invert_colors</i>
                            <i class="material-icons" id="font">font_download</i>
                            <i class="material-icons" id="font">font_download</i>
                            <i class="material-icons" id="font">font_download</i>

                        </div>
                            
                </CardHeader>

                    <CardBody>

                        <GridItem>

                           

                            <DynamicForm
                                key={this.state.current.id}
                                className="form"
                                title="Registration"
                                defaultValues={this.state.current}
                                model={[
                                    { key: "name", label: "Name", props: { required: true } },
                                    { key: "age", label: "Age", type: "number" },
                                    {
                                        key: "rating",
                                        label: "Rating",
                                        type: "number",
                                        props: { min: 0, max: 5 }
                                    },
                                    {
                                        key: "gender",
                                        label: "Gender",
                                        type: "radio",
                                        options: [
                                            { key: "male", label: "Male", name: "gender", value: "male" },
                                            {
                                                key: "female",
                                                label: "Female",
                                                name: "gender",
                                                value: "female"
                                            }
                                        ]
                                    },
                                    { key: "qualification", label: "Qualification" },
                                    {
                                        key: "city",
                                        label: "City",
                                        type: "select",
                                        value: "Kerala",
                                        options: [
                                            { key: "mumbai", label: "Mumbai", value: "Mumbai" },
                                            { key: "bangalore", label: "Bangalore", value: "Bangalore" },
                                            { key: "kerala", label: "Kerala", value: "Kerala" }
                                        ]
                                    },
                                    {
                                        key: "skills",
                                        label: "Skills",
                                        type: "checkbox",
                                        options: [
                                            { key: "reactjs", label: "ReactJS", value: "reactjs" },
                                            { key: "angular", label: "Angular", value: "angular" },
                                            { key: "vuejs", label: "VueJS", value: "vuejs" }
                                        ]
                                    }
                                ]}
                                onSubmit={model => {
                                    this.onSubmit(model);
                                }}
                            />

                            <div className="form-actions">
                                <button onClick={this.onNewClick} type="submit">
                                    NEW
                            </button>
                            </div>

                            <table border="1">
                                <tbody>{data}</tbody>
                            </table>
                        </GridItem>

             </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(Page1);