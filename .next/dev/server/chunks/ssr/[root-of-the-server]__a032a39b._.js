module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/configs/themeConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Type Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const themeConfig = {
    templateName: 'NestQuest',
    homePageUrl: '/select-role',
    settingsCookieName: 'nest-quest-theme',
    mode: 'light',
    skin: 'default',
    semiDark: false,
    layout: 'vertical',
    layoutPadding: 24,
    compactContentWidth: 1440,
    navbar: {
        type: 'fixed',
        contentWidth: 'compact',
        floating: true,
        detached: true,
        blur: true
    },
    contentWidth: 'compact',
    footer: {
        type: 'static',
        contentWidth: 'compact',
        detached: true
    },
    disableRipple: false
};
const __TURBOPACK__default__export__ = themeConfig;
}),
"[project]/src/configs/primaryColorConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const primaryColorConfig = [
    {
        name: 'primary-1',
        light: '#8F85F3',
        main: '#7367F0',
        dark: '#675DD8'
    }
];
const __TURBOPACK__default__export__ = primaryColorConfig;
}),
"[project]/src/@core/hooks/useObjectCookie.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useObjectCookie",
    ()=>useObjectCookie
]);
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2f$esm$2f$useCookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useCookie$3e$__ = __turbopack_context__.i("[project]/node_modules/react-use/esm/useCookie.js [app-ssr] (ecmascript) <export default as useCookie>");
;
;
const useObjectCookie = (key, fallback)=>{
    // Hooks
    const [valStr, updateCookie] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2f$esm$2f$useCookie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useCookie$3e$__["useCookie"])(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>valStr ? JSON.parse(valStr) : fallback, [
        valStr
    ]);
    const updateValue = (newVal)=>{
        updateCookie(JSON.stringify(newVal));
    };
    return [
        value,
        updateValue
    ];
};
}),
"[project]/src/@core/contexts/settingsContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsContext",
    ()=>SettingsContext,
    "SettingsProvider",
    ()=>SettingsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/themeConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$primaryColorConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/primaryColorConfig.ts [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useObjectCookie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/hooks/useObjectCookie.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const SettingsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const SettingsProvider = (props)=>{
    // Initial Settings
    const initialSettings = {
        mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mode,
        skin: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].skin,
        semiDark: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].semiDark,
        layout: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layout,
        navbarContentWidth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].navbar.contentWidth,
        contentWidth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].contentWidth,
        footerContentWidth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.contentWidth,
        primaryColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$primaryColorConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"][0].main
    };
    const updatedInitialSettings = {
        ...initialSettings,
        mode: props.mode || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mode
    };
    // Cookies
    const [settingsCookie, updateSettingsCookie] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useObjectCookie$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useObjectCookie"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].settingsCookieName, JSON.stringify(props.settingsCookie) !== '{}' ? props.settingsCookie : updatedInitialSettings);
    // State
    const [_settingsState, _updateSettingsState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(JSON.stringify(settingsCookie) !== '{}' ? settingsCookie : updatedInitialSettings);
    const updateSettings = (settings, options)=>{
        const { updateCookie = true } = options || {};
        _updateSettingsState((prev)=>{
            const newSettings = {
                ...prev,
                ...settings
            };
            // Update cookie if needed
            if (updateCookie) updateSettingsCookie(newSettings);
            return newSettings;
        });
    };
    /**
   * Updates the settings for page with the provided settings object.
   * Updated settings won't be saved to cookie hence will be reverted once navigating away from the page.
   *
   * @param settings - The partial settings object containing the properties to update.
   * @returns A function to reset the page settings.
   *
   * @example
   * useEffect(() => {
   *     return updatePageSettings({ theme: 'dark' });
   * }, []);
   */ const updatePageSettings = (settings)=>{
        updateSettings(settings, {
            updateCookie: false
        });
        // Returns a function to reset the page settings
        return ()=>updateSettings(settingsCookie, {
                updateCookie: false
            });
    };
    const resetSettings = ()=>{
        updateSettings(initialSettings);
    };
    const isSettingsChanged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>JSON.stringify(initialSettings) !== JSON.stringify(_settingsState), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        _settingsState
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsContext.Provider, {
        value: {
            settings: _settingsState,
            updateSettings,
            isSettingsChanged,
            resetSettings,
            updatePageSettings
        },
        children: props.children
    }, void 0, false, {
        fileName: "[project]/src/@core/contexts/settingsContext.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/@core/hooks/useSettings.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSettings",
    ()=>useSettings
]);
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Context Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$contexts$2f$settingsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/contexts/settingsContext.tsx [app-ssr] (ecmascript)");
;
;
const useSettings = ()=>{
    // Hooks
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$contexts$2f$settingsContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SettingsContext"]);
    if (!context) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }
    return context;
};
}),
"[project]/src/components/theme/ModeChanger.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProviderWithVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/ThemeProviderWithVars.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2f$esm$2f$useMedia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useMedia$3e$__ = __turbopack_context__.i("[project]/node_modules/react-use/esm/useMedia.js [app-ssr] (ecmascript) <export default as useMedia>");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/hooks/useSettings.tsx [app-ssr] (ecmascript)");
;
;
;
;
const ModeChanger = ({ systemMode })=>{
    // Hooks
    const { setMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProviderWithVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useColorScheme"])();
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    const isDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2f$esm$2f$useMedia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useMedia$3e$__["useMedia"])('(prefers-color-scheme: dark)', systemMode === 'dark');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (settings.mode) {
            if (settings.mode === 'system') {
                setMode(isDark ? 'dark' : 'light');
            } else {
                setMode(settings.mode);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        settings.mode
    ]);
    return null;
};
const __TURBOPACK__default__export__ = ModeChanger;
}),
"[next]/internal/font/google/public_sans_c04fba6f.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "public_sans_c04fba6f-module__czALtq__className",
});
}),
"[next]/internal/font/google/public_sans_c04fba6f.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_c04fba6f$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/public_sans_c04fba6f.module.css [app-ssr] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_c04fba6f$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Public Sans', 'Public Sans Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_c04fba6f$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_c04fba6f$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/@core/theme/overrides/accordion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const accordion = (skin)=>({
        MuiAccordion: {
            defaultProps: {
                ...skin === 'bordered' && {
                    variant: 'outlined'
                }
            },
            styleOverrides: {
                root: ({ theme })=>({
                        transition: theme.transitions.create([
                            'margin',
                            'border-radius',
                            'box-shadow'
                        ]),
                        '&:not(:last-child)': {
                            marginBlockEnd: theme.spacing(2)
                        },
                        borderRadius: 'var(--mui-shape-borderRadius)',
                        ...skin !== 'bordered' && {
                            boxShadow: 'var(--mui-customShadows-xs)'
                        },
                        '&:before': {
                            content: 'none'
                        },
                        '&.Mui-expanded': {
                            ...skin !== 'bordered' && {
                                boxShadow: 'var(--mui-customShadows-md)'
                            },
                            marginBlockStart: 0
                        }
                    })
            }
        },
        MuiAccordionSummary: {
            defaultProps: {
                expandIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "tabler-chevron-right"
                }, void 0, false, {
                    fileName: "[project]/src/@core/theme/overrides/accordion.tsx",
                    lineNumber: 38,
                    columnNumber: 19
                }, ("TURBOPACK compile-time value", void 0))
            },
            styleOverrides: {
                root: ({ theme })=>({
                        minHeight: 46,
                        padding: theme.spacing(3, 5),
                        paddingInlineStart: theme.spacing(6),
                        gap: theme.spacing(2),
                        color: 'var(--mui-palette-text-primary)',
                        '&.Mui-expanded': {
                            minHeight: 46,
                            '& .MuiAccordionSummary-expandIconWrapper': {
                                transform: 'rotate(90deg)'
                            }
                        },
                        '& .MuiAccordionSummary-expandIconWrapper': {
                            transform: theme.direction === 'rtl' && 'rotate(180deg)'
                        },
                        '& .MuiTypography-root': {
                            color: 'inherit',
                            fontWeight: theme.typography.fontWeightMedium
                        }
                    }),
                content: {
                    margin: '0 !important'
                },
                expandIconWrapper: {
                    color: 'var(--mui-palette-text-primary)',
                    fontSize: '1.25rem',
                    '& i, & svg': {
                        fontSize: 'inherit'
                    }
                }
            }
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(6),
                        paddingTop: theme.spacing(0),
                        '& .MuiTypography-root': {
                            color: 'var(--mui-palette-text-secondary)'
                        }
                    })
            }
        }
    });
const __TURBOPACK__default__export__ = accordion;
}),
"[project]/src/@core/theme/overrides/alert.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// React Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const alerts = {
    MuiAlert: {
        defaultProps: {
            iconMapping: {
                error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "tabler-alert-circle"
                }, void 0, false, {
                    fileName: "[project]/src/@core/theme/overrides/alert.tsx",
                    lineNumber: 11,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0)),
                warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "tabler-alert-triangle"
                }, void 0, false, {
                    fileName: "[project]/src/@core/theme/overrides/alert.tsx",
                    lineNumber: 12,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0)),
                info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "tabler-info-circle"
                }, void 0, false, {
                    fileName: "[project]/src/@core/theme/overrides/alert.tsx",
                    lineNumber: 13,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0)),
                success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "tabler-circle-check"
                }, void 0, false, {
                    fileName: "[project]/src/@core/theme/overrides/alert.tsx",
                    lineNumber: 14,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0))
            }
        },
        styleOverrides: {
            root: ({ theme })=>({
                    padding: theme.spacing(3, 4),
                    gap: theme.spacing(4),
                    ...theme.typography.body1,
                    '&:not(:has(.MuiAlertTitle-root))': {
                        '& .MuiAlert-icon + .MuiAlert-message': {
                            alignSelf: 'center'
                        }
                    },
                    variants: [
                        {
                            props: {
                                variant: 'standard',
                                severity: 'error'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-error-main)',
                                    color: 'var(--mui-palette-error-contrastText)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'standard',
                                severity: 'warning'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-warning-main)',
                                    color: 'var(--mui-palette-warning-contrastText)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'standard',
                                severity: 'info'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-info-main)',
                                    color: 'var(--mui-palette-info-contrastText)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'standard',
                                severity: 'success'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-success-main)',
                                    color: 'var(--mui-palette-success-contrastText)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                severity: 'error'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-error-main)',
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-error-lightOpacity)',
                                    color: 'var(--mui-palette-error-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                severity: 'warning'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-warning-main)',
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-warning-lightOpacity)',
                                    color: 'var(--mui-palette-warning-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                severity: 'info'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-info-main)',
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-info-lightOpacity)',
                                    color: 'var(--mui-palette-info-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                severity: 'success'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-success-main)',
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-success-lightOpacity)',
                                    color: 'var(--mui-palette-success-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                severity: 'error'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-common-white)',
                                    color: 'var(--mui-palette-error-main)',
                                    boxShadow: 'var(--mui-customShadows-xs)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                severity: 'warning'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-common-white)',
                                    color: 'var(--mui-palette-warning-main)',
                                    boxShadow: 'var(--mui-customShadows-xs)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                severity: 'info'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-common-white)',
                                    color: 'var(--mui-palette-info-main)',
                                    boxShadow: 'var(--mui-customShadows-xs)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                severity: 'success'
                            },
                            style: {
                                '& .MuiAlert-icon': {
                                    backgroundColor: 'var(--mui-palette-common-white)',
                                    color: 'var(--mui-palette-success-main)',
                                    boxShadow: 'var(--mui-customShadows-xs)'
                                }
                            }
                        }
                    ]
                }),
            icon: {
                padding: 0,
                margin: 0,
                minInlineSize: 30,
                blockSize: 30,
                borderRadius: 'var(--mui-shape-borderRadius)',
                alignItems: 'center',
                justifyContent: 'center',
                '& i, & svg': {
                    fontSize: 'inherit'
                }
            },
            message: {
                padding: 0
            },
            action: {
                padding: 0,
                marginRight: 0
            }
        }
    },
    MuiAlertTitle: {
        styleOverrides: {
            root: ({ theme })=>({
                    fontSize: theme.typography.h5.fontSize,
                    lineHeight: 1.33333,
                    marginTop: 0,
                    marginBottom: theme.spacing(1),
                    color: 'inherit'
                })
        }
    }
};
const __TURBOPACK__default__export__ = alerts;
}),
"[project]/src/@core/theme/overrides/autocomplete.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// React Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const autocomplete = (skin)=>({
        MuiAutocomplete: {
            defaultProps: {
                ...skin === 'bordered' && {
                    slotProps: {
                        paper: {
                            variant: 'outlined'
                        }
                    }
                },
                ChipProps: {
                    size: 'small'
                },
                popupIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "tabler-chevron-down"
                }, void 0, false, {
                    fileName: "[project]/src/@core/theme/overrides/autocomplete.tsx",
                    lineNumber: 23,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0))
            },
            styleOverrides: {
                root: {
                    '& .MuiButtonBase-root.Mui-disabled i, & .MuiButtonBase-root.Mui-disabled svg': {
                        color: 'var(--mui-palette-action-disabled)'
                    },
                    '& .MuiOutlinedInput-input': {
                        height: '1.4375em'
                    }
                },
                input: {
                    '& + .MuiAutocomplete-endAdornment': {
                        right: '1rem',
                        '& i, & svg': {
                            fontSize: '1.25rem',
                            color: 'var(--mui-palette-text-primary)'
                        },
                        '& .MuiAutocomplete-clearIndicator': {
                            padding: 2
                        }
                    },
                    '&.MuiInputBase-inputSizeSmall + .MuiAutocomplete-endAdornment': {
                        '& i, & svg': {
                            fontSize: '1rem'
                        }
                    }
                },
                paper: {
                    ...skin !== 'bordered' && {
                        boxShadow: 'var(--mui-customShadows-lg)',
                        marginBlockStart: '0.125rem'
                    }
                },
                listbox: ({ theme })=>({
                        '& .MuiAutocomplete-option': {
                            paddingBlock: theme.spacing(2),
                            marginInline: theme.spacing(2),
                            marginBlock: theme.spacing(0.5),
                            borderRadius: 'var(--mui-shape-borderRadius)',
                            '&[aria-selected="true"]': {
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                color: 'var(--mui-palette-primary-main)',
                                '&.Mui-focused, &.Mui-focusVisible': {
                                    backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
                                }
                            }
                        },
                        '& .MuiAutocomplete-option.Mui-focusVisible': {
                            backgroundColor: 'var(--mui-palette-action-hover)'
                        }
                    })
            }
        }
    });
