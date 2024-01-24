<script>
    console.log("kshfksdhfkjshdfkjs")
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";

    let testId;
    let testCaseName;
    let testSteps = [];

    async function fetchTestSteps() {
        const response = await fetch(`http://localhost:3000/test/${testId}/teststeps`);
        testSteps = await response.json();

        const testCaseResponse = await fetch(`http://localhost:3000/test/${testId}`);
        const testCaseData = await testCaseResponse.json();
        testCaseName = testCaseData[0].name;
    }

    onMount(async () => {
        // Retrieve testId from the current route
        const pathArray = window.location.pathname.split('/');
        testId = parseInt(pathArray[pathArray.indexOf('tests') + 1], 10);
        await fetchTestSteps();
    });

    function goBackToDetails() {
        router(`/tests/${testId}`);
    }

    function updateDetails(stepid) {
        const updatedStep = testSteps.find(step => step.stepid === stepid);

        if (updatedStep.weight < 0) {
            alert(`Weight can not be lower than 0.`);
        }

        if (updatedStep.stepnr <= 0) {
            alert(`Step number must be a positive number.`);
        }

        const body = {
            title: updatedStep.title,
            stepnr: updatedStep.stepnr,
            weight: updatedStep.weight,
            testlog: updatedStep.testlog,
        };

        fetchRequest(`test/${testId}/teststeps/${stepid}?combinatory=true`, "PUT", body);
    }

    function removeDetail(stepid) {
        fetchRequest(`test/${testId}/teststeps/${stepid}?combinatory=true`, "DELETE");
    }

</script>

<div class="test-case-details" style="margin-top: 100px">
    <h1>{testCaseName}</h1>
    <button class="edit-button" on:click={goBackToDetails}>Back to Details</button>
    <div class="test-steps">
        <table>
            <thead>
            <tr>
                <th>Step Nr</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Test Log</th>
                <th>Completion State</th>
            </tr>
            </thead>
            <tbody>
            {#each testSteps as step}
                <tr>
                    <td>
                        <input type="number" bind:value={step.stepnr}>
                    </td>
                    <td>
                        <textarea bind:value={step.title}></textarea>
                    </td>
                    <td>
                        <input type="number" bind:value={step.weight}>
                    </td>
                    <td>
                        <textarea bind:value={step.testlog}></textarea>
                    </td>
                    <td>
                        {step.completion}
                    </td>
                    <td>
                        <button class="edit-button" on:click={updateDetails(step.stepid)}>Confirm</button>
                        <button class="edit-button" on:click={removeDetail(step.stepid)}>Remove</button>
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

    .test-steps table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
    }

    .test-steps th, .test-steps td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    .test-steps td {
        color: white;
    }

    .edit-button {
        margin-bottom: 15px;
    }

    textarea {
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
    }
</style>