import {writable} from "svelte/store";

export default writable({
    id: 0,
    email: "",
    roles: [],
    iat: 0
});
