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

  @SubscribeMessage('objectSentToPocket')
  onObjectSentToPocket(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onObjectSentToPocket', {
      msg: 'An object was sent to the pocket',
      name: body.name,
      content: body,
    });
  }

  @SubscribeMessage('objectUsed')
  onObjectUsed(@MessageBody() body: any) {
    console.log(body);
    console.log(body.name);
    this.server.emit('onObjectUsed', {
      msg: 'An object was used',
      name: body.name,
      content: body,
    });
  }

  @SubscribeMessage('objectDropped')
  onObjectDropped(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onObjectDropped', {
      msg: 'An object was dropped',
      name: body.name,
      content: body,
    });
  }

  @SubscribeMessage('objectCatched')
  onObjectCatched(@MessageBody() body: any) {
    console.log(body);
  }
}
