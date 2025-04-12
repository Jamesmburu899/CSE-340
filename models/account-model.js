const pool = require("../database/")

const accountModel = {}

/* *****************************
* Get account by ID
* ***************************** */
accountModel.getAccountById = async function (account_id) {
  try {
    const result = await pool.query(
      'SELECT * FROM account WHERE account_id = $1',
      [account_id]
    )
    return result.rows[0]
  } catch (error) {
    return new Error("No matching account found")
  }
}

/* *****************************
* Update Account Info
* ***************************** */
accountModel.updateAccount = async function (account_id, account_firstname, account_lastname, account_email) {
  try {
    const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *"
    const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_id])
    return result.rows[0]
  } catch (error) {
    return new Error("Account update failed")
  }
}

/* *****************************
* Update Password
* ***************************** */
accountModel.updatePassword = async function (account_id, account_password) {
  try {
    const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *"
    const result = await pool.query(sql, [account_password, account_id])
    return result.rows[0]
  } catch (error) {
    return new Error("Password update failed")
  }
}

module.exports = accountModel