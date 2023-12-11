<script>
    export let testName;

    let testSteps = [
        { id: 1, name: 'Step 1', weight: 1, completed: true },
        { id: 2, name: 'Step 2', weight: 2, completed: false },
        { id: 3, name: 'Step 3', weight: 3, completed: true },
    ];
</script>

<div class="test-case-details">
    <h1>{testName}</h1>
    <button class="edit-button">Edit</button>
    <div class="header">

    </div>
    <div class="test-steps">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Completion State</th>
                </tr>
            </thead>
            <tbody>
                {#each testSteps as step (step.id)}
                    <tr>
                        <td>{step.id}</td>
                        <td>{step.name}</td>
                        <td>{step.weight}</td>
                        <td>{step.completed ? 'Completed' : 'Incomplete'}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .test-case-details {
        border: 2px solid #ccc;
        padding: 20px;
        margin: 10px;
        border-radius: 10px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
</style>