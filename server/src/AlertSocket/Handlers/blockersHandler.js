import fetch from 'node-fetch';
import {subscribedSockets} from "../websocket.js";

const url = "http://localhost:3000/";

export async function sendBlockers() {
    try {
        const response = await fetch(`${url}test`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        let data = await response.json();
        data = data.filter(test => test.statusid === 3);

        const clients = Array.from(subscribedSockets);
        clients.forEach(client => {
            client.send(JSON.stringify({ response: "blockers", data }));
        });
    } catch (error) {
        console.error('Error fetching blockers:', error);
    }
}
