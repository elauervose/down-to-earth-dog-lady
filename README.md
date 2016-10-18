# Down to Earth Dog Lady

## Local development

```
# Setup local development environment (one-time)
bin/setup

# Start the app (each time)
bin/start

```

## Updating instagram tokens in heroku

To update the instagram token in heroku:
```
bin/token
heroku config:set INSTAGRAM_ACCESS_TOKEN=<token from url in browser>
```

If this is the first time setting up heroku, you will also need to set the client id and secret from: [the developer portal](https://www.instagram.com/developer/clients/d25b1f5d8399440dbbcfe47cf41692aa/edit/)

Once you have the id and secret, do this on the cli:
```
heroku config:set INSTAGRAM_CLIENT_ID=d25b1f5d8399440dbbcfe47cf41692aa
heroku config:set INSTAGRAM_CLIENT_SECRET=<client secret>
```

# API Info
---------------------------------
## Training Page

### API Grouping Tags
1. Private Lessons SE Portland: #pl #plse
1. Private Lessons SW Portland: #pl #plsw
1. Private Lessons NE Portland: #pl #plne
1. Private Lessons NW Portland: #pl #plnw
1. Private Lesson Package of 4: #pl-pkg
1. Puppy Play Group: #ppg
1. Puppy Play Group Package of 4: #ppg-pkg
1. Training & Socialization Lessons: #tsl
1. Training & Socialization Package of 4 Lessons: #tsl-pkg
1. Pack Hike Prep Lesson Package of 4: #phpl-pkg
1. Real-World Proofing Your Dog: #rwp
1. Other classes not on the list:
  1. #misc1
  1. #misc2
  1. #misc3



