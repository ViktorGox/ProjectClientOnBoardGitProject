<script>
    export let active;
</script>
<nav>
    <ul>
        <li><a class:active={active === "/"} href="/">Home</a></li>
        <li><a class:active={active === "/about"} href="/about">About</a></li>
    </ul>
</nav>

<style>
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a.active {
        font-weight: bold;
    }
</style>