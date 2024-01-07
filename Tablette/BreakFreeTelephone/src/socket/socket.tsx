import io from 'socket.io-client';

// URL de votre serveur socket
const SOCKET_URL = 'http://192.168.1.19:3000';

// Création de l'instance socket
const socket = io(SOCKET_URL);

export default socket;