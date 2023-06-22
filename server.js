const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// In-memory database for storing bank and branch data (replace this with your own database)
const banks = [];

// GET endpoint to retrieve all banks
app.get('/banks', (req, res) => {
  res.json(banks);
});

// POST endpoint to create a new bank
app.post('/banks', (req, res) => {
  const bankData = req.body;
  banks.push(bankData);
  res.json({ message: 'Bank created successfully' });
});

// GET endpoint to retrieve a specific bank
app.get('/banks/:bankId', (req, res) => {
  const bankId = req.params.bankId;
  const bank = banks.find((b) => b.id === bankId);

  if (!bank) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  res.json(bank);
});

// PUT endpoint to update a specific bank
app.put('/banks/:bankId', (req, res) => {
  const bankId = req.params.bankId;
  const bank = banks.find((b) => b.id === bankId);

  if (!bank) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  const updatedBankData = req.body;
  Object.assign(bank, updatedBankData);
  res.json({ message: 'Bank updated successfully' });
});

// DELETE endpoint to delete a specific bank
app.delete('/banks/:bankId', (req, res) => {
  const bankId = req.params.bankId;
  const bankIndex = banks.findIndex((b) => b.id === bankId);

  if (bankIndex === -1) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  banks.splice(bankIndex, 1);
  res.json({ message: 'Bank deleted successfully' });
});

// GET endpoint to retrieve all branches of a specific bank
app.get('/banks/:bankId/branches', (req, res) => {
  const bankId = req.params.bankId;
  const bank = banks.find((b) => b.id === bankId);

  if (!bank) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  res.json(bank.branches);
});

// POST endpoint to create a new branch for a specific bank
app.post('/banks/:bankId/branches', (req, res) => {
  const bankId = req.params.bankId;
  const bank = banks.find((b) => b.id === bankId);

  if (!bank) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  const branchData = req.body;
  bank.branches.push(branchData);
  res.json({ message: 'Branch created successfully' });
});

// GET endpoint to retrieve a specific branch of a specific bank
app.get('/banks/:bankId/branches/:branchId', (req, res) => {
  const bankId = req.params.bankId;
  const branchId = req.params.branchId;
  const bank = banks.find((b) => b.id === bankId);

  if (!bank) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  const branch = bank.branches.find((br) => br.id === branchId);

  if (!branch) {
    return res.status(404).json({ error: 'Branch not found' });
  }

  res.json(branch);
});

// PUT endpoint to update a specific branch of a specific bank
app.put('/banks/:bankId/branches/:branchId', (req, res) => {
  const bankId = req.params.bankId;
  const branchId = req.params.branchId;
  const bank = banks.find((b) => b.id === bankId);

  if (!bank) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  const branch = bank.branches.find((br) => br.id === branchId);

  if (!branch) {
    return res.status(404).json({ error: 'Branch not found' });
  }

  const updatedBranchData = req.body;
  Object.assign(branch, updatedBranchData);
  res.json({ message: 'Branch updated successfully' });
});

// DELETE endpoint to delete a specific branch of a specific bank
app.delete('/banks/:bankId/branches/:branchId', (req, res) => {
  const bankId = req.params.bankId;
  const branchId = req.params.branchId;
  const bank = banks.find((b) => b.id === bankId);

  if (!bank) {
    return res.status(404).json({ error: 'Bank not found' });
  }

  const branchIndex = bank.branches.findIndex((br) => br.id === branchId);

  if (branchIndex === -1) {
    return res.status(404).json({ error: 'Branch not found' });
  }

  bank.branches.splice(branchIndex, 1);
  res.json({ message: 'Branch deleted successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});