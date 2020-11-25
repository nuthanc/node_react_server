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

### React App Generation
* Go to Google and search for create-react-app
* Inside server dir
```sh
npx create-react-app client
```

### A Separate Front End Server
* cd client and npm start 
* We see a server running at port 3000
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F04%2Fdiagrams.xml
* D 12-reac:
  * Front end server: js stuff
  * Back end server: json stuff
  * But why 2 servers: We could have handled React from Express itself
  * It's because we get a lot out-of-the-box with create-react-app

### Running the Client and Server
* Add client script in server's package.json
* Add **prefix** so that it executes npm run start w.r.t to the correct dir
* Rename dev to server for server's index.js
```sh
npm i concurrently
# Then run npm run dev
```

### Routing Stumbling Block
* Add an anchor tag in App.js for Google Sign-in
```html
<a href="/auth/google">Sign In with Google</a>
```
* Naive approach of writing href
  * Naive because we are providing relative link or path
  * Browser assumes it is on the same domain, i.e, the Browser automatically prepends the domain name
  * We just need to provide the relative path
```html
<a href="http://localhost:5000/auth/google">Sign In with Google</a>
```
* The above will work only in the dev environment
  * Because we need to manually change localhost:5000 to shrouded-reaches.heroku.com manually at every a tab referring to auth server
* One way to solve this is to add a check whether is dev or prod
* But even that is too much work
* Revert back to only /auth/google
* **One small change** we are going to make this work
  * In client's package.json, add proxy for /auth/google route(This doesn't work, use Resolving proxy error)
* Stop the server and start again because **Live reload** of React doesn't work when we change in package.json file
* After adding the proxy in setupProxy.js, when we click on Sign In with Google, we still get redirect_uri_mismatch error
```txt
Error 400: redirect_uri_mismatch

The redirect URI in the request, http://localhost:3000/auth/google/callback, does not match the ones authorized for the OAuth client. To update the authorized redirect URIs, visit: https://console.developers.google.com/apis/credentials/oauthclient/940402436141-sm3pj6g8mcdhnkge669fst815bbsdmrg.apps.googleusercontent.com?project=940402436141
```
#### Resolving proxy error
* In client dir
* Lookup docs for http-proxy-middleware
```sh
npm i http-proxy-middleware
```
* Remove the proxy entry from package.json of client
* Create setupProxy.js in client src dir
* Restart server with npm run dev as Anytime you make a change to the proxy or the Google Project's URI or Origins settings you should restart the server

### The Beauty of Create React App's Proxy
* Add the above 3000/auth/callback to Google's console
* We are doing this only on the dev side
* Add this to Authorized Redirect URIs
```txt
http://localhost:3000/auth/google/callback
```
* After save, it will take a *couple of minutes* to show in the servers
* Proxy will automatically forward request coming to /auth/google to localhost:5000/auth/google
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F01%2Fdiagrams.xml
* D 5-archi: ONly for dev mode(New create-react-app requires http-proxy-middleware)
  * Proxy included with create-react-app
* D 6-archit: **In Production**
  * In production, the localhost is automatically converted to the heroku domain
  * In Production, create-react-app **server does not even exist**
  * Before deploying our application, the React project is first built
  * The create-react-app takes all the different js, css and other files and will run webpack and babel over all those files and save a final production build of our application in build dir
  ```sh
  #Demonstrated by the following
  cd client
  npm run build
  # check in client/build
  # We no longer need to run create-react-app application at all
  # Create-react-app is giving us Live reload, linting, error-checking
  # It exists to give Good development experience
  # We don't need that behavior in production
  ```
  * In production, it automatically prepends shrouded-reaches.heroku.com to /auth/google and there is no Proxy required as there is only one server(Express)
  * Also, the proxy config(setupProxy.js) is not used as npm run build places all the built code to client/build

### Why This Architecture
* Test npm run dev and Oauth stuff
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F01%2Fdiagrams.xml
* D 7-other: why didn't we take this architecture?
  * One server to serve front-end development assets
  * Another that acts as API that serves up all the info for our App
  * D 8-other:
  * This approach could be taken
* D 5-arch: But 2 reasons why we sought this type of architecture
  * Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
  1. D 13: Use of cookies in our authentication
    * If the browser wants to make AJAX request(like access our api, fetch a list of surveys), if it is the same domain(3000 to 3000), cookies will be included in the request
    * If it is in different domain(3000 to 5000), cookies won't be included(Security reasons)
    * By making use of D 5-arch, we avoid this issue as create-react-app proxies it for us(Browser thinks it is in the same domain)
    * In production, anyway we are in the same domain
  * The browser does have APIs to send cookies over different domains
  * But life is easier, when we don't have to worry about these advanced issues
  2. D 13: Look CORS diagram
    * Network request to different domain or port, we get Cross Origin Resource Sharing error
    * We could have worked around this but it's a pain
    * The proxy saves us in dev mode
#### Proxy working with Express API in dev mode
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F04%2Fdiagrams.xml
* **D 10-oauth flow: OAUTH flow in Dev**
* The browser will automatically prepend the domain
* Request sits pending while the proxy copies the request and sends it to Express API(configured in setupProxy.js)
* Express looks /auth/google path and sees it requires Google Oauth and tells to please go to google.com and the callback URL specified in the GoogleStrategy
* Google will send back to localhost:3000 and not 5000
* Request again runs into proxy
* The proxy again will pick up the request event though it has an additional /callback path
* It sends the request to API
#### Production flow
* **D 11-oauth: Oauth flow in prod**

