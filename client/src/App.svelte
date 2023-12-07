<script lang="ts">
    import router from 'page';
    import TestCaseOverview from './pages/TestCaseOverview.svelte'
    import SecondPageForTesting from './pages/SecondPageForTesting.svelte'
    import Header from "./components/Header.svelte";

    import Sidebar from "./components/Sidebar.svelte";
    import Projects from "./pages/Projects.svelte";

    let page;
    let params;
    let currentRoute;

    router('/', (ctx) => {
        page = TestCaseOverview;
        currentRoute = ctx.pathname;
    });
    router('/projects', (ctx) => {
        page = Projects;
        currentRoute = ctx.pathname;
    });

    router.start();
</script>

<main>
    <Header active={currentRoute}/>
    <div class="main">
        <Sidebar></Sidebar>
        <div class="page">
            <svelte:component this={page} {params}/>
        </div>
    </div>
</main>


<style>
    @import "styles/style.css";
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
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
