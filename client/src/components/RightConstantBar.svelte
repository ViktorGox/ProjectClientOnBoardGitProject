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
        z-index: 11;
        top: 66px;
        right: 0;
        height: 100vh;
        width: 15%;
        color: #ffffff;

        background-color: #25252b;
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