### AsyncAwait Syntax
* Write a function to retrieve a blob of json,i.e, make an ajax request
```js
//Request to rallycoding.herokuapp.com/api/music_albums

function fetchAlbums() {
  // fetch returns a Promise
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json))
  //then statement for notification or for a callback
  // res.json() also returns a Promise
}
fetchAlbums();

```
* Test this by pasting it in the Browser
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F04%2Fdiagrams.xml
* D 15:
* New ES2017 syntax:
  * Identify function that contains asynchronous code
  * Put async in front of the function
  * Identify all the promises created within the function and add await in front of it
  * Assign to intermediate values to contain the resolv result
```js
async function fetchAlbums() {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums') //Promise 1
  const json = await res.json() //Promise 2
  
  console.log(json)
}
fetchAlbums();
```
* This can be used on arrow functions as well
```js
const fetchAlbums = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums') //Promise 1
  const json = await res.json() //Promise 2
  
  console.log(json)
}
fetchAlbums();
```

### Refactoring with AsyncAwait
* Refactor 2nd argument of GoogleStrategy in passport.js

### Front End Tech
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F04%2Fdiagrams.xml
* D 14-top:
  * Green box: Backend
  * Blue box: Frontend
* D 2-co:
  * Definitely need React
  * Navigation: When user goes to different route, need to show different set of components
  * So, we also require React-router
  * We want to load up some resources and we need to persist data when navigating between different routes
  * So, we might need **Redux** also

### Client React Setup
* Delete everything inside client src except serviceWorker and setupProxy.js
* D 3:
* D 4:
```sh
cd client
npm i redux react-redux react-router-dom
```
* Create index.js inside src dir

### Installing Root Modules
* Create components dir in src dir
* Create App.js inside that

### Troubleshooting NPM
* If npm run dev, gives an error from the client side like React scripts, then delete package-lock.json in the client dir
* Run npm install in client dir

### Redux Review and Setup
* D 7:
* D 13-reducers:
* D 6-redux:
* D 7-rea: **Flow**
* D 9-red: Example
* Redux related changes in index.js of client
* Arguments to createStore
  * First argument to createStore given a dummy reducer
  * Second argument is initial state of the application(Relevant during server-side rendering)
    * We don't really care of the initial state, so passing empty object
  * Third argument is the applyMiddleware
* The Provider is a React Component that knows how to read changes from the Redux store
* When any new state is observed, the Provider will inform all of its child components and each Component gets updated
* npm run dev and check

### The Auth Reducer
* D 13-reducers:
  * authReducer
  * surveyReducer
* Create reducers dir inside src
* Create authReducer and index.js

### Finishing Reducer Setup
* Create reducers index.js and import that in Top level index.js

### Why We Care About Auth
* D 2-com:
* D 5-react: Routes to access if logged in

### React Router Setup
* D 2-com: Routes
* Navigations in App.js file
* Dummy components of Header, Dashboard, SurveyNew and Landing

### Route Configuration
* BrowserRouter expects atmost 1 child
* npm run dev to check the Landing page

### Matching Routes with Exact
* Pass exact={true} or exact property

### Always Visible Components
* Place Header at the top to show it always

### Materialize CSS
* Create Header.js in components 
* Class based component because of placing 1 or 2 helper functions
  * For easily organizing code
* Google search for Materialize CSS
  * https://materializecss.com/getting-started.html
* Instead of CDN, let's do npm install this time
```sh
cd client
npm install materialize-css@next
```

### Webpack with CSS
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F04%2Fdiagrams.xml
* D 16:
  * Webpack is a Module loader
  * It takes a bunch of js files and it concatenate and arrange those files to spit 1 or few files
  * You can also load loaders to webpack that instructs Webpack to handle other types of files
* In client node_modules->materialize-css->dist->css, you'll find the css file
* Import it into index.js of client src
* No need to specify relative path, as it assumes it is a npm module
* This import statement of materializeCSS doesn't assign any value 
* So we can condense 
```js
import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
// to
import 'materialize-css/dist/css/materialize.min.css';
```
* Now check back in Browser after running npm run dev

### Header Design
* Look from materializecss docs on how to create a Header component
* In Header.js, make the required changes

### Current User API
* In App.js file, add class name of container to top-level div
* In authRoutes.js, route handler for current user
* D 6: Action creator to make a request to the above mentioned route handler

### Additional Proxy Rules
* D 19: **Application Flow between Frontend and Backend**
```sh
cd client
npm install axios redux-thunk
```
* In client src index.js, import redux-thunk 
* Create actions folder
* Relative path in fetchUser action creator, where in development environment we make use of Proxy and in Production, there is create-react-app server  
* So check the proxy rule in setupProxy.js
  * /api/anything else

