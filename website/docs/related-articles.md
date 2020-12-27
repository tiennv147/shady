---
id: related-articles
title: Related Articles
---

### Leanring about Networked Physics
+ [Introduction to Networked Physics][1]
+ [Deterministic Lockstep][2]
+ [Snapshot Interpolation][3]
+ [Snapshot Compression][4]
+ [State Synchronization][5]
+ [What Every Programmer Needs To Know About Game Networking][10]

### References framworks
+ [NetEase/pomelo][6]

### Interesting links
+ [Multiplayer Server Architecture - Why is Deterministic Lockstep still a thing?][7]
+ [Don’t use Lockstep in RTS games][8]
+ [1500 Archers on a 28.8: Network Programming in Age of Empires and Beyond][9]
+ [Determinism League of Legends Implementation][11]


### Facts
+ StarCraft 1 used a peer-to-peer Lockstep model, while StarCraft 2 is Client-Server, but still a Lockstep model. [Starcraft2 Netgames.pdf](http://choongsoo.info/docs/starcraft2.netgames12.pdf).
+ Supreme Commander 1 uses Lockstep [Synchronous RTS Engines and a Tale of Desyncs](http://forrestthewoods.com/synchronous-rts-engines-and-a-tale-of-desyncs/) while newer games like Planetary Annihilation use Client-Server [Client-Server Network Model](http://planetaryannihilation.gamepedia.com/Client-server_network_model).
+ Dota 1 was running on the Warcraft 3 engine which used Lockstep, but when Valve rewrote the Source engine it uses Client-Server [Extending Node-dota2](https://blog.rjackson.me/extending-node-dota2/).
+ In the FPS corner DOOM used Lockstep but Quake used Client-Server, Lockstep did not live long with FPS games at all.
MMOs never used Lockstep because its not not feasible for that many players.



[1]: https://gafferongames.com/post/introduction_to_networked_physics/
[2]: https://gafferongames.com/post/deterministic_lockstep/
[3]: https://gafferongames.com/post/snapshot_interpolation/
[4]: https://gafferongames.com/post/snapshot_compression/
[5]: https://gafferongames.com/post/state_synchronization/
[6]: https://github.com/NetEase/pomelo
[7]: https://www.reddit.com/r/gamedev/comments/9wzzgs/multiplayer_server_architecture_why_is/
[8]: https://medium.com/@treeform/dont-use-lockstep-in-rts-games-b40f3dd6fddb
[9]: https://www.gamasutra.com/view/feature/131503/1500_archers_on_a_288_network_.php
[10]: https://gafferongames.com/post/what_every_programmer_needs_to_know_about_game_networking/
[11]: https://technology.riotgames.com/news/determinism-league-legends-implementation