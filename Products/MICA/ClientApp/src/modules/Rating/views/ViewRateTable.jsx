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

class ViewRateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ViewRateTable: {
                
            }
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

    

    

    onFormSubmit = () => {
        //debugger;
        //fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CalculationDisplaySearch`, {
        //    method: 'post',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //    body: JSON.stringify(this.state.CalculationDisplayDTO)
        //}).then(response => response.json())
        //    .then(data => {

        //        this.setState({ displayData: data });
        //        if (this.state.displayData.length > 0) {
        //            this.setState({ searchTableSec: false, loader: false });
        //            this.tabledata();
        //        } else {
        //            setTimeout(
        //                function () {
        //                    this.setState({ loader: true, searchTableSec: false, nodata: true });
        //                }.bind(this), 2000
        //            );
        //        }

        //        console.log("Search calculation display data:", data);

        //    });

    }

    //tabledata = (e, index) => {
    //    this.setState({ searchTableSec: true, loader: true });
    //    this.setState({
    //        displayDataDetails: this.state.displayData.map((prop, key) => {
    //            return {
    //                SNo: key + 1,
    //                CalculationResultName: prop.calculationResultName,
    //                CalculationResultValue: prop.calculationResultValue,
    //            };
    //        })
    //    });
    //}

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
                                    <small> View RateTable </small>
                                </h4>
                            }
                        </CardHeader>
                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                            <CardBody>
                                <div>
                                    <GridContainer>

                                        
                                        <GridContainer justify="center">
                                            <GridItem>
                                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.onFormSubmit}> Submit  </Button>

                                            </GridItem>
                                        </GridContainer>
                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Animated>
                    </Card>

                    : <PageContentLoader />}
                
            </div>

        );
    }
}
export default ViewRateTable;