'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider  from "./_components/Slider";
import FeaturesList from "./_components/FeaturesList";
import SubCategory from "./_components/SubCategory";
import Banner from "./_components/Banner";

export default function Home() {
  return (
    <div className="p-12 md:px-16">
      <Slider/>
      <FeaturesList/>
      <SubCategory/>
     
    </div>
  );
}
