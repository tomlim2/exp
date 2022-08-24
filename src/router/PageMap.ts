import EtcLayout from "@/layout/EtcLayout.vue"
import FeedsLayout from "@/layout/FeedsLayout.vue"
import InteractionLayout from "@/layout/InteractionLayout.vue"
import ThreeLayout from "@/layout/ThreeLayout.vue"
import DefaultLayout from "@/layout/DefaultLayout.vue"

import Etc from "../pages/Etc.vue";
import Forms from "../pages/Forms.vue";
import Feeds from "../pages/Feeds.vue";
import Interaction from "../pages/Interaction.vue";
import ThreejsBPortal from "@/sections/interaction/ThreejsBPortal.vue";
import NotFound from "../pages/NotFound.vue";

import ThreeGeometryPage from "@/pages/three/ThreeGeometryPage.vue";
import Three11TexturePage from "@/pages/three/Three11TexturePage.vue";
import Three12MaterialsPage from "@/pages/three/Three12MaterialsPage.vue";
import Three13TextPage from "@/pages/three/Three13TextPage.vue";
import Three14LightPage from "@/pages/three/Three14LightPage.vue";


export default {
    DefaultLayout,
    EtcLayout,
    EtcChildren: { Etc, NotFound },
    FeedsLayout,
    FeedsChildren: { Feeds },
    Forms,
    ThreeLayout,
    ThreeChildren: { ThreeGeometryPage, Three11TexturePage, Three12MaterialsPage, Three13TextPage, Three14LightPage },
    InteractionLayout,
    Interaction,
    InteractionChildren: { ThreejsBPortal }
}