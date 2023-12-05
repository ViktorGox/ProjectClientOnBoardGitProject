<script lang="ts">
  import router from 'page';
  import TestCaseOverview from './pages/TestCaseOverview.svelte'
  import SecondPageForTesting from './pages/SecondPageForTesting.svelte'
  import Header from "./components/Header.svelte";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = TestCaseOverview;
    currentRoute = ctx.pathname;
  });
  router('/about', (ctx) => {
    page = SecondPageForTesting;
    currentRoute = ctx.pathname;
  });

  router.start();
</script>

<main>
  <Header active={currentRoute} />
  <svelte:component this={page} {params} />
</main>


<style>
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

</style>
