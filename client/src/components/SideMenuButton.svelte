<script>
    export let text = "SideButton";
    export let href;
    export let image;
</script>

<a class="background" href={href}>
    {#if image}
        <img src={image} alt="Side menu alt">
    {/if}
    {#if !image}
        <div class="button" style="margin-left: 15px">{text}</div>
    {:else }
        <div class="button">{text}</div>
    {/if}
</a>

<style>
    .background {
        width: 100%;
        height: 30px;
        display: flex;
        padding: 0 0 0 25px;
        align-items: center;
        text-decoration: none;
        color: white;
    }

    img {
        height: 15px;
        width: 15px;
        margin-top:0;
    }
</style>
