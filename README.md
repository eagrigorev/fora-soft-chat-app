## Fora Soft Evaluation Test (JS) v2.3

### Running the App
Server-side: run `npm install` and `npm run start:backend:dev` from the `/server` folder.

Client-side: run `npm install` and `npm run start:frontend:dev` from the `/client` folder.

### How It Works
I've been experimenting with that app, trying different practices: starting from serving static files through `express.static` and ending with making separate server and client apps and connecting them through proxy. A pretend-to-be database on the server accumulates data: rooms available, users, and messages, separated respectively. When someone joins, we create room (if it doesn't exist) and put the new user inside. Then we update that room's user list. If someone leaves, we delete that user and update the list again. If the room did exist, we pull messages and show them to the new user.

### General Notes
1. I didn't use `react-redux` and stuck with `useReducer` only because the app architecture is quite simple, the `state` is small, and the props drilling problem doesn't exist. The same goes for representational and container components: breaking the already small app down into smaller parts could increase complexity.
2. Due to no mentions about testing and web-packing and any design preferences, I skipped the first two parts and made the app as simple as possible design-wise. Best viewed on a desktop or a laptop.
3. I didn't use `WebRTC` and decided to stick with MVP only. Reading through the documentation, I figured out that I won't be able to make it by the deadline, though I'm still going to implement that feature when I get enough familiarity with the process. Sad but true.

### Known Issues
When someone leaves, it takes some time (seconds) to update the users' list. When someone joins, the list updates immediately. I'd appreciate any hints on the subject from the experienced devs!

