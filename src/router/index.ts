import { createRouter, createWebHistory } from "vue-router";
import PageMap from "./PageMap";

export const route: any = [
    {
        name: 'Showcase',
        path: "/",
        component: PageMap.DefaultLayout,
        children: [
            {
                path: "/",
                component: PageMap.EtcLayout,
                children: [
                    {
                        name: 'ETCPage',
                        path: "",
                        component: PageMap.EtcChildren.Etc
                    }]
            },
            {
                path: "webgl",
                component: PageMap.ThreeLayout,
                redirect: "/webgl/threejs/journey/sea",
                children: [
                    {
                        name: 'ThreejsSea',
                        path: "threejs/journey/sea",
                        component: PageMap.ThreeChildren.Three4Sea
                    },
                    {
                        name: 'ThreejsPatterns',
                        path: "threejs/journey/patterns",
                        component: PageMap.ThreeChildren.Three4ShaderPatternsPage
                    },
                    {
                        name: 'ThreejsChecker',
                        path: "threejs/journey/checker",
                        component: PageMap.ThreeChildren.Three0CheckerBoardPage
                    },
                    {
                        name: 'ThreejsShader',
                        path: "threejs/journey/shader",
                        component: PageMap.ThreeChildren.Three4ShadersPage
                    },
                    {
                        name: 'ThreejsRefactor',
                        path: "threejs/journey/refactor",
                        component: PageMap.ThreeChildren.Three3RefactoringPage
                    },
                    {
                        name: 'ThreejsWorld',
                        path: "threejs/journey/world",
                        component: PageMap.ThreeChildren.Three3WorldPage
                    },
                    {
                        name: 'ThreejsRayCast',
                        path: "threejs/journey/raycast",
                        component: PageMap.ThreeChildren.Three2RaycastPage
                    },
                    {
                        name: 'ThreejsGeometry',
                        path: "threejs/journey/geometry",
                        component: PageMap.ThreeChildren.ThreeGeometryPage
                    },
                    {
                        name: 'ThreejsTexture',
                        path: "threejs/journey/texture",
                        component: PageMap.ThreeChildren.Three1TexturePage
                    },
                    {
                        name: 'ThreejsMaterial',
                        path: "threejs/journey/material",
                        component: PageMap.ThreeChildren.Three1MaterialsPage
                    },
                    {
                        name: 'ThreejsText',
                        path: "threejs/journey/text",
                        component: PageMap.ThreeChildren.Three1TextPage
                    },
                    {
                        name: 'ThreejsLight',
                        path: "threejs/journey/light",
                        component: PageMap.ThreeChildren.Three2LightPage
                    },
                    {
                        name: 'ThreejsShadow',
                        path: "threejs/journey/shadow",
                        component: PageMap.ThreeChildren.Three2ShadowPage
                    },
                    {
                        name: 'ThreejsParticle',
                        path: "threejs/journey/particle",
                        component: PageMap.ThreeChildren.Three2ParticlePage
                    },
                    {
                        name: 'ThreejsGalaxy',
                        path: "threejs/journey/galaxy",
                        component: PageMap.ThreeChildren.Three2GalaxyPage
                    }
                ]
            },
            {
                path: "showcase",
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