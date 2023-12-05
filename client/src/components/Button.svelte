<script lang="ts">
    export let onClick;
    export let text = "Button";
    if(!onClick) text = "Unassigned " + text; // no idea why I'm adding this, seems smart tho

    export let width = 20;
    export let height = 30;
    export let sizeUnit = "px";
</script>

<div class="background">
    <div class="button" on:click={onClick} style="width: {width}{sizeUnit}; height: {height}{sizeUnit}">{text}</div>
</div>

<style>
    .button {
        cursor: pointer;
        background-color: #B7C100;
        border-radius: 5px;
        border: black solid 2px;
        padding: 7px 20px 7px 20px;
    }
</style>