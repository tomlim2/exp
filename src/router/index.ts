import { createRouter, createWebHistory } from "vue-router";
import PageMap from "./PageMap";

export const route: any = [
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
                component: PageMap.ThreeLayout,
                redirect: "/webgl/threejs/journey/geometry",
                children: [
                    {
                        name: 'ThreejsGeometry',
                        path: "threejs/journey/geometry",
                        component: PageMap.ThreeChildren.ThreeGeometryPage
                    },
                    {
                        name: 'ThreejsTexture',
                        path: "threejs/journey/texture",
                        component: PageMap.ThreeChildren.Three11TexturePage
                    },
                    {
                        name: 'ThreejsMaterial',
                        path: "threejs/journey/material",
                        component: PageMap.ThreeChildren.Three12MaterialsPage
                    },
                    {
                        name: 'ThreejsText',
                        path: "threejs/journey/text",
                        component: PageMap.ThreeChildren.Three13TextPage
                    }
                    ,
                    {
                        name: 'ThreejsLight',
                        path: "threejs/journey/light",
                        component: PageMap.ThreeChildren.Three14LightPage
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

export default createRouter({
    history: createWebHistory(),
    routes: route
})