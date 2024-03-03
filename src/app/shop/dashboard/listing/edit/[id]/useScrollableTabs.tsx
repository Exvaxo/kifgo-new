"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tab } from "./Tabs";

interface IScrollableTabs {
  tabs: Tab[];
  defaultSelectedTab?: string;
}

const useScrollableTabs = ({ tabs, defaultSelectedTab }: IScrollableTabs) => {
  const [activeTab, setActiveTab] = useState(
    defaultSelectedTab || tabs[0].value,
  );

  useEffect(() => {
    if (defaultSelectedTab) {
      document?.getElementById(defaultSelectedTab)?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [defaultSelectedTab]);

  const [aboutRef, isAboutInView] = useInView({
    threshold: 0.6,
  });

  const [priceRef, isPriceInView] = useInView({
    threshold: 0.4,
  });

  const [variationsRef, isVariationsInView] = useInView({
    threshold: 0.4,
  });

  const [detailsRef, isDetailsInView] = useInView({
    threshold: 0.4,
  });

  const [shippingRef, isShippingInView] = useInView({
    threshold: 0.4,
  });

  const [settingsRef, isSettingsInView] = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (isAboutInView) {
      setActiveTab(tabs[0].value);
    }

    if (isPriceInView) {
      setActiveTab(tabs[1].value);
    }

    if (isDetailsInView) {
      setActiveTab(tabs[2].value);
    }

    if (isVariationsInView) {
      setActiveTab(tabs[3].value);
    }

    if (isShippingInView) {
      setActiveTab(tabs[4].value);
    }

    if (isSettingsInView) {
      setActiveTab(tabs[5].value);
    }
  }, [
    isAboutInView,
    isPriceInView,
    isVariationsInView,
    isDetailsInView,
    isShippingInView,
    isSettingsInView,
  ]);

  return {
    activeTab,
    setActiveTab,
    aboutRef,
    priceRef,
    detailsRef,
    variationsRef,
    settingsRef,
    shippingRef,
    isAboutInView,
    isPriceInView,
    isVariationsInView,
    isDetailsInView,
    isSettingsInView,
  };
};

export default useScrollableTabs;
