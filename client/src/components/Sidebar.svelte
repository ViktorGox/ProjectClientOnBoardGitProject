<script>
    import SideMenuButton from "./SideMenuButton.svelte";
    import VerticalButtonMenu from "./containers/VerticalButtonMenu.svelte";

    const hrefsTestCases = ["/first","/second"]
    const titlesTestCases = ["first","second"]

    const hrefsAnalytics = ["/third","/fourth"]
    const titlesAnalytics = ["third","fourth"]

    const imagesAll = ["./src/assets/svelte.png","./src/assets/svelte.png"]
    const imagesHalf = ["","./src/assets/svelte.png"]
</script>

<div class="background">
    <SideMenuButton text="Dashboard" href="/" image="./src/assets/svelte.png"></SideMenuButton>
    <SideMenuButton text="Projects" href="projects" image="./src/assets/svelte.png"></SideMenuButton>
    <SideMenuButton text="Projects" href="projects"></SideMenuButton>
    <VerticalButtonMenu name="Test Cases" links={hrefsTestCases} titles={titlesTestCases}></VerticalButtonMenu>
    <VerticalButtonMenu name="Analytics" links={hrefsAnalytics} titles={titlesAnalytics} images={imagesAll}></VerticalButtonMenu>
    <VerticalButtonMenu name="ThirdOneForExample" links={hrefsAnalytics} titles={titlesAnalytics} images={imagesHalf}></VerticalButtonMenu>
</div>

<style>
    .background {
        background: #381D48;
        width: 250px;
    }
</style>