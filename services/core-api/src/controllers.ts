import client from './v1/routes/client.route.js';
import phone from './v1/routes/client-phone.route.js';
import phoneType from './v1/routes/phone-type-param.route.js';
import address from './v1/routes/client-address.route.js';
import report from './v1/routes/report.route.js';
import addressType from './v1/routes/address-type-param.route.js';

const controllers = [
    client,
    phone,
    phoneType,
    addressType,
    address,
    report
];

export default controllers;
