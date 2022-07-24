import { createRouter, createWebHistory } from "vue-router";
import PageMap from "./PageMap";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Home',
            path: "/",
            component: PageMap.DefaultLayout,
            children: [
                {
                    path: "/",
                    component: PageMap.InteractionLayout,
                    children: [
                        {
                            name: 'InteractionPage',
                            path: "",
                            component: PageMap.Interaction
                        },

                    ]
                },
                {
                    path: "webgl",
                    component: PageMap.WebglLayout,
                    redirect: "/webgl/threejs/journey/geometry",
                    children: [
                        {
                            name: 'ThreejsJourneyGeometry',
                            path: "threejs/journey/geometry",
                            component: PageMap.ThreeJourneyChildren.ThreeJourneyGeometryPage
                        },
                        {
                            name: 'ThreejsJourneyTexture',
                            path: "threejs/journey/texture",
                            component: PageMap.ThreeJourneyChildren.ThreeJourneyTexturePage
                        }
                    ]
                },
                {
                    path: "etc",
                    component: PageMap.EtcLayout,
                    children: [
                        {
                            name: 'ETCPage',
                            path: "",
                            component: PageMap.EtcChildren.Etc
                        }]
                },

                {
                    name: 'FormPage',
                    path: "forms",
                    component: PageMap.Forms
                },

            ],
        },
        {
            name: 'ErrorPage',
            path: "/404",
            component: PageMap.DefaultLayout,
            children: [
                { path: "", component: PageMap.EtcChildren.NotFound }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "404",
        },
    ]
})