### Basics of Redux Thunk
* D 6: Without redux thunk, action creator immediately returns an Action
* D 20: With Redux thunk
* Return a function instead of an action in index.js of actions
* Redux thunk which is wired as middleware will automatically call this function and pass in dispatch and store as arguments
* v1 version of Action creator
```js
const fetchUser = () => {
  return function () {
    axios
      .get('/api/current_user')
      .then((res) => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

### Refactoring the App
* D 19: Application flow
* fetchUser should be called as soon the App boots up
* Where should we add the fetchUser action creator
* Header component is where it matters whether the User is signed in, but later we would want other components to know as well
* So the best place is App component
* Refactor functional component to Class based one
* componentWillMount called before component is mounted
  * Might be called automatically in future versions of React
* componentDidMount is the preferred location for initial AJAX requests
* The time difference between componentDidMount and componentWillMount is nil

### Testing FetchUser
* connect gives Components the ability to call Action Creators
* Once actions are passed to connect, they are assigned to App components as props
* In authReducer, console log every single action
* D 19: Application flow
* We see 4 console logs, the 1st 3 being part of Redux boot up process

### Refactoring to AsyncAwait
* Using async await and arrow functions

### AuthReducer Return Values
* import action types in authReducer
* D 21:
* action.payload is the User model when the user is logged in
* Empty string is interpreted as falsy value

### Accessing State in the Header
* Hookup Header to redux using connect
* Since key and value are the same, we can reduce as shown below
```js
return { auth: auth};
// to
return { auth };
```
* Helper method of renderContent

### Header Content
* Add proper content in the switch statements

### Redirecting a User on Auth
* Why we see redirect Error on Logging with Google
* Go to routes/authRoutes.js
* Whenever User comes to /auth/google/callback, we are passing Control of the User off the passport authenticate
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* D 4: app.use 3 statements of cookie and passport(They are middlewares)
  * They intercept every incoming request
* What **passport.authenticate does**
  * This is a function(middleware) that takes the incoming request and takes the code out of the URL and goes and fetches the User's profile and then calls our callback in the GoogleStrategy
  * After Google authentication is finished, it then passes the request on to the next middleware inside the flow
  * Since no next middleware is defined, it returns Cannot get the route
* Add an arrow function after passport.authenticate
* Logout by going to the route manually and test the code

### Redirect on Logout
* D 10: Need to unset the cookie
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F04%2Fdiagrams.xml
* D 22: Full HTTP request vs AJAX Request
  * Full HTTP: a tag
  * AJAX request will be faster
* We are gonna go with first approach
* After this, we need to redirect, so make changes in authRoutes.js

### Landing Component
* Create Landing.js

### Link Tags
* Navigate based on auth state
* Changes in Header
* D 23:
  * Completely different domain(Different HTML document): Use a tag. E.g. Login
  * Navigate around our application: Use Link tags

### Client Side Billing
* D 14: Green-Backend, Blue-Client
* D 1: Mockup

### Billing Considerations
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F03%2Fdiagrams.xml
* D 1: Form
* D 2: Rules of Billing
  * Outside Payment processor: Stripe(stripe.com)
  
### Stripe Billing Process
* D 3-stripe: **Stripe flow**
  * Stripe form automatically generated by them(We are not doing it)
  * This way we are not storing any Credit card numbers
  * Actual collection of money in the Back-end where User doesn't have a lot of control(in case of malicious Users)

### Exploring the Stripe API
* Go to stripe.com and Create an Account
* After Registering, go to https://dashboard.stripe.com/test/dashboard
* To take it live, we need to Activate the account(We don't want that as we are doing a simple project)
* Get your test API keys section
* Google for Stripe checkout
* Google for Stripe Checkout React for our application
  * Make the above checkout library work nicely with React
  * https://github.com/azmenak/react-stripe-checkout
```sh
cd client
npm i react-stripe-checkout
```

### Stripe API keys
* The keys need to be in both Front and Backends
  * Front end requires only the Publishable key
  * Back end requires both
* In dev.js and prod.js of config, add the Publishable key and Secret key
* Add this in Heroku environment too
  * https://dashboard.heroku.com/apps/shrouded-reaches-12121/settings
* The config is strictly for the Backend
* **IN REACT world, any file that gets required in a React project is publicly visible to the outside world**
* Front end is making use of ES2015 modules
  * No logic before IMPORT statement
* Back end is making use of common js modules
  * Can make use of logic to require files

### Env Variables with React
* Client side doesn't care about the Secret key
* Google search for Create react app environment variables
* https://create-react-app.dev/docs/adding-custom-environment-variables/
* https://create-react-app.dev/docs/adding-custom-environment-variables/
  * Start with REACT_APP_
  * https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env
```sh
cd client
touch .env.development
touch .env.production
```
* Test this out by console logging in index.js of client

### The Payments Component
* react-strike-component is doing
  * When we render that thing as a React component, it shows a button(that says Buy Now)
  * When they click, a form will appear on the Screen
* Create Payments.js inside components
* Add properties to StripeCheckout
* For amount prop, default is US dollars(In cents)
* token is expecting a success callback function that gets called with the token we received
  * It is badly named because in React Components any kind of callback property will be called with onSomething
* Add a *debugger* statement
* Show this component in the Header

### Stripe Tokens
* Return an array of elements, instead of ul, div and then li
* npm run dev and it should be Paused in Debugger
* With the debugger, wanted to show the replacement of process.env with the actual value(Not seen in new React version I guess)
  * Debugger stopped in bundle.js for Author, whereas it stopped in Payments.js for me
* Remove the debugger
* Open up console and check the token log after filling the Stripe form
* Use this Fake credit card number: 4242 4242 4242 4242
* id is the property which we really care about in the token object

### Payment Fixes
* D 3-stripe flow:
* In Header, key is assigned statically as this is a one-time render kind of thing
* StripeCheckout component takes a name to Give Header to the pop-up
* Pass a child component to StripeCheckout to customize the button

### Reusing Action Types
* D 3-stripe flow:
  * User sees the number of credits in the Header after they successfully pay
* Closely related events
  * Fetching the Current User
  * Getting the current User model
  * Save it in auth reducer
* D 4-header:
  * Reuse info in auth reducer to update the Header
* In actions index.js file, create handleToken Action creator
* Here, we do a POST request to the backend server with the token

### Passing the Stripe Token
* Redux changes in Payments.js
* No mapStateToProps, as all we care is about the Action creators
* npm run dev and test
* Will get a 404 error as there is no Route Handler in the backend yet
* Chrome Network console, filter by XHR requests after clicking on Add Credits

### Post Request Handlers
* Create billingRoutes.js in routes
* This will be similar to authRoutes.js where we export the app and require in index.js
* require billingRoutes will return a function and then it immediately calls that function with app as its argument

### Creating Charges
* We are use library in the backend for stripe too
* Go to npmjs.com and search for stripe
* There go to Node API documentation using https://stripe.com/docs/api
  * Check Charges in Core Resources
  * Create a Charge
```sh
# In server dir
npm install stripe
```

### BodyParser Middleware
* Changes in billingRoutes
* In Chrome Network console for stripe POST request, you can look all the Credit card details
```sh
npm install body-parser
```
* Require body-parser in index.js to parse incoming requests

### Creating a Charge Object
* console log in billingRoutes
* npm run dev 
* Open Chrome Network tab and filter by xhr

### Finalizing a Charge
* stripe charges returns a Promise(from npmjs.com Stripe docs)
* Console log charge
* npm run dev and test again
* Getting error here: https://stackoverflow.com/questions/53940043/unhandledpromiserejectionwarning-this-error-originated-either-by-throwing-insid
* Use try catch to solve the above error
* Another error
```txt
StripeInvalidRequestError: As per Indian regulations, export transactions require a customer name and address. More info here: https://stripe.com/docs/india-exports
```
* Check https://stripe.com/docs/india-exports
* Still getting this error
```txt
StripeInvalidRequestError: Customer cus_Hgn2nqmtyfBZBR does not have a linked source with ID tok_1H7PRyEUYnaArkKLXMHLuSv3
```
* **Solved this issue by adding inr as currency**

### Adding Credits to a User
* D 5-charges:
* In models User.js file, add credits with default value of 0
  * To do this, we pass an object to credits
* Need to save to persist in the db, which is an async request

### Requiring Authentication
* Test by running npm run dev and checking the Chrome Network tab
* User has 5 credits now
* Currently in our Route handler of /api/stripe, we are not checking whether the User is logged in or not
* Taking a naive approach 
```js
if (!req.user) {
  return res.status(401).send({ error: 'You must log in!' });
}
```
* But there might be many locations requiring this logic

### Route-Specific Middlewares
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F02%2Fdiagrams.xml
* D 4: How Express works
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F03%2Fdiagrams.xml
* D 6-req: Require login
* Passport middleware is where the current user is assigned to the request body
* We want this check of User is logged in only in some particular Route handlers
* Create middlewares dir and create requireLogin.js file
* In billingRoutes, we don't call requireLogin because we don't want it to be called as soon as express loads or boots up
* It is called internally by express when it goes to that route

### Displaying Credit Quantity
* In client Header.js, make the changes

### Updating Credits
* D 4-header:
* Add credits and test again

### Express with Create-React-App in Production
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F01%2Fdiagrams.xml
* D 5-archi: Dev mode
  * create-react-app responsible for serving the assets(like html, css and js)
* D 7-archi: Production
  * Challenge for express side of our App to serve up the assets
```sh
cd client
npm run build
# Creating an optimized production build..
```
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F03%2Fdiagrams.xml
* D 8-options: **Routes that express has to be aware of**
  * /surveys not defined in express server but React-router config

### Routing in Production
* D 8-options:
* In root index.js, add some code to make Express behaves properly in Production environment
* app.use of express.static is when the above routes don't match and if there a request for assests in client/build
* The next get request is a catch all 
* So first is a check for static files and responding with the matching file
* Then is a catch all where index.html is returned

### Deployment Options
* Need to build project again if there are any changes to the client src files
* Heroku is a **git based workflow**
* D 9-where: 
  * Option 1 breaks convention
  * Option 2 where build process executed on Heroku servers
    * **all** dependencies where only some are used in the Production environment(Not required: webpack, babel, dependencies of babel and webpack)
    * The development packages just exist on the Hard drive and won't be used by our Application in Heroku
    * Option 3 is overkill for our Application

### Adding in a Heroku Build Step
* D 10-building:
* Google Search Heroku Node.js support
  * https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process
* heroku-postbuild over postinstall because it will run if we run npm install on our local machine
* Also see devDependencies on the doc
* Changes in package.json in root server dir
* Heroku doesn't care at all about the package.json in the client dir
  * Env set only during the duration of heroku-postbuild command
* In server dir, git status
```sh
git add .
git commit -m "Added billing and client side app!"
git push heroku master
```

### Testing Deployment
* D 8-options:
* When moved to /surveys in the browser, the entire page reloads
  * Entirely new http request to Express server
  * It loads up the HTML document
  * Inside the html document is a script tag that points to main.js
  * The server responds with a .js file for the above request and the entire React application boots up

### Survey Overview
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F05%2Fdiagrams.xml
* D 1-surveys:
* D 3-sample:

### Survey Routes
* D 2-survey: Routes

### Survey Model
* D 4-survey model:
* Create a new model class for Surveys and require in index.js

### Model Deficiencies
* D 6:
* D 7-yesno:
* D 8-duplicates:

### Limitation of Subdocument Collections
* D 9-subdoc: Ownership relationship
* D 10-sub: Why don't we make this?
* D 11-max: Size limit is 4mb per document 
* D 12-sur: Limit exceeds if we do this 
  * Physical limitations of mongodb

### Setting up SubDocs
* Create Recepient.js model file
* Rather than registering Recepient with mongoose, we are gonna export it
* Import this in Survey.js

### Relationship Fields
* _user to setup relationship between User and Schema
* Underscore not required, but it is convention to indicate relationship field

### Survey Creation Route Handler
* D 2-survey: POST
* Create surveyRoutes.js inside routes
* Import this in index.js
* Need to check User is logged in and they have enough credits
* So require middleware for Login

### Verifying Minimum Credits
* Creating middleware because sometime in the future we might we want to check if the User is logged in and also has sufficient credits
* Create requireCredits.js
* Status code not important, but anything in the 400 range(checkout status code definitions)
* 403 not exactly meeting the req, but close enough
* Import requireCredits in Survey.js

### Creating Surveys
* Instead of requiring models/Survey.js file, we create a model for ease in Testing(Issue of running tests with node and mongoose if we require Survey model)

### Creating Subdoc Collections
* D 14-sur: For recepients property
  * Array of strings to array of objects
* D 13-map:
  * Initially passed as strings from Front-end
  * So need to use split function to convert to array of strings
  * map((email) => { return {email: email}})
  * Shortened to map((email) =>  {email})
  * But need to wrap in () to make sure it is a shortened object syntax instead of start of a function body
* id property of user is automatically created by Mongo
* Just an in memory survey and not yet persisted in Mongo db
* **Not sent immediately because we want to save it only when email was sent successfully**

### Creating Mailers
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F05%2Fdiagrams.xml
* D 2:
* D 3:
* D 15: Flow
* D 16: Mailer

### Identifying Unique Users
* D 17-r: Bad approach
  * Separate Mailer and separate HTTP request
* D 18: Good approach
  * 1 Mailer and 1 Network request
* D 19: Downside to the above approach
  * Mailer contains identical content to every single User
* Email provider: sendgrid.com
  * https://app.sendgrid.com/guide
* D 20:
* D 21: Flow
  * The very last step of Sendgrid sending a message to our server, this process is a webhook
  * Webhook is some outside API which is facilitating some process, and gives our App some sort of callback that an event just occured
* The /api/surveys/webhooks POST is a Route where sendgrid sends the notifications 

### SendGrid setup
* https://app.sendgrid.com/guide
* Go to settings -> API keys
* Create API Key with full access
* Create sendGridKey in dev.js and prod.js(Env in heroku)
* npm install sendgrid in server
* npm run dev

### Mailer Setup
* D 22:
* Create Mailer.js in services dir
  * In capitals, because it is exporting

### Mailer in Use
* To understand useCase of Mailer, assume it is complete and require it in surveyRoutes
* D 22:
* New folder of emailTemplates in services dir

### Mailer Constructor
* Changes in Mailer.js file

### Boilerplate for Sending Emails
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F05%2Fdiagrams.xml
* D 14: Recepients - Array of objects
* You need to have paranthesis while doing destructuring in arrow function
* D 21: Click tracking
  * Enables step 2

### More Mailer Properties
* Add another method

### Sending SendGrid Emails
* D 22:

### Testing Email Sending
* send in surveyRoutes.js
* OAuth flow with Postman is a pain in the Neck
* So, we are doing differently in client
* Temporary code in client src index.js
* Run npm run dev
* In Chrome console, type axios and you should be able to see the axios library 
* By doing this, we can make POST request by including the cookies included at localhost:3000
```js
const survey = { title: 'my title', subject: 'my subject', recipients: 'rovanova.nuthan@gmail.com', body: 'here is the body of the email'};

