<template>
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="d-inline-block" id="reponsive_length">
                    <label>
                        Show 
                        <select name="reponsive_length" aria-controls="reponsive" class="form-select form-select-sm d-inline-block" style="width: auto;">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select> 
                        entries
                    </label>
                </div>
            </div>
            <div class="col-sm-12 col-md-auto ms-auto">
                <div class="input-with-icon">
                    <i class="bi bi-search"></i>
                    <input style="width: auto;" v-if="props.search" class="form-control" placeholder="Search..." v-model="state.q" ref="search"/>
                </div>
            </div>
        </div>
        <div class="row position-relative">
            <div class="col-sm-12">
                <table class="table dataTable table-striped">
                    <thead>
                        <tr>
                            <th
                                :class="{
                                    'sorting': !header.type,
                                    'sorting_asc': state.sortByKey === header.key && state.order === 'ASC',
                                    'sorting_desc': state.sortByKey === header.key && state.order === 'DESC'
                                }"
                                v-for="(header, i) in props.headers"
                                @click="handleShort(header.key, state.order === 'ASC' ? 'DESC' : 'ASC', header.dataType ? header.dataType : 'string' )"
                                :key="i"
                                :style="{ width: header.width ?? 'auto' }"
                            >
                                <span>{{ header.key }}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(item, index) in filteredItems"
                            :key="index"
                            :style="{ background: index % 2 === 0 ? '#dee2e6' : '#ffffff' }">
                            <td v-for="(value, key) in item" :key="key">{{ value }}</td>
                            <td class="">
                                <button class="btn btn-sm btn-warning me-2 rounded">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-sm btn-danger rounded">
                                    <i class="bi bi-trash"></i>
                                </button>
                                <!-- <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- <hr>
    <div class="data-table">
        <div class="filter-and-search-container">
            <div class="filter-container hidden-xs-only">
                <div v-for="(filter, i) in props.filters" :key="i">
                    <div v-if="filter.type === 'input-date'">
                        <div class="input-with-icon date-input">
                            <i class="bi bi-calendar3"></i>
                            <input
                                type="date"
                                v-model="filter.modal"
                                :min="filter.min"
                                :max="filter.max"
                            />
                        </div>
                    </div>
                    
                    <div v-else-if="filter.type === 'select-range'">
                        <select v-model="filter.modal" class="select-box">
                            <option :value="undefined">{{ filter.defaultOption }}</option>
                            <option
                                v-for="(option, j) in filter.options"
                                :value="option.value"
                                :key="j"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="input-with-icon search-input">
                <i class="bi bi-search"></i>
                <input v-if="props.search" class="form-control" placeholder="Search..." v-model="state.q" ref="search"/>
            </div>
        </div>

        <div class="data-container hidden-xs-only">
            <div
                v-for="(header, i) in props.headers"
                :key="i"
                :style="{ width: header.width ?? '0' }"
            >
                <div class="header-container">
                    <div class="header">
                        {{ header.key }}
                    </div>

                    <div
                        class="sort-buttons"
                        :style="{ visibility: header.sortable ? 'visible' : 'hidden' }"
                    >
                        <i 
                            class="bi bi-arrow-up-short" 
                            @click="state.sortByKey = header.key; state.order = 'ASC'; state.dataType = header.dataType ? header.dataType : 'string'"
                            :class="header.key === state.sortByKey && state.order === 'ASC' ? `selected-sort`: `unselected-sort`"></i>
                        
                        <i
                            @click="state.sortByKey = header.key; state.order = 'DESC'; state.dataType = header.dataType ? header.dataType : 'string'"
                            :class="header.key === state.sortByKey && state.order === 'DESC' ? `selected-sort` : `unselected-sort`"
                            class="bi bi-arrow-down-short"></i>
                    </div>
                </div>

                <div class="content-container">
                <div
                    class="content-row"
                    v-for="(item, j) in filteredItems"
                    :key="j"
                    :style="{ background: j % 2 === 0 ? '#fafafa' : '#ffffff' }"
                >
                    <div v-if="header.shorten">
                        <span
                            :id="'tooltip-' + header.key"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            :title="item[header.key]"
                            ref="tooltipActivator"
                        >
                            <template v-if="item[header.key].length > header.restrictToLen">
                                <span>{{ shortenText(item[header.key], header.restrictToLen) }}</span>
                            </template>
                            <template v-else>
                                <span>{{ item[header.key] }}</span>
                            </template>
                        </span>
                    </div>
                    <div v-else>
                        {{ item[header.key] }}
                    </div>

                    <div
                        v-if="header.type === 'actions'"
                        class="actions hidden-xs-only"
                    >
                    <div
                        v-for="(action, k) in actions"
                        :key="`action-${k}`"
                        class="loop"
                    >
                        <div v-if="action.type === 'edit'" class="content">
                            <button 
                                class="btn btn-sm" 
                                @click="openEditDialog(j, item, k)"
                                :class="{
                                    btnWarning: action.type === 'edit'
                                }">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                {{ action.name }}
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div class="mobile-content hidden-sm-and-up">
            <div v-for="(items, i) in filteredItems" class="items-row" :key="i">
                <div
                    v-for="(header, j) in headers"
                    class="header-row"
                    :key="`header-${j}`"
                >
                    <div v-if="header.type !== 'actions'" class="key-content">
                        <div class="key">{{ header.key }}</div>
                        <div class="content">{{ items[header.key] }}</div>
                    </div>
                </div>
            </div>
        </div>

        <button
            v-if="isFilterAvailable()"
            class="hidden-sm-and-up filter-float-button"
            @click="state.mobileFilterDialog = true"
        >
            <i class="bi bi-filter"></i>
        </button>
        <div class="modal" tabindex="-1" role="dialog" :style="{ display: state.editDialog ? 'block' : 'none' }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Modal</h5>
                        <button type="button" class="close" @click="state.editDialog = false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-for="(action, i) in props.actions" :key="i">
                            <div v-if="action.type === 'edit'">
                                <div
                                    v-for="(key, j) in action.key"
                                    :key="`key-${j}`"
                                    v-if="action.modal"
                                >
                                    <div class="edit-text-area">
                                    <textarea
                                        ref="edit"
                                        :placeholder="key"
                                        v-model="action.modal[key]"
                                    ></textarea>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="btn btn-primary"
                                @click="updateAction({ row: action.modal, func: action.func })"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <v-bottom-sheet v-model="mobileFilterDialog" width="300">
            <v-card class="bottom-sheet-card">
                <div class="close-n-clear-container">
                <button
                    class="hidden-sm-and-up close-filter"
                    @click="mobileFilterDialog = false"
                >
                    <i class="material-icons">
                    keyboard_arrow_down
                    </i>
                </button>

                <div class="filter-heading">Filters</div>

                <button
                    :style="{ visibility: isAnyFilterSelected ? 'visible' : 'hidden' }"
                    class="hidden-sm-and-up clear-filter"
                    @click="clearAllFilters()"
                >
                    Clear
                </button>
                </div>

                <div class="filter-container">
                <div v-for="(filter, i) in filters" :key="i">
                    <div class="filter-label">{{ filter.label }}</div>
                    <div v-if="filter.type === 'input-date'">
                    <div class="input-with-icon date-input">
                        <i class="material-icons calendar-icon">
                        calendar_today
                        </i>
                        <input
                        type="date"
                        v-model="filter.modal"
                        :min="filter.min"
                        :max="filter.max"
                        />
                    </div>
                    </div>

                    <div v-else-if="filter.type === 'select-range'">
                    <select v-model="filter.modal" class="select-box">
                        <option :value="undefined">{{ filter.defaultOption }}</option>
                        <option
                        v-for="(option, j) in filter.options"
                        :value="option.value"
                        :key="j"
                        >
                        {{ option.label }}
                        </option>
                    </select>
                    </div>
                </div>
                </div>
            </v-card>
        </v-bottom-sheet>
    </div> -->
