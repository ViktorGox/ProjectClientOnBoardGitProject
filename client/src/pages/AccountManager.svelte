<script>
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";


    let roles = [];
    let users = [];
    let newUser = {
        email: "",
        password: "",
        role: ""
    };

    let showAddUserPopup = false;

    async function fetchUsers() {
        const fetchedUsers = await fetchRequest('users/mappedRoles');
        fetchedUsers.forEach((user) => {
            user.newRoleId = user.role;
        })
        users = fetchedUsers;
    }

    async function updateUserRole(user) {
        const updatedUser = {
            roleid: user.newRoleId,
        };
        await fetchRequest(`users/${user.userid}`, 'PUT', updatedUser);
        await fetchUsers();
    }


    async function deleteUser(user) {
        const confirmDelete = confirm(`Are you sure you want to delete ${user.email}?`);
        if (confirmDelete) {
            try {
                await fetchRequest(`users/${user.userid}`, 'DELETE');
                await fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    }

    async function addUser() {
        showAddUserPopup = false;
        const newUserWithRoleID = {
            email: newUser.email,
            roleid: newUser.roleid,
            password: newUser.password,
        };
        await fetchRequest('users', 'POST', newUserWithRoleID);
        await fetchUsers();

    }

    onMount(async () => {
        await fetchUsers();
        roles = await fetchRequest('userrole');
    });

</script>

<main>
    <h1 style="color: #ddd;">Account Management</h1>
    <div class="table-container">
        <table class="user-table">

            <thead>
            <tr>
                <th>Email</th>
                <th>Current Role</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {#each users as user, index}
                <tr>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <select bind:value={user.newRoleId}>
                            {#each roles as role}
                                <option value={role.roleid}>{role.name}</option>
                            {/each}
                        </select>
                    </td>

                    <td>
                        <button class="update-button" on:click={() => updateUserRole(user)}>Update Role</button>
                        <button class="delete-button" on:click={() => deleteUser(user)}>Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>

        </table>
        <button class="add-user-button" on:click={() => showAddUserPopup = true}>Add User</button>
    </div>

    {#if showAddUserPopup}
        <div class="popup">

            <label for="email">Email:</label>
            <input type="email" bind:value={newUser.email}/>

            <label for="password">Password:</label>
            <input type="password" bind:value={newUser.password}/>

            <label for="role">Role:</label>
            <select bind:value={newUser.roleid}>
                {#each roles as role}
                    <option value={role.roleid}>{role.name}</option>
                {/each}
            </select>
            <button class="add-user-button" on:click={addUser}>Add a new User</button>
            <button class="close-button" on:click={() => showAddUserPopup = false}>
                <span class="close-icon">X</span>
            </button>
        </div>
    {/if}

</main>

<style>
    main {
        text-align: center;
        margin: 0 auto;
        padding: 20px;
        background-color: #1a1a1a;
        color: #ccc;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        background-color: #333;
    }


    th, td {
        padding: 8px;
        text-align: center;
        font-family: 'Arial', sans-serif;
    }

    th {
        background-color: #4CAF50;
        color: white;
    }

    .popup {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #333;
        padding: 20px;
        border: 1px solid #ccc;
        z-index: 1000;

    }

    .add-user-button, .update-button, .delete-button {
        padding: 10px;
        margin: 5px;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        font-size: 14px;
    }

    .add-user-button {
        background-color: #4CAF50;
        width: 200px;
    }

    .update-button {
        background-color: #593fe4;
    }

    .delete-button {
        background-color: #e74c3c;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #e74c3c;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-icon {
        color: #fff; /* White color for the X */
        font-size: 16px;
        font-weight: bold;
    }
</style>
