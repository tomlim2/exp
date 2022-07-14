import { createRouter, createWebHistory } from "vue-router";
import PageMap from "./PageMap";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: PageMap.DefaultLayout,
            children: [
                {
                    path: "/",
                    component: PageMap.InteractionLayout,
                    children: [
                        {
                            path: "",
                            component: PageMap.Interaction
                        },

                    ]
                },
                {
                    path: "/etc",
                    component: PageMap.EtcLayout,
                    children: [
                        {
                            path: "",
                            component: PageMap.EtcChildren.Etc
                        }]
                },
                {
                    path: "/feeds",
                    component: PageMap.FeedsLayout,
                    children: [
                        {
                            path: "",
                            component: PageMap.FeedsChildren.Feeds
                        }
                    ]
                },
                {
                    path: "/forms",
                    component: PageMap.Forms
                },

            ],
        },
        {
            path: "/404",
            component: PageMap.DefaultLayout,
            children: [
                { path: "", component: PageMap.EtcChildren.NotFound }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/404",
        },
    ]
})