axios.post('/api/surveys', survey);

// Some cookie problem
// Error occurred while trying to proxy request /api/surveys from localhost:3000 to http://localhost:5000 (ECONNRESET) (https://nodejs.org/api/errors.html#errors_common_system_errors)
```
```sh
#Need to export the below
export NODE_TLS_REJECT_UNAUTHORIZED='0'
```
* Finally was able to send mail
  * Found in Promotions tab
  * Had to add catch block for sgApi call which returned a Promise
  * This enabled to log the error
* Remove axios code later in client src index.js

### Improving the Email Template
* No escape characters for new line when we use template strings
* npm run dev
```js
const survey = { title: 'Feedback Survey', subject: 'Ola oh oh', recipients: 'rovanova.nuthan@gmail.com', body: 'Football theme'};
axios.post('/api/surveys', survey);
```
* If you Inspect the Yes or No a tags, you see custom href by sendgrid

### Polish in the Route Handler
* D 15:
* Since mailer.send is an async function, make the arrow function passed to app.post async as well
* Since current User model can be accessed by req.user(automatically setup by Passport), we can save it to database as well
* Status 422: Unprocessable entity
* Check this using npm run dev
```sh
# Export the below to avoid self-signed certificate error
export NODE_TLS_REJECT_UNAUTHORIZED='0'
```

### Verifying Sendgrid Click Tracking
* Click on Yes on one of the email and check the Sendgrid dashboard
* https://app.sendgrid.com/
* Check Activity in the Sidebar

### Feedback for User Feedback
* In surveyTemplate, for anchor tag href we have used localhost
* But for production, this needs to be changed
* Previously, we made the browser to figure out the domain by using relative path
* But the html in surveyTemplate is gonna be rendered inside a User's email inbox
* There, we can't rely upon Browser cause if it's in gmail, then they will be sent to gmail/surveys etc
* So add this logic in dev.js and prod.js(Also in heroku domain)
* Add another route in surveyRoutes.js
* **Thanks for voting** not working, maybe proxy problem
* Had to change localhost:3000 to 5000 in dev.js

### Client Side Survey Creation
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F01%2Fdiagrams.xml
* D 11-mockup:
* Create Dashboard.js in client dir

### Material Icons
* Check https://materializecss.com/
* https://materializecss.com/floating-action-button.html
* Add link of icons in public index.html

### Navigation with the Link Tag
* Import and use Link instead of a tag

### SurveyNew Form
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F04%2Fdiagrams.xml
* D 002-compon:
* Review step for form 
* SurveyNew form: Transition between SurveyReview and SurveyForm

### Purpose of Redux Form
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F06%2Fdiagrams.xml
* D 3: Component structure
  * App -> SurveyNew -> SurveyForm and SurveyFormReview
  * SurveyForm -> SurveyField
* D 4-form: Form with Redux
* Redux form is saving us the trouble of action creators and reducers
* D 5: Redux form

### Redux Form Setup
```sh
cd client
npm install redux-form
cd ..
npm run dev
```
* Doc link: https://redux-form.com/8.2.2/examples/wizard/
* Import reducer from authReducer
* reduxForm has to be assigned to a special key called form
* Create surveys folder to house all survey related components

### The ReduxForm Helper
* Changes in SurveyForm
* reduxForm is similar to connect function

### Redux Form in Practice
* name property in Field acts as key to extract the data
* prop of handleSubmit is provided by reduxForm just like connect provides a set of props

### Custom Field Components
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F06%2Fdiagrams.xml
* D 1-form:
* Why separate SurveyFields
  * To avoid duplication of 4 labels and 4 Fields in SurveyForm.js
* Provide custom component to component property of Fields
* Why input in SurveyField when we can provide input as value to component property of Field component
  * Benefit of wiring Event handlers
* Redux form: Added benefit of wiring of Event handlers to the form elements, i.e no need to wire it manually

### Wiring up Custom Fields
* Since SurveyField is being rendered by the Field tag, it has a bunch of props passed down to it
* console log props to check what is passed down to it

### DRY'ing Up Fields
* Field component with different props

### Fields from Config
* I used this
```js
renderFields() {
    return (
      <div>
        {FIELDS.map(({ name, label }) => (
          <Field
            name={name}
            label={label}
            type="text"
            component={SurveyField}
          />
        ))}
      </div>
    );
  }
