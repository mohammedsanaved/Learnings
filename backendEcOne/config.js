require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || '234234vdfdfgdfvdf';

module.exports = JWT_SECRET;
