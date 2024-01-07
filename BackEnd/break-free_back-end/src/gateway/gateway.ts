import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  private deviceMap = new Map<string, string>();

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New message',
      content: body,
    });
  }

  @SubscribeMessage('helloWorld')
  onHelloWorld(
    @MessageBody() body: { deviceName: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(body);
    if (socket && socket.id) {
      this.deviceMap.set(body.deviceName, socket.id);
    } else {
      console.log('Error: socket or socket.id is undefined');
    }
    console.log(this.deviceMap);
  }

  @SubscribeMessage('vanGoghClick')
  async onVanGoghClick(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onVanGoghClick', {
      msg: 'The Van Gogh painting was clicked',
      content: body,
    });
  }

  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onLeaveRoom', {
      msg: 'The user left the room',
      content: body,
    });
  }

  @SubscribeMessage('enterBedroom')
  async onEnterBedroom(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onEnterBedroom', {
      msg: 'The user entered the bedroom',
      content: body,
    });
  }

  @SubscribeMessage('scanned')
  async onScanned(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onScanned', {
      msg: 'The user scanned',
      content: body,
    });
  }

  @SubscribeMessage('objectSentToPocket')
  onObjectSentToPocket(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onObjectSentToPocket', {
      msg: 'An object was sent to the pocket',
      content: body,
    });
  }

  @SubscribeMessage('objectUsed')
  onObjectUsed(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onObjectUsed', {
      msg: 'An object was used',
      content: body,
    });
  }

  @SubscribeMessage('wrongObject')
  onWrongObject(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onWrongObject', {
      msg: 'A wrong object was used',
      content: body,
    });
  }

  @SubscribeMessage('removeObject')
  onRemoveObject(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onRemoveObject', {
      msg: 'An object was removed',
      content: body,
    });
  }

  @SubscribeMessage('objectCatched')
  onObjectCatched(@MessageBody() body: any) {
    console.log(body);
  }
}
