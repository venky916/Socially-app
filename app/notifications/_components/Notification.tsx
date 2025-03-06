"use client";
import React, { useEffect } from "react";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  getNotifications,
  markNotifications,
} from "@/actions/notification.action";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

type Notifications = Awaited<ReturnType<typeof getNotifications>>;
type Notification = Notifications[number];

interface NotificationProps {
  notifications: Notifications;
}

// const NotificationIcon = {
//   LIKE: Heart,
//   COMMENT: MessageCircle,
//   FOLLOW: UserPlus,
// };

const IconItem = {
  LIKE: <Heart className="size-6 text-rose-500" />,
  COMMENT: <MessageCircle className="size-6 text-sky-500" />,
  FOLLOW: <UserPlus className="size-6 text-green-500" />,
};

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  const unRead = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const unReadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unReadIds.length > 0) markNotifications(unReadIds);
  }, [notifications]);

  return (
    <div className="border w-full rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h1>Notifications</h1>
        <p className="text-sm text-muted-foreground">{unRead} Unread</p>
      </div>
      <div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No Notifications Yet
            </div>
          ) : (
            notifications.map((notification) => {
              //   const IconComponent = NotificationIcon[notification.type];
              return (
                <div className="p-4 border-b" key={notification.id}>
                  <div
                    className={`flex items-start gap-2 hover:bg-muted/25 transition-colors ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                  >
                    <Avatar className="mt-1">
                      <AvatarImage
                        src={notification.creator.image || "/images/avatar.png"}
                      />
                    </Avatar>
                    {IconItem[notification.type]}
                    <div className="flex flex-col w-full">
                      <div className="flex gap-2">
                        <p className="font-bold text-white">
                          {notification.creator.name ??
                            notification.creator.username}
                        </p>
                        <p className="font-normal">
                          {notification.type === "FOLLOW"
                            ? "Started following you"
                            : notification.type === "LIKE"
                            ? "Liked your Post"
                            : "Commented on your post"}
                        </p>
                      </div>
                      {notification.post &&
                        (notification.type === "LIKE" ||
                          notification.type === "COMMENT") && (
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                              <p>{notification.post.content}</p>
                              {notification.post.image && (
                                <Image
                                  src={notification.post.image}
                                  alt="Post content"
                                  className="w-full h-auto max-w-[200px] object-cover rounded-md mt-2"
                                  width={200}
                                  height={200}
                                />
                              )}
                            </div>
                            {notification.type === "COMMENT" &&
                              notification.comment && (
                                <div className="text-sm p-2 bg-accent/50 rounded-md">
                                  {notification.comment.content}
                                </div>
                              )}
                          </div>
                        )}
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Notification;

// {
//   /* following */
// }
// <div className="p-4 border-b">
//   <div className="flex gap-2">
//     <Avatar>
//       <AvatarImage src="/images/avatar.png" />
//     </Avatar>
//     <UserPlus className="size-6 text-green-500" />
//     <div className="flex flex-col">
//       <div className="flex gap-2">
//         <p className="font-bold text-white">Venkatesh Maliga</p>
//         <p className="font-normal">started following you</p>
//       </div>
//       <time>3 days ago</time>
//     </div>
//   </div>
// </div>;
// {
//   /* liked */
// }
// <div className="p-4 border-b">
//   <div className="flex gap-2">
//     <Avatar>
//       <AvatarImage src="/images/avatar.png" />
//     </Avatar>
//     <Heart className="size-6 text-rose-500" />
//     <div className="flex flex-col w-full">
//       <div className="flex gap-2">
//         <p className="font-bold text-white">Venkatesh Maliga</p>
//         <p className="font-normal">Liked your post</p>
//       </div>
//       <p className="bg-gray-900 w-full">Hey this is my first post</p>
//       <time>less than a minute ago</time>
//     </div>
//   </div>
// </div>;
// {
//   /*commented  */
// }
// <div className="p-4 border-b">
//   <div className="flex gap-2">
//     <Avatar>
//       <AvatarImage src="/images/avatar.png" />
//     </Avatar>
//     <MessageCircle className="size-6 text-blue-500" />
//     <div className="flex flex-col w-full">
//       <div className="flex gap-2">
//         <p className="font-bold text-white">Venkatesh Maliga</p>
//         <p className="font-normal">commented on your post</p>
//       </div>
//       <div className="flex flex-col space-y-2">
//         <p className="bg-gray-900 w-full">Hey this is my first post</p>
//         <p className="bg-gray-900 w-full">Cool</p>
//       </div>
//       <time>less than a minute ago</time>
//     </div>
//   </div>
// </div>;
// {
//   /* image comment */
// }
// <div className="p-4 border-b">
//   <div className="flex gap-2">
//     <Avatar>
//       <AvatarImage src="/images/avatar.png" />
//     </Avatar>
//     <MessageCircle className="size-6 text-blue-500" />
//     <div className="flex flex-col w-full">
//       <div className="flex gap-2">
//         <p className="font-bold text-white">Venkatesh Maliga</p>
//         <p className="font-normal">commented on your post</p>
//       </div>
//       <div className="flex flex-col space-y-2">
//         <div className="bg-gray-900 w-full p-2">
//           <p className="">Hey this is my first post</p>
//           <Image
//             src={"/images/avatar.png"}
//             alt="post"
//             height={200}
//             width={200}
//           />
//         </div>

//         <p className="bg-gray-900 w-full">Cool</p>
//       </div>
//       <time>21h ago</time>
//     </div>
//   </div>
// </div>;
