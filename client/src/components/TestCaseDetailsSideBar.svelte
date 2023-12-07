<script lang="ts">
    export let showSidebar = false;
    let testData = {
        priority: 'High',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        expectedResult: 'Expected Result Here',
        assignee: 'John Doe',
        dueDate: '2023-12-31',
        comments: 'Lorem ipsum comment...',
    };
</script>


<div id="sidebar" class:show-sidebar={showSidebar}>
    <div class="sidebar-content">
        <h2>Details</h2>
        <div>
            <strong>Priority:</strong> {testData.priority}
        </div>
        <div>
            <strong>Description:</strong> {testData.description}
        </div>
        <div>
            <strong>Expected Result:</strong> {testData.expectedResult}
        </div>
        <div>
            <strong>Assignee:</strong> {testData.assignee}
        </div>
        <div>
            <strong>Due Date:</strong> {testData.dueDate}
        </div>
        <div>
            <strong>Comments:</strong> {testData.comments}
        </div>
    </div>
</div>