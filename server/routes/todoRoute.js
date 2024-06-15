const exxpress = require('express');
const router = exxpress.Router();
const {createTodo, getAllTodos, deleteTodo} = require('../controllers/todoController');

router.post('/', createTodo);
router.get('/', getAllTodos);
router.delete('/:todoId', deleteTodo);
router.patch('/:todoId', deleteTodo);


module.exports = router;