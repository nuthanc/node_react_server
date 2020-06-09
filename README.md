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
* OAuth consent screen, external and Application name(Shown to Users: give a nice name) and Save
* In the above consent screen, for Production application give Homepage url, logo and other required details
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
* **GoogleStrategy** has an internal idenitfier of **google**
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

### Introduction to MongoDB
* D 6-mong:
* D 6: Collections and Records
  * Schema-less compared to other DBs
* D 7: How Mongoose helps us

### MongoDB Setup
* D 22: Remotely hosted
* mlab.com
* Log in with MongoDB Atlas
* Create Cluster
* Add Current IP Address
* Connect with Application(Drivers)

### Connecting Mongoose to Mongo
* npm i mongoose
* In index.js, require mongoose
* Add mongoose uri in config keys.js
* Require config keys
* npm run dev
* D 6-mong:

### Breather and Review
* D 23:

### Mongoose Model Classes
* D 7: Model Class and Collection
* Create models dir inside server
* Create User.js inside models
```js
//ES2015 destructuring: The following are equivalent
const Schema = mongoose.Schema;
//and
const { Schema } = mongoose;
```
* D 6-2: Users Collection can have different properties
* But mongoose removes the above ability
* Mongoose wants to know the properties ahead of time
* Schema will describe how the properties will look like
* mongoose model's 1st argument is name of the collection
* 2nd argument will be the schema
* mongoose.model creates a new collection
* model does not override
* mongoose.model with schema loads into mongoose
* We can freely add or subtract properties to the schema
* Require User.js in index.js

### Saving Model Instances
* D 23:
* npm run dev
* Go to localhost:5000/auth/google
* Check the server logs
* Remove the console logs in GoogleStrategy
* No require statements for mongoose model classes
* This is because when using **tests and required multiple times, mongoose will get confused and will think you are loading multiple models called users and will throw an error**
* In passport.js file, require mongoose library
* Pull a schema out of mongoose using mongoose.model with only one argument
* D 7:
* new User creates a new instance of the User which represents a record
* But it needs to be persisted
* It is done using save method
* npm run dev
* Error in server logs
```
Schema hasn't been registered for model "users"
```
* This is because in index.js we are using the model before defining it reflected in the require statements
* Navigate to localhost:5000/auth/google
* Open mlab and check the record
  * https://account.mongodb.com/account/login
* Mongoose with mongodb atlas
  * https://developerhandbook.com/mongodb/connect-mongo-atlas-mongoose/
* Everything was fine, just had to whitelist ip

### Mongoose Queries
* If we go to localhost:5000/auth/google, we see another record for the same user being created
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* D 24: Flow to create or not create
* D 7: Model to Collection
* In passport.js, add condition in callback of GoogleStrategy
* Reaching out to db is an asynchronous action
* The query returns a Promise

### Passport Callbacks
* Done with the authentication process using done function
* First arg of done function is err object
* The second arg will be the User record
* 2 user instances created, one with new User and the other from then(Promise callback)


### Encoding Users
* D 11.5: Purpose of db
* **D 26:**
* In passport.js, define an arrow function and pass it to serializeUser
* First argument in the arrow function is the user model and the 2nd is the done function
* This *user* is whatever we pulled out of the database and passed to done callback
* user.id in passport serializeUser is not the profile id
* The above id is automatically generated by mongo
* We are using id and not google id because there might be other authentication providers
* user.id is a shortcut that automatically references the Mongo generated id
* D 27: Why user id and not google profile id
* passport will then stuff that user into a cookie

### Deserialize User
* The 1st argument is the exact token we had stuffed into the cookie

### Enabling Cookies
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* Instruct passport to use cookies to handle authentication
* Install cookie-session using npm i cookie-session
* Require that and passport
* app use cookieSession with config object
* maxAge: how long till it expires(in ms)
* We are giving 30 days
* key: Used for encrypting our cookie
* key is coming from config keys.js
* This cookieKey can be any random string of characters
* Tell passport to use cookies using initialize and session
* Start server using npm run dev

### Testing Authentication
* D 15: After OAuth flow
* New Route Handler in routes authRoutes.js
* npm run dev
* Go to localhost:5000/auth/google
* This returns our cookie into our browser after the OAuth flow
* In new tab, go to localhost:5000/api/current_user
  * Flow followed when navigated to that endpoint is depicted in D 15

### Logging Out Users
* In authRoutes.js, /api/logout route handler
* req.logout is another function automatically attached by passport to req
* It takes the cookie and kills the id contained in the cookie
* Test this out using npm run dev
* Navigate localhost:5000/api/logout
* Verify in http://localhost:5000/api/current_user

### A Deeper Dive
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* app.use calls
  * Wiring up middleware
  * Middleware are small functions that modify incoming requests before sending them to Route handlers
  * D 15
