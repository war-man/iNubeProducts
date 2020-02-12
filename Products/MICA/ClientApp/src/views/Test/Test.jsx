import React from "react";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ChildTest from "views/Test/ChildTest.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
    ],
}];

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            show: false,
            city: [{ stateId: 1, city: 'Mumbai', cityId: 3 }, { stateId: 1, city: 'Thane', cityId: 2 }, { stateId: 2, city: 'Bangalore', cityId: 4 }, { stateId: 2, city: 'Tumkur', cityId: 5 }],
            cityList: [],
            checked: [],
            expanded: []
        };
        this.hideAlert = this.hideAlert.bind(this);
        this.successDelete = this.successDelete.bind(this);
        this.cancelDetele = this.cancelDetele.bind(this);
        this.inputConfirmAlert = this.inputConfirmAlert.bind(this);
        this.inputConfirmAlertNext = this.inputConfirmAlertNext.bind(this);
    }
    basicAlert() {
        console.log(this.state.city);
        this.setState({
            lstCity: this.state.city.filter(item => item.stateId == 1)
        });
        console.log(this.state.lstCity);
        this.setState({
            alert: (
                <SweetAlert
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Here's a message!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                />
            )
        });

    }
    titleAndTextAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Here's a message!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.info
                    }
                >
                    It's pretty, isn't it?
        </SweetAlert>
            )
        });
    }
    successAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Good job!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    You clicked the button!
        </SweetAlert>
            )
        });
    }
    htmlAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    style={{ display: "block", marginTop: "-100px" }}
                    title="HTML example"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    You can use <b>bold</b> text,{" "}
                    <a href="http://www.inubesolutions.com/">links</a> and other HTML tags
        </SweetAlert>
            )
        });
    }
    warningWithConfirmMessage() {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Are you sure?"
                    onConfirm={() => this.successDelete()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                    cancelBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.danger
                    }
                    confirmBtnText="Yes, delete it!"
                    cancelBtnText="Cancel"
                    showCancel
                >
                    You will not be able to recover this imaginary file!
        </SweetAlert>
            )
        });
    }
    warningWithConfirmAndCancelMessage() {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Are you sure?"
                    onConfirm={() => this.successDelete()}
                    onCancel={() => this.cancelDetele()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                    cancelBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.danger
                    }
                    confirmBtnText="Yes, delete it!"
                    cancelBtnText="Cancel"
                    showCancel
                >
                    You will not be able to recover this imaginary file!
        </SweetAlert>
            )
        });
    }
    autoCloseAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Auto close alert!"
                    onConfirm={() => this.hideAlert()}
                    showConfirm={false}
                >
                    I will close in 2 seconds.
        </SweetAlert>
            )
        });
        setTimeout(this.hideAlert, 2000);
    }
    inputAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    input
                    showCancel
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Input something"
                    onConfirm={e => this.inputConfirmAlert(e)}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.info
                    }
                    cancelBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.danger
                    }
                />
            )
        });
    }
    inputConfirmAlert(e) {
        this.setState({ alert: e });
        setTimeout(this.inputConfirmAlertNext, 200);
    }
    inputConfirmAlertNext() {
        const inputValue = this.state.alert;
        this.setState({
            alert: (
                <SweetAlert
                    style={{ display: "block", marginTop: "-100px" }}
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.info
                    }
                    title={
                        <p>
                            You entered: <b>{inputValue}</b>
                        </p>
                    }
                />
            )
        });
    }
    successDelete() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Deleted!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    Your imaginary file has been deleted.
        </SweetAlert>
            )
        });
    }
    cancelDetele() {
        this.setState({
            alert: (
                <SweetAlert
                    danger
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Cancelled"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    Your imaginary file is safe :)
        </SweetAlert>
            )
        });
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Heading
                    textAlign="center"
                    title="Test"
                    category={
                        <span>
                        you want to test something try it here
            </span>
                    }
                />
                {this.state.alert}
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card>
                            <CardBody>
                                <div className={classes.center}>
                                    <h5>Basic example</h5>
                                    <Button color="rose" onClick={this.basicAlert.bind(this)}>
                                        Try me!
                  </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={3}>
                        <Card>
                            <CardBody>
                                <div className={classes.center}>
                                    <h5>
                                        ...and by passing a parameter, you can execute something
                                        else for "Cancel"
                  </h5>
                                    <Button
                                        color="rose"
                                        onClick={this.warningWithConfirmAndCancelMessage.bind(this)}
                                    >
                                        Try me!
                  </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card>
                            <CardBody>
                                <div className={classes.center}>
                                    <h5>A message with auto close timer set to 2 seconds</h5>
                                    <Button color="rose" onClick={this.autoCloseAlert.bind(this)}>
                                        Try me!
                  </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card>
                            <CardBody>
                                <div className={classes.center}>
                                    <h5>Modal window with input field</h5>
                                    <Button color="rose" onClick={this.inputAlert.bind(this)}>
                                        Try me!
                  </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <ChildTest/>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <CheckboxTree
                            nodes={nodes}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(sweetAlertStyle)(Test);
