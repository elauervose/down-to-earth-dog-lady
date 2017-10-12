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




