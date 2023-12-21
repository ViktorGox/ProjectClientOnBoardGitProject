<script>

        let dashboardBoxes = [
        {icon: 'bi bi-clock text-primary', title: 'Total Time Testing', value: 0},
        {icon: 'bi bi-clock text-success', title: 'Average time per test', value: 0},
        {icon: 'bi bi-list-ul text-primary', title: 'Total test cases', value: 0},
        {icon: 'bi bi-code-square text-info', title: 'Not sure for here yet', value: 0},
        {icon: 'bi bi-check-square text-success', title: 'Passed Total', value: 0},
        {icon: 'bi bi-x-circle text-danger', title: 'Failed Total', value: 0},
        {icon: 'bi bi-exclamation-triangle text-warning', title: 'Bugs', value: 0},
        {icon: 'bi bi-dash-circle text-danger', title: 'Blockers', value: 0},
        ];

</script>
<main>

        <div class="dash">
            <div class="container px-4 py-5" id="icon-grid">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                    {#each dashboardBoxes as box (box.title)}
                        <div class="col d-flex align-items-start">
                            <div class="row dash-box">
                                <div class="col-4">
                                    <i class={box.icon} style="font-size: 60px;"></i>
                                </div>
                                <div class="col-8">
                                    <p class="fw-bold mb-0 fs-4">{box.value} seconds</p>
                                    <p>{box.title}</p>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    <section class="graph">

    </section>
</main>
<style>
    .dash{

        background:#BDBDBD;
        box-sizing: border-box;

    }

    .dash-box{
        margin-left: -4px;
        margin-right: -4px;
        border: 1px solid rgb(232, 232, 232);
        padding: 10px;
        background: rgb(255, 255, 255);
        color: #413f3f;
        width: 300px;
        height: 100px;
        border-radius: 5px;
    }
</style>
