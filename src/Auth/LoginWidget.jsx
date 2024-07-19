import {Redirect} from 'react-router-dom';
import { useOktaAuth } from "@okta/okta-react";
import { Spinner } from 'react-bootstrap';
import OktaSigninWidget from './OktaSigninWidget';

const LoginWidget =({config}) =>{
    const {oktaAuth,authState}=useOktaAuth();
    const onSuccess =(token) =>{
        oktaAuth.handleLoginRedirect(token);
    };
    const onError =(err)=>{
        console.log('Sign in error')
    }

    if(!authState)
    {
        return (
            <SpinnerLoading/>
        )
    }
    return authState.isAuthenticated ?
    <Redirect to={{pathname:'/'}}/>
    :
    <OktaSigninWidget config={config} onSuccess={onSuccess} onError={onError}/>
};
export default LoginWidget;