const __TURBOPACK__default__export__ = autocomplete;
}),
"[project]/src/@core/theme/overrides/avatar.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const avatar = {
    MuiAvatarGroup: {
        styleOverrides: {
            root: ({ theme })=>({
                    justifyContent: 'flex-end',
                    '& .MuiAvatar-root': {
                        borderColor: 'var(--mui-palette-background-paper)'
                    },
                    '&.pull-up .MuiAvatar-root': {
                        cursor: 'pointer',
                        transition: theme.transitions.create([
                            'box-shadow',
                            'transform'
                        ], {
                            easing: 'ease',
                            duration: theme.transitions.duration.shorter
                        }),
                        '&:hover': {
                            zIndex: 2,
                            boxShadow: 'var(--mui-customShadows-md)',
                            transform: 'translateY(-5px)'
                        }
                    }
                })
        }
    },
    MuiAvatar: {
        styleOverrides: {
            root: ({ theme })=>({
                    color: 'var(--mui-palette-text-primary)',
                    fontSize: theme.typography.body1.fontSize,
                    lineHeight: 1.2
                })
        }
    }
};
const __TURBOPACK__default__export__ = avatar;
}),
"[project]/src/@core/theme/overrides/backdrop.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const backdrop = {
    MuiBackdrop: {
        styleOverrides: {
            root: {
                '&:not(.MuiBackdrop-invisible)': {
                    backgroundColor: 'var(--backdrop-color)'
                }
            }
        }
    }
};
const __TURBOPACK__default__export__ = backdrop;
}),
"[project]/src/@core/theme/overrides/badges.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const badges = {
    MuiBadge: {
        styleOverrides: {
            standard: ({ theme })=>({
                    height: 24,
                    minWidth: 24,
                    borderRadius: 20,
                    fontSize: theme.typography.subtitle2.fontSize,
                    lineHeight: 1.23077,
                    padding: theme.spacing(1, 2)
                })
        }
    }
};
const __TURBOPACK__default__export__ = badges;
}),
"[project]/src/@core/theme/overrides/breadcrumbs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const breadcrumbs = {
    MuiBreadcrumbs: {
        styleOverrides: {
            root: {
                '& svg, & i': {
                    fontSize: '1.25rem'
                },
                '& a': {
                    textDecoration: 'none',
                    color: 'var(--mui-palette-primary-main)'
                }
            },
            li: ({ theme })=>({
                    lineHeight: theme.typography.body1.lineHeight,
                    '& > *:not(a)': {
                        color: 'var(--mui-palette-text-primary)'
                    }
                })
        }
    }
};
const __TURBOPACK__default__export__ = breadcrumbs;
}),
"[project]/src/@core/theme/overrides/button.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/themeConfig.ts [app-ssr] (ecmascript)");
;
const iconStyles = (size)=>({
        '& > *:nth-of-type(1)': {
            ...size === 'small' ? {
                fontSize: '14px'
            } : {
                ...size === 'medium' ? {
                    fontSize: '16px'
                } : {
                    fontSize: '20px'
                }
            }
        }
    });
