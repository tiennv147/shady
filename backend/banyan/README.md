# Banyan is the gateway for the whole system
## Banyan will use envoy-proxy to handle traffic from client with protocol
+ Unary gRPC for requests which are not yet determine channelID yet
+ WebSocket for two-way communication
## Banyan also use some Envoy's filter for
+ Authentication
+ Authorization
+ Circuit Breaking
+ Rate Limiting
+ Others features from Envoy
  