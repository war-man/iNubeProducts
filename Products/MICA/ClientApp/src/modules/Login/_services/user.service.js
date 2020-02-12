import config from '../../../config';
import { authHeader } from '../_helpers';
import React from "react";
import { Redirect } from 'react-router-dom'
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    getUserType,
    delete: _delete
};

function login(username, password) {
    console.log('login Service Clicked');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    
    console.log(config.apiUrl);
    return fetch(`${config.apiUrl}/Login/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
function getUserType(userName) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('Api Url'+config.apiUrl);
    return fetch(`${config.apiUrl}/Login/GetUserType/${userName}`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
   
    return response.text().then(text => {
        console.log('handle response ' + response);
        const data = text && JSON.parse(text);
        console.log('handle response data  ' + data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                Location.reload(true);
            }
            if (response.status === 404) {
                // auto logout if 401 response returned from api
                //logout();
                Location.reload(true);
                console.log('Error ');
                return <Redirect to='/pages/password-page' />
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}