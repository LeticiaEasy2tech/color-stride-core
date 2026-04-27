import { useState, useMemo } from "react";
import { Search, X, ChevronDown, Bookmark, Calendar as CalIcon, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type FilterState = {
  search: string;
  client: string;
  status: string;
  category: string;
  dateRange: string;
  view: string;
};

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  client: "all",
  status: "all",
  category: "all",
  dateRange: "any",
  view: "all",
};

export type SavedView = {
  id: string;
  label: string;
  description?: string;
  filters: Partial<FilterState>;
};

export const DEFAULT_SAVED_VIEWS: SavedView[] = [
  { id: "all", label: "All records", filters: {} },
  {
    id: "my-open-jobs",
    label: "My Open Jobs",
    description: "Active jobs assigned to me",
    filters: { status: "active" },
  },
  {
    id: "pending-co",
    label: "Pending Change Orders",
    description: "Change orders awaiting approval",
    filters: { status: "pending", category: "change-order" },
  },
  {
    id: "awarded-month",
    label: "Awarded This Month",
    description: "Won proposals in the last 30 days",
    filters: { status: "awarded", dateRange: "30d" },
  },
  {
    id: "overdue-billing",
    label: "Overdue Billing",
    description: "Invoices past due date",
    filters: { status: "overdue", category: "billing" },
  },
];

type Option = { value: string; label: string };

export type FilterBarProps = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  clientOptions?: Option[];
  statusOptions?: Option[];
  categoryOptions?: Option[];
  dateOptions?: Option[];
  savedViews?: SavedView[];
  searchPlaceholder?: string;
  className?: string;
};

const DEFAULT_DATE_OPTIONS: Option[] = [
  { value: "any", label: "Any time" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "qtd", label: "Quarter to date" },
  { value: "ytd", label: "Year to date" },
];

const DEFAULT_CLIENT_OPTIONS: Option[] = [
  { value: "all", label: "All clients" },
  { value: "arco", label: "ARCO/Murray" },
  { value: "winkel", label: "Winkel Construction" },
  { value: "ajax", label: "AJAX Construction" },
  { value: "tgsv", label: "TGSV Enterprises" },
  { value: "eco", label: "Eco Building" },
];

const DEFAULT_STATUS_OPTIONS: Option[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "awarded", label: "Awarded" },
  { value: "overdue", label: "Overdue" },
  { value: "closed", label: "Closed" },
];

const DEFAULT_CATEGORY_OPTIONS: Option[] = [
  { value: "all", label: "All categories" },
  { value: "estimate", label: "Estimate" },
  { value: "proposal", label: "Proposal" },
  { value: "change-order", label: "Change Order" },
  { value: "billing", label: "Billing" },
];

export function FilterBar({
  value,
  onChange,
  clientOptions = DEFAULT_CLIENT_OPTIONS,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  categoryOptions = DEFAULT_CATEGORY_OPTIONS,
  dateOptions = DEFAULT_DATE_OPTIONS,
  savedViews = DEFAULT_SAVED_VIEWS,
  searchPlaceholder = "Search…",
  className,
}: FilterBarProps) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  const activeView = savedViews.find((v) => v.id === value.view) ?? savedViews[0];

  const chips = useMemo(() => {
    const c: { key: keyof FilterState; label: string }[] = [];
    if (value.client !== "all") {
      const o = clientOptions.find((x) => x.value === value.client);
      if (o) c.push({ key: "client", label: `Client: ${o.label}` });
    }
    if (value.status !== "all") {
      const o = statusOptions.find((x) => x.value === value.status);
      if (o) c.push({ key: "status", label: `Status: ${o.label}` });
    }
    if (value.category !== "all") {
      const o = categoryOptions.find((x) => x.value === value.category);
      if (o) c.push({ key: "category", label: `Category: ${o.label}` });
    }
    if (value.dateRange !== "any") {
      const o = dateOptions.find((x) => x.value === value.dateRange);
      if (o) c.push({ key: "dateRange", label: `Date: ${o.label}` });
    }
    if (value.search.trim()) {
      c.push({ key: "search", label: `“${value.search.trim()}”` });
    }
    return c;
  }, [value, clientOptions, statusOptions, categoryOptions, dateOptions]);

  const reset = () => onChange({ ...DEFAULT_FILTERS, view: value.view });

  const applyView = (v: SavedView) => {
    onChange({ ...DEFAULT_FILTERS, ...v.filters, view: v.id });
  };

  const clearChip = (key: keyof FilterState) => {
    if (key === "search") set({ search: "" });
    else if (key === "client") set({ client: "all" });
    else if (key === "status") set({ status: "all" });
    else if (key === "category") set({ category: "all" });
    else if (key === "dateRange") set({ dateRange: "any" });
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card shadow-[var(--shadow-card)] p-3 space-y-3",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={value.search}
            onChange={(e) => set({ search: e.target.value })}
            placeholder={searchPlaceholder}
            className="pl-8 h-9"
          />
        </div>

        <FilterSelect
          value={value.client}
          onChange={(v) => set({ client: v })}
          options={clientOptions}
          placeholder="Client"
          width="w-[160px]"
        />
        <FilterSelect
          value={value.status}
          onChange={(v) => set({ status: v })}
          options={statusOptions}
          placeholder="Status"
          width="w-[140px]"
        />
        <FilterSelect
          value={value.category}
          onChange={(v) => set({ category: v })}
          options={categoryOptions}
          placeholder="Category"
          width="w-[150px]"
        />
        <FilterSelect
          value={value.dateRange}
          onChange={(v) => set({ dateRange: v })}
          options={dateOptions}
          placeholder="Date"
          icon={<CalIcon className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />}
          width="w-[150px]"
        />

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={reset}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <Bookmark className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="max-w-[140px] truncate">{activeView.label}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                Saved views
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {savedViews.map((v) => (
                <DropdownMenuItem
                  key={v.id}
                  onClick={() => applyView(v)}
                  className="flex flex-col items-start gap-0.5 py-2"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium text-sm">{v.label}</span>
                    {value.view === v.id && (
                      <span className="text-[10px] text-[var(--accent)]">Active</span>
                    )}
                  </div>
                  {v.description && (
                    <span className="text-[11px] text-muted-foreground">{v.description}</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground mr-1">
            Filters
          </span>
          {chips.map((chip) => (
            <Badge
              key={chip.key}
              variant="secondary"
              className="gap-1 pr-1 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/15 border-0"
            >
              {chip.label}
              <button
                type="button"
                onClick={() => clearChip(chip.key)}
                className="ml-0.5 rounded-sm p-0.5 hover:bg-[var(--accent)]/20"
                aria-label={`Remove ${chip.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  width = "w-[150px]",
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder: string;
  width?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("h-9", width)}>
        <div className="flex items-center min-w-0">
          {icon}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value} className="text-sm">
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function useFilterBar(initial?: Partial<FilterState>) {
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS, ...initial });
  return [filters, setFilters] as const;
}