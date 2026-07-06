import React from "react";
import PageContainer from "../CommenComponents/PageContainer";
import PageHeader from "../CommenComponents/PageHeader";

export default function Gallery() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Gallery" />
      <PageContainer>
        <div className="py-12 text-center">Gallery page placeholder</div>
      </PageContainer>
    </div>
  );
}
