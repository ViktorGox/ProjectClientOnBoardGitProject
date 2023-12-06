<script lang="ts">
    import PresetList from "../List/PresetList.svelte";
    import SideMenuButton from "../SideMenuButton.svelte";

    export let name = "Button Menu";
    export let buttonOnClicks = [];
</script>

<div class="background">
    <div class="top">
        {name}
    </div>
    <div class="buttons">
        <PresetList itemList={buttonOnClicks}>
            <div slot="item" let:item let:index>
                <SideMenuButton onClick={buttonOnClicks[index]}></SideMenuButton>
            </div>
        </PresetList>
    </div>
</div>

<style>
    .background {
        background-color: rgba(255, 255, 255, 0.5);
    }
</style>
