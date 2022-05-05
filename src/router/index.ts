import { createRouter, createWebHistory } from "vue-router";
import PageMap from "./PageMap";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: PageMap.HomeLayout,
            children: [
                { path: "", component: PageMap.HomeChildren.Home }
            ]
        },
        {
            path: "/forms",
            component: PageMap.Forms
        },
        {
            path: "/feeds",
            component: PageMap.FeedsLayout,
            children: [
                { path: "", component: PageMap.FeedsChildren.Feeds }
            ]
        }
    ]
})