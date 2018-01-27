import {CognitoCallback, CognitoUtil, RegistrationUser} from "./cognito.service";
import {Injectable} from "@angular/core";

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export class UserRegistrationService {
    constructor(public cUtil: CognitoUtil) {
    }

    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log("user: " + user);

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: user.email
        };
        let dataName = {
            Name: 'name',
            Value: user.name
        };

        let dataSurname = {
            Name: 'family_name',
            Value: user.family_name
        };

        let dataGender = {
            Name: 'gender',
            Value: user.gender
        };

        let dataDOB = {
            Name: 'birthdate',
            Value: user.birthdate
        };

        let dataCity = {
            Name: 'custom:city',
            Value: user.city
        };

        let dataCountry = {
            Name: 'custom:country',
            Value: user.country
        };

        let dataZIP = {
            Name: 'custom:zip',
            Value: user.zip
        };

        let dataPhone = {
            Name: 'phone_number',
            Value: user.phone_number
        };
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataSurname));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataGender));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataDOB));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataCity));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataCountry));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataZIP));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhone));
        //attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataNickname));

        this.cUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                console.log("registered user: " + result);
                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };
		console.log(username);
		console.log(this.cUtil.getUserPool());
        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };
		console.log(username);
		console.log(this.cUtil.getUserPool());
        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

}