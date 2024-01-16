<script>
    import { onMount } from 'svelte';
    import { webSocket } from "../../stores/webSocket.js";

    let blockers = [];

    onMount(() => {
        const ws = $webSocket;

        // Check if the WebSocket connection is open
        if (ws.readyState === WebSocket.OPEN) {

            // Listen for messages from the WebSocket server
            ws.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                console.log(data);

                // Here you can handle the response data as needed

            });

            // Send the authentication command with username and password
            ws.send(JSON.stringify({
                "command": "authenticate",
                "email": "admin",
                "password": "admin"
            }));

            // Subscribe to the necessary events
            ws.send(JSON.stringify({ "command": 'subscribe' }));

            console.log("Sent authentication and subscription requests.");
        } else {
            console.log("WebSocket connection is not open.");
        }
    });
</script>

<style>
    /* Add your styles here if needed */
</style>

<h1>Blockers</h1>

<ul>
    {#each blockers as blocker (blocker.testid)}
        <li>
            <strong>{blocker.name}</strong> - {blocker.description}
        </li>
    {:else}
        <li>No blockers to display.</li>
    {/each}
</ul>
