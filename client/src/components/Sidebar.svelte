<script>
    import SideMenuButton from "./SideMenuButton.svelte";
    import VerticalButtonMenu from "./containers/VerticalButtonMenu.svelte";

    const hrefsTestCases = ["/","/second"]
    const titlesTestCases = ["first","second"]

    const hrefsAnalytics = ["/third","/fourth"]
    const titlesAnalytics = ["third","fourth"]
</script>

<div class="background">
    <SideMenuButton text="Dashboard" href="/projects/:id"></SideMenuButton>
    <SideMenuButton text="Projects" href="/projects"></SideMenuButton>
    <SideMenuButton text="Reports" href="/projects"></SideMenuButton>
    <VerticalButtonMenu name="Test Cases" links={hrefsTestCases} titles={titlesTestCases}></VerticalButtonMenu>
    <VerticalButtonMenu name="settings" links={hrefsAnalytics} titles={titlesAnalytics}></VerticalButtonMenu>
</div>

<style>
    .background {
        background: #381D48;
        width: 250px;
    }
</style>
