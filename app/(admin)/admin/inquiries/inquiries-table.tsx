"use client";

import * as React from "react";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutColumns,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getExpandedRowModel,
  type ExpandedState,
} from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { he } from "date-fns/locale";
import { CircleCheck, Clock, Mail, Archive, Search } from "lucide-react";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const inquirySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
  status: z.string().nullable(),
  createdAt: z.date().nullable(),
});

export type Inquiry = z.infer<typeof inquirySchema>;

const columns: ColumnDef<Inquiry>[] = [
  {
    accessorKey: "name",
    header: "שם",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "subject",
    header: "נושא",
    cell: ({ row }) => {
      const labels: Record<string, string> = {
        general: "שאלה כללית",
        project: "פנייה לפרויקט",
        support: "תמיכה",
      };
      return (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {labels[row.original.subject] || row.original.subject}
        </Badge>
      );
    },
  },
  {
    accessorKey: "message",
    header: "הודעה",
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-[200px] truncate block">
        {row.original.message.length > 40
          ? `${row.original.message.slice(0, 40)}...`
          : row.original.message}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "סטטוס",
    cell: ({ row }) => {
      const status = row.original.status || "new";

      const statusConfig: Record<
        string,
        { label: string; icon: React.ReactNode }
      > = {
        new: {
          label: "חדש",
          icon: <IconLoader />,
        },
        read: {
          label: "נקרא",
          icon: <IconLoader />,
        },
        replied: {
          label: "נענה",
          icon: (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
          ),
        },
        archived: {
          label: "בארכיון",
          icon: (
            <IconCircleCheckFilled className="fill-gray-500 dark:fill-gray-400" />
          ),
        },
      };

      const config = statusConfig[status] || statusConfig.new;

      return (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {config.icon}
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "טלפון",
    cell: ({ row }) => (
      <a
        href={`tel:${row.original.phone}`}
        className="text-primary hover:underline"
      >
        {row.original.phone}
      </a>
    ),
  },
  {
    accessorKey: "email",
    header: "אימייל",
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        className="text-primary hover:underline"
      >
        {row.original.email}
      </a>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "נשלח",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.createdAt
          ? formatDistanceToNow(row.original.createdAt, {
              addSuffix: true,
              locale: he,
            })
          : "-"}
      </span>
    ),
  },
];

// Main DataTable component
export function InquiriesTable({ data: initialData }: { data: Inquiry[] }) {
  const [data] = React.useState(() => initialData);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
      globalFilter,
      expanded,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div dir="rtl" className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pr-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">התאמת עמודות</span>
                <span className="lg:hidden">עמודות</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  const hebrewNames: Record<string, string> = {
                    name: "שם",
                    subject: "נושא",
                    message: "הודעה",
                    status: "סטטוס",
                    phone: "טלפון",
                    email: "אימייל",
                    createdAt: "נשלח",
                  };
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {hebrewNames[column.id] || column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Total count */}
          <div className="text-sm text-muted-foreground">
            סה״כ {table.getFilteredRowModel().rows.length} פניות
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="overflow-hidden rounded-lg border min-w-full">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => row.toggleExpanded()}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Expanded row content */}
                    {row.getIsExpanded() && (
                      <TableRow className="bg-muted/20">
                        <TableCell colSpan={columns.length} className="p-4">
                          <div className="text-sm">
                            <span className="font-medium">הודעה מלאה:</span>
                            <p className="mt-2 whitespace-pre-wrap text-muted-foreground">
                              {row.original.message}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    אין פניות עדיין
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            שורות בעמוד
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">
            עמוד {table.getState().pagination.pageIndex + 1} מתוך{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">לעמוד הראשון</span>
              <IconChevronsRight />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">לעמוד הקודם</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">לעמוד הבא</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">לעמוד האחרון</span>
              <IconChevronsLeft />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
