---
slug: third-approach
title: The Third Approach
author: Tien Nguyen Van
author_title: Software Engineer
author_url: https://github.com/tiennv147
author_image_url: https://avatars1.githubusercontent.com/u/12485150?s=460
tags: [networked-strategy, multiplayer-games]
---

This blog just a record for our journal to build a multiplayer table game.
And this time we were trying to improve the cons of [the second approach](2020-10-14-second-approach.md)

<!--truncate-->

## Requirements
1. Client only send inputs to the server
2. Server will handle all of the logic for the game
3. A player can join in the middle of any session
4. Client can resume the session after disconnected or crash
5. Optimize package size of a message sent from the server to clients for every action receives from a client
6. Support clients to render the changes since the last time they receive state update
7. Optimize number of broadcasting messages when receiving multiple inputs from client to other clients

## Design
1. Every object related to a session will have a UID for each one.
2. Server will be setting an interval time to process all of the message clients send to the server during that interval **(50ms => 20 FPS)**
3. When the client sends that input to the server will handle the logic of that input, and update the state for this session, and also add this event to the message that will send to a client
4. Reply to the client if it's necessary to inform the client for fail/success action
5. Broadcast the state and events input from the client since last time

## State Synchronization
> What is state synchronization? The basic idea is that, somewhat like deterministic lockstep, we run the simulation on both sides but, unlike deterministic lockstep, we don’t just send input, we send both input and state.

> This gives state synchronization interesting properties. Because we send state, we don’t need perfect determinism to stay in sync, and because the simulation runs on both sides, objects continue moving forward between updates.

> This lets us approach state synchronization differently to snapshot interpolation. Instead of sending state updates for every object in each packet, we can now send updates for only a few, and if we’re smart about how we select the objects for each packet, we can save bandwidth by concentrating updates on the most important objects.

## Flow Diagram
<figure className="video-container">
  <iframe width="100%" src="https://www.youtube-nocookie.com/embed/wJ5IKK2MrYM?modestbranding=1" allowFullScreen="0"
   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
   </iframe>
</figure>

## Summary
1. The third one seems to make sense to us until now
2. Let's see if we get any drawback along the way, stay tuned to receive more update on it

> P/S: We can consider this strategy if likely last one (State Synchronization) that mentioned in the third blog of the series [Networked Physics from Gafferongames][1]

[1]: https://gafferongames.com/post/state_synchronization/