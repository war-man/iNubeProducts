import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import user from "assets/img/user.png";


import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Download from "@material-ui/icons/GetApp";
import { Animated } from "react-animated-css";
import InterviewDetails from "modules/Recruitment/Tasks/InterviewDetails.jsx";


const dataTable = {
    headerRow: ["Checkbox", "InterviewId", "ProspectCode", "ProspectName", "InterviewDate", "InterviewTime", "ReceivedFrom", "TaskAge"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>,
            "12862", "PRO000003934", "Chythra", "", "", "AGL000000360", "14"],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>, "12861", "PRO000003944", "Vyshaka", "", "", "AGL000000360", "14"],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}
                Tharang
            />
        </GridItem>, "12863", "PRO000003945", "Tharang", "", "", "AGL000000360", "14"],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>, "12863", "PRO000003945", "Nurani", "", "", "AGL000000360", "14"],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>, "12864", "PRO000003935", "Shreshta", "", "", "AGL000000360", "14"],

    ]
};

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
const searchBtn = {
    left: "140%",

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




class InterviewDetTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],

            show: false,
            submitshow: false,
            data: dataTable.dataRows.map((prop, key) => {
                return {
                    id: key,
                    Checkbox: prop[0],
                    InterviewId: prop[1],
                    ProspectCode: prop[2],
                    ProspectName: prop[3],
                    InterviewDate: prop[4],
                    InterviewTime: prop[5],
                    ReceivedFrom: prop[6],
                    TaskAge: prop[7],
                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                        </div>
                    )
                };
            })


        }

    };



    edittable = () => {

    }
    edittable = () => {
        this.setState({ open: true });
    }
    handleClose = () => {

        this.setState({ open: false });

    };
    handleSimple = () => {

    }
    render() {
        const { classes } = this.props;

        return (
            <div> 
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={user} /></Icon>
                    </CardIcon>
                    {
                            <GridItem>
                                <h4> <small>Interviews</small> </h4>
                                
                        </GridItem>
                    }
                </CardHeader>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <CardBody>

                       

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}

                        >
                            <div className={classes.paper} id="modal">


                                <Button color="info"
                                    round
                                    className={classes.marginRight}
                                    style={searchClose}
                                    onClick={this.handleClose}>
                                    &times;
                            </Button>
                                <InterviewDetails />
                            </div>
                        </Modal>
                    </CardBody>

                </Animated>
                </Card>
                <GridContainer xl={12}>
                    
                        <GridItem lg={12}>


                          

                                <ReactTable
                                    data={this.state.data}
                                    filterable
                                    columns={[
                                        {
                                            Header: " ",
                                            accessor: "Checkbox",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 20,
                                            resizable: false,

                                        },
                                        {
                                            Header: " Interview ID",
                                            accessor: "InterviewId",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,

                                        },
                                        {
                                            Header: "Prospect Code",
                                            accessor: "ProspectCode",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,

                                        },
                                        {

                                            Header: "Prospect Name",
                                            accessor: "ProspectName",

                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Interview Date",
                                            accessor: "InterviewDate",

                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Interview Time",
                                            accessor: "InterviewTime",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,
                                        }, {
                                            Header: "Received From",
                                            accessor: "ReceivedFrom",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Task Age",
                                            accessor: "TaskAge",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,
                                        },
                                        {
                                            Header: "actions",
                                            accessor: "actions",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,
                                        },

                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                                <GridItem>
                                    <div className="actions-right">
                                        <Button color="info"  >Re-Schedule Interview</Button>
                                    </div>
                                </GridItem>


                        </GridItem>
                    
                </GridContainer>
                </div>
        );
    }


}


export default withStyles(styles)(InterviewDetTask);