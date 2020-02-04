const bcrypt = require('bcrypt');
const saltRounds = 10;
const NOT_UNIQUE = 1062; // error num for unique constraint from mariadb
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: 'team8',
    password: 'WehaveControl',
    database: 'geektext',
    connectionLimit: 2,
    dateStrings: 'date'
    //rowsAsArray: true
});

async function getBook(info, callback) {
    var query = 'select * from book where bookid=?';
    pool.query(query, [info.bookid])
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function getAuthorInfo(info, callback) {
    var query = 'select * from author where authorid=?';
    pool.query(query, [info.authorid])
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        });
}

async function getComments(info, callback) {
    var query = 'select * from comments where bookid=?';
    pool.query(query, [info.bookid])
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        });
}

module.exports = {
    getBook,
    getAuthorInfo,
    getComments,
};
