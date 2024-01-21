<script>
    export let title;
    export let strartdate;
    export let dueddate;
</script>

<section id="sprintInfoEditing" class="addData">
    <div class="titleDivs">
        <label class="lighter-text">Name: </label>
        <input type="text" class="titleInputs" bind:value={title}>
    </div>
    <div>
        <div>
            <label class="lighter-text2">Start Date: </label>
            <input type="date" class="lighter-input" bind:value={strartdate}>
        </div>
    </div>
    <div>
        <div>
            <label class="lighter-text3">Due Date: </label>
            <input type="date" class="lighter-input" bind:value={dueddate}>
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
    .addData {
        padding: 1rem;
        background-color: #333;
        border-radius: 10px;
        color: white;
        text-align: center;

    }

    .titleDivs {
        justify-content: flex-start;
    }
    label.lighter-text {
        color: #b3b3b3;
        font-weight: lighter;
        padding-right: 32px;
    }
    label.lighter-text2 {
        color: #b3b3b3;
        font-weight: lighter;
        padding-right: 5px;
    }
    label.lighter-text3 {
        color: #b3b3b3;
        font-weight: lighter;
        padding-right: 9px;
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
    input.lighter-input {
        background-color: #D0D4CA;
    }
    .titleInputs {
        flex: 1;
        background-color: #D0D4CA;
    }
</style>
