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
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import user from "assets/img/user.png";


import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import Download from "@material-ui/icons/GetApp";

const dataTable = {
    headerRow: ["SelectYourBenefits", "SumAssured", "Premium", "Loading", "TotalPremium"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["Basic Benifits", "2,00,000", "726", "0", "726"],
        ["Accelrated Critical Illness", "2,00,000", "1,554", "0", "1,554"],
        ["Standalone Critical Illness", "2,00,000", "2,656", "0", "2,656"],
        ["Accidental Death", "2,00,000", "624", "0", "624"],
        ["Waiver Of Premium", "", "994", "0", "994"],
        ["Permanent & Total Disability", "2,00,000", "268", "0", "268"],
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




class PremiumAndBenifitDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
           
            selectedValue: null,
            masterList: [],
           
            display: false,

            show: false,
            submitshow: false,
            data: dataTable.dataRows.map((prop, key) => {
                return {
                    id: key,
                    SelectYourBenefits: prop[0],
                    SumAssured: prop[1],
                    Premium: prop[2],
                    Loading: prop[3],
                    TotalPremium: prop[4],
             
                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                            <Button color="info" justIcon round simple className="download" ><Download /></Button>
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
            <GridContainer xl={12}>
                <GridItem lg={12}>

                    <CardBody>
                                    <ReactTable
                                        data={this.state.data}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Select Your Benefits",
                                                accessor: "SelectYourBenefits",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Sum Assured",
                                                accessor: "SumAssured",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,
                                                /*
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {

                                                Header: "Premium",
                                                accessor: "Premium",
                                                //minWidth: 150,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Loading",
                                                accessor: "Loading",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Total Premium",
                                                accessor: "TotalPremium",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,
                                            },
                                           
                                         
                                           

                                        ]}
                                        defaultPageSize={11}
                                        showPaginationTop={false}
                                        pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />

                                </CardBody>
                            </GridItem>
                    </GridContainer>
        );
    }


}


export default withStyles(styles)(PremiumAndBenifitDetail);