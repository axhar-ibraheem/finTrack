import { Card } from "./../Card";
import { Skeleton } from "./Skeleton";

interface ChartSkeletonProps {
  height?: number;
  className?: string;
}

const BAR_HEIGHTS = [65, 40, 75, 55, 80, 35, 60];

export const ChartSkeleton = ({
  height = 220,
  className,
}: ChartSkeletonProps) => {
  return (
    <Card className={className}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-36"></Skeleton>
            <Skeleton className="h-3 w-24"></Skeleton>
          </div>
        </div>

        <div className="w-full relative" style={{ height }}>
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-2 w-8"></Skeleton>
            ))}
          </div>

          <div className="absolute left-10 right-0 bottom-6 top-0 flex items-end gap-3">
            {BAR_HEIGHTS.map((barHeight, i) => (
              <Skeleton
                key={i}
                className="flex-1 rounded-t-md"
                style={{ height: `${barHeight}%` }}
              ></Skeleton>
            ))}
          </div>

          <div className="absolute bottom-0 left-10 right-0 flex justify-between">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-2 w-10"></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
