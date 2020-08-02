const passport = require('passport');
const WechatStrategy = require('passport-wechat').Strategy;
const qqStrategy = require('passport-qq').Strategy;

passport.use(new WechatStrategy({
    appID: '',
    name: '',
    appSecret: '',
    client: 'web',
    callbackURL: '/auth/wechat/callback',
    scope: '',
    state: '',
    getToken: '',
    saveToken: ''
  },
  function(accessToken, refreshToken, profile, done) {
    return done(err,profile);
  }
));

passport.use(new qqStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: '/auth/qq/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ qqId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));