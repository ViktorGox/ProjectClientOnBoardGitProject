<script lang="ts">
    export let active;
</script>

<nav>
    <div class="px-3 py-2 text-bg-dark border-bottom">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a class:active={active === "/projects"} href="/projects" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">Home
                </a>

                <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                    <li>
                        <a href="#" class="nav-link text-white">
                            <i class="bi bi-bell d-block mx-4 mb-1" width="24" height="24"></i>
                            Notifications
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">
                            <i class="bi bi-person d-block mx-2 mb-1" width="24" height="24"></i>
                            User
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
<!--    <ul>-->
<!--        <li><a class:active={active === "/"} href="/">Home</a></li>-->
<!--        <li><a class:active={active === "/about"} href="/about">About</a></li>-->
<!--    </ul>-->
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
