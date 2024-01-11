import {subscribedSockets, wsTokenMap} from "../websocket.js";


export function handleSubscription(parsedData, ws) {
    console.log(wsTokenMap.get(ws))
    if (wsTokenMap.get(ws)) {
        subscribedSockets.add(ws);
        ws.send(JSON.stringify({ response: "success", message: "Subscribed successfully" }));
    } else {
        ws.send(JSON.stringify({ response: "error", message: "Not authenticated" }));
    }
}
