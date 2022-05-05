import HomeLayout from "@/layout/HomeLayout.vue"

import Home from "../pages/Home.vue";
import Forms from "../pages/Forms.vue";
import Feeds from "../pages/Feeds.vue";
import FeedsMain from "../components/Feeds/Main.vue";


export default {
    HomeLayout,
    HomeChildren: { Home },
    Forms,
    Feeds,
    FeedsChildren: { FeedsMain }
}