<template>
    <div class="wrapper">
        <!-- Sidebar Page -->
        <SidebarPanel :isCollapsed="isCollapsed" />
        <div class="main">
            <!-- Header Page -->
            <NavbarPanel  @handleSidebar="handleSidebar()"/>
            <main class="content">
                <router-view></router-view>
            </main>
            <!-- Footer Page -->
            <FooterPanel />
        </div>
    </div>
    <SettingPanel v-if="isDevelopment" />
</template>

<script setup>
    /** Import custom css */
    import '@/assets/css/logged-light.css';
    
    /** Import package */
    import { ref, computed, onMounted, watch } from 'vue';
    
    /** Import store */
    import { useSettingPanelStore } from "@/stores";

    /** Import components */
    import SettingPanel from '@/components/organisms/logged/SettingModal.vue';
    import SidebarPanel from '@/components/organisms/logged/SidebarPage.vue';
    import NavbarPanel from '@/components/organisms/logged/NavbarPage.vue';
    import FooterPanel from '@/components/organisms/logged/FooterPage.vue';

    
    
    /**  Define variables and store */
    const settingPanelStore = useSettingPanelStore();

    const isDevelopment = computed(() => import.meta.env.VITE_APP_ENV === 'local');
    const isCollapsed = ref(settingPanelStore.isCollapsed);
    
    /** Define method */
    const handleSidebar = () => {
        isCollapsed.value = !isCollapsed.value;
        settingPanelStore.setCollapsed(isCollapsed.value);
    };

    // Load settings from local storage when the app starts
    onMounted(() => {
        if (import.meta.env.VITE_APP_ENV === 'local') {
            settingPanelStore.loadSettingsFromLocalStorage();
        }
    });

    watch(settingPanelStore.$state, (newValue, oldValue) => {
        settingPanelStore.saveSettingsToLocalStorage(newValue);
    });
    
</script>

<style></style>