<script>
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";

    export let testId;
    let selectedStep = null;
    let testCaseName;
    let testSteps = [];

    async function fetchTestSteps() {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];

        testSteps = await fetchRequest('test/' + testId + '/teststeps');
        testCaseName = await fetchRequest('test/' + 2 + '/');
        testCaseName = testCaseName[0].name;
    }

    onMount(async () => {
        const pathArray = window.location.pathname.split('/');
        testId = parseInt(pathArray[pathArray.indexOf('tests') + 1], 10);
        await fetchTestSteps();
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
</script>

<div class="test-case-details">
    <h1>{testCaseName}</h1>
    <button class="edit-button">Edit</button>
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