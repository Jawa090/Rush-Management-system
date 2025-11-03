import { DuaCard } from "@/components/dua-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

//todo: remove mock functionality
const duasList = [
  {
    id: 1,
    title: "Dua Before Meals",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: "Bismillahi wa 'ala barakatillah",
    translation: "In the name of Allah and with the blessings of Allah",
    hasAudio: true,
  },
  {
    id: 2,
    title: "Dua After Meals",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-lathee at'amanee hatha wa razaqaneehi min ghayri hawlin minnee wa la quwwah",
    translation: "All praise is due to Allah who has given me this food and provided it for me without any strength or power on my part",
    hasAudio: true,
  },
  {
    id: 3,
    title: "Dua When Entering Home",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'alallahi rabbina tawakkalna",
    translation: "In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we depend",
    hasAudio: false,
  },
  {
    id: 4,
    title: "Dua for Travel",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
    transliteration: "Subhanal-lathee sakhkhara lana hatha wa ma kunna lahu muqrineen",
    translation: "Glory unto Him who has subjected this to us, and we could never have it by our efforts",
    hasAudio: true,
  },
];

export default function Duas() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Duas</h1>
        <p className="text-muted-foreground">Important Islamic prayers and supplications</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search duas..."
          className="pl-10"
          data-testid="input-search-duas"
        />
      </div>

      <div className="space-y-4">
        {duasList.map((dua) => (
          <DuaCard
            key={dua.id}
            title={dua.title}
            arabic={dua.arabic}
            transliteration={dua.transliteration}
            translation={dua.translation}
            hasAudio={dua.hasAudio}
            testId={`dua-${dua.id}`}
          />
        ))}
      </div>
    </div>
  );
}
