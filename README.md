# kortright-buzzer-bot

This bot automatically opens the door of my apartment building. I'd often find myself missing calls from deliveries, so I decided to make a bot that will open the door for me.

Docker image: `gcr.io/conor-roberts/buzzer-bot`

## Start (Linux Local)

`nohup npm start &`

## Stopping (Linux Local)

- `ps -ef|grep node` to see if the bot is running
- `kill -9 {pid}` to stop the bot
