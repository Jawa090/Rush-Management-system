import React, { useState, useMemo } from "react";
import { DuaCard } from "@/components/dua-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Heart, BookOpen, Star, Volume2 } from "lucide-react";
import { duasData, duaCategories, type Dua } from "@/data/duas";

export default function Duas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showAudioOnly, setShowAudioOnly] = useState(false);

  const filteredDuas = useMemo(() => {
    return duasData.filter((dua) => {
      const matchesSearch = 
        dua.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dua.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dua.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || dua.category === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || dua.isFavorite;
      const matchesAudio = !showAudioOnly || dua.hasAudio;

      return matchesSearch && matchesCategory && matchesFavorites && matchesAudio;
    });
  }, [searchTerm, selectedCategory, showFavoritesOnly, showAudioOnly]);

  const duaStats = {
    total: duasData.length,
    withAudio: duasData.filter(d => d.hasAudio).length,
    categories: duaCategories.length - 1, // Exclude "All"
    favorites: duasData.filter(d => d.isFavorite).length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Islamic Duas Collection</h1>
        <p className="text-muted-foreground">
          Comprehensive collection of authentic Islamic prayers and supplications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{duaStats.total}</div>
            <div className="text-xs text-muted-foreground">Total Duas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Volume2 className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{duaStats.withAudio}</div>
            <div className="text-xs text-muted-foreground">With Audio</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Filter className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{duaStats.categories}</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{duaStats.favorites}</div>
            <div className="text-xs text-muted-foreground">Favorites</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Duas</TabsTrigger>
          <TabsTrigger value="categories">By Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search duas by title, transliteration, translation, or tags..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search-duas"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Filters:</span>
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="h-8"
              >
                <Heart className="h-3 w-3 mr-1" />
                Favorites Only
              </Button>
              <Button
                variant={showAudioOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAudioOnly(!showAudioOnly)}
                className="h-8"
              >
                <Volume2 className="h-3 w-3 mr-1" />
                With Audio
              </Button>
            </div>

            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-2">
                {duaCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="shrink-0"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredDuas.length} of {duasData.length} duas
              </p>
              {(searchTerm || selectedCategory !== "All" || showFavoritesOnly || showAudioOnly) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setShowFavoritesOnly(false);
                    setShowAudioOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {filteredDuas.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No duas found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredDuas.map((dua) => (
                  <DuaCard
                    key={dua.id}
                    title={dua.title}
                    arabic={dua.arabic}
                    transliteration={dua.transliteration}
                    translation={dua.translation}
                    category={dua.category}
                    hasAudio={dua.hasAudio}
                    source={dua.source}
                    benefits={dua.benefits}
                    tags={dua.tags}
                    testId={`dua-${dua.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-6">
            {duaCategories.slice(1).map((category) => {
              const categoryDuas = duasData.filter(dua => dua.category === category);
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category} Duas
                      <Badge variant="secondary">{categoryDuas.length}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {getCategoryDescription(category)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {categoryDuas.slice(0, 2).map((dua) => (
                        <DuaCard
                          key={dua.id}
                          title={dua.title}
                          arabic={dua.arabic}
                          transliteration={dua.transliteration}
                          translation={dua.translation}
                          category={dua.category}
                          hasAudio={dua.hasAudio}
                          source={dua.source}
                          benefits={dua.benefits}
                          tags={dua.tags}
                          testId={`dua-${dua.id}`}
                        />
                      ))}
                      {categoryDuas.length > 2 && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedCategory(category);
                            // Switch to browse tab
                            const browseTab = document.querySelector('[value="browse"]') as HTMLElement;
                            browseTab?.click();
                          }}
                        >
                          View all {categoryDuas.length} {category.toLowerCase()} duas
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    "Daily": "Essential duas for everyday activities and routines",
    "Travel": "Prayers for safe journeys and travel protection",
    "Prayer": "Duas related to Salah and worship times",
    "Protection": "Seeking Allah's protection from harm and evil",
    "Health": "Prayers for healing, wellness, and visiting the sick",
    "Forgiveness": "Seeking Allah's forgiveness and repentance",
    "Gratitude": "Expressing thankfulness and praise to Allah",
    "Knowledge": "Prayers for seeking beneficial knowledge and wisdom"
  };
  return descriptions[category] || "Collection of authentic Islamic supplications";
}