const button = {
    MuiButtonBase: {
        defaultProps: {
            disableRipple: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple
        }
    },
    MuiButton: {
        styleOverrides: {
            root: ({ theme, ownerState })=>({
                    '&.Mui-disabled': {
                        opacity: 0.45
                    },
                    transition: theme.transitions.create('all', {
                        duration: theme.transitions.duration.short
                    }),
                    '&:not(.Mui-disabled):active': {
                        transform: 'scale(0.98)'
                    },
                    ...ownerState.variant === 'text' ? {
                        ...ownerState.size === 'small' && {
                            padding: theme.spacing(1.5, 2.25)
                        },
                        ...ownerState.size === 'medium' && {
                            padding: theme.spacing(2, 3)
                        },
                        ...ownerState.size === 'large' && {
                            padding: theme.spacing(2.75, 4)
                        }
                    } : {
                        ...ownerState.variant === 'outlined' ? {
                            ...ownerState.size === 'small' && {
                                padding: theme.spacing(1.25, 3.25)
                            },
                            ...ownerState.size === 'medium' && {
                                padding: theme.spacing(1.75, 4.75)
                            },
                            ...ownerState.size === 'large' && {
                                padding: theme.spacing(2.5, 6.25)
                            }
                        } : {
                            ...ownerState.size === 'small' && {
                                padding: theme.spacing(1.5, 3.5)
                            },
                            ...ownerState.size === 'medium' && {
                                padding: theme.spacing(2, 5)
                            },
                            ...ownerState.size === 'large' && {
                                padding: theme.spacing(2.75, 6.5)
                            }
                        }
                    },
                    variants: [
                        {
                            props: {
                                variant: 'text',
                                color: 'primary'
                            },
                            style: {
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-primary-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-primary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'text',
                                color: 'secondary'
                            },
                            style: {
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-secondary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'text',
                                color: 'error'
                            },
                            style: {
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-error-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-error-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'text',
                                color: 'warning'
                            },
                            style: {
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-warning-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-warning-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'text',
                                color: 'info'
                            },
                            style: {
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-info-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-info-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'text',
                                color: 'success'
                            },
                            style: {
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-success-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-success-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                color: 'primary'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-primary-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-primary-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-primary-main)',
                                    borderColor: 'var(--mui-palette-primary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                color: 'secondary'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-secondary-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-secondary-main)',
                                    borderColor: 'var(--mui-palette-secondary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                color: 'error'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-error-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-error-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-error-main)',
                                    borderColor: 'var(--mui-palette-error-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                color: 'warning'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-warning-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-warning-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-warning-main)',
                                    borderColor: 'var(--mui-palette-warning-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                color: 'info'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-info-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-info-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-info-main)',
                                    borderColor: 'var(--mui-palette-info-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined',
                                color: 'success'
                            },
                            style: {
                                borderColor: 'var(--mui-palette-success-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-success-lighterOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-success-main)',
                                    borderColor: 'var(--mui-palette-success-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'contained',
                                color: 'primary'
                            },
                            style: {
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-primary-sm)'
                                },
                                '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-primary-dark)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-primary-contrastText)',
                                    backgroundColor: 'var(--mui-palette-primary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'contained',
                                color: 'secondary'
                            },
                            style: {
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-secondary-sm)'
                                },
                                '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-secondary-dark)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-secondary-contrastText)',
                                    backgroundColor: 'var(--mui-palette-secondary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'contained',
                                color: 'error'
                            },
                            style: {
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-error-sm)'
                                },
                                '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-error-dark)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-error-contrastText)',
                                    backgroundColor: 'var(--mui-palette-error-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'contained',
                                color: 'warning'
                            },
                            style: {
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-warning-sm)'
                                },
                                '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-warning-dark)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-warning-contrastText)',
                                    backgroundColor: 'var(--mui-palette-warning-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'contained',
                                color: 'info'
                            },
                            style: {
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-info-sm)'
                                },
                                '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-info-dark)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-info-contrastText)',
                                    backgroundColor: 'var(--mui-palette-info-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'contained',
                                color: 'success'
                            },
                            style: {
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-success-sm)'
                                },
                                '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-success-dark)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-success-contrastText)',
                                    backgroundColor: 'var(--mui-palette-success-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'primary'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                color: 'var(--mui-palette-primary-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-primary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'secondary'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-secondary-lightOpacity)',
                                color: 'var(--mui-palette-secondary-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-secondary-mainOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-secondary-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'error'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-error-lightOpacity)',
                                color: 'var(--mui-palette-error-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-error-mainOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-error-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'warning'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-warning-lightOpacity)',
                                color: 'var(--mui-palette-warning-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-warning-mainOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-warning-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'info'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-info-lightOpacity)',
                                color: 'var(--mui-palette-info-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-info-mainOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-info-main)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'success'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-success-lightOpacity)',
                                color: 'var(--mui-palette-success-main)',
                                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                    backgroundColor: 'var(--mui-palette-success-mainOpacity)'
                                },
                                '&.Mui-disabled': {
                                    color: 'var(--mui-palette-success-main)'
                                }
                            }
                        }
                    ]
                }),
            sizeSmall: ({ theme })=>({
                    lineHeight: 1.38462,
                    fontSize: theme.typography.body2.fontSize,
                    borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
                }),
            sizeLarge: {
                fontSize: '1.0625rem',
                lineHeight: 1.529412,
                borderRadius: 'var(--mui-shape-customBorderRadius-lg)'
            },
            startIcon: ({ theme, ownerState })=>({
                    ...ownerState.size === 'small' ? {
                        marginInlineEnd: theme.spacing(1.5)
                    } : {
                        ...ownerState.size === 'medium' ? {
                            marginInlineEnd: theme.spacing(2)
                        } : {
                            marginInlineEnd: theme.spacing(2.5)
                        }
                    },
                    ...iconStyles(ownerState.size)
                }),
            endIcon: ({ theme, ownerState })=>({
                    ...ownerState.size === 'small' ? {
                        marginInlineStart: theme.spacing(1.5)
                    } : {
                        ...ownerState.size === 'medium' ? {
                            marginInlineStart: theme.spacing(2)
                        } : {
                            marginInlineStart: theme.spacing(2.5)
                        }
                    },
                    ...iconStyles(ownerState.size)
                })
        }
    }
};
const __TURBOPACK__default__export__ = button;
}),
"[project]/src/@core/theme/overrides/button-group.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/themeConfig.ts [app-ssr] (ecmascript)");
;
const buttonGroup = {
    MuiButtonGroup: {
        defaultProps: {
            disableRipple: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple
        },
        styleOverrides: {
            root: {
                variants: [
                    {
                        props: {
                            variant: 'text',
                            color: 'primary'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-primary-main)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'text',
                            color: 'secondary'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-secondary-main)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'text',
                            color: 'error'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-error-main)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'text',
                            color: 'warning'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-warning-main)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'text',
                            color: 'info'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-info-main)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'text',
                            color: 'success'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-success-main)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'contained',
                            color: 'primary'
                        },
                        style: {
                            '&:not(.Mui-disabled)': {
                                boxShadow: 'var(--mui-customShadows-primary-sm)'
                            },
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-primary-dark)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'contained',
                            color: 'secondary'
                        },
                        style: {
                            '&:not(.Mui-disabled)': {
                                boxShadow: 'var(--mui-customShadows-secondary-sm)'
                            },
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-secondary-dark)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'contained',
                            color: 'error'
                        },
                        style: {
                            '&:not(.Mui-disabled)': {
                                boxShadow: 'var(--mui-customShadows-error-sm)'
                            },
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-error-dark)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'contained',
                            color: 'warning'
                        },
                        style: {
                            '&:not(.Mui-disabled)': {
                                boxShadow: 'var(--mui-customShadows-warning-sm)'
                            },
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-warning-dark)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'contained',
                            color: 'info'
                        },
                        style: {
                            '&:not(.Mui-disabled)': {
                                boxShadow: 'var(--mui-customShadows-info-sm)'
                            },
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-info-dark)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'contained',
                            color: 'success'
                        },
                        style: {
                            '&:not(.Mui-disabled)': {
                                boxShadow: 'var(--mui-customShadows-success-sm)'
                            },
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderColor: 'var(--mui-palette-success-dark)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'primary',
                            orientation: 'horizontal'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderRight: '1px solid var(--mui-palette-primary-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'secondary',
                            orientation: 'horizontal'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderRight: '1px solid var(--mui-palette-secondary-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'error',
                            orientation: 'horizontal'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderRight: '1px solid var(--mui-palette-error-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'warning',
                            orientation: 'horizontal'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderRight: '1px solid var(--mui-palette-warning-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'info',
                            orientation: 'horizontal'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderRight: '1px solid var(--mui-palette-info-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'success',
                            orientation: 'horizontal'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderRight: '1px solid var(--mui-palette-success-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'primary',
                            orientation: 'vertical'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderBottom: '1px solid var(--mui-palette-primary-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'secondary',
                            orientation: 'vertical'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderBottom: '1px solid var(--mui-palette-secondary-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'error',
                            orientation: 'vertical'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderBottom: '1px solid var(--mui-palette-error-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'warning',
                            orientation: 'vertical'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderBottom: '1px solid var(--mui-palette-warning-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'info',
                            orientation: 'vertical'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderBottom: '1px solid var(--mui-palette-info-darkOpacity)'
                                }
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'success',
                            orientation: 'vertical'
                        },
                        style: {
                            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
                                '&, &.Mui-disabled': {
                                    borderBottom: '1px solid var(--mui-palette-success-darkOpacity)'
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
};
const __TURBOPACK__default__export__ = buttonGroup;
}),
"[project]/src/@core/theme/overrides/card.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const card = (skin)=>{
    return {
        MuiCard: {
            defaultProps: {
                ...skin === 'bordered' && {
                    variant: 'outlined'
                }
            },
            styleOverrides: {
                root: ({ ownerState })=>({
                        ...ownerState.variant !== 'outlined' && {
                            boxShadow: 'var(--mui-customShadows-md)'
                        }
                    })
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(6),
                        '& + .MuiCardContent-root, & + .MuiCardActions-root': {
                            paddingBlockStart: 0
                        },
                        '& + .MuiCollapse-root .MuiCardContent-root:first-child, & + .MuiCollapse-root .MuiCardActions-root:first-child': {
                            paddingBlockStart: 0
                        }
                    }),
                subheader: ({ theme })=>({
                        ...theme.typography.subtitle1,
                        color: 'rgb(var(--mui-palette-text-primaryChannel) / 0.55)'
                    }),
                action: ({ theme })=>({
                        ...theme.typography.body1,
                        color: 'var(--mui-palette-text-disabled)',
                        marginBlock: 0,
                        marginInlineEnd: 0,
                        '& .MuiIconButton-root': {
                            color: 'inherit'
                        }
                    })
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(6),
                        color: 'var(--mui-palette-text-secondary)',
                        '&:last-child': {
                            paddingBlockEnd: theme.spacing(6)
                        },
                        '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
                            paddingBlockStart: 0
                        },
                        '& + .MuiCollapse-root .MuiCardHeader-root:first-child, & + .MuiCollapse-root .MuiCardContent-root:first-child, & + .MuiCollapse-root .MuiCardActions-root:first-child': {
                            paddingBlockStart: 0
                        }
                    })
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(6),
                        '& .MuiButtonBase-root:not(:first-of-type)': {
                            marginInlineStart: theme.spacing(4)
                        },
                        '&:where(.card-actions-dense)': {
                            padding: theme.spacing(3),
                            '& .MuiButton-text': {
                                paddingInline: theme.spacing(3)
                            }
                        },
                        '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
                            paddingBlockStart: 0
                        },
                        '& + .MuiCollapse-root .MuiCardHeader-root:first-child, & + .MuiCollapse-root .MuiCardContent-root:first-child, & + .MuiCollapse-root .MuiCardActions-root:first-child': {
                            paddingBlockStart: 0
                        }
                    })
            }
        }
    };
};
const __TURBOPACK__default__export__ = card;
}),
"[project]/src/@core/theme/overrides/checkbox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// React Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Icon = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z",
            stroke: "var(--mui-palette-text-disabled)",
            strokeWidth: "2"
        }, void 0, false, {
            fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const IndeterminateIcon = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.5 12h7",
                stroke: "var(--mui-palette-common-white)",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const CheckedIcon = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m8.5 12 2.5 2.5 5-5",
                stroke: "var(--mui-palette-common-white)",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const checkbox = {
    MuiCheckbox: {
        defaultProps: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {}, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            indeterminateIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IndeterminateIcon, {}, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
                lineNumber: 53,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0)),
            checkedIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckedIcon, {}, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/checkbox.tsx",
                lineNumber: 54,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0))
        },
        styleOverrides: {
            root: ({ theme, ownerState })=>({
                    ...ownerState.size === 'small' ? {
                        padding: theme.spacing(1),
                        '& svg': {
                            fontSize: '1.25rem'
                        }
                    } : {
                        padding: theme.spacing(1.5),
                        '& svg': {
                            fontSize: '1.5rem'
                        }
                    },
                    '&:not(.Mui-checked):not(.Mui-disabled):not(.MuiCheckbox-indeterminate) svg, &:not(.Mui-checked):not(.Mui-disabled):not(.MuiCheckbox-indeterminate) i': {
                        color: 'var(--mui-palette-text-disabled)'
                    },
                    '&.Mui-checked:not(.Mui-disabled) svg, &.MuiCheckbox-indeterminate:not(.Mui-disabled) svg': {
                        filter: `drop-shadow(var(--mui-customShadows-${ownerState.color}-sm))`
                    },
                    '&.Mui-disabled': {
                        opacity: 0.45,
                        '&:not(.Mui-checked)': {
                            color: 'var(--mui-palette-text-disabled)'
                        },
                        '&.Mui-checked.MuiCheckbox-colorPrimary': {
                            color: 'var(--mui-palette-primary-main)'
                        },
                        '&.Mui-checked.MuiCheckbox-colorSecondary': {
                            color: 'var(--mui-palette-secondary-main)'
                        },
                        '&.Mui-checked.MuiCheckbox-colorError': {
                            color: 'var(--mui-palette-error-main)'
                        },
                        '&.Mui-checked.MuiCheckbox-colorWarning': {
                            color: 'var(--mui-palette-warning-main)'
                        },
                        '&.Mui-checked.MuiCheckbox-colorInfo': {
                            color: 'var(--mui-palette-info-main)'
                        },
                        '&.Mui-checked.MuiCheckbox-colorSuccess': {
                            color: 'var(--mui-palette-success-main)'
                        }
                    }
                })
        }
    }
};
const __TURBOPACK__default__export__ = checkbox;
}),
"[project]/src/@core/theme/overrides/chip.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const chip = {
    MuiChip: {
        styleOverrides: {
            root: ({ ownerState, theme })=>({
                    ...theme.typography.body2,
                    fontWeight: theme.typography.fontWeightMedium,
                    '&.MuiChip-outlined:not(.MuiChip-colorDefault)': {
                        borderColor: `var(--mui-palette-${ownerState.color}-main)`
                    },
                    ...ownerState.size === 'small' ? {
                        borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
                    } : {
                        borderRadius: 'var(--mui-shape-borderRadius)'
                    },
                    '& .MuiChip-deleteIcon': {
                        ...ownerState.size === 'small' ? {
                            fontSize: '1rem',
                            marginInlineEnd: theme.spacing(1),
                            marginInlineStart: theme.spacing(-2)
                        } : {
                            fontSize: '1.25rem',
                            marginInlineEnd: theme.spacing(1.5),
                            marginInlineStart: theme.spacing(-2)
                        }
                    },
                    '& .MuiChip-avatar, & .MuiChip-icon': {
                        '& i, & svg': {
                            ...ownerState.size === 'small' ? {
                                fontSize: 13
                            } : {
                                fontSize: 15
                            }
                        },
                        ...ownerState.size === 'small' ? {
                            blockSize: 16,
                            inlineSize: 16,
                            marginInlineStart: theme.spacing(1),
                            marginInlineEnd: theme.spacing(-1.5)
                        } : {
                            blockSize: 20,
                            inlineSize: 20,
                            marginInlineStart: theme.spacing(1.5),
                            marginInlineEnd: theme.spacing(-2)
                        }
                    },
                    '&.Mui-disabled': {
                        opacity: 0.45
                    },
                    variants: [
                        {
                            props: {
                                variant: 'tonal',
                                color: 'primary'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                color: 'var(--mui-palette-primary-main)',
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
                                },
                                '& .MuiChip-deleteIcon': {
                                    color: 'rgb(var(--mui-palette-primary-mainChannel) / 0.7)',
                                    '&:hover': {
                                        color: 'var(--mui-palette-primary-main)'
                                    }
                                },
                                '&.MuiChip-clickable:hover': {
                                    backgroundColor: 'var(--mui-palette-primary-main)',
                                    color: 'var(--mui-palette-common-white)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'secondary'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-secondary-lightOpacity)',
                                color: 'var(--mui-palette-secondary-main)',
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'var(--mui-palette-secondary-mainOpacity)'
                                },
                                '& .MuiChip-deleteIcon': {
                                    color: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.7)',
                                    '&:hover': {
                                        color: 'var(--mui-palette-secondary-main)'
                                    }
                                },
                                '&.MuiChip-clickable:hover': {
                                    backgroundColor: 'var(--mui-palette-secondary-main)',
                                    color: 'var(--mui-palette-common-white)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'error'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-error-lightOpacity)',
                                color: 'var(--mui-palette-error-main)',
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'var(--mui-palette-error-mainOpacity)'
                                },
                                '& .MuiChip-deleteIcon': {
                                    color: 'rgb(var(--mui-palette-error-mainChannel) / 0.7)',
                                    '&:hover': {
                                        color: 'var(--mui-palette-error-main)'
                                    }
                                },
                                '&.MuiChip-clickable:hover': {
                                    backgroundColor: 'var(--mui-palette-error-main)',
                                    color: 'var(--mui-palette-common-white)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'warning'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-warning-lightOpacity)',
                                color: 'var(--mui-palette-warning-main)',
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'var(--mui-palette-warning-mainOpacity)'
                                },
                                '& .MuiChip-deleteIcon': {
                                    color: 'rgb(var(--mui-palette-warning-mainChannel) / 0.7)',
                                    '&:hover': {
                                        color: 'var(--mui-palette-warning-main)'
                                    }
                                },
                                '&.MuiChip-clickable:hover': {
                                    backgroundColor: 'var(--mui-palette-warning-main)',
                                    color: 'var(--mui-palette-common-white)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'info'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-info-lightOpacity)',
                                color: 'var(--mui-palette-info-main)',
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'var(--mui-palette-info-mainOpacity)'
                                },
                                '& .MuiChip-deleteIcon': {
                                    color: 'rgb(var(--mui-palette-info-mainChannel) / 0.7)',
                                    '&:hover': {
                                        color: 'var(--mui-palette-info-main)'
                                    }
                                },
                                '&.MuiChip-clickable:hover': {
                                    backgroundColor: 'var(--mui-palette-info-main)',
                                    color: 'var(--mui-palette-common-white)'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'success'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-success-lightOpacity)',
                                color: 'var(--mui-palette-success-main)',
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'var(--mui-palette-success-mainOpacity)'
                                },
                                '& .MuiChip-deleteIcon': {
                                    color: 'rgb(var(--mui-palette-success-mainChannel) / 0.7)',
                                    '&:hover': {
                                        color: 'var(--mui-palette-success-main)'
                                    }
                                },
                                '&.MuiChip-clickable:hover': {
                                    backgroundColor: 'var(--mui-palette-success-main)',
                                    color: 'var(--mui-palette-common-white)'
                                }
                            }
                        }
                    ]
                }),
            label: ({ ownerState, theme })=>({
                    ...ownerState.size === 'small' ? {
                        paddingInline: theme.spacing(2.5),
                        paddingBlock: theme.spacing(0.5)
                    } : {
                        paddingInline: theme.spacing(3)
                    }
                }),
            iconMedium: {
                fontSize: '1.25rem'
            },
            iconSmall: {
                fontSize: '1rem'
            }
        }
    }
};
const __TURBOPACK__default__export__ = chip;
}),
"[project]/src/@core/theme/overrides/dialog.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

//MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const dialog = (skin)=>({
        MuiDialog: {
            styleOverrides: {
                paper: ({ theme })=>({
                        borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
                        ...skin !== 'bordered' ? {
                            boxShadow: 'var(--mui-customShadows-lg)'
                        } : {
                            boxShadow: 'none'
                        },
                        [theme.breakpoints.down('sm')]: {
                            '&:not(.MuiDialog-paperFullScreen)': {
                                margin: theme.spacing(6)
                            }
                        }
                    }),
                paperFullScreen: {
                    borderRadius: 0
                }
            }
        },
        MuiDialogTitle: {
            defaultProps: {
                variant: 'h5'
            },
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(6),
                        '& + .MuiDialogActions-root': {
                            paddingTop: 0
                        }
                    })
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(6),
                        '& + .MuiDialogContent-root, & + .MuiDialogActions-root': {
                            paddingTop: 0
                        }
                    })
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(6),
                        '& .MuiButtonBase-root:not(:first-of-type)': {
                            marginInlineStart: theme.spacing(4)
                        },
                        '&:where(.dialog-actions-dense)': {
                            padding: theme.spacing(3),
                            '& .MuiButton-text': {
                                paddingInline: theme.spacing(3)
                            }
                        }
                    })
            }
        }
    });
const __TURBOPACK__default__export__ = dialog;
}),
"[project]/src/@core/theme/overrides/drawer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const drawer = (skin)=>({
        MuiDrawer: {
            defaultProps: {
                ...skin === 'bordered' && {
                    PaperProps: {
                        elevation: 0
                    }
                }
            },
            styleOverrides: {
                paper: {
                    ...skin !== 'bordered' && {
                        boxShadow: 'var(--mui-customShadows-lg)'
                    }
                }
            }
        }
    });
