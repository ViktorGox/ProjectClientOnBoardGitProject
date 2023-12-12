<script>
    import TestCaseDetailsComponent from '../components/TestCaseDetailsComponent.svelte';
    import CommentsSection from '../components/Comments.svelte';
    import RightConstantBar from '../components/RightConstantBar.svelte';
    import router from "page";

    const currentRoute = router.current;
    const parts = currentRoute.split('/');
    let testId = parts[parts.length - 1];
    let testName = "Test case name";
</script>


{#if testId}
    <div class="container">
        <div class="main-content">
            <TestCaseDetailsComponent {testName}/>
            <CommentsSection/>
        </div>
        <RightConstantBar/>
    </div>
{:else}
    <p>No test case selected.</p>
{/if}

<style>
    .container {
        display: flex;
    }

    .main-content {
        width: 70%;
        flex-grow: 1;
        padding: 20px;
        border-right: 1px solid #ccc;

    }
</style>