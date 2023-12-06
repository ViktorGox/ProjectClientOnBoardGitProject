<script lang="ts">
    import PresetList from "../List/PresetList.svelte";
    import SideMenuButton from "../SideMenuButton.svelte";

    export let name = "Button Menu";
    export let buttonOnClicks = [];
    export let buttonTitles = [];

    let showList = false;

    function toggleList() {
        showList = !showList;
    }
</script>

<div class="background">
    <div class="top" on:click={toggleList}>
        <SideMenuButton text={name}></SideMenuButton>
    </div>
    <div class="buttons" class:show={showList}>
        {#if showList}
            <PresetList itemList={buttonOnClicks}>
                <div slot="item" let:item let:index>
                    <SideMenuButton onClick={buttonOnClicks[index]} text={buttonTitles[index]}></SideMenuButton>
                </div>
            </PresetList>
        {/if}
    </div>
</div>

<style>
    .background {
        background-color: rgba(255, 255, 255, 0.5);
        user-select: none;
    }
</style>
