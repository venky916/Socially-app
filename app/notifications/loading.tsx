import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="border w-full rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h1>Notifications</h1>
        <Skeleton className="h-4 w-16" /> {/* Unread count skeleton */}
      </div>
      <div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border-b">
              <div className="flex items-start gap-2">
                <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
                <div className="flex flex-col w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-4 w-1/4" /> {/* Time */}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
