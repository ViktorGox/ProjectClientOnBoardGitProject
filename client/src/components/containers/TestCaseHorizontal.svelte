<script lang="ts">
    import HorizontalSplitContainer from "./HorizontalSplitContainer.svelte";

    export let name = "Test case name";
    export let weight = 0;
    export let assignee = "John Doe";
    export let dueDate = "1-1-1970";
    export let height = 50;
    export let unit = "px";
</script>

<div class="background">
    <HorizontalSplitContainer widthOne="70" widthTwo="30">
        <div slot="left">
            <div class="left" style="height: {height}{unit}">
                {name}
            </div>
        </div>
        <div slot="right">
            <div class="right" style="height: {height}{unit}">
                <div class="right-1">
                    {weight}
                </div>
                <div class="right-2">
                    {assignee}
                </div>
                <div class="right-3">
                    {dueDate}
                </div>
            </div>
        </div>
    </HorizontalSplitContainer>
</div>

<style>
    .background {
        display: flex;
        justify-content: center;
        margin: 10px;
    }

    .right {
        display: flex;
        justify-content: space-around;
        border: black solid 2px;
    }

    .left {
        border: black solid 2px;
        border-right: none;
        text-align: start;
        padding: 0 0 0 10px;
        display: flex;
        align-items: center;
    }

    .right-1, .right-2, .right-3 {
        width: 33.33%;
    }

    .right-2, .right-3 {
        border-left: black solid 2px;
    }

    * {
        align-items: center;
    }
</style>