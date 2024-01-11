import { WebSocketServer } from 'ws';
import { handleAuthentication } from './handlers/authenticationHandler.js';
import { handleSubscription } from './handlers/subscriptionHandler.js';
import { sendBlockers } from './handlers/blockersHandler.js';

const wss = new WebSocketServer({ port: 3001 });
export const wsTokenMap = new Map();
export const subscribedSockets = new Set();

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        try {
            const parsedData = JSON.parse(message);
            const command = parsedData.command;

            switch (command) {
                case "authenticate":
                    await handleAuthentication(parsedData, ws);
                    break;
                case "subscribe":
                    handleSubscription(parsedData, ws);
                    break;
                default:
                    ws.send(JSON.stringify({ response: "error", message: "Invalid command" }));
            }
        } catch (error) {
            ws.send(JSON.stringify({ response: "error", message: "Invalid JSON format" }));
        }
    });

    ws.send(JSON.stringify({ response: "info", message: "Client connected to socket" }));
    ws.on('close', () => {
        wsTokenMap.delete(ws);
        subscribedSockets.delete(ws);
        console.log('WebSocket connection closed');
    });
});

setInterval(sendBlockers, 10000); // Send blockers every 10 seconds
