const oracledb = require('oracledb');
require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

const getConnection = () => {
    return oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectString: `${process.env.DB_HOST}/${process.env.DB_NAME}`
    });
}

module.exports = {
  getConnection
}