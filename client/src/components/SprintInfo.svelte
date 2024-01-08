<script>
    export let title;
    export let strartdate;
    export let dueddate;
</script>

<section id="sprintInfoEditing">
    <div class="titleDivs">
        <label>Name: </label>
        <input type="text" class="titleInputs" bind:value={title}>
    </div>
    <div>
        <div>
            <label>Start Date: </label>
            <input type="date" bind:value={strartdate}>
        </div>
    </div>
    <div>
        <div>
            <label>Due Date: </label>
            <input type="date" bind:value={dueddate}>
        </div>
    </div>

</section>
<style>
    section {
        display: flex;
        flex-direction: column;

        gap: 0.5rem;
    }

    div {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .titleDivs {
        justify-content: flex-start;
    }
    input {
        padding-top: 5px;
        padding-bottom: 5px;
        flex-grow: 1;
        background-color: transparent;
        border-radius: 5px;
        border-color: #cccccc;

        font-family: "Arial Rounded MT Bold";
        font-size: 15px;
        color: rgba(0,0,0,0.71);

        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    }

    .titleInputs {
        flex: 1;
    }
</style>
