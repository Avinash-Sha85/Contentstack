import React from "react";
import { HeadScriptProps } from "../model/component-props/headscript.model";
import Script from "next/script";
import parse from "html-react-parser";

export default function HeadScriptComponent({
  data,
}: {
  data: HeadScriptProps;
}) {
  const { enabled, script_id, script_src, script_content } = data;

  if (!enabled) return null;

  const scriptProps: any = {
    strategy: "beforeInteractive",
  };

  if (script_id) {
    scriptProps.id = script_id;
  }

  if (script_src) {
    scriptProps.src = script_src;
  }

  if (script_content) {
    return <Script {...scriptProps}>{parse(script_content)}</Script>;
  }

  return <Script {...scriptProps} />;
}
