<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld :msg="message" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
    components: {
        HelloWorld
    }
})
export default class Home extends Vue {
    message = this.$route.params.name
    mounted() {
        this.message = this.$route.params.name
    }
    @Watch('$route')
    changeMessage() {
        this.message = this.$route.params.name
    }
}
</script>
