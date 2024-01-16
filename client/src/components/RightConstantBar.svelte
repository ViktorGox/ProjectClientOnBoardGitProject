<script>
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";

    export let assigneeName;
    export let assigneeProfilePicture;
    export let dueDate;
    export let testId;
    async function fetchData() {
        const response = await fetchRequest('test/' + testId + '/');
        console.log(response[0].userid, ' user id');
        const username = await fetchRequest('users/' + response[0].userid);
        assigneeName=username[0].email;
    }

    onMount(async () => {
        await fetchData();
    });
</script>

<div class="right-constant-bar">
    <div class="assignee-info">
        <img src={assigneeProfilePicture} alt="Assignee Profile Picture"/>
        <p>{assigneeName}</p>
    </div>
    <div class="due-date">
        <p>Due Date: {dueDate}</p>
    </div>
</div>

<style>
    .right-constant-bar {

        position: fixed;
        z-index: 11;
        top: 66px;
        right: 0;
        height: 100vh;
        width: 15%;
        color: #ffffff;

        background-color: #25252b;
        overflow-y: auto;
    }

    .assignee-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .due-date {
        text-align: center;
    }
</style>