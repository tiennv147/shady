---
slug: second-approach
title: The Second Approach
author: Tien Nguyen Van
author_title: Software Engineer
author_url: https://github.com/tiennv147
author_image_url: https://avatars1.githubusercontent.com/u/12485150?s=460
tags: [networked-strategy, multiplayer-games]
---

This blog just a record for our journal to build a multiplayer table game.
And this time we was trying to improve the cons of [the first approach](2020-07-26-first-approach.md)

## Requirements
1. Client only send inputs to the server
2. Server will handle all of logic for the game
3. A player can join in the middle of any session
4. Client can resume the session after disconnected or crash
5. Optimize package size of a message send from server to clients for every action receives from client

## Design
For every action that a player does, client will send that input to the server, the server will 
1. Handle logic of that input, and update the state for this session
2. Reply to the client if it's necessary to inform the client for fail/success action
3. Broadcast the state for every information of session to clients

## Flow Diagram
![Second Approach](/img/blog/networked-strategies-second-approach.svg)

## Summary
1. The second solution seems can improve the situation for redundant events in a long run.
2. But it also create another problems is, it makes a very difficult to client-side for knowing which changes has been made when receive the state update from server
3. We can improve it by adding the inputs from clients for those message state update at the time.


> P/S: We can consider this strategy if likely second one (Snapshot Interpolation) that mentioned in the second blog of the series [Networked Physics from Gafferongames][1]

[1]: https://gafferongames.com/post/snapshot_interpolation/