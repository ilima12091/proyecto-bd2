import React from "react";

import "./styles.css";

type ListProps = {
  data: any[];
  className?: string;
  ItemComponent?: React.ComponentType<any>;
  itemProps?: any;
};

export default function List({
  data,
  ItemComponent,
  className,
  itemProps,
  ...restOfProps
}: Readonly<ListProps>) {
  return (
    <ul className={`list ${className ?? ""}`} {...restOfProps}>
      {data?.map((item: any, index: number) => (
        <li key={JSON.stringify(item)}>
          {ItemComponent ? (
            <ItemComponent index={index} {...item} {...itemProps} />
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
}
