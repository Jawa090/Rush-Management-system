import { DuaCard } from '../dua-card';

export default function DuaCardExample() {
  return (
    <div className="p-6 max-w-2xl">
      <DuaCard
        title="Dua Before Meals"
        arabic="بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ"
        transliteration="Bismillahi wa 'ala barakatillah"
        translation="In the name of Allah and with the blessings of Allah"
        hasAudio={true}
        testId="dua-before-meals"
      />
    </div>
  );
}
