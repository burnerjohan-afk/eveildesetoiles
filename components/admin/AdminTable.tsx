"use client";

import { Button } from "@/components/ui/Button";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface AdminTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  actions?: (id: string) => React.ReactNode;
}

export function AdminTable<T extends { id: string }>({
  data,
  columns,
  actions,
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune donnée.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {String(row[column.key])}
                  </div>
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {actions(row.id)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
