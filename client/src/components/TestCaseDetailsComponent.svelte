<script>
    import {onMount} from "svelte";
    import {fetchRequest, generateQuery} from "../lib/Request.js";

    export let testId;
    let testCaseName;

    let testSteps = [];

    async function fetchTestSteps() {
        const queryProperties = ['testid'];
        const querySettings = ["Equals"];
        const response = await fetch('http://localhost:3000/test/' + testId+'/teststeps');
        testSteps = await response.json();
        testCaseName= await fetch('http://localhost:3000/test/' + testId+'/');
        testCaseName = await testCaseName.json();
        testCaseName= testCaseName[0].name;
        console.log(testCaseName)
    }

    onMount(async () => {
        const pathArray = window.location.pathname.split('/');
        testId = parseInt(pathArray[pathArray.indexOf('tests') + 1], 10);
        await fetchTestSteps();
        console.log(testSteps);
    });
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
                <th>Completion State</th>
            </tr>
            </thead>
            <tbody>
            {#each testSteps as step (step.stepnr)}
                <tr>
                    <td>{step.stepid}</td>
                    <td>{step.title}</td>
                    <td>{step.weight}</td>
                    <td>{step.completion ? 'Completed' : 'Incomplete'}</td>
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
</style>