import express from "express";
import { createNewUser, deleteUser, findUserById, getAllUsers, updateUser } from "../controllers/user.js";


const router = express.Router();

router.get("/all", getAllUsers)

router.post("/new", createNewUser);


// router.get("/userid/:id", findUserById);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

// Instead of the above we can specify all the routes within single line by
router.route("/userid/:id").get(findUserById).put(updateUser).delete(deleteUser);
export default router;