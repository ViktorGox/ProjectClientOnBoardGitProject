<script>
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";

    export let assigneeProfilePicture;
    let assigneeEmail;
    let userId;
    let sprintId;
    export let dueDate;
    export let testId;
    let users = [];

    async function fetchData() {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        sprintId = parts[parts.length - 3];
        if (sprintId) {
            const result = await fetchRequest('testing/' + sprintId + '/assignee/' + testId);
            assigneeEmail = result.email;
        }

        users = await fetchRequest('users/allUsernames');
    }

    async function changeAssignee() {
        const body = {
            userid: userId,
        };
        await fetchRequest('testing/' + sprintId + '/assignee/' + testId, 'PUT', body)
        await fetchData();
    }

    onMount(async () => {
        await fetchData();
    });
</script>

<div class="right-constant-bar">
    {#if sprintId}
        <div class="assignee-info">
            <p> Assignee: {assigneeEmail}</p>
            <select bind:value={userId} on:change={changeAssignee}
                    class="form-select form-select-sm bg-dark">
                <option value="-1">Unassigned</option>
                {#each users as {email, userid}}
                    <option value="{userid}">
                        {email}
                    </option>
                {/each}
            </select>
        </div>
    {/if}
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
        align-items: center;
        margin-bottom: 20px;
        text-align: center;

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

    .form-select-sm {
        /*width: 60%;*/
        cursor: pointer;
        border: none;
        background-color: #2e2e36 !important;
        color: #b3b3b3;
    }

    .form-select-sm:hover {
        background-color: #45454f !important;
        color: white;
    }

    .form-select-sm:focus {
        box-shadow: none;
    }
</style>