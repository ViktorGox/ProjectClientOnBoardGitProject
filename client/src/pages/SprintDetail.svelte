<script>
    import {onMount} from "svelte";
    import {tokenStore,} from "../stores/TokenStore.js";
    import router from "page";
    import userStore from "../stores/userStore.js";
    import SprintInfo from "../components/SprintInfo.svelte";
    import Button from "../components/Button.svelte";
    import JafarButton from "../components/JafarButton.svelte";

    export let params;
    let sprintid = params ? params.sprintid : null;
    let email = $userStore ? $userStore.email : null;

    let sprint;
    let title;
    let startDate;
    let dueDate;


    async function getSprintById() {
        const response = await fetch(`http://localhost:3000/sprint/${sprintid}`);
        sprint = await response.json();
        console.log(sprint);
    }

    onMount(async () => {
        if (sprintid) {
            await getSprintById(sprintid);

        } else {
            sprint = {
                sprintId: 0,
                title: "Sprint 1",
                startDate: "2021-01-01",
                dueDate: "2021-01-15"
            };
        }
        title = sprint.title;
        console.log(title);
        startDate = sprint.startDate;
        console.log(startDate);
        dueDate = sprint.dueDate;
        console.log(dueDate);
    });

    async function editSprint(sprintid, sprintInfo) {
        const response = await fetch(`http://localhost:3000/sprint/${sprintid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}`
            },
            body: JSON.stringify(sprintInfo)
        });
        const result = await response.json();
        console.log(result);
    }

    async function addNewSprint(sprintInfo) {
        const response = await fetch(`http://localhost:3000/sprint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}`
            },
            body: JSON.stringify(sprintInfo)
        });
        const result = await response.json();
        console.log(result);
    }

    function checkInputs() {
        let stringInputs = [title, startDate, dueDate];

        let index = 0;

        for (const input of stringInputs) {
            if (!isValidString(input)) {
                console.log(stringInputs[index]);
                console.log(`Index: ${index}`)
                index++;
                return false;
            }
        }
        return true;
    }

    function submitNewInfo() {
        if (checkInputs()) {

            let sprintInfo = {
                title: title,
                startDate: startDate,
                dueDate: dueDate
            }
            if (sprintid)
                editSprint(sprintid, sprintInfo);
            else
                addNewSprint(sprintInfo);

            router(`/sprint/${email}`);
        } else {
            alert("One or many inputs is not correctly inputted!");
        }
    }

    function isValidString(string) {
        return string !== undefined && string !== null && string !== "";
    }


    let logoImageLink ;

</script>

<main>
    {#if sprint}
        <section id="informationPreview">
            <img src={logoImageLink} alt={logoImageLink}>

            <label>Title: {title}</label>

            <div>
                <label>Start Date: {startDate} </label>
                <label>Due Date: {dueDate}</label>
            </div>

        </section>

        <section>
            <SprintInfo bind:title={title} bind:strartdate={startDate} bind:dueddate={dueDate}/>

            <JafarButton text="Submit" clickHandler={submitNewInfo}/>
        </section>
    {:else }
        <p>No sprint found for skin detail page!</p>
    {/if}
</main>

<style>

    main {
        display: flex;
        justify-content: space-evenly;
    }

    section {
        display: flex;
        flex-direction: column;

        gap: 0.5rem;

        width: 39%;
    }

    img {
        width: 100%;
        border-radius: 10px;

        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* Adjust the shadow properties */
    }

    div {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
    }

    textarea {
        flex: 1;
        width: 96%;

        border: 1px solid #ccc;
        border-radius: 10px;

        background-color: #313131;
        padding: 10px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        font-family: "Baskerville Old Face";
    }

</style>