```
* Instructor's implementation
```js
renderFields() {
    return _.map(FIELDS, ({ name, label }) => (
      <Field name={name} label={label} type="text" component={SurveyField} />
    ));
  }
```

### Styling the Form
* D 1-form:
* Make submit button nicer

### Form Validation
* validate option to reduxForm call
* A function needs to be passed under the key validate
  * This function will be automatically called when the form is submitted
  * validate needs to return an object
  * If the object is empty, there are no errors
  * But if the object is not empty, it will not allow us to submit the form
```js
export default reduxForm({
  validate: validate,
  form: 'surveyForm',
})(SurveyForm);

// And since value is same as key, key alone is sufficient
validate
```

### Showing Validation Errors
* By having the errors object have the same property as the name of the Field, redux-form automatically passes it to the Field as a prop called meta
* Console log meta and check
  * It has many useful properties like touched, error etc
* If we have just the meta.error after the input, we see the Error as soon the application renders
  * This is because the when the form is rendered validation function is automatically run 
* ES6 nested destructuring
```js
{input, label, meta: {touched, error}}
```

### Generalizing Field Validation
* Use lodash each method instead of writing condition for each field separately
* Use NoValueError for each object in the FIELDS list for custom error message

### Validating Emails
* Check this link: https://redux-form.com/8.2.2/examples/fieldlevelvalidation/ for email regex
* Check condition for multiple and single emails
* My way of validating emails
```js
if (name === 'emails' && values[name]) {
      const emails = values[name].split(',');
      _.each(emails, (email) => {
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.trim())
        ) {
          errors[name] = `${email.trim()} is invalid`;
        }
      });
    }
