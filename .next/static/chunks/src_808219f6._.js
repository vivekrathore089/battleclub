(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/hooks/use-toast.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "reducer": (()=>reducer),
    "toast": (()=>toast),
    "useToast": (()=>useToast)
});
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(memoryState);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/toast.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toast": (()=>Toast),
    "ToastAction": (()=>ToastAction),
    "ToastClose": (()=>ToastClose),
    "ToastDescription": (()=>ToastDescription),
    "ToastProvider": (()=>ToastProvider),
    "ToastTitle": (()=>ToastTitle),
    "ToastViewport": (()=>ToastViewport)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, this));
_c1 = ToastViewport;
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
});
_c3 = Toast;
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, this));
_c5 = ToastAction;
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, this));
_c7 = ToastClose;
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this));
_c9 = ToastTitle;
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, this));
_c11 = ToastDescription;
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "ToastViewport$React.forwardRef");
__turbopack_context__.k.register(_c1, "ToastViewport");
__turbopack_context__.k.register(_c2, "Toast$React.forwardRef");
__turbopack_context__.k.register(_c3, "Toast");
__turbopack_context__.k.register(_c4, "ToastAction$React.forwardRef");
__turbopack_context__.k.register(_c5, "ToastAction");
__turbopack_context__.k.register(_c6, "ToastClose$React.forwardRef");
__turbopack_context__.k.register(_c7, "ToastClose");
__turbopack_context__.k.register(_c8, "ToastTitle$React.forwardRef");
__turbopack_context__.k.register(_c9, "ToastTitle");
__turbopack_context__.k.register(_c10, "ToastDescription$React.forwardRef");
__turbopack_context__.k.register(_c11, "ToastDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/toaster.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toaster() {
    _s();
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/src/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Toaster, "1YTCnXrq2qRowe0H/LBWLjtXoYc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = Toaster;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/bottom-nav.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BottomNav)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-client] (ecmascript) <export default as UserCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const navItems = [
    {
        href: '/home',
        label: 'Home',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
    },
    {
        href: '/refer',
        label: 'Refer',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        href: '/top-players',
        label: 'Top Players',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"]
    },
    {
        href: '/wallet',
        label: 'Wallet',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
    },
    {
        href: '/profile',
        label: 'Profile',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"]
    }
];
function BottomNav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname === '/login' || pathname === '/signup' || pathname.startsWith('/admin')) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-primary/20 md:hidden z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "grid grid-cols-5 justify-items-center items-center h-16",
            children: navItems.map((item)=>{
                const isActive = item.href === '/home' ? pathname === item.href || pathname === '/' : pathname.startsWith(item.href);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    legacyBehavior: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center justify-center text-xs gap-1 transition-colors w-full h-full", isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6 transition-transform", isActive ? 'scale-110' : '')
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/bottom-nav.tsx",
                                lineNumber: 35,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold text-center", isActive ? 'font-bold' : ''),
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/bottom-nav.tsx",
                                lineNumber: 36,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/bottom-nav.tsx",
                        lineNumber: 31,
                        columnNumber: 15
                    }, this)
                }, item.label, false, {
                    fileName: "[project]/src/components/layout/bottom-nav.tsx",
                    lineNumber: 30,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/layout/bottom-nav.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/bottom-nav.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(BottomNav, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = BottomNav;
var _c;
__turbopack_context__.k.register(_c, "BottomNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/app-info-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "appInfo": (()=>appInfo)
});
const appInfo = {
    oneAccountPerDevice: true,
    supportNumber: '910000000000',
    appLink: 'https://play.google.com/store/apps/details?id=com.battleclub.app',
    maintenanceMode: false,
    forceUpdate: false,
    latestAppLink: 'https://play.google.com/store/apps/details?id=com.battleclub.app'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/app-info-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AppInfoProvider": (()=>AppInfoProvider),
    "useAppInfo": (()=>useAppInfo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$app$2d$info$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/app-info-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AppInfoContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppInfoProvider({ children }) {
    _s();
    const [appInfo, setAppInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$app$2d$info$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appInfo"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppInfoContext.Provider, {
        value: {
            appInfo,
            setAppInfo
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/app-info-context.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(AppInfoProvider, "NpZxLFS1a0VGj0Y0can/n2wsbJc=");
_c = AppInfoProvider;
function useAppInfo() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppInfoContext);
    if (context === undefined) {
        throw new Error('useAppInfo must be used within an AppInfoProvider');
    }
    return context;
}
_s1(useAppInfo, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppInfoProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/wallet-settings-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "walletSettingsData": (()=>walletSettingsData)
});
const walletSettingsData = {
    upiId: 'battleclub@upi',
    qrCodeUrl: 'https://placehold.co/200x200.png',
    minDeposit: 10,
    minWithdrawal: 50,
    referralBonus: 10,
    paymentGatewayEnabled: false,
    manualDepositEnabled: true,
    paymentGatewayApiKey: '',
    bonusUsagePercentage: 30,
    paidMatchJoinBonus: 5
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/wallet-settings-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WalletSettingsProvider": (()=>WalletSettingsProvider),
    "useWalletSettings": (()=>useWalletSettings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wallet$2d$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wallet-settings-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const WalletSettingsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function WalletSettingsProvider({ children }) {
    _s();
    const [walletSettings, setWalletSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wallet$2d$settings$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletSettingsData"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletSettingsContext.Provider, {
        value: {
            walletSettings,
            setWalletSettings
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/wallet-settings-context.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(WalletSettingsProvider, "7sWmny0yrBpEA1zs4SRNFPd5f0s=");
_c = WalletSettingsProvider;
function useWalletSettings() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WalletSettingsContext);
    if (context === undefined) {
        throw new Error('useWalletSettings must be used within a WalletSettingsProvider');
    }
    return context;
}
_s1(useWalletSettings, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "WalletSettingsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, this);
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/update-gate.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UpdateGate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$app$2d$info$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/app-info-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function UpdateGate({ children }) {
    _s();
    const { appInfo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$app$2d$info$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppInfo"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isGated = appInfo.forceUpdate;
    const isExcludedPage = pathname === '/login' || pathname === '/signup' || pathname.startsWith('/admin');
    if (isGated && !isExcludedPage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center bg-background p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "w-full max-w-md bg-card border-primary/50 text-center shadow-lg shadow-primary/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "font-headline text-primary text-3xl",
                                children: "Update Required"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/update-gate.tsx",
                                lineNumber: 22,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                children: "A new version of BATTLE CLUB is available. Please update the app to continue."
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/update-gate.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/update-gate.tsx",
                        lineNumber: 21,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: appInfo.latestAppLink || '#',
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "lg",
                                className: "w-full font-bold text-lg h-14 bg-primary hover:bg-primary/90",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "mr-2 h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/update-gate.tsx",
                                        lineNumber: 30,
                                        columnNumber: 33
                                    }, this),
                                    "Update Now"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/update-gate.tsx",
                                lineNumber: 29,
                                columnNumber: 30
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/update-gate.tsx",
                            lineNumber: 28,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/update-gate.tsx",
                        lineNumber: 27,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/update-gate.tsx",
                lineNumber: 20,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/update-gate.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(UpdateGate, "yaEWtAFGqJ2ABgn4E0TGL+ufRPk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$app$2d$info$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppInfo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = UpdateGate;
var _c;
__turbopack_context__.k.register(_c, "UpdateGate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/staff-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ALL_PERMISSIONS": (()=>ALL_PERMISSIONS),
    "initialStaff": (()=>initialStaff),
    "initialUsers": (()=>initialUsers)
});
const ALL_PERMISSIONS = [
    {
        id: 'userManagement',
        label: 'User Management'
    },
    {
        id: 'gameManagement',
        label: 'Game Management'
    },
    {
        id: 'matchManagement',
        label: 'Match Management'
    },
    {
        id: 'depositRequests',
        label: 'Deposit Requests'
    },
    {
        id: 'withdrawalRequests',
        label: 'Withdrawal Requests'
    },
    {
        id: 'walletSettings',
        label: 'Wallet Settings'
    },
    {
        id: 'pushNotifications',
        label: 'Push Notifications'
    },
    {
        id: 'updateBanners',
        label: 'Update Banners'
    },
    {
        id: 'adminNotice',
        label: 'Admin Notice'
    },
    {
        id: 'contentPages',
        label: 'Content Pages'
    },
    {
        id: 'appInformation',
        label: 'App Information'
    },
    {
        id: 'staffManagement',
        label: 'Staff Management'
    }
];
const initialStaff = [
    {
        id: 'staff-1',
        name: 'John Matchmaker',
        email: 'john.m@example.com',
        password: 'password123',
        permissions: [
            {
                id: 'matchManagement',
                label: 'Match Management'
            },
            {
                id: 'gameManagement',
                label: 'Game Management'
            }
        ]
    },
    {
        id: 'staff-2',
        name: 'Jane Teller',
        email: 'jane.t@example.com',
        password: 'password123',
        permissions: [
            {
                id: 'depositRequests',
                label: 'Deposit Requests'
            },
            {
                id: 'withdrawalRequests',
                label: 'Withdrawal Requests'
            },
            {
                id: 'userManagement',
                label: 'User Management'
            }
        ]
    }
];
const initialUsers = [
    {
        id: 'usr_1',
        name: 'ShadowStriker',
        email: 'shadow@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        avatarHint: 'gamer avatar',
        gameUsername: 'Shad0w',
        gameUid: '5123456789',
        depositBalance: 608.20,
        winningsBalance: 912.30,
        bonusBalance: 100,
        status: 'Active',
        joinDate: '2023-01-15'
    },
    {
        id: 'usr_2',
        name: 'ViperX',
        email: 'viper@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        avatarHint: 'gamer avatar',
        gameUsername: 'ViperXtreme',
        gameUid: '5234567890',
        depositBalance: 340.00,
        winningsBalance: 510.00,
        bonusBalance: 50,
        status: 'Active',
        joinDate: '2023-02-20'
    },
    {
        id: 'usr_3',
        name: 'PhoenixFury',
        email: 'fury@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        avatarHint: 'gamer avatar',
        gameUsername: 'Phoenix',
        gameUid: '5345678901',
        depositBalance: 1280.30,
        winningsBalance: 1920.45,
        bonusBalance: 200,
        status: 'Banned',
        joinDate: '2023-03-10'
    },
    {
        id: 'usr_4',
        name: 'ProGamer_47',
        email: 'user@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        avatarHint: 'gamer avatar',
        gameUsername: 'ProGamer47',
        gameUid: '5456789012',
        depositBalance: 500.00,
        winningsBalance: 750.00,
        bonusBalance: 75,
        status: 'Active',
        joinDate: '2023-04-05'
    },
    {
        id: 'usr_5',
        name: 'SniperQueen',
        email: 'queen@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        avatarHint: 'gamer avatar',
        gameUsername: 'Sn1perQueen',
        gameUid: '5567890123',
        depositBalance: 20.10,
        winningsBalance: 30.15,
        bonusBalance: 10,
        status: 'Active',
        joinDate: '2023-05-12'
    },
    {
        id: 'usr_6',
        name: 'RogueAssassin',
        email: 'rogue@example.com',
        password: 'password123',
        avatar: 'https://placehold.co/100x100.png',
        avatarHint: 'gamer avatar',
        gameUsername: 'Rogue',
        gameUid: '5678901234',
        depositBalance: 0,
        winningsBalance: 0,
        bonusBalance: 0,
        status: 'Active',
        joinDate: '2023-06-18'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/game-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "initialGames": (()=>initialGames)
});
const initialGames = [
    {
        name: 'Free Fire MAX',
        image: 'https://placehold.co/150x200.png',
        hint: 'battle royale',
        slug: 'free-fire-max',
        visible: true
    },
    {
        name: 'Clash Squad',
        image: 'https://placehold.co/150x200.png',
        hint: 'team battle',
        slug: 'clash-squad',
        visible: true
    },
    {
        name: 'Lone Wolf',
        image: 'https://placehold.co/150x200.png',
        hint: 'arena shooter',
        slug: 'lone-wolf',
        visible: true
    },
    {
        name: 'Free Matches',
        image: 'https://placehold.co/150x200.png',
        hint: 'free entry',
        slug: 'free-matches',
        visible: true
    },
    {
        name: 'Survival Matches',
        image: 'https://placehold.co/150x200.png',
        hint: 'last man standing',
        slug: 'survival-matches',
        visible: true
    },
    {
        name: 'CS 1vs1',
        image: 'https://placehold.co/150x200.png',
        hint: 'one versus one',
        slug: 'cs-1vs1',
        visible: true
    },
    {
        name: 'CS 2vs2',
        image: 'https://placehold.co/150x200.png',
        hint: 'two versus two',
        slug: 'cs-2vs2',
        visible: true
    },
    {
        name: '1rs Match',
        image: 'https://placehold.co/150x200.png',
        hint: 'low entry',
        slug: '1rs-match',
        visible: true
    },
    {
        name: 'Only Headshot',
        image: 'https://placehold.co/150x200.png',
        hint: 'headshot mode',
        slug: 'only-headshot',
        visible: true
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/match-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "matches": (()=>matches)
});
const slugify = (text)=>text.toLowerCase().replace(/\s+/g, '-');
const mockParticipants = (count, userId)=>{
    const result = [];
    for(let i = 0; i < count; i++){
        result.push({
            registrarUserId: userId,
            gameUsername: `Player ${i + 1}`
        });
    }
    return result;
};
const matches = [
    {
        id: slugify('Morning Squad Challenge'),
        game: 'BGMI',
        title: 'Morning Squad Challenge',
        prize: '10,000',
        perKillPrize: '5',
        entryFee: '50',
        teamSize: 'Squad',
        totalTeams: 25,
        joinedTeams: 10,
        time: '11:00 AM',
        date: '2024-08-15',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'battlefield action',
        status: 'Upcoming',
        description: 'The ultimate squad challenge. Prize pool distributed among the top 3 teams. 1st: ?5000, 2nd: ?3000, 3rd: ?2000.',
        rules: [
            'Only mobile devices are allowed.',
            'Emulators are strictly prohibited.',
            'Teams must register at least 30 minutes before the match.',
            'All players must adhere to fair play policies.'
        ],
        participants: mockParticipants(10, 'usr_4')
    },
    {
        id: slugify('Solo King Arena'),
        game: 'Free Fire MAX',
        title: 'Solo King Arena',
        prize: '5,000',
        perKillPrize: '2',
        entryFee: '20',
        teamSize: 'Solo',
        totalTeams: 50,
        joinedTeams: 45,
        time: '01:00 PM',
        date: '2024-08-15',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'lone warrior',
        status: 'Upcoming',
        description: 'Prove you are the king of the arena. Exciting prizes for top players.',
        rules: [
            'All weapons and characters are allowed.',
            'Play zone will shrink faster than usual.',
            'Top 10 players receive bonus points.'
        ],
        participants: mockParticipants(45, 'usr_1')
    },
    {
        id: slugify('Rush Hour TDM'),
        game: 'COD M',
        title: 'Rush Hour TDM',
        prize: '7,500',
        perKillPrize: '3',
        entryFee: '30',
        teamSize: 'Duo',
        totalTeams: 16,
        joinedTeams: 16,
        time: 'Ongoing',
        date: '2024-08-14',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'urban combat',
        status: 'Ongoing',
        description: 'Fast-paced Team Deathmatch action. First to 50 kills wins the grand prize.',
        rules: [
            'First to 50 kills wins.',
            'Scorestreaks are allowed.',
            'No operator skills.'
        ],
        participants: mockParticipants(16, 'usr_4')
    },
    {
        id: slugify('Futuristic Warfare'),
        game: 'PUBG NEW STATE',
        title: 'Futuristic Warfare',
        prize: '12,000',
        perKillPrize: '10',
        entryFee: '60',
        teamSize: 'Squad',
        totalTeams: 20,
        joinedTeams: 20,
        time: 'Completed',
        date: '2024-08-13',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'sci-fi battle',
        status: 'Completed',
        description: 'Battle it out in the world of tomorrow. High stakes, high rewards.',
        rules: [
            'Only futuristic weapons and vehicles.',
            'Last squad standing wins.'
        ],
        participants: mockParticipants(20, 'usr_4').map((p, i)=>{
            const rank = i + 1;
            return {
                ...p,
                rank,
                winnings: rank === 1 ? 12000 : undefined
            };
        })
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/deposit-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "mockDepositRequests": (()=>mockDepositRequests)
});
const mockDepositRequests = [
    {
        id: 'dep_1',
        userId: 'usr_1',
        userName: 'ShadowStriker',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 500,
        transactionId: '123456789012',
        requestDate: '2024-08-16T10:00:00Z',
        status: 'Pending'
    },
    {
        id: 'dep_2',
        userId: 'usr_2',
        userName: 'ViperX',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 250,
        transactionId: '234567890123',
        requestDate: '2024-08-16T11:30:00Z',
        status: 'Pending'
    },
    {
        id: 'dep_3',
        userId: 'usr_5',
        userName: 'SniperQueen',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 1000,
        transactionId: '345678901234',
        requestDate: '2024-08-16T12:15:00Z',
        status: 'Pending'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/withdrawal-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "mockWithdrawalRequests": (()=>mockWithdrawalRequests)
});
const mockWithdrawalRequests = [
    {
        id: 'wd_1',
        userId: 'usr_4',
        userName: 'ProGamer_47',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 250,
        upiId: 'progamer@upi',
        requestDate: '2024-08-16T09:00:00Z',
        status: 'Pending'
    },
    {
        id: 'wd_2',
        userId: 'usr_1',
        userName: 'ShadowStriker',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 1000,
        upiId: 'shadow@ybl',
        requestDate: '2024-08-16T14:00:00Z',
        status: 'Pending'
    },
    {
        id: 'wd_3',
        userId: 'usr_2',
        userName: 'ViperX',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 150.50,
        upiId: 'viperx@okicici',
        requestDate: '2024-08-15T18:45:00Z',
        status: 'Pending'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/requests-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RequestsProvider": (()=>RequestsProvider),
    "useRequests": (()=>useRequests)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$deposit$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/deposit-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$withdrawal$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/withdrawal-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const initialTransactions = [
    {
        id: 'tx_1',
        type: 'Winnings',
        amount: 150,
        date: '2023-10-26T14:30:00Z',
        description: 'From BGMI Squad Challenge'
    },
    {
        id: 'tx_2',
        type: 'Deposit (Manual)',
        amount: 500,
        date: '2023-10-25T10:00:00Z',
        description: 'Added via UPI'
    },
    {
        id: 'tx_3',
        type: 'Withdrawal',
        amount: -200,
        date: '2023-10-24T09:00:00Z',
        description: 'Withdrawn to GPay'
    },
    {
        id: 'tx_4',
        type: 'Entry Fee',
        amount: -50,
        date: '2023-10-23T12:00:00Z',
        description: 'For Morning Squad Challenge'
    }
];
const RequestsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function RequestsProvider({ children }) {
    _s();
    const [depositRequests, setDepositRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$deposit$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDepositRequests"]);
    const [withdrawalRequests, setWithdrawalRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$withdrawal$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockWithdrawalRequests"]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTransactions);
    const addTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RequestsProvider.useCallback[addTransaction]": (transaction)=>{
            const newTransaction = {
                ...transaction,
                id: `tx_${Date.now()}`,
                date: new Date().toISOString()
            };
            setTransactions({
                "RequestsProvider.useCallback[addTransaction]": (prev)=>[
                        newTransaction,
                        ...prev
                    ]
            }["RequestsProvider.useCallback[addTransaction]"]);
        }
    }["RequestsProvider.useCallback[addTransaction]"], []);
    const addDepositRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RequestsProvider.useCallback[addDepositRequest]": (amount, transactionId, user)=>{
            const newRequest = {
                id: `dep_${Date.now()}`,
                userId: user.id,
                userName: user.name,
                userAvatar: user.avatar,
                userAvatarHint: user.avatarHint,
                amount,
                transactionId,
                requestDate: new Date().toISOString(),
                status: 'Pending'
            };
            setDepositRequests({
                "RequestsProvider.useCallback[addDepositRequest]": (prev)=>[
                        newRequest,
                        ...prev
                    ]
            }["RequestsProvider.useCallback[addDepositRequest]"]);
        }
    }["RequestsProvider.useCallback[addDepositRequest]"], []);
    const addWithdrawalRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RequestsProvider.useCallback[addWithdrawalRequest]": (amount, upiId, user)=>{
            const newRequest = {
                id: `wd_${Date.now()}`,
                userId: user.id,
                userName: user.name,
                userAvatar: user.avatar,
                userAvatarHint: user.avatarHint,
                amount,
                upiId,
                requestDate: new Date().toISOString(),
                status: 'Pending'
            };
            setWithdrawalRequests({
                "RequestsProvider.useCallback[addWithdrawalRequest]": (prev)=>[
                        newRequest,
                        ...prev
                    ]
            }["RequestsProvider.useCallback[addWithdrawalRequest]"]);
        }
    }["RequestsProvider.useCallback[addWithdrawalRequest]"], []);
    const processDepositRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RequestsProvider.useCallback[processDepositRequest]": (requestId, approveCallback)=>{
            setDepositRequests({
                "RequestsProvider.useCallback[processDepositRequest]": (prev)=>{
                    const request = prev.find({
                        "RequestsProvider.useCallback[processDepositRequest].request": (r)=>r.id === requestId
                    }["RequestsProvider.useCallback[processDepositRequest].request"]);
                    if (request) {
                        approveCallback(request.userId, request.amount);
                    }
                    return prev.filter({
                        "RequestsProvider.useCallback[processDepositRequest]": (req)=>req.id !== requestId
                    }["RequestsProvider.useCallback[processDepositRequest]"]);
                }
            }["RequestsProvider.useCallback[processDepositRequest]"]);
        }
    }["RequestsProvider.useCallback[processDepositRequest]"], []);
    const processWithdrawalRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RequestsProvider.useCallback[processWithdrawalRequest]": (requestId, approveCallback)=>{
            setWithdrawalRequests({
                "RequestsProvider.useCallback[processWithdrawalRequest]": (prev)=>{
                    const request = prev.find({
                        "RequestsProvider.useCallback[processWithdrawalRequest].request": (r)=>r.id === requestId
                    }["RequestsProvider.useCallback[processWithdrawalRequest].request"]);
                    if (request) {
                        approveCallback(request.userId, request.amount);
                    }
                    return prev.filter({
                        "RequestsProvider.useCallback[processWithdrawalRequest]": (req)=>req.id !== requestId
                    }["RequestsProvider.useCallback[processWithdrawalRequest]"]);
                }
            }["RequestsProvider.useCallback[processWithdrawalRequest]"]);
        }
    }["RequestsProvider.useCallback[processWithdrawalRequest]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RequestsProvider.useMemo[value]": ()=>({
                depositRequests,
                withdrawalRequests,
                transactions,
                addTransaction,
                addDepositRequest,
                addWithdrawalRequest,
                processDepositRequest,
                processWithdrawalRequest
            })
    }["RequestsProvider.useMemo[value]"], [
        depositRequests,
        withdrawalRequests,
        transactions,
        addTransaction,
        addDepositRequest,
        addWithdrawalRequest,
        processDepositRequest,
        processWithdrawalRequest
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestsContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/requests-context.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s(RequestsProvider, "b/rXRTh8EtuIOZ1AdofF5wLFIk8=");
_c = RequestsProvider;
function useRequests() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(RequestsContext);
    if (context === undefined) {
        throw new Error('useRequests must be used within a RequestsProvider');
    }
    return context;
}
_s1(useRequests, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "RequestsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/auth-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$staff$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/staff-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/game-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$match$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/match-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$requests$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/requests-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const slugify = (text)=>text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [staffList, setStaffList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$staff$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialStaff"]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$staff$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialUsers"]);
    const [games, setGames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialGames"]);
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$match$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matches"]);
    const [adminCredentials, setAdminCredentials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: 'admin@gmail.com',
        password: '12345678'
    });
    const [version, setVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const requests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$requests$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRequests"])();
    // Staff management functions
    const addStaff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[addStaff]": (staff)=>{
            const newStaff = {
                ...staff,
                id: `staff-${Date.now()}`
            };
            setStaffList({
                "AuthProvider.useCallback[addStaff]": (prev)=>[
                        newStaff,
                        ...prev
                    ]
            }["AuthProvider.useCallback[addStaff]"]);
        }
    }["AuthProvider.useCallback[addStaff]"], []);
    const updateStaff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateStaff]": (updatedStaff)=>{
            setStaffList({
                "AuthProvider.useCallback[updateStaff]": (prev)=>prev.map({
                        "AuthProvider.useCallback[updateStaff]": (s)=>s.id === updatedStaff.id ? updatedStaff : s
                    }["AuthProvider.useCallback[updateStaff]"])
            }["AuthProvider.useCallback[updateStaff]"]);
        }
    }["AuthProvider.useCallback[updateStaff]"], []);
    const deleteStaff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[deleteStaff]": (staffId)=>{
            setStaffList({
                "AuthProvider.useCallback[deleteStaff]": (prev)=>prev.filter({
                        "AuthProvider.useCallback[deleteStaff]": (s)=>s.id !== staffId
                    }["AuthProvider.useCallback[deleteStaff]"])
            }["AuthProvider.useCallback[deleteStaff]"]);
        }
    }["AuthProvider.useCallback[deleteStaff]"], []);
    // User management functions
    const updateUserWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateUserWallet]": (userId, amount, type, action)=>{
            setUsers({
                "AuthProvider.useCallback[updateUserWallet]": (prevUsers)=>prevUsers.map({
                        "AuthProvider.useCallback[updateUserWallet]": (u)=>{
                            if (u.id === userId) {
                                const newBalances = {
                                    ...u
                                };
                                const multiplier = action === 'add' ? 1 : -1;
                                if (type === 'deposit') {
                                    newBalances.depositBalance += amount * multiplier;
                                } else if (type === 'winnings') {
                                    newBalances.winningsBalance += amount * multiplier;
                                } else if (type === 'bonus') {
                                    newBalances.bonusBalance += amount * multiplier;
                                }
                                // Ensure balances don't go below zero
                                newBalances.depositBalance = Math.max(0, newBalances.depositBalance);
                                newBalances.winningsBalance = Math.max(0, newBalances.winningsBalance);
                                newBalances.bonusBalance = Math.max(0, newBalances.bonusBalance);
                                return newBalances;
                            }
                            return u;
                        }
                    }["AuthProvider.useCallback[updateUserWallet]"])
            }["AuthProvider.useCallback[updateUserWallet]"]);
        }
    }["AuthProvider.useCallback[updateUserWallet]"], []);
    const toggleUserStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[toggleUserStatus]": (userId)=>{
            setUsers({
                "AuthProvider.useCallback[toggleUserStatus]": (prevUsers)=>prevUsers.map({
                        "AuthProvider.useCallback[toggleUserStatus]": (u)=>u.id === userId ? {
                                ...u,
                                status: u.status === 'Active' ? 'Banned' : 'Active'
                            } : u
                    }["AuthProvider.useCallback[toggleUserStatus]"])
            }["AuthProvider.useCallback[toggleUserStatus]"]);
        }
    }["AuthProvider.useCallback[toggleUserStatus]"], []);
    const updateUserProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateUserProfile]": (userId, data)=>{
            setUsers({
                "AuthProvider.useCallback[updateUserProfile]": (prev)=>prev.map({
                        "AuthProvider.useCallback[updateUserProfile]": (u)=>u.id === userId ? {
                                ...u,
                                ...data
                            } : u
                    }["AuthProvider.useCallback[updateUserProfile]"])
            }["AuthProvider.useCallback[updateUserProfile]"]);
            setUser({
                "AuthProvider.useCallback[updateUserProfile]": (prev)=>{
                    if (prev && prev.id === userId) {
                        return {
                            ...prev,
                            ...data
                        };
                    }
                    return prev;
                }
            }["AuthProvider.useCallback[updateUserProfile]"]);
        }
    }["AuthProvider.useCallback[updateUserProfile]"], []);
    // Game management functions
    const updateGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateGame]": (gameSlug, newDetails)=>{
            setGames({
                "AuthProvider.useCallback[updateGame]": (prevGames)=>{
                    const oldGameName = prevGames.find({
                        "AuthProvider.useCallback[updateGame]": (g)=>g.slug === gameSlug
                    }["AuthProvider.useCallback[updateGame]"])?.name;
                    if (oldGameName && newDetails.name && oldGameName !== newDetails.name) {
                        const newName = newDetails.name;
                        setMatches({
                            "AuthProvider.useCallback[updateGame]": (prevMatches)=>prevMatches.map({
                                    "AuthProvider.useCallback[updateGame]": (m)=>m.game === oldGameName ? {
                                            ...m,
                                            game: newName
                                        } : m
                                }["AuthProvider.useCallback[updateGame]"])
                        }["AuthProvider.useCallback[updateGame]"]);
                    }
                    return prevGames.map({
                        "AuthProvider.useCallback[updateGame]": (g)=>{
                            if (g.slug === gameSlug) {
                                const newSlug = newDetails.name ? slugify(newDetails.name) : g.slug;
                                return {
                                    ...g,
                                    ...newDetails,
                                    slug: newSlug
                                };
                            }
                            return g;
                        }
                    }["AuthProvider.useCallback[updateGame]"]);
                }
            }["AuthProvider.useCallback[updateGame]"]);
            setVersion({
                "AuthProvider.useCallback[updateGame]": (v)=>v + 1
            }["AuthProvider.useCallback[updateGame]"]);
        }
    }["AuthProvider.useCallback[updateGame]"], []);
    // Match management functions
    const addMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[addMatch]": (match)=>{
            const newMatch = {
                ...match,
                id: `${slugify(match.title)}-${Date.now()}`,
                joinedTeams: 0,
                participants: []
            };
            setMatches({
                "AuthProvider.useCallback[addMatch]": (prev)=>[
                        newMatch,
                        ...prev
                    ].sort({
                        "AuthProvider.useCallback[addMatch]": (a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()
                    }["AuthProvider.useCallback[addMatch]"])
            }["AuthProvider.useCallback[addMatch]"]);
            setVersion({
                "AuthProvider.useCallback[addMatch]": (v)=>v + 1
            }["AuthProvider.useCallback[addMatch]"]);
        }
    }["AuthProvider.useCallback[addMatch]"], []);
    const updateMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateMatch]": (updatedMatch)=>{
            setMatches({
                "AuthProvider.useCallback[updateMatch]": (prevMatches)=>{
                    const originalMatch = prevMatches.find({
                        "AuthProvider.useCallback[updateMatch].originalMatch": (m)=>m.id === updatedMatch.id
                    }["AuthProvider.useCallback[updateMatch].originalMatch"]);
                    if (updatedMatch.status === 'Completed' && originalMatch?.status !== 'Completed') {
                        const winners = updatedMatch.participants.filter({
                            "AuthProvider.useCallback[updateMatch].winners": (p)=>p.rank === 1
                        }["AuthProvider.useCallback[updateMatch].winners"]);
                        const prizeAmount = parseInt(updatedMatch.prize.replace(/,/g, ''), 10);
                        if (winners.length > 0 && !isNaN(prizeAmount)) {
                            const winningRegistrars = [
                                ...new Set(winners.map({
                                    "AuthProvider.useCallback[updateMatch]": (w)=>w.registrarUserId
                                }["AuthProvider.useCallback[updateMatch]"]))
                            ];
                            const prizePerRegistrar = prizeAmount / winningRegistrars.length;
                            winningRegistrars.forEach({
                                "AuthProvider.useCallback[updateMatch]": (registrarId)=>{
                                    updateUserWallet(registrarId, prizePerRegistrar, 'winnings', 'add');
                                    requests.addTransaction({
                                        type: 'Winnings',
                                        amount: prizePerRegistrar,
                                        description: `From "${updatedMatch.title}"`
                                    });
                                }
                            }["AuthProvider.useCallback[updateMatch]"]);
                            updatedMatch.participants = updatedMatch.participants.map({
                                "AuthProvider.useCallback[updateMatch]": (p)=>{
                                    if (p.rank === 1) {
                                        return {
                                            ...p,
                                            winnings: prizePerRegistrar
                                        };
                                    }
                                    return p;
                                }
                            }["AuthProvider.useCallback[updateMatch]"]);
                        }
                    }
                    return prevMatches.map({
                        "AuthProvider.useCallback[updateMatch]": (m)=>m.id === updatedMatch.id ? updatedMatch : m
                    }["AuthProvider.useCallback[updateMatch]"]);
                }
            }["AuthProvider.useCallback[updateMatch]"]);
            setVersion({
                "AuthProvider.useCallback[updateMatch]": (v)=>v + 1
            }["AuthProvider.useCallback[updateMatch]"]);
        }
    }["AuthProvider.useCallback[updateMatch]"], [
        requests,
        updateUserWallet
    ]);
    const deleteMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[deleteMatch]": (matchId)=>{
            setMatches({
                "AuthProvider.useCallback[deleteMatch]": (prev)=>prev.filter({
                        "AuthProvider.useCallback[deleteMatch]": (m)=>m.id !== matchId
                    }["AuthProvider.useCallback[deleteMatch]"])
            }["AuthProvider.useCallback[deleteMatch]"]);
            setVersion({
                "AuthProvider.useCallback[deleteMatch]": (v)=>v + 1
            }["AuthProvider.useCallback[deleteMatch]"]);
        }
    }["AuthProvider.useCallback[deleteMatch]"], []);
    const joinMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[joinMatch]": (matchId, participants, settings)=>{
            const match = matches.find({
                "AuthProvider.useCallback[joinMatch].match": (m)=>m.id === matchId
            }["AuthProvider.useCallback[joinMatch].match"]);
            if (!match) return {
                success: false,
                message: 'Match not found.'
            };
            const registrar = users.find({
                "AuthProvider.useCallback[joinMatch].registrar": (u)=>u.id === participants[0].registrarUserId
            }["AuthProvider.useCallback[joinMatch].registrar"]);
            if (!registrar) return {
                success: false,
                message: 'User not found.'
            };
            const totalFee = parseFloat(match.entryFee) * participants.length;
            if (totalFee > 0) {
                // Paid match logic
                const maxBonusAllowed = totalFee * (settings.bonusUsagePercentage / 100);
                const actualBonusToUse = Math.min(registrar.bonusBalance, maxBonusAllowed);
                const depositToDebit = totalFee - actualBonusToUse;
                if (registrar.depositBalance < depositToDebit) {
                    return {
                        success: false,
                        message: `Insufficient balance. You need ₹${depositToDebit.toFixed(2)} from Deposit and have ₹${registrar.depositBalance.toFixed(2)}.`
                    };
                }
                if (depositToDebit > 0) {
                    updateUserWallet(registrar.id, depositToDebit, 'deposit', 'remove');
                    requests.addTransaction({
                        type: 'Entry Fee',
                        amount: -depositToDebit,
                        description: `For "${match.title}" (from Deposit)`
                    });
                }
                if (actualBonusToUse > 0) {
                    updateUserWallet(registrar.id, actualBonusToUse, 'bonus', 'remove');
                    requests.addTransaction({
                        type: 'Bonus Used',
                        amount: -actualBonusToUse,
                        description: `Entry fee for "${match.title}"`
                    });
                }
                if (settings.paidMatchJoinBonus > 0) {
                    updateUserWallet(registrar.id, settings.paidMatchJoinBonus, 'bonus', 'add');
                    requests.addTransaction({
                        type: 'Bonus Earned',
                        amount: settings.paidMatchJoinBonus,
                        description: `For joining "${match.title}"`
                    });
                }
            }
            const newParticipants = participants.map({
                "AuthProvider.useCallback[joinMatch].newParticipants": (p)=>({
                        ...p
                    })
            }["AuthProvider.useCallback[joinMatch].newParticipants"]);
            setMatches({
                "AuthProvider.useCallback[joinMatch]": (prevMatches)=>prevMatches.map({
                        "AuthProvider.useCallback[joinMatch]": (m)=>{
                            if (m.id === matchId) {
                                return {
                                    ...m,
                                    participants: [
                                        ...m.participants,
                                        ...newParticipants
                                    ],
                                    joinedTeams: m.joinedTeams + 1
                                };
                            }
                            return m;
                        }
                    }["AuthProvider.useCallback[joinMatch]"])
            }["AuthProvider.useCallback[joinMatch]"]);
            return {
                success: true,
                message: `Successfully joined match for ₹${totalFee.toFixed(2)}.`
            };
        }
    }["AuthProvider.useCallback[joinMatch]"], [
        matches,
        users,
        requests,
        updateUserWallet
    ]);
    // Auth functions
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": (identifier, pass)=>{
            if (identifier === adminCredentials.email && pass === adminCredentials.password) {
                const adminUser = {
                    id: 'admin-01',
                    name: 'Admin',
                    email: identifier,
                    isSuperAdmin: true,
                    permissions: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$staff$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_PERMISSIONS"].map({
                        "AuthProvider.useCallback[login]": (p)=>p.id
                    }["AuthProvider.useCallback[login]"]),
                    role: 'admin'
                };
                setUser(adminUser);
                return {
                    success: true,
                    role: 'admin',
                    message: 'Admin login successful.'
                };
            }
            const staffUser = staffList.find({
                "AuthProvider.useCallback[login].staffUser": (s)=>s.email === identifier && s.password === pass
            }["AuthProvider.useCallback[login].staffUser"]);
            if (staffUser) {
                const authenticatedStaff = {
                    id: staffUser.id,
                    name: staffUser.name,
                    email: staffUser.email,
                    isSuperAdmin: false,
                    permissions: staffUser.permissions.map({
                        "AuthProvider.useCallback[login]": (p)=>p.id
                    }["AuthProvider.useCallback[login]"]),
                    role: 'staff'
                };
                setUser(authenticatedStaff);
                return {
                    success: true,
                    role: 'staff',
                    message: 'Staff login successful.'
                };
            }
            const regularUser = users.find({
                "AuthProvider.useCallback[login].regularUser": (u)=>(u.email === identifier || u.name === identifier) && u.password === pass
            }["AuthProvider.useCallback[login].regularUser"]);
            if (regularUser) {
                if (regularUser.status === 'Banned') {
                    return {
                        success: false,
                        role: null,
                        message: 'This account has been banned.'
                    };
                }
                const authenticatedUser = {
                    id: regularUser.id,
                    name: regularUser.name,
                    email: regularUser.email,
                    role: 'user',
                    isSuperAdmin: false,
                    permissions: []
                };
                setUser(authenticatedUser);
                return {
                    success: true,
                    role: 'user',
                    message: 'Login successful.'
                };
            }
            setUser(null);
            return {
                success: false,
                role: null,
                message: 'Invalid credentials. Please try again.'
            };
        }
    }["AuthProvider.useCallback[login]"], [
        adminCredentials,
        staffList,
        users
    ]);
    const signup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[signup]": (details)=>{
            if (users.some({
                "AuthProvider.useCallback[signup]": (u)=>u.email === details.email
            }["AuthProvider.useCallback[signup]"])) {
                return {
                    success: false,
                    message: 'An account with this email already exists.'
                };
            }
            const newUser = {
                ...details,
                id: `usr_${Date.now()}`,
                joinDate: new Date().toISOString(),
                status: 'Active',
                depositBalance: 0,
                winningsBalance: 0,
                bonusBalance: 10
            };
            setUsers({
                "AuthProvider.useCallback[signup]": (prev)=>[
                        newUser,
                        ...prev
                    ]
            }["AuthProvider.useCallback[signup]"]);
            const authenticatedUser = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: 'user',
                isSuperAdmin: false,
                permissions: []
            };
            setUser(authenticatedUser);
            return {
                success: true,
                message: 'Account created successfully.'
            };
        }
    }["AuthProvider.useCallback[signup]"], [
        users
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": ()=>{
            setUser(null);
        }
    }["AuthProvider.useCallback[logout]"], []);
    const updateAdminPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateAdminPassword]": (currentPass, newPass)=>{
            if (currentPass !== adminCredentials.password) {
                return {
                    success: false,
                    message: 'The current password you entered is incorrect.'
                };
            }
            if (newPass.length < 8) {
                return {
                    success: false,
                    message: 'New password must be at least 8 characters.'
                };
            }
            setAdminCredentials({
                "AuthProvider.useCallback[updateAdminPassword]": (prev)=>({
                        ...prev,
                        password: newPass
                    })
            }["AuthProvider.useCallback[updateAdminPassword]"]);
            return {
                success: true,
                message: 'Password updated successfully.'
            };
        }
    }["AuthProvider.useCallback[updateAdminPassword]"], [
        adminCredentials.password
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[value]": ()=>({
                user,
                version,
                login,
                logout,
                signup,
                updateAdminPassword,
                staffList,
                addStaff,
                updateStaff,
                deleteStaff,
                users,
                updateUserWallet,
                toggleUserStatus,
                updateUserProfile,
                games,
                updateGame,
                matches,
                addMatch,
                updateMatch,
                deleteMatch,
                joinMatch
            })
    }["AuthProvider.useMemo[value]"], [
        user,
        version,
        login,
        logout,
        signup,
        updateAdminPassword,
        staffList,
        addStaff,
        updateStaff,
        deleteStaff,
        users,
        updateUserWallet,
        toggleUserStatus,
        updateUserProfile,
        games,
        updateGame,
        matches,
        addMatch,
        updateMatch,
        deleteMatch,
        joinMatch
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/auth-context.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "4Z6fFBYhDVgAvR+YXet2r3s8S5k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$requests$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRequests"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_808219f6._.js.map