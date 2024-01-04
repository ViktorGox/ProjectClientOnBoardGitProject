<script>
    import Button from "../components/Button.svelte";
    import TestCaseHorizontal from "../components/containers/TestCaseHorizontal.svelte";
    import {fetchRequest} from "../lib/Request.js";

    let correctTests;

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
</script>

<div class="background">
    <div class="top">
        <Button margin="0 10px 0 10px" text="Open"></Button>
        <Button margin="0 10px 0 10px" text="Done"></Button>
        <Button margin="0 10px 0 10px" text="All"></Button>
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

    .right {
        display: flex;
        justify-content: flex-end;
    }

    .left {
        display: flex;
        flex-wrap: nowrap;
    }
</style>