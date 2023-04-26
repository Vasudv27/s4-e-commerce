const pool = require('../conf/mongo.config');

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');



module.exports = {
  addUser: (obj) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [rows, fields] = await pool.query('INSERT INTO users SET ?', obj);
        if (rows.affectedRows > 0) {
          resolve({ status: true });
        } else {
          resolve({ status: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  doLogin: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?', [body.email]);
        if (rows.length > 0) {
          const user = rows[0];
          const match = await bcrypt.compare(body.password, user.password);
          if (match) {
            resolve({
              user: match,
              username: user.username,
              status: true
            });
          } else {
            resolve({
              user: false,
              status: false
            });
          }
        } else {
          resolve({
            user: false,
            status: false
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  userCount: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?', [body.email]);
        if (rows.length > 0) {
          resolve({
            user: true,
            status: true
          });
        } else {
          resolve({
            user: false,
            status: false
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
};
