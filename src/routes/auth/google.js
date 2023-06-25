import { Router } from "express";
import passport from "passport";


const router = Router();

router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

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
  }),
  (req, res) => {
    res.send(req.user);
    res.send('You reached the redirect URI');
  }
);

export default router;