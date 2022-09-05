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
import Three1TexturePage from "@/pages/three/Three1TexturePage.vue";
import Three1MaterialsPage from "@/pages/three/Three1MaterialsPage.vue";
import Three1TextPage from "@/pages/three/Three1TextPage.vue";
import Three2LightPage from "@/pages/three/Three2LightPage.vue";
import Three2ShadowPage from "@/pages/three/Three2ShadowPage.vue";
import Three2ParticlePage from "@/pages/three/Three2ParticlePage.vue";
import Three2GalaxyPage from "@/pages/three/Three2GalaxyPage.vue";
import Three2RaycastPage from "@/pages/three/Three2RaycastPage.vue";
import Three3WorldPage from "@/pages/three/Three3WorldPage.vue";
import Three3RefactoringPage from "@/pages/three/Three3RefactoringPage.vue";
import Three4ShadersPage from "@/pages/three/Three4ShadersPage.vue";



export default {
    DefaultLayout,
    EtcLayout,
    EtcChildren: { Etc, NotFound },
    FeedsLayout,
    FeedsChildren: { Feeds },
    Forms,
    ThreeLayout,
    ThreeChildren: { ThreeGeometryPage, Three1TexturePage, Three1MaterialsPage, Three1TextPage, Three2LightPage, Three2ShadowPage, Three2ParticlePage, Three2GalaxyPage, Three2RaycastPage, Three3WorldPage, Three3RefactoringPage, Three4ShadersPage },
    InteractionLayout,
    Interaction,
    InteractionChildren: { ThreejsBPortal }
}