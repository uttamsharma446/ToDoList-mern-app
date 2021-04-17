import React from 'react'
import firebase from './firebase'

function PhoneNumberAuth() {
   const handleClick=()=>{
    let recaptcha=new firebase.auth.RecaptchaVerifier('recaptcha');
    let number="+917080216071"
     firebase.auth().signInWithPhoneNumber(number,recaptcha)
     .then(e=>{
         let code=prompt("Enter The OTP",'');
         if(code==null) return;
         e.confirm(code).then(result=>{
             console.log(result.user,'user');
             document.querySelector('label').textContent=result.user+" Number Verified";
         }).catch(err=>{
             console.log(err);
         })
     })
   }
    return (
        <div>
            <label></label>
            <button onClick={handleClick}>click here</button>
        </div>
    )
}

export default PhoneNumberAuth
