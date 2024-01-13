<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let dashboardBoxes = [
        { icon: 'bi bi-clock text-primary', title: 'Time Testing', value: 4000 },
        { icon: 'bi bi-clock text-success', title: 'Average time per Test', value: 52 },
        { icon: 'bi bi-list-ul text-primary', title: 'Tests', value: 410 },
        { icon: 'bi bi-check-square text-success', title: 'Passed', value: 60 },
        { icon: 'bi bi-x-circle text-danger', title: 'Failed', value: 88 },
        { icon: 'bi bi-exclamation-triangle text-warning', title: 'Bugs', value: 100 },
        { icon: 'bi bi-dash-circle text-danger', title: 'Blockers', value: 97 },
    ];

    function goBack() {
        window.history.back();
    }

    onMount(() => {
        // Get values and labels 
        const valores = dashboardBoxes.map(box => box.value);
        const etiquetas = dashboardBoxes.map(box => box.title);

        // Data for graphs
        const data = {
            labels: etiquetas,
            datasets: [{
                label: 'Valores',
                data: valores,
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

        // Graph configuration
        const opciones = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // Get canvas context
        const ctx = document.getElementById('myChart').getContext('2d');

        // create graph
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: opciones
        });
    });
</script>

<main>
    <div class="dash">
        <button on:click={goBack} class="btn btn-success btn-lg">Return</button>

        <div class="container px-4 py-5" id="icon-grid">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                {#each dashboardBoxes as box (box.title)}
                    <div class="col d-flex align-items-start">
                        <div class="row dash-box">
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

    <section class="graph">
        <div class="chart-container">
            <canvas id="myChart"></canvas>
        </div>
    </section>
</main>

<style>
    .chart-container {
        width: 70%;
        max-width: 500px;
        margin: 0 auto;
    }

    .dash {
        background: #BDBDBD;
        box-sizing: border-box;
        text-align: center;
        margin-bottom: 20px; /* Espacio entre el contenido y el gráfico */
    }

    .dash-box {
        margin-left: -6px;
        margin-right: -6px;
        border: 1px solid rgb(232, 232, 232);
        padding: 3px;
        background: #BDBDBD;
        background: rgb(255, 255, 255);
        color: #413f3f;
        width: 400px;
        height: 100px;
        border-radius: 20px;
    }

    .button {
        cursor: pointer;
        background-color: #B7C100;
        border-radius: 5px;
        border: black solid 2px;
        padding: 7px 20px 7px 20px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
</style>
