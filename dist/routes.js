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
var { Router } = require('express');
const db = require('./db');
const router = Router();
// GET applicant information
router.get('/awesome/applicant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.getApplicants();
        res.json(result[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
}));
// POST new applicant
router.post('/applicants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, location, phone_number } = req.body;
    try {
        const result = yield db.createApplicant(name, email, location, phone_number);
        if (result)
            res.status(201).json(`Applicant created with ID: ${result}`);
        else
            res.status(500).json({ message: "Error adding applicant" });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding applicant", error });
    }
}));
// PUT update applicant
router.put('/applicants/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, location, phone_number } = req.body;
    try {
        const result = yield db.updateApplicant(id, name, email, location, phone_number);
        if (result)
            res.status(201).json(`Applicat updated with ID: ${result}`);
        else
            res.status(500).json({ message: "Error updating applicant" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating applicant", error });
    }
}));
// DELETE an applicant
router.delete('/applicants/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db.deleteApplicant(id);
        if (result)
            res.status(201).json(`Applicat deleted with ID: ${result}`);
        else
            res.status(500).json({ message: "Error deleting applicant" });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting applicant", error });
    }
}));
module.exports = router;
