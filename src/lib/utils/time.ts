import { Timestamp } from "firebase/firestore";

export function normalizeDate(date: Timestamp | Date | string | number): Date {
  if (date instanceof Timestamp) {
    return date.toDate();
  }
  if (typeof date === "string" || typeof date === "number") {
    return new Date(date);
  }
  return date;
}

export function formatDate(date: Timestamp | Date | string | number): string {
  return normalizeDate(date).toLocaleDateString();
}
