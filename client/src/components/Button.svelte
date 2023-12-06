<script lang="ts">
    export let onClick;
    export let text = "Button";
    export let padding;
    export let margin;
</script>

<div class="background">
    <div class="button" on:click={onClick} style="margin: {margin}; padding: {padding};">{text}</div>
</div>

<style>
    .button {
        cursor: pointer;
        background-color: #B7C100;
        border-radius: 5px;
        border: black solid 2px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
</style>
