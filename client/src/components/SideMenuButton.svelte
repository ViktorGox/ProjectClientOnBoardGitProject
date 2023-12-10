<script>
    export let text = "SideButton";
    export let href;
    export let image;
</script>

<a class="background" href={href}>
    <img src={image}>
    {#if !image}
        <div class="button" style="margin-left: 15px">{text}</div>
    {/if}
    <div class="button">{text}</div>
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
    }
</style>
