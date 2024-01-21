<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import TestTable from "../components/TestTable.svelte";

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
    sprintid --; 

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

   <TestTable generalTable={false} sprintId={sprintid}></TestTable>
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
</style>
