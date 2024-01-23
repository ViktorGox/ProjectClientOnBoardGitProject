<script>
    import {onDestroy, onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";
    import CommentsSection from "./Comments.svelte";
    import userStore from "../stores/userStore.js";
    export let testId;
    export let selectedStep = null;
    let testCaseName;
    let showAddTeststepPopup = false;
    let testSteps = [];
    let newTeststep = {
        stepnr: "",
        title: "",
        weight: "",
        testlog: "",
        completion: ""
    };
    let attachments=[];
    let selectedAttachmentIndex = null;
    function handleImageClick(index) {
        selectedAttachmentIndex = index;
    }

    function handleCloseZoom() {
        selectedAttachmentIndex = null;
    }

    function handleNavigate(direction) {
        if (selectedAttachmentIndex !== null) {
            selectedAttachmentIndex += direction;
            if (selectedAttachmentIndex < 0 || selectedAttachmentIndex >= attachments.length) {
                selectedAttachmentIndex = null;
            }
        }
    }

    onDestroy(() => (selectedAttachmentIndex = null));

    function fetchAll() {
        fetchTestSteps();
    }

    async function fetchTestSteps() {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];

        await new Promise(resolve => setTimeout(resolve, 100));

        testSteps = await fetchRequest('test/' + testId + '/teststeps');
        testCaseName = await fetchRequest('test/' + testId + '/');
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
    });

    function handleStepClick(step) {
        selectedStep = selectedStep === step ? null : step;

        updateHighlight();
    }
    async function fetchAttachments() {
        if (selectedStep) {
            const response = await fetchRequest(`test/${testId}/teststeps/${selectedStep.stepid}/attachment`);

            attachments = await response;
            console.log(attachments);
        }
    }
    function handleStepCompletionChange(step, event) {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];
        console.log(step.completion)
        step.completion = event.target.value === "true";
        const body = {
            completion: (step.completion),
        };

        console.log(JSON.stringify(body));
        const response = fetchRequest('test/' + testId + '/teststeps/' + step.stepid, 'PUT', body)

    }

    async function updateHighlight() {
        document.querySelectorAll('tr').forEach(row => {
            row.style.backgroundColor = '';
        });

        if (selectedStep) {
            const selectedRow = document.getElementById(`step-${selectedStep.stepid}`);

            selectedRow.classList.add('highlighted');
            selectedRow.style.backgroundColor = 'rgba(76, 76, 87, 0.78)';
            await fetchAttachments();
        }
    }

    async function addTestStep() {
        console.log("testId ", testId)
        showAddTeststepPopup = false;
        const teststep = {
            testid: testId,
            stepnr: newTeststep.stepnr,
            title: newTeststep.title,
            weight: newTeststep.weight,
            testlog: newTeststep.testlog,
            completion: 'false'
        };
        await fetchRequest('test/' + testId + '/teststeps', 'POST', teststep);

        await fetchAll();

        newTeststep = {
            stepnr: "",
            title: "",
            weight: "",
            testlog: ""
        };

    }
</script>

<div class="test-case-details">
    <h1>{testCaseName}</h1>
    {#if $userStore.role === 'admin'}
        <button class="edit-button">Edit</button>
        <button class="add-test-step-button" on:click={() => showAddTeststepPopup = true}>Add Test Step</button>
    {/if}
        <div class="header">

</div>
<div class="test-steps">
    <table>
        <thead>
        <tr>
            <th>Step</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Test Log</th>
            <th>Completion State</th>
        </tr>
        </thead>
        <tbody>
        {#each testSteps as step (step.stepnr)}
            <tr id={`step-${step.stepid}`} on:click={() => handleStepClick(step)}>
                <td>{step.stepnr}</td>
                <td>{step.title}</td>
                <td>{step.weight}</td>
                <td>{step.testlog}</td>
                <td>
                    {step.completion}
                    <select bind:value={step.completion} on:change={(e) => handleStepCompletionChange(step, e)}
                            class="form-select form-select-sm bg-dark">
                        <option value="true">Completed</option>
                        <option value="false">Incomplete</option>
                    </select>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
    <div class="popup" style="{showAddTeststepPopup ? 'display: block;' : 'display: none;'}">

        <span class="close-button" on:click={() => showAddTeststepPopup = false}>&times;</span>

        <label for="name">Name:</label>
        <input type="name" bind:value={newTeststep.title}/>

        <label for="stepnr">Step number:</label>
        <input type="stepnr" bind:value={newTeststep.stepnr}/>

        <label for="weight">Weight:</label>
        <input type="weight" bind:value={newTeststep.weight}/>

        <label for="testlog">Testlog:</label>
        <input type="testlog" bind:value={newTeststep.testlog}/>

        <button class="add-teststep-button" on:click={addTestStep}>Add a new Test step</button>
    </div>
    <div class="attachments-container">
        {#each attachments as attachment}
            <div class="attachment" on:click={() => handleImageClick(attachment.attachmentid)}>
                <img src={"http://localhost:3000/test/"+testId+"/teststeps/"+selectedStep.stepid+"/attachment/"+attachment.attachmentid} alt="Attachment" />
            </div>
        {/each}

        {#if selectedAttachmentIndex !== null}
            <div class="zoom-overlay" on:click={handleCloseZoom}>
                <div class="zoom-content">
                    <img src={"http://localhost:3000/test/"+testId+"/teststeps/"+selectedStep.stepid+"/attachment/"+selectedAttachmentIndex} alt="Zoomed Attachment" />
                </div>
            </div>
        {/if}
    </div>
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
    .form-select-sm {
        /*width: 60%;*/
        cursor: pointer;
        border: none;
        background-color: #2e2e36 !important;
        color: #b3b3b3;
    }

    .form-select-sm:hover {
        background-color: #45454f !important;
        color: white;
    }

    .form-select-sm:focus {
        box-shadow: none;
    }

    .popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #2e2e36;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 999;
        color: white;
    }

    .popup label {
        margin-top: 10px;
        display: block;
        font-weight: bold;
    }

    .popup input {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        box-sizing: border-box;
    }

    .popup button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin-top: 10px;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #fff;
    }
    .edit-button,
    .add-test-step-button,
    .add-teststep-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 15px;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
    }

    .edit-button:hover,
    .add-test-step-button:hover,
    .add-teststep-button {
        background-color: #0056b3;
    }
    .attachments-container {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }

    .attachment {
        margin-right: 10px;
        cursor: pointer;
        display: inline-block;

    }

    .zoom-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
    }

    .zoom-content {
        margin: auto;
        max-width: 80%;
        max-height: 80%;
    }

    .zoom-content img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }


</style>