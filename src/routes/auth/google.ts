import { Router } from "express";
import passport from "passport";


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

router.get('/success', (req, res) => {
  res.send("You have successfully logged in");
});

router.get('/failure', (req, res) => {
  res.send("You have failed to log in");
});

router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
    failureMessage: 'Failed to authenticate'
  })
);

export default router;