```
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F06%2Fdiagrams.xml
* D 6-emails:
* The email validation logic is made into a separate file so that other components may utilize this in the future

### Displaying Invalid Emails
* D 7-email:
* I referred https://redux-form.com/8.2.2/examples/fieldlevelvalidation/ for email regex
* The Instructor used emailregex.com
```js
re.test(email) === false
// or in short
!re.test(email)
```
* We have used === false for better readability in the above expression
* When we run, we get Cannot read property 'split' of undefined
  * When the form is first built by redux form, validation automatically runs one time

#### Project of removing just the trailing comma(,) and space
* Add regex below to strip the trailing comma
```js
emails.replace(/,\s*$/, "")
```

### Toggling Visibility
* For removing the unnecessary Warning message in the Console, use the html regex from emailregex.com
* D 3-form stru:
* D 8-vis:
  * How to handle FormReview on clicking Next
    * Separate Route
      * Cons: Direct navigation to that route
    * Redux: Update some state in the redux store
      * Flag inside redux-store for SurveyNew to show SurveyForm or Review
      * Cons: Extra code of reducers, action creators
    * Component State
      * State in SurveyNew which will be either true or false
      * Based on this, we can display either SurveyForm or ReviewForm
      * And to both of these components, a callback can be passed to update the state
* **Why Component level state when there is redux**
  * Ask the question: Do you ever think this information will be used in any other Component
  * In our case,NO. So, component level state is sufficient

### Advancing From SurveyForm
* Initializing Component level state
```js
constructor(props){
  super(props);
  this.state = {showReview: false} 
}
// Equivalent to
state = {showReview: false} 
```

### Persisting Form Values
* Option to reduxForm, destroyOnUnmount
  * It is true by default
  * If it is set to false, it will keep the values
* Unmount: When the Component is no longer shown
* D 4-form with: To communicate the values submitted in the form
  * We are using redux
  * And since we used redux-form, we don't have to wire up the action creators and reducers
* But we still need to wire up using connect helper in SurveyFormReview
* console log state in mapStateToProps to check its value
* We see the value in survey.form.surveyForm.values
* Here surveyForm is the name of the form given in the argument to reduxForm
  * This helps in namespacing when there are multiple forms

### Refactoring Form Fields
* Whatever we return from mapStateToProps will appear as props to the Component
* Create formFields.js containing the FIELDS list

### Finalizing Review Fields
* Import formFields and add reviewFields variable instead of creating a new function

### Outstanding Form Work
* For submit, it's tied to an Action Creator
* In actions index.js file, add submitSurvey action
* For dummy check, we need to return an object containing type
* Then import this in SurveyFormReview
* Test this out by running npm run dev and after clicking the Send Survey, there should be no errors in the Console

### Dumping Form Values
* Import reduxForm in SurveyForm and wrap the SurveyNew component with it
* And this takes care of only showing the formFields when Back is entered from SurveyFormReview
* The logic works like this:
  * Whenever the SurveyForm is unmounted, like moving to SurveyFormReview, then destroyOnUmount is false and the form retain its values
  * But whenever SurveyNew is unmounted, like moving to a page other than SurveyForm and SurveyFormReview, the form value is cleared due to default behaviour of clearing the form

### Fixing Property Names
* Diagram Link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F06%2Fdiagrams.xml
* D 12-prop: Mismatch

### Posting to Surveys
* D 9-on:
* Test by running 
* Give the following input
```txt
{title: "Survey #10", subject: "Please Give Feedback", body: "Did you like our service?", recipients: "rovanova.nuthan@gmail.com"}
```
```sh
export NODE_TLS_REJECT_UNAUTHORIZED='0'
npm run dev
```

### Redirect on Submit
* We want programmatic navigation
* D 10-react:
  * App is where we create our initial Routing definition and SurveyNew is directly rendered by React Router
  * Since SurveyNew is directly rendered by React Router, it has props sent from React Router to handle navigation
  * But it is not passed down to SurveyForm and SurveyFormReview and submitSurvey
* D 11-withRouter: Helper
  * Google react router and look for withRouter
* We are gonna hook up withRouter to SurveyFormReview
* So after this history object is passed as props to the Component
* After this test this out

### Feedback with Webhooks
* Record feedback
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F05%2Fdiagrams.xml
* D 21-flow: Flow

### Webhooks in Development
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F07%2Fdiagrams.xml
* D 1:
* D 2: In production
  * No problem whatsoever, since we give a public domain
* D 3: Dev
* D 4: Issue solved with local tunnel
  * localtunnel.com: Outside service that we are gonna make use of 
  * http://localtunnel.github.io/www/

### LocalTunnel Setup
```sh
npm install -g localtunnel
```
* Subdomain needs to be mentioned in webhook scripts because many people will be using localtunnel.com
  * Put something random
* npm run dev to test
```txt
your url is: https://cnuthancalksdfjlka.loca.lt
```

### Testing Webhooks
* Open Sendgrid dashboard
* https://app.sendgrid.com/
* Select Settings -> Mail Settings -> Event Webhook
  * Enable in Status
  * Copy paste the url: https://cnuthancalksdfjlka.loca.lt/api/surveys/webhooks
  * Click on Test Your Integration

### Localtunnel crashing issues
```txt
For MACOS/Linux

