import { Request, Response, Router } from "express";
import googleRoutes from "./google";
import { ActivityType, UserHistory } from "../../entities/user-history";
import { User } from "../../entities/user";
import { AppDataSource } from "../../datasource";
import isAuthenticated from "../../middleware/isAuthenticated";


const router = Router();

router.get('/logout', isAuthenticated, (req: Request, res: Response) => {
  // req.logout();
  req.session.destroy(async () => {
    const user = req.user as User;
    const userHistoryRepository = AppDataSource.getRepository(UserHistory);
    await userHistoryRepository.save({
        userId: user.id,
        activity: ActivityType.LOGOUT
    });
    res.send(req.user);
  });
});

router.use('/google', googleRoutes);

export default router;
