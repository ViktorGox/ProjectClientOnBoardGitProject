<script>
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";

    export let assigneeName;
    export let assigneeProfilePicture;
    export let dueDate;
    export let testId;
    let users=[];
    let username;
    let test={};
    async function fetchData() {
        test = await fetchRequest('test/' + testId + '/');
        test=test[0];
        console.log(test);
        users = await fetchRequest('users/allUsernames');

        console.log(users);
        assigneeName=users.find(user => user.userid === test.userid).email;

        // assigneeName=username.email;
    }
    function changeAssignee() {
        // Handle the change in test status here
        console.log("Selected status:", test.userid);
        const body ={
            userid: (test.userid),
        };
        console.log(JSON.stringify(body));
        assigneeName=users.find(user => user.userid === test.userid).email;
        const response = fetchRequest('test/'+testId,'PUT', body)
    }
    onMount(async () => {
        await fetchData();
    });
</script>

<div class="right-constant-bar">
    <div class="assignee-info">
<!--        <img src={assigneeProfilePicture} alt="Assignee Profile Picture"/>-->
        <p> Assignee: {assigneeName}</p>
        <select bind:value={test.userid} on:change={changeAssignee}
                class="form-select form-select-sm bg-dark">
            {#each users as {email,userid}}
                <option value="{userid}">
                    {email}
                </option>
            {/each}
        </select>
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