import { defineStore } from "pinia";
import Helpers from '@/global/helpers';

// let session = localStorage.getItem('pnlst');
// if (session) {
//     session = JSON.parse(Helpers.dec(session, 1, 6));
// } else {
//     session = {
//         sidebarLayout: "default",
//         panelTheme: "default",
//         isCollapsed: false
//     };
//     localStorage.setItem('pnlst', Helpers.enc(JSON.stringify(setting), 1, 6));
// }

export const useSettingPanelStore = defineStore("setting-panel", {
    state: () => ({
        sidebarLayout: "default",
        panelTheme: "default",
        isCollapsed: false
    }),
    getters: {},
    actions: {
        setSidebarLayout(layout) {
            document.body.setAttribute("data-sidebar-layout", layout);
            this.sidebarLayout = layout;
        },
        setPanelTheme(theme) {
            document.body.setAttribute("data-theme", theme);
            this.panelTheme = theme;
        },
        setCollapsed(collapsed) {
            this.isCollapsed = collapsed;
            return localStorage.setItem("isCollapsed", this.isCollapsed);
        },
        loadSettingsFromLocalStorage() {
            const session = localStorage.getItem('pnlst');
            if (session) {
                const parsedSettings = JSON.parse(Helpers.dec(session, 1, 6));
                this.$state = parsedSettings;
                console.log(this.$state);
                document.body.setAttribute("data-sidebar-layout", this.sidebarLayout);
                document.body.setAttribute("data-theme", this.panelTheme);
            }

        },
        saveSettingsToLocalStorage(proxySetting) {
            let setting;
            if (proxySetting) {
                setting = Object.assign({}, proxySetting);
            } else {
                const session = localStorage.getItem('pnlst');
                if (session) {
                    setting = JSON.parse(Helpers.dec(session, 1, 6));
                }
            }
            localStorage.setItem('pnlst', Helpers.enc(JSON.stringify(setting), 1, 6));
        },
    },
});