import client from './v1/routes/client.route.js';
import phone from './v1/routes/client-phone.route.js';
import phonetype from './v1/routes/phone-type.route.js';
import address from './v1/routes/client-address.route.js';
import report from './v1/routes/report.route.js';

const controllers = [
    client,
    phone,
    phonetype,
    address,
    report
];

export default controllers;
