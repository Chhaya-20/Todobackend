// const express = require('express');
// const router = express.Router();
// import {fetchUser} from '../controllers/middleware';

// import {GetTask,AddTask,RemoveTask,UpdateTask} from '../controllers/TODO'

const express = require('express');
const router = express.Router();
const { fetchUser } = require('../controllers/middleware');
const { GetTask, AddTask, RemoveTask, UpdateTask } = require('../controllers/TODO');

// Rest of your code...


//get all task
router.get('/',fetchUser,GetTask )


//ADD TASK
router.post('/',fetchUser,AddTask)


//UPDATE TASK
router.put('/:id',fetchUser , UpdateTask)


//Delete task

router.delete('/:id',fetchUser , RemoveTask)

// Export the router
module.exports = router;
