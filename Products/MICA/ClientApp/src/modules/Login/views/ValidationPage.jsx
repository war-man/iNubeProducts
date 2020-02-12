const validationPage = {

    verifydecimal(value) {
        var numRex = /^\d+(\.\d{1,2})?$/;
        //
        if (numRex.test(value)) {
            return true;

        }
        return false;
    },

    verifypass(value) {
        //Input Password and Submit[7 to 15 characters which contain at least one numeric digit and a special character]
        // var dateRex = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
        var dateRex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (dateRex.test(value)) {
            return true;
        }
        return false;
    },

    verifydatetime(value) {
        var dateRex = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/; 
        if (dateRex.test(value)) {
            return true;
        }
        return false;
    },
    // function that returns true if value is name, false otherwise
    verifyName(value) {
        var nameRex = /^[0-9a-zA-Z\s-\, ,#,/]+$/;
        
        if (nameRex.test(value)) {
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
       var panNum = /^[0-9]+$/;
       // var panNum = /^[6-9]\d{1}[0-9]\d{0,9}$/;
      //  var panNum =/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      // var panNum = /^\(?([0]\d{1}[0-9]{1}\d{0,4})\)?[- ]?(\d{6,8})$/;
     //   value = value.replace(/[^\d]/g, "");
      //  var panNum = /^([0]\d{1}[0-9]\d{2,4})[/-][0-9]\d{6,8}$/;
       // 
        if (panNum.test(value) && value.length === length ) {
            return true;
        }
        return false;
    },
    verifyLength(value, length) {
        // var panNum = /^[0-9]+$/;
        // var panNum = /^[6-9]\d{1}[0-9]\d{0,9}$/;
        //  var panNum =/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        var panNum = /^\(?([0]\d{1}[0-9]{1}\d{0,4})\)?[- ]?(\d{6,8})$/;
        //   value = value.replace(/[^\d]/g, "");
        //  var panNum = /^([0]\d{1}[0-9]\d{2,4})[/-][0-9]\d{6,8}$/;
        // && value.length == length
        if (panNum.test(value)) {
            return true;
        }
        return false;
    },

    // function that verifies if two strings are equal
    compare(string1, string2) {
        if (string1 === string2) {
            return true;
        }
        return false;
    },
    // function that verifies if value contains only numbers
    verifyNumber(value) {
     //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[0-9]\d{9}$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;
       
    },
    //verifies if value is a 
    verifyPhNumber(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[6-9]\d{1}[0-9]\d{7}$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;

    },
    // verifies if value is a valid URL
    verifyUrl(value) {
        try {
            new URL(value);
            return true;
        } catch (_) {
            return false;
        }
    },
    //verify the address
    verifyAddress(value) {

    }
}
export default validationPage;