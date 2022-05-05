import HomeLayout from "@/layout/HomeLayout.vue"
import FeedsLayout from "@/layout/FeedsLayout.vue"

import Home from "../pages/Home.vue";
import Forms from "../pages/Forms.vue";
import Feeds from "../pages/Feeds.vue";


export default {
    HomeLayout,
    HomeChildren: { Home },
    FeedsLayout,
    FeedsChildren: { Feeds },
    Forms,
}