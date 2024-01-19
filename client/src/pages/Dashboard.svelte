<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import {fetchRequest, generateQuery} from "../lib/Request.js";
    import {arrayToString} from "../lib/Utils.js";
    import router from "page";

    let dashboardBoxes = [
        { icon: 'bi bi-clock text-primary', title: 'Time Testing', value: 400 },
        { icon: 'bi bi-clock text-success', title: 'Average time per Test', value: 52 },
        { icon: 'bi bi-list-ul text-primary', title: 'Tests', value: 410 },
        { icon: 'bi bi-check-square text-success', title: 'Passed', value: 60 },
        { icon: 'bi bi-x-circle text-danger', title: 'Failed', value: 88 },
        { icon: 'bi bi-exclamation-triangle text-warning', title: 'Bugs', value: 100 },
        { icon: 'bi bi-dash-circle text-danger', title: 'Blockers', value: 97 },
        { icon: 'bi bi-code-square text-info', title: 'Tests in process', value: 0 }
    ];

    export let params;
    let sprintid = params ? params.id : null;

    //VALUES
    let totalTests = 500;
    let chartValues = [totalTests, 480, 460, 400, 390, 365, 300, 290, 248, 230, 180, 130, 60, 0];
    let chartLabels = ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14'];
    let chartCanvas;

    function goBack() {
        window.history.back();
    }

    onMount(() => {
        const doughnutValues = dashboardBoxes.map(box => box.value);
        const doughnutLabels = dashboardBoxes.map(box => box.title);

        const doughnutData = {
            labels: doughnutLabels,
            datasets: [{
                label: 'Values',
                data: doughnutValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 255, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 255, 64, 1)',
                ],
                borderWidth: 1
            }]
        };

        const doughnutOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {},
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        color: 'white'
                    }
                }
            }
        };

        const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
        const doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: doughnutData,
            options: doughnutOptions
        });

        const lineCtx = chartCanvas.getContext('2d');
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Tests to do',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chartValues
                }]
            }
        });
    });

    // SECTION FOR TABLE

    let fullTests = [];
    let statuses;
    let modules;
    let reverseTests = false;
    let weightOrder = false;
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
                            element.weight = Math.floor(Math.random() * 25) + 1;
                            return element;
                        })
                );
                return Promise.all(modulePromises);
            })
            .then(updatedTests => {
                if (weightOrder) {
                    updatedTests.sort((a, b) => a.weight - b.weight)
                }
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

    function reverseTestArray() {
        reverseTests = !reverseTests;
        if (reverseTests) {
            fullTests = fullTests.sort((a, b) => a.testid - b.testid);
        } else {
            fullTests = fullTests.sort((a, b) => b.testid - a.testid);
        }
    }

    function orderByWeight() {
        weightOrder = !weightOrder;
        if (weightOrder) {
            fullTests = fullTests.sort((a, b) => a.weight - b.weight);
        } else {
            fullTests = fullTests.sort((a, b) => b.weight - a.weight);
        }
    }

    let checkboxes = [];

    function checkAll() {
        checkboxes.forEach((checked) => true);
    }

    function getImage(test) {
        let imgSrc = "../src/assets/TestStatusIcons/Awaiting.png";

        if (!statuses || !test.statusid) return;
        if (test.statusid === statuses.get('Blocker')) {
            imgSrc = "../src/assets/TestStatusIcons/Blocker.png"
        } else if (test.statusid === statuses.get('Passed')) {
            imgSrc = "../src/assets/TestStatusIcons/Successful.png"
        } else if (test.statusid === statuses.get('Bug')) {
            imgSrc = "../src/assets/TestStatusIcons/Bug.png"
        } else {
            imgSrc = "../src/assets/TestStatusIcons/Awaiting.png"
        }

        return imgSrc;
    }

    function getImageFromStatusId(statusid) {
        let imgSrc = "../src/assets/TestStatusIcons/Awaiting.png";

        if (!statuses || !statusid) return;
        if (statusid === statuses.get('Blocker')) {
            imgSrc = "../src/assets/TestStatusIcons/Blocker.png"
        } else if (statusid === statuses.get('Passed')) {
            imgSrc = "../src/assets/TestStatusIcons/Successful.png"
        } else if (statusid === statuses.get('Bug')) {
            imgSrc = "../src/assets/TestStatusIcons/Bug.png"
        } else {
            imgSrc = "../src/assets/TestStatusIcons/Awaiting.png"
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

        console.log('status received: ' + status);
        return status;
    }

    let isFlippedID = false;
    let isFlippedWeight = false;

    const toggleRotateID = () => {
        isFlippedID = !isFlippedID;
    };

    const toggleRotateWeight = () => {
        isFlippedWeight = !isFlippedWeight;
    };

    const openTestPage = (id) => {
        router("/tests/" + id);
    }

    const changeStatus = (test) => {
        //TODO change test status
        console.log('status id for test: ' + test.testid + ', changed to:', test.statusid);
    }

</script>

<main>
    <div class="dash dark-bg text-light">
        <div class="container px-4 py-5" id="icon-grid">
            <h1 style="margin-top: -20px;" >SPRINT {sprintid}</h1>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                {#each dashboardBoxes as box (box.title)}
                    <div class="col d-flex align-items-start">
                        <div class="row dash-box dark-bg text-light">
                            <div class="col-4">
                                <i class={box.icon} style="font-size: 60px;"></i>
                            </div>
                            <div class="col-8">
                                <p class="fw-bold mb-0 fs-4">{box.value}</p>
                                <p>{box.title}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <section class="graph dark-bg" >
        <div class="chart-container">
            <div class="chart-column" style="margin-top: -60px;">
                <canvas id="doughnutChart"></canvas>
            </div>
            <div class="chart-column" style="margin-top: -30px;">
                <canvas bind:this={chartCanvas} id="lineChart"></canvas>
            </div>
        </div>
    </section>

    <div class="card mt-5 mb-5">
        <div class="card-header">
            <div class="row align-items-center">
                <div class="col">
                    <div class="input-group input-group-flush input-group-merge input-group-reverse">
                        <span class="search-icon input-group-text"><i class="bi bi-search"
                                                                      on:click={fullFetch}></i></span>
                        <input class="form-control list-search" type="text" placeholder="Search"
                               bind:value={searchBarValue} on:input={fullFetch}>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="dropdown">

                        <button class="btn filter" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-sliders"></i> Filter <span
                                class="badge bg-primary ms-1">{statusOptions.length}</span>
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
                                                        <label class="form-check-label" for="{statusId}"><input
                                                                id={statusId} type="checkbox" class="form-check-input"
                                                                on:change={(e) => handleCheckboxChange(e, statusId)}>{statusName}
                                                        </label>
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
                    <th scope="col" class="order-header" on:click={toggleRotateID} on:click={reverseTestArray}>
                        ID
                        <img class:rotated={isFlippedID} class="small-img" src="../src/assets/arrow-down-white.png"
                             alt="order button image">
                    </th>
                    <th scope="col">Title</th>
                    <th scope="col">Modules</th>
                    <th scope="col">Status</th>
                    <th scope="col">Assignee</th>
                    <th scope="col" class="order-header" on:click={toggleRotateWeight} on:click={orderByWeight}>Weight
                        <img class:rotated={isFlippedWeight} class="small-img" src="../src/assets/arrow-down-white.png"
                             alt="order button image">
                    </th>
                </tr>
                </thead>
                <tbody>
                {#if fullTests || statuses}
                    {#each fullTests as test, i}
                        <tr class="test-page" on:click={openTestPage(test.testid)}>
                            <th scope="row" on:click|stopPropagation>
                                <label class="control">
                                    <input type="checkbox" on:change={() => console.log('checked')}>
                                    <!--change console.log to function that collects this test-->
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
                                            <div class="text-container"
                                                 on:click|stopPropagation={() => {handleModuleClick(module)}}>
                                                {modules.get(module)}
                                            </div>
                                        </div>
                                    {/each}
                                {/if}
                            </td>
                            <td>
                                <div class="row" on:click|stopPropagation>
                                    <div class="col-5">
                                        <img src={getImage(test)} alt="status of test case">
                                    </div>
                                    <div class="col-7">
                                        <select bind:value={test.statusid} on:change={changeStatus(test)}
                                                class="form-select form-select-md bg-dark">
                                            {#each Array.from(statuses.entries()) as [statusName, statusId]}
                                                <option value="{statusId}">
                                                    {statusName}
                                                </option>
                                            {/each}
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {test.userid}
                            </td>
                            <td>{test.weight}</td>
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
</main>

<style>
    .chart-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
    }
    .chart-column {
        width: 48%;
    }
    .dash {
        background: #1a1a1a;
        box-sizing: border-box;
        text-align: center;

    }

    .dash-box {
        margin-left: -6px;
        margin-right: -6px;
        border: 1px solid rgb(42, 42, 42);
        padding: 3px;
        background: #1a1a1a;
        color: #ffffff;
        width: 400px;
        height: 100px;
        border-radius: 20px;
    }

    .dark-bg {
        background-color: #1a1a1a;
        color: #ffffff;
    }

    .text-light {
        color: #ffffff;
    }

    /*TEST TABLE SECTION*/
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

    .dropdown-menu h6 {
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

    .search-icon {
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
        background: rgba(179, 179, 179, 0.3);
        border-radius: 10px;
    }

    .scrollable-div::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
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
        transition: .3s all ease;
    }

    a, a:hover {
        text-decoration: none !important;
    }

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

    .order-header, .test-page {
        cursor: pointer;
    }

    .rotated {
        transform: rotate(180deg);
    }

    .form-select-md {
        /*width: 60%;*/
        cursor: pointer;
        border: none;
        background-color: #2e2e36 !important;
        color: #b3b3b3;
    }

    .form-select-md:hover {
        background-color: #45454f !important;
        color: white;
    }

    .form-select-md:focus {
        box-shadow: none;
    }
</style>