const __TURBOPACK__default__export__ = drawer;
}),
"[project]/src/@core/theme/overrides/fab.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const fab = {
    MuiFab: {
        styleOverrides: {
            root: {
                variants: [
                    {
                        props: {
                            color: 'default'
                        },
                        style: {
                            color: 'rgb(var(--mui-mainColorChannels-light) / 0.9)',
                            '&.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                backgroundColor: 'var(--mui-palette-grey-A100)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'primary'
                        },
                        style: {
                            '&.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                backgroundColor: 'var(--mui-palette-primary-dark)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'secondary'
                        },
                        style: {
                            '&.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                backgroundColor: 'var(--mui-palette-secondary-dark)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'error'
                        },
                        style: {
                            '&.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                backgroundColor: 'var(--mui-palette-error-dark)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'warning'
                        },
                        style: {
                            '&.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                backgroundColor: 'var(--mui-palette-warning-dark)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'info'
                        },
                        style: {
                            '&.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                backgroundColor: 'var(--mui-palette-info-dark)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'success'
                        },
                        style: {
                            '&.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
                                backgroundColor: 'var(--mui-palette-success-dark)'
                            }
                        }
                    }
                ]
            }
        }
    }
};
const __TURBOPACK__default__export__ = fab;
}),
"[project]/src/@core/theme/overrides/form-control-label.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const formControlLabel = {
    MuiFormControlLabel: {
        styleOverrides: {
            root: ({ theme })=>({
                    marginInlineStart: theme.spacing(-2)
                }),
            label: {
                '&, &.Mui-disabled': {
                    color: 'var(--mui-palette-text-primary)'
                },
                '&.Mui-disabled': {
                    opacity: 0.45
                }
            }
        }
    }
};
const __TURBOPACK__default__export__ = formControlLabel;
}),
"[project]/src/@core/theme/overrides/icon-button.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/themeConfig.ts [app-ssr] (ecmascript)");
;
const iconButton = {
    MuiIconButton: {
        styleOverrides: {
            root: {
                '& .MuiSvgIcon-root, & i, & svg': {
                    fontSize: 'inherit'
                },
                variants: [
                    {
                        props: {
                            color: 'default'
                        },
                        style: {
                            '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                                backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)'
                            },
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple && {
                                '&.Mui-focusVisible:not(.Mui-disabled)': {
                                    backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)'
                                }
                            },
                            '&.Mui-disabled': {
                                opacity: 0.45,
                                color: 'var(--mui-palette-action-active)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'primary'
                        },
                        style: {
                            '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                                backgroundColor: 'var(--mui-palette-primary-lighterOpacity)'
                            },
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple && {
                                '&.Mui-focusVisible:not(.Mui-disabled)': {
                                    backgroundColor: 'var(--mui-palette-primary-lighterOpacity)'
                                }
                            },
                            '&.Mui-disabled': {
                                opacity: 0.45,
                                color: 'var(--mui-palette-primary-main)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'secondary'
                        },
                        style: {
                            '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                                backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)'
                            },
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple && {
                                '&.Mui-focusVisible:not(.Mui-disabled)': {
                                    backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)'
                                }
                            },
                            '&.Mui-disabled': {
                                opacity: 0.45,
                                color: 'var(--mui-palette-secondary-main)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'error'
                        },
                        style: {
                            '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                                backgroundColor: 'var(--mui-palette-error-lighterOpacity)'
                            },
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple && {
                                '&.Mui-focusVisible:not(.Mui-disabled)': {
                                    backgroundColor: 'var(--mui-palette-error-lighterOpacity)'
                                }
                            },
                            '&.Mui-disabled': {
                                opacity: 0.45,
                                color: 'var(--mui-palette-error-main)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'warning'
                        },
                        style: {
                            '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                                backgroundColor: 'var(--mui-palette-warning-lighterOpacity)'
                            },
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple && {
                                '&.Mui-focusVisible:not(.Mui-disabled)': {
                                    backgroundColor: 'var(--mui-palette-warning-lighterOpacity)'
                                }
                            },
                            '&.Mui-disabled': {
                                opacity: 0.45,
                                color: 'var(--mui-palette-warning-main)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'info'
                        },
                        style: {
                            '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                                backgroundColor: 'var(--mui-palette-info-lighterOpacity)'
                            },
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple && {
                                '&.Mui-focusVisible:not(.Mui-disabled)': {
                                    backgroundColor: 'var(--mui-palette-info-lighterOpacity)'
                                }
                            },
                            '&.Mui-disabled': {
                                opacity: 0.45,
                                color: 'var(--mui-palette-info-main)'
                            }
                        }
                    },
                    {
                        props: {
                            color: 'success'
                        },
                        style: {
                            '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                                backgroundColor: 'var(--mui-palette-success-lighterOpacity)'
                            },
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disableRipple && {
                                '&.Mui-focusVisible:not(.Mui-disabled)': {
                                    backgroundColor: 'var(--mui-palette-success-lighterOpacity)'
                                }
                            },
                            '&.Mui-disabled': {
                                opacity: 0.45,
                                color: 'var(--mui-palette-success-main)'
                            }
                        }
                    }
                ]
            },
            sizeSmall: ({ theme })=>({
                    padding: theme.spacing(1.25),
                    fontSize: '1.25rem'
                }),
            sizeMedium: ({ theme })=>({
                    padding: theme.spacing(2),
                    fontSize: '1.375rem'
                }),
            sizeLarge: ({ theme })=>({
                    padding: theme.spacing(3),
                    fontSize: '1.5rem'
                })
        }
    }
};
const __TURBOPACK__default__export__ = iconButton;
}),
"[project]/src/@core/theme/overrides/input.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const input = {
    MuiFormControl: {
        styleOverrides: {
            root: {
                '&:has(.MuiRadio-root) .MuiFormHelperText-root, &:has(.MuiCheckbox-root) .MuiFormHelperText-root, &:has(.MuiSwitch-root) .MuiFormHelperText-root': {
                    marginInline: 0
                }
            }
        }
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                lineHeight: 1.6,
                '&.MuiInput-underline': {
                    '&:before': {
                        borderColor: 'var(--mui-palette-customColors-inputBorder)'
                    },
                    '&:not(.Mui-disabled, .Mui-error):hover:before': {
                        borderColor: 'var(--mui-palette-action-active)'
                    }
                },
                '&.Mui-disabled .MuiInputAdornment-root, &.Mui-disabled .MuiInputAdornment-root > *': {
                    color: 'var(--mui-palette-action-disabled)'
                }
            }
        }
    },
    MuiFilledInput: {
        styleOverrides: {
            root: {
                borderStartStartRadius: 4,
                borderStartEndRadius: 4,
                '&:before': {
                    borderBottom: '1px solid var(--mui-palette-text-secondary)'
                },
                '&:hover:before': {
                    borderBottom: '1px solid var(--mui-palette-text-primary)'
                },
                '&.Mui-disabled:before': {
                    borderBottomStyle: 'solid',
                    opacity: 0.38
                }
            }
        }
    },
    MuiInputLabel: {
        styleOverrides: {
            shrink: ({ ownerState })=>({
                    ...ownerState.variant === 'outlined' && {
                        transform: 'translate(14px, -8px) scale(0.867)'
                    },
                    ...ownerState.variant === 'filled' && {
                        transform: `translate(12px, ${ownerState.size === 'small' ? 4 : 7}px) scale(0.867)`
                    },
                    ...ownerState.variant === 'standard' && {
                        transform: 'translate(0, -1.5px) scale(0.867)'
                    }
                })
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                '&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--mui-palette-action-active)'
                },
                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--mui-palette-divider)'
                },
                '&:not(.Mui-error).MuiInputBase-colorPrimary.Mui-focused': {
                    boxShadow: 'var(--mui-customShadows-primary-sm)'
                }
            },
            input: ({ theme, ownerState })=>({
                    ...ownerState?.size === 'medium' && {
                        '&:not(.MuiInputBase-inputMultiline, .MuiInputBase-inputAdornedStart)': {
                            padding: theme.spacing(4)
                        },
                        height: '1.5em'
                    },
                    '& ~ .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--mui-palette-customColors-inputBorder)'
                    }
                }),
            notchedOutline: {
                '& legend': {
                    fontSize: '0.867em'
                }
            }
        }
    },
    MuiInputAdornment: {
        styleOverrides: {
            root: {
                color: 'var(--mui-palette-text-primary)',
                '& i, & svg': {
                    fontSize: '1rem !important'
                },
                '& *': {
                    color: 'inherit !important'
                }
            }
        }
    },
    MuiFormHelperText: {
        styleOverrides: {
            root: {
                lineHeight: 1,
                letterSpacing: 'unset'
            }
        }
    }
};
const __TURBOPACK__default__export__ = input;
}),
"[project]/src/@core/theme/overrides/list.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const list = {
    MuiListItem: {
        styleOverrides: {
            root: ({ theme })=>({
                    gap: theme.spacing(3)
                }),
            padding: ({ theme, ownerState })=>({
                    ...!ownerState.dense && {
                        paddingBlock: theme.spacing(2),
                        paddingInlineStart: theme.spacing(5)
                    }
                })
        }
    },
    MuiListItemAvatar: {
        styleOverrides: {
            root: {
                minInlineSize: 'unset'
            }
        }
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minInlineSize: 0,
                color: 'var(--mui-palette-text-primary)',
                fontSize: '1.375rem',
                '& > svg, & > i': {
                    fontSize: 'inherit'
                }
            }
        }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: ({ theme, ownerState })=>({
                    gap: theme.spacing(2),
                    ...!ownerState.dense && {
                        paddingBlock: theme.spacing(2)
                    },
                    paddingInlineStart: theme.spacing(5),
                    '&.Mui-selected': {
                        backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                        '&:hover, &.Mui-focused, &.Mui-focusVisible': {
                            backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
                        },
                        '& .MuiTypography-root': {
                            color: 'var(--mui-palette-primary-main)'
                        },
                        '& + .MuiListItemSecondaryAction-root .MuiIconButton-root': {
                            color: 'var(--mui-palette-primary-main)'
                        }
                    }
                })
        }
    },
    MuiListItemText: {
        styleOverrides: {
            root: {
                margin: 0
            },
            primary: {
                color: 'var(--mui-palette-text-primary)'
            }
        }
    },
    MuiListSubheader: {
        styleOverrides: {
            root: ({ theme })=>({
                    ...theme.typography.subtitle2,
                    paddingBlock: 10,
                    paddingInline: theme.spacing(5)
                })
        }
    }
};
const __TURBOPACK__default__export__ = list;
}),
"[project]/src/@core/theme/overrides/menu.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const menu = (skin)=>({
        MuiMenu: {
            defaultProps: {
                ...skin === 'bordered' && {
                    slotProps: {
                        paper: {
                            elevation: 0
                        }
                    }
                }
            },
            styleOverrides: {
                paper: ({ theme })=>({
                        marginBlockStart: theme.spacing(0.5),
                        ...skin !== 'bordered' && {
                            boxShadow: 'var(--mui-customShadows-lg)'
                        }
                    })
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: ({ theme })=>({
                        paddingBlock: theme.spacing(2),
                        gap: theme.spacing(2),
                        color: 'var(--mui-palette-text-primary)',
                        marginInline: theme.spacing(2),
                        borderRadius: 'var(--mui-shape-borderRadius)',
                        '& i, & svg': {
                            fontSize: '1.375rem'
                        },
                        '& .MuiListItemIcon-root': {
                            minInlineSize: 0
                        },
                        '&:not(:last-of-type)': {
                            marginBlockEnd: theme.spacing(0.5)
                        },
                        '&.Mui-selected': {
                            backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                            color: 'var(--mui-palette-primary-main)',
                            '& .MuiListItemIcon-root': {
                                color: 'var(--mui-palette-primary-main)'
                            },
                            '&:hover, &.Mui-focused, &.Mui-focusVisible': {
                                backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
                            }
                        },
                        '&.Mui-disabled': {
                            color: 'var(--mui-palette-text-disabled)',
                            opacity: 0.45
                        }
                    })
            }
        }
    });
