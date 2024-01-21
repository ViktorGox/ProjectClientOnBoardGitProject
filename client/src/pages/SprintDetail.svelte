<script>
    import {onMount} from "svelte";
    import {tokenStore,} from "../stores/TokenStore.js";
    import router from "page";
    import userStore from "../stores/userStore.js";
    import SprintInfo from "../components/SprintInfo.svelte";

    import JafarButton from "../components/JafarButton.svelte";
    import {fetchRequest} from "../lib/Request.js";

    export let params;
    console.log(params);
    let sprintid = params.id;
    let email = $userStore ? $userStore.email : null;

    let sprint = [];
    let title;
    let startDate;
    let dueDate;


    async function getSprintById() {
        console.log(sprintid);

        // Use fetchRequest from Request.js
        const path = `sprint/${sprintid}`;
        const response = await fetchRequest(path, 'GET');
        sprint = response;
        console.log("Sprint:", sprint);
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

    function formatDate(date) {
        let start = new Date(date);
        return start.getDate() + '-' + (start.getMonth() + 1)  + '-' + start.getFullYear();
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

            router(`/projects`);
        } else {
            alert("One or many inputs are not correctly inputted!");
        }
    }

    function isValidString(string) {
        return string !== undefined && string !== null && string !== "";
    }


    let logoImageLink;

</script>

<main>
    {#if sprint && sprintid !== undefined}
        <section id="informationPreview" class="content-section">
<!--            <div class="image-container">-->
<!--                <img src={logoImageLink} alt={logoImageLink}>-->
<!--            </div>-->

            <div class="info-container">
                <div class="date-container">
                    <label class="lighter-text">Title: {title}</label>
                    <label class="lighter-text">Start Date: {formatDate(startDate)} </label>
                    <label class="lighter-text">Due Date: {formatDate(dueDate)}</label>
                </div>
            </div>

        </section>

        <section class="content-section">
            <SprintInfo bind:title={title} bind:strartdate={startDate} bind:dueddate={dueDate}/>
            <button class="add-sprint-button" on:click={submitNewInfo}>Add Sprint</button>
<!--            <JafarButton text="Submit" clickHandler={submitNewInfo} />-->
        </section>
    {:else }
        <p class="no-sprint-message" >No sprint found!</p>
    {/if}
</main>

<style>
    body {
        background-color: #f0f0f0; /* Change to a lighter background color */
        margin: 0;
        font-family: 'Arial', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .info-container {
        text-align: center;
        background-color: #333;
        border-radius: 10px;
        padding: 15px;
        color: white;
        margin-bottom: 15px;
    }

    section {
        width: 100%;
        max-width: 600px; /* Adjust the max-width as needed */
        margin-bottom: 20px;
    }

    .date-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 16px;
        font-weight: bold;
    }

    h2 {
        margin-bottom: 10px;
        font-size: 1.5rem;
    }

    p {
        margin: 0;
        font-size: 1rem;
    }

    .add-sprint-button {
        background-color: #4CAF50;
        padding: 10px;
        margin: 5px;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
    }

    .no-sprint-message {
        color: #333; /* Adjust color for better contrast */
    }

    /* Calendar Section Styles */
    .calendar-section {
        width: 100%;
        max-width: 800px; /* Adjust the max-width as needed */
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .bigger-font {
        font-size: 30px; /* Ajusta el tamaño según tus preferencias */
    }
</style>