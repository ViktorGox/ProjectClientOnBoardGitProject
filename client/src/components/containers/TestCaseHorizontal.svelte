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
    let imgSrc = "./src/assets/TestStatusIcons/Awaiting.png"
    determineIcon();

    function handleContainerClick() {
        router(`/tests/${id}`);
    }

    function determineIcon() {
        if (status === "Blocker") {
            imgSrc = "./src/assets/TestStatusIcons/Blocker.png"
        } else if (status === "Successful") {
            imgSrc = "./src/assets/TestStatusIcons/Successful.png"
        } else if (status === "Bug") {
            imgSrc = "./src/assets/TestStatusIcons/Bug.png"
        }
    }
</script>

<div class="background" on:click="{handleContainerClick}">
    <div class="data width50 hide-overflow smaller-text" style="height: {height}{unit}">
        {name}
    </div>
    <div class="data width-200-px no-word-break hide-overflow" style="height: {height}{unit}">
        {module}
    </div>
    <div class="data width-auto flex-left" style="height: {height}{unit}">
        <img src={imgSrc}>
        <div class="width-100-px no-word-break">
            {status}
        </div>
    </div>
    <div class="data width-150-px hide-overflow" style="height: {height}{unit}">
        {assignee}
    </div>
    <div class="data width-auto flex-left" style="height: {height}{unit}">
        <img src="./src/assets/Weight.png">
        <div class="width-25-px no-word-break">
            {weight}
        </div>
    </div>
    <div class="data width-100-px no-word-break" style="height: {height}{unit}">
        edit
    </div>
    <div class="data right-border width-100-px no-word-break" style="height: {height}{unit}">
        delete
    </div>
</div>

<style>
    .smaller-text{
        font-size: 14px;
    }


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
        padding: 0 10px 0 10px;
    }

    .right-border {
        border-right: black solid 2px;
    }

    .width50 {
        width: 50%;
    }

    .width-100-px {
        width: 100px;
    }

    .width-auto {
        width: auto;
        padding: 0 10px 0 0;
    }

    .width-25-px {
        width: 25px;
    }

    .width-150-px {
        width: 150px;
    }

    .width-200-px {
        width: 200px;
    }

    * {
        align-items: center;
        word-break: break-all;
    }

    .hide-overflow{
        overflow: hidden;
    }

    .no-word-break {
        word-break: keep-all;
    }

    .flex-left {
        display: flex;
        justify-content: start;
    }

    img {
        width: 30px;
        height: 30px;
        margin: 0 10px 0 10px;
    }
</style>