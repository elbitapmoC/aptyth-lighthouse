import React, { useEffect, useState } from "react";

/**
 * PWAInstallPrompt component to prompt users to install the PWA.
 * This component handles the display of the install prompt and interacts with the browser's
 * `beforeinstallprompt` event to allow users to install the PWA.
 */
export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the default mini-infobar from appearing
      event.preventDefault();
      setDeferredPrompt(event);
      setIsVisible(true);
    };

    // Listen for the `beforeinstallprompt` event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      // Clean up the event listener
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      (deferredPrompt as any).prompt();

      // Wait for the user to respond to the prompt
      const choiceResult = await (deferredPrompt as any).userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA installation prompt.");
      } else {
        console.log("User dismissed the PWA installation prompt.");
      }

      // Reset the deferred prompt
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismissClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between rounded-lg bg-primary p-4 text-background shadow-lg">
      <span className="text-sm font-medium">
        Install the Lighthouse Bible Platform for a better experience!
      </span>
      <div className="flex gap-2">
        <button
          onClick={handleInstallClick}
          className="rounded-md bg-background px-4 py-2 text-sm font-medium text-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
        >
          Install
        </button>
        <button
          onClick={handleDismissClick}
          className="rounded-md bg-background px-4 py-2 text-sm font-medium text-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
