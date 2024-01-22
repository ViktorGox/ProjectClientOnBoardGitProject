<script>
    import {onMount} from "svelte";
    import {fetchRequest, generateQuery} from "../lib/Request.js";
    import CommentsSection from "./Comments.svelte";

    export let testId;
    export let selectedStep = null;
    let testCaseName;
    let showAddTeststepPopup = false;
    let testSteps = [];
    let newTeststep = {
        title: "",
        weight: "",
        testlog: "",
        completion: ""
    };

    function fetchAll() {
        fetchTestSteps();
    }

    export async function fetchTestSteps() {
        const queryProperties = ['testid'];
        const querySettings = ["Equals"];
        testCaseName = await fetch('http://localhost:3000/test/' + testId + '/');
        testCaseName = await testCaseName.json();
        testCaseName = testCaseName[0].name;

        await new Promise(resolve => setTimeout(resolve, 100));


        const response = await fetch('http://localhost:3000/test/' + testId + '/teststeps');
        testSteps = await response.json();
        console.log(testSteps);
        console.log(testCaseName)
    }

    onMount(async () => {
        const pathArray = window.location.pathname.split('/');
        testId = parseInt(pathArray[pathArray.indexOf('tests') + 1], 10);
        await fetchTestSteps();
        console.log(testSteps);
    });

    function handleStepClick(step) {
        // Toggle the selected state for the clicked step
        selectedStep = selectedStep === step ? null : step;

        // Manually update the style for highlighting
        updateHighlight();
    }

    function handleStepCompletionChange(step, event) {
        console.log(step.completion)
        // Update the completion state of the clicked step based on the selected option
        step.completion = event.target.value === "true";
        const body = {
            completion: (step.completion),
        };
        console.log(JSON.stringify(body));
        const response = fetchRequest('test/' + testId + '/teststeps/' + step.stepid, 'PUT', body)

    }

    function updateHighlight() {
        // Remove highlight from all rows
        document.querySelectorAll('tr').forEach(row => {
            row.style.backgroundColor = '';
        });

        // Apply highlight to the selected row
        if (selectedStep) {
            const selectedRow = document.getElementById(`step-${selectedStep.stepid}`);

            console.log(window.getComputedStyle(selectedRow).getPropertyValue('background-color'));
            selectedRow.classList.add('highlighted');
            selectedRow.style.backgroundColor = 'rgba(76, 76, 87, 0.78)';
            console.log(window.getComputedStyle(selectedRow).getPropertyValue('background-color'));
            console.log(selectedRow);
        }
    }

    async function addUser() {
        showAddTeststepPopup = false;
        const teststep = {
            testid: testId,
            title: newTeststep.title,
            weight: newTeststep.weight,
            testlog: newTeststep.testlog,
            completion: newTeststep.completion
        };
        await fetchRequest('test/' + testId+'/teststeps', 'POST', teststep);

        await fetchAll();

    }
</script>

<div class="test-case-details">
    <h1>{testCaseName}</h1>
    <button class="edit-button">Edit</button>
    <button class="add-test-step-button" on:click={() => showAddTeststepPopup = true}>Add User</button>
    <div class="header">

    </div>
    <div class="test-steps">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Test Log</th>
                <th>Completion State</th>
            </tr>
            </thead>
            <tbody>
            {#each testSteps as step (step.stepnr)}
                <tr id={`step-${step.stepid}`} on:click={() => handleStepClick(step)}>
                    <td>{step.stepid}</td>
                    <td>{step.title}</td>
                    <td>{step.weight}</td>
                    <td>{step.testlog}</td>
                    <td>
                        {step.completion}
                        <select bind:value={step.completion} on:change={(e) => handleStepCompletionChange(step, e)}>
                            <option value="true">Completed</option>
                            <option value="false">Incomplete</option>
                        </select>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
    {#if showAddTeststepPopup}
        <div class="popup">

            <label for="name">Name:</label>
            <input type="name" bind:value={newTeststep.title}/>

            <label for="weight">Weight:</label>
            <input type="weight" bind:value={newTeststep.weight}/>

            <label for="testlog">Testlog:</label>
            <input type="testlog" bind:value={newTeststep.testlog}/>

            <label for="completion">Completion:</label>
            <input type="completion" bind:value={newTeststep.completion}/>


            <button class="add-user-button" on:click={addUser}>Add a new Test step</button>
        </div>
    {/if}
    <CommentsSection {testId} {selectedStep} {fetchAll}/>
</div>

<style>
    .test-case-details {
        border: 2px solid #ccc;
        padding: 20px;
        margin: 10px;
        border-radius: 10px;
    }

    .highlighted {
        background-color: rgba(76, 76, 87, 0.78)
    }

    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
    }

    th, td {

        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    td {
        color: white;

    }

    th {
    }

    tr {
        cursor: pointer;
    }
</style>