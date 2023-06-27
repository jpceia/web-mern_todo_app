import { Request, Response, Router } from "express";
import googleRoutes from "./google";


const router = Router();

router.get('/logout', (req: Request, res: Response) => {
  // req.logout();
  req.session.destroy(() => {
    console.log("Logging out...");
    res.send(req.user);   
  });
});

router.use('/google', googleRoutes);

export default router;