I've written a tiny script to automatically restart your localtunnel if it crashes.  Here's what to do:

In your root project directory, create a new file called sendgrid_webhook.sh .  Inside of it, add the following code:

function localtunnel {
  lt -s YOUR_SUBDOMAIN --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done

Replace YOUR_SUBDOMAIN with the subdomain you picked!

Then in your package.json file, replace the "webhook" script with this:

"webhook": "./sendgrid_webhook.sh"
```
```txt
------- Windows Directions --------
At the terminal, run npm install --save-dev forever 

In your root project directory, create a new file called sendgrid_webhook.js .  Add the following to that file:

var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: <YOUR_SUBDOMAIN> }, function(err, tunnel) {
  console.log('LT running')
});
Replace <YOUR_SUBDOMAIN> with the subdomain name you picked, so it should look something like 

{ subdomain: 'asdfasdf' }
In the package.json file, replace the "webhook" script with the following:

"webhook": "forever sendgrid_webhook.js"
```

### Finalizing Webhook Setup
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F07%2Fdiagrams.xml
* D 5-req: Webhook Body
* In https://app.sendgrid.com/settings/mail_settings
  * HTTP Post URL: https://cnuthancalksdfjlka.loca.lt/api/surveys/webhooks
  * Select Clicked Checkbox
* Create new email and check
* Open the email and click on Yes
```txt
// Console log
[
   {
     email: 'rovanova.nuthan@gmail.com',
     event: 'click',
     ip: '117.192.85.120',
     sg_event_id: 'C6UAO9LcTTmEgP5BLObzYg',
     sg_message_id: 'CUHuMYm7RbCdsoX2NZEL_A.filterdrecv-p3las1-7b4858585b-5gfq9-17-5FAAAF3F-8C.0',
     timestamp: 1605021537,
     url: 'http://localhost:5000/api/surveys/thanks',
     url_offset: { index: 0, type: 'html' },
     useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36'
   }
 ]
