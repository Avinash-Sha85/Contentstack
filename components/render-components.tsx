import React from "react";
import { ComponentMap } from "../helper/component-factory";

interface RenderProps {
  pageComponents: {
    page_components: any[];
  };
  entryUid: string;
  contentTypeUid: string;
  locale: string;
}

export default function RenderComponents({
  pageComponents,
  entryUid,
  contentTypeUid,
  locale,
}: RenderProps) {
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents?.page_components.map((component, index) => {
        const componentType = Object.keys(component)[0];
        const componentData = component[componentType];
        const renderComponent = ComponentMap[componentType];
        if (!renderComponent) {
          console.warn(`⚠️ Unknown component type: ${componentType}`);
          return null;
        }
        return (
          <div key={index} data-component-type={componentType}>
            {renderComponent(componentData)}
          </div>
        );
      })}
    </div>
  );
}
