<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let dashboardBoxes = [
        { icon: 'bi bi-clock text-primary', title: 'Time Testing', value: 400 },
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
        // Get values and labels for the chart
        const values = dashboardBoxes.map(box => box.value);
        const labels = dashboardBoxes.map(box => box.title);

        // Chart data
        const data = {
            labels: labels,
            datasets: [{
                label: 'Values',
                data: values,
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

        // Chart configuration
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {},
            plugins: {
                legend: {
                    labels: {
                        color: 'white' // Cambia el color de las etiquetas del gráfico a blanco
                    }
                }
            }
        };

        // Get canvas context
        const ctx = document.getElementById('myChart').getContext('2d');

        // Create doughnut chart
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    });
</script>

<main>
    <div class="dash dark-bg text-light">
        <div class="container px-4 py-5" id="icon-grid">
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

    <section class="graph dark-bg">
        <div class="chart-container">
            <canvas id="myChart"></canvas>
        </div>
    </section>
</main>

<style>
    .chart-container {
        width: 100%; /* Utiliza el 100% del ancho disponible */
        max-width: 500px; /* Limita el ancho máximo a 500px si es necesario */
        margin: 0 auto;
    }

    .dash {
        background: #1a1a1a; /* Fondo oscuro */
        box-sizing: border-box;
        text-align: center;
        /* Se eliminó el margen inferior para quitar el espacio blanco en el medio */
    }

    .dash-box {
        margin-left: -6px;
        margin-right: -6px;
        border: 1px solid rgb(42, 42, 42); /* Bordes oscuros */
        padding: 3px;
        background: #1a1a1a; /* Fondo oscuro */
        color: #ffffff; /* Texto blanco */
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

    .dark-bg {
        background-color: #1a1a1a; /* Fondo oscuro */
        color: #ffffff; /* Texto blanco */
    }

    .text-light {
        color: #ffffff; /* Texto blanco */
    }
</style>
