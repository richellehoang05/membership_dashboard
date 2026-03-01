"use client";

import AdminSection from "@/components/AdminSection";
import EventCalendar from "@/components/EventCalendar";

export default function AdminEventsPage() {
  return (
    <AdminSection
      title="Events"
      description="Manage events and attendance."
    >
      <EventCalendar />
    </AdminSection>
  );
}
