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
And this time we was trying to improve the cons from [the first approach](first-approach)

## Requirements
1. Client only send inputs to the server
2. Server will handle all of logic for the game
3. A player can join in the middle of any session
4. Client can resume the session after disconnected or crash
5. Optimize package size of a message send from server to clients for every action receives from client

## Design
For every action that a player does client will send that input to the server, the server will 
1. A
2. B

## Flow Diagram
![First Approach](/img/blog/first-approach.svg)

## Summary
