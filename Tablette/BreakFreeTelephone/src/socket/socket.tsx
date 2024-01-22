import io from 'socket.io-client';

// URL de votre serveur socket
const SOCKET_URL = 'http://172.20.10.11:3000';

// Création de l'instance socket
const socket = io(SOCKET_URL);

export default socket;

