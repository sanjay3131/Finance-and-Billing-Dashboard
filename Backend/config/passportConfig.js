import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Shop from "../models/shop.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if shop already exists with this Google ID
        let shop = await Shop.findOne({ googleId: profile.id });

        if (shop) {
          return done(null, shop);
        }

        // Check if shop exists with this email
        shop = await Shop.findOne({ ShopEmail: profile.emails[0].value });

        if (shop) {
          // Update existing shop with Google ID
          shop.googleId = profile.id;
          shop.authProvider = "google";
          if (profile.photos[0]) {
            shop.googlePhotoUrl = profile.photos[0].value;
          }
          await shop.save();
          return done(null, shop);
        }

        // Create new shop with Google profile
        const newShop = new Shop({
          ShopName: profile.displayName || profile.name.givenName,
          ShopEmail: profile.emails[0].value,
          ShopOwnerName: profile.displayName || profile.name.givenName,
          ShopOwnerEmail: profile.emails[0].value,
          ShopPhoneNumber: "",
          ShopAddress: "",
          ShopOwnerPhoneNumber: "",
          googleId: profile.id,
          googlePhotoUrl: profile.photos[0]?.value,
          authProvider: "google",
        });

        await newShop.save();
        return done(null, newShop);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((shop, done) => {
  done(null, shop._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const shop = await Shop.findById(id);
    done(null, shop);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
