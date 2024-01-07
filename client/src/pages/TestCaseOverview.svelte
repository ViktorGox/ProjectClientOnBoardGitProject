<script>
    import TestCaseHorizontal from "../components/containers/TestCaseHorizontal.svelte";
    import {fetchRequest, generateQuery} from "../lib/Request.js";
    import {arrayToString} from "../lib/Utils.js";
    import {onMount} from 'svelte';

    let fullTests = [];
    let statuses;
    let modules;
    let showStatusMenu = false;
    let reverseTests = false;
    let searchBarValue;

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
        fullFetch()
    }

    function handleModuleClick(module) {
        const index = moduleOptions.indexOf(module);
        if (index !== -1) {
            moduleOptions.splice(index, 1)
        } else {
            moduleOptions.push(module);
        }
        fullFetch();
    }

    onMount(() => {
        fullFetch();
    });

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
                if(reverseTests) {
                    updatedTests.reverse();
                }
                fullTests = updatedTests;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    async function fetchTests() {
        let moduleIdsArray = [];
        if(moduleOptions.length !== 0) {
            moduleIdsArray = await fetchTestIds();
        }

        const queryProperties = ["statusid", 'testid','name'];
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

    function onStatusClick() {
        showStatusMenu = !showStatusMenu;
    }

    function reverseTestArray() {
        reverseTests = !reverseTests;
        fullTests = fullTests.reverse()
        console.log(fullTests);
    }

    //TODO: Center text in pop up window.
    //TODO: Move status openable window to below status column.
</script>

<div class="background">
    <input class="search-bar" type="text" bind:value={searchBarValue} placeholder='Search' on:input={fullFetch}/>

    <div id="optionsWindow" style="display: {showStatusMenu ? 'flex' : 'none'}">
        {#if statuses}
            {#each Array.from(statuses.entries()) as [statusName, statusId]}
                <label><input type="checkbox" on:change={(e) => handleCheckboxChange(e, statusId)}>{statusName}</label>
            {/each}
        {/if}
    </div>
    <div class="bottom">
        <TestCaseHorizontal isHeader=true headerStatusOnClick={onStatusClick} onTitleArrowClick={reverseTestArray}></TestCaseHorizontal>
        {#if fullTests || statuses}
            {#each fullTests as test, i}
                <TestCaseHorizontal test={test} index={i} onModuleClick={handleModuleClick}
                                    statusesMap={statuses} modulesMap={modules}></TestCaseHorizontal>
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

    .search-bar {
        margin: 8px 0 0 0;
        width: 90%;
    }
</style>