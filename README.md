# Node React Server
* Intro in Wiki page

### Installing the Heroku CLI
* D 16-d: First Time and Subsequent deployments
* New account in heroku.com
* Heroku cli via brew tap heroku/brew && brew install heroku
* heroku -v

### Verifying Heroku Deployment
* Having trouble login: https://stackoverflow.com/questions/49547326/self-signed-cert-in-chain-error-while-using-heroku-cli
* This did the trick:
```sh
sudo launchctl unload /Library/LaunchDaemons/com.netskope.stagentsvc.plist
```
```sh
heroku login
heroku create
# Creating app... done, ⬢ shrouded-reaches-12121
https://shrouded-reaches-12121.herokuapp.com/ | https://git.heroku.com/shrouded-reaches-12121.git
git remote add heroku https://git.heroku.com/shrouded-reaches-12121.git
git push heroku master

To https://git.heroku.com/shrouded-reaches-12121.git

heroku open
# For debugging info
heroku logs 
```

### Followup Deployments
```sh
git add .
git commit -m "Change greeting"
git push heroku master
# Optional log check
heroku logs
heroku open
# If heroku open doesn't open, use the output of heroku master push to get the site link
```

### Intro to Google OAuth
* Diagram Link: https://www.draw.io/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F01%2Fdiagrams.xml
* D 2-user pro:
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* D 3-oauth:

### The OAuth Flow
* D 3-oauth:

### Overview of Passport JS
* **D 3.5**:
* D 5:

### Passport Setup
* npm i passport passport-google-oauth20
* Import passport and passport strategy in index.js
* passport.use to use GoogleStrategy instance

### Enabling Google OAuth API
* Go to console.developers.google.com
* Create a New Project called emaily-dev
* Enable API in APIs and Services Dashboard
* Search for Google+, select Google+ API and click Enable
* OAuth consent screen, external and Application name and Save
* Click on Create Credentials and select OAuth client Id
* Enter http://localhost:5000 for Authorized js origins http://localhost:5000/auth/google/callback for Authorized Redirect URIs

### Securing API keys
* D 19:
* Create config folder in server dir
* Create keys.js and store client Id and secret in it
* Don't commit the above file to git by adding it in .gitignore

### Google Strategy Options
* Import keys and pass it to GoogleStrategy
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* D 3-oauth:
* Add callbackURL as another option

### Testing OAuth
* OAuth flow managed by passport using passport authenticate
* 1st argument is the strategy
* 2nd argument is an options object
* node index.js and go to localhost:5000/auth/google

### Authorized Redirect URI's
* Redirect_uri for security purposes so that it won't be misused by malicious users
* https://console.developers.google.com/apis/credentials/oauthclient/940402436141-sm3pj6g8mcdhnkge669fst815bbsdmrg.apps.googleusercontent.com?project=emaily-dev-276408
* For valid redirect URI
* It takes small amount of time for the URI to update in the server

### OAuth Callbacks
* Add route handler for google auth callback

### Access and Refresh Tokens
* Other arguments to GoogleStrategy second argument
* Read or delete emails using access token
* refreshToken is used to refresh the access token

### Nodemon Setup
* npm install nodemon
* In package.json scripts, add dev
* npm run dev

### Server Structure Refactor
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* D 20: Structure
* New routes folder and add authRoutes.js
* New services dir and add passport.js
```js
const passportConfig = require('./services/passport');
//to
require('./services/passport');
//cause we are not exporting anything
```
* Exporting a function in authRoutes
* Assume we will be calling with express app object
* In index.js, call authRoutes with app
```js
const authRoutes = require('./routes/authRoutes');
const app = express();
authRoutes(app);
```
* Actually authRoutes is not really needed
* require returns a function and app is argument to that function

### The Theory of Authentication
* D 9: Information between requests is not shared
* D 10: Tokens
* D 11: Browser automatically includes the Cookie into our request

### Signing In Users with OAuth
* D 3.5:
* D 21:
* D 11: