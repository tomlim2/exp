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
                    path: "",
                    component: PageMap.HomeLayout,
                    children: [
                        {
                            path: "",
                            component: PageMap.HomeChildren.Home
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
                {
                    path: "/interaction",
                    component: PageMap.Interaction
                },
            ],
        },
        {
            path: "/404",
            component: PageMap.DefaultLayout,
            children: [
                { path: "", component: PageMap.HomeChildren.NotFound }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/404",
        },
    ]
})