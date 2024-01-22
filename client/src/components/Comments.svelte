<script>
    import {fetchRequest} from "../lib/Request.js";

    export let testId;
    export let comments = [];
    export let selectedStep;
    export let fetchAll;

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const image = (formData.get('image'));
        // const requestFileBody={
        //     file: image
        // }
        const requestCommentBody = {
            testlog: formData.get('comment'),
        };
        console.log(image);
        try {
            // const imageResponse = await fetchRequest('/test/'+testId+'/teststeps/', {
            //     method: 'POST',
            //     body: image,
            // });

            if (selectedStep!=null){
                console.log(requestCommentBody);
                const textResponse =  fetchRequest('test/' + testId + '/teststeps/' + selectedStep.stepid+'?combinatory=true', 'PUT',requestCommentBody);
                if (textResponse.status=200) {
                    console.log('Comment submitted successfully');
                    setTimeout(() => {
                        console.log("this is the third message");
                    }, 3000);
                    await fetchAll();
                } else {
                    // Handle error
                    console.error('Failed to submit comment');
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

<div class="comments-section">
    <h2>Change Test Log</h2>
    <ul>
        {#each comments as comment (comment.id)}
            <li>
                <div class="comment-header">
                    <span>{comment.user}</span>
                    <span>{comment.timestamp}</span>
                </div>
                <p>{comment.text}</p>
                {#if comment.attachment}
                    <img src={comment.attachment} alt="Comment Attachment"/>
                {/if}
            </li>
        {/each}
    </ul>
    <form on:submit={handleSubmit}>
        <textarea name="comment" placeholder="Add a comment..."></textarea>
        <input type="file" accept="image/*" name="image"/>
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
        padding: 10px 15px;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
    }
    button:hover{
        background-color: #0056b3;
    }
</style>