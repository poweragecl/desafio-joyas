import Router from "express";

const router = Router();

import { getOrderAndLimitJoyas, filterJoyas, getJoyaById} from "../src/controllers/joyas.controller.js";


router.get('/joyas', getOrderAndLimitJoyas); 
router.get('/joyas/:id', getJoyaById);
router.get('/joyas/filtros', filterJoyas); 

export default router;