import { Card } from "./../Card";
import { Skeleton } from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
}

export const TableSkeleton = ({ rows = 6 }: TableSkeletonProps) => {
  return (
    <Card padding={false}>
      <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        {["w-20", "flex-1", "w-24", "w-24", "w-20", "w-16"].map((w, i) => (
          <Skeleton key={i} className={`h-3 ${w}`}></Skeleton>
        ))}
      </div>

      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0"
        >
          <Skeleton className="h-3 w-20"></Skeleton>
          <Skeleton className="h-3 flex-1"></Skeleton>
          <Skeleton className="h-5 w-24 rounded-full"></Skeleton>
          <Skeleton className="h-3 w-24"></Skeleton>
          <Skeleton className="h-5 w-20 rounded-full"></Skeleton>
          <div className="flex gap-2 w-16">
            <Skeleton className="h-6 w-6 rounded-lg"></Skeleton>
            <Skeleton className="h-6 w-6 rounded-lg"></Skeleton>
          </div>
        </div>
      ))}
    </Card>
  );
};
