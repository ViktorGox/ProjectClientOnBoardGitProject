import {writable} from "svelte/store";

export default writable({
    id: 0,
    username: "",
    roles: [],
    iat: 0
});
