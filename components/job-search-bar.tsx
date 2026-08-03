"use client";

import { Search, X } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface JobSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function JobSearchBar({
  value,
  onChange,
  onClear,
}: JobSearchBarProps) {
  return (
    <div className="w-full max-w-2xl">
      <label htmlFor="job-search" className="sr-only">
        Search job applications
      </label>
      <div className="rounded-2xl border border-border/70 bg-muted/30 p-3 shadow-sm backdrop-blur-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="job-search"
            type="text"
            inputMode="search"
            autoComplete="off"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search companies or positions"
            className="h-12 rounded-xl border-border/80 bg-background pl-11 pr-12 shadow-none placeholder:text-muted-foreground/80"
          />
          {value ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={onClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}