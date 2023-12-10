<script>
    import SideMenuButton from "./SideMenuButton.svelte";
    import VerticalButtonMenu from "./containers/VerticalButtonMenu.svelte";

    const hrefsTestCases = ["/first","/second"]
    const titlesTestCases = ["first","second"]

    const hrefsAnalytics = ["/third","/fourth"]
    const titlesAnalytics = ["third","fourth"]
</script>

<div class="background">
    <SideMenuButton text="Dashboard" href="/"></SideMenuButton>
    <SideMenuButton text="Projects" href="projects"></SideMenuButton>
    <SideMenuButton text="Projects" href="projects"></SideMenuButton>
    <VerticalButtonMenu name="Test Cases" links={hrefsTestCases} titles={titlesTestCases}></VerticalButtonMenu>
    <VerticalButtonMenu name="Analytics" links={hrefsAnalytics} titles={titlesAnalytics}></VerticalButtonMenu>
</div>

<style>
    .background {
        background: #381D48;
        width: 250px;
    }
</style>