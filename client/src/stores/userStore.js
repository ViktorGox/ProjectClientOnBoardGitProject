import {writable} from "svelte/store";

export default writable({
    id: 0,
    email: "",
    roleid: 0,
    role: "",
    iat: 0 //represents the timestamp when the JWT was issued if we want to use it for something in user page for example
});
