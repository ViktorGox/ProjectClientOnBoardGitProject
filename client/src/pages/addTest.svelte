<script>
    import {onMount} from 'svelte';
    import {fetchRequest} from "../lib/Request.js";

    let testName = '';
    let selectedUserId = null;
    let description = '';
    let selectedSprints = []; // Array to store selected sprints
    let selectedModules = []; // Array to store selected modules
    let sprints = [];
    let modules = [];
    let successMessage = ''; // Added success message state

    onMount(async () => {
        try {
            sprints = await fetchRequest('sprint');
            modules = await fetchRequest('module');
            console.log(modules);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    async function addTest() {
        event.preventDefault()

        await POSTtest();
        await Promise.all(selectedSprints.map(async sprintid => await POSTtesting(sprintid)));
        await Promise.all(selectedModules.map(async moduleId => await POSTmodule(moduleId)));

        // Clear form and show success message after 2 seconds
        resetForm();
        successMessage = 'Test added successfully!';
        setTimeout(() => {
            successMessage = '';
        }, 2000);
    }

    async function POSTtest() {
        let testData;

        testData = {
            name: testName,
            description: description
        };
        console.log(testData);

        await fetchRequest('test', 'POST', testData);
    }

    async function POSTtesting(sprintid) {
        let testingData;
        let latestid = await getLatestID();

        if (selectedSprints.length === 0) {
            return;
        }

        if (selectedUserId === null) {
            testingData = {
                sprintid: sprintid,
                testid: latestid,
            };
        } else {
            testingData = {
                sprintid: sprintid,
                testid: latestid,
                userId: selectedUserId
            };
        }

        console.log('Testing Data:', testingData);

        await fetchRequest('testing', 'POST', testingData);
    }

    async function POSTmodule(moduleId) {
        if (!moduleId) {
            console.log('No module selected.');
            return;
        }
        let testid = await getLatestID();

        let moduleData = {
            testid: testid,
            moduleid: moduleId
        };

        await fetchRequest('testmodule', 'POST', moduleData);
    }

    async function getLatestID() {
        try {
            const response = await fetchRequest('test');
            if (response.length > 0) {
                const sortedTests = response.sort((a, b) => b.testid - a.testid);
                return sortedTests[0].testid;
            } else {
                console.error('Failed to fetch tests or no tests available.');
            }
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    }

    function resetForm() {
        testName = '';
        selectedUserId = null;
        description = '';
        selectedSprints = [];
        selectedModules = [];
    }
</script>

<main>
    <div class="container">
        <form>
            <div class="form-half">
                <h1>Add Test</h1>
                <label for="name">Test Name:</label>
                <input bind:value={testName} type="text" id="name" required>

                <label for="sprintSelect">Select Sprints:</label>
                <div class="checkbox-group">
                    {#each sprints as sprint (sprint.sprintid)}
                        {#if sprint.sprintid !== undefined}
                            <label class="checkbox-label">
                                <input type="checkbox" bind:group={selectedSprints} value={sprint.sprintid}>
                                {sprint.title} (ID: {sprint.sprintid})
                            </label>
                        {/if}
                    {/each}
                </div>


                <label for="description">Description:</label>
                <textarea bind:value={description} id="description" required></textarea>

                <button on:click={addTest}>Add Test</button>
            </div>

            <div class="module-half">
                <label for="moduleSelect">Select Modules:</label>
                <div class="checkbox-group">
                    {#each modules as module (module.moduleid)}
                        <label class="checkbox-label">
                            <input type="checkbox" bind:group={selectedModules} value={module.moduleid}>
                            {module.label} (ID: {module.moduleid})
                        </label>
                    {/each}>
                </div>
            </div>
        </form>

        {#if successMessage}
            <div class="success-message">{successMessage}</div>
        {/if}
    </div>
</main>

<style>
    main {
        background-color: #19191d;
        text-align: center;
        margin: 0 auto;
        padding: 20px;
    }

    .container {
        max-width: 60rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        background-color: #333;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 1rem;
        overflow: hidden;
    }

    form {
        display: flex;
        width: 100%;
    }

    .form-half {
        flex: 1;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: #fff;
    }

    .module-half {
        flex: 1;
        padding: 1rem;
        background-color: #333;
        color: #fff;

    }

    label {
        font-size: 1rem;
    }

    input,
    select,
    textarea {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
    }

    textarea {
        resize: vertical;
    }

    button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #45a049;
    }

    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        font-size: 1rem;
        color: #fff;
    }

    .success-message {
        background-color: #4CAF50;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-top: 1rem;
        font-size: 1rem;
    }
</style>
