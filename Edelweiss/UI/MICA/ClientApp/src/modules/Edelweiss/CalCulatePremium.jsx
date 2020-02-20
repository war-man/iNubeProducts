let CalCulatePremuim = {

    PremiumCalCulation(data) {

      
        fetch(`https://localhost:44351/api/Policy/CalCulatePremium`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log("hmpagedata", data);
                let ftmp = data.filter((e) => e.entity === 'FTPM')[0].eValue;
                let adpmpd = data.filter((e) => e.entity === 'ADPMPD')[0].eValue;
               // this.setState({ ftmpval: ftmp, adpmpdval: adpmpd });
              //  console.log("ftmp11", this.state.ftmpval, this.state.adpmpdval);
                let num1 = eval(ftmp);
                let num2 = eval(adpmpd);
                let add = num1 + num2;
                let obj = {
                    'add': add.toFixed(2),
                    'ftmp': ftmp,
                    'adpmpd': adpmpd
                };
                console.log("rateresult", obj, add, ftmp);
                return obj;
             //   this.setState({ premperday: add.toFixed(2) });
               // console.log("added", add);
                //console.log("premperday", this.state.premperday);

               // this.setState({ result: data });
                //console.log(this.state.result, 'Result');
            });




    }


}


export default CalCulatePremuim;