import React from "react";
import PageContainer from "../CommenComponents/PageContainer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PageContainer>
        <div className="text-center py-24">
          <h1 className="text-4xl font-bold mb-4">404 — Page not found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </PageContainer>
    </div>
  );
}
