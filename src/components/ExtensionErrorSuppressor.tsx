"use client";

import { useEffect } from "react";

export default function ExtensionErrorSuppressor() {
  useEffect(() => {
    const isExtensionNoise = (
      filename: string | undefined,
      message: string | undefined,
    ) =>
      (filename?.startsWith("blob:") ||
        filename?.startsWith("chrome-extension:") ||
        filename?.startsWith("moz-extension:")) &&
      typeof message === "string" &&
      message.includes("addListener");

    const onError = (event: ErrorEvent) => {
      if (isExtensionNoise(event.filename, event.message)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as { message?: string; stack?: string } | undefined;
      const stack = reason?.stack ?? "";
      if (
        (stack.includes("blob:") ||
          stack.includes("chrome-extension:") ||
          stack.includes("moz-extension:")) &&
        (reason?.message ?? "").includes("addListener")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onRejection, true);
    return () => {
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onRejection, true);
    };
  }, []);

  return null;
}
