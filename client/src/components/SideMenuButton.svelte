<script>
    export let text = "SideButton";
    export let href;
</script>

<a class="background" href={href}>
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
</style>
