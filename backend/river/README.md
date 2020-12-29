# River is the service play a role like a hub, keep connection and support communicaiton between client & backend services
## Dispatcher
When receive a message from client, River will dispatch this message to a queue base on two field of this message
+ Topic
+ ChannelID
It means every message in coming to River need to have topic and channelID
## Pusher
Backend service can send message to a user whenever that one, they only need to know whichuserID
that they want to send to and don't need to care where they are

