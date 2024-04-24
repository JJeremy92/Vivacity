var { Router } = require('express');
const db = require('./db')

const router = Router();

// GET applicant information
router.get('/awesome/applicant', async (req: any, res: any) => {
  try {
    const result = await db.getApplicants();
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// POST new applicant
router.post('/applicants', async (req: any, res: any) => {
  const { name, email, location, phone_number } = req.body;
  try {
    const result = await db.createApplicant(name, email, location, phone_number);
    if (result)
      res.status(201).json(`Applicant created with ID: ${result}`);
    else
      res.status(500).json({ message: "Error adding applicant" });
  } catch (error) {
    res.status(500).json({ message: "Error adding applicant", error });
  }
});


// PUT update applicant
router.put('/applicants/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const { name, email, location, phone_number } = req.body;
  try {
    const result = await db.updateApplicant(id, name, email, location, phone_number);
    if (result)
      res.status(201).json(`Applicat updated with ID: ${result}`);
    else
      res.status(500).json({ message: "Error updating applicant" });
  } catch (error) {
    res.status(500).json({ message: "Error updating applicant", error });
  }
});

// DELETE an applicant
router.delete('/applicants/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const result = await db.deleteApplicant(id);
    if (result)
      res.status(201).json(`Applicat deleted with ID: ${result}`);
    else
      res.status(500).json({ message: "Error deleting applicant" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting applicant", error });
  }
});

module.exports = router;