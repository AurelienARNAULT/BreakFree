import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import io from 'socket.io-client';

const SocketComponent = () => {
  const [message, setMessage] = useState('');
  const socket = io('http://10.212.98.199:3000');

  useEffect(() => {
    console.log('Connexion Socket établie.');

    // Écouter les messages entrants
    socket.on('onMessage', data => {
      console.log('Message reçu:', data);
      setMessage(data.msg + ': ' + data.content);
    });

    socket.on('connect', () => {
      console.log('Socket connecté.');
    });

    socket.on('disconnect', () => {
      console.log('Socket déconnecté.');
    });

    socket.on('connect_error', err => {
      console.error('Erreur de connexion:', err);
    });

    // Fonction de nettoyage
    return () => {
      console.log('Déconnexion Socket.');
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    console.log("Envoi d'un message...");
    socket.emit('newMessage', 'Hello from Client', (response: any) => {
      console.log('Réponse du serveur:', response);
    });
  };

  return (
    <View>
      <Text>{message}</Text>
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
};

export default SocketComponent;
