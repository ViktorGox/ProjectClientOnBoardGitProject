<script>
    import Button from "../components/Button.svelte";
    import TestCaseHorizontal from "../components/containers/TestCaseHorizontal.svelte";
    import {fetchRequest} from "../lib/Request.js";

    let correctTests;
    let showStatusMenu;

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

                correctTests = tests;
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

    function onCLick() {
        console.log(showStatusMenu);
        showStatusMenu = !showStatusMenu;
    }
</script>

<div class="background">
    <div class="top">
        <Button margin="0 10px 0 10px" text="Open" onClick={onCLick}></Button>
        <Button margin="0 10px 0 10px" text="Done"></Button>
        <Button margin="0 10px 0 10px" text="All"></Button>
    </div>
    <div id="optionsWindow" style="display: {showStatusMenu ? 'flex' : 'none'}">
        <label><input type="checkbox" id="option1"> Passed</label>
        <label><input type="checkbox" id="option2"> To do</label>
        <label><input type="checkbox" id="option3"> Bug</label>
        <label><input type="checkbox" id="option4"> Blocker</label>
    </div>
    <div class="bottom">
        <TestCaseHorizontal isHeader=true
                            test={{name: 'Test Case Title', status: 'Status', modules: ['Modules'], userid: "User", weight: 'Weight'}}></TestCaseHorizontal>
        {#if correctTests}
            {#each correctTests as test, i}
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

    .top {
        background-color: #556d7a;
        display: flex;
        justify-content: center;
    }

    .bottom {
        margin: 10px;
        overflow-y: scroll;
        max-height: 80vh;
        min-height: 80vh;
        background: #efefef;
    }
</style>