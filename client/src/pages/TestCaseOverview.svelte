<script>
    import {fetchRequest, generateQuery} from "../lib/Request.js";
    import {arrayToString} from "../lib/Utils.js";
    import {onMount} from 'svelte';

    let fullTests = [];
    let statuses;
    let modules;
    let showStatusMenu = false;
    let reverseTests = false;
    let searchBarValue;

    let statusOptions = [];
    let moduleOptions = [];

    function handleCheckboxChange(event, option) {
        if (!event.target.checked) {
            const index = statusOptions.indexOf(option);
            if (index !== -1) {
                statusOptions.splice(index, 1);
                statusOptions = statusOptions;
            }
        } else {
            statusOptions = [...statusOptions, option];
        }
        fullFetch();
    }

    function handleModuleClick(module) {
        const index = moduleOptions.indexOf(module);
        if (index !== -1) {
            moduleOptions.splice(index, 1);
            moduleOptions = moduleOptions;
        } else {
            moduleOptions = [...moduleOptions, module];
        }
        console.log('modules: ', moduleOptions);
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

    let checkboxes = [];

    function checkAll() {
        checkboxes.forEach((checked) => true);
    }

    function check() {

    }

    function getImage(test) {
        let imgSrc = "./src/assets/TestStatusIcons/Awaiting.png";

        if (!statuses || !test.statusid) return;
        if (test.statusid === statuses.get('Blocker')) {
            imgSrc = "./src/assets/TestStatusIcons/Blocker.png"
        } else if (test.statusid === statuses.get('Passed')) {
            imgSrc = "./src/assets/TestStatusIcons/Successful.png"
        } else if (test.statusid === statuses.get('Bug')) {
            imgSrc = "./src/assets/TestStatusIcons/Bug.png"
        } else {
            imgSrc = "./src/assets/TestStatusIcons/Awaiting.png"
        }

        return imgSrc;
    }

    function getStatus(test) {
        let status;

        if (!statuses || !test.statusid) return;
        if (test.statusid === statuses.get('Blocker')) {
            status = 'Blocker';
        } else if (test.statusid === statuses.get('Passed')) {
            status = 'Passed';
        } else if (test.statusid === statuses.get('Bug')) {
            status = 'Bug';
        } else {
            status = 'To do';
        }

        return status;
    }

    let isFlipped = false;

    const toggleRotate = () => {
        isFlipped = !isFlipped;
    };
</script>

<div class="background">

    <div class="card">
        <div class="card-header">
            <div class="row align-items-center">
                <div class="col">
                    <div class="input-group input-group-flush input-group-merge input-group-reverse">
                        <span class="search-icon input-group-text"><i class="bi bi-search" on:click={fullFetch}></i></span>
                        <input class="form-control list-search" type="text" placeholder="Search"
                               bind:value={searchBarValue} on:input={fullFetch}>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="dropdown">

                        <button class="btn filter" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-sliders"></i>  Filter <span class="badge bg-primary ms-1">{statusOptions.length}</span>
                        </button>

                        <form name="formSelect" class="dropdown-menu dropdown-menu-end dropdown-menu-card mt-2">

                            <div class="card-header">
                                <h4 class="">Filters</h4>
                            </div>

                            <div class="card-body">

                                <div class="list-group list-group-flush mt-n4 mb-4">
                                    <div class="list-group-item">
                                        <div class="row">
                                            <div class="col">

                                                <h6>Status</h6>

                                            </div>
                                            <div class="col-auto">
                                                {#if statuses}
                                                    {#each Array.from(statuses.entries()) as [statusName, statusId]}
                                                        <label class="form-check-label" for="{statusId}"><input id={statusId} type="checkbox" class="form-check-input" on:change={(e) => handleCheckboxChange(e, statusId)}>{statusName}</label>
                                                    {/each}
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-5">
            <div class="card-header">

            </div>

            <div class="card-body modules">
                <div class="row">
                    {#each moduleOptions as option}
                        <div class="module" class:chosen-module={moduleOptions.includes(option)}>
                            <div class="text-container" on:click|stopPropagation={() => {handleModuleClick(option)}}>
                                {modules.get(option)}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="scrollable-div">
            <table class="table custom-table">
                <thead>
                <tr>
                    <th scope="col">
                        <label class="control">
                            <input type="checkbox" on:click={checkAll}>
                            <span class="checkmark"></span>
                        </label>
                    </th>
                    <th scope="col" class="order-header" on:click={toggleRotate}  on:click={reverseTestArray}>
                        ID
                        <img  class:rotated={isFlipped} class="small-img" src="./src/assets/arrow-down-white.png"
                              alt="order button image">
                    </th>
                    <th scope="col">Title</th>
                    <th scope="col">Modules</th>
                    <th scope="col">Status</th>
                    <th scope="col">Assignee</th>
                    <th scope="col">Weight</th>
                </tr>
                </thead>
                <tbody>
                {#if fullTests || statuses}
                    {#each fullTests as test, i}
                        <tr>
                            <th scope="row">
                                <label class="control">
                                    <input type="checkbox" on:change={() => console.log('checked')}> <!--change console.log to function that collects this test-->
                                    <span class="checkmark"></span>
                                </label>
                            </th>
                            <td>
                                {test.testid}
                            </td>
                            <td><a href="/tests/{test.testid}">{test.name}</a></td>
                            <td>
                                {#if test.modules && modules}
                                    {#each test.modules as module}
                                        <div class="module" class:chosen-module={moduleOptions.includes(module)}>
                                            <div class="text-container" on:click|stopPropagation={() => {handleModuleClick(module)}}>
                                                {modules.get(module)}
                                            </div>
                                        </div>
                                    {/each}
                                {/if}
                            </td>
                            <td>
                                <img src={getImage(test)} alt="status of test case">
                                {getStatus(test)}
                            </td>
                            <td>
                                {test.userid}
                            </td>
                            <td>233</td>
                        </tr>
                        <tr class="spacer">
                            <td colspan="100"></td>
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td>
                            No tests here yet.
                        </td>
                    </tr>
                {/if}
                </tbody>
            </table>
        </div>

    </div>

</div>

<style>
    input {
        margin-right: 5px;
    }

    .card {
        background-color: #19191d;
    }

    .list-search {
        background-color: #25252b;
        color: #fff;
        border-radius: 4px;
        border: none;
    }

    .dropdown-menu h6{
        font-size: 1.2rem;
    }

    .dropdown-menu {
        font-size: 1.1rem;
    }

    .dropdown-menu label, .dropdown-menu input {
        cursor: pointer;
    }

    .dropdown:hover .filter {
        background-color: #2e2e36;
        color: white;
    }

    .search-icon{
        border: none;
        cursor: pointer;
        background-color: #2e2e36;
        color: white;
    }

    .btn:focus {
        box-shadow: none;
    }

    .filter {
        border-radius: 4px;
        color: #b3b3b3;
        background-color: #25252b;
        border: none;
    }

    .custom-table {
        margin-bottom: 10rem;
    }

    .scrollable-div {
        max-height: 500px;
        overflow-y: auto;
    }

    .scrollable-div::-webkit-scrollbar {
        width: 5px;
    }
    .scrollable-div::-webkit-scrollbar-track {
        background : rgba(179, 179, 179, 0.3);
        border-radius: 10px;
    }
    .scrollable-div::-webkit-scrollbar-thumb {
        background : rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        box-shadow:  0 0 6px rgba(0, 0, 0, 0.5);
    }

    tbody {

    }

    .custom-table thead tr, .custom-table thead th {
        position: sticky;
        top: 0;
        border-top: none;
        border-bottom: none !important;
        color: #fff;
        background-color: #19191d;
    }

    .custom-table tbody th, .custom-table tbody td {
        color: #777;
        padding-bottom: 20px;
        padding-top: 20px;
        font-weight: 300;
    }

    .custom-table tbody th small, .custom-table tbody td small {
        color: #b3b3b3;
        font-weight: 300;
    }

    .custom-table tbody tr:not(.spacer) {
        border-radius: 7px;
        overflow: hidden;
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    .custom-table tbody tr:not(.spacer):hover {
        -webkit-box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
    }

    .custom-table tbody tr th, .custom-table tbody tr td {
        background: #25252b;
        border: none;
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    .custom-table tbody tr th a, .custom-table tbody tr td a {
        color: #b3b3b3;
    }

    .custom-table tbody tr th:first-child, .custom-table tbody tr td:first-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .custom-table tbody tr th:last-child, .custom-table tbody tr td:last-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .custom-table tbody tr.spacer td {
        padding: 0 !important;
        height: 3px;
        border-radius: 0 !important;
        background: transparent !important;
    }

    .custom-table tbody tr.active th, .custom-table tbody tr.active td, .custom-table tbody tr:hover th,
    .custom-table tbody tr:hover td {
        color: #fff;
        background: #2e2e36;
    }

    .custom-table tbody tr.active th a, .custom-table tbody tr.active td a, .custom-table tbody tr:hover th a,
    .custom-table tbody tr:hover td a {
        color: #fff;
    }

    a {
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease; }
    a, a:hover {
        text-decoration: none !important; }

    input[type='checkbox'] {
        height: 1rem;
        width: 1rem;
        cursor: pointer;
    }

    img {
        width: 20px;
        height: 20px;
        margin: 0 10px 0 10px;
    }

    .module {
        margin-bottom: 3px;
        cursor: pointer;
        background-color: #2e2e36;
        border-radius: 0.5rem;
    }

    .modules .module {
        width: 10rem;
        color: #b3b3b3;
        margin-right: 0.5rem;
    }

    .chosen-module {
        background: #593fe4;
        color: white !important;
    }

    .chosen-module:hover {
        background: #6f58ee !important;
    }

    .modules .module:hover {
        color: white;
        background: #45454f;
    }

    .custom-table tbody tr.active th .module, .custom-table tbody tr.active td .module, .custom-table tbody tr:hover th .module,
    .custom-table tbody tr:hover td .module {
        background: #393942;
    }

    .custom-table tbody tr.active th .module:hover, .custom-table tbody tr.active td .module:hover, .custom-table tbody tr:hover th .module:hover,
    .custom-table tbody tr:hover td .module:hover {
        background: #45454f;
    }

    .custom-table tbody tr.active th .chosen-module, .custom-table tbody tr.active td .chosen-module, .custom-table tbody tr:hover th .chosen-module,
    .custom-table tbody tr:hover td .chosen-module {
        background: #593fe4;
    }

    .small-img {
        width: 15px;
        height: 15px;
        margin: 0;
        transition: transform 0.3s ease;
    }

    .order-header {
        cursor: pointer;
    }

    .rotated {
        transform: rotate(180deg);
    }
</style>