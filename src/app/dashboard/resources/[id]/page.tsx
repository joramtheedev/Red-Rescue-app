"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { updateResource, deleteResource } from "@/lib/resources";
import { getErrorMessage } from "@/lib/apiClient";
import { Card, Spinner, ErrorMessage } from "@/components/ui/index";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Resource } from "@/types";

export default function ResourceDetailPage({ params }: { params: { id: string } }) {
  const router   = useRouter();
  const { data: resource, loading, error } = useFetch<Resource>(`/resources/${params.id}`);
  const [editing, setEditing]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [form, setForm]         = useState({ title: "", description: "" });

  function startEdit() {
    if (!resource) return;
    setForm({ title: resource.title, description: resource.description ?? "" });
    setEditing(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveError(null);
    setSaving(true);
    try {
      await updateResource(params.id, form);
      setEditing(false);
      router.refresh();
    } catch (err) {
      setSaveError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this resource? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteResource(params.id);
      router.push("/dashboard");
    } catch (err) {
      alert(getErrorMessage(err));
      setDeleting(false);
    }
  }

  if (loading) return <div className="flex justify-center py-24"><Spinner size={32} /></div>;
  if (error)   return <div className="max-w-xl"><ErrorMessage message={error} /></div>;
  if (!resource) return null;

  return (
    <div className="max-w-xl animate-fade-up">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{resource.title}</h1>
          <p className="text-xs text-gray-500 font-mono mt-1">ID: {resource.id}</p>
        </div>
        <div className="flex gap-2">
          {!editing && (
            <>
              <Button variant="secondary" size="sm" onClick={startEdit}>Edit</Button>
              <Button variant="danger" size="sm" loading={deleting} onClick={handleDelete}>Delete</Button>
            </>
          )}
        </div>
      </div>

      <Card>
        {editing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            {saveError && <ErrorMessage message={saveError} />}
            <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300 font-body">Description</label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-lg bg-surface-2 border border-surface-3 px-3 py-2.5 text-sm text-white font-body focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving}>Save Changes</Button>
              <Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-gray-500 font-body uppercase tracking-widest mb-1">Description</p>
              <p className="text-sm text-gray-300 font-body">
                {resource.description || <span className="italic text-gray-600">No description provided.</span>}
              </p>
            </div>
            <div className="flex gap-6 pt-2 border-t border-surface-3">
              <div>
                <p className="text-xs text-gray-500 font-body uppercase tracking-widest mb-1">Created</p>
                <p className="text-sm text-gray-300 font-mono">{new Date(resource.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-body uppercase tracking-widest mb-1">Updated</p>
                <p className="text-sm text-gray-300 font-mono">{new Date(resource.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