```

### Encoding Survey Data
* D 6-url:
  * Don't know which survey was clicked
  * Don't know what was clicked
* D 7-vot: Solution to above problem of which survey was clicked
* Changes in surveyTemplate file
* Create a new Survey and test
```txt
[
   {
     email: 'rovanova.nuthan@gmail.com',
     event: 'click',
     ip: '49.44.85.10',
     sg_event_id: '9TqvS0PhRGK3DvDzMXhpwQ',
     sg_message_id: 'XnA8p5ufRaebc8DnyNiQgw.filterdrecv-p3iad2-745ddd55b7-dpxdv-19-5FAAB144-5.0',
     timestamp: 1605022038,
     url: 'http://localhost:5000/api/surveys/5faab142935026bad16eeff2/yes',
     url_offset: { index: 0, type: 'html' },
     useragent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36'
   }
 ]
```

### Dirty Data from Webhooks
* Very quick succession click on Yes 2 times in a row
* Pre-processing to remove duplicate clicks and filter events only of click

### Processing Pipeline
* D 9-weak: 
* D 8-extract: 

### Parsing the Route
```sh
npm i lodash path-parser
```
* Changes in survyeRoutes
```txt

 [
   {
     email: 'rovanova.nuthan@gmail.com',
     event: 'click',
     ip: '49.44.83.235',
     sg_event_id: 'ZxWpuMx4RZSKz1-bizzd-w',
     sg_message_id: 'xR0324UIQWuJ8to9vEEMTQ.filterdrecv-p3las1-8659fd955-lzdrl-19-5FACE21C-D.0',
     timestamp: 1605165618,
     url: 'http://localhost:5000/api/surveys/5face2196464ddd00389849e/yes',
     url_offset: { index: 0, type: 'html' },
     useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
   }
 ]
 [
   {
     email: 'rovanova.nuthan@gmail.com',
     event: 'click',
     ip: '203.171.242.70',
     sg_event_id: 'xKyFlzf5T9mc1ERzsiF6Rw',
     sg_message_id: 'xR0324UIQWuJ8to9vEEMTQ.filterdrecv-p3las1-8659fd955-lzdrl-19-5FACE21C-D.0',
     timestamp: 1605165618,
     url: 'http://localhost:5000/api/surveys/5face2196464ddd00389849e/yes',
     url_offset: { index: 0, type: 'html' },
     useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
   }
 ]
```
* npm run dev and check by clicking on the existing email
```js
// console log
{ surveyId: '5face2196464ddd00389849e', choice: 'yes' }
{ surveyId: '5face2196464ddd00389849e', choice: 'yes' }
```

### Code Cleanup
* match in surveyRoutes either an object or null
* match cannot be destructured because when p.test is null, it will throw an error
```js
[
   {
     email: 'rovanova.nuthan@gmail.com',
     surveyId: '5face2196464ddd00389849e',
     choice: 'yes'
   }
 ]
```

### Unique Events
* compact from lodash will remove all that are undefined
* No same email and surveyId
* Test this out by clicking on the email couple of times

### Lodash Chain Helper
* Diagram link: https://app.diagrams.net/?mode=github#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FStephenGrider%2FFullstackReactCode%2Fmaster%2Fdiagrams%2F07%2Fdiagrams.xml

### Bad Mongoose Queries
* D 12-query:
```js
let survey = await Survey.findById(surveyId);
// Very bad as survey also contains sub-document collection of recipients(which is very big)
```
* Entire code
```js
_.forEach(events, ({surveyId, email, choice}) => {
  let survey = await Survey.findById(surveyId);

  // find a recepient that matches email and has not responded yet
  const responder = survey.recipients.find(recipient => 
    recipient.email === email && !recipient.responded
  );

  if(!responder) {
    // recipient has already responded
    return console.warn('Response already logged!');
  } else {
    // recipient hasn't responded, set their responded flag to true
    survey.recipients.id(responder._id).responded = true;
    survey[answer] += 1;
    survey.lastResponded = new Date(timestamp * 1000);

    survey.save();
  }
})
```
* Need to put the burden on Mongo and not in the Express Server

### Finding the Exact Survey
* D 11-mongo:
* Right Sample query
```js
email = 'a@a.com'
Survey.updateOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false }
  }
}, {

})
// sub-criteria in recipients
// updateOne instead of findOne
// Entire update taken care in the mongo world without pulling into Express
```

### Updating Records
```js
choice = 'yes' || 'no';
email = 'a@a.com';
Survey.updateOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false }
  }
}, {
  $inc: { [choice]: 1 },
  $set: { 'recipients.$.responded': true }
})
// $inc is a Mongo operator that allows up to put intelligent logic within our query
// In this case, find choice property and increment it by one
// [] is used for dynamic interpretation
// $ lines up with elemMatch, like in index 500
```
* All the above operations in Mongo without pulling into Express

### Executing Queries
* Mongodb world, need to use _id
* exec : Executes the query
* npm run dev and create a New survey to test
  * Recipient list: rovanova.nuthan@gmail.com, nuthanc@juniper.net
* Click on Yes multiple times using Option click
* Need to check in mlab as there are no console logs

### Testing the Query
* https://cloud.mongodb.com/v2/5ebc0abdea7241503870c172#metrics/replicaSet/5f5a1a1be842ae722f1dd94b/explorer/test/surveys/find
* NodeReactCluster
* For Super final test, we see yes: 1, even though we clicked on it multiple times and rovanova.nuthan's responded is true

### Odds n' Ends Around Surveys
* Add lastResponded: new Date()
* Reuse the previous Super final test email to get Thanks for voting message
  * Edit the responded to false and click again

