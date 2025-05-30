import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

import { ProductDescriptionTab } from "./product-destription-tab";

interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  index: number;
  value: number;
  className?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, id, index, className } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={id} aria-labelledby={`${id}-tab`}>
      {value === index && <div className={className}>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ProductTabs = ({
  productDescription,
  children,
}: {
  productDescription: string[];
  children: React.ReactNode;
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="pb-2">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="product tabs"
        variant="scrollable"
        scrollButtons={false}
      >
        <Tab label="Product Description" {...a11yProps(0)} />
        <Tab label="Reviews" {...a11yProps(1)} />
        <Tab label="Payment Options" {...a11yProps(2)} />
      </Tabs>
      <TabPanel
        value={selectedTab}
        index={0}
        id={"productDescription"}
        className="mt-2 font-normal"
      >
        <ProductDescriptionTab productDescription={productDescription} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} id={"reviews"} className="sm:mt-2">
        {children}
      </TabPanel>
      <TabPanel value={selectedTab} index={2} id={"paymentOptions"} className="mt-4">
        <p className="pl-4 italic">None of the products on this website are for sale.</p>
      </TabPanel>
    </div>
  );
};
