<script>
    import {onMount} from "svelte";
    import {tokenStore} from "../stores/TokenStore.js";
    import userStore from "../stores/userStore.js";
    import router from "page";
    import JafarButton from "../components/JafarButton.svelte";
    import {fetchRequest, generateQuery} from "../lib/Request.js";
    import {arrayToString} from "../lib/Utils.js";

    export let params;
    let sprintid = params ? params.sprintid : null;

    let email = $userStore ? $userStore.email : null;
    let role = $userStore ? $userStore.roles : null;
    let sprints = [];
    let fullTests = [];
    let statuses;
    let modules;
    let showStatusMenu = false;
    let reverseTests = false;
    let searchBarValue;
    let statusOptions = [];
    let moduleOptions = [];
    let selectedSprintId=null;
    async function getSprints() {
        const response = await fetch(`http://localhost:3000/sprint`);
        sprints = await response.json();
        console.log(sprints);
    }

    function fullFetch() {
        Promise.all([fetchStatuses(), fetchTests(), fetchModules()])
            .then(([fetchedStatuses, fetchedTests, fetchedModules]) => {
                statuses = fetchedStatuses;
                modules = fetchedModules;

                const modulePromises = fetchedTests.map(element =>
                    fetchRequest('testmodule/test/' + element.testid)
                        .then(result => {
                            element.modules = result.map(item => item.moduleid);
                            return element;
                        })
                );
                return Promise.all(modulePromises);
            })
            .then(updatedTests => {
                if (reverseTests) {
                    updatedTests.reverse();
                }
                fullTests = updatedTests;
                console.log(fullTests);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    async function fetchTests() {
        let moduleIdsArray = [];
        if (moduleOptions.length !== 0) {
            moduleIdsArray = await fetchTestIds();
        }

        const queryProperties = ["statusid", 'testid', 'name'];
        const queryParams = [arrayToString(statusOptions), arrayToString(moduleIdsArray), searchBarValue];

        const querySettings = ["Equals", "Equals", "Includes"];
        let query = generateQuery('test', queryProperties, queryParams, querySettings);
        return await fetchRequest(query);
    }

    async function fetchTestIds() {
        let testIdQuery;
        testIdQuery = generateQuery('testmodule', ['moduleid'], [arrayToString(moduleOptions)], ['Equals']);
        const result = await fetchRequest(testIdQuery);
        return result.map(item => item.testid);
    }

    function fetchStatuses() {
        return fetchRequest('status').then((result) => {
            return new Map(result.map(status => [status.name, status.statusid]));
        }).catch((e) => {
            throw e;
        })
    }

    function fetchModules() {
        return fetchRequest('module').then((result) => {
            return new Map(result.map(module => [module.moduleid, module.label]));
        }).catch((e) => {
            throw e;
        })
    }

    onMount(async () => {
        await getSprints();
    });

    function editSprintWithId(sprintid) {
        selectedSprintId = sprintid;
        router(`/SprintDetail/${sprintid}`);
    }

    async function deleteSprintWithId(sprintid) {
        const response = await fetch(`http://localhost:3000/sprint/${sprintid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}` // Replace 'token' with the actual token
            }
        });
        const result = await response.json();
        console.log(result);
        await getSprints();
    }

    async function addNewSprint() {
        router("/SprintDetail/new");
    }


    function navigateToProject(sprintid) {
        router(`/projects/${sprintid}`);
    }

    async function generateReport(sprintid) {
        // Call fullFetch for the selected sprint
        await fullFetch(sprintid);

        // Check if data is present
        if (fullTests.length > 0) {
            // Generate CSV and trigger download
            generateCSV(fullTests, sprintid);
        } else {
            console.warn("No data available for CSV generation.");
        }
    }

    function generateCSV(data, sprintid) {
        // Add a header row with titles
        const headerRow = Object.keys(data[0]).map(title => escapeCSVValue(title)).join(",");

        const csvContent = "data:text/csv;charset=utf-8," + headerRow + "\n" + data.map(row => rowToCSV(row)).join("\n");
        const encodedUri = encodeURI(csvContent);

        // Use sprintid in the filename
        const filename = `report_${sprintid}.csv`;

        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
    }

    function rowToCSV(row) {
        const values = Object.values(row);
        const csvRow = values.map(value => escapeCSVValue(value)).join(",");
        return csvRow;
    }

    function escapeCSVValue(value) {
        if (typeof value === 'string') {
            // If the value contains a comma, double-quote, or newline, wrap it in double-quotes
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                return `"${value.replace(/"/g, '""')}"`;
            } else {
                return value;
            }
        } else {
            return value;
        }
    }


</script>

{#if sprints.length > 0}
    <main>
        <ul>

            {#each sprints as sprint}
                <li>
                    <p> Name: {sprint.title} <br>

                        Start Date: {sprint.startdate} <br>
                        Due Date: {sprint.duedate} <br>
                    </p>
                    <JafarButton text="Edit" clickHandler={() => {editSprintWithId(sprint.sprintid)}}/>
                    <JafarButton text="Delete" clickHandler={async () => {await deleteSprintWithId(sprint.sprintid)}}/>
                    <JafarButton text="View Details" clickHandler={() => navigateToProject(sprint.sprintid)}/>
                    <JafarButton text="Create Report" clickHandler={() => generateReport(sprint.sprintid)} />

                </li>

            {/each}
        </ul>

        <JafarButton text="Add Sprint" clickHandler={addNewSprint}/>

    </main>
{/if}

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        background-color: #19191d;
        text-align: center;
        margin: 0 auto;
        padding: 0;

        display: flex;
        justify-content: space-evenly;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        max-height: 70vh;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        max-height: 70vh;
    }

    li {
        display: flex;
        gap: 1rem;
        background-color: #2e2e36;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    li:hover {
        background-color: #45454f;
    }
    img {
        border: 1px solid gray;
        padding: 0.4rem;

        width: 20%;
    }

    p {
        width: 62%;
        overflow: auto;
        max-height: 20vh;
        text-align: left;
        color: #fff;
    }

</style>
