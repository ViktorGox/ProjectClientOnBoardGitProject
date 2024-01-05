<script>
    import TestCaseHorizontal from "../components/containers/TestCaseHorizontal.svelte";
    import {fetchRequest} from "../lib/Request.js";

    let fullTests;
    let shownTests;
    let showStatusMenu;

    let options = {
        passed: false,
        "to do": false,
        bug: false,
        blocker: false
    };

    function handleCheckboxChange(event, option) {
        options[option] = event.target.checked;

        if(Object.values(options).every(value => !value)) {
            shownTests = fullTests;
            return;
        }

        shownTests = filterElements();
    }

    function filterElements() {
        return fullTests.filter(element => options[element.status.toLowerCase()]);
    }

    Promise.all([fetchStatuses(), fetchTests(), fetchModules()])
        .then(([statuses, tests, modules]) => {
            const fetchModulePromises = tests.map(element =>
                fetchRequest('module/' + element.testid).then(result =>
                    result.map(moduleData => modules.get(moduleData.moduleid))
                )
            );

            return Promise.all(fetchModulePromises).then(modulesData => {
                tests.forEach((element, index) => {
                    element.status = statuses.get(element.statusid);
                    delete element.statusid;

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
        return fetchRequest('test').then((result) => {
            return result;
        }).catch((e) => {
            throw e;
        })
    }

    function fetchStatuses() {
        return fetchRequest('status').then((result) => {
            return new Map(result.map(status => [status.statusid, status.name]));
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
</script>

<div class="background">
    <div id="optionsWindow" style="display: {showStatusMenu ? 'flex' : 'none'}">
        <label><input type="checkbox" bind:checked={options.passed}
                      on:change={(e) => handleCheckboxChange(e, 'passed')}> Passed</label>
        <label><input type="checkbox" bind:checked={options["to do"]} on:change={(e) => handleCheckboxChange(e, 'to do')}> To
            do</label>
        <label><input type="checkbox" bind:checked={options.bug} on:change={(e) => handleCheckboxChange(e, 'bug')}> Bug</label>
        <label><input type="checkbox" bind:checked={options.blocker}
                      on:change={(e) => handleCheckboxChange(e, 'blocker')}> Blocker</label>
    </div>
    <div class="bottom">
        <TestCaseHorizontal isHeader=true headerStatusOnClick={onStatusClick}
                            test={{name: 'Test Case Title', status: 'Status', modules: ['Modules'], userid: "User", weight: 'Weight'}}></TestCaseHorizontal>
        {#if shownTests}
            {#each shownTests as test, i}
                <TestCaseHorizontal test={test} index={i}></TestCaseHorizontal>
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

    .bottom {
        margin: 10px;
        overflow-y: scroll;
        max-height: 80vh;
        min-height: 80vh;
        background: #efefef;
    }
</style>