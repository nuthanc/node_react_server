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
  * The create-react-app takes all the different js, css and other files and will run webpack and babel over all those files and save a final production build of our application in public dir