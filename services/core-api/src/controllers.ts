import client from './v1/routes/client.route';
import phone from './v1/routes/phone.route';
import phonetype from './v1/routes/phone-type.route';
import address from './v1/routes/address.route';
import report from './v1/routes/report.route';

const controllers = [
    client,
    phone,
    phonetype,
    address,
    report
];

export default controllers;