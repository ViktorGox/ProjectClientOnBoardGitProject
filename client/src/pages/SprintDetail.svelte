<script>
    import {onMount} from "svelte";
    import {tokenStore,} from "../stores/TokenStore.js";
    import router from "page";
    import userStore from "../stores/userStore.js";
    import SprintInfo from "../components/SprintInfo.svelte";

    import JafarButton from "../components/JafarButton.svelte";
    import { fetchRequest, generateQuery } from "../lib/Request.js";
    export let params;
    console.log(params);
    let sprintid = params.id;
    let email = $userStore ? $userStore.email : null;

    let sprint=[];
    let title;
    let startDate;
    let dueDate;


    async function getSprintById() {
        console.log(sprintid);

        // Use fetchRequest from Request.js
        const path = `sprint/${sprintid}`;
        const response = await fetchRequest(path, 'GET');
        sprint = response;
        console.log("Sprint:",sprint);
    }


    onMount(async () => {
        if (sprintid && sprintid !== 'new') {
            await getSprintById(sprintid);
            if (sprint.length > 0) {
                title = sprint[0].title;
                startDate = sprint[0].startdate;
                dueDate = sprint[0].duedate;
            }
        } else {
            // Handle the case when it's a new sprint
            sprint = [{
                sprintId: 0,
                title: "Sprint 1",
                startdate: "2021-01-01",
                duedate: "2021-01-15"
            }];
            title = sprint[0].title;
            startDate = sprint[0].startdate;
            dueDate = sprint[0].duedate;
        }
        console.log("Title:", title);
        console.log("StartDate:", startDate);
        console.log("DueDate:", dueDate);
    });
    async function editSprint(sprintid, sprintInfo) {
        const path = `sprint/${sprintid}`;

        // Use fetchRequest from Request.js
        const response = await fetchRequest(path, 'PUT', sprintInfo);
        console.log(response);
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

            if (sprintid && sprintid !== 'new') {
                editSprint(sprintid, sprintInfo);
            } else {
                addNewSprint(sprintInfo);
            }

            router(`/projects/${email}`);
        } else {
            alert("One or many inputs are not correctly inputted!");
        }
    }

    function isValidString(string) {
        return string !== undefined && string !== null && string !== "";
    }


    let logoImageLink ;

</script>

<main>
    {#if sprint && sprintid !== undefined}
        <section id="informationPreview">
            <img src={logoImageLink} alt={logoImageLink}>

            <label class="lighter-text">Title: {title}</label>

            <div>
                <label class="lighter-text">Start Date: {startDate} </label>
                <label class="lighter-text">Due Date: {dueDate}</label>
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

        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    }

    div {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
    }
    label.lighter-text {
        color: #b3b3b3;
        font-weight: lighter;
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
