import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
    aspirations_count: number;
}

interface PageProps {
    categories: Category[];
    flash?: { message?: string };
    errors?: { delete?: string };
}

export default function Index({ categories, flash, errors }: PageProps) {
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Category | null>(null);

    // Add form
    const addForm = useForm({ name: '' });

    // Edit form
    const editForm = useForm({ name: '' });

    function openEdit(category: Category) {
        setEditTarget(category);
        editForm.setData('name', category.name);
    }

    function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        addForm.post('/admin/categories', {
            onSuccess: () => {
                setAddOpen(false);
                addForm.reset();
            },
        });
    }

    function handleEdit(e: React.FormEvent) {
        e.preventDefault();

        if (!editTarget) {
            return;
        }

        editForm.put(`/admin/categories/${editTarget.id}`, {
            onSuccess: () => setEditTarget(null),
        });
    }

    function handleDelete(category: Category) {
        if (!confirm(`Hapus kategori "${category.name}"?`)) {
            return;
        }

        router.delete(`/admin/categories/${category.id}`);
    }

    return (
        <>
            <Head title="Kelola Kategori" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Kategori Pengaduan</h1>
                    <Button onClick={() => setAddOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {flash?.message && (
                    <div className="rounded border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                        {flash.message}
                    </div>
                )}

                {errors?.delete && (
                    <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                        {errors.delete}
                    </div>
                )}

                <div className="rounded-md border overflow-hidden">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4" />
                                        Kategori
                                    </div>
                                </th>
                                <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                                    Jumlah Aspirasi
                                </th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-4 align-middle text-center h-24 text-muted-foreground">
                                        Belum ada kategori. Tambahkan kategori pertama.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{cat.name}</td>
                                        <td className="p-4 align-middle text-center">
                                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                                {cat.aspirations_count} aspirasi
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEdit(cat)}
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                    <span className="ml-1">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(cat)}
                                                    disabled={cat.aspirations_count > 0}
                                                    title={cat.aspirations_count > 0 ? 'Tidak bisa dihapus karena masih digunakan' : undefined}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    <span className="ml-1">Hapus</span>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Tambah Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAdd}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="add-name">Nama Kategori</Label>
                                <Input
                                    id="add-name"
                                    value={addForm.data.name}
                                    onChange={(e) => addForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Kebersihan, Infrastruktur..."
                                    autoFocus
                                />
                                {addForm.errors.name && (
                                    <p className="text-sm text-destructive">{addForm.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={addForm.processing}>
                                {addForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nama Kategori</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    autoFocus
                                />
                                {editForm.errors.name && (
                                    <p className="text-sm text-destructive">{editForm.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditTarget(null)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Menyimpan...' : 'Perbarui'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kategori', href: '/admin/categories' },
    ],
};
