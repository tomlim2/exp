import { createRouter, createWebHistory } from "vue-router";
import PageMap from "./PageMap";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: PageMap.Home,
            children: [
                { path: "/", component: PageMap.HomeChildren.HomeMain }
            ]
        },
        {
            path: "/forms",
            component: PageMap.Forms
        },
        {
            path: "/feeds",
            component: PageMap.Feeds,
            children: [
                { path: "/", component: PageMap.FeedsChildren.FeedsMain }
            ]
        }
    ]
})