const __TURBOPACK__default__export__ = menu;
}),
"[project]/src/@core/theme/overrides/pagination.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const pagination = {
    MuiPagination: {
        styleOverrides: {
            root: {
                variants: [
                    {
                        props: {
                            variant: 'text',
                            color: 'primary'
                        },
                        style: {
                            '& .MuiPaginationItem-root.Mui-selected.Mui-disabled': {
                                backgroundColor: 'var(--mui-palette-primary-main)',
                                color: 'var(--mui-palette-primary-contrastText)'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'text',
                            color: 'secondary'
                        },
                        style: {
                            '& .MuiPaginationItem-root.Mui-selected.Mui-disabled': {
                                backgroundColor: 'var(--mui-palette-secondary-main)',
                                color: 'var(--mui-palette-secondary-contrastText)'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'outlined'
                        },
                        style: {
                            '& .MuiPaginationItem-root': {
                                borderColor: 'var(--mui-palette-customColors-inputBorder)'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'outlined',
                            color: 'primary'
                        },
                        style: {
                            '& .MuiPaginationItem-root.Mui-selected': {
                                color: 'var(--mui-palette-primary-main)',
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                borderColor: 'rgb(var(--mui-palette-primary-mainChannel))'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'outlined',
                            color: 'secondary'
                        },
                        style: {
                            '& .MuiPaginationItem-root.Mui-selected': {
                                color: 'var(--mui-palette-secondary-main)',
                                backgroundColor: 'var(--mui-palette-secondary-lightOpacity)',
                                borderColor: 'rgb(var(--mui-palette-secondary-mainChannel))'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal'
                        },
                        style: {
                            '& .MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)': {
                                backgroundColor: 'var(--mui-palette-action-selected)'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'standard'
                        },
                        style: {
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                color: 'var(--mui-palette-primary-main)',
                                '&:hover': {
                                    backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
                                }
                            },
                            '& .MuiPaginationItem-root:hover:not(.Mui-selected):not(.MuiPaginationItem-ellipsis)': {
                                backgroundColor: 'var(--mui-palette-action-disabledBackground)'
                            },
                            '& .MuiPaginationItem-root.Mui-selected.Mui-disabled': {
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                color: 'var(--mui-palette-primary-main)'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'primary'
                        },
                        style: {
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: 'var(--mui-palette-primary-main)',
                                color: 'var(--mui-palette-primary-contrastText)',
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-primary-sm)'
                                },
                                '&:hover': {
                                    backgroundColor: 'var(--mui-palette-primary-dark)'
                                }
                            },
                            '& .MuiPaginationItem-root:hover:not(.Mui-selected):not(.MuiPaginationItem-ellipsis)': {
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                color: 'var(--mui-palette-primary-main)'
                            },
                            '& .MuiPaginationItem-root.Mui-selected.Mui-disabled': {
                                backgroundColor: 'var(--mui-palette-primary-main)',
                                color: 'var(--mui-palette-primary-contrastText)'
                            }
                        }
                    },
                    {
                        props: {
                            variant: 'tonal',
                            color: 'secondary'
                        },
                        style: {
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: 'var(--mui-palette-secondary-main)',
                                color: 'var(--mui-palette-secondary-contrastText)',
                                '&:not(.Mui-disabled)': {
                                    boxShadow: 'var(--mui-customShadows-secondary-sm)'
                                },
                                '&:hover': {
                                    backgroundColor: 'var(--mui-palette-secondary-dark)'
                                }
                            },
                            '& .MuiPaginationItem-root:hover:not(.Mui-selected):not(.MuiPaginationItem-ellipsis)': {
                                backgroundColor: 'var(--mui-palette-secondary-mainOpacity)'
                            },
                            '& .MuiPaginationItem-root.Mui-selected.Mui-disabled': {
                                backgroundColor: 'var(--mui-palette-secondary-main)',
                                color: 'var(--mui-palette-secondary-contrastText)'
                            }
                        }
                    }
                ]
            },
            ul: {
                rowGap: 6
            }
        }
    },
    MuiPaginationItem: {
        styleOverrides: {
            root: ({ ownerState })=>({
                    ...ownerState.size === 'medium' && {
                        height: '2.375rem',
                        minWidth: '2.375rem'
                    },
                    ...ownerState.shape !== 'rounded' && {
                        borderRadius: '50px'
                    },
                    '&.Mui-selected.Mui-disabled': {
                        color: 'var(--mui-palette-text-primary)',
                        opacity: 0.45
                    },
                    '&.Mui-disabled': {
                        opacity: 0.45
                    },
                    ...ownerState.shape === 'rounded' && ownerState.size === 'small' && {
                        borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
                    },
                    ...ownerState.shape === 'rounded' && ownerState.size === 'large' && {
                        borderRadius: 'var(--mui-shape-customBorderRadius-lg)'
                    }
                }),
            ellipsis: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            sizeSmall: {
                height: '1.875rem',
                minWidth: '1.875rem'
            },
            sizeLarge: {
                height: '3rem',
                minWidth: '3rem'
            }
        }
    }
};
const __TURBOPACK__default__export__ = pagination;
}),
"[project]/src/@core/theme/overrides/paper.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const paper = {
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none'
            }
        }
    }
};
const __TURBOPACK__default__export__ = paper;
}),
"[project]/src/@core/theme/overrides/popover.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const popover = (skin)=>({
        MuiPopover: {
            styleOverrides: {
                paper: {
                    ...skin === 'bordered' ? {
                        boxShadow: 'none',
                        border: '1px solid var(--mui-palette-divider)'
                    } : {
                        boxShadow: 'var(--mui-customShadows-sm)'
                    }
                }
            }
        }
    });
const __TURBOPACK__default__export__ = popover;
}),
"[project]/src/@core/theme/overrides/progress.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const progress = {
    MuiLinearProgress: {
        styleOverrides: {
            root: ({ theme })=>({
                    blockSize: 6,
                    borderRadius: 'var(--mui-shape-borderRadius)',
                    backgroundColor: 'var(--mui-palette-customColors-trackBg)',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 'var(--mui-shape-borderRadius)'
                    },
                    '& .MuiLinearProgress-dashed': {
                        marginTop: theme.spacing(0.2)
                    }
                })
        }
    }
};
const __TURBOPACK__default__export__ = progress;
}),
"[project]/src/@core/theme/overrides/radio.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// React Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const IconChecked = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5.5 12a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z",
            fill: "var(--mui-palette-common-white)",
            stroke: "currentColor",
            strokeWidth: "5"
        }, void 0, false, {
            fileName: "[project]/src/@core/theme/overrides/radio.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/@core/theme/overrides/radio.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const UncheckedIcon = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z",
            stroke: "var(--mui-palette-text-disabled)",
            strokeWidth: "2"
        }, void 0, false, {
            fileName: "[project]/src/@core/theme/overrides/radio.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/@core/theme/overrides/radio.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const radio = {
    MuiRadio: {
        defaultProps: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UncheckedIcon, {}, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/radio.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            checkedIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChecked, {}, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/radio.tsx",
                lineNumber: 32,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0))
        },
        styleOverrides: {
            root: ({ theme, ownerState })=>({
                    ...ownerState.size === 'small' ? {
                        padding: theme.spacing(1),
                        '& svg': {
                            fontSize: '1.25rem'
                        }
                    } : {
                        padding: theme.spacing(1.5),
                        '& svg': {
                            fontSize: '1.5rem'
                        }
                    },
                    '&:not(.Mui-checked):not(.Mui-disabled) svg, &:not(.Mui-checked):not(.Mui-disabled) i': {
                        color: 'var(--mui-palette-text-disabled)'
                    },
                    '&.Mui-checked:not(.Mui-disabled) svg': {
                        filter: `drop-shadow(var(--mui-customShadows-${ownerState.color}-sm))`
                    },
                    '&.Mui-disabled': {
                        opacity: 0.45,
                        '&:not(.Mui-checked)': {
                            color: 'var(--mui-palette-text-secondary)'
                        },
                        '&.Mui-checked.MuiRadio-colorPrimary': {
                            color: 'var(--mui-palette-primary-main)'
                        },
                        '&.Mui-checked.MuiRadio-colorSecondary': {
                            color: 'var(--mui-palette-secondary-main)'
                        },
                        '&.Mui-checked.MuiRadio-colorError': {
                            color: 'var(--mui-palette-error-main)'
                        },
                        '&.Mui-checked.MuiRadio-colorWarning': {
                            color: 'var(--mui-palette-warning-main)'
                        },
                        '&.Mui-checked.MuiRadio-colorInfo': {
                            color: 'var(--mui-palette-info-main)'
                        },
                        '&.Mui-checked.MuiRadio-colorSuccess': {
                            color: 'var(--mui-palette-success-main)'
                        }
                    }
                })
        }
    }
};
const __TURBOPACK__default__export__ = radio;
}),
"[project]/src/@core/theme/overrides/rating.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const rating = {
    MuiRating: {
        defaultProps: {
            emptyIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "tabler-star"
            }, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/rating.tsx",
                lineNumber: 7,
                columnNumber: 18
            }, ("TURBOPACK compile-time value", void 0)),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "tabler-star-filled"
            }, void 0, false, {
                fileName: "[project]/src/@core/theme/overrides/rating.tsx",
                lineNumber: 8,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        },
        styleOverrides: {
            root: {
                gap: '2px',
                color: 'var(--mui-palette-warning-main)',
                '& i, & svg': {
                    flexShrink: 0
                },
                '& .MuiRating-decimal > label:first-of-type, & .MuiRating-decimal > span:first-of-type': {
                    zIndex: 1
                }
            },
            sizeSmall: {
                '& .MuiRating-icon i, & .MuiRating-icon svg': {
                    fontSize: '1.25rem'
                }
            },
            sizeLarge: {
                '& .MuiRating-icon i, & .MuiRating-icon svg': {
                    fontSize: '1.75rem'
                }
            }
        }
    }
};
const __TURBOPACK__default__export__ = rating;
}),
"[project]/src/@core/theme/overrides/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// React Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const SelectIcon = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
        className: "tabler-chevron-down"
    }, void 0, false, {
        fileName: "[project]/src/@core/theme/overrides/select.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const iconStyles = (theme)=>({
        userSelect: 'none',
        display: 'inline-block',
        fill: 'currentColor',
        flexShrink: 0,
        transition: theme.transitions.create('fill', {
            duration: theme.transitions.duration.shorter
        }),
        fontSize: '1.25rem',
        position: 'absolute',
        right: '1rem',
        pointerEvents: 'none'
    });
const select = {
    MuiSelect: {
        defaultProps: {
            IconComponent: SelectIcon
        },
        styleOverrides: {
            select: ({ theme, ownerState })=>({
                    ...ownerState.variant === 'outlined' && {
                        height: '1.5em'
                    },
                    '&[aria-expanded="true"] ~ i, &[aria-expanded="true"] ~ svg': {
                        transform: 'rotate(180deg)'
                    },
                    '& ~ i, & ~ svg': iconStyles(theme),
                    '&.MuiInputBase-inputSizeSmall': {
                        '& ~ i, & ~ svg': {
                            height: '1.125rem',
                            width: '1.125rem'
                        }
                    },
                    '&:not(aria-label="Without label") ~ .MuiOutlinedInput-notchedOutline > legend > span': {
                        paddingInline: '5px'
                    }
                })
        }
    },
    MuiNativeSelect: {
        styleOverrides: {
            select: ({ theme })=>({
                    '& + i, & + svg': iconStyles(theme)
                })
        }
    }
};
const __TURBOPACK__default__export__ = select;
}),
"[project]/src/@core/theme/overrides/slider.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const slider = {
    MuiSlider: {
        styleOverrides: {
            root: ({ ownerState })=>({
                    boxSizing: 'border-box',
                    ...ownerState.orientation === 'horizontal' ? ownerState.size !== 'small' ? {
                        blockSize: 6
                    } : {
                        blockSize: 4
                    } : ownerState.size !== 'small' ? {
                        inlineSize: 6
                    } : {
                        inlineSize: 4
                    },
                    '&.Mui-disabled': {
                        opacity: 0.45,
                        color: `var(--mui-palette-${ownerState.color}-main)`
                    }
                }),
            thumb: ({ ownerState })=>({
                    ...ownerState.size === 'small' ? {
                        blockSize: 14,
                        inlineSize: 14,
                        border: '2px solid currentColor',
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0 0 0 7px var(--mui-palette-${ownerState.color}-lightOpacity)`
                        },
                        '&.Mui-active.Mui-focusVisible': {
                            boxShadow: `0 0 0 10px var(--mui-palette-${ownerState.color}-lightOpacity)`
                        }
                    } : {
                        blockSize: 22,
                        inlineSize: 22,
                        border: '4px solid currentColor'
                    },
                    backgroundColor: 'var(--mui-palette-common-white)',
                    ...!ownerState.disabled && {
                        boxShadow: 'var(--mui-customShadows-sm)'
                    },
                    '&:before': {
                        boxShadow: 'none'
                    },
                    '&:after': {
                        ...ownerState.size === 'small' ? {
                            blockSize: 28,
                            inlineSize: 28
                        } : {
                            blockSize: 38,
                            inlineSize: 38
                        }
                    },
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0 0 0 8px var(--mui-palette-${ownerState.color}-lightOpacity)`
                    },
                    '&.Mui-active.Mui-focusVisible': {
                        boxShadow: `0 0 0 13px var(--mui-palette-${ownerState.color}-lightOpacity)`
                    }
                }),
            rail: ({ ownerState })=>({
                    opacity: 1,
                    color: `var(--mui-palette-${ownerState.color}-lightOpacity)`,
                    ...ownerState.track === 'inverted' && {
                        backgroundColor: `var(--mui-palette-${ownerState.color}-main)`
                    }
                }),
            valueLabel: ({ theme, ownerState })=>({
                    ...ownerState.size === 'small' ? {
                        ...theme.typography.caption,
                        padding: theme.spacing(0.5, 2),
                        borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
                    } : {
                        ...theme.typography.body2,
                        fontWeight: theme.typography.fontWeightMedium,
                        padding: theme.spacing(0.5, 2.5),
                        borderRadius: 'var(--mui-shape-borderRadius)'
                    },
                    color: 'var(--mui-palette-customColors-tooltipText)',
                    backgroundColor: 'var(--mui-palette-Tooltip-bg)',
                    '&:before': {
                        display: 'none'
                    }
                }),
            track: ({ theme, ownerState })=>({
                    ...ownerState.track === 'inverted' && {
                        backgroundColor: `color-mix(in srgb, ${theme.palette[ownerState.color || 'primary'].main} 16%, var(--mui-palette-background-paper))`,
                        borderColor: `color-mix(in srgb, ${theme.palette[ownerState.color || 'primary'].main} 16%, var(--mui-palette-background-paper))`
                    }
                })
        }
    }
};
const __TURBOPACK__default__export__ = slider;
}),
"[project]/src/@core/theme/overrides/snackbar.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const snackbar = (skin)=>({
        MuiSnackbarContent: {
            styleOverrides: {
                root: ({ theme })=>({
                        padding: theme.spacing(0, 4),
                        ...skin !== 'bordered' ? {
                            boxShadow: 'var(--mui-customShadows-xs)'
                        } : {
                            boxShadow: 'none'
                        },
                        '& .MuiSnackbarContent-message': {
                            paddingBlock: theme.spacing(3)
                        }
                    })
            }
        }
    });
