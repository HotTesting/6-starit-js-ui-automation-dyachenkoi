import {expect} from "chai";

//Positive tests for http://ip-5236.sunline.net.ua:38015/create_account
//Negative tests for http://ip-5236.sunline.net.ua:38015/create_account

describe('New Account form verification', function () {

    it('Verify ability to create an account', function () {
        browser.url('/create_account');
        $('[name="firstname"]').setValue('TestAccountFName');
        $('[name="lastname"]').setValue('TestAccountLastName');
        $('[name="country_code"]').selectByValue('US');
        $('[name="zone_code"]').selectByValue('CA');
        $('#box-create-account [name="email"]').setValue('Testemail_6@emaol.com'); //ToDo: implement some random email generation
        $('#box-create-account [name="password"]').setValue('testPasswd');
        $('#box-create-account [name="confirmed_password"]').setValue('testPasswd');
        $('[name="create_account"]').click();

        expect($('#default-menu > ul.nav.navbar-nav.navbar-right > li.account.dropdown > a').isVisible()).to.be.true;
        expect($('.alert-success i').isVisible()).to.be.true;
        expect($('.alert-danger i').isVisible()).to.be.false;
    });

    it('Verify that the same customer cannot be created', function () {
        browser.url('/create_account');
        $('[name="firstname"]').setValue('TestAccountFName');
        $('[name="lastname"]').setValue('TestAccountLastName');
        $('[name="country_code"]').selectByValue('US');
        $('[name="zone_code"]').selectByValue('CA');
        $('#box-create-account [name="email"]').setValue('Testemail_6@emaol.com'); //ToDo: implement some random email generation
        $('#box-create-account [name="password"]').setValue('testPasswd');
        $('#box-create-account [name="confirmed_password"]').setValue('testPasswd');
        $('[name="create_account"]').click();

        expect($('.alert-success i').isVisible()).to.be.false;
        expect($('.alert-danger i').isVisible()).to.be.true;
    });
});