</template>

<script setup>
    /** Url Reference */
    // https://github.dev/devatquarxss/reusable-data-table-component-vue/blob/master/components/data-table.vue
    // https://demo.adminkit.io/tables-datatables-fixed-header

    /** Import package */
    import { reactive, watch, ref, nextTick, onMounted, computed } from "vue";
    import { Tooltip } from 'bootstrap';

    /** Import global */
    import helpers from '@/global/helpers';

    /** Define props */
    const props = defineProps({
        headers: {
            type: Array,
            default: [],
        },
        items: {
            type: Array,
            default: []
        },
        filters: {
            type: Array,
            default: []
        },
        search: {
            type: Boolean,
            default: true
        },
        actions: {
            type: Array,
            default: []
        }
    });

    /** Define ref */
    const editRef = ref(null); // Create a ref to store the DOM element reference

    /**  Define props */
    let state = reactive({
        editRow: 0,
        editDialog: false,
        q: '',
        sortByKey: '',
        order: '',
        dataType: '',
        mobileFilterDialog: false,
    });

    const filteredItems = computed(() => {
        return filter(); // Replace filter() with the appropriate function call
    });

    const isAnyFilterSelected = computed(() => {
        return isFilterSelected(); // Replace isFilterSelected() with the appropriate function call
    });

    /**  Define method */
    const filter = () => {
        let arrOfItems = []
        for (let i in props.filters) {
            let filter = props.filters[i];
            if (filter.modal) {
                arrOfItems.push([])
                let itemsIndex = arrOfItems.length - 1
                for (let j in props.items) {
                    let item = props.items[j]
                    if (filter.type === 'input-date') {
                        if (item[filter.key].includes(filter.modal)) {
                            arrOfItems[itemsIndex].push(JSON.stringify(item)) // 1
                        }
                    }
                    if (filter.type === 'select-range') {
                        if (
                            parseFloat(filter.modal.min) <= parseFloat(item[filter.key]) &&
                            parseFloat(filter.modal.max) >= parseFloat(item[filter.key])
                        ) {
                            arrOfItems[itemsIndex].push(JSON.stringify(item)) // 2
                        }
                    }
                }
            }
        }

        let filteredItems = []
        if (arrOfItems.length === 0) {
            filteredItems = props.items
        }
        else {
            let isAnyOneItemsArrEmpty = false
            for (let i in arrOfItems) {
                let items = arrOfItems[i]
                if (items.length === 0) {
                    isAnyOneItemsArrEmpty = true
                }
            }

            if (isAnyOneItemsArrEmpty) {
                filteredItems = []
            } else {
                if (arrOfItems.length === 1) {
                    filteredItems = arrOfItems[0]
                } else {
                    filteredItems = helpers.INTERSECTION({ arrOfArr: arrOfItems })
                }
            }
        }

        let parsedItems = []
        for (let i in filteredItems) {
            let item = filteredItems[i]

            if (typeof item === 'string') {
                item = JSON.parse(item)
            }

            parsedItems.push(item)
        }

        let searchedItems = []
        if (state.search && state.q.length > 0) {
            for (let i in parsedItems) {
                let item = parsedItems[i];
                let isMatch = false
                for (let key in item) {
                    let val = JSON.stringify(item[key])
                    if (val.toLowerCase().includes(state.q.toLowerCase())) {
                        isMatch = true
                    }
                }

                if (isMatch) {
                    searchedItems.push(item)
                }
            }
        } else {
            searchedItems = parsedItems
        }

        // SORT
        let sortedArr;
        if (state.sortByKey.length > 0) {
            sortedArr = helpers.sortArrOfObj({
                arr: searchedItems,
                key: state.sortByKey,
                order: state.order,
                dataType: state.dataType
            })
        } else {
            sortedArr = searchedItems
        }

        return sortedArr
    };

    // Function to shorten text
    const shortenText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const handleShort = (headerKey, orderType, dataType) => {
        state.sortByKey = headerKey; 
        state.order = orderType; 
        state.dataType = dataType ? dataType : 'string'
    }

    const openEditDialog = (index, item, k) => {
        state.editDialog = true;
        state.editRow = index;
        props.actions[k].modal = { ...item }; // Using spread syntax to create a shallow copy
    };

    const initDefaultSort = () => {
        for (let i in props.headers) {
            let header = props.headers[i]

            if (header.defaultSortBy) {
                state.sortByKey = header.key
                state.order = header.defaultOrder
            }
        }
    };

    const editAction = ({ row, func }) => {
        console.log(row);
        func({ row, index: row.dbIndex, vm: this })
    };

    const isFilterAvailable = () => {
        if (props.filters) {
            if (props.filters.length === 0) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    };

    const isFilterSelected = () => {
        if (props.filters) {
            for (let i in props.filters) {
                let filter = props.filters[i]

                if (filter.modal) {
                    if (JSON.stringify(filter.modal).length > 0) {
                        return true
                    }
                }
            }
        }
        return false
    };

    // Initialize Bootstrap tooltips
    onMounted(() => {
        initDefaultSort(); // Call the function to initialize default sorting when the component is mounted

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl);
        });
    });

    watch(() => state.editDialog, (newValue) => {
        if (newValue) {
            nextTick(() => {
                if (editRef.value) {
                    editRef.value.focus();
                }
            });
        }
    });
