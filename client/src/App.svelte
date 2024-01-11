<script>
    import router from 'page';
    import TestCaseOverview from './pages/TestCaseOverview.svelte'
    import Header from "./components/Header.svelte";

    import Sidebar from "./components/Sidebar.svelte";
    import Projects from "./pages/Sprints.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import TestCaseDetails from "./pages/TestCaseDetails.svelte";
    import Login from "./pages/Login.svelte";
    import SprintDetail from "./pages/SprintDetail.svelte";
    import Sprints from "./pages/Sprints.svelte";

    let page;
    let params;
    let currentRoute;

    router('/', (ctx) => {
        page = Login;
        currentRoute = ctx.pathname;
    });

    router('/testCases', (ctx) => {
        page = TestCaseOverview;
        currentRoute = ctx.pathname;
    });
    router('/header', (ctx) => {
        page = Header;
        currentRoute = ctx.pathname;
    });

    router('/tests/:id', (ctx) => {
        page = TestCaseDetails;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });

    router('/projects', (ctx) => {
        page = Sprints;
        currentRoute = ctx.pathname;
    });
    router('/projects/:id', (ctx) => {
        page = Dashboard;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });
    router('/SprintDetail', (ctx) => {
        page = SprintDetail;
        currentRoute = ctx.pathname;
    });
    router('/SprintDetail/:id', (ctx) => {
        page = SprintDetail;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });

    router.start();
</script>

<main>
    {#if currentRoute === '/'}
        <div class="main">
            <div class="page">
                <svelte:component this={page} {params}/>
            </div>
        </div>
    {:else}
        <Header active={currentRoute}/>
        <div class="main">
            <Sidebar></Sidebar>
            <div class="page">
                <svelte:component this={page} {params}/>
            </div>
        </div>
    {/if}
</main>


<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
        margin: 0 auto;
        padding: 0;
    }

    img {
        height: 16rem;
        width: 16rem;
    }

    .main {
        display: flex;
    }

    .page {
        width: 85%;
    }
</style>
