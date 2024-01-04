<script>
    import router from "page";

    export let test;
    export let isHeader;
    export let index;

    export let id = 1;
    export let height = 30;
    export let unit = "px";
    let imgSrc = "./src/assets/TestStatusIcons/Awaiting.png"
    determineIcon();

    function handleContainerClick() {
        router(`/tests/${id}`);
    }

    function determineIcon() {
        if (test.status === "Blocker") {
            imgSrc = "./src/assets/TestStatusIcons/Blocker.png"
        } else if (test.status === "Passed") {
            imgSrc = "./src/assets/TestStatusIcons/Successful.png"
        } else if (test.status === "Bug") {
            imgSrc = "./src/assets/TestStatusIcons/Bug.png"
        }
    }
</script>

<div class="background {index % 2===0 ? 'whiteBG' : 'grayBG'} {isHeader ? 'pageHeader' : ''}"
     on:click="{handleContainerClick}">
    <div class="data width-30p">
        <div class="text-container">
            {test.name}
        </div>
    </div>
    <div class="data width-30p wrap">
        {#each test.modules as module}
            <div class="module">
                <div class="text-container">
                    {module}
                </div>
            </div>
        {/each}
    </div>
    <div class="data width-10p" style="height: {height}{unit}">
        <div class="text-container">
            {#if !isHeader}
                <img src={imgSrc}>
            {/if}
            {test.status}
        </div>
    </div>
    <div class="data width-10p" style="height: {height}{unit}">
        <div class="text-container">
            {test.userid}
        </div>
    </div>
    <div class="data width-10p" style="height: {height}{unit}">
        <div class="text-container">
            {#if isHeader}
                {test.weight}
            {:else}
                233
            {/if}
        </div>
    </div>
</div>

<style>
    * {
        align-items: center;
    }

    .width-30p {
        flex: 0 0 30%;
    }

    .width-10p {
        flex: 0 0 10%;
    }

    .whiteBG {
        background: #eeeeee;
    }

    .grayBG {
        background: #dadada;
    }

    .pageHeader {
        color: white;
        background: #3d3d3d;
    }

    .background {
        display: flex;
        cursor: pointer;
    }

    .data {
        display: flex;
        padding: 0 0 0 15px;
        font-size: 14px;
        overflow: hidden;
    }

    .text-container {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    img {
        width: 20px;
        height: 20px;
        margin: 0 10px 0 10px;
    }

    .module {
        background-color: rgba(0, 0, 0, 0.1);
        margin: 5px;
        padding: 0 2px 0 2px;
        border-radius: 5px;
    }

    .wrap {
        flex-wrap: wrap;
    }
</style>