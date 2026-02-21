import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  loading?: boolean;
}

export function MetricCard({ title, value, icon: Icon, description, loading }: MetricCardProps) {
  if (loading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-400">
            {title}
          </CardTitle>
          <Skeleton className="h-4 w-4 rounded-full bg-zinc-800" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-1 bg-zinc-800" />
          <Skeleton className="h-4 w-32 bg-zinc-800" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-zinc-500 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
