import React from "react";
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  return <h1 className="text-3xl">Slug: {router.query.slug}</h1>;
}
