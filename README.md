### Installing the Heroku CLI
* Diagram 16-d: First Time and Subsequent deployments
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
# https://shrouded-garden-46362.herokuapp.com/ | https://git.heroku.com/shrouded-garden-46362.git
git remote add heroku https://git.heroku.com/shrouded-garden-46362.git
git push heroku master
# Use heroku buildpacks:set heroku/nodejs if the above fails
```
* Heroku push error: https://stackoverflow.com/questions/43362014/heroku-no-default-language-could-be-detected-for-this-app-error-thrown-for-no