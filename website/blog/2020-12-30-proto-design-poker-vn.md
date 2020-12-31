---
slug: proto-design-poker-vn
title: Protobuf API Design for Poker VN Online
author: Tien Nguyen Van
author_title: Software Engineer
author_url: https://github.com/tiennv147
author_image_url: https://avatars1.githubusercontent.com/u/12485150?s=460
tags: [poker-vn, api-design]
---

This blog just a record for our journal to build a multiplayer table game.
In this blog I will talk about definition of protobuf file for two main parts of game:
+ Waiting State
+ Playing State

<!--truncate-->

## Requirements
1. Support create personal table along with auto-table from the system
2. Support rejoin/continue a session of a table after disconnected or crash
3. Support replay a whole session after finish it
4. Optimize data send & receive between client & server
5. Client has enough information to update screen & play animation

## Flow Diagram
### Waiting State
#### Create a Table
![Create a table](/img/blog/poker-vn-online-create-table.svg)
#### Join a Table
![Join a table](/img/blog/poker-vn-online-join-table.svg)
### Playing State
![Take turn in a table](/img/blog/poker-vn-online-playing-state.svg)

## Protobuf Definition
```protobuf title="pokervn.proto"
message Message {
  oneof payload {
    // waiting state
    JoinRequest = 1;
    JoinReply = 2;

    LeaveRequest = 4;
    LeaveReply = 5;

    KickRequest = 7;
    KickReply = 8;

    ReadyRequest = 9;
    ReadyReply = 10;

    StartRequest = 11;
    StartReply = 12;

    TakeTurnRequest = 13;
    TakeTurnReply = 14;

    TableStateUpdate = 15;
  }
}

message JoinRequest {
  // Don't need to specify channelID in here because
  // we will put it on the RiverMessage
  string password = 1;
}

message JoinReply {
  // There is no error because, it will be cover by the RiverMessage
  Table table = 1;
}

message LeaveRequest {
  // There is no userId in message because it will be cover River
}

message LeaveReply {
}

message KickRequest {
  string user_id = 1;
}

message KickReply {
  // error or success will be cover by River status
}

message StartRequest {
}

message StartReply {
}


message Table {
  string id = 1;
  string name = 2;
  bool private = 3;

  uint64 buy_in = 7;
  uint64 chip_value = 8;
  uint32 max_players = 9;
  int32 turn_timeout = 10;

  oneof state {
    TableWaitingState = 1;
    TablePlayingState = 2;
  }
}

message TableStateUpdate {
  oneof state {
    TableWaitingState = 1;
    TablePlayingState = 2;
  }
}


message TableWaitingState {
  repeated Player players = 1;
}

message TablePlayingState {
  repeated Player players = 1;
  // cards on table will not include the recently turn
  // cards on table can be clean up for the next state update
  repeated Combination cards_on_table = 2;
  // It's not a all event during a session
  // It's only event since the last time client receives a state update
  repeated TurnEvent events = 3;
}

message Player {
  // Both waiting & playing need it
  // About anonymous, client shouldn't care about it
  // Value in this message already process & fit for situation
  string id = 1;
  string name = 2;
  int64 balance = 3;
  string avatar = 4;
  int32 position = 5;
  bool host = 6;

  oneof state {
    PlayerWaitingState = 7;
    PlayerPlayingState = 8;
  }
}


message PlayerWaitingState {
  bool ready = 1;
}

message PlayerPlayingState {
  oneof status {
    Spectator = 1;
    Thinking = 2;
    SkipTurn = 3;
    Ranking = 4;
    Ranked = 5;
  }

  // current cards of player
  // will be empty in waiting state & also empty if 
  repeated Card cards = 1;
}

message Spectator {
}

message Thinking {
  int32 timeout = 1;
}

message SkipTurn {
}

message Ranking {
  Rank rank = 1;
}

message Ranked {
  Rank rank = 1;
  // Could be positive or negative
  int64 amount = 2;
}

enum Rank {
  RANK_TYPE_UNSPECIFIED = 0;  // Value was not filled in.
  FIRST = 1;
  SECOND = 2;
  THIRD = 3;
  FOURTH = 4;
}

message Combination {
  repeated Card cards = 1;
}

message Card {
  CardNumber number = 1 [(validate.rules).enum.defined_only = true];
  CardType type = 2 [(validate.rules).enum.defined_only = true];
}

enum CardNumber {
  THREE = 0;
  FOUR = 1;
  // ...
}

enum CardType {
  SPADE = 0;
  CLUB = 1;
  DIAMOND = 2;
  HEART = 3;
}

message TakeTurnRequest {
  oneof action {
    Combination = 1;
    SkipTurn = 2;
  }
}

message TakeTurnReply {
}

message TurnEvent {
  oneof event {
    PlayerAction = 1;
    PlayAnimaiton = 2;
    // ...
  }
}

message PlayerAction {
  string user_id = 1;
  oneof action {
    Combination = 1;
    SkipTurn = 2;
  }
}

message PlayAnimaiton {

}

```

## References
+ [A complete engine to execute a poker game for multiple players][1]
+ [node.js based poker game server and HTML5 web client][2]
+ [Poker VN: Wikipedia for Tien Len Mien Nam][3]

[1]: https://github.com/mjhbell/node-poker
[2]: https://github.com/vampserv/node-poker-stack
[3]: https://en.wikipedia.org/wiki/Ti%E1%BA%BFn_l%C3%AAn