<script lang="ts">
import SideMenuButton from "./SideMenuButton.svelte";
import VerticalButtonMenu from "./containers/VerticalButtonMenu.svelte";

function a() {
    alert("a");
}

function b() {
    alert("b");
}

function c() {
    alert("c");
}

let array = [a,b,c];
let titles = ["a","b","c"]
</script>

<div class="background">
    <SideMenuButton text="Dashboard"></SideMenuButton>
    <VerticalButtonMenu buttonOnClicks={array} buttonTitles={titles} name="Projects"></VerticalButtonMenu>
</div>

<style>
    .background {
        background: #381D48;
        width: 250px;
        color:white;
    }
</style>
