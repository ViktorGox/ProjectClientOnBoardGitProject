<script lang="ts">
    // import {onMount} from "svelte";
    // import {currentToken} from "../Tokenstore.ts";
    // import router from "page";
    // import Button from "../components/Button.svelte";
    //
    // export let params;
    // let username = params.username;
    // let projects = [];
    //
    // async function getProjects() {
    //     const response = await fetch(`http://localhost:3000/projects`);
    //     projects = await response.json();
    // }
    //
    // onMount(async () => {
    //     await getProjects();
    // });
    //
    // function editProjectWithId(id) {
    //     router(`/ProjectDetail/${id}`);
    // }
    //
    // async function deleteProjectWithId(id) {
    //     const response = await fetch(`http://localhost:3000/projects/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${$currentToken}` // Replace 'token' with the actual token
    //         }
    //     });
    //     const result = await response.json();
    //     console.log(result);
    //     await getProjects();
    // }
    //
    // function addNewProject() {
    //     router("/ProjectDetail");
    // }
</script>

<!--{#if projects.length > 0}-->
<!--    <main>-->

<!--        <ul>-->
<!--            {#each projects as project}-->
<!--                <li>-->
<!--                    <p> Name: {project.name} <br>-->
<!--                        Team: {project.team} <br>-->
<!--                        Last Activity: {project.LastActivity} <br>-->
<!--                    </p>-->
<!--                    <Button text="Edit" clickHandler={() => {editProjectWithId(project.id)}}/>-->
<!--                    <Button text="Delete" clickHandler={async () => {await deleteProjectWithId(project.id)}}/>-->
<!--                </li>-->

<!--            {/each}-->
<!--        </ul>-->

<!--        <Button text="Add Project" clickHandler={addNewProject}/>-->

<!--    </main>-->
<!--{/if}-->
<main>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end m-5">
        <button class="btn btn-success btn-lg "><i class="bi bi-plus-circle"></i>Add Project</button>
    </div>
    <table class="table table-striped" style="width: 80%;">
        <colgroup>
            <col style="width: 50px; min-width: 50px;">
            <col style="width: 30%; min-width: 30%;">
            <col style="width: 200px; min-width: 200px;">
            <col style="width: 150px; min-width: 150px;">

        </colgroup>
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Team</th>
            <th scope="col">Last Activity</th>
            <th scope="col">Edit</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>test</td>
            <td>Team1</td>
            <td>13 hours ago</td>
            <td><i class="bi bi-pencil-square p-2"></i><i class="bi bi-trash-fill p-2"></i></td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>vision</td>
            <td>Team2</td>
            <td>9 hours ago</td>
            <td><i class="bi bi-pencil-square p-2"></i><i class="bi bi-trash-fill p-2"></i></td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>sample test</td>
            <td>Team1</td>
            <td>5 hours ago</td>
            <td><i class="bi bi-pencil-square p-2"></i><i class="bi bi-trash-fill p-2"></i></td>
        </tr>
        </tbody>

    </table>

</main>
<style>
    table {
        display: table;
        border-collapse: separate;
        box-sizing: border-box;
        text-indent: initial;
        border-spacing: 2px;
        border-color: gray;
        margin: 5rem auto;
    }

</style>
