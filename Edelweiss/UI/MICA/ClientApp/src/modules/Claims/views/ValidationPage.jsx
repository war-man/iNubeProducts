const validationPage = {
    verifyCDvalue(value) {
        console.log("got it");
          var numRex = /^\d+(\.\d{1,2})?$/;
        //
        if (numRex.test(value)) {
            console.log("data coming decimal");
            return true;

        }
        return false;
    },
    verifydecimal(value) {
        var numRex = /^\d+(\.\d{1,2})?$/;
        //
        if (numRex.test(value)) {
            console.log("data coming decimal");
            return true;

        }
        return false;
    },


    verifydatetime(value) {
     //   var dateRex = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; 
        var dateRex = /^(0[1 - 9] | [12][0 - 9] | 3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/;
        if (dateRex.test(value)) {
            console.log("date coming");
            return true;

        }
        return false;
    },
    // function that returns true if value is name, false otherwise
    verifyName(value) {
        var nameRex = /^\S[0-9a-zA-Z-, ,#,/,\s ]+$/;
        if (nameRex.test(value)) {
            console.log("data coming name", value);
            return true;
           
        }
        return false;
    },
    // function that returns true if value is email, false otherwise
    verifyEmail(value) {
       // var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              	
        var emailRex =/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{1,7}$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    },
    // function that verifies if a string has a given length or not
    verifyPanNum(value, length) {
       // var panNum = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
       var panNum = /^([a-zA-Z]){3}([P]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
        if (panNum.test(value)) {
            return true;
        }
        return false;
    },
    verifyPanIndNum(value, length) {
        if (length == 8)//individual
        {
            var panNum = /^([a-zA-Z]){3}([P]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
            if (panNum.test(value)) {
                return true;
            }
        }
        else {
            var panNum = /^[A-Z]{3}[ABCEFGHLJPT]{1}[A-Z]{1}[0-9]{4}[A-Z]$/;
            if (panNum.test(value)) {
                return true;
            }
        }
        return false;
    },
    verifyLength(value, length) {
        console.log("comming value", value);
       
        var panNum = /^\(?([0]\d{1}[0-9]{1}\d{0,4})\)?[- ]?(\d{5,8})$/;
       
        if (panNum.test(value)) {
            return true;
        }
        return false;
    },

    verifylength(value, length) {
        console.log("comming value", value);
       // var num = /^\(?(\d{1,8})$/;
        var num = /^[A-Za-z0-9]+$/;
        if (num.test(value)) {
            return true;
        }
        return false;
    },

    // function that verifies if two strings are equal
    compare(string1, string2) {
        if (string1 == string2) {
            return true;
        }
        return false;
    },

    // function that verifies if value contains only numbers
    verifyNumber(value) {
        console.log("not comming");
     //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[6-9]\d{9}$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;
       
    },
    // verifies if value is a valid URL
    verifyUrl(value) {
        var Url = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (Url.test(value)) {
            return true;
        } else {
            return false;
        }

    },
    //verify the address
    verifyAddress(value) {

    },

    //verifies if a value is valid Policy Number
    verifyPolicynumber(value) {
        var policyNum = /^([0-9]{4})(\/)([0-9]{4})(\/)([0-9]{4})(\/)([0]{2})(\/)([0]{2,3})$/;
        if (policyNum.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    //verifies if a value is valid Claim Number
    verifyClaimNumber(value) {
        var claimNum = /^([0-9]{4})(\/)([0-9]{4})(\/)([0-9]{9,10})(\/)([0]{2})(\/)([1]{3})$/;
        if (claimNum.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    //verifies if a value is valid Bank IFSC Code
    verifyBankifsc(value) {
        var ifsc = /^([A-Z|a-z]{4}[0-9]{7})$/;
        if (ifsc.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    // verifies if a value is valid Bank Account Number
    verifyAccNumber(value) {
        var Regex = /^[0-9]\d{9,18}$/; 
        if (Regex.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    // verifies if a value is valid Bank Name
    verifyBankName(value) {
        var BKName = /^[A-Z|a-z][^#&<>\"~;$^%{}?]{1,20}$/;

       // var BKName = /^[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/;
        if (BKName.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    // verifies the person name
    verifyname(value) {
        var name = /^[a-zA-Z-'.' ]{1,25}$/;
        if (name.test(value)) {
            return true;
        } else {
            return false;
        }
    }

}
export default validationPage;