const __TURBOPACK__default__export__ = snackbar;
}),
"[project]/src/@core/theme/overrides/switch.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const switchOverrides = {
    MuiSwitch: {
        defaultProps: {
            disableRipple: true
        },
        styleOverrides: {
            root: ({ theme, ownerState })=>({
                    '&:has(.Mui-disabled)': {
                        opacity: 0.45
                    },
                    ...ownerState.size !== 'small' ? {
                        width: 46,
                        height: 36,
                        padding: theme.spacing(2.25, 2)
                    } : {
                        width: 42,
                        height: 30,
                        padding: theme.spacing(1.75, 2),
                        '& .MuiSwitch-thumb': {
                            width: 12,
                            height: 12
                        },
                        '& .MuiSwitch-switchBase': {
                            padding: 7,
                            left: 3,
                            '&.Mui-checked': {
                                left: -3
                            }
                        }
                    }
                }),
            switchBase: ({ ownerState })=>({
                    top: 2,
                    left: 1,
                    '&.Mui-checked': {
                        left: -7,
                        color: 'var(--mui-palette-common-white)',
                        '& + .MuiSwitch-track': {
                            opacity: 1
                        }
                    },
                    '&.Mui-checked:not(.Mui-disabled) + .MuiSwitch-track': {
                        boxShadow: `var(--mui-customShadows-${ownerState.color}-sm)`
                    },
                    '&:not(.Mui-checked) + .MuiSwitch-track': {
                        boxShadow: '0 0 4px rgb(0 0 0 / 0.16) inset'
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: 1
                    },
                    '&:hover:not(:has(span.MuiTouchRipple-root))': {
                        backgroundColor: 'transparent'
                    }
                }),
            thumb: {
                width: 14,
                height: 14,
                boxShadow: 'var(--mui-customShadows-xs)'
            },
            track: {
                opacity: 1,
                borderRadius: 10,
                backgroundColor: 'var(--mui-palette-action-focus)'
            }
        }
    }
};
const __TURBOPACK__default__export__ = switchOverrides;
}),
"[project]/src/@core/theme/overrides/table-pagination.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const tablePagination = {
    MuiTablePagination: {
        styleOverrides: {
            toolbar: ({ theme })=>({
                    paddingInlineEnd: `${theme.spacing(3)} !important`
                }),
            select: {
                '& ~ i, & ~ svg': {
                    right: '2px !important'
                }
            }
        }
    }
};
const __TURBOPACK__default__export__ = tablePagination;
}),
"[project]/src/@core/theme/overrides/tabs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const tabs = {
    MuiTabs: {
        styleOverrides: {
            root: ({ theme, ownerState })=>({
                    minBlockSize: 38,
                    ...ownerState.orientation === 'horizontal' ? {
                        borderBlockEnd: '1px solid var(--mui-palette-divider)'
                    } : {
                        borderInlineEnd: '1px solid var(--mui-palette-divider)'
                    },
                    '& .MuiTab-root:hover': {
                        ...ownerState.orientation === 'horizontal' ? {
                            paddingBlockEnd: theme.spacing(1.5),
                            ...ownerState.textColor === 'secondary' ? {
                                color: 'var(--mui-palette-secondary-main)',
                                borderBlockEnd: '2px solid var(--mui-palette-secondary-lightOpacity)'
                            } : {
                                color: 'var(--mui-palette-primary-main)',
                                borderBlockEnd: '2px solid var(--mui-palette-primary-lightOpacity)'
                            }
                        } : {
                            paddingInlineEnd: theme.spacing(4.5),
                            ...ownerState.textColor === 'secondary' ? {
                                color: 'var(--mui-palette-secondary-main)',
                                borderInlineEnd: '2px solid var(--mui-palette-secondary-mainOpacity)'
                            } : {
                                color: 'var(--mui-palette-primary-main)',
                                borderInlineEnd: '2px solid var(--mui-palette-primary-mainOpacity)'
                            }
                        },
                        '& .MuiTabScrollButton-root': {
                            borderRadius: 'var(--mui-shape-borderRadius)'
                        }
                    },
                    '& ~ .MuiTabPanel-root': {
                        ...ownerState.orientation === 'horizontal' ? {
                            paddingBlockStart: theme.spacing(6)
                        } : {
                            paddingInlineStart: theme.spacing(6)
                        }
                    }
                }),
            vertical: {
                minWidth: 131,
                '& .MuiTab-root': {
                    minWidth: 130
                }
            }
        }
    },
    MuiTab: {
        defaultProps: {
            disableRipple: true
        },
        styleOverrides: {
            root: ({ theme, ownerState })=>({
                    lineHeight: 1.4667,
                    padding: theme.spacing(2, 5),
                    minBlockSize: 38,
                    color: 'var(--mui-palette-text-primary)',
                    '& > .MuiTab-icon': {
                        fontSize: '1.125rem',
                        ...ownerState.iconPosition === 'top' && {
                            marginBlockEnd: theme.spacing(1.5)
                        },
                        ...ownerState.iconPosition === 'bottom' && {
                            marginBlockStart: theme.spacing(1.5)
                        },
                        ...ownerState.iconPosition === 'start' && {
                            marginInlineEnd: theme.spacing(1.5)
                        },
                        ...ownerState.iconPosition === 'end' && {
                            marginInlineStart: theme.spacing(1.5)
                        }
                    }
                })
        }
    },
    MuiTabPanel: {
        styleOverrides: {
            root: {
                padding: 0
            }
        }
    }
};
const __TURBOPACK__default__export__ = tabs;
}),
"[project]/src/@core/theme/overrides/timeline.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const timeline = {
    MuiTimeline: {
        styleOverrides: {
            root: {
                padding: 0
            }
        }
    },
    MuiTimelineDot: {
        styleOverrides: {
            root: ({ theme })=>({
                    margin: theme.spacing(3, 0),
                    boxShadow: 'none',
                    '&:has(> i), &:has(> svg)': {
                        padding: 6
                    },
                    '& > svg, & > i': {
                        fontSize: '1.25rem'
                    },
                    '&:has(svg)': {
                        width: 32,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    variants: [
                        {
                            props: {
                                variant: 'outlined'
                            },
                            style: {
                                padding: 5,
                                '& + .MuiTimelineConnector-root': {
                                    backgroundColor: 'transparent',
                                    borderInlineStart: '1px dashed var(--mui-palette-divider)'
                                },
                                '&:has(+ .MuiTimelineConnector-root)': {
                                    marginBlock: '0.625rem'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                color: 'grey'
                            },
                            style: {
                                boxShadow: '0 0 0 3px rgb(var(--mui-palette-action-activeChannel) / 0.04)'
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                color: 'primary'
                            },
                            style: {
                                boxShadow: '0 0 0 3px var(--mui-palette-primary-lightOpacity)'
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                color: 'secondary'
                            },
                            style: {
                                boxShadow: '0 0 0 3px var(--mui-palette-secondary-lightOpacity)'
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                color: 'error'
                            },
                            style: {
                                boxShadow: '0 0 0 3px var(--mui-palette-error-lightOpacity)'
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                color: 'warning'
                            },
                            style: {
                                boxShadow: '0 0 0 3px var(--mui-palette-warning-lightOpacity)'
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                color: 'info'
                            },
                            style: {
                                boxShadow: '0 0 0 3px var(--mui-palette-info-lightOpacity)'
                            }
                        },
                        {
                            props: {
                                variant: 'filled',
                                color: 'success'
                            },
                            style: {
                                boxShadow: '0 0 0 3px var(--mui-palette-success-lightOpacity)'
                            }
                        },
                        {
                            props: {
                                variant: 'tonal'
                            },
                            style: {
                                border: 0,
                                '&:has(+ .MuiTimelineConnector-root)': {
                                    marginBlock: '1rem'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'grey'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-action-selected)',
                                color: 'var(--mui-palette-text-primary)'
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'primary'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                                color: 'var(--mui-palette-primary-main)'
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'secondary'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-secondary-lightOpacity)',
                                color: 'var(--mui-palette-secondary-main)'
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'error'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-error-lightOpacity)',
                                color: 'var(--mui-palette-error-main)'
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'warning'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-warning-lightOpacity)',
                                color: 'var(--mui-palette-warning-main)'
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'info'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-info-lightOpacity)',
                                color: 'var(--mui-palette-info-main)'
                            }
                        },
                        {
                            props: {
                                variant: 'tonal',
                                color: 'success'
                            },
                            style: {
                                backgroundColor: 'var(--mui-palette-success-lightOpacity)',
                                color: 'var(--mui-palette-success-main)'
                            }
                        }
                    ]
                })
        }
    },
    MuiTimelineConnector: {
        styleOverrides: {
            root: {
                width: 1,
                backgroundColor: 'var(--mui-palette-divider)'
            }
        }
    },
    MuiTimelineContent: {
        styleOverrides: {
            root: {
                paddingBottom: '1rem'
            }
        }
    }
};
const __TURBOPACK__default__export__ = timeline;
}),
"[project]/src/@core/theme/overrides/toggle-button.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const toggleButton = {
    MuiToggleButtonGroup: {
        styleOverrides: {
            root: ({ ownerState })=>({
                    ...ownerState.size === 'small' && {
                        borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
                    },
                    ...ownerState.size === 'large' && {
                        borderRadius: 'var(--mui-shape-customBorderRadius-lg)'
                    }
                })
        }
    },
    MuiToggleButton: {
        styleOverrides: {
            root: {
                '&:not(.Mui-selected):not(.Mui-disabled)': {
                    color: 'var(--mui-palette-text-secondary)'
                }
            },
            sizeSmall: {
                borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
            },
            sizeLarge: {
                borderRadius: 'var(--mui-shape-customBorderRadius-lg)'
            }
        }
    }
};
const __TURBOPACK__default__export__ = toggleButton;
}),
"[project]/src/@core/theme/overrides/tooltip.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const tooltip = {
    MuiTooltip: {
        styleOverrides: {
            tooltip: ({ theme })=>({
                    borderRadius: 'var(--mui-shape-customBorderRadius-sm)',
                    fontSize: theme.typography.subtitle2.fontSize,
                    lineHeight: 1.539,
                    color: 'var(--mui-palette-customColors-tooltipText)',
                    paddingInline: theme.spacing(3),
                    paddingBlock: 5
                }),
            popper: {
                '&[data-popper-placement*="bottom"] .MuiTooltip-tooltip': {
                    marginTop: '6px !important'
                },
                '&[data-popper-placement*="top"] .MuiTooltip-tooltip': {
                    marginBottom: '6px !important'
                },
                '&[data-popper-placement*="left"] .MuiTooltip-tooltip': {
                    marginRight: '6px !important'
                },
                '&[data-popper-placement*="right"] .MuiTooltip-tooltip': {
                    marginLeft: '6px !important'
                }
            }
        }
    }
};
const __TURBOPACK__default__export__ = tooltip;
}),
"[project]/src/@core/theme/overrides/typography.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const typography = {
    MuiTypography: {
        styleOverrides: {
            root: {
                variants: [
                    {
                        props: {
                            variant: 'h1'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    },
                    {
                        props: {
                            variant: 'h2'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    },
                    {
                        props: {
                            variant: 'h3'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    },
                    {
                        props: {
                            variant: 'h4'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    },
                    {
                        props: {
                            variant: 'h5'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    },
                    {
                        props: {
                            variant: 'h6'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    },
                    {
                        props: {
                            variant: 'subtitle1'
                        },
                        style: {
                            color: 'rgb(var(--mui-palette-text-primaryChannel) / 0.55)'
                        }
                    },
                    {
                        props: {
                            variant: 'subtitle2'
                        },
                        style: {
                            color: 'rgb(var(--mui-palette-text-primaryChannel) / 0.55)'
                        }
                    },
                    {
                        props: {
                            variant: 'body1'
                        },
                        style: {
                            color: 'var(--mui-palette-text-secondary)'
                        }
                    },
                    {
                        props: {
                            variant: 'body2'
                        },
                        style: {
                            color: 'var(--mui-palette-text-secondary)'
                        }
                    },
                    {
                        props: {
                            variant: 'button'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    },
                    {
                        props: {
                            variant: 'caption'
                        },
                        style: {
                            color: 'var(--mui-palette-text-disabled)'
                        }
                    },
                    {
                        props: {
                            variant: 'overline'
                        },
                        style: {
                            color: 'var(--mui-palette-text-primary)'
                        }
                    }
                ]
            },
            gutterBottom: ({ theme })=>({
                    marginBottom: theme.spacing(2)
                })
        }
    }
};
const __TURBOPACK__default__export__ = typography;
}),
"[project]/src/@core/theme/overrides/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Type Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Override Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$accordion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/accordion.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/alert.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$autocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/autocomplete.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$avatar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/avatar.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$backdrop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/backdrop.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$badges$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/badges.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$breadcrumbs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/breadcrumbs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$button$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/button.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$button$2d$group$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/button-group.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/card.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$chip$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/chip.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$dialog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/dialog.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$drawer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/drawer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$fab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/fab.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$form$2d$control$2d$label$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/form-control-label.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$icon$2d$button$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/icon-button.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$input$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/input.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$list$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/list.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$menu$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/menu.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$pagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/pagination.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$paper$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/paper.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$popover$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/popover.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/progress.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$radio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/radio.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$rating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/rating.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$slider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/slider.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$snackbar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/snackbar.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$switch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/switch.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$table$2d$pagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/table-pagination.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$tabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/tabs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$timeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/timeline.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$toggle$2d$button$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/toggle-button.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$tooltip$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/tooltip.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$typography$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/typography.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const overrides = (skin)=>{
    return Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$accordion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$autocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$avatar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$backdrop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$badges$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$breadcrumbs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$button$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$button$2d$group$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$chip$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$dialog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$drawer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$fab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$form$2d$control$2d$label$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$icon$2d$button$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$input$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$list$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$menu$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$pagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$paper$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$popover$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$radio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$rating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$slider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$snackbar$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(skin), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$switch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$table$2d$pagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$tabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$timeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$toggle$2d$button$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$tooltip$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$typography$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
};
const __TURBOPACK__default__export__ = overrides;
}),
"[project]/src/@core/theme/colorSchemes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const colorSchemes = (skin)=>{
    return {
        light: {
            palette: {
                primary: {
                    main: '#7367F0',
                    light: '#8F85F3',
                    dark: '#675DD8',
                    lighterOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.38)'
                },
                secondary: {
                    main: '#808390',
                    light: '#999CA6',
                    dark: '#737682',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.38)'
                },
                error: {
                    main: '#FF4C51',
                    light: '#FF7074',
                    dark: '#E64449',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.38)'
                },
                warning: {
                    main: '#FF9F43',
                    light: '#FFB269',
                    dark: '#E68F3C',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.38)'
                },
                info: {
                    main: '#00BAD1',
                    light: '#33C8DA',
                    dark: '#00A7BC',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.38)'
                },
                success: {
                    main: '#28C76F',
                    light: '#53D28C',
                    dark: '#24B364',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.38)'
                },
                text: {
                    primary: `rgb(var(--mui-mainColorChannels-light) / 0.9)`,
                    secondary: `rgb(var(--mui-mainColorChannels-light) / 0.7)`,
                    disabled: `rgb(var(--mui-mainColorChannels-light) / 0.4)`,
                    primaryChannel: 'var(--mui-mainColorChannels-light)',
                    secondaryChannel: 'var(--mui-mainColorChannels-light)'
                },
                divider: `rgb(var(--mui-mainColorChannels-light) / 0.12)`,
                dividerChannel: 'var(--mui-mainColorChannels-light)',
                background: {
                    default: skin === 'bordered' ? '#FFFFFF' : '#F8F7FA',
                    paper: '#FFFFFF',
                    paperChannel: '255 255 255'
                },
                action: {
                    active: `rgb(var(--mui-mainColorChannels-light) / 0.6)`,
                    hover: `rgb(var(--mui-mainColorChannels-light) / 0.06)`,
                    selected: `rgb(var(--mui-mainColorChannels-light) / 0.08)`,
                    disabled: `rgb(var(--mui-mainColorChannels-light) / 0.3)`,
                    disabledBackground: `rgb(var(--mui-mainColorChannels-light) / 0.16)`,
                    focus: `rgb(var(--mui-mainColorChannels-light) / 0.1)`,
                    focusOpacity: 0.1,
                    activeChannel: 'var(--mui-mainColorChannels-light)',
                    selectedChannel: 'var(--mui-mainColorChannels-light)'
                },
                Alert: {
                    errorColor: 'var(--mui-palette-error-main)',
                    warningColor: 'var(--mui-palette-warning-main)',
                    infoColor: 'var(--mui-palette-info-main)',
                    successColor: 'var(--mui-palette-success-main)',
                    errorStandardBg: 'var(--mui-palette-error-lightOpacity)',
                    warningStandardBg: 'var(--mui-palette-warning-lightOpacity)',
                    infoStandardBg: 'var(--mui-palette-info-lightOpacity)',
                    successStandardBg: 'var(--mui-palette-success-lightOpacity)',
                    errorFilledColor: 'var(--mui-palette-error-contrastText)',
                    warningFilledColor: 'var(--mui-palette-warning-contrastText)',
                    infoFilledColor: 'var(--mui-palette-info-contrastText)',
                    successFilledColor: 'var(--mui-palette-success-contrastText)',
                    errorFilledBg: 'var(--mui-palette-error-main)',
                    warningFilledBg: 'var(--mui-palette-warning-main)',
                    infoFilledBg: 'var(--mui-palette-info-main)',
                    successFilledBg: 'var(--mui-palette-success-main)'
                },
                Avatar: {
                    defaultBg: '#EEEDF0'
                },
                Chip: {
                    defaultBorder: 'var(--mui-palette-divider)'
                },
                FilledInput: {
                    bg: 'var(--mui-palette-action-hover)',
                    hoverBg: 'var(--mui-palette-action-selected)',
                    disabledBg: 'var(--mui-palette-action-hover)'
                },
                SnackbarContent: {
                    bg: '#2F2B3D',
                    color: 'var(--mui-palette-background-paper)'
                },
                Switch: {
                    defaultColor: 'var(--mui-palette-common-white)',
                    defaultDisabledColor: 'var(--mui-palette-common-white)',
                    primaryDisabledColor: 'var(--mui-palette-common-white)',
                    secondaryDisabledColor: 'var(--mui-palette-common-white)',
                    errorDisabledColor: 'var(--mui-palette-common-white)',
                    warningDisabledColor: 'var(--mui-palette-common-white)',
                    infoDisabledColor: 'var(--mui-palette-common-white)',
                    successDisabledColor: 'var(--mui-palette-common-white)'
                },
                Tooltip: {
                    bg: '#2F2B3D'
                },
                TableCell: {
                    border: 'var(--mui-palette-divider)'
                },
                customColors: {
                    bodyBg: '#F8F7FA',
                    chatBg: '#F3F2F5',
                    greyLightBg: '#FAFAFA',
                    inputBorder: `rgb(var(--mui-mainColorChannels-light) / 0.22)`,
                    tableHeaderBg: '#FFFFFF',
                    tooltipText: '#FFFFFF',
                    trackBg: '#F1F0F2'
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#7367F0',
                    light: '#8F85F3',
                    dark: '#675DD8',
                    lighterOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.38)'
                },
                secondary: {
                    main: '#808390',
                    light: '#999CA6',
                    dark: '#737682',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.38)'
                },
                error: {
                    main: '#FF4C51',
                    light: '#FF7074',
                    dark: '#E64449',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-error-mainChannel) / 0.38)'
                },
                warning: {
                    main: '#FF9F43',
                    light: '#FFB269',
                    dark: '#E68F3C',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-warning-mainChannel) / 0.38)'
                },
                info: {
                    main: '#00BAD1',
                    light: '#33C8DA',
                    dark: '#00A7BC',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-info-mainChannel) / 0.38)'
                },
                success: {
                    main: '#28C76F',
                    light: '#53D28C',
                    dark: '#24B364',
                    contrastText: '#FFF',
                    lighterOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.08)',
                    lightOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.16)',
                    mainOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.24)',
                    darkOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.32)',
                    darkerOpacity: 'rgb(var(--mui-palette-success-mainChannel) / 0.38)'
                },
                text: {
                    primary: `rgb(var(--mui-mainColorChannels-dark) / 0.9)`,
                    secondary: `rgb(var(--mui-mainColorChannels-dark) / 0.7)`,
                    disabled: `rgb(var(--mui-mainColorChannels-dark) / 0.4)`,
                    primaryChannel: 'var(--mui-mainColorChannels-dark)',
                    secondaryChannel: 'var(--mui-mainColorChannels-dark)'
                },
                divider: `rgb(var(--mui-mainColorChannels-dark) / 0.12)`,
                dividerChannel: 'var(--mui-mainColorChannels-dark)',
                background: {
                    default: skin === 'bordered' ? '#2F3349' : '#25293C',
                    paper: '#2F3349',
                    paperChannel: '47 51 73'
                },
                action: {
                    active: `rgb(var(--mui-mainColorChannels-dark) / 0.6)`,
                    hover: `rgb(var(--mui-mainColorChannels-dark) / 0.06)`,
                    selected: `rgb(var(--mui-mainColorChannels-dark) / 0.08)`,
                    disabled: `rgb(var(--mui-mainColorChannels-dark) / 0.3)`,
                    disabledBackground: `rgb(var(--mui-mainColorChannels-dark) / 0.16)`,
                    focus: `rgb(var(--mui-mainColorChannels-dark) / 0.1)`,
                    focusOpacity: 0.1,
                    activeChannel: 'var(--mui-mainColorChannels-dark)',
                    selectedChannel: 'var(--mui-mainColorChannels-dark)'
                },
                Alert: {
                    errorColor: 'var(--mui-palette-error-main)',
                    warningColor: 'var(--mui-palette-warning-main)',
                    infoColor: 'var(--mui-palette-info-main)',
                    successColor: 'var(--mui-palette-success-main)',
                    errorStandardBg: 'var(--mui-palette-error-lightOpacity)',
                    warningStandardBg: 'var(--mui-palette-warning-lightOpacity)',
                    infoStandardBg: 'var(--mui-palette-info-lightOpacity)',
                    successStandardBg: 'var(--mui-palette-success-lightOpacity)',
                    errorFilledColor: 'var(--mui-palette-error-contrastText)',
                    warningFilledColor: 'var(--mui-palette-warning-contrastText)',
                    infoFilledColor: 'var(--mui-palette-info-contrastText)',
                    successFilledColor: 'var(--mui-palette-success-contrastText)',
                    errorFilledBg: 'var(--mui-palette-error-main)',
                    warningFilledBg: 'var(--mui-palette-warning-main)',
                    infoFilledBg: 'var(--mui-palette-info-main)',
                    successFilledBg: 'var(--mui-palette-success-main)'
                },
                Avatar: {
                    defaultBg: '#373B50'
                },
                Chip: {
                    defaultBorder: 'var(--mui-palette-divider)'
                },
                FilledInput: {
                    bg: 'var(--mui-palette-action-hover)',
                    hoverBg: 'var(--mui-palette-action-selected)',
                    disabledBg: `var(--mui-palette-action-hover)`
                },
                SnackbarContent: {
                    bg: '#F7F4FF',
                    color: 'var(--mui-palette-background-paper)'
                },
                Switch: {
                    defaultColor: 'var(--mui-palette-common-white)',
                    defaultDisabledColor: 'var(--mui-palette-common-white)',
                    primaryDisabledColor: 'var(--mui-palette-common-white)',
                    secondaryDisabledColor: 'var(--mui-palette-common-white)',
                    errorDisabledColor: 'var(--mui-palette-common-white)',
                    warningDisabledColor: 'var(--mui-palette-common-white)',
                    infoDisabledColor: 'var(--mui-palette-common-white)',
                    successDisabledColor: 'var(--mui-palette-common-white)'
                },
                Tooltip: {
                    bg: '#F7F4FF'
                },
                TableCell: {
                    border: 'var(--mui-palette-divider)'
                },
                customColors: {
                    bodyBg: '#25293C',
                    chatBg: '#202534',
                    greyLightBg: '#353A52',
                    inputBorder: `rgb(var(--mui-mainColorChannels-dark) / 0.22)`,
                    tableHeaderBg: '#2F3349',
                    tooltipText: '#2F3349',
                    trackBg: '#3A3F57'
                }
            }
        }
    };
};
const __TURBOPACK__default__export__ = colorSchemes;
}),
"[project]/src/@core/theme/spacing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const spacing = {
    spacing: (factor)=>`${0.25 * factor}rem`
};
const __TURBOPACK__default__export__ = spacing;
}),
"[project]/src/@core/theme/shadows.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const shadows = (mode)=>{
    const color = `var(--mui-mainColorChannels-${mode}Shadow)`;
    return [
        'none',
        `0px 2px 1px -1px rgb(${color} / 0.2),0px 1px 1px 0px rgb(${color} / 0.14),0px 1px 3px 0px rgb(${color} / 0.12)`,
        `0px 3px 1px -2px rgb(${color} / 0.2),0px 2px 2px 0px rgb(${color} / 0.14),0px 1px 5px 0px rgb(${color} / 0.12)`,
        `0px 3px 3px -2px rgb(${color} / 0.2),0px 3px 4px 0px rgb(${color} / 0.14),0px 1px 8px 0px rgb(${color} / 0.12)`,
        `0px 2px 4px -1px rgb(${color} / 0.2),0px 4px 5px 0px rgb(${color} / 0.14),0px 1px 10px 0px rgb(${color} / 0.12)`,
        `0px 3px 5px -1px rgb(${color} / 0.2),0px 5px 8px 0px rgb(${color} / 0.14),0px 1px 14px 0px rgb(${color} / 0.12)`,
        `0px 3px 5px -1px rgb(${color} / 0.2),0px 6px 10px 0px rgb(${color} / 0.14),0px 1px 18px 0px rgb(${color} / 0.12)`,
        `0px 4px 5px -2px rgb(${color} / 0.2),0px 7px 10px 1px rgb(${color} / 0.14),0px 2px 16px 1px rgb(${color} / 0.12)`,
        `0px 5px 5px -3px rgb(${color} / 0.2),0px 8px 10px 1px rgb(${color} / 0.14),0px 3px 14px 2px rgb(${color} / 0.12)`,
        `0px 5px 6px -3px rgb(${color} / 0.2),0px 9px 12px 1px rgb(${color} / 0.14),0px 3px 16px 2px rgb(${color} / 0.12)`,
        `0px 6px 6px -3px rgb(${color} / 0.2),0px 10px 14px 1px rgb(${color} / 0.14),0px 4px 18px 3px rgb(${color} / 0.12)`,
        `0px 6px 7px -4px rgb(${color} / 0.2),0px 11px 15px 1px rgb(${color} / 0.14),0px 4px 20px 3px rgb(${color} / 0.12)`,
        `0px 7px 8px -4px rgb(${color} / 0.2),0px 12px 17px 2px rgb(${color} / 0.14),0px 5px 22px 4px rgb(${color} / 0.12)`,
        `0px 7px 8px -4px rgb(${color} / 0.2),0px 13px 19px 2px rgb(${color} / 0.14),0px 5px 24px 4px rgb(${color} / 0.12)`,
        `0px 7px 9px -4px rgb(${color} / 0.2),0px 14px 21px 2px rgb(${color} / 0.14),0px 5px 26px 4px rgb(${color} / 0.12)`,
        `0px 8px 9px -5px rgb(${color} / 0.2),0px 15px 22px 2px rgb(${color} / 0.14),0px 6px 28px 5px rgb(${color} / 0.12)`,
        `0px 8px 10px -5px rgb(${color} / 0.2),0px 16px 24px 2px rgb(${color} / 0.14),0px 6px 30px 5px rgb(${color} / 0.12)`,
        `0px 8px 11px -5px rgb(${color} / 0.2),0px 17px 26px 2px rgb(${color} / 0.14),0px 6px 32px 5px rgb(${color} / 0.12)`,
        `0px 9px 11px -5px rgb(${color} / 0.2),0px 18px 28px 2px rgb(${color} / 0.14),0px 7px 34px 6px rgb(${color} / 0.12)`,
        `0px 9px 12px -6px rgb(${color} / 0.2),0px 19px 29px 2px rgb(${color} / 0.14),0px 7px 36px 6px rgb(${color} / 0.12)`,
        `0px 10px 13px -6px rgb(${color} / 0.2),0px 20px 31px 3px rgb(${color} / 0.14),0px 8px 38px 7px rgb(${color} / 0.12)`,
        `0px 10px 13px -6px rgb(${color} / 0.2),0px 21px 33px 3px rgb(${color} / 0.14),0px 8px 40px 7px rgb(${color} / 0.12)`,
        `0px 10px 14px -6px rgb(${color} / 0.2),0px 22px 35px 3px rgb(${color} / 0.14),0px 8px 42px 7px rgb(${color} / 0.12)`,
        `0px 11px 14px -7px rgb(${color} / 0.2),0px 23px 36px 3px rgb(${color} / 0.14),0px 9px 44px 8px rgb(${color} / 0.12)`,
        `0px 11px 15px -7px rgb(${color} / 0.2),0px 24px 38px 3px rgb(${color} / 0.14),0px 9px 46px 8px rgb(${color} / 0.12)`
    ];
};
const __TURBOPACK__default__export__ = shadows;
}),
"[project]/src/@core/theme/customShadows.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const customShadows = (mode)=>{
    return {
        xs: `0px 1px 6px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.1 : 0.16})`,
        sm: `0px 2px 8px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.12 : 0.18})`,
        md: `0px 3px 12px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.14 : 0.2})`,
        lg: `0px 4px 18px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.16 : 0.22})`,
        xl: `0px 5px 30px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.18 : 0.24})`,
        primary: {
            sm: '0px 2px 6px rgb(var(--mui-palette-primary-mainChannel) / 0.3)',
            md: '0px 4px 16px rgb(var(--mui-palette-primary-mainChannel) / 0.4)',
            lg: '0px 6px 20px rgb(var(--mui-palette-primary-mainChannel) / 0.5)'
        },
        secondary: {
            sm: '0px 2px 6px rgb(var(--mui-palette-secondary-mainChannel) / 0.3)',
            md: '0px 4px 16px rgb(var(--mui-palette-secondary-mainChannel) / 0.4)',
            lg: '0px 6px 20px rgb(var(--mui-palette-secondary-mainChannel) / 0.5)'
        },
        error: {
            sm: '0px 2px 6px rgb(var(--mui-palette-error-mainChannel) / 0.3)',
            md: '0px 4px 16px rgb(var(--mui-palette-error-mainChannel) / 0.4)',
            lg: '0px 6px 20px rgb(var(--mui-palette-error-mainChannel) / 0.5)'
        },
        warning: {
            sm: '0px 2px 6px rgb(var(--mui-palette-warning-mainChannel) / 0.3)',
            md: '0px 4px 16px rgb(var(--mui-palette-warning-mainChannel) / 0.4)',
            lg: '0px 6px 20px rgb(var(--mui-palette-warning-mainChannel) / 0.5)'
        },
        info: {
            sm: '0px 2px 6px rgb(var(--mui-palette-info-mainChannel) / 0.3)',
            md: '0px 4px 16px rgb(var(--mui-palette-info-mainChannel) / 0.4)',
            lg: '0px 6px 20px rgb(var(--mui-palette-info-mainChannel) / 0.5)'
        },
        success: {
            sm: '0px 2px 6px rgb(var(--mui-palette-success-mainChannel) / 0.3)',
            md: '0px 4px 16px rgb(var(--mui-palette-success-mainChannel) / 0.4)',
            lg: '0px 6px 20px rgb(var(--mui-palette-success-mainChannel) / 0.5)'
        }
    };
};
const __TURBOPACK__default__export__ = customShadows;
}),
"[project]/src/@core/theme/typography.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MUI Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const typography = (fontFamily)=>({
        fontFamily: typeof fontFamily === 'undefined' || fontFamily === '' ? [
            '"Public Sans"',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',') : fontFamily,
        fontSize: 13.125,
        h1: {
            fontSize: '2.875rem',
            fontWeight: 500,
            lineHeight: 1.47826
        },
        h2: {
            fontSize: '2.375rem',
            fontWeight: 500,
            lineHeight: 1.47368421
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            lineHeight: 1.5
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.58334
        },
        h5: {
            fontSize: '1.125rem',
            fontWeight: 500,
            lineHeight: 1.5556
        },
        h6: {
            fontSize: '0.9375rem',
            fontWeight: 500,
            lineHeight: 1.46667
        },
        subtitle1: {
            fontSize: '0.9375rem',
            lineHeight: 1.46667
        },
        subtitle2: {
            fontSize: '0.8125rem',
            fontWeight: 400,
            lineHeight: 1.53846154
        },
        body1: {
            fontSize: '0.9375rem',
            lineHeight: 1.46667
        },
        body2: {
            fontSize: '0.8125rem',
            lineHeight: 1.53846154
        },
        button: {
            fontSize: '0.9375rem',
            lineHeight: 1.46667,
            textTransform: 'none'
        },
        caption: {
            fontSize: '0.8125rem',
            lineHeight: 1.38462,
            letterSpacing: '0.4px'
        },
        overline: {
            fontSize: '0.75rem',
            lineHeight: 1.16667,
            letterSpacing: '0.8px'
        }
    });
