import { Router } from "express";
import googleRoutes from "./google.js";


const router = Router();

router.get('/logout', (req, res) => {
  req.logout();
  console.log("Logging out...");
  res.send(req.user);   
});

router.use('/google', googleRoutes);

export default router;
