<script lang="ts">
    export let onClick;
    export let text = "SideButton";
</script>

<div class="background">
    <div class="button" on:click={onClick}>{text}</div>
</div>

<style>
    .background {
        background-color: rgba(255,255,255,0.5);
        width: 100%;
        height: 30px;
        display: flex;
        padding: 0 0 0 25px;
        align-items: center;
        /*border-bottom: 2px solid white;*/
    }
</style>
