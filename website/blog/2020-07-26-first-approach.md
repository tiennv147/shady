---
slug: first-approach
title: The First Approach
author: Tien Nguyen Van
author_title: Software Engineer
author_url: https://github.com/tiennv147
author_image_url: https://avatars1.githubusercontent.com/u/12485150?s=460
tags: [networked-strategy, multiplayer-games]
---

This blog just a record for our journal to build a multiplayer table game.
In this blog I'll talk about our first solution for networked strategy
<!--truncate-->

## Requirements
1. Client only send inputs to the server
2. Server will handle all of logic for the game
3. A player can join in the middle of any session
4. Client can resume the session after disconnected or crash

## Design
For every action that a player does client will send that input to the server, the server will 
1. Add this input as an event to the list of events
2. Handle logic of that input, generate other events if needed & add to the list of events
3. Reply to the client if it's necessary to inform the client for fail/success action
4. Broadcast the state with the list of events of that time

## Flow Diagram
![First Approach](/img/blog/networked-strategies-first-approach.svg)

## Summary
1. This is the very naive idea of building our very first prototype for our multiplay table games
2. The biggest problem of this solution is redundant in every message that the server broadcast 
to all clients for every action receives from a client. 
3. We can improve it by only send a state update with only new events.

> P/S: We can consider this strategy if likely the one (deterministic) that mentioned in the first blog of the series [Networked Physics from Gafferongames][1]

[1]: https://gafferongames.com/post/deterministic_lockstep/