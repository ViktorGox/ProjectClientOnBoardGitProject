<script lang="ts">
    import router from "page";

    export let name = "Test case name";
    export let module = "Log in Page";
    export let status = "To do";
    export let assignee = "John Doe";
    export let weight = 0;

    export let id = 1;
    export let height = 50;
    export let unit = "px";

    function handleContainerClick() {
        router(`/tests/${id}`);
    }
</script>

<div class="background" on:click="{handleContainerClick}">
    <div class="data wider" style="height: {height}{unit}">
        {name}
    </div>
    <div class="data" style="height: {height}{unit}">
        {module}
    </div>
    <div class="data" style="height: {height}{unit}">
        {status}
    </div>
    <div class="data" style="height: {height}{unit}">
        {assignee}
    </div>
    <div class="data" style="height: {height}{unit}">
        {weight}
    </div>
    <div class="data" style="height: {height}{unit}">
        edit
    </div>
    <div class="data right-border" style="height: {height}{unit}">
        delete
    </div>
</div>

<style>
    .background {
        display: flex;
        justify-content: center;
        margin: 10px;
        cursor: pointer;
    }

    .data {
        display: flex;
        justify-content: space-around;
        border: black solid 2px;
        border-right: none;
        width: 15%;
    }

    .right-border {
        border-right: black solid 2px;
    }

    .wider {
        width: 50%;
    }

    * {
        align-items: center;
    }
</style>