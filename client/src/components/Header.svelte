<script lang="ts">
    export let active;
    let loggedIn = true; // Set to true or false based on your logic
</script>

<nav>
    <div class="navbar navbar-dark bg-dark">
        <div class="container">
            <a
                    class:active={active === (loggedIn ? "/projects" : "/login")}
                    href={loggedIn ? "/projects" : "/login"}
                    class="navbar-brand"
            >
                {#if loggedIn}
                    Home
                {:else}
                    Login
                {/if}
            </a>

            <ul class="nav col-12 col-lg-auto">
                {#if loggedIn}
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="bi bi-bell d-inline-block mx-2"></i>
                            Notifications
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="bi bi-person d-inline-block mx-2"></i>
                            User
                        </a>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</nav>

<style>
    body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .navbar {
        background-color: #343a40; /* Dark background color for the navbar */
        padding: 10px 0;
    }

    .navbar-brand {
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff; /* White text color for the brand */
        text-decoration: none;
        transition: color 0.3s ease-in-out; /* Smooth color transition on hover */
    }

    .navbar-brand:hover {
        color: #486080; /* Yellow color on hover */
    }

    .nav {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-item {
        margin-right: 15px;
    }

    .nav-link {
        color: #fff; /* White text color for the links */
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: color 0.3s ease-in-out; /* Smooth color transition on hover */
    }

    .nav-link i {
        font-size: 1.2rem;
        margin-right: 5px;
    }

    .nav-link:hover {
        color: #486080; /* Grey color on hover */
        text-decoration: underline;
    }
</style>
