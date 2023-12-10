<script>

</script>
<main >
    <div class="dash">
        <div class="container px-4 py-5" id="icon-grid">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-clock text-primary" style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Total Time Testing</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-clock text-success" style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Average time per test</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-list-ul text-primary" style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Total test cases</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-code-square text-info " style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Not sure for here yet</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-check-square text-success" style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Passed Total</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-x-circle text-danger" style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Failed Total</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-exclamation-triangle text-warning " style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Bugs</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div class="row dash-box">
                        <div class="col-4">
                            <i class="bi bi-dash-circle text-danger" style="font-size: 60px;"></i>
                        </div>
                        <div class="col-8">
                            <p class="fw-bold mb-0 fs-4">0 seconds</p>
                            <p>Blockers</p>
                        </div>
                    </div>
                </div>
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
        padding: 5px;
        border-radius: 5px;
    }
</style>
