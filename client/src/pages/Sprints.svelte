<script>
    import {onMount} from "svelte";
    import {tokenStore} from "../stores/TokenStore.js";
    import userStore from "../stores/userStore.js";
    import router from "page";
    import JafarButton from "../components/JafarButton.svelte";

    export let params;
    let sprintid = params ? params.sprintid : null;

    let email = $userStore ? $userStore.email : null;
    let role = $userStore ? $userStore.roles : null;
    let sprints = [];

    async function getSprints() {
        const response = await fetch(`http://localhost:3000/sprint`);
        sprints = await response.json();
        console.log(sprints);
    }


    onMount(async () => {
        await getSprints();
    });

    function editSprintWithId(sprintid) {
        router(`/SprintDetail/${sprintid}`);
    }

    async function deleteSprintWithId(sprintid) {
        const response = await fetch(`http://localhost:3000/sprint/${sprintid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}` // Replace 'token' with the actual token
            }
        });
        const result = await response.json();
        console.log(result);
        await getSprints();
    }

    async function addNewSprint() {
        router("/SprintDetail/new");
    }


    function navigateToProject(sprintid) {
        router(`/projects/${sprintid}`);
    }
</script>

{#if sprints.length > 0}
    <main>
        <ul>

            {#each sprints as sprint}
                <li>
                    <p> Name: {sprint.title} <br>

                        Start Date: {sprint.startdate} <br>
                        Due Date: {sprint.duedate} <br>
                    </p>
                    <JafarButton text="Edit" clickHandler={() => {editSprintWithId(sprint.sprintid)}}/>
                    <JafarButton text="Delete" clickHandler={async () => {await deleteSprintWithId(sprint.sprintid)}}/>
                    <JafarButton text="View Details" clickHandler={() => navigateToProject(sprint.sprintid)}/>
                </li>

            {/each}
        </ul>

        <JafarButton text="Add Sprint" clickHandler={addNewSprint}/>

    </main>
{/if}

<style>

    main {
        display: flex;
        justify-content: space-evenly;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        max-height: 70vh;
    }

    li {
        display: flex;
        gap: 1rem;
    }

    img {
        border: 1px solid gray;
        padding: 0.4rem;

        width: 20%;
    }

    p {
        width: 62%;
        overflow: auto;
        max-height: 20vh;
        text-align: left;
    }

</style>
