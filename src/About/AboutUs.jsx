import React from "react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <PageHeader title="About Us" />
      <PageContainer>
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">About Ozone Enterprises</h2>
          <p className="text-gray-600">Placeholder about content. Replace with real company information.</p>
        </div>
      </PageContainer>
    </div>
  );
}
