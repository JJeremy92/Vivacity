"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});
const getApplicants = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM applicants');
        console.log("All applicants", result.rows);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
const createApplicant = (name, email, location, phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield pool.query(`INSERT INTO applicants (name, email, location, phone_number) VALUES ('${name}', '${email}', '${location}', '${phone_number}')`);
        return results.insertId;
    }
    catch (error) {
        throw error;
    }
});
const updateApplicant = (id, name, email, location, phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query(`UPDATE users SET name = ${name}, email = ${email}, location = ${location}, phone_number = ${phone_number} WHERE id = ${id}`);
        return id;
    }
    catch (error) {
        throw error;
    }
});
const deleteApplicant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query(`DELETE FROM users WHERE id = ${id}`);
        return id;
    }
    catch (error) {
        throw error;
    }
});
module.exports = {
    getApplicants,
    createApplicant,
    updateApplicant,
    deleteApplicant,
};
