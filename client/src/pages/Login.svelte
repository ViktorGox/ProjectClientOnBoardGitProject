<script>
    import router from 'page';
    import userStore from '../stores/user';
    import {onMount} from 'svelte'
    import {fetchRequest} from "../lib/Request.js";
    import {tokenStore} from "../stores/TokenStore.js";

    let user = {};
    onMount(async () => {
        userStore.subscribe(value => user = value);
    });

    const handleSubmit = async () => {
        const response = await submit();
        if (response) {
            if (response.token) {
                router.redirect('/projects');
            }
        }
    };

    let email = '';
    let password = '';

    async function submit() {
        try {
            return fetchRequest('token', 'POST', {email, password}).then((result) => {
                $tokenStore.token = result.token;
                $userStore = result.user;
                return result;
            }).catch((e) => {
                console.log(e);
            })

        } catch (e) {
            console.log(e);
            document.querySelector('.error-message').style.display = "block";
        }
    }
</script>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Yeseva+One&display=swap"
          rel="stylesheet">
</head>

<body>
<div class="login__container">
    <form id="login" action="" on:submit|preventDefault={handleSubmit}>
        <div class="form-header">
            <h1 style="text-align:center; margin: 5rem auto;">Login</h1>
            <p class="error-message text-danger">Username or password is incorrect!</p>
        </div>


        <div class="form__control">
            <input type="text" placeholder="Enter Username" name="uname" id="email" bind:value={email} required>
            <small>Error message</small>
        </div>

        <div class="form__control">
            <input type="password" placeholder="Enter Password" name="psw" id="password" bind:value={password} required>
            <small>Error message</small>
        </div>

        <div class="submit__button">
            <button type="submit">Login</button>
        </div>
    </form>

</div>

<div class="background__image">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmOtH944W_PsijoUf1522VUMepf1ImPZPjKFnFhnNglAhTwyfJCbuqGBaYVEW9nx5kLzk&usqp=CAU"
         alt="parantion logo">
</div>
</body>

<style>
    body {
        font-size: 18px;
        max-height: 100%;
        min-width: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
        font-family: 'Montserrat', sans-serif;
    }

    .error-message {
        display: none;
    }

    .background__image {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
    }

    .login__container {
        display: block;
        position: absolute;
        width: 623px;
        height: 80%;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.25);
        border-radius: 70px;
    }

    h1, p {
        font-family: 'Yeseva One', cursive;
    }

    h1 {
        font-size: 4rem;
    }

    #login {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
    }

    label {
        display: inline-block;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 50px;
        box-sizing: border-box;
    }

    input[type=checkbox] {
        margin-top: 2rem;
        margin-left: 8px;
    }

    .submit__button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        display: inline-block;
        margin-top: 2rem;
        width: 90%;
        border-radius: 50px;
        background: #BB8700;
        color: #fff;
    }

    .form__control {
        margin-bottom: 10px;
        padding-bottom: 20px;
    }

    .form__control.success input {
        border: 5px solid #2ecc71;
    }

    .form__control.error input {
        border: 5px solid #e74c3c;
    }

    .form__control small {
        color: #e74c3c;
        position: absolute;
        margin-left: 8px;
        bottom: 0;
        left: 0;
        visibility: hidden;
    }

    .form__control .error small {
        visibility: visible;
    }

    @media screen and (max-width: 768px) {
        .login__container {
            width: 500px;
            height: 70%;
        }

        h1 {
            font-size: 3rem;
        }

        button {
            margin-top: 1rem;
        }

        input[type=checkbox] {
            margin-top: 1rem;
            margin-left: 8px;
        }
    }

    @media screen and (max-width: 480px) {
        .login__container {
            width: 100%;
            height: 70%;
        }
    }
</style>
