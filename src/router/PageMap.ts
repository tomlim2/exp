import Home from "../pages/Home.vue";
import HomeMain from "../components/Home/Main.vue"
import Forms from "../pages/Forms.vue";
import Feeds from "../pages/Feeds.vue";
import FeedsMain from "../components/Feeds/Main.vue";


export default {
    Home,
    HomeChildren: { HomeMain },
    Forms,
    Feeds,
    FeedsChildren: { FeedsMain }
}