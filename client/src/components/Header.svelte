<script lang="ts">
    export let active;
    let loggedIn = true; // Set to true or false based on your logic
    let showUserMenu = false; // Flag to control user menu visibility
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
                    <li
                            class="nav-item user-menu"
                            on:click={() => showUserMenu = !showUserMenu}
                    >
                        <a class="nav-link">
                            <i class="bi bi-person d-inline-block mx-2"></i>
                            User
                        </a>
                        {#if showUserMenu}
                            <div
                                    class="user-menu-dropdown"
                                    on:mouseleave={() => showUserMenu = false}
                            >
                                <!-- Dropdown content goes here -->
                                <a href="#" class="user-menu-item">Profile</a>
                                <a href="#" class="user-menu-item">Settings</a>
                                <a href="#" class="user-menu-item">Logout</a>
                            </div>
                        {/if}
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</nav>

<style>



    .navbar {
        background-color: #343a40; /* Dark background color for the navbar */
        padding: 10px 0;
        width: 120%
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

    .user-menu {
        position: relative;
        cursor: pointer; /* Change cursor to pointer on hover to indicate clickability */
    }

    .user-menu-dropdown {
        position: absolute;
        top: calc(100% - 5px);
        left: 0;
        display: none;
        flex-direction: column;
        background-color: #343a40; /* Adjust dropdown background color */
        border: 1px solid #dee2e6; /* Add border */
        border-radius: 0.25rem;
        z-index: 1000;
    }

    .user-menu:hover .user-menu-dropdown {
        display: flex;
    }

    .user-menu-item {
        color: #fff;
        padding: 0.5rem 1rem;
        text-decoration: none;
        display: block;
        transition: background-color 0.3s ease-in-out;
    }

    .user-menu-item:hover {
        background-color: #486080; /* Adjust hover background color */
    }
</style>