* D 4
* In current_user endpoint, just to test out cookies, send req.session
* Make sure you are logged in /auth/google
* Now go to localhost:5000/api/current_user
```js
//Output of req.session
{
  - passport: {
      user: "5ecd2c88af1f1204c76841ec"
    }
}
// This is the info that is stored in the cookie
```
* D 15
* Cookie-Session extracts the data out of the cookie and then assigns it to req.session
* Passport is looking at req.session and passes that data to deserialize user
* D 12: 
  * Difference between cookie-session and express-session
    * How the data is stored
  * *Cookie* is the session in **cookie-session** library
  * *Reference to a session* in **express-session** library
* D 14
* cookie-session: Data inside the cookie
  * 4kb: Max size(This is sufficient for us as we are storing only the id)
* express-session: Data outside the cookie(i.e, in some store like a db)
  * Any amount of data
* **Visual look on cookies**
  * Open Chrome Inspect
  * Network Request tab
  * Logout endpoint(If logged in previously)
  * Look at Headers particularly Response Headers Set-Cookie's session
  * This Session is encrypted by Cookie session and it contains everything that we have to do with the current session
  * Now navigate to /auth/google
  * Click on the first error callback in the Network requests tab
  * Now the session is significantly longer because it contains more info
  * Now go to /api/current_user: No cookies here in the Response headers because the server is not modifying anything
  * We are just reading the cookie automatically included by the client
    * But we can see the cookie in the Request Headers
    * This is where the Browser is automatically including the cookie and sending it to our backend server
  * We can logout and see the setCookie session again
    * But if we decrypt that, we will be getting empty as userId is no longer there

### Dev vs Prod Keys
* D 28: 2 separate set of keys
  * Even if it's stolen, another set of keys in the Production env
  * We want 2 dbs where the Production db has clean data,i.e, only User data and not test data
* D 18:

### Generating Production Resources
* Create new db in mongodb atlas
* https://cloud.mongodb.com/v2/5ebc0abdea7241503870c172#clusters
* https://mlab.com/home
* https://cloud.mongodb.com/v2/5ed72da28b65716fcbfa96f4#clusters
* Create new Google API by visiting console.developers.google.com
* Create a separate project
* Create a New Project called emaily-prod
* Enable API in APIs and Services Dashboard
* Search for Google+, select Google+ API and click Enable
* OAuth consent screen, external and Application name(Shown to Users: give a nice name) and Save
* In the above consent screen, for Production application give Homepage url, logo and other required details
* Click on Create Credentials and select OAuth client Id

### Determining Environment
* heroku open
* Select that address
* Paste that address in Authorized Redirect URIs followed by /auth/google/callback
* Enter just the domain name for Authorized js origins
* Create dev.js in config dir
* Cut everything out of keys.js and copy to dev.js
* Now in keys.js, we figure out what set of credentials to return
* Heroku automatically sets NODE_ENV

### Version Control Scheme
* module.exports in if and else for prod and dev keys
* Create prod.js in config 

### Heroku Env Variables
* Navigate to heroku.com
* Go to shrouded-reaches-12121 Settings
* Config Variables and add the keys
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* D 16:
```sh
git add .
git commit -m "Finished auth flow"
git push heroku master
# remote: -----> Creating runtime environment
# remote:        
# remote:        NPM_CONFIG_LOGLEVEL=error
# remote:        NODE_ENV=production
# remote:        NODE_MODULES_CACHE=true
# remote:        NODE_VERBOSE=false
# Here is the NODE_ENV
heroku open
# The above is not opening 
# So manually navigate to: 
https://shrouded-reaches-12121.herokuapp.com/
# The above shows No get request to that
# Next move to Oauth flow
https://shrouded-reaches-12121.herokuapp.com/auth/google
# Error 400: redirect_uri_mismatch
```

### Fixing Heroku Proxy Issues
* Error due to http instead of https
* In services passport.js file, callbackURL in GoogleStrategy is a relative path
* GoogleStrategy decides what domain to append to the request
* GoogleStrategy is the culprit and the Factor number 1
* The other factor which is causing GoogleStrategy to be the culprit is *D 29*
* Heroku uses *Proxy* to route to the correct server
* If request from the Browser goes through any Proxy, the request should no longer be https because it inherently doesn't trust requests that come through a proxy
* But we are ok with Proxy, so we can **add that config to GoogleStrategy**
* The other possible solution is to **spill out the entire callbackURL in GoogleStrategy**
* We are going with the first solution of *proxy: true* in GoogleStrategy
```sh
gaa
gcmsg "Tweak Google Strategy settings"
git push heroku master
# Next move to Oauth flow
https://shrouded-reaches-12121.herokuapp.com/auth/google
```
* Solved Signin error. Did the following
```
* Copied configs from Heroku and placed in dev.js and commented previous dev.js
* Added localhost to Authorized JS origins and the other in Google console
* Checked locally after console logging profile of GoogleStrategy
* Also had to enable globle access to mongodb application
* Check again with heroku after committing README as git push heroku master
```
* Verify in https://shrouded-reaches-12121.herokuapp.com/api/current_user
* https://shrouded-reaches-12121.herokuapp.com/api/logout
