import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import RateConfig from "modules/Rating/RateConfig.js";
import money from "assets/img/money.png";
import { Animated } from "react-animated-css";
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";

const paddingCard =
{
    padding: "10px",
}

class CalculationDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CalculationDisplayDTO: {
                "fromDate": "",
                "toDate": ""
            },
            displayData: [],
            displayDataDetails: [],
            searchTableSec: false,
            loader: true,
            pageloader: false,
            nodata: false,
        };

    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );
    }

    onDateChange = (type, name, event) => {
        this.setState({ DateRange: true });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1)
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        var date = dt + '/' + mm + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);

        if (type == 'CalculationDisplayDTO') {
            let CalculationDisplayDTO = this.state.CalculationDisplayDTO;
            CalculationDisplayDTO[name] = date;
        }
        console.log("CalculationDisplayDTO", this.state.CalculationDisplayDTO);
    };

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    onFormSubmit = () => {
        debugger;

        let fromdate = "";
        let todate = "";
        if (this.state.CalculationDisplayDTO.fromDate != "") {
            fromdate = this.state.CalculationDisplayDTO.fromDate;
            this.state.CalculationDisplayDTO.fromDate = this.datechange(this.state.CalculationDisplayDTO.fromDate);
        }
        if (this.state.CalculationDisplayDTO.toDate != "") {
            todate = this.state.CalculationDisplayDTO.toDate;
            this.state.CalculationDisplayDTO.toDate = this.datechange(this.state.CalculationDisplayDTO.toDate);
        }
        this.setState({ loader: false });
        debugger;
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CalculationDisplaySearch`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.CalculationDisplayDTO)
        }).then(response => response.json())
            .then(data => {

                this.setState({ displayData: data });
                if (this.state.displayData.length > 0) {
                    this.setState({ searchTableSec: false, loader: false });
                    this.tabledata();
                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchTableSec: false, nodata: true });
                        }.bind(this), 2000
                    );
                }

                console.log("Search calculation display data:", data);

            });

        this.state.CalculationDisplayDTO.fromDate = fromdate;
        this.state.CalculationDisplayDTO.toDate = todate;
        document.getElementById('searchTableSec');
    }

    tabledata = (e, index) => {
        this.setState({ searchTableSec: true, loader: true });
        this.setState({
            displayDataDetails: this.state.displayData.map((prop, key) => {
                return {
                    SNo: key + 1,
                    CalculationResultName: prop.calculationResultName,
                    CalculationResultValue: prop.calculationResultValue,
                };
            })
        });
    }

    render() {
        return (
            <div>
                {this.state.pageloader ?
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={money} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Calculation Display </small>
                            </h4>
                        }
                    </CardHeader>
                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <CardBody>
                            <div>
                                <GridContainer>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatetime required={true}
                                            onFocus={this.state.onClick}
                                            labelText="FromDate"
                                            id='fromDate'
                                            name='fromDate'
                                            onChange={(evt) => this.onDateChange('CalculationDisplayDTO', 'fromDate', evt)}
                                            value={this.state.CalculationDisplayDTO.fromDate}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatetime required={true}
                                            onFocus={this.state.onClick}
                                            labelText="ToDate"
                                            id='toDate'
                                            name='toDate'
                                            onChange={(evt) => this.onDateChange('CalculationDisplayDTO', 'toDate', evt)}
                                            value={this.state.CalculationDisplayDTO.toDate}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridContainer justify="center">
                                        <GridItem>
                                            <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.onFormSubmit}> Search  </Button>

                                        </GridItem>
                                    </GridContainer>
                                </GridContainer>
                            </div>
                        </CardBody>
                    </Animated>
                </Card>

                : <PageContentLoader />}
                {this.state.loader ?
                <GridContainer xl={12}>
                    {this.state.searchTableSec ?

                        <GridItem lg={12}>
                            <ReactTable
                                title={"Calculation Result"}
                                    data={this.state.displayDataDetails}
                                filterable

                                columns={[
                                    {

                                        Header: "Calculation Result Name",
                                        accessor: "CalculationResultName",
                                        headerClassName: 'react-table-center',
                                        //minWidth: 40,
                                        resizable: false,
                                    },
                                    
                                    {
                                        Header: "Calculation Result Value",
                                        accessor: "CalculationResultValue",
                                        headerClassName: 'react-table-center',
                                        //minWidth: 40,
                                        resizable: false,
                                    },
                                   
                                ]}

                                defaultPageSize={5}
                                showPaginationTop={false}
                                //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />
                        </GridItem>
                        : <GridItem lg={12}>
                            {this.state.nodata ?
                                <Card>
                                    <GridContainer lg={12} justify="center">
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <img src={data_Not_found} className="tab-data-not-found" />
                                        </Animated>
                                    </GridContainer>
                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1} >
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                </Card>
                                : null}
                        </GridItem>}

                </GridContainer>
                : <Card style={paddingCard}>
                    <TableContentLoader />
                </Card>}



            </div> 
            );
    }
}
export default CalculationDisplay;