<script>
    import SideMenuButton from "./SideMenuButton.svelte";
    import VerticalButtonMenu from "./containers/VerticalButtonMenu.svelte";

    const hrefsTestCases = ["/first", "/second"];
    const titlesTestCases = ["First", "Second"];

    const hrefsAnalytics = ["/third", "/fourth"];
    const titlesAnalytics = ["Third", "Fourth"];

    const imagesAll = ["./src/assets/svelte.png", "./src/assets/svelte.png"];
    const imagesHalf = ["", "./src/assets/svelte.png"];
</script>

<div class="background">
    <div class="menu">
        <SideMenuButton text="Dashboard" href="/" image="./src/assets/svelte.png"></SideMenuButton>
        <SideMenuButton text="Projects" href="projects" image="./src/assets/svelte.png"></SideMenuButton>
        <SideMenuButton text="Projects" href="projects" image="./src/assets/svelte.png"></SideMenuButton>
    </div>

    <VerticalButtonMenu name="Test Cases" links={hrefsTestCases} titles={titlesTestCases}></VerticalButtonMenu>
    <VerticalButtonMenu name="Analytics" links={hrefsAnalytics} titles={titlesAnalytics} images={imagesAll}></VerticalButtonMenu>
    <VerticalButtonMenu name="Example" links={hrefsAnalytics} titles={titlesAnalytics} images={imagesHalf}></VerticalButtonMenu>
</div>

<style>
    .background {
        background: #2c3e50;
        width: 20rem;
        height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        color: #ecf0f1;
    }

    .menu {
        margin-bottom: .2rem;
    }

</style>
