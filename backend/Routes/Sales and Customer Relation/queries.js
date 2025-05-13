import express from 'express';
import queriesSchema from '../../models/Sales and Customer Relation/query.js';

const router = express.Router();

// Create a new query
router.post('/create-query', async (req, res, next) => {
  try {
    const result = await queriesSchema.create(req.body);
    res.json({
      data: result,
      message: 'Query successfully created!',
      status: 200,
    });
  } catch (err) {
    next(err);
  }
});

// Get all queries
router.get('/get-queries', async (req, res) => {
  try {
    const queries = await queriesSchema.find(); // Fetch all queries
    res.status(200).json({
      status: 200,
      data: queries,  // Return all queries in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error fetching queries',
    });
  }
});

// Reply to a query and update its status to "solved"
router.post('/reply-to-query', async (req, res) => {
  const { queryId, replyMessage } = req.body;
  try {
    const query = await queriesSchema.findById(queryId);
    if (query) {
      query.status = 'solved'; // Change status to 'solved'
      query.replyMessage = replyMessage; // Store the reply message
      await query.save(); // Save the changes
      res.status(200).json({
        status: 200,
        message: 'Reply sent successfully and status updated to "solved".',
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Query not found!',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error replying to query',
    });
  }
});

export { router as queryRoutes };
