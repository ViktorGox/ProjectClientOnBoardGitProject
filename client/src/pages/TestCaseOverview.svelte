<script lang="ts">
    import HorizontalSplitContainer from "../components/containers/HorizontalSplitContainer.svelte";
    import Button from "../components/Button.svelte";

    function a() {

    }
</script>

<div class="background">
    <div class="top">
        <HorizontalSplitContainer>
            <div slot="left">
                <div class="left">
                    <Button margin="0 10px 0 10px" text="Open"></Button>
                    <Button margin="0 10px 0 10px" text="Done"></Button>
                    <Button margin="0 10px 0 10px" text="All"></Button>
                </div>
            </div>
            <div slot="right">
                <div class="right">
                    <Button text="Create"></Button>
                </div>
            </div>
        </HorizontalSplitContainer>
    </div>
    <div class="bottom">

    </div>
</div>

<style>
    .top {
        background-color: #F3FF00;
        display: flex;
        justify-content: center;
    }

    .bottom {
        background: deepskyblue;
    }

    .right {
        display: flex;
        justify-content: flex-end;
    }

    .left {
        display: flex;
        flex-wrap: nowrap;
    }
</style>