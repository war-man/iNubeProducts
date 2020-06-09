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
import SuspectEdit from "modules/Recruitment/Tasks/suspectedit.jsx"

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Download from "@material-ui/icons/GetApp";
import { Animated } from "react-animated-css";


const dataTable = {
    headerRow: ["Checkbox","ProspectCode", "FirstName", "LastName", "MobileNo", "Email"],
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
"SUS000003934", "Chythra", "Mohan", "078765678", ""],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>,"SUS000003935", "Vyshaka", "Yadav", "078765679", "Vyshaka@gmail.com"],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>,"SUS000003937", "Tharang", "Varn", "078765677", ""],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>,"SUS000003932", "Nurani", "Illam", "078765676", ""],
        [<GridItem xs={12} sm={12} md={5} className="downlevel">
            <CustomCheckbox
                name="checkbox"

                formControlProps={{
                    fullWidth: true
                }}

            />
        </GridItem>,"SUS000003940", "Shreshta", "Krishna", "078765675", ""],

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




class ConfirmProspect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
              editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
          
            selectedValue: null,
            masterList: [],
        
            show: false,
            submitshow: false,
            data: dataTable.dataRows.map((prop, key) => {
                return {
                    id: key,
                    Checkbox: prop[0],
                    ProspectCode: prop[1],
                    FirstName: prop[2],
                    LastName: prop[3],
                    MobileNo: prop[4],
                    Email: prop[5],
                    CreateDate: prop[6],
                    actions: (
                        <div className="actions-right">
                          
                            <Button color="info" justIcon round simple className="download" ><Download /></Button>
                        </div>
                    )
                };
            })


        }

    };



   
    edittable = () => {
        document.getElementById("disp");
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
                            <h4><small>Confirm Prospects</small></h4>

                        </GridItem>
                    }
                </CardHeader>

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
                            <div id="disp" >
                                <SuspectEdit />
                            </div>
                        </div>
                       
                    </Modal>
                </CardBody>


                </Card>
                <GridContainer xl={12}>
                    

                    <GridItem lg={12}>

                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                               

                                    <ReactTable
                                        data={this.state.data}
                                        filterable
                                        columns={[
                                            {
                                                Header: " ",
                                                accessor: "Checkbox",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: " Prospect Code",
                                                accessor: "ProspectCode",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },
                                            {
                                                Header: "First Name",
                                                accessor: "FirstName",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },
                                            {

                                                Header: "Last Name",
                                                accessor: "LastName",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Mobile No",
                                                accessor: "MobileNo",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,
                                            },
                                            {
                                                Header: "E-Mail",
                                                accessor: "Email",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />

                                    <GridItem>
                                        <div className="actions-right">

                                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={() => this.edittable()} >
                                                Schedule Interview
                                               </Button>
                                        </div>
                                    </GridItem>

                               
                            </Animated>

                        </GridItem>
                   
                </GridContainer>
                </div>
        );
    }


}


export default withStyles(styles)(ConfirmProspect);