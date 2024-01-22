<script>
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";

    export let testId;
    export let comments = [];
    export let selectedStep;
    export let fetchAll;

    async function handleSubmit(event) {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];

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

    let fileInput;
    let previewImage;

    function handleFileChange() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Update the previewImage source to display the selected image
                previewImage.src = e.target.result;
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        }
    }

    async function uploadFile() {
        const file = fileInput.files[0];

        if (!file) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetchRequest('test/1/teststeps/2/attachment','POST',formData)
        console.log(response);
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
        <input type="file" bind:this={fileInput} on:change={handleFileChange}>
        <img bind:this={previewImage} alt="Preview" style="max-width: 300px; max-height: 300px; margin-top: 10px;">
        <button on:click={uploadFile}>Upload File</button>
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
        margin-top: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 10px;
        cursor: pointer;
    }
</style>