import {expect} from "chai";

//Positive tests for http://ip-5236.sunline.net.ua:38015/create_account
//Negative tests for http://ip-5236.sunline.net.ua:38015/create_account

describe('New Account form verification', () => {

    const userName = 'Testemail_' + (Math.random() * 101) + '@email.com';
    const password = 'testPasswd';
    const newAccountFields = {
        firstname: '[name="firstname"]',
        lastname: '[name="lastname"]',
        country: '[name="country_code"]',
        zone: '[name="zone_code"]',
        email: '#box-create-account [name="email"]',
        password: '#box-create-account [name="password"]',
        passwordConfirmed: '#box-create-account [name="confirmed_password"]',
        create: '[name="create_account"]'
    };
    const okAlert = '.alert-success i';
    // const loggedUser = '//*[@class="account dropdown"]/a/text()';
    // const confirmationText = '//*[@id="notices"]/div/text()';

    it('Verify ability to create an account', () => {

        browser.url('/create_account');
        $(newAccountFields.firstname).setValue('TestAccountFName');
        $(newAccountFields.lastname).setValue('TestAccountLastName');
        $(newAccountFields.country).selectByValue('US');
        $(newAccountFields.zone).selectByValue('CA');
        $(newAccountFields.email).setValue(userName);
        $(newAccountFields.password).setValue(password);
        $(newAccountFields.passwordConfirmed).setValue(password);
        $(newAccountFields.create).click();

        expect($(okAlert).isVisible()).to.be.true;
        // expect(confirmationText.getText()).is.contain('Your customer account has been created.');
        // const alertText = loggedUser.getText();
        // expect(loggedUser).to.equal(newAccountFields.firstname);
        expect($('.alert-danger i').isVisible()).to.be.false;
    });

    it('Verify that the same customer cannot be created', () => {
        browser.url('/create_account');
        $(newAccountFields.firstname).setValue('TestAccountFName');
        $(newAccountFields.lastname).setValue('TestAccountLastName');
        $(newAccountFields.country).selectByValue('US');
        $(newAccountFields.zone).selectByValue('CA');
        $(newAccountFields.email).setValue(userName);
        $(newAccountFields.password).setValue(password);
        $(newAccountFields.passwordConfirmed).setValue(password);
        $(newAccountFields.create).click();

        expect($('.alert-success i').isVisible()).to.be.false;
        expect($('.alert-danger i').isVisible()).to.be.true;
    });
});