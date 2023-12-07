<script lang="ts">

</script>

<div class="flex-shrink-0 p-3" style="width: 150px;">
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
        <span class="fs-5 fw-semibold">Overview</span>
    </a>
    <ul class="list-unstyled ps-0">
        <li class="mb-1">
            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed wide"
                    data-bs-toggle="collapse" data-bs-target="#projects-collapse" aria-expanded="false">
                Projects
            </button>
            <div class="collapse" id="projects-collapse" style="">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded wide rightPadded ">Overview</a></li>
                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded wide rightPadded">Updates</a></li>
                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded wide rightPadded">Reports</a></li>
                </ul>
            </div>
        </li>
        <li class="mb-1">
            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed wide"
                    data-bs-toggle="collapse" data-bs-target="#test-cases-collapse" aria-expanded="false">
                Test Cases
            </button>
            <div class="collapse" id="test-cases-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded wide rightPadded">Add Test Case</a></li>
                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded wide rightPadded">Labels</a></li>
                </ul>
            </div>
        </li>
        <li class="mb-1">
            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed wide"
                    data-bs-toggle="collapse" data-bs-target="#analysis-collapse" aria-expanded="false">
                Analysis
            </button>
            <div class="collapse" id="analysis-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded wide rightPadded">Report</a></li>
                </ul>
            </div>
        </li>
    </ul>
</div>

<style>
    .wide {
        width: 100%;
    }

    .rightPadded {
        padding: 0 0 0 20px;
    }

    .no-glow {

    }
</style>
