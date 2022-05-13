import HomeLayout from "@/layout/HomeLayout.vue"
import FeedsLayout from "@/layout/FeedsLayout.vue"
import DefaultLayout from "@/layout/DefaultLayout.vue"

import Home from "../pages/Home.vue";
import Forms from "../pages/Forms.vue";
import Feeds from "../pages/Feeds.vue";
import Interaction from "../pages/Interaction.vue";
import NotFound from "../pages/NotFound.vue";



export default {
    DefaultLayout,
    HomeLayout,
    HomeChildren: { Home, NotFound },
    FeedsLayout,
    FeedsChildren: { Feeds },
    Forms,
    Interaction,
}