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
    <SideMenuButton text="Test cases overview" href="/testCases" image="./src/assets/SidebarIcons/overviewIcon1.png"></SideMenuButton>
    <SideMenuButton text="Sprints" href="/projects" image="./src/assets/SidebarIcons/sprintIcon1.png"></SideMenuButton>
<!--    <VerticalButtonMenu name="Test Cases" links={hrefsTestCases} titles={titlesTestCases}></VerticalButtonMenu>-->
<!--    <VerticalButtonMenu name="Analytics" links={hrefsAnalytics} titles={titlesAnalytics} images={imagesAll}></VerticalButtonMenu>-->
<!--    <VerticalButtonMenu name="ThirdOneForExample" links={hrefsAnalytics} titles={titlesAnalytics} images={imagesHalf}></VerticalButtonMenu>-->
</div>

<style>
    .background {
        background: #248B8B;
        max-width: 100%;
        height: 100vh;
        overflow-x: hidden;
    }
</style>
