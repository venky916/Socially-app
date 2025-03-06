"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function getNotifications() {
  const userId = await getDbUserId();
  if (!userId) return [];

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function markNotifications(notificationIds: string[]) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return { success: false };
  }
}

export async function unReadNotification() {
  const userId = await getDbUserId();
  if (!userId) return [];

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        read: false,
      },
    });
    return notifications.length > 0;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    // throw new Error("Failed to fetch notifications");
    return false;
  }
}
