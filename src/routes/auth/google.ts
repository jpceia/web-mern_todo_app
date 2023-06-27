import { Request, Response, Router } from "express";
import passport from "passport";
import { CLIENT_URL } from "../../constants";


const router = Router();

router.get('/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }, (req, res) => {
    console.log("Logging in...");
    res.send(req.user);
  })
);

router.get('/success', (_req: Request, res: Response) => {
  res.send("You have successfully logged in");
});

router.get('/failure', (_req: Request, res: Response) => {
  res.send("You have failed to log in");
});

router.get('/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/auth/google/failure',
    failureMessage: 'Failed to authenticate'
  })
);

export default router;