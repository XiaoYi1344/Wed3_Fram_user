// components/EmotionRegistry.tsx
"use client";

import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/emotion-cache";
import { useServerInsertedHTML } from "next/navigation";
import React from "react";

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [emotionCache] = React.useState(() => createEmotionCache());

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${emotionCache.key} ${Object.keys(emotionCache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(emotionCache.inserted).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
