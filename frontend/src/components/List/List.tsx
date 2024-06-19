import React from "react";

import "./styles.css";

export default function List({
  data,
  ItemComponent,
  className,
  ...restOfProps
}: Readonly<{
  data: any[];
  className?: string;
  ItemComponent?: React.ComponentType<any>;
}>) {
  return (
    <ul className={`list ${className ?? ""}`} {...restOfProps}>
      {data?.map((item: any) => (
        <li key={item.id}>{ItemComponent ? <ItemComponent {...item} /> : item}</li>
      ))}
    </ul>
  );
}
