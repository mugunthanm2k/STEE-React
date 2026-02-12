import { useEffect, useRef, useState } from "react";

export function useFocusGuard(logger) {
  const [violations, setViolations] = useState(0);
  const [show, setShow] = useState(false);

  const lock = useRef(false);
  const channelRef = useRef(null);

  const violate = (type) => {
    if (lock.current) return;

    lock.current = true;

    setViolations((prev) => {
      const newCount = prev + 1;
      logger.log(type, { count: newCount });
      return newCount;
    });

    setShow(true);

    setTimeout(() => (lock.current = false), 1000);
  };

  useEffect(() => {
    // MULTIPLE TAB DETECTION
    channelRef.current = new BroadcastChannel("exam_channel");
    channelRef.current.postMessage("tab_opened");
    channelRef.current.onmessage = () => violate("multiple_tab");

    // MAIN EVENT HANDLER
    const handleEvent = (e) => {
      switch (e.type) {
        case "visibilitychange":
          if (document.hidden) violate("tab_switch");
          break;

        case "blur":
          violate("window_blur");
          break;

        case "focus":
          logger.log("focus_restored");
          break;

        case "copy":
          e.preventDefault();
          violate("copy_attempt");
          break;

        case "paste":
          e.preventDefault();
          violate("paste_attempt");
          break;

        case "fullscreenchange":
          if (!document.fullscreenElement) {
            violate("fullscreen_exit");
          }
          break;

        default:
          break;
      }
    };

    // ENTER FULLSCREEN
    document.documentElement.requestFullscreen?.().catch(() => {});
    logger.log("entered_fullscreen");

    // REGISTER EVENTS
    document.addEventListener("visibilitychange", handleEvent);
    window.addEventListener("blur", handleEvent);
    window.addEventListener("focus", handleEvent);
    document.addEventListener("copy", handleEvent);
    document.addEventListener("paste", handleEvent);
    document.addEventListener("fullscreenchange", handleEvent);

    // AUTO BATCH LOGS
    const interval = setInterval(() => {
      logger.batchSend();
    }, 10000);

    return () => {
      channelRef.current?.close();
      clearInterval(interval);

      document.removeEventListener("visibilitychange", handleEvent);
      window.removeEventListener("blur", handleEvent);
      window.removeEventListener("focus", handleEvent);
      document.removeEventListener("copy", handleEvent);
      document.removeEventListener("paste", handleEvent);
      document.removeEventListener("fullscreenchange", handleEvent);
    };
  }, []);

  return { violations, show, setShow };
}
