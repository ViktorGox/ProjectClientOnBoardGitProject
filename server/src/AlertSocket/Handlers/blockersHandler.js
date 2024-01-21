import fetch from 'node-fetch';
import {subscribedSockets} from "../websocket.js";

const url = "http://localhost:3000/";

export async function sendBlockers() {
    try {
        const response = await fetch(`${url}testing`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        let data = await response.json();
        data = data.filter(test => test.statusid === 3);

        // const testIdsMapped = data.map(item => item.testid).join(',');
        // let testData = await fetch(`${url}test?testid=` + testIdsMapped + ";Equals", {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        // });
        //
        // let testDataJsoned = await testData.json();
        // console.log(testDataJsoned);
        const clients = Array.from(subscribedSockets);
        clients.forEach(client => {
            client.send(JSON.stringify({ response: "blockers", data }));
        });
    } catch (error) {
        console.error('Error fetching blockers:', error);
    }
}
