import EtcLayout from "@/layout/EtcLayout.vue"
import FeedsLayout from "@/layout/FeedsLayout.vue"
import InteractionLayout from "@/layout/InteractionLayout.vue"
import DefaultLayout from "@/layout/DefaultLayout.vue"

import Etc from "../pages/Etc.vue";
import ThreePage from "../pages/ThreePage.vue";
import Forms from "../pages/Forms.vue";
import Feeds from "../pages/Feeds.vue";
import Interaction from "../pages/Interaction.vue";
import ThreejsBPortal from "@/sections/interaction/ThreejsBPortal.vue";
import NotFound from "../pages/NotFound.vue";



export default {
    DefaultLayout,
    EtcLayout,
    EtcChildren: { Etc, NotFound },
    FeedsLayout,
    FeedsChildren: { Feeds },
    Forms,
    ThreePage,
    InteractionLayout,
    Interaction,
    InteractionChildren: { ThreejsBPortal }
}