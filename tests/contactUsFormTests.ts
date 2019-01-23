import {expect} from "chai";


//ToDo: Refactor tests to PageObject pattern: form-control should be an object with extendable fields
//Positive tests for http://ip-5236.sunline.net.ua:38015/customer-service-s-0
//Negative tests for http://ip-5236.sunline.net.ua:38015/customer-service-s-0
// ToDo: move tests to separate file

describe('Contact Us form verification', () => {

    it('Verify ability to send a message through Contact Us form', () => {
        browser.url('/customer-service-s-0');
        $('[name="name"]').setValue('TestName');
        $('#box-contact-us [name="email"]').setValue('Testemail@emaol.com');
        $('[name="subject"]').setValue('TestSubject');
        $('[name="message"]').setValue('TestMessage');
        $('[name="send"]').click();

        expect($('#notices i').isVisible()).to.be.true;
        // expect($('$(\'[name="name"]\')').) ToDo: Make sure that field has no value after submission
        // browser.pause(37000); ToDo: Make sure that the message is disappeared in ~20-30 sec
        // expect($('#notices i').isVisible()).to.be.false;
    });


    it('Verify validators by attempting to send an empty required fields through Contact Us form', () => {
        browser.url('/customer-service-s-0');

        $('[name="name"]').clearElement();
        $('#box-contact-us [name="email"]').clearElement();
        $('[name="subject"]').clearElement();
        $('[name="message"]').clearElement();
        $('[name="send"]').click();

        expect($('#notices i').isVisible()).to.be.false;
    });
});