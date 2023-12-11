<script>
    export let comments = [];
</script>

<div class="comments-section">
    <h2>Comments</h2>
    <ul>
        {#each comments as comment (comment.id)}
            <li>
                <div class="comment-header">
                    <span>{comment.user}</span>
                    <span>{comment.timestamp}</span>
                </div>
                <p>{comment.text}</p>
                {#if comment.attachment}
                    <img src={comment.attachment} alt="Comment Attachment" />
                {/if}
            </li>
        {/each}
    </ul>
    <!-- Add a form for users to submit new comments -->
    <form>
        <textarea placeholder="Add a comment..."></textarea>
        <input type="file" accept="image/*" />
        <button type="submit">Submit</button>
    </form>
</div>

<style>
    .comments-section {
        margin-top: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 10px;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }

    img {
        max-width: 100%;
        margin-top: 10px;
    }

    form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }

    textarea {
        margin-bottom: 10px;
    }

    button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
    }
</style>