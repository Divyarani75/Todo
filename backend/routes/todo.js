const express = require("express");

const router = express.Router();

const {
    getAllTodo,
    postCreateTodo,
    putUpdateTodo,
    deleteTodo,
    putUpdateStatus,
    getAllTodoExpire,
    getAllTodotrashlist,
    restoretodo
} = require("../controllers/todo");

router.get("/", getAllTodo);
router.post("/", postCreateTodo);
router.put("/:id", putUpdateTodo);
//router.delete("/:id", deleteTodo);
router.post("/deletetodo", deleteTodo);
router.get("/expirelist",getAllTodoExpire)
router.get("/trashlist",getAllTodotrashlist)
router.post("/restoretodo",restoretodo)



module.exports = router;
