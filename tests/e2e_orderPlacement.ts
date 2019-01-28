import {expect} from "chai";

describe('Order placed with', () => {


    const productDetail = {
        image: '.main-image > a > img',
        shortDescription: '.short-description',
        regularPrice: '.price-wrapper .regular-price',
        disccountPrice: '#box-product  .campaign-price',
        tax: '.tax',
        shipping: 'cheapest-shipping',
        sku: '.sku span',
        mnp: '.mpn span',
        stock: '.stock-available span',
        delivery: '.stock-delivery span',
        size: '#box-product > div.row > div:nth-child(3) > div.buy_now > form > div.form-group.required > div > select', //tmp selector, 'options[Size]' does not work, why?
        quantity: '[name="quantity"]',
        addToCart: '.btn-success'
    };
    const cart = {
        quantity: '.details .quantity',
        amount: '.details .formatted_value'
    };

    const customer = {
        firstname: '[name="firstname"]',
        lastname: '[name="lastname"]',
        address1: '[name="address1"]',
        address2: '[name="address2"]',
        zip: '[name="postcode"]',
        city: '[name="city"]',
        country: '[name="country_code"]',
        zone: '[name="zone_code"]',
        email: '#box-checkout-customer [name="email"]',
        phone: '[name="phone"]'
    };
    const confirmOrder = '#box-checkout-summary [name="confirm_order"]';

    const confirmation = {
        item: '#box-order-success .item',
        totalPrice: '#box-order-success p:nth-of-type(2)'
    };

    it('successfully for one item', () => {
        // Open category -> select a product -> select options -> add to cart - > go through checkout - > validate confirmation page
        browser.url('/rubber-ducks-c-1/yellow-duck-p-1');
        expect($(productDetail.sku).isVisible()).to.be.true;

        expect($(cart.amount).getText()).is.equal('$0'); //make sure that cart is empty
        console.log('Available quantity is:', ($('.stock-available span').getText()).replace(/\D+/g, ''));
        const greenAvailability = ($(productDetail.stock).getText()).replace(/\D+/g, ''); //contains only digit's part of string
        if (Number(greenAvailability) > 0) { //Adds product to cart if stock is available
            $(productDetail.size).selectByValue('Small');
            $(productDetail.quantity).setValue('1');
            $(productDetail.addToCart).click();
            browser.waitUntil(() => {
                    return $(cart.amount).getText() === $(productDetail.disccountPrice).getText()
                },
                2000,
                'Item is not added to cart');
            expect($(cart.amount).getText()).to.be.equals($(productDetail.disccountPrice).getText());
            console.log('Cart amount:', $(cart.amount).getText()); // for debug
        } else {
            console.log('Yellow dug is out of stock:', $(productDetail.stock).getText());
            return false;
        }
        $(cart.quantity).click();
        browser.waitUntil(() => {
                return $(confirmOrder).isVisible()
            },
            2000, 'Checkout page is not opened in 2 sec');

        expect($(confirmOrder).isEnabled()).to.be.false;
        $(customer.firstname).setValue('REDTestAccountFName');
        $(customer.lastname).setValue('TestAccountLastName');
        $(customer.address1).setValue('test 1');
        $(customer.address2).setValue('test 2');
        $(customer.zip).setValue('07064-1813');
        $(customer.city).setValue('TestCity');
        $(customer.country).selectByValue('US');
        $(customer.zone).selectByValue('CA');
        $(customer.email).setValue('testemail1@email.com');
        $(customer.phone).setValue('2342342344');
        $('[name="save_customer_details"]').click();
        $(confirmOrder).waitForEnabled(1500);
        expect($(confirmOrder).isEnabled()).to.be.true;
        $(confirmOrder).click();
        console.log('Total is', $(confirmation.totalPrice).getText());
        expect($(confirmation.item).getText()).is.equal('1 x Yellow Duck');


    });

    it.skip('successfully for several items', () => {
        // Open category -> select a product -> specify some options -> add to cart - > go to another category or product -> add it to cart -> go through checkout - > validate confirmation page
    });

    it('an item without size', () => {
// Open category -> select a product without options to specify -> add to cart - > go through checkout - > validate confirmation page
        browser.url('/rubber-ducks-c-1/green-duck-p-2');
        expect($(productDetail.sku).isVisible()).to.be.true;
        expect($(cart.amount).getText()).is.equal('$0'); //make sure that cart is empty

        console.log('Available quantity is:', ($('.stock-available span').getText()).replace(/\D+/g, ''));
        const greenAvailability = ($(productDetail.stock).getText()).replace(/\D+/g, ''); //contains only digit's part of string
        if (Number(greenAvailability) > 0) { //Adds product to cart if stock is available
            $(productDetail.quantity).setValue('1');
            $(productDetail.addToCart).click();
            browser.waitUntil(() => {
                    return $(cart.amount).getText() === $(productDetail.regularPrice).getText()
                },
                2000,
                'Item is not added to cart');
            expect($(cart.amount).getText()).to.be.equals($(productDetail.regularPrice).getText());
            console.log('Cart amount:', $(cart.amount).getText()); // for debug
        } else {
            console.log('Green dug is out of stock:', $(productDetail.stock).getText());
            return false;
        }
        $(cart.quantity).click();
        browser.waitUntil(() => {
                return $(confirmOrder).isVisible()
            },
            2000, 'Checkout page is not opened in 2 sec');
        $(confirmOrder).waitForEnabled(2500);
        browser.pause(3000);
        expect($(confirmOrder).isEnabled()).to.be.true;
        $(confirmOrder).click();
        console.log('Total is', $(confirmation.totalPrice).getText());
        expect($(confirmation.item).getText()).is.equal('1 x Green Duck');

    });

});