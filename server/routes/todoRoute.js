const exxpress = require('express');
const router = exxpress.Router();
const {createTodo, getAllTodos, deleteTodo, updateTodo} = require('../controllers/todoController');

router.post('/', createTodo);
router.get('/', getAllTodos);
router.delete('/:todoId', deleteTodo);
router.put('/:todoId', updateTodo);


module.exports = router;