# Figma Avatar

Update your Twitter avatar and banner from the comfort of Figma.


### How to use this project

*Important*: this project uses the Figma [Webhooks v2 API](https://www.figma.com/developers/api#webhooks_v2) which is in beta and only available for paid teams.

1. Rename `env_sample` to `.env` and add the following information
  - Your Figma token and the ID of your Figma file
  - The Twitter credentials
2. Install the dependecies with `yarn install`
3. Run the server with `yarn start`
4. Create a POST webhook:

```curl -X POST -H 'X-FIGMA-TOKEN: [FIGMA_TOKEN]' -H "Content-Type: application/json" 'https://api.figma.com/v2/webhooks' -d '{"event_type":"FILE_VERSION_UPDATE","team_id":"[TEAM_ID]","endpoint":"[YOUR_APP_ENDPOINT]/ping","passcode":"[PASSCODE]"}'```


