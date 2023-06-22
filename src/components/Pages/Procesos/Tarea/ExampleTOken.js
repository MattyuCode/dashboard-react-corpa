import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import jwt_decode from 'jwt-decode';

const isValidSession=()=>{
    let valid=false;
    let tokenVal=localStorage.getItem("m_token");

    if(tokenVal){
            if(tokenVal!='undefined'){
                let token = jwt_decode(localStorage.getItem("m_token"));
                let currentDate=new Date();

                if(token.exp * 1000<currentDate.getTime()){
                    valid = false;
                    localStorage.removeItem("m_token");
                    console.log("Sesion expirada");
                }else{
                    valid=true;
                }
            }else {
                valid=false;
            }
    }else{
            valid=false;
            console.log("no valida");
    }
        return valid;

    
}

const getCurrentUser=()=>{
    return localStorage.getItem("m_token").unique_name
} 

const logout=()=>{

    localStorage.removeItem("m_token");
}

const AuthService={
    logout,
    getCurrentUser,
    isValidSession,
};

export default AuthService;