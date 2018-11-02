"use strict";
module.exports = require('./lib/Gigya');

const Gigya = require('./lib/Gigya');

let main = () => {
    const apiKey = '';
    const secret = '';
    const userKey = '';
    let gigyaInstance = new Gigya(
        apiKey,
        secret
    );
    let prom = gigyaInstance.request(
        'accounts.initRegistration',
        { userKey: userKey, isLite: false });
    prom.then(
        (gigyaResponse) => {
            console.log(gigyaResponse);
            let regParams = {
                email: 'tn2134@gmail.com',
                password: 'Mordor121',
                regToken: gigyaResponse['regToken'],
                finalizeRegistration: true,
                userKey: userKey
            };
            let promReg = gigyaInstance.request(
                'accounts.register',
                regParams
                );
            promReg.then(
                (gigyaResponse) => {
                    console.log(gigyaResponse);
                },
                (reason) => {
                    console.log(reason);
                }
            );
        },
        (reason) => {
            console.log(reason);
        }
    );

    let loginParams = {
        loginID: 'tn2134@gmail.com',
        password: 'Mordor121',
        userKey: userKey
    }

    let loginPromise = gigyaInstance.request(
        'accounts.login',
        loginParams
    );
    loginPromise.then(
        (res) => {
            console.log('login success!');
            console.login(res);
        },
        (reason) => {
            console.log('login failed');
            console.log(reason);
        }
    );

    let jwtParams = {
        targetUID: '',
        userKey: userKey
    }
    let jwtPromise = gigyaInstance.request(
        'accounts.getJWT',
        jwtParams
    );

    jwtPromise.then(
        (respo) => {
            console.log(respo);
        },
        (error) => {
            console.log(error);
        }
    );
}

main();
