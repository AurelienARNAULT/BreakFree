import { OnModuleInit } from '@nestjs/common';
import { 
    WebSocketGateway, 
    SubscribeMessage, 
    MessageBody,
    WebSocketServer 
} from '@nestjs/websockets';

import { Server } from 'socket.io'

@WebSocketGateway() // changer le port d'écoute si besoin
export class MyGateway implements OnModuleInit {

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log("connected");
        });
    }

    @SubscribeMessage('newMessage') // à changer en fonction des nécessité 
    onNewMessage (@MessageBody() body: any) {
        console.log(body)
        this.server.emit('onMessage', {
            msg: 'New message',
            content: body
        })
    }
}