</script>

<style lang="scss" scoped>
    @mixin font($size, $color, $weight) {
        font-size: $size;
        color: $color;
        font-weight: $weight;
    }

    .data-table {
        // action column
        .actions {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            .loop {
                .content {

                    margin: {
                        left: 0.1em;
                        right: 0.1em;
                    }

                    .icon {
                        @include font(1em, #666666, normal);
                        position: relative;
                        top: 0.2em;
                        cursor: pointer;
                        margin-right: 0.2em;
                    }
                }
            }
        }
        // /action column
    }

    // Edit MODAL
    .edit-modal-card {
        height: 18em;

        .edit-text-area {
            padding: 1.4em;

            textarea {
                height: 16.2em;
            }
        }

        .flat-top-border-button {
            @include font(0.8em, #666666, 600);
            border-top: 1px solid #efefef;
            width: 100%;
            position: absolute;
            bottom: 0;
            height: 2.8em;
            outline: none;
        }
        .data-container {
            box-shadow: 0 1px 13px 0 rgba(0, 0, 0, 0.23);
            background-color: #ffffff;
            border-radius: 2px;

            position: relative;
            display: flex;
            max-height: 70vh;
            overflow-y: scroll;

            // CONTENT
            .content-container {
                .content-row {
                    @include font(0.7em, inherit, normal);
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    height: 4em;
                    border-bottom: 1px solid #eeeeee;
                    padding: {
                        top: 0.3em;
                        bottom: 0.3em;
                        right: 2em;
                        left: 2em;
                    }
                    border-radius: 2px;
                }
            }
            // CONTENT
        }

        // HEADERS
        .header-container {
            display: flex;
            align-items: center;
            justify-content: start;

            font-family: Avenir;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 0.5em;

            .header {
                @include font(0.919em, #666666, 600);
            }

            padding: {
                right: 1.4em;
                left: 1.4em;
                top: 1em;
            };

            .sort-buttons {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                position: relative;
                cursor: pointer;

                .selected-sort {
                    color: #333333;
                    z-index: 1;
                }

                .unselected-sort {
                    color: #999999;
                    z-index: 2;
                }

                .up {
                    margin-bottom: -0.36em;
                }

                .down {
                    margin-top: -0.36em;
                }
            }

        }
        // /HEADERS
    }
    .mobile-content {
        .items-row {
        border-bottom: 1px solid #f5f5f5;
        border-radius: 10px;
        background: #ffffff;
        box-shadow: 0px 1px 13px 0 rgba(0, 0, 0, 0.23);

        padding: 1em;
        margin-top: 1em;

        .header-row {

            .key-content {
            display: flex;
            align-items: flex-start;

            padding: {
                top: 0.2em;
                bottom: 0.2em;
            };

            .key {
                width: 36%;

                @include font(0.919em, #333333, 600);
            }
            .content {
                width: 64%;

                @include font(0.919em, #666666, 400);
            }
            }
        }
        }
    }

    $mobileFilterFont: 16px;
    // Filter and search
    .filter-and-search-container {
        width: 100%;
        @media screen and (max-width: 600px) {
            justify-content: space-between;
        }
        margin-top: 1em;
        margin-bottom: 1em;

        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .filter-container {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            @media screen and (max-width: 600px) {
                width: 100%;
                justify-content: space-between;
            }
        }
    }
    // /Filter and search

    .input-with-icon {
        display: flex;
        align-items: center;
        position: relative;

        i {
            @include font(1em, #888888, 600);
            position: absolute;
            left: 0.7em;
        }

        @media screen and (min-width: 600px) {
            margin: 0.2em;
        }

    }

    // select
    .select-box {
        @media screen and (max-width: 600px) {
            @include font($mobileFilterFont, #333333, 600);
            margin-bottom: 1em;
            width: 100%;
            select {
                width: 100%;
            }
        }
        @media screen and (min-width: 600px) {
            margin:0.2em;
        }
    }


    // inputs
    .date-input {
        @media screen and (max-width: 600px) {
            i {
                @include font(18px, #333333, 600);
            }
            margin-bottom: 1em;
            width: 100%;
            input {
                @include font($mobileFilterFont, #333333, 600);
                width: 100%;
            }
        }

        input{
            min-height: 2.1em;
        }

        .calendar-icon {
            margin-top: -1px;
        }
    }

    .search-input {
        @media screen and (max-width: 600px) {
            i {
                @include font(18px, #333333, 600);
            }

        // margin-top: 1em;
            width: 100%;
            input {
                @include font($mobileFilterFont, #333333, 600);
                width: 100%;
            }
        }
    }

    // mobile specific
    .filter-float-button {
        position: fixed;
        bottom: 1em;
        right: 1em;
        background: #666666;
        height: 3em;
        width: 3em;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        cursor: pointer;

        i {
            @include font(1.4em, #ffffff, 500);
        }
    }

    .bottom-sheet-card {
        .filter-container {
            flex-wrap: wrap;
            max-height: 48vh;
            overflow-y: scroll;

            padding: {
                left: 1.2em;
                right: 1.2em;
                top: 0.6em;
                bottom: 0.3em;
            };
        }

        .filter-label {
            @include font(1.1em, #666666, 600);
        }
    }

    .close-n-clear-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0.1em 1.2em;
        background: #fafafa;

        .close-filter {
            height: 2.5em;
            width: 2.5em;
            border-radius: 100px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            outline: none;
            cursor: pointer;

            i {
                @include font(1.6em, #ff4a50, 600);
            }
        }

        .filter-heading {
            @include font(1.2em, #333333, 600);
        }

        .clear-filter {
            @include font(1.1em, #ff4a50, 600);
            height: 2.5em;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            outline: none;
            cursor: pointer;
            padding-left: 0.6em;
            border-radius: 2px;
        }
    }
    // /mobile specific

    input {
        @include font(0.818em, #666666, 600);
        min-width: 15em;
        outline: none;
        border: 1px solid #d7d7d7;
        border-radius: 2px;
        height: 2.3em;
        padding: 0 0.2em 0 2.5em;
        //padding: 0.4em 0.2em 0.28em 2.5em;
        text-align: left;
        -webkit-appearance: none;
        background: white;
    }

    table.dataTable thead > tr > th.sorting {
        cursor: pointer;
        padding-right: 26px;
        position: relative;
    }
</style>