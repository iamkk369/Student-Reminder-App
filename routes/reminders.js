/* ========================================
   STUDENT REMINDER APP
   Phase D: Reminders Routes

   All reminder routes are protected by the
   existing `authenticate` middleware, which
   populates req.user.id for query scoping.
   ======================================== */

const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authenticate');
const {
  create,
  list,
  getOne,
  update,
  remove
} = require('../controllers/remindersController');

// Protect every reminder route.
router.use(authenticate);

router.post('/', create);
router.get('/', list);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;