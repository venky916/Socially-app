import { getNotifications } from "@/actions/notification.action";
import Notification from "./_components/Notification";

const page = async () => {
  let notifications = await getNotifications();
  if (!notifications) {
    notifications = [];
  }
  return <Notification notifications={notifications} />;
};

export default page;
