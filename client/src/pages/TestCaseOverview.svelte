<script>
    import HorizontalSplitContainer from "../components/containers/HorizontalSplitContainer.svelte";
    import Button from "../components/Button.svelte";
    import TestCaseHorizontal from "../components/containers/TestCaseHorizontal.svelte";
    import {fetchRequest} from "../lib/Request.js";


    Promise.all([fetchStatuses(), fetchTests(), fetchModules()])
        .then(([statuses, tests, modules]) => {
            tests.forEach(async (element) => {
                element.status = statuses.get(element.statusid);
                delete element.statusid

                element.modules = [];
                await fetchRequest('module/' + element.testid).then((result) => {
                    result.forEach((moduleData) => {
                        element.modules.push(modules.get(moduleData.moduleid));
                    });
                });
            });
            console.log(tests);
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
        <HorizontalSplitContainer>
            <div slot="left">
                <div class="left">
                    <Button margin="0 10px 0 10px" text="Open"></Button>
                    <Button margin="0 10px 0 10px" text="Done"></Button>
                    <Button margin="0 10px 0 10px" text="All"></Button>
                </div>
            </div>
            <div slot="right">
                <div class="right">
                    <Button text="Create"></Button>
                </div>
            </div>
        </HorizontalSplitContainer>
    </div>
    <div class="bottom">
        <TestCaseHorizontal status="Blocker"></TestCaseHorizontal>
        <TestCaseHorizontal status="Successful"></TestCaseHorizontal>
        <TestCaseHorizontal status="Bug"></TestCaseHorizontal>
        <TestCaseHorizontal weight="232"></TestCaseHorizontal>
        <TestCaseHorizontal assignee="SuperVeryLongNameForAnAssignee"></TestCaseHorizontal>
        <TestCaseHorizontal weight="232" assignee="SuperVeryLongNameForAnAssignee"></TestCaseHorizontal>
        <TestCaseHorizontal module="SomeVeryLongModuleJustABitMore"
                            name="AVeryVerySuperMuchLongNameForATestCaseToTestTheCSSIfItsWorkingCorrectlyAndItSeemsToBeWorkingCorrectly"></TestCaseHorizontal>
        <TestCaseHorizontal></TestCaseHorizontal>
        <TestCaseHorizontal></TestCaseHorizontal>
        <TestCaseHorizontal></TestCaseHorizontal>
        <TestCaseHorizontal></TestCaseHorizontal>
    </div>
</div>

<style>
    .top {
        background-color: #F3FF00;
        display: flex;
        justify-content: center;
    }

    .bottom {
        margin: 10px;
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