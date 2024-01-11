<script>
    import SideMenuButton from "./SideMenuButton.svelte";
    import VerticalButtonMenu from "./containers/VerticalButtonMenu.svelte";

    const hrefsTestCases = ["/first", "/second"]
    const titlesTestCases = ["first", "second"]

    const hrefsAnalytics = ["/third", "/fourth"]
    const titlesAnalytics = ["third", "fourth"]

    const imagesAll = ["./src/assets/svelte.png", "./src/assets/svelte.png"]
    const imagesHalf = ["", "./src/assets/svelte.png"]

    export let active;
</script>

<div class="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
    <span class="badge badge-dark mt-2 mb-3">Navigation</span>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <a href="/testCases" class="nav-link" class:active={active === '/testCases'}>
                <div class="row menu-row">
                    <span class="menu-icon">
                        <i class="bi bi-list-stars"></i>
                    </span>
                    Tests
                </div>
            </a>
        </li>
        <li>
            <a href="/projects" class="nav-link" class:active={active === '/projects'}>
                <div class="row menu-row">
                    <span class="menu-icon">
                       <i class="bi bi-view-list"></i>
                    </span>
                    Sprint
                </div>
            </a>
        </li>
    </ul>
</div>

<style>
    li {

    }

    .sidebar {
        position: fixed;
        left: 0;
        top: 66px;
        width: 100%;
        z-index: 1000;
        max-width: 229px;
        color: #fff;
        box-sizing: border-box;
        height: 100vh;
        background-color: #25252b !important; /* #191c24 */
        padding: 20px 20px 20px 0 !important;
    }

    a {
        border-bottom-right-radius: 4rem !important;
        border-top-right-radius: 4rem !important;
        text-align: left;
        padding-left: 4rem;
    }

    a.active {
        background-color: #0f1015 !important;
        border-left: white !important;
        border-left-width: 10px !important;
        color: white;
    }

    a:hover {
        background-color: #0f1015;
    }

    .badge {
        font-size: 16px;
        color: #777;
    }

    .menu-icon {
        margin-right: 0.5rem;
        font-size: 1rem;
        line-height: 1;
        background: #2a2d3a;
        width: 31px;
        height: 31px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
    }

    .menu-row {
        line-height: 1.8;
        color: #777;
    }

    a.active .menu-row {
        color: white;
    }
</style>
