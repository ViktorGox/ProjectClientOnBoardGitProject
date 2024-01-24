<script>
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
        testSteps.forEach(function (step, index) {
            if (step.completion) {
                testSteps[index].completion = "true";
            } else {
                testSteps[index].completion = "false";
            }
        });

        sortSteps();
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

        let completionBool = updatedStep.completion === "true";

        const body = {
            title: updatedStep.title,
            stepnr: updatedStep.stepnr,
            weight: updatedStep.weight,
            testlog: updatedStep.testlog,
            completion: completionBool
        };

        console.log(body);

        fetchRequest(`test/${testId}/teststeps/${stepid}?combinatory=true`, "PUT", body);
    }

    async function removeDetail(stepid) {
        await fetchRequest(`test/${testId}/teststeps/${stepid}?combinatory=true`, "DELETE");
        await fetchTestSteps();
    }

    let isFlippedID = true;

    function reverseStepArray() {
        isFlippedID = !isFlippedID;
        sortSteps();
    }

    function sortSteps() {
        if (isFlippedID) {
            testSteps = testSteps.sort((a, b) => a.stepnr - b.stepnr);
        } else {
            testSteps = testSteps.sort((a, b) => b.stepnr - a.stepnr);
        }
    }
</script>

<div class="test-case-details" style="margin-top: 100px">
    <h1>{testCaseName}</h1>
    <button class="btn btn-primary mt-3 mb-4" on:click={goBackToDetails}>Back to Details</button>
    <div class="test-steps">
        <table class="table custom-table">
            <thead>
            <tr>
                <th scope="col" class="order-header" on:click={reverseStepArray}>
                    ID
                    <img class:rotated={isFlippedID} class="small-img" src="/src/assets/arrow-down-white.png"
                         alt="order button image">
                </th>
                <th>Name</th>
                <th>Weight</th>
                <th>Test Log</th>
                <th>Completion State</th>
                <th></th>

            </tr>
            </thead>
            <tbody>
            {#if testSteps.length > 0}
                {#each testSteps as step}
                    <tr>
                        <td><input class="form-control list-search" type="number" bind:value={step.stepnr}></td>
                        <td>
                             <textarea class="form-control dark-text" bind:value={step.title}
                                       placeholder="Title" autocomplete="off" name="title"
                                       rows="3"></textarea>
                        </td>
                        <td><input class="form-control list-search" type="number" bind:value={step.weight}></td>
                        <td>
                             <textarea class="form-control dark-text" bind:value={step.testlog}
                                       placeholder="Title" autocomplete="off" name="title"
                                       rows="3"></textarea>
                        </td>
                        <td>
                            <select bind:value={step.completion}
                                    class="form-select form-select-md bg-dark">
                                <option value="true">Completed</option>
                                <option value="false">Incomplete</option>
                            </select>
                        </td>
                        <td>
                            <button class="btn btn-success" on:click={updateDetails(step.stepid)}>Confirm</button>
                            <button class="btn btn-danger" on:click={removeDetail(step.stepid)}>Remove
                                <i class="bi bi-trash-fill"></i></button>
                        </td>
                    </tr>
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                {/each}

            {:else}
                <tr>
                    <td colspan="5">
                        There are no steps yet.
                    </td>
                </tr>
            {/if}
            </tbody>
        </table>
    </div>
</div>

<style>
    * {
        color: white;
    }

    .custom-table thead tr, .custom-table thead th {
        position: sticky;
        top: 0;
        border-top: none;
        border-bottom: none !important;
        color: #fff;
        background-color: #19191d;
    }

    .custom-table tbody th, .custom-table tbody td {
        color: #777;
        padding-bottom: 20px;
        padding-top: 20px;
        font-weight: 300;
    }

    .custom-table tbody th small, .custom-table tbody td small {
        color: #b3b3b3;
        font-weight: 300;
    }

    .custom-table tbody tr:not(.spacer) {
        border-radius: 7px;
        overflow: hidden;
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    .custom-table tbody tr:not(.spacer):hover {
        -webkit-box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
    }

    .custom-table tbody tr th, .custom-table tbody tr td {
        background: #25252b;
        border: none;
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    .custom-table tbody tr th a, .custom-table tbody tr td a {
        color: #b3b3b3;
    }

    .custom-table tbody tr th:first-child, .custom-table tbody tr td:first-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .custom-table tbody tr th:last-child, .custom-table tbody tr td:last-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .custom-table tbody tr.spacer td {
        padding: 0 !important;
        height: 3px;
        border-radius: 0 !important;
        background: transparent !important;
    }

    .custom-table tbody tr.active th, .custom-table tbody tr.active td, .custom-table tbody tr:hover th,
    .custom-table tbody tr:hover td {
        color: #fff;
        background: #2e2e36;
    }

    .custom-table tbody tr.active th a, .custom-table tbody tr.active td a, .custom-table tbody tr:hover th a,
    .custom-table tbody tr:hover td a {
        color: #fff;
    }

    a {
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    a, a:hover {
        text-decoration: none !important;
    }

    input[type='checkbox'] {
        height: 1rem;
        width: 1rem;
        cursor: pointer;
    }

    img {
        width: 20px;
        height: 20px;
        margin: 0 10px 0 10px;
    }

    .small-img {
        width: 15px;
        height: 15px;
        margin: 0;
        transition: transform 0.3s ease;
    }

    .order-header, .test-page {
        cursor: pointer;
    }

    .rotated {
        transform: rotate(180deg);
    }

    .form-select-md {
        /*width: 60%;*/
        cursor: pointer;
        border: none;
        background-color: #1d1d21 !important;
        color: #b3b3b3;
    }

    .form-select-md:hover {
        background-color: #45454f !important;
        color: white;
    }

    .form-select-md:focus {
        box-shadow: none;
    }

    .list-search {
        background-color: #2e2e36;
        color: #fff;
        border-radius: 4px;
        border: none;
    }

    .custom-table tbody tr.active th .list-search, .custom-table tbody tr.active td .list-search, .custom-table tbody tr:hover th .list-search,
    .custom-table tbody tr:hover td .list-search {
        background: #393942;
    }

    .custom-table tbody tr.active th .list-search:hover, .custom-table tbody tr.active td .list-search:hover, .custom-table tbody tr:hover th .list-search:hover,
    .custom-table tbody tr:hover td .list-search:hover {
        background: #45454f;
    }

    .dark-text {
        background-color: #2e2e36;
        color: #fff;
        border-radius: 4px;
        border: none;
    }

    .custom-table tbody tr.active th .dark-text, .custom-table tbody tr.active td .dark-text, .custom-table tbody tr:hover th .dark-text,
    .custom-table tbody tr:hover td .dark-text {
        background: #393942;
    }

    .custom-table tbody tr.active th .dark-text:hover, .custom-table tbody tr.active td .dark-text:hover, .custom-table tbody tr:hover th .dark-text:hover,
    .custom-table tbody tr:hover td .dark-text:hover {
        background: #45454f;
    }

    button {
        margin-left: 0.5rem;
    }
</style>