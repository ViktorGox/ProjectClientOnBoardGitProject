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
        background-color: #666;
        margin: 0;
        font-family: 'Arial', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    main {
        display: flex;
        justify-content: space-evenly;
        padding: 20px;
        font-family: 'Arial', sans-serif;
        align-items: center;
    }
    .info-container {
        text-align: center;
    }
    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 45%;
    }
    .date-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-family: 'Arial', sans-serif;
        font-size: large;
        font-weight: bold;
    }
    .no-sprint-message {
        color: #fff;
    }

    textarea {
        flex: 1;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #313131;
        padding: 10px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        font-family: "Baskerville Old Face";
        resize: none;
    }
    .info-container {
        background-color: #333;
        border-radius: 10px;
        padding: 15px;
        color: white;
        text-align: center;
        margin-bottom: 85px;
    }


    .date-container {
        display: flex;
        justify-content: space-between;
    }
    .add-sprint-button {
        background-color: #4CAF50;
        padding: 10px;
        margin: 5px;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        font-size: large;
    }
    .content-section{
       margin-top: 150px;
    }


</style>
