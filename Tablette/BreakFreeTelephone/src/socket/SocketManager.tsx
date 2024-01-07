import React, {useEffect, useContext} from 'react';
import socket from './socket';
import {useList} from '../context/ListContext';

const SocketManager: React.FC = () => {
    const {addObjectInPoche} = useList();

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Connecté au serveur socket');
        });


        socket.on('onObjectSentToPocket', (data: any) => { // Assurez-vous que le type de 'data' est correct
            try {
                const contentObject = JSON.parse(data.content);
                switch (contentObject.name) {
                    case "KeySendToPocket" :
                        addObjectInPoche("key");
                        break;
                    case "DiceSendToPocket" :
                        addObjectInPoche("dice");
                        break;
                    case "PaintSendToPocket" :
                        addObjectInPoche("paint");
                        break;
                }


            } catch (error) {
                console.error("Erreur lors de la conversion de data.content en objet :", error);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [addObjectInPoche]);

    return null; // Ce composant ne rend rien
};

export default SocketManager;