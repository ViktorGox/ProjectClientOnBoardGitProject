Of course! Let's add some examples on how to use the WebSocket server for better clarity.

---

# WebSocket Server for Blocker Notifications - Usage Guide

1. The server will start, listening at ws://localhost:3001.

## Client Interaction:

### 1. Authentication:

- Send a JSON message with your email and password to authenticate:
  ```json
  {
    "command": "authenticate",
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```

  **Example:**
  ```bash
  ws.send('{"command": "authenticate", "email": "john.doe@example.com", "password": "securepassword"}');
  ```

    - Upon successful authentication, receive a success message. Otherwise, get notified of authentication failure.

### 2. Subscription:

- Post successful authentication, subscribe to receive blocker notifications:
  ```json
  {
    "command": "subscribe"
  }
  ```

  **Example:**
  ```bash
  ws.send('{"command": "subscribe"}');
  ```

    - On successful subscription, receive a confirmation message and start getting blocker updates.

### 3. Blocker Updates:

- Every 10 seconds, the server fetches blockers with status IDs `3` and `4`.
- Subscribed clients will automatically get these updates.

---

