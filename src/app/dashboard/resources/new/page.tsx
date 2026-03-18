"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createResource } from "@/lib/resources";
import { getErrorMessage } from "@/lib/apiClient";
import { Card } from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/ui/index";

export default function NewResourcePage() {
  const router = useRouter();
  const [form, setForm]       = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createResource(form);
      router.push("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">New Resource</h1>
        <p className="text-sm text-gray-500 font-body mt-0.5">Fill in the details below</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <ErrorMessage message={error} />}

          <Input
            label="Title"
            name="title"
            placeholder="Enter a title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300 font-body">Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Optional description..."
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg bg-surface-2 border border-surface-3 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 font-body focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-colors resize-none hover:border-gray-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading}>Create</Button>
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
