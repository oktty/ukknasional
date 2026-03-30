import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    nis: string;
    name: string;
    class: string;
    created_at: string;
}

interface PageProps {
    students: {
        data: Student[];
        links: any[];
    };
    flash?: {
        message?: string;
    };
}

export default function Index({ students, flash }: PageProps) {
    return (
        <>
            <Head title="Manajemen Siswa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data Siswa</h1>
                    <Button asChild>
                        <Link href="/admin/students/create">Tambah Siswa</Link>
                    </Button>
                </div>

                {flash?.message && (
                    <div className="rounded border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                        {flash.message}
                    </div>
                )}

                <div className="rounded-md border overflow-hidden">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">NIS</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nama</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Kelas</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {students.data.length === 0 ? (
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td colSpan={4} className="p-4 align-middle text-center h-24">
                                        Belum ada data siswa.
                                    </td>
                                </tr>
                            ) : (
                                students.data.map((student) => (
                                    <tr key={student.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{student.nis}</td>
                                        <td className="p-4 align-middle">{student.name}</td>
                                        <td className="p-4 align-middle">{student.class}</td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/students/${student.id}/edit`}>Edit</Link>
                                                </Button>
                                                <Button variant="destructive" size="sm" asChild>
                                                    <Link href={`/admin/students/${student.id}`} method="delete" as="button">
                                                        Hapus
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="flex justify-end mt-4">
                    {/* Render standard pagination if needed */}
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/admin/students' },
    ],
};