const __TURBOPACK__default__export__ = typography;
}),
"[project]/src/@core/theme/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Next Imports
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_c04fba6f$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/public_sans_c04fba6f.js [app-ssr] (ecmascript)");
// Theme Options Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/overrides/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$colorSchemes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/colorSchemes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$spacing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/spacing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$shadows$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/shadows.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$customShadows$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/customShadows.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$typography$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/typography.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const theme = (settings, mode, direction)=>{
    return {
        direction,
        components: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$overrides$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(settings.skin),
        colorSchemes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$colorSchemes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(settings.skin),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$spacing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        shape: {
            borderRadius: 6,
            customBorderRadius: {
                xs: 2,
                sm: 4,
                md: 6,
                lg: 8,
                xl: 10
            }
        },
        shadows: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$shadows$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(mode),
        typography: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$typography$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_c04fba6f$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].style.fontFamily),
        customShadows: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$customShadows$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(mode),
        mainColorChannels: {
            light: '47 43 61',
            dark: '225 222 245',
            lightShadow: '47 43 61',
            darkShadow: '19 17 32'
        }
    };
};
const __TURBOPACK__default__export__ = theme;
}),
"[project]/src/components/theme/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// React Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// MUI Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$deepmerge$2f$deepmerge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__deepmerge$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/utils/esm/deepmerge/deepmerge.js [app-ssr] (ecmascript) <export default as deepmerge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/ThemeProvider.js [app-ssr] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-ssr] (ecmascript) <export default as createTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$esm$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material-nextjs/esm/v13-appRouter/appRouterV13.js [app-ssr] (ecmascript) <export default as AppRouterCacheProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CssBaseline/CssBaseline.js [app-ssr] (ecmascript)");
// Third-party Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2f$esm$2f$useMedia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useMedia$3e$__ = __turbopack_context__.i("[project]/node_modules/react-use/esm/useMedia.js [app-ssr] (ecmascript) <export default as useMedia>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stylis$2d$plugin$2d$rtl$2f$dist$2f$stylis$2d$rtl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stylis-plugin-rtl/dist/stylis-rtl.js [app-ssr] (ecmascript)");
// Component Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2f$ModeChanger$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/theme/ModeChanger.tsx [app-ssr] (ecmascript)");
// Config Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/themeConfig.ts [app-ssr] (ecmascript)");
// Hook Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/hooks/useSettings.tsx [app-ssr] (ecmascript)");
// Core Theme Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/@core/theme/index.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const CustomThemeProvider = (props)=>{
    // Props
    const { children, direction, systemMode } = props;
    // Hooks
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$hooks$2f$useSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    const isDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$use$2f$esm$2f$useMedia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useMedia$3e$__["useMedia"])('(prefers-color-scheme: dark)', systemMode === 'dark');
    // Vars
    const isServer = ("TURBOPACK compile-time value", "undefined") === 'undefined';
    let currentMode;
    if ("TURBOPACK compile-time truthy", 1) {
        currentMode = systemMode;
    } else //TURBOPACK unreachable
    ;
    // Merge the primary color scheme override with the core theme
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const newTheme = {
            colorSchemes: {
                light: {
                    palette: {
                        primary: {
                            main: settings.primaryColor,
                            light: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lighten"])(settings.primaryColor, 0.2),
                            dark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["darken"])(settings.primaryColor, 0.1)
                        }
                    }
                },
                dark: {
                    palette: {
                        primary: {
                            main: settings.primaryColor,
                            light: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lighten"])(settings.primaryColor, 0.2),
                            dark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["darken"])(settings.primaryColor, 0.1)
                        }
                    }
                }
            },
            cssVariables: {
                colorSchemeSelector: 'data'
            }
        };
        const coreTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$deepmerge$2f$deepmerge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__deepmerge$3e$__["deepmerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f40$core$2f$theme$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(settings, currentMode, direction), newTheme);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])(coreTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        settings.primaryColor,
        settings.skin,
        currentMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$esm$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__["AppRouterCacheProvider"], {
        options: {
            prepend: true,
            ...direction === 'rtl' && {
                key: 'rtl',
                stylisPlugins: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stylis$2d$plugin$2d$rtl$2f$dist$2f$stylis$2d$rtl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                ]
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
            theme: theme,
            defaultMode: systemMode,
            modeStorageKey: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$themeConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].templateName.toLowerCase().split(' ').join('-')}-mui-template-mode`,
            forceThemeRerender: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2f$ModeChanger$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        systemMode: systemMode
                    }, void 0, false, {
                        fileName: "[project]/src/components/theme/index.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/theme/index.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    children
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/src/components/theme/index.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/theme/index.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CustomThemeProvider;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a032a39b._.js.map