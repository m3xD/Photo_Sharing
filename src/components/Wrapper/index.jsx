import React from 'react';
import UserDetail from '../UserDetail';
import LoginUser from "../Login";

const UserDetailWrapper = (props) => {
    return <LoginUser onLogin = {props.onLogin} />;
};

export default UserDetailWrapper;
