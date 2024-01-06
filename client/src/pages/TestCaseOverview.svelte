<script>
    import TestCaseHorizontal from "../components/containers/TestCaseHorizontal.svelte";
    import {fetchRequest, generateQuery} from "../lib/Request.js";
    import {arrayToString} from "../lib/Utils.js";

    let fullTests = [];
    let shownTests = [];
    let statuses;
    let showStatusMenu = false;

    const statusOptions = [];
    const moduleOptions = [];

    function handleCheckboxChange(event, option) {
        if (!event.target.checked) {
            const index = statusOptions.indexOf(option);
            if (index !== -1) {
                statusOptions.splice(index, 1)
            }
        } else {
            statusOptions.push(option);
        }
        fetchTests()
        console.log(statusOptions);
    }

    function handleModuleClick(module) {
        const index = moduleOptions.indexOf(module);
        if (index !== -1) {
            moduleOptions.splice(index, 1)
            fetchTests()
            return;
        }
        moduleOptions.push(module);
        fetchTests()
    }

    Promise.all([fetchStatuses(), fetchTests(), fetchModules()])
        .then(([fetchedStatuses, tests, modules]) => {
            statuses = fetchedStatuses;
            const fetchModulePromises = tests.map(element =>
                fetchRequest('module/' + element.testid).then(result =>
                    result.map(moduleData => modules.get(moduleData.moduleid))
                )
            );

            return Promise.all(fetchModulePromises).then(modulesData => {
                tests.forEach((element, index) => {
                    element.modules = modulesData[index];
                });
                fullTests = tests;
                shownTests = tests;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function fetchTests() {
        // if (Object.values(statusOptions).every(value => !value)) {
        //     shownTests = fullTests;
        //     fetchTests()
        //     return;
        // }
        const queryProperties = ["statusid", "module"];
        const queryParams = [arrayToString(statusOptions), arrayToString(moduleOptions)];

        const querySettings = ["Equals", "Equals"];
        let query = generateQuery('test', queryProperties, queryParams, querySettings);
        return fetchRequest(query).then((result) => {
            fullTests = result;
            return result;
        }).catch((e) => {
            throw e;
        })
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

    function onStatusClick() {
        showStatusMenu = !showStatusMenu;
    }

    //TODO: center text in pop up window.
</script>

<div class="background">
    <div id="optionsWindow" style="display: {showStatusMenu ? 'flex' : 'none'}">
        {#if statuses}
            {#each Array.from(statuses.entries()) as [statusName, statusId]}
                <label><input type="checkbox" on:change={(e) => handleCheckboxChange(e, statusId)}>{statusName}</label>
            {/each}
        {/if}
    </div>
    <div class="bottom">
        <TestCaseHorizontal isHeader=true headerStatusOnClick={onStatusClick}
                            test={{name: 'Title', status: 'Status', modules: ['Modules'], userid: "User", weight: 'Weight'}}></TestCaseHorizontal>
        {#if shownTests || statuses}
            {#each shownTests as test, i}
                <TestCaseHorizontal test={test} index={i} onModuleClick={handleModuleClick}
                                    statusesMap={statuses}></TestCaseHorizontal>
            {/each}
        {/if}
    </div>
</div>

<style>
    #optionsWindow {
        position: absolute;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 10px;
        border: 1px solid #ccc;
        z-index: 1000;
        flex-direction: column;
        align-items: flex-start;
    }

    input {
        margin-right: 5px;
    }

    .bottom {
        margin: 10px;
        overflow-y: scroll;
        max-height: 80vh;
        min-height: 80vh;
        background: #efefef;
    }
</style>