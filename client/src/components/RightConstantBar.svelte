<script>
    export let assigneeName;
    export let assigneeProfilePicture;
    export let dueDate;
</script>

<div class="right-constant-bar">
    <div class="assignee-info">
        <img src={assigneeProfilePicture} alt="Assignee Profile Picture" />
        <p>{assigneeName}</p>
    </div>
    <div class="due-date">
        <p>Due Date: {dueDate}</p>
    </div>
</div>

<style>
    .right-constant-bar {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 20%;
        background-color: #f0f0f0;
        border-left: 1px solid #ccc;
        overflow-y: auto;
    }

    .assignee-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .due-date {
        text-align: center;
    }
</style>