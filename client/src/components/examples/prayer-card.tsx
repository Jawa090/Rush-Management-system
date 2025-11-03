import { PrayerCard } from '../prayer-card';

export default function PrayerCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <PrayerCard
        name="Fajr"
        time="5:30 AM"
        countdown="In 4 hours"
        isActive={true}
        testId="prayer-fajr"
      />
      <PrayerCard
        name="Dhuhr"
        time="12:45 PM"
        testId="prayer-dhuhr"
      />
    </div>
  );
}
