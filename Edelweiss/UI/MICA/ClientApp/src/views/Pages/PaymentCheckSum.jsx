import React from "react";



class PaymentCheckSum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
       console.log("checksum of payment",this.props)
        var paytmParams = {};
        //for (var key in received_data) {
        //    if (key == "CHECKSUMHASH") {
        //        paytmChecksum = received_data[key];
        //    } else {
        //        paytmParams[key] = received_data[key];
        //    }
        //}



    }

    render() {

        const { classes } = this.props;
        return (<h1>Ready To payment</h1>
);

    }

}
export default PaymentCheckSum;