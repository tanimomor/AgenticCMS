'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to document builder
    router.replace('/admin/builder/document');
  }, [router]